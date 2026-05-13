const alexithymiaQuestions = [
  // ═══════════ SECCIÓN A: IDENTIFICACIÓN DE EMOCIONES (DIF) ═══════════
  {
    id: 1,
    section: 'A',
    sectionTitle: 'Identificación de emociones — Dificultad para nombrarlas',
    dimension: 'identifyingFeelings',
    text: 'Cuando experimento una emoción intensa, me cuesta ponerle un nombre específico; sé que "algo" pasa, pero no sé si es tristeza, rabia, miedo o frustración.',
    examples: [
      {
        label: 'Conflictos',
        description:
          'Alguien me hiere y mi cuerpo reacciona (calor, nudo, lágrimas), pero mentalmente no sé si estoy triste, enojado o avergonzado hasta que alguien me lo nombra.',
      },
      {
        label: 'Noticias / emociones externas',
        description:
          'Veo una película emotiva y siento una "bola" en el pecho, pero no sé si es conmovedor, triste o nostálgico.',
      },
      {
        label: 'Decisiones',
        description:
          'Después de tomar una decisión importante, sé que "algo no está bien" pero no logro etiquetar si es arrepentimiento, alivio o ansiedad.',
      },
      {
        label: 'Días grises',
        description:
          'A veces tengo días donde sé que mi estado de ánimo cambió, pero si me preguntan "¿cómo te sientes?" no tengo una palabra precisa.',
      },
    ],
  },
  {
    id: 2,
    section: 'A',
    sectionTitle: 'Identificación de emociones — Mezcla confusa',
    dimension: 'identifyingFeelings',
    text: 'Mis emociones tienden a sentirse como una "mezcla confusa" en lugar de estados claros y distinguibles entre sí.',
    examples: [
      {
        label: 'Rabia vs. tristeza',
        description:
          'Cuando una relación termina o me rechazan, no sé si lo que siento es furia, dolor o alivio; todo se siente igual de intenso pero indiferenciado.',
      },
      {
        label: 'Ansiedad vs. emoción',
        description:
          'Antes de una presentación o una cita, no distingo si estoy nervioso, emocionado o simplemente con energía acumulada.',
      },
      {
        label: 'Envidia vs. admiración',
        description:
          'Al ver el éxito de alguien cercano, siento algo incómodo pero no sé si es envidia, tristeza propia o alegría genuina por él/ella.',
      },
      {
        label: 'Agobio general',
        description:
          'Uso palabras genéricas como "mal", "raro", "agobiado" o "estresado" porque no encuentro términos más específicos para lo que me pasa.',
      },
    ],
  },
  {
    id: 3,
    section: 'A',
    sectionTitle: 'Identificación de emociones — Reconocimiento tardío',
    dimension: 'identifyingFeelings',
    text: 'A menudo me doy cuenta de lo que sentí después de que pasó el momento, no durante.',
    examples: [
      {
        label: 'Discusiones',
        description:
          'En una pelea respondo automáticamente, pero solo horas o días después identifico que estaba herido, avergonzado o asustado.',
      },
      {
        label: 'Logros',
        description:
          'Gano algo o recibo buenas noticias y mi reacción inmediata es plana; la alegría "real" llega después, o nunca, aunque sé que debería sentirla.',
      },
      {
        label: 'Pérdidas',
        description:
          'Al enterarme de una mala noticia, mi primer instinto es analizarla o actuar, no llorar; el duelo emocional llega tarde o de forma física.',
      },
      {
        label: 'Reflexión retrospectiva',
        description:
          'Alguien me pregunta "¿cómo te sentiste cuando...?" y debo inventar o deducir mi respuesta basándome en lo que "debí" sentir, no en un recuerdo emocional claro.',
      },
    ],
  },
  {
    id: 4,
    section: 'A',
    sectionTitle: 'Identificación de emociones — Vocabulario emocional limitado',
    dimension: 'identifyingFeelings',
    text: 'Otras personas parecen tener un vocabulario emocional más rico y preciso que el mío; a mí me cuesta distinguir matices.',
    examples: [
      {
        label: 'Conversaciones',
        description:
          'Un amigo describe sentirse "melancólico", "anhelante" o "desilusionado" y yo solo tengo categorías amplias como "bien/mal".',
      },
      {
        label: 'Terapia',
        description:
          'Si he ido a terapia, el terapeuta me pide que describa mis emociones y me quedo en blanco o repito lo mismo en cada sesión.',
      },
      {
        label: 'Comparación',
        description:
          'Noto que otros pueden decir "estoy frustrado porque siento que no me valoran" mientras yo solo diría "estoy molesto".',
      },
      {
        label: 'Diarios / emociones',
        description:
          'Si intento llevar un diario de emociones, todas las entradas terminan siendo iguales o describiendo eventos, no sensaciones internas.',
      },
    ],
  },

  // ═══════════ SECCIÓN B: DESCRIPCIÓN Y EXPRESIÓN EMOCIONAL (DDF) ═══════════
  {
    id: 5,
    section: 'B',
    sectionTitle: 'Descripción emocional — Bloqueo al expresar',
    dimension: 'describingFeelings',
    text: 'Me cuesta describir mis sentimientos a otras personas, incluso cuando quiero hacerlo.',
    examples: [
      {
        label: 'Pareja',
        description:
          'Mi pareja me pide que "abra mi corazón" o diga qué siento y me bloqueo; no es que no quiera, es que no sé por dónde empezar.',
      },
      {
        label: 'Amistades',
        description:
          'Cuando un amigo me pregunta en serio "¿cómo estás?", doy respuestas funcionales ("cansado", "ocupado") en lugar de emocionales.',
      },
      {
        label: 'Conflictos emocionales',
        description:
          'Alguien me pide que explique por qué me molestó algo y no puedo articularlo; termino dando razones lógicas en vez de sentimientos.',
      },
      {
        label: 'Escritura',
        description:
          'Me cuesta escribir cartas, mensajes emotivos o poesía personal porque no sé traducir lo interno a palabras.',
      },
    ],
  },
  {
    id: 6,
    section: 'B',
    sectionTitle: 'Descripción emocional — Hechos en lugar de sentimientos',
    dimension: 'describingFeelings',
    text: 'Cuando intento hablar de mis emociones, termino describiendo los hechos o las circunstancias externas, no lo que sentí internamente.',
    examples: [
      {
        label: 'Terapia / amigos',
        description:
          'En lugar de decir "me sentí abandonado", digo "llegó tarde y no avisó"; describo la situación, no la emoción.',
      },
      {
        label: 'Reconfortar a otros',
        description:
          'Cuando alguien me cuenta un problema, soy bueno/a dando soluciones prácticas pero incómodo/a si me piden empatía emocional verbal.',
      },
      {
        label: 'Narrativa personal',
        description:
          'Cuando cuento una historia emotiva de mi vida, suena como un reporte objetivo; otros me dicen "suenas muy frío/a" o "¿y cómo te sentiste?".',
      },
      {
        label: 'Mensajes de apoyo',
        description:
          'Si debo consolar a alguien, ofrezco ayuda práctica ("te llevo comida") antes que palabras de afecto ("te extraño, me duele que sufras").',
      },
    ],
  },
  {
    id: 7,
    section: 'B',
    sectionTitle: 'Descripción emocional — Expresión facial y corporal discordante',
    dimension: 'describingFeelings',
    text: 'Mi expresión facial, tono de voz o lenguaje corporal no siempre refleja lo que otros esperarían de mi estado emocional.',
    examples: [
      {
        label: 'Desconexión',
        description:
          'Estoy contando algo triste pero mi voz es plana, o estoy feliz pero mi rostro no sonríe "a tiempo".',
      },
      {
        label: 'Malentendidos',
        description:
          'Otros me interpretan como "frío/a", "distante" o "enojado/a" cuando internamente no lo estoy; o creen que exagero cuando yo siento que soy neutro/a.',
      },
      {
        label: 'Actuación social',
        description:
          'He aprendido a poner "caras" apropiadas o tonos de voz esperados, pero es un esfuerzo consciente, no automático.',
      },
      {
        label: 'Fotos / videos',
        description:
          'Al verme en fotos o escucharme en audios, noto que mi expresión no coincide con lo que recordaba sentir en ese momento.',
      },
    ],
  },
  {
    id: 8,
    section: 'B',
    sectionTitle: 'Descripción emocional — Más fácil hablar de otros que de uno mismo',
    dimension: 'describingFeelings',
    text: 'Me resulta más fácil hablar sobre las emociones de los demás que sobre las mías propias.',
    examples: [
      {
        label: 'Consejero/a informal',
        description:
          'Soy la persona a la que acuden otros para hablar de sus problemas, pero rara vez comparto los míos.',
      },
      {
        label: 'Terapia',
        description:
          'Puedo teorizar horas sobre la psicología de mi familia o pareja, pero cuando el foco vuelve a mí, me quedo sin palabras.',
      },
      {
        label: 'Distancia emocional',
        description:
          'Puedo analizar con claridad una situación emotiva si no me involucra directamente; cuando me involucra, el análisis se nubla.',
      },
      {
        label: 'Protección',
        description:
          'Siento que hablar de mis emociones las haría "reales" o inmanejables, así que prefiero mantenerlas sin nombrar.',
      },
    ],
  },

  // ═══════════ SECCIÓN C: PENSAMIENTO ORIENTADO EXTERNAMENTE (EOT) ═══════════
  {
    id: 9,
    section: 'C',
    sectionTitle: 'Pensamiento externo — Hechos sobre significado emocional',
    dimension: 'externallyOriented',
    text: 'Tiendo a enfocarme en los hechos, detalles prácticos y soluciones concretas más que en el significado emocional de las situaciones.',
    examples: [
      {
        label: 'Películas / libros',
        description:
          'Recuerdo la trama, los diálogos exactos o los detalles técnicos de una película, pero no el "mensaje emocional" o la moraleja.',
      },
      {
        label: 'Conversaciones emotivas',
        description:
          'Cuando alguien ventila un problema, mi primer instinto es buscar una solución práctica en lugar de escuchar el sentimiento.',
      },
      {
        label: 'Recuerdos',
        description:
          'Mis memorias son visuales o factuales (qué pasó, quién estaba, qué hora era) más que emocionales (cómo me sentía, qué significaba para mí).',
      },
      {
        label: 'Arte / música',
        description:
          'Disfruto la técnica, la estructura o la letra literal de una canción, pero las metáforas emocionales profundas a veces me pasan desapercibidas.',
      },
    ],
  },
  {
    id: 10,
    section: 'C',
    sectionTitle: 'Pensamiento externo — Dificultad para imaginar escenarios emocionales',
    dimension: 'externallyOriented',
    text: 'Me cuesta imaginar escenarios futuros emocionales o fantasear con situaciones que no son realistas.',
    examples: [
      {
        label: 'Futuro',
        description:
          'Si pienso en el futuro, imagino eventos concretos (dónde viviré, qué trabajaré) pero no cómo me sentiré en esas situaciones.',
      },
      {
        label: 'Fantasía',
        description:
          'No tengo una vida fantasiosa rica; rara vez me pierdo en ensoñaciones elaboradas sobre situaciones imposibles o románticas.',
      },
      {
        label: 'Empatía proyectiva',
        description:
          'Me cuesta imaginar "cómo me sentiría yo si me pasara eso" cuando veo una situación ajena; evalúo los hechos, no simulo la emoción.',
      },
      {
        label: 'Creatividad emocional',
        description:
          'Si me piden escribir una historia desde la perspectiva emocional de un personaje, me cuesta más que describir sus acciones.',
      },
    ],
  },
  {
    id: 11,
    section: 'C',
    sectionTitle: 'Pensamiento externo — Preferencia por temas concretos',
    dimension: 'externallyOriented',
    text: 'Prefiero hablar de temas concretos, actividades o ideas objetivas antes que de relaciones, sentimientos o introspección.',
    examples: [
      {
        label: 'Conversaciones',
        description:
          'En una cena, prefiero hablar de política, tecnología, hobbies o noticias antes que de "cómo va nuestra amistad" o "qué significa la vida".',
      },
      {
        label: 'Intimidad',
        description:
          'La intimidad emocional me incomoda más que la física; prefiero compartir actividades con alguien a tener conversaciones profundas sobre nosotros.',
      },
      {
        label: 'Terapia / crecimiento personal',
        description:
          'Me resultan incómodos o poco útiles los ejercicios de "conectar con tu niño interior" o visualizaciones emocionales.',
      },
      {
        label: 'Redes sociales',
        description:
          'Si publico algo, es sobre logros, información o humor factual; rara vez sobre estados emocionales personales.',
      },
    ],
  },
  {
    id: 12,
    section: 'C',
    sectionTitle: 'Pensamiento externo — Decisiones por lógica, no por emoción',
    dimension: 'externallyOriented',
    text: 'Las decisiones las tomo basándome principalmente en lógica, eficiencia o consecuencias prácticas, no en "lo que mi corazón me dice".',
    examples: [
      {
        label: 'Carrera / relaciones',
        description:
          'Elijo una carrera o pareja por compatibilidad práctica, estabilidad o conveniencia, aunque no sienta una "conexión emocional" clara.',
      },
      {
        label: 'Regalos',
        description:
          'Compro regalos basándome en lo que la persona necesita o le será útil, no en lo que "siento" que le haría ilusión.',
      },
      {
        label: 'Despedidas',
        description:
          'No suelo tener problemas para dejar atrás lugares, trabajos o incluso personas si la lógica indica que es lo correcto; la nostalgia es leve o tardía.',
      },
      {
        label: 'Instinto vs. análisis',
        description:
          'Desconfío de las decisiones basadas en "corazonadas" o intuición emocional; necesito listas de pros y contras.',
      },
    ],
  },

  // ═══════════ SECCIÓN D: CONFUSIÓN EMOCIONES-SENSACIONES FÍSICAS (INTEROCEPCIÓN) ═══════════
  {
    id: 13,
    section: 'D',
    sectionTitle: 'Interocepción — Confusión emoción vs. sensación física',
    dimension: 'somaticConfusion',
    text: 'A menudo no sé si lo que siento es una emoción o una sensación física (hambre, cansancio, dolor, tensión).',
    examples: [
      {
        label: 'Hambre vs. ansiedad',
        description:
          'Siento un vacío o inquietud en el estómago y no sé si necesito comer o si estoy nervioso/a.',
      },
      {
        label: 'Cansancio vs. tristeza',
        description:
          'Me siento "pesado/a" y no distingo si es porque dormí mal o porque estoy deprimido/a.',
      },
      {
        label: 'Dolor vs. rabia',
        description:
          'Tengo tensión en el pecho o mandíbula y solo después noto que estaba conteniendo enojo.',
      },
      {
        label: 'Enfermedad vs. emoción',
        description:
          'Cuando me "baja la presión" o siento mareo, a veces resulta ser una emoción intensa que no había identificado.',
      },
    ],
  },
  {
    id: 14,
    section: 'D',
    sectionTitle: 'Interocepción — Síntomas físicos antes que reconocimiento mental',
    dimension: 'somaticConfusion',
    text: 'Mis emociones tienden a manifestarse primero como síntomas físicos antes de que yo las reconozca mentalmente.',
    examples: [
      {
        label: 'Estrés no identificado',
        description:
          'Llevo semanas con dolor de cabeza, contracturas o insomnio antes de darme cuenta de que estoy bajo presión emocional.',
      },
      {
        label: 'Gastrointestinal',
        description:
          'Tengo malestares estomacales, náuseas o cambios en el apetito que no tienen causa médica clara, correlacionados con situaciones emocionales no procesadas.',
      },
      {
        label: 'Explosiones físicas',
        description:
          'De repente me tiembla la mano, me sofoco o siento un nudo en la garganta sin saber por qué; horas después conecto el evento emocional desencadenante.',
      },
      {
        label: 'Agotamiento',
        description:
          'Me siento "quemado/a" físicamente sin haber hecho ejercicio, y solo después identifico que era agotamiento emocional.',
      },
    ],
  },
  {
    id: 15,
    section: 'D',
    sectionTitle: 'Interocepción — Atribución a causas físicas primero',
    dimension: 'somaticConfusion',
    text: 'Cuando estoy alterado/a, mi primera reacción es buscar una causa física (medicina, descanso, comida) antes que emocional.',
    examples: [
      {
        label: 'Malestar general',
        description:
          'Me siento "raro/a" y tomo un analgésico, café o una siesta antes de preguntarme si algo me preocupa o molesta.',
      },
      {
        label: 'Irritabilidad',
        description:
          'Estoy irritable y pienso "debe ser que no desayuné" o "es el calor", sin considerar que alguien me hirió hace horas.',
      },
      {
        label: 'Tristeza',
        description:
          'Me siento decaído/a y busco explicaciones hormonales, climáticas o de sueño antes que reconocer una pérdida o decepción reciente.',
      },
      {
        label: 'Terapia / médico',
        description:
          'Voy al médico por dolores físicos recurrentes y los estudios salen normales; nadie me pregunta por el estrés emocional.',
      },
    ],
  },
  {
    id: 16,
    section: 'D',
    sectionTitle: 'Interocepción — Contagio somático de emociones ajenas',
    dimension: 'somaticConfusion',
    text: 'Las emociones de otras personas me afectan físicamente antes de que yo las identifique como emociones ajenas.',
    examples: [
      {
        label: 'Contagio físico',
        description:
          'Entro a una habitación donde hubo una discusión y siento náuseas o tensión en el pecho antes de saber que discutieron.',
      },
      {
        label: 'Empatía somática',
        description:
          'Cuando alguien cercano está enfermo o angustiado, desarrollo los mismos síntomas físicos que él/ella describe, sin estar enfermo/a yo.',
      },
      {
        label: 'Confusión de origen',
        description:
          'Me siento ansioso/a y no sé si es mío o si "absorbí" el estado de mi pareja, hijo/a o compañero de trabajo.',
      },
      {
        label: 'Límites difusos',
        description:
          'Necesito alejarme físicamente de personas muy emotivas porque su estado me altera el cuerpo de formas que no logro procesar mentalmente.',
      },
    ],
  },
];

export const LIKERT_OPTIONS = ['Nunca', 'Raramente', 'A veces', 'Frecuentemente', 'Casi siempre'];

export const ALEXITHYMIA_SECTIONS = [
  { id: 'A', title: 'Identificación de emociones', range: [0, 3] },
  { id: 'B', title: 'Descripción y expresión emocional', range: [4, 7] },
  { id: 'C', title: 'Pensamiento orientado externamente', range: [8, 11] },
  { id: 'D', title: 'Confusión entre emociones y sensaciones físicas', range: [12, 15] },
];

export default alexithymiaQuestions;
