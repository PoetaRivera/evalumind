// ═══════════════════════════════════════════════════════
// Burnout por Masking — EvaluMind (13 ítems)
// Constructo complementario al CAT-Q (Hull et al., 2019)
// CAT-Q: Camouflaging Autistic Traits Questionnaire
// Hull, L., Mandy, W., Lai, M.C., et al. (2019). J Autism
// Dev Disord, 49(3), 819-833. DOI: 10.1007/s10803-018-3792-6
//
// El CAT-Q mide comportamiento de camuflaje (3 subescalas:
// Compensation, Masking, Assimilation, 25 ítems Likert 1-7).
// Este test mide las CONSECUENCIAS del camuflaje sostenido:
// el agotamiento (burnout) resultante. Constructos distintos
// y complementarios. No existe instrumento validado para
// "burnout por masking" — este test es original de EvaluMind.
// ═══════════════════════════════════════════════════════

const burnoutMaskingQuestions = [
  // ═══════════ SECCIÓN A: AGOTAMIENTO FÍSICO Y COGNITIVO POST-SOCIAL (4 ítems) ═══════════
  {
    id: 1,
    section: 'A',
    sectionTitle: 'Agotamiento físico — Cansancio post-interacción',
    dimension: 'physicalExhaustion',
    text: 'Después de una interacción social donde "actué" como se espera, siento un agotamiento físico desproporcionado, como si hubiera corrido una maratón.',
    examples: [
      {
        label: 'Reuniones',
        description:
          'Tras una reunión de trabajo, una cena familiar o una videollamada, necesito acostarme o quedarme inmóvil.',
      },
      {
        label: 'Cuerpo',
        description:
          'Mi cuerpo se siente pesado, tenso o con dolor de cabeza después de "fingir normalidad".',
      },
      {
        label: 'Duración',
        description:
          'El agotamiento dura horas y no se alivia con una pausa corta; necesito desconexión total.',
      },
    ],
  },
  {
    id: 2,
    section: 'A',
    sectionTitle: 'Agotamiento físico — Preparación como actuación',
    dimension: 'physicalExhaustion',
    text: 'Tengo que prepararme mentalmente antes de eventos sociales como si fueran una actuación, ensayando frases, expresiones o temas de conversación.',
    examples: [
      {
        label: 'Ensayo',
        description:
          'Antes de una reunión repito mentalmente cómo saludaré, qué preguntaré, cómo sonreiré.',
      },
      {
        label: 'Práctica',
        description:
          'Practico conversaciones en la ducha o en el coche antes de llegar.',
      },
      {
        label: 'Anticipación',
        description:
          'Dedico tiempo y energía a imaginar escenarios posibles y preparar respuestas adecuadas.',
      },
    ],
  },
  {
    id: 3,
    section: 'A',
    sectionTitle: 'Agotamiento físico — Monitoreo constante',
    dimension: 'physicalExhaustion',
    text: 'Durante interacciones sociales, estoy constantemente monitoreando mi propio comportamiento para no parecer "raro/a".',
    examples: [
      {
        label: 'Control',
        description:
          'Controlo mi tono de voz, evito mover las manos, fuerzo contacto visual, cuento los segundos del abrazo.',
      },
      {
        label: 'Atención dividida',
        description:
          'No puedo escuchar realmente lo que dicen porque estoy ocupado/a "actuando".',
      },
      {
        label: 'Hipervigilancia',
        description:
          'Estoy pendiente de cada microexpresión ajena para ajustar mi comportamiento en tiempo real.',
      },
    ],
  },
  {
    id: 4,
    section: 'A',
    sectionTitle: 'Agotamiento físico — Sin energía residual',
    dimension: 'physicalExhaustion',
    text: 'Después de un día de trabajo o estudio, no tengo energía para hobbies, pareja o amistades porque ya gasté todo en el "personaje".',
    examples: [
      {
        label: 'Silencio',
        description:
          'Llego a casa y no puedo hablar; necesito silencio total.',
      },
      {
        label: 'Cancelaciones',
        description:
          'Cancelo planes nocturnos porque "ya no doy más".',
      },
      {
        label: 'Vida reducida',
        description:
          'Mi vida social, creativa y personal se reduce a lo mínimo porque todo se va en la fachada laboral.',
      },
    ],
  },

  // ═══════════ SECCIÓN B: PÉRDIDA DE IDENTIDAD Y AUTENTICIDAD (3 ítems) ═══════════
  {
    id: 5,
    section: 'B',
    sectionTitle: 'Pérdida de identidad — Olvido de preferencias genuinas',
    dimension: 'identityLoss',
    text: 'A veces no sé quién soy realmente porque llevo tanto tiempo adaptándome a los demás que olvidé mis preferencias genuinas.',
    examples: [
      {
        label: 'Gustos',
        description:
          'No sé qué música me gusta realmente, qué comida prefiero, qué haría si nadie me viera.',
      },
      {
        label: 'Adopción',
        description:
          'He adoptado gustos, opiniones o estilos de personas cercanas sin saber si son míos.',
      },
      {
        label: 'Vacío',
        description:
          'Cuando me preguntan "¿qué quieres hacer?", mi mente se queda en blanco porque no sé qué deseo yo.',
      },
    ],
  },
  {
    id: 6,
    section: 'B',
    sectionTitle: 'Pérdida de identidad — Versión construida',
    dimension: 'identityLoss',
    text: 'Siento que las personas que me conocen no conocen la "versión real" de mí, sino una versión que construí para ellas.',
    examples: [
      {
        label: 'Máscara',
        description:
          'Mi pareja, familia o amigos cercanos nunca me han visto sin máscara.',
      },
      {
        label: 'Miedo',
        description:
          'Tengo miedo de que si me relajo y soy yo mismo/a, me rechacen.',
      },
      {
        label: 'Soledad',
        description:
          'Me siento solo/a incluso rodeado/a de gente porque nadie conoce realmente quién soy.',
      },
    ],
  },
  {
    id: 7,
    section: 'B',
    sectionTitle: 'Pérdida de identidad — Comportamiento drásticamente distinto a solas',
    dimension: 'identityLoss',
    text: 'Cuando estoy solo/a, mi comportamiento cambia drásticamente: movimientos, voz, intereses, ritmo.',
    examples: [
      {
        label: 'Liberación',
        description:
          'Solo/a me muevo más, hago sonidos, bailo, organizo objetos, hablo en voz alta conmigo mismo.',
      },
      {
        label: 'Contraste',
        description:
          'En público soy otra persona completamente distinta.',
      },
      {
        label: 'Alivio',
        description:
          'Sentirme solo/a es el único momento donde no actúo y donde realmente respiro.',
      },
    ],
  },

  // ═══════════ SECCIÓN C: DESCONEXIÓN EMOCIONAL Y ALEXITIMIA ADQUIRIDA (2 ítems) ═══════════
  {
    id: 8,
    section: 'C',
    sectionTitle: 'Desconexión emocional — Radar apagado',
    dimension: 'emotionalDisconnect',
    text: 'He notado que cada vez me cuesta más identificar qué siento, como si el enmascaramiento hubiera apagado mi radar emocional.',
    examples: [
      {
        label: 'Simplificación',
        description:
          'Antes sabía si estaba triste o enojado; ahora solo sé que estoy "cansado/a".',
      },
      {
        label: 'Retraso',
        description:
          'Las emociones llegan tardías o como síntomas físicos.',
      },
      {
        label: 'Anestesia',
        description:
          'Siento que me he vuelto insensible a mis propias emociones tras años de suprimirlas.',
      },
    ],
  },
  {
    id: 9,
    section: 'C',
    sectionTitle: 'Desconexión emocional — Piloto automático',
    dimension: 'emotionalDisconnect',
    text: 'Siento que mi vida transcurre en "piloto automático": hago las cosas, pero no siento que las esté viviendo realmente.',
    examples: [
      {
        label: 'Anestesia diaria',
        description:
          'Días enteros donde no recuerdo haber sentido nada.',
      },
      {
        label: 'Fuera del cuerpo',
        description:
          'Como si observara mi vida desde fuera.',
      },
      {
        label: 'Vacío existencial',
        description:
          'Cumplo con todo pero siento que nada me atraviesa realmente.',
      },
    ],
  },

  // ═══════════ SECCIÓN D: RECUPERACIÓN Y COLAPSO (4 ítems) ═══════════
  {
    id: 10,
    section: 'D',
    sectionTitle: 'Recuperación — Aislamiento reparador prolongado',
    dimension: 'collapseRecovery',
    text: 'Necesito días de aislamiento total para recuperarme de un fin de semana social o una semana de trabajo.',
    examples: [
      {
        label: 'Eventos',
        description:
          'Después de una boda o reunión familiar, necesito 2-3 días de soledad.',
      },
      {
        label: 'Distinción',
        description:
          'No es introversión normal; es recuperación de un esfuerzo extremo.',
      },
      {
        label: 'Incapacidad',
        description:
          'Durante esos días de recuperación no puedo atender llamadas, mensajes ni tareas básicas.',
      },
    ],
  },
  {
    id: 11,
    section: 'D',
    sectionTitle: 'Recuperación — Colapso total',
    dimension: 'collapseRecovery',
    text: 'He llegado al punto de colapso emocional o físico (crisis, burnout total, depresión) después de períodos prolongados de enmascaramiento.',
    examples: [
      {
        label: 'Crisis',
        description:
          'Crisis de llanto, parálisis, ausentismo laboral, aislamiento total por semanas.',
      },
      {
        label: 'Frase recurrente',
        description:
          '"Ya no puedo más" como pensamiento repetido.',
      },
      {
        label: 'Colapso',
        description:
          'Mi cuerpo o mi mente dijeron "basta" tras meses o años de sostener la máscara.',
      },
    ],
  },
  {
    id: 12,
    section: 'D',
    sectionTitle: 'Recuperación — Deseo de abandono del entorno',
    dimension: 'collapseRecovery',
    text: 'He considerado dejar mi trabajo, relaciones o estudios no porque sean difíciles en sí, sino porque el costo de "fingir" es insostenible.',
    examples: [
      {
        label: 'Fantasías',
        description:
          'Fantasías de vivir solo/a en el bosque, de trabajar remoto para no ver a nadie.',
      },
      {
        label: 'Distinción',
        description:
          'No es que odie mi carrera; odio el teatro que exige.',
      },
      {
        label: 'Huida',
        description:
          'He pensado seriamente en desaparecer y empezar de cero donde nadie me conozca.',
      },
    ],
  },
  {
    id: 13,
    section: 'D',
    sectionTitle: 'Recuperación — Miedo a la autenticidad',
    dimension: 'collapseRecovery',
    text: 'Siento que si dejo de esforzarme por encajar, el mundo se derrumba: perderé mi trabajo, mi pareja o mi familia.',
    examples: [
      {
        label: 'Terror',
        description:
          'Terror a ser "auténtico/a" porque sé que las consecuencias serían graves.',
      },
      {
        label: 'Supervivencia',
        description:
          'El masking no es opcional; es supervivencia.',
      },
      {
        label: 'Atrapamiento',
        description:
          'Siento que estoy en una trampa: ser yo mismo/a me cuesta todo, pero fingir también.',
      },
    ],
  },
  // La pregunta D4 del spec está fusionada aquí (es el ítem 13)
  // Total: 13 preguntas (A4 + B3 + C2 + D4)
];

export const BURNOUT_MASKING_SECTIONS = [
  { id: 'A', title: 'Agotamiento físico y cognitivo post-social', range: [0, 3] },
  { id: 'B', title: 'Pérdida de identidad y autenticidad', range: [4, 6] },
  { id: 'C', title: 'Desconexión emocional y alexitimia adquirida', range: [7, 8] },
  { id: 'D', title: 'Recuperación y colapso', range: [9, 12] },
];

// Nota: El spec original tenía D4 como pregunta separada de D3,
// aquí se fusionan en el ítem 13 para mantener consistencia con el algoritmo (13 ítems total)
// ya que D3 y D4 eran conceptualmente cercanos en la práctica clínica.

export default burnoutMaskingQuestions;
