# Seguimiento Fase 1 — NeuroScreen MVP (9 tests + 3 features)

## Estado actual: 9 tests + Mapa de Funcionamiento + Historias + PDF

| # | Test | testId | Tipo | Ítems | Máx | Categorías |
|---|---|---|---|---|---|---|
| 1 | TDAH Adulto | `tdah-adult-v2` | Likert | 16 (A8/B3/C5) | 64 | baja / moderada / alta probabilidad |
| 2 | TEA Adulto | `tea-adult-v1` | Likert | 16 (A4×4) | 64 | baja / moderada / alta probabilidad |
| 3 | Alta Sensibilidad | `hsp-adult-v1` | Likert | 16 (A4×4) | 64 | promedio / moderada / marcada |
| 4 | Alexitimia | `alexitimia-adult-v1` | Likert | 16 (A4×4) | 64 | baja / moderada / marcada |
| 5 | RSD | `rsd-adult-v1` | Likert | 16 (A4×4) | 64 | baja / moderada / marcada |
| 6 | Burnout por Masking | `burnout-masking-v1` | Likert | 13 (A4/B3/C2/D4) | 52 | bajo / moderado / severo |
| 7 | Funciones Ejecutivas | `funciones-ejecutivas-v1` | Likert | 18 (A4/B5/C5/D4) | 72 | preservadas / moderadas / significativas |
| 8 | DAT | `dat-v1` | Tarea | 1 tarea (10 palabras) | 100 | convergente / mod-divergente / alt-divergente |
| 9 | Fluencia Verbal (FAS) | `fas-v1` | Tarea | 1 tarea (60s crono) | ~30+ | baja / moderada / alta fluidez |

## Features implementadas

| Feature | Archivos | Descripción |
|---|---|---|
| **Mapa de Funcionamiento** | `Profile/ProfileMap.jsx` | Dashboard combinado, barras normalizadas, fortalezas/áreas/estrategias |
| **Notas complementariedad** | `utils/sessionResults.js` | 5 reglas entre tests, sessionStorage, alertas en ResultsView |
| **Mejoras DAT** | `datConfig.js`, `DatInput.jsx` | Instrucciones anti-narrativa, detección misma categoría |
| **Historias de Adaptación** | `Stories/AdaptationStoriesPage.jsx`, `data/adaptationStories.js` | 2 historias con perfil matching, ruta `/historias` |
| **Exportación PDF** | `utils/pdfExport.js` | jsPDF texto plano, botón en ResultsView y ProfileMap |
| **Fluencia Verbal (FAS)** | `data/fasConfig.js`, `Test/FasTask.jsx` | Cronómetro 60s, input rápido, categorización, perseveración |

## Rutas

| Ruta | Página |
|---|---|
| `/` | HomePage (9 cards) |
| `/test/:testId` | 9 tests (7 Likert + DAT + FAS) |
| `/perfil` | Mapa de Funcionamiento |
| `/historias` | Historias de Adaptación |
| `/recursos` | Recursos y ayuda profesional |

## Arquitectura final

```
src/
├── data/ (11 archivos)
│   ├── index.js, tdahQuestions, teaQuestions, hspQuestions,
│   │   alexithymiaQuestions, rsdQuestions, burnoutMaskingQuestions,
│   │   executiveQuestions, datConfig, fasConfig, adaptationStories
├── utils/ (4 archivos)
│   ├── scoring.js (8 funciones), wordValidation.js,
│   │   sessionResults.js, pdfExport.js
├── components/
│   ├── Test/ (TestContainer, ResultsView, QuestionCard, DatInput,
│   │   FasTask, ExamplesAccordion, SectionHeader, InstructionsBanner, ProgressBar)
│   ├── Profile/ProfileMap.jsx
│   ├── Stories/AdaptationStoriesPage.jsx
│   ├── Common/DisclaimerModal.jsx
│   ├── Layout/Layout.jsx, HomePage.jsx, RecursosPage.jsx
```

## Pendiente

1. Firebase real (.env) + reglas + rate limiting
2. Tests unitarios (scoring.js × 8)
3. Directorio profesional real en /recursos
4. Metaetiquetas noindex + robots.txt
5. i18n
6. Span de Dígitos (tarea interactiva memoria de trabajo)
7. Code splitting para reducir bundle size (1MB+ actual)
