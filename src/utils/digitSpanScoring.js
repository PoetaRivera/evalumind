export function calculateDigitSpanScore(responses) {
  // responses: { forwardResults: [true, true, false, ...], backwardResults: [true, ...] }
  if (!responses || !responses.forwardResults) {
    return {
      error: 'No hay datos', total: 0, dimensions: [], maxScores: {}, profiles: [],
      category: '', description: '', childhoodNote: '',
    };
  }

  const forwardResults = responses.forwardResults || [];
  const backwardResults = responses.backwardResults || [];

  // Span = longest correct sequence with at least 1 correct trial
  function calcSpan(results, trialsPerLength) {
    let span = 0;
    for (let i = 0; i < results.length; i += trialsPerLength) {
      const block = results.slice(i, i + trialsPerLength);
      if (block.some((r) => r)) span = Math.max(span, Math.floor(i / trialsPerLength) + 2); // starts at length 2
      else break;
    }
    return span;
  }

  const forwardSpan = calcSpan(forwardResults, 2);
  const backwardSpan = calcSpan(backwardResults, 2);
  const totalCorrect = forwardResults.filter(Boolean).length + backwardResults.filter(Boolean).length;
  const totalTrials = forwardResults.length + backwardResults.length;
  const accuracy = totalTrials > 0 ? Math.round((totalCorrect / totalTrials) * 100) : 0;

  // Puntuación combinada: max 30
  const combinedScore = forwardSpan + (backwardSpan * 2);

  let category;
  let description;

  if (combinedScore >= 18) {
    category = 'memoria-alta';
    description = `Memoria de trabajo verbal en rango alto. Span directo: ${forwardSpan}, inverso: ${backwardSpan}. Tu capacidad para mantener y manipular información verbal es sólida.`;
  } else if (combinedScore >= 12) {
    category = 'memoria-moderada';
    description = `Memoria de trabajo verbal en rango medio. Span directo: ${forwardSpan}, inverso: ${backwardSpan}.`;

  } else {
    category = 'memoria-baja';
    description = `Memoria de trabajo verbal por debajo de lo esperado. Span directo: ${forwardSpan}, inverso: ${backwardSpan}. Esto puede reflejar dificultades de memoria de trabajo, comunes en TDAH y otras condiciones.`;
  }

  return {
    total: combinedScore,
    forwardSpan,
    backwardSpan,
    totalCorrect,
    totalTrials,
    accuracy,
    dimensions: [
      { key: 'forwardSpan', label: 'Span directo (atención)', score: forwardSpan, max: 9 },
      { key: 'backwardSpan', label: 'Span inverso (memoria trabajo)', score: backwardSpan, max: 8 },
    ],
    maxScores: { total: 30 },
    profiles: [],
    category,
    description,
    childhoodNote:
      'La memoria de trabajo verbal es una función ejecutiva que puede verse afectada en TDAH, TEA, ansiedad o fatiga. Es altamente sensible al estado momentáneo (sueño, estrés, cafeína). Un resultado bajo no indica baja inteligencia.',
  };
}
