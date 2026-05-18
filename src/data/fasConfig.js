// ═══════════════════════════════════════════════════════
// COWAT — Controlled Oral Word Association Test (FAS)
// Benton & Hamsher (1989), Multilingual Aphasia Examination
// 3 letras (F, A, S), 60 segundos por letra
// Normas: Ruff et al. (1996), Loonstra et al. (2001)
// DOI metanormas: 10.1207/S15324826AN0803_5
// Normas español: Olabarrieta-Landa et al. (2015)
// ═══════════════════════════════════════════════════════

export const FAS_LETTERS = ['F', 'A', 'S'];

export const FAS_DURATION = 60;

export const FAS_RULES = [
  'Escribe palabras que comiencen con la letra de la ronda.',
  'No uses nombres propios, lugares ni marcas.',
  'No uses números ni los escribas con letras.',
  'No uses variantes de la misma palabra (flor, flores, florecer = solo la primera).',
  'No repitas palabras que ya hayas escrito en esta ronda o en rondas anteriores.',
  'Presiona Enter después de cada palabra.',
];
