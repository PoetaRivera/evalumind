import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { getComplementarityNotes } from '../../utils/sessionResults';
import { exportResultsToPDF } from '../../utils/pdfExport';

const CATEGORY_LABELS = {
  'baja-probabilidad': 'Baja probabilidad',
  'moderada-probabilidad': 'Moderada probabilidad',
  'alta-probabilidad': 'Alta probabilidad',
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
  'fluidez-moderada': 'Fluidez verbal moderada',
  'fluidez-alta': 'Fluidez verbal alta',
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
  'convergente': '#6366f1',
  'moderadamente-divergente': '#f59e0b',
  'altamente-divergente': '#10b981',
  'rsd-moderada': '#ec4899',
  'rsd-marcada': '#be185d',
  'bajo-burnout-masking': '#2e7d32',
  'burnout-masking-moderado': '#e67e22',
  'burnout-masking-severo': '#c0392b',
  'funciones-ejecutivas-preservadas': '#2e7d32',
  'dificultades-ejecutivas-moderadas': '#e67e22',
  'dificultades-ejecutivas-significativas': '#c0392b',
  'fluidez-baja': '#f59e0b',
  'fluidez-moderada': '#6366f1',
  'fluidez-alta': '#10b981',
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
  const outerPoints = outer.map((p) => `${p.x},${p.y}`).join(' ');
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

function ResultsView({ result, testId, loading, error, saved, onRestart }) {
  const navigate = useNavigate();
  const complementarityNotes = useMemo(
    () => testId ? getComplementarityNotes(testId) : [],
    [testId]
  );

  const dimensions = result.dimensions || [];
  const chartDimensions = dimensions.length >= 3 ? dimensions : [];

  return (
    <div className="results-view">
      <h2>Resultados del screening</h2>

      {/* Resumen principal */}
      <div className="results-summary">
        <div className="result-total">
          <span className="result-score">{result.total}</span>
          <span className="result-max">de {result.maxScores.total}</span>
        </div>
        <div className="result-category" style={{ color: CATEGORY_COLORS[result.category] }}>
          {CATEGORY_LABELS[result.category]}
        </div>
      </div>

      {/* Gráfico radar (solo si hay ≥3 dimensiones) */}
      {chartDimensions.length >= 3 && (
        <div className="results-chart-container">
          <RadarChart dimensions={chartDimensions} />
        </div>
      )}

      {/* FAS: palabras generadas */}
      {result.words && !result.wordsUsed && (
        <div className="results-fas-words" style={{ marginBottom: '20px' }}>
          <p style={{ fontSize: '0.9rem', color: '#6b7280', marginBottom: '4px' }}>
            Letra: <strong>{result.letter}</strong> · {result.fluency ?? result.words.length} palabras · {result.flexibility ?? '—'} categorías
            {result.hasPerseveration && (
              <span style={{ color: '#d97706', marginLeft: '8px' }}>⚠️ Tendencia a perseveración</span>
            )}
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {result.words.map((w, i) => (
              <span key={i} style={{
                background: '#eff6ff', color: '#1e40af', padding: '4px 12px',
                borderRadius: '16px', fontSize: '0.85rem', border: '1px solid #bfdbfe',
              }}>
                {w}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* DAT: palabras usadas y métricas */}
      {result.wordsUsed && (
        <div className="results-dat-words" style={{ marginBottom: '20px' }}>
          <p style={{ fontSize: '0.9rem', color: '#6b7280', marginBottom: '8px' }}>
            {result.distinctCategories !== undefined && `${result.distinctCategories} dominios semánticos distintos`}
            {result.averageDistance !== undefined && ` · Distancia promedio: ${result.averageDistance}`}
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {result.wordsUsed.map((w, i) => (
              <span key={i} style={{
                background: '#eff6ff', color: '#1e40af', padding: '4px 12px',
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

      {/* Perfiles detectados */}
      {result.profiles && result.profiles.length > 0 && (
        <div className="results-profiles">
          <h3>Perfil detectado</h3>
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
              <p style={{ fontSize: '0.85rem', fontWeight: 600, color: '#6b7280', marginBottom: '8px' }}>
                Más cercanos
              </p>
              <table style={{ width: '100%', fontSize: '0.85rem', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                    <th style={{ textAlign: 'left', padding: '6px 8px', color: '#9ca3af' }}>Par</th>
                    <th style={{ textAlign: 'right', padding: '6px 8px', color: '#9ca3af' }}>Distancia</th>
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
              <p style={{ fontSize: '0.85rem', fontWeight: 600, color: '#6b7280', marginBottom: '8px' }}>
                Más lejanos
              </p>
              <table style={{ width: '100%', fontSize: '0.85rem', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                    <th style={{ textAlign: 'left', padding: '6px 8px', color: '#9ca3af' }}>Par</th>
                    <th style={{ textAlign: 'right', padding: '6px 8px', color: '#9ca3af' }}>Distancia</th>
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

      {/* Notas de complementariedad entre tests */}
      {complementarityNotes.length > 0 && (
        <div className="results-complementarity" style={{
          background: '#f0f9ff', border: '1px solid #bae6fd', borderRadius: '8px',
          padding: '14px 16px', marginBottom: '20px',
        }}>
          <p style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0369a1', marginBottom: '8px' }}>
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
      {loading && <p className="results-saving" aria-live="polite">Guardando resultados...</p>}

      {error && (
        <p className="results-error" role="alert">
          No se pudieron guardar los resultados, pero puedes ver tu puntuación igualmente.
        </p>
      )}

      {saved && <p className="results-saved" aria-live="polite">Resultados guardados de forma anónima.</p>}

      {/* Acciones */}
      <div className="results-actions">
        <button
          className="btn btn-primary"
          onClick={() => navigate('/recursos')}
          aria-label="Buscar ayuda profesional"
        >
          Buscar ayuda profesional
        </button>
        <button
          className="btn btn-secondary"
          onClick={() => {
            const maxScore = result.maxScores?.total ?? (result.dimensions?.length > 0 ? 64 : 100);
            exportResultsToPDF([{
              testTitle: testId || 'Resultado NeuroScreen',
              category: result.category,
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
          onClick={onRestart}
          aria-label="Volver a realizar el test"
        >
          Volver a hacer el test
        </button>
        <button
          className="btn btn-link"
          onClick={() => navigate('/perfil')}
          aria-label="Ver mapa de funcionamiento"
        >
          Ver mi perfil combinado
        </button>
        <button
          className="btn btn-link"
          onClick={() => navigate('/')}
          aria-label="Volver al inicio"
        >
          Volver al inicio
        </button>
      </div>
    </div>
  );
}

export default ResultsView;
