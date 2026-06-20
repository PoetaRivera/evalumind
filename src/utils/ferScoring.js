export function calculateFERScore(responses) {
  // responses: array of { emotion, correctAnswer, selectedAnswer, reactionTime }
  const total = responses.length;
  if (total === 0) {
    return {
      error: 'No hay respuestas',
      total: 0, dimensions: [], maxScores: {}, profiles: [],
      category: '', description: '', childhoodNote: '',
    };
  }

  const correct = responses.filter((r) => r.selectedAnswer === r.correctAnswer).length;
  const accuracyPct = Math.round((correct / total) * 100);
  const meanRT = responses.reduce((s, r) => s + r.reactionTime, 0) / total;

  // Precisión por emoción
  const emotionAcc = {};
  for (const r of responses) {
    if (!emotionAcc[r.correctAnswer]) emotionAcc[r.correctAnswer] = { correct: 0, total: 0 };
    emotionAcc[r.correctAnswer].total++;
    if (r.selectedAnswer === r.correctAnswer) emotionAcc[r.correctAnswer].correct++;
  }

  const emotionBreakdown = Object.entries(emotionAcc).map(([emotion, data]) => ({
    emotion,
    accuracy: Math.round((data.correct / data.total) * 100),
    total: data.total,
  }));

  // Análisis: ¿déficit en emociones negativas preservando alegría?
  const negativeEmotions = ['tristeza', 'miedo', 'ira', 'asco'];
  const negativeTrials = responses.filter((r) => negativeEmotions.includes(r.correctAnswer));
  const negCorrect = negativeTrials.filter((r) => r.selectedAnswer === r.correctAnswer).length;
  const negAccuracy = negativeTrials.length > 0 ? Math.round((negCorrect / negativeTrials.length) * 100) : 0;

  let category;
  let description;

  if (accuracyPct >= 80) {
    category = 'reconocimiento-alto';
    description = `Reconoces correctamente las emociones faciales en el ${accuracyPct}% de los casos. Tu capacidad de identificación emocional parece preservada.`;
  } else if (accuracyPct >= 60) {
    category = 'reconocimiento-moderado';
    description = `Identificas correctamente el ${accuracyPct}% de las expresiones emocionales. Puede haber cierta dificultad con emociones específicas${negAccuracy < accuracyPct ? ', especialmente las negativas' : ''}.`;
  } else {
    category = 'reconocimiento-bajo';
    description = `Tu precisión en esta ronda de reconocimiento emocional es del ${accuracyPct}%${negAccuracy < accuracyPct ? ` (${negAccuracy}% en emociones negativas)` : ''}. Úsalo para observar qué emociones o contextos requieren más tiempo o ejemplos. No mide tu capacidad de sentir.`;
  }

  return {
    total: accuracyPct,
    correct,
    totalTrials: total,
    meanRT: parseFloat(meanRT.toFixed(0)),
    negativeAccuracy: negAccuracy,
    emotionBreakdown,
    dimensions: [
      { key: 'emotionRecognition', label: 'Reconocimiento emocional', score: accuracyPct, max: 100 },
      { key: 'negativeEmotionRecognition', label: 'Reconocimiento emociones negativas', score: negAccuracy, max: 100 },
    ],
    maxScores: { total: 100 },
    profiles: accuracyPct < 65
      ? [{ id: 'reconocimiento-emocional-en-observacion', label: 'Reconocimiento emocional para observar', dimension: 'emotionRecognition' }]
      : [],
    category,
    description,
    scoreDirection: 'higher-is-better',
    scoreLabel: 'Precisión',
    scoreInterpretation: 'En esta tarea, puntajes más altos indican más respuestas correctas en esta ronda.',
    childhoodNote:
      'La capacidad de reconocer emociones faciales se desarrolla en la infancia y puede verse afectada por entornos donde no se hablaba de emociones, por rasgos del neurodesarrollo como el TEA, o por trauma temprano. Es una habilidad que puede mejorarse con práctica.',
  };
}
