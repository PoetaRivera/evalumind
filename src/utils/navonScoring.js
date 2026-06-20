export function calculateNavonScore(trials) {
  if (!trials || trials.length === 0) {
    return {
      error: 'No hay datos', total: 0, dimensions: [], maxScores: {}, profiles: [],
      category: '', description: '', childhoodNote: '',
    };
  }

  const globalTrials = trials.filter((t) => t.attendLevel === 'global');
  const localTrials = trials.filter((t) => t.attendLevel === 'local');

  const globalCorrect = globalTrials.filter((t) => t.correct).length;
  const localCorrect = localTrials.filter((t) => t.correct).length;

  const globalAcc = globalTrials.length > 0 ? globalCorrect / globalTrials.length : 0;
  const localAcc = localTrials.length > 0 ? localCorrect / localTrials.length : 0;

  const globalRT = globalTrials.filter((t) => t.correct).reduce((s, t) => s + t.reactionTime, 0) /
    (globalCorrect || 1);
  const localRT = localTrials.filter((t) => t.correct).reduce((s, t) => s + t.reactionTime, 0) /
    (localCorrect || 1);

  // Efecto de precedencia global (global advantage): RT_local - RT_global
  const globalAdvantage = localRT > 0 ? localRT - globalRT : 0;

  // Sesgo local: qué tan bien procesas detalles vs conjunto
  // Valor positivo = ventaja local (patrón TEA)
  const localBias = localAcc - globalAcc;
  const localBiasPct = Math.round(((localBias + 1) / 2) * 100); // normalize to 0-100

  // Congruencia: interferencia cuando niveles global/local son incongruentes
  const congruentTrials = trials.filter((t) => t.congruent);
  const incongruentTrials = trials.filter((t) => !t.congruent);
  const incongAcc = incongruentTrials.filter((t) => t.correct).length / (incongruentTrials.length || 1);
  const congAcc = congruentTrials.filter((t) => t.correct).length / (congruentTrials.length || 1);
  const interference = congAcc - incongAcc;

  let category;
  let description;

  if (localBias > 0.15) {
    category = 'sesgo-local';
    description = `Muestras un sesgo hacia el procesamiento de detalles (ventaja local de ${Math.round(localBias * 100)}%). Esto es un patrón frecuente en personas con rasgos del espectro autista, que tienden a procesar los detalles antes que el conjunto.`;
  } else if (globalAdvantage > 200) {
    category = 'precedencia-global';
    description = `Muestras la precedencia global típica: procesas el conjunto ${Math.round(globalAdvantage)}ms más rápido que los detalles. Es el patrón más común en la población general.`;
  } else {
    category = 'procesamiento-balanceado';
    description = 'Procesas el conjunto y los detalles de forma balanceada, sin una ventaja clara para ningún nivel.';
  }

  return {
    total: localBiasPct,
    globalAdvantage: parseFloat(globalAdvantage.toFixed(0)),
    localBias: parseFloat(localBias.toFixed(3)),
    globalAcc: parseFloat((globalAcc * 100).toFixed(1)),
    localAcc: parseFloat((localAcc * 100).toFixed(1)),
    interference: parseFloat((interference * 100).toFixed(1)),
    trialCount: trials.length,
    dimensions: [
      { key: 'localBias', label: 'Sesgo de detalle', score: localBiasPct, max: 100 },
      { key: 'globalPrecedence', label: 'Precedencia global', score: Math.min(100, Math.max(0, Math.round(globalAdvantage / 3))), max: 100 },
    ],
    maxScores: { total: 100 },
    profiles: localBias > 0.12
      ? [{ id: 'procesamiento-local', label: 'Procesamiento local aumentado', dimension: 'localBias' }]
      : [],
    category,
    description,
    scoreDirection: 'style',
    scoreLabel: 'Estilo local/global',
    scoreInterpretation: 'Este puntaje describe tendencia relativa hacia detalle o conjunto; no es una escala de mejor a peor.',
    childhoodNote:
      'El estilo de procesamiento local-global es una característica cognitiva estable que se observa en la infancia. Un sesgo hacia el detalle no es un déficit: muchas personas con TEA lo experimentan como una ventaja en tareas que requieren precisión y detección de patrones.',
  };
}
