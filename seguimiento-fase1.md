# Seguimiento Fase 1 — EvaluMind MVP

## Estado: 20 tests registrados + 10 features + testing + correcciones post-evaluación

### Evaluación profesional (2026-05-13)
Evaluación con 5 agentes en paralelo encontró 36 issues. Plan de implementación en 5 fases, todas completadas.

### Commits recientes (2026-05-15)
- `d929803` — **Rebrand NeuroScreen → EvaluMind**: 19 archivos renombrados (package.json, index.html, Layout, sessionStorage/localStorage keys, pdfExport, e2e, docs). Repo GitHub renombrado a `PoetaRivera/evalumind`
- `87c78ea` — **Corrección bugs P0**: usePageVisibility hook (pausa al cambiar pestaña), botones touch en SART/Flanker/Navon/Switch/AuditoryDistraction, RT real en SensoryThreshold, data-testid en 10 componentes
- `53ffdd2` — **Fix firestore.rules**: elimina función `validOptionalString` sin uso que generaba warning de compilación
- `2e088d8` — **testMetadata.js + refinamientos visuales**: metadata centralizada de 20 tests (7 Likert + 13 tareas conductuales) con `getAllTestCards()`

### Infraestructura (2026-05-15)
- ✅ Nuevo proyecto Firebase `evalumind-app` creado desde CLI
- ✅ Firestore API habilitada + BD `(default)` creada
- ✅ Web App registrada, credenciales en `.env`
- ✅ `firestore.rules` desplegado (0 warnings)
- ✅ Build + deploy completado (`d929803`)
- 🌎 **Producción**: https://evalumind-app.web.app
- 🔗 **GitHub**: https://github.com/PoetaRivera/evalumind

---

### Correcciones implementadas (5 fases, 36 issues resueltos)

#### Fase 1: Seguridad y protección de datos ✅
- `firestore.rules` creado: solo permite `create` con campos validados, bloquea lecturas
- `firebase.json` actualizado con headers de seguridad (CSP, HSTS, X-Frame-Options, X-Content-Type-Options)
- `userAgent` eliminado del payload de Firestore (anti-fingerprinting)
- Rate limiting cliente: `useRef` flag previene envíos duplicados
- `firebase/config.js`: validación de variables de entorno, `db = null` si no configurado

#### Fase 2: Bugs funcionales críticos ✅
- **ProfileMap normalización**: guarda `maxScores` y `max` por dimensión en sessionStorage, usa valores reales en vez de hardcodear 16
- **PDF export**: lee `maxScores` desde datos guardados, eliminado hardcodeo de maxScores
- **ProgressBar CSS**: `position: relative` agregado a `.progress-bar-wrapper`, texto blanco con text-shadow
- **Focus indicators**: `:focus-within` en `.likert-label`, `:focus-visible` global para botones/links
- **Factory scoring**: `createLikertScorer(config)` refactoriza 7 funciones Likert (~80% código eliminado)
- **ErrorBoundary**: `src/components/Common/ErrorBoundary.jsx` con fallback UI

