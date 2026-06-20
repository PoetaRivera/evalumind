import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCompletedTests, clearCompletedTests, getResultHistory } from '../../utils/sessionResults';
import { exportResultsToPDF } from '../../utils/pdfExport';

const TEST_LABELS = {
  'tdah-adult-v2': { name: 'Atención e impulsividad', color: 'var(--color-accent)' },
  'tea-adult-v1': { name: 'Rasgos sociales/sensoriales', color: 'var(--color-bar-mid)' },
  'hsp-adult-v1': { name: 'Alta Sensibilidad', color: 'var(--color-bar-low)' },
  'alexitimia-adult-v1': { name: 'Alexitimia', color: 'var(--color-bar-high)' },
  'rsd-adult-v1': { name: 'RSD', color: '#ec4899' },
  'burnout-masking-v1': { name: 'Burnout Masking', color: 'var(--color-bar-high)' },
  'funciones-ejecutivas-v1': { name: 'F. Ejecutivas', color: '#14b8a6' },
  'dat-v1': { name: 'DAT', color: '#ef4444' },
  'fas-v1': { name: 'FAS', color: 'var(--color-bar-mid)' },
  'social-scenarios-v1': { name: 'Escenarios RSD', color: '#ec4899' },
  'self-discrepancy-v1': { name: 'Auto-Discrepancia', color: 'var(--color-bar-high)' },
  'fer-v1': { name: 'Reconocimiento Emocional', color: 'var(--color-bar-high)' },
  'sart-v1': { name: 'Atención (SART)', color: 'var(--color-accent)' },
  'flanker-v1': { name: 'Flanker', color: 'var(--color-accent)' },
  'digit-span-v1': { name: 'Span Dígitos', color: '#14b8a6' },
  'navon-v1': { name: 'Navon', color: 'var(--color-bar-mid)' },
  'rmet-v1': { name: 'Estados Mentales', color: 'var(--color-bar-mid)' },
  'switch-task-v1': { name: 'Flexibilidad', color: '#14b8a6' },
  'sensory-threshold-v1': { name: 'Umbral Sensorial', color: 'var(--color-bar-low)' },
  'auditory-distraction-v1': { name: 'Distracción Auditiva', color: 'var(--color-bar-low)' },
};

const CATEGORY_LABELS = {
  'baja-probabilidad': 'Baja presencia reportada',
  'moderada-probabilidad': 'Presencia moderada reportada',
  'alta-probabilidad': 'Presencia alta reportada',
};

