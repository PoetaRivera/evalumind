import tdahQuestions, { SECTIONS as TDAH_SECTIONS } from './tdahQuestions';
import teaQuestions, { TEA_SECTIONS } from './teaQuestions';
import hspQuestions, { HSP_SECTIONS } from './hspQuestions';
import alexithymiaQuestions, { ALEXITHYMIA_SECTIONS } from './alexithymiaQuestions';
import rsdQuestions, { RSD_SECTIONS } from './rsdQuestions';
import burnoutMaskingQuestions, { BURNOUT_MASKING_SECTIONS } from './burnoutMaskingQuestions';
import executiveQuestions, { EXECUTIVE_SECTIONS } from './executiveQuestions';
import datConfig from './datConfig';
import * as fasConfig from './fasConfig';
import {
  calculateTdahScore, calculateTeaScore, calculateHspScore,
  calculateAlexithymiaScore, calculateDatScore, calculateRsdScore,
  calculateMaskingBurnoutScore, calculateExecutiveScore,
} from '../utils/scoring';
import { calculateRmetScore } from '../utils/rmetScoring';
import { calculateFasScore } from '../utils/fasScoring';

const DISCLAIMER_GENERAL =
  'Esta herramienta es de autoobservación personal y educativa. No diagnostica, confirma ni descarta TDA/TDAH, TEA u otra condición, y no reemplaza una evaluación profesional.';

