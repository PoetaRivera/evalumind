// ═══════════════════════════════════════════════════
// Algoritmos de puntuación — NeuroScreen
// ═══════════════════════════════════════════════════

import { SEMANTIC_CATEGORIES, CATEGORY_GROUPS } from '../data/datConfig';

const round = (n) => Math.round(n * 100) / 100;

// ─── TDAH ADULTO ──────────────────────────────────

const TDAH_MAX = {
  inattention: 32,
  hyperactivityPhysical: 12,
  impulsivityVerbal: 20,
  total: 64,
};

const TDAH_THRESHOLDS = {
  inattention: 16,
  hyperactivityPhysical: 6,
  impulsivityVerbal: 10,
};

export const calculateTdahScore = (answers) => {
  const inattention = answers.slice(0, 8).reduce((a, b) => a + b, 0);
  const hyperactivityPhysical = answers.slice(8, 11).reduce((a, b) => a + b, 0);
  const impulsivityVerbal = answers.slice(11, 16).reduce((a, b) => a + b, 0);
  const total = inattention + hyperactivityPhysical + impulsivityVerbal;

  const profiles = [];
  if (inattention >= TDAH_THRESHOLDS.inattention) {
    profiles.push({ id: 'inatencion-marcada', label: 'Inatención marcada', dimension: 'inattention' });
  }
  if (hyperactivityPhysical >= TDAH_THRESHOLDS.hyperactivityPhysical) {
    profiles.push({ id: 'hiperactividad-marcada', label: 'Hiperactividad marcada', dimension: 'hyperactivityPhysical' });
  }
  if (impulsivityVerbal >= TDAH_THRESHOLDS.impulsivityVerbal) {
    profiles.push({ id: 'impulsividad-marcada', label: 'Impulsividad marcada', dimension: 'impulsivityVerbal' });
  }

  let category = 'baja-probabilidad';
  let description = '';

  if (total <= 22) {
    category = 'baja-probabilidad';
    description =
      'Tus respuestas no sugieren de forma destacada un patrón consistente con TDAH. ' +
      'Algunos síntomas aislados pueden deberse a estrés, ansiedad, agotamiento (burnout) o ' +
      'alteraciones del estado de ánimo. Si estos síntomas aparecieron recientemente, ' +
      'considera también estas posibilidades.';
  } else if (total <= 36) {
    category = 'moderada-probabilidad';
    description =
      `Presentas un patrón ${profiles.length > 0 ? profiles.map((p) => p.label.toLowerCase()).join(' y ') : 'moderado'} ` +
      'que merece exploración profesional. Te recomendamos consultar con un psicólogo o psiquiatra ' +
      'para una evaluación diferencial, especialmente si estos síntomas han estado presentes desde la infancia.';
  } else {
    category = 'alta-probabilidad';
    description =
      `Tus respuestas indican un patrón significativo ${profiles.length > 0 ? 'de ' + profiles.map((p) => p.label.toLowerCase()).join(' y ') : 'de rasgos de TDAH'} ` +
      '. Es altamente recomendable que busques evaluación profesional para descartar o confirmar TDAH ' +
      'y descartar otras condiciones (ansiedad, TEA, trastorno del estado de ánimo). ' +
      'Recuerda que el TDAH requiere que estos síntomas estén presentes desde la infancia.';
  }

  return {
    total,
    dimensions: [
      { key: 'inattention', label: 'Inatención', score: inattention, max: TDAH_MAX.inattention },
      { key: 'hyperactivityPhysical', label: 'Hiperactividad física', score: hyperactivityPhysical, max: TDAH_MAX.hyperactivityPhysical },
      { key: 'impulsivityVerbal', label: 'Impulsividad verbal', score: impulsivityVerbal, max: TDAH_MAX.impulsivityVerbal },
    ],
    maxScores: TDAH_MAX,
    profiles,
    category,
    description,
    childhoodNote:
      'El TDAH requiere que los síntomas estén presentes desde la infancia (antes de los 12 años). Si estos patrones aparecieron solo en los últimos meses, el agotamiento (burnout), la ansiedad o la depresión pueden causar síntomas similares.',
  };
};

// ─── TEA ADULTO ───────────────────────────────────

const TEA_MAX = {
  socialCommunication: 16,
  relationships: 16,
  routinesFlexibility: 16,
  sensoryInterests: 16,
  total: 64,
};

