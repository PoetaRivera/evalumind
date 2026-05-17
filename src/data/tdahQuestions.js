// ═══════════════════════════════════════════════════
// ASRS-5 — Adult ADHD Self-Report Scale (DSM-5)
// Kessler et al. (2005), Psychol Med, 35(2), 245-256
// Ustun et al. (2017), JAMA Psychiatry, 74(5), 520-527
// DOI: 10.1017/S0033291704002892
// DOI: 10.1001/jamapsychiatry.2017.0298
// Adaptación española: Ramos-Quiroga et al. (2009)
// ═══════════════════════════════════════════════════

const tdahQuestions = [
  // ═══════════ PARTE A — SCREENER (6 ítems) ═══════════

  // A1 — Inatención
  {
    id: 1,
    section: 'A',
    sectionTitle: 'Parte A — Screener',
    dimension: 'inattention',
    domain: 'dsm5-inattention',
    text: 'Tengo dificultad para concentrarme en lo que me dicen, incluso cuando me hablan directamente.',
    examples: [
      {
        label: 'Conversaciones',
        description: 'En una charla cara a cara, mi mente se va a otro tema y pierdo el hilo de lo que me están diciendo.',
      },
      {
        label: 'Reuniones',
        description: 'En el trabajo o estudio, alguien me explica algo y me doy cuenta de que no escuché los últimos segundos; asiento por inercia.',
      },
      {
        label: 'Instrucciones',
        description: 'Recibo indicaciones verbales y después no recuerdo detalles clave que eran importantes.',
      },
      {
        label: 'Videollamadas',
        description: 'En una llamada virtual, termino revisando otra pestaña y pierdo información relevante.',
      },
    ],
  },

  // A2 — Inatención
  {
    id: 2,
    section: 'A',
    sectionTitle: 'Parte A — Screener',
    dimension: 'inattention',
    domain: 'dsm5-inattention',
    text: 'Me cuesta terminar los detalles finales de un proyecto una vez que las partes más difíciles están resueltas.',
    examples: [
      {
        label: 'Trabajo / estudio',
        description: 'Completo el análisis o la parte creativa pero dejo pendiente la revisión final, el formato o el envío.',
      },
      {
        label: 'Proyectos personales',
        description: 'El mueble está armado pero falta atornillar las manijas; el curso está hecho pero no pedí el certificado.',
      },
      {
        label: 'Trámites',
        description: 'Junto todos los papeles pero no los entrego; lleno el formulario pero olvido adjuntar algo.',
      },
      {
        label: 'Hogar',
        description: 'Lavo la ropa pero se queda en la lavadora; cocino pero no limpio la cocina después.',
      },
    ],
  },

  // A3 — Inatención
  {
    id: 3,
    section: 'A',
    sectionTitle: 'Parte A — Screener',
    dimension: 'inattention',
    domain: 'dsm5-inattention',
    text: 'Tengo dificultad para recordar citas, compromisos u obligaciones.',
    examples: [
      {
        label: 'Citas',
        description: 'Olvido reuniones agendadas aunque las tenga en el calendario; necesito múltiples recordatorios.',
      },
      {
        label: 'Compromisos sociales',
        description: 'Digo que voy a un evento y se me pasa la fecha; o acuerdo llamar a alguien y me entero días después.',
      },
      {
        label: 'Pagos / fechas límite',
        description: 'Recuerdo que debía pagar algo el día después del vencimiento; entrego trabajos fuera de plazo.',
      },
      {
        label: 'Mensajes',
        description: 'Leo un mensaje, pienso "respondo después" y lo olvido por completo; dejo conversaciones sin cerrar.',
      },
    ],
  },

  // A4 — Inatención
  {
    id: 4,
    section: 'A',
    sectionTitle: 'Parte A — Screener',
    dimension: 'inattention',
    domain: 'dsm5-inattention',
    text: 'Tengo dificultad para organizar tareas o actividades que requieren varios pasos.',
    examples: [
      {
        label: 'Priorización',
        description: 'Con varias tareas pendientes, no sé por dónde empezar; termino haciendo algo que no era urgente.',
      },
      {
        label: 'Planificación',
        description: 'Subestimo el tiempo necesario y termino apurado o entregando incompleto.',
      },
      {
        label: 'Secuenciación',
        description: 'Me pierdo en los pasos de un trámite o proyecto porque no sigo un orden lógico.',
      },
      {
        label: 'Materiales',
        description: 'Pierdo tiempo buscando documentos, herramientas o recursos que debería tener preparados.',
      },
    ],
  },

  // A5 — Hiperactividad-Impulsividad
  {
    id: 5,
    section: 'A',
    sectionTitle: 'Parte A — Screener',
    dimension: 'hyperactivityImpulsivity',
    domain: 'dsm5-hyperactivity-impulsivity',
    text: 'Muevo o retuerzo las manos o los pies, o me retuerzo en el asiento cuando tengo que estar sentado por mucho tiempo.',
    examples: [
      {
        label: 'Reuniones / clases',
        description: 'Cambio de postura constantemente; tamborileo con los dedos; muevo la pierna sin darme cuenta.',
      },
      {
        label: 'Cine / teatro',
        description: 'A la media hora ya estoy inquieto, cruzando y descruzando piernas.',
      },
      {
        label: 'Transporte',
        description: 'En viajes largos necesito parar o moverme; me siento físicamente incómodo.',
      },
      {
        label: 'Trabajo de escritorio',
        description: 'Me levanto frecuentemente con cualquier excusa; prefiero trabajar de pie o caminando.',
      },
    ],
  },

  // A6 — Hiperactividad-Impulsividad
  {
    id: 6,
    section: 'A',
    sectionTitle: 'Parte A — Screener',
    dimension: 'hyperactivityImpulsivity',
    domain: 'dsm5-hyperactivity-impulsivity',
    text: 'Me siento excesivamente activo o impulsado a hacer cosas, como si tuviera un motor interno que no se apaga.',
    examples: [
      {
        label: 'Sensación física',
        description: 'Siento una energía interna constante; incluso estando cansado, mi cuerpo quiere estar en movimiento.',
      },
      {
        label: 'Mental',
        description: 'Mi mente no se detiene: ideas, planes, preocupaciones en bucle, especialmente al intentar dormir.',
      },
      {
        label: 'Descanso',
        description: 'Los fines de semana o vacaciones me cuesta "apagar"; siento que debería estar haciendo algo productivo.',
      },
      {
        label: 'Otros lo notan',
        description: 'Me han dicho que parezco acelerado, que voy "a mil por hora" o que transmito inquietud.',
      },
    ],
  },

  // ═══════════ PARTE B — ÍTEMS ADICIONALES (12 ítems) ═══════════

  // B7 — Inatención
  {
    id: 7,
    section: 'B',
    sectionTitle: 'Parte B — Evaluación complementaria',
    dimension: 'inattention',
    domain: 'dsm5-inattention',
    text: 'Cometo errores por descuido en tareas que requieren atención a los detalles, aunque las conozca bien.',
    examples: [
      {
        label: 'Escritura / digital',
        description: 'Al escribir mensajes o documentos, omito palabras, letras o signos sin darme cuenta hasta que alguien lo señala.',
      },
      {
        label: 'Números / datos',
        description: 'En hojas de cálculo o finanzas, copio mal cifras o me salto celdas.',
      },
      {
        label: 'Revisión',
        description: 'Reviso un trabajo "con cuidado" y aun así no veo errores obvios que otros detectan de inmediato.',
      },
      {
        label: 'Lectura de instrucciones',
        description: 'Leo un manual o una receta y después descubro que omití un paso importante sin querer.',
      },
    ],
  },

  // B8 — Inatención
  {
    id: 8,
    section: 'B',
    sectionTitle: 'Parte B — Evaluación complementaria',
    dimension: 'inattention',
    domain: 'dsm5-inattention',
    text: 'Tengo dificultad para mantener la atención en tareas o actividades recreativas.',
    examples: [
      {
        label: 'Lectura',
        description: 'Leo tres páginas y no puedo resumir de qué trataban; necesito releer varias veces.',
      },
      {
        label: 'Documentos largos',
        description: 'Evito leer informes extensos o los escaneo superficialmente perdiendo información clave.',
      },
      {
        label: 'Pasatiempos',
        description: 'Incluso en actividades que disfruto, mi atención se desvía después de un rato.',
      },
      {
        label: 'Películas / series',
        description: 'Pierdo el hilo de la trama y tengo que rebobinar o pregunto qué pasó.',
      },
    ],
  },

  // B9 — Inatención
  {
    id: 9,
    section: 'B',
    sectionTitle: 'Parte B — Evaluación complementaria',
    dimension: 'inattention',
    domain: 'dsm5-inattention',
    text: 'Me distraigo fácilmente por estímulos externos o pensamientos no relacionados.',
    examples: [
      {
        label: 'Ruidos',
        description: 'Un sonido leve —un teléfono vibrando, alguien tosiendo— me saca completamente de lo que estaba haciendo.',
      },
      {
        label: 'Pensamientos intrusivos',
        description: 'Estoy trabajando y de repente estoy planeando algo totalmente ajeno; mi mente deriva sin control.',
      },
      {
        label: 'Notificaciones',
        description: 'Una notificación me lleva a revisar el celular y pierdo el hilo de la tarea original.',
      },
      {
        label: 'Conversaciones',
        description: 'En una charla, una palabra dispara una idea y dejo de escuchar mientras desarrollo ese pensamiento.',
      },
    ],
  },

  // B10 — Hiperactividad-Impulsividad
  {
    id: 10,
    section: 'B',
    sectionTitle: 'Parte B — Evaluación complementaria',
    dimension: 'hyperactivityImpulsivity',
    domain: 'dsm5-hyperactivity-impulsivity',
    text: 'Me levanto de mi asiento en situaciones donde se espera que permanezca sentado.',
    examples: [
      {
        label: 'Reuniones',
        description: 'Encuentro excusas para levantarme: ir al baño, servir agua, buscar algo.',
      },
      {
        label: 'Eventos formales',
        description: 'En ceremonias, conferencias o funerales, siento una urgencia física de ponerme de pie.',
      },
      {
        label: 'Comidas',
        description: 'No logro permanecer sentado durante toda una comida; me levanto entre platos.',
      },
      {
        label: 'Cine / teatro',
        description: 'A los 40 minutos ya estoy de pie o caminando por el pasillo.',
      },
    ],
  },

  // B11 — Hiperactividad-Impulsividad
  {
    id: 11,
    section: 'B',
    sectionTitle: 'Parte B — Evaluación complementaria',
    dimension: 'hyperactivityImpulsivity',
    domain: 'dsm5-hyperactivity-impulsivity',
    text: 'Me siento inquieto o con dificultad para relajarme durante el tiempo libre.',
    examples: [
      {
        label: 'Fines de semana',
        description: 'No logro estar sin hacer nada; necesito llenar el tiempo con actividades o estímulos.',
      },
      {
        label: 'Vacaciones',
        description: 'Me cuesta desconectar; termino revisando correos o planificando en vez de descansar.',
      },
      {
        label: 'Tiempo en casa',
        description: 'Ver una película entera o leer un rato sin interrupciones me resulta casi imposible.',
      },
      {
        label: 'Antes de dormir',
        description: 'Mi mente sigue activa repasando el día o planificando el siguiente; tardo en "apagarme".',
      },
    ],
  },

  // B12 — Hiperactividad-Impulsividad
  {
    id: 12,
    section: 'B',
    sectionTitle: 'Parte B — Evaluación complementaria',
    dimension: 'hyperactivityImpulsivity',
    domain: 'dsm5-hyperactivity-impulsivity',
    text: 'Hablo en exceso o tengo dificultad para guardar silencio en situaciones que lo requieren.',
    examples: [
      {
        label: 'Conversaciones',
        description: 'Ocupo más tiempo del que me corresponde hablando; doy detalles innecesarios.',
      },
      {
        label: 'Reuniones',
        description: 'Siento presión por aportar algo y termino hablando más que los demás.',
      },
      {
        label: 'Mensajes',
        description: 'Escribo párrafos largos cuando una frase bastaría; envío múltiples mensajes seguidos.',
      },
      {
        label: 'Silencio incómodo',
        description: 'Lleno los silencios en conversaciones aunque no tenga nada relevante que decir.',
      },
    ],
  },

  // B13 — Hiperactividad-Impulsividad
  {
    id: 13,
    section: 'B',
    sectionTitle: 'Parte B — Evaluación complementaria',
    dimension: 'hyperactivityImpulsivity',
    domain: 'dsm5-hyperactivity-impulsivity',
    text: 'Respondo abruptamente o completo las frases de otros antes de que terminen de hablar.',
    examples: [
      {
        label: 'Anticipación',
        description: '"Ya sé lo que vas a decir" — y respondo antes de escuchar la pregunta completa.',
      },
      {
        label: 'Conversaciones',
        description: 'Interrumpo sin darme cuenta; luego me disculpo porque "se me escapó".',
      },
      {
        label: 'Debates',
        description: 'Replico inmediatamente sin procesar lo que acaban de decir; después me doy cuenta de que malinterpreté.',
      },
      {
        label: 'Instrucciones',
        description: 'Empiezo a hacer algo antes de que terminen de explicármelo; luego tengo que preguntar de nuevo.',
      },
    ],
  },

  // B14 — Hiperactividad-Impulsividad
  {
    id: 14,
    section: 'B',
    sectionTitle: 'Parte B — Evaluación complementaria',
    dimension: 'hyperactivityImpulsivity',
    domain: 'dsm5-hyperactivity-impulsivity',
    text: 'Tengo dificultad para esperar mi turno en situaciones grupales.',
    examples: [
      {
        label: 'Filas',
        description: 'Hacer cola me genera una impaciencia desproporcionada; busco atajos o me voy.',
      },
      {
        label: 'Conversaciones grupales',
        description: 'Me cuesta esperar a que otros terminen para hablar; intervengo antes de mi turno.',
      },
      {
        label: 'Tráfico',
        description: 'La espera en congestión vehicular me resulta particularmente frustrante.',
      },
      {
        label: 'Turnos',
        description: 'En juegos, presentaciones o dinámicas grupales, me adelanto sin darme cuenta.',
      },
    ],
  },

  // B15 — Hiperactividad-Impulsividad
  {
    id: 15,
    section: 'B',
    sectionTitle: 'Parte B — Evaluación complementaria',
    dimension: 'hyperactivityImpulsivity',
    domain: 'dsm5-hyperactivity-impulsivity',
    text: 'Interrumpo o me entrometo en las actividades de otros.',
    examples: [
      {
        label: 'Conversaciones ajenas',
        description: 'Escucho una discusión cercana y "entro" con mi opinión sin que me la pidan.',
      },
      {
        label: 'Trabajo en equipo',
        description: '"Es más rápido si lo hago yo" y asumo el control sin consultar al grupo.',
      },
      {
        label: 'Espacio personal',
        description: 'Tomo objetos prestados sin preguntar o uso el espacio de otro sin notar que estoy invadiendo.',
      },
      {
        label: 'Planes ajenos',
        description: 'Cambio o "optimizo" planes que otros han hecho sin considerar si quieren mi intervención.',
      },
    ],
  },

  // B16 — Hiperactividad-Impulsividad
  {
    id: 16,
    section: 'B',
    sectionTitle: 'Parte B — Evaluación complementaria',
    dimension: 'hyperactivityImpulsivity',
    domain: 'dsm5-hyperactivity-impulsivity',
    text: 'Tomo decisiones impulsivas sin considerar plenamente las consecuencias a largo plazo.',
    examples: [
      {
        label: 'Compras',
        description: 'Compro algo costoso por impulso y me arrepiento después; gasto más de lo planeado.',
      },
      {
        label: 'Mensajes / redes',
        description: 'Publico o envío algo en caliente que luego borro o lamento.',
      },
      {
        label: 'Compromisos',
        description: 'Digo "sí" sin revisar mi disponibilidad real; me sobrecargo de obligaciones.',
      },
      {
        label: 'Cambios de vida',
        description: 'Renuncio, termino relaciones o tomo decisiones importantes sin un período de reflexión.',
      },
    ],
  },

  // B17 — Hiperactividad-Impulsividad
  {
    id: 17,
    section: 'B',
    sectionTitle: 'Parte B — Evaluación complementaria',
    dimension: 'hyperactivityImpulsivity',
    domain: 'dsm5-hyperactivity-impulsivity',
    text: 'Me describirían como una persona que actúa sin pensar o "primero actúa, después piensa".',
    examples: [
      {
        label: 'Reacciones',
        description: 'Respondo a un correo o mensaje inmediatamente y después me doy cuenta de que debí esperar.',
      },
      {
        label: 'Situaciones sociales',
        description: 'Digo algo inapropiado sin filtro; luego me disculpo o me arrepiento.',
      },
      {
        label: 'Tareas',
        description: 'Empiezo a hacer algo sin leer las instrucciones y después tengo que deshacer y volver a empezar.',
      },
      {
        label: 'Autopercepción',
        description: 'Reconozco que mi primer impulso suele dominar sobre mi capacidad de frenar y evaluar.',
      },
    ],
  },

  // B18 — Inatención
  {
    id: 18,
    section: 'B',
    sectionTitle: 'Parte B — Evaluación complementaria',
    dimension: 'inattention',
    domain: 'dsm5-inattention',
    text: 'Evito o postergo tareas que requieren esfuerzo mental sostenido.',
    examples: [
      {
        label: 'Tareas complejas',
        description: 'Dejo el informe, los impuestos o el estudio para "más tarde" hasta que la urgencia me obliga.',
      },
      {
        label: 'Lectura extensa',
        description: 'Necesito leer un documento largo y busco cualquier distracción para no empezar.',
      },
      {
        label: 'Formularios',
        description: 'Un trámite de 30 minutos puede llevarme semanas por la resistencia inicial a enfrentarlo.',
      },
      {
        label: 'Conversaciones difíciles',
        description: 'Postergo llamadas o mensajes que requieren pensar la respuesta con cuidado o confrontar un tema.',
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

export const SECTIONS = [
  { id: 'A', title: 'Parte A — Screener', range: [0, 5] },
  { id: 'B', title: 'Parte B — Evaluación complementaria', range: [6, 17] },
];

// Fuente: ASRS-5. Kessler et al. (2005), Psychol Med, 35(2), 245-256.
// Actualización DSM-5: Ustun et al. (2017), JAMA Psychiatry, 74(5), 520-527.
// Validación española: Ramos-Quiroga et al. (2009).

export default tdahQuestions;
