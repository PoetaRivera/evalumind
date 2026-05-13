// ═══════════════════════════════════════════════════
// Persistencia de resultados en sessionStorage
// para notas de complementariedad entre tests
// ═══════════════════════════════════════════════════

const SESSION_KEY = 'neuroscreen_completed_tests';

function loadAll() {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveAll(data) {
  try {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(data));
  } catch {
    /* storage lleno */
  }
}

export function saveCompletedTest(testId, result) {
  const all = loadAll();
  all[testId] = {
    testId,
    total: result.total,
    category: result.category,
    dimensions: (result.dimensions || []).reduce((acc, d) => {
      acc[d.key] = d.score;
      return acc;
    }, {}),
    profiles: (result.profiles || []).map((p) => p.id),
    completedAt: Date.now(),
  };
  saveAll(all);
}

export function getCompletedTests() {
  return loadAll();
}

export function getCompletedTestIds() {
  return Object.keys(loadAll());
}

export function getCompletedTest(testId) {
  return loadAll()[testId] || null;
}

export function clearCompletedTests() {
  sessionStorage.removeItem(SESSION_KEY);
}

// ═══════════════════════════════════════════════════
// Reglas de complementariedad
// ═══════════════════════════════════════════════════

const COMPLEMENTARITY_RULES = [
  {
    id: 'tdah-rsd',
    condition: (tests) => {
      const tdah = tests['tdah-adult-v2'];
      const rsd = tests['rsd-adult-v1'];
      if (!tdah || !rsd) return false;
      const tdahModerate = tdah.category === 'moderada-probabilidad' || tdah.category === 'alta-probabilidad';
      const rsdModerate = rsd.category === 'rsd-moderada' || rsd.category === 'rsd-marcada';
      return tdahModerate && rsdModerate;
    },
    note:
      'Tu puntuación alta en TDAH y RSD sugiere que estos fenómenos pueden estar conectados. ' +
      'La RSD frecuentemente coexiste con el TDAH y explica por qué algunas personas no se identifican ' +
      'con la hiperactividad física pero sí con tormentas emocionales ante el rechazo.',
  },
  {
    id: 'tea-alexitimia',
    condition: (tests) => {
      const tea = tests['tea-adult-v1'];
      const alex = tests['alexitimia-adult-v1'];
      if (!tea || !alex) return false;
      const teaModerate = tea.category === 'moderada-probabilidad' || tea.category === 'alta-probabilidad';
      const alexModerate = alex.category === 'alexitimia-moderada' || alex.category === 'alexitimia-marcada';
      return teaModerate && alexModerate;
    },
    note:
      'La combinación de rasgos autistas con alexitimia es común. No significa que no sientas, ' +
      'sino que tu procesamiento emocional puede ser más somático que verbal. Muchas personas con TEA ' +
      'experimentan las emociones primero en el cuerpo y luego les ponen nombre.',
  },
  {
    id: 'hsp-rsd',
    condition: (tests) => {
      const hsp = tests['hsp-adult-v1'];
      const rsd = tests['rsd-adult-v1'];
      if (!hsp || !rsd) return false;
      const hspModerate = hsp.category === 'alta-sensibilidad-moderada' || hsp.category === 'alta-sensibilidad-marcada';
      const rsdModerate = rsd.category === 'rsd-moderada' || rsd.category === 'rsd-marcada';
      return hspModerate && rsdModerate;
    },
    note:
      'La alta sensibilidad (HSP) combinada con RSD sugiere que tu sistema nervioso procesa profundamente ' +
      'tanto los estímulos sensoriales como los sociales. Las personas con este perfil suelen necesitar ' +
      'más tiempo de procesamiento después de interacciones sociales y ambientes estimulantes.',
  },
  {
    id: 'tdah-tea',
    condition: (tests) => {
      const tdah = tests['tdah-adult-v2'];
      const tea = tests['tea-adult-v1'];
      if (!tdah || !tea) return false;
      const tdahModerate = tdah.category === 'moderada-probabilidad' || tdah.category === 'alta-probabilidad';
      const teaModerate = tea.category === 'moderada-probabilidad' || tea.category === 'alta-probabilidad';
      return tdahModerate && teaModerate;
    },
    note:
      'Tus resultados sugieren rasgos tanto de TDAH como de TEA. Esta co-ocurrencia es frecuente: ' +
      'muchas personas tienen ambos perfiles (a veces llamado AuDHD). Un profesional especializado ' +
      'puede ayudarte a entender cómo interactúan estas dos condiciones en tu caso particular.',
  },
  {
    id: 'tea-hsp',
    condition: (tests) => {
      const tea = tests['tea-adult-v1'];
      const hsp = tests['hsp-adult-v1'];
      if (!tea || !hsp) return false;
      const teaModerate = tea.category === 'moderada-probabilidad' || tea.category === 'alta-probabilidad';
      const hspModerate = hsp.category === 'alta-sensibilidad-moderada' || hsp.category === 'alta-sensibilidad-marcada';
      return teaModerate && hspModerate;
    },
    note:
      'El TEA y la alta sensibilidad comparten la sensibilidad sensorial y la necesidad de procesamiento ' +
      'profundo. La diferencia clave es que el TEA incluye aspectos de comunicación social y rutinas ' +
      'que no forman parte del rasgo HSP. Un profesional puede ayudarte a distinguir si tienes uno, otro, o ambos.',
  },
];

export function getComplementarityNotes(currentTestId) {
  const allTests = loadAll();
  const notes = [];

  for (const rule of COMPLEMENTARITY_RULES) {
    // Solo mostrar si el test actual está involucrado en la regla
    const ruleIds = rule.id.split('-');
    const involvesCurrent = ruleIds.some((id) => {
      if (id === 'tdah') return currentTestId === 'tdah-adult-v2';
      if (id === 'tea') return currentTestId === 'tea-adult-v1';
      if (id === 'hsp') return currentTestId === 'hsp-adult-v1';
      if (id === 'alexitimia') return currentTestId === 'alexitimia-adult-v1';
      if (id === 'rsd') return currentTestId === 'rsd-adult-v1';
      return false;
    });

    if (involvesCurrent && rule.condition(allTests)) {
      notes.push(rule);
    }
  }

  return notes;
}
