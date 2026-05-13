const teaQuestions = [
  // ═══════════ SECCIÓN A: COMUNICACIÓN SOCIAL Y RECIPROCIDAD EMOCIONAL (4 ítems) ═══════════
  {
    id: 1,
    section: 'A',
    sectionTitle: 'Comunicación social — Conversación espontánea',
    dimension: 'socialCommunication',
    text: 'Me cuesta iniciar o sostener conversaciones espontáneas ("de paso", small talk) que no tengan un propósito práctico claro.',
    examples: [
      {
        label: 'Elevador / cola / fila',
        description:
          'Alguien hace un comentario sobre el clima o la espera y no sé qué responder; me quedo en silencio o digo algo abrupto.',
      },
      {
        label: 'Eventos sociales',
        description:
          'En una fiesta o reunión, no sé cómo "entrar" a un grupo que está conversando; espero a que alguien me hable a mí.',
      },
      {
        label: 'Trabajo',
        description:
          'Evito la sala de descanso o el área de café porque no sé qué decirle a los compañeros fuera de temas laborales.',
      },
      {
        label: 'Mensajes informales',
        description:
          'Me cuesta enviar mensajes "solo para saludar" sin un motivo específico; siento que estoy molestando.',
      },
    ],
  },
  {
    id: 2,
    section: 'A',
    sectionTitle: 'Comunicación social — Ironía y dobles sentidos',
    dimension: 'socialCommunication',
    text: 'Tengo dificultad para interpretar, en tiempo real, si alguien habla en broma, con ironía o con dobles sentidos.',
    examples: [
      {
        label: 'Conversaciones grupales',
        description:
          'Ríen todos y yo no entiendo por qué; caigo en la cuenta minutos u horas después.',
      },
      {
        label: 'Trabajo',
        description:
          'Un comentario de mi jefe o compañero me parece literal y actúo en consecuencia; después descubro que era sarcástico o una indirecta.',
      },
      {
        label: 'Relaciones de pareja',
        description:
          'Mi pareja dice algo con un tono que no sé si es molestia o broma; necesito que me lo diga explícitamente.',
      },
      {
        label: 'Redes sociales',
        description:
          'No distingo si un comentario es agresivo o humorístico hasta que alguien me lo explica.',
      },
    ],
  },
  {
    id: 3,
    section: 'A',
    sectionTitle: 'Comunicación social — Monólogos sobre intereses',
    dimension: 'socialCommunication',
    text: 'En conversaciones, tiendo a hablar extensamente sobre temas que me apasionan sin notar si el otro se aburre o quiere cambiar de tema.',
    examples: [
      {
        label: 'Conversaciones uno a uno',
        description:
          'Una vez que entro en un tema de mi interés, hablo sin pausas; después me doy cuenta de que la otra persona no decía nada.',
      },
      {
        label: 'Señales sociales',
        description:
          'No noto cuando alguien mira el reloj, se aleja corporalmente o da respuestas cortas como señal de cierre.',
      },
      {
        label: 'Pareja / amistades',
        description:
          'Mi pareja o amigos me han dicho que "me enrollo" o que hablo demasiado de un solo tema.',
      },
      {
        label: 'Trabajo',
        description:
          'En reuniones, doy demasiado contexto o detalle técnico cuando una respuesta breve bastaría.',
      },
    ],
  },
  {
    id: 4,
    section: 'A',
    sectionTitle: 'Comunicación social — Reciprocidad emocional',
    dimension: 'socialCommunication',
    text: 'Me cuesta "devolver" emocionalmente en una conversación: celebrar la alegría del otro, compadecerme rápidamente o mostrar la reacción esperada.',
    examples: [
      {
        label: 'Celebraciones',
        description:
          'Alguien me cuenta una buena noticia y no sé qué expresión poner; mi reacción puede parecer fría o tardía aunque internamente me alegre.',
      },
      {
        label: 'Consuelo',
        description:
          'Cuando alguien llora o está mal, me bloqueo; no sé qué decir ni qué tono usar, aunque sienta empatía internamente.',
      },
      {
        label: 'Reacciones esperadas',
        description:
          'En funerales o situaciones tristes, me concentro más en "qué debo hacer o sentir" que en procesar la emoción.',
      },
      {
        label: 'Mensajes de apoyo',
        description:
          'Me cuesta escribir mensajes de condolencia o ánimo porque no sé qué frases son socialmente adecuadas.',
      },
    ],
  },

  // ═══════════ SECCIÓN B: RELACIONES INTERPERSONALES Y DINÁMICA SOCIAL (4 ítems) ═══════════
  {
    id: 5,
    section: 'B',
    sectionTitle: 'Relaciones — Mantener amistades fuera del contexto original',
    dimension: 'relationships',
    text: 'Tengo dificultad para mantener amistades más allá del contexto donde se originaron (trabajo, escuela, vecindario).',
    examples: [
      {
        label: 'Cambio de contexto',
        description:
          'Era cercano con compañeros de trabajo o clase, pero al cambiar de entorno la amistad se desvanece porque no sé cómo mantenerla fuera de ese contexto.',
      },
      {
        label: 'Iniciativa',
        description:
          'Rara vez soy yo quien propone quedar; si el otro no insiste, la relación se pierde por inercia.',
      },
      {
        label: 'Profundidad',
        description:
          'Tengo muchos conocidos pero muy pocas personas a quienes llamaría en una crisis; no sé cómo pasar de lo superficial a lo íntimo.',
      },
      {
        label: 'Grupos',
        description:
          'Me siento "satélite" en grupos de amigos, no parte del núcleo; a menudo me entero de planes después o me siento excluido por omisión.',
      },
    ],
  },
  {
    id: 6,
    section: 'B',
    sectionTitle: 'Relaciones — "Actuar" un personaje social',
    dimension: 'relationships',
    text: 'En situaciones sociales siento que estoy "actuando" un personaje; al llegar a casa necesito tiempo de recuperación.',
    examples: [
      {
        label: 'Esfuerzo social',
        description:
          'En reuniones, fiestas o videollamadas de trabajo, estoy constantemente calculando qué decir, cómo mirar, cuándo reír; es agotador.',
      },
      {
        label: 'Recuperación',
        description:
          'Después de un evento social, necesito horas o días de soledad para "volver a ser yo"; puedo sentir irritabilidad o agotamiento.',
      },
      {
        label: 'Personajes',
        description:
          'Tengo distintas versiones de mí para distintos contextos (trabajo, familia, pareja) y me cuesta saber cuál es la real.',
      },
      {
        label: 'Costo energético',
        description:
          'Aunque disfrute momentos puntuales, el costo energético de lo social es desproporcionadamente alto.',
      },
    ],
  },
  {
    id: 7,
    section: 'B',
    sectionTitle: 'Relaciones — Dinámicas grupales implícitas',
    dimension: 'relationships',
    text: 'Me cuesta entender las dinámicas implícitas de grupos: jerarquías, alianzas, chismes, lenguaje corporal grupal o "política" social.',
    examples: [
      {
        label: 'Trabajo',
        description:
          'No noto cuando hay tensiones entre compañeros hasta que explotan; me entero de conflictos cuando ya es tarde.',
      },
      {
        label: 'Grupos de amigos',
        description:
          'No entiendo por qué dos personas que se llevan mal actúan como si todo estuviera bien; me confunden las alianzas cambiantes.',
      },
      {
        label: 'Indirectas',
        description:
          'Me piden algo "entre líneas" y no lo capté; luego me dicen que debería haber sabido sin que me lo dijeran.',
      },
      {
        label: 'Humor grupal',
        description:
          'El humor interno de un grupo me parece excluyente o agresivo y no sé si debo reír o defender a alguien.',
      },
    ],
  },
  {
    id: 8,
    section: 'B',
    sectionTitle: 'Relaciones — Preferencia por interacciones estructuradas',
    dimension: 'relationships',
    text: 'Prefiero marcadamente las interacciones uno a uno, por escrito, o con un propósito definido, sobre las grupales o espontáneas.',
    examples: [
      {
        label: 'Grupales',
        description:
          'Las cenas con más de tres personas me abruman porque no puedo seguir todos los hilos conversacionales simultáneos.',
      },
      {
        label: 'Escritura',
        description:
          'Prefiero resolver algo por chat o correo que por llamada; las llamadas sin agenda me generan ansiedad.',
      },
      {
        label: 'Uno a uno',
        description:
          'En una conversación individual puedo conectar bien, pero en grupo me silencio o me pierdo.',
      },
      {
        label: 'Agenda clara',
        description:
          'Una reunión con objetivos escritos me resulta cómoda; una "reunión para charlar" me resulta tortura.',
      },
    ],
  },

  // ═══════════ SECCIÓN C: RUTINAS, FLEXIBILIDAD Y COMPORTAMIENTOS REPETITIVOS (4 ítems) ═══════════
  {
    id: 9,
    section: 'C',
    sectionTitle: 'Rutinas — Malestar por interrupción de planes',
    dimension: 'routinesFlexibility',
    text: 'Siento malestar significativo (ansiedad, irritabilidad o bloqueo) cuando se interrumpe una rutina, plan o secuencia que tenía prevista.',
    examples: [
      {
        label: 'Planes cambiados',
        description:
          'Alguien cancela o cambia de último momento un plan que ya había procesado mentalmente; me cuesta adaptarme y puedo parecer exagerado.',
      },
      {
        label: 'Interrupciones',
        description:
          'Estoy haciendo una secuencia (ducha, café, rutina de trabajo) y si alguien interrumpe, debo "reiniciar" mentalmente o me frustro.',
      },
      {
        label: 'Trabajo',
        description:
          'Un compañero pide algo urgente que rompe mi flujo planeado y me cuesta volver a la tarea original.',
      },
      {
        label: 'Doméstico',
        description:
          'Si alguien mueve un objeto de su lugar o cambia el orden de mi espacio, siento incomodidad física hasta que lo restauro.',
      },
    ],
  },
  {
    id: 10,
    section: 'C',
    sectionTitle: 'Rutinas — Necesidad de anticipación y estructura',
    dimension: 'routinesFlexibility',
    text: 'Necesito planificar con anticipación; las situaciones imprevistas o la falta de estructura me generan angustia.',
    examples: [
      {
        label: 'Imprevistos',
        description:
          'Un "vamos a ver qué pasa" o "salgamos sin plan" me produce ansiedad; necesito saber horarios, lugar, quién irá, duración.',
      },
      {
        label: 'Viajes',
        description:
          'Prefiero itinerarios definidos; el "ir descubriendo" me estresa más de lo que me divierte.',
      },
      {
        label: 'Trabajo',
        description:
          'Me va mejor con tareas claras y plazos definidos que con "gestiónate tú mismo" o proyectos ambiguos.',
      },
      {
        label: 'Fines de semana',
        description:
          'Necesito saber qué haré el sábado; un fin de semana sin plan me hace sentir perdido o ansioso.',
      },
    ],
  },
  {
    id: 11,
    section: 'C',
    sectionTitle: 'Rutinas — Movimientos o patrones repetitivos',
    dimension: 'routinesFlexibility',
    text: 'Cuando estoy solo, relajado o bajo estrés, repito movimientos, sonidos o patrones que me calman o me ayudan a regularme.',
    examples: [
      {
        label: 'Corporales',
        description:
          'Mecerme, tamborilear dedos, girar objetos, tocar repetidamente una textura, tensar y destensar músculos.',
      },
      {
        label: 'Vocales',
        description:
          'Tararear la misma melodía, repetir frases en voz baja, hacer sonidos con la boca cuando nadie escucha.',
      },
      {
        label: 'Objetos',
        description:
          'Giro un anillo, abro y cierro un bolígrafo, ordeno fichas o monedas de forma repetitiva.',
      },
      {
        label: 'Visual',
        description:
          'Miro fijamente patrones (luces, rejillas, agua) o muevo objetos ante mis ojos de forma rítmica.',
      },
    ],
  },
  {
    id: 12,
    section: 'C',
    sectionTitle: 'Rutinas — Dificultad para cambiar de tarea',
    dimension: 'routinesFlexibility',
    text: 'Me cuesta enormemente cambiar de tarea o hacer "switch" cognitivo cuando estoy concentrado en algo.',
    examples: [
      {
        label: 'Trabajo / estudio',
        description:
          'Estoy en una tarea y alguien me pide otra cosa; me cuesta soltar la primera y arrancar la segunda; necesito un "puente" mental.',
      },
      {
        label: 'Conversaciones',
        description:
          'Estoy hablando de un tema y alguien cambia abruptamente de asunto; me tardo en cambiar de canal.',
      },
      {
        label: 'Interrupciones domésticas',
        description:
          'Estoy leyendo o en un hobby y me piden que atienda algo rápido; me cuesta volver a donde estaba después.',
      },
      {
        label: 'Prioridades cambiantes',
        description:
          'Un día con múltiples tareas fragmentadas me deja exhausto porque cada cambio cuesta energía.',
      },
    ],
  },

  // ═══════════ SECCIÓN D: INTERESES INTENSOS Y SENSIBILIDAD SENSORIAL (4 ítems) ═══════════
  {
    id: 13,
    section: 'D',
    sectionTitle: 'Intereses — Intensidad y absorción',
    dimension: 'sensoryInterests',
    text: 'Tengo intereses o hobbies que son intensos, absorbentes y a los que dedico gran cantidad de tiempo mental o libre.',
    examples: [
      {
        label: 'Profundidad',
        description:
          'Me intereso por un tema (trenes, genealogía, programación, botánica, una saga) y en semanas acumulo más conocimiento que muchos en años.',
      },
      {
        label: 'Monotema',
        description:
          'Puedo hablar horas de ese tema; leo, veo videos o pienso en ello constantemente, a veces descuidando otras áreas.',
      },
      {
        label: 'Colecciones',
        description:
          'Organizo información, objetos o datos de forma sistemática sobre ese interés; me molesta que estén desordenados.',
      },
      {
        label: 'Dificultad para soltar',
        description:
          'Cuando debo hacer otra cosa, mi mente sigue procesando el interés de fondo; es difícil "apagar".',
      },
    ],
  },
  {
    id: 14,
    section: 'D',
    sectionTitle: 'Sensorial — Hipersensibilidad',
    dimension: 'sensoryInterests',
    text: 'Tengo hipersensibilidad a estímulos sensoriales que otros parecen tolerar sin problema (luces, sonidos, texturas, olores, temperatura).',
    examples: [
      {
        label: 'Sonidos',
        description:
          'El chirrido de cubiertos en platos, el zumbido de luces LED, conversaciones simultáneas o el ruido de masticar me resultan físicamente dolorosos.',
      },
      {
        label: 'Táctil',
        description:
          'Etiquetas en ropa, ciertas telas, calcetines con costuras o el tacto de algunos alimentos me causan rechazo físico.',
      },
      {
        label: 'Luz',
        description:
          'Las luces fluorescentes, destellos o la luz del sol sin gafas me causan dolor de cabeza o necesidad de cerrar los ojos.',
      },
      {
        label: 'Olfato',
        description:
          'Percibo olores que otros no notan (perfumes, comidas, productos de limpieza) y me resultan invasivos o nauseabundos.',
      },
    ],
  },
  {
    id: 15,
    section: 'D',
    sectionTitle: 'Sensorial — Sobrecarga multisensorial',
    dimension: 'sensoryInterests',
    text: 'Tengo dificultad para procesar múltiples estímulos sensoriales simultáneos; los entornos "multisensoriales" me abruman.',
    examples: [
      {
        label: 'Centros comerciales / supermercados',
        description:
          'El conjunto de luces, música, anuncios, gente y olores me agota en minutos; necesito salir.',
      },
      {
        label: 'Restaurantes',
        description:
          'El ruido de conversaciones, música, movimiento de meseros y luces me impide disfrutar la comida o la conversación.',
      },
      {
        label: 'Eventos sociales',
        description:
          'Una fiesta con música, luces y mucha gente me causa bloqueo; me refugio en baños o zonas tranquilas.',
      },
      {
        label: 'Trabajo',
        description:
          'Un open office con conversaciones, teléfonos y movimiento constante me impide concentrarme aunque use auriculares.',
      },
    ],
  },
  {
    id: 16,
    section: 'D',
    sectionTitle: 'Sensorial — Búsqueda de estímulos',
    dimension: 'sensoryInterests',
    text: 'Busco activamente estímulos sensoriales intensos o específicos (presión, movimiento, sonidos repetitivos, temperaturas extremas).',
    examples: [
      {
        label: 'Presión',
        description:
          'Me gustan las mantas pesadas, los abrazos fuertes, la presión de ropa ajustada; me calma el "apretón".',
      },
      {
        label: 'Movimiento',
        description:
          'Columpios, hamacas, conducir, caminar rápido o balancearme me regulan emocionalmente.',
      },
      {
        label: 'Sonidos',
        description:
          'Pongo música o ruido blanco muy alto para concentrarme; el silencio me inquieta.',
      },
      {
        label: 'Temperatura',
        description:
          'Duchas muy frías o muy calientes, caminar bajo la lluvia, sentir el viento fuerte en la cara.',
      },
    ],
  },
];

export const LIKERT_OPTIONS = [
  { value: 0, label: 'Nunca' },
  { value: 1, label: 'Raramente' },
  { value: 2, label: 'A veces' },
  { value: 3, label: 'Frecuentemente' },
  { value: 4, label: 'Casi siempre' },
];

export const TEA_SECTIONS = [
  { id: 'A', title: 'Comunicación social y reciprocidad emocional', range: [0, 3] },
  { id: 'B', title: 'Relaciones interpersonales y dinámica social', range: [4, 7] },
  { id: 'C', title: 'Rutinas, flexibilidad y comportamientos repetitivos', range: [8, 11] },
  { id: 'D', title: 'Intereses intensos y sensibilidad sensorial', range: [12, 15] },
];

export default teaQuestions;
