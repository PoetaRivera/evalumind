import { useState, useEffect, useRef, useCallback } from 'react';
import { calculateFlankerScore } from '../../utils/flankerScoring';
import { usePageVisibility } from '../../hooks/usePageVisibility';

const TOTAL_TRIALS = 100;
const STIMULUS_DURATION = 1500;
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
  const [paused, setPaused] = useState(false);
  const respondedRef = useRef(false);
  const rtStartRef = useRef(0);
  const { isVisible, pauseCount, registerCallbacks } = usePageVisibility();

  useEffect(() => {
    registerCallbacks(() => setPaused(true), null);
  }, [registerCallbacks]);

  const handleResume = useCallback(() => setPaused(false), []);

  const handleResponse = useCallback((key) => {
    if (respondedRef.current || currentTrial >= trials.length) return;
    respondedRef.current = true;
    const rt = performance.now() - rtStartRef.current;
    const trial = trials[currentTrial];
    const correct = (key === 'left' && trial.direction === 'left') ||
      (key === 'right' && trial.direction === 'right');
    setResults((prev) => [...prev, { congruent: trial.congruent, direction: trial.direction, correct, reactionTime: rt }]);
    setShowStimulus(false);
    setTimeout(() => setCurrentTrial((t) => t + 1), ITI / 2);
  }, [currentTrial, trials]);

  const finish = useCallback(() => {
    setIsActive(false);
    setIsFinished(true);
    const result = calculateFlankerScore(results);
    onComplete(result);
  }, [results, onComplete]);

  useEffect(() => {
    if (!isActive || isFinished || paused) return;
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
  }, [isActive, currentTrial, isFinished, trials, finish, paused]);

  useEffect(() => {
    if (!isActive || !showStimulus || paused) return;

    const handleKey = (e) => {
      if (e.key === 'ArrowLeft') { e.preventDefault(); handleResponse('left'); }
      else if (e.key === 'ArrowRight') { e.preventDefault(); handleResponse('right'); }
    };

    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isActive, showStimulus, paused, handleResponse]);

  if (!isStarted) {
    return (
      <div style={{ textAlign: 'center', padding: '40px 20px', maxWidth: '500px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '1.2rem', color: 'var(--color-task-heading)', marginBottom: '12px' }}>
          Tarea Flanker
        </h2>
        <div style={{ color: 'var(--color-text-secondary)', marginBottom: '24px', fontSize: '0.9rem', lineHeight: 1.7, textAlign: 'left' }}>
          <p>Verás una fila de 5 flechas. La del centro es la que importa.</p>
          <p>Si la flecha central apunta <strong>← izquierda</strong>, presiona ← o el botón izquierdo</p>
          <p>Si la flecha central apunta <strong>derecha →</strong>, presiona → o el botón derecho</p>
          <p style={{ color: 'var(--color-text-tertiary)', fontSize: '0.85rem' }}>Ignora las flechas de los lados. Responde lo más rápido que puedas.</p>
        </div>
        <div style={{ fontSize: '0.85rem', marginBottom: '20px' }}>
          <p style={{ color: 'var(--color-success)' }}>← ← ← ← ← Congruente (fácil)</p>
          <p style={{ color: 'var(--color-danger)' }}>← ← → ← ← Incongruente (difícil)</p>
        </div>
        <button className="btn btn-primary" data-testid="flanker-start" onClick={() => { setIsStarted(true); setIsActive(true); }} style={{ padding: '14px 40px' }}>
          Comenzar (3 min)
        </button>
      </div>
    );
  }

  if (isFinished) return null;

  const pct = Math.round((currentTrial / TOTAL_TRIALS) * 100);
  const trial = trials[currentTrial];

  const renderArrows = () => {
    if (!trial) return null;
    const leftArrows = trial.congruent ? (trial.direction === 'left' ? '←' : '→') : (trial.direction === 'left' ? '→' : '←');
    const centerArrow = trial.direction === 'left' ? '←' : '→';
    const rightArrows = trial.congruent ? (trial.direction === 'left' ? '←' : '→') : (trial.direction === 'left' ? '→' : '←');
    return `${leftArrows} ${leftArrows} ${centerArrow} ${rightArrows} ${rightArrows}`;
  };

  return (
    <div style={{ textAlign: 'center', padding: '60px 20px', maxWidth: '400px', margin: '0 auto' }}>
      <div style={{ fontSize: '0.8rem', color: 'var(--color-text-tertiary)', marginBottom: '4px' }}>
        {currentTrial} / {TOTAL_TRIALS}
      </div>
      <div style={{
        height: '4px', background: 'var(--color-border-light)', borderRadius: '2px', marginBottom: '40px',
        overflow: 'hidden',
      }}>
        <div data-testid="flanker-progress" style={{ height: '100%', width: `${pct}%`, background: 'var(--color-accent)', borderRadius: '2px', transition: 'width 0.3s ease' }} />
      </div>

      {showStimulus && !paused ? (
        <div data-testid="flanker-stimulus" style={{ fontSize: '3rem', fontFamily: 'monospace', letterSpacing: '8px', userSelect: 'none', marginBottom: '8px' }}>
          {renderArrows()}
        </div>
      ) : (
        <div style={{ fontSize: '2rem', color: 'var(--color-task-fixation)', marginBottom: '8px' }}>+</div>
      )}

      <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '12px' }}>
        <button
          data-testid="flanker-left"
          onPointerDown={(e) => { e.preventDefault(); if (showStimulus && !paused) handleResponse('left'); }}
          style={{
            padding: '12px 28px', fontSize: '1.1rem', fontWeight: 600,
            background: 'var(--color-task-heading)', color: 'var(--color-on-accent)', border: 'none',
            borderRadius: '8px', cursor: 'pointer', userSelect: 'none',
            touchAction: 'manipulation',
          }}
        >
          ← Izquierda
        </button>
        <button
          data-testid="flanker-right"
          onPointerDown={(e) => { e.preventDefault(); if (showStimulus && !paused) handleResponse('right'); }}
          style={{
            padding: '12px 28px', fontSize: '1.1rem', fontWeight: 600,
            background: 'var(--color-task-heading)', color: 'var(--color-on-accent)', border: 'none',
            borderRadius: '8px', cursor: 'pointer', userSelect: 'none',
            touchAction: 'manipulation',
          }}
        >
          Derecha →
        </button>
      </div>

      <p style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', marginTop: '16px' }}>
        ← izquierda &nbsp;|&nbsp; derecha → &nbsp;|&nbsp; También puedes usar las flechas del teclado
      </p>

      {paused && (
        <div style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)',
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          justifyContent: 'center', zIndex: 1000,
        }}>
          <p style={{ color: 'var(--color-on-accent)', fontSize: '1.2rem', marginBottom: '8px' }}>Prueba pausada</p>
          <p style={{ color: 'var(--color-text-tertiary)', fontSize: '0.85rem', marginBottom: '20px' }}>
            No cambies de pestaña durante la tarea. Pausas: {pauseCount}
          </p>
          <button className="btn btn-primary" data-testid="flanker-resume" onClick={handleResume} style={{ padding: '12px 36px', fontSize: '1rem' }}>
            Reanudar
          </button>
        </div>
      )}
    </div>
  );
}
