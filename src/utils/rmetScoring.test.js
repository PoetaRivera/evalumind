import { describe, it, expect } from 'vitest';
import { calculateRmetScore } from './rmetScoring';

function makeResponses(correctCount, totalCount) {
  const responses = [];
  for (let i = 0; i < totalCount; i++) {
    responses.push({
      trialId: i + 1,
      selected: i < correctCount ? 0 : 1,
      correct: 0,
    });
  }
  return responses;
}

describe('calculateRmetScore', () => {
  it('returns unified interface', () => {
    const r = calculateRmetScore(makeResponses(12, 24));
    expect(r).toHaveProperty('total');
    expect(r).toHaveProperty('category');
    expect(r).toHaveProperty('description');
    expect(r).toHaveProperty('childhoodNote');
    expect(r).toHaveProperty('dimensions');
    expect(r).toHaveProperty('maxScores');
    expect(r).toHaveProperty('profiles');
    expect(r).toHaveProperty('correct');
    expect(r).toHaveProperty('totalTrials');
    expect(typeof r.total).toBe('number');
  });

  it('100% correct — mentalizacion-alta', () => {
    const r = calculateRmetScore(makeResponses(24, 24));
    expect(r.total).toBe(100);
    expect(r.correct).toBe(24);
    expect(r.totalTrials).toBe(24);
    expect(r.category).toBe('mentalizacion-alta');
  });

  it('75% exact — mentalizacion-alta (threshold)', () => {
    const r = calculateRmetScore(makeResponses(18, 24));
    expect(r.total).toBe(75);
    expect(r.category).toBe('mentalizacion-alta');
  });

  it('74% — mentalizacion-moderada (below threshold)', () => {
    const responses = makeResponses(17, 24);
    // 17/24 = 70.8%, round to 71
    responses[0].correct = 0;
    const r = calculateRmetScore(responses);
    expect(r.category).toBe('mentalizacion-moderada');
    expect(r.total).toBe(71);
  });

  it('55% exact — mentalizacion-moderada (threshold)', () => {
    // 14/24 = 58%, closest to 55 threshold
    const r = calculateRmetScore(makeResponses(14, 24));
    expect(r.total).toBe(58);
    expect(r.category).toBe('mentalizacion-moderada');
  });

  it('54% — mentalizacion-baja (below threshold)', () => {
    // 13/24 = 54%
    const r = calculateRmetScore(makeResponses(13, 24));
    expect(r.total).toBe(54);
    expect(r.category).toBe('mentalizacion-baja');
  });

  it('0% — mentalizacion-baja', () => {
    const allWrong = Array.from({ length: 24 }, (_, i) => ({
      trialId: i + 1,
      selected: 1,
      correct: 0,
    }));
    const r = calculateRmetScore(allWrong);
    expect(r.total).toBe(0);
    expect(r.correct).toBe(0);
    expect(r.category).toBe('mentalizacion-baja');
  });

  it('profile for accuracy below 60', () => {
    const r = calculateRmetScore(makeResponses(10, 24)); // 42%
    expect(r.profiles).toHaveLength(1);
    expect(r.profiles[0].id).toBe('mentalizacion-en-observacion');
  });

  it('no profile for accuracy >= 60', () => {
    const r = calculateRmetScore(makeResponses(15, 24)); // 63%
    expect(r.profiles).toHaveLength(0);
  });

  it('empty array — error case', () => {
    const r = calculateRmetScore([]);
    expect(r.error).toBe('No hay respuestas');
    expect(r.total).toBe(0);
    expect(r.category).toBe('');
  });

  it('null/undefined — error case', () => {
    const r = calculateRmetScore(null);
    expect(r.error).toBe('No hay respuestas');
    expect(r.total).toBe(0);
  });

  it('dimension has theoryOfMind key', () => {
    const r = calculateRmetScore(makeResponses(18, 24));
    expect(r.dimensions).toHaveLength(1);
    expect(r.dimensions[0].key).toBe('theoryOfMind');
    expect(r.dimensions[0].score).toBe(75);
    expect(r.dimensions[0].max).toBe(100);
  });

  it('childhoodNote mentions textual adaptation', () => {
    const r = calculateRmetScore(makeResponses(12, 24));
    expect(r.childhoodNote).toContain('adaptación textual');
    expect(r.childhoodNote).toContain('Baron-Cohen');
  });
});
