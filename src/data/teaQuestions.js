// ═══════════════════════════════════════════════════════
// AQ-50 — Autism-Spectrum Quotient (50 ítems)
// Baron-Cohen, S., Wheelwright, S., Skinner, R., Martin, J.,
// & Clubley, E. (2001). J Autism Dev Disord, 31(1), 5-17.
// DOI: 10.1023/a:1005653411471
//
// 5 subescalas teóricas (no usadas en scoring):
// Social skills, Attention switching, Attention to detail,
// Communication, Imagination
//
// Scoring binario (0-50):
// - 46 ítems: "De acuerdo" = 1 punto
// - 4 ítems (1,3,8,10): "En desacuerdo" = 1 punto (reverse)
// Punto de corte: ≥32
// ═══════════════════════════════════════════════════════

const LIKERT_OPTIONS = [
  'Totalmente de acuerdo',
  'Parcialmente de acuerdo',
  'Parcialmente en desacuerdo',
  'Totalmente en desacuerdo',
];

const teaQuestions = [
  // ═══ SECCIÓN A — Habilidades sociales (10 ítems) ═══

  {
    id: 1,
    section: 'A',
    sectionTitle: 'Habilidades sociales',
    reverse: true,
    text: 'Prefiero hacer cosas solo/a que con otras personas.',
    examples: [
      { label: 'Tiempo libre', description: 'En tu tiempo libre elegís actividades que podés hacer sin compañía.' },
      { label: 'Planes', description: 'Cuando alguien te invita a un plan grupal, tu primer impulso es rechazarlo.' },
      { label: 'Trabajo', description: 'Preferís tareas individuales sobre proyectos en equipo.' },
      { label: 'Viajes', description: 'Viajar solo/a te resulta más atractivo que viajar acompañado/a.' },
    ],
  },

  {
    id: 2,
    section: 'A',
    sectionTitle: 'Habilidades sociales',
    text: 'Me resulta difícil entender las reglas no escritas de las situaciones sociales.',
    examples: [
      { label: 'Reuniones', description: 'En eventos sociales no sabés cuándo hablar, cuándo callar o cómo entrar en una conversación.' },
      { label: 'Jerarquías', description: 'Te cuesta detectar quién tiene autoridad informal en un grupo.' },
      { label: 'Despedidas', description: 'No sabés cuándo ni cómo terminar una conversación sin resultar brusco/a.' },
      { label: 'Citas', description: 'Las normas implícitas del coqueteo o las primeras citas te resultan confusas.' },
    ],
  },

  {
    id: 11,
    section: 'A',
    sectionTitle: 'Habilidades sociales',
    text: 'Me resulta fácil hacer amigos o amigas nuevas.',
    examples: [
      { label: 'Entornos nuevos', description: 'Llegás a un lugar donde no conocés a nadie y en poco tiempo ya tenés contactos.' },
      { label: 'Iniciativa', description: 'Sos vos quien suele iniciar conversaciones con desconocidos.' },
      { label: 'Mantenimiento', description: 'Tus amistades se mantienen activas sin esfuerzo consciente de tu parte.' },
      { label: 'Grupos', description: 'Integrarte a un grupo ya formado no te genera ansiedad ni incomodidad.' },
    ],
  },

  {
    id: 13,
    section: 'A',
    sectionTitle: 'Habilidades sociales',
    text: 'Prefiero conversaciones con un propósito claro que charlas casuales sin tema definido.',
    examples: [
      { label: 'Small talk', description: 'Las conversaciones sobre el clima, el fin de semana o temas triviales te resultan agotadoras.' },
      { label: 'Ascensor', description: 'Los silencios incómodos en situaciones sociales breves te generan ansiedad.' },
      { label: 'Preferencia', description: 'Disfrutás más una conversación técnica o profunda que una charla de cortesía.' },
      { label: 'Eventos', description: 'En reuniones sociales buscás a alguien con quien hablar de un tema que te interese realmente.' },
    ],
  },

  {
    id: 15,
    section: 'A',
    sectionTitle: 'Habilidades sociales',
    text: 'A menudo no sé cómo actuar en situaciones sociales porque no entiendo lo que se espera de mí.',
    examples: [
      { label: 'Eventos formales', description: 'En bodas, funerales o ceremonias no sabés qué nivel de formalidad o emoción mostrar.' },
      { label: 'Reuniones laborales', description: 'No sabés si debés opinar, callar o seguir la corriente en discusiones de equipo.' },
      { label: 'Regalos', description: 'Te genera ansiedad no saber si corresponde dar regalo, qué tipo o cómo reaccionar al recibirlo.' },
      { label: 'Conflictos', description: 'Cuando alguien se enoja con vos, no entendés por qué ni cómo reparar la situación.' },
    ],
  },

  {
    id: 22,
    section: 'A',
    sectionTitle: 'Habilidades sociales',
    text: 'Me cuesta entender por qué ciertas cosas ofenden o molestan a otras personas.',
    examples: [
      { label: 'Comentarios', description: 'Has dicho algo que te parecía neutro y la otra persona se ofendió sin que entendieras por qué.' },
      { label: 'Humor', description: 'No siempre distinguís entre una broma aceptable y un comentario hiriente.' },
      { label: 'Redes sociales', description: 'Te sorprende la reacción negativa a algo que publicaste sin mala intención.' },
      { label: 'Temas sensibles', description: 'No detectás cuándo un tema es delicado para alguien hasta que ya es tarde.' },
    ],
  },

  {
    id: 36,
    section: 'A',
    sectionTitle: 'Habilidades sociales',
    text: 'Disfruto genuinamente de las reuniones sociales.',
    examples: [
      { label: 'Fiestas', description: 'Esperás con entusiasmo los eventos sociales en lugar de temerlos.' },
      { label: 'Energía', description: 'Después de una reunión social te sentís con energía, no agotado/a.' },
      { label: 'Frecuencia', description: 'Si pudieras, tendrías eventos sociales varias veces por semana.' },
      { label: 'Espontaneidad', description: 'Te gusta cuando alguien te propone un plan social de último momento.' },
    ],
  },

  {
    id: 44,
    section: 'A',
    sectionTitle: 'Habilidades sociales',
    text: 'Me resulta difícil entender las intenciones de los demás.',
    examples: [
      { label: 'Segundas intenciones', description: 'No detectás cuando alguien tiene un motivo oculto detrás de su amabilidad.' },
      { label: 'Manipulación', description: 'Te han dicho que sos ingenuo/a o que confiás demasiado en la gente.' },
      { label: 'Coqueteo', description: 'Te cuesta distinguir entre amabilidad, amistad e interés romántico.' },
      { label: 'Sarcasmo', description: 'A veces tomás en serio comentarios que eran irónicos o al revés.' },
    ],
  },

  {
    id: 45,
    section: 'A',
    sectionTitle: 'Habilidades sociales',
    text: 'Me siento cómodo/a en situaciones sociales nuevas.',
    examples: [
      { label: 'Desconocidos', description: 'Conocer gente nueva no te genera ansiedad.' },
      { label: 'Improvisación', description: 'Podés asistir a un evento sin preparar mentalmente temas de conversación.' },
      { label: 'Networking', description: 'Los eventos profesionales donde hay que socializar te resultan manejables.' },
      { label: 'Grupos grandes', description: 'Estar en un grupo numeroso no te sobrecarga sensorialmente.' },
    ],
  },

  {
    id: 47,
    section: 'A',
    sectionTitle: 'Habilidades sociales',
    text: 'Me resulta fácil entender lo que otra persona está sintiendo solo con mirarla.',
    examples: [
      { label: 'Expresiones', description: 'Captás rápidamente si alguien está triste, molesto o contento por su cara.' },
      { label: 'Tono de voz', description: 'Detectás cambios sutiles en el tono que revelan el estado emocional real.' },
      { label: 'Ambiente', description: 'Entrás a una sala y sentís inmediatamente si hay tensión o armonía.' },
      { label: 'Disimulo', description: 'Cuando alguien dice "estoy bien", sabés si es verdad o no por su lenguaje corporal.' },
    ],
  },

  // ═══ SECCIÓN B — Cambio de atención (10 ítems) ═══

  {
    id: 4,
    section: 'B',
    sectionTitle: 'Cambio de atención',
    text: 'Con frecuencia me concentro tanto en una cosa que pierdo de vista otras.',
    examples: [
      { label: 'Hiperenfoque', description: 'Cuando estás concentrado/a en algo, podés olvidarte de comer o de otras necesidades.' },
      { label: 'Interrupciones', description: 'Te molesta profundamente que te interrumpan cuando estás enfocado/a.' },
      { label: 'Multitarea', description: 'Te resulta casi imposible hacer dos cosas al mismo tiempo.' },
      { label: 'Tiempo', description: 'Perdés la noción del tiempo cuando estás inmerso/a en una actividad que te interesa.' },
    ],
  },

  {
    id: 10,
    section: 'B',
    sectionTitle: 'Cambio de atención',
    reverse: true,
    text: 'En una reunión social, puedo seguir fácilmente varias conversaciones diferentes a la vez.',
    examples: [
      { label: 'Restaurantes', description: 'En una cena grupal podés escuchar y participar en la conversación principal mientras captás lo que se dice en otras mesas.' },
      { label: 'Filtrado', description: 'Podés filtrar el ruido de fondo y enfocarte en lo que te interesa sin distraerte.' },
      { label: 'Oficina', description: 'En un espacio de trabajo abierto, las conversaciones ajenas no afectan tu concentración.' },
      { label: 'Cambio', description: 'Podés saltar fluidamente entre distintas conversaciones en un evento sin perder el hilo.' },
    ],
  },

  {
    id: 16,
    section: 'B',
    sectionTitle: 'Cambio de atención',
    text: 'Me gusta planificar mis actividades con mucha anticipación.',
    examples: [
      { label: 'Agenda', description: 'Necesitás saber con días de antelación qué vas a hacer y en qué orden.' },
      { label: 'Imprevistos', description: 'Los cambios de planes de último momento te generan ansiedad o irritación.' },
      { label: 'Rutina', description: 'Seguís horarios fijos para tus comidas, sueño y actividades diarias.' },
      { label: 'Viajes', description: 'Antes de un viaje investigás exhaustivamente horarios, rutas y alternativas.' },
    ],
  },

  {
    id: 25,
    section: 'B',
    sectionTitle: 'Cambio de atención',
    text: 'Me cuesta cambiar de una tarea a otra sin perder eficiencia.',
    examples: [
      { label: 'Transiciones', description: 'Cuando terminás una actividad necesitás un tiempo de adaptación antes de empezar la siguiente.' },
      { label: 'Interrupciones', description: 'Si te interrumpen a mitad de una tarea, te cuesta retomarla donde la dejaste.' },
      { label: 'Multitarea', description: 'Alternar entre varias tareas te agota más que completar una antes de pasar a la siguiente.' },
      { label: 'Contexto', description: 'Cambiar de entorno físico (ej. de casa a oficina) te desconcentra por un rato.' },
    ],
  },

  {
    id: 32,
    section: 'B',
    sectionTitle: 'Cambio de atención',
    text: 'Me resulta fácil alternar entre diferentes actividades.',
    examples: [
      { label: 'Flexibilidad', description: 'Podés pasar de una reunión a otra de temas completamente distintos sin problema.' },
      { label: 'Improvisación', description: 'Si tu plan del día se desmorona, te adaptás rápido y sin estrés.' },
      { label: 'Rutina', description: 'No te afecta que cada día de la semana tenga un horario diferente.' },
      { label: 'Roles', description: 'Cambiás fluidamente entre tu rol laboral, familiar y social sin esfuerzo.' },
    ],
  },

  {
    id: 34,
    section: 'B',
    sectionTitle: 'Cambio de atención',
    text: 'Me molesta que me interrumpan cuando estoy concentrado/a.',
    examples: [
      { label: 'Trabajo', description: 'Cuando alguien te habla mientras trabajás, te cuesta volver al ritmo anterior.' },
      { label: 'Lectura', description: 'Si te interrumpen mientras leés, necesitás releer para retomar el hilo.' },
      { label: 'Irritación', description: 'Sentís una molestia física o emocional cuando te sacan de tu concentración.' },
      { label: 'Aislamiento', description: 'Usás auriculares o te aislás físicamente para evitar interrupciones.' },
    ],
  },

  {
    id: 37,
    section: 'B',
    sectionTitle: 'Cambio de atención',
    text: 'Me resulta fácil hacer varias cosas al mismo tiempo.',
    examples: [
      { label: 'Cocina', description: 'Podés cocinar varios platos simultáneamente sin que se te queme ninguno.' },
      { label: 'Trabajo', description: 'Manejás sin problema tener el correo, el chat y un documento abiertos a la vez.' },
      { label: 'Conversación', description: 'Podés hablar por teléfono mientras ordenás o hacés otra actividad manual.' },
      { label: 'Urgencias', description: 'En situaciones que requieren atención a múltiples frentes, no te paralizás.' },
    ],
  },

  {
    id: 43,
    section: 'B',
    sectionTitle: 'Cambio de atención',
    text: 'Me gusta hacer las cosas de manera espontánea, sin planificar.',
    examples: [
      { label: 'Findes', description: 'Los fines de semana preferís decidir sobre la marcha qué hacer.' },
      { label: 'Viajes', description: 'Te gusta viajar sin itinerario fijo, descubriendo sobre la marcha.' },
      { label: 'Rutina', description: 'No necesitás saber de antemano qué vas a comer o a qué hora.' },
      { label: 'Planes', description: 'Te entusiasma cuando alguien propone un plan de último momento.' },
    ],
  },

  {
    id: 46,
    section: 'B',
    sectionTitle: 'Cambio de atención',
    text: 'Me molesta cuando mis rutinas diarias se ven alteradas.',
    examples: [
      { label: 'Mañanas', description: 'Si algo cambia en tu rutina matutina, el resto del día te sentís descolocado/a.' },
      { label: 'Comidas', description: 'Comer a una hora diferente a la habitual te desregula.' },
      { label: 'Espacio', description: 'Que alguien mueva tus cosas de lugar te genera malestar.' },
      { label: 'Sueño', description: 'Dormir fuera de casa o en un entorno distinto afecta la calidad de tu descanso.' },
    ],
  },

  {
    id: 48,
    section: 'B',
    sectionTitle: 'Cambio de atención',
    text: 'Me adapto fácilmente a los cambios de planes.',
    examples: [
      { label: 'Cancelaciones', description: 'Si alguien cancela un plan a último momento, no te afecta demasiado.' },
      { label: 'Improvisación', description: 'Podés reorganizar tu día sobre la marcha sin estrés.' },
      { label: 'Viajes', description: 'Si un vuelo se cancela o hay un imprevisto en un viaje, lo resolvés con calma.' },
      { label: 'Trabajo', description: 'Los cambios de prioridades en el trabajo no te generan ansiedad significativa.' },
    ],
  },

  // ═══ SECCIÓN C — Atención al detalle (10 ítems) ═══

  {
    id: 5,
    section: 'C',
    sectionTitle: 'Atención al detalle',
    text: 'A menudo noto sonidos pequeños que otras personas no perciben.',
    examples: [
      { label: 'Electrónicos', description: 'Escuchás el zumbido de cargadores, heladeras o luces que otros ignoran.' },
      { label: 'Relojes', description: 'El tictac de un reloj en una habitación silenciosa te resulta insoportable.' },
      { label: 'Vecinos', description: 'Percibís ruidos de pisadas o tuberías de pisos contiguos que otros no registran.' },
      { label: 'Tono', description: 'Notás diferencias sutiles en el tono de dispositivos electrónicos.' },
    ],
  },

  {
    id: 6,
    section: 'C',
    sectionTitle: 'Atención al detalle',
    text: 'Normalmente noto patrones en matrículas de coche, números de teléfono o secuencias similares.',
    examples: [
      { label: 'Matrículas', description: 'Sin proponértelo, recordás matrículas o notás patrones numéricos en ellas.' },
      { label: 'Números', description: 'Te llaman la atención las secuencias, los números primos o las simetrías en cifras.' },
      { label: 'Fechas', description: 'Recordás fechas exactas de eventos que otros olvidan.' },
      { label: 'Estadísticas', description: 'Disfrutás encontrando patrones en datos que otros pasan por alto.' },
    ],
  },

  {
    id: 9,
    section: 'C',
    sectionTitle: 'Atención al detalle',
    text: 'Me fascinan los números, las fechas y las secuencias.',
    examples: [
      { label: 'Cálculo', description: 'Disfrutás hacer cálculos mentales o encontrar relaciones numéricas.' },
      { label: 'Calendario', description: 'Te resulta fácil recordar en qué día de la semana cayó o caerá una fecha.' },
      { label: 'Patrones', description: 'Te emociona descubrir patrones matemáticos en la naturaleza o la vida cotidiana.' },
      { label: 'Colecciones', description: 'Coleccionás o catalogás datos, estadísticas o series numéricas por placer.' },
    ],
  },

  {
    id: 12,
    section: 'C',
    sectionTitle: 'Atención al detalle',
    text: 'Tiendo a notar pequeños cambios en mi entorno que otros pasan por alto.',
    examples: [
      { label: 'Decoración', description: 'Notás inmediatamente si alguien cambió un mueble o cuadro de lugar.' },
      { label: 'Apariencia', description: 'Detectás cambios sutiles en el aspecto de las personas (corte de pelo, ropa nueva).' },
      { label: 'Errores', description: 'Encontrás erratas o inconsistencias en textos que otros leen sin notarlas.' },
      { label: 'Ambiente', description: 'Percibís si la iluminación o la temperatura de un lugar cambiaron ligeramente.' },
    ],
  },

  {
    id: 19,
    section: 'C',
    sectionTitle: 'Atención al detalle',
    text: 'Me atraen más los detalles que la imagen general.',
    examples: [
      { label: 'Lectura', description: 'Al leer un texto, notás primero las erratas o el formato que el contenido general.' },
      { label: 'Arte', description: 'En una pintura te fijás en pinceladas o detalles técnicos antes que en la composición.' },
      { label: 'Cine', description: 'Detectás errores de continuidad o detalles de vestuario que otros no ven.' },
      { label: 'Naturaleza', description: 'Observás patrones en hojas, texturas o simetrías que pasan desapercibidos.' },
    ],
  },

  {
    id: 23,
    section: 'C',
    sectionTitle: 'Atención al detalle',
    text: 'Me gusta categorizar y organizar información en patrones o sistemas.',
    examples: [
      { label: 'Colecciones', description: 'Organizás tu música, libros o archivos en categorías detalladas.' },
      { label: 'Listas', description: 'Hacés listas y sub-listas para todo, con niveles de jerarquía.' },
      { label: 'Datos', description: 'Disfrutás creando hojas de cálculo o bases de datos incluso para temas personales.' },
      { label: 'Taxonomía', description: 'Te interesa cómo se clasifican las cosas: especies, géneros musicales, períodos históricos.' },
    ],
  },

  {
    id: 28,
    section: 'C',
    sectionTitle: 'Atención al detalle',
    text: 'Me fijo mucho en los detalles de una tarea que otros considerarían irrelevantes.',
    examples: [
      { label: 'Trabajo', description: 'Tus compañeros te dicen que sos demasiado minucioso/a o perfeccionista.' },
      { label: 'Formato', description: 'Te importa mucho la alineación, tipografía y consistencia visual de documentos.' },
      { label: 'Instrucciones', description: 'Seguís instrucciones al pie de la letra, notando ambigüedades que otros ignoran.' },
      { label: 'Tiempo', description: 'Dedicás más tiempo del esperado a pulir detalles que otros considerarían terminados.' },
    ],
  },

  {
    id: 29,
    section: 'C',
    sectionTitle: 'Atención al detalle',
    text: 'No me gusta cuando alguien cambia el orden de mis cosas.',
    examples: [
      { label: 'Escritorio', description: 'Aunque parezca desordenado para otros, sabés exactamente dónde está cada cosa.' },
      { label: 'Limpieza', description: 'Que alguien "ordene" tu espacio te desorienta porque rompe tu sistema.' },
      { label: 'Cocina', description: 'Tenés un lugar específico para cada utensilio y notás cuando algo no está en su sitio.' },
      { label: 'Digital', description: 'Organizás tus archivos digitales con una estructura que solo vos entendés.' },
    ],
  },

  {
    id: 30,
    section: 'C',
    sectionTitle: 'Atención al detalle',
    text: 'Prefiero hacer las cosas de la misma manera cada vez.',
    examples: [
      { label: 'Rutinas', description: 'Seguís los mismos pasos en el mismo orden para tareas cotidianas.' },
      { label: 'Recetas', description: 'Al cocinar, medís los ingredientes exactamente y seguís la receta sin variaciones.' },
      { label: 'Trayectos', description: 'Hacés siempre el mismo camino para ir al trabajo o a lugares conocidos.' },
      { label: 'Procesos', description: 'Si encontrás una forma eficiente de hacer algo, te resistís a cambiarla.' },
    ],
  },

  {
    id: 49,
    section: 'C',
    sectionTitle: 'Atención al detalle',
    text: 'Me gusta coleccionar información sobre temas muy específicos.',
    examples: [
      { label: 'Intereses', description: 'Tenés uno o varios temas sobre los que acumulás información exhaustiva.' },
      { label: 'Profundidad', description: 'Cuando algo te interesa, necesitás saber todo al respecto, no solo lo superficial.' },
      { label: 'Datos', description: 'Disfrutás memorizando datos, estadísticas o curiosidades de tu tema de interés.' },
      { label: 'Compartir', description: 'Te encanta compartir lo que sabés, aunque a veces notes que los demás pierden interés.' },
    ],
  },

  // ═══ SECCIÓN D — Comunicación (10 ítems) ═══

  {
    id: 7,
    section: 'D',
    sectionTitle: 'Comunicación',
    text: 'Otras personas me dicen que soy grosero/a o directo/a cuando yo no tuve esa intención.',
    examples: [
      { label: 'Feedback', description: 'Tus comentarios honestos son recibidos como hirientes o inapropiados.' },
      { label: 'Tono', description: 'Te han dicho que tu tono de voz suena agresivo o cortante sin que lo notes.' },
      { label: 'Verdad', description: 'Decís la verdad tal cual la ves y no entendés por qué deberías "suavizarla".' },
      { label: 'Contexto', description: 'En situaciones formales decís cosas que serían aceptables entre amigos pero no allí.' },
    ],
  },

  {
    id: 17,
    section: 'D',
    sectionTitle: 'Comunicación',
    text: 'Me resulta difícil mantener una conversación si el tema no me interesa.',
    examples: [
      { label: 'Reuniones', description: 'En conversaciones sobre temas ajenos a tus intereses, te desconectás o cambiás de tema.' },
      { label: 'Cortesía', description: 'Te cuesta fingir interés en conversaciones sociales de compromiso.' },
      { label: 'Trabajo', description: 'En reuniones sobre temas que no te competen, te resulta casi imposible prestar atención.' },
      { label: 'Familia', description: 'En reuniones familiares, evitás las conversaciones que giran en torno a temas triviales.' },
    ],
  },

  {
    id: 18,
    section: 'D',
    sectionTitle: 'Comunicación',
    text: 'Me gusta dar explicaciones detalladas sobre temas que me apasionan.',
    examples: [
      { label: 'Monólogos', description: 'Cuando hablás de tu tema de interés, podés extenderse largamente sin notar señales de aburrimiento.' },
      { label: 'Precisión', description: 'Necesitás que la información sea exacta; corregís imprecisiones aunque parezca pedante.' },
      { label: 'Entusiasmo', description: 'Tu nivel de detalle y entusiasmo al hablar de tu tema favorito sorprende a otros.' },
      { label: 'Contexto', description: 'No siempre evaluás si el nivel de detalle es apropiado para la situación o la audiencia.' },
    ],
  },

  {
    id: 26,
    section: 'D',
    sectionTitle: 'Comunicación',
    text: 'Me resulta difícil entender lo que un personaje de ficción está sintiendo.',
    examples: [
      { label: 'Libros', description: 'Al leer, te centrás en la trama o los hechos, no en las emociones de los personajes.' },
      { label: 'Películas', description: 'No siempre captás por qué un personaje reacciona emocionalmente de cierta manera.' },
      { label: 'Identificación', description: 'Rara vez te "ponés en la piel" de un personaje de forma automática.' },
      { label: 'Análisis', description: 'Entendés las motivaciones de los personajes analizándolas, no sintiéndolas.' },
    ],
  },

  {
    id: 27,
    section: 'D',
    sectionTitle: 'Comunicación',
    text: 'Me cuesta seguir conversaciones grupales cuando varias personas hablan a la vez.',
    examples: [
      { label: 'Cenas', description: 'En comidas grupales perdés el hilo cuando el ritmo de la conversación se acelera.' },
      { label: 'Reuniones', description: 'En juntas de trabajo donde todos opinan, te quedás callado/a porque no encontrás el momento de entrar.' },
      { label: 'Solapamiento', description: 'Cuando dos personas te hablan al mismo tiempo, no procesás ninguna.' },
      { label: 'Turnos', description: 'Te cuesta detectar las pausas naturales para tomar tu turno de palabra.' },
    ],
  },

  {
    id: 31,
    section: 'D',
    sectionTitle: 'Comunicación',
    text: 'Me gusta el sarcasmo y entiendo cuándo alguien lo está usando.',
    examples: [
      { label: 'Detección', description: 'Captás inmediatamente cuándo un comentario es irónico, sin necesidad de pistas adicionales.' },
      { label: 'Uso', description: 'Usás el sarcasmo con fluidez en tus conversaciones cotidianas.' },
      { label: 'Confusión', description: 'Rara vez te ha pasado de tomar un sarcasmo en serio.' },
      { label: 'Humor', description: 'Disfrutás del humor basado en ironía, doble sentido y sarcasmo.' },
    ],
  },

  {
    id: 33,
    section: 'D',
    sectionTitle: 'Comunicación',
    text: 'Me resulta fácil saber cuándo alguien quiere cambiar de tema.',
    examples: [
      { label: 'Señales', description: 'Notás cuando tu interlocutor mira el reloj, se mueve o da respuestas cortas.' },
      { label: 'Tono', description: 'Detectás cambios en el tono de voz que indican aburrimiento o ganas de irse.' },
      { label: 'Fluidez', description: 'Tus conversaciones fluyen naturalmente de un tema a otro sin estancarse.' },
      { label: 'Cierre', description: 'Sabés reconocer el momento adecuado para terminar una conversación.' },
    ],
  },

  {
    id: 35,
    section: 'D',
    sectionTitle: 'Comunicación',
    text: 'Me han dicho que hablo demasiado sobre ciertos temas.',
    examples: [
      { label: 'Feedback', description: 'Varias personas te han comentado que monopolizás las conversaciones sin darte cuenta.' },
      { label: 'Interés', description: 'Cuando alguien menciona tu tema favorito, no podés evitar extenderse.' },
      { label: 'Señales', description: 'Te cuesta notar cuándo tu interlocutor ya perdió el interés en lo que contás.' },
      { label: 'Conciencia', description: 'Solo después de la conversación te das cuenta de que hablaste casi todo el tiempo.' },
    ],
  },

  {
    id: 38,
    section: 'D',
    sectionTitle: 'Comunicación',
    text: 'Me gusta participar en juegos de rol o de improvisación.',
    examples: [
      { label: 'Teatro', description: 'Disfrutás actuando o interpretando personajes distintos a vos mismo/a.' },
      { label: 'Juegos', description: 'Los juegos de rol como D&D o las dramatizaciones te resultan naturales y divertidos.' },
      { label: 'Impro', description: 'Te sentís cómodo/a improvisando diálogos o situaciones ficticias en grupo.' },
      { label: 'Disfraz', description: 'Te gusta la idea de ser otra persona por un rato, ya sea en carnaval, cosplay o teatro.' },
    ],
  },

  {
    id: 39,
    section: 'D',
    sectionTitle: 'Comunicación',
    text: 'Cuando hablo, a veces no sé cuándo parar.',
    examples: [
      { label: 'Extensión', description: 'Tus explicaciones suelen ser más largas de lo que la situación requiere.' },
      { label: 'Interrupción', description: 'Otros te interrumpen o intentan cerrar la conversación antes de que termines.' },
      { label: 'Estructura', description: 'Te cuesta resumir; sentís que cada detalle es necesario para entender el cuadro completo.' },
      { label: 'Feedback', description: 'En evaluaciones laborales o académicas te han señalado que sintetices más.' },
    ],
  },

  // ═══ SECCIÓN E — Imaginación (10 ítems) ═══

  {
    id: 3,
    section: 'E',
    sectionTitle: 'Imaginación',
    reverse: true,
    text: 'Cuando trato de imaginar algo, me resulta fácil crear una imagen mental vívida.',
    examples: [
      { label: 'Lectura', description: 'Al leer una novela, visualizás nítidamente los escenarios y personajes descritos.' },
      { label: 'Instrucciones', description: 'Si alguien te describe un lugar, podés imaginarlo con claridad.' },
      { label: 'Planificación', description: 'Antes de decorar o reorganizar un espacio, lo visualizás mentalmente.' },
      { label: 'Recuerdos', description: 'Tus recuerdos incluyen imágenes mentales ricas en detalles visuales.' },
    ],
  },

  {
    id: 8,
    section: 'E',
    sectionTitle: 'Imaginación',
    reverse: true,
    text: 'Cuando leo una historia, puedo imaginar fácilmente cómo serían los personajes.',
    examples: [
      { label: 'Voces', description: 'Al leer diálogos, escuchás mentalmente diferentes tonos de voz para cada personaje.' },
      { label: 'Apariencia', description: 'Te formás una imagen clara de cómo es físicamente cada personaje.' },
      { label: 'Ambientación', description: 'Podés imaginar los escenarios como si estuvieras viendo una película.' },
      { label: 'Conexión', description: 'Sentís que "conocés" a los personajes como si fueran personas reales.' },
    ],
  },

  {
    id: 14,
    section: 'E',
    sectionTitle: 'Imaginación',
    text: 'Prefiero las historias basadas en hechos reales que la ficción.',
    examples: [
      { label: 'Lectura', description: 'Elegís biografías, ensayos o divulgación antes que novelas o cuentos.' },
      { label: 'Cine', description: 'Preferís documentales o películas basadas en hechos reales sobre fantasía o ciencia ficción.' },
      { label: 'Conversación', description: 'Te interesa más hablar de eventos reales que de escenarios hipotéticos.' },
      { label: 'Juegos', description: 'Preferís juegos de estrategia o lógica sobre juegos narrativos o de interpretación.' },
    ],
  },

  {
    id: 20,
    section: 'E',
    sectionTitle: 'Imaginación',
    text: 'Me resulta difícil imaginar cómo me sentiría en una situación que no he vivido.',
    examples: [
      { label: 'Empatía', description: 'Te cuesta ponerte en el lugar de alguien que está pasando por algo que vos no viviste.' },
      { label: 'Previsión', description: 'Antes de un evento nuevo (entrevista, cita), no podés imaginar cómo te vas a sentir.' },
      { label: 'Hipotético', description: 'Las preguntas del tipo "¿qué harías si...?" te resultan difíciles de responder.' },
      { label: 'Consejo', description: 'Te cuesta aconsejar a alguien sobre situaciones que no atravesaste personalmente.' },
    ],
  },

  {
    id: 21,
    section: 'E',
    sectionTitle: 'Imaginación',
    text: 'Prefiero actividades que no requieran inventar o imaginar escenarios nuevos.',
    examples: [
      { label: 'Trabajo', description: 'Preferís tareas con reglas y procedimientos claros sobre las creativas abiertas.' },
      { label: 'Juegos', description: 'Elegís juegos con reglas fijas en lugar de juegos de creatividad o narración.' },
      { label: 'Hobbies', description: 'Tus pasatiempos son más sistemáticos (rompecabezas, programación) que artísticos.' },
      { label: 'Problemas', description: 'Preferís resolver problemas con soluciones conocidas antes que buscar enfoques novedosos.' },
    ],
  },

  {
    id: 24,
    section: 'E',
    sectionTitle: 'Imaginación',
    text: 'Me resulta más fácil entender conceptos abstractos si puedo relacionarlos con algo concreto.',
    examples: [
      { label: 'Aprendizaje', description: 'Necesitás ejemplos tangibles para comprender teorías o ideas abstractas.' },
      { label: 'Metáforas', description: 'Las metáforas muy abstractas o poéticas te confunden; preferís las concretas.' },
      { label: 'Explicación', description: 'Cuando explicás algo, usás analogías con objetos o situaciones cotidianas.' },
      { label: 'Matemáticas', description: 'Entendés mejor un concepto matemático si lo ves aplicado a un problema real.' },
    ],
  },

  {
    id: 40,
    section: 'E',
    sectionTitle: 'Imaginación',
    text: 'De niño/a, me gustaba jugar a simular situaciones sociales (como jugar a "la casita" o "la escuela").',
    examples: [
      { label: 'Infancia', description: 'Disfrutabas los juegos de simulación donde interpretabas roles sociales.' },
      { label: 'Amigos', description: 'Organizabas juegos de fantasía social con otros niños.' },
      { label: 'Muñecos', description: 'Les asignabas personalidades e historias a tus juguetes.' },
      { label: 'Disfraces', description: 'Te gustaba disfrazarte y actuar como si fueras otra persona.' },
    ],
  },

  {
    id: 41,
    section: 'E',
    sectionTitle: 'Imaginación',
    text: 'Me resulta fácil imaginar mundos o realidades alternativas.',
    examples: [
      { label: 'Creatividad', description: 'Tu mente genera espontáneamente escenarios de "y si..." sobre situaciones cotidianas.' },
      { label: 'Ficción', description: 'Se te ocurren fácilmente ideas para historias, mundos o personajes originales.' },
      { label: 'Futurismo', description: 'Disfrutás imaginando cómo será el mundo dentro de 100 años.' },
      { label: 'Sueños', description: 'Tus ensoñaciones diurnas son vívidas y elaboradas.' },
    ],
  },

  {
    id: 42,
    section: 'E',
    sectionTitle: 'Imaginación',
    text: 'Me interesa más lo que las cosas son que lo que podrían ser.',
    examples: [
      { label: 'Enfoque', description: 'Preferís trabajar con hechos y datos concretos que con posibilidades y escenarios.' },
      { label: 'Conversación', description: 'Te aburren las discusiones sobre "qué pasaría si..." o escenarios hipotéticos.' },
      { label: 'Planificación', description: 'Planificás basándote en lo que sabés que va a pasar, no en lo que podría pasar.' },
      { label: 'Creatividad', description: 'Preferís mejorar algo existente antes que inventar algo completamente nuevo.' },
    ],
  },

  {
    id: 50,
    section: 'E',
    sectionTitle: 'Imaginación',
    text: 'De niño/a, me gustaba más jugar con otros niños que solo/a.',
    examples: [
      { label: 'Infancia', description: 'En el recreo buscabas activamente jugar con otros en lugar de estar solo/a.' },
      { label: 'Cooperación', description: 'Disfrutabas los juegos en equipo más que las actividades individuales.' },
      { label: 'Iniciativa', description: 'Eras vos quien proponía juegos grupales a los demás.' },
      { label: 'Preferencia', description: 'Si te daban a elegir, siempre preferías compañía para jugar.' },
    ],
  },
];

const TEA_SECTIONS = [
  { id: 'A', title: 'Habilidades sociales', range: [0, 9] },
  { id: 'B', title: 'Cambio de atención', range: [10, 19] },
  { id: 'C', title: 'Atención al detalle', range: [20, 29] },
  { id: 'D', title: 'Comunicación', range: [30, 39] },
  { id: 'E', title: 'Imaginación', range: [40, 49] },
];

export { LIKERT_OPTIONS, TEA_SECTIONS };

export default teaQuestions;
