export const adaptationStories = [
  {
    id: 'ingeniero-plc',
    title: 'Del mantenimiento tedioso a la automatización',
    subtitle: 'Cuando la inatención a lo repetitivo se convierte en innovación',
    tags: ['TDAH', 'Pensamiento divergente', 'Automatización', 'Ingeniería'],
    profileMatch: {
      tests: ['tdah-adult-v2', 'dat-v1'],
      minScores: { 'tdah-adult-v2': 23, 'dat-v1': 35 },
    },
    content: {
      before:
        'Trabajaba en mantenimiento electromecánico. Cada día era lo mismo: revisar equipos, reemplazar piezas, llenar checklists. ' +
        'Lo odiaba. No porque fuera difícil, sino porque mi cerebro se apagaba ante la repetición. ' +
        'Termodinámica, mecánica de fluidos, resistencia de materiales... todo lo que era gradual, impreciso y sin "click" de solución me frustraba.',
      turningPoint:
        'Un día, en lugar de reparar el equipo por enésima vez, me pregunté: ¿y si nunca más tuviera que repararlo manualmente? ' +
        'Empecé a programar PLCs Siemens. La parte digital la tenía en tres días. La analógica (fuentes regulables con operacionales) ' +
        'fue un infierno, pero valió la pena.',
      after:
        'Hoy sé que no soy "vago" ni "incapaz de terminar proyectos". Necesito que el problema encienda mi curiosidad estructural. ' +
        'Mi tesis fue un programador de arreglos lógicos programables. No porque fuera fácil, sino porque era el puente entre lo que me torturaba ' +
        'y lo que mi cerebro amaba.',
      lesson:
        'No es que no termines proyectos. Es que necesitas que el proyecto encienda tu curiosidad estructural. Busca roles donde transformes lo analógico en digital, lo tedioso en automatizable.',
    },
    resources: [
      { label: 'Test de TDAH', testId: 'tdah-adulto' },
      { label: 'Test de Pensamiento Divergente', testId: 'dat' },
    ],
  },
  {
    id: 'masking-burnout',
    title: 'Cuando el personaje se vuelve insostenible',
    subtitle: 'El costo invisible de encajar siendo neurodivergente',
    tags: ['TEA', 'RSD', 'Burnout', 'Masking'],
    profileMatch: {
      tests: ['tea-adult-v1', 'rsd-adult-v1'],
      minScores: { 'tea-adult-v1': 25, 'rsd-adult-v1': 25 },
    },
    content: {
      before:
        'Duré cinco años en una oficina corporativa. Cada mañana ensayaba mi sonrisa en el espejo del baño. ' +
        'Contaba los segundos de los abrazos. Forzaba contacto visual hasta que me dolían los ojos. ' +
        'A las 6 PM llegaba a casa y no podía hablar. No con tristeza, con agotamiento absoluto.',
      turningPoint:
        'Colapsé un viernes común. No hubo tragedia, solo que ya no pude levantarme de la cama el lunes. ' +
        'Mi terapeuta me preguntó: "¿Y si no tuvieras que actuar?" No entendía la pregunta. Para mí, actuar era vivir.',
      after:
        'Hoy trabajo remoto. Tengo un grupo pequeño de amigos que me aceptan sin que sonría "correctamente". ' +
        'Aprendí que el masking es supervivencia, no virtud. Y que la recuperación no es volver a ser "productivo", ' +
        'es dejar de ser otra persona.',
      lesson:
        'El burnout por masking no se cura con vacaciones. Se cura con espacios donde no necesites máscara. Si tu entorno exige que actúes para existir, el problema no eres tú.',
    },
    resources: [
      { label: 'Test de TEA', testId: 'tea-adulto' },
      { label: 'Test de RSD', testId: 'rsd-adulto' },
      { label: 'Test de Burnout por Masking', testId: 'burnout-masking' },
    ],
  },
];

/**
 * Encuentra historias que coinciden con los resultados del usuario.
 */
export function findMatchingStories(completedTests) {
  return adaptationStories.filter((story) => {
    const { tests, minScores } = story.profileMatch;
    return tests.every((testId) => {
      const userTest = completedTests[testId];
      if (!userTest) return false;
      const minScore = minScores[testId] || 0;
      return userTest.total >= minScore;
    });
  });
}
