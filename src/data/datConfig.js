// ═══════════════════════════════════════════════════
// Configuración del DAT (Test de Asociación Divergente)
// ═══════════════════════════════════════════════════

export const DAT_INSTRUCTIONS = [
  'Escribe 10 palabras que NO tengan nada que ver entre sí. Ninguna conexión. Ninguna historia. Ningún hilo narrativo. Cada palabra debe venir de un dominio completamente distinto.',
  'Imagina 10 cajones de un almacén, cada uno de una tienda distinta. Abres uno, sacas una palabra. Lo cierras. Abres otro completamente diferente. Sin mirar atrás. Sin crear frases ni historias.',
  'Solo palabras individuales (sustantivos o adjetivos en su forma base). No frases, no verbos conjugados, no nombres propios.',
  'Las palabras que vienen primero a la mente suelen ser las más obvias. Las verdaderamente divergentes aparecen cuando dejas que la mente salte a dominios inesperados.',
];

export const DAT_EXAMPLES = {
  narrative: {
    label: '❌❌ MAL: Creaste una historia o narrativa',
    words: ['perro', 'hueso', 'veterinario', 'jaula', 'collar', 'correa', 'comida', 'parque', 'adiestrador', 'ladrido'],
    explanation: 'Todo gira alrededor de "perro/mascota". Esto es una narrativa, no 10 palabras divergentes. Cada palabra es un capítulo del mismo libro.',
  },
  convergent: {
    label: '❌ MAL: Mismo dominio semántico',
    words: ['perro', 'gato', 'hamster', 'loro', 'pez', 'tortuga', 'conejo', 'caballo', 'vaca', 'oveja'],
    explanation: 'Todas son animales. La mente se quedó en un solo cajón. Aunque no cuentan una historia, pertenecen a la misma categoría.',
  },
  semiDivergent: {
    label: '⚠️ REGULAR: Objetos cotidianos variados',
    words: ['perro', 'rojo', 'coche', 'árbol', 'pizza', 'guitarra', 'montaña', 'zapato', 'nube', 'reloj'],
    explanation: 'Mejor variedad, pero muchas son objetos cotidianos visuales/táctiles de escala humana. Siguen dentro de lo concreto y manipulable.',
  },
  highlyDivergent: {
    label: '✅ BIEN: Dominios radicalmente distintos',
    words: ['democracia', 'hidrógeno', 'melancolía', 'espagueti', 'vértigo', 'álgebra', 'tundra', 'pecado', 'neumático', 'eón'],
    explanation: '10 reinos distintos: política, química, emoción, comida, sensación, matemáticas, geografía, religión, tecnología, tiempo. Cada palabra abre un cajón completamente diferente.',
  },
};

export const DAT_STRATEGIES = [
  {
    title: 'Estrategia 1: Saltar entre dominios',
    items: [
      'Una palabra de naturaleza (glaciar)',
      'Una de abstracción política (embargo)',
      'Una de emoción (nostalgia)',
      'Una de ciencia (isótopo)',
      'Una de cuerpo humano (clavícula)',
      'Una de tiempo histórico (renacimiento)',
      'Una de textura/sensorial (áspero)',
      'Una de tecnología antigua (pergamino)',
      'Una de concepto matemático (paradoja)',
      'Una de mitología (sirena)',
    ],
  },
  {
    title: 'Estrategia 2: Cambiar de escala',
    items: [
      'Microscópico: bacteria',
      'Humano: democracia',
      'Cósmico: supernova',
      'Temporal: siglo',
      'Abstracto: culpa',
    ],
  },
  {
    title: 'Estrategia 3: Mezclar lo concreto y lo abstracto',
    items: [
      'No pongas solo objetos que puedas tocar. Mezcla emociones, conceptos, fuerzas naturales, categorías sociales.',
    ],
  },
];

