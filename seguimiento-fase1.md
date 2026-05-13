# Seguimiento Fase 1 — NeuroScreen MVP

## Estado: 9 tests + 5 features + testing + correcciones post-evaluación

### Evaluación profesional (2026-05-13)
Evaluación con 5 agentes en paralelo encontró 36 issues. Plan de implementación en 5 fases, todas completadas.

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

### Tests de screening

| # | Test | testId | Tipo | Ítems | Máx | Categorías |
|---|---|---|---|---|---|---|
| 1 | TDAH Adulto | `tdah-adult-v2` | Likert | 16 (A8/B3/C5) | 64 | baja / moderada / alta probabilidad |
| 2 | TEA Adulto | `tea-adult-v1` | Likert | 16 (A4×4) | 64 | baja / moderada / alta probabilidad |
| 3 | Alta Sensibilidad | `hsp-adult-v1` | Likert | 16 (A4×4) | 64 | promedio / moderada / marcada sensibilidad |
| 4 | Alexitimia | `alexitimia-adult-v1` | Likert | 16 (A4×4) | 64 | baja / moderada / marcada alexitimia |
| 5 | RSD | `rsd-adult-v1` | Likert | 16 (A4×4) | 64 | baja / moderada / marcada RSD |
| 6 | Burnout por Masking | `burnout-masking-v1` | Likert | 13 (A4/B3/C2/D4) | 52 | bajo / moderado / severo |
| 7 | Funciones Ejecutivas | `funciones-ejecutivas-v1` | Likert | 18 (A4/B5/C5/D4) | 72 | preservadas / moderadas / significativas |
| 8 | DAT | `dat-v1` | Tarea | 1 tarea (10 palabras) | 100 | convergente / moderadamente-divergente / altamente-divergente |
| 9 | Fluencia Verbal (FAS) | `fas-v1` | Tarea | 1 tarea (60s crono) | ~30+ | baja / moderada / alta fluidez |

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
| **Total unitarios** | | | **82** | **82 pass** |
| E2E (flujos completos) | E2E | Playwright | 31 | 28 pass, 3 skip, 0 fail |

```
npm run test         # 82 tests unitarios (<1s)
npm run test:e2e     # 31 tests de flujo (~10s)
```

### Despliegue

| Servicio | URL |
|---|---|
| Producción | https://neuroscreen-app.web.app |
| Firebase Console | https://console.firebase.google.com/project/neuroscreen-app |
| GitHub | https://github.com/PoetaRivera/neuroscreen |

### Arquitectura final

```
src/
├── data/ (11 archivos)
│   ├── index.js                    ← Registro: 9 tests
│   ├── tdahQuestions.js            ← 16 ítems + LIKERT_OPTIONS
│   ├── teaQuestions.js             ← 16 ítems
│   ├── hspQuestions.js             ← 16 ítems
│   ├── alexithymiaQuestions.js     ← 16 ítems
│   ├── rsdQuestions.js             ← 16 ítems
│   ├── burnoutMaskingQuestions.js  ← 13 ítems
│   ├── executiveQuestions.js       ← 18 ítems
│   ├── datConfig.js                ← Instrucciones, ejemplos, categorías semánticas
│   ├── fasConfig.js                ← Letras, reglas, categorías FAS
│   └── adaptationStories.js        ← 2 historias + perfil matching
├── utils/ (8 archivos)
│   ├── scoring.js                  ← Factory createLikertScorer + calculateDatScore
│   ├── scoring.test.js             ← 71 tests unitarios
│   ├── fasScoring.js               ← Scoring FAS extraído (testeable)
│   ├── fasScoring.test.js          ← 11 tests unitarios
│   ├── wordValidation.js           ← Validación de palabras DAT
│   ├── sessionResults.js           ← Persistencia + 9 reglas complementariedad
│   └── pdfExport.js                ← Exportación PDF con jsPDF
├── components/
│   ├── Test/ (10 archivos)
│   │   ├── TestContainer.jsx       ← Orquestador: Likert + DAT + FAS
│   │   ├── QuestionCard.jsx        ← Pregunta Likert + ejemplos (React.memo)
│   │   ├── DatInput.jsx            ← Input palabras + chips + validación
│   │   ├── FasTask.jsx             ← Cronómetro 60s, usa calculateFasScore
│   │   ├── ResultsView.jsx         ← Resultados, static objects + useMemo
│   │   ├── ExamplesAccordion.jsx   ← (React.memo)
│   │   ├── SectionHeader.jsx       ← Sin ARIA redundante
│   │   ├── InstructionsBanner.jsx  ← Sin conflicto ARIA
│   │   ├── ProgressBar.jsx         ← position: relative fix
│   │   └── TestContainer.css      ← Focus indicators, contrastes, tablet bp
│   ├── Common/
│   │   ├── DisclaimerModal.jsx     ← Focus trap + Escape + autoFocus
│   │   ├── ErrorBoundary.jsx       ← Fallback UI
│   │   └── NotFound.jsx            ← 404 page
│   ├── Profile/ProfileMap.jsx      ← Dashboard con max real + role="progressbar"
│   ├── Stories/AdaptationStoriesPage.jsx
│   ├── Layout/Layout.jsx           ← <h1><NavLink> + aria-current
│   ├── HomePage.jsx + HomePage.css
│   └── RecursosPage.jsx + RecursosPage.css
├── hooks/useTestSubmission.js      ← Firestore + sessionStorage + rate limit
├── firebase/config.js              ← Validación de env vars
├── App.jsx                         ← 6 rutas + ErrorBoundary + React.lazy + Suspense + 404
└── main.jsx
```

### Rutas

| Ruta | Página |
|---|---|
| `/` | HomePage (9 cards + enlaces) |
| `/test/:testId` | 9 tests (7 Likert + DAT + FAS) |
| `/perfil` | Mapa de Funcionamiento |
| `/historias` | Historias de Adaptación |
| `/recursos` | Recursos y ayuda profesional |
| `*` | NotFound (404) |

### Pendiente

1. **Firestore API**: habilitar en Google Cloud Console (`firestore.googleapis.com`) y crear base de datos
2. **Desplegar reglas de seguridad**: `firebase deploy --only firestore:rules`
3. **Deploy final** con build actualizado: `npm run build && firebase deploy`
4. Directorio profesional real en `/recursos`
5. i18n (multi-idioma)
6. Modo oscuro (`prefers-color-scheme`)
7. Tipografía opcional para dislexia (OpenDyslexic)
8. Span de Dígitos (tarea interactiva de memoria de trabajo)
9. Mejora tests E2E: reemplazar `dispatchEvent` por `click()`, agregar Firefox/WebKit
10. Tests unitarios para `wordValidation.js` y `sessionResults.js`

### Por dónde seguir

1. **Inmediato**: Habilitar Cloud Firestore API → crear BD → desplegar reglas → hacer deploy
2. **Siguiente iteración**: Mejorar tests E2E + agregar tests unitarios faltantes
3. **Features futuras**: Span de Dígitos, directorio profesional real, modo oscuro, i18n
