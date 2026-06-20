import { describe, it, expect } from 'vitest';
import {
  calculateTdahScore,
  calculateTeaScore,
  calculateHspScore,
  calculateAlexithymiaScore,
  calculateRsdScore,
  calculateMaskingBurnoutScore,
  calculateExecutiveScore,
  calculateDatScore,
} from './scoring';

// ─── Helpers ─────────────────────────────────────

const all = (n, value) => new Array(n).fill(value);

// ─── TDAH (ASRS-5) ────────────────────────────────────────

describe('calculateTdahScore', () => {
  it('all zeros → baja probabilidad, score 0, screener negativo', () => {
    const r = calculateTdahScore(all(18, 0));
    expect(r.total).toBe(0);
    expect(r.category).toBe('baja-probabilidad');
    expect(r.profiles).toHaveLength(0);
    expect(r.screenerPositive).toBe(false);
    expect(r.screenerPositiveCount).toBe(0);
  });

  it('all max (4) → alta probabilidad, score 72, combined', () => {
    const r = calculateTdahScore(all(18, 4));
    expect(r.total).toBe(72);
    expect(r.category).toBe('alta-probabilidad');
    expect(r.profiles).toHaveLength(1);
    expect(r.profiles[0].id).toBe('tdah-combinado');
    expect(r.screenerPositive).toBe(true);
  });

  it('ASRS: 17 puntos → baja probabilidad', () => {
    const answers = new Array(18).fill(0);
    for (let i = 0; i < 17; i++) answers[i] = 1;
    const r = calculateTdahScore(answers);
    expect(r.total).toBe(17);
    expect(r.category).toBe('baja-probabilidad');
  });

  it('ASRS: 18 puntos → moderada probabilidad', () => {
    const r = calculateTdahScore(all(18, 1));
    expect(r.total).toBe(18);
    expect(r.category).toBe('moderada-probabilidad');
  });

  it('ASRS: 24 puntos → alta probabilidad', () => {
    const answers = new Array(18).fill(0);
    for (let i = 0; i < 12; i++) answers[i] = 2;
    const r = calculateTdahScore(answers);
    expect(r.total).toBe(24);
    expect(r.category).toBe('alta-probabilidad');
  });

  it('screener: 3 items ≥2 → negativo', () => {
    const answers = new Array(18).fill(0);
    answers[0] = 2; answers[1] = 2; answers[2] = 2;
    const r = calculateTdahScore(answers);
    expect(r.screenerPositiveCount).toBe(3);
    expect(r.screenerPositive).toBe(false);
  });

  it('screener: 4 items ≥2 → positivo', () => {
    const answers = new Array(18).fill(0);
    answers[0] = 2; answers[1] = 2; answers[2] = 2; answers[3] = 2;
    const r = calculateTdahScore(answers);
    expect(r.screenerPositiveCount).toBe(4);
    expect(r.screenerPositive).toBe(true);
  });

  it('dimensions have 2 DSM-5 keys with correct max', () => {
    const r = calculateTdahScore(all(18, 2));
    expect(r.dimensions).toHaveLength(2);
    expect(r.dimensions[0]).toEqual({ key: 'inattention', label: 'Inatención', score: 18, max: 36 });
    expect(r.dimensions[1]).toEqual({ key: 'hyperactivityImpulsivity', label: 'Hiperactividad-Impulsividad', score: 18, max: 36 });
  });

  it('inattention profile: items at 2 each = 18 = threshold', () => {
    const answers = new Array(18).fill(0);
    // Inattention indices: 0,1,2,3,6,7,8,16,17
    [0, 1, 2, 3, 6, 7, 8, 16, 17].forEach((i) => { answers[i] = 2; });
    const r = calculateTdahScore(answers);
    expect(r.dimensions[0].score).toBe(18);
    expect(r.profiles.some((p) => p.id === 'inatencion-predominante')).toBe(true);
  });

  it('hyperactivity profile: items at 2 each = 18 = threshold', () => {
    const answers = new Array(18).fill(0);
    // Hyperactivity indices: 4,5,9,10,11,12,13,14,15
    [4, 5, 9, 10, 11, 12, 13, 14, 15].forEach((i) => { answers[i] = 2; });
    const r = calculateTdahScore(answers);
    expect(r.dimensions[1].score).toBe(18);
    expect(r.profiles.some((p) => p.id === 'hiperactivo-impulsivo-predominante')).toBe(true);
  });

  it('both above threshold → combined presentation', () => {
    const r = calculateTdahScore(all(18, 2));
    expect(r.profiles).toHaveLength(1);
    expect(r.profiles[0].id).toBe('tdah-combinado');
  });

  it('childhoodNote states non-diagnostic scope', () => {
    const r = calculateTdahScore(all(18, 2));
    expect(r.childhoodNote).toBeTruthy();
    expect(r.childhoodNote).toContain('no confirma ni descarta TDAH');
  });

  it('maxScores matches expected', () => {
    const r = calculateTdahScore(all(18, 0));
    expect(r.maxScores).toEqual({
      inattention: 36,
      hyperactivityImpulsivity: 36,
      total: 72,
    });
  });
});

