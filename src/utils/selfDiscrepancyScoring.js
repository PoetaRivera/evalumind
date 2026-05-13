export function calculateSelfDiscrepancyScore(responses) {
  // responses: array of { trait, publicSelf: 1-7, privateSelf: 1-7 }
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

  let totalDiscrepancy = 0;
  let suppressionCount = 0; // public > private (escondes quién eres)
  let fakingCount = 0; // private > public (finges ser más)

  for (const r of responses) {
    const gap = Math.abs(r.publicSelf - r.privateSelf);
    totalDiscrepancy += gap;
    if (r.publicSelf > r.privateSelf) suppressionCount++;
    if (r.privateSelf > r.publicSelf) fakingCount++;
  }

  const meanDiscrepancy = totalDiscrepancy / total;
  const maxDiscrepancy = 6; // escala 1-7, max diferencia = 6
  const discrepancyPct = Math.round((meanDiscrepancy / maxDiscrepancy) * 100);
  const maskingEffortPct = Math.round(((suppressionCount + fakingCount) / total) * 100);

  let category = '';
  let description = '';

  if (discrepancyPct <= 20) {
    category = 'baja-discrepancia';
    description =
      'Muestras una alta coherencia entre quién eres en privado y quién muestras en público. ' +
      'Es probable que no estés invirtiendo mucha energía en camuflaje.';
  } else if (discrepancyPct <= 40) {
    category = 'discrepancia-moderada';
    description =
      `Existe una brecha moderada entre tu yo auténtico y tu yo público (${discrepancyPct}% de discrepancia). ` +
      `En ${maskingEffortPct}% de los rasgos evaluados necesitas ajustar tu expresión. ` +
      'Esto puede generar cierto desgaste, especialmente en contextos sociales intensos.';
  } else {
    category = 'alta-discrepancia';
    description =
      `Hay una brecha significativa entre quién eres y quién muestras (${discrepancyPct}% de discrepancia). ` +
      `En ${maskingEffortPct}% de los rasgos necesitas enmascarar o fingir. ` +
      'Este nivel de camuflaje es agotador a largo plazo y puede explicar el burnout que experimentas. ' +
      'Considera buscar entornos donde puedas ser más auténtico/a.';
  }

  return {
    total: discrepancyPct,
    meanDiscrepancy: parseFloat(meanDiscrepancy.toFixed(2)),
    maskingEffortPct,
    suppressionCount,
    fakingCount,
    traitCount: total,
    dimensions: [
      { key: 'selfDiscrepancy', label: 'Brecha auténtico/público', score: discrepancyPct, max: 100 },
      { key: 'maskingEffort', label: 'Esfuerzo de camuflaje', score: maskingEffortPct, max: 100 },
    ],
    maxScores: { total: 100 },
    profiles: discrepancyPct > 30
      ? [{ id: 'enmascaramiento-significativo', label: 'Camuflaje significativo', dimension: 'selfDiscrepancy' }]
      : [],
    category,
    description,
    childhoodNote:
      'El camuflaje de rasgos neurodivergentes a menudo comienza en la infancia o adolescencia como estrategia de supervivencia social. Recuperar la conexión con tu yo auténtico es un proceso gradual que merece apoyo terapéutico.',
  };
}
