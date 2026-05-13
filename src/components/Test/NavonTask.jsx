import { useState, useEffect, useRef, useCallback } from 'react';
import { calculateNavonScore } from '../../utils/navonScoring';

// Pares de letras: global grande hecha de letras locales pequeñas
const STIMULI = [
  { global: 'H', local: 'S', target: 'H', level: 'global', congruent: false },
  { global: 'S', local: 'H', target: 'S', level: 'global', congruent: false },
  { global: 'H', local: 'H', target: 'H', level: 'global', congruent: true },
  { global: 'S', local: 'S', target: 'S', level: 'global', congruent: true },
  { global: 'H', local: 'S', target: 'S', level: 'local', congruent: false },
  { global: 'S', local: 'H', target: 'H', level: 'local', congruent: false },
  { global: 'H', local: 'H', target: 'H', level: 'local', congruent: true },
  { global: 'S', local: 'S', target: 'S', level: 'local', congruent: true },
];

function generateTrials() {
  const trials = [];
  for (let i = 0; i < 96; i++) {
    const stim = STIMULI[i % STIMULI.length];
    trials.push({
      globalLetter: stim.global,
      localLetter: stim.local,
      correctAnswer: stim.target === 'H' ? 'H' : 'S',
      attendLevel: stim.level,
      congruent: stim.congruent,
    });
  }
  // Shuffle
  for (let i = trials.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [trials[i], trials[j]] = [trials[j], trials[i]];
  }
  return trials;
}

export default function NavonTask({ onComplete }) {
  const [trials] = useState(() => generateTrials());
  const [currentTrial, setCurrentTrial] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [results, setResults] = useState([]);
  const [showStimulus, setShowStimulus] = useState(false);
  const [cue, setCue] = useState(null); // 'global' or 'local'
  const respondedRef = useRef(false);
  const rtStartRef = useRef(0);

  const finish = useCallback(() => {
    setIsActive(false);
    setIsFinished(true);
    const result = calculateNavonScore(results);
    onComplete(result);
  }, [results, onComplete]);

  useEffect(() => {
    if (!isActive || isFinished) return;
    if (currentTrial >= trials.length) { finish(); return; }

    const trial = trials[currentTrial];
    // First show cue: "GRANDE" or "pequeño"
    setCue(trial.attendLevel === 'global' ? 'global' : 'local');
    respondedRef.current = false;

    const cueTimeout = setTimeout(() => {
      setCue(null);
      setShowStimulus(true);
      rtStartRef.current = performance.now();

      const stimTimeout = setTimeout(() => {
        if (!respondedRef.current) {
          setResults((prev) => [...prev, {
            attendLevel: trial.attendLevel,
            congruent: trial.congruent,
            correct: false, reactionTime: 2000,
          }]);
        }
        setShowStimulus(false);
        setTimeout(() => setCurrentTrial((t) => t + 1), 500);
      }, 2000);

      return () => clearTimeout(stimTimeout);
    }, 800);

    return () => clearTimeout(cueTimeout);
  }, [isActive, currentTrial, isFinished, trials, finish]);

  useEffect(() => {
    if (!isActive || !showStimulus) return;

    const handleKey = (e) => {
      if (e.key === 'h' || e.key === 'H' || e.key === 's' || e.key === 'S') {
        e.preventDefault();
        if (respondedRef.current) return;
        respondedRef.current = true;
        const rt = performance.now() - rtStartRef.current;
        const trial = trials[currentTrial];
        const answer = e.key.toUpperCase();
        setResults((prev) => [...prev, {
          attendLevel: trial.attendLevel, congruent: trial.congruent,
          correct: answer === trial.correctAnswer, reactionTime: rt,
        }]);
        setShowStimulus(false);
        setTimeout(() => setCurrentTrial((t) => t + 1), 400);
      }
    };

    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isActive, showStimulus, currentTrial, trials]);

  if (!isStarted) {
    return (
      <div style={{ textAlign: 'center', padding: '40px 20px', maxWidth: '500px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '1.2rem', color: '#1a1a2e', marginBottom: '12px' }}>
          Figuras de Navon
        </h2>
        <div style={{ color: '#6b7280', marginBottom: '24px', fontSize: '0.9rem', lineHeight: 1.7, textAlign: 'left' }}>
          <p>Verás una letra grande formada por letras pequeñas.</p>
          <p>Una pista te dirá si debes fijarte en la <strong>letra GRANDE</strong> o en las <strong>letras pequeñas</strong>.</p>
          <p style={{ color: '#9ca3af', fontSize: '0.85rem' }}>Presiona H o S según la letra que corresponda al nivel indicado.</p>
        </div>
        <button className="btn btn-primary" onClick={() => { setIsStarted(true); setIsActive(true); }} style={{ padding: '14px 40px' }}>
          Comenzar (4 min)
        </button>
      </div>
    );
  }

  if (isFinished) return null;

  const trial = trials[currentTrial];
  const pct = Math.round((currentTrial / trials.length) * 100);

  return (
    <div style={{ textAlign: 'center', padding: '60px 20px', maxWidth: '400px', margin: '0 auto' }}>
      <div style={{ fontSize: '0.8rem', color: '#9ca3af', marginBottom: '8px' }}>
        {currentTrial} / {trials.length} ({pct}%)
      </div>

      <div style={{
        width: '300px', height: '200px', margin: '0 auto 16px',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        {cue === 'global' && (
          <span style={{ fontSize: '1.2rem', fontWeight: 700, color: '#4a90d9' }}>
            Busca la letra GRANDE
          </span>
        )}
        {cue === 'local' && (
          <span style={{ fontSize: '1.2rem', fontWeight: 700, color: '#8b5cf6' }}>
            Busca las letras pequeñas
          </span>
        )}
        {showStimulus && trial && (
          <div style={{ position: 'relative', display: 'inline-block' }}>
            <span style={{ fontSize: '5rem', fontWeight: 900, color: '#1a1a2e', lineHeight: 1, userSelect: 'none' }}>
              {trial.globalLetter}
            </span>
            <span style={{
              position: 'absolute', top: '30%', left: '33%',
              fontSize: '1rem', color: '#6b7280', fontWeight: 600,
              userSelect: 'none', letterSpacing: '2px',
            }}>
              {Array(7).fill(trial.localLetter).join('')}
            </span>
          </div>
        )}
        {!cue && !showStimulus && (
          <span style={{ fontSize: '2rem', color: '#d0d0d0' }}>+</span>
        )}
      </div>

      <p style={{ fontSize: '0.8rem', color: '#6b7280' }}>
        Presiona <strong>H</strong> o <strong>S</strong>
      </p>
    </div>
  );
}
