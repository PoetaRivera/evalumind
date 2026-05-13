import { describe, it, expect } from 'vitest';
import { calculateFasScore } from './fasScoring';

describe('calculateFasScore', () => {
  it('returns unified interface', () => {
    const r = calculateFasScore(['fresa', 'flor', 'fuego'], 'F');
    expect(r).toHaveProperty('total');
    expect(r).toHaveProperty('category');
    expect(r).toHaveProperty('description');
    expect(r).toHaveProperty('childhoodNote');
    expect(r).toHaveProperty('dimensions');
    expect(r).toHaveProperty('maxScores');
    expect(r).toHaveProperty('profiles');
    expect(typeof r.total).toBe('number');
  });

  it('fluidez-baja for less than 8 words', () => {
    const r = calculateFasScore(['fresa', 'flor', 'fuego', 'faro', 'fiesta'], 'F');
    expect(r.total).toBe(5);
    expect(r.category).toBe('fluidez-baja');
  });

  it('fluidez-moderada for 8-13 words', () => {
    const words = ['fresa', 'flor', 'fuego', 'faro', 'fiesta', 'foca', 'familia', 'fase'];
    const r = calculateFasScore(words, 'F');
    expect(r.total).toBe(8);
    expect(r.category).toBe('fluidez-moderada');
  });

  it('fluidez-alta for 14+ words', () => {
    const words = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n'];
    const r = calculateFasScore(words, 'F');
    expect(r.total).toBe(14);
    expect(r.category).toBe('fluidez-alta');
  });

  it('deduplicates words', () => {
    const r = calculateFasScore(['fresa', 'Fresa', 'FRESA', 'flor'], 'F');
    expect(r.words).toHaveLength(2);
    expect(r.fluency).toBe(2);
  });

  it('detects perseveration when >40% in one category and >5 words', () => {
    // All words are animales → maxCategoryCount = all
    const words = ['perro', 'gato', 'pez', 'pajaro', 'vaca', 'cerdo'];
    const r = calculateFasScore(words, 'F');
    // All classify as "animales", so maxCategoryCount = 6, perseverationRatio = 6/6 = 1.0 > 0.4, >5 words
    expect(r.hasPerseveration).toBe(true);
    expect(r.perseverationRatio).toBeGreaterThan(0.4);
  });

  it('includes letter in result', () => {
    const r = calculateFasScore(['fresa', 'flor'], 'A');
    expect(r.letter).toBe('A');
  });

  it('includes flexibility count', () => {
    const r = calculateFasScore(['fresa', 'flor', 'fuego'], 'F');
    expect(r.flexibility).toBeGreaterThanOrEqual(0);
    expect(r.categories).toBeInstanceOf(Array);
  });

  it('childhoodNote is non-empty', () => {
    const r = calculateFasScore(['fresa', 'flor', 'fuego', 'faro', 'fiesta', 'foca', 'familia'], 'F');
    expect(r.childhoodNote.length).toBeGreaterThan(20);
  });

  it('description is non-empty', () => {
    const r = calculateFasScore(['fresa', 'flor', 'fuego', 'faro', 'fiesta', 'foca', 'familia'], 'F');
    expect(r.description.length).toBeGreaterThan(10);
  });

  it('maxScores total is 30', () => {
    const r = calculateFasScore(['fresa'], 'F');
    expect(r.maxScores.total).toBe(30);
  });
});