// Umbrales ajustados para cribado sensible (~50-56 %)
// Comunicación social más bajo por efecto del masking
const TEA_THRESHOLDS = {
  socialCommunication: 8,
  relationships: 9,
  routinesFlexibility: 9,
  sensoryInterests: 9,
};

export const calculateTeaScore = (answers) => {
  const socialCommunication = answers.slice(0, 4).reduce((a, b) => a + b, 0);
  const relationships = answers.slice(4, 8).reduce((a, b) => a + b, 0);
  const routinesFlexibility = answers.slice(8, 12).reduce((a, b) => a + b, 0);
  const sensoryInterests = answers.slice(12, 16).reduce((a, b) => a + b, 0);
  const total = socialCommunication + relationships + routinesFlexibility + sensoryInterests;

  const profiles = [];
  if (socialCommunication >= TEA_THRESHOLDS.socialCommunication) {
    profiles.push({ id: 'comunicacion-social', label: 'Comunicación social', dimension: 'socialCommunication' });
  }
  if (relationships >= TEA_THRESHOLDS.relationships) {
    profiles.push({ id: 'relaciones-interpersonales', label: 'Relaciones interpersonales', dimension: 'relationships' });
  }
  if (routinesFlexibility >= TEA_THRESHOLDS.routinesFlexibility) {
    profiles.push({ id: 'rutinas-flexibilidad', label: 'Rutinas y flexibilidad', dimension: 'routinesFlexibility' });
  }
  if (sensoryInterests >= TEA_THRESHOLDS.sensoryInterests) {
    profiles.push({ id: 'intereses-sensorialidad', label: 'Intereses y sensorialidad', dimension: 'sensoryInterests' });
  }

  let category = 'baja-probabilidad';
  let description = '';

  const profileLabels = profiles.map((p) => p.label.toLowerCase());

  if (total <= 24) {
    category = 'baja-probabilidad';
    description =
      'Tus respuestas no sugieren un patrón consistente con rasgos del espectro autista. ' +
      'Algunas dificultades puntuales pueden deberse a timidez, ansiedad social o agotamiento.';
  } else if (total <= 40) {
    category = 'moderada-probabilidad';
    description =
      `Presentas un patrón ${profiles.length > 0 ? 'destacado en ' + profileLabels.join(' y ') : 'moderado'} ` +
      'que merece exploración profesional. Te recomendamos consultar con un psicólogo o neurólogo ' +
      'especializado en diagnóstico de adultos.';
  } else {
    category = 'alta-probabilidad';
    description =
      `Tus respuestas indican un patrón significativo ${profiles.length > 0 ? 'en ' + profileLabels.join(', ') : 'de rasgos del espectro autista'} ` +
      '. Es altamente recomendable que busques evaluación profesional especializada en TEA en adultos, ' +
      'preferiblemente con experiencia en mujeres y personas con masking si aplica a tu caso.';
  }

  return {
    total,
    dimensions: [
      { key: 'socialCommunication', label: 'Comunicación social', score: socialCommunication, max: TEA_MAX.socialCommunication },
      { key: 'relationships', label: 'Relaciones interpersonales', score: relationships, max: TEA_MAX.relationships },
      { key: 'routinesFlexibility', label: 'Rutinas y flexibilidad', score: routinesFlexibility, max: TEA_MAX.routinesFlexibility },
      { key: 'sensoryInterests', label: 'Intereses y sensorialidad', score: sensoryInterests, max: TEA_MAX.sensoryInterests },
    ],
    maxScores: TEA_MAX,
    profiles,
    category,
    description,
    childhoodNote:
      'El TEA es una condición del neurodesarrollo presente desde la infancia. Si estos patrones aparecieron solo en la adultez, la ansiedad social, el agotamiento (burnout) o la depresión pueden causar síntomas similares. Un profesional especializado en TEA en adultos puede ayudarte a diferenciarlos, incluso si has aprendido a camuflar estos rasgos.',
  };
};

// ─── ALTA SENSIBILIDAD (HSP) ──────────────────────

const HSP_MAX = {
  deepProcessing: 16,
  overStimulation: 16,
  emotionalIntensity: 16,
  sensorySensitivity: 16,
  total: 64,
};

// Umbrales ~56 % — la alta sensibilidad es un temperamento, no una condición clínica
const HSP_THRESHOLDS = {
  deepProcessing: 9,
  overStimulation: 9,
  emotionalIntensity: 9,
  sensorySensitivity: 9,
};

