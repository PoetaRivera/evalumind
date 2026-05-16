import { useState, useEffect, useRef, useCallback } from 'react';
import { calculateSwitchScore } from '../../utils/switchScoring';
import { usePageVisibility } from '../../hooks/usePageVisibility';

const TOTAL_TRIALS = 96;
const CUE_DURATION = 600;
const STIMULUS_TIMEOUT = 2000;
const ITI = 600;

function generateTrials() {
  const trials = [];
  let prevTask = null;
  for (let i = 0; i < TOTAL_TRIALS; i++) {
    const task = Math.random() > 0.5 ? 'color' : 'shape';
    const isSwitch = prevTask !== null && task !== prevTask;
    const shape = Math.random() > 0.5 ? 'circle' : 'square';
    const color = Math.random() > 0.5 ? 'red' : 'blue';

    let correctAnswer;
    if (task === 'color') {
      correctAnswer = color === 'red' ? 'left' : 'right';
    } else {
      correctAnswer = shape === 'circle' ? 'left' : 'right';
    }

    trials.push({ task, isSwitch, shape, color, correctAnswer });
    prevTask = task;
  }
  return trials;
}

export default function SwitchTask({ onComplete }) {
  const [trials] = useState(() => generateTrials());
  const [currentTrial, setCurrentTrial] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [showCue, setShowCue] = useState(false);
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
    if (respondedRef.current) return;
    respondedRef.current = true;
    const rt = performance.now() - rtStartRef.current;
    const trial = trials[currentTrial];
    setResults((prev) => [...prev, {
      isSwitch: trial.isSwitch, correct: key === trial.correctAnswer, reactionTime: rt,
    }]);
    setShowStimulus(false);
    setTimeout(() => setCurrentTrial((t) => t + 1), ITI / 2);
  }, [currentTrial, trials]);

  const finish = useCallback(() => {
    setIsActive(false);
    setIsFinished(true);
    const result = calculateSwitchScore(results);
    onComplete(result);
  }, [results, onComplete]);

  useEffect(() => {
    if (!isActive || isFinished || paused) return;
    if (currentTrial >= TOTAL_TRIALS) { finish(); return; }

    const trial = trials[currentTrial];
    respondedRef.current = false;

    setShowCue(true);
    const cueTimeout = setTimeout(() => {
      setShowCue(false);
      setShowStimulus(true);
      rtStartRef.current = performance.now();

      const stimTimeout = setTimeout(() => {
        if (!respondedRef.current) {
          setResults((prev) => [...prev, {
            isSwitch: trial.isSwitch, correct: false, reactionTime: STIMULUS_TIMEOUT,
          }]);
        }
        setShowStimulus(false);
        setTimeout(() => setCurrentTrial((t) => t + 1), ITI);
      }, STIMULUS_TIMEOUT);

      return () => clearTimeout(stimTimeout);
    }, CUE_DURATION);

    return () => clearTimeout(cueTimeout);
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
          Cambio de Tarea
        </h2>
        <div style={{ color: 'var(--color-text-secondary)', marginBottom: '24px', fontSize: '0.9rem', lineHeight: 1.7, textAlign: 'left' }}>
          <p>Verás una figura (círculo o cuadrado) de color rojo o azul.</p>
          <p>Antes de cada figura, una pista te dirá qué hacer:</p>
          <p>🔵 <strong>COLOR</strong>: ← rojo | azul →</p>
          <p>⬜ <strong>FORMA</strong>: ← círculo | cuadrado →</p>
          <p style={{ color: 'var(--color-text-tertiary)', fontSize: '0.85rem' }}>La tarea cambia aleatoriamente. Responde con ← o → (o los botones).</p>
        </div>
        <button className="btn btn-primary" data-testid="switch-start" onClick={() => { setIsStarted(true); setIsActive(true); }} style={{ padding: '14px 40px' }}>
          Comenzar (4 min)
        </button>
      </div>
    );
  }

  if (isFinished) return null;

  const pct = Math.round((currentTrial / TOTAL_TRIALS) * 100);
  const shape = trials[currentTrial]?.shape;
  const color = trials[currentTrial]?.color;
  const isSwitchTrial = trials[currentTrial]?.isSwitch;
  const currentTask = trials[currentTrial]?.task;

  return (
    <div style={{ textAlign: 'center', padding: '60px 20px', maxWidth: '400px', margin: '0 auto' }}>
      <div style={{ fontSize: '0.8rem', color: 'var(--color-text-tertiary)', marginBottom: '4px' }}>
        {currentTrial} / {TOTAL_TRIALS}
      </div>
      <div style={{ height: '4px', background: 'var(--color-border-light)', borderRadius: '2px', marginBottom: '32px', overflow: 'hidden' }}>
        <div data-testid="switch-progress" style={{ height: '100%', width: `${pct}%`, background: 'var(--color-accent)', borderRadius: '2px', transition: 'width 0.3s ease' }} />
      </div>

      {showCue && (
        <div data-testid="switch-cue" style={{
          fontSize: '1.5rem', fontWeight: 700, marginBottom: '16px',
          color: currentTask === 'color' ? 'var(--color-accent)' : 'var(--color-bar-mid)',
        }}>
          {currentTask === 'color' ? '🔵 COLOR' : '⬜ FORMA'}
          {isSwitchTrial && <span style={{ fontSize: '0.8rem', color: 'var(--color-bar-high)', marginLeft: '8px' }}>CAMBIO</span>}
        </div>
      )}

      {showStimulus && !paused && (
        <div data-testid="switch-stimulus" style={{ marginBottom: '8px' }}>
          <div style={{
            width: '100px', height: '100px', borderRadius: shape === 'circle' ? '50%' : '8px',
            background: color === 'red' ? 'var(--color-danger)' : 'var(--color-accent)',
            margin: '0 auto', boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
          }} />
        </div>
      )}

      {!showCue && !showStimulus && (
        <div style={{ fontSize: '2rem', color: 'var(--color-task-fixation)' }}>+</div>
      )}

      <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '12px' }}>
        <button
          data-testid="switch-left"
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
          data-testid="switch-right"
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
          <button className="btn btn-primary" data-testid="switch-resume" onClick={handleResume} style={{ padding: '12px 36px', fontSize: '1rem' }}>
            Reanudar
          </button>
        </div>
      )}
    </div>
  );
}
