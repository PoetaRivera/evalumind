import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getComplementarityNotes, getResultHistory, saveResultContext } from '../../utils/sessionResults';
import { exportResultsToPDF } from '../../utils/pdfExport';
import { isRemoteCollectionEnabled } from '../../firebase/config';

const EMPTY_CONTEXT = {
  rest: '',
  stress: '',
  energy: '',
  environment: '',
  timeOfDay: '',
  support: '',
  note: '',
};

const CONTEXT_FIELDS = [
  {
    key: 'rest',
    label: 'Descanso',
    options: [
      ['', 'Sin registrar'],
      ['bajo', 'Bajo'],
      ['medio', 'Medio'],
      ['alto', 'Alto'],
    ],
  },
  {
    key: 'stress',
    label: 'Estrés',
    options: [
      ['', 'Sin registrar'],
      ['bajo', 'Bajo'],
      ['medio', 'Medio'],
      ['alto', 'Alto'],
    ],
  },
  {
    key: 'energy',
    label: 'Energía',
    options: [
      ['', 'Sin registrar'],
      ['baja', 'Baja'],
      ['media', 'Media'],
      ['alta', 'Alta'],
    ],
  },
  {
    key: 'environment',
    label: 'Ambiente',
    options: [
      ['', 'Sin registrar'],
      ['tranquilo', 'Tranquilo'],
      ['normal', 'Normal'],
      ['ruidoso', 'Ruidoso'],
      ['interrumpido', 'Interrumpido'],
    ],
  },
  {
    key: 'timeOfDay',
    label: 'Momento',
    options: [
      ['', 'Sin registrar'],
      ['manana', 'Mañana'],
      ['tarde', 'Tarde'],
      ['noche', 'Noche'],
    ],
  },
  {
    key: 'support',
    label: 'Apoyo usado',
    options: [
      ['', 'Sin registrar'],
      ['ninguno', 'Ninguno'],
      ['pausas', 'Pausas'],
      ['temporizador', 'Temporizador'],
      ['ambiente-adaptado', 'Ambiente adaptado'],
    ],
  },
];

const CATEGORY_LABELS = {
  'baja-probabilidad': 'Baja presencia reportada',
  'moderada-probabilidad': 'Presencia moderada reportada',
  'alta-probabilidad': 'Presencia alta reportada',
  'sensibilidad-promedio': 'Sensibilidad promedio',
  'alta-sensibilidad-moderada': 'Alta sensibilidad moderada',
  'alta-sensibilidad-marcada': 'Alta sensibilidad marcada',
  'alexitimia-baja': 'Procesamiento emocional fluido',
  'alexitimia-moderada': 'Alexitimia moderada',
  'alexitimia-marcada': 'Alexitimia marcada',
  'convergente': 'Pensamiento convergente',
  'moderadamente-divergente': 'Moderadamente divergente',
  'altamente-divergente': 'Altamente divergente',
  'rsd-moderada': 'RSD moderada',
  'rsd-marcada': 'RSD marcada',
  'bajo-burnout-masking': 'Burnout por masking bajo',
  'burnout-masking-moderado': 'Burnout por masking moderado',
  'burnout-masking-severo': 'Burnout por masking severo',
  'funciones-ejecutivas-preservadas': 'Funciones ejecutivas preservadas',
  'dificultades-ejecutivas-moderadas': 'Dificultades ejecutivas moderadas',
  'dificultades-ejecutivas-significativas': 'Dificultades ejecutivas significativas',
  'fluidez-baja': 'Fluidez verbal baja',
  'fluidez-normal': 'Fluidez verbal esperada',
  'fluidez-moderada': 'Fluidez verbal moderada',
  'fluidez-alta': 'Fluidez verbal alta',
  'sesgo-bajo': 'Sesgo de rechazo bajo',
  'sesgo-moderado': 'Sesgo de rechazo moderado',
  'sesgo-alto': 'Sesgo de rechazo alto',
  'baja-discrepancia': 'Baja auto-discrepancia',
  'discrepancia-moderada': 'Auto-discrepancia moderada',
  'alta-discrepancia': 'Alta auto-discrepancia',
  'reconocimiento-alto': 'Reconocimiento emocional alto',
  'reconocimiento-moderado': 'Reconocimiento emocional moderado',
  'reconocimiento-bajo': 'Reconocimiento emocional bajo',
  'atencion-optima': 'Atención sostenida óptima',
  'atencion-buena': 'Atención sostenida buena',
  'atencion-moderada': 'Atención sostenida moderada',
  'atencion-baja': 'Atención sostenida baja',
  'inhibicion-optima': 'Control inhibitorio óptimo',
  'inhibicion-buena': 'Control inhibitorio bueno',
  'inhibicion-reducida': 'Control inhibitorio reducido',
  'memoria-alta': 'Memoria de trabajo alta',
  'memoria-moderada': 'Memoria de trabajo moderada',
  'memoria-baja': 'Memoria de trabajo baja',
  'procesamiento-balanceado': 'Procesamiento balanceado',
  'precedencia-global': 'Precedencia global',
  'sesgo-local': 'Sesgo hacia el detalle',
  'mentalizacion-alta': 'Mentalización alta',
  'mentalizacion-moderada': 'Mentalización moderada',
  'mentalizacion-baja': 'Mentalización baja',
  'flexibilidad-alta': 'Flexibilidad cognitiva alta',
  'flexibilidad-moderada': 'Flexibilidad cognitiva moderada',
  'flexibilidad-baja': 'Flexibilidad cognitiva baja',
  'umbral-alto': 'Umbral sensorial alto',
  'umbral-moderado': 'Umbral sensorial moderado',
  'umbral-bajo': 'Umbral sensorial bajo',
  'baja-distractibilidad': 'Baja distractibilidad',
  'distractibilidad-moderada': 'Distractibilidad moderada',
  'alta-distractibilidad': 'Alta distractibilidad',
};

