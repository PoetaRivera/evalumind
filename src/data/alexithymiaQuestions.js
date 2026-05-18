// ═══════════════════════════════════════════════════════
// TAS-20 — Toronto Alexithymia Scale (20 ítems)
// Bagby, Parker & Taylor (1994), J Psychosom Res, 38(1)
// DOI: 10.1016/0022-3999(94)90005-1
// DOI: 10.1016/0022-3999(94)90006-X
// Validación española (México):
// Moral de la Rubia, J. (2008). Rev Electrónica Psicología
// Iztacala, 11(2), 97-110.
//
// 3 subescalas: DIF (7 ítems), DDF (5 ítems), EOT (8 ítems)
// 5 ítems inversos: 4, 5, 10, 18, 19
// Likert 1-5: Totalmente en desacuerdo → Totalmente de acuerdo
// Puntos de corte: ≤51 sin alexitimia, 52-60 posible, ≥61 presente
// ═══════════════════════════════════════════════════════

const LIKERT_OPTIONS = [
  'Totalmente en desacuerdo',
  'En desacuerdo',
  'Neutral',
  'De acuerdo',
  'Totalmente de acuerdo',
];

const alexithymiaQuestions = [
  // ═══════════ SECCIÓN A — DIF: Identificación de sentimientos (7 ítems) ═══════════

  {
    id: 1,
    section: 'A',
    sectionTitle: 'Identificación de sentimientos (DIF)',
    dimension: 'identifyingFeelings',
    text: 'A menudo estoy confundido/a acerca de qué emoción estoy sintiendo.',
    examples: [
      { label: 'Confusión emocional', description: 'Sientes algo intenso pero no sabes si es tristeza, rabia o miedo.' },
      { label: 'Situaciones sociales', description: 'Después de una discusión no logras identificar qué emoción predominaba en ti.' },
      { label: 'Cambios de ánimo', description: 'Pasas de un estado a otro sin entender qué provocó el cambio.' },
      { label: 'Consultas médicas', description: 'Cuando un profesional te pregunta cómo te sientes, no encuentras una respuesta clara.' },
    ],
  },

  {
    id: 3,
    section: 'A',
    sectionTitle: 'Identificación de sentimientos (DIF)',
    dimension: 'identifyingFeelings',
    text: 'Tengo sensaciones físicas que incluso los médicos no entienden.',
    examples: [
      { label: 'Síntomas inexplicables', description: 'Dolores, molestias o tensiones que los exámenes médicos no logran explicar.' },
      { label: 'Somatización', description: 'Tu cuerpo reacciona con malestar físico ante situaciones que otros considerarían solo emocionales.' },
      { label: 'Consultas repetidas', description: 'Has visitado varios especialistas sin obtener un diagnóstico claro.' },
      { label: 'Palpitaciones', description: 'Sientes taquicardia o presión en el pecho sin una causa física aparente.' },
    ],
  },

  {
    id: 6,
    section: 'A',
    sectionTitle: 'Identificación de sentimientos (DIF)',
    dimension: 'identifyingFeelings',
    text: 'Cuando estoy mal no sé si estoy triste, asustado/a o enfadado/a.',
    examples: [
      { label: 'Malestar difuso', description: 'Sientes un nudo en el estómago pero no sabes si es ansiedad, tristeza o enojo.' },
      { label: 'Llanto sin motivo', description: 'Lloras sin entender exactamente por qué.' },
      { label: 'Reacciones desproporcionadas', description: 'Explotas por algo pequeño y luego te das cuenta de que venías arrastrando otra emoción.' },
      { label: 'Agotamiento emocional', description: 'Te sientes agotado/a pero no identificas de dónde viene el cansancio.' },
    ],
  },

  {
    id: 7,
    section: 'A',
    sectionTitle: 'Identificación de sentimientos (DIF)',
    dimension: 'identifyingFeelings',
    text: 'A menudo estoy desconcertado/a por sensaciones en mi cuerpo.',
    examples: [
      { label: 'Sensaciones vagas', description: 'Sientes algo en el cuerpo pero no puedes describir qué es exactamente.' },
      { label: 'Desconexión corporal', description: 'Te cuesta saber si una sensación física es hambre, sueño, nervios o algo más.' },
      { label: 'Hipersensibilidad', description: 'Notas cambios corporales sutiles que te inquietan pero no sabes interpretar.' },
      { label: 'Post-ejercicio', description: 'Después de hacer actividad física no distingues entre cansancio normal y malestar.' },
    ],
  },

  {
    id: 9,
    section: 'A',
    sectionTitle: 'Identificación de sentimientos (DIF)',
    dimension: 'identifyingFeelings',
    text: 'Tengo sentimientos que no puedo identificar realmente.',
    examples: [
      { label: 'Nombres esquivos', description: 'Sabes que sientes algo pero ninguna palabra (tristeza, rabia, miedo) te encaja del todo.' },
      { label: 'Emociones mezcladas', description: 'Sientes varias cosas a la vez y no logras separarlas.' },
      { label: 'Después de eventos', description: 'Tras una situación importante necesitas horas o días para entender qué sentiste.' },
      { label: 'Conversaciones', description: 'Cuando alguien te pregunta "¿cómo te sientes?", respondes con hechos en lugar de emociones.' },
    ],
  },

  {
    id: 13,
    section: 'A',
    sectionTitle: 'Identificación de sentimientos (DIF)',
    dimension: 'identifyingFeelings',
    text: 'No sé qué está pasando dentro de mí.',
    examples: [
      { label: 'Desconexión interna', description: 'Te sientes desconectado/a de tu mundo interior, como si no tuvieras acceso a lo que sientes.' },
      { label: 'Reacciones ajenas', description: 'Otros notan que estás mal antes de que tú mismo/a te des cuenta.' },
      { label: 'Diario emocional', description: 'Intentar escribir cómo te sientes te resulta imposible porque no encuentras el contenido.' },
      { label: 'Terapia', description: 'En consulta psicológica te preguntan "¿qué sientes ahora?" y tu mente se queda en blanco.' },
    ],
  },

  {
    id: 14,
    section: 'A',
    sectionTitle: 'Identificación de sentimientos (DIF)',
    dimension: 'identifyingFeelings',
    text: 'A menudo no sé por qué estoy enfadado/a.',
    examples: [
      { label: 'Irritabilidad inexplicada', description: 'Estás de mal humor pero no puedes identificar qué lo provocó.' },
      { label: 'Explosiones tardías', description: 'Algo te molestó hace horas pero solo lo notas cuando explotas por otra cosa.' },
      { label: 'Acumulación', description: 'Pequeñas frustraciones se acumulan sin que las registres hasta que desbordan.' },
      { label: 'Confusión post-enfado', description: 'Después de calmarte no logras reconstruir por qué te enojaste tanto.' },
    ],
  },

  // ═══════════ SECCIÓN B — DDF: Descripción de sentimientos (5 ítems) ═══════════

  {
    id: 2,
    section: 'B',
    sectionTitle: 'Descripción de sentimientos (DDF)',
    dimension: 'describingFeelings',
    text: 'Me es difícil encontrar las palabras adecuadas para expresar lo que siento.',
    examples: [
      { label: 'Conversaciones íntimas', description: 'Cuando tu pareja o un amigo cercano te pregunta qué te pasa, no encuentras cómo explicarlo.' },
      { label: 'Escritura', description: 'Intentar escribir una carta o mensaje emocional te toma muchísimo tiempo.' },
      { label: 'Vocabulario limitado', description: 'Solo usas palabras como "bien", "mal", "raro" o "normal" para describir tu estado.' },
      { label: 'Silencio', description: 'Prefieres callar antes que intentar expresar algo que no sabes cómo poner en palabras.' },
    ],
  },

  {
    id: 4,
    section: 'B',
    sectionTitle: 'Descripción de sentimientos (DDF)',
    dimension: 'describingFeelings',
    reverse: true,
    text: 'Puedo expresar fácilmente lo que siento.',
    examples: [
      { label: 'Fluidez emocional', description: 'Cuando alguien te pregunta cómo estás, describes tus emociones con claridad y sin esfuerzo.' },
      { label: 'Vocabulario rico', description: 'Usas matices: no solo dices "estoy mal" sino "estoy frustrado/a pero también algo aliviado/a".' },
      { label: 'Conversaciones difíciles', description: 'En situaciones tensas logras comunicar tu estado interno sin bloquearte.' },
      { label: 'Conexión', description: 'Expresar lo que sientes te ayuda a sentirte más cerca de los demás.' },
    ],
  },

  {
    id: 11,
    section: 'B',
    sectionTitle: 'Descripción de sentimientos (DDF)',
    dimension: 'describingFeelings',
    text: 'Me es difícil explicar a otros lo que siento aunque yo lo entienda.',
    examples: [
      { label: 'Traducción interna', description: 'Internamente sabes lo que te pasa, pero no encuentras las palabras para comunicarlo.' },
      { label: 'Frustración', description: 'Te frustra que otros no entiendan lo que intentas decir sobre tu estado emocional.' },
      { label: 'Metáforas', description: 'Recurres a imágenes o comparaciones ("es como si...") porque no encuentras la palabra exacta.' },
      { label: 'Conversaciones', description: 'Evitas hablar de temas emocionales porque anticipas que no sabrás explicarte.' },
    ],
  },

  {
    id: 12,
    section: 'B',
    sectionTitle: 'Descripción de sentimientos (DDF)',
    dimension: 'describingFeelings',
    text: 'A menudo otras personas me dicen que hable más de lo que siento.',
    examples: [
      { label: 'Comentarios frecuentes', description: 'Tu pareja, amigos o familiares te piden que compartas más tu mundo interior.' },
      { label: 'Feedback laboral', description: 'En el trabajo te han sugerido que expreses más cómo te afectan las cosas.' },
      { label: 'Terapia', description: 'Un profesional te ha señalado que te cuesta poner en palabras tu experiencia emocional.' },
      { label: 'Percepción ajena', description: 'Los demás te ven como alguien distante o cerrado/a aunque tú no te percibas así.' },
    ],
  },

  {
    id: 17,
    section: 'B',
    sectionTitle: 'Descripción de sentimientos (DDF)',
    dimension: 'describingFeelings',
    text: 'Me resulta difícil revelar mis sentimientos más íntimos incluso a amigos cercanos.',
    examples: [
      { label: 'Amistades', description: 'Tienes amigos de años que no conocen aspectos importantes de tu vida emocional.' },
      { label: 'Pareja', description: 'Con tu pareja evitas conversaciones sobre lo que realmente sientes en la relación.' },
      { label: 'Vulnerabilidad', description: 'Mostrar tus emociones te hace sentir expuesto/a o inseguro/a.' },
      { label: 'Secretos emocionales', description: 'Hay cosas que sientes y que nunca le has contado a nadie.' },
    ],
  },

  // ═══════════ SECCIÓN C — EOT: Pensamiento orientado externamente (8 ítems) ═══════════

  {
    id: 5,
    section: 'C',
    sectionTitle: 'Pensamiento orientado externamente (EOT)',
    dimension: 'externallyOriented',
    reverse: true,
    text: 'Prefiero analizar los problemas en lugar de simplemente describirlos.',
    examples: [
      { label: 'Enfoque analítico', description: 'Cuando algo te preocupa, prefieres desglosar causas y soluciones antes que hablar de cómo te hace sentir.' },
      { label: 'Trabajo', description: 'En reuniones laborales te centras en datos y hechos, no en cómo afectan las decisiones al equipo.' },
      { label: 'Discusiones', description: 'En un conflicto buscas entender la lógica de lo que pasó más que expresar cómo te afectó.' },
      { label: 'Toma de decisiones', description: 'Tus decisiones importantes se basan en pros y contras racionales, no en lo que sientes.' },
    ],
  },

  {
    id: 8,
    section: 'C',
    sectionTitle: 'Pensamiento orientado externamente (EOT)',
    dimension: 'externallyOriented',
    text: 'Prefiero dejar que las cosas pasen sin preguntarme por qué.',
    examples: [
      { label: 'Eventos vitales', description: 'Ante cambios importantes en tu vida, no te detienes a reflexionar sobre su significado.' },
      { label: 'Evitación', description: 'Evitas hacerte preguntas profundas sobre por qué actúas como actúas.' },
      { label: 'Superficialidad', description: 'Prefieres mantener las conversaciones en temas prácticos y cotidianos.' },
      { label: 'Introspección', description: 'Dedicar tiempo a pensar en tus motivaciones te parece innecesario o incómodo.' },
    ],
  },

  {
    id: 10,
    section: 'C',
    sectionTitle: 'Pensamiento orientado externamente (EOT)',
    dimension: 'externallyOriented',
    reverse: true,
    text: 'Estar en contacto con las emociones es esencial.',
    examples: [
      { label: 'Valor emocional', description: 'Crees que entender lo que sientes es clave para tomar buenas decisiones.' },
      { label: 'Relaciones', description: 'Consideras que la conexión emocional es lo más importante en una relación.' },
      { label: 'Bienestar', description: 'Para ti el bienestar pasa por estar en sintonía con tu mundo interior.' },
      { label: 'Crecimiento personal', description: 'Dedicas tiempo a explorar y comprender tus emociones como parte de tu desarrollo.' },
    ],
  },

  {
    id: 15,
    section: 'C',
    sectionTitle: 'Pensamiento orientado externamente (EOT)',
    dimension: 'externallyOriented',
    text: 'Prefiero hablar con otros de sus actividades diarias más que de sus sentimientos.',
    examples: [
      { label: 'Conversaciones', description: 'Te interesa más saber qué hizo alguien el fin de semana que cómo se sintió al respecto.' },
      { label: 'Amistades', description: 'Tus charlas con amigos giran en torno a hechos, trabajo, hobbies, no a emociones.' },
      { label: 'Incomodidad', description: 'Cuando alguien empieza a hablar de sentimientos, intentas cambiar de tema o te sientes incómodo/a.' },
      { label: 'Preferencia', description: 'Encuentras más valor en compartir actividades que en compartir confidencias emocionales.' },
    ],
  },

  {
    id: 16,
    section: 'C',
    sectionTitle: 'Pensamiento orientado externamente (EOT)',
    dimension: 'externallyOriented',
    text: 'Prefiero ver programas de entretenimiento ligero antes que dramas psicológicos.',
    examples: [
      { label: 'Series y películas', description: 'Eliges comedias, acción o documentales y evitas contenido emocionalmente intenso.' },
      { label: 'Lectura', description: 'Prefieres libros de hechos, historia o técnica antes que novelas centradas en conflictos emocionales.' },
      { label: 'Música', description: 'Escuchas música por el ritmo o la energía, no por la carga emocional de las letras.' },
      { label: 'Arte', description: 'El arte abstracto o simbólico no te genera interés; prefieres lo concreto y evidente.' },
    ],
  },

  {
    id: 18,
    section: 'C',
    sectionTitle: 'Pensamiento orientado externamente (EOT)',
    dimension: 'externallyOriented',
    reverse: true,
    text: 'Puedo sentirme cercano/a a alguien incluso en momentos de silencio.',
    examples: [
      { label: 'Conexión silenciosa', description: 'Disfrutas estar con alguien sin necesidad de hablar, solo sintiendo la presencia mutua.' },
      { label: 'Intimidad', description: 'El silencio compartido con una persona querida te resulta cómodo, no incómodo.' },
      { label: 'Vínculos', description: 'No necesitas palabras para sentir que estás conectado/a emocionalmente con alguien.' },
      { label: 'Momentos', description: 'Valoras los momentos de calma compartida tanto como las conversaciones profundas.' },
    ],
  },

  {
    id: 19,
    section: 'C',
    sectionTitle: 'Pensamiento orientado externamente (EOT)',
    dimension: 'externallyOriented',
    reverse: true,
    text: 'Me ayuda examinar mis sentimientos para resolver problemas personales.',
    examples: [
      { label: 'Autoanálisis', description: 'Cuando tienes un problema, dedicás tiempo a entender qué emociones están involucradas.' },
      { label: 'Decisiones', description: 'Antes de decidir, considerás tanto los aspectos racionales como lo que sentís.' },
      { label: 'Crecimiento', description: 'Creés que entender tus patrones emocionales es útil para mejorar como persona.' },
      { label: 'Resolución', description: 'Has notado que cuando entendés lo que sentís, los problemas se vuelven más manejables.' },
    ],
  },

  {
    id: 20,
    section: 'C',
    sectionTitle: 'Pensamiento orientado externamente (EOT)',
    dimension: 'externallyOriented',
    text: 'Buscar significados ocultos en películas o libros disminuye el placer de disfrutarlos.',
    examples: [
      { label: 'Entretenimiento', description: 'Cuando ves una película, preferís disfrutarla sin analizar simbolismos ni mensajes profundos.' },
      { label: 'Literatura', description: 'Leés para entretenerte, no para interpretar lo que el autor "realmente quiso decir".' },
      { label: 'Conversaciones', description: 'Te molestan las personas que sobre-analizan series o películas buscando significados.' },
      { label: 'Arte', description: 'El arte que requiere interpretación emocional te parece agotador o pretencioso.' },
    ],
  },
];

export const ALEXITHYMIA_SECTIONS = [
  { id: 'A', title: 'Identificación de sentimientos (DIF)', range: [0, 6] },
  { id: 'B', title: 'Descripción de sentimientos (DDF)', range: [7, 11] },
  { id: 'C', title: 'Pensamiento orientado externamente (EOT)', range: [12, 19] },
];

export { LIKERT_OPTIONS };

export default alexithymiaQuestions;
