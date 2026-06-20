export function calculateRmetScore(responses) {
  if (!responses || responses.length === 0) {
    return {
      error: 'No hay respuestas',
      total: 0, correct: 0, totalTrials: 0,
      dimensions: [], maxScores: {}, profiles: [],
      category: '', description: '', childhoodNote: '',
    };
  }

  const correct = responses.filter((r) => r.selected === r.correct).length;
  const totalTrials = responses.length;
  const accuracyPct = Math.round((correct / totalTrials) * 100);

  let category;
  let description;

  if (accuracyPct >= 75) {
    category = 'mentalizacion-alta';
    description = `Reconoces correctamente estados mentales en el ${accuracyPct}% de los casos. Tu teoría de la mente parece estar en un rango típico.`;
  } else if (accuracyPct >= 55) {
    category = 'mentalizacion-moderada';
    description = `Identificas correctamente el ${accuracyPct}% de los estados mentales. Puede haber cierta dificultad en situaciones sociales sutiles.`;
  } else {
    category = 'mentalizacion-baja';
    description = `Tu precisión en esta adaptación textual fue del ${accuracyPct}%. Puede indicar que las claves sociales sutiles requieren más contexto verbal o más tiempo en esta ronda. No es una medida diagnóstica.`;
  }

  return {
    total: accuracyPct,
    correct,
    totalTrials,
    dimensions: [
      { key: 'theoryOfMind', label: 'Teoría de la mente', score: accuracyPct, max: 100 },
    ],
    maxScores: { total: 100 },
    profiles: accuracyPct < 60
      ? [{ id: 'mentalizacion-en-observacion', label: 'Mentalización para observar', dimension: 'theoryOfMind' }]
      : [],
    category,
    description,
    scoreDirection: 'higher-is-better',
    scoreLabel: 'Precisión',
    scoreInterpretation: 'En esta tarea, puntajes más altos indican más respuestas correctas en una adaptación textual; no son comparables con normas clínicas del RMET fotográfico.',
    childhoodNote:
      'La teoría de la mente (capacidad de inferir estados mentales en otros) es una habilidad que se desarrolla en la infancia y puede verse afectada en el TEA. No es una medida de empatía: puedes preocuparte por los demás y aun así tener dificultad para leer sus estados mentales. Este test es una adaptación textual inspirada en el RMET de Baron-Cohen et al. (2001); no utiliza las 36 fotografías originales del RMET.',
  };
}
