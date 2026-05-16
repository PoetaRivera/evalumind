import { useState, useCallback, useEffect } from 'react';
import { calculateDigitSpanScore } from '../../utils/digitSpanScoring';

function generateSequence(length) {
  const digits = [];
  for (let i = 0; i < length; i++) {
    digits.push(Math.floor(Math.random() * 9) + 1);
  }
  return digits;
}

export default function DigitSpanTask({ onComplete }) {
  const [phase, setPhase] = useState('intro'); // intro, forward, backward, finished
  const [currentLength, setCurrentLength] = useState(2);
  const [trialInLength, setTrialInLength] = useState(0);
  const [sequence, setSequence] = useState([]);
  const [showing, setShowing] = useState(false);
  const [inputDigits, setInputDigits] = useState([]);
  const [currentSeqIndex, setCurrentSeqIndex] = useState(0);
  const [isForward, setIsForward] = useState(true);
  const [forwardResults, setForwardResults] = useState([]);
  const [backwardResults, setBackwardResults] = useState([]);
  const [feedback, setFeedback] = useState(null);

  const startPhase = useCallback((forward) => {
    setIsForward(forward);
    setCurrentLength(2);
    setTrialInLength(0);
    if (forward) setForwardResults([]);
    else setBackwardResults([]);
    setPhase(forward ? 'forward' : 'backward');

    const seq = generateSequence(2);
    setSequence(seq);
    setShowing(true);
    setCurrentSeqIndex(0);
    setInputDigits([]);
    setFeedback(null);
  }, []);

  // Display digits one at a time
  useEffect(() => {
    if (!showing || currentSeqIndex >= sequence.length) return;

    const timer = setTimeout(() => {
      setCurrentSeqIndex((i) => i + 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [showing, currentSeqIndex, sequence.length]);

  useEffect(() => {
    if (showing && currentSeqIndex >= sequence.length) {
      const timer = setTimeout(() => {
        setShowing(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [showing, currentSeqIndex, sequence.length]);

  const handleDigitClick = useCallback(
    (digit) => {
      if (showing) return;
      setInputDigits((prev) => [...prev, digit]);
    },
    [showing],
  );

  const handleClear = () => setInputDigits([]);

  const handleSubmit = useCallback(() => {
    const correct = isForward
      ? [...sequence]
      : [...sequence].reverse();

    const isCorrect = inputDigits.length === correct.length &&
      inputDigits.every((d, i) => d === correct[i]);

    const results = isForward ? forwardResults : backwardResults;
    const setResults = isForward ? setForwardResults : setBackwardResults;
    setResults([...results, isCorrect]);

    setFeedback(isCorrect ? 'correct' : 'incorrect');

    setTimeout(() => {
      setFeedback(null);

      const newTrialInLength = trialInLength + 1;
      let newLength = currentLength;
      let newTrial = newTrialInLength;

      if (newTrialInLength >= 2) {
        newLength = currentLength + 1;
        newTrial = 0;

        if (newLength > 9 && isForward) {
          // Forward done, start backward
          startPhase(false);
          return;
        }
        if (newLength > 8 && !isForward) {
          // Backward done
          const result = calculateDigitSpanScore({
            forwardResults,
            backwardResults: [...backwardResults, isCorrect],
          });
          setPhase('finished');
          onComplete(result);
          return;
        }
      }

      setCurrentLength(newLength);
      setTrialInLength(newTrial);
      const seq = generateSequence(newLength);
      setSequence(seq);
      setShowing(true);
      setCurrentSeqIndex(0);
      setInputDigits([]);
    }, 1200);
  }, [inputDigits, sequence, isForward, currentLength, trialInLength, forwardResults, backwardResults, onComplete, startPhase]);

  if (phase === 'intro') {
    return (
      <div style={{ textAlign: 'center', padding: '40px 20px', maxWidth: '500px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '1.2rem', color: 'var(--color-task-heading)', marginBottom: '12px' }}>
          Span de Dígitos
        </h2>
        <div style={{ color: 'var(--color-text-secondary)', marginBottom: '24px', fontSize: '0.9rem', lineHeight: 1.7, textAlign: 'left' }}>
          <p>Verás secuencias de dígitos, uno por uno.</p>
          <p><strong>Fase 1 (Directo):</strong> Repite los números en el mismo orden.</p>
          <p><strong>Fase 2 (Inverso):</strong> Repite los números en orden inverso.</p>
          <p style={{ color: 'var(--color-text-tertiary)', fontSize: '0.85rem' }}>
            Las secuencias empiezan con 2 dígitos y aumentan progresivamente.
          </p>
        </div>
        <button className="btn btn-primary" onClick={() => startPhase(true)} style={{ padding: '14px 40px' }}>
          Comenzar
        </button>
      </div>
    );
  }

  if (phase === 'finished') return null;

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', textAlign: 'center' }}>
      <div style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', marginBottom: '8px' }}>
        {isForward ? 'Fase 1: Directo' : 'Fase 2: Inverso'} · Longitud {currentLength}
      </div>

      <div style={{
        width: '120px', height: '120px', borderRadius: '50%',
        background: feedback === 'correct' ? 'var(--color-success-bg)' : feedback === 'incorrect' ? 'var(--color-danger-bg)' : 'var(--color-border-light)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        margin: '0 auto 24px', transition: 'background 0.2s',
      }}>
        <span style={{
          fontSize: showing && currentSeqIndex < sequence.length ? '3rem' : '2rem',
          fontWeight: 700,
          color: feedback === 'correct' ? 'var(--color-success)' : feedback === 'incorrect' ? 'var(--color-danger)' : 'var(--color-task-heading)',
        }}>
          {feedback
            ? (feedback === 'correct' ? '✓' : '✗')
            : showing && currentSeqIndex < sequence.length
              ? sequence[currentSeqIndex]
              : inputDigits.length > 0
                ? inputDigits.join(' ')
                : '?'}
        </span>
      </div>

      {!showing && !feedback && (
        <>
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px',
            maxWidth: '240px', margin: '0 auto 16px',
          }}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => handleDigitClick(d)}
                style={{
                  width: '56px', height: '56px', borderRadius: '10px',
                  border: '2px solid #e5e7eb', background: 'var(--color-on-accent)',
                  fontSize: '1.3rem', fontWeight: 600, cursor: 'pointer',
                }}
              >
                {d}
              </button>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
            <button className="btn btn-secondary" onClick={handleClear}>Borrar</button>
            <button
              className="btn btn-primary"
              onClick={handleSubmit}
              disabled={inputDigits.length === 0}
            >
              Confirmar
            </button>
          </div>
        </>
      )}

      <p style={{ fontSize: '0.75rem', color: 'var(--color-text-tertiary)', marginTop: '16px' }}>
        {isForward ? 'Teclea en el MISMO orden' : 'Teclea en orden INVERSO'}
      </p>
    </div>
  );
}
