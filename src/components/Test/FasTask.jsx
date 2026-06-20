import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { FAS_LETTERS, FAS_DURATION, FAS_RULES } from '../../data/fasConfig';
import { calculateFasScore } from '../../utils/fasScoring';

export default function FasTask({ onComplete }) {
  const [roundWords, setRoundWords] = useState([[], [], []]);
  const [inputValue, setInputValue] = useState('');
  const [timeLeft, setTimeLeft] = useState(FAS_DURATION);
  const [currentRound, setCurrentRound] = useState(-1); // -1=intro, 0=F, 1=A, 2=S, 3=finished
  const [error, setError] = useState(null);
  const [paused] = useState(false);
  const [flash, setFlash] = useState(null);
  const inputRef = useRef(null);
  const timerRef = useRef(null);
  const flashTimerRef = useRef(null);

  const words = useMemo(
    () => (currentRound >= 0 && currentRound < 3 ? roundWords[currentRound] : []),
    [currentRound, roundWords],
  );
  const letter = currentRound >= 0 && currentRound < 3 ? FAS_LETTERS[currentRound] : '';

  const finishAll = useCallback(() => {
    setCurrentRound(3);
    const rounds = FAS_LETTERS.map((l, i) => ({ letter: l, words: roundWords[i] }));
    onComplete(calculateFasScore(rounds));
  }, [onComplete, roundWords]);

  const nextRound = useCallback(() => {
    const next = currentRound + 1;
    if (next >= 3) {
      finishAll();
    } else {
      setCurrentRound(next);
      setTimeLeft(FAS_DURATION);
      setInputValue('');
      setError(null);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [currentRound, finishAll]);

  // Cronómetro
  useEffect(() => {
    if (currentRound >= 0 && currentRound < 3 && !paused && timeLeft > 0) {
      timerRef.current = setTimeout(() => setTimeLeft((t) => t - 1), 1000);
    } else if (timeLeft === 0 && currentRound >= 0 && currentRound < 3) {
      nextRound();
    }
    return () => clearTimeout(timerRef.current);
  }, [currentRound, paused, timeLeft, nextRound]);

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
      if (currentRound < 0 || paused || !inputValue.trim()) return;

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
      setRoundWords((prev) => {
        const next = [...prev];
        next[currentRound] = [...next[currentRound], inputValue.trim()];
        return next;
      });
      setInputValue('');
      inputRef.current?.focus();
    },
    [inputValue, currentRound, paused, validateWord],
  );

  const pct = ((FAS_DURATION - timeLeft) / FAS_DURATION) * 100;
  const urgencyColor = timeLeft <= 10 ? 'var(--color-danger)' : timeLeft <= 20 ? 'var(--color-bar-high)' : 'var(--color-bar-mid)';

  // ─── INTRO ──────────────────────────────────────────
  if (currentRound === -1) {
    return (
      <div className="fas-intro" style={{ textAlign: 'center', padding: '32px 20px' }}>
        <div style={{
          display: 'flex', justifyContent: 'center', gap: '12px', marginBottom: '16px',
        }}>
          {FAS_LETTERS.map((l) => (
            <div key={l} style={{
              width: '60px', height: '60px', borderRadius: '50%', background: 'var(--color-accent-subtle)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-accent)',
            }}>
              {l}
            </div>
          ))}
        </div>
        <h2 style={{ fontSize: '1.3rem', marginBottom: '8px' }}>Fluencia Verbal (COWAT/FAS)</h2>
        <p style={{ color: 'var(--color-text-secondary)', marginBottom: '16px' }}>
          3 rondas de {FAS_DURATION} segundos cada una. Escribe todas las palabras que comiencen con cada letra.
        </p>
        <ul style={{ textAlign: 'left', maxWidth: '400px', margin: '0 auto 24px', fontSize: '0.85rem', color: 'var(--color-text-secondary)', lineHeight: 1.8 }}>
          {FAS_RULES.map((r, i) => (
            <li key={i}>{r}</li>
          ))}
        </ul>
        <button
          className="btn btn-primary"
          onClick={() => {
            setCurrentRound(0);
            setTimeLeft(FAS_DURATION);
            setTimeout(() => inputRef.current?.focus(), 100);
          }}
          style={{ padding: '14px 40px', fontSize: '1.05rem' }}
          data-testid="fas-start"
        >
          Comenzar (3 rondas de {FAS_DURATION}s)
        </button>
      </div>
    );
  }

  // ─── FINISHED ───────────────────────────────────────
  if (currentRound === 3) return null;

  // ─── PLAYING ────────────────────────────────────────
  return (
    <div className="fas-task" style={{ textAlign: 'center' }}>
      {/* Indicador de ronda */}
      <div style={{ marginBottom: '8px', fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>
        <span data-testid="fas-round">Ronda {currentRound + 1} de 3</span>
      </div>

      {/* Cronómetro */}
      <div style={{ marginBottom: '16px' }}>
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
          marginBottom: '4px',
        }}>
          <span data-testid="fas-letter" style={{ fontSize: '1.1rem', fontWeight: 600 }}>{letter}</span>
          <span style={{
            fontSize: '2rem', fontWeight: 700, color: urgencyColor,
            fontVariantNumeric: 'tabular-nums',
          }} data-testid="fas-timer">
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
            data-testid="fas-input"
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

      {/* Flash */}
      {flash && (
        <div style={{
          display: 'inline-block', padding: '4px 14px', borderRadius: '16px',
          fontSize: '0.85rem', marginBottom: '8px', fontWeight: 500,
          background: flash.type === 'success' ? 'var(--color-success-bg)' : 'var(--color-danger-bg)',
          color: flash.type === 'success' ? 'var(--color-success)' : 'var(--color-danger)',
          border: `1px solid ${flash.type === 'success' ? 'var(--color-success-border)' : 'var(--color-danger-border)'}`,
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
        <div data-testid="fas-word-chips" style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', justifyContent: 'center', maxWidth: '500px', margin: '0 auto' }}>
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

      {/* Botón siguiente ronda */}
      {words.length >= 3 && (
        <button
          className="btn btn-link"
          onClick={nextRound}
          data-testid="fas-next-round"
          style={{ marginTop: '20px', fontSize: '0.85rem', color: 'var(--color-text-tertiary)' }}
        >
          {currentRound < 2 ? 'Siguiente letra' : 'Terminar y ver resultados'}
        </button>
      )}
    </div>
  );
}
