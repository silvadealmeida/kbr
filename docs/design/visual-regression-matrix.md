# Matriz de Verificação Visual e Regressão Responsiva — Fase 14

> **Data:** 13 de novembro de 2026  
> **Motores verificados:** Chromium headless (matriz completa de 9 viewports × 2 temas + projetos Playwright `mobile-375`, `mobile-390`, `tablet-768`, `desktop-1280`) e WebKit (`webkit-390` / `iPhone 13`).

---

## 1. Matriz de Viewports e Temas Inspecionados

Cada combinação abaixo foi verificada com medição de `scrollWidth <= innerWidth`, checagem de elementos transbordantes, alvos de toque, `lang="ko"` e sobreposição da navegação fixa:

| Viewport | Dimensões (px) | Categoria | Tema Claro | Tema Escuro | Overflow Horizontal | Sobreposição Nav Inferior |
|---|---|---|---|---|---|---|
| Mobile estreito | `320 × 700` | Mobile pequeno / reflow | OK (29 estados) | OK (29 estados) | `0 px` | Nenhuma |
| Mobile Android comum | `360 × 800` | Mobile | OK (29 estados) | OK (29 estados) | `0 px` | Nenhuma |
| **Mobile prioritário 1** | **`375 × 812`** | **iPhone SE / Mini / X** | **OK (29 estados)** | **OK (29 estados)** | **`0 px`** | **Nenhuma** |
| **Mobile prioritário 2** | **`390 × 844`** | **iPhone 13 / 14** | **OK (29 estados)** | **OK (29 estados)** | **`0 px`** | **Nenhuma** |
| Mobile amplo | `430 × 932` | iPhone Pro Max / Plus | OK (29 estados) | OK (29 estados) | `0 px` | Nenhuma |
| Tablet retrato | `768 × 1024` | iPad Mini / Air | OK (29 estados) | OK (29 estados) | `0 px` | Sidebar lateral ativa (`≥768 px`) |
| Tablet paisagem | `1024 × 768` | Tablet landscape / laptop | OK (29 estados) | OK (29 estados) | `0 px` | Sidebar lateral ativa |
| Desktop padrão | `1280 × 800` | Desktop | OK (29 estados) | OK (29 estados) | `0 px` | Sidebar lateral ativa |
| Desktop amplo | `1440 × 900` | Desktop widescreen | OK (29 estados) | OK (29 estados) | `0 px` | Sidebar lateral ativa |

---

## 2. Matriz por Superfície e Estado

| Superfície | Rota / Estado | Viewports de Captura (`before/` e `after/`) | Verificações Automatizadas (Playwright + Axe) |
|---|---|---|---|
| Landing pública | `/` (padrão e `?motivo=sessao-expirada`) | `320×700`, `375×812`, `390×844`, `768×1024`, `1280×800` (claro/escuro) | `e2e/smoke.spec.ts`, `e2e/a11y.spec.ts`, `e2e/performance.spec.ts`, `e2e/mobile.spec.ts` (zoom 150%) |
| Páginas legais e erro | `/privacidade`, `/impressum`, `/auth/error` | `320×700`, `375×812`, `390×844`, `1280×800` (claro/escuro) | `e2e/smoke.spec.ts`, `e2e/a11y.spec.ts`, `e2e/mobile.spec.ts` (alvos TOC ≥44 px e zoom 150%) |
| Painel autenticado | `/dashboard` (vazio, parcial, concluído, offline) | `320×700`, `375×812`, `390×844`, `768×1024`, `1280×800` (claro/escuro) | `e2e/dashboard.spec.ts`, `e2e/a11y.spec.ts`, `e2e/performance.spec.ts` |
| Catálogo de cursos | `/cursos` (disponíveis `01`–`04`, bloqueados, concluídos, planejados) | `320×700`, `375×812`, `390×844`, `768×1024`, `1280×800` (claro/escuro) | `e2e/courses.spec.ts`, `e2e/catalog-layout.spec.ts` (simetria lateral ≤2 px) |
| Atlas do Hangul | `/hangul` (em andamento, completo, `SyllableAnatomy`, `SoundMap`) | `320×700`, `375×812`, `390×844`, `768×1024`, `1280×800` (claro/escuro) | `e2e/hangul.spec.ts`, `e2e/performance.spec.ts` |
| Player e bancada Hangul | `/hangul/h01`, `/hangul/h04`, `/hangul/h16`, `/hangul/h21` | `320×700`, `375×812`, `390×844`, `768×1024`, `1280×800` (claro/escuro) | `e2e/hangul.spec.ts`, `e2e/mobile.spec.ts`, `e2e/webkit.spec.ts`, `e2e/performance.spec.ts` |
| Checkpoints e conclusão Hangul | `/hangul/c1`, `/hangul/c4` (bloqueado, prática, diagnóstico, concluído) | `320×700`, `375×812`, `390×844`, `768×1024`, `1280×800` (claro/escuro) | `e2e/hangul.spec.ts`, `e2e/performance.spec.ts` |
| Cursos A1, A2 e B1 | `/a1`, `/a1/a1-l01`, `/a2` (bloqueado/aberto), `/b1`, `/b1/b1-l01`, `/b1/b1-l23`, `/b1/b1-c01` | `320×700`, `375×812`, `390×844`, `768×1024`, `1280×800` (claro/escuro) | `e2e/a1.spec.ts`, `e2e/a2.spec.ts`, `e2e/b1.spec.ts`, `e2e/mobile.spec.ts` (rubrica ≥44 px) |
| Vocabulário e revisão | `/vocabulario`, `/vocabulario/revisao` (contextual + flashcard), `/revisao` | `320×700`, `375×812`, `390×844`, `768×1024`, `1280×800` (claro/escuro) | `e2e/vocabulary.spec.ts`, `e2e/review.spec.ts`, `e2e/mobile.spec.ts` (`h1` único, `ProgressBar`, alvos ≥44 px) |
| Prática de fala | `/fala` (sem API, remoto com consentimento, local, fallback de texto) | `320×700`, `375×812`, `390×844`, `768×1024`, `1280×800` (claro/escuro) | `e2e/speech.spec.ts` (Chromium + WebKit, axe claro/escuro) |

---

## 3. Testes de Regressão Visual e Responsiva Adicionados

Em `e2e/mobile.spec.ts`:
1. **`sessões ativas de revisão mantêm h1 único e controles acima da barra inferior`**: verifica em `375 × 812` que `/revisao` e `/vocabulario/revisao` mantêm exatamente um `<h1>` tanto na visão geral quanto na sessão ativa, exibem `role="progressbar"` (`Progresso da sessão`) e não geram overflow horizontal.
2. **`alvos de toque em vocabulário, rubrica de produção e sumário legal têm ≥44 px`**: verifica em `375 × 812` que os botões de ação de `/vocabulario`, os rótulos da rubrica de `ProductionTask` em `/b1/b1-l01` e os links do sumário `Nesta página` em `/privacidade` têm altura renderizada `>= 44 px`.
3. **`zoom de texto em 125% e 150% mantém layout sem rolagem horizontal em 320 e 375 px`**: verifica que `/`, `/privacidade`, `/impressum` e `/auth/error` permanecem sem rolagem horizontal (`scrollWidth <= innerWidth`) em `320 px` e `375 px` com `html { font-size: 150% }`.
