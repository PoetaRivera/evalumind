import { useState, useEffect, useRef, useCallback } from 'react';
import { calculateFlankerScore } from '../../utils/flankerScoring';

const TOTAL_TRIALS = 100;
const STIMULUS_DURATION = 1500; // max response time
const ITI = 800;

function generateTrials() {
  const trials = [];
  for (let i = 0; i < TOTAL_TRIALS; i++) {
    const congruent = Math.random() > 0.5;
    const direction = Math.random() > 0.5 ? 'left' : 'right';
    trials.push({ congruent, direction });
  }
  return trials;
}

export default function FlankerTask({ onComplete }) {
  const [trials] = useState(() => generateTrials());
  const [currentTrial, setCurrentTrial] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [showStimulus, setShowStimulus] = useState(false);
  const [results, setResults] = useState([]);
  const respondedRef = useRef(false);
  const rtStartRef = useRef(0);

  const finish = useCallback(() => {
    setIsActive(false);
    setIsFinished(true);
    const result = calculateFlankerScore(results);
    onComplete(result);
  }, [results, onComplete]);

  // Trial sequencing
  useEffect(() => {
    if (!isActive || isFinished) return;
    if (currentTrial >= TOTAL_TRIALS) { finish(); return; }

    respondedRef.current = false;
    setShowStimulus(true);
    rtStartRef.current = performance.now();

    const timeout = setTimeout(() => {
      if (!respondedRef.current) {
        setResults((prev) => [...prev, {
          congruent: trials[currentTrial].congruent,
          direction: trials[currentTrial].direction,
          correct: false, reactionTime: STIMULUS_DURATION,
        }]);
      }
      setShowStimulus(false);
      setTimeout(() => setCurrentTrial((t) => t + 1), ITI);
    }, STIMULUS_DURATION);

    return () => clearTimeout(timeout);
  }, [isActive, currentTrial, isFinished, trials, finish]);

  // Keyboard handling
  useEffect(() => {
    if (!isActive || !showStimulus) return;

    const handleKey = (e) => {
      if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        e.preventDefault();
        if (respondedRef.current || currentTrial >= trials.length) return;
        respondedRef.current = true;
        const rt = performance.now() - rtStartRef.current;
        const trial = trials[currentTrial];
        const correct = (e.key === 'ArrowLeft' && trial.direction === 'left') ||
          (e.key === 'ArrowRight' && trial.direction === 'right');
        setResults((prev) => [...prev, { congruent: trial.congruent, direction: trial.direction, correct, reactionTime: rt }]);
        setShowStimulus(false);
        setTimeout(() => setCurrentTrial((t) => t + 1), ITI / 2);
      }
    };

    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isActive, showStimulus, currentTrial, trials]);

  if (!isStarted) {
    return (
      <div style={{ textAlign: 'center', padding: '40px 20px', maxWidth: '500px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '1.2rem', color: '#1a1a2e', marginBottom: '12px' }}>
          Tarea Flanker
        </h2>
        <div style={{ color: '#6b7280', marginBottom: '24px', fontSize: '0.9rem', lineHeight: 1.7, textAlign: 'left' }}>
          <p>Verás una fila de 5 flechas. La del centro es la que importa.</p>
          <p>Si la flecha central apunta <strong>← izquierda</strong>, presiona ←</p>
          <p>Si la flecha central apunta <strong>derecha →</strong>, presiona →</p>
          <p style={{ color: '#9ca3af', fontSize: '0.85rem' }}>Ignora las flechas de los lados. Responde lo más rápido que puedas.</p>
        </div>
        <div style={{ fontSize: '0.85rem', marginBottom: '20px' }}>
          <p style={{ color: '#16a34a' }}>← ← ← ← ← Congruente (fácil)</p>
          <p style={{ color: '#dc2626' }}>← ← → ← ← Incongruente (difícil)</p>
        </div>
        <button className="btn btn-primary" onClick={() => { setIsStarted(true); setIsActive(true); }} style={{ padding: '14px 40px' }}>
          Comenzar (3 min)
        </button>
      </div>
    );
  }

  if (isFinished) return null;

  const pct = Math.round((currentTrial / TOTAL_TRIALS) * 100);

  return (
    <div style={{ textAlign: 'center', padding: '60px 20px', maxWidth: '400px', margin: '0 auto' }}>
      <div style={{ fontSize: '0.8rem', color: '#9ca3af', marginBottom: '4px' }}>
        {currentTrial} / {TOTAL_TRIALS}
      </div>
      <div style={{
        height: '4px', background: '#f3f4f6', borderRadius: '2px', marginBottom: '40px',
        overflow: 'hidden', width: `${pct}%`, transition: 'width 0.3s ease',
      }}>
        <div style={{ height: '100%', width: '100%', background: '#4a90d9', borderRadius: '2px' }} />
      </div>

      {showStimulus ? (
        <div style={{ fontSize: '3rem', fontFamily: 'monospace', letterSpacing: '8px', userSelect: 'none', marginBottom: '8px' }}>
          {(() => {
            const t = trials[currentTrial];
            const leftArrows = t.congruent ? (t.direction === 'left' ? '←' : '→') : (t.direction === 'left' ? '→' : '←');
            const centerArrow = t.direction === 'left' ? '←' : '→';
            const rightArrows = t.congruent ? (t.direction === 'left' ? '←' : '→') : (t.direction === 'left' ? '→' : '←');
            return `${leftArrows} ${leftArrows} ${centerArrow} ${rightArrows} ${rightArrows}`;
          })()}
        </div>
      ) : (
        <div style={{ fontSize: '2rem', color: '#d0d0d0', marginBottom: '8px' }}>+</div>
      )}

      <p style={{ fontSize: '0.8rem', color: '#6b7280', marginTop: '16px' }}>
        ← izquierda &nbsp;|&nbsp; derecha →
      </p>
    </div>
  );
}
