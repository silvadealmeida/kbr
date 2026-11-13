# Auditoria Visual, Responsiva e de Interação — Fase 14 (2026-11)

> **Data:** 13 de novembro de 2026  
> **Escopo:** Auditoria visual real em navegador (Chromium + WebKit via Playwright), inventário completo de telas e estados implementados, classificação P0–P3, implementação das correções nas fundações/superfícies do sistema de design **“Composição”** e reverificação visual antes/depois.  
> **Restrições preservadas:** `docs/design/pendenteDesign.md` intocado; nenhum conteúdo coreano, gabarito, ID curricular, `Progress` v1, Leitner SRS, sincronização CAS, schema Supabase ou política de contenção de áudio (`NEXT_PUBLIC_KBR_STATIC_AUDIO`) foi alterado.

---

## 1. Metodologia e ambiente de inspeção real

A auditoria não se baseou apenas na leitura estática de código. Foi estabelecido um fluxo de inspeção em navegador real sobre a build de produção (`next build` + `next start` + `e2e/mock-supabase.mjs`), utilizando **Playwright (Chromium headless e WebKit iPhone 13)** e **@axe-core/playwright**:

1. **Varredura automatizada de geometria renderizada e estilos computados (`522` verificações = `29` estados de tela × `9` viewports × `2` temas):**
   - Medição de `document.documentElement.scrollWidth - window.innerWidth` e `document.body.scrollWidth - window.innerWidth`.
   - Varredura de `getBoundingClientRect()` em todos os nós do DOM fora de contêineres roláveis (`overflow-x: auto`) para detectar qualquer elemento que ultrapasse a largura da viewport.
   - Medição de todos os alvos interativos (`button`, `a[href]`, `input`, `select`, `textarea`, `summary`, `[role="button"]`) contra o piso acessível de `44 × 44 px`.
   - Verificação de `font-size >= 16px` em todos os campos de formulário (`input`, `select`, `textarea`) para evitar zoom automático no iOS.
   - Varredura por `TreeWalker` de todos os nós de texto com caracteres Hangul (`/[\u3131-\u318E\uAC00-\uD7A3]/`) para confirmar ancestral com `lang="ko"`.
   - Verificação de sobreposição entre o rodapé de `main#conteudo` e a barra de navegação inferior fixa (`nav[aria-label="Principal"].fixed.bottom-0`) no final da rolagem.
   - Simulação de aumento de fonte do navegador (`html { font-size: 125% }` e `150%`) em `320 px`, `375 px` e `390 px`.
2. **Inspeção visual direta de capturas de tela (`before/` vs. `after/`):**
   - Capturas armazenadas em `/tmp/opencode/kbr-visual-audit/before/` e `/tmp/opencode/kbr-visual-audit/after/` (evitando commits binários pesados no repositório Git) e inspecionadas visualmente quadro a quadro.

---

## 2. Inventário de superfícies e estados inspecionados

Todas as rotas e variações de estado abaixo foram abertas e inspecionadas em navegador real:

### 2.1 Experiência pública (`src/app/(site)/`)
- `/` — Landing pública (estado padrão, `?motivo=sessao-expirada&next=/vocabulario`, `?motivo=logout`, `?motivo=indisponivel`).
- `SiteHeader` (barra superior desktop + faixa móvel de 3 links + `ThemeToggle` + `LandingAuth`) e `SiteFooter` (3 colunas desktop / pilha móvel com `safe-area`).
- `HangulComposition` — Ilustração vetorial da sílaba `한` com grade e marcas de registro em claro e escuro.
- `/privacidade` — Política de privacidade, sumário interno (`Nesta página`) e tabelas roláveis (`min-w-[42rem]` e `min-w-[38rem]`).
- `/impressum` — Aviso legal / Impressum com lista de pendências jurídicas.
- `/auth/error` — Tela de falha na criação de sessão OAuth.

