import tdahQuestions, { SECTIONS as TDAH_SECTIONS } from './tdahQuestions';
import teaQuestions, { TEA_SECTIONS } from './teaQuestions';
import hspQuestions, { HSP_SECTIONS } from './hspQuestions';
import alexithymiaQuestions, { ALEXITHYMIA_SECTIONS } from './alexithymiaQuestions';
import rsdQuestions, { RSD_SECTIONS } from './rsdQuestions';
import burnoutMaskingQuestions, { BURNOUT_MASKING_SECTIONS } from './burnoutMaskingQuestions';
import executiveQuestions, { EXECUTIVE_SECTIONS } from './executiveQuestions';
import datConfig from './datConfig';
import fasConfig from './fasConfig';
import {
  calculateTdahScore, calculateTeaScore, calculateHspScore,
  calculateAlexithymiaScore, calculateDatScore, calculateRsdScore,
  calculateMaskingBurnoutScore, calculateExecutiveScore,
} from '../utils/scoring';

const DISCLAIMER_GENERAL =
  'Este test es únicamente orientativo y no constituye un diagnóstico médico ni psicológico. Los resultados no reemplazan la evaluación de un profesional de la salud mental.';

const TEST_REGISTRY = {
  // ─── Likert ─────────────────────────────────────
  'tdah-adulto': {
    testId: 'tdah-adult-v2', title: 'Screening de TDAH en Adultos',
    description: 'Evaluación orientativa de rasgos de TDAH basada en criterios de atención, hiperactividad e impulsividad.',
    instructions: [
      'Cada pregunta describe una situación con ejemplos de distintos contextos.',
      'No necesitas identificarte con todos los ejemplos. Si al menos uno describe algo que te ocurre con la frecuencia indicada, responde basándote en ese ejemplo.',
      'Piensa en los últimos 6 meses, no en excepciones puntuales.',
    ],
    questions: tdahQuestions, sections: TDAH_SECTIONS, scoringFn: calculateTdahScore,
    disclaimerText: `${DISCLAIMER_GENERAL} Si tus resultados sugieren rasgos significativos, te recomendamos buscar evaluación con un psicólogo o psiquiatra especializado.`,
  },
  'tea-adulto': {
    testId: 'tea-adult-v1', title: 'Screening de Rasgos del Espectro Autista en Adultos',
    description: 'Evaluación orientativa de rasgos del espectro autista considerando comunicación social, relaciones, rutinas y sensorialidad.',
    instructions: [
      'Cada pregunta describe una situación concreta con ejemplos de distintos contextos.',
      'Piensa en los últimos 6 meses.',
      'Importante sobre "camuflaje" (masking): Muchas personas adultas han aprendido a ocultar estas dificultades socialmente. Responde basándote en lo que te ocurre internamente.',
    ],
    questions: teaQuestions, sections: TEA_SECTIONS, scoringFn: calculateTeaScore,
    disclaimerText: `${DISCLAIMER_GENERAL} Si tus resultados sugieren rasgos significativos, te recomendamos buscar evaluación con un psicólogo o neurólogo especializado en diagnóstico de adultos.`,
  },
  'hsp-adulto': {
    testId: 'hsp-adult-v1', title: 'Screening de Alta Sensibilidad (HSP)',
    description: 'Evaluación orientativa del temperamento de alta sensibilidad: procesamiento profundo, sobrestimulación, empatía y sensibilidad sensorial.',
    instructions: [
      'Responde pensando en tu tendencia general de toda la vida, no solo en períodos de estrés reciente.',
      'La alta sensibilidad es una característica de temperamento, no una enfermedad ni un trastorno.',
    ],
    questions: hspQuestions, sections: HSP_SECTIONS, scoringFn: calculateHspScore,
    disclaimerText: `${DISCLAIMER_GENERAL} La alta sensibilidad es un temperamento, no un trastorno. Si los resultados te generan dudas, consulta con un psicólogo familiarizado con el rasgo HSP.`,
  },
  'alexitimia-adulto': {
    testId: 'alexitimia-adult-v1', title: 'Screening de Alexitimia en Adultos',
    description: 'Evaluación orientativa del procesamiento emocional: identificación, descripción, pensamiento orientado externamente y confusión emociones-sensaciones físicas.',
    instructions: ['Responde pensando en tu tendencia general a lo largo de tu vida.'],
    questions: alexithymiaQuestions, sections: ALEXITHYMIA_SECTIONS, scoringFn: calculateAlexithymiaScore,
    disclaimerText: `${DISCLAIMER_GENERAL} La alexitimia no es un trastorno, sino un estilo de procesamiento emocional.`,
  },
  'rsd-adulto': {
    testId: 'rsd-adult-v1', title: 'Screening de RSD (Sensibilidad al Rechazo)',
    description: 'Evaluación orientativa de la hipersensibilidad al rechazo: percepción, intensidad emocional, evitación anticipatoria y rumia.',
    instructions: ['Piensa en los últimos 6 meses.', 'Responde pensando en cómo te sientes internamente, no solo en lo que otros ven.'],
    questions: rsdQuestions, sections: RSD_SECTIONS, scoringFn: calculateRsdScore,
    disclaimerText: `${DISCLAIMER_GENERAL} La RSD no es un trastorno oficial en el DSM-5, sino un fenómeno emocional clínicamente reconocido.`,
  },
  'burnout-masking': {
    testId: 'burnout-masking-v1', title: 'Burnout por Masking / Camuflaje',
    description: 'Evaluación del agotamiento específico que produce enmascarar rasgos neurodivergentes para encajar en entornos sociales, laborales o familiares.',
    instructions: ['Responde pensando en los últimos 3 meses.', 'Si no tienes diagnóstico formal pero sospechas que eres neurodivergente, responde igualmente.'],
    questions: burnoutMaskingQuestions, sections: BURNOUT_MASKING_SECTIONS, scoringFn: calculateMaskingBurnoutScore,
    disclaimerText: `${DISCLAIMER_GENERAL} El burnout por masking es un fenómeno real pero no es un diagnóstico oficial.`,
  },
  'funciones-ejecutivas': {
    testId: 'funciones-ejecutivas-v1', title: 'Funciones Ejecutivas (Screening)',
    description: 'Evaluación subjetiva del funcionamiento ejecutivo: inhibición, memoria de trabajo, planificación y flexibilidad cognitiva.',
    instructions: ['Responde pensando en tu tendencia general, no solo en períodos de estrés.'],
    questions: executiveQuestions, sections: EXECUTIVE_SECTIONS, scoringFn: calculateExecutiveScore,
    disclaimerText: `${DISCLAIMER_GENERAL} Las dificultades ejecutivas no reflejan tu inteligencia ni tu valor como persona.`,
  },

  // ─── Tareas de acción existentes ────────────────
  fas: {
    testId: 'fas-v1', type: 'fas', title: 'Fluencia Verbal (FAS)',
    description: 'Tarea de fluidez verbal: genera palabras que comiencen con una letra en 60 segundos.',
    instructions: fasConfig.rules, questions: [], sections: [], config: fasConfig, scoringFn: null,
    disclaimerText: `${DISCLAIMER_GENERAL} La fluidez verbal puede variar según el cansancio, la ansiedad o el momento del día.`,
  },
  dat: {
    testId: 'dat-v1', type: 'dat', title: 'Asociación Divergente — DAT (Tarea)',
    description: 'Evalúa tu capacidad de pensamiento divergente: qué tan lejos saltan tus asociaciones entre palabras.',
    instructions: datConfig.instructions, questions: [], sections: [], config: datConfig, scoringFn: calculateDatScore,
    disclaimerText: `${DISCLAIMER_GENERAL} El pensamiento divergente es un estilo cognitivo, no una medida de inteligencia.`,
  },

  // ─── Complementos de acción ─────────────────────
  'social-scenarios': {
    testId: 'social-scenarios-v1', type: 'social-scenarios', title: 'Escenarios Sociales (RSD)',
    description: 'Lee 16 situaciones sociales ambiguas. ¿Ves rechazo o casualidad? Complementa el test RSD con una medida objetiva de tu sesgo de interpretación.',
    instructions: [
      'Lee cada escenario e indica cuál interpretación te parece más probable.',
      'Califica cuánto te afectaría emocionalmente.',
      'No hay respuestas correctas: mide tu sesgo de percepción.',
    ],
    questions: [], sections: [], config: {}, scoringFn: null,
    disclaimerText: `${DISCLAIMER_GENERAL} Este test mide sesgos de interpretación, no la realidad de tus relaciones.`,
  },
  'self-discrepancy': {
    testId: 'self-discrepancy-v1', type: 'self-discrepancy', title: 'Auto-Discrepancia (Masking)',
    description: 'Mide la brecha entre quién eres y quién muestras. 25 rasgos con doble valoración: tu yo público y tu yo auténtico.',
    instructions: [
      'Para cada rasgo, arrastra el deslizador de ARRIBA (lo que muestras en público) y el de ABAJO (lo que realmente eres).',
      'Sé honesto/a: este test es anónimo.',
    ],
    questions: [], sections: [], config: {}, scoringFn: null,
    disclaimerText: `${DISCLAIMER_GENERAL} La discrepancia entre yo público y privado es común en personas neurodivergentes.`,
  },
  fer: {
    testId: 'fer-v1', type: 'fer', title: 'Reconocimiento Emocional (Alexitimia)',
    description: 'Lee 30 situaciones e identifica la emoción que sentiría la mayoría de las personas. Complementa el test de Alexitimia.',
    instructions: [
      'Lee cada situación y selecciona la emoción que mejor describe lo que sentiría la mayoría de las personas.',
      'No se trata de lo que tú sentirías, sino de identificar la emoción "correcta" para cada contexto.',
    ],
    questions: [], sections: [], config: {}, scoringFn: null,
    disclaimerText: `${DISCLAIMER_GENERAL} Mide reconocimiento emocional, no tu capacidad de sentir.`,
  },
  sart: {
    testId: 'sart-v1', type: 'sart', title: 'Atención Sostenida — SART (TDAH)',
    description: 'Tarea de atención sostenida: presiona la barra para cada dígito... excepto el 3. Mide inhibición, atención y variabilidad de respuesta.',
    instructions: [
      '⚠️ Esta tarea requiere un teclado físico. No funciona en dispositivos móviles.',
      'Presiona ESPACIO para cada dígito que aparezca.',
      'NO presiones cuando aparezca el número 3 (en rojo).',
      'La mayoría de las veces DEBES responder. Responde rápido.',
    ],
    questions: [], sections: [], config: {}, scoringFn: null,
    disclaimerText: `${DISCLAIMER_GENERAL} El rendimiento en esta tarea fluctúa con la fatiga, el sueño y el estrés.`,
  },
  flanker: {
    testId: 'flanker-v1', type: 'flanker', title: 'Control Inhibitorio — Flanker (TDAH + Ejecutivas)',
    description: 'Ignora las flechas distractoras y responde solo a la flecha del centro. Mide control inhibitorio.',
    instructions: [
      '⚠️ Esta tarea requiere un teclado físico. No funciona en dispositivos móviles.',
      'Presiona ← si la flecha CENTRAL apunta izquierda.',
      'Presiona → si la flecha CENTRAL apunta derecha.',
      'Ignora las flechas de los lados. Responde rápido.',
    ],
    questions: [], sections: [], config: {}, scoringFn: null,
    disclaimerText: `${DISCLAIMER_GENERAL} El control inhibitorio es una función ejecutiva que fluctúa.`,
  },
  'digit-span': {
    testId: 'digit-span-v1', type: 'digit-span', title: 'Span de Dígitos (Memoria de Trabajo)',
    description: 'Memoriza secuencias de dígitos. Fase directa (repetir en orden) y fase inversa (repetir al revés).',
    instructions: [
      'Verás secuencias de dígitos uno por uno.',
      'Fase 1: Repite en el MISMO orden.',
      'Fase 2: Repite en orden INVERSO.',
    ],
    questions: [], sections: [], config: {}, scoringFn: null,
    disclaimerText: `${DISCLAIMER_GENERAL} La memoria de trabajo es sensible al estado momentáneo.`,
  },
  navon: {
    testId: 'navon-v1', type: 'navon', title: 'Figuras de Navon (Procesamiento TEA)',
    description: 'Letras grandes compuestas de letras pequeñas. ¿Ves primero el bosque o los árboles?',
    instructions: [
      'Una pista te dirá si debes fijarte en la letra GRANDE o en las letras PEQUEÑAS.',
      'Presiona H o S según corresponda.',
    ],
    questions: [], sections: [], config: {}, scoringFn: null,
    disclaimerText: `${DISCLAIMER_GENERAL} El estilo de procesamiento local-global es una característica cognitiva.`,
  },
  rmet: {
    testId: 'rmet-v1', type: 'rmet', title: 'Lectura de Estados Mentales — RMET (TEA)',
    description: 'Lee descripciones de miradas y elige qué estado mental expresan. Mide teoría de la mente.',
    instructions: [
      'Lee cada descripción de una mirada.',
      'Selecciona qué está pensando o sintiendo la persona.',
      'Hay una opción correcta para cada ítem.',
    ],
    questions: [], sections: [], config: {}, scoringFn: null,
    disclaimerText: `${DISCLAIMER_GENERAL} La teoría de la mente es una habilidad cognitiva, no una medida de empatía.`,
  },
  'switch-task': {
    testId: 'switch-task-v1', type: 'switch-task', title: 'Cambio de Tarea (Flexibilidad)',
    description: 'Alterna entre clasificar por color o por forma. Mide el costo cognitivo de cambiar entre tareas.',
    instructions: [
      '⚠️ Esta tarea requiere un teclado físico. No funciona en dispositivos móviles.',
      'Una pista te dirá si debes responder por COLOR (rojo← azul→) o FORMA (círculo← cuadrado→).',
      'La tarea cambia aleatoriamente. Responde con ← o →.',
    ],
    questions: [], sections: [], config: {}, scoringFn: null,
    disclaimerText: `${DISCLAIMER_GENERAL} La flexibilidad cognitiva fluctúa con el estrés y la fatiga.`,
  },
  'sensory-threshold': {
    testId: 'sensory-threshold-v1', type: 'sensory-threshold', title: 'Umbral Sensorial (HSP)',
    description: 'Detecta una señal visual entre ruido. Mide tu umbral de detección sensorial.',
    instructions: [
      'Presiona ESPACIO solo cuando veas el cuadrado azul entre el ruido.',
      'Si no estás seguro/a, no respondas.',
    ],
    questions: [], sections: [], config: {}, scoringFn: null,
    disclaimerText: `${DISCLAIMER_GENERAL} El umbral sensorial bajo es una característica de temperamento.`,
  },
  'auditory-distraction': {
    testId: 'auditory-distraction-v1', type: 'auditory-distraction', title: 'Distracción Auditiva (HSP)',
    description: 'Responde a puntos verdes mientras suenan distractores. Mide tu susceptibilidad a la distracción.',
    instructions: [
      '⚠️ Esta tarea requiere un teclado físico. No funciona en dispositivos móviles.',
      'Presiona ← o → según dónde aparezca el punto verde.',
      'Ignora los sonidos distractores.',
      'Recomendado usar auriculares.',
    ],
    questions: [], sections: [], config: {}, scoringFn: null,
    disclaimerText: `${DISCLAIMER_GENERAL} La distractibilidad puede ser rasgo de temperamento o síntoma atencional.`,
  },
};

export function getTest(testId) {
  return TEST_REGISTRY[testId] || null;
}

export function getAllTests() {
  return Object.keys(TEST_REGISTRY).map((id) => {
    const registryEntry = TEST_REGISTRY[id];
    const { questions } = registryEntry;
    const meta = Object.fromEntries(
      Object.entries(registryEntry).filter(([key]) => !['questions', 'sections', 'scoringFn'].includes(key)),
    );
    const taskTypes = ['dat', 'fas', 'social-scenarios', 'self-discrepancy', 'fer', 'sart', 'flanker', 'digit-span', 'navon', 'rmet', 'switch-task', 'sensory-threshold', 'auditory-distraction'];
    const isTask = taskTypes.includes(meta.type);
    return {
      id,
      questionCount: isTask ? 1 : questions.length,
      isTask,
      ...meta,
    };
  });
}

export default TEST_REGISTRY;