const CATEGORY_COLORS = {
  'baja-probabilidad': '#2e7d32',
  'moderada-probabilidad': '#e67e22',
  'alta-probabilidad': '#c0392b',
  'sensibilidad-promedio': '#2e7d32',
  'alta-sensibilidad-moderada': '#6c5ce7',
  'alta-sensibilidad-marcada': '#6c5ce7',
  'alexitimia-baja': '#2e7d32',
  'alexitimia-moderada': '#e67e22',
  'alexitimia-marcada': '#c0392b',
  'convergente': 'var(--color-bar-mid)',
  'moderadamente-divergente': 'var(--color-bar-high)',
  'altamente-divergente': 'var(--color-bar-low)',
  'rsd-moderada': '#ec4899',
  'rsd-marcada': '#be185d',
  'bajo-burnout-masking': '#2e7d32',
  'burnout-masking-moderado': '#e67e22',
  'burnout-masking-severo': '#c0392b',
  'funciones-ejecutivas-preservadas': '#2e7d32',
  'dificultades-ejecutivas-moderadas': '#e67e22',
  'dificultades-ejecutivas-significativas': '#c0392b',
  'fluidez-baja': 'var(--color-bar-high)',
  'fluidez-normal': 'var(--color-bar-mid)',
  'fluidez-moderada': 'var(--color-bar-mid)',
  'fluidez-alta': 'var(--color-bar-low)',
  'sesgo-bajo': '#2e7d32',
  'sesgo-moderado': '#e67e22',
  'sesgo-alto': '#c0392b',
  'baja-discrepancia': '#2e7d32',
  'discrepancia-moderada': '#e67e22',
  'alta-discrepancia': '#c0392b',
  'reconocimiento-alto': '#2e7d32',
  'reconocimiento-moderado': '#e67e22',
  'reconocimiento-bajo': '#c0392b',
  'atencion-optima': '#2e7d32',
  'atencion-buena': 'var(--color-bar-low)',
  'atencion-moderada': '#e67e22',
  'atencion-baja': '#c0392b',
  'inhibicion-optima': '#2e7d32',
  'inhibicion-buena': 'var(--color-bar-low)',
  'inhibicion-reducida': '#c0392b',
  'memoria-alta': '#2e7d32',
  'memoria-moderada': 'var(--color-bar-mid)',
  'memoria-baja': '#c0392b',
  'procesamiento-balanceado': 'var(--color-bar-low)',
  'precedencia-global': 'var(--color-bar-mid)',
  'sesgo-local': 'var(--color-bar-mid)',
  'mentalizacion-alta': '#2e7d32',
  'mentalizacion-moderada': '#e67e22',
  'mentalizacion-baja': '#c0392b',
  'flexibilidad-alta': '#2e7d32',
  'flexibilidad-moderada': '#e67e22',
  'flexibilidad-baja': '#c0392b',
  'umbral-alto': '#2e7d32',
  'umbral-moderado': '#e67e22',
  'umbral-bajo': 'var(--color-bar-mid)',
  'baja-distractibilidad': '#2e7d32',
  'distractibilidad-moderada': '#e67e22',
  'alta-distractibilidad': '#c0392b',
};

