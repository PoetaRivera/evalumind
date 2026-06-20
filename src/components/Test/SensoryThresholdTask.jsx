import { useState, useEffect, useRef, useCallback } from 'react';
import { calculateSensoryThresholdScore } from '../../utils/hspScoring';
import { usePageVisibility } from '../../hooks/usePageVisibility';

const TOTAL_TRIALS = 40;
const STIMULUS_DURATION = 2000;
const ITI_MIN = 1000;
const ITI_MAX = 2000;

function generateTrials() {
  const trials = [];
  const noiseLevels = [5, 15, 25, 35, 45, 55, 65, 75, 85, 95];
  for (const level of noiseLevels) {
    for (let r = 0; r < 4; r++) {
      trials.push({ noiseLevel: level, hasSignal: Math.random() > 0.5 });
    }
  }
  for (let i = trials.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [trials[i], trials[j]] = [trials[j], trials[i]];
  }
  return trials;
}

export default function SensoryThresholdTask({ onComplete }) {
  const [trials] = useState(() => generateTrials());
  const [currentTrial, setCurrentTrial] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [showStimulus, setShowStimulus] = useState(false);
  const [results, setResults] = useState([]);
  const [waitingForITI, setWaitingForITI] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [paused, setPaused] = useState(false);
  const canvasRef = useRef(null);
  const rtStartRef = useRef(0);
  const { pauseCount, registerCallbacks } = usePageVisibility();

  useEffect(() => {
    registerCallbacks(() => setPaused(true), null);
  }, [registerCallbacks]);

  const handleResume = useCallback(() => setPaused(false), []);

  useEffect(() => {
    if (!showStimulus || !canvasRef.current || paused) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const trial = trials[currentTrial];
    const noise = trial.noiseLevel / 100;

    ctx.fillStyle = 'var(--color-border-light)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const squares = Math.floor(noise * 200);
    for (let i = 0; i < squares; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const size = 3 + Math.random() * 8;
      ctx.fillStyle = `rgba(0,0,0,${0.1 + noise * 0.6})`;
      ctx.fillRect(x, y, size, size);
    }

    if (trial.hasSignal) {
      const sigX = canvas.width / 2 - 15;
      const sigY = canvas.height / 2 - 15;
      ctx.fillStyle = 'var(--color-accent)';
      ctx.fillRect(sigX, sigY, 30, 30);
    }
  }, [showStimulus, currentTrial, trials, paused]);

  const finish = useCallback(() => {
    setIsActive(false);
    setIsFinished(true);
    const result = calculateSensoryThresholdScore(results);
    onComplete(result);
  }, [results, onComplete]);

  useEffect(() => {
    if (!isActive || isFinished || paused) return;
    if (currentTrial >= TOTAL_TRIALS) { finish(); return; }
    if (waitingForITI) return;

    setShowStimulus(true);
    setFeedback(null);
    rtStartRef.current = performance.now();

    const stimTimeout = setTimeout(() => {
      const rt = performance.now() - rtStartRef.current;
      setShowStimulus(false);
      setResults((prev) => [...prev, {
        noiseLevel: trials[currentTrial].noiseLevel,
        detected: false,
        reactionTime: rt,
      }]);
      setWaitingForITI(true);
      setTimeout(() => {
        setWaitingForITI(false);
        setCurrentTrial((t) => t + 1);
      }, ITI_MIN + Math.random() * (ITI_MAX - ITI_MIN));
    }, STIMULUS_DURATION);

    return () => clearTimeout(stimTimeout);
  }, [isActive, currentTrial, isFinished, trials, finish, waitingForITI, paused]);

  const handleDetect = useCallback(() => {
    if (!showStimulus || waitingForITI || paused) return;
    const rt = performance.now() - rtStartRef.current;
    setShowStimulus(false);
    setResults((prev) => [...prev, {
      noiseLevel: trials[currentTrial].noiseLevel,
      detected: true,
      reactionTime: rt,
    }]);
    setFeedback('detectado');
    setWaitingForITI(true);
    setTimeout(() => {
      setWaitingForITI(false);
      setCurrentTrial((t) => t + 1);
    }, ITI_MIN);
  }, [showStimulus, waitingForITI, currentTrial, trials, paused]);

  useEffect(() => {
    if (!isActive || !showStimulus || paused) return;

    const handleKey = (e) => {
      if (e.code === 'Space' || e.key === ' ') {
        e.preventDefault();
        handleDetect();
      }
    };

    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isActive, showStimulus, paused, handleDetect]);

  if (!isStarted) {
    return (
      <div style={{ textAlign: 'center', padding: '40px 20px', maxWidth: '500px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '1.2rem', color: 'var(--color-task-heading)', marginBottom: '12px' }}>
          Detección en Ruido Visual
        </h2>
        <div style={{ color: 'var(--color-text-secondary)', marginBottom: '24px', fontSize: '0.9rem', lineHeight: 1.7, textAlign: 'left' }}>
          <p>Verás una pantalla con ruido visual.</p>
          <p>Algunas veces aparecerá un <strong style={{ color: 'var(--color-accent)' }}>cuadrado azul</strong> entre el ruido.</p>
          <p><strong>Presiona la barra espaciadora</strong> o haz clic/toque SOLO cuando veas el cuadrado azul.</p>
          <p style={{ color: 'var(--color-text-tertiary)', fontSize: '0.85rem' }}>Si no estás seguro/a, no respondas. Mide tu umbral sensorial real.</p>
        </div>
        <button className="btn btn-primary" data-testid="sensory-start" onClick={() => { setIsStarted(true); setIsActive(true); }} style={{ padding: '14px 40px' }}>
          Comenzar (3 min)
        </button>
      </div>
    );
  }

  if (isFinished) return null;

  return (
    <div style={{ textAlign: 'center', maxWidth: '400px', margin: '0 auto' }}>
      <div style={{ fontSize: '0.8rem', color: 'var(--color-text-tertiary)', marginBottom: '8px' }}>
        {currentTrial + 1} de {TOTAL_TRIALS}
      </div>

      <div
        data-testid="sensory-canvas"
        style={{
          width: '100%', height: '250px', marginBottom: '16px',
          borderRadius: '12px', overflow: 'hidden', cursor: showStimulus && !paused ? 'pointer' : 'default',
          border: '2px solid #e5e7eb', position: 'relative',
        }}
        onClick={() => { if (!paused) handleDetect(); }}
      >
        <canvas ref={canvasRef} width={400} height={250} style={{ width: '100%', height: '100%' }} />
        {!showStimulus && !waitingForITI && (
          <div style={{
            position: 'absolute', inset: 0, display: 'flex',
            alignItems: 'center', justifyContent: 'center',
            fontSize: '1.5rem', color: 'var(--color-task-fixation)', background: 'var(--color-task-key-bg)',
          }}>
            +
          </div>
        )}
      </div>

      <div style={{ height: '8px', marginBottom: '8px' }}>
        {feedback === 'detectado' && (
          <span data-testid="sensory-feedback" style={{ color: 'var(--color-success)', fontSize: '0.9rem', fontWeight: 600 }}>✓ Detectado</span>
        )}
      </div>

      <button
        data-testid="sensory-detect"
        onPointerDown={(e) => { e.preventDefault(); handleDetect(); }}
        style={{
          padding: '12px 32px', fontSize: '1rem', fontWeight: 600,
          background: 'var(--color-task-heading)', color: 'var(--color-on-accent)', border: 'none',
          borderRadius: '8px', cursor: 'pointer', userSelect: 'none',
          touchAction: 'manipulation', marginBottom: '8px',
        }}
      >
        Veo el cuadrado
      </button>

      <p style={{ fontSize: '0.75rem', color: 'var(--color-text-tertiary)' }}>
        Barra espaciadora, clic o toque = veo el cuadrado azul
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
          <button className="btn btn-primary" data-testid="sensory-resume" onClick={handleResume} style={{ padding: '12px 36px', fontSize: '1rem' }}>
            Reanudar
          </button>
        </div>
      )}
    </div>
  );
}
