import { useState, useCallback } from 'react';
import RMET_STIMULI from '../../data/rmetStimuli';
import { calculateRmetScore } from '../../utils/rmetScoring';

export default function RMETTask({ onComplete }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [responses, setResponses] = useState([]);
  const [finished, setFinished] = useState(false);

  const trial = RMET_STIMULI[currentIndex];
  const currentResp = responses[currentIndex];

  const handleSelect = useCallback((optionIndex) => {
    if (currentResp) return;
    setResponses((prev) => {
      const next = [...prev];
      next[currentIndex] = { trialId: trial.id, selected: optionIndex, correct: trial.correct };
      return next;
    });
  }, [currentIndex, currentResp, trial]);

  const handleNext = () => {
    if (currentIndex < RMET_STIMULI.length - 1) {
      setCurrentIndex((i) => i + 1);
    } else {
      const result = calculateRmetScore(responses);
      setFinished(true);
      onComplete(result);
    }
  };

  if (finished) return null;

  const answered = !!currentResp;

  return (
    <div style={{ maxWidth: '550px', margin: '0 auto' }}>
      <div style={{
        display: 'flex', justifyContent: 'space-between', marginBottom: '8px',
        fontSize: '0.85rem', color: 'var(--color-text-secondary)',
      }}>
        <span>Ítem {currentIndex + 1} de {RMET_STIMULI.length}</span>
        <span>{responses.filter(Boolean).length} respondidos</span>
      </div>

      <div style={{
        height: '4px', background: 'var(--color-border-light)', borderRadius: '2px',
        marginBottom: '20px', overflow: 'hidden',
      }}>
        <div style={{
          height: '100%', width: `${((currentIndex + 1) / RMET_STIMULI.length) * 100}%`,
          background: 'var(--color-bar-mid)', borderRadius: '2px', transition: 'width 0.3s ease',
        }} />
      </div>

      <div className="question-card" style={{ marginBottom: '20px' }}>
        <div style={{
          width: '100%', padding: '40px 20px', textAlign: 'center',
          background: 'var(--color-bg)', borderRadius: '12px', marginBottom: '20px',
          border: '2px solid #e2e8f0',
        }}>
          <span style={{ fontSize: '3rem' }}>👁️</span>
          <p style={{
            fontSize: '0.95rem', lineHeight: 1.7, color: 'var(--color-task-heading)',
            marginTop: '12px', fontStyle: 'italic',
          }}>
            {trial.description}
          </p>
        </div>

        <p style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text)', marginBottom: '10px' }}>
          ¿Qué está pensando o sintiendo esta persona?
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {trial.options.map((opt, i) => {
            const isSelected = currentResp?.selected === i;
            const isCorrect = answered && i === trial.correct;
            const isWrong = answered && isSelected && i !== trial.correct;

            return (
              <button
                key={i}
                type="button"
                onClick={() => handleSelect(i)}
                disabled={answered}
                style={{
                  textAlign: 'left', padding: '12px 16px', borderRadius: '8px',
                  border: '2px solid',
                  borderColor: isCorrect ? 'var(--color-success)' : isWrong ? 'var(--color-danger)' : isSelected ? 'var(--color-bar-mid)' : 'var(--color-border)',
                  background: isCorrect ? 'var(--color-success-bg)' : isWrong ? 'var(--color-danger-bg)' : isSelected ? 'var(--color-accent-subtle-alt)' : 'var(--color-on-accent)',
                  cursor: answered ? 'default' : 'pointer', fontSize: '0.95rem',
                  color: isCorrect ? 'var(--color-success-text)' : isWrong ? 'var(--color-danger-text)' : 'var(--color-task-heading)',
                  opacity: answered && !isSelected && !isCorrect ? 0.5 : 1,
                }}
              >
                {answered && isCorrect && <span style={{ marginRight: '8px', color: 'var(--color-success)' }}>✓ </span>}
                {answered && isWrong && <span style={{ marginRight: '8px', color: 'var(--color-danger)' }}>✗ </span>}
                {opt}
              </button>
            );
          })}
        </div>
      </div>

      {answered && (
        <div style={{ textAlign: 'center' }}>
          <button className="btn btn-primary" onClick={handleNext}>
            {currentIndex < RMET_STIMULI.length - 1 ? 'Siguiente' : 'Ver resultados'}
          </button>
        </div>
      )}
    </div>
  );
}
