// ═══════════════════════════════════════════════════
// Factory para tests Likert
// ═══════════════════════════════════════════════════

function createLikertScorer({
  maxScores,
  thresholds,
  dimensionConfig,
  profileMap,
  categoryRules,
  childhoodNote,
  scoreDirection = 'higher-is-more',
  scoreInterpretation = 'Puntajes más altos indican mayor presencia o intensidad reportada en esta herramienta.',
}) {
  return (answers) => {
    const dimensions = dimensionConfig.map((dim) => {
      const slice = answers.slice(dim.start, dim.start + dim.count);
      const score = slice.reduce((a, b) => a + b, 0);
      return { key: dim.key, label: dim.label, score, max: maxScores[dim.key] };
    });

    const total = dimensions.reduce((sum, d) => sum + d.score, 0);

    const profiles = [];
    for (const d of dimensions) {
      if (d.score >= thresholds[d.key]) {
        profiles.push({
          id: profileMap[d.key],
          label: d.label,
          dimension: d.key,
        });
      }
    }

    let category = categoryRules.default || '';
    let description = '';
    const profileLabels = profiles.map((p) => p.label.toLowerCase());

    for (const rule of categoryRules.rules) {
      if (total <= rule.max) {
        category = rule.category;
        description = rule.description(profiles, profileLabels);
        break;
      }
    }

    return {
      total,
      dimensions,
      maxScores,
      profiles,
      category,
      description,
      childhoodNote,
      scoreDirection,
      scoreLabel: 'Presencia reportada',
      scoreInterpretation,
    };
  };
}

// ═══════════════════════════════════════════════════
// TDAH ADULTO
// ═══════════════════════════════════════════════════
// TDAH — ASRS-5 (DSM-5)
// Kessler et al. (2005), Psychol Med, 35(2), 245-256
// Ustun et al. (2017), JAMA Psychiatry, 74(5), 520-527
// DOI: 10.1017/S0033291704002892
// DOI: 10.1001/jamapsychiatry.2017.0298
// ═══════════════════════════════════════════════════

const TDAH_MAX = { inattention: 36, hyperactivityImpulsivity: 36, total: 72 };

// ASRS-5: 18 items. Ítems intercalados por diseño (Part A screener primero).
// Índices 0-based:
const TDAH_INATTENTION = [0, 1, 2, 3, 6, 7, 8, 16, 17];        // 9 items: A1-A4, B7-B9, B18
const TDAH_HYPERACTIVITY = [4, 5, 9, 10, 11, 12, 13, 14, 15];    // 9 items: A5-A6, B10-B17
const TDAH_SCREENER = [0, 1, 2, 3, 4, 5];                         // Part A (6 items)

const TDAH_THRESHOLDS = { inattention: 18, hyperactivityImpulsivity: 18 };

