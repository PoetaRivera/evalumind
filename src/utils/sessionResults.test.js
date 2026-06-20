import { describe, it, expect, beforeEach } from 'vitest';

const SESSION_KEY = 'evalumind_completed_tests';

// Mock must be set BEFORE the module is imported (vitest hoists imports)
const localStore = new Map();
const sessionStore = new Map();
globalThis.localStorage = {
  getItem: (key) => localStore.get(key) ?? null,
  setItem: (key, value) => { localStore.set(key, value); },
  removeItem: (key) => { localStore.delete(key); },
  clear: () => { localStore.clear(); },
};
globalThis.sessionStorage = {
  getItem: (key) => sessionStore.get(key) ?? null,
  setItem: (key, value) => { sessionStore.set(key, value); },
  removeItem: (key) => { sessionStore.delete(key); },
  clear: () => { sessionStore.clear(); },
};

const sampleTdah = {
  testId: 'tdah-adult-v2',
  total: 48,
  category: 'alta-probabilidad',
  dimensions: [
    { key: 'inat', label: 'Inatención', score: 22, max: 32 },
    { key: 'hiper', label: 'Hiperactividad', score: 26, max: 32 },
  ],
  profiles: [],
};

const sampleRsd = {
  testId: 'rsd-adult-v1',
  total: 45,
  category: 'rsd-marcada',
  dimensions: [],
  profiles: [],
};

const sampleTea = {
  testId: 'tea-adult-v1',
  total: 44,
  category: 'alta-probabilidad',
  dimensions: [],
  profiles: [],
};

const sampleAlex = {
  testId: 'alexitimia-adult-v1',
  total: 46,
  category: 'alexitimia-marcada',
  dimensions: [],
  profiles: [],
};

const sampleHsp = {
  testId: 'hsp-adult-v1',
  total: 48,
  category: 'alta-sensibilidad-marcada',
  dimensions: [],
  profiles: [],
};

const sampleBurnout = {
  testId: 'burnout-masking-v1',
  total: 45,
  category: 'burnout-masking-severo',
  dimensions: [],
  profiles: [],
};

const sampleEjecutivas = {
  testId: 'funciones-ejecutivas-v1',
  total: 50,
  category: 'dificultades-ejecutivas-significativas',
  dimensions: [],
  profiles: [],
};

let mod;
beforeEach(async () => {
  localStore.clear();
  sessionStore.clear();
  mod = await import('./sessionResults');
});

describe('sessionResults CRUD', () => {
  it('getCompletedTests returns empty object initially', async () => {
    expect(mod.getCompletedTests()).toEqual({});
  });

  it('saveCompletedTest stores a result', async () => {
    mod.saveCompletedTest('tdah-adult-v2', sampleTdah);
    const all = mod.getCompletedTests();
    expect(all).toHaveProperty('tdah-adult-v2');
    expect(all['tdah-adult-v2'].testId).toBe('tdah-adult-v2');
    expect(all['tdah-adult-v2'].total).toBe(48);
    expect(all['tdah-adult-v2'].category).toBe('alta-probabilidad');
    expect(all['tdah-adult-v2'].completedAt).toBeGreaterThan(0);
  });

  it('saveCompletedTest stores dimensions and profiles', async () => {
    mod.saveCompletedTest('tdah-adult-v2', sampleTdah, [1, 2, 3]);
    const stored = mod.getCompletedTest('tdah-adult-v2');
    expect(stored.dimensions).toHaveLength(2);
    expect(stored.dimensions[0].key).toBe('inat');
    expect(stored.profiles).toEqual([]);
    expect(stored.answers).toBeUndefined();
  });

  it('getCompletedTestIds returns all keys', async () => {
    mod.saveCompletedTest('tdah-adult-v2', sampleTdah);
    mod.saveCompletedTest('rsd-adult-v1', sampleRsd);
    expect(mod.getCompletedTestIds()).toEqual(['tdah-adult-v2', 'rsd-adult-v1']);
  });

  it('getCompletedTest returns null for missing test', async () => {
    expect(mod.getCompletedTest('nonexistent')).toBeNull();
  });

  it('getCompletedTest returns stored test', async () => {
    mod.saveCompletedTest('rsd-adult-v1', sampleRsd);
    const t = mod.getCompletedTest('rsd-adult-v1');
    expect(t.total).toBe(45);
    expect(t.category).toBe('rsd-marcada');
  });

  it('clearCompletedTests removes all data', async () => {
    mod.saveCompletedTest('tdah-adult-v2', sampleTdah);
    expect(mod.getResultHistory('tdah-adult-v2')).toHaveLength(1);
    mod.clearCompletedTests();
    expect(mod.getCompletedTests()).toEqual({});
    expect(mod.getResultHistory()).toEqual([]);
  });

  it('saveCompletedTest merges into existing tests', async () => {
    mod.saveCompletedTest('tdah-adult-v2', sampleTdah);
    mod.saveCompletedTest('rsd-adult-v1', sampleRsd);
    const all = mod.getCompletedTests();
    expect(Object.keys(all)).toHaveLength(2);
  });

  it('saveCompletedTest overwrites existing testId', async () => {
    mod.saveCompletedTest('tdah-adult-v2', sampleTdah);
    mod.saveCompletedTest('tdah-adult-v2', { ...sampleTdah, total: 55 });
    expect(mod.getCompletedTest('tdah-adult-v2').total).toBe(55);
  });

  it('handles corrupted sessionStorage gracefully', async () => {
    localStorage.setItem(SESSION_KEY, '{bad json');
    expect(mod.getCompletedTests()).toEqual({});
  });

  it('keeps a local history per test', async () => {
    mod.saveCompletedTest('tdah-adult-v2', { ...sampleTdah, total: 40 });
    mod.saveCompletedTest('tdah-adult-v2', { ...sampleTdah, total: 44 });
    mod.saveCompletedTest('rsd-adult-v1', sampleRsd);

    const tdahHistory = mod.getResultHistory('tdah-adult-v2');
    expect(tdahHistory).toHaveLength(2);
    expect(tdahHistory.map((item) => item.total)).toEqual([40, 44]);
    expect(mod.getResultHistory()).toHaveLength(3);
  });

  it('migrates legacy session results when local storage is empty', async () => {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify({ 'tdah-adult-v2': sampleTdah }));
    expect(mod.getCompletedTests()).toHaveProperty('tdah-adult-v2');
    expect(localStorage.getItem(SESSION_KEY)).toBeTruthy();
  });
});

