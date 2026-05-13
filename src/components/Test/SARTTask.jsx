import { useState, useEffect, useRef, useCallback } from 'react';
import { calculateSARTScore } from '../../utils/sartScoring';

const TOTAL_TRIALS = 180; // ~5-6 min
const DIGITS = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const NOGO_DIGIT = 3; // 10% de trials
const STIMULUS_DURATION = 250; // ms que se muestra el dígito
const ISI = 1500; // ms entre inicio de un estímulo y el siguiente
const RESPONSE_WINDOW = 1200; // ms máximo para responder

function generateTrials() {
  const trials = [];
  for (let i = 0; i < TOTAL_TRIALS; i++) {
    const isNoGo = i > 0 && Math.random() < 0.11 && trials.filter((t) => t.type === 'nogo').length < 20;
    const digit = isNoGo
      ? NOGO_DIGIT
      : DIGITS.filter((d) => d !== NOGO_DIGIT)[Math.floor(Math.random() * 8)];
    trials.push({ digit, trialType: digit === NOGO_DIGIT ? 'nogo' : 'go' });
  }
  return trials;
}

export default function SARTTask({ onComplete }) {
  const [trials] = useState(() => generateTrials());
  const [currentTrial, setCurrentTrial] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [currentDigit, setCurrentDigit] = useState(null);
  const [showDigit, setShowDigit] = useState(false);
  const [fixationOn, setFixationOn] = useState(false);
  const [results, setResults] = useState([]);
  const respondedRef = useRef(false);
  const rtStartRef = useRef(0);

  const finish = useCallback(() => {
    setIsActive(false);
    setIsFinished(true);
    const result = calculateSARTScore(results);
    onComplete(result);
  }, [results, onComplete]);

  useEffect(() => {
    if (!isActive || isFinished) return;

    if (currentTrial >= TOTAL_TRIALS) {
      finish();
      return;
    }

    const trial = trials[currentTrial];
    respondedRef.current = false;
    setCurrentDigit(trial.digit);
    setShowDigit(true);
    rtStartRef.current = performance.now();

    // Esconder dígito después de STIMULUS_DURATION ms
    const hideTimeout = setTimeout(() => {
      setShowDigit(false);
    }, STIMULUS_DURATION);

    // Pasar al siguiente trial después de ISI
    const nextTimeout = setTimeout(() => {
      const rt = performance.now() - rtStartRef.current;
      setResults((prev) => [...prev, {
        trialType: trial.trialType,
        digit: trial.digit,
        responded: respondedRef.current,
        reactionTime: respondedRef.current ? Math.min(rt, RESPONSE_WINDOW) : null,
      }]);
      setCurrentTrial((t) => t + 1);
    }, ISI);

    return () => {
      clearTimeout(hideTimeout);
      clearTimeout(nextTimeout);
    };
  }, [isActive, currentTrial, isFinished, trials, finish]);

  useEffect(() => {
    if (!isActive) return;

    const handleKey = (e) => {
      if (e.code === 'Space' || e.key === ' ') {
        e.preventDefault();
        if (!respondedRef.current) {
          respondedRef.current = true;
          setFixationOn(true);
          setTimeout(() => setFixationOn(false), 100);
        }
      }
    };

    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isActive]);

  if (!isStarted) {
    return (
      <div style={{ textAlign: 'center', padding: '40px 20px', maxWidth: '500px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '1.2rem', color: '#1a1a2e', marginBottom: '12px' }}>
          Tarea de Atención Sostenida (SART)
        </h2>
        <div style={{ color: '#6b7280', marginBottom: '24px', fontSize: '0.9rem', lineHeight: 1.7, textAlign: 'left' }}>
          <p>Aparecerán dígitos del 1 al 9 en la pantalla, uno tras otro.</p>
          <p><strong>Presiona la barra espaciadora</strong> para cada dígito...</p>
          <p style={{ color: '#dc2626' }}><strong>...EXCEPTO cuando aparezca el número 3.</strong></p>
          <p style={{ color: '#9ca3af', fontSize: '0.85rem' }}>Es rápido: cada dígito aparece solo un instante. La mayoría de las veces DEBES responder. Solo inhibes con el 3.</p>
        </div>
        <button className="btn btn-primary" onClick={() => { setIsStarted(true); setIsActive(true); }} style={{ padding: '14px 40px', fontSize: '1.05rem' }}>
          Comenzar (5 min)
        </button>
      </div>
    );
  }

  if (isFinished) return null;

  const pct = Math.round((currentTrial / TOTAL_TRIALS) * 100);

  return (
    <div style={{ textAlign: 'center', padding: '60px 20px', maxWidth: '400px', margin: '0 auto' }}>
      <div style={{ fontSize: '0.8rem', color: '#9ca3af', marginBottom: '8px' }}>
        {currentTrial} / {TOTAL_TRIALS} ({pct}%)
      </div>
      <div style={{
        height: '4px', background: '#f3f4f6', borderRadius: '2px',
        marginBottom: '32px', overflow: 'hidden',
      }}>
        <div style={{
          height: '100%', width: `${pct}%`, background: '#4a90d9',
          borderRadius: '2px', transition: 'width 0.3s ease',
        }} />
      </div>

      <div style={{
        width: '120px', height: '120px', borderRadius: '50%',
        background: showDigit ? '#1a1a2e' : '#f3f4f6',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        margin: '0 auto 16px', transition: 'background 0.05s',
      }}>
        {showDigit ? (
          <span style={{ fontSize: '3rem', fontWeight: 700, color: currentDigit === NOGO_DIGIT ? '#dc2626' : '#fff' }}>
            {currentDigit}
          </span>
        ) : (
          <span style={{ fontSize: '2rem', color: '#d0d0d0' }}>+</span>
        )}
      </div>

      <div style={{
        width: '80px', height: '80px', borderRadius: '50%',
        background: fixationOn ? '#10b981' : '#f3f4f6',
        margin: '0 auto', transition: 'background 0.05s',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <span style={{ fontSize: '0.8rem', color: '#6b7280' }}>
          {fixationOn ? '✓' : 'barra'}
        </span>
      </div>

      <p style={{ fontSize: '0.75rem', color: '#9ca3af', marginTop: '12px' }}>
        Espaciadora para responder · No respondas al {NOGO_DIGIT}
      </p>
    </div>
  );
}
