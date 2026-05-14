import { useState, useCallback } from 'react';
import RMET_STIMULI from '../../data/rmetStimuli';

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
      const correct = responses.filter((r) => r.selected === r.correct).length;
      const accuracyPct = Math.round((correct / RMET_STIMULI.length) * 100);

      let category;
      let description;
      if (accuracyPct >= 75) {
        category = 'mentalizacion-alta';
        description = `Reconoces correctamente estados mentales en el ${accuracyPct}% de los casos. Tu teoría de la mente parece estar en un rango típico.`;
      } else if (accuracyPct >= 55) {
        category = 'mentalizacion-moderada';
        description = `Identificas correctamente el ${accuracyPct}% de los estados mentales. Puede haber cierta dificultad en situaciones sociales sutiles.`;
      } else {
        category = 'mentalizacion-baja';
        description = `Tu precisión en teoría de la mente es del ${accuracyPct}%, por debajo de lo esperado. Esto puede reflejar dificultades en cognición social, un patrón frecuente en el espectro autista.`;
      }

      const result = {
        total: accuracyPct,
        correct,
        totalTrials: RMET_STIMULI.length,
        dimensions: [
          { key: 'theoryOfMind', label: 'Teoría de la mente', score: accuracyPct, max: 100 },
        ],
        maxScores: { total: 100 },
        profiles: accuracyPct < 60
          ? [{ id: 'deficit-mentalizacion', label: 'Dificultad en mentalización', dimension: 'theoryOfMind' }]
          : [],
        category,
        description,
        childhoodNote:
          'La teoría de la mente (capacidad de inferir estados mentales en otros) es una habilidad que se desarrolla en la infancia y puede verse afectada en el TEA. No es una medida de empatía: puedes preocuparte por los demás y aun así tener dificultad para leer sus estados mentales.',
      };

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
        fontSize: '0.85rem', color: '#6b7280',
      }}>
        <span>Ítem {currentIndex + 1} de {RMET_STIMULI.length}</span>
        <span>{responses.filter(Boolean).length} respondidos</span>
      </div>

      <div style={{
        height: '4px', background: '#f3f4f6', borderRadius: '2px',
        marginBottom: '20px', overflow: 'hidden',
      }}>
        <div style={{
          height: '100%', width: `${((currentIndex + 1) / RMET_STIMULI.length) * 100}%`,
          background: '#8b5cf6', borderRadius: '2px', transition: 'width 0.3s ease',
        }} />
      </div>

      <div className="question-card" style={{ marginBottom: '20px' }}>
        <div style={{
          width: '100%', padding: '40px 20px', textAlign: 'center',
          background: '#f8fafc', borderRadius: '12px', marginBottom: '20px',
          border: '2px solid #e2e8f0',
        }}>
          <span style={{ fontSize: '3rem' }}>👁️</span>
          <p style={{
            fontSize: '0.95rem', lineHeight: 1.7, color: '#1a1a2e',
            marginTop: '12px', fontStyle: 'italic',
          }}>
            {trial.description}
          </p>
        </div>

        <p style={{ fontSize: '0.85rem', fontWeight: 600, color: '#374151', marginBottom: '10px' }}>
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
                  borderColor: isCorrect ? '#16a34a' : isWrong ? '#dc2626' : isSelected ? '#8b5cf6' : '#e5e7eb',
                  background: isCorrect ? '#f0fdf4' : isWrong ? '#fef2f2' : isSelected ? '#f5f3ff' : '#fff',
                  cursor: answered ? 'default' : 'pointer', fontSize: '0.95rem',
                  color: isCorrect ? '#166534' : isWrong ? '#991b1b' : '#1a1a2e',
                  opacity: answered && !isSelected && !isCorrect ? 0.5 : 1,
                }}
              >
                {answered && isCorrect && <span style={{ marginRight: '8px', color: '#16a34a' }}>✓ </span>}
                {answered && isWrong && <span style={{ marginRight: '8px', color: '#dc2626' }}>✗ </span>}
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
