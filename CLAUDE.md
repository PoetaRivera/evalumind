# CLAUDE.md — EvaluMind

Proyecto React/Vite de autoobservación personal y educativa para adultos. 20 herramientas (7 cuestionarios + 13 tareas interactivas) con historial local, tendencias personales con contexto, mapa de funcionamiento, notas de complementariedad y exportación PDF.

## Comandos

```bash
npm run dev          # Desarrollo (Vite)
npm run build        # Build producción → dist/
npm test             # Tests unitarios (Vitest)
npm run test:e2e     # Tests E2E (Playwright)
npm run lint         # ESLint
firebase deploy      # Deploy a evalumind-app
```

## Variables de entorno (`.env`)

```
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=evalumind-app.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=evalumind-app
VITE_FIREBASE_STORAGE_BUCKET=evalumind-app.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
```

Sin Firebase, la app funciona con resultados, tendencias y notas de contexto locales (`localStorage`).

## Arquitectura

```
src/
├── data/
│   ├── index.js                     ← TEST_REGISTRY con 20 tests
│   ├── testMetadata.js              ← getAllTestCards() para HomePage
│   ├── [7 archivos de preguntas Likert]
│   ├── datConfig.js, fasConfig.js, socialScenarios.js, rmetStimuli.js
│   └── adaptationStories.js
├── utils/ (15 archivos)
│   ├── scoring.js                   ← createLikertScorer factory + calculateDatScore
│   ├── scoring.test.js (71 tests), fasScoring.test.js (11 tests)
│   └── [13 scorers específicos: sart, flanker, digitSpan, navon, switch,
│        fer, selfDiscrepancy, socialScenarios, fas, hsp (sensory+auditory)]
├── components/
│   ├── Test/ (23 archivos)
│   │   ├── TestContainer.jsx        ← Orquestador con switch para 20 tests
│   │   ├── ResultsView.jsx          ← Radar, dimensiones, contexto local, PDF, complementariedad
│   │   ├── 13 tareas interactivas (SART, Flanker, DigitSpan, Navon, RMET,
│   │   │   Switch, SensoryThreshold, AuditoryDistraction, FER, SelfDiscrepancy,
│   │   │   SocialScenarios, FasTask, DatInput)
│   │   └── QuestionCard, ProgressBar, SectionHeader, InstructionsBanner,
│   │       ExamplesAccordion, TestContainer.css
│   ├── Common/ (DisclaimerModal, ErrorBoundary, NotFound)
│   ├── Layout/, Profile/, Stories/, HomePage, RecursosPage
├── hooks/
│   ├── useTestSubmission.js         ← Guardado local + Firestore opcional + rate limit
│   └── usePageVisibility.js         ← Pausa tareas al cambiar pestaña
├── firebase/config.js
├── App.jsx                          ← 6 rutas + lazy + Suspense + ErrorBoundary
└── main.jsx
```

## Rutas

| Ruta | Contenido |
|---|---|
| `/` | HomePage (20 cards) |
| `/test/:testId` | Cualquiera de los 20 tests |
| `/perfil` | Mapa personal, tendencias e historial local |
| `/historias` | Historias de Adaptación |
| `/recursos` | Recursos profesionales |
| `*` | NotFound (404) |

## Estado actual (2026-05-15)

- **158 tests unitarios** pasando y suite E2E estable en Chromium
- **Firebase**: proyecto `evalumind-app`, Firestore `(default)` en nam5, envío remoto desactivado por defecto
- **Producción**: https://evalumind-app.web.app
- **GitHub**: https://github.com/PoetaRivera/evalumind
- **Modo oscuro**: `prefers-color-scheme: dark` con 44 custom properties
- **OpenDyslexic**: toggle en header (localStorage), hook `useDyslexicFont`, clase `font-dyslexic` en `<html>`
- **20 tests completamente implementados** (ninguno es stub)
- **data-testid** en cards, navegación, resultados, estímulos y overlays de pausa
- **Pausa por visibilidad** en los 6 tests cronometrados (usePageVisibility)
- **Botones touch** en todas las tareas de teclado (SART, Flanker, Navon, Switch, Auditory, Sensory)
- **RT real** (performance.now) en todas las tareas cronometradas

## Seguimiento

Ver `seguimiento-fase1.md` para el historial completo de fases, correcciones y evolución del proyecto.