export const calculateHspScore = (answers) => {
  const deepProcessing = answers.slice(0, 4).reduce((a, b) => a + b, 0);
  const overStimulation = answers.slice(4, 8).reduce((a, b) => a + b, 0);
  const emotionalIntensity = answers.slice(8, 12).reduce((a, b) => a + b, 0);
  const sensorySensitivity = answers.slice(12, 16).reduce((a, b) => a + b, 0);
  const total = deepProcessing + overStimulation + emotionalIntensity + sensorySensitivity;

  const profiles = [];
  if (deepProcessing >= HSP_THRESHOLDS.deepProcessing) {
    profiles.push({ id: 'procesamiento-profundo', label: 'Procesamiento profundo', dimension: 'deepProcessing' });
  }
  if (overStimulation >= HSP_THRESHOLDS.overStimulation) {
    profiles.push({ id: 'sobrestimulacion', label: 'Sobrestimulación', dimension: 'overStimulation' });
  }
  if (emotionalIntensity >= HSP_THRESHOLDS.emotionalIntensity) {
    profiles.push({ id: 'intensidad-emocional', label: 'Intensidad emocional', dimension: 'emotionalIntensity' });
  }
  if (sensorySensitivity >= HSP_THRESHOLDS.sensorySensitivity) {
    profiles.push({ id: 'sensibilidad-sensorial', label: 'Sensibilidad sensorial', dimension: 'sensorySensitivity' });
  }

  // Categorías específicas para HSP (temperamento, no probabilidad clínica)
  let category = 'no-alta-sensibilidad';
  let description = '';

  const profileLabels = profiles.map((p) => p.label.toLowerCase());

  if (total <= 28) {
    category = 'sensibilidad-promedio';
    description =
      'Tu perfil sugiere un procesamiento de información de intensidad media. Probablemente toleras bien la sobrecarga sensorial ' +
      'y social, y recuperas energía rápidamente de los estímulos. La alta sensibilidad no parece ser un rasgo dominante en tu temperamento.';
  } else if (total <= 44) {
    category = 'alta-sensibilidad-moderada';
    description =
      `Presentas un perfil de alta sensibilidad ${profiles.length > 0 ? 'con énfasis en ' + profileLabels.join(' y ') : 'moderado'}. ` +
      'Esto explica por qué ciertos entornos te agotan más que a otros, y por qué necesitas tiempo de procesamiento. ' +
      'La alta sensibilidad es un temperamento presente en ~20-30 % de la población, no una debilidad ni un trastorno.';
  } else {
    category = 'alta-sensibilidad-marcada';
    description =
      `Tu perfil indica una alta sensibilidad muy pronunciada ${profiles.length > 0 ? 'en ' + profileLabels.join(', ') : ''}. ` +
      'Es fundamental que aprendas a gestionar tu entorno, tus límites y tus ritmos de descanso. ' +
      'Considera leer sobre el rasgo HSP (Highly Sensitive Person) o consultar con un terapeuta familiarizado con este temperamento. ' +
      'Recuerda: no es un trastorno, es una forma de procesar el mundo más profundamente.';
  }

  return {
    total,
    dimensions: [
      { key: 'deepProcessing', label: 'Procesamiento profundo', score: deepProcessing, max: HSP_MAX.deepProcessing },
      { key: 'overStimulation', label: 'Sobrestimulación', score: overStimulation, max: HSP_MAX.overStimulation },
      { key: 'emotionalIntensity', label: 'Intensidad emocional', score: emotionalIntensity, max: HSP_MAX.emotionalIntensity },
      { key: 'sensorySensitivity', label: 'Sensibilidad sensorial', score: sensorySensitivity, max: HSP_MAX.sensorySensitivity },
    ],
    maxScores: HSP_MAX,
    profiles,
    category,
    description,
    childhoodNote:
      'La alta sensibilidad es un temperamento presente desde la infancia. Si estos patrones solo aparecen en contextos de estrés reciente, pueden deberse a agotamiento o ansiedad. La alta sensibilidad no es un trastorno: es una característica de temperamento que afecta aproximadamente al 20-30 % de la población y tiene ventajas adaptativas junto con sus desafíos.',
  };
};

// ─── ALEXITIMIA ──────────────────────────────────

const ALEXITHYMIA_MAX = {
  identifyingFeelings: 16,
  describingFeelings: 16,
  externallyOriented: 16,
  somaticConfusion: 16,
  total: 64,
};