export const calculateTdahScore = (answers) => {
  const inattentionScore = TDAH_INATTENTION.reduce((s, i) => s + (answers[i] || 0), 0);
  const hyperactivityScore = TDAH_HYPERACTIVITY.reduce((s, i) => s + (answers[i] || 0), 0);
  const total = inattentionScore + hyperactivityScore;

  // Screener: Part A (6 items). ≥4 items with score ≥2 = positive
  const screenerPositiveCount = TDAH_SCREENER.filter((i) => (answers[i] || 0) >= 2).length;
  const screenerPositive = screenerPositiveCount >= 4;

  // Perfiles por dimensión
  const profiles = [];
  if (inattentionScore >= TDAH_THRESHOLDS.inattention) {
    profiles.push({ id: 'inatencion-predominante', label: 'Inatención predominante', dimension: 'inattention' });
  }
  if (hyperactivityScore >= TDAH_THRESHOLDS.hyperactivityImpulsivity) {
    profiles.push({ id: 'hiperactivo-impulsivo-predominante', label: 'Hiperactividad-Impulsividad predominante', dimension: 'hyperactivityImpulsivity' });
  }
  if (profiles.length === 2) {
    profiles.length = 0;
    profiles.push({ id: 'tdah-combinado', label: 'Presentación combinada', dimension: 'combined' });
  }

  // Categorías validadas ASRS
  let category;
  let description;

  if (total <= 17) {
    category = 'baja-probabilidad';
    description = 'Tus respuestas muestran baja presencia de dificultades atencionales e impulsivas en esta autoobservación. Si aun así hay malestar o interferencia diaria, conviene revisar contexto, sueño, estrés y demandas actuales.';
  } else if (total <= 23) {
    category = 'moderada-probabilidad';
    description = 'Tus respuestas muestran presencia moderada de patrones de inatención, hiperactividad o impulsividad. Usa este resultado como punto de partida para observar situaciones, horarios y apoyos que cambian tu funcionamiento.';
  } else {
    category = 'alta-probabilidad';
    description = 'Tus respuestas muestran alta presencia de dificultades atencionales e impulsivas en esta autoobservación. No es un diagnóstico: puede servir para ordenar ejemplos concretos y, si lo necesitas, conversar con un profesional sobre apoyos y factores diferenciales.';
  }

  const dimensions = [
    { key: 'inattention', label: 'Inatención', score: inattentionScore, max: TDAH_MAX.inattention },
    { key: 'hyperactivityImpulsivity', label: 'Hiperactividad-Impulsividad', score: hyperactivityScore, max: TDAH_MAX.hyperactivityImpulsivity },
  ];

  return {
    total,
    dimensions,
    maxScores: TDAH_MAX,
    profiles,
    category,
    description,
    screenerPositive,
    screenerPositiveCount,
    scoreDirection: 'higher-is-more',
    scoreLabel: 'Presencia reportada',
    scoreInterpretation: 'Puntajes más altos indican mayor presencia reportada de dificultades de atención, hiperactividad o impulsividad. No estiman probabilidad diagnóstica.',
    childhoodNote:
      'Observa si estos patrones han estado presentes por años o si aparecieron con cambios recientes de estrés, sueño, ansiedad, duelo, burnout u otras demandas. Esta herramienta no confirma ni descarta TDAH.',
  };
};

// ═══════════════════════════════════════════════════
// TEA — AQ-50 (Autism-Spectrum Quotient)
// Baron-Cohen et al. (2001), DOI: 10.1023/a:1005653411471
// 50 ítems, scoring binario (0-50), punto de corte ≥32
// 4 ítems reverse: índices 0, 11, 40, 41 (AQ items 1, 3, 8, 10)
// ═══════════════════════════════════════════════════

const TEA_REVERSE_INDICES = new Set([0, 11, 40, 41]);

export function calculateTeaScore(answers) {
  if (!answers || answers.length === 0) {
    return {
      error: 'No hay respuestas',
      total: 0, dimensions: [], maxScores: {}, profiles: [],
      category: '', description: '', childhoodNote: '',
    };
  }

  let total = 0;
  for (let i = 0; i < answers.length; i++) {
    const v = answers[i];
    const isAgree = v === 0 || v === 1; // "Totalmente" o "Parcialmente de acuerdo"
    const reverse = TEA_REVERSE_INDICES.has(i);
    if (reverse ? !isAgree : isAgree) total++;
  }

  let category;
  let description;

  if (total >= 32) {
    category = 'alta-probabilidad';
    description =
      `Tu puntuación en el AQ-50 es de ${total}/50. ` +
      'En esta herramienta aparece alta presencia de rasgos sociales, sensoriales, comunicativos o de rutina. ' +
      'Úsalo como material de autoobservación: ejemplos cotidianos, contextos que aumentan el esfuerzo y apoyos que reducen la carga.';
  } else if (total >= 26) {
    category = 'moderada-probabilidad';
    description =
      `Tu puntuación en el AQ-50 es de ${total}/50, en la zona intermedia (26-31). ` +
      'Esto indica presencia moderada de rasgos que conviene observar en tu historia personal, tu ambiente y tu nivel de camuflaje social.';
  } else {
    category = 'baja-probabilidad';
    description =
      `Tu puntuación en el AQ-50 es de ${total}/50. ` +
      'En esta autoobservación aparece baja presencia de rasgos medidos por el cuestionario. Algunas dificultades puntuales pueden relacionarse con contexto, ansiedad social, cansancio o demandas actuales.';
  }

  return {
    total,
    dimensions: [
      { key: 'aqTotal', label: 'AQ-50', score: total, max: 50 },
    ],
    maxScores: { total: 50 },
    profiles: total >= 32
      ? [{ id: 'aq-alto', label: 'Puntaje AQ-50 alto', dimension: 'aqTotal' }]
      : [],
    category,
    description,
    scoreDirection: 'higher-is-more',
    scoreLabel: 'Presencia reportada',
    scoreInterpretation: 'Puntajes más altos indican mayor presencia reportada de rasgos medidos por el AQ-50. No diagnostican TEA ni comparan tu valor personal.',
    childhoodNote:
      'Observa si estos patrones son de larga data o si aumentaron en periodos de ansiedad, agotamiento o cambios de entorno. Esta herramienta no confirma ni descarta TEA.',
  };
}