// ─── TEA ─────────────────────────────────────────

describe('calculateTeaScore', () => {
  it('all 0 (agree) → score depends on reverse items', () => {
    // 4 reverse items at indices 0,11,40,41: agree=0 → NOT autistic → 0 points
    // 46 non-reverse: agree=0 → autistic → 46 points
    const r = calculateTeaScore(all(50, 0));
    expect(r.total).toBe(46);
    expect(r.category).toBe('alta-probabilidad');
  });

  it('all 3 (disagree) → reverse items score 1', () => {
    // 4 reverse items: disagree=3 → autistic → 4 points
    // 46 non-reverse: disagree=3 → NOT autistic → 0 points
    const r = calculateTeaScore(all(50, 3));
    expect(r.total).toBe(4);
    expect(r.category).toBe('baja-probabilidad');
  });

  it('all 1 (slightly agree) → same as all 0 for binary scoring', () => {
    const r = calculateTeaScore(all(50, 1));
    expect(r.total).toBe(46);
  });

  it('cutoff ≥32 → alta-probabilidad', () => {
    // 32 agree responses = 32 points
    const answers = [...all(32, 0), ...all(18, 3)];
    const r = calculateTeaScore(answers);
    expect(r.total).toBe(32);
    expect(r.category).toBe('alta-probabilidad');
  });

  it('cutoff 26-31 → moderada-probabilidad', () => {
    // Start: all 50 at value 3 (disagree) = 4 points (only 4 reverse items score)
    // Add 24 non-reverse items set to agree (0) = +24 = 28 total
    const answers = all(50, 3);
    let set = 0;
    for (let i = 0; i < 50 && set < 24; i++) {
      if (![0, 11, 40, 41].includes(i)) { answers[i] = 0; set++; }
    }
    const r = calculateTeaScore(answers);
    expect(r.total).toBe(28);
    expect(r.category).toBe('moderada-probabilidad');
  });

  it('cutoff ≤25 → baja-probabilidad', () => {
    const r = calculateTeaScore(all(50, 3));
    expect(r.total).toBe(4);
    expect(r.category).toBe('baja-probabilidad');
  });

  it('reverse items at correct indices', () => {
    // All 50 at agree (1): reverse items at 0,11,40,41 → 0 pts, non-reverse → 46 pts
    // Set index 0 (reverse) to disagree (3): now index 0 scores 1
    // Total: 46 + 1 = 47
    const answers = all(50, 1);
    answers[0] = 3;
    const r = calculateTeaScore(answers);
    expect(r.total).toBe(47);
  });

  it('childhoodNote states non-diagnostic scope', () => {
    const r = calculateTeaScore(all(50, 1));
    expect(r.childhoodNote).toContain('no confirma ni descarta TEA');
  });

  it('maxScores.total is 50', () => {
    const r = calculateTeaScore(all(50, 1));
    expect(r.maxScores.total).toBe(50);
  });

  it('profile added when ≥32', () => {
    const r = calculateTeaScore(all(50, 0));
    expect(r.profiles).toHaveLength(1);
    expect(r.profiles[0].id).toBe('aq-alto');
  });
});

// ─── HSP ─────────────────────────────────────────

