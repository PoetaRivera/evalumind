import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCompletedTests, clearCompletedTests } from '../../utils/sessionResults';
import { exportResultsToPDF } from '../../utils/pdfExport';

const TEST_LABELS = {
  'tdah-adult-v2': { name: 'TDAH', color: '#3b82f6' },
  'tea-adult-v1': { name: 'TEA', color: '#8b5cf6' },
  'hsp-adult-v1': { name: 'Alta Sensibilidad', color: '#10b981' },
  'alexitimia-adult-v1': { name: 'Alexitimia', color: '#f59e0b' },
  'rsd-adult-v1': { name: 'RSD', color: '#ec4899' },
  'burnout-masking-v1': { name: 'Burnout Masking', color: '#f97316' },
  'funciones-ejecutivas-v1': { name: 'F. Ejecutivas', color: '#14b8a6' },
  'dat-v1': { name: 'DAT', color: '#ef4444' },
  'fas-v1': { name: 'FAS', color: '#6366f1' },
};

const DIMENSION_LABELS = {
  inattention: 'Inatención',
  hyperactivityPhysical: 'Hiperactividad física',
  impulsivityVerbal: 'Impulsividad verbal',
  socialCommunication: 'Comunicación social',
  relationships: 'Relaciones',
  routinesFlexibility: 'Rutinas/flexibilidad',
  sensoryInterests: 'Sensorial/intereses',
  deepProcessing: 'Procesamiento profundo',
  overStimulation: 'Sobrestimulación',
  emotionalIntensity: 'Intensidad emocional',
  sensorySensitivity: 'Sensibilidad sensorial',
  identifyingFeelings: 'Identificación emocional',
  describingFeelings: 'Descripción emocional',
  externallyOriented: 'Pensamiento externo',
  somaticConfusion: 'Confusión somática',
  rejectionPerception: 'Hipersensibilidad al rechazo',
  anticipatoryAvoidance: 'Evitación anticipatoria',
  rumination: 'Rumia y autocrítica',
  physicalExhaustion: 'Agotamiento físico',
  identityLoss: 'Pérdida de identidad',
  emotionalDisconnect: 'Desconexión emocional',
  collapseRecovery: 'Colapso y recuperación',
  inhibition: 'Inhibición',
  workingMemory: 'Memoria de trabajo',
  planning: 'Planificación',
  flexibility: 'Flexibilidad cognitiva',
};

const STRATEGIES = [
  {
    id: 'tdah-estructural',
    condition: (dims) => (dims.inattention || 0) > 50,
    title: 'Pensamiento estructural',
    description:
      'Tu mente procesa en paralelo. Las tareas repetitivas te drenan, pero los sistemas complejos te activan. ' +
      'Busca profesiones o proyectos donde diseñar procesos automáticos, no ejecutarlos manualmente.',
  },
  {
    id: 'masking-recovery',
    condition: (dims) => (dims.socialCommunication || 0) > 40 && ((dims.identifyingFeelings || 0) > 40 || (dims.describingFeelings || 0) > 40),
    title: 'Recuperación del camuflaje',
    description:
      'Gastas mucha energía interpretando señales sociales y traduciendo emociones. Programa tiempos diarios sin máscara social. ' +
      'La soledad elegida no es aislamiento: es recarga.',
  },
  {
    id: 'rejection-shield',
    condition: (dims) => (dims.rejectionPerception || 0) > 50,
    title: 'Escudo contra el rechazo',
    description:
      'Tu sensibilidad al rechazo puede hacerte evitar oportunidades. La terapia DBT y ACT tienen herramientas específicas. ' +
      'Practica exponerte a micro-rechazos en entornos seguros para recalibrar la respuesta.',
  },
  {
    id: 'sensory-design',
    condition: (dims) => ((dims.sensorySensitivity || 0) > 50 || (dims.somaticConfusion || 0) > 50),
    title: 'Diseño sensorial del entorno',
    description:
      'Tu sistema nervioso capta lo que otros filtran. Diseña tu espacio: luces cálidas, ruido controlado, ' +
      'texturas que te calmen. No es un lujo: es una necesidad de tu neurotipo.',
  },
  {
    id: 'divergent-gift',
    condition: (_dims, tests) => {
      const dat = tests['dat-v1'];
      return dat && (dat.category === 'altamente-divergente' || dat.category === 'moderadamente-divergente');
    },
    title: 'El regalo de la divergencia',
    description:
      'Tu puntuación en pensamiento divergente sugiere que puedes conectar ideas que otros ven como separadas. ' +
      'Esto es valioso en innovación, diseño, emprendimiento o cualquier campo que valore perspectivas frescas.',
  },
  {
    id: 'emotional-literacy',
    condition: (dims) => (dims.identifyingFeelings || 0) > 50 && (dims.emotionalIntensity || 0) > 50,
    title: 'Alfabetización emocional progresiva',
    description:
      'Sientes con intensidad pero te cuesta etiquetar lo que sientes. Prueba llevar un "diario de 3 emociones" ' +
      'al final del día. Con el tiempo, el vocabulario emocional se vuelve más preciso y las tormentas, más navegables.',
  },
];

