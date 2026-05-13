import { useState, useEffect, useRef, useCallback } from 'react';
import { calculateAuditoryDistractionScore } from '../../utils/hspScoring';

const TOTAL_TRIALS = 60;
const ITI = 1200;

function generateTrials() {
  const trials = [];
  for (let i = 0; i < TOTAL_TRIALS; i++) {
    const side = Math.random() > 0.5 ? 'left' : 'right';
    const hasDistractor = Math.random() > 0.5;
    // Tono distractor: social (voz), ambiental (tráfico), neutro (tono puro)
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
  const respondedRef = useRef(false);
  const rtStartRef = useRef(0);
  const audioCtxRef = useRef(null);

  // Audio context
  const playDistractor = useCallback((type) => {
    try {
      const ctx = audioCtxRef.current || new (window.AudioContext || window.webkitAudioContext)();
      audioCtxRef.current = ctx;

      if (type === 'social') {
        // Simular murmullo social con tonos variables
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
        // Ruido blanco breve
        const bufferSize = ctx.sampleRate * 0.5;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) data[i] = (Math.random() * 2 - 1) * 0.1;
        const source = ctx.createBufferSource();
        source.buffer = buffer;
        source.connect(ctx.destination);
        source.start();
      }
      // 'tono' = sin distractor en esta implementación simple
    } catch { /* Web Audio no disponible */ }
  }, []);

  const finish = useCallback(() => {
    setIsActive(false);
    setIsFinished(true);
    const result = calculateAuditoryDistractionScore(results);
    onComplete(result);
  }, [results, onComplete]);

  useEffect(() => {
    if (!isActive || isFinished) return;
    if (currentTrial >= TOTAL_TRIALS) { finish(); return; }

    const trial = trials[currentTrial];
    respondedRef.current = false;

    // Play distractor if present (briefly before target)
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
  }, [isActive, currentTrial, isFinished, trials, finish, playDistractor]);

  useEffect(() => {
    if (!isActive || !showTarget) return;

    const handleKey = (e) => {
      if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        e.preventDefault();
        if (respondedRef.current) return;
        respondedRef.current = true;
        const rt = performance.now() - rtStartRef.current;
        const trial = trials[currentTrial];
        const answer = e.key === 'ArrowLeft' ? 'left' : 'right';
        setResults((prev) => [...prev, {
          distractor: trial.hasDistractor,
          distractorType: trial.distractorType,
          correct: answer === trial.side, reactionTime: rt,
        }]);
        setShowTarget(false);
        setTimeout(() => setCurrentTrial((t) => t + 1), ITI / 2);
      }
    };

    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isActive, showTarget, currentTrial, trials]);

  if (!isStarted) {
    return (
      <div style={{ textAlign: 'center', padding: '40px 20px', maxWidth: '500px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '1.2rem', color: '#1a1a2e', marginBottom: '12px' }}>
          Distracción Auditiva
        </h2>
        <div style={{ color: '#6b7280', marginBottom: '24px', fontSize: '0.9rem', lineHeight: 1.7, textAlign: 'left' }}>
          <p>Aparecerá un punto <strong>verde</strong> a la izquierda o derecha.</p>
          <p>Presiona ← o → lo más rápido que puedas.</p>
          <p>A veces sonarán <strong>distractores auditivos</strong> (murmullos, ruido ambiental).</p>
          <p style={{ color: '#9ca3af', fontSize: '0.85rem' }}>Ignora los sonidos y concéntrate en el punto. Recomendado usar auriculares.</p>
        </div>
        <button className="btn btn-primary" onClick={() => { setIsStarted(true); setIsActive(true); }} style={{ padding: '14px 40px' }}>
          Comenzar (2 min)
        </button>
      </div>
    );
  }

  if (isFinished) return null;

  return (
    <div style={{ textAlign: 'center', padding: '60px 20px', maxWidth: '400px', margin: '0 auto' }}>
      <div style={{ fontSize: '0.8rem', color: '#9ca3af', marginBottom: '16px' }}>
        {currentTrial + 1} / {TOTAL_TRIALS}
      </div>

      <div style={{ width: '300px', height: '200px', margin: '0 auto', position: 'relative' }}>
        {/* Fixation cross */}
        <div style={{
          position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
          fontSize: '2rem', color: '#d0d0d0',
        }}>
          {!showTarget && '+'}
        </div>

        {/* Target dot */}
        {showTarget && (
          <div style={{
            position: 'absolute', top: '50%', transform: 'translateY(-50%)',
            [dotSide === 'left' ? 'left' : 'right']: '50px',
            width: '24px', height: '24px', borderRadius: '50%',
            background: '#10b981', boxShadow: '0 0 12px rgba(16,185,129,0.4)',
          }} />
        )}
      </div>

      <p style={{ fontSize: '0.8rem', color: '#6b7280', marginTop: '16px' }}>
        ← izquierda &nbsp;|&nbsp; derecha →
      </p>
    </div>
  );
}
