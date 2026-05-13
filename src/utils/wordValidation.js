// ═══════════════════════════════════════════════════
// Validación de palabras para el DAT
// ═══════════════════════════════════════════════════

const BLOCKED_WORDS = new Set([
  'el', 'la', 'los', 'las', 'un', 'una', 'unos', 'unas',
  'de', 'del', 'en', 'con', 'por', 'para', 'sin', 'sobre', 'entre', 'hacia',
  'yo', 'tú', 'él', 'ella', 'usted', 'nosotros', 'vosotros', 'ellos', 'ellas',
  'mi', 'tu', 'su', 'nuestro', 'vuestro', 'mío', 'tuyo', 'suyo',
  'me', 'te', 'se', 'lo', 'le', 'nos', 'os', 'les',
  'es', 'ha', 'han', 'he', 'hay', 'fue', 'ser', 'estar',
  'muy', 'más', 'menos', 'tan', 'así', 'tal', 'cual',
  'que', 'donde', 'cuando', 'como', 'porque', 'aunque', 'pero',
  'esto', 'eso', 'aquello', 'este', 'ese', 'aquel',
  'cada', 'todo', 'nada', 'algo', 'alguien', 'nadie',
  'si', 'no', 'ya', 'aún', 'también', 'tampoco',
]);

const VERB_ENDINGS = /(ar|er|ir|ando|iendo|ado|ido|aba|ía|aste|iste|ó|ió|aron|ieron|aré|eré|iré|aría|ería|iría|ase|ese|are|ere)$/i;

const NUMBER_PATTERN = /^\d+$/;

const PROPER_NOUN_PATTERN = /^[A-ZÁÉÍÓÚÜÑ][a-záéíóúüñ]+$/;

/**
 * Valida una palabra individual. Retorna { valid, error }.
 */
export function validateWord(word, existingWords = []) {
  const trimmed = word.trim();

  if (!trimmed) {
    return { valid: false, error: 'Escribe una palabra' };
  }

  if (trimmed.length < 3) {
    return { valid: false, error: 'Mínimo 3 caracteres' };
  }

  if (trimmed.includes(' ')) {
    return { valid: false, error: 'Solo una palabra, no frases' };
  }

  if (NUMBER_PATTERN.test(trimmed)) {
    return { valid: false, error: 'No uses números sueltos' };
  }

  const lower = trimmed.toLowerCase();

  if (BLOCKED_WORDS.has(lower)) {
    return { valid: false, error: 'Evita artículos, preposiciones y palabras funcionales' };
  }

  // No nombres propios capitalizados
  if (PROPER_NOUN_PATTERN.test(trimmed) && trimmed.length > 3) {
    return { valid: false, error: 'No uses nombres propios. Usa la categoría general (ej: "país" en vez de "México")' };
  }

  // No verbos conjugados (aproximación por terminación)
  if (VERB_ENDINGS.test(lower) && lower.length > 5) {
    return { valid: false, error: 'No uses verbos conjugados. Usa el sustantivo relacionado (ej: "velocidad" en vez de "correr")' };
  }

  // Duplicados exactos
  if (existingWords.some((w) => w.toLowerCase() === lower)) {
    return { valid: false, error: 'Esta palabra ya la agregaste' };
  }

  // Derivados cercanos (misma raíz)
  const stem = lower.slice(0, Math.floor(lower.length * 0.7));
  if (existingWords.some((w) => w.toLowerCase().startsWith(stem) && w.length > 3)) {
    return { valid: false, error: 'Muy similar a otra palabra que ya agregaste' };
  }

  return { valid: true, error: null };
}

/**
 * Valida un array de palabras antes del scoring.
 * Retorna { valid, cleanWords, errors }.
 */
export function validateWordSet(words) {
  const errors = [];

  if (!words || words.length < 7) {
    errors.push('Se requieren al menos 7 palabras válidas');
  }

  return {
    valid: errors.length === 0 && words.length >= 7,
    cleanWords: words || [],
    errors,
  };
}
