import { describe, it, expect } from 'vitest';
import { validateWord, validateWordSet } from './wordValidation';

describe('validateWord', () => {
  it('rejects empty string', () => {
    const r = validateWord('');
    expect(r.valid).toBe(false);
    expect(r.error).toBe('Escribe una palabra');
  });

  it('rejects whitespace only', () => {
    const r = validateWord('   ');
    expect(r.valid).toBe(false);
    expect(r.error).toBe('Escribe una palabra');
  });

  it('rejects words shorter than 3 characters', () => {
    const r = validateWord('ab');
    expect(r.valid).toBe(false);
    expect(r.error).toBe('Mínimo 3 caracteres');
  });

  it('rejects phrases (contains space)', () => {
    const r = validateWord('hola mundo');
    expect(r.valid).toBe(false);
    expect(r.error).toBe('Solo una palabra, no frases');
  });

  it('rejects numeric strings', () => {
    const r = validateWord('123');
    expect(r.valid).toBe(false);
    expect(r.error).toBe('No uses números sueltos');
  });

  it('rejects blocked functional words', () => {
    const r = validateWord('para');
    expect(r.valid).toBe(false);
    expect(r.error).toBe('Evita artículos, preposiciones y palabras funcionales');
  });

  it('rejects uppercase proper nouns', () => {
    const r = validateWord('México');
    expect(r.valid).toBe(false);
    expect(r.error).toBe('No uses nombres propios. Usa la categoría general (ej: "país" en vez de "México")');
  });

  it('accepts short proper nouns (3 chars or less, no ending trigger)', () => {
    // "Sol" is 3 chars, doesn't match VERB_ENDINGS (which requires length > 5)
    const r = validateWord('Sol');
    expect(r.valid).toBe(true);
    expect(r.error).toBeNull();
  });

  it('rejects conjugated verbs', () => {
    const r = validateWord('corriendo');
    expect(r.valid).toBe(false);
    expect(r.error).toBe('No uses verbos conjugados. Usa el sustantivo relacionado (ej: "velocidad" en vez de "correr")');
  });

  it('rejects duplicates (case insensitive)', () => {
    const r = validateWord('casa', ['casa']);
    expect(r.valid).toBe(false);
    expect(r.error).toBe('Esta palabra ya la agregaste');
  });

  it('rejects near-similar words sharing stem', () => {
    const r = validateWord('caserío', ['casero']);
    expect(r.valid).toBe(false);
    expect(r.error).toBe('Muy similar a otra palabra que ya agregaste');
  });

  it('accepts valid word', () => {
    const r = validateWord('mariposa');
    expect(r.valid).toBe(true);
    expect(r.error).toBeNull();
  });

  it('accepts valid word with existing unrelated words', () => {
    const r = validateWord('mariposa', ['elefante', 'computadora']);
    expect(r.valid).toBe(true);
    expect(r.error).toBeNull();
  });

  it('trims whitespace before validation', () => {
    const r = validateWord('  flor  ');
    expect(r.valid).toBe(true);
    expect(r.error).toBeNull();
  });
});

describe('validateWordSet', () => {
  it('rejects less than 7 words', () => {
    const r = validateWordSet(['sol', 'luna', 'mar', 'rio', 'flor', 'luz']);
    expect(r.valid).toBe(false);
    expect(r.errors).toContain('Se requieren al menos 7 palabras válidas');
  });

  it('rejects empty array', () => {
    const r = validateWordSet([]);
    expect(r.valid).toBe(false);
  });

  it('rejects null/undefined', () => {
    const r = validateWordSet(null);
    expect(r.valid).toBe(false);
  });

  it('accepts 7 words', () => {
    const r = validateWordSet(['sol', 'luna', 'mar', 'rio', 'flor', 'luz', 'piedra']);
    expect(r.valid).toBe(true);
    expect(r.errors).toHaveLength(0);
  });

  it('accepts more than 7 words', () => {
    const r = validateWordSet(['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']);
    expect(r.valid).toBe(true);
  });

  it('returns cleanWords array', () => {
    const words = ['sol', 'luna', 'mar', 'rio', 'flor', 'luz', 'piedra'];
    const r = validateWordSet(words);
    expect(r.cleanWords).toEqual(words);
  });
});