describe('calculateHspScore', () => {
  it('all 0 → sensibilidad-promedio', () => {
    const r = calculateHspScore(all(27, 0));
    expect(r.total).toBe(0);
    expect(r.category).toBe('sensibilidad-promedio');
  });

  it('all 6 → alta-sensibilidad-marcada', () => {
    const r = calculateHspScore(all(27, 6));
    expect(r.total).toBe(162);
    expect(r.category).toBe('alta-sensibilidad-marcada');
    expect(r.profiles).toHaveLength(4);
  });

  it('cutoff ≤100 → sensibilidad-promedio', () => {
    const r = calculateHspScore(all(27, 3));
    expect(r.total).toBe(81);
    expect(r.category).toBe('sensibilidad-promedio');
  });

  it('cutoff 101-130 → alta-sensibilidad-moderada', () => {
    const r = calculateHspScore(all(27, 4));
    expect(r.total).toBe(108);
    expect(r.category).toBe('alta-sensibilidad-moderada');
  });

  it('childhoodNote mentions HSPS-27', () => {
    const r = calculateHspScore(all(27, 3));
    expect(r.childhoodNote).toContain('HSPS-27');
  });
});

// ─── ALEXITIMIA ──────────────────────────────────

describe('calculateAlexithymiaScore', () => {
  it('all 0 → alexitimia-baja (TAS-20 score=40)', () => {
    const r = calculateAlexithymiaScore(all(20, 0));
    expect(r.total).toBe(40);
    expect(r.category).toBe('alexitimia-baja');
  });

  it('all 4 → alexitimia-marcada (TAS-20 score=80)', () => {
    const r = calculateAlexithymiaScore(all(20, 4));
    expect(r.total).toBe(80);
    expect(r.category).toBe('alexitimia-marcada');
  });

  it('categorías no usan "probabilidad"', () => {
    const r = calculateAlexithymiaScore(all(20, 4));
    expect(r.category).not.toContain('probabilidad');
    expect(r.category).toContain('alexitimia');
  });

  it('childhoodNote mentions TEA', () => {
    const r = calculateAlexithymiaScore(all(20, 2));
    expect(r.childhoodNote).toContain('TEA');
  });

  it('reverse items: all 0 → reverse items score 5 each', () => {
    const r = calculateAlexithymiaScore(all(20, 0));
    // 15 direct × 1 + 5 reverse × (6-1=5) = 15 + 25 = 40
    expect(r.total).toBe(40);
    // DIF: 7 × 1 = 7, DDF: 1×(4 items no-rev×1 + 1 item rev×5) = 4+5=9
    // EOT: 4 no-rev×1 + 4 rev×5 = 4+20 = 24. Total 7+9+24=40
    expect(r.dimensions[0].score).toBe(7);  // DIF
    expect(r.dimensions[1].score).toBe(9);  // DDF
    expect(r.dimensions[2].score).toBe(24); // EOT
  });

  it('reverse items: all 4 → reverse items score 1 each', () => {
    const r = calculateAlexithymiaScore(all(20, 4));
    // 15 direct × 5 + 5 reverse × (6-5=1) = 75 + 5 = 80
    expect(r.total).toBe(80);
  });

  it('cutoff ≤51 → alexitimia-baja', () => {
    // 51 is the boundary. Need to construct it precisely.
    // 15 items at 3, 5 reverse items at 1: 15*4 + 5*(6-2=4) = 60+20 = 80... too high
    // Let's use a custom array: 20 items, all value 1 (score 2 each), 5 reverse = 2 each
    // Actually: all 1 → score 2. Reverse: 6-2=4. 15*2 + 5*4 = 30+20 = 50
    const answers = all(20, 1);
    const r = calculateAlexithymiaScore(answers);
    expect(r.total).toBe(50);
    expect(r.category).toBe('alexitimia-baja');
  });

  it('cutoff 52-60 → alexitimia-moderada', () => {
    // all 2 → score 3. Reverse: 6-3=3. 20*3 = 60
    const r = calculateAlexithymiaScore(all(20, 2));
    expect(r.total).toBe(60);
    expect(r.category).toBe('alexitimia-moderada');
  });

  it('cutoff ≥61 → alexitimia-marcada', () => {
    // all 3 → score 4. Reverse: 6-4=2. 15*4 + 5*2 = 60+10 = 70
    const r = calculateAlexithymiaScore(all(20, 3));
    expect(r.total).toBe(70);
    expect(r.category).toBe('alexitimia-marcada');
  });

  it('3 dimensions with correct labels', () => {
    const r = calculateAlexithymiaScore(all(20, 2));
    expect(r.dimensions).toHaveLength(3);
    expect(r.dimensions[0].key).toBe('identifyingFeelings');
    expect(r.dimensions[1].key).toBe('describingFeelings');
    expect(r.dimensions[2].key).toBe('externallyOriented');
    expect(r.dimensions[0].max).toBe(35);
    expect(r.dimensions[1].max).toBe(25);
    expect(r.dimensions[2].max).toBe(40);
    expect(r.maxScores.total).toBe(100);
  });
});