describe('getComplementarityNotes', () => {
  it('returns empty array when no tests completed', async () => {
    expect(mod.getComplementarityNotes('tdah-adult-v2')).toEqual([]);
  });

  it('returns empty when only one test of a pair exists', async () => {
    mod.saveCompletedTest('tdah-adult-v2', sampleTdah);
    expect(mod.getComplementarityNotes('tdah-adult-v2')).toEqual([]);
  });

  it('detects TDAH + RSD complementarity (both high)', async () => {
    mod.saveCompletedTest('tdah-adult-v2', sampleTdah);
    mod.saveCompletedTest('rsd-adult-v1', sampleRsd);
    const notes = mod.getComplementarityNotes('tdah-adult-v2');
    expect(notes).toHaveLength(1);
    expect(notes[0].id).toBe('tdah-rsd');
  });

  it('detects TEA + Alexitimia complementarity', async () => {
    mod.saveCompletedTest('tea-adult-v1', sampleTea);
    mod.saveCompletedTest('alexitimia-adult-v1', sampleAlex);
    const notes = mod.getComplementarityNotes('tea-adult-v1');
    expect(notes).toHaveLength(1);
    expect(notes[0].id).toBe('tea-alexitimia');
  });

  it('detects HSP + RSD complementarity', async () => {
    mod.saveCompletedTest('hsp-adult-v1', sampleHsp);
    mod.saveCompletedTest('rsd-adult-v1', sampleRsd);
    const notes = mod.getComplementarityNotes('hsp-adult-v1');
    expect(notes).toHaveLength(1);
    expect(notes[0].id).toBe('hsp-rsd');
  });

  it('detects TDAH + TEA complementarity', async () => {
    mod.saveCompletedTest('tdah-adult-v2', sampleTdah);
    mod.saveCompletedTest('tea-adult-v1', sampleTea);
    const notes = mod.getComplementarityNotes('tdah-adult-v2');
    expect(notes).toHaveLength(1);
    expect(notes[0].id).toBe('tdah-tea');
  });

  it('detects TEA + HSP complementarity', async () => {
    mod.saveCompletedTest('tea-adult-v1', sampleTea);
    mod.saveCompletedTest('hsp-adult-v1', sampleHsp);
    const notes = mod.getComplementarityNotes('tea-adult-v1');
    expect(notes).toHaveLength(1);
    expect(notes[0].id).toBe('tea-hsp');
  });

  it('detects RSD + Burnout complementarity', async () => {
    mod.saveCompletedTest('rsd-adult-v1', sampleRsd);
    mod.saveCompletedTest('burnout-masking-v1', sampleBurnout);
    const notes = mod.getComplementarityNotes('rsd-adult-v1');
    expect(notes).toHaveLength(1);
    expect(notes[0].id).toBe('rsd-burnout');
  });

  it('detects Ejecutivas + TDAH complementarity', async () => {
    mod.saveCompletedTest('funciones-ejecutivas-v1', sampleEjecutivas);
    mod.saveCompletedTest('tdah-adult-v2', sampleTdah);
    const notes = mod.getComplementarityNotes('funciones-ejecutivas-v1');
    expect(notes).toHaveLength(1);
    expect(notes[0].id).toBe('ejecutivas-tdah');
  });

  it('detects Ejecutivas + TEA complementarity', async () => {
    mod.saveCompletedTest('funciones-ejecutivas-v1', sampleEjecutivas);
    mod.saveCompletedTest('tea-adult-v1', sampleTea);
    const notes = mod.getComplementarityNotes('funciones-ejecutivas-v1');
    expect(notes).toHaveLength(1);
    expect(notes[0].id).toBe('ejecutivas-tea');
  });

  it('detects Alexitimia + Burnout complementarity', async () => {
    mod.saveCompletedTest('alexitimia-adult-v1', sampleAlex);
    mod.saveCompletedTest('burnout-masking-v1', sampleBurnout);
    const notes = mod.getComplementarityNotes('alexitimia-adult-v1');
    expect(notes).toHaveLength(1);
    expect(notes[0].id).toBe('alexitimia-burnout');
  });

  it('does not trigger note when score is too low', async () => {
    mod.saveCompletedTest('tdah-adult-v2', { ...sampleTdah, category: 'baja-probabilidad' });
    mod.saveCompletedTest('rsd-adult-v1', sampleRsd);
    const notes = mod.getComplementarityNotes('tdah-adult-v2');
    expect(notes).toEqual([]);
  });

  it('only returns notes that include currentTestId', async () => {
    mod.saveCompletedTest('tdah-adult-v2', sampleTdah);
    mod.saveCompletedTest('rsd-adult-v1', sampleRsd);
    mod.saveCompletedTest('tea-adult-v1', sampleTea);
    const notes = mod.getComplementarityNotes('tdah-adult-v2');
    expect(notes).toHaveLength(2);
    const ids = notes.map((n) => n.id);
    expect(ids).toContain('tdah-rsd');
    expect(ids).toContain('tdah-tea');
  });
});