### 2.2 Painel e navegação (`src/components/Nav.tsx`, `src/components/dashboard/`)
- `Nav` — Barra lateral fixa (`240 px`, `≥768 px`) e cabeçalho compacto + barra inferior fixa de 5 itens (`<768 px`) com `env(safe-area-inset-bottom)`.
- `/dashboard` — `PageHeader`, `AccountCard`, `SyncBanner` (`offline`/`syncing`), `Plate` “Mesa de estudo”, “Próximo passo” / `CourseCompletionPanel` compacto, card de catálogo, “Fila de revisão”, 6 métricas de aprendizagem, gráfico de 5 caixas Leitner e “Atividade recente”.
- `ConnectionNotice` — Aviso global de desconexão no shell autenticado.

### 2.3 Módulo Hangul (`src/components/hangul/`)
- `/hangul` — Visão geral com `CourseCompletionPanel` (em andamento e concluído), `SyllableAnatomy` (bloco montado e peças separadas de `한`), `SoundMap` (`<details>` fechado e aberto com 19 consoantes + 21 vogais) e as 7 unidades (`h01`–`h25` + `c1`–`c4` nos estados concluído, atual “Agora”, disponível e bloqueado).
- `/hangul/h01` — Introdução, prática (`mcq`, `reading`), feedback de acerto/erro, conclusão e revisita.
- `/hangul/h04` — Exercícios `audio-to-char`, `minimal-pair`, `build-syllable` e `cloze` textual.
- `/hangul/h16` — `SyllableBuilder` (bancada de composição C+V / C+V+C, seleção de peças, prévia `Sua sílaba`, `AudioControl` compacto e limpeza).
- `/hangul/h21` — `PronunciationLayers` (regras de fronteira, seletor de exemplos, trilho escrito vs. falado e comparação por bloco aberta).
- `/hangul/c1` e `/hangul/c4` — Estado bloqueado (separando checkpoints anteriores e lições do escopo), ficha de introdução, prática, reprovação com `DiagnosticsList` e conclusão final do módulo (`c4`) com `Seal`, `Ruler`, `CourseJourney` de 29 passos e estatísticas.

### 2.4 Cursos curriculares (`/cursos`, `/a1`, `/a2`, `/b1`)
- `/cursos` (`CourseCatalog`) — Seção “Cursos e níveis”, 4 cursos disponíveis (`Hangul`, `Coreano A1`, `Coreano A2`, `Coreano B1`) nos estados disponível, em andamento, bloqueado por requisito de entrada e concluído, `<details>` “Unidades e passos” aberto e seção “Em planejamento” (`CEFR B2`, `CEFR C1`, `CEFR C2` — nota: no commit base `0b78d40`, B2 ainda consta como `planned`).
- `/a1`, `/a2`, `/b1` (`A1CourseArea`) — Estado bloqueado por pré-requisito de entrada (`/a2` sem `a1-c08`, `/b1` sem `a2-c08`), visão geral de 8 módulos / 48 passos e estado completo com `A1CompletionPanel`.
- `/a1/a1-l01`, `/b1/b1-l01`, `/b1/b1-l23` (`A1LessonPlayer`) — Estado bloqueado, introdução com cartões explicativos, diálogo bilíngue com `AudioControl`, notas de gramática com exemplos, `LessonVocabulary` opt-in, `ProductionTask` (B1), prática guiada e independente (`mcq`, `cloze`, `listen`, `translate`, `reading`) e resumo de conclusão.
- `/a1/a1-c01`, `/b1/b1-c01`, `/b1/b1-c08` (`A1CheckpointPlayer`) — Bloqueio, ficha da avaliação, `ProductionTask` em checkpoint B1, execução e conclusão do curso.

