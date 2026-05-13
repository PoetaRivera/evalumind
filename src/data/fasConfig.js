export const FAS_LETTERS = ['F', 'A', 'S'];

export const FAS_DURATION = 60;

export const FAS_RULES = [
  'Escribe palabras que comiencen con la letra asignada.',
  'No uses nombres propios, lugares ni marcas.',
  'No uses variantes de la misma palabra (gato, gatito).',
  'No uses verbos conjugados (usa el infinitivo).',
  'Presiona Enter después de cada palabra.',
];

// Diccionario simple de categorías para clasificación
export const FAS_CATEGORIES = {
  animales: ['gato', 'perro', 'pez', 'oso', 'ave', 'foca', 'araña', 'sapo', 'serpiente', 'águila', 'abeja', 'asno', 'alce', 'anguila', 'avestruz', 'ardilla', 'faisán', 'flamenco'],
  alimentos: ['fresa', 'arroz', 'sopa', 'frijol', 'sandía', 'fideo', 'azúcar', 'salchicha', 'salmón', 'atún', 'aceite', 'avena', 'almendra', 'apio', 'frambuesa', 'sardina'],
  objetos: ['silla', 'foco', 'aro', 'sábana', 'falda', 'sombrero', 'funda', 'sartén', 'anillo', 'alfombra', 'aguja', 'armario', 'archivo', 'sillón', 'fuelle', 'silbato'],
  lugares: ['fábrica', 'aldea', 'salón', 'finca', 'sótano', 'ático', 'aeropuerto', 'andén', 'acera', 'sala', 'aula', 'farmacia', 'auditorio'],
  abstracto: ['fuerza', 'amor', 'suerte', 'fe', 'alma', 'furor', 'ansiedad', 'sabiduría', 'alegría', 'asco', 'asco', 'afán', 'saña', 'furia', 'sosiego', 'altivez'],
  cuerpo: ['abdomen', 'axila', 'fémur', 'sangre', 'arteria', 'apéndice', 'antebrazo', 'frente'],
  naturaleza: ['flor', 'sol', 'aire', 'arroyo', 'selva', 'fuego', 'arena', 'suelo', 'amanecer', 'atardecer'],
  ciencia: ['átomo', 'fuerza', 'aceleración', 'frecuencia', 'algoritmo', 'sistema', 'aerodinámica'],
};

const wordToCategory = new Map();
for (const [cat, words] of Object.entries(FAS_CATEGORIES)) {
  for (const w of words) {
    wordToCategory.set(w.toLowerCase(), cat);
  }
}

export function classifyFASWord(word) {
  return wordToCategory.get(word.toLowerCase()) || 'otros';
}

export default {
  letters: FAS_LETTERS,
  duration: FAS_DURATION,
  rules: FAS_RULES,
  categories: FAS_CATEGORIES,
  classifyWord: classifyFASWord,
};