// ═══════════════════════════════════════════════════════
// HSP — HSPS-27 (Highly Sensitive Person Scale)
// Aron & Aron (1997), DOI: 10.1037/0022-3514.73.2.345
// 27 ítems, 4 dimensiones DOES, Likert 1-7
// Punto de corte: percentil 80 (~119/189 en escala original)
// Prevalencia poblacional: 15-20%
// ═══════════════════════════════════════════════════════

const HSP_MAX = {
  deepProcessing: 42,
  overStimulation: 42,
  emotionalIntensity: 42,
  sensorySensitivity: 36,
  total: 162,
};

const HSP_THRESHOLDS = {
  deepProcessing: 25,
  overStimulation: 25,
  emotionalIntensity: 25,
  sensorySensitivity: 22,
};

export const calculateHspScore = createLikertScorer({
  maxScores: HSP_MAX,
  thresholds: HSP_THRESHOLDS,
  profileMap: {
    deepProcessing: 'procesamiento-profundo',
    overStimulation: 'sobrestimulacion',
    emotionalIntensity: 'intensidad-emocional',
    sensorySensitivity: 'sensibilidad-sensorial',
  },
  dimensionConfig: [
    { key: 'deepProcessing', label: 'Procesamiento profundo', start: 0, count: 7 },
    { key: 'overStimulation', label: 'Sobrestimulación', start: 7, count: 7 },
    { key: 'emotionalIntensity', label: 'Intensidad emocional', start: 14, count: 7 },
    { key: 'sensorySensitivity', label: 'Sensibilidad sensorial', start: 21, count: 6 },
  ],
  categoryRules: {
    default: 'sensibilidad-promedio',
    rules: [
      {
        max: 100,
        category: 'sensibilidad-promedio',
        description: () =>
          'Tu puntuación no sugiere alta sensibilidad como rasgo dominante. Probablemente toleras bien la sobrecarga sensorial y social, y te recuperas rápidamente de los estímulos.',
      },
      {
        max: 130,
        category: 'alta-sensibilidad-moderada',
        description: (_p, labels) =>
          `Presentas un perfil de alta sensibilidad ${labels.length > 0 ? 'con énfasis en ' + labels.join(' y ') : 'moderado'}. ` +
          'Esto explica por qué ciertos entornos te agotan más que a otros y por qué necesitas tiempo de procesamiento. ' +
          'La alta sensibilidad es un temperamento presente en ~15-20 % de la población, no una debilidad ni un trastorno.',
      },
      {
        max: 162,
        category: 'alta-sensibilidad-marcada',
        description: (_p, labels) =>
          `Tu perfil indica alta sensibilidad muy pronunciada ${labels.length > 0 ? 'en ' + labels.join(', ') : ''}. ` +
          'Es fundamental gestionar tu entorno, límites y ritmos de descanso. ' +
          'Considera informarte sobre el rasgo HSP o consultar con un terapeuta familiarizado con este temperamento. ' +
          'No es un trastorno: es una forma de procesar el mundo con mayor profundidad.',
      },
    ],
  },
  childhoodNote:
    'La alta sensibilidad es un temperamento presente desde la infancia, no un trastorno. Afecta aproximadamente al 15-20 % de la población y tiene bases biológicas (estudios fMRI de Acevedo et al., 2018). Si estos patrones solo aparecen en contextos de estrés reciente, pueden deberse a agotamiento o ansiedad. El HSPS-27 (Aron & Aron, 1997) es el instrumento de referencia.',
});

