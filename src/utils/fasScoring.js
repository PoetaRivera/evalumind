import { classifyFASWord } from '../data/fasConfig';

export function calculateFasScore(words, letter) {
  const cleanWords = [...new Set(words.map((w) => w.toLowerCase().trim()))];
  const categories = new Set();
  const categoryCounts = {};

  for (const w of cleanWords) {
    const cat = classifyFASWord(w);
    categories.add(cat);
    categoryCounts[cat] = (categoryCounts[cat] || 0) + 1;
  }

  const maxCategoryCount = Math.max(...Object.values(categoryCounts), 0);
  const perseverationRatio = cleanWords.length > 0 ? maxCategoryCount / cleanWords.length : 0;
  const hasPerseveration = perseverationRatio > 0.4 && cleanWords.length > 5;

  let description = '';
  if (cleanWords.length < 8) {
    description =
      'Fluidez verbal baja. Esto puede deberse a ansiedad, agotamiento o dificultades en el acceso léxico. ' +
      'Considera repetir la tarea en otro momento para comparar.';
  } else if (categories.size < 3 && hasPerseveration) {
    description =
      'Buena fluidez pero baja flexibilidad. Tendiste a quedarte en una misma categoría semántica. ' +
      'Esto puede indicar perseveración: dificultad para cambiar de estrategia.';
  } else if (cleanWords.length >= 12 && categories.size >= 4) {
    description =
      'Buena fluidez y flexibilidad verbal. Tu capacidad para generar palabras rápidamente y saltar entre categorías ' +
      'sugiere un acceso léxico ágil y buena flexibilidad cognitiva.';
  } else {
    description =
      'Fluidez verbal moderada. El patrón sugiere un funcionamiento dentro de lo esperado, ' +
      'aunque el contexto (estrés, fatiga) puede influir en este tipo de tareas.';
  }

  return {
    letter,
    words: cleanWords,
    fluency: cleanWords.length,
    flexibility: categories.size,
    categories: [...categories],
    hasPerseveration,
    perseverationRatio: parseFloat(perseverationRatio.toFixed(2)),
    total: cleanWords.length,
    dimensions: [],
    maxScores: { total: 30 },
    profiles: [],
    category: cleanWords.length < 8 ? 'fluidez-baja' : cleanWords.length < 14 ? 'fluidez-moderada' : 'fluidez-alta',
    description,
    childhoodNote:
      'La fluidez verbal es una habilidad cognitiva que puede verse afectada por la ansiedad, el estrés o la fatiga. ' +
      'No mide inteligencia ni vocabulario: mide la facilidad de acceso al léxico bajo presión de tiempo. ' +
      'Un resultado bajo en un día de cansancio no refleja tu capacidad real en un día tranquilo.',
  };
}
