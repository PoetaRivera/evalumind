import { useState, useEffect, useRef, useCallback } from 'react';
import { FAS_DURATION, FAS_RULES, classifyFASWord } from '../../data/fasConfig';

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
  }, [isActive, paused, timeLeft]);

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

  const finishTask = () => {
    setIsActive(false);
    setIsFinished(true);

    const cleanWords = [...new Set(words.map((w) => w.toLowerCase().trim()))];
    const categories = new Set();
    const categoryCounts = {};

    for (const w of cleanWords) {
      const cat = classifyFASWord(w);
      categories.add(cat);
      categoryCounts[cat] = (categoryCounts[cat] || 0) + 1;
    }

    const maxCategoryCount = Math.max(...Object.values(categoryCounts), 0);
    const perseverationRatio = cleanWords.length > 0 ? maxCategoryCount / cleanWords.length : 0;
    const hasPerseveration = perseverationRatio > 0.4 && cleanWords.length > 5;

    let description = '';
    if (cleanWords.length < 8) {
      description =
        'Fluidez verbal baja. Esto puede deberse a ansiedad, agotamiento o dificultades en el acceso léxico. ' +
        'Considera repetir la tarea en otro momento para comparar.';
    } else if (categories.size < 3 && hasPerseveration) {
      description =
        'Buena fluidez pero baja flexibilidad. Tendiste a quedarte en una misma categoría semántica. ' +
        'Esto puede indicar perseveración: dificultad para cambiar de estrategia.';
    } else if (cleanWords.length >= 12 && categories.size >= 4) {
      description =
        'Buena fluidez y flexibilidad verbal. Tu capacidad para generar palabras rápidamente y saltar entre categorías ' +
        'sugiere un acceso léxico ágil y buena flexibilidad cognitiva.';
    } else {
      description =
        'Fluidez verbal moderada. El patrón sugiere un funcionamiento dentro de lo esperado, ' +
        'aunque el contexto (estrés, fatiga) puede influir en este tipo de tareas.';
    }

    onComplete({
      letter,
      words: cleanWords,
      allWords: words,
      total,
      fluency: cleanWords.length,
      flexibility: categories.size,
      categories: [...categories],
      hasPerseveration,
      perseverationRatio: parseFloat(perseverationRatio.toFixed(2)),
      total: cleanWords.length,
      dimensions: [],
      maxScores: { total: 30 },
      profiles: [],
      category: cleanWords.length < 8 ? 'fluidez-baja' : cleanWords.length < 14 ? 'fluidez-moderada' : 'fluidez-alta',
      description,
      childhoodNote:
        'La fluidez verbal es una habilidad cognitiva que puede verse afectada por la ansiedad, el estrés o la fatiga. ' +
        'No mide inteligencia ni vocabulario: mide la facilidad de acceso al léxico bajo presión de tiempo. ' +
        'Un resultado bajo en un día de cansancio no refleja tu capacidad real en un día tranquilo.',
    });
  };

  const pct = ((FAS_DURATION - timeLeft) / FAS_DURATION) * 100;
  const urgencyColor = timeLeft <= 10 ? '#dc2626' : timeLeft <= 20 ? '#f59e0b' : '#6366f1';

  if (!isActive && !isFinished) {
    return (
      <div className="fas-intro" style={{ textAlign: 'center', padding: '32px 20px' }}>
        <div style={{
          width: '80px', height: '80px', borderRadius: '50%', background: '#eff6ff',
          display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px',
          fontSize: '2rem', fontWeight: 700, color: '#3b82f6',
        }}>
          {letter}
        </div>
        <h2 style={{ fontSize: '1.3rem', marginBottom: '8px' }}>Fluencia Verbal: Letra "{letter}"</h2>
        <p style={{ color: '#6b7280', marginBottom: '16px' }}>
          Tienes {FAS_DURATION} segundos. Escribe todas las palabras que comiencen con la letra <strong>{letter}</strong>.
        </p>
        <ul style={{ textAlign: 'left', maxWidth: '400px', margin: '0 auto 24px', fontSize: '0.85rem', color: '#4b5563', lineHeight: 1.8 }}>
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
    const result = {
      words: [...new Set(words.map((w) => w.toLowerCase().trim()))],
      allWords: words,
    };
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
          <span style={{ fontSize: '0.95rem', color: '#6b7280' }}>s</span>
        </div>
        <div style={{
          width: '200px', height: '4px', background: '#f3f4f6', borderRadius: '2px',
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
        <p style={{ color: '#dc2626', fontSize: '0.85rem', marginBottom: '8px' }}>{error}</p>
      )}

      {/* Flash visual de feedback */}
      {flash && (
        <div style={{
          display: 'inline-block', padding: '4px 14px', borderRadius: '16px',
          fontSize: '0.85rem', marginBottom: '8px', fontWeight: 500,
          background: flash.type === 'success' ? '#dcfce7' : '#fef2f2',
          color: flash.type === 'success' ? '#16a34a' : '#dc2626',
          border: `1px solid ${flash.type === 'success' ? '#bbf7d0' : '#fecaca'}`,
          animation: 'fadeIn 0.2s ease',
        }}>
          {flash.type === 'success' ? `+ ${flash.word}` : `✕ ${flash.word}`}
        </div>
      )}

      {/* Contador */}
      <p style={{ fontSize: '0.95rem', color: '#6b7280', marginBottom: '12px' }}>
        {words.length} palabra{words.length !== 1 ? 's' : ''}
      </p>

      {/* Chips */}
      {words.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', justifyContent: 'center', maxWidth: '500px', margin: '0 auto' }}>
          {words.map((w, i) => (
            <span key={i} style={{
              background: '#eff6ff', color: '#1e40af', padding: '4px 12px',
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
          style={{ marginTop: '20px', fontSize: '0.85rem', color: '#9ca3af' }}
        >
          Terminar y ver resultados
        </button>
      )}
    </div>
  );
}