// ═══════════════════════════════════════════════════
// ALEXITIMIA — TAS-20 (Toronto Alexithymia Scale)
// Bagby, Parker & Taylor (1994), DOI: 10.1016/0022-3999(94)90005-1
// 20 ítems, 3 subescalas, 5 ítems inversos, Likert 1-5
// Puntos de corte: ≤51 sin alexitimia, 52-60 posible, ≥61 presente
// ═══════════════════════════════════════════════════

const ALEXITHYMIA_REVERSE_INDICES = new Set([8, 12, 14, 17, 18]);

const ALEXITHYMIA_DIM_CONFIG = [
  { key: 'identifyingFeelings', label: 'Identificación emocional (DIF)', start: 0, count: 7 },
  { key: 'describingFeelings', label: 'Descripción emocional (DDF)', start: 7, count: 5 },
  { key: 'externallyOriented', label: 'Pensamiento externo (EOT)', start: 12, count: 8 },
];

const ALEXITHYMIA_MAX = {
  identifyingFeelings: 35,
  describingFeelings: 25,
  externallyOriented: 40,
  total: 100,
};

export function calculateAlexithymiaScore(answers) {
  if (!answers || answers.length === 0) {
    return {
      error: 'No hay respuestas',
      total: 0, dimensions: [], maxScores: {}, profiles: [],
      category: '', description: '', childhoodNote: '',
    };
  }

  const converted = answers.map((v, i) => {
    const score = v + 1;
    return ALEXITHYMIA_REVERSE_INDICES.has(i) ? 6 - score : score;
  });

  const dimensions = ALEXITHYMIA_DIM_CONFIG.map((dim) => {
    const slice = converted.slice(dim.start, dim.start + dim.count);
    const score = slice.reduce((a, b) => a + b, 0);
    return { key: dim.key, label: dim.label, score, max: ALEXITHYMIA_MAX[dim.key] };
  });

  const total = dimensions.reduce((sum, d) => sum + d.score, 0);

  const profiles = [];
  const profileLabels = [];
  if (dimensions[0].score >= 25) { profiles.push({ id: 'identificacion-emocional', label: 'Identificación emocional', dimension: 'identifyingFeelings' }); profileLabels.push('identificación emocional'); }
  if (dimensions[1].score >= 18) { profiles.push({ id: 'descripcion-emocional', label: 'Descripción emocional', dimension: 'describingFeelings' }); profileLabels.push('descripción emocional'); }
  if (dimensions[2].score >= 28) { profiles.push({ id: 'pensamiento-externo', label: 'Pensamiento externo', dimension: 'externallyOriented' }); profileLabels.push('pensamiento orientado externamente'); }

  let category;
  let description;
  const dimText = profileLabels.length > 0 ? 'con énfasis en ' + profileLabels.join(' y ') : '';

  if (total <= 51) {
    category = 'alexitimia-baja';
    description =
      'Tu puntuación no sugiere alexitimia. Tienes un acceso relativamente fluido a tus emociones, las identificas con claridad y puedes describirlas. ' +
      'Esto no significa que no tengas dificultades emocionales, pero la alexitimia no parece ser tu patrón predominante.';
  } else if (total <= 60) {
    category = 'alexitimia-moderada';
    description =
      `Tu puntuación se encuentra en la zona de posible alexitimia ${dimText}. `.trim() +
      ' Esto puede reflejar dificultad para identificar y expresar emociones en ciertas situaciones. ' +
      'La terapia focalizada en conciencia emocional puede ser útil.';
  } else {
    category = 'alexitimia-marcada';
    description =
      `Tu puntuación sugiere alexitimia significativa ${dimText ? 'en ' + profileLabels.join(', ') : ''}. `.trim() +
      ' Esto puede estar asociado a TEA, TDAH, trauma o ser un estilo de procesamiento propio. ' +
      'Te recomendamos buscar evaluación con un profesional especializado en regulación emocional.';
  }

  return {
    total,
    dimensions,
    maxScores: ALEXITHYMIA_MAX,
    profiles,
    category,
    description,
    childhoodNote:
      'La alexitimia puede tener raíces en la infancia: entornos familiares donde no se hablaba de emociones, trauma temprano, o características del neurodesarrollo como el TEA. No es un trastorno: es un estilo de procesamiento emocional que puede modificarse con intervención terapéutica. El TAS-20 (Bagby, Parker & Taylor, 1994) es el instrumento de referencia para esta evaluación.',
  };
}