function RadarChart({ dimensions }) {
  const sides = dimensions.length;
  if (sides < 3) return null;

  const cx = 140;
  const cy = 120;
  const r = 90;
  const angleSlice = (2 * Math.PI) / sides;
  const startAngle = -Math.PI / 2;

  // Polígono exterior (100 %)
  const outer = Array.from({ length: sides }, (_, i) => {
    const angle = angleSlice * i + startAngle;
    return { x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) };
  });

  // Polígono de datos
  const values = dimensions.map((d) => Math.max(0.03, d.score / d.max));
  const data = Array.from({ length: sides }, (_, i) => {
    const angle = angleSlice * i + startAngle;
    return { x: cx + r * values[i] * Math.cos(angle), y: cy + r * values[i] * Math.sin(angle) };
  });

  const ticks = [0.25, 0.5, 0.75];
  const dataPoints = data.map((p) => `${p.x},${p.y}`).join(' ');

  // Ajustar altura del viewBox según número de lados
  const vbH = sides === 4 ? 250 : 240;

  return (
    <svg
      viewBox={`0 0 280 ${vbH}`}
      className="radar-chart"
      role="img"
      aria-label="Gráfico de perfil"
    >
      {/* Ticks concéntricos */}
      {ticks.map((t) => {
        const pts = Array.from({ length: sides }, (_, i) => {
          const angle = angleSlice * i + startAngle;
          return `${cx + r * t * Math.cos(angle)},${cy + r * t * Math.sin(angle)}`;
        }).join(' ');
        return (
          <polygon key={t} points={pts} fill="none" stroke="#d0d0d0" strokeWidth="1" />
        );
      })}

      {/* Ejes radiales */}
      {outer.map((p, i) => (
        <line key={i} x1={cx} y1={cy} x2={p.x} y2={p.y} stroke="#d0d0d0" strokeWidth="1" />
      ))}

      {/* Área de datos */}
      <polygon points={dataPoints} fill="rgba(74, 144, 217, 0.25)" stroke="#4a90d9" strokeWidth="2" />

      {/* Puntos */}
      {data.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r="4" fill="#4a90d9" />
      ))}

      {/* Etiquetas */}
      {dimensions.map((dim, i) => {
        const angle = angleSlice * i + startAngle;
        const dist = r + 40;

        // Para 4 lados, alternar labels arriba/abajo para evitar solapamiento
        let labelRadius = dist;
        if (sides === 4) {
          labelRadius = i === 0 || i === 3 ? r + 44 : r + 30;
        }

        const lx = cx + labelRadius * Math.cos(angle);
        const ly = cy + labelRadius * Math.sin(angle);

        // Romper etiquetas largas en 2 líneas
        const words = dim.label.split(' ');
        const mid = Math.ceil(words.length / 2);
        const line1 = words.slice(0, mid).join(' ');
        const line2 = words.slice(mid).join(' ');

        return (
          <text
            key={i}
            x={lx}
            y={ly}
            textAnchor="middle"
            dominantBaseline="middle"
            className="radar-label"
          >
            <tspan x={lx} dy={line2 ? '-0.4em' : '0'}>{line1}</tspan>
            {line2 && (
              <tspan x={lx} dy="1.2em">{line2}</tspan>
            )}
          </text>
        );
      })}
    </svg>
  );
}

