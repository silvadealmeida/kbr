# Relatório de Refinamento Mobile e Usabilidade — Fase 14

> **Data:** 13 de novembro de 2026  
> **Foco primário:** Telas móveis de `375 × 812` e `390 × 844` (com suporte verificado de `320 × 700` a `1440 × 900`, claro e escuro).

---

## 1. Ergonomia de primeira dobra e aproveitamento vertical em 375–390 px

### 1.1 Sessões ativas de revisão (`/revisao` e `/vocabulario/revisao`)
- **Diagnóstico:** As páginas de rota renderizavam `<PageHeader>` fixo no topo mesmo quando o aluno iniciava a sessão (`phase === "run"`) ou concluía (`phase === "done"`). Isso duplicava o `<h1>` na tela e consumia ~160 px verticais, empurrando os botões `Lembrei` / `Não lembrei`, `Verificar` / `Pista` e `Mostrar resposta` para trás da barra de navegação inferior fixa em `375 × 812`.
- **Refinamento:** `<PageHeader>` passou a ser renderizado apenas na fase `overview` (e nos estados de carregamento/erro). Durante `run` e `done`, o cabeçalho compacto da sessão assume o topo de `main#conteudo` com um único `<h1>` e `<ProgressBar>` do sistema de design.
- **Resultado medido:** Ganho de ~160 px verticais em `375 × 812` e `390 × 844`; todos os controles de resposta e avaliação de flashcards e prática contextual cabem acima da barra inferior.

### 1.2 Painel principal (`/dashboard`)
- **Diagnóstico:** O `AccountCard` empilhava textos e botão em coluna (`176 px` de altura), cortando as métricas do cartão “Mesa de estudo” na borda inferior de `375 × 812`. Além disso, faltava margem superior (`mt-4`) nos botões de ação dos cartões de “Catálogo de cursos” e “Fila de revisão”.
- **Refinamento:** `AccountCard` foi compactado em uma linha flexível (`flex-wrap items-center justify-between gap-3 p-4 sm:p-5`), economizando ~70 px verticais no mobile. Os botões de ação dos cartões receberam `mt-4` e variante `secondary` consistente.
- **Resultado medido:** O cartão “Mesa de estudo” completo (progresso, barra, lições e checkpoints concluídos) fica integralmente visível na primeira dobra em `375 × 812`.

### 1.3 Bancada de composição de Hangul (`SyllableBuilder`)
- **Diagnóstico:** Em telas `<640 px`, a zona de encaixe usava `aspect-square max-w-[18rem]` (`288 × 288 px`), empurrando os grupos de botões de jamo (`Consoante inicial`, `Vogal`, `Consoante final`) para fora da viewport inicial. Quando uma sílaba era montada, o botão compacto `Ouvir` ficava mais estreito que a caixa `Sua sílaba` acima dele.
- **Refinamento:** Em `<sm`, a zona de encaixe passou a usar `aspect-[3/2] max-w-[13rem]` com paddings compactos (`p-3.5 gap-3.5`), preservando `aspect-square` em `≥640 px`. O `AudioControl` compacto foi envolvido em `<div className="w-full">` para alinhar com a caixa de prévia.

### 1.4 Lista de vocabulário da lição (`LessonVocabulary`)
- **Diagnóstico:** Cada palavra colocava o `<AudioControl>` dentro de um `<span>` junto ao texto e empurrava o botão `Salvar`/`Remover` para uma 3ª linha desalinhada à esquerda.
- **Refinamento:** Cada item agora organiza a palavra e a tradução à esquerda e o selo `Salva` + botão `Salvar`/`Remover` (`size="sm"`, `min-h-11` = `44 px`) à direita na mesma linha, com o controle `Ouvir a palavra` ocupando a linha inferior em largura total.

---

## 2. Alvos de toque e formulários móveis

| Superfície / Controle | Antes | Depois | Status |
|---|---|---|---|
| `Button size="sm"` (`/vocabulario`, `LessonVocabulary`) | `min-h-10` (`40 px`) | `min-h-11` (`44 px`) | ≥ 44 px |
| `ProductionTask` — itens da rubrica (`label` + `checkbox`) | `~20 px` (`size-4`) | `min-h-11` (`44 px`) + `size-5` (`20 px`) | ≥ 44 px |
| `/privacidade` — links do sumário `Nesta página` | `15 px` | `min-h-11` (`44 px`) | ≥ 44 px |
| `/privacidade` e `/impressum` — link `← Voltar para a página inicial` | `15 px` | `min-h-11` (`44 px`) | ≥ 44 px |
| `/hangul/c4` concluído — link `← Hangul` | `68 × 15 px` | `min-h-11 min-w-11` (`≥ 44 × 44 px`) | ≥ 44 px |
| `SiteFooter` — links de navegação (`Painel`, etc.) | `39 × 44 px` | `min-h-11 min-w-11` (`≥ 44 × 44 px`) | ≥ 44 px |
| Inputs, selects e textareas (`Field`, `TextAnswer`, `VocabularyArea`, `ProductionTask`) | `16 px` (`text-base` / `text-xl`) | `16 px+` preservado | Sem zoom forçado no iOS |

---

## 3. Tipografia bilíngue (Português + Coreano) e zoom de texto

- **Marcação `lang="ko"` e `font-ko`:** Aplicado `BilingualText` (ou `lang="ko"`) em títulos de lições/unidades/checkpoints com Hangul (`HangulCourse`, `A1CourseArea`, `CourseCatalog`, `DashboardArea`, `PlayerHeader`, `LessonPlayer`, `A1LessonPlayer`), notas fonéticas (`SoundMap`, `SyllableAnatomy`), pistas de vocabulário (`ContextualCard`), tarefas de produção (`ProductionTask`), legenda do herói da landing e ícone `"한"` da navegação.
- **Reflow com zoom de texto (125% e 150%):** Unificado o gutter mobile em `16 px` (`px-4 sm:px-8`), adicionado `min-w-0` aos filhos de grid da landing, ajustado o piso do `clamp()` do título principal para `2.35rem` com `break-words` e tornado o menu público móvel flexível (`flex-wrap`). Nenhuma rota apresenta rolagem horizontal em `320 px`, `375 px` ou `390 px` mesmo com `html { font-size: 150% }`.