// ═══════════════════════════════════════════════════
// ═══════════════════════════════════════════════════════
// RSD — Rejection Sensitivity (adaptación RSQ)
// Downey & Feldman (1996), DOI: 10.1037/0022-3514.70.6.1327
// Berenson et al. (2009) — A-RSQ (Adult Rejection Sensitivity)
// 16 ítems Likert 0-4, 4 dimensiones
// ═══════════════════════════════════════════════════════

const RSD_MAX = {
  rejectionPerception: 16,
  emotionalIntensity: 16,
  anticipatoryAvoidance: 16,
  rumination: 16,
  total: 64,
};

const RSD_THRESHOLDS = {
  rejectionPerception: 9,
  emotionalIntensity: 9,
  anticipatoryAvoidance: 9,
  rumination: 9,
};

export const calculateRsdScore = createLikertScorer({
  maxScores: RSD_MAX,
  thresholds: RSD_THRESHOLDS,
  profileMap: {
    rejectionPerception: 'hipersensibilidad-percibida',
    emotionalIntensity: 'intensidad-emocional-rsd',
    anticipatoryAvoidance: 'evitacion-anticipatoria',
    rumination: 'rumia-autocritica',
  },
  dimensionConfig: [
    { key: 'rejectionPerception', label: 'Hipersensibilidad al rechazo', start: 0, count: 4 },
    { key: 'emotionalIntensity', label: 'Intensidad emocional', start: 4, count: 4 },
    { key: 'anticipatoryAvoidance', label: 'Evitación anticipatoria', start: 8, count: 4 },
    { key: 'rumination', label: 'Rumia y autocrítica', start: 12, count: 4 },
  ],
  categoryRules: {
    default: 'baja-probabilidad',
    rules: [
      {
        max: 24,
        category: 'baja-probabilidad',
        description: () =>
          'Tus respuestas no sugieren un patrón destacado de Rejection Sensitive Dysphoria. ' +
          'Experimentas el rechazo de forma similar a la mayoría de las personas: dolorosa pero manejable.',
      },
      {
        max: 40,
        category: 'rsd-moderada',
        description: (_p, labels) =>
          `Presentas un patrón significativo de RSD ${labels.length > 0 ? 'con énfasis en ' + labels.join(' y ') : ''}. ` +
          'Esto puede estar drenando tu energía emocional y dificultando tus relaciones o tu desarrollo profesional. ' +
          'Puede ser útil explorar esta dinámica con apoyo terapéutico si afecta tus relaciones, estudios o trabajo.',
      },
      {
        max: 64,
        category: 'rsd-marcada',
        description: (_p, labels) =>
          `Tu perfil indica una RSD muy pronunciada ${labels.length > 0 ? 'en ' + labels.join(', ') : ''}. ` +
          'Es probable que esta dinámica esté impactando seriamente tu bienestar, tus relaciones y tu funcionamiento diario. ' +
          'Buscar apoyo terapéutico especializado (DBT, ACT o terapia enfocada en trauma complejo) puede ser transformador.',
      },
    ],
  },
  childhoodNote:
    'La RSD no es un trastorno separado en el DSM-5, sino un fenómeno emocional que frecuentemente coexiste con el TDAH y el TEA. Muchas personas adultas no se identifican con la "hiperactividad física" del TDAH infantil, pero sí con esta tormenta emocional ante el rechazo. Si también obtuviste puntuación alta en TDAH, estos fenómenos probablemente están conectados.',
});

