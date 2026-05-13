export function calculateSocialScenariosScore(responses) {
  // responses: array of { scenarioId, choice: 'rejection'|'benign', impact: 1-5, likelihoodRejection: 0-100 }
  const total = responses.length;
  if (total === 0) {
    return {
      error: 'No hay respuestas',
      total: 0,
      dimensions: [],
      maxScores: {},
      profiles: [],
      category: '',
      description: '',
      childhoodNote: '',
    };
  }

  const rejectionCount = responses.filter((r) => r.choice === 'rejection').length;
  const rejectionRatio = rejectionCount / total;
  const meanImpact = responses.reduce((s, r) => s + r.impact, 0) / total;
  const meanLikelihoodRejection = responses.reduce((s, r) => s + (r.likelihoodRejection || 50), 0) / total;

  // Categorías
  const biasScore = Math.round(rejectionRatio * 100);
  let category = '';
  let description = '';

  if (biasScore <= 20) {
    category = 'sesgo-bajo';
    description =
      'Tiendes a interpretar las situaciones ambiguas de forma benigna. Es probable que no asumas rechazo a menos que sea explícito. Esto protege tu bienestar emocional en el día a día.';
  } else if (biasScore <= 45) {
    category = 'sesgo-moderado';
    description =
      `Interpretas de forma ambivalente: en ${biasScore}% de los casos asumiste rechazo. Tu percepción es generalmente balanceada, aunque ciertas situaciones sociales activan tu sensibilidad al rechazo.`;
  } else {
    category = 'sesgo-alto';
    description =
      `Interpretas el rechazo en el ${biasScore}% de las situaciones ambiguas. Este sesgo hacia el rechazo puede estar generando ansiedad social y agotamiento emocional. ` +
      'Considera explorar este patrón con un terapeuta.';
  }

  return {
    total: biasScore,
    rejectionCount,
    rejectionRatio: parseFloat(rejectionRatio.toFixed(2)),
    meanImpact: parseFloat(meanImpact.toFixed(1)),
    meanLikelihoodRejection: parseFloat(meanLikelihoodRejection.toFixed(1)),
    scenarioCount: total,
    dimensions: [
      { key: 'rejectionPerception', label: 'Percepción de rechazo', score: biasScore, max: 100 },
      { key: 'emotionalImpact', label: 'Impacto emocional', score: Math.round(meanImpact * 20), max: 100 },
    ],
    maxScores: { total: 100 },
    profiles: rejectionRatio > 0.4
      ? [{ id: 'sesgo-rechazo-significativo', label: 'Sesgo hacia el rechazo', dimension: 'rejectionPerception' }]
      : [],
    category,
    description,
    childhoodNote:
      'Los sesgos de interpretación social pueden tener raíces en experiencias tempranas de rechazo, bullying o invalidación emocional. La buena noticia es que estos sesgos son modificables con intervención terapéutica (ej: terapia cognitivo-conductual, DBT).',
  };
}