### 2.5 Vocabulário, revisão e fala (`/vocabulario`, `/vocabulario/revisao`, `/revisao`, `/fala`)
- `/vocabulario` (`VocabularyArea`) — Resumo em `Plate`, busca e filtros por curso/lição/salvas, botão de salvar lição inteira, linhas colapsadas e expandidas com frases e `AudioControl`.
- `/vocabulario/revisao` (`VocabReviewArea`, `ContextualCard`, `Flashcard`) — Visão geral vazia e com fila, revisão contextual (lacuna, tradução revelada, pista revelada, erro de envio vazio, feedback de acerto/erro, retentativa), flashcard simples (frente e verso revelado) e tela de conclusão.
- `/revisao` (`ReviewArea`) — Visão geral vazia e com fila Leitner, sessão ativa com `ExerciseView` e conclusão da sessão.
- `/fala` (`SpeakingPracticeArea`, `SpeakingPractice`) — Avisos de suporte/privacidade (indisponível, remoto com consentimento, local no aparelho), cartões de fala com `AudioControl`, estados de escuta/erro, `TranscriptFeedback` e fallback de texto em `<details>`.

---

## 3. Achados priorizados (P0 / P1 / P2 / P3)

### P0 — Defeitos funcionais/visuais de exibição imediata
- **P0-1 (`src/components/a1/A1LessonPlayer.tsx`):** Na tela de conclusão de qualquer lição de A1, A2 ou B1, o aviso de percurso exibia literalmente a string não interpolada `{levelLabel}` (`"seu resultado foi gravado nesta lição. A conclusão do {levelLabel} exige todos os passos do curso."`) por uso de aspas duplas em vez de template literal.
- **P0-2 (`src/components/courses/CourseCatalog.tsx`, `src/components/a1/A1CourseArea.tsx`, `A1LessonPlayer.tsx`, `A1CheckpointPlayer.tsx`):**
  - Ao concluir o `Coreano A2` (`ko-a2`), o cartão em `/cursos` caía no ramo `else` do B1 e exibia `"A conclusão do B1 exige os 48 passos e não libera C1."` em vez de informar que a conclusão do A2 libera a entrada do B1.
  - Quando o `Coreano B1` (`ko-b1`) estava bloqueado em `/cursos`, `/b1` e `/b1/[lessonId]`, o texto afirmava que o curso abria após concluir o `A1` (com link para `/a1`) em vez do `A2` (`/a2`).
  - Em `A1CourseArea.tsx`, o aviso de bloqueio renderizava crases literais de Markdown (`` `Progress` v1 ``) na interface.

### P1 — Usabilidade mobile, hierarquia semântica e acessibilidade
- **P1-1 (`/revisao` e `/vocabulario/revisao` — duplicação de `<h1>` e corte de controles em `375×812`):**
  - `src/app/(app)/revisao/page.tsx` e `src/app/(app)/vocabulario/revisao/page.tsx` renderizavam `<PageHeader>` fixo fora de `ReviewArea` e `VocabReviewArea`, enquanto os componentes internos renderizavam um segundo `<h1>` durante `phase === "run"` e `phase === "done"`.
  - Em `375×812` e `390×844`, os ~160 px do `<PageHeader>` duplicado empurravam os botões principais (`Lembrei`/`Não lembrei`, `Verificar`/`Pista`, `Mostrar resposta`) para baixo da barra de navegação inferior fixa.
- **P1-2 (`src/components/hangul/SyllableBuilder.tsx` — altura excessiva da bancada em mobile e largura do áudio):**
  - Em viewports móveis (`<640 px`), a caixa de prévia `aspect-square max-w-[18rem]` (`288×288 px`) mais os cabeçalhos ocupavam toda a altura útil de `812 px`, deixando os botões de jamo (`Consoante inicial`, `Vogal`) fora da primeira dobra.
  - Quando uma sílaba era formada, o `<AudioControl compact label="Ouvir" />` dentro de um contêiner `items-center` encolhia para a largura do texto em vez de alinhar com a largura de `Sua sílaba`.
