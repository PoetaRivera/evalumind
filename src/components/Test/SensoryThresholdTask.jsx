import { useState, useEffect, useRef, useCallback } from 'react';
import { calculateSensoryThresholdScore } from '../../utils/hspScoring';

const TOTAL_TRIALS = 40;
const STIMULUS_DURATION = 2000;
const ITI_MIN = 1000;
const ITI_MAX = 2000;

function generateTrials() {
  const trials = [];
  // 10 niveles de ruido, 4 trials cada uno
  const noiseLevels = [5, 15, 25, 35, 45, 55, 65, 75, 85, 95];
  for (const level of noiseLevels) {
    for (let r = 0; r < 4; r++) {
      trials.push({ noiseLevel: level, hasSignal: Math.random() > 0.5 });
    }
  }
  // Shuffle
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
  const canvasRef = useRef(null);

  // Canvas drawing
  useEffect(() => {
    if (!showStimulus || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const trial = trials[currentTrial];
    const noise = trial.noiseLevel / 100;

    // Background noise: random rectangles
    ctx.fillStyle = '#f3f4f6';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const squares = Math.floor(noise * 200);
    for (let i = 0; i < squares; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const size = 3 + Math.random() * 8;
      ctx.fillStyle = `rgba(0,0,0,${0.1 + noise * 0.6})`;
      ctx.fillRect(x, y, size, size);
    }

    // Signal: clear blue square (if present)
    if (trial.hasSignal) {
      const sigX = canvas.width / 2 - 15;
      const sigY = canvas.height / 2 - 15;
      ctx.fillStyle = '#4a90d9';
      ctx.fillRect(sigX, sigY, 30, 30);
    }
  }, [showStimulus, currentTrial, trials]);

  const finish = useCallback(() => {
    setIsActive(false);
    setIsFinished(true);
    const result = calculateSensoryThresholdScore(results);
    onComplete(result);
  }, [results, onComplete]);

  useEffect(() => {
    if (!isActive || isFinished) return;
    if (currentTrial >= TOTAL_TRIALS) { finish(); return; }
    if (waitingForITI) return;

    setShowStimulus(true);
    setFeedback(null);

    const stimTimeout = setTimeout(() => {
      setShowStimulus(false);
      // Auto-respond "no signal" if no response
      setResults((prev) => [...prev, {
        noiseLevel: trials[currentTrial].noiseLevel,
        detected: false,
        reactionTime: STIMULUS_DURATION,
      }]);
      setWaitingForITI(true);
      setTimeout(() => {
        setWaitingForITI(false);
        setCurrentTrial((t) => t + 1);
      }, ITI_MIN + Math.random() * (ITI_MAX - ITI_MIN));
    }, STIMULUS_DURATION);

    return () => clearTimeout(stimTimeout);
  }, [isActive, currentTrial, isFinished, trials, finish, waitingForITI]);

  const handleDetect = useCallback(() => {
    if (!showStimulus || waitingForITI) return;
    setShowStimulus(false);
    setResults((prev) => [...prev, {
      noiseLevel: trials[currentTrial].noiseLevel,
      detected: true,
      reactionTime: 500,
    }]);
    setFeedback('detectado');
    setWaitingForITI(true);
    setTimeout(() => {
      setWaitingForITI(false);
      setCurrentTrial((t) => t + 1);
    }, ITI_MIN);
  }, [showStimulus, waitingForITI, currentTrial, trials]);

  if (!isStarted) {
    return (
      <div style={{ textAlign: 'center', padding: '40px 20px', maxWidth: '500px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '1.2rem', color: '#1a1a2e', marginBottom: '12px' }}>
          Detección en Ruido Visual
        </h2>
        <div style={{ color: '#6b7280', marginBottom: '24px', fontSize: '0.9rem', lineHeight: 1.7, textAlign: 'left' }}>
          <p>Verás una pantalla con ruido visual.</p>
          <p>Algunas veces aparecerá un <strong style={{ color: '#4a90d9' }}>cuadrado azul</strong> entre el ruido.</p>
          <p><strong>Presiona la barra espaciadora</strong> SOLO cuando veas el cuadrado azul.</p>
          <p style={{ color: '#9ca3af', fontSize: '0.85rem' }}>Si no estás seguro/a, no respondas. Mide tu umbral sensorial real.</p>
        </div>
        <button className="btn btn-primary" onClick={() => { setIsStarted(true); setIsActive(true); }} style={{ padding: '14px 40px' }}>
          Comenzar (3 min)
        </button>
      </div>
    );
  }

  if (isFinished) return null;

  return (
    <div style={{ textAlign: 'center', maxWidth: '400px', margin: '0 auto' }}>
      <div style={{ fontSize: '0.8rem', color: '#9ca3af', marginBottom: '8px' }}>
        {currentTrial + 1} de {TOTAL_TRIALS}
      </div>

      <div
        style={{
          width: '100%', height: '250px', marginBottom: '16px',
          borderRadius: '12px', overflow: 'hidden', cursor: showStimulus ? 'pointer' : 'default',
          border: '2px solid #e5e7eb', position: 'relative',
        }}
        onClick={handleDetect}
      >
        <canvas ref={canvasRef} width={400} height={250} style={{ width: '100%', height: '100%' }} />
        {!showStimulus && !waitingForITI && (
          <div style={{
            position: 'absolute', inset: 0, display: 'flex',
            alignItems: 'center', justifyContent: 'center',
            fontSize: '1.5rem', color: '#d0d0d0', background: '#fafafa',
          }}>
            +
          </div>
        )}
      </div>

      <div style={{ height: '8px', marginBottom: '8px' }}>
        {feedback === 'detectado' && (
          <span style={{ color: '#16a34a', fontSize: '0.9rem', fontWeight: 600 }}>✓ Detectado</span>
        )}
      </div>

      <p style={{ fontSize: '0.75rem', color: '#9ca3af' }}>
        Barra espaciadora = veo el cuadrado azul
      </p>
    </div>
  );
}