// Umbrales ~56 % — screening sensible, en línea con TEA y HSP
const ALEXITHYMIA_THRESHOLDS = {
  identifyingFeelings: 9,
  describingFeelings: 9,
  externallyOriented: 9,
  somaticConfusion: 9,
};

export const calculateAlexithymiaScore = (answers) => {
  const identifyingFeelings = answers.slice(0, 4).reduce((a, b) => a + b, 0);
  const describingFeelings = answers.slice(4, 8).reduce((a, b) => a + b, 0);
  const externallyOriented = answers.slice(8, 12).reduce((a, b) => a + b, 0);
  const somaticConfusion = answers.slice(12, 16).reduce((a, b) => a + b, 0);
  const total = identifyingFeelings + describingFeelings + externallyOriented + somaticConfusion;

  const profiles = [];
  if (identifyingFeelings >= ALEXITHYMIA_THRESHOLDS.identifyingFeelings) {
    profiles.push({ id: 'identificacion-emocional', label: 'Identificación emocional', dimension: 'identifyingFeelings' });
  }
  if (describingFeelings >= ALEXITHYMIA_THRESHOLDS.describingFeelings) {
    profiles.push({ id: 'descripcion-emocional', label: 'Descripción emocional', dimension: 'describingFeelings' });
  }
  if (externallyOriented >= ALEXITHYMIA_THRESHOLDS.externallyOriented) {
    profiles.push({ id: 'pensamiento-externo', label: 'Pensamiento externo', dimension: 'externallyOriented' });
  }
  if (somaticConfusion >= ALEXITHYMIA_THRESHOLDS.somaticConfusion) {
    profiles.push({ id: 'confusion-somatica', label: 'Confusión somática', dimension: 'somaticConfusion' });
  }

  let category = 'alexitimia-baja';
  let description = '';

  const profileLabels = profiles.map((p) => p.label.toLowerCase());

  if (total <= 24) {
    category = 'alexitimia-baja';
    description =
      'Tienes un acceso fluido a tus emociones, las identificas con relativa claridad y puedes describirlas. ' +
      'Esto no significa que no tengas dificultades emocionales, pero la alexitimia no parece ser tu patrón predominante.';
  } else if (total <= 40) {
    category = 'alexitimia-moderada';
    description =
      `Presentas un perfil de alexitimia ${profiles.length > 0 ? 'con énfasis en ' + profileLabels.join(' y ') : 'moderado'}. ` +
      'Esto puede dificultar la comunicación emocional en relaciones o la regulación del estrés. ' +
      'La terapia focalizada en conciencia emocional y corporal puede ser útil.';
  } else {
    category = 'alexitimia-marcada';
    description =
      `Tu perfil sugiere una alexitimia significativa ${profiles.length > 0 ? 'en ' + profileLabels.join(', ') : ''}. ` +
      'Esto puede estar asociado a TEA, TDAH, trauma o ser un estilo de procesamiento propio. ' +
      'Te recomendamos evaluación con un terapeuta especializado en regulación emocional o psicosomática. ' +
      'No es una enfermedad, pero sí un patrón que puede mejorarse con intervención.';
  }

  return {
    total,
    dimensions: [
      { key: 'identifyingFeelings', label: 'Identificación emocional', score: identifyingFeelings, max: ALEXITHYMIA_MAX.identifyingFeelings },
      { key: 'describingFeelings', label: 'Descripción emocional', score: describingFeelings, max: ALEXITHYMIA_MAX.describingFeelings },
      { key: 'externallyOriented', label: 'Pensamiento externo', score: externallyOriented, max: ALEXITHYMIA_MAX.externallyOriented },
      { key: 'somaticConfusion', label: 'Confusión somática', score: somaticConfusion, max: ALEXITHYMIA_MAX.somaticConfusion },
    ],
    maxScores: ALEXITHYMIA_MAX,
    profiles,
    category,
    description,
    childhoodNote:
      'La alexitimia puede tener raíces en la infancia: entornos familiares donde no se hablaba de emociones, trauma temprano, o características del neurodesarrollo como el TEA. No es un trastorno: es un estilo de procesamiento emocional que puede modificarse con intervención terapéutica.',
  };
};

// ─── DAT (TEST DE ASOCIACIÓN DIVERGENTE) ─────────