function normalizeDimensions(completedTests) {
  const allDims = {};

  for (const testData of Object.values(completedTests)) {
    const dims = testData.dimensions;
    if (!dims) continue;

    if (Array.isArray(dims)) {
      // Nuevo formato: [{key, label, score, max}]
      for (const d of dims) {
        const max = d.max || 16;
        allDims[d.key] = Math.round((d.score / max) * 100);
      }
    } else {
      // Formato legacy: {key: score}
      for (const [dimKey, score] of Object.entries(dims)) {
        allDims[dimKey] = Math.round((score / 16) * 100);
      }
    }
  }

  return allDims;
}

function findStrengths(dimensions) {
  return Object.entries(dimensions)
    .filter(([, pct]) => pct <= 35)
    .map(([key]) => ({
      key,
      label: DIMENSION_LABELS[key] || key,
      type: 'strength',
    }));
}

function findEffortAreas(dimensions) {
  return Object.entries(dimensions)
    .filter(([, pct]) => pct >= 65)
    .map(([key]) => ({
      key,
      label: DIMENSION_LABELS[key] || key,
      type: 'effort',
    }));
}

function findStrategies(dimensions, completedTests) {
  return STRATEGIES.filter((s) => s.condition(dimensions, completedTests));
}

function getBarColor(pct) {
  if (pct > 60) return '#f59e0b';
  if (pct > 40) return '#6366f1';
  return '#10b981';
}