// ═══════════════════════════════════════════════════
// ═══════════════════════════════════════════════════════
// BURNOUT POR MASKING — EvaluMind (13 ítems)
// Constructo complementario al CAT-Q (Hull et al., 2019)
// DOI: 10.1007/s10803-018-3792-6
// Mide consecuencias del camuflaje, no la conducta de camuflaje
// ═══════════════════════════════════════════════════════

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

export const calculateMaskingBurnoutScore = createLikertScorer({
  maxScores: MASKING_MAX,
  thresholds: MASKING_THRESHOLDS,
  profileMap: {
    physicalExhaustion: 'agotamiento-postsocial',
    identityLoss: 'perdida-identidad',
    emotionalDisconnect: 'desconexion-emocional',
    collapseRecovery: 'colapso-recuperacion',
  },
  dimensionConfig: [
    { key: 'physicalExhaustion', label: 'Agotamiento físico', start: 0, count: 4 },
    { key: 'identityLoss', label: 'Pérdida de identidad', start: 4, count: 3 },
    { key: 'emotionalDisconnect', label: 'Desconexión emocional', start: 7, count: 2 },
    { key: 'collapseRecovery', label: 'Colapso y recuperación', start: 9, count: 4 },
  ],
  categoryRules: {
    default: 'bajo-burnout-masking',
    rules: [
      {
        max: 18,
        category: 'bajo-burnout-masking',
        description: () =>
          'Tu nivel de agotamiento por camuflaje parece manejable. Es posible que tu entorno sea relativamente compatible ' +
          'o que no dependas tanto del masking para funcionar en tu día a día.',
      },
      {
        max: 35,
        category: 'burnout-masking-moderado',
        description: (_p, labels) =>
          `Presentas un agotamiento significativo por enmascaramiento ${labels.length > 0 ? 'con énfasis en ' + labels.join(' y ') : ''}. ` +
          'Es urgente que busques espacios donde puedas ser tú mismo/a y evalúes si tu entorno actual es sostenible a largo plazo.',
      },
      {
        max: 52,
        category: 'burnout-masking-severo',
        description: (_p, labels) =>
          `Tu nivel de burnout por masking es muy alto ${labels.length > 0 ? 'en ' + labels.join(', ') : ''}. ` +
          'Esto no es sostenible. Considera buscar apoyo terapéutico, evaluar cambios de entorno y, si es posible, ' +
          'buscar espacios neuroafirmativos donde el camuflaje no sea necesario.',
      },
    ],
  },
  childhoodNote:
    'El burnout por masking no aparece de la noche a la mañana: es el resultado de años o décadas de ocultar quién eres para sobrevivir en entornos que no están diseñados para tu neurotipo. Si este patrón resuena contigo, no es que estés "roto/a": es que has estado corriendo una maratón con una máscara puesta.',
});

// ═══════════════════════════════════════════════════
// ═══════════════════════════════════════════════════════
// FUNCIONES EJECUTIVAS — EvaluMind (18 ítems)
// Marco conceptual: BRIEF-A (Gioia et al.)
// Toplak et al. (2013), DOI: 10.1111/jcpp.12001
// Versión abreviada de autoobservación, 4 dominios ejecutivos
// ═══════════════════════════════════════════════════════

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