// Construir índice palabra → categoría
const wordToCategory = new Map();
const categoryNames = Object.keys(SEMANTIC_CATEGORIES);
for (const [catName, catData] of Object.entries(SEMANTIC_CATEGORIES)) {
  for (const word of catData.words) {
    wordToCategory.set(word.toLowerCase(), catName);
  }
}

function classifyWord(word) {
  const lower = word.toLowerCase();
  if (wordToCategory.has(lower)) {
    return wordToCategory.get(lower);
  }
  return null;
}

function getCategoryGroup(category) {
  for (const [group, cats] of Object.entries(CATEGORY_GROUPS)) {
    if (cats.includes(category)) return group;
  }
  return 'unknown';
}

function pairwiseDistance(catA, catB) {
  // Misma categoría exacta → distancia muy baja
  if (catA && catB && catA === catB) return 0.22;
  // Ambas categorías conocidas, mismo grupo → distancia media-baja
  if (catA && catB && getCategoryGroup(catA) === getCategoryGroup(catB)) return 0.50;
  // Ambas categorías conocidas, distinto grupo → distancia alta
  if (catA && catB) return 0.82;
  // Una conocida, otra desconocida → distancia muy alta
  if (catA || catB) return 0.86;
  // Ambas desconocidas → distancia máxima
  return 0.91;
}

function countDistinctCategories(categories) {
  return new Set(categories.filter(Boolean)).size;
}

export const calculateDatScore = (words) => {
  const cleanWords = [...new Set(words.map((w) => w.toLowerCase().trim()))];

  if (cleanWords.length < 7) {
    return {
      total: 0,
      finalScore: 0,
      error: 'Se requieren al menos 7 palabras válidas',
      wordsUsed: cleanWords,
      dimensions: [],
      maxScores: { total: 100 },
      profiles: [],
      category: 'convergente',
      description: '',
      childhoodNote: '',
    };
  }

  const classified = cleanWords.map((word) => ({
    word,
    category: classifyWord(word),
  }));

  const unknownWords = classified.filter((c) => !c.category).map((c) => c.word);
  const categories = classified.map((c) => c.category);
  const distinctCount = countDistinctCategories(categories);

  // Calcular distancias entre todos los pares
  let totalDistance = 0;
  let pairs = 0;
  const pairwiseDistances = [];

  for (let i = 0; i < classified.length; i++) {
    for (let j = i + 1; j < classified.length; j++) {
      const dist = pairwiseDistance(classified[i].category, classified[j].category);
      totalDistance += dist;
      pairs++;
      pairwiseDistances.push({
        wordA: classified[i].word,
        wordB: classified[j].word,
        distance: parseFloat(dist.toFixed(4)),
      });
    }
  }

  const averageDistance = totalDistance / pairs;

  // Desviación estándar
  const variance = pairwiseDistances.reduce((sum, p) => sum + Math.pow(p.distance - averageDistance, 2), 0) / pairs;
  const stdDev = Math.sqrt(variance);

  // Score compuesto
  const rawScore = averageDistance;
  const consistencyBonus = Math.max(0, 1 - stdDev) * 12;
  const finalScore = Math.min(100, Math.max(0, (rawScore * 85) + consistencyBonus));

  // Categoría
  let category = 'convergente';
  let description = '';

  if (finalScore < 35) {
    category = 'convergente';
    description =
      `Tus palabras tendieron a agruparse en ${distinctCount} dominio(s) semántico(s) cercano(s). ` +
      'Esto sugiere un pensamiento asociativo fluido dentro de categorías familiares. Es útil para la especialización y la profundidad.';
  } else if (finalScore < 60) {
    category = 'moderadamente-divergente';
    description =
      `Mostraste una buena capacidad para saltar entre ${distinctCount} dominios distintos, aunque algunos pares mantuvieron cierta cercanía semántica. ` +
      'Es un perfil balanceado entre coherencia y flexibilidad.';
  } else {
    category = 'altamente-divergente';
    description =
      `Tus palabras provinieron de ${distinctCount} dominios semánticos muy distantes entre sí. ` +
      'Esto sugiere una alta flexibilidad cognitiva y capacidad para conectar ideas remotas. Es un patrón asociado a la creatividad y la innovación conceptual.';
  }

  return {
    total: parseFloat(finalScore.toFixed(1)),
    finalScore: parseFloat(finalScore.toFixed(1)),
    averageDistance: parseFloat(averageDistance.toFixed(4)),
    standardDeviation: parseFloat(stdDev.toFixed(4)),
    wordsUsed: classified.map((c) => c.word),
    unknownWords,
    distinctCategories: distinctCount,
    pairCount: pairs,
    pairwiseDistances: pairwiseDistances.sort((a, b) => a.distance - b.distance),
    dimensions: [],
    maxScores: { total: 100 },
    profiles: [],
    category,
    description,
    childhoodNote:
      'El pensamiento divergente es un estilo cognitivo, no una medida de inteligencia. Un resultado convergente no indica menor capacidad intelectual, sino un estilo de procesamiento más focalizado. La flexibilidad cognitiva puede entrenarse.',
  };
};

