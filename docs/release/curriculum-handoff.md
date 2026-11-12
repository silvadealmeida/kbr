# Transição para a primeira lição A1 — encerramento da Fase 9A

**Decisão vigente:** a arquitetura A1 está pronta; a próxima fatia é somente `a1-l01`. A infraestrutura de áudio está **encerrada**: pendências de licença/pronúncia não bloqueiam conteúdo original, mas impedem distribuir os MP3 sintéticos.

## 1. Pronto para desenvolvimento contínuo

| Área | Estado | Onde |
|---|---|---|
| Módulo Hangul completo (`h01`–`h25`, `c1`–`c4`) | conteúdo `in-review`, estável | `src/content/hangul`, `tests/content/*` |
| Registro multi-curso (A1–C2 planejados) | tipado e validado | `src/content/courses/{types,registry,planned,hangul}.ts` |
| Blueprint A1 | 8 módulos, 40 lições, 8 checkpoints; tipado e validado | `src/content/curriculum/a1`, `docs/curriculum/` |
| Contrato de conteúdo A1 | diálogo, gramática, refs lexicais/contextuais, exercícios e revisão; sem instâncias | `A1LessonContent`, `validateA1LessonContent` |
| Tipos de exercício | 9 implementados, 3 planejados (`order-words`, `short-answer`, `dialogue-choice`) | `src/lib/exercises/registry.ts` |
| Progresso e SRS | `Progress` v1 + Leitner por erro, CAS multi-dispositivo | `src/lib/{storage,srs,progress,supabase}` |
| Revisão, painel, catálogo, PWA | funcionais | `/revisao`, `/dashboard`, `/cursos` |
| Reprodução de áudio | asset (desligado) → voz coreana explícita → dica textual | `src/lib/audio/playback.ts` |
| Testes | typecheck, Vitest, Playwright (Chromium 4 larguras + WebKit) | `AGENTS.md` |

## 2. Interfaces reutilizáveis por cursos A1–C2

- **`CourseDefinition` / `COURSE_REGISTRY`**: A1 permanece planejado e sem rota. Não o marque como simplesmente disponível com um único passo: isso faria a conclusão de `a1-l01` parecer conclusão do curso. A 9B deve modelar primeiro um estado honesto de curso **em desenvolvimento**, com 48 passos planejados e apenas os implementados navegáveis.
- **`ExerciseSpec` + `EXERCISE_TYPE_REGISTRY`**: novo tipo = extensão da união + entrada no registro com `skills` e `grading`; correção determinística em `checkAnswer`; apresentação com `lib/exercises/shuffle` + `use-shuffled-order` (regra de randomização do `AGENTS.md`).
- **Conteúdo**: `content/` sem lógica, com `ReviewMeta` (`in-review`). O esquema próprio já existe como `A1LessonContent`; `validateA1LessonContent` confere suas relações com blueprint, vocabulário, frases e tipos implementados, mas revisão humana continua obrigatória.
- **IDs leves**: importe `A1_LESSON_IDS` de `@/content/curriculum/a1/ids` em código de cliente/registro; o índice `@/content/curriculum/a1` carrega o blueprint completo e roda a validação estrutural, sendo apropriado a servidor e testes.
- **Progresso**: `Progress` v1 guarda tentativas por id de exercício/lição; ids novos não exigem migração de banco. **Não alterar o formato nem o CAS** sem fase explícita.
- **Áudio**: `audioText` por exercício; `resolveAudioAsset(text)` devolve `null` com a flag desligada, então a voz do sistema cobre todo texto coreano novo **sem novos MP3**. Texto coreano novo deve passar por `lang="ko"`.
- **Guardas**: `audio-containment.test.ts` e `verify-no-restricted-audio.mjs` continuam valendo para qualquer áudio novo.

## 3. Bloqueado para lançamento público (não bloqueia desenvolvimento local)

1. Licença do áudio sintético (MeloTTS + `kykim/bert-kor-base`): **BLOQUEADA**; corpus tem de ficar fora do HEAD público (ver `docs/audio/exposure-and-removal-plan.md`).
2. Exposição histórica dos 287 MP3 no repositório público e em deployments antigos da Vercel (ações do dono).
3. Privacidade/Impressum com campos "a confirmar" e revisão jurídica.
4. Revisão nativa de todo o conteúdo coreano e da pronúncia; teste em dispositivos reais.