- **P1-3 (`src/components/vocabulary/LessonVocabulary.tsx` — empilhamento em 3 linhas e HTML inválido `<span><div>`):**
  - Cada item da lista colocava `<AudioControl>` (`<div>`) dentro de `<span>`, forçando o botão `Salvar`/`Remover` para uma terceira linha solta à esquerda abaixo do botão de áudio.
- **P1-4 (Alvos de toque `< 44 px`):**
  - `src/components/ui/Button.tsx`: variante `size="sm"` usava `min-h-10` (`40 px`), deixando todos os botões `Salvar` e `Detalhes`/`Ocultar` de `/vocabulario` com `40 px` de altura.
  - `src/components/hangul/CheckpointPlayer.tsx`: no estado de conclusão final do `c4`, o link `← Hangul` tinha `68 × 15 px`.
  - `src/components/site/SiteFooter.tsx`: o link `Painel` tinha `39 × 44 px` (`width < 44 px`).
  - `src/app/(site)/privacidade/page.tsx` e `impressum/page.tsx`: os 9 links do sumário `Nesta página` e o link final `← Voltar para a página inicial` tinham `15 px` de altura.
  - `src/components/curriculum/ProductionTask.tsx`: os itens da rubrica de autoavaliação usavam checkboxes de `16 × 16 px` (`size-4`) em rótulos sem altura mínima de `44 px`.
- **P1-5 (Trechos em Hangul sem `lang="ko"` e `font-ko`):**
  - Detectadas 106 ocorrências no DOM onde caracteres Hangul em títulos mistos (`Ligação (연음)`, `ㅏ ㅓ ㅗ ㅜ e o ㅇ mudo`, `Relembrar com -더라고요`), notas fonéticas (`SoundMap`, `SyllableAnatomy`), pistas (`ContextualCard`), rubricas (`ProductionTask`), legenda da landing (`ㅎ`, `ㅏ`, `ㄴ`) e ícone da navegação (`한`) herdavam `lang="pt-BR"` sem `BilingualText` ou `lang="ko"`.
- **P1-6 (Overflow horizontal com zoom de texto de 125%–150% em `320 px` e `375 px`):**
  - Nas páginas públicas (`/`, `/privacidade`, `/impressum`, `/auth/error`), o cabeçalho público (`px-5` sem `flex-wrap`), a faixa móvel (`grid-cols-3` rígida) e a coluna de texto do herói (sem `min-w-0` no grid e com piso de `3.1rem` no `clamp()`) geravam overflow horizontal de `10 px` a `76 px` ao escalar a fonte raiz para 125%–150%.

### P2 — Consistência de espaçamento, alinhamento e componentes
- **P2-1 (`src/components/ui/Card.tsx` — alinhamento do número de `Plate`):**
  - O número no canto superior direito usava `right-4 top-3` (`16 px, 12 px`) e `.mono-label` (`letter-spacing: 0.14em`), colidindo com a marca de registro `inset-2.5`, ficando `8 px` acima da linha de base do `label` (`p-5` = `20 px`) e espaçando porcentagens como `7 9%`.
- **P2-2 (`src/components/courses/CourseCatalog.tsx` — numeração fixa `01`):**
  - Todos os 4 cursos disponíveis exibiam `number="01"` em vez de `01`, `02`, `03`, `04`.
- **P2-3 (`src/components/dashboard/DashboardArea.tsx` e `AccountCard.tsx`):**
  - Em `DashboardArea.tsx`, os botões `Revisar N cartões`, `Abrir revisão`, `Ver catálogo de cursos` e `Abrir Hangul` não tinham `mt-4`, colando o botão de revisão no parágrafo imediatamente acima (`0 px` de espaço).
  - Em `AccountCard.tsx`, o layout `flex-col gap-5 p-5 mb-6` ocupava `176 px` de altura no topo do `/dashboard` mobile, empurrando o resumo “Mesa de estudo” para baixo da dobra em `375×812`.
  - Nas caixas Leitner, `Caixa 1`–`Caixa 5` quebravam linha em `320 px` e os contadores não aplicavam `font-mono tabular-nums`.