export const VALIDATION_RULES = {
  minWords: 7,
  maxWords: 10,
  minChars: 3,
  blockedPatterns: [
    { pattern: /\s/, message: 'Solo una palabra, no frases' },
    { pattern: /^[A-ZÁÉÍÓÚÜÑ][a-záéíóúüñ]+$/, exclude: true, message: '' }, // permitido: palabras capitalizadas
    { pattern: /^(el|la|los|las|un|una|unos|unas|de|del|en|con|por|para|sin|yo|tú|él|ella|mi|tu|su|me|te|se|lo|le|nos|os|es|ha|han|he|hay|fue|ser|estar|muy|más|menos|que|cual|donde|cuando)$/i, message: 'Evita artículos, preposiciones y palabras funcionales' },
  ],
  verbEndings: /(ar|er|ir|ando|iendo|ado|ido|aba|ía|aste|iste|ó|ió|aron|ieron|aré|eré|iré|aría|ería|iría|ase|ese|are|ere)$/i,
  numberPattern: /^\d+$/,
};

// ═══════════════════════════════════════════════════
// Categorías semánticas para scoring Fase 1
// ═══════════════════════════════════════════════════

export const SEMANTIC_CATEGORIES = {
  naturaleza: {
    group: 'natural',
    words: [
      'árbol', 'montaña', 'río', 'océano', 'glaciar', 'tundra', 'volcán', 'bosque', 'desierto', 'isla',
      'mar', 'lago', 'selva', 'pradera', 'cascada', 'costa', 'valle', 'colina', 'cañón', 'cueva',
      'flor', 'hoja', 'semilla', 'raíz', 'fruto', 'pétalo', 'tallo', 'polen', 'nube', 'lluvia',
      'nieve', 'viento', 'tormenta', 'huracán', 'rayo', 'trueno', 'rocío', 'niebla', 'atmósfera', 'cielo',
      'tierra', 'piedra', 'roca', 'mineral', 'cristal', 'arena', 'lava', 'coral', 'arrecife', 'horizonte',
    ],
  },
  cuerpo: {
    group: 'natural',
    words: [
      'corazón', 'clavícula', 'pulmón', 'neurona', 'sangre', 'músculo', 'hueso', 'piel', 'tendón', 'pupila',
      'mano', 'ojo', 'cerebro', 'hígado', 'riñón', 'estómago', 'intestino', 'arteria', 'vena', 'nervio',
      'cráneo', 'mandíbula', 'columna', 'costilla', 'fémur', 'rodilla', 'tobillo', 'muñeca', 'pulgar', 'uña',
      'lengua', 'diente', 'garganta', 'oído', 'olfato', 'voz', 'aliento', 'sudor', 'lágrima', 'cicatriz',
    ],
  },
  ciencia: {
    group: 'abstracto',
    words: [
      'átomo', 'hidrógeno', 'isótopo', 'gravedad', 'evolución', 'célula', 'bacteria', 'energía', 'órbita',
      'molécula', 'electrón', 'protón', 'neutrón', 'fotón', 'plasma', 'radiación', 'frecuencia', 'onda', 'campo',
      'especie', 'gen', 'cromosoma', 'mutación', 'enzima', 'proteína', 'virus', 'hongo', 'ecosistema', 'bioma',
      'fósil', 'extinción', 'tectónica', 'magma', 'sedimento', 'erosión', 'estrato', 'carbono', 'oxígeno', 'helio',
    ],
  },
  politica: {
    group: 'abstracto',
    words: [
      'democracia', 'justicia', 'derecho', 'embargo', 'constitución', 'soberanía', 'impuesto', 'parlamento', 'voto', 'reforma',
      'libertad', 'igualdad', 'fraternidad', 'estado', 'nación', 'frontera', 'tratado', 'diplomacia', 'consenso', 'disidencia',
      'gobierno', 'república', 'monarquía', 'federación', 'provincia', 'municipio', 'decreto', 'ley', 'juez', 'tribunal',
      'ciudadanía', 'censo', 'elección', 'partido', 'oposición', 'sindicato', 'huelga', 'manifestación', 'discurso', 'campaña',
    ],
  },
  emocion: {
    group: 'mental',
    words: [
      'amor', 'miedo', 'alegría', 'melancolía', 'nostalgia', 'vergüenza', 'culpa', 'ansiedad', 'paz', 'ira',
      'tristeza', 'rabia', 'sorpresa', 'asco', 'orgullo', 'envidia', 'celos', 'gratitud', 'esperanza', 'desesperación',
      'euforia', 'calma', 'angustia', 'ternura', 'compasión', 'odio', 'indignación', 'alivio', 'arrepentimiento', 'duda',
      'soledad', 'frustración', 'entusiasmo', 'aburrimiento', 'curiosidad', 'admiración', 'desprecio', 'resignación', 'deseo', 'afecto',
    ],
  },
  abstracto: {
    group: 'mental',
    words: [
      'paradoja', 'infinito', 'verdad', 'mentira', 'destino', 'azar', 'caos', 'armonía', 'silencio', 'vacío',
      'idea', 'concepto', 'teoría', 'hipótesis', 'principio', 'axioma', 'lógica', 'razón', 'intuición', 'conciencia',
      'alma', 'espíritu', 'esencia', 'existencia', 'nada', 'todo', 'ser', 'devenir', 'eternidad', 'tiempo',
      'espacio', 'dimensión', 'realidad', 'sueño', 'ilusión', 'ficción', 'metáfora', 'símbolo', 'signo', 'código',
      'moral', 'ética', 'virtud', 'pecado', 'bien', 'mal', 'belleza', 'fealdad', 'sabiduría', 'ignorancia',
    ],
  },
  tecnologia: {
    group: 'artificial',
    words: [
      'circuito', 'algoritmo', 'satélite', 'motor', 'antena', 'batería', 'sensor', 'pantalla', 'robot', 'chip',
      'ordenador', 'internet', 'software', 'hardware', 'servidor', 'red', 'datos', 'cable', 'fibra', 'láser',
      'impresora', 'teclado', 'monitor', 'disco', 'memoria', 'procesador', 'módem', 'router', 'cámara', 'micrófono',
      'telescopio', 'microscopio', 'brújula', 'reloj', 'termómetro', 'barómetro', 'dinamo', 'turbina', 'pistón', 'engranaje',
    ],
  },
  arquitectura: {
    group: 'artificial',
    words: [
      'catedral', 'puente', 'torre', 'columna', 'arco', 'cúpula', 'muralla', 'escalera', 'patio', 'pórtico',
      'templo', 'palacio', 'castillo', 'fortaleza', 'acueducto', 'obelisco', 'pirámide', 'monolito', 'fachada', 'bóveda',
      'cimientos', 'andamio', 'tejado', 'ventana', 'puerta', 'pasillo', 'balcón', 'chimenea', 'ático', 'sótano',
    ],
  },
  arte: {
    group: 'artificial',
    words: [
      'escultura', 'sinfonía', 'fresco', 'poema', 'danza', 'teatro', 'melodía', 'lienzo', 'verso', 'ritmo',
      'pintura', 'dibujo', 'grabado', 'mosaico', 'tapiz', 'cerámica', 'caligrafía', 'partitura', 'ópera', 'ballet',
      'novela', 'cuento', 'fábula', 'mito', 'leyenda', 'épica', 'tragedia', 'comedia', 'drama', 'sátira',
    ],
  },
  cotidiano: {
    group: 'artificial',
    words: [
      'mesa', 'zapato', 'ventana', 'cuchara', 'lápiz', 'carta', 'llave', 'espejo', 'cuerda', 'cesta',
      'silla', 'cama', 'lámpara', 'alfombra', 'cortina', 'almohada', 'toalla', 'jabón', 'cepillo', 'tijera',
      'plato', 'vaso', 'botella', 'cesta', 'bolsa', 'maleta', 'paraguas', 'candado', 'cadena', 'clavo',
      'martillo', 'sierra', 'aguja', 'hilo', 'botón', 'cremallera', 'hebilla', 'anillo', 'collar', 'pulsera',
    ],
  },
  comida: {
    group: 'natural',
    words: [
      'espagueti', 'pizza', 'pan', 'queso', 'fruta', 'especia', 'caldo', 'cereal', 'miel', 'hierba',
      'carne', 'pescado', 'arroz', 'pasta', 'ensalada', 'sopa', 'guiso', 'salsa', 'aceite', 'vinagre',
      'leche', 'huevo', 'harina', 'azúcar', 'sal', 'chocolate', 'galleta', 'pastel', 'helado', 'yogur',
    ],
  },
  sensorial: {
    group: 'mental',
    words: [
      'áspero', 'dulce', 'fragante', 'brillante', 'sonoro', 'gélido', 'rugoso', 'sedoso', 'amargo', 'estruendo',
      'suave', 'duro', 'tibio', 'frío', 'caliente', 'húmedo', 'seco', 'pegajoso', 'resbaladizo', 'espinoso',
      'salado', 'ácido', 'agrio', 'picante', 'soso', 'perfumado', 'apestoso', 'silencioso', 'ruidoso', 'chirriante',
      'opaco', 'transparente', 'luminoso', 'oscuro', 'colorido', 'pálido', 'nítido', 'borroso', 'titilante', 'cegador',
    ],
  },
  matematicas: {
    group: 'abstracto',
    words: [
      'álgebra', 'geometría', 'teorema', 'fórmula', 'probabilidad', 'espiral', 'simetría', 'vector', 'fracción', 'cálculo',
      'número', 'cifra', 'ecuación', 'incógnita', 'variable', 'función', 'derivada', 'integral', 'matriz', 'logaritmo',
      'raíz', 'potencia', 'ángulo', 'círculo', 'esfera', 'triángulo', 'cuadrado', 'diámetro', 'perímetro', 'área',
    ],
  },
  tiempo: {
    group: 'abstracto',
    words: [
      'siglo', 'eón', 'década', 'calendario', 'reloj', 'eternidad', 'instante', 'era', 'ciclo', 'pausa',
      'minuto', 'hora', 'día', 'semana', 'mes', 'año', 'milenio', 'cronología', 'época', 'período',
      'pasado', 'presente', 'futuro', 'anochecer', 'amanecer', 'mediodía', 'medianoche', 'estación', 'equinoccio', 'solsticio',
    ],
  },
  geografia: {
    group: 'natural',
    words: [
      'continente', 'península', 'archipiélago', 'llanura', 'estuario', 'fiordo', 'sabana', 'estepa', 'meseta', 'delta',
      'polo', 'ecuador', 'trópico', 'hemisferio', 'paralelo', 'meridiano', 'latitud', 'longitud', 'altitud', 'mapa',
      'frontera', 'territorio', 'región', 'comarca', 'capital', 'urbe', 'aldea', 'puerto', 'bahía', 'estrecho',
    ],
  },
  mitologia: {
    group: 'mental',
    words: [
      'sirena', 'dragón', 'laberinto', 'oráculo', 'ritual', 'altar', 'esfinge', 'ninfa', 'héroe', 'titan',
      'dios', 'diosa', 'semidiós', 'quimera', 'hidra', 'fénix', 'grifo', 'centauro', 'cíclope', 'minotauro',
      'olimpo', 'inframundo', 'paraíso', 'averno', 'valquiria', 'druida', 'chamán', 'tótem', 'amuleto', 'talismán',
    ],
  },
};

// Agrupar categorías relacionadas para cálculo de distancia
export const CATEGORY_GROUPS = {
  natural: ['naturaleza', 'cuerpo', 'comida', 'geografia'],
  abstracto: ['ciencia', 'politica', 'matematicas', 'abstracto', 'tiempo'],
  mental: ['emocion', 'sensorial', 'mitologia'],
  artificial: ['tecnologia', 'arquitectura', 'arte', 'cotidiano'],
};

export default {
  instructions: DAT_INSTRUCTIONS,
  examples: DAT_EXAMPLES,
  strategies: DAT_STRATEGIES,
  validationRules: VALIDATION_RULES,
  semanticCategories: SEMANTIC_CATEGORIES,
  categoryGroups: CATEGORY_GROUPS,
};