## 4. Opcional / experimental

`/fala` (reconhecimento de fala; **não expandir**), `npm run audio:stage` + flag (teste local de MP3), avaliação de TTS alternativo (`docs/audio/tts-alternatives.md`), flashcards ilustrados (item 3 do feedback), export/import JSON.

## 5. Tarefas de áudio/pronúncia que podem ser retomadas depois

R1/R2 (e-mails em `docs/audio/permissions/email-drafts.md`, **não enviados**), piloto de TTS alternativo (~20 clipes), gravação com falante nativo (`audio-quality-roadmap.md`), matriz manual §14 do checklist de iPhone, decisão formal sobre manter ou substituir o MeloTTS. Nenhuma depende de código novo agora.

## 5b. Vocabulário (Fase 9A-V, feita)

Infraestrutura de vocabulário pronta para o A1: registro `src/content/vocabulary` (cada curso entrega `VocabEntry[]` + frases; passos em `docs/vocabulary/content-schema.md`), `/vocabulario` (busca, filtros, salvar/remover, detalhes), revisão diária contextual (frase com lacuna + dica de sentido + tradução opcional antes e obrigatória depois), cartões simples e Leitner reaproveitado em `Progress.cards["v:<id>"]` (sem migração). Há 133 IDs legados imutáveis; homógrafos **novos** podem usar `ko:<forma>#<sentido>`, desde que todas as entradas da forma sejam qualificadas. Separar um ID legado exige migração explícita e fica fora da 9B. Limites: só 25 frases atuais (todas em revisão nativa), sem ligação automática nas lições e sincronização remota não verificada em Supabase real. Isto **não** abre lições A1.

## 6. Escopo fechado da Fase 9B

Implementar **somente `a1-l01` (“Olá, eu sou…”)**. Não iniciar `a1-l02`, checkpoint, gerador de conteúdo ou expansão C2.

1. Antes de expor a rota, estender o ciclo de vida do curso com um estado “em desenvolvimento”: o catálogo informa **1 de 40 lições disponível** e 8 checkpoints planejados; completar `a1-l01` nunca mostra “curso A1 concluído”. Os 48 IDs do blueprint continuam a referência total, e só passos com dataset/rota implementados são clicáveis.
2. Instanciar um `A1LessonContent` original com objetivo de cumprimentar, dizer o nome e identificar-se polidamente; diálogo curto; `이에요/예요` e uso inicial/formulaico de `은/는`; 10–12 itens novos conforme o blueprint; pelo menos uma `VocabSentence` contextual por item novo; metadados `in-review`.
3. Reutilizar uma entrada lexical existente apenas quando forma **e sentido** coincidirem. Criar novos itens no registro canônico, com origem `course: "ko-a1"`, `lesson: "a1-l01"`; nenhum array ou scheduler paralelo.
4. Usar apenas tipos já implementados e previstos para a lição (`mcq`, `cloze`, `listen`, `translate`); `dialogue-choice` permanece planejado. Voz coreana do sistema por `audioText`, sem MP3, microfone, IA ou avaliação de pronúncia.
5. Criar a menor rota/player A1 reutilizando as primitivas existentes, com introdução, diálogo, nota gramatical, prática e conclusão. No resumo, usar `vocabForLesson` e oferecer “Salvar as palavras desta lição”; nunca salvar automaticamente.
6. Progresso usa os IDs existentes em `Progress.lessons/history`; vocabulário salvo usa `Progress.cards["v:<id>"]`. Não mudar `Progress` v1, CAS, SQL, Supabase, políticas RLS ou lógica Leitner.
7. Testar validação do dataset, referências, desbloqueio/rota, exercício e conclusão sem curso completo, salvamento opt-in, regressão do Hangul/vocabulário e estados móvel/desktop. Conteúdo coreano permanece `in-review`; iPhone/Chrome iOS/voz do sistema e Supabase real continuam manuais.

Critério de término da 9B: `a1-l01` jogável e honestamente rotulada como primeira fatia de um curso em desenvolvimento, sem sugerir certificação CEFR/TOPIK nem conclusão A1.
