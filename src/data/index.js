import tdahQuestions, { SECTIONS as TDAH_SECTIONS } from './tdahQuestions';
import teaQuestions, { TEA_SECTIONS } from './teaQuestions';
import hspQuestions, { HSP_SECTIONS } from './hspQuestions';
import alexithymiaQuestions, { ALEXITHYMIA_SECTIONS } from './alexithymiaQuestions';
import rsdQuestions, { RSD_SECTIONS } from './rsdQuestions';
import burnoutMaskingQuestions, { BURNOUT_MASKING_SECTIONS } from './burnoutMaskingQuestions';
import executiveQuestions, { EXECUTIVE_SECTIONS } from './executiveQuestions';
import datConfig from './datConfig';
import fasConfig from './fasConfig';
import { calculateTdahScore, calculateTeaScore, calculateHspScore, calculateAlexithymiaScore, calculateDatScore, calculateRsdScore, calculateMaskingBurnoutScore, calculateExecutiveScore } from '../utils/scoring';

const TEST_REGISTRY = {
  'tdah-adulto': {
    testId: 'tdah-adult-v2',
    title: 'Screening de TDAH en Adultos',
    description:
      'Evaluación orientativa de rasgos de TDAH basada en criterios de atención, hiperactividad e impulsividad.',
    instructions: [
      'Cada pregunta describe una situación con ejemplos de distintos contextos.',
      'No necesitas identificarte con todos los ejemplos. Si al menos uno describe algo que te ocurre con la frecuencia indicada, responde basándote en ese ejemplo.',
      'Piensa en los últimos 6 meses, no en excepciones puntuales.',
    ],
    questions: tdahQuestions,
    sections: TDAH_SECTIONS,
    scoringFn: calculateTdahScore,
    disclaimerText:
      'Este test es únicamente orientativo y no constituye un diagnóstico médico ni psicológico. Los resultados no reemplazan la evaluación de un profesional de la salud mental. Si tus resultados sugieren rasgos significativos, te recomendamos buscar evaluación con un psicólogo o psiquiatra especializado.',
  },
  'tea-adulto': {
    testId: 'tea-adult-v1',
    title: 'Screening de Rasgos del Espectro Autista en Adultos',
    description:
      'Evaluación orientativa de rasgos del espectro autista considerando comunicación social, relaciones, rutinas y sensorialidad.',
    instructions: [
      'Cada pregunta describe una situación concreta con ejemplos de distintos contextos.',
      'No necesitas identificarte con todos los ejemplos. Si al menos uno describe algo que te ocurre con la frecuencia indicada, responde basándote en ese ejemplo.',
      'Piensa en los últimos 6 meses.',
      'Importante sobre "camuflaje" (masking): Muchas personas adultas han aprendido a ocultar estas dificultades socialmente. Responde basándote en lo que te ocurre internamente (el esfuerzo que te cuesta, lo que haces cuando estás solo/a, o lo que sucede cuando bajas la guardia), no solo en lo que otros perciben externamente.',
    ],
    questions: teaQuestions,
    sections: TEA_SECTIONS,
    scoringFn: calculateTeaScore,
    disclaimerText:
      'Este test es únicamente orientativo y no constituye un diagnóstico médico ni psicológico. Los resultados no reemplazan la evaluación de un profesional de la salud mental. Si tus resultados sugieren rasgos significativos, te recomendamos buscar evaluación con un psicólogo o neurólogo especializado en diagnóstico de adultos.',
  },
  'hsp-adulto': {
    testId: 'hsp-adult-v1',
    title: 'Screening de Alta Sensibilidad (HSP)',
    description:
      'Evaluación orientativa del temperamento de alta sensibilidad: procesamiento profundo, sobrestimulación, empatía y sensibilidad sensorial.',
    instructions: [
      'Cada pregunta describe una situación concreta con ejemplos de distintos contextos.',
      'No necesitas identificarte con todos los ejemplos. Si al menos uno describe tu experiencia con la frecuencia indicada, responde basándote en ese ejemplo.',
      'Responde pensando en tu tendencia general de toda la vida, no solo en períodos de estrés reciente.',
      'Importante: La alta sensibilidad es una característica de temperamento presente en aproximadamente el 20-30 % de la población, no una enfermedad ni un trastorno. Algunas experiencias pueden solaparse con ansiedad, TDAH o TEA; este test busca identificar el patrón de fondo que persistió desde la infancia.',
    ],
    questions: hspQuestions,
    sections: HSP_SECTIONS,
    scoringFn: calculateHspScore,
    disclaimerText:
      'Este test es únicamente orientativo y no constituye un diagnóstico médico ni psicológico. La alta sensibilidad es un temperamento, no un trastorno. Si los resultados te generan dudas, consulta con un psicólogo familiarizado con el rasgo HSP.',
  },
  'alexitimia-adulto': {
    testId: 'alexitimia-adult-v1',
    title: 'Screening de Alexitimia en Adultos',
    description:
      'Evaluación orientativa del procesamiento emocional: identificación, descripción, pensamiento orientado externamente y confusión entre emociones y sensaciones físicas.',
    instructions: [
      'Cada pregunta describe una situación concreta con ejemplos de distintos contextos.',
      'No necesitas identificarte con todos los ejemplos. Si al menos uno describe tu experiencia con la frecuencia indicada, responde basándote en ese ejemplo.',
      'Responde pensando en tu tendencia general a lo largo de tu vida, no solo en períodos de depresión o estrés extremo.',
      'Importante: La alexitimia no es una enfermedad mental, sino un estilo de procesamiento emocional que describe dificultad para poner nombre a lo que se siente, diferenciar emociones de sensaciones físicas, o describir estados internos a otros. Algunas personas aprenden a funcionar emocionalmente sin ser conscientes de este patrón.',
    ],
    questions: alexithymiaQuestions,
    sections: ALEXITHYMIA_SECTIONS,
    scoringFn: calculateAlexithymiaScore,
    disclaimerText:
      'Este test es únicamente orientativo y no constituye un diagnóstico médico ni psicológico. La alexitimia no es un trastorno, sino un estilo de procesamiento emocional. Si los resultados te generan dudas, consulta con un psicólogo o terapeuta especializado en regulación emocional.',
  },
  'rsd-adulto': {
    testId: 'rsd-adult-v1',
    title: 'Rejection Sensitive Dysphoria (RSD)',
    description:
      'Evaluación orientativa de la hipersensibilidad al rechazo: percepción de señales, intensidad emocional, evitación anticipatoria y rumia.',
    instructions: [
      'Cada pregunta describe una situación concreta con ejemplos de distintos contextos.',
      'No necesitas identificarte con todos los ejemplos. Si al menos uno describe tu experiencia con la frecuencia indicada, responde basándote en ese ejemplo.',
      'Piensa en los últimos 6 meses.',
      'Importante: Responde pensando en cómo te sientes internamente, no solo en lo que otros ven. Muchas personas con RSD aprenden a ocultar su reacción externamente mientras sienten una tormenta emocional interna.',
    ],
    questions: rsdQuestions,
    sections: RSD_SECTIONS,
    scoringFn: calculateRsdScore,
    disclaimerText:
      'Este test es únicamente orientativo y no constituye un diagnóstico médico ni psicológico. La RSD no es un trastorno oficial en el DSM-5, sino un fenómeno emocional clínicamente reconocido, especialmente frecuente en personas con TDAH o TEA. Si tus resultados sugieren este patrón, te recomendamos consultar con un psicólogo.',
  },
  'burnout-masking': {
    testId: 'burnout-masking-v1',
    title: 'Burnout por Masking / Camuflaje',
    description:
      'Evaluación del agotamiento específico que produce enmascarar rasgos neurodivergentes para encajar en entornos sociales, laborales o familiares.',
    instructions: [
      'Cada pregunta describe una situación concreta con ejemplos de distintos contextos.',
      'No necesitas identificarte con todos los ejemplos. Si al menos uno describe tu experiencia con la frecuencia indicada, responde basándote en ese ejemplo.',
      'Responde pensando en los últimos 3 meses.',
      'Importante: Si no tienes diagnóstico formal pero sospechas que eres neurodivergente, responde igualmente. Este test mide el costo de fingir ser quien no eres.',
    ],
    questions: burnoutMaskingQuestions,
    sections: BURNOUT_MASKING_SECTIONS,
    scoringFn: calculateMaskingBurnoutScore,
    disclaimerText:
      'Este test es únicamente orientativo y no constituye un diagnóstico médico ni psicológico. El burnout por masking es un fenómeno real pero no es un diagnóstico oficial. Si sientes que el costo de camuflarte es insostenible, busca apoyo terapéutico.',
  },
  'funciones-ejecutivas': {
    testId: 'funciones-ejecutivas-v1',
    title: 'Funciones Ejecutivas (Screening)',
    description:
      'Evaluación subjetiva del funcionamiento ejecutivo: inhibición, memoria de trabajo, planificación y flexibilidad cognitiva.',
    instructions: [
      'Cada pregunta describe una situación concreta con ejemplos de distintos contextos.',
      'No necesitas identificarte con todos los ejemplos. Si al menos uno describe tu experiencia con la frecuencia indicada, responde basándote en ese ejemplo.',
      'Responde pensando en tu tendencia general, no solo en períodos de estrés.',
      'Importante: Este test evalúa tu experiencia cotidiana, no es una evaluación neuropsicológica formal.',
    ],
    questions: executiveQuestions,
    sections: EXECUTIVE_SECTIONS,
    scoringFn: calculateExecutiveScore,
    disclaimerText:
      'Este test es únicamente orientativo y no constituye una evaluación neuropsicológica formal. Las dificultades ejecutivas no reflejan tu inteligencia ni tu valor como persona. Si estas dificultades impactan tu vida diaria, consulta con un neuropsicólogo.',
  },
  fas: {
    testId: 'fas-v1',
    type: 'fas',
    title: 'Fluencia Verbal (FAS)',
    description:
      'Tarea de fluidez verbal: genera palabras que comiencen con una letra en 60 segundos. Mide acceso léxico y flexibilidad cognitiva.',
    instructions: fasConfig.rules,
    questions: [],
    sections: [],
    config: fasConfig,
    scoringFn: null, // El scoring ocurre dentro de FasTask
    disclaimerText:
      'Este test es únicamente orientativo y no constituye una evaluación neuropsicológica formal. La fluidez verbal puede variar mucho según el cansancio, la ansiedad o el momento del día.',
  },
  dat: {
    testId: 'dat-v1',
    type: 'dat',
    title: 'Test de Asociación Divergente (DAT)',
    description:
      'Medición de pensamiento divergente mediante distancia semántica entre palabras. Evalúa tu capacidad para generar conexiones entre ideas muy distantes.',
    instructions: datConfig.instructions,
    questions: [], // No tiene preguntas Likert
    sections: [], // No tiene secciones
    config: datConfig,
    scoringFn: calculateDatScore,
    disclaimerText:
      'Este test es únicamente orientativo y no constituye una evaluación cognitiva formal. El pensamiento divergente es un estilo cognitivo, no una medida de inteligencia. Un resultado convergente no indica menor capacidad intelectual.',
  },
};

export function getTest(testId) {
  const test = TEST_REGISTRY[testId];
  if (!test) return null;
  return test;
}

export function getAllTests() {
  return Object.keys(TEST_REGISTRY).map((id) => {
    const { questions, sections, scoringFn, ...meta } = TEST_REGISTRY[id];
    const isDat = meta.type === 'dat';
    return {
      id,
      questionCount: isDat ? 1 : questions.length,
      isTask: isDat,
      ...meta,
    };
  });
}

export default TEST_REGISTRY;