- **P2-4 (`src/components/vocabulary/VocabReviewArea.tsx` — `<progress>` nativo):**
  - Usava `<progress>` HTML nativo sem estilo do sistema em vez do componente `<ProgressBar>`.
- **P2-5 (`src/components/hangul/exercise-ui.tsx` — botão `Continuar→` sem espaçamento):**
  - O botão de avanço após o resultado não tinha `gap-2`, colando a seta `→` ao texto (`Continuar→`).
- **P2-6 (`LessonPlayer.tsx`, `A1LessonPlayer.tsx`, `A1CheckpointPlayer.tsx` — ponto médio órfão no cabeçalho):**
  - O separador `<span aria-hidden>·</span>` antes do selo `Conteúdo em revisão` ficava órfão no fim da primeira linha quando o selo quebrava para a linha seguinte em `375 px`.

### P3 — Polimento visual e aderência a tokens
- **P3-1 (`src/components/site/LandingAuth.tsx`):** Adicionado `color` à lista de `transition-[background-color,color,opacity]` para evitar flash de contraste ao alternar tema.
- **P3-2 (`src/components/hangul/CourseJourney.tsx`):** Adicionado divisor `border-t border-line pt-5` para separar visualmente a régua de lições da régua da jornada completa.
- **P3-3 (`privacidade/page.tsx`, `impressum/page.tsx`, `ConnectionNotice.tsx`):** Substituído `rounded-2xl` legado por `rounded-[var(--radius-plate)]`.
- **P3-4 (`SiteHeader.tsx`, `SiteFooter.tsx`, `page.tsx`, `auth/error/page.tsx`):** Padronizado o gutter lateral mobile em `16 px` (`px-4 sm:px-8`), alinhado com `(app)/layout.tsx` e com `docs/design/design-system-spec.md` §4.1.

---

## 4. Ledger de verificação antes/depois

As capturas de tela de referência estão em `/tmp/opencode/kbr-visual-audit/before/` e `/tmp/opencode/kbr-visual-audit/after/`.