export const calculateExecutiveScore = createLikertScorer({
  maxScores: EXECUTIVE_MAX,
  thresholds: EXECUTIVE_THRESHOLDS,
  profileMap: {
    inhibition: 'inhibicion',
    workingMemory: 'memoria-trabajo',
    planning: 'planificacion',
    flexibility: 'flexibilidad',
  },
  dimensionConfig: [
    { key: 'inhibition', label: 'Inhibición', start: 0, count: 4 },
    { key: 'workingMemory', label: 'Memoria de trabajo', start: 4, count: 5 },
    { key: 'planning', label: 'Planificación', start: 9, count: 5 },
    { key: 'flexibility', label: 'Flexibilidad cognitiva', start: 14, count: 4 },
  ],
  categoryRules: {
    default: 'funciones-ejecutivas-preservadas',
    rules: [
      {
        max: 30,
        category: 'funciones-ejecutivas-preservadas',
        description: () =>
          'Percibes tu funcionamiento ejecutivo como relativamente sólido. Las dificultades puntuales ' +
          'pueden deberse a estrés, cansancio o contexto actual más que a un patrón estable.',
      },
      {
        max: 50,
        category: 'dificultades-ejecutivas-moderadas',
        description: (_p, labels) =>
          `Presentas dificultades ejecutivas ${labels.length > 0 ? 'en ' + labels.join(' y ') : 'en varias áreas'}. ` +
          'Esto es común en TDAH, TEA, ansiedad o agotamiento. Estrategias externas (agendas, recordatorios, rutinas) ' +
          'pueden compensar significativamente estas áreas.',
      },
      {
        max: 72,
        category: 'dificultades-ejecutivas-significativas',
        description: (_p, labels) =>
          `Tus respuestas sugieren dificultades ejecutivas importantes ${labels.length > 0 ? 'en ' + labels.join(', ') : ''}. ` +
          'Considera una evaluación neuropsicológica formal, especialmente si esto impacta tu trabajo, estudios o relaciones. ' +
          'Estas dificultades no reflejan tu inteligencia ni tu valor como persona.',
      },
    ],
  },
  childhoodNote:
    'Las funciones ejecutivas tienen una base neurológica y pueden verse afectadas por condiciones del neurodesarrollo como el TDAH o el TEA. No son una medida de inteligencia: muchas personas con dificultades ejecutivas desarrollan sistemas externos de compensación altamente efectivos. La evaluación neuropsicológica puede ayudarte a entender tu perfil específico.',
});

// ═══════════════════════════════════════════════════
// DAT
// ═══════════════════════════════════════════════════

// ═══════════════════════════════════════════════════
// DAT — Divergent Association Task
// Algoritmo: Olson et al. (2021). PNAS, 118(25), e2022340118.
// DOI: 10.1073/pnas.2022340118
// Vectores: GloVe SBWC, CC-BY-4.0, Univ. de Chile
// ═══════════════════════════════════════════════════

import { cosineDistance, findVector } from './datEmbeddings';