const TEST_REGISTRY = {
  // ─── Likert ─────────────────────────────────────
  'tdah-adulto': {
    testId: 'tdah-adult-v2', title: 'Autoobservación de Atención e Impulsividad',
    description: 'Cuestionario educativo basado en ítems tipo ASRS para observar atención, hiperactividad e impulsividad en la vida diaria.',
    instructions: [
      'Cada pregunta describe una situación con ejemplos de distintos contextos.',
      'No necesitas identificarte con todos los ejemplos. Si al menos uno describe algo que te ocurre con la frecuencia indicada, responde basándote en ese ejemplo.',
      'Piensa en los últimos 6 meses, no en excepciones puntuales.',
      'Los primeros 6 ítems se muestran como bloque breve de autoobservación.',
    ],
    questions: tdahQuestions, sections: TDAH_SECTIONS, scoringFn: calculateTdahScore,
    source: 'ASRS-5 (Kessler et al., 2005; Ustun et al., 2017). DOI: 10.1017/S0033291704002892',
    disclaimerText: `${DISCLAIMER_GENERAL} Usa el resultado para registrar ejemplos, apoyos y situaciones que cambian tu funcionamiento.`,
  },
  'tea-adulto': {
    testId: 'tea-adult-v1', title: 'Rasgos Sociales y Sensoriales — AQ-50',
    description: 'Cuestionario de autoobservación inspirado en el AQ-50. Registra patrones sociales, sensoriales, comunicativos y de rutina. Toma ~10-15 minutos.',
    instructions: [
      'Cada pregunta describe una situación con ejemplos de distintos contextos.',
      'Respondé qué tan de acuerdo estás: Totalmente de acuerdo, Parcialmente de acuerdo, Parcialmente en desacuerdo o Totalmente en desacuerdo.',
      'Piensa en tu tendencia general a lo largo de tu vida.',
      'Importante sobre "camuflaje" (masking): Muchas personas adultas han aprendido a ocultar estos rasgos socialmente. Responde basándote en lo que te ocurre internamente, no en lo que mostrás.',
    ],
    questions: teaQuestions, sections: TEA_SECTIONS, scoringFn: calculateTeaScore,
    source: 'AQ-50 — Baron-Cohen, S., Wheelwright, S., Skinner, R., Martin, J., & Clubley, E. (2001). J Autism Dev Disord, 31(1), 5-17. DOI: 10.1023/a:1005653411471',
    disclaimerText: `${DISCLAIMER_GENERAL} El AQ-50 puede orientar una conversación personal o profesional, pero no debe usarse para diagnosticar.`,
  },
  'hsp-adulto': {
    testId: 'hsp-adult-v1', title: 'Screening de Alta Sensibilidad — HSPS-27',
    description: 'Evaluación del rasgo de alta sensibilidad con el HSPS-27 (Highly Sensitive Person Scale, Aron & Aron, 1997). 27 ítems en 4 dimensiones DOES: profundidad de procesamiento, sobrestimulación, intensidad emocional y sensibilidad sensorial.',
    instructions: [
      'Responde pensando en tu tendencia general de toda la vida, no solo en períodos de estrés reciente.',
      'Escala de 7 puntos: Totalmente en desacuerdo (1) a Totalmente de acuerdo (7).',
      'La alta sensibilidad es una característica de temperamento, no un trastorno.',
    ],
    questions: hspQuestions, sections: HSP_SECTIONS, scoringFn: calculateHspScore,
    source: 'HSPS-27 — Aron, E.N. & Aron, A. (1997). J Pers Soc Psychol, 73(2), 345-368. DOI: 10.1037/0022-3514.73.2.345. Modelo DOES: Aron (2010).',
    disclaimerText: `${DISCLAIMER_GENERAL} La alta sensibilidad es un temperamento presente en el 15-20 % de la población, no un trastorno. El HSPS-27 es el instrumento de referencia.`,
  },
  'alexitimia-adulto': {
    testId: 'alexitimia-adult-v1', type: 'likert', title: 'Autoobservación Emocional — TAS-20',
    description: 'Evaluación de alexitimia con el TAS-20 (Toronto Alexithymia Scale, 20 ítems). Mide 3 dimensiones: identificación de sentimientos (DIF), descripción de sentimientos (DDF) y pensamiento orientado externamente (EOT).',
    instructions: [
      'Responde pensando en tu tendencia general a lo largo de tu vida.',
      'Escala: Totalmente en desacuerdo (1) a Totalmente de acuerdo (5).',
      'No hay respuestas correctas o incorrectas.',
    ],
    questions: alexithymiaQuestions, sections: ALEXITHYMIA_SECTIONS, scoringFn: calculateAlexithymiaScore,
    source: 'TAS-20 — Bagby, Parker & Taylor (1994). J Psychosom Res, 38(1), 23-32. DOI: 10.1016/0022-3999(94)90005-1. Validación española: Moral de la Rubia, J. (2008). Rev Electrónica Psicología Iztacala, 11(2), 97-110.',
    disclaimerText: `${DISCLAIMER_GENERAL} La alexitimia describe un estilo de procesamiento emocional; observa tendencias, no etiquetas.`,
  },
  'rsd-adulto': {
    testId: 'rsd-adult-v1', title: 'Screening de Sensibilidad al Rechazo — RSQ',
    description: 'Evaluación de la sensibilidad al rechazo basada en el RSQ (Rejection Sensitivity Questionnaire, Downey & Feldman, 1996). 16 ítems en 4 dimensiones: percepción de rechazo, respuesta emocional, evitación anticipatoria y rumia.',
    instructions: ['Piensa en los últimos 6 meses.', 'Responde pensando en cómo te sientes internamente, no solo en lo que otros ven.'],
    questions: rsdQuestions, sections: RSD_SECTIONS, scoringFn: calculateRsdScore,
    source: 'RSQ — Downey, G. & Feldman, S. (1996). J Pers Soc Psychol, 70(6), 1327-1343. DOI: 10.1037/0022-3514.70.6.1327. A-RSQ: Berenson et al. (2009). Adaptación Likert educativa para autoobservación.',
    disclaimerText: `${DISCLAIMER_GENERAL} La sensibilidad al rechazo se presenta aquí como patrón emocional observable, no como diagnóstico.`,
  },
  'burnout-masking': {
    testId: 'burnout-masking-v1', title: 'Burnout por Masking / Camuflaje',
    description: 'Evaluación del agotamiento que produce enmascarar rasgos neurodivergentes. Complementa al CAT-Q (Hull et al., 2019): el CAT-Q mide la conducta de camuflaje, este test mide sus consecuencias (burnout). 13 ítems.',
    instructions: ['Responde pensando en los últimos 3 meses.', 'No necesitas diagnóstico ni etiqueta previa: responde desde tu experiencia concreta.'],
    questions: burnoutMaskingQuestions, sections: BURNOUT_MASKING_SECTIONS, scoringFn: calculateMaskingBurnoutScore,
    source: 'Constructo complementario al CAT-Q — Hull, L., Mandy, W., Lai, M.C., et al. (2019). J Autism Dev Disord, 49(3), 819-833. DOI: 10.1007/s10803-018-3792-6. El burnout por masking no tiene instrumento validado propio; este test es original de EvaluMind.',
    disclaimerText: `${DISCLAIMER_GENERAL} El burnout por masking es un fenómeno real aunque no sea un diagnóstico oficial.`,
  },
  'funciones-ejecutivas': {
    testId: 'funciones-ejecutivas-v1', title: 'Funciones Ejecutivas (Autoobservación)',
    description: 'Cuestionario subjetivo sobre inhibición, memoria de trabajo, planificación y flexibilidad cognitiva. Versión breve de 18 ítems.',
    instructions: ['Responde pensando en tu tendencia general, no solo en períodos de estrés.'],
    questions: executiveQuestions, sections: EXECUTIVE_SECTIONS, scoringFn: calculateExecutiveScore,
    source: 'Marco conceptual: BRIEF-A — Gioia, G.A., Isquith, P.K., Guy, S.C., & Kenworthy, L. PAR. Toplak, M.E., West, R.F., & Stanovich, K.E. (2013). J Child Psychol Psychiatry, 54(2), 131-143. DOI: 10.1111/jcpp.12001',
    disclaimerText: `${DISCLAIMER_GENERAL} Las dificultades ejecutivas no reflejan tu inteligencia ni tu valor como persona.`,
  },

  // ─── Tareas de acción existentes ────────────────
  fas: {
    testId: 'fas-v1', type: 'fas', title: 'Fluencia Verbal (COWAT/FAS)',
    description: 'Tarea de fluidez verbal fonológica: 3 letras (F, A, S), 60 segundos cada una. Evalúa acceso léxico y flexibilidad cognitiva según el COWAT (Benton & Hamsher, 1989).',
    instructions: fasConfig.FAS_RULES, questions: [], sections: [], config: fasConfig, scoringFn: calculateFasScore,
    source: 'COWAT — Benton & Hamsher (1989). Multilingual Aphasia Examination. Normas: Ruff et al. (1996), Loonstra et al. (2001). DOI: 10.1207/S15324826AN0803_5. Normas español: Olabarrieta-Landa et al. (2015).',
    disclaimerText: `${DISCLAIMER_GENERAL} La fluidez verbal puede variar según el cansancio, la ansiedad o el momento del día. Los resultados se basan en el total de palabras válidas (F+A+S), no en análisis de categorías.`,
  },
  dat: {
    testId: 'dat-v1', type: 'dat', title: 'Asociación Divergente — DAT (Tarea)',
    description: 'Observa tu pensamiento divergente: qué tan lejos saltan tus asociaciones entre palabras.',
    instructions: datConfig.instructions, questions: [], sections: [], config: datConfig, scoringFn: calculateDatScore,
    disclaimerText: `${DISCLAIMER_GENERAL} El pensamiento divergente es un estilo cognitivo, no una medida de inteligencia.`,
  },

  // ─── Complementos de acción ─────────────────────
  'social-scenarios': {
    testId: 'social-scenarios-v1', type: 'social-scenarios', title: 'Escenarios Sociales (RSD)',
    description: 'Lee 16 situaciones sociales ambiguas. Observa si tiendes a interpretar rechazo, casualidad u otras posibilidades.',
    instructions: [
      'Lee cada escenario e indica cuál interpretación te parece más probable.',
      'Califica cuánto te afectaría emocionalmente.',
      'No hay respuestas correctas: registra tu tendencia de interpretación.',
    ],
    questions: [], sections: [], config: {}, scoringFn: null,
    source: 'Downey, G. & Feldman, S. (1996). J Pers Soc Psychol, 70(6), 1327-1343. DOI: 10.1037/0022-3514.70.6.1327. Test original de EvaluMind basado en el paradigma RSQ de escenarios sociales ambiguos.',
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
    source: 'Higgins, E.T. (1987). Self-discrepancy: A theory relating self and affect. Psychological Review, 94(3), 319-340. DOI: 10.1037/0033-295X.94.3.319. Test original de EvaluMind adaptado para medir masking (brecha yo público/yo auténtico).',
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
    source: 'Prikachin, G.C. et al. (2009). Emotion recognition. Test original de EvaluMind basado en el paradigma de reconocimiento emocional situacional. Complementa el TAS-20.',
    disclaimerText: `${DISCLAIMER_GENERAL} Mide reconocimiento emocional, no tu capacidad de sentir.`,
  },
  sart: {
    testId: 'sart-v1', type: 'sart', title: 'Atención Sostenida — SART',
    description: 'Tarea de atención sostenida: presiona la barra para cada dígito... excepto el 3. Mide inhibición, atención y variabilidad de respuesta.',
    instructions: [
      '⚠️ Esta tarea requiere un teclado físico. No funciona en dispositivos móviles.',
      'Presiona ESPACIO para cada dígito que aparezca.',
      'NO presiones cuando aparezca el número 3 (en rojo).',
      'La mayoría de las veces DEBES responder. Responde rápido.',
    ],
    questions: [], sections: [], config: {}, scoringFn: null,
    source: 'Robertson, I.H., Manly, T., Andrade, J., Baddeley, B.T., & Yiend, J. (1997). Neuropsychologia, 35(6), 747-758. DOI: 10.1016/S0028-3932(97)00015-8. Tarea adaptada del Sustained Attention to Response Task.',
    disclaimerText: `${DISCLAIMER_GENERAL} El rendimiento en esta tarea fluctúa con la fatiga, el sueño y el estrés.`,
  },
  flanker: {
    testId: 'flanker-v1', type: 'flanker', title: 'Control Inhibitorio — Flanker',
    description: 'Ignora las flechas distractoras y responde solo a la flecha del centro. Mide control inhibitorio.',
    instructions: [
      '⚠️ Esta tarea requiere un teclado físico. No funciona en dispositivos móviles.',
      'Presiona ← si la flecha CENTRAL apunta izquierda.',
      'Presiona → si la flecha CENTRAL apunta derecha.',
      'Ignora las flechas de los lados. Responde rápido.',
    ],
    questions: [], sections: [], config: {}, scoringFn: null,
    source: 'Eriksen, B.A. & Eriksen, C.W. (1974). Perception & Psychophysics, 16(1), 143-149. DOI: 10.3758/BF03203267. Tarea adaptada de la Eriksen Flanker Task.',
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
    source: 'Wechsler, D. (2008). WAIS-IV: Wechsler Adult Intelligence Scale — Fourth Edition. San Antonio, TX: Pearson. Subprueba Digit Span adaptada.',
    disclaimerText: `${DISCLAIMER_GENERAL} La memoria de trabajo es sensible al estado momentáneo.`,
  },
  navon: {
    testId: 'navon-v1', type: 'navon', title: 'Figuras de Navon (Procesamiento Local/Global)',
    description: 'Letras grandes compuestas de letras pequeñas. ¿Ves primero el bosque o los árboles?',
    instructions: [
      'Una pista te dirá si debes fijarte en la letra GRANDE o en las letras PEQUEÑAS.',
      'Presiona H o S según corresponda.',
    ],
    questions: [], sections: [], config: {}, scoringFn: null,
    source: 'Navon, D. (1977). Cognitive Psychology, 9(3), 353-383. DOI: 10.1016/0010-0285(77)90012-3. Tarea adaptada de Navon hierarchical figures (global vs. local precedence).',
    disclaimerText: `${DISCLAIMER_GENERAL} El estilo de procesamiento local-global es una característica cognitiva.`,
  },
  rmet: {
    testId: 'rmet-v1', type: 'rmet', title: 'Test Textual de Estados Mentales',
    description: 'Lee descripciones de miradas y elige qué estado mental expresan. Versión textual inspirada en el RMET de Baron-Cohen et al. (2001). No utiliza las fotografías originales.',
    instructions: [
      'Lee cada descripción de una mirada.',
      'Selecciona qué está pensando o sintiendo la persona.',
      'Hay una opción correcta para cada ítem.',
    ],
    questions: [], sections: [], config: {}, scoringFn: calculateRmetScore,
    source: 'Inspirado en el Reading the Mind in the Eyes Test (RMET). Baron-Cohen, S., Wheelwright, S., Hill, J., Raste, Y., & Plumb, I. (2001). Journal of Child Psychology and Psychiatry, 42(2), 241-251. DOI: 10.1111/1469-7610.00715. Adaptación textual — no utiliza las 36 fotografías originales del RMET.',
    disclaimerText: `${DISCLAIMER_GENERAL} Este test es una adaptación textual inspirada en el Reading the Mind in the Eyes Test (RMET) de Baron-Cohen et al. (2001). NO utiliza las 36 fotografías originales del RMET (copyright protegido). Mide comprensión verbal de estados mentales, no lectura de emociones en ojos. Los resultados no son comparables con las normas del RMET fotográfico.`,
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
    source: 'Monsell, S. (2003). Trends in Cognitive Sciences, 7(3), 134-140. DOI: 10.1016/S1364-6613(03)00028-7. Tarea adaptada de task-switching paradigm.',
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
    source: 'Aron, E.N. (2010). Psychotherapy and the Highly Sensitive Person. New York: Routledge. Dimensión DOES: Sensory Sensitivity. Test original de EvaluMind. Sin instrumento validado equivalente.',
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
    source: 'Aron, E.N. (2010). Psychotherapy and the Highly Sensitive Person. New York: Routledge. Dimensión DOES: Overstimulation. Test original de EvaluMind. Sin instrumento validado equivalente.',
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