// ─── RSD (REJECTION SENSITIVE DYSPHORIA) ─────────

const RSD_MAX = {
  rejectionPerception: 16,
  emotionalIntensity: 16,
  anticipatoryAvoidance: 16,
  rumination: 16,
  total: 64,
};

// Umbrales ~56 % — screening sensible
const RSD_THRESHOLDS = {
  rejectionPerception: 9,
  emotionalIntensity: 9,
  anticipatoryAvoidance: 9,
  rumination: 9,
};

export const calculateRsdScore = (answers) => {
  const rejectionPerception = answers.slice(0, 4).reduce((a, b) => a + b, 0);
  const emotionalIntensity = answers.slice(4, 8).reduce((a, b) => a + b, 0);
  const anticipatoryAvoidance = answers.slice(8, 12).reduce((a, b) => a + b, 0);
  const rumination = answers.slice(12, 16).reduce((a, b) => a + b, 0);
  const total = rejectionPerception + emotionalIntensity + anticipatoryAvoidance + rumination;

  const profiles = [];
  if (rejectionPerception >= RSD_THRESHOLDS.rejectionPerception) {
    profiles.push({ id: 'hipersensibilidad-percibida', label: 'Hipersensibilidad al rechazo', dimension: 'rejectionPerception' });
  }
  if (emotionalIntensity >= RSD_THRESHOLDS.emotionalIntensity) {
    profiles.push({ id: 'intensidad-emocional-rsd', label: 'Intensidad emocional', dimension: 'emotionalIntensity' });
  }
  if (anticipatoryAvoidance >= RSD_THRESHOLDS.anticipatoryAvoidance) {
    profiles.push({ id: 'evitacion-anticipatoria', label: 'Evitación anticipatoria', dimension: 'anticipatoryAvoidance' });
  }
  if (rumination >= RSD_THRESHOLDS.rumination) {
    profiles.push({ id: 'rumia-autocritica', label: 'Rumia y autocrítica', dimension: 'rumination' });
  }

  let category = 'baja-probabilidad';
  let description = '';

  const profileLabels = profiles.map((p) => p.label.toLowerCase());

  if (total <= 24) {
    category = 'baja-probabilidad';
    description =
      'Tus respuestas no sugieren un patrón destacado de Rejection Sensitive Dysphoria. ' +
      'Experimentas el rechazo de forma similar a la mayoría de las personas: dolorosa pero manejable.';
  } else if (total <= 40) {
    category = 'rsd-moderada';
    description =
      `Presentas un patrón significativo de RSD ${profiles.length > 0 ? 'con énfasis en ' + profileLabels.join(' y ') : ''}. ` +
      'Esto puede estar drenando tu energía emocional y dificultando tus relaciones o tu desarrollo profesional. ' +
      'Te recomendamos explorar esta dinámica con un terapeuta, especialmente si ya tienes un diagnóstico de TDAH o TEA.';
  } else {
    category = 'rsd-marcada';
    description =
      `Tu perfil indica una RSD muy pronunciada ${profiles.length > 0 ? 'en ' + profileLabels.join(', ') : ''}. ` +
      'Es probable que esta dinámica esté impactando seriamente tu bienestar, tus relaciones y tu funcionamiento diario. ' +
      'Buscar apoyo terapéutico especializado (DBT, ACT o terapia enfocada en trauma complejo) puede ser transformador.';
  }

  return {
    total,
    dimensions: [
      { key: 'rejectionPerception', label: 'Hipersensibilidad al rechazo', score: rejectionPerception, max: RSD_MAX.rejectionPerception },
      { key: 'emotionalIntensity', label: 'Intensidad emocional', score: emotionalIntensity, max: RSD_MAX.emotionalIntensity },
      { key: 'anticipatoryAvoidance', label: 'Evitación anticipatoria', score: anticipatoryAvoidance, max: RSD_MAX.anticipatoryAvoidance },
      { key: 'rumination', label: 'Rumia y autocrítica', score: rumination, max: RSD_MAX.rumination },
    ],
    maxScores: RSD_MAX,
    profiles,
    category,
    description,
    childhoodNote:
      'La RSD no es un trastorno separado en el DSM-5, sino un fenómeno emocional que frecuentemente coexiste con el TDAH y el TEA. Muchas personas adultas no se identifican con la "hiperactividad física" del TDAH infantil, pero sí con esta tormenta emocional ante el rechazo. Si también obtuviste puntuación alta en TDAH, estos fenómenos probablemente están conectados.',
  };
};