// ─── RSD ─────────────────────────────────────────

describe('calculateRsdScore', () => {
  it('all zeros → baja-probabilidad', () => {
    const r = calculateRsdScore(all(16, 0));
    expect(r.total).toBe(0);
    expect(r.category).toBe('baja-probabilidad');
  });

  it('all 4 → rsd-marcada, 4 profiles', () => {
    const r = calculateRsdScore(all(16, 4));
    expect(r.total).toBe(64);
    expect(r.category).toBe('rsd-marcada');
    expect(r.profiles).toHaveLength(4);
  });

  it('moderada at boundary ≤40', () => {
    const answers = [...all(10, 4), ...all(6, 0)];
    const r = calculateRsdScore(answers);
    expect(r.total).toBe(40);
    expect(r.category).toBe('rsd-moderada');
  });

  it('childhoodNote mentions TDAH and TEA', () => {
    const r = calculateRsdScore(all(16, 2));
    expect(r.childhoodNote).toContain('TDAH');
    expect(r.childhoodNote).toContain('TEA');
  });
});

// ─── BURNOUT MASKING ─────────────────────────────

describe('calculateMaskingBurnoutScore', () => {
  it('all zeros → bajo-burnout-masking', () => {
    const r = calculateMaskingBurnoutScore(all(13, 0));
    expect(r.total).toBe(0);
    expect(r.category).toBe('bajo-burnout-masking');
  });

  it('all 4 → burnout-masking-severo, 4 profiles, max 52', () => {
    const r = calculateMaskingBurnoutScore(all(13, 4));
    expect(r.total).toBe(52);
    expect(r.category).toBe('burnout-masking-severo');
    expect(r.profiles).toHaveLength(4);
    expect(r.maxScores.total).toBe(52);
  });

  it('max per dimension is irregular', () => {
    const r = calculateMaskingBurnoutScore(all(13, 4));
    expect(r.dimensions[0].max).toBe(16); // physicalExhaustion: 4 items
    expect(r.dimensions[1].max).toBe(12); // identityLoss: 3 items
    expect(r.dimensions[2].max).toBe(8);  // emotionalDisconnect: 2 items
    expect(r.dimensions[3].max).toBe(16); // collapseRecovery: 4 items
  });

  it('identityLoss threshold ≥7 (3 items)', () => {
    // identityLoss: items at indices 4-6 (3 questions). 2+2+3 = 7
    const answers = [...all(4, 0), 2, 2, 3, ...all(6, 0)];
    const r = calculateMaskingBurnoutScore(answers);
    expect(r.profiles.some((p) => p.id === 'perdida-identidad')).toBe(true);
  });

  it('moderado at boundary ≤35', () => {
    // 9 questions at 4 = 36, but we need 35. 8 × 4 + 3 = 35
    const answers = [...all(8, 4), 3, ...all(4, 0)];
    const r = calculateMaskingBurnoutScore(answers);
    expect(r.total).toBe(35);
    expect(r.category).toBe('burnout-masking-moderado');
  });

  it('childhoodNote mentions máscara', () => {
    const r = calculateMaskingBurnoutScore(all(13, 2));
    expect(r.childhoodNote).toContain('máscara');
  });
});

// ─── FUNCIONES EJECUTIVAS ────────────────────────

