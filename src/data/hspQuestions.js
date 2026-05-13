const hspQuestions = [
  // ═══════════ SECCIÓN A: PROFUNDIDAD DE PROCESAMIENTO (4 ítems) ═══════════
  {
    id: 1,
    section: 'A',
    sectionTitle: 'Profundidad de procesamiento — Análisis detallado',
    dimension: 'deepProcessing',
    text: 'Proceso la información de forma profunda y detallada; mi mente analiza automáticamente múltiples consecuencias o significados de una situación.',
    examples: [
      {
        label: 'Decisiones simples',
        description:
          'Elegir un restaurante o comprar un electrodoméstico me lleva a investigar exhaustivamente porque mi mente genera automáticamente escenarios de qué podría salir mal.',
      },
      {
        label: 'Conversaciones',
        description:
          'Horas o días después de una charla casual, sigo repasando mentalmente frases dichas, tonos o posibles interpretaciones ocultas.',
      },
      {
        label: 'Observación',
        description:
          'Noto detalles sutiles en un ambiente (cambios de luz, microexpresiones, silencios incómodos) que otros parecen pasar por alto.',
      },
      {
        label: 'Sueños',
        description:
          'Mis sueños son vívidos, complejos y los recuerdo con detalle; a veces los analizo como si tuvieran mensajes profundos.',
      },
    ],
  },
  {
    id: 2,
    section: 'A',
    sectionTitle: 'Profundidad de procesamiento — Necesidad de soledad reflexiva',
    dimension: 'deepProcessing',
    text: 'Necesito tiempo a solas para procesar experiencias, ideas o emociones antes de actuar o hablar.',
    examples: [
      {
        label: 'Después de eventos',
        description:
          'Tras una reunión, fiesta o día intenso de trabajo, necesito desconectar solo/a para ordenar mentalmente lo vivido antes de poder descansar.',
      },
      {
        label: 'Antes de decisiones',
        description:
          'Prefiero pensar las cosas durante horas o días antes de dar una respuesta definitiva; las decisiones apresuradas me inquietan.',
      },
      {
        label: 'Conversaciones difíciles',
        description:
          'Si alguien me plantea un conflicto, necesito retirarme a procesarlo antes de responder; reaccionar en el momento me sale forzado o inadecuado.',
      },
      {
        label: 'Creatividad',
        description:
          'Cuando tengo una idea, no la ejecuto inmediatamente; la dejo "cocinando" en mi mente durante días, enriqueciéndola con detalles.',
      },
    ],
  },
  {
    id: 3,
    section: 'A',
    sectionTitle: 'Profundidad de procesamiento — Dificultad bajo presión',
    dimension: 'deepProcessing',
    text: 'Me cuesta funcionar bien bajo presión de tiempo, observación directa o cuando me piden respuestas inmediatas.',
    examples: [
      {
        label: 'Exámenes / orales',
        description:
          'Me bloqueo o mi mente se nubla cuando alguien me observa mientras trabajo o cuando hay un cronómetro visible.',
      },
      {
        label: 'Trabajo',
        description:
          'Las lluvias de ideas rápidas o las reuniones donde se exige productividad inmediata me agobian; mi mejor trabajo sale cuando tengo tiempo de reflexionar.',
      },
      {
        label: 'Venta / negociación',
        description:
          'Me cuesta pensar con claridad si el vendedor o interlocutor me observa fijamente esperando una respuesta.',
      },
      {
        label: 'Cocina / tareas bajo presión',
        description:
          'Si alguien me observa cocinar o me apura mientras hago algo, cometo más errores que si estoy solo.',
      },
    ],
  },
  {
    id: 4,
    section: 'A',
    sectionTitle: 'Profundidad de procesamiento — Conciencia ética y consecuencias',
    dimension: 'deepProcessing',
    text: 'Tengo una conciencia aguda de las consecuencias éticas, morales o interpersonales de mis actos; me afecta profundamente hacer daño sin querer.',
    examples: [
      {
        label: 'Remordimientos',
        description:
          'Recuerdo una observación hiriente que hice hace años y aún me mortifica, aunque la otra persona ni se acuerde.',
      },
      {
        label: 'Toma de decisiones',
        description:
          'Evito situaciones donde podría herir a alguien indirectamente; me cuesta pasar por encima de otros para lograr mis objetivos.',
      },
      {
        label: 'Noticias / películas',
        description:
          'Las noticias de violencia o sufrimiento animal o humano me afectan profundamente y pueden arruinarme el día; evito ciertos contenidos.',
      },
      {
        label: 'Honestidad',
        description:
          'Siento una tensión física si digo una mentira piadosa o si omito información importante, aunque sea socialmente conveniente.',
      },
    ],
  },

  // ═══════════ SECCIÓN B: SOBRESTIMULACIÓN Y NECESIDAD DE REPOSO (4 ítems) ═══════════
  {
    id: 5,
    section: 'B',
    sectionTitle: 'Sobrestimulación — Agotamiento en entornos intensos',
    dimension: 'overStimulation',
    text: 'Los entornos con muchos estímulos simultáneos (ruido, gente, luces, movimiento) me agotan rápidamente, aunque no me sienta ansioso.',
    examples: [
      {
        label: 'Centros comerciales',
        description:
          'Después de 30 minutos en un mall o supermercado grande siento que mi cerebro "se llena" y necesito salir, aunque esté de buen humor.',
      },
      {
        label: 'Fiestas',
        description:
          'No es que no disfrute socializar, pero después de 1-2 horas siento que se acabó mi batería y necesito un espacio tranquilo.',
      },
      {
        label: 'Viajes',
        description:
          'Un día de turismo intenso (museos, transporte, ruido) me deja más exhausto que a mis acompañantes; necesito regresar al hotel a recargar.',
      },
      {
        label: 'Open offices',
        description:
          'Un día completo en oficina abierta me deja tan agotado que no tengo energía para nada más en la noche.',
      },
    ],
  },
  {
    id: 6,
    section: 'B',
    sectionTitle: 'Sobrestimulación — Necesidad de soledad reparadora',
    dimension: 'overStimulation',
    text: 'Necesito períodos de soledad o silencio para recuperarme, incluso cuando las actividades sociales han sido agradables.',
    examples: [
      {
        label: 'Fines de semana',
        description:
          'Después de un sábado social, el domingo lo necesito casi en completo silencio para sentirme yo de nuevo.',
      },
      {
        label: 'Pareja / convivencia',
        description:
          'Aunque ame a mi pareja, necesito que haya momentos del día donde estemos en la misma casa pero sin interactuar.',
      },
      {
        label: 'Vacaciones',
        description:
          'Prefiero vacaciones tranquilas a itinerarios agitados; incluso en un viaje placentero necesito "días de descanso del descanso".',
      },
      {
        label: 'Hobbies',
        description:
          'Mis momentos de recarga son solitarios (leer, caminar solo, música con audífonos), no socializar.',
      },
    ],
  },
  {
    id: 7,
    section: 'B',
    sectionTitle: 'Sobrestimulación — Dificultad con cambios e imprevistos',
    dimension: 'overStimulation',
    text: 'Los cambios bruscos de planes, imprevistos o la falta de tiempo de transición entre actividades me desestabilizan.',
    examples: [
      {
        label: 'Transiciones',
        description:
          'Pasar directamente del trabajo a una reunión social sin un puente de 15-30 minutos para mí me resulta agotador.',
      },
      {
        label: 'Imprevistos',
        description:
          'Alguien aparece sin avisar o cambia el plan de último momento; mi sistema necesita tiempo para reajustar internamente.',
      },
      {
        label: 'Fines de semana',
        description:
          'Si el sábado está lleno de planes inesperados, el domingo me siento "colgado" o irritable.',
      },
      {
        label: 'Trabajo',
        description:
          'Las reuniones urgentes que interrumpen mi flujo me cuestan más que a otros; no es solo la interrupción, es la falta de tiempo para prepararme mentalmente.',
      },
    ],
  },
  {
    id: 8,
    section: 'B',
    sectionTitle: 'Sobrestimulación — Señales físicas de sobrecarga',
    dimension: 'overStimulation',
    text: 'Cuando estoy sobrestimulado, mi cuerpo envía señales claras: dolor de cabeza, tensión muscular, irritabilidad o necesidad imperiosa de aislamiento.',
    examples: [
      {
        label: 'Dolor físico',
        description:
          'Después de un día ruidoso o social, me despierto con dolor de cabeza o tensión en mandíbula y cuello sin razón médica aparente.',
      },
      {
        label: 'Irritabilidad',
        description:
          'Cuando estoy "lleno" de estímulos, todo me molesta (sonidos, que me hablen, que me toquen); puedo ser cortante sin querer.',
      },
      {
        label: 'Aislamiento compulsivo',
        description:
          'Llego a un punto donde debo cerrar la puerta, apagar las luces y no hablar con nadie; no es tristeza, es sobrecarga.',
      },
      {
        label: 'Sueño alterado',
        description:
          'Las noches después de días intensos sueño de forma agitada o me cuesta conciliar el sueño aunque esté físicamente cansado.',
      },
    ],
  },

  // ═══════════ SECCIÓN C: EMPATÍA Y RESPUESTA EMOCIONAL INTENSA (4 ítems) ═══════════
  {
    id: 9,
    section: 'C',
    sectionTitle: 'Empatía — Contagio emocional',
    dimension: 'emotionalIntensity',
    text: 'Siento las emociones de los demás como si fueran mías; a veces no distingo si lo que siento es mío o del otro.',
    examples: [
      {
        label: 'Contagio emocional',
        description:
          'Si alguien cercano está ansioso, yo también me pongo ansioso aunque no tenga motivo propio; si está triste, mi día se nubla.',
      },
      {
        label: 'Ambientes tensos',
        description:
          'Entrar a una habitación donde acaban de discutir me genera incomodidad física inmediata, aunque nadie haya dicho nada.',
      },
      {
        label: 'Películas / libros',
        description:
          'Me identifico tan profundamente con personajes que siento su dolor o alegría con intensidad real; a veces necesito días para desengancharme.',
      },
      {
        label: 'Límites difusos',
        description:
          'Cuando un amigo cuenta un problema, termino cargando con su angustia y me cuesta "dejarlo" cuando la conversación termina.',
      },
    ],
  },
  {
    id: 10,
    section: 'C',
    sectionTitle: 'Empatía — Conmoción estética y trascendencia',
    dimension: 'emotionalIntensity',
    text: 'Las experiencias estéticas, artísticas o de belleza natural me conmueven profundamente, a veces hasta las lágrimas o una sensación de trascendencia.',
    examples: [
      {
        label: 'Música',
        description:
          'Una canción puede provocarme una respuesta física intensa (escalofríos, nudo en la garganta, lágrimas) por su letra, melodía o recuerdo asociado.',
      },
      {
        label: 'Naturaleza',
        description:
          'Un atardecer, una montaña o el mar en calma pueden generarme una sensación de asombro que me paraliza o me hace sentir pequeño en el buen sentido.',
      },
      {
        label: 'Arte',
        description:
          'En un museo, una obra puede impactarme tanto que necesito sentarme o alejarme; no es solo gustar, es una experiencia visceral.',
      },
      {
        label: 'Detalles sutiles',
        description:
          'La luz entrando por una ventana, el olor de la lluvia en tierra, una textura agradable pueden generarme una oleada de paz o gratitud intensa.',
      },
    ],
  },
  {
    id: 11,
    section: 'C',
    sectionTitle: 'Empatía — Sensibilidad a críticas y conflictos',
    dimension: 'emotionalIntensity',
    text: 'Las críticas, los conflictos o el desacuerdo me afectan desproporcionadamente; me cuesta "dejar pasar" comentarios negativos.',
    examples: [
      {
        label: 'Retroalimentación',
        description:
          'Un comentario constructivo en el trabajo me lo tomo personal y lo analizo durante días; mi primer instinto es sentirme herido, no mejorar.',
      },
      {
        label: 'Conflictos',
        description:
          'Una discusión leve puede dejarme temblando o con náuseas; necesito horas para recuperar la calma física.',
      },
      {
        label: 'Rechazo social',
        description:
          'Si alguien no me saluda o me ignora en un grupo, asumo automáticamente que hice algo mal y lo rumio extensamente.',
      },
      {
        label: 'Desacuerdo',
        description:
          'Incluso cuando sé que tengo razón, confrontar a alguien me genera una angustia física que evito a toda costa.',
      },
    ],
  },
  {
    id: 12,
    section: 'C',
    sectionTitle: 'Empatía — Mundo interior vívido',
    dimension: 'emotionalIntensity',
    text: 'Tengo una relación intensa con mi mundo interior: fantasías, recuerdos, reflexiones o diálogos internos muy vívidos.',
    examples: [
      {
        label: 'Fantasías',
        description:
          'Tengo mundos, historias o escenarios imaginarios detallados a los que vuelvo mentalmente desde la infancia.',
      },
      {
        label: 'Diálogo interno',
        description:
          'Mi cabeza es un constante monólogo o diálogo; pienso en "yo" como si conversara conmigo mismo o con versiones de otros.',
      },
      {
        label: 'Recuerdos sensoriales',
        description:
          'Puedo revivir recuerdos con detalles sensoriales (olores, texturas, emociones) como si estuviera allí de nuevo.',
      },
      {
        label: 'Procesamiento nocturno',
        description:
          'Antes de dormir, mi mente repasa el día, crea escenarios alternativos o imagina conversaciones que nunca tendré.',
      },
    ],
  },

  // ═══════════ SECCIÓN D: SENSIBILIDAD SENSORIAL SUTIL (4 ítems) ═══════════
  {
    id: 13,
    section: 'D',
    sectionTitle: 'Sensorial — Percepción sutil de estímulos',
    dimension: 'sensorySensitivity',
    text: 'Percibo estímulos sensoriales que otros no notan, o los noto con una intensidad que me resulta abrumadora o placentera.',
    examples: [
      {
        label: 'Sonidos',
        description:
          'Escucho el zumbido de la nevera, el tic-tac de un reloj o conversaciones a distancia que otros filtran sin problema.',
      },
      {
        label: 'Luces',
        description:
          'Las luces fluorescentes parpadean o tienen un tono que me molesta; prefiero luz natural o lámparas cálidas.',
      },
      {
        label: 'Texturas',
        description:
          'Noto inmediatamente si una tela es sintética, áspera o tiene una etiqueta; ciertos materiales me repelen físicamente.',
      },
      {
        label: 'Sabores / olores',
        description:
          'Percibo notas sutiles en comidas o vinos que otros no detectan; los olores fuertes (perfumes, limpieza) me invaden.',
      },
    ],
  },
  {
    id: 14,
    section: 'D',
    sectionTitle: 'Sensorial — Necesidad de entorno ajustado',
    dimension: 'sensorySensitivity',
    text: 'Me afectan profundamente las atmósferas sensoriales de los espacios; necesito que mi entorno esté "a mi medida" para sentirme bien.',
    examples: [
      {
        label: 'Hogar',
        description:
          'Dedico mucho tiempo a ajustar la iluminación, temperatura, olores y orden de mi espacio; cuando no está como debe, me cuesta relajarme.',
      },
      {
        label: 'Lugares ajenos',
        description:
          'Entro a una casa u oficina y siento inmediatamente si la atmósfera me agrada o me rechaza, aunque no sepa explicar por qué.',
      },
      {
        label: 'Ropa',
        description:
          'Prefiero pocas prendas pero de telas específicas; uso ropa interior sin costuras o doblo etiquetas desde siempre.',
      },
      {
        label: 'Alimentación',
        description:
          'Soy selectivo con texturas de comida (evito ciertas consistencias aunque el sabor sea bueno); los sabores muy intensos me abruman.',
      },
    ],
  },
  {
    id: 15,
    section: 'D',
    sectionTitle: 'Sensorial — Caos visual y desorden',
    dimension: 'sensorySensitivity',
    text: 'Los entornos caóticos, desordenados o visualmente "ruidosos" me dificultan concentrarme o me generan ansiedad.',
    examples: [
      {
        label: 'Desorden visual',
        description:
          'No puedo trabajar si hay objetos fuera de lugar en mi campo visual; necesito ordenar antes de concentrarme.',
      },
      {
        label: 'Multitarea visual',
        description:
          'Ver notificaciones, papeles y objetos sobre el escritorio simultáneamente me dispersa más que a otros.',
      },
      {
        label: 'Decoración',
        description:
          'Los espacios con demasiados colores, cuadros, muebles o patrones me agobian; prefiero minimalismo o ambientes limpios.',
      },
      {
        label: 'Pantallas',
        description:
          'Tener muchas pestañas abiertas o un escritorio digital desordenado me genera la misma ansiedad que el desorden físico.',
      },
    ],
  },
  {
    id: 16,
    section: 'D',
    sectionTitle: 'Sensorial — Búsqueda de experiencias profundas',
    dimension: 'sensorySensitivity',
    text: 'Busco activamente experiencias sensoriales profundas, significativas o de cierta intensidad controlada que me hagan sentir vivo.',
    examples: [
      {
        label: 'Sensorial',
        description:
          'Disfruto profundamente de un masaje fuerte, una ducha con cambios de temperatura, acariciar a mi mascota o sumergir las manos en harina o agua.',
      },
      {
        label: 'Emocional',
        description:
          'Prefiero conversaciones profundas y significativas a charlas superficiales; una charla íntima me nutre más que una fiesta.',
      },
      {
        label: 'Estético',
        description:
          'Busco deliberadamente atardeceres, conciertos, naturaleza o arte que me generen esa sensación de plenitud.',
      },
      {
        label: 'Intelectual',
        description:
          'Me atraen temas complejos, metáforas, simbolismos o teorías abstractas; lo superficial me aburre rápidamente.',
      },
    ],
  },
];

export const HSP_SECTIONS = [
  { id: 'A', title: 'Profundidad de procesamiento', range: [0, 3] },
  { id: 'B', title: 'Sobrestimulación y necesidad de reposo', range: [4, 7] },
  { id: 'C', title: 'Empatía y respuesta emocional intensa', range: [8, 11] },
  { id: 'D', title: 'Sensibilidad sensorial sutil', range: [12, 15] },
];

export default hspQuestions;