// ─── BURNOUT POR MASKING ────────────────────────

const MASKING_MAX = {
  physicalExhaustion: 16,
  identityLoss: 12,
  emotionalDisconnect: 8,
  collapseRecovery: 16,
  total: 52,
};

const MASKING_THRESHOLDS = {
  physicalExhaustion: 9,
  identityLoss: 7,
  emotionalDisconnect: 5,
  collapseRecovery: 9,
};

export const calculateMaskingBurnoutScore = (answers) => {
  const physicalExhaustion = answers.slice(0, 4).reduce((a, b) => a + b, 0);
  const identityLoss = answers.slice(4, 7).reduce((a, b) => a + b, 0);
  const emotionalDisconnect = answers.slice(7, 9).reduce((a, b) => a + b, 0);
  const collapseRecovery = answers.slice(9, 13).reduce((a, b) => a + b, 0);
  const total = physicalExhaustion + identityLoss + emotionalDisconnect + collapseRecovery;

  const profiles = [];
  if (physicalExhaustion >= MASKING_THRESHOLDS.physicalExhaustion) {
    profiles.push({ id: 'agotamiento-postsocial', label: 'Agotamiento post-social', dimension: 'physicalExhaustion' });
  }
  if (identityLoss >= MASKING_THRESHOLDS.identityLoss) {
    profiles.push({ id: 'perdida-identidad', label: 'Pérdida de identidad', dimension: 'identityLoss' });
  }
  if (emotionalDisconnect >= MASKING_THRESHOLDS.emotionalDisconnect) {
    profiles.push({ id: 'desconexion-emocional', label: 'Desconexión emocional', dimension: 'emotionalDisconnect' });
  }
  if (collapseRecovery >= MASKING_THRESHOLDS.collapseRecovery) {
    profiles.push({ id: 'colapso-recuperacion', label: 'Colapso y recuperación', dimension: 'collapseRecovery' });
  }

  let category = 'bajo-burnout-masking';
  let description = '';

  const profileLabels = profiles.map((p) => p.label.toLowerCase());

  if (total <= 18) {
    category = 'bajo-burnout-masking';
    description =
      'Tu nivel de agotamiento por camuflaje parece manejable. Es posible que tu entorno sea relativamente compatible ' +
      'o que no dependas tanto del masking para funcionar en tu día a día.';
  } else if (total <= 35) {
    category = 'burnout-masking-moderado';
    description =
      `Presentas un agotamiento significativo por enmascaramiento ${profiles.length > 0 ? 'con énfasis en ' + profileLabels.join(' y ') : ''}. ` +
      'Es urgente que busques espacios donde puedas ser tú mismo/a y evalúes si tu entorno actual es sostenible a largo plazo.';
  } else {
    category = 'burnout-masking-severo';
    description =
      `Tu nivel de burnout por masking es muy alto ${profiles.length > 0 ? 'en ' + profileLabels.join(', ') : ''}. ` +
      'Esto no es sostenible. Considera buscar apoyo terapéutico, evaluar cambios de entorno y, si es posible, ' +
      'buscar espacios neuroafirmativos donde el camuflaje no sea necesario.';
  }

  return {
    total,
    dimensions: [
      { key: 'physicalExhaustion', label: 'Agotamiento físico', score: physicalExhaustion, max: MASKING_MAX.physicalExhaustion },
      { key: 'identityLoss', label: 'Pérdida de identidad', score: identityLoss, max: MASKING_MAX.identityLoss },
      { key: 'emotionalDisconnect', label: 'Desconexión emocional', score: emotionalDisconnect, max: MASKING_MAX.emotionalDisconnect },
      { key: 'collapseRecovery', label: 'Colapso y recuperación', score: collapseRecovery, max: MASKING_MAX.collapseRecovery },
    ],
    maxScores: MASKING_MAX,
    profiles,
    category,
    description,
    childhoodNote:
      'El burnout por masking no aparece de la noche a la mañana: es el resultado de años o décadas de ocultar quién eres para sobrevivir en entornos que no están diseñados para tu neurotipo. Si este patrón resuena contigo, no es que estés "roto/a": es que has estado corriendo una maratón con una máscara puesta.',
  };
};

