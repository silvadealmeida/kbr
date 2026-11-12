# Varredura de conteúdo — lições, exercícios, inconsistências e referências

**Data:** 2026-11-12 · **Escopo:** todo o conteúdo jogável em `src/content/` (Hangul, A1, A2 e o B1 em andamento na árvore), vocabulário, áudio, registro de cursos e referências em `docs/`.
**Método:** varredura automatizada única (script temporário, removido após a execução) somada aos validadores estruturais já existentes (`validateCurriculum`, `validateA1Content`, `validateA2Content`, `validateB1Content`, `validateVocabulary`, `validateCourseRegistry`). Nenhum código de produto foi alterado.

## 1. Inventário

### Passos e exercícios

| Curso | Lições | Checkpoints | Exercícios | Em lições | Em checkpoints | Tipos |
|---|---|---|---|---|---|---|
| Hangul (`h01`–`h25`, `c1`–`c4`) | 25 | 4 | 405 | 285 | 120 | 116 `mcq`, 121 `reading`, 73 `audio-to-char`, 57 `build-syllable`, 24 `minimal-pair`, 9 `char-to-audio`, 5 `cloze` |
| A1 (`a1-l01`–`a1-l40`, `a1-c01`–`a1-c08`) | 40 | 8 | 615 | 400 | 215 | 183 `cloze`, 132 `listen`, 124 `reading`, 97 `translate`, 79 `mcq` |
| A2 (`a2-l01`–`a2-l40`, `a2-c01`–`a2-c08`) | 40 | 8 | 615 | 400 | 215 | 132 `listen`, 132 `reading`, 125 `cloze`, 125 `translate`, 101 `mcq` |
| B1 (`b1-l01`–`b1-l40`, `b1-c01`–`b1-c08`) | 40 | 8 | 615 | 400 | 215 | 132 `listen`, 132 `reading`, 125 `translate`, 124 `cloze`, 102 `mcq` |

- **2.250 IDs de exercício** no total; todos únicos globalmente (nenhuma colisão entre cursos).
- Estágios (A1/A2/B1): cada lição tem exatamente **5 guiados + 5 independentes** (200+200 por curso); os 215 itens de checkpoint são todos independentes.
- Limiares uniformes nos cursos de língua: lições **10 itens / mínimo 8 / 80%** (40× por curso); checkpoints **25/20** (7×) e **40/32** no `*-c08`. Nenhum item `reading` self-check nos cursos de língua (denominadores 100% pontuados).
- Hangul tem limiares por lição (6–16 itens) e usa `minCorrect` explícito só quando a fração não coincide com o arredondamento de `passingScore` (10 das 25 lições + os 4 checkpoints); nas demais o critério é a porcentagem.
- Demografia por curso: A1 240 falas de diálogo, 164 notas de gramática, 125 painéis de introdução, 163 itens de resumo; A2 240/86/93/160; B1 238/80/80/160 + **40 tarefas de produção** (recurso novo do B1; A1/A2 têm 0).
- Tempo estimado: Hangul ≈ 1.000 min (não detalhado aqui); A1 2.610 min; A2 2.635 min; B1 3.145 min.

### Vocabulário e frases

| Fonte | Entradas | Frases |
|---|---|---|
| Hangul | 133 | 25 (`sent:<forma>:<n>`) |
| A1 | 443 | 443 (`sent:a1-…`) |
| A2 | 400 | 400 (`sent:a2-…`) |
| B1 | 320 | 320 (`sent:b1-…`) |
| **Total** | **1.296** | **1.188** |

- Referências por curso (novas × retomadas distintas): A1 443 novas + **52** retomadas do Hangul (495 distintas); A2 400 novas + **115** retomadas de A1/Hangul (515 distintas); B1 320 novas + **96** retomadas (71 do A1, 78 do A2, 15 do Hangul em referências).
- Retomadas internas ao próprio curso (mesma lição ou posteriores validadas pela ordem): A1 229 referências, A2 13, B1 0.
- Nenhum item novo aponta `lesson` diferente da lição que o apresenta (0 divergências).

## 2. Referências cruzadas

- **Currículo × vocabulário:** todas as `newIds`, `reusedIds` e `sentenceIds` resolvem para o registro canônico; as frases pertencem ao `vocabId` referenciado. Os validadores estruturais dos quatro cursos retornaram **0 issues** nesta varredura.
- **Registro de cursos (`src/content/courses`) × conteúdo:** passos, `exerciseCount`, `minCorrect`, `finalStepId` e `entryPrerequisites` conferem com os datasets; nenhuma divergência. Rotas `/hangul`, `/a1`, `/a2`, `/b1` (+ `[lessonId]`) existem para todos os cursos com `basePath`.
- **SRS:** `srsCards` do Hangul não apontam cartões inexistentes; os cursos A1–B1 não usam `srsCards` (o vocabulário entra em `Progress.cards` por `v:<id>`).
- **Docs:** todas as referências a IDs de passo em `docs/`, `README.md` e `AGENTS.md` (padrões `a1|a2|b1-lNN/cNN` e `hNN`) apontam para passos existentes ou previstos em blueprint — **0 referências quebradas**.