const DIMENSION_LABELS = {
  inattention: 'Inatención',
  hyperactivityPhysical: 'Hiperactividad física',
  hyperactivityImpulsivity: 'Hiperactividad-Impulsividad',
  impulsivityVerbal: 'Impulsividad verbal',
  aqTotal: 'AQ-50',
  deepProcessing: 'Procesamiento profundo',
  overStimulation: 'Sobrestimulación',
  emotionalIntensity: 'Intensidad emocional',
  sensorySensitivity: 'Sensibilidad sensorial',
  identifyingFeelings: 'Identificación emocional (DIF)',
  describingFeelings: 'Descripción emocional (DDF)',
  externallyOriented: 'Pensamiento externo (EOT)',
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
  emotionalImpact: 'Impacto emocional',
  selfDiscrepancy: 'Brecha auténtico/público',
  maskingEffort: 'Esfuerzo de camuflaje',
  emotionRecognition: 'Reconocimiento emocional',
  negativeEmotionRecognition: 'Reconocimiento de emociones negativas',
  sustainedAttention: 'Atención sostenida',
  responseInhibition: 'Inhibición de respuesta',
  rtVariability: 'Variabilidad de respuesta',
  interferenceControl: 'Control de interferencia',
  flankerEffectMs: 'Efecto Flanker',
  forwardSpan: 'Span directo',
  backwardSpan: 'Span inverso',
  localBias: 'Sesgo hacia el detalle',
  globalPrecedence: 'Precedencia global',
  theoryOfMind: 'Teoría de la mente',
  switchCost: 'Costo de cambio',
  switchCostMs: 'Costo de cambio en ms',
  sensoryThreshold: 'Umbral sensorial',
  distractibility: 'Distractibilidad auditiva',
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
    condition: (dims) => (dims.aqTotal || 0) > 60 && ((dims.identifyingFeelings || 0) > 40 || (dims.describingFeelings || 0) > 40),
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
    condition: (dims) => ((dims.sensorySensitivity || 0) > 50 || (dims.identifyingFeelings || 0) > 55),
    title: 'Diseño sensorial del entorno',
    description:
      'Tu sistema nervioso capta lo que otros filtran. Diseña tu espacio: luces cálidas, ruido controlado, ' +
      'texturas que te calmen. No es un lujo: es una forma de cuidar tu sistema nervioso.',
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

function findLowerAreas(dimensions) {
  return Object.entries(dimensions)
    .filter(([, pct]) => pct <= 35)
    .map(([key]) => ({
      key,
      label: DIMENSION_LABELS[key] || key,
      type: 'lower',
    }));
}

function findHigherAreas(dimensions) {
  return Object.entries(dimensions)
    .filter(([, pct]) => pct >= 65)
    .map(([key]) => ({
      key,
      label: DIMENSION_LABELS[key] || key,
      type: 'higher',
    }));
}

function findStrategies(dimensions, completedTests) {
  return STRATEGIES.filter((s) => s.condition(dimensions, completedTests));
}

function getBarColor(pct) {
  if (pct > 60) return 'var(--color-bar-high)';
  if (pct > 40) return 'var(--color-bar-mid)';
  return 'var(--color-bar-low)';
}

export default function ProfileMap() {
  const navigate = useNavigate();
  const completedTests = useMemo(() => getCompletedTests(), []);
  const testEntries = Object.entries(completedTests);
  const hasTests = testEntries.length > 0;

  const dimensions = useMemo(() => normalizeDimensions(completedTests), [completedTests]);
  const dimEntries = useMemo(() => Object.entries(dimensions).sort((a, b) => b[1] - a[1]), [dimensions]);
  const lowerAreas = useMemo(() => findLowerAreas(dimensions), [dimensions]);
  const higherAreas = useMemo(() => findHigherAreas(dimensions), [dimensions]);
  const strategies = useMemo(() => findStrategies(dimensions, completedTests), [dimensions, completedTests]);
  const history = useMemo(() => getResultHistory().slice(-6).reverse(), []);

  if (!hasTests) {
    return (
      <div className="profile-map" style={{ maxWidth: '700px', margin: '0 auto', padding: '40px 20px' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '16px' }}>Mapa Personal de Funcionamiento</h2>
        <div className="question-card" style={{ textAlign: 'center', padding: '32px' }}>
          <p style={{ fontSize: '1.05rem', color: 'var(--color-text-secondary)', marginBottom: '16px' }}>
            Completa al menos una herramienta para ver tu mapa personal de funcionamiento.
          </p>
          <p style={{ fontSize: '0.9rem', color: 'var(--color-text-tertiary)', marginBottom: '24px' }}>
            Tu mapa local se arma con el historial guardado en este navegador.
          </p>
          <button className="btn btn-primary" onClick={() => navigate('/')}>
            Ir a los tests
          </button>
        </div>
      </div>
    );
  }

  const handleClear = () => {
    if (window.confirm('¿Borrar tu mapa e historial local? Los datos guardados en este navegador se perderán permanentemente.')) {
      clearCompletedTests();
      navigate('/');
    }
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
        categoryLabel: CATEGORY_LABELS[data.category] || data.category,
        total: data.total,
        maxScore,
        dimensions: dimensionsData,
      };
    });
    exportResultsToPDF(pdfData);
  };

  return (
    <div className="profile-map" style={{ maxWidth: '800px', margin: '0 auto', padding: '40px 20px' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '8px' }}>Mapa Personal de Funcionamiento</h2>
      <p style={{ textAlign: 'center', color: 'var(--color-text-secondary)', fontSize: '0.9rem', marginBottom: '32px' }}>
        Basado en {testEntries.length} resultado{testEntries.length > 1 ? 's' : ''} reciente{testEntries.length > 1 ? 's' : ''} guardado{testEntries.length > 1 ? 's' : ''} en este navegador
      </p>

      {/* Tests completados */}
      <div style={{ marginBottom: '32px', display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center' }}>
        {testEntries.map(([testId]) => {
          const meta = TEST_LABELS[testId] || { name: testId, color: 'var(--color-text-secondary)' };
          return (
            <span key={testId} style={{
              background: meta.color, color: 'var(--color-on-accent)', padding: '6px 14px',
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
          <h3 style={{ fontSize: '1rem', marginBottom: '16px', color: 'var(--color-text)' }}>Todas las dimensiones evaluadas</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {dimEntries.map(([key, pct]) => (
              <div key={key} role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}
                aria-label={`${DIMENSION_LABELS[key] || key}: ${pct} por ciento`}
                style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ width: '180px', fontSize: '0.85rem', color: 'var(--color-text-secondary)', textAlign: 'right', flexShrink: 0 }}>
                  {DIMENSION_LABELS[key] || key}
                </span>
                <div style={{ flex: 1, height: '20px', background: 'var(--color-border-light)', borderRadius: '10px', overflow: 'hidden' }}>
                  <div style={{
                    width: `${pct}%`, height: '100%', borderRadius: '10px',
                    background: getBarColor(pct),
                    transition: 'width 0.5s ease',
                  }} />
                </div>
                <span style={{ width: '40px', fontSize: '0.8rem', color: 'var(--color-text-secondary)', fontWeight: 600 }}>
                  {pct}%
                </span>
              </div>
            ))}
          </div>
          <p style={{ fontSize: '0.8rem', color: 'var(--color-text-tertiary)', marginTop: '8px', textAlign: 'center' }}>
            Las barras comparan dimensiones dentro de su propia escala. En algunas, más alto significa mayor presencia o costo; en otras, mayor precisión.
          </p>
        </div>
      )}

      {/* Áreas bajas + áreas altas */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '32px' }}>
        {lowerAreas.length > 0 && (
          <div style={{ background: 'var(--color-success-bg)', border: '1px solid #bbf7d0', borderRadius: '10px', padding: '16px' }}>
            <h3 style={{ fontSize: '0.95rem', color: 'var(--color-success-text)', marginBottom: '10px' }}>
              Menor presencia o costo
            </h3>
            <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '0.85rem', color: 'var(--color-success-text)', lineHeight: 1.8 }}>
              {lowerAreas.map((s) => (
                <li key={s.key}>{s.label}</li>
              ))}
            </ul>
          </div>
        )}

        {higherAreas.length > 0 && (
          <div style={{ background: 'var(--color-warning-bg)', border: '1px solid #fde68a', borderRadius: '10px', padding: '16px' }}>
            <h3 style={{ fontSize: '0.95rem', color: 'var(--color-warning-text)', marginBottom: '10px' }}>
              Mayor presencia, costo o precisión
            </h3>
            <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '0.85rem', color: 'var(--color-warning-text)', lineHeight: 1.8 }}>
              {higherAreas.map((a) => (
                <li key={a.key}>{a.label}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Estrategias sugeridas */}
      {strategies.length > 0 && (
        <div style={{ marginBottom: '32px' }}>
          <h3 style={{ fontSize: '1rem', marginBottom: '16px', color: 'var(--color-text)' }}>Estrategias sugeridas para tu perfil</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {strategies.map((s) => (
              <div key={s.id} style={{
                background: 'var(--color-bg)', border: '1px solid #e2e8f0', borderRadius: '10px',
                padding: '16px',
              }}>
                <h4 style={{ fontSize: '0.95rem', marginBottom: '6px', color: 'var(--color-text)' }}>{s.title}</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', margin: 0, lineHeight: 1.6 }}>{s.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* DAT especial */}
      {completedTests['dat-v1'] && (
        <div style={{ marginBottom: '32px', background: 'var(--color-danger-bg)', border: '1px solid #fecaca', borderRadius: '10px', padding: '16px' }}>
          <h3 style={{ fontSize: '0.95rem', color: 'var(--color-danger-text)', marginBottom: '8px' }}>
            Pensamiento Divergente: {completedTests['dat-v1'].total}/100
          </h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--color-danger-text)', margin: 0 }}>
            {completedTests['dat-v1'].category === 'altamente-divergente'
              ? 'Tu mente salta entre dominios con facilidad. Eres un conector natural de ideas.'
              : completedTests['dat-v1'].category === 'moderadamente-divergente'
                ? 'Tienes buena flexibilidad cognitiva balanceada con coherencia.'
                : 'Tu pensamiento tiende a la profundidad dentro de dominios familiares.'}
          </p>
        </div>
      )}

      {history.length > 0 && (
        <div style={{ marginBottom: '32px', background: 'var(--color-bg)', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '16px' }}>
          <h3 style={{ fontSize: '1rem', marginBottom: '12px', color: 'var(--color-text)' }}>Historial reciente</h3>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {history.map((item) => {
              const meta = TEST_LABELS[item.testId] || { name: item.testId };
              return (
                <li key={`${item.testId}-${item.completedAt}`} style={{ display: 'flex', justifyContent: 'space-between', gap: '12px', fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>
                  <span>{meta.name}</span>
                  <strong>{item.total}/{item.maxScores?.total ?? 100}</strong>
                </li>
              );
            })}
          </ul>
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
          Recursos de apoyo
        </button>
        <button className="btn btn-link" onClick={handleClear} style={{ fontSize: '0.85rem' }}>
          Limpiar datos locales
        </button>
      </div>

      <p style={{ textAlign: 'center', fontSize: '0.8rem', color: 'var(--color-text-tertiary)', marginTop: '32px' }}>
        Este mapa es personal y orientativo. No constituye diagnóstico ni perfil clínico.
        El historial se guarda localmente en este navegador.
      </p>
    </div>
  );
}