| Rota / Componente | Viewport | Problema antes (`before/`) | Alteração de código | Resultado depois (`after/`) | Método de verificação |
|---|---|---|---|---|---|
| `/dashboard` (`AccountCard`, `DashboardArea`, `Plate`) | `375×812` (claro/escuro) | `AccountCard` com `176 px` de altura cortava “Mesa de estudo” na barra inferior; `7 9%` desalinhado no topo; botão `Revisar 2 cartões` colado ao texto (`0 px`). | `AccountCard` em linha flexível compacta; `Plate` `number` em `right-5 top-5 mono-data`; `mt-4` nos botões de `DashboardArea`; `tabular-nums` e `whitespace-nowrap` nas caixas Leitner. | “Mesa de estudo” inteira visível acima da barra inferior em `375×812`; `79%` alinhado ao rótulo; botões com `16 px` de respiro. | `dashboard_375x812_light.png`, `full_dashboard_375x812_dark.png`, E2E. |
| `/vocabulario/revisao` e `/revisao` (`VocabReviewArea`, `ReviewArea`) | `375×812`, `390×844` | Dois `<h1>` na mesma página durante a prática; `<progress>` nativo cinza; botões `Lembrei`/`Não lembrei` e `Verificar` cortados abaixo da dobra. | `<PageHeader>` movido para a fase `overview`; sessão ativa usa `<h1>` único e `<ProgressBar>`. | `<h1>` único em todas as fases; barra de progresso no padrão Composição; botões de ação visíveis acima da barra inferior em `375×812`. | `vocabulario-revisao-context_375x812_light.png`, `vocabulario-revisao-flashcard_375x812_light.png`, `revisao-run_375x812_light.png`, `e2e/mobile.spec.ts`. |
| `/hangul/h16` (`SyllableBuilder`) | `320×700`, `375×812`, `390×844` | Prévia `aspect-square max-w-[18rem]` ocupava quase toda a tela móvel; controle `Ouvir` encolhia dentro de `items-center`. | Proporção `aspect-[3/2] max-w-[13rem]` em `<sm` (`sm:aspect-square`), espaçamento compacto e `<div className="w-full">` no `AudioControl`. | Bancada mais compacta em telas estreitas e botão `Ouvir` alinhado à largura de `Sua sílaba`. | `hangul-h16-builder_375x812_light.png`, `full_h16_builder_selected_375x812_light.png`, `e2e/hangul.spec.ts`. |
| `/b1/b1-l01` (`LessonVocabulary`, `ProductionTask`, `A1LessonPlayer`) | `375×812` | `LessonVocabulary` aninhava `<div>` em `<span>` e jogava `Salvar` para uma 3ª linha; checkboxes da rubrica tinham `16×16 px`; conclusão exibia `{levelLabel}` literal. | Linha superior flex com palavra à esquerda e `Button size="sm" variant="secondary"` (`≥44 px`) à direita; áudio abaixo; rubrica com `min-h-11` e `size-5`; template literal `${levelLabel}`. | Lista de vocabulário alinhada em 2 linhas limpas; rubrica com alvos de `44 px`; texto de conclusão interpolado. | `part_b1_vocab_375x812.png`, `part_b1_production_375x812.png`, `e2e/mobile.spec.ts`, `e2e/b1.spec.ts`. |
| `/cursos`, `/a2`, `/b1` (`CourseCatalog`, `A1CourseArea`) | `375×812`, `1280×800` | Todos os cursos numerados `01`; A2 concluído exibia texto do B1; B1 bloqueado citava A1; crases literais em `` `Progress` v1 ``. | Numeração sequencial `01`–`04`; textos de conclusão e pré-requisito específicos para A1/A2/B1; remoção das crases literais. | Índices `01`–`04` corretos e mensagens de desbloqueio coerentes com o currículo. | `full_cursos_375x812_light.png`, `a2-locked_375x812_light.png`, `e2e/courses.spec.ts`. |
| `/`, `/privacidade`, `/impressum`, `/auth/error` | `320×700`, `375×812` (100%–150% zoom) | Overflow de `10–76 px` com fonte em 125%–150%; links do sumário e rodapé `<44 px`; `rounded-2xl` legado. | Gutter `px-4 sm:px-8`; `min-w-0` e `clamp(2.35rem,7vw,6.5rem)` no herói; `flex-wrap` no `SiteHeader`; `min-h-11`/`min-w-11` nos links; `rounded-[var(--radius-plate)]`. | `0 px` de overflow até 150% de zoom em `320 px` e `375 px`; alvos `≥44 px`. | `privacidade_375x812_light.png`, `impressum_320x700_light.png`, `e2e/mobile.spec.ts`. |

---

## 5. Limitações remanescentes e riscos declarados

1. **Dispositivos físicos (iPhone/Chrome iOS/Safari iOS/VoiceOver):** Não testáveis neste ambiente Linux local. A verificação automatizada usou Chromium e WebKit (`devices["iPhone 13"]`), mas o comportamento real do teclado virtual iOS, safe-area física, instalação na Tela de Início e VoiceOver permanece dependente do checklist manual (`docs/iphone-manual-checklist.md`).
2. **Certificação WCAG:** A ausência de violações automatizadas no `@axe-core/playwright` (`wcag2a`, `wcag2aa`, `wcag21a`, `wcag21aa`) em claro e escuro não constitui certificação WCAG completa.
3. **Rótulo de botão `AudioControl` com Hangul (`"Ouvir a sílaba 한"`):** Mantido como string direta no `<button>` porque o teste unitário `tests/hangul-experience.test.ts` valida a substring exata `"Ouvir a sílaba 한"` no HTML estático renderizado.