export const calculateDatScore = (words, embeddings) => {
  const cleanWords = [...new Set(words.map((w) => w.toLowerCase().trim()))];

  if (cleanWords.length < 7) {
    return {
      total: 0,
      finalScore: 0,
      error: 'Se requieren al menos 7 palabras válidas',
      wordsUsed: cleanWords,
      unknownWords: [],
      distinctCategories: 0,
      pairCount: 0,
      pairwiseDistances: [],
      dimensions: [],
      maxScores: { total: 100 },
      profiles: [],
      category: 'convergente',
      description: '',
      scoreDirection: 'higher-is-better',
      scoreLabel: 'Distancia semántica',
      scoreInterpretation: 'Puntajes más altos indican asociaciones semánticas más distantes; no miden inteligencia.',
      childhoodNote: '',
    };
  }

  // Buscar vectores para cada palabra
  const wordVectors = [];
  const unknownWords = [];

  for (const word of cleanWords) {
    const vector = embeddings ? findVector(embeddings, word) : null;
    if (vector) {
      wordVectors.push({ word, vector });
    } else {
      unknownWords.push(word);
    }
  }

  const validWords = wordVectors.length;

  if (validWords < 4) {
    return {
      total: 0,
      finalScore: 0,
      error: `Solo ${validWords} palabra(s) reconocida(s). Se necesitan al menos 4 palabras con vectores disponibles.`,
      wordsUsed: cleanWords,
      unknownWords,
      distinctCategories: 0,
      pairCount: 0,
      pairwiseDistances: [],
      dimensions: [],
      maxScores: { total: 100 },
      profiles: [],
      category: 'convergente',
      description: '',
      scoreDirection: 'higher-is-better',
      scoreLabel: 'Distancia semántica',
      scoreInterpretation: 'Puntajes más altos indican asociaciones semánticas más distantes; no miden inteligencia.',
      childhoodNote: '',
    };
  }

  // Calcular distancias coseno entre todos los pares
  let totalDistance = 0;
  let pairs = 0;
  const pairwiseDistances = [];

  for (let i = 0; i < wordVectors.length; i++) {
    for (let j = i + 1; j < wordVectors.length; j++) {
      const dist = cosineDistance(wordVectors[i].vector, wordVectors[j].vector);
      totalDistance += dist;
      pairs++;
      pairwiseDistances.push({
        wordA: wordVectors[i].word,
        wordB: wordVectors[j].word,
        distance: parseFloat(dist.toFixed(4)),
      });
    }
  }

  const averageDistance = totalDistance / pairs;

  // Score DAT: distancia coseno promedio × 100
  // Rango teórico: 0-200. Rango práctico: 50-95 (Olson et al., 2021)
  const finalScore = Math.round(averageDistance * 100);

  let category;
  let description;

  if (finalScore < 50) {
    category = 'convergente';
    description =
      'Tus palabras tendieron a ser semánticamente cercanas. ' +
      'Esto sugiere un pensamiento asociativo dentro de dominios familiares.';
  } else if (finalScore < 75) {
    category = 'moderadamente-divergente';
    description =
      'Mostraste una buena capacidad para generar palabras de dominios semánticos distantes. ' +
      'Es un perfil balanceado entre coherencia y flexibilidad.';
  } else {
    category = 'altamente-divergente';
    description =
      'Tus palabras provinieron de dominios semánticos muy lejanos entre sí. ' +
      'Esto sugiere alta flexibilidad cognitiva y capacidad para conectar ideas remotas, un patrón asociado a la creatividad (Olson et al., 2021).';
  }

  return {
    total: finalScore,
    finalScore,
    averageDistance: parseFloat(averageDistance.toFixed(4)),
    wordsUsed: wordVectors.map((wv) => wv.word),
    unknownWords,
    distinctCategories: validWords,
    pairCount: pairs,
    pairwiseDistances: pairwiseDistances.sort((a, b) => a.distance - b.distance),
    dimensions: [],
    maxScores: { total: 100 },
    profiles: [],
    category,
    description,
    scoreDirection: 'higher-is-better',
    scoreLabel: 'Distancia semántica',
    scoreInterpretation: 'Puntajes más altos indican asociaciones semánticas más distantes. Úsalo como estilo cognitivo, no como ranking personal.',
    childhoodNote:
      'El pensamiento divergente es un estilo cognitivo, no una medida de inteligencia. ' +
      'Un resultado convergente no indica menor capacidad intelectual, sino un estilo de procesamiento más focalizado. ' +
      'Investigación de referencia: Olson, Nahas, Chmoulevitch, Cropper & Webb (2021). ' +
      'Naming unrelated words predicts creativity. PNAS, 118(25), e2022340118.',
  };
};
