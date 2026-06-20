export function calculateFlankerScore(trials) {
  if (!trials || trials.length === 0) {
    return {
      error: 'No hay datos', total: 0, dimensions: [], maxScores: {}, profiles: [],
      category: '', description: '', childhoodNote: '',
    };
  }

  const congruent = trials.filter((t) => t.congruent);
  const incongruent = trials.filter((t) => !t.congruent);

  const congCorrect = congruent.filter((t) => t.correct);
  const incongCorrect = incongruent.filter((t) => t.correct);

  const congAccuracy = congruent.length > 0 ? congCorrect.length / congruent.length : 0;
  const incongAccuracy = incongruent.length > 0 ? incongCorrect.length / incongruent.length : 0;

  const congRT = congCorrect.length > 0
    ? congCorrect.reduce((s, t) => s + t.reactionTime, 0) / congCorrect.length
    : 0;
  const incongRT = incongCorrect.length > 0
    ? incongCorrect.reduce((s, t) => s + t.reactionTime, 0) / incongCorrect.length
    : 0;

  const flankerEffect = incongRT > 0 && congRT > 0 ? incongRT - congRT : 0;
  const accuracyCost = congAccuracy - incongAccuracy;

  // Normalizar a 0-100 (valores más altos = peor rendimiento)
  // Flanker effect típico: 30-100ms en adultos
  const effectScore = Math.min(100, Math.max(0, (flankerEffect / 150) * 100));
  const accuracyScore = Math.min(100, Math.max(0, accuracyCost * 200));
  const totalScore = Math.round(effectScore * 0.6 + accuracyScore * 0.4);

  let category;
  let description;

  if (totalScore <= 25) {
    category = 'inhibicion-optima';
    description = 'Excelente control inhibitorio. Apenas te afectan los distractores. Tu efecto Flanker es mínimo.';
  } else if (totalScore <= 50) {
    category = 'inhibicion-buena';
    description = `Buen control inhibitorio con un efecto de interferencia de ${Math.round(flankerEffect)}ms. Dentro de lo esperado.`;
  } else {
    category = 'inhibicion-reducida';
    description = `Efecto de interferencia elevado (${Math.round(flankerEffect)}ms). En esta ronda los distractores aumentaron tu costo de respuesta. Repítelo en otro momento antes de sacar conclusiones personales.`;
  }

  return {
    total: totalScore,
    flankerEffect: parseFloat(flankerEffect.toFixed(0)),
    congRT: parseFloat(congRT.toFixed(0)),
    incongRT: parseFloat(incongRT.toFixed(0)),
    congAccuracy: parseFloat((congAccuracy * 100).toFixed(1)),
    incongAccuracy: parseFloat((incongAccuracy * 100).toFixed(1)),
    trialCount: trials.length,
    dimensions: [
      { key: 'interferenceControl', label: 'Control de interferencia', score: totalScore, max: 100 },
      { key: 'flankerEffectMs', label: 'Efecto Flanker (ms)', score: Math.round(flankerEffect), max: 200 },
    ],
    maxScores: { total: 100 },
    profiles: [],
    category,
    description,
    scoreDirection: 'lower-is-better',
    scoreLabel: 'Costo de interferencia',
    scoreInterpretation: 'En esta tarea, puntajes más bajos indican menor interferencia de distractores.',
    childhoodNote:
      'El control de interferencia fluctúa con fatiga, sueño, estrés y práctica. Este resultado describe una ronda concreta, no una condición clínica.',
  };
}
