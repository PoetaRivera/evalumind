// ═══════════════════════════════════════════════════════
// HSPS-27 — Highly Sensitive Person Scale (27 ítems)
// Aron, E.N. & Aron, A. (1997). J Pers Soc Psychol, 73(2)
// DOI: 10.1037/0022-3514.73.2.345
//
// 4 dimensiones DOES (Aron, 2010):
// D — Depth of Processing (procesamiento profundo)
// O — Overstimulation (sobrestimulación)
// E — Emotional Reactivity (intensidad emocional)
// S — Sensory Sensitivity (sensibilidad sensorial)
//
// Likert 1-7: Totalmente en desacuerdo → Totalmente de acuerdo
// Punto de corte: percentil 80 (~119/189)
// Prevalencia poblacional estimada: 15-20%
// ═══════════════════════════════════════════════════════

const LIKERT_OPTIONS = [
  'Totalmente en desacuerdo',
  'Bastante en desacuerdo',
  'Algo en desacuerdo',
  'Neutral',
  'Algo de acuerdo',
  'Bastante de acuerdo',
  'Totalmente de acuerdo',
];

const hspQuestions = [
  // ═══ SECCIÓN A — Profundidad de procesamiento (D) — 7 ítems ═══

  {
    id: 1,
    section: 'A',
    sectionTitle: 'Profundidad de procesamiento (D)',
    dimension: 'deepProcessing',
    text: 'Tengo una vida interior rica y compleja.',
    examples: [
      { label: 'Reflexión', description: 'Pasás mucho tiempo pensando, analizando y reflexionando sobre tus experiencias.' },
      { label: 'Sueños', description: 'Tus sueños son vívidos, elaborados y a menudo los recordás con detalle.' },
      { label: 'Mundo interno', description: 'Tu mundo interior es profundo: tenés pensamientos, imágenes e ideas que rara vez compartís.' },
      { label: 'Conexiones', description: 'Con frecuencia encontrás relaciones entre ideas que otros no ven.' },
    ],
  },

  {
    id: 2,
    section: 'A',
    sectionTitle: 'Profundidad de procesamiento (D)',
    dimension: 'deepProcessing',
    text: 'Me conmueven profundamente las artes, la música o la naturaleza.',
    examples: [
      { label: 'Música', description: 'Una canción puede hacerte llorar o ponerte la piel de gallina.' },
      { label: 'Arte', description: 'Una pintura, película o libro te deja pensando por días.' },
      { label: 'Naturaleza', description: 'Un paisaje, un atardecer o el sonido del mar te provocan una emoción intensa.' },
      { label: 'Belleza', description: 'Percibís belleza en detalles cotidianos que otros pasan por alto.' },
    ],
  },

  {
    id: 3,
    section: 'A',
    sectionTitle: 'Profundidad de procesamiento (D)',
    dimension: 'deepProcessing',
    text: 'Proceso la información de manera profunda, notando sutilezas que otros pasan por alto.',
    examples: [
      { label: 'Lectura', description: 'Leés entre líneas y captás matices que otros no registran.' },
      { label: 'Conversaciones', description: 'Recordás detalles de conversaciones que la otra persona ya olvidó.' },
      { label: 'Análisis', description: 'Antes de decidir, considerás múltiples ángulos y consecuencias.' },
      { label: 'Patrones', description: 'Detectás patrones y conexiones sutiles en información dispersa.' },
    ],
  },

  {
    id: 4,
    section: 'A',
    sectionTitle: 'Profundidad de procesamiento (D)',
    dimension: 'deepProcessing',
    text: 'Tiendo a reflexionar mucho antes de actuar o tomar decisiones.',
    examples: [
      { label: 'Decisiones', description: 'Incluso para elecciones cotidianas, evaluás cuidadosamente las opciones.' },
      { label: 'Compras', description: 'Antes de comprar algo investigás, comparás y lo pensás varias veces.' },
      { label: 'Conversaciones', description: 'En una discusión, preferís pensar tu respuesta antes que reaccionar impulsivamente.' },
      { label: 'Cambios', description: 'Los cambios importantes requieren un período largo de reflexión antes de decidirte.' },
    ],
  },

  {
    id: 5,
    section: 'A',
    sectionTitle: 'Profundidad de procesamiento (D)',
    dimension: 'deepProcessing',
    text: 'Me abruma tener que hacer muchas cosas en poco tiempo.',
    examples: [
      { label: 'Plazos', description: 'Los deadlines ajustados te generan ansiedad porque necesitás tiempo para hacer las cosas bien.' },
      { label: 'Multitarea', description: 'Tener que saltar entre varias tareas te agota y te hace sentir que no avanzás en ninguna.' },
      { label: 'Agenda', description: 'Un día con demasiadas actividades programadas te resulta agotador.' },
      { label: 'Presión', description: 'Cuando te apuran, tu rendimiento baja porque necesitás tu ritmo.' },
    ],
  },

  {
    id: 6,
    section: 'A',
    sectionTitle: 'Profundidad de procesamiento (D)',
    dimension: 'deepProcessing',
    text: 'Me tomo muy en serio las responsabilidades y las analizo a fondo.',
    examples: [
      { label: 'Trabajo', description: 'Sos la persona que nota los riesgos y puntos ciegos en un plan.' },
      { label: 'Compromisos', description: 'Antes de comprometerte, evaluás si realmente podés cumplir.' },
      { label: 'Conciencia', description: 'Pensás en las consecuencias de tus acciones más allá de lo inmediato.' },
      { label: 'Ética', description: 'Las decisiones éticas te llevan tiempo porque considerás todos los ángulos.' },
    ],
  },

  {
    id: 7,
    section: 'A',
    sectionTitle: 'Profundidad de procesamiento (D)',
    dimension: 'deepProcessing',
    text: 'Necesito tiempo a solas para procesar mis experiencias.',
    examples: [
      { label: 'Post-evento', description: 'Después de una reunión social o un evento intenso, necesitás tiempo para "digerir" lo vivido.' },
      { label: 'Rutina', description: 'Incorporás momentos de soledad en tu día como una necesidad, no un lujo.' },
      { label: 'Agotamiento', description: 'Sin tiempo para procesar, te sentís mentalmente saturado/a.' },
      { label: 'Creatividad', description: 'Tus mejores ideas surgen cuando estás solo/a y en calma.' },
    ],
  },

  // ═══ SECCIÓN B — Sobrestimulación (O) — 7 ítems ═══

  {
    id: 8,
    section: 'B',
    sectionTitle: 'Sobrestimulación (O)',
    dimension: 'overStimulation',
    text: 'Los estímulos intensos (ruidos fuertes, luces brillantes, olores penetrantes) me resultan abrumadores.',
    examples: [
      { label: 'Sonidos', description: 'Una sirena, un grito o música muy alta te sobresalta y te cuesta recuperar la calma.' },
      { label: 'Luces', description: 'La iluminación fluorescente o muy brillante te cansa la vista rápidamente.' },
      { label: 'Olores', description: 'Perfumes fuertes, productos de limpieza o humo te molestan más que a otros.' },
      { label: 'Entornos', description: 'Los centros comerciales, estaciones de tren o conciertos te resultan agotadores.' },
    ],
  },

  {
    id: 9,
    section: 'B',
    sectionTitle: 'Sobrestimulación (O)',
    dimension: 'overStimulation',
    text: 'Me siento fácilmente abrumado/a en entornos con mucha actividad o bullicio.',
    examples: [
      { label: 'Multitudes', description: 'Un supermercado lleno o una calle concurrida te genera ansiedad o agotamiento.' },
      { label: 'Oficina', description: 'Trabajar en un espacio abierto con muchas personas y ruido te desgasta.' },
      { label: 'Eventos', description: 'Las fiestas, ferias o manifestaciones te sobrecargan sensorialmente.' },
      { label: 'Transporte', description: 'El transporte público en hora punta te deja exhausto/a.' },
    ],
  },

  {
    id: 10,
    section: 'B',
    sectionTitle: 'Sobrestimulación (O)',
    dimension: 'overStimulation',
    text: 'Cuando tengo muchas cosas que hacer, me siento sobrepasado/a.',
    examples: [
      { label: 'Listas', description: 'Una lista larga de tareas te genera más parálisis que acción.' },
      { label: 'Prioridades', description: 'Te cuesta decidir qué hacer primero cuando todo parece urgente.' },
      { label: 'Delegar', description: 'Te cuesta soltar tareas porque sentís que tenés que encargarte de todo.' },
      { label: 'Ritmo', description: 'El ritmo acelerado de la vida moderna te resulta incompatible con tu bienestar.' },
    ],
  },

  {
    id: 11,
    section: 'B',
    sectionTitle: 'Sobrestimulación (O)',
    dimension: 'overStimulation',
    text: 'Me molesta que varias personas me hablen al mismo tiempo.',
    examples: [
      { label: 'Reuniones', description: 'En conversaciones grupales donde varios hablan a la vez, dejás de procesar.' },
      { label: 'Familia', description: 'Las reuniones familiares ruidosas te agotan rápidamente.' },
      { label: 'Trabajo', description: 'Cuando multiple personas te piden cosas simultáneamente, te bloqueás.' },
      { label: 'Filtro', description: 'No podés filtrar una conversación del ruido de fondo como otros parecen hacer.' },
    ],
  },

  {
    id: 12,
    section: 'B',
    sectionTitle: 'Sobrestimulación (O)',
    dimension: 'overStimulation',
    text: 'Necesito retirarme a un lugar tranquilo después de una jornada intensa.',
    examples: [
      { label: 'Trabajo', description: 'Después de un día de muchas reuniones, necesitás silencio absoluto.' },
      { label: 'Social', description: 'Tras un evento social, necesitás varias horas (o días) de calma para recuperarte.' },
      { label: 'Hogar', description: 'Tu casa es tu refugio: la mantenés tranquila y con pocos estímulos.' },
      { label: 'Límites', description: 'Decís que no a planes cuando ya tuviste suficiente estimulación en el día.' },
    ],
  },

  {
    id: 13,
    section: 'B',
    sectionTitle: 'Sobrestimulación (O)',
    dimension: 'overStimulation',
    text: 'Me afecta más que a otros el café, el té u otros estimulantes.',
    examples: [
      { label: 'Cafeína', description: 'Un café por la tarde te impide dormir, cuando a otros no les afecta.' },
      { label: 'Sensibilidad', description: 'Notás efectos con dosis pequeñas que otros ni registran.' },
      { label: 'Nerviosismo', description: 'Los estimulantes te ponen nervioso/a o te aceleran el corazón.' },
      { label: 'Evitación', description: 'Evitás estimulantes porque sabés que tu sistema reacciona fuerte.' },
    ],
  },

  {
    id: 14,
    section: 'B',
    sectionTitle: 'Sobrestimulación (O)',
    dimension: 'overStimulation',
    text: 'Tener hambre me afecta intensamente: me cuesta concentrarme o me pongo irritable.',
    examples: [
      { label: 'Concentración', description: 'Cuando tenés hambre, te resulta imposible enfocarte en nada.' },
      { label: 'Humor', description: 'Tu estado de ánimo cambia drásticamente si pasás muchas horas sin comer.' },
      { label: 'Prevención', description: 'Siempre llevás un snack encima porque sabés cómo te afecta.' },
      { label: 'Intensidad', description: 'La sensación de hambre te resulta más intensa y urgente que a otros.' },
    ],
  },

  // ═══ SECCIÓN C — Intensidad emocional (E) — 7 ítems ═══

  {
    id: 15,
    section: 'C',
    sectionTitle: 'Intensidad emocional (E)',
    dimension: 'emotionalIntensity',
    text: 'Las emociones de los demás me afectan profundamente.',
    examples: [
      { label: 'Empatía', description: 'Cuando alguien cercano está triste, vos también te sentís triste.' },
      { label: 'Noticias', description: 'Las malas noticias o imágenes de sufrimiento te afectan durante horas o días.' },
      { label: 'Ambiente', description: 'Entrás a una habitación y sentís inmediatamente si hay tensión o alegría.' },
      { label: 'Películas', description: 'Llorás o te angustiás fácilmente con escenas emocionales en películas.' },
    ],
  },

  {
    id: 16,
    section: 'C',
    sectionTitle: 'Intensidad emocional (E)',
    dimension: 'emotionalIntensity',
    text: 'Me describen como una persona muy empática o intuitiva.',
    examples: [
      { label: 'Percepción', description: 'Captás cómo se siente alguien incluso antes de que diga una palabra.' },
      { label: 'Confianza', description: 'Otros te buscan para contarte sus problemas porque saben que los entendés.' },
      { label: 'Intuición', description: 'Tenés corazonadas sobre personas o situaciones que luego resultan acertadas.' },
      { label: 'Conexión', description: 'Sentís una conexión profunda incluso con personas que recién conocés.' },
    ],
  },

  {
    id: 17,
    section: 'C',
    sectionTitle: 'Intensidad emocional (E)',
    dimension: 'emotionalIntensity',
    text: 'Mis emociones son intensas: la alegría es euforia y la tristeza es profunda.',
    examples: [
      { label: 'Alegría', description: 'Cuando algo bueno sucede, tu felicidad es desbordante y visible.' },
      { label: 'Tristeza', description: 'Las pérdidas o decepciones te golpean más fuerte que a otros.' },
      { label: 'Música', description: 'Una canción puede cambiarte el estado de ánimo completamente.' },
      { label: 'Variabilidad', description: 'Tus emociones fluctúan con más amplitud que las de la mayoría.' },
    ],
  },

  {
    id: 18,
    section: 'C',
    sectionTitle: 'Intensidad emocional (E)',
    dimension: 'emotionalIntensity',
    text: 'Me sobresalto con facilidad ante ruidos inesperados o movimientos bruscos.',
    examples: [
      { label: 'Sustos', description: 'Un portazo, un grito o alguien que aparece de repente te hace saltar.' },
      { label: 'Recuperación', description: 'Después de un sobresalto, tu corazón sigue acelerado por un buen rato.' },
      { label: 'Anticipación', description: 'En películas de terror o suspenso sufrís más que otros por los sustos.' },
      { label: 'Hipersensibilidad', description: 'Tu sistema nervioso parece estar siempre en alerta.' },
    ],
  },

  {
    id: 19,
    section: 'C',
    sectionTitle: 'Intensidad emocional (E)',
    dimension: 'emotionalIntensity',
    text: 'Me perturban las situaciones de conflicto o tensión entre personas.',
    examples: [
      { label: 'Discusiones', description: 'Presenciar una discusión, aunque no te involucre, te genera malestar físico.' },
      { label: 'Evitación', description: 'Evitás ver programas o leer noticias con contenido violento o conflictivo.' },
      { label: 'Mediación', description: 'A menudo actuás como mediador/a porque te afecta más la tensión que a los implicados.' },
      { label: 'Post-conflicto', description: 'Después de un conflicto, necesitás tiempo para que tu sistema nervioso se calme.' },
    ],
  },

  {
    id: 20,
    section: 'C',
    sectionTitle: 'Intensidad emocional (E)',
    dimension: 'emotionalIntensity',
    text: 'Cuando era niño/a, mis padres o profesores me veían como sensible o tímido/a.',
    examples: [
      { label: 'Infancia', description: 'De pequeño/a llorabas con facilidad o te afectaban mucho los regaños.' },
      { label: 'Escuela', description: 'Los profesores notaban que eras más callado/a o reflexivo/a que otros niños.' },
      { label: 'Etiquetas', description: 'Te llamaban "llorón/a", "delicado/a" o "demasiado sensible".' },
      { label: 'Juegos', description: 'Preferías juegos tranquilos o creativos sobre los bruscos o competitivos.' },
    ],
  },

  {
    id: 21,
    section: 'C',
    sectionTitle: 'Intensidad emocional (E)',
    dimension: 'emotionalIntensity',
    text: 'Siento una fuerte conexión con los animales y su bienestar.',
    examples: [
      { label: 'Mascotas', description: 'Tu vínculo con tus mascotas es profundo; sentís que te entienden sin palabras.' },
      { label: 'Sufrimiento', description: 'Ver un animal sufriendo te afecta tanto como ver sufrir a una persona.' },
      { label: 'Naturaleza', description: 'Te conmueve ver documentales de naturaleza o animales en libertad.' },
      { label: 'Empatía', description: 'Captás el estado emocional de un animal por su postura o mirada.' },
    ],
  },

  // ═══ SECCIÓN D — Sensibilidad sensorial (S) — 6 ítems ═══

  {
    id: 22,
    section: 'D',
    sectionTitle: 'Sensibilidad sensorial (S)',
    dimension: 'sensorySensitivity',
    text: 'Noto detalles sutiles en el ambiente que otros no perciben.',
    examples: [
      { label: 'Cambios', description: 'Notás cuando alguien cambió algo mínimo en una habitación.' },
      { label: 'Sonidos', description: 'Escuchás zumbidos de aparatos eléctricos que otros ignoran.' },
      { label: 'Texturas', description: 'Sos muy consciente de la textura de la ropa, las sábanas o los alimentos.' },
      { label: 'Iluminación', description: 'Te molesta una luz ligeramente parpadeante que nadie más nota.' },
    ],
  },

  {
    id: 23,
    section: 'D',
    sectionTitle: 'Sensibilidad sensorial (S)',
    dimension: 'sensorySensitivity',
    text: 'Me molestan las etiquetas de la ropa, ciertas texturas o las costuras.',
    examples: [
      { label: 'Etiquetas', description: 'Cortás las etiquetas de toda tu ropa porque te irritan la piel.' },
      { label: 'Telas', description: 'Ciertas telas sintéticas o lanas te resultan insoportables al tacto.' },
      { label: 'Calzado', description: 'Sos muy sensible a cómo te calza el zapato; una pequeña molestia te arruina el día.' },
      { label: 'Ropa de cama', description: 'Necesitás sábanas de cierta textura para dormir bien.' },
    ],
  },

  {
    id: 24,
    section: 'D',
    sectionTitle: 'Sensibilidad sensorial (S)',
    dimension: 'sensorySensitivity',
    text: 'Los cambios en el clima o la temperatura me afectan notablemente.',
    examples: [
      { label: 'Calor', description: 'El calor excesivo te deja sin energía y te cuesta funcionar.' },
      { label: 'Frío', description: 'El frío te cala más que a otros; necesitás más capas para estar cómodo/a.' },
      { label: 'Presión', description: 'Los cambios de presión atmosférica te provocan dolor de cabeza o malestar.' },
      { label: 'Humedad', description: 'La humedad o sequedad del ambiente afecta tu estado de ánimo.' },
    ],
  },

  {
    id: 25,
    section: 'D',
    sectionTitle: 'Sensibilidad sensorial (S)',
    dimension: 'sensorySensitivity',
    text: 'Me afectan las luces brillantes, los olores fuertes o los sonidos agudos.',
    examples: [
      { label: 'Supermercados', description: 'La iluminación de centros comerciales te marea o te cansa.' },
      { label: 'Perfumes', description: 'Un perfume intenso en un espacio cerrado te resulta insoportable.' },
      { label: 'Frecuencias', description: 'Sonidos agudos como alarmas o timbres te duelen físicamente.' },
      { label: 'Pantallas', description: 'Necesitás ajustar el brillo de pantallas más bajo que la mayoría.' },
    ],
  },

  {
    id: 26,
    section: 'D',
    sectionTitle: 'Sensibilidad sensorial (S)',
    dimension: 'sensorySensitivity',
    text: 'Soy muy consciente de los sabores y texturas de los alimentos.',
    examples: [
      { label: 'Cocina', description: 'Detectás ingredientes o especias sutiles que otros no notan.' },
      { label: 'Textura', description: 'Ciertas texturas de comida (viscoso, grumoso) te generan rechazo.' },
      { label: 'Temperatura', description: 'Sos sensible a la temperatura exacta de las bebidas y comidas.' },
      { label: 'Combinaciones', description: 'Notás cuando los sabores no combinan bien, aunque sea sutil.' },
    ],
  },

  {
    id: 27,
    section: 'D',
    sectionTitle: 'Sensibilidad sensorial (S)',
    dimension: 'sensorySensitivity',
    text: 'Necesito un entorno ordenado y sin caos visual para sentirme en calma.',
    examples: [
      { label: 'Espacio', description: 'El desorden visual te genera ansiedad o te impide concentrarte.' },
      { label: 'Decoración', description: 'Preferís espacios con colores suaves y pocos elementos decorativos.' },
      { label: 'Digital', description: 'Te molesta tener demasiadas pestañas abiertas o íconos en el escritorio.' },
      { label: 'Ruido visual', description: 'Los espacios muy recargados o con mucho movimiento te agotan.' },
    ],
  },
];

const HSP_SECTIONS = [
  { id: 'A', title: 'Profundidad de procesamiento (D)', range: [0, 6] },
  { id: 'B', title: 'Sobrestimulación (O)', range: [7, 13] },
  { id: 'C', title: 'Intensidad emocional (E)', range: [14, 20] },
  { id: 'D', title: 'Sensibilidad sensorial (S)', range: [21, 26] },
];

export { LIKERT_OPTIONS, HSP_SECTIONS };

export default hspQuestions;
