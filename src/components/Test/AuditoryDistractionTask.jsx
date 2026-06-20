import { useState, useEffect, useRef, useCallback } from 'react';
import { calculateAuditoryDistractionScore } from '../../utils/hspScoring';
import { usePageVisibility } from '../../hooks/usePageVisibility';

const TOTAL_TRIALS = 60;
const ITI = 1200;

function generateTrials() {
  const trials = [];
  for (let i = 0; i < TOTAL_TRIALS; i++) {
    const side = Math.random() > 0.5 ? 'left' : 'right';
    const hasDistractor = Math.random() > 0.5;
    let distractorType = null;
    if (hasDistractor) {
      const r = Math.random();
      distractorType = r < 0.33 ? 'social' : r < 0.66 ? 'ambiental' : 'tono';
    }
    trials.push({ side, hasDistractor, distractorType });
  }
  return trials;
}

export default function AuditoryDistractionTask({ onComplete }) {
  const [trials] = useState(() => generateTrials());
  const [currentTrial, setCurrentTrial] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [showTarget, setShowTarget] = useState(false);
  const [results, setResults] = useState([]);
  const [dotSide, setDotSide] = useState(null);
  const [paused, setPaused] = useState(false);
  const respondedRef = useRef(false);
  const rtStartRef = useRef(0);
  const audioCtxRef = useRef(null);
  const { pauseCount, registerCallbacks } = usePageVisibility();

  useEffect(() => {
    registerCallbacks(() => setPaused(true), null);
  }, [registerCallbacks]);

  const handleResume = useCallback(() => setPaused(false), []);

  const playDistractor = useCallback((type) => {
    try {
      const ctx = audioCtxRef.current || new (window.AudioContext || window.webkitAudioContext)();
      audioCtxRef.current = ctx;

      if (type === 'social') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(200, ctx.currentTime);
        osc.frequency.linearRampToValueAtTime(350, ctx.currentTime + 0.3);
        gain.gain.setValueAtTime(0.08, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.5);
        osc.connect(gain); gain.connect(ctx.destination);
        osc.start(); osc.stop(ctx.currentTime + 0.5);
      } else if (type === 'ambiental') {
        const bufferSize = ctx.sampleRate * 0.5;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) data[i] = (Math.random() * 2 - 1) * 0.1;
        const source = ctx.createBufferSource();
        source.buffer = buffer;
        source.connect(ctx.destination);
        source.start();
      }
    } catch { /* Web Audio no disponible */ }
  }, []);

  const handleResponse = useCallback((key) => {
    if (respondedRef.current) return;
    respondedRef.current = true;
    const rt = performance.now() - rtStartRef.current;
    const trial = trials[currentTrial];
    setResults((prev) => [...prev, {
      distractor: trial.hasDistractor,
      distractorType: trial.distractorType,
      correct: key === trial.side, reactionTime: rt,
    }]);
    setShowTarget(false);
    setTimeout(() => setCurrentTrial((t) => t + 1), ITI / 2);
  }, [currentTrial, trials]);

  const finish = useCallback(() => {
    setIsActive(false);
    setIsFinished(true);
    const result = calculateAuditoryDistractionScore(results);
    onComplete(result);
  }, [results, onComplete]);

  useEffect(() => {
    if (!isActive || isFinished || paused) return;
    if (currentTrial >= TOTAL_TRIALS) { finish(); return; }

    const trial = trials[currentTrial];
    respondedRef.current = false;

    if (trial.hasDistractor) {
      setTimeout(() => playDistractor(trial.distractorType), 200);
    }

    setDotSide(trial.side);
    setShowTarget(true);
    rtStartRef.current = performance.now();

    const timeout = setTimeout(() => {
      if (!respondedRef.current) {
        setResults((prev) => [...prev, {
          distractor: trial.hasDistractor,
          distractorType: trial.distractorType,
          correct: false, reactionTime: 2000,
        }]);
      }
      setShowTarget(false);
      setTimeout(() => setCurrentTrial((t) => t + 1), ITI);
    }, 2000);

    return () => clearTimeout(timeout);
  }, [isActive, currentTrial, isFinished, trials, finish, paused, playDistractor]);

  useEffect(() => {
    if (!isActive || !showTarget || paused) return;

    const handleKey = (e) => {
      if (e.key === 'ArrowLeft') { e.preventDefault(); handleResponse('left'); }
      else if (e.key === 'ArrowRight') { e.preventDefault(); handleResponse('right'); }
    };

    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isActive, showTarget, paused, handleResponse]);

  if (!isStarted) {
    return (
      <div style={{ textAlign: 'center', padding: '40px 20px', maxWidth: '500px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '1.2rem', color: 'var(--color-task-heading)', marginBottom: '12px' }}>
          Distracción Auditiva
        </h2>
        <div style={{ color: 'var(--color-text-secondary)', marginBottom: '24px', fontSize: '0.9rem', lineHeight: 1.7, textAlign: 'left' }}>
          <p>Aparecerá un punto <strong>verde</strong> a la izquierda o derecha.</p>
          <p>Presiona ← o → (o los botones) lo más rápido que puedas.</p>
          <p>A veces sonarán <strong>distractores auditivos</strong> (murmullos, ruido ambiental).</p>
          <p style={{ color: 'var(--color-text-tertiary)', fontSize: '0.85rem' }}>Ignora los sonidos y concéntrate en el punto. Recomendado usar auriculares.</p>
        </div>
        <button className="btn btn-primary" data-testid="auditory-start" onClick={() => { setIsStarted(true); setIsActive(true); }} style={{ padding: '14px 40px' }}>
          Comenzar (2 min)
        </button>
      </div>
    );
  }

  if (isFinished) return null;

  return (
    <div style={{ textAlign: 'center', padding: '60px 20px', maxWidth: '400px', margin: '0 auto' }}>
      <div style={{ fontSize: '0.8rem', color: 'var(--color-text-tertiary)', marginBottom: '16px' }}>
        {currentTrial + 1} / {TOTAL_TRIALS}
      </div>

      <div style={{ width: '300px', height: '200px', margin: '0 auto', position: 'relative' }}>
        <div style={{
          position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
          fontSize: '2rem', color: 'var(--color-task-fixation)',
        }}>
          {!showTarget && '+'}
        </div>

        {showTarget && !paused && (
          <div data-testid="auditory-target" style={{
            position: 'absolute', top: '50%', transform: 'translateY(-50%)',
            [dotSide === 'left' ? 'left' : 'right']: '50px',
            width: '24px', height: '24px', borderRadius: '50%',
            background: 'var(--color-bar-low)', boxShadow: '0 0 12px rgba(16,185,129,0.4)',
          }} />
        )}
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '12px' }}>
        <button
          data-testid="auditory-left"
          onPointerDown={(e) => { e.preventDefault(); if (showTarget && !paused) handleResponse('left'); }}
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
          data-testid="auditory-right"
          onPointerDown={(e) => { e.preventDefault(); if (showTarget && !paused) handleResponse('right'); }}
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
          <button className="btn btn-primary" data-testid="auditory-resume" onClick={handleResume} style={{ padding: '12px 36px', fontSize: '1rem' }}>
            Reanudar
          </button>
        </div>
      )}
    </div>
  );
}