#### Fase 3: Seguridad y estructura (alto) ✅
- **FAS scoring extraído**: `src/utils/fasScoring.js` — `calculateFasScore(words, letter)` testeable
- **Ruta 404**: `src/components/Common/NotFound.jsx`
- **Complementariedad mejorada**: 9 reglas (4 nuevas: RSD+Burnout, Ejecutivas+TDAH, Ejecutivas+TEA, Alexitimia+Burnout), campo `tests[]` explícito
- **Code splitting**: `React.lazy()` para RecursosPage, ProfileMap, AdaptationStoriesPage, NotFound. Main bundle: ~973KB
- **React.memo**: QuestionCard, ExamplesAccordion
- **WCAG AA**: `.test-nav-hint` (#999→#666), `.test-card-info` (#888→#555), `.results-profiles li` (#2c6faa→#1a5276)
- **Focus trap + Escape**: DisclaimerModal con `useEffect` para atrapar foco dentro del modal
- **Static objects**: `CATEGORY_LABELS` y `CATEGORY_COLORS` movidos a nivel módulo, `useMemo` en complementarityNotes
- **ARIA fixes**: SectionHeader sin `role="heading"` redundante, InstructionsBanner sin conflicto `role="alert"`+`aria-live`, `aria-live` en status messages, `role="alert"` en errores, Layout con `<h1><NavLink>` y `aria-current`

#### Fase 4: CSS y estilos ✅
- **CSS custom properties**: `:root` con `--color-primary`, `--color-dark`, `--color-text`, `--radius-*`, `--shadow-*`
- **Separación de page styles**: `HomePage.css`, `RecursosPage.css` extraídos de `index.css`
- **Breakpoint tablet**: `@media (max-width: 768px)` en TestContainer.css
- **Header responsive**: movido de TestContainer.css a Layout.css
- **Botones globales**: `.btn`, `.btn-primary`, `.btn-secondary`, `.btn-link` en `index.css`

#### Fase 5: HTML, SEO, testing y correcciones menores ✅
- **index.html**: `lang="es"`, meta description, Open Graph tags, title descriptivo
- **robots.txt**: `public/robots.txt`
- **favicon.svg**: icono NS personalizado
- **Nuevos tests unitarios**: `fasScoring.test.js` (11 tests)
- **Emoji aria-hidden**: DatInput emojis con `aria-hidden="true"`
- **Timer FAS**: `role="alert"` en mensajes de error
- **ProfileMap**: `window.location.reload()` → `navigate('/')`, `role="progressbar"` en barras de dimensión

---

### Tests (20 — 7 Likert + 13 tareas interactivas)

| # | Test | testId | Tipo | Trials/Ítems | Scoring |
|---|---|---|---|---|---|
| 1 | TDAH Adulto | `tdah-adult-v2` | Likert | 16 ítems | `calculateTdahScore` |
| 2 | TEA Adulto | `tea-adult-v1` | Likert | 16 ítems | `calculateTeaScore` |
| 3 | Alta Sensibilidad (HSP) | `hsp-adult-v1` | Likert | 16 ítems | `calculateHspScore` |
| 4 | Alexitimia | `alexitimia-adult-v1` | Likert | 16 ítems | `calculateAlexithymiaScore` |
| 5 | RSD | `rsd-adult-v1` | Likert | 16 ítems | `calculateRsdScore` |
| 6 | Burnout por Masking | `burnout-masking-v1` | Likert | 13 ítems | `calculateMaskingBurnoutScore` |
| 7 | Funciones Ejecutivas | `funciones-ejecutivas-v1` | Likert | 18 ítems | `calculateExecutiveScore` |
| 8 | DAT (Asociación Divergente) | `dat-v1` | Tarea | 10 palabras | `calculateDatScore` |
| 9 | Fluencia Verbal (FAS) | `fas-v1` | Tarea | 60s crono | `calculateFasScore` |
| 10 | Escenarios Sociales (RSD) | `social-scenarios` | Tarea | 16 escenarios | `calculateSocialScenariosScore` |
| 11 | Auto-Discrepancia (Masking) | `self-discrepancy` | Tarea | 25 rasgos × 2 | `calculateSelfDiscrepancyScore` |
| 12 | Reconocimiento Emocional (Faces) | `fer` | Tarea | 30 situaciones | `calculateFERScore` |
| 13 | Atención Sostenida (SART) | `sart` | Tarea | 180 trials | `calculateSARTScore` |
| 14 | Control Inhibitorio (Flanker) | `flanker` | Tarea | 100 trials | `calculateFlankerScore` |
| 15 | Span de Dígitos (Memoria) | `digit-span` | Tarea | 2 fases × 8 niveles | `calculateDigitSpanScore` |
| 16 | Figuras de Navon | `navon` | Tarea | 96 trials | `calculateNavonScore` |
| 17 | RMET (Teoría de la Mente) | `rmet` | Tarea | 24 estímulos | Inline en componente |
| 18 | Cambio de Tarea (Flexibilidad) | `switch-task` | Tarea | 96 trials | `calculateSwitchScore` |
| 19 | Umbral Sensorial (HSP) | `sensory-threshold` | Tarea | 40 trials | `calculateSensoryThresholdScore` |
| 20 | Distracción Auditiva (HSP) | `auditory-distraction` | Tarea | 60 trials | `calculateAuditoryDistractionScore` |

### Features implementadas

| # | Feature | Ruta | Descripción |
|---|---|---|---|
| 1 | Mapa de Funcionamiento | `/perfil` | Dashboard combinado, barras con max real, fortalezas/áreas/estrategias |
| 2 | Notas de complementariedad | ResultsView | 9 reglas (TDAH+RSD, TEA+Alexitimia, HSP+RSD, TDAH+TEA, TEA+HSP, RSD+Burnout, Ejecutivas+TDAH, Ejecutivas+TEA, Alexitimia+Burnout) |
| 3 | Historias de Adaptación | `/historias` | 2 historias narrativas con perfil matching |
| 4 | Exportación PDF | ResultsView + ProfileMap | jsPDF, usa maxScores reales |
| 5 | Mejoras DAT | DatInput | Instrucciones anti-narrativa, detección misma categoría, warning específico |
| 6 | Seguridad Firestore | `firestore.rules` | Reglas de validación de schema, rate limiting cliente |
| 7 | Code splitting | App.jsx | React.lazy + Suspense para rutas secundarias |
| 8 | Error Boundary | App.jsx | Fallback UI si un componente crashea |
| 9 | Ruta 404 | `*` | NotFound page |
| 10 | SEO | index.html | meta description, OG tags, robots.txt |

### Testing

| Suite | Tipo | Framework | Tests | Estado |
|---|---|---|---|---|
| Unitarios (scoring) | Unit | Vitest | 71 | 71 pass |
| Unitarios (FAS scoring) | Unit | Vitest | 11 | 11 pass |
| Unitarios (wordValidation) | Unit | Vitest | 20 | 20 pass |
| Unitarios (sessionResults) | Unit | Vitest | 23 | 23 pass |
| **Total unitarios** | | | **125** | **125 pass** |
| E2E (flujos completos) | E2E | Playwright | 93 | 84 pass, 9 skip, 0 fail |
| | | Chromium | 31 | 28 pass, 3 skip |
| | | Firefox | 31 | 28 pass, 3 skip |
| | | WebKit | 31 | 28 pass, 3 skip |

```
npm run test         # 125 tests unitarios (<2s)
npm run test:e2e     # 93 tests de flujo (~2 min en 3 navegadores)
```

### Despliegue

| Servicio | URL |
|---|---|
| Producción | https://evalumind-app.web.app |
| Firebase Console | https://console.firebase.google.com/project/evalumind-app |
| GitHub | https://github.com/PoetaRivera/evalumind |

### Arquitectura actual

```
src/
├── data/ (14 archivos)
│   ├── index.js                     ← TEST_REGISTRY con 20 tests
│   ├── testMetadata.js              ← getAllTestCards() para HomePage
│   ├── [7 archivos de preguntas Likert]
│   ├── datConfig.js, fasConfig.js, socialScenarios.js, rmetStimuli.js
│   └── adaptationStories.js
├── utils/ (15 archivos)
│   ├── scoring.js                   ← createLikertScorer factory + calculateDatScore
│   ├── scoring.test.js (71 tests), fasScoring.test.js (11 tests)
│   └── [13 scorers: sart, flanker, digitSpan, navon, switch, fer,
│        selfDiscrepancy, socialScenarios, fas, hsp (sensory+auditory),
│        wordValidation, sessionResults, pdfExport]
├── components/
│   ├── Test/ (23 archivos)
│   │   ├── TestContainer.jsx        ← Orquestador: switch para 20 tests
│   │   ├── 13 tareas interactivas (SARTTask, FlankerTask, DigitSpanTask,
│   │   │   NavonTask, RMETTask, SwitchTask, SensoryThresholdTask,
│   │   │   AuditoryDistractionTask, FERTask, SelfDiscrepancyTask,
│   │   │   SocialScenariosTask, FasTask, DatInput)
│   │   └── QuestionCard, ProgressBar, SectionHeader, InstructionsBanner,
│   │       ExamplesAccordion, ResultsView, TestContainer.css
│   ├── Common/ (DisclaimerModal, ErrorBoundary, NotFound)
│   ├── Layout/, Profile/, Stories/, HomePage, RecursosPage
├── hooks/
│   ├── useTestSubmission.js         ← Firestore + sessionStorage + rate limit
│   └── usePageVisibility.js         ← Pausa por cambio de pestaña
├── firebase/config.js
├── App.jsx                          ← 6 rutas + lazy + Suspense + ErrorBoundary
└── main.jsx
```

### Rutas

| Ruta | Página |
|---|---|
| `/` | HomePage (20 cards: 7 Likert + 13 tareas) |
| `/test/:testId` | 20 tests (cualquiera del registro) |
| `/perfil` | Mapa de Funcionamiento |
| `/historias` | Historias de Adaptación |
| `/recursos` | Recursos y ayuda profesional |
| `*` | NotFound (404) |

### Pendiente

1. ~~Firestore API + BD + reglas + deploy~~ ✅ Completado 2026-05-15
2. Directorio profesional real en `/recursos`
3. i18n (multi-idioma)
4. Modo oscuro (`prefers-color-scheme`)
5. Tipografía opcional para dislexia (OpenDyslexic)
6. ~~Mejora tests E2E: reemplazar `dispatchEvent` por `click()`, agregar Firefox/WebKit~~ ✅ Completado 2026-05-15
7. ~~Tests unitarios para `wordValidation.js` y `sessionResults.js`~~ ✅ Completado 2026-05-15
8. Eliminar proyecto viejo `neuroscreen-app` de Firebase (manual en consola)

### Por dónde seguir

1. ~~Inmediato: push, Firestore, deploy~~ ✅ Completado 2026-05-15
2. ~~Rebrand NeuroScreen → EvaluMind~~ ✅ Completado 2026-05-15
3. ~~**Mejoras testing**: Reemplazar `dispatchEvent` por `click()` en E2E, agregar Firefox/WebKit, tests unitarios para `wordValidation.js` y `sessionResults.js`~~ ✅ Completado 2026-05-15
4. **Features futuras**: directorio profesional real, modo oscuro, i18n, tipografía dislexia
5. **UX avanzada**: tiempos estimados por test en cards, disclaimer cultural RMET, guardar respuestas detalladas en sessionStorage (RT, errores por tipo)
