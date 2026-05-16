import { useState, useCallback } from 'react';
import SOCIAL_SCENARIOS from '../../data/socialScenarios';
import { calculateSocialScenariosScore } from '../../utils/socialScenariosScoring';

export default function SocialScenariosTask({ onComplete }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [responses, setResponses] = useState([]);
  const [finished, setFinished] = useState(false);

  const scenario = SOCIAL_SCENARIOS[currentIndex];
  const total = SOCIAL_SCENARIOS.length;
  const currentResp = responses[currentIndex] || {};

  const updateResponse = useCallback(
    (field, value) => {
      setResponses((prev) => {
        const next = [...prev];
        next[currentIndex] = { ...next[currentIndex], scenarioId: scenario.id, [field]: value };
        return next;
      });
    },
    [currentIndex, scenario?.id],
  );

  const handleNext = () => {
    if (currentIndex < total - 1) {
      setCurrentIndex((i) => i + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((i) => i - 1);
    }
  };

  const handleFinish = () => {
    const result = calculateSocialScenariosScore(responses);
    setFinished(true);
    onComplete(result);
  };

  const isComplete = currentResp.choice && currentResp.impact;
  const allComplete = responses.filter((r) => r?.choice && r?.impact).length;
  const canFinish = allComplete >= 8;

  if (finished) return null;

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        marginBottom: '16px', fontSize: '0.85rem', color: 'var(--color-text-secondary)',
      }}>
        <span>Escenario {currentIndex + 1} de {total}</span>
        <span>{allComplete} de {total} respondidos</span>
      </div>

      <div style={{
        height: '4px', background: 'var(--color-border-light)', borderRadius: '2px',
        marginBottom: '24px', overflow: 'hidden',
      }}>
        <div style={{
          height: '100%', width: `${((currentIndex + 1) / total) * 100}%`,
          background: 'var(--color-accent)', borderRadius: '2px', transition: 'width 0.3s ease',
        }} />
      </div>

      <div className="question-card" style={{ marginBottom: '20px' }}>
        <p style={{
          fontSize: '1.05rem', lineHeight: 1.7, color: 'var(--color-task-heading)',
          marginBottom: '24px', fontStyle: 'italic',
        }}>
          "{scenario.scenario}"
        </p>

        <div style={{ marginBottom: '20px' }}>
          <p style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text)', marginBottom: '10px' }}>
            ¿Cuál es la interpretación más probable?
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{
              display: 'flex', alignItems: 'center', gap: '10px', padding: '12px',
              border: `2px solid ${currentResp.choice === 'rejection' ? 'var(--color-danger)' : 'var(--color-border)'}`,
              borderRadius: '8px', cursor: 'pointer',
              background: currentResp.choice === 'rejection' ? 'var(--color-danger-bg)' : 'var(--color-on-accent)',
            }}>
              <input
                type="radio"
                name={`scenario-${scenario.id}`}
                checked={currentResp.choice === 'rejection'}
                onChange={() => updateResponse('choice', 'rejection')}
                style={{ accentColor: 'var(--color-danger)' }}
              />
              <span style={{ fontSize: '0.9rem', color: 'var(--color-danger-text)' }}>{scenario.rejection}</span>
            </label>
            <label style={{
              display: 'flex', alignItems: 'center', gap: '10px', padding: '12px',
              border: `2px solid ${currentResp.choice === 'benign' ? 'var(--color-success)' : 'var(--color-border)'}`,
              borderRadius: '8px', cursor: 'pointer',
              background: currentResp.choice === 'benign' ? 'var(--color-success-bg)' : 'var(--color-on-accent)',
            }}>
              <input
                type="radio"
                name={`scenario-${scenario.id}`}
                checked={currentResp.choice === 'benign'}
                onChange={() => updateResponse('choice', 'benign')}
                style={{ accentColor: 'var(--color-success)' }}
              />
              <span style={{ fontSize: '0.9rem', color: 'var(--color-success-text)' }}>{scenario.benign}</span>
            </label>
          </div>
        </div>

        {currentResp.choice && (
          <div style={{ marginBottom: '12px' }}>
            <p style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text)', marginBottom: '6px' }}>
              ¿Cuánto te afectaría emocionalmente esta situación? (1 = nada, 5 = muchísimo)
            </p>
            <div style={{ display: 'flex', gap: '8px' }}>
              {[1, 2, 3, 4, 5].map((val) => (
                <button
                  key={val}
                  type="button"
                  onClick={() => updateResponse('impact', val)}
                  style={{
                    flex: 1, padding: '10px', borderRadius: '8px', border: '2px solid',
                    borderColor: currentResp.impact === val ? 'var(--color-accent)' : 'var(--color-border)',
                    background: currentResp.impact === val ? 'var(--color-accent-subtle)' : 'var(--color-on-accent)',
                    color: currentResp.impact === val ? 'var(--color-accent-deep)' : 'var(--color-text-secondary)',
                    cursor: 'pointer', fontSize: '0.95rem', fontWeight: 600,
                  }}
                >
                  {val}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px', marginBottom: '24px' }}>
        <button
          className="btn btn-secondary"
          onClick={handlePrev}
          disabled={currentIndex === 0}
        >
          Anterior
        </button>
        {currentIndex < total - 1 ? (
          <button
            className="btn btn-primary"
            onClick={handleNext}
            disabled={!isComplete}
          >
            Siguiente
          </button>
        ) : (
          <button
            className="btn btn-primary"
            onClick={handleFinish}
            disabled={!canFinish}
          >
            Ver resultados ({allComplete}/{total})
          </button>
        )}
      </div>

      <p style={{ fontSize: '0.8rem', color: 'var(--color-text-tertiary)', textAlign: 'center' }}>
        Responde al menos 8 de los 16 escenarios para ver resultados.
      </p>
    </div>
  );
}
