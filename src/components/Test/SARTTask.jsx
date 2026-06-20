import { useState, useEffect, useRef, useCallback } from 'react';
import { calculateSARTScore } from '../../utils/sartScoring';
import { usePageVisibility } from '../../hooks/usePageVisibility';

const TOTAL_TRIALS = 180;
const DIGITS = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const NOGO_DIGIT = 3;
const STIMULUS_DURATION = 250;
const ISI = 1500;
const RESPONSE_WINDOW = 1200;

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
  const [paused, setPaused] = useState(false);
  const respondedRef = useRef(false);
  const rtStartRef = useRef(0);
  const { pauseCount, registerCallbacks } = usePageVisibility();

  useEffect(() => {
    registerCallbacks(
      () => setPaused(true),
      null
    );
  }, [registerCallbacks]);

  const handleResume = useCallback(() => {
    setPaused(false);
  }, []);

  const respond = useCallback(() => {
    if (!respondedRef.current) {
      respondedRef.current = true;
      setFixationOn(true);
      setTimeout(() => setFixationOn(false), 100);
    }
  }, []);

  const finish = useCallback(() => {
    setIsActive(false);
    setIsFinished(true);
    const result = calculateSARTScore(results);
    onComplete(result);
  }, [results, onComplete]);

  useEffect(() => {
    if (!isActive || isFinished || paused) return;

    if (currentTrial >= TOTAL_TRIALS) {
      finish();
      return;
    }

    const trial = trials[currentTrial];
    respondedRef.current = false;
    setCurrentDigit(trial.digit);
    setShowDigit(true);
    rtStartRef.current = performance.now();

    const hideTimeout = setTimeout(() => {
      setShowDigit(false);
    }, STIMULUS_DURATION);

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
  }, [isActive, currentTrial, isFinished, trials, finish, paused]);

  useEffect(() => {
    if (!isActive || paused) return;

    const handleKey = (e) => {
      if (e.code === 'Space' || e.key === ' ') {
        e.preventDefault();
        respond();
      }
    };

    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isActive, paused, respond]);

  if (!isStarted) {
    return (
      <div style={{ textAlign: 'center', padding: '40px 20px', maxWidth: '500px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '1.2rem', color: 'var(--color-task-heading)', marginBottom: '12px' }}>
          Tarea de Atención Sostenida (SART)
        </h2>
        <div style={{ color: 'var(--color-text-secondary)', marginBottom: '24px', fontSize: '0.9rem', lineHeight: 1.7, textAlign: 'left' }}>
          <p>Aparecerán dígitos del 1 al 9 en la pantalla, uno tras otro.</p>
          <p><strong>Presiona la barra espaciadora</strong> (o el botón en pantalla) para cada dígito...</p>
          <p style={{ color: 'var(--color-danger)' }}><strong>...EXCEPTO cuando aparezca el número 3.</strong></p>
          <p style={{ color: 'var(--color-text-tertiary)', fontSize: '0.85rem' }}>Es rápido: cada dígito aparece solo un instante. La mayoría de las veces DEBES responder. Solo inhibes con el 3.</p>
        </div>
        <button className="btn btn-primary" data-testid="sart-start" onClick={() => { setIsStarted(true); setIsActive(true); }} style={{ padding: '14px 40px', fontSize: '1.05rem' }}>
          Comenzar (5 min)
        </button>
      </div>
    );
  }

  if (isFinished) return null;

  const pct = Math.round((currentTrial / TOTAL_TRIALS) * 100);

  return (
    <div style={{ textAlign: 'center', padding: '60px 20px', maxWidth: '400px', margin: '0 auto' }}>
      <div style={{ fontSize: '0.8rem', color: 'var(--color-text-tertiary)', marginBottom: '8px' }}>
        {currentTrial} / {TOTAL_TRIALS} ({pct}%)
      </div>
      <div style={{
        height: '4px', background: 'var(--color-border-light)', borderRadius: '2px',
        marginBottom: '32px', overflow: 'hidden',
      }}>
        <div data-testid="sart-progress" style={{
          height: '100%', width: `${pct}%`, background: 'var(--color-accent)',
          borderRadius: '2px', transition: 'width 0.3s ease',
        }} />
      </div>

      <div style={{
        width: '120px', height: '120px', borderRadius: '50%',
        background: showDigit && !paused ? 'var(--color-task-heading)' : 'var(--color-border-light)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        margin: '0 auto 16px', transition: 'background 0.05s',
      }}>
        {showDigit && !paused ? (
          <span data-testid="sart-digit" style={{ fontSize: '3rem', fontWeight: 700, color: currentDigit === NOGO_DIGIT ? 'var(--color-danger)' : 'var(--color-on-accent)' }}>
            {currentDigit}
          </span>
        ) : (
          <span style={{ fontSize: '2rem', color: 'var(--color-task-fixation)' }}>+</span>
        )}
      </div>

      <div style={{
        width: '80px', height: '80px', borderRadius: '50%',
        background: fixationOn ? 'var(--color-bar-low)' : 'var(--color-border-light)',
        margin: '0 auto 8px', transition: 'background 0.05s',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <span style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>
          {fixationOn ? '✓' : 'barra'}
        </span>
      </div>

      <button
        data-testid="sart-respond"
        onPointerDown={(e) => { e.preventDefault(); respond(); }}
        style={{
          padding: '10px 32px', fontSize: '1rem', fontWeight: 600,
          background: 'var(--color-task-heading)', color: 'var(--color-on-accent)', border: 'none',
          borderRadius: '8px', cursor: 'pointer', marginTop: '8px',
          userSelect: 'none', touchAction: 'manipulation',
        }}
      >
        Responder
      </button>

      <p style={{ fontSize: '0.75rem', color: 'var(--color-text-tertiary)', marginTop: '12px' }}>
        Espaciadora o botón · No respondas al {NOGO_DIGIT}
      </p>

      {paused && (
        <div style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)',
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          justifyContent: 'center', zIndex: 1000,
        }}>
          <p style={{ color: 'var(--color-on-accent)', fontSize: '1.2rem', marginBottom: '8px' }}>
            Prueba pausada
          </p>
          <p style={{ color: 'var(--color-text-tertiary)', fontSize: '0.85rem', marginBottom: '20px' }}>
            No cambies de pestaña durante la tarea. Pausas: {pauseCount}
          </p>
          <button
            className="btn btn-primary"
            data-testid="sart-resume"
            onClick={handleResume}
            style={{ padding: '12px 36px', fontSize: '1rem' }}
          >
            Reanudar
          </button>
        </div>
      )}
    </div>
  );
}