function formatDate(ts) {
  return new Intl.DateTimeFormat('es', {
    day: '2-digit',
    month: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(ts));
}

function describeDelta(delta, direction) {
  if (delta === 0) return 'Sin cambio frente al intento anterior.';

  const abs = Math.abs(delta);
  const wentUp = delta > 0;

  if (direction === 'lower-is-better') {
    return wentUp
      ? `+${abs} puntos: más costo, errores o variabilidad que antes.`
      : `-${abs} puntos: menos costo, errores o variabilidad que antes.`;
  }

  if (direction === 'higher-is-better') {
    return wentUp
      ? `+${abs} puntos: mayor precisión o capacidad registrada que antes.`
      : `-${abs} puntos: menor precisión o capacidad registrada que antes.`;
  }

  if (direction === 'style') {
    return wentUp
      ? `+${abs} puntos frente al intento anterior; observa el contexto en que cambió.`
      : `-${abs} puntos frente al intento anterior; observa el contexto en que cambió.`;
  }

  return wentUp
    ? `+${abs} puntos: mayor presencia/intensidad reportada que antes.`
    : `-${abs} puntos: menor presencia/intensidad reportada que antes.`;
}

function loadTestHistory(testId) {
  return testId ? getResultHistory(testId).slice(-4) : [];
}

function hasContext(context) {
  return Object.values(context || {}).some(Boolean);
}

function contextOptionLabel(key, value) {
  const field = CONTEXT_FIELDS.find((item) => item.key === key);
  return field?.options.find(([optionValue]) => optionValue === value)?.[1] || value;
}

function contextSummary(context) {
  if (!hasContext(context)) return [];

  return [
    context.rest && `Descanso: ${contextOptionLabel('rest', context.rest)}`,
    context.stress && `Estrés: ${contextOptionLabel('stress', context.stress)}`,
    context.energy && `Energía: ${contextOptionLabel('energy', context.energy)}`,
    context.environment && `Ambiente: ${contextOptionLabel('environment', context.environment)}`,
    context.timeOfDay && `Momento: ${contextOptionLabel('timeOfDay', context.timeOfDay)}`,
    context.support && `Apoyo: ${contextOptionLabel('support', context.support)}`,
  ].filter(Boolean);
}

function ResultsView({ result, testId, loading, error, saved, remoteSaved, onRestart }) {
  const navigate = useNavigate();
  const [history, setHistory] = useState(() => loadTestHistory(testId));
  const [contextDraft, setContextDraft] = useState(EMPTY_CONTEXT);
  const [contextSaved, setContextSaved] = useState(false);
  const complementarityNotes = useMemo(
    () => testId ? getComplementarityNotes(testId) : [],
    [testId]
  );

  const dimensions = result.dimensions || [];
  const chartDimensions = dimensions.length >= 3 ? dimensions : [];
  const currentEntry = history.at(-1) || null;
  const previousResult = history.length > 1 ? history[history.length - 2] : null;
  const delta = previousResult ? result.total - previousResult.total : null;
  const scoreDirection = result.scoreDirection || previousResult?.scoreDirection || 'higher-is-more';
  const savedContextTags = contextSummary(currentEntry?.context);

  useEffect(() => {
    const nextHistory = loadTestHistory(testId);
    setHistory(nextHistory);

    const latest = nextHistory.at(-1);
    const latestContext = latest?.context || {};
    setContextDraft({ ...EMPTY_CONTEXT, ...latestContext });
    setContextSaved(hasContext(latestContext));
  }, [saved, testId, result.total]);

  const handleContextChange = (key, value) => {
    setContextDraft((current) => ({ ...current, [key]: value }));
    setContextSaved(false);
  };

  const handleContextSave = (event) => {
    event.preventDefault();
    const savedOk = saveResultContext(testId, currentEntry?.entryId || currentEntry?.completedAt, contextDraft);
    if (!savedOk) return;

    setHistory(loadTestHistory(testId));
    setContextSaved(true);
  };

  return (
    <div className="results-view">
      <h2>Resultados de autoobservación</h2>

      {/* Resumen principal */}
      <div className="results-summary">
        <div className="result-total">
          <span className="result-score" data-testid="result-score">{result.total}</span>
          <span className="result-max">de {result.maxScores.total}</span>
        </div>
        <div className="result-category" data-testid="result-category" style={{ color: CATEGORY_COLORS[result.category] }}>
          {CATEGORY_LABELS[result.category] || result.category || 'Resultado calculado'}
        </div>
        <p className="result-score-note">
          {result.scoreInterpretation || 'Este puntaje resume tu patrón en esta herramienta; interprétalo junto con el contexto, el cansancio y tu historial personal.'}
        </p>
      </div>

      {/* Gráfico radar (solo si hay ≥3 dimensiones) */}
      {chartDimensions.length >= 3 && (
        <div className="results-chart-container">
          <RadarChart dimensions={chartDimensions} />
        </div>
      )}

      {/* FAS / COWAT: palabras por ronda */}
      {result.rounds && (
        <div className="results-fas-words" style={{ marginBottom: '20px' }}>
          {result.rounds.map((round) => (
            <div key={round.letter} style={{ marginBottom: '16px' }}>
              <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', marginBottom: '4px' }}>
                <strong>Letra {round.letter}</strong> · {round.validCount} palabra{round.validCount !== 1 ? 's' : ''}
                {round.perseverations.length > 0 && (
                  <span style={{ color: 'var(--color-warning)', marginLeft: '8px' }}>
                    ⚠️ {round.perseverations.length} perseveración{round.perseverations.length !== 1 ? 'es' : ''}
                  </span>
                )}
              </p>
              {round.validWords.length > 0 && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {round.validWords.map((w, i) => (
                    <span key={i} style={{
                      background: 'var(--color-accent-subtle)', color: 'var(--color-accent-deep)', padding: '4px 12px',
                      borderRadius: '16px', fontSize: '0.85rem', border: '1px solid #bfdbfe',
                    }}>
                      {w}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
          <p style={{ fontSize: '0.9rem', color: 'var(--color-text)', marginTop: '8px', fontWeight: 600 }}>
            Total: {result.total} palabra{result.total !== 1 ? 's' : ''} válida{result.total !== 1 ? 's' : ''}
          </p>
        </div>
      )}

      {/* DAT: palabras usadas y métricas */}
      {result.wordsUsed && (
        <div className="results-dat-words" style={{ marginBottom: '20px' }}>
          <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', marginBottom: '8px' }}>
            {result.distinctCategories !== undefined && `${result.distinctCategories} dominios semánticos distintos`}
            {result.averageDistance !== undefined && ` · Distancia promedio: ${result.averageDistance}`}
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {result.wordsUsed.map((w, i) => (
              <span key={i} style={{
                background: 'var(--color-accent-subtle)', color: 'var(--color-accent-deep)', padding: '4px 12px',
                borderRadius: '16px', fontSize: '0.85rem', border: '1px solid #bfdbfe',
              }}>
                {w}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Desglose por dimensión */}
      {dimensions.length > 0 && (
        <div className="results-breakdown">
          <p className="results-scale-note">
            Lee cada barra por su etiqueta: algunas representan presencia o costo, y otras precisión o capacidad. No todas usan la misma dirección.
          </p>
          {dimensions.map((dim) => (
            <div className="breakdown-item" key={dim.key}>
              <span className="breakdown-label">{dim.label}</span>
              <div className="breakdown-bar">
                <div
                  className="breakdown-fill"
                  style={{ width: `${dim.max > 0 ? (dim.score / dim.max) * 100 : 0}%` }}
                />
              </div>
              <span className="breakdown-score">
                {dim.score}/{dim.max}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Patrones destacados */}
      {result.profiles && result.profiles.length > 0 && (
        <div className="results-profiles">
          <h3>Patrones destacados</h3>
          <ul>
            {result.profiles.map((p) => (
              <li key={p.id}>{p.label}</li>
            ))}
          </ul>
        </div>
      )}

      {/* DAT: tabla de pares más cercanos y lejanos */}
      {result.pairwiseDistances && result.pairwiseDistances.length > 0 && (
        <div className="results-dat-pairs" style={{ marginBottom: '20px' }}>
          <h3 style={{ fontSize: '1rem', marginBottom: '12px' }}>Pares de palabras</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <p style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-secondary)', marginBottom: '8px' }}>
                Más cercanos
              </p>
              <table style={{ width: '100%', fontSize: '0.85rem', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                    <th style={{ textAlign: 'left', padding: '6px 8px', color: 'var(--color-text-tertiary)' }}>Par</th>
                    <th style={{ textAlign: 'right', padding: '6px 8px', color: 'var(--color-text-tertiary)' }}>Distancia</th>
                  </tr>
                </thead>
                <tbody>
                  {result.pairwiseDistances.slice(0, 3).map((p, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid #f3f4f6' }}>
                      <td style={{ padding: '6px 8px' }}>{p.wordA} — {p.wordB}</td>
                      <td style={{ textAlign: 'right', padding: '6px 8px', fontFamily: 'monospace' }}>
                        {p.distance.toFixed(3)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div>
              <p style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-secondary)', marginBottom: '8px' }}>
                Más lejanos
              </p>
              <table style={{ width: '100%', fontSize: '0.85rem', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                    <th style={{ textAlign: 'left', padding: '6px 8px', color: 'var(--color-text-tertiary)' }}>Par</th>
                    <th style={{ textAlign: 'right', padding: '6px 8px', color: 'var(--color-text-tertiary)' }}>Distancia</th>
                  </tr>
                </thead>
                <tbody>
                  {result.pairwiseDistances.slice(-3).reverse().map((p, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid #f3f4f6' }}>
                      <td style={{ padding: '6px 8px' }}>{p.wordA} — {p.wordB}</td>
                      <td style={{ textAlign: 'right', padding: '6px 8px', fontFamily: 'monospace' }}>
                        {p.distance.toFixed(3)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Descripción */}
      <div className="results-description">
        <p>{result.description}</p>
      </div>

      {/* Nota de infancia / neurodesarrollo */}
      {result.childhoodNote && (
        <div className="results-childhood-note">
          <p>
            <strong>Importante:</strong> {result.childhoodNote}
          </p>
        </div>
      )}

      {history.length > 0 && (
        <div className="results-history">
          <h3>Historial personal local</h3>
          {previousResult && (
            <p className="results-history-delta">
              {describeDelta(delta, scoreDirection)}
            </p>
          )}
          <ul>
            {history.map((item) => (
              <li key={`${item.completedAt}-${item.total}`}>
                <span>{formatDate(item.completedAt)}</span>
                <strong>{item.total}/{item.maxScores?.total ?? result.maxScores?.total ?? 100}</strong>
              </li>
            ))}
          </ul>
        </div>
      )}

      <form className="results-context" onSubmit={handleContextSave}>
        <div className="results-context-header">
          <div>
            <h3>Contexto de este intento</h3>
            <p>Opcional y local. Ayuda a interpretar tendencias sin convertir un resultado aislado en conclusión.</p>
          </div>
          {contextSaved && <span className="results-context-saved">Guardado</span>}
        </div>
        <div className="results-context-grid">
          {CONTEXT_FIELDS.map((field) => (
            <label key={field.key} className="results-context-field">
              <span>{field.label}</span>
              <select
                data-testid={`context-${field.key}`}
                value={contextDraft[field.key]}
                onChange={(event) => handleContextChange(field.key, event.target.value)}
              >
                {field.options.map(([value, label]) => (
                  <option key={value} value={value}>{label}</option>
                ))}
              </select>
            </label>
          ))}
        </div>
        <label className="results-context-note">
          <span>Nota breve</span>
          <textarea
            value={contextDraft.note}
            maxLength={280}
            rows={3}
            placeholder="Ejemplo: dormí poco, había ruido, hice pausas o estaba con mucha carga mental."
            onChange={(event) => handleContextChange('note', event.target.value)}
          />
        </label>
        {savedContextTags.length > 0 && (
          <div className="results-context-tags" aria-label="Contexto guardado">
            {savedContextTags.map((tag) => <span key={tag}>{tag}</span>)}
          </div>
        )}
        <button className="btn btn-secondary" type="submit" disabled={!currentEntry}>
          Guardar contexto local
        </button>
      </form>

      {/* Notas de complementariedad entre tests */}
      {complementarityNotes.length > 0 && (
        <div className="results-complementarity" style={{
          background: 'var(--color-accent-light-bg)', border: '1px solid #bae6fd', borderRadius: '8px',
          padding: '14px 16px', marginBottom: '20px',
        }}>
          <p style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-accent-light-text)', marginBottom: '8px' }}>
            Nota sobre tus resultados combinados
          </p>
          {complementarityNotes.map((rule) => (
            <p key={rule.id} style={{ fontSize: '0.85rem', color: '#0c4a6e', margin: '0 0 8px 0' }}>
              {rule.note}
            </p>
          ))}
        </div>
      )}

      {/* Estado del guardado */}
      {loading && <p className="results-saving" data-testid="result-saving" aria-live="polite">Guardando resultados...</p>}

      {saved && (
        <p className="results-saved" data-testid="result-saved-local" aria-live="polite">
          Resultado guardado en el historial local de este navegador.
        </p>
      )}

      {remoteSaved && (
        <p className="results-saved" data-testid="result-saved-remote" aria-live="polite">
          Copia anónima agregada enviada correctamente.
        </p>
      )}

      {error && (
        <p className="results-error" data-testid="result-error" role="alert">
          {error}
        </p>
      )}

      {/* Acciones */}
      <div className="results-actions">
        <button
          className="btn btn-primary"
          data-testid="result-perfil"
          onClick={() => navigate('/perfil')}
          aria-label="Ver mi perfil"
        >
          Ver mi perfil
        </button>
        <button
          className="btn btn-secondary"
          data-testid="result-pdf"
          onClick={() => {
            const maxScore = result.maxScores?.total ?? (result.dimensions?.length > 0 ? 64 : 100);
            exportResultsToPDF([{
              testTitle: testId || 'Resultado EvaluMind',
              category: result.category,
              categoryLabel: CATEGORY_LABELS[result.category] || result.category,
              total: result.total,
              maxScore,
              description: result.description,
              dimensions: result.dimensions || [],
            }]);
          }}
          aria-label="Descargar resultados en PDF"
        >
          Descargar PDF
        </button>
        <button
          className="btn btn-secondary"
          data-testid="result-recursos"
          onClick={() => navigate('/recursos')}
          aria-label="Ver recursos de apoyo"
        >
          Recursos de apoyo
        </button>
        <button
          className="btn btn-secondary"
          data-testid="result-restart"
          onClick={() => {
            if (window.confirm('¿Volver a hacer el test? Tus resultados actuales se perderán.')) {
              onRestart();
            }
          }}
          aria-label="Volver a realizar el test"
        >
          Volver a hacer el test
        </button>
        <button
          className="btn btn-link"
          data-testid="result-home"
          onClick={() => navigate('/')}
          aria-label="Volver al inicio"
        >
          Volver al inicio
        </button>
      </div>

      <p style={{ textAlign: 'center', fontSize: '0.75rem', color: 'var(--color-text-tertiary)', marginTop: '20px' }}>
        Tu historial se guarda localmente en este navegador. {isRemoteCollectionEnabled ? 'El envío remoto opcional usa solo métricas agregadas, sin respuestas crudas.' : 'El envío remoto está desactivado en esta versión.'}
      </p>
    </div>
  );
}

export default ResultsView;
