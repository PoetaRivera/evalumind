const COMPLETED_KEY = 'evalumind_completed_tests';
const LEGACY_SESSION_KEY = 'evalumind_completed_tests';
const HISTORY_KEY = 'evalumind_result_history_v1';
const MAX_HISTORY_PER_TEST = 12;
const CONTEXT_NOTE_MAX_LENGTH = 280;

function getStorage(preferLocal = true) {
  const primary = preferLocal ? globalThis.localStorage : globalThis.sessionStorage;
  const fallback = preferLocal ? globalThis.sessionStorage : globalThis.localStorage;

  try {
    if (primary) {
      const probe = '__evalumind_storage_probe__';
      primary.setItem(probe, '1');
      primary.removeItem(probe);
      return primary;
    }
  } catch {
    /* storage unavailable */
  }

  try {
    if (fallback) return fallback;
  } catch {
    /* storage unavailable */
  }

  return null;
}

function loadJson(key, fallback = {}) {
  const storage = getStorage();
  if (!storage) return fallback;

  try {
    const raw = storage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function saveJson(key, data) {
  const storage = getStorage();
  if (!storage) return;

  try {
    storage.setItem(key, JSON.stringify(data));
  } catch {
    /* storage full or private mode */
  }
}

function cleanContextValue(value, maxLength = 80) {
  if (typeof value !== 'string') return '';
  return value.replace(/\s+/g, ' ').trim().slice(0, maxLength);
}

function sanitizeContext(context = {}) {
  const cleaned = {
    rest: cleanContextValue(context.rest, 24),
    stress: cleanContextValue(context.stress, 24),
    energy: cleanContextValue(context.energy, 24),
    environment: cleanContextValue(context.environment, 32),
    timeOfDay: cleanContextValue(context.timeOfDay, 24),
    support: cleanContextValue(context.support, 48),
    note: cleanContextValue(context.note, CONTEXT_NOTE_MAX_LENGTH),
  };

  return Object.fromEntries(Object.entries(cleaned).filter(([, value]) => value));
}

function removeJson(key) {
  const storage = getStorage();
  try {
    storage?.removeItem(key);
  } catch {
    /* storage unavailable */
  }
}

function loadLegacySessionResults() {
  try {
    const raw = globalThis.sessionStorage?.getItem(LEGACY_SESSION_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function normalizeEntry(testId, result) {
  const completedAt = Date.now();

  return {
    entryId: `${testId}-${completedAt}-${Math.random().toString(36).slice(2, 10)}`,
    testId,
    total: result.total,
    category: result.category,
    scoreDirection: result.scoreDirection || 'higher-is-more',
    scoreLabel: result.scoreLabel || 'Puntaje',
    scoreInterpretation: result.scoreInterpretation || '',
    maxScores: result.maxScores || {},
    dimensions: (result.dimensions || []).map((d) => ({
      key: d.key,
      label: d.label,
      score: d.score,
      max: d.max,
      direction: d.direction || result.scoreDirection || 'higher-is-more',
      interpretation: d.interpretation || '',
    })),
    profiles: (result.profiles || []).map((p) => p.id),
    context: sanitizeContext(result.context),
    completedAt,
  };
}

function appendHistory(entry) {
  const history = loadJson(HISTORY_KEY, []);
  const next = [...history, entry]
    .filter((item) => item && item.testId)
    .sort((a, b) => a.completedAt - b.completedAt);

  const byTest = new Map();
  for (const item of next) {
    const items = byTest.get(item.testId) || [];
    items.push(item);
    byTest.set(item.testId, items.slice(-MAX_HISTORY_PER_TEST));
  }

  saveJson(HISTORY_KEY, Array.from(byTest.values()).flat().sort((a, b) => a.completedAt - b.completedAt));
}

function loadAll() {
  const stored = loadJson(COMPLETED_KEY, {});
  if (Object.keys(stored).length > 0) return stored;

  const legacy = loadLegacySessionResults();
  if (Object.keys(legacy).length > 0) {
    saveJson(COMPLETED_KEY, legacy);
  }
  return legacy;
}

function saveAll(data) {
  saveJson(COMPLETED_KEY, data);
}

export function saveCompletedTest(testId, result) {
  const all = loadAll();
  const entry = normalizeEntry(testId, result);
  all[testId] = entry;
  saveAll(all);
  appendHistory(entry);
}

export function getCompletedTests() {
  return loadAll();
}

export function getCompletedTestIds() {
  return Object.keys(loadAll());
}

export function getCompletedTest(testId) {
  return loadAll()[testId] || null;
}

export function getResultHistory(testId = null) {
  const history = loadJson(HISTORY_KEY, []);
  const filtered = testId ? history.filter((item) => item.testId === testId) : history;
  return filtered.sort((a, b) => a.completedAt - b.completedAt);
}

export function saveResultContext(testId, entryRef, context) {
  if (!testId) return false;

  const history = loadJson(HISTORY_KEY, []);
  const entriesForTest = history
    .filter((item) => item?.testId === testId)
    .sort((a, b) => a.completedAt - b.completedAt);

  const latestEntry = entriesForTest.at(-1);
  const targetEntryId = typeof entryRef === 'string' ? entryRef : latestEntry?.entryId;
  const targetCompletedAt = typeof entryRef === 'number' ? entryRef : latestEntry?.completedAt;
  if (!targetEntryId && !targetCompletedAt) return false;

  const cleanedContext = sanitizeContext(context);
  let updated = false;

  const nextHistory = history.map((item) => {
    const matchesEntryId = targetEntryId && item.entryId === targetEntryId;
    const matchesLegacyTime = !targetEntryId && item.completedAt === targetCompletedAt;
    if (item?.testId !== testId || (!matchesEntryId && !matchesLegacyTime)) return item;
    updated = true;
    return { ...item, context: cleanedContext };
  });

  if (!updated) return false;

  saveJson(HISTORY_KEY, nextHistory);

  const all = loadAll();
  if (
    all[testId]?.entryId === targetEntryId ||
    (!targetEntryId && all[testId]?.completedAt === targetCompletedAt)
  ) {
    all[testId] = { ...all[testId], context: cleanedContext };
    saveAll(all);
  }

  return true;
}

export function getResultContext(testId, completedAt = null) {
  const history = getResultHistory(testId);
  const entry = completedAt
    ? history.find((item) => item.completedAt === completedAt)
    : history.at(-1);
  return entry?.context || {};
}

export function clearCompletedTests() {
  removeJson(COMPLETED_KEY);
  removeJson(HISTORY_KEY);
  try {
    globalThis.sessionStorage?.removeItem(LEGACY_SESSION_KEY);
  } catch {
    /* storage unavailable */
  }
}

// Reglas de complementariedad: muestran patrones personales combinados, no diagnósticos.
const COMPLEMENTARITY_RULES = [
  {
    id: 'tdah-rsd',
    tests: ['tdah-adult-v2', 'rsd-adult-v1'],
    condition: (tdah, rsd) => {
      const tdahModerate = tdah.category === 'moderada-probabilidad' || tdah.category === 'alta-probabilidad';
      const rsdModerate = rsd.category === 'rsd-moderada' || rsd.category === 'rsd-marcada';
      return tdahModerate && rsdModerate;
    },
    note:
      'Tus respuestas muestran alta presencia de patrones atencionales y sensibilidad al rechazo. Puede ser útil observar si el miedo al rechazo aumenta la impulsividad, la evitación o el agotamiento emocional.',
  },
  {
    id: 'tea-alexitimia',
    tests: ['tea-adult-v1', 'alexitimia-adult-v1'],
    condition: (tea, alex) => {
      const teaModerate = tea.category === 'moderada-probabilidad' || tea.category === 'alta-probabilidad';
      const alexModerate = alex.category === 'alexitimia-moderada' || alex.category === 'alexitimia-marcada';
      return teaModerate && alexModerate;
    },
    note:
      'La combinación de rasgos sociales/comunicativos con dificultad para nombrar emociones puede indicar que tu experiencia emocional se registra primero en el cuerpo. Un diario breve de sensaciones puede ayudarte a detectar tendencias.',
  },
  {
    id: 'hsp-rsd',
    tests: ['hsp-adult-v1', 'rsd-adult-v1'],
    condition: (hsp, rsd) => {
      const hspModerate = hsp.category === 'alta-sensibilidad-moderada' || hsp.category === 'alta-sensibilidad-marcada';
      const rsdModerate = rsd.category === 'rsd-moderada' || rsd.category === 'rsd-marcada';
      return hspModerate && rsdModerate;
    },
    note:
      'Aparece una combinación de alta sensibilidad y lectura intensa de señales sociales. Observa si necesitas más tiempo de recuperación después de conversaciones ambiguas o ambientes estimulantes.',
  },
  {
    id: 'tdah-tea',
    tests: ['tdah-adult-v2', 'tea-adult-v1'],
    condition: (tdah, tea) => {
      const tdahModerate = tdah.category === 'moderada-probabilidad' || tdah.category === 'alta-probabilidad';
      const teaModerate = tea.category === 'moderada-probabilidad' || tea.category === 'alta-probabilidad';
      return tdahModerate && teaModerate;
    },
    note:
      'Tus respuestas combinan patrones de atención/impulsividad con patrones sociales, sensoriales o de rutina. Esta nota no confirma ninguna condición; solo señala una interacción que puede valer la pena observar en tu vida diaria.',
  },
  {
    id: 'tea-hsp',
    tests: ['tea-adult-v1', 'hsp-adult-v1'],
    condition: (tea, hsp) => {
      const teaModerate = tea.category === 'moderada-probabilidad' || tea.category === 'alta-probabilidad';
      const hspModerate = hsp.category === 'alta-sensibilidad-moderada' || hsp.category === 'alta-sensibilidad-marcada';
      return teaModerate && hspModerate;
    },
    note:
      'Hay sensibilidad sensorial y procesamiento profundo en más de una herramienta. Prioriza registrar contextos concretos: luz, ruido, cambios de rutina, demandas sociales y tiempo de recuperación.',
  },
  {
    id: 'rsd-burnout',
    tests: ['rsd-adult-v1', 'burnout-masking-v1'],
    condition: (rsd, burnout) => {
      const rsdModerate = rsd.category === 'rsd-moderada' || rsd.category === 'rsd-marcada';
      const burnoutModerate = burnout.category === 'burnout-masking-moderado' || burnout.category === 'burnout-masking-severo';
      return rsdModerate && burnoutModerate;
    },
    note:
      'La sensibilidad al rechazo y el desgaste por camuflaje pueden retroalimentarse. Observa si anticipar crítica te lleva a enmascararte más y si eso aumenta la fatiga posterior.',
  },
  {
    id: 'ejecutivas-tdah',
    tests: ['funciones-ejecutivas-v1', 'tdah-adult-v2'],
    condition: (ejecutivas, tdah) => {
      const ejModerate = ejecutivas.category === 'dificultades-ejecutivas-moderadas' || ejecutivas.category === 'dificultades-ejecutivas-significativas';
      const tdahModerate = tdah.category === 'moderada-probabilidad' || tdah.category === 'alta-probabilidad';
      return ejModerate && tdahModerate;
    },
    note:
      'Los cuestionarios de funciones ejecutivas y atención apuntan a dificultades parecidas. Puede ayudarte probar apoyos externos: recordatorios visibles, pasos pequeños, temporizadores y menos cambios de contexto.',
  },
  {
    id: 'ejecutivas-tea',
    tests: ['funciones-ejecutivas-v1', 'tea-adult-v1'],
    condition: (ejecutivas, tea) => {
      const ejModerate = ejecutivas.category === 'dificultades-ejecutivas-moderadas' || ejecutivas.category === 'dificultades-ejecutivas-significativas';
      const teaModerate = tea.category === 'moderada-probabilidad' || tea.category === 'alta-probabilidad';
      return ejModerate && teaModerate;
    },
    note:
      'Aparecen dificultades ejecutivas junto con patrones de rutina, comunicación o sensibilidad. Las rutinas externas y apoyos visuales pueden ser más útiles que depender solo de fuerza de voluntad.',
  },
  {
    id: 'alexitimia-burnout',
    tests: ['alexitimia-adult-v1', 'burnout-masking-v1'],
    condition: (alex, burnout) => {
      const alexModerate = alex.category === 'alexitimia-moderada' || alex.category === 'alexitimia-marcada';
      const burnoutModerate = burnout.category === 'burnout-masking-moderado' || burnout.category === 'burnout-masking-severo';
      return alexModerate && burnoutModerate;
    },
    note:
      'Si cuesta nombrar emociones, el agotamiento puede detectarse tarde. Registra señales corporales simples: tensión, sueño, irritabilidad, hambre, dolor o necesidad de silencio.',
  },
];

export function getComplementarityNotes(currentTestId) {
  const allTests = loadAll();
  const notes = [];

  for (const rule of COMPLEMENTARITY_RULES) {
    const involvesCurrent = rule.tests.includes(currentTestId);
    if (!involvesCurrent) continue;

    const testDatas = rule.tests.map((tid) => allTests[tid]).filter(Boolean);
    if (testDatas.length < rule.tests.length) continue;

    if (rule.condition(...testDatas)) {
      notes.push(rule);
    }
  }

  return notes;
}
