import { useState, useEffect, useRef, useCallback } from 'react';
import { calculateSwitchScore } from '../../utils/switchScoring';

const TOTAL_TRIALS = 96;
const CUE_DURATION = 600;
const STIMULUS_TIMEOUT = 2000;
const ITI = 600;

// Estímulos: formas (círculo/cuadrado) × colores (rojo/azul)
function generateTrials() {
  const trials = [];
  let prevTask = null;
  for (let i = 0; i < TOTAL_TRIALS; i++) {
    const task = Math.random() > 0.5 ? 'color' : 'shape'; // cuál es la tarea actual
    const isSwitch = prevTask !== null && task !== prevTask;
    const shape = Math.random() > 0.5 ? 'circle' : 'square';
    const color = Math.random() > 0.5 ? 'red' : 'blue';

    // Respuesta correcta según la tarea
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
  const respondedRef = useRef(false);
  const rtStartRef = useRef(0);

  const finish = useCallback(() => {
    setIsActive(false);
    setIsFinished(true);
    const result = calculateSwitchScore(results);
    onComplete(result);
  }, [results, onComplete]);

  useEffect(() => {
    if (!isActive || isFinished) return;
    if (currentTrial >= TOTAL_TRIALS) { finish(); return; }

    const trial = trials[currentTrial];
    respondedRef.current = false;

    // Show cue
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
  }, [isActive, currentTrial, isFinished, trials, finish]);

  useEffect(() => {
    if (!isActive || !showStimulus) return;

    const handleKey = (e) => {
      if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        e.preventDefault();
        if (respondedRef.current) return;
        respondedRef.current = true;
        const rt = performance.now() - rtStartRef.current;
        const trial = trials[currentTrial];
        const answer = e.key === 'ArrowLeft' ? 'left' : 'right';
        setResults((prev) => [...prev, {
          isSwitch: trial.isSwitch, correct: answer === trial.correctAnswer, reactionTime: rt,
        }]);
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
          Cambio de Tarea
        </h2>
        <div style={{ color: '#6b7280', marginBottom: '24px', fontSize: '0.9rem', lineHeight: 1.7, textAlign: 'left' }}>
          <p>Verás una figura (círculo o cuadrado) de color rojo o azul.</p>
          <p>Antes de cada figura, una pista te dirá qué hacer:</p>
          <p>🔵 <strong>COLOR</strong>: ← rojo | azul →</p>
          <p>⬜ <strong>FORMA</strong>: ← círculo | cuadrado →</p>
          <p style={{ color: '#9ca3af', fontSize: '0.85rem' }}>La tarea cambia aleatoriamente. Responde con ← o →</p>
        </div>
        <button className="btn btn-primary" onClick={() => { setIsStarted(true); setIsActive(true); }} style={{ padding: '14px 40px' }}>
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

  return (
    <div style={{ textAlign: 'center', padding: '60px 20px', maxWidth: '400px', margin: '0 auto' }}>
      <div style={{ fontSize: '0.8rem', color: '#9ca3af', marginBottom: '4px' }}>
        {currentTrial} / {TOTAL_TRIALS}
      </div>
      <div style={{ height: '4px', background: '#f3f4f6', borderRadius: '2px', marginBottom: '32px', overflow: 'hidden' }}>
        <div style={{ height: '100%', width: `${pct}%`, background: '#4a90d9', borderRadius: '2px', transition: 'width 0.3s ease' }} />
      </div>

      {showCue && (
        <div style={{
          fontSize: '1.5rem', fontWeight: 700, marginBottom: '16px',
          color: trials[currentTrial]?.task === 'color' ? '#3b82f6' : '#8b5cf6',
        }}>
          {trials[currentTrial]?.task === 'color' ? '🔵 COLOR' : '⬜ FORMA'}
          {isSwitchTrial && <span style={{ fontSize: '0.8rem', color: '#f59e0b', marginLeft: '8px' }}>CAMBIO</span>}
        </div>
      )}

      {showStimulus && (
        <div style={{ marginBottom: '8px' }}>
          <div style={{
            width: '100px', height: '100px', borderRadius: shape === 'circle' ? '50%' : '8px',
            background: color === 'red' ? '#dc2626' : '#3b82f6',
            margin: '0 auto', boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
          }} />
        </div>
      )}

      {!showCue && !showStimulus && (
        <div style={{ fontSize: '2rem', color: '#d0d0d0' }}>+</div>
      )}

      <p style={{ fontSize: '0.8rem', color: '#6b7280', marginTop: '16px' }}>
        ← izquierda &nbsp;|&nbsp; derecha →
      </p>
    </div>
  );
}