export default function ProfileMap() {
  const navigate = useNavigate();
  const completedTests = useMemo(() => getCompletedTests(), []);
  const testEntries = Object.entries(completedTests);
  const hasTests = testEntries.length > 0;

  const dimensions = useMemo(() => normalizeDimensions(completedTests), [completedTests]);
  const dimEntries = useMemo(() => Object.entries(dimensions).sort((a, b) => b[1] - a[1]), [dimensions]);
  const strengths = useMemo(() => findStrengths(dimensions), [dimensions]);
  const effortAreas = useMemo(() => findEffortAreas(dimensions), [dimensions]);
  const strategies = useMemo(() => findStrategies(dimensions, completedTests), [dimensions, completedTests]);

  if (!hasTests) {
    return (
      <div className="profile-map" style={{ maxWidth: '700px', margin: '0 auto', padding: '40px 20px' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '16px' }}>Mapa de Funcionamiento</h2>
        <div className="question-card" style={{ textAlign: 'center', padding: '32px' }}>
          <p style={{ fontSize: '1.05rem', color: '#6b7280', marginBottom: '16px' }}>
            Completa al menos 2 tests para ver tu mapa de funcionamiento combinado.
          </p>
          <p style={{ fontSize: '0.9rem', color: '#9ca3af', marginBottom: '24px' }}>
            Tus resultados se guardan en esta sesión del navegador. Al cerrar la pestaña se eliminan.
          </p>
          <button className="btn btn-primary" onClick={() => navigate('/')}>
            Ir a los tests
          </button>
        </div>
      </div>
    );
  }

  const handleClear = () => {
    clearCompletedTests();
    navigate('/');
  };

  const handleExportPDF = () => {
    const pdfData = testEntries.map(([testId, data]) => {
      const meta = TEST_LABELS[testId] || { name: testId };
      let maxScore = data.maxScores?.total ?? 64;

      const dimensionsData = [];
      const dims = data.dimensions;
      if (Array.isArray(dims)) {
        for (const d of dims) {
          dimensionsData.push({ label: d.label || d.key, score: d.score, max: d.max || 16 });
        }
      } else if (dims) {
        for (const [k, v] of Object.entries(dims)) {
          dimensionsData.push({ label: k, score: v, max: 16 });
        }
      }

      return {
        testTitle: meta.name,
        category: data.category,
        total: data.total,
        maxScore,
        dimensions: dimensionsData,
      };
    });
    exportResultsToPDF(pdfData);
  };

  return (
    <div className="profile-map" style={{ maxWidth: '800px', margin: '0 auto', padding: '40px 20px' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '8px' }}>Mapa de Funcionamiento</h2>
      <p style={{ textAlign: 'center', color: '#6b7280', fontSize: '0.9rem', marginBottom: '32px' }}>
        Basado en {testEntries.length} test{testEntries.length > 1 ? 's' : ''} completado{testEntries.length > 1 ? 's' : ''} en esta sesión
      </p>

      {/* Tests completados */}
      <div style={{ marginBottom: '32px', display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center' }}>
        {testEntries.map(([testId]) => {
          const meta = TEST_LABELS[testId] || { name: testId, color: '#6b7280' };
          return (
            <span key={testId} style={{
              background: meta.color, color: '#fff', padding: '6px 14px',
              borderRadius: '16px', fontSize: '0.85rem', fontWeight: 500,
            }}>
              {meta.name}
            </span>
          );
        })}
      </div>

      {/* Dimensiones combinadas */}
      {dimEntries.length > 0 && (
        <div style={{ marginBottom: '32px' }}>
          <h3 style={{ fontSize: '1rem', marginBottom: '16px', color: '#374151' }}>Todas las dimensiones evaluadas</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {dimEntries.map(([key, pct]) => (
              <div key={key} role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}
                aria-label={`${DIMENSION_LABELS[key] || key}: ${pct} por ciento`}
                style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ width: '180px', fontSize: '0.85rem', color: '#4b5563', textAlign: 'right', flexShrink: 0 }}>
                  {DIMENSION_LABELS[key] || key}
                </span>
                <div style={{ flex: 1, height: '20px', background: '#f3f4f6', borderRadius: '10px', overflow: 'hidden' }}>
                  <div style={{
                    width: `${pct}%`, height: '100%', borderRadius: '10px',
                    background: getBarColor(pct),
                    transition: 'width 0.5s ease',
                  }} />
                </div>
                <span style={{ width: '40px', fontSize: '0.8rem', color: '#6b7280', fontWeight: 600 }}>
                  {pct}%
                </span>
              </div>
            ))}
          </div>
          <p style={{ fontSize: '0.8rem', color: '#9ca3af', marginTop: '8px', textAlign: 'center' }}>
            Verde = área de fortaleza relativa · Violeta = zona intermedia · Ámbar = área de esfuerzo
          </p>
        </div>
      )}

      {/* Fortalezas + Áreas de esfuerzo */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '32px' }}>
        {strengths.length > 0 && (
          <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '10px', padding: '16px' }}>
            <h3 style={{ fontSize: '0.95rem', color: '#166534', marginBottom: '10px' }}>
              Fortalezas identificadas
            </h3>
            <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '0.85rem', color: '#15803d', lineHeight: 1.8 }}>
              {strengths.map((s) => (
                <li key={s.key}>{s.label}</li>
              ))}
            </ul>
          </div>
        )}

        {effortAreas.length > 0 && (
          <div style={{ background: '#fffbeb', border: '1px solid #fde68a', borderRadius: '10px', padding: '16px' }}>
            <h3 style={{ fontSize: '0.95rem', color: '#92400e', marginBottom: '10px' }}>
              Áreas que requieren estrategia
            </h3>
            <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '0.85rem', color: '#a16207', lineHeight: 1.8 }}>
              {effortAreas.map((a) => (
                <li key={a.key}>{a.label}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Estrategias sugeridas */}
      {strategies.length > 0 && (
        <div style={{ marginBottom: '32px' }}>
          <h3 style={{ fontSize: '1rem', marginBottom: '16px', color: '#374151' }}>Estrategias sugeridas para tu perfil</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {strategies.map((s) => (
              <div key={s.id} style={{
                background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px',
                padding: '16px',
              }}>
                <h4 style={{ fontSize: '0.95rem', marginBottom: '6px', color: '#1e293b' }}>{s.title}</h4>
                <p style={{ fontSize: '0.85rem', color: '#475569', margin: 0, lineHeight: 1.6 }}>{s.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* DAT especial */}
      {completedTests['dat-v1'] && (
        <div style={{ marginBottom: '32px', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '10px', padding: '16px' }}>
          <h3 style={{ fontSize: '0.95rem', color: '#991b1b', marginBottom: '8px' }}>
            Pensamiento Divergente: {completedTests['dat-v1'].total}/100
          </h3>
          <p style={{ fontSize: '0.85rem', color: '#7f1d1d', margin: 0 }}>
            {completedTests['dat-v1'].category === 'altamente-divergente'
              ? 'Tu mente salta entre dominios con facilidad. Eres un conector natural de ideas.'
              : completedTests['dat-v1'].category === 'moderadamente-divergente'
                ? 'Tienes buena flexibilidad cognitiva balanceada con coherencia.'
                : 'Tu pensamiento tiende a la profundidad dentro de dominios familiares.'}
          </p>
        </div>
      )}

      {/* Acciones */}
      <div style={{ textAlign: 'center', display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
        <button className="btn btn-secondary" onClick={() => navigate('/')}>
          Volver al inicio
        </button>
        <button className="btn btn-secondary" onClick={handleExportPDF}>
          Descargar PDF
        </button>
        <button className="btn btn-secondary" onClick={() => navigate('/historias')}>
          Historias de adaptación
        </button>
        <button className="btn btn-secondary" onClick={() => navigate('/recursos')}>
          Buscar ayuda profesional
        </button>
        <button className="btn btn-link" onClick={handleClear} style={{ fontSize: '0.85rem' }}>
          Limpiar resultados de sesión
        </button>
      </div>

      <p style={{ textAlign: 'center', fontSize: '0.8rem', color: '#9ca3af', marginTop: '32px' }}>
        Este mapa es orientativo. No constituye un diagnóstico ni un perfil clínico.
        Los resultados se guardan solo en esta sesión del navegador.
      </p>
    </div>
  );
}