describe('calculateExecutiveScore', () => {
  it('all zeros → funciones-ejecutivas-preservadas', () => {
    const r = calculateExecutiveScore(all(18, 0));
    expect(r.total).toBe(0);
    expect(r.category).toBe('funciones-ejecutivas-preservadas');
  });

  it('all 4 → dificultades-significativas, max 72', () => {
    const r = calculateExecutiveScore(all(18, 4));
    expect(r.total).toBe(72);
    expect(r.category).toBe('dificultades-ejecutivas-significativas');
    expect(r.maxScores.total).toBe(72);
  });

  it('dimensions have correct lengths (4/5/5/4)', () => {
    const r = calculateExecutiveScore(all(18, 4));
    expect(r.dimensions[0].max).toBe(16); // inhibition: 4 items
    expect(r.dimensions[1].max).toBe(20); // workingMemory: 5 items
    expect(r.dimensions[2].max).toBe(20); // planning: 5 items
    expect(r.dimensions[3].max).toBe(16); // flexibility: 4 items
  });

  it('working memory threshold ≥11 (5 items, ~55%)', () => {
    // workingMemory: indices 4-8 (5 questions). 2+2+2+3+2 = 11
    const answers = [...all(4, 0), 2, 2, 2, 3, 2, ...all(9, 0)];
    const r = calculateExecutiveScore(answers);
    expect(r.profiles.some((p) => p.id === 'memoria-trabajo')).toBe(true);
  });

  it('moderadas at boundary ≤50', () => {
    // 12 questions at 4 = 48, plus 2 = 50
    const answers = [...all(12, 4), 2, ...all(5, 0)];
    const r = calculateExecutiveScore(answers);
    expect(r.total).toBe(50);
    expect(r.category).toBe('dificultades-ejecutivas-moderadas');
  });

  it('childhoodNote mentions TDAH and TEA', () => {
    const r = calculateExecutiveScore(all(18, 2));
    expect(r.childhoodNote).toContain('TDAH');
    expect(r.childhoodNote).toContain('neurodesarrollo');
  });
});

// ─── DAT ─────────────────────────────────────────

describe('calculateDatScore', () => {
  // Mock embeddings: palabras similares → vectores cercanos, palabras diversas → vectores lejanos
  function makeMockEmbeddings(wordVectors) {
    const map = new Map();
    for (const [word, vec] of Object.entries(wordVectors)) {
      map.set(word, new Float32Array(vec));
    }
    return map;
  }

  // Vectores cercanos (misma región semántica): simulan palabras similares
  const closeWords = makeMockEmbeddings({
    perro: [0.1, 0.2, 0.3, 0.1, 0.2],
    gato: [0.15, 0.22, 0.28, 0.12, 0.18],
    pez: [0.12, 0.18, 0.32, 0.08, 0.22],
    caballo: [0.13, 0.21, 0.29, 0.11, 0.19],
    pajaro: [0.14, 0.19, 0.31, 0.09, 0.21],
    conejo: [0.11, 0.23, 0.27, 0.13, 0.17],
    tortuga: [0.16, 0.2, 0.3, 0.1, 0.2],
  });

  // Vectores diversos: cada uno en una región diferente del espacio
  const diverseVectors = makeMockEmbeddings({
    democracia: [0.9, 0.1, 0.05, 0.02, 0.03],
    hidrogeno: [0.02, 0.95, 0.1, 0.05, 0.08],
    melancolia: [0.05, 0.03, 0.88, 0.12, 0.04],
    espagueti: [0.1, 0.08, 0.05, 0.92, 0.06],
    vertigo: [0.03, 0.06, 0.04, 0.02, 0.91],
    algebra: [0.88, 0.02, 0.06, 0.01, 0.07],
    tundra: [0.04, 0.09, 0.07, 0.03, 0.89],
    pecado: [0.07, 0.04, 0.85, 0.06, 0.05],
    catedral: [0.06, 0.05, 0.03, 0.88, 0.04],
    eon: [0.08, 0.07, 0.05, 0.04, 0.86],
  });

  it('less than 7 words → error', () => {
    const r = calculateDatScore(['perro', 'gato', 'pez'], closeWords);
    expect(r.error).toBeTruthy();
    expect(r.total).toBe(0);
  });

  it('7 valid words → returns result with all fields', () => {
    const words = ['democracia', 'hidrogeno', 'melancolia', 'espagueti', 'vertigo', 'algebra', 'tundra'];
    const r = calculateDatScore(words, diverseVectors);
    expect(r.error).toBeUndefined();
    expect(r.total).toBeGreaterThan(0);
    expect(r.total).toBeLessThanOrEqual(200);
    expect(r.finalScore).toBeGreaterThan(0);
    expect(r.averageDistance).toBeGreaterThan(0);
    expect(r.pairwiseDistances).toHaveLength(21); // 7 choose 2 = 21
    expect(r.wordsUsed).toHaveLength(7);
    expect(r.maxScores.total).toBe(100);
    expect(r.dimensions).toEqual([]);
    expect(r.profiles).toEqual([]);
  });

  it('similar words → lower score (convergente)', () => {
    const words = ['perro', 'gato', 'pez', 'caballo', 'pajaro', 'conejo', 'tortuga'];
    const r = calculateDatScore(words, closeWords);
    expect(r.total).toBeLessThan(50);
  });

  it('diverse words → higher score', () => {
    const words = ['democracia', 'hidrogeno', 'melancolia', 'espagueti', 'vertigo', 'algebra', 'tundra'];
    const r = calculateDatScore(words, diverseVectors);
    expect(r.total).toBeGreaterThan(50);
  });

  it('pairwise distances are sorted ascending', () => {
    const words = ['democracia', 'hidrogeno', 'melancolia', 'espagueti', 'vertigo', 'algebra', 'tundra'];
    const r = calculateDatScore(words, diverseVectors);
    for (let i = 1; i < r.pairwiseDistances.length; i++) {
      expect(r.pairwiseDistances[i].distance).toBeGreaterThanOrEqual(r.pairwiseDistances[i - 1].distance);
    }
  });

  it('result includes childhoodNote', () => {
    const r = calculateDatScore(['democracia', 'hidrogeno', 'melancolia', 'espagueti', 'vertigo', 'algebra', 'tundra'], diverseVectors);
    expect(r.childhoodNote).toBeTruthy();
    expect(r.childhoodNote).toContain('Olson');
  });

  it('wordsUsed only includes words with embeddings', () => {
    const r = calculateDatScore(
      ['democracia', 'hidrogeno', 'melancolia', 'espagueti', 'vertigo', 'algebra', 'tundra', 'xyz_inventada_123'],
      diverseVectors
    );
    expect(r.wordsUsed).toHaveLength(7);
    expect(r.unknownWords).toContain('xyz_inventada_123');
  });

  it('word count in wordsUsed equals distinctCategories (new naming)', () => {
    const words = ['democracia', 'hidrogeno', 'melancolia', 'espagueti', 'vertigo', 'algebra', 'tundra'];
    const r = calculateDatScore(words, diverseVectors);
    expect(r.distinctCategories).toBe(7); // now equals word count
  });
});

