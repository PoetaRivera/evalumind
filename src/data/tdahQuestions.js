const tdahQuestions = [
  // ═══════════ SECCIÓN A: INATENCIÓN (8 ítems) ═══════════
  {
    id: 1,
    section: 'A',
    sectionTitle: 'Inatención — Errores por descuido',
    dimension: 'inattention',
    text: 'Cometo errores por descuido en tareas que requieren atención a los detalles, aunque las conozca bien.',
    examples: [
      {
        label: 'Escritura / digital',
        description:
          'Al escribir mensajes, correos o documentos, me como palabras, letras o signos de puntuación sin darme cuenta hasta que alguien me lo señala o los releo después.',
      },
      {
        label: 'Números / datos',
        description:
          'En matemáticas, hojas de cálculo o finanzas personales, me salto números, copio mal cifras o olvido cambiar el signo (+ por −).',
      },
      {
        label: 'Revisión',
        description:
          'Reviso un trabajo "con cuidado" y aun así no veo errores obvios que otros detectan inmediatamente.',
      },
      {
        label: 'Instrucciones',
        description:
          'Leo una receta, manual o indicación y después descubro que omití un paso sin querer.',
      },
    ],
  },
  {
    id: 2,
    section: 'A',
    sectionTitle: 'Inatención — Desconexión mental',
    dimension: 'inattention',
    text: 'Mi mente se desconecta durante conversaciones, lecturas o reuniones, aunque intente prestar atención.',
    examples: [
      {
        label: 'Conversaciones uno a uno',
        description:
          'La otra persona sigue hablando y yo me doy cuenta de que no escuché los últimos 30 segundos; asiento por inercia.',
      },
      {
        label: 'Lecturas',
        description:
          'Leo tres páginas de un libro o artículo y no puedo resumir de qué trataban; tengo que releer varias veces.',
      },
      {
        label: 'Reuniones / videollamadas',
        description:
          'Termino la reunión sin saber qué se decidió; me descubro revisando el celular o pensando en otra cosa.',
      },
      {
        label: 'Películas / series',
        description:
          'Pierdo el hilo de la trama y tengo que rebobinar o preguntar qué pasó.',
      },
    ],
  },
  {
    id: 3,
    section: 'A',
    sectionTitle: 'Inatención — Proyectos sin terminar',
    dimension: 'inattention',
    text: 'Empiezo tareas o proyectos con entusiasmo pero me cuesta enormemente terminarlos.',
    examples: [
      {
        label: 'Proyectos personales',
        description:
          'Tengo libros empezados, cursos sin terminar, hobbies abandonados a mitad de camino.',
      },
      {
        label: 'Laborales / escolares',
        description:
          'Dejo informes, tareas o proyectos al 80 %; el "último empujón" me cuesta semanas.',
      },
      {
        label: 'Domésticos',
        description:
          'Empiezo a limpiar u organizar una habitación, me distraigo con otra cosa, y queda peor que al principio.',
      },
      {
        label: 'Creativos',
        description:
          'Tengo diez ideas empezadas y ninguna publicada o terminada; el perfeccionismo o el aburrimiento me bloquean al final.',
      },
    ],
  },
  {
    id: 4,
    section: 'A',
    sectionTitle: 'Inatención — Organización y plazos',
    dimension: 'inattention',
    text: 'Me cuesta organizar tareas complejas, establecer prioridades o cumplir plazos.',
    examples: [
      {
        label: 'Priorización',
        description:
          'Tengo diez cosas urgentes y no sé por cuál empezar; termino haciendo una undécima que no era importante.',
      },
      {
        label: 'Planificación',
        description:
          'Subestimo sistemáticamente el tiempo que toman las cosas ("me da tiempo"); termino apurado o entregando tarde.',
      },
      {
        label: 'Secuenciación',
        description:
          'Me pierdo en los pasos de una receta, un trámite o un proyecto porque no sigo el orden lógico.',
      },
      {
        label: 'Materiales',
        description:
          'Pierdo tiempo buscando herramientas, documentos o recursos que debería tener a mano.',
      },
    ],
  },
  {
    id: 5,
    section: 'A',
    sectionTitle: 'Inatención — Evitación de esfuerzo mental',
    dimension: 'inattention',
    text: 'Evito o postergo tareas que requieren esfuerzo mental sostenido.',
    examples: [
      {
        label: 'Tareas "pesadas"',
        description:
          'Dejo el informe, la declaración de impuestos o el estudio difícil para "más tarde" hasta que es urgente.',
      },
      {
        label: 'Lecturas extensas',
        description:
          'Necesito leer un documento largo y busco cualquier excusa para no empezar (revisar correos, redes, etc.).',
      },
      {
        label: 'Formularios / trámites',
        description:
          'Un papeleo que toma 30 minutos me puede llevar semanas por la resistencia inicial.',
      },
      {
        label: 'Conversaciones difíciles',
        description:
          'Difiero llamadas o mensajes que requieren pensar la respuesta con cuidado.',
      },
    ],
  },
  {
    id: 6,
    section: 'A',
    sectionTitle: 'Inatención — Pérdida de objetos',
    dimension: 'inattention',
    text: 'Pierdo objetos de uso diario con una frecuencia que me frustra o me retrasa.',
    examples: [
      {
        label: 'Salida de casa',
        description:
          'Busco llaves, celular, billetera o gafas casi todos los días; tengo rutinas de "¿dónde lo dejé?".',
      },
      {
        label: 'En el trabajo / estudio',
        description:
          'Pierdo documentos, lapiceros, cables, auriculares; compro reemplazos y luego encuentro los originales.',
      },
      {
        label: 'Estacionamiento',
        description:
          'Olvido dónde estacioné el coche o en qué nivel dejé algo.',
      },
      {
        label: '"Lógico"',
        description:
          'Dejo algo en un lugar "para no olvidarlo" y después no recuerdo cuál era ese lugar.',
      },
    ],
  },
  {
    id: 7,
    section: 'A',
    sectionTitle: 'Inatención — Distracción por estímulos',
    dimension: 'inattention',
    text: 'Me distraigo fácilmente por estímulos externos o pensamientos internos.',
    examples: [
      {
        label: 'Estímulos externos',
        description:
          'Un ruido lejano, alguien pasando, una notificación visual me sacan de lo que hacía.',
      },
      {
        label: 'Pensamientos intrusivos',
        description:
          'Estoy trabajando y de repente estoy planeando las vacaciones, recordando una conversación de ayer o imaginando una respuesta a un correo no enviado.',
      },
      {
        label: 'Internet / digital',
        description:
          'Abro una pestaña para buscar algo específico y veinte minutos después estoy en un artículo totalmente ajeno.',
      },
      {
        label: 'Conversaciones',
        description:
          'Alguien me habla y mi cerebro conecta una palabra con una idea que tengo que anotar antes de que se me olvide.',
      },
    ],
  },
  {
    id: 8,
    section: 'A',
    sectionTitle: 'Inatención — Olvidos cotidianos',
    dimension: 'inattention',
    text: 'Soy olvidadizo en citas, compromisos, pagos o devolver llamadas y mensajes.',
    examples: [
      {
        label: 'Citas',
        description:
          'Olvido reuniones aunque las tenga en el calendario; necesito recordatorios múltiples.',
      },
      {
        label: 'Compromisos sociales',
        description:
          'Digo que voy a algo y se me pasa; o acuerdo llamar a alguien y me entero días después.',
      },
      {
        label: 'Pagos',
        description:
          'Recuerdo que debía pagar algo el día después de la fecha límite.',
      },
      {
        label: 'Mensajes',
        description:
          'Leo un mensaje, pienso "respondo después" y se me olvida por completo; o respondo mentalmente sin escribir.',
      },
    ],
  },

  // ═══════════ SECCIÓN B: HIPERACTIVIDAD FÍSICA (3 ítems) ═══════════
  {
    id: 9,
    section: 'B',
    sectionTitle: 'Hiperactividad — Inquietud física',
    dimension: 'hyperactivityPhysical',
    text: 'Siento inquietud física constante: muevo las manos, pateo, retuerzo el cuerpo o cambio de postura sin darme cuenta.',
    examples: [
      {
        label: 'Manos',
        description:
          'Tamborileo con los dedos, toco objetos, hago clic con bolígrafos, juego con el celular sin propósito.',
      },
      {
        label: 'Piernas',
        description:
          'Muevo la pierna sentado, pateo el aire, camino de un lado a otro cuando hablo por teléfono.',
      },
      {
        label: 'Postura',
        description:
          'Cambio de posición en la silla cada dos minutos; prefiero ir de pie a sentarme; me acurruco de formas extrañas.',
      },
      {
        label: 'Dormir',
        description:
          'Me cuesta encontrar una posición cómoda; me doy vueltas en la cama antes de dormir.',
      },
    ],
  },
  {
    id: 10,
    section: 'B',
    sectionTitle: 'Hiperactividad — Malestar al estar quieto',
    dimension: 'hyperactivityPhysical',
    text: 'Me resulta físicamente incómodo quedarme quieto o quieta en situaciones que lo requieren.',
    examples: [
      {
        label: 'Eventos formales',
        description:
          'Ceremonias, funerales, conferencias largas: siento la urgencia de levantarme o estirar algo.',
      },
      {
        label: 'Transporte',
        description:
          'Viajes largos en avión, bus o coche; prefiero parar cada hora aunque no sea necesario.',
      },
      {
        label: 'Esperas médicas / oficinas',
        description:
          'El tiempo de espera sentado se siente físicamente agobiante.',
      },
      {
        label: 'Cine / teatro',
        description:
          'A los cuarenta minutos ya estoy cambiando de postura, cruzando y descruzando piernas.',
      },
    ],
  },
  {
    id: 11,
    section: 'B',
    sectionTitle: 'Hiperactividad — "Motor encendido"',
    dimension: 'hyperactivityPhysical',
    text: 'Siento una sensación interna de "motor encendido" que no me deja descansar mentalmente.',
    examples: [
      {
        label: 'Físico',
        description:
          'Aunque estoy exhausto, mi cuerpo quiere hacer algo; es difícil quedarme en el sofá un domingo.',
      },
      {
        label: 'Mental',
        description:
          'Mi cerebro sigue acelerado aunque quiera dormir; repaso mentalmente conversaciones, pendientes, ideas.',
      },
      {
        label: 'Fines de semana',
        description:
          'No logro "apagar"; siento que debería ser productivo aunque sea sábado.',
      },
      {
        label: 'Vacaciones',
        description:
          'Me cuesta desconectar del trabajo o las responsabilidades; termino revisando correos "solo por si acaso".',
      },
    ],
  },

  // ═══════════ SECCIÓN C: IMPULSIVIDAD VERBAL / INTERPERSONAL (5 ítems) ═══════════
  {
    id: 12,
    section: 'C',
    sectionTitle: 'Impulsividad — Habla excesiva',
    dimension: 'impulsivityVerbal',
    text: 'Hablo más de lo necesario, doy vueltas a las explicaciones o me "desbordo" verbalmente.',
    examples: [
      {
        label: 'Explicaciones',
        description:
          'Doy contexto excesivo para responder algo simple; la otra persona pierde el hilo.',
      },
      {
        label: 'Presión por hablar',
        description:
          'En una reunión siento la presión de aportar algo y termino ocupando más tiempo del que me corresponde.',
      },
      {
        label: 'Mensajes largos',
        description:
          'Escribo párrafos cuando una frase bastaría; después me arrepiento de no haber sido más conciso.',
      },
      {
        label: 'Se me escapa',
        description:
          'No es que interrumpa para imponerme, sino que la respuesta se me escapa antes de que terminen.',
      },
    ],
  },
  {
    id: 13,
    section: 'C',
    sectionTitle: 'Impulsividad — Respuestas precipitadas',
    dimension: 'impulsivityVerbal',
    text: 'Respondo antes de que la otra persona termine de hablar, como si la respuesta me "quemara".',
    examples: [
      {
        label: 'Terminar frases',
        description:
          'Completo las oraciones de los demás porque "ya sé lo que van a decir".',
      },
      {
        label: 'Respuestas apresuradas',
        description:
          'Contesto una pregunta sin haberla escuchado completa; luego me doy cuenta de que no era eso.',
      },
      {
        label: 'Debate / discusión',
        description:
          'Replico inmediatamente sin procesar lo que acaban de decirme.',
      },
      {
        label: 'Instrucciones',
        description:
          'Empiezo a actuar antes de que terminen de explicarme; luego tengo que deshacer o preguntar de nuevo.',
      },
    ],
  },
  {
    id: 14,
    section: 'C',
    sectionTitle: 'Impulsividad — Intolerancia a la lentitud',
    dimension: 'impulsivityVerbal',
    text: 'Me cuesta tolerar que otros hablen o actúen a un ritmo más lento que el mío.',
    examples: [
      {
        label: 'Historias largas',
        description:
          'Alguien cuenta algo con demasiados detalles y siento urgencia interna de que "llegue al punto"; puedo parecer impaciente aunque no lo exteriorice.',
      },
      {
        label: 'Explicaciones lentas',
        description:
          'En una capacitación o tutorial siento que avanza demasiado lento y salto secciones, a veces perdiendo información importante.',
      },
      {
        label: 'Trabajo en equipo',
        description:
          'Me frustra cuando otros necesitan más tiempo para entender algo que yo capté rápido.',
      },
      {
        label: 'Espera pasiva',
        description:
          'Ver a alguien buscar algo lentamente (archivos, llaves, palabras) me genera tensión física.',
      },
    ],
  },
  {
    id: 15,
    section: 'C',
    sectionTitle: 'Impulsividad — Intromisión',
    dimension: 'impulsivityVerbal',
    text: 'Interrumpo, me entrometo o tomo el control de situaciones grupales sin planearlo.',
    examples: [
      {
        label: 'Conversaciones ajenas',
        description:
          'Escucho una discusión cercana y "entro" con mi opinión sin ser parte.',
      },
      {
        label: 'Tareas grupales',
        description:
          '"Es más rápido si lo hago yo" y termino asumiendo el control, a veces sin consultar.',
      },
      {
        label: 'Correcciones',
        description:
          'Corrijo a alguien en público porque "no puedo dejar pasar el error".',
      },
      {
        label: 'Planes',
        description:
          'Cambio el plan de otros porque mi alternativa me parece más eficiente, aunque no me hayan pedido opinión.',
      },
    ],
  },
  {
    id: 16,
    section: 'C',
    sectionTitle: 'Impulsividad — Decisiones apresuradas',
    dimension: 'impulsivityVerbal',
    text: 'Tomo decisiones apresuradas sin considerar consecuencias, especialmente bajo estrés o emoción intensa.',
    examples: [
      {
        label: 'Compras',
        description:
          'Compro algo caro por impulso y me arrepiento después; o me convenzo de que lo necesito en el momento.',
      },
      {
        label: 'Mensajes / correos',
        description:
          'Envío mensajes en caliente, sarcásticos o definitivos que luego no puedo retractar.',
      },
      {
        label: 'Compromisos',
        description:
          'Digo "sí" a invitaciones, proyectos o favores sin revisar mi agenda; luego me veo sobrecargado.',
      },
      {
        label: 'Cambios drásticos',
        description:
          'Renuncio, corto relaciones o cambio de ciudad o planes sin evaluar adecuadamente.',
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
  { id: 'A', title: 'Inatención', range: [0, 7] },
  { id: 'B', title: 'Hiperactividad física', range: [8, 10] },
  { id: 'C', title: 'Impulsividad verbal e interpersonal', range: [11, 15] },
];

export default tdahQuestions;