// ─── FUNCIONES EJECUTIVAS ───────────────────────

const EXECUTIVE_MAX = {
  inhibition: 16,
  workingMemory: 20,
  planning: 20,
  flexibility: 16,
  total: 72,
};

const EXECUTIVE_THRESHOLDS = {
  inhibition: 9,
  workingMemory: 11,
  planning: 11,
  flexibility: 9,
};

export const calculateExecutiveScore = (answers) => {
  const inhibition = answers.slice(0, 4).reduce((a, b) => a + b, 0);
  const workingMemory = answers.slice(4, 9).reduce((a, b) => a + b, 0);
  const planning = answers.slice(9, 14).reduce((a, b) => a + b, 0);
  const flexibility = answers.slice(14, 18).reduce((a, b) => a + b, 0);
  const total = inhibition + workingMemory + planning + flexibility;

  const profiles = [];
  if (inhibition >= EXECUTIVE_THRESHOLDS.inhibition) {
    profiles.push({ id: 'inhibicion', label: 'Inhibición', dimension: 'inhibition' });
  }
  if (workingMemory >= EXECUTIVE_THRESHOLDS.workingMemory) {
    profiles.push({ id: 'memoria-trabajo', label: 'Memoria de trabajo', dimension: 'workingMemory' });
  }
  if (planning >= EXECUTIVE_THRESHOLDS.planning) {
    profiles.push({ id: 'planificacion', label: 'Planificación y organización', dimension: 'planning' });
  }
  if (flexibility >= EXECUTIVE_THRESHOLDS.flexibility) {
    profiles.push({ id: 'flexibilidad', label: 'Flexibilidad cognitiva', dimension: 'flexibility' });
  }

  let category = 'funciones-ejecutivas-preservadas';
  let description = '';

  const profileLabels = profiles.map((p) => p.label.toLowerCase());

  if (total <= 30) {
    category = 'funciones-ejecutivas-preservadas';
    description =
      'Percibes tu funcionamiento ejecutivo como relativamente sólido. Las dificultades puntuales ' +
      'pueden deberse a estrés, cansancio o contexto actual más que a un patrón estable.';
  } else if (total <= 50) {
    category = 'dificultades-ejecutivas-moderadas';
    description =
      `Presentas dificultades ejecutivas ${profiles.length > 0 ? 'en ' + profileLabels.join(' y ') : 'en varias áreas'}. ` +
      'Esto es común en TDAH, TEA, ansiedad o agotamiento. Estrategias externas (agendas, recordatorios, rutinas) ' +
      'pueden compensar significativamente estas áreas.';
  } else {
    category = 'dificultades-ejecutivas-significativas';
    description =
      `Tus respuestas sugieren dificultades ejecutivas importantes ${profiles.length > 0 ? 'en ' + profileLabels.join(', ') : ''}. ` +
      'Considera una evaluación neuropsicológica formal, especialmente si esto impacta tu trabajo, estudios o relaciones. ' +
      'Estas dificultades no reflejan tu inteligencia ni tu valor como persona.';
  }

  return {
    total,
    dimensions: [
      { key: 'inhibition', label: 'Inhibición', score: inhibition, max: EXECUTIVE_MAX.inhibition },
      { key: 'workingMemory', label: 'Memoria de trabajo', score: workingMemory, max: EXECUTIVE_MAX.workingMemory },
      { key: 'planning', label: 'Planificación', score: planning, max: EXECUTIVE_MAX.planning },
      { key: 'flexibility', label: 'Flexibilidad cognitiva', score: flexibility, max: EXECUTIVE_MAX.flexibility },
    ],
    maxScores: EXECUTIVE_MAX,
    profiles,
    category,
    description,
    childhoodNote:
      'Las funciones ejecutivas tienen una base neurológica y pueden verse afectadas por condiciones del neurodesarrollo como el TDAH o el TEA. No son una medida de inteligencia: muchas personas con dificultades ejecutivas desarrollan sistemas externos de compensación altamente efectivos. La evaluación neuropsicológica puede ayudarte a entender tu perfil específico.',
  };
};