## 3. Inconsistências e achados

### Corrigíveis (baixo risco)

| # | Onde | Achado |
|---|---|---|
| 1 | `a1-l01/e08` × `a1-l02/e10` | Única repetição **lição→lição** de exercício idêntico em todo o corpus: `translate "Traduza para o coreano polido: 'Eu sou brasileiro.'"` (aparece também no `a1-c08/e35`, aí sim por ser checkpoint cumulativo). Cadastrar uma frase nova ou remover a duplicata. |
| 2 | raiz do repositório | 4 arquivos temporários esquecidos: `measure-7e.tmp.mjs`, `measure-player.tmp.mjs`, `shot-7e.tmp.mjs`, `shots-7d.tmp.mjs` (sobras das fases 7D–7E). Podem ser apagados. |
| 3 | Hangul, entre lições | 6 conteúdos repetidos lição→lição: `build-syllable` 고 (`h04`/`h16`), 과 (`h13`/`h16`), 귀 (`h13`/`h16`/`h25`), 의 (`h15`/`h16`) e `audio-to-char` 라/나 (`h05`/`h08`), 사/자 (`h06`/`h08`). Provável retomada intencional (h16 = sílabas C+V; h25 = consolidação), mas merece confirmação editorial. |

### Informativos (por design, mas registrados)

| # | Tema | Achado |
|---|---|---|
| 4 | Áudio estático | O corpus tem **287 MP3** e cobre 678 ocorrências (sílabas/palavras do Hangul, 118 `reading`, 73 `audio-to-char`, 24 `minimal-pair`, 23 `char-to-audio`, 141 itens de vocabulário). **Nenhum dos 396 exercícios `listen` tem MP3** — todos caem no fallback de TTS do navegador; idem 718 falas de diálogo, 660 exemplos de gramática e 1.155 itens de vocabulário. É o desenho documentado ("asset → voz coreana → dica textual"), mas é a maior lacuna de referência de áudio do conteúdo. |
| 5 | Esquemas de ID de frase | Convivem dois formatos: `sent:<forma>:<n>` (Hangul) e `sent:<curso>-…` (A1–B1). Ambos validam; padronizar seria cosmético. |
| 6 | Vocabulário do Hangul | 108 das 133 entradas não têm frase de contexto (nos cursos de língua há 1 frase por item novo). |
| 7 | Assimetria de dados | `completion.minCorrect` é opcional no Hangul e sempre explícito nos cursos de língua; `passingScore`/`minScore` convivem com regras extras (`rules`, `diagnosticTags`). Documentado nos tipos, mas é uma forma de dados mista. |
| 8 | Diálogos A1 | 11 linhas de diálogo repetidas entre lições ("네, 좋아요." ×5, "감사합니다." ×3 etc.) — fórmulas de cortesia plausíveis, mas registradas para revisão nativa. |
| 9 | Revisão humana | 100% dos passos estão `in-review` (29 Hangul + 48 por curso de língua); nada `draft` nem `reviewed`. Coerente com o bloqueio de revisão nativa, que continua aberto. |
| 10 | Estado do B1 | A árvore traz trabalho B1 substancial **não commitado e em andamento** (40 lições + 8 checkpoints, vocabulário 320/320, rotas `/b1`, `e2e/b1.spec.ts`, registro `ko-b1` como `available` com `entryPrerequisites: ["a2-c08"]`). O `docs/roadmap.md` ainda diz "B1 — não iniciar sem pedido"; esta varredura cobriu o B1 como está na árvore. Quem encerrar a fase deve atualizar o roadmap. |

### Duplicação lição↔checkpoint (esperada)

Checkpoints cumulativos repetem itens das lições com ID próprio: A1 46 grupos, A2 82, B1 6, Hangul 31. Comportamento intencional ("checkpoints cumulativos"), sem ação.

## 4. Reconciliação com `docs/roadmap.md`

Todos os números afirmados para A1 e A2 conferem com o conteúdo real: 40+8 passos por curso; 615 exercícios e a distribuição por tipo; 443/400 identidades novas; 52/115 retomadas distintas (495/515 ensinadas); 5 guiados + 5 independentes; 8/10 e 25/20, 40/32 nos `*-c08`; isolamento de progresso (nenhum campo novo em `Progress`). O roadmap não descreve ainda os totais do B1 (ver item 10).

## 5. Gabaritos, partículas e traduções (varredura adicional — 13/11/2026)

### Gabaritos

