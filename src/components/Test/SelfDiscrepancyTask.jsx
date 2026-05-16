import { useState, useCallback } from 'react';
import { calculateSelfDiscrepancyScore } from '../../utils/selfDiscrepancyScoring';

const TRAITS = [
  'Sociable', 'Espontáneo/a', 'Emocionalmente expresivo/a',
  'Seguro/a de mí mismo/a', 'Relajado/a', 'Hablar mucho',
  'Asertivo/a', 'Enérgico/a', 'Auténtico/a',
  'Tranquilo/a', 'Divertido/a', 'Cálido/a',
  'Extrovertido/a', 'Paciente', 'Ingenioso/a',
  'Ordenado/a', 'Empático/a', 'Independiente',
  'Optimista', 'Organizado/a', 'Creativo/a',
  'Callado/a', 'Sensible', 'Serio/a', 'Aventurero/a',
];

export default function SelfDiscrepancyTask({ onComplete }) {
  const [ratings, setRatings] = useState(
    TRAITS.map((trait) => ({ trait, publicSelf: 0, privateSelf: 0 })),
  );
  const [finished, setFinished] = useState(false);

  const updateRating = useCallback((index, field, value) => {
    setRatings((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], [field]: value };
      return next;
    });
  }, []);

  const handleFinish = () => {
    const complete = ratings.filter((r) => r.publicSelf > 0 && r.privateSelf > 0);
    const result = calculateSelfDiscrepancyScore(complete);
    setFinished(true);
    onComplete(result);
  };

  const completeCount = ratings.filter((r) => r.publicSelf > 0 && r.privateSelf > 0).length;
  const canFinish = completeCount >= 15;

  if (finished) return null;

  return (
    <div style={{ maxWidth: '650px', margin: '0 auto' }}>
      <div style={{ marginBottom: '24px', textAlign: 'center' }}>
        <h2 style={{ fontSize: '1.2rem', color: 'var(--color-task-heading)', marginBottom: '8px' }}>
          ¿Quién eres y quién muestras?
        </h2>
        <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
          Para cada rasgo, mueve los dos deslizadores:{' '}
          <strong style={{ color: 'var(--color-accent)' }}>arriba: cuánto lo MUESTRAS en público</strong> y{' '}
          <strong style={{ color: 'var(--color-bar-mid)' }}>abajo: cuánto SIENTES que realmente eres así</strong>.
        </p>
        <p style={{ fontSize: '0.8rem', color: 'var(--color-text-tertiary)' }}>
          {completeCount} de {TRAITS.length} rasgos completados
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {ratings.map((r, i) => (
          <div key={r.trait} style={{
            background: 'var(--color-on-accent)', borderRadius: '10px', padding: '12px 16px',
            boxShadow: '0 1px 4px rgba(0,0,0,0.06)', border: '1px solid #f0f0f0',
          }}>
            <div style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              marginBottom: '6px',
            }}>
              <span style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--color-task-heading)' }}>{r.trait}</span>
            </div>

            <div style={{ display: 'flex', gap: '16px' }}>
              {/* Public self slider */}
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2px' }}>
                  <span style={{ fontSize: '0.7rem', color: 'var(--color-accent)' }}>Muestro</span>
                  <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-accent)' }}>
                    {r.publicSelf || '?'}
                  </span>
                </div>
                <input
                  type="range"
                  min="1" max="7" value={r.publicSelf || 1}
                  onChange={(e) => updateRating(i, 'publicSelf', Number(e.target.value))}
                  style={{ width: '100%', accentColor: 'var(--color-accent)' }}
                />
              </div>

              {/* Private self slider */}
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2px' }}>
                  <span style={{ fontSize: '0.7rem', color: 'var(--color-bar-mid)' }}>Realmente soy</span>
                  <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-bar-mid)' }}>
                    {r.privateSelf || '?'}
                  </span>
                </div>
                <input
                  type="range"
                  min="1" max="7" value={r.privateSelf || 1}
                  onChange={(e) => updateRating(i, 'privateSelf', Number(e.target.value))}
                  style={{ width: '100%', accentColor: 'var(--color-bar-mid)' }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ textAlign: 'center', marginTop: '24px' }}>
        <button
          className="btn btn-primary"
          onClick={handleFinish}
          disabled={!canFinish}
          style={{ padding: '14px 40px' }}
        >
          Ver resultados ({completeCount}/{TRAITS.length})
        </button>
        <p style={{ fontSize: '0.8rem', color: 'var(--color-text-tertiary)', marginTop: '8px' }}>
          Completa al menos 15 de los 25 rasgos para ver resultados.
        </p>
      </div>
    </div>
  );
}
