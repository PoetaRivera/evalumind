// ═══════════════════════════════════════════════════════
// COWAT / FAS Scoring — Controlled Oral Word Association Test
// Benton & Hamsher (1989), Ruff et al. (1996), Loonstra et al. (2001)
// ═══════════════════════════════════════════════════════

const PROPER_NAME_PATTERN = /^[A-ZÁÉÍÓÚÑ][a-záéíóúñ]/;
const NUMBER_WORDS = new Set([
  'uno', 'dos', 'tres', 'cuatro', 'cinco', 'seis', 'siete', 'ocho', 'nueve', 'diez',
  'once', 'doce', 'trece', 'catorce', 'quince', 'veinte', 'treinta', 'cuarenta',
  'cincuenta', 'sesenta', 'setenta', 'ochenta', 'noventa', 'cien', 'ciento',
  'mil', 'millón', 'millones', 'primer', 'segundo', 'tercer', 'primero', 'segunda',
]);

function isNumberWord(w) {
  return NUMBER_WORDS.has(w);
}

function isProperName(w) {
  return PROPER_NAME_PATTERN.test(w);
}

// Detecta variantes gramaticales: misma raíz con diferente terminación
// Ej: "flor" y "flores" → misma raíz; "flor" y "florecer" → distinta
function wordRoot(w) {
  // Sufijos comunes de flexión en español
  const suffixes = [
    'es', 's', 'aba', 'ías', 'ía', 'amos', 'éis', 'án', 'ás', 'é', 'ó',
    'ando', 'endo', 'ido', 'ado', 'ará', 'erá', 'irá', 'aría', 'ería', 'iría',
    'aste', 'iste', 'aron', 'eron', 'imos', 'imos', 'isteis', 'ieron',
    'ito', 'ita', 'itos', 'itas', 'illo', 'illa', 'cito', 'cita',
    'ote', 'ota', 'azo', 'aza', 'ón', 'ona', 'ísimo', 'ísima',
    'mente',
  ];

  const lower = w.toLowerCase();
  for (const s of suffixes) {
    if (lower.endsWith(s) && lower.length - s.length >= 3) {
      const stem = lower.slice(0, -s.length);
      if (stem.length >= 3) return stem;
    }
  }
  return lower;
}

export function calculateFasScore(rounds) {
  if (!rounds || rounds.length === 0) {
    return {
      error: 'No hay rondas',
      total: 0, rounds: [], dimensions: [], maxScores: {}, profiles: [],
      category: '', description: '', childhoodNote: '',
    };
  }

  const allValidWords = [];
  const allWordsSet = new Set();
  const processedRounds = [];

  for (const round of rounds) {
    const { letter, words } = round;
    const rawWords = words.map((w) => w.trim()).filter(Boolean);
    const validWords = [];
    const perseverations = [];
    const seenThisRound = new Set();

    for (const w of rawWords) {
      const lower = w.toLowerCase();

      if (!lower.startsWith(letter.toLowerCase())) continue;
      if (isProperName(w)) continue;
      if (isNumberWord(lower)) continue;

      if (seenThisRound.has(lower)) {
        perseverations.push(w);
        continue;
      }

      if (allWordsSet.has(lower)) {
        perseverations.push(w);
        continue;
      }

      const root = wordRoot(lower);
      const isVariant = allValidWords.some((prev) => {
        const prevRoot = wordRoot(prev.toLowerCase());
        return prevRoot === root && prev.toLowerCase() !== lower;
      });

      if (isVariant) continue;

      seenThisRound.add(lower);
      allWordsSet.add(lower);
      allValidWords.push(w);
      validWords.push(w);
    }

    processedRounds.push({
      letter,
      words: words.filter(Boolean),
      validWords,
      perseverations,
      validCount: validWords.length,
    });
  }

  const total = allValidWords.length;

  let category;
  let description;

  if (total >= 45) {
    category = 'fluidez-alta';
    description = `Generaste ${total} palabras válidas en total. Tu fluidez verbal fonológica es alta, lo que sugiere un acceso léxico ágil y buena flexibilidad cognitiva.`;
  } else if (total >= 25) {
    category = 'fluidez-normal';
    description = `Generaste ${total} palabras válidas en total. Tu fluidez verbal está dentro del rango esperado para tu grupo poblacional. El rendimiento puede variar según la fatiga, ansiedad o nivel educativo.`;
  } else {
    category = 'fluidez-baja';
    description = `Generaste ${total} palabras válidas en total. Este resultado es inferior al esperado. Puede reflejar dificultades en el acceso léxico, fatiga, ansiedad o bajo nivel educativo. Considera repetir la tarea en otro momento si hoy te sentías agotado/a.`;
  }

  return {
    total,
    rounds: processedRounds,
    dimensions: [
      { key: 'verbalFluency', label: 'Fluidez verbal', score: total, max: 60 },
    ],
    maxScores: { total: 60 },
    profiles: total < 25
      ? [{ id: 'deficit-fluidez-verbal', label: 'Fluidez verbal reducida', dimension: 'verbalFluency' }]
      : [],
    category,
    description,
    childhoodNote:
      'La fluidez verbal fonológica depende del acceso al léxico, la flexibilidad cognitiva y la velocidad de procesamiento. Puede verse afectada por la ansiedad, el estrés o la fatiga. No mide inteligencia ni vocabulario: mide la facilidad para generar palabras bajo presión de tiempo. Las normas de referencia provienen del COWAT (Benton & Hamsher, 1989), con metanormas de Loonstra et al. (2001) y Ruff et al. (1996). En español, se recomiendan las normas de Olabarrieta-Landa et al. (2015).',
  };
}
