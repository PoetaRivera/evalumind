export function calculateSARTScore(trials) {
  if (!trials || trials.length === 0) {
    return {
      error: 'No hay datos', total: 0, dimensions: [], maxScores: {}, profiles: [],
      category: '', description: '', childhoodNote: '',
    };
  }

  const goTrials = trials.filter((t) => t.trialType === 'go');
  const noGoTrials = trials.filter((t) => t.trialType === 'nogo');

  const commissionErrors = noGoTrials.filter((t) => t.responded).length;
  const omissionErrors = goTrials.filter((t) => !t.responded).length;

  const commissionRate = noGoTrials.length > 0 ? commissionErrors / noGoTrials.length : 0;
  const omissionRate = goTrials.length > 0 ? omissionErrors / goTrials.length : 0;

  const correctRTs = goTrials.filter((t) => t.responded).map((t) => t.reactionTime);
  const meanRT = correctRTs.length > 0 ? correctRTs.reduce((a, b) => a + b, 0) / correctRTs.length : 0;
  const stdRT = correctRTs.length > 1
    ? Math.sqrt(correctRTs.reduce((s, rt) => s + Math.pow(rt - meanRT, 2), 0) / correctRTs.length)
    : 0;
  const rtVariability = meanRT > 0 ? stdRT / meanRT : 0;

  // Anticipaciones: RT < 100ms
  const anticipations = correctRTs.filter((rt) => rt < 100).length;
  const anticipationRate = correctRTs.length > 0 ? anticipations / correctRTs.length : 0;

  // Score compuesto (0-100, más bajo = mejor)
  const rawScore = (commissionRate * 50) + (omissionRate * 30) + (rtVariability * 15) + (anticipationRate * 5);
  const scaledScore = Math.round(Math.min(100, Math.max(0, rawScore * 100)));

  let category;
  let description;

  if (scaledScore <= 20) {
    category = 'atencion-optima';
    description = 'Tu atención sostenida y control inhibitorio están en un rango óptimo. Cometes muy pocos errores y tu tiempo de reacción es consistente.';
  } else if (scaledScore <= 40) {
    category = 'atencion-buena';
    description = 'Tu rendimiento atencional es bueno, con algunos lapsos o impulsos ocasionales que entran dentro de lo esperado.';
  } else if (scaledScore <= 60) {
    category = 'atencion-moderada';
    description = `En esta ronda aparecieron algunas dificultades: ${commissionErrors} respuestas cuando convenía inhibir y ${omissionErrors} omisiones. Tu variabilidad de respuesta es ${rtVariability > 0.3 ? 'elevada' : 'moderada'}. Repite en otro momento para comparar con tu propio historial.`;
  } else {
    category = 'atencion-baja';
    description = `En esta ronda hubo alto costo atencional: ${commissionErrors} respuestas cuando convenía inhibir y ${omissionErrors} omisiones. La variabilidad de tu tiempo de reacción es ${rtVariability > 0.3 ? 'muy elevada' : 'elevada'}. Esto describe tu rendimiento actual; no diagnostica TDAH.`;
  }

  return {
    total: scaledScore,
    commissionErrors,
    omissionErrors,
    commissionRate: parseFloat(commissionRate.toFixed(3)),
    omissionRate: parseFloat(omissionRate.toFixed(3)),
    meanRT: parseFloat(meanRT.toFixed(0)),
    rtVariability: parseFloat(rtVariability.toFixed(3)),
    anticipations,
    goTrials: goTrials.length,
    noGoTrials: noGoTrials.length,
    dimensions: [
      { key: 'sustainedAttention', label: 'Atención sostenida', score: Math.round(omissionRate * 100), max: 100 },
      { key: 'responseInhibition', label: 'Inhibición de respuesta', score: Math.round(commissionRate * 100), max: 100 },
      { key: 'rtVariability', label: 'Variabilidad RT', score: Math.round(rtVariability * 100), max: 100 },
    ],
    maxScores: { total: 100 },
    profiles: [],
    category,
    description,
    scoreDirection: 'lower-is-better',
    scoreLabel: 'Costo atencional',
    scoreInterpretation: 'En esta tarea, puntajes más bajos indican menos errores, menos omisiones y menor variabilidad de respuesta.',
    childhoodNote:
      'La atención sostenida y el control inhibitorio son funciones cognitivas que pueden verse afectadas por el TDAH, la fatiga, la ansiedad o la falta de sueño. Este test mide tu rendimiento en este momento, no tu capacidad permanente.',
  };
}