// ─── Unified interface ───────────────────────────

describe('unified scoring interface', () => {
  // Mock embeddings para las pruebas unificadas del DAT
  const mockDatEmbeddings = new Map();
  ['arbol', 'democracia', 'melancolia', 'espagueti', 'vertigo', 'algebra', 'tundra'].forEach((w, i) => {
    const v = new Float32Array(5);
    v[i % 5] = 0.9;
    mockDatEmbeddings.set(w, v);
  });

  const allFunctions = [
    { name: 'TDAH', fn: calculateTdahScore, input: all(18, 2) },
    { name: 'TEA', fn: calculateTeaScore, input: all(50, 1) },
    { name: 'HSP', fn: calculateHspScore, input: all(27, 3) },
    { name: 'Alexitimia', fn: calculateAlexithymiaScore, input: all(20, 2) },
    { name: 'RSD', fn: calculateRsdScore, input: all(16, 2) },
    { name: 'Burnout', fn: calculateMaskingBurnoutScore, input: all(13, 2) },
    { name: 'Ejecutivas', fn: calculateExecutiveScore, input: all(18, 2) },
    { name: 'DAT', fn: (words) => calculateDatScore(words, mockDatEmbeddings), input: ['arbol', 'democracia', 'melancolia', 'espagueti', 'vertigo', 'algebra', 'tundra'] },
  ];

  allFunctions.forEach(({ name, fn, input }) => {
    it(`${name}: returns object with required keys`, () => {
      const r = fn(input);
      expect(r).toHaveProperty('total');
      expect(r).toHaveProperty('category');
      expect(r).toHaveProperty('description');
      expect(r).toHaveProperty('childhoodNote');
      expect(r).toHaveProperty('dimensions');
      expect(r).toHaveProperty('maxScores');
      expect(r).toHaveProperty('profiles');
      expect(typeof r.total).toBe('number');
      expect(typeof r.category).toBe('string');
      expect(typeof r.description).toBe('string');
      expect(Array.isArray(r.dimensions)).toBe(true);
      expect(Array.isArray(r.profiles)).toBe(true);
    });

    it(`${name}: description is non-empty`, () => {
      const r = fn(input);
      expect(r.description.length).toBeGreaterThan(10);
    });

    it(`${name}: childhoodNote is non-empty`, () => {
      const r = fn(input);
      expect(r.childhoodNote.length).toBeGreaterThan(20);
    });
  });
});
