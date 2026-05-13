const executiveQuestions = [
  // ═══════════ SECCIÓN A: INHIBICIÓN (4 ítems) ═══════════
  {
    id: 1,
    section: 'A',
    sectionTitle: 'Inhibición — Actos impulsivos',
    dimension: 'inhibition',
    text: 'Digo o hago cosas sin pensarlas y luego me arrepiento, aunque sepa que no debería.',
    examples: [
      {
        label: 'Palabras',
        description:
          'Comentarios que "se me escapan" en reuniones o conversaciones y de los que me arrepiento segundos después.',
      },
      {
        label: 'Compras',
        description:
          'Compro cosas impulsivamente que no necesitaba.',
      },
      {
        label: 'Reacciones',
        description:
          'Respondo mensajes o emails con frustración y luego desearía haber esperado.',
      },
    ],
  },
  {
    id: 2,
    section: 'A',
    sectionTitle: 'Inhibición — Distracción por estímulos',
    dimension: 'inhibition',
    text: 'Me cuesta resistirme a estímulos inmediatos (revisar el celular, comer algo, cambiar de tarea) cuando debería estar concentrado/a.',
    examples: [
      {
        label: 'Celular',
        description:
          'Agarro el teléfono sin darme cuenta, incluso cuando sé que debo trabajar.',
      },
      {
        label: 'Interrupciones',
        description:
          'Abro pestañas nuevas o cambio de actividad sin terminar la anterior.',
      },
      {
        label: 'Impulsos',
        description:
          'Me levanto a picar algo, mirar por la ventana o hacer otra cosa apenas aparece el impulso.',
      },
    ],
  },
  {
    id: 3,
    section: 'A',
    sectionTitle: 'Inhibición — Interrupción a otros',
    dimension: 'inhibition',
    text: 'Interrumpo a otros o respondo antes de tiempo, aunque intente no hacerlo.',
    examples: [
      {
        label: 'Conversaciones',
        description:
          'Termino las frases de otros o salto con mi idea antes de que acaben.',
      },
      {
        label: 'Impaciencia',
        description:
          'Me cuesta esperar a que alguien termine de hablar; siento que ya sé lo que va a decir.',
      },
      {
        label: 'Conciencia',
        description:
          'Sé que lo hago y me corrijo mentalmente, pero vuelvo a hacerlo.',
      },
    ],
  },
  {
    id: 4,
    section: 'A',
    sectionTitle: 'Inhibición — Baja tolerancia a la frustración',
    dimension: 'inhibition',
    text: 'Tengo dificultad para esperar mi turno o tolerar la frustración cuando las cosas no van a mi ritmo.',
    examples: [
      {
        label: 'Filas',
        description:
          'Hacer cola o esperar en tráfico me genera una irritación desproporcionada.',
      },
      {
        label: 'Procesos',
        description:
          'Cuando algo toma más tiempo del que esperaba, mi frustración crece rápidamente.',
      },
      {
        label: 'Abandono',
        description:
          'Si una tarea no da resultados inmediatos, me cuesta no abandonarla.',
      },
    ],
  },

  // ═══════════ SECCIÓN B: MEMORIA DE TRABAJO (5 ítems) ═══════════
  {
    id: 5,
    section: 'B',
    sectionTitle: 'Memoria de trabajo — Olvido de instrucciones',
    dimension: 'workingMemory',
    text: 'Se me olvidan las instrucciones que me dieron hace unos minutos, especialmente si son de varios pasos.',
    examples: [
      {
        label: 'Indicaciones',
        description:
          'Alguien me da 3 pasos a seguir; llego al segundo y no recuerdo el tercero.',
      },
      {
        label: 'Recetas',
        description:
          'Al cocinar, releo la receta constantemente porque no retengo los pasos en la cabeza.',
      },
      {
        label: 'Trabajo',
        description:
          'Mi jefe me pide varias cosas y necesito que me las escriba o las olvido.',
      },
    ],
  },
  {
    id: 6,
    section: 'B',
    sectionTitle: 'Memoria de trabajo — Pérdida de hilo al interrumpir',
    dimension: 'workingMemory',
    text: 'Pierdo el hilo de lo que estaba haciendo cuando me interrumpen, y me cuesta volver.',
    examples: [
      {
        label: 'Interrupciones',
        description:
          'Si alguien me habla mientras trabajo, olvido completamente en qué estaba.',
      },
      {
        label: 'Multitarea',
        description:
          'Cambiar entre dos tareas me hace perder el estado mental de ambas.',
      },
      {
        label: 'Costo',
        description:
          'Necesito varios minutos para retomar el foco después de cualquier interrupción.',
      },
    ],
  },
  {
    id: 7,
    section: 'B',
    sectionTitle: 'Memoria de trabajo — Olvido del propósito inmediato',
    dimension: 'workingMemory',
    text: 'Olvido por qué entré a una habitación o qué iba a buscar.',
    examples: [
      {
        label: 'Habitaciones',
        description:
          'Voy a la cocina y me quedo parado/a sin recordar qué iba a hacer.',
      },
      {
        label: 'Pestañas',
        description:
          'Abro el navegador para buscar algo y termino en otra página sin recordar qué iba a buscar.',
      },
      {
        label: 'Frecuencia',
        description:
          'Me pasa varias veces al día, especialmente cuando estoy cansado/a.',
      },
    ],
  },
  {
    id: 8,
    section: 'B',
    sectionTitle: 'Memoria de trabajo — Dependencia de anotaciones',
    dimension: 'workingMemory',
    text: 'Necesito escribir todo porque sé que si no lo anoto, se me olvida.',
    examples: [
      {
        label: 'Listas',
        description:
          'Vivo con listas, alarmas, notas y recordatorios; sin ellos mi día colapsa.',
      },
      {
        label: 'Ansiedad',
        description:
          'Si no anoto algo inmediatamente, me angustia pensar que lo olvidaré.',
      },
      {
        label: 'Sistemas',
        description:
          'He desarrollado sistemas externos porque no confío en mi memoria.',
      },
    ],
  },
  {
    id: 9,
    section: 'B',
    sectionTitle: 'Memoria de trabajo — Seguimiento de conversaciones',
    dimension: 'workingMemory',
    text: 'Me cuesta seguir una conversación compleja sin perder el hilo de los argumentos.',
    examples: [
      {
        label: 'Debates',
        description:
          'En discusiones con varios puntos, pierdo el hilo de lo que yo mismo estaba argumentando.',
      },
      {
        label: 'Reuniones',
        description:
          'En reuniones largas, desconecto y cuando vuelvo no sé de qué hablan.',
      },
      {
        label: 'Lectura',
        description:
          'Leo un párrafo y al final no recuerdo lo que decía al principio.',
      },
    ],
  },

  // ═══════════ SECCIÓN C: PLANIFICACIÓN Y ORGANIZACIÓN (5 ítems) ═══════════
  {
    id: 10,
    section: 'C',
    sectionTitle: 'Planificación — Subestimación del tiempo',
    dimension: 'planning',
    text: 'Subestimo el tiempo que toman las tareas y termino apurado/a o llegando tarde.',
    examples: [
      {
        label: 'Cálculo',
        description:
          'Pienso que algo tomará 10 minutos y toma 40; me pasa sistemáticamente.',
      },
      {
        label: 'Impuntualidad',
        description:
          'Llego tarde a compromisos porque no calculé bien el tiempo de preparación y traslado.',
      },
      {
        label: 'Fechas límite',
        description:
          'Solo la presión de la fecha límite me hace terminar las cosas.',
      },
    ],
  },
  {
    id: 11,
    section: 'C',
    sectionTitle: 'Planificación — Desorganización espacial',
    dimension: 'planning',
    text: 'Mis espacios (escritorio, habitación, archivos digitales) están desorganizados y me cuesta mantener un sistema.',
    examples: [
      {
        label: 'Físico',
        description:
          'Acumulo papeles, objetos y ropa en superficies; sé dónde está todo pero no es ordenado.',
      },
      {
        label: 'Digital',
        description:
          'Mi escritorio de computadora está lleno de íconos, mi bandeja de entrada tiene miles sin leer.',
      },
      {
        label: 'Sistemas',
        description:
          'Intento organizarme con métodos nuevos pero no duran más de una semana.',
      },
    ],
  },
  {
    id: 12,
    section: 'C',
    sectionTitle: 'Planificación — Proyectos inconclusos',
    dimension: 'planning',
    text: 'Empiezo proyectos con entusiasmo pero me cuesta terminarlos sin una presión externa.',
    examples: [
      {
        label: 'Hobbies',
        description:
          'Tengo materiales de 5 hobbies empezados y abandonados.',
      },
      {
        label: 'Trabajo',
        description:
          'Las tareas que dependen solo de mí se postergan; si alguien me espera, las hago.',
      },
      {
        label: 'Ciclo',
        description:
          'Fase de hiperfoco inicial seguida de abandono cuando lo nuevo desaparece.',
      },
    ],
  },
  {
    id: 13,
    section: 'C',
    sectionTitle: 'Planificación — Dificultad para desglosar tareas',
    dimension: 'planning',
    text: 'Me cuesta dividir una tarea grande en pasos pequeños y secuenciales.',
    examples: [
      {
        label: 'Parálisis',
        description:
          'Veo una tarea enorme y no sé por dónde empezar; me abruma.',
      },
      {
        label: 'Secuencia',
        description:
          'No sé en qué orden hacer las cosas; todo me parece prioritario o nada lo es.',
      },
      {
        label: 'Ayuda',
        description:
          'Necesito que alguien me ayude a desglosar los pasos; solo/a me pierdo.',
      },
    ],
  },
  {
    id: 14,
    section: 'C',
    sectionTitle: 'Planificación — Pérdida de objetos',
    dimension: 'planning',
    text: 'Pierdo objetos importantes con frecuencia y pierdo tiempo buscándolos.',
    examples: [
      {
        label: 'Llaves',
        description:
          'Busco llaves, billetera, teléfono o documentos varias veces por semana.',
      },
      {
        label: 'Tiempo',
        description:
          'Paso una cantidad significativa de tiempo cada día buscando cosas que no sé dónde dejé.',
      },
      {
        label: 'Estrés',
        description:
          'Llegar tarde por no encontrar algo esencial es una experiencia recurrente.',
      },
    ],
  },

  // ═══════════ SECCIÓN D: FLEXIBILIDAD COGNITIVA (4 ítems) ═══════════
  {
    id: 15,
    section: 'D',
    sectionTitle: 'Flexibilidad — Dificultad para cambiar de tarea',
    dimension: 'flexibility',
    text: 'Me cuesta cambiar de una tarea a otra, especialmente si estaba concentrado/a en la primera.',
    examples: [
      {
        label: 'Inercia',
        description:
          'Una vez que entro en una tarea, salir de ella me genera resistencia o irritación.',
      },
      {
        label: 'Transiciones',
        description:
          'Necesito tiempo de "aterrizaje" entre una actividad y otra; los cambios bruscos me descolocan.',
      },
      {
        label: 'Productividad',
        description:
          'Mi productividad cae cuando debo saltar entre tareas en lugar de hacer una en profundidad.',
      },
    ],
  },
  {
    id: 16,
    section: 'D',
    sectionTitle: 'Flexibilidad — Bloqueo ante cambios de plan',
    dimension: 'flexibility',
    text: 'Cuando un plan cambia de último momento, me bloqueo o me irrito más de lo que la situación amerita.',
    examples: [
      {
        label: 'Planes',
        description:
          'Una cancelación o cambio de lugar/horario me desregula emocionalmente.',
      },
      {
        label: 'Desproporción',
        description:
          'Sé que mi reacción es exagerada pero no puedo evitarlo.',
      },
      {
        label: 'Preparación',
        description:
          'Me había preparado mentalmente para el plan A; el plan B me cuesta horas de reajuste.',
      },
    ],
  },
  {
    id: 17,
    section: 'D',
    sectionTitle: 'Flexibilidad — Perseveración en estrategias',
    dimension: 'flexibility',
    text: 'Tiendo a insistir en una estrategia aunque no esté funcionando, antes que probar otra.',
    examples: [
      {
        label: 'Terquedad',
        description:
          'Sigo intentando lo mismo esperando un resultado diferente, por pura inercia mental.',
      },
      {
        label: 'Alternativas',
        description:
          'Me cuesta generar opciones alternativas cuando estoy bloqueado/a.',
      },
      {
        label: 'Feedback',
        description:
          'Ignoro señales de que debo cambiar de enfoque; solo cambio cuando es demasiado tarde.',
      },
    ],
  },
  {
    id: 18,
    section: 'D',
    sectionTitle: 'Flexibilidad — Visión única de problemas',
    dimension: 'flexibility',
    text: 'Me cuesta ver más de una solución a un problema o más de un punto de vista en una discusión.',
    examples: [
      {
        label: 'Perspectiva',
        description:
          'Cuando tengo una opinión, me cuesta genuinamente ver el otro lado.',
      },
      {
        label: 'Soluciones',
        description:
          'Tiendo a pensar que hay una forma correcta de hacer las cosas.',
      },
      {
        label: 'Rigidez',
        description:
          'Me dicen que soy "cuadrado/a" o rígido/a en mi forma de pensar.',
      },
    ],
  },
];

export const EXECUTIVE_SECTIONS = [
  { id: 'A', title: 'Inhibición', range: [0, 3] },
  { id: 'B', title: 'Memoria de trabajo', range: [4, 8] },
  { id: 'C', title: 'Planificación y organización', range: [9, 13] },
  { id: 'D', title: 'Flexibilidad cognitiva', range: [14, 17] },
];

export default executiveQuestions;
