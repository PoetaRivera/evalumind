export function calculateSensoryThresholdScore(trials) {
  // trials: array of { noiseLevel, detected, reactionTime }
  if (!trials || trials.length === 0) {
    return {
      error: 'No hay datos', total: 0, dimensions: [], maxScores: {}, profiles: [],
      category: '', description: '', childhoodNote: '',
    };
  }

  const detectedCount = trials.filter((t) => t.detected).length;
  const detectionRate = detectedCount / trials.length;

  // Calcular umbral: nivel de ruido donde la detección cae al 50%
  const sortedByNoise = [...trials].sort((a, b) => a.noiseLevel - b.noiseLevel);
  let threshold = 50;

  for (let i = 0; i < sortedByNoise.length - 1; i++) {
    const curr = sortedByNoise[i];
    const next = sortedByNoise[i + 1];
    if (curr.detected && !next.detected) {
      threshold = Math.round((curr.noiseLevel + next.noiseLevel) / 2);
      break;
    }
  }

  const thresholdPct = Math.round((threshold / 100) * 100);

  let category;
  let description;

  if (thresholdPct >= 70) {
    category = 'umbral-alto';
    description = `Tu umbral de detección sensorial es alto: necesitas que la señal sea muy clara (menos ruido) para detectarla. Esto sugiere una sensibilidad sensorial dentro del promedio.`;
  } else if (thresholdPct >= 40) {
    category = 'umbral-moderado';
    description = `Tu umbral sensorial está en un rango intermedio (${thresholdPct}% de ruido tolerable). Detectas señales con una cantidad moderada de ruido ambiental.`;
  } else {
    category = 'umbral-bajo';
    description = `Tu umbral de detección es bajo (${thresholdPct}%): puedes detectar señales incluso con mucho ruido de fondo. Esto es característico de la alta sensibilidad (HSP): tu sistema nervioso capta lo que otros filtran.`;
  }

  return {
    total: thresholdPct,
    detectionRate: parseFloat((detectionRate * 100).toFixed(1)),
    threshold,
    trialCount: trials.length,
    dimensions: [
      { key: 'sensoryThreshold', label: 'Umbral sensorial', score: 100 - thresholdPct, max: 100 },
    ],
    maxScores: { total: 100 },
    profiles: thresholdPct < 40
      ? [{ id: 'umbral-sensorial-bajo', label: 'Umbral sensorial bajo', dimension: 'sensoryThreshold' }]
      : [],
    category,
    description,
    scoreDirection: 'style',
    scoreLabel: 'Umbral sensorial',
    scoreInterpretation: 'Este puntaje describe un umbral de detección, no una escala de mejor a peor. Repite la tarea para observar tu patrón personal.',
    childhoodNote:
      'El umbral sensorial bajo es una característica del temperamento de alta sensibilidad (HSP). No es un déficit: es una mayor capacidad de detectar sutilezas en el entorno. En la infancia, esto puede manifestarse como molestia con etiquetas de ropa, ruidos fuertes o luces brillantes.',
  };
}

export function calculateAuditoryDistractionScore(trials) {
  if (!trials || trials.length === 0) {
    return {
      error: 'No hay datos', total: 0, dimensions: [], maxScores: {}, profiles: [],
      category: '', description: '', childhoodNote: '',
    };
  }

  const quietTrials = trials.filter((t) => !t.distractor);
  const noiseTrials = trials.filter((t) => t.distractor);

  const quietCorrect = quietTrials.filter((t) => t.correct);
  const noiseCorrect = noiseTrials.filter((t) => t.correct);

  const quietRT = quietCorrect.length > 0
    ? quietCorrect.reduce((s, t) => s + t.reactionTime, 0) / quietCorrect.length : 0;
  const noiseRT = noiseCorrect.length > 0
    ? noiseCorrect.reduce((s, t) => s + t.reactionTime, 0) / noiseCorrect.length : 0;

  const distractionCost = noiseRT > 0 ? noiseRT - quietRT : 0;
  const distractionScore = Math.min(100, Math.max(0, (distractionCost / 300) * 100));

  let category;
  let description;

  if (distractionScore <= 25) {
    category = 'baja-distractibilidad';
    description = 'Los sonidos de fondo apenas afectan tu rendimiento. Tu capacidad de filtrar distracciones auditivas es buena.';
  } else if (distractionScore <= 55) {
    category = 'distractibilidad-moderada';
    description = `Los distractores auditivos te afectan moderadamente (costo de ${Math.round(distractionCost)}ms). Es un nivel de distractibilidad dentro de lo esperado.`;
  } else {
    category = 'alta-distractibilidad';
    description = `Los sonidos de fondo afectan significativamente tu rendimiento (costo de ${Math.round(distractionCost)}ms). Esto es característico de la alta sensibilidad: tu sistema nervioso procesa todos los estímulos, incluso los irrelevantes.`;
  }

  return {
    total: distractionScore,
    distractionCost: parseFloat(distractionCost.toFixed(0)),
    quietRT: parseFloat(quietRT.toFixed(0)),
    noiseRT: parseFloat(noiseRT.toFixed(0)),
    trialCount: trials.length,
    dimensions: [
      { key: 'distractibility', label: 'Distractibilidad', score: distractionScore, max: 100 },
    ],
    maxScores: { total: 100 },
    profiles: distractionScore > 50
      ? [{ id: 'alta-distractibilidad', label: 'Alta distractibilidad', dimension: 'distractibility' }]
      : [],
    category,
    description,
    scoreDirection: 'lower-is-better',
    scoreLabel: 'Costo de distracción',
    scoreInterpretation: 'En esta tarea, puntajes más bajos indican menor costo ante sonidos distractores.',
    childhoodNote:
      'La distractibilidad elevada puede ser un rasgo de temperamento (HSP) o un síntoma de TDAH. La diferencia clave: en HSP la distracción viene de la profundidad de procesamiento (todo se procesa), en TDAH viene de la dificultad para sostener el foco atencional.',
  };
}
