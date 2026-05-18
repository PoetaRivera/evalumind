// ═══════════════════════════════════════════════════════
// RSD — Rejection Sensitivity (adaptación del RSQ)
// Downey, G. & Feldman, S. (1996). J Pers Soc Psychol, 70(6)
// DOI: 10.1037/0022-3514.70.6.1327
// Berenson et al. (2009). A-RSQ (Adult Rejection Sensitivity)
//
// 4 dimensiones, 16 ítems, Likert 0-4
// NOTA: El RSQ original usa 18 escenarios con doble valoración
// (ansiedad × expectativa). Esta es una adaptación Likert
// para screening orientativo. El test complementario
// "Escenarios Sociales" usa un paradigma similar al RSQ.
// ═══════════════════════════════════════════════════════

const rsdQuestions = [
  // ═══ SECCIÓN A — Percepción de rechazo (4 ítems) ═══

  {
    id: 1,
    section: 'A',
    sectionTitle: 'Percepción de rechazo en situaciones ambiguas',
    dimension: 'rejectionPerception',
    text: 'Tiendo a interpretar comentarios neutros o ambiguos como críticas hacia mí.',
    examples: [
      { label: 'Trabajo', description: 'Tu jefe dice "hablamos luego" y vos asumís que es algo negativo.' },
      { label: 'Mensajes', description: 'Alguien tarda en responder y pensás que está enojado/a con vos.' },
      { label: 'Tono', description: 'Un cambio sutil en el tono de voz de alguien te hace pensar que hiciste algo mal.' },
      { label: 'Silencio', description: 'El silencio de otra persona lo interpretás como desaprobación o molestia.' },
    ],
  },

  {
    id: 2,
    section: 'A',
    sectionTitle: 'Percepción de rechazo en situaciones ambiguas',
    dimension: 'rejectionPerception',
    text: 'Me preocupa que las personas importantes en mi vida me rechacen o me abandonen.',
    examples: [
      { label: 'Pareja', description: 'Temés que tu pareja pierda interés o encuentre a alguien mejor.' },
      { label: 'Amistades', description: 'Cuando un amigo hace nuevos amigos, temés que te excluya.' },
      { label: 'Trabajo', description: 'Temés que tus compañeros o jefe piensen que no sos competente.' },
      { label: 'Familia', description: 'Sentís que si cometés errores, tu familia te va a juzgar o distanciarse.' },
    ],
  },

  {
    id: 3,
    section: 'A',
    sectionTitle: 'Percepción de rechazo en situaciones ambiguas',
    dimension: 'rejectionPerception',
    text: 'Cuando pido ayuda o un favor, espero que me digan que no o que me juzguen.',
    examples: [
      { label: 'Trabajo', description: 'No pedís ayuda aunque la necesités porque asumís que van a pensar que sos incompetente.' },
      { label: 'Amigos', description: 'Evitás pedir favores porque asumís que les molestás o que te deben ver como una carga.' },
      { label: 'Familia', description: 'Preferís resolver las cosas solo/a antes que pedir apoyo y arriesgarte a una negativa.' },
      { label: 'Salud', description: 'Posponés pedir ayuda profesional porque creés que no te van a tomar en serio.' },
    ],
  },

  {
    id: 4,
    section: 'A',
    sectionTitle: 'Percepción de rechazo en situaciones ambiguas',
    dimension: 'rejectionPerception',
    text: 'Siento que los demás me evalúan y me juzgan constantemente.',
    examples: [
      { label: 'Público', description: 'Al hablar en grupo, sentís que todos están notando tus errores.' },
      { label: 'Redes sociales', description: 'Publicar algo te genera ansiedad por cómo será recibido.' },
      { label: 'Rendimiento', description: 'Creés que tu valor como persona depende de no cometer errores visibles.' },
      { label: 'Apariencia', description: 'Sentís que la gente nota y juzga cada detalle de tu aspecto o comportamiento.' },
    ],
  },

  // ═══ SECCIÓN B — Intensidad emocional ante el rechazo (4 ítems) ═══

  {
    id: 5,
    section: 'B',
    sectionTitle: 'Respuesta emocional al rechazo',
    dimension: 'emotionalIntensity',
    text: 'Una crítica o comentario negativo me afecta durante horas o días.',
    examples: [
      { label: 'Rumia', description: 'Después de una crítica, repasás la situación una y otra vez en tu cabeza.' },
      { label: 'Físico', description: 'Sentís el rechazo en el cuerpo: nudo en el estómago, opresión en el pecho, náuseas.' },
      { label: 'Sueño', description: 'Una interacción social negativa te quita el sueño o te despierta de madrugada.' },
      { label: 'Estado', description: 'Un solo comentario puede arruinarte el día entero.' },
    ],
  },

  {
    id: 6,
    section: 'B',
    sectionTitle: 'Respuesta emocional al rechazo',
    dimension: 'emotionalIntensity',
    text: 'Cuando siento que alguien me rechaza, mi reacción emocional es intensa y difícil de controlar.',
    examples: [
      { label: 'Llanto', description: 'Una discusión o desaire te hace llorar aunque intentes contenerte.' },
      { label: 'Ira', description: 'El rechazo percibido te provoca una oleada de ira que te sorprende a vos mismo/a.' },
      { label: 'Colapso', description: 'Te "apagás" o desconectás emocionalmente como mecanismo de protección.' },
      { label: 'Desproporción', description: 'Tu reacción emocional es más intensa de lo que la situación objetivamente justificaría.' },
    ],
  },

  {
    id: 7,
    section: 'B',
    sectionTitle: 'Respuesta emocional al rechazo',
    dimension: 'emotionalIntensity',
    text: 'Me cuesta recuperarme emocionalmente después de un conflicto interpersonal.',
    examples: [
      { label: 'Tiempo', description: 'Necesitás horas o días para volver a sentirte estable después de una discusión.' },
      { label: 'Rencor', description: 'Te cuesta soltar el malestar aunque la otra persona ya se haya disculpado.' },
      { label: 'Confianza', description: 'Después de un conflicto, tardás en volver a confiar en que la relación está bien.' },
      { label: 'Energía', description: 'Un conflicto interpersonal te deja agotado/a físicamente.' },
    ],
  },

  {
    id: 8,
    section: 'B',
    sectionTitle: 'Respuesta emocional al rechazo',
    dimension: 'emotionalIntensity',
    text: 'Siento una oleada de vergüenza o humillación cuando percibo desaprobación.',
    examples: [
      { label: 'Físico', description: 'Te sonrojás, te tiembla la voz o te paralizás cuando alguien te critica.' },
      { label: 'Recuerdo', description: 'Recordás situaciones embarazosas de hace años y sentís la misma vergüenza que en el momento.' },
      { label: 'Exposición', description: 'Ser el centro de atención en una situación de evaluación te resulta insoportable.' },
      { label: 'Escape', description: 'Tu primer impulso ante la desaprobación es huir de la situación.' },
    ],
  },

  // ═══ SECCIÓN C — Evitación anticipatoria (4 ítems) ═══

  {
    id: 9,
    section: 'C',
    sectionTitle: 'Evitación por anticipación del rechazo',
    dimension: 'anticipatoryAvoidance',
    text: 'Evito situaciones sociales o profesionales donde podría ser evaluado/a o rechazado/a.',
    examples: [
      { label: 'Trabajo', description: 'No postulás a un ascenso o proyecto porque anticipás el rechazo.' },
      { label: 'Social', description: 'Cancelás planes o evitás eventos sociales donde no conocés a todos.' },
      { label: 'Romántico', description: 'No expresás interés por alguien por miedo a no ser correspondido/a.' },
      { label: 'Creativo', description: 'No compartís tus creaciones o ideas por miedo a la crítica.' },
    ],
  },

  {
    id: 10,
    section: 'C',
    sectionTitle: 'Evitación por anticipación del rechazo',
    dimension: 'anticipatoryAvoidance',
    text: 'Prefiero no expresar mis opiniones si creo que pueden generar desacuerdo o rechazo.',
    examples: [
      { label: 'Reuniones', description: 'En el trabajo o en grupos, preferís callar antes que arriesgarte a que tu opinión sea rechazada.' },
      { label: 'Familia', description: 'Evitás temas controvertidos en reuniones familiares para no generar conflicto.' },
      { label: 'Redes', description: 'Escribís y borrás comentarios o publicaciones por miedo a reacciones negativas.' },
      { label: 'Defensa', description: 'No defendés tus necesidades o límites para evitar la confrontación.' },
    ],
  },

  {
    id: 11,
    section: 'C',
    sectionTitle: 'Evitación por anticipación del rechazo',
    dimension: 'anticipatoryAvoidance',
    text: 'Me cuesta decir que no o poner límites por miedo a dañar la relación.',
    examples: [
      { label: 'Sobrecarga', description: 'Aceptás más trabajo del que podés manejar porque decir que no te aterra.' },
      { label: 'Cansancio', description: 'Decís que sí a planes sociales aunque estés agotado/a, por miedo a que se enojen.' },
      { label: 'Autenticidad', description: 'Ocultás partes de vos mismo/a para encajar y evitar el rechazo.' },
      { label: 'Prioridades', description: 'Ponés las necesidades ajenas por encima de las tuyas sistemáticamente.' },
    ],
  },

  {
    id: 12,
    section: 'C',
    sectionTitle: 'Evitación por anticipación del rechazo',
    dimension: 'anticipatoryAvoidance',
    text: 'Dejo de intentar cosas nuevas por miedo al fracaso o al juicio de otros.',
    examples: [
      { label: 'Aprendizaje', description: 'No empezás un curso o hobby porque anticipás que no vas a ser bueno/a.' },
      { label: 'Profesional', description: 'Rechazás oportunidades porque el miedo al fracaso es más fuerte que las ganas de crecer.' },
      { label: 'Deporte', description: 'No probás actividades físicas grupales por miedo a hacer el ridículo.' },
      { label: 'Social', description: 'No iniciás conversaciones con desconocidos porque asumís que no les vas a interesar.' },
    ],
  },

  // ═══ SECCIÓN D — Rumia y autocrítica post-rechazo (4 ítems) ═══

  {
    id: 13,
    section: 'D',
    sectionTitle: 'Rumia y autocrítica',
    dimension: 'rumination',
    text: 'Después de una interacción social, repaso mentalmente todo lo que dije o hice mal.',
    examples: [
      { label: 'Post-evento', description: 'Al volver de una reunión o cena, repasás cada cosa que dijiste buscando errores.' },
      { label: 'Insomnio', description: 'De noche, tu mente reproduce en bucle las conversaciones del día.' },
      { label: 'Exageración', description: 'Un pequeño error social te parece una catástrofe cuando lo repasás.' },
      { label: 'Comparación', description: 'Te comparás con otros que "seguro lo hicieron mejor" en la misma situación.' },
    ],
  },

  {
    id: 14,
    section: 'D',
    sectionTitle: 'Rumia y autocrítica',
    dimension: 'rumination',
    text: 'Cuando alguien me rechaza, asumo que es por algo que hice o por cómo soy.',
    examples: [
      { label: 'Atribución', description: 'Si alguien cancela un plan, asumís que es porque no quiere verte, no porque esté ocupado/a.' },
      { label: 'Personal', description: 'Tomás como algo personal actitudes que probablemente no tengan que ver con vos.' },
      { label: 'Culpa', description: 'Te culpás automáticamente cuando una relación no funciona, incluso si no fue tu responsabilidad.' },
      { label: 'Identidad', description: 'Sentís que el rechazo confirma algo fundamentalmente "malo" o "defectuoso" en vos.' },
    ],
  },

  {
    id: 15,
    section: 'D',
    sectionTitle: 'Rumia y autocrítica',
    dimension: 'rumination',
    text: 'Me obsesiono con la idea de que algo que dije o hice pudo haber molestado a alguien.',
    examples: [
      { label: 'Verificación', description: 'Le preguntás repetidamente a otros si está todo bien o si hiciste algo mal.' },
      { label: 'Mensajes', description: 'Releés tus mensajes una y otra vez buscando posibles interpretaciones negativas.' },
      { label: 'Anticipación', description: 'Antes de enviar un mensaje, lo reescribís muchas veces por miedo a cómo será recibido.' },
      { label: 'Círculo', description: 'Pasás horas pensando en una interacción breve que quizás la otra persona ya olvidó.' },
    ],
  },

  {
    id: 16,
    section: 'D',
    sectionTitle: 'Rumia y autocrítica',
    dimension: 'rumination',
    text: 'Siento que tengo que esforzarme más que otros para que me acepten o me valoren.',
    examples: [
      { label: 'Mérito', description: 'Creés que tu valor depende de lo que hacés, no de quién sos.' },
      { label: 'Perfeccionismo', description: 'Te exigís la perfección porque sentís que cualquier error será castigado con rechazo.' },
      { label: 'Hipervigilancia', description: 'Estás constantemente alerta a señales de desaprobación en los demás.' },
      { label: 'Autenticidad', description: 'Ocultás tus intereses, opiniones o dificultades por miedo a que te hagan parecer "raro/a".' },
    ],
  },
];

const RSD_SECTIONS = [
  { id: 'A', title: 'Percepción de rechazo', range: [0, 3] },
  { id: 'B', title: 'Respuesta emocional al rechazo', range: [4, 7] },
  { id: 'C', title: 'Evitación anticipatoria', range: [8, 11] },
  { id: 'D', title: 'Rumia y autocrítica', range: [12, 15] },
];

export { RSD_SECTIONS };

export default rsdQuestions;
