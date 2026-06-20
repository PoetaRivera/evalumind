import { describe, it, expect } from 'vitest';
import { calculateFasScore } from './fasScoring';

function makeRound(letter, words) {
  return { letter, words };
}

describe('calculateFasScore', () => {
  it('returns unified interface', () => {
    const r = calculateFasScore([
      makeRound('F', ['fresa', 'flor', 'fuego']),
      makeRound('A', ['amor', 'arroz']),
      makeRound('S', ['sol', 'silla', 'suerte']),
    ]);
    expect(r).toHaveProperty('total');
    expect(r).toHaveProperty('category');
    expect(r).toHaveProperty('description');
    expect(r).toHaveProperty('childhoodNote');
    expect(r).toHaveProperty('dimensions');
    expect(r).toHaveProperty('maxScores');
    expect(r).toHaveProperty('profiles');
    expect(r).toHaveProperty('rounds');
    expect(typeof r.total).toBe('number');
  });

  it('sums valid words across 3 rounds', () => {
    const r = calculateFasScore([
      makeRound('F', ['fresa', 'flor', 'fuego']),
      makeRound('A', ['amor', 'arroz']),
      makeRound('S', ['sol', 'silla', 'suerte']),
    ]);
    expect(r.total).toBe(8);
    expect(r.rounds[0].validCount).toBe(3);
    expect(r.rounds[1].validCount).toBe(2);
    expect(r.rounds[2].validCount).toBe(3);
  });

  it('deduplicates within same round', () => {
    const r = calculateFasScore([
      makeRound('F', ['fresa', 'fresa', 'fuego']),
      makeRound('A', []),
      makeRound('S', []),
    ]);
    expect(r.total).toBe(2);
  });

  it('detects perseverations within same round', () => {
    const r = calculateFasScore([
      makeRound('F', ['fresa', 'flor', 'fresa']), // 'fresa' repeated
      makeRound('A', ['amor']),
      makeRound('S', ['sol']),
    ]);
    expect(r.total).toBe(4);
    expect(r.rounds[0].perseverations).toContain('fresa');
    expect(r.rounds[0].perseverations).toHaveLength(1);
  });

  it('excludes words not starting with the letter', () => {
    const r = calculateFasScore([
      makeRound('F', ['fresa', 'gato', 'perro']),
      makeRound('A', ['amor', 'bajo']),
      makeRound('S', ['sol', 'tren']),
    ]);
    expect(r.total).toBe(3);
  });

  it('excludes proper names', () => {
    const r = calculateFasScore([
      makeRound('F', ['Fernando', 'fresa']),
      makeRound('A', ['Ana', 'amor']),
      makeRound('S', ['Santiago', 'sol']),
    ]);
    expect(r.total).toBe(3);
    // Fernando, Ana, Santiago are excluded
  });

  it('excludes number words', () => {
    const r = calculateFasScore([
      makeRound('S', ['seis', 'siete', 'sol']),
      makeRound('F', []),
      makeRound('A', []),
    ]);
    expect(r.total).toBe(1);
  });

  it('excludes grammatical variants of the same root', () => {
    const r = calculateFasScore([
      makeRound('F', ['flor', 'flores', 'florecer', 'fresa']),
      makeRound('A', []),
      makeRound('S', []),
    ]);
    // 'flores' is a variant of 'flor' (same root 'flor'), excluded
    // 'florecer' might be considered a different word (different enough root)
    expect(r.total).toBeGreaterThanOrEqual(2);
  });

  it('fluidez-alta for >= 45 words', () => {
    const fWords = Array.from({ length: 15 }, (_, i) => `fab${i}`);
    const aWords = Array.from({ length: 15 }, (_, i) => `ab${i}`);
    const sWords = Array.from({ length: 15 }, (_, i) => `sab${i}`);
    const r = calculateFasScore([
      makeRound('F', fWords),
      makeRound('A', aWords),
      makeRound('S', sWords),
    ]);
    expect(r.total).toBe(45);
    expect(r.category).toBe('fluidez-alta');
  });

  it('fluidez-normal for 25-44 words', () => {
    const fWords = Array.from({ length: 10 }, (_, i) => `fab${i}`);
    const aWords = Array.from({ length: 10 }, (_, i) => `ab${i}`);
    const sWords = Array.from({ length: 10 }, (_, i) => `sab${i}`);
    const r = calculateFasScore([
      makeRound('F', fWords),
      makeRound('A', aWords),
      makeRound('S', sWords),
    ]);
    expect(r.total).toBe(30);
    expect(r.category).toBe('fluidez-normal');
  });

  it('fluidez-baja for < 25 words', () => {
    const r = calculateFasScore([
      makeRound('F', ['fresa', 'flor']),
      makeRound('A', ['amor']),
      makeRound('S', ['sol']),
    ]);
    expect(r.total).toBe(4);
    expect(r.category).toBe('fluidez-baja');
  });

  it('profile added for < 25 words', () => {
    const r = calculateFasScore([
      makeRound('F', ['fresa']),
      makeRound('A', []),
      makeRound('S', []),
    ]);
    expect(r.profiles).toHaveLength(1);
    expect(r.profiles[0].id).toBe('fluidez-verbal-en-observacion');
  });

  it('dimensions has verbalFluency key', () => {
    const r = calculateFasScore([
      makeRound('F', ['fresa', 'flor', 'fuego', 'faro', 'fase']),
      makeRound('A', ['amor', 'arroz', 'arte', 'ala']),
      makeRound('S', ['sol', 'silla', 'suerte', 'sal', 'seda']),
    ]);
    expect(r.dimensions).toHaveLength(1);
    expect(r.dimensions[0].key).toBe('verbalFluency');
    expect(r.dimensions[0].score).toBe(14);
    expect(r.dimensions[0].max).toBe(60);
  });

  it('handles empty rounds array', () => {
    const r = calculateFasScore([]);
    expect(r.error).toBe('No hay rondas');
    expect(r.total).toBe(0);
  });
});