| Severidade | Onde | Achado |
|---|---|---|
| **Alta — corrigível agora** | `a2-l02/e01` (mcq guiado) | O gabarito **não está entre as opções**: `correctAnswer` é `"Foi uma fonte termal."` e as opções são `["Foi a uma fonte termal.", …]` (falta a preposição "a" no gabarito). Como o `mcq` compara o texto da alternativa escolhida com `correctAnswer`, **nenhuma alternativa pode ser marcada como correta**. Correção: `correctAnswer: "Foi a uma fonte termal."` (a explicação do item já usa "foi a uma fonte termal"). |
| Baixa (limpeza) | 9 itens | `acceptedAnswers` contém forma idêntica à resposta após normalização (redundante, sem efeito na correção): `a1-c01/e24`, `a1-c08/e37`, `a2-l31/e08`, `a2-l34/e08`, `a2-l35/e05`, `a2-c03/e03`, `b1-l32/e05`, `b1-l35/e05`, `b1-c01/e25`. |
| Info | Hangul | 5 cloze usam marcador `__` (dois traços, dentro da palavra: `가__`, `다__`, `아버지__`→`아버__`, `베__`, `__이터`) em vez de `___` — `h04/e07`, `h05/e08`, `h06/e09`, `h12/e05`, `h14/e07`. Duas notações convivem; sem efeito na correção. |

Limpo no restante: nenhuma resposta vazia, nenhuma `acceptedAnswer` vazia, nenhuma opção duplicada após normalização (mcq, reading e tipos de escolha), gabarito sempre entre as opções nos demais itens.

### Partículas

- **Alomorfia conferida em ~45 cloze com partícula pura** (는 19, 이 8, 을 6, 로 5, 으로 3, 를 2, 가 2, …) contra o batchim da sílaba anterior (은/는, 이/가, 을/를, 로/으로, 와/과, (이)랑): **zero erros de alomorfia**.
- Os 3 alertas da automação são falsos-positivos: são o **-는 atributivo**, não a partícula de tema — `a2-l24/e02` "빠른 말을 알아듣는 것이 어려워요" (repetido em `a2-c05/e19`) e `b1-l12/e02` "아낄 수 있는 반면에". Estão corretos como estão.
- O que o script **não** decide (fica para a revisão nativa): nuance **은/는 × 이/가** (tema vs foco), registro de 에게/한테, e o uso de 로/으로 em destinos específicos.

### Traduções

29 frases coreanas aparecem com mais de uma tradução pt-BR no corpus (diálogos, notas de gramática, vocabulário, frases e exercícios ko→pt). A maioria é variação natural, não erro — a fila de harmonização editorial:

- Variantes benignas: "좋아요." → "Está bem." / "Que bom." / "Muito bom."; "네, 괜찮아요." → "Sim, tudo bem." / "Sim, está bem."; "전화번호가 뭐예요?" → com/sem "seu"; "잠시만요." → com/sem "por favor"; "열이 있어요." → "Estou com febre." / "Tenho febre.".
- Merecem decisão editorial:
  - "저는 브라질 사람이에요." → "Eu sou brasileiro." na maioria dos lugares, mas "Eu sou brasileiro; eu sou brasileira." em `a1-l02/g:a1-l02-origin` e na frase `sent:a1-l01:브라질` (glosa com gênero num lugar só).
  - "갑자기 일이 생겨서 못 갔어요." → "Surgiu um imprevisto de repente e não pude ir." (`a2-l04/e09`) × "Surgiu um imprevisto de trabalho…" (`a2-l04/g3`) — sentido de 일이 생기다 divergente **dentro da mesma lição**.

### Escopo explícito da revisão nativa (pendente)

A revisão nativa de todo o conteúdo coreano (Hangul, A1, A2, B1 — status `in-review`) deve cobrir, além do coreano em si:

1. **Gabaritos** — aceitação de variantes reais (ex.: `한번`/`한 번`, gênero em português, ordem de palavras) e validação de que cada gabarito é a resposta que um falante daria;
2. **Partículas** — 은/는 × 이/가 (tema/foco), 에게/한테, 로/으로 e alomorfia em contextos ambíguos;
3. **Traduções** — harmonização das glosas pt-BR entre lição, gramática, vocabulário e frases (fila dos 29 casos acima).

## 6. O que esta varredura **não** prova

- Naturalidade ou correção do coreano (continua `in-review`; exige falante nativo).
- Qualidade da síntese de voz (o MP3 é sintético; licença do encoder segue bloqueada para distribuição).
- Comportamento em iPhone/Chrome iOS/VoiceOver reais e conformidade WCAG completa.
- Experiência didática (sequenciamento, carga cognitiva) — só estrutura e referências.

## Recomendações (ordem sugerida)

1. **Corrigir o gabarito de `a2-l02/e01`** (item "Alta" da §5): o exercício hoje não tem alternativa correta.
2. Apagar os 4 `*.tmp.mjs` da raiz (item 2 da §3).
3. Decidir editorialmente sobre o exercício duplicado A1 (item 1 da §3) e as retomadas do Hangul (item 3 da §3).
4. Harmonizar as 29 traduções divergentes e limpar as 9 `acceptedAnswers` redundantes (§5).
5. Quando houver budget de TTS/MP3 novo, priorizar os 396 `listen` e as falas de diálogo (item 4 da §3).
6. Padronizar IDs de frase, marcadores de cloze e `minCorrect` numa migração de conteúdo futura (itens 5 e 7 da §3, §5), sem tocar em `Progress`.
7. Revisão nativa com o escopo da §5 (gabaritos, partículas e traduções); reexecutar esta varredura depois dela e depois do fechamento do B1.
