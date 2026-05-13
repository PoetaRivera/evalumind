const rsdQuestions = [
  // ═══════════ SECCIÓN A: HIPERSENSIBILIDAD AL RECHAZO PERCIBIDO ═══════════
  {
    id: 1,
    section: 'A',
    sectionTitle: 'Hipersensibilidad — Interpretación de señales neutras',
    dimension: 'rejectionPerception',
    text: 'Interpreto como rechazo, crítica o desinterés señales que otros considerarían neutras o inocentes.',
    examples: [
      {
        label: 'Mensajes',
        description:
          'Alguien me responde con un "ok" corto o sin emoji y mi primer pensamiento es "se enojó conmigo" o "ya no le caigo bien".',
      },
      {
        label: 'Redes sociales',
        description:
          'Publico algo y no recibo likes o comentarios de cierta persona; asumo que me ignora intencionalmente o que mi publicación fue inadecuada.',
      },
      {
        label: 'Miradas',
        description:
          'Alguien me mira con una expresión neutra y siento que me juzga negativamente, aunque no haya dicho nada.',
      },
      {
        label: 'Cancelaciones',
        description:
          'Alguien cancela un plan con una excusa lógica y mi primer instinto es pensar que realmente no quiere verme, aunque la excusa sea plausible.',
      },
    ],
  },
  {
    id: 2,
    section: 'A',
    sectionTitle: 'Hipersensibilidad — Lectura entre líneas',
    dimension: 'rejectionPerception',
    text: '"Leo entre líneas" buscando indicios de que alguien está molesto, decepcionado o a punto de abandonarme.',
    examples: [
      {
        label: 'Tono de voz',
        description:
          'Noto un cambio mínimo en el tono de mi pareja, amigo o jefe y paso horas analizando si es enfado, frialdad o cansancio conmigo.',
      },
      {
        label: 'Demoras en respuesta',
        description:
          'Si alguien tarda más de lo habitual en responder un mensaje, asumo que está distanciándose de mí antes de considerar que simplemente está ocupado.',
      },
      {
        label: 'Lenguaje corporal',
        description:
          'Detecto microexpresiones de fastidio que otros no ven; o invento significados negativos en gestos inocentes.',
      },
      {
        label: 'Silencios',
        description:
          'Un silencio incómodo en una conversación lo interpreto como mi culpa, como si yo hubiera dicho algo inaceptable.',
      },
    ],
  },
  {
    id: 3,
    section: 'A',
    sectionTitle: 'Hipersensibilidad — Sensación de ser tolerado',
    dimension: 'rejectionPerception',
    text: 'Siento que las personas se cansan de mí o que mis amistades/relaciones están a punto de terminar, aunque no haya evidencia clara.',
    examples: [
      {
        label: 'Amistades',
        description:
          'Tengo la sensación constante de que mis amigos "toleran" mi presencia pero que realmente preferirían no incluirme; evito ser el que propone planes para no "molestar".',
      },
      {
        label: 'Pareja',
        description:
          'Siento que mi pareja en cualquier momento descubrirá que no valgo la pena y me dejará, aunque la relación sea estable.',
      },
      {
        label: 'Trabajo',
        description:
          'Creo que mis compañeros me consideran un estorbo o que mi jefe me tiene en la lista de despidos, sin señales objetivas de ello.',
      },
      {
        label: 'Familia',
        description:
          'Siento que mis padres o hermanos me quieren "por obligación" y que si no fuera familiar, no me elegirían.',
      },
    ],
  },
  {
    id: 4,
    section: 'A',
    sectionTitle: 'Hipersensibilidad — Necesidad de validación externa',
    dimension: 'rejectionPerception',
    text: 'Necesito constantes señales de validación externa para sentirme seguro/a de que no soy una carga o un problema para los demás.',
    examples: [
      {
        label: 'Reconfirmación',
        description:
          'Pregunto repetidamente a mi pareja o amigos "¿estás seguro/a de que no te molesté?" o "¿todavía te caigo bien?" después de interacciones normales.',
      },
      {
        label: 'Lectura de señales',
        description:
          'Si alguien no me da un cumplido o una demostración de afecto explícita durante varios días, siento que algo va mal en la relación.',
      },
      {
        label: 'Trabajo',
        description:
          'Necesito que mi jefe me diga explícitamente que mi trabajo es bueno; las ausencias de feedback las interpreto como desaprobación tácita.',
      },
      {
        label: 'Redes sociales',
        description:
          'Busco activamente reacciones positivas en redes o grupos como "prueba" de que no soy rechazado/a.',
      },
    ],
  },

  // ═══════════ SECCIÓN B: RESPUESTA EMOCIONAL INTENSA ═══════════
  {
    id: 5,
    section: 'B',
    sectionTitle: 'Intensidad emocional — Oleada física ante la crítica',
    dimension: 'emotionalIntensity',
    text: 'Cuando siento que alguien me rechaza o critica, experimento una oleada emocional intensa que se siente físicamente abrumadora.',
    examples: [
      {
        label: 'Físico',
        description:
          'Un comentario crítico o una mirada de desaprobación me generan calor en el pecho, nudo en la garganta, taquicardia o ganas de llorar inmediatas.',
      },
      {
        label: 'Duración',
        description:
          'Una crítica leve de hace horas sigue resonando en mi cuerpo como si acabara de pasar; no logro "sacármela de encima".',
      },
      {
        label: 'Intensidad desproporcionada',
        description:
          'Reconozco que la crítica fue menor o constructiva, pero mi reacción emocional fue de nivel 10 sobre una escala de 1 a 10.',
      },
      {
        label: 'Vergüenza',
        description:
          'La sensación dominante no es tristeza, sino una vergüenza profunda y paralizante, como si me hubieran "descubierto" como defectuoso/a.',
      },
    ],
  },
  {
    id: 6,
    section: 'B',
    sectionTitle: 'Intensidad emocional — Reacción abrupta o explosiva',
    dimension: 'emotionalIntensity',
    text: 'Reacciono de forma abrupta o explosiva (externa o internamente) cuando percibo que alguien me ignora, contradice o descarta.',
    examples: [
      {
        label: 'Externa',
        description:
          'Respondo con un tono más agudo de lo que quiero, me defiendo agresivamente, o cierro la conversación de golpe antes de que empeore.',
      },
      {
        label: 'Interna',
        description:
          'Externamente me quedo callado/a o sonrío, pero internamente siento una furia o desesperación que me ciega por segundos.',
      },
      {
        label: 'Llanto',
        description:
          'Críticas inesperadas, aunque sean menores, me hacen llorar de forma incontrolable, especialmente si son públicas o en el trabajo.',
      },
      {
        label: 'Cortar relaciones',
        description:
          'Mi instinto de autoprotección me dice "termina esta relación ahora antes de que te lastimen más", aunque la ofensa sea leve.',
      },
    ],
  },
  {
    id: 7,
    section: 'B',
    sectionTitle: 'Intensidad emocional — Tiempo de recuperación prolongado',
    dimension: 'emotionalIntensity',
    text: 'Después de una interacción donde percibí rechazo, necesito horas o días para recuperar mi equilibrio emocional.',
    examples: [
      {
        label: 'Rumia',
        description:
          'No puedo dejar de pensar en lo que pasó; repito la escena mentalmente una y otra vez.',
      },
      {
        label: 'Aislamiento',
        description:
          'Me encierro en mi habitación o evito contacto humano durante horas porque "no puedo con nadie más hoy".',
      },
      {
        label: 'Funcionalidad',
        description:
          'Mi capacidad para trabajar, estudiar o cuidarme se reduce drásticamente después de uno de estos episodios.',
      },
      {
        label: 'Sueño',
        description:
          'Me cuesta dormir porque mi cerebro reproduce la conversación en bucle buscando qué hice mal.',
      },
    ],
  },
  {
    id: 8,
    section: 'B',
    sectionTitle: 'Intensidad emocional — Confusión persona vs. idea',
    dimension: 'emotionalIntensity',
    text: 'Tengo dificultad para distinguir entre "no le gustó mi idea" y "no le gusto yo como persona".',
    examples: [
      {
        label: 'Trabajo',
        description:
          'Si rechazan mi propuesta en una reunión, siento que rechazaron a mí como profesional y como ser humano; es todo una sola cosa.',
      },
      {
        label: 'Opiniones',
        description:
          'Si alguien discrepa de mi punto de vista político o de gusto, siento que está atacando mi valía personal, no solo debatiendo ideas.',
      },
      {
        label: 'Pareja',
        description:
          'Si mi pareja prefiere no ver la película que yo sugerí, siento que está rechazando mi gusto y, por extensión, a mí.',
      },
      {
        label: 'Creatividad',
        description:
          'Si alguien critica algo que hice (un dibujo, una cena, un texto), no es "la obra" la que falló, sino yo como creador/a.',
      },
    ],
  },

  // ═══════════ SECCIÓN C: EVITACIÓN POR ANTICIPACIÓN DEL RECHAZO ═══════════
  {
    id: 9,
    section: 'C',
    sectionTitle: 'Evitación — No iniciar, no pedir, no expresar',
    dimension: 'anticipatoryAvoidance',
    text: 'Evito iniciar conversaciones, pedir ayuda o expresar necesidades por miedo a ser una carga o a que me rechacen.',
    examples: [
      {
        label: 'Pedir ayuda',
        description:
          'Necesito algo pero no pido ayuda porque "molestaría" o "me verían como débil"; prefiero sufrir solo/a.',
      },
      {
        label: 'Expresar desacuerdo',
        description:
          'No digo cuando algo no me gusta en una relación o trabajo porque el conflicto potencial me parece insoportable.',
      },
      {
        label: 'Contacto primero',
        description:
          'Rara vez soy yo quien escribe primero, propone quedar o dice "te extraño" porque el silencio del otro me confirmaría mi peor temor.',
      },
      {
        label: 'Necesidades emocionales',
        description:
          'No digo "necesito que me escuches" o "necesito un abrazo" porque siento que es exigente y que la otra persona dirá que no.',
      },
    ],
  },
  {
    id: 10,
    section: 'C',
    sectionTitle: 'Evitación — Postergación de proyectos por miedo al juicio',
    dimension: 'anticipatoryAvoidance',
    text: 'Postergo o abandono proyectos, metas o expresiones personales por miedo a que el resultado sea juzgado negativamente.',
    examples: [
      {
        label: 'Perfeccionismo paralizante',
        description:
          'No entrego un trabajo o no publico algo creativo porque "aún no está lo suficientemente bueno" (en realidad, porque el juicio externo me aterroriza).',
      },
      {
        label: 'Evitación social',
        description:
          'No voy a eventos donde no conozco a nadie porque la posibilidad de quedarme solo/a o ser excluido/a es insoportable.',
      },
      {
        label: 'Relaciones románticas',
        description:
          'No me acerco a alguien que me interesa porque anticipo el rechazo; prefiero no intentar a arriesgarme.',
      },
      {
        label: 'Opinión pública',
        description:
          'No participo en debates, foros o reuniones donde deba exponer una opinión porque la contradicción me sentiría como un ataque personal.',
      },
    ],
  },
  {
    id: 11,
    section: 'C',
    sectionTitle: 'Evitación — Dificultad para poner límites',
    dimension: 'anticipatoryAvoidance',
    text: 'Me cuesta establecer límites o decir "no" porque temo que la otra persona se enoje o me rechace.',
    examples: [
      {
        label: 'Trabajo',
        description:
          'Acepto tareas que no me corresponden, horarios abusivos o peticiones fuera de mi rol porque decir que no me parece peligroso socialmente.',
      },
      {
        label: 'Amistades',
        description:
          'Voy a eventos que no quiero, presto dinero que no puedo prestar o escucho problemas que me sobrecargan porque "si digo no, me dejarán de querer".',
      },
      {
        label: 'Familia',
        description:
          'Sigo tradiciones o expectativas familiares que no comparto porque el conflicto me parece más doloroso que la sumisión.',
      },
      {
        label: 'Pareja',
        description:
          'Hago cosas que no disfruto sexualmente, socialmente o domésticamente porque temo que mi pareja se distancie si expreso mis límites.',
      },
    ],
  },
  {
    id: 12,
    section: 'C',
    sectionTitle: 'Evitación — Hacerse invisible',
    dimension: 'anticipatoryAvoidance',
    text: 'He aprendido a ser "invisible" o a adaptarme excesivamente para no llamar la atención y así evitar el juicio ajeno.',
    examples: [
      {
        label: 'Personalidad camaleónica',
        description:
          'Cambio mis opiniones, gustos o forma de hablar según el grupo para encajar, hasta el punto de no saber quién soy sin audiencia.',
      },
      {
        label: 'Vestimenta / expresión',
        description:
          'Evito vestirme de formas que me gustan pero que considerarían "llamativas" porque no quiero que me miren ni me juzguen.',
      },
      {
        label: 'Logros',
        description:
          'No comparto mis éxitos porque "parecería presumido" y eso atraería envidia o crítica; minimizo lo que hago bien.',
      },
      {
        label: 'Espacio físico',
        description:
          'En grupos, elijo el asiento de atrás, no hablo a menos que me hablen, y trato de que mi presencia sea lo más neutra posible.',
      },
    ],
  },

  // ═══════════ SECCIÓN D: RUMIA Y AUTOCRÍTICA POST-EVENTO ═══════════
  {
    id: 13,
    section: 'D',
    sectionTitle: 'Rumia — Repaso mental post-interacción',
    dimension: 'rumination',
    text: 'Después de una interacción social, la repaso mentalmente buscando "errores" o señales de que la otra persona se molestó conmigo.',
    examples: [
      {
        label: 'Revisión nocturna',
        description:
          'Al acostarme, repaso mentalmente conversaciones del día analizando si dije algo inadecuado, si mi tono fue correcto, si me reí en el momento equivocado.',
      },
      {
        label: 'Análisis de mensajes',
        description:
          'Releo conversaciones de chat buscando señales de que la otra persona se enfrió o se molestó.',
      },
      {
        label: 'Escenarios alternativos',
        description:
          'Mi mente genera "lo que debería haber dicho" o "lo que probablemente malinterpretaron".',
      },
      {
        label: 'Confesión compulsiva',
        description:
          'A veces escribo a la persona al día siguiente para "disculparme" o "aclarar" algo que probablemente ni notaron.',
      },
    ],
  },
  {
    id: 14,
    section: 'D',
    sectionTitle: 'Rumia — Rencor persistente',
    dimension: 'rumination',
    text: 'Guardo rencor o me cuesta "soltar" interacciones donde sentí que fui tratado/a injustamente o de forma fría.',
    examples: [
      {
        label: 'Recuerdos persistentes',
        description:
          'Años después sigo recordando una humillación leve, un comentario despectivo o un rechazo antiguo con el mismo dolor emocional.',
      },
      {
        label: 'Lista mental',
        description:
          'Tengo una "lista" de personas que me hirieron y, aunque las relaciones continúan, nunca logro confiar plenamente en ellas de nuevo.',
      },
      {
        label: 'Fantasías de confrontación',
        description:
          'Imagino escenarios donde le digo a alguien cómo me lastimó, aunque nunca lo hago en realidad.',
      },
      {
        label: 'Evitación selectiva',
        description:
          'Evito lugares, personas o situaciones que me recuerdan un rechazo pasado, aunque el evento haya sido menor.',
      },
    ],
  },
  {
    id: 15,
    section: 'D',
    sectionTitle: 'Rumia — Autocrítica implacable',
    dimension: 'rumination',
    text: 'Mi autocrítica es implacable; cuando algo sale mal, mi primer instinto es culparme a mí mismo/a antes que buscar causas externas.',
    examples: [
      {
        label: 'Conflictos grupales',
        description:
          'Si un proyecto falla o un grupo se distancia, asumo que fui yo quien "lo arruinó" con mi comportamiento, aunque no tenga evidencia.',
      },
      {
        label: 'Relaciones rotas',
        description:
          'Cuando una amistad o pareja termina, mi narrativa interna es "no fui suficiente" o "hice algo mal" en lugar de "no éramos compatibles".',
      },
      {
        label: 'Crítica externa',
        description:
          'Si alguien me corrige, mi cerebro lo convierte en "soy incompetente" en lugar de "cometí un error puntual".',
      },
      {
        label: 'Éxitos minimizados',
        description:
          'Cuando algo sale bien, pienso "tuve suerte" o "los demás fueron amables conmigo"; no atribuyo el éxito a mi valía.',
      },
    ],
  },
  {
    id: 16,
    section: 'D',
    sectionTitle: 'Rumia — Perfeccionismo y pertenencia condicional',
    dimension: 'rumination',
    text: 'Siento que debo ser "perfecto/a" o excepcional para merecer estar en una relación, grupo o trabajo; los errores me hacen sentir que no pertenezco.',
    examples: [
      {
        label: 'Pertenencia condicional',
        description:
          'Siento que mi lugar en cualquier grupo está en constante riesgo y que debo "ganármelo" todos los días con mi rendimiento o mi amabilidad.',
      },
      {
        label: 'Miedo al descubrimiento',
        description:
          'Temo que en cualquier momento descubran que "no soy tan listo/a, talentoso/a o agradable como creen" y me expulsen.',
      },
      {
        label: 'Síndrome del impostor',
        description:
          'Incluso cuando recibo elogios genuinos, pienso que la persona no me conoce del todo o que pronto se dará cuenta de mi "fraude".',
      },
      {
        label: 'Amor condicional',
        description:
          'Siento que si dejo de ser útil, agradable o exitoso/a, las personas dejarán de quererme o de necesitarme.',
      },
    ],
  },
];

export const RSD_SECTIONS = [
  { id: 'A', title: 'Hipersensibilidad al rechazo percibido', range: [0, 3] },
  { id: 'B', title: 'Respuesta emocional intensa a la crítica', range: [4, 7] },
  { id: 'C', title: 'Evitación por anticipación del rechazo', range: [8, 11] },
  { id: 'D', title: 'Rumia y autocrítica post-evento', range: [12, 15] },
];

export default rsdQuestions;
