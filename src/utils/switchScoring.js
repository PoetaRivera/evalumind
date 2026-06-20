export function calculateSwitchScore(trials) {
  if (!trials || trials.length === 0) {
    return {
      error: 'No hay datos', total: 0, dimensions: [], maxScores: {}, profiles: [],
      category: '', description: '', childhoodNote: '',
    };
  }

  const switchTrials = trials.filter((t) => t.isSwitch);
  const repeatTrials = trials.filter((t) => !t.isSwitch);

  const switchCorrect = switchTrials.filter((t) => t.correct);
  const repeatCorrect = repeatTrials.filter((t) => t.correct);

  const switchAcc = switchTrials.length > 0 ? switchCorrect.length / switchTrials.length : 0;
  const repeatAcc = repeatTrials.length > 0 ? repeatCorrect.length / repeatTrials.length : 0;

  const switchRT = switchCorrect.length > 0
    ? switchCorrect.reduce((s, t) => s + t.reactionTime, 0) / switchCorrect.length : 0;
  const repeatRT = repeatCorrect.length > 0
    ? repeatCorrect.reduce((s, t) => s + t.reactionTime, 0) / repeatCorrect.length : 0;

  // Switch cost: cuánto más lento/inexacto eres al cambiar de tarea
  const rtSwitchCost = switchRT > 0 ? switchRT - repeatRT : 0;
  const accSwitchCost = repeatAcc - switchAcc;

  // Normalizar a 0-100
  const rtCostScore = Math.min(100, Math.max(0, (rtSwitchCost / 400) * 100));
  const accCostScore = Math.min(100, Math.max(0, accSwitchCost * 300));
  const totalScore = Math.round(rtCostScore * 0.5 + accCostScore * 0.5);

  const overallAcc = trials.filter((t) => t.correct).length / trials.length;

  let category;
  let description;

  if (totalScore <= 20) {
    category = 'flexibilidad-alta';
    description = 'Excelente flexibilidad cognitiva. Cambias entre tareas con muy poco costo, lo que sugiere una función ejecutiva ágil.';
  } else if (totalScore <= 45) {
    category = 'flexibilidad-moderada';
    description = `Flexibilidad cognitiva dentro de lo esperado. Tu costo de cambio es de ${Math.round(rtSwitchCost)}ms, un valor típico.`;
  } else {
    category = 'flexibilidad-baja';
    description = `Costo de cambio elevado (${Math.round(rtSwitchCost)}ms). En esta ronda cambiar entre reglas costó más que repetir la misma. Puede variar con fatiga, estrés, práctica y claridad de instrucciones.`;
  }

  return {
    total: totalScore,
    rtSwitchCost: parseFloat(rtSwitchCost.toFixed(0)),
    accSwitchCost: parseFloat((accSwitchCost * 100).toFixed(1)),
    switchAcc: parseFloat((switchAcc * 100).toFixed(1)),
    repeatAcc: parseFloat((repeatAcc * 100).toFixed(1)),
    overallAcc: parseFloat((overallAcc * 100).toFixed(1)),
    trialCount: trials.length,
    dimensions: [
      { key: 'switchCost', label: 'Costo de cambio', score: totalScore, max: 100 },
      { key: 'switchCostMs', label: 'Costo de cambio (ms)', score: Math.round(rtSwitchCost), max: 500 },
    ],
    maxScores: { total: 100 },
    profiles: [],
    category,
    description,
    scoreDirection: 'lower-is-better',
    scoreLabel: 'Costo de cambio',
    scoreInterpretation: 'En esta tarea, puntajes más bajos indican menor costo al cambiar entre reglas.',
    childhoodNote:
      'La flexibilidad cognitiva fluctúa con estrés, fatiga, sueño y práctica. Este resultado describe tu rendimiento en esta ronda.',
  };
}
