import { useState, useEffect, useRef, useCallback } from 'react';
import { FAS_DURATION, FAS_RULES } from '../../data/fasConfig';
import { calculateFasScore } from '../../utils/fasScoring';

export default function FasTask({ letter, onComplete }) {
  const [words, setWords] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [timeLeft, setTimeLeft] = useState(FAS_DURATION);
  const [isActive, setIsActive] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [error, setError] = useState(null);
  const [paused, setPaused] = useState(false);
  const [flash, setFlash] = useState(null); // { type: 'success'|'error', word: '' }
  const inputRef = useRef(null);
  const timerRef = useRef(null);
  const flashTimerRef = useRef(null);

  const finishTask = useCallback(() => {
    setIsActive(false);
    setIsFinished(true);
    onComplete(calculateFasScore(words, letter));
  }, [letter, onComplete, words]);

  const startTask = () => {
    setIsActive(true);
    setTimeLeft(FAS_DURATION);
    setWords([]);
    setInputValue('');
    setError(null);
    setPaused(false);
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  // Cronómetro
  useEffect(() => {
    if (isActive && !paused && timeLeft > 0) {
      timerRef.current = setTimeout(() => setTimeLeft((t) => t - 1), 1000);
    } else if (timeLeft === 0 && isActive) {
      finishTask();
    }
    return () => clearTimeout(timerRef.current);
  }, [finishTask, isActive, paused, timeLeft]);

  const validateWord = useCallback(
    (word) => {
      const clean = word.trim();
      if (clean.length < 2) return 'Muy corta';
      if (!clean.toLowerCase().startsWith(letter.toLowerCase())) return `Debe empezar con "${letter}"`;
      if (/^\d+$/.test(clean)) return 'No uses números';
      if (clean.includes(' ')) return 'Solo una palabra';
      if (words.some((w) => w.toLowerCase() === clean.toLowerCase())) return 'Ya la escribiste';
      return null;
    },
    [words, letter],
  );

  const addWord = useCallback(
    (e) => {
      e.preventDefault();
      if (!isActive || paused || !inputValue.trim()) return;

      const err = validateWord(inputValue);
      if (err) {
        setError(err);
        setFlash({ type: 'error', word: inputValue.trim() });
        clearTimeout(flashTimerRef.current);
        flashTimerRef.current = setTimeout(() => setFlash(null), 1200);
        return;
      }

      setError(null);
      setFlash({ type: 'success', word: inputValue.trim() });
      clearTimeout(flashTimerRef.current);
      flashTimerRef.current = setTimeout(() => setFlash(null), 800);
      setWords((prev) => [...prev, inputValue.trim()]);
      setInputValue('');
      inputRef.current?.focus();
    },
    [inputValue, isActive, paused, validateWord],
  );

  const pct = ((FAS_DURATION - timeLeft) / FAS_DURATION) * 100;
  const urgencyColor = timeLeft <= 10 ? 'var(--color-danger)' : timeLeft <= 20 ? 'var(--color-bar-high)' : 'var(--color-bar-mid)';

  if (!isActive && !isFinished) {
    return (
      <div className="fas-intro" style={{ textAlign: 'center', padding: '32px 20px' }}>
        <div style={{
          width: '80px', height: '80px', borderRadius: '50%', background: 'var(--color-accent-subtle)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px',
          fontSize: '2rem', fontWeight: 700, color: 'var(--color-accent)',
        }}>
          {letter}
        </div>
        <h2 style={{ fontSize: '1.3rem', marginBottom: '8px' }}>Fluencia Verbal: Letra "{letter}"</h2>
        <p style={{ color: 'var(--color-text-secondary)', marginBottom: '16px' }}>
          Tienes {FAS_DURATION} segundos. Escribe todas las palabras que comiencen con la letra <strong>{letter}</strong>.
        </p>
        <ul style={{ textAlign: 'left', maxWidth: '400px', margin: '0 auto 24px', fontSize: '0.85rem', color: 'var(--color-text-secondary)', lineHeight: 1.8 }}>
          {FAS_RULES.map((r, i) => (
            <li key={i}>{r}</li>
          ))}
        </ul>
        <button className="btn btn-primary" onClick={startTask} style={{ padding: '14px 40px', fontSize: '1.05rem' }}>
          Comenzar ({FAS_DURATION}s)
        </button>
      </div>
    );
  }

  if (isFinished) {
    return null; // El resultado se pasa vía onComplete, TestContainer muestra ResultsView
  }

  return (
    <div className="fas-task" style={{ textAlign: 'center' }}>
      {/* Cronómetro */}
      <div style={{ marginBottom: '16px' }}>
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
          marginBottom: '4px',
        }}>
          <span style={{ fontSize: '1.1rem', fontWeight: 600 }}>{letter}</span>
          <span style={{
            fontSize: '2rem', fontWeight: 700, color: urgencyColor,
            fontVariantNumeric: 'tabular-nums',
          }}>
            {timeLeft}
          </span>
          <span style={{ fontSize: '0.95rem', color: 'var(--color-text-secondary)' }}>s</span>
        </div>
        <div style={{
          width: '200px', height: '4px', background: 'var(--color-border-light)', borderRadius: '2px',
          margin: '0 auto', overflow: 'hidden',
        }}>
          <div style={{
            height: '100%', width: `${100 - pct}%`, borderRadius: '2px',
            background: urgencyColor, transition: 'width 1s linear',
          }} />
        </div>
      </div>

      {/* Input */}
      <form onSubmit={addWord} style={{ marginBottom: '12px' }}>
        <div style={{ display: 'flex', gap: '8px', maxWidth: '400px', margin: '0 auto' }}>
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
              setError(null);
            }}
            placeholder={`Palabra con "${letter}"...`}
            disabled={paused}
            autoComplete="off"
            style={{
              flex: 1, padding: '12px 16px', fontSize: '1.1rem', border: '1px solid #d1d5db',
              borderRadius: '8px', outline: 'none', fontFamily: 'inherit',
            }}
          />
        </div>
      </form>

      {/* Error */}
      {error && (
        <p role="alert" style={{ color: 'var(--color-danger)', fontSize: '0.85rem', marginBottom: '8px' }}>{error}</p>
      )}

      {/* Flash visual de feedback */}
      {flash && (
        <div style={{
          display: 'inline-block', padding: '4px 14px', borderRadius: '16px',
          fontSize: '0.85rem', marginBottom: '8px', fontWeight: 500,
          background: flash.type === 'success' ? 'var(--color-success-bg)' : 'var(--color-danger-bg)',
          color: flash.type === 'success' ? 'var(--color-success)' : 'var(--color-danger)',
          border: `1px solid ${flash.type === 'success' ? 'var(--color-success-border)' : 'var(--color-danger-border)'}`,
          animation: 'fadeIn 0.2s ease',
        }}>
          {flash.type === 'success' ? `+ ${flash.word}` : `✕ ${flash.word}`}
        </div>
      )}

      {/* Contador */}
      <p style={{ fontSize: '0.95rem', color: 'var(--color-text-secondary)', marginBottom: '12px' }}>
        {words.length} palabra{words.length !== 1 ? 's' : ''}
      </p>

      {/* Chips */}
      {words.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', justifyContent: 'center', maxWidth: '500px', margin: '0 auto' }}>
          {words.map((w, i) => (
            <span key={i} style={{
              background: 'var(--color-accent-subtle)', color: 'var(--color-accent-deep)', padding: '4px 12px',
              borderRadius: '16px', fontSize: '0.9rem', border: '1px solid #bfdbfe',
            }}>
              {w}
            </span>
          ))}
        </div>
      )}

      {/* Botón terminar antes */}
      {words.length >= 3 && (
        <button
          className="btn btn-link"
          onClick={finishTask}
          style={{ marginTop: '20px', fontSize: '0.85rem', color: 'var(--color-text-tertiary)' }}
        >
          Terminar y ver resultados
        </button>
      )}
    </div>
  );
}
