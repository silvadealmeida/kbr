# Transição para o A1 — handoff após as Fases 9A–9H

**Decisão vigente:** o **curso A1 está completo no currículo interno do KBR** — 40 lições, 8 checkpoints e 48 passos jogáveis. `a1-l01` foi preservada. A próxima frente é **A2 — planejamento editorial e primeira fatia**, ou uma correção/native review do A1 explicitamente pedida. A infraestrutura de áudio está **encerrada**: pendências de licença/pronúncia não bloqueiam conteúdo original, mas impedem distribuir os MP3 sintéticos.

## 1. Pronto para desenvolvimento contínuo

| Área | Estado | Onde |
|---|---|---|
| Módulo Hangul completo (`h01`–`h25`, `c1`–`c4`) | conteúdo `in-review`, estável | `src/content/hangul`, `tests/content/*` |
| Curso A1 completo (`a1-l01`–`a1-l40`, `a1-c01`–`a1-c08`) | 48 passos, `in-review`, disponível | `src/content/curriculum/a1`, `/a1/[lessonId]` |
| Registro multi-curso (Hangul e A1 disponíveis; A2–C2 planejados) | tipado e validado | `src/content/courses/{types,registry,a1,planned,hangul}.ts` |
| Blueprint A1 | 8 módulos, 40 lições, 8 checkpoints; tipado e validado | `src/content/curriculum/a1`, `docs/curriculum/` |
| Vocabulário A1 | 443 identidades novas, 443 frases; 52 reusos do Hangul (495 distintas) | `src/content/vocabulary/{a1,a1-course}.ts` |
| Contrato de conteúdo A1 | lição, checkpoint, vocabulário contextual, exercícios com etapa, revisão | `A1LessonContent`, `A1CheckpointContent`, `validateA1*` |
| Tipos de exercício | 9 implementados, 3 planejados (`order-words`, `short-answer`, `dialogue-choice`) | `src/lib/exercises/registry.ts` |
| Progresso e SRS | `Progress` v1 + Leitner por erro, cartões `v:` opt-in, CAS multi-dispositivo | `src/lib/{storage,srs,progress,supabase}` |
| Conclusão A1 | relatório derivado + painel interno, sem CEFR/TOPIK | `src/lib/a1/completion.ts`, `A1CompletionPanel` |
| Revisão, painel, catálogo, PWA | funcionais | `/revisao`, `/dashboard`, `/cursos` |
| Reprodução de áudio | asset (desligado) → voz coreana explícita → dica textual | `src/lib/audio/playback.ts` |
| Testes | typecheck, Vitest, Playwright (Chromium 4 larguras + WebKit) | `AGENTS.md` |

## 2. Interfaces reutilizáveis por A2–C2

- **`CourseDefinition` / `COURSE_REGISTRY`**: `ko-a1` usa `status: "available"`, 48 passos, `requiresAllSteps: true`, `finalStepId: "a1-c08"`, prefixo SRS `a1:` e `stepIdPattern` próprio. Para um novo curso, crie outro prefixo e outro namespace de IDs; não reutilize `a1-*`/`h*`/`c*`.
- **`ExerciseSpec` + `EXERCISE_TYPE_REGISTRY`**: novo tipo = extensão da união + entrada no registro com `skills` e `grading`; correção determinística em `checkAnswer`; apresentação com `lib/exercises/shuffle` + `use-shuffled-order`.
- **Conteúdo**: `content/` sem lógica, com `ReviewMeta` (`in-review`). O A1 já tem contratos próprios e validadores; um curso novo deve criar contrato/validador equivalentes, não reutilizar IDs de lição.
- **IDs leves**: importe `A1_LESSON_IDS` de `@/content/curriculum/a1/ids` em código de cliente/registro; o índice `@/content/curriculum/a1` carrega o blueprint e os datasets, sendo apropriado a servidor e testes. Para A2, crie um `ids.ts` leve equivalente.
- **Progresso**: `Progress` v1 guarda tentativas por ID global de exercício/passo; IDs novos não exigem migração. **Não alterar o formato nem o CAS** sem fase explícita.
- **Áudio**: `audioText` por exercício; `resolveAudioAsset(text)` devolve `null` com a flag desligada, então a voz do sistema cobre texto coreano novo **sem novos MP3**.
- **Guardas**: `audio-containment.test.ts` e `verify-no-restricted-audio.mjs` continuam valendo para qualquer áudio novo.

## 3. Bloqueado para lançamento público (não bloqueia desenvolvimento local)

1. Licença do áudio sintético (MeloTTS + `kykim/bert-kor-base`): **BLOQUEADA**; corpus tem de ficar fora do HEAD público (ver `docs/audio/exposure-and-removal-plan.md`).
2. Exposição histórica dos 287 MP3 no repositório público e em deployments antigos da Vercel (ações do dono).
3. Privacidade/Impressum com campos "a confirmar" e revisão jurídica.
4. Revisão nativa de todo o conteúdo coreano A1/Hangul; teste em dispositivos reais.

## 4. Opcional / experimental

`/fala` (reconhecimento de fala; **não expandir**), `npm run audio:stage` + flag (teste local de MP3), avaliação de TTS alternativo (`docs/audio/tts-alternatives.md`), flashcards ilustrados, export/import JSON.

## 5. Tarefas de áudio/pronúncia que podem ser retomadas depois

R1/R2 (e-mails em `docs/audio/permissions/email-drafts.md`, **não enviados**), piloto de TTS alternativo (~20 clipes), gravação com falante nativo (`audio-quality-roadmap.md`), matriz manual §14 do checklist de iPhone, decisão formal sobre manter ou substituir o MeloTTS. Nenhuma depende de código novo agora.

## 5b. Vocabulário (Fase 9A-V + A1)

Infraestrutura pronta: registro `src/content/vocabulary` (cada curso entrega `VocabEntry[]` + frases; passos em `docs/vocabulary/content-schema.md`), `/vocabulario` (busca, filtros, salvar/remover, detalhes), revisão diária contextual (frase com lacuna + dica de sentido + tradução opcional antes e obrigatória depois), cartões simples e Leitner reaproveitado em `Progress.cards["v:<id>"]` (sem migração). Há 133 IDs legados imutáveis; homógrafos **novos** podem usar `ko:<forma>#<sentido>`, desde que todas as entradas da forma sejam qualificadas. O A1 adiciona 443 itens e 443 frases, todos `in-review`, e reusa 52 identidades do Hangul sem duplicar cartões. `VocabSentence.target` pode ser a forma polida usada na frase; o cartão canônico continua no dicionário. Limites: revisão nativa pendente; sincronização remota não verificada em Supabase real.

## 6. Escopo fechado da implementação A1 (9B–9H)

1. **40 lições** em `src/content/curriculum/a1/lessons/a1-lNN.ts`, com introdução, diálogo traduzido, gramática, vocabulário, exercícios guiados/independentes, fechamento e `review: "in-review"`.
2. **8 checkpoints** em `src/content/curriculum/a1/checkpoints/a1-cNN.ts`, com 25 itens (20/25) ou 40 no final (32/40), sem conteúdo novo obrigatório.
3. **Vocabulário** em `src/content/vocabulary/a1.ts` (l01) + `a1-course.ts` (l02–l40), uma frase contextual por item novo; reusos explícitos referenciam IDs existentes.
4. **Curso** em `src/content/courses/a1.ts`, derivado do blueprint; `available`, 48 passos, `requiresAllSteps: true`, `finalStepId: "a1-c08"`.
5. **Players** `A1LessonPlayer` e `A1CheckpointPlayer` reutilizam `ExerciseView`, `AudioControl` e `LessonVocabulary`; URL direta bloqueada por pré-requisitos; conclusão gravada somente em `Progress.lessons`.
6. **Conclusão** derivada por `buildA1CompletionReport`; painel só com 48/48, sem certificação e com estatísticas reais de vocabulário.
7. **Sem mudanças** em `Progress` v1, CAS, SQL, RLS, SRS do Hangul ou cartões `v:` existentes. Nenhum MP3 novo, nenhum microfone obrigatório.
8. **Testes** unitários cobrem 40+8 datasets, gabaritos, IDs, contagens, thresholds, progressão, conclusão, opt-in e isolamento. Playwright cobre catálogo, bloqueio por URL, lição, checkpoints, conclusão, áudio, 320–1280 e axe claro/escuro.

Critério cumprido: o curso está jogável em `/a1`, a conclusão só aparece com 48/48, o Hangul e o vocabulário existente permanecem intactos e nenhum áudio restrito foi reativado. **Limite:** revisão nativa e licença de áudio continuam pendentes.

## 7. Padrão para A2

1. Criar um blueprint A2 validado (módulos, lições, checkpoints, dependências, resultados), sem copiar o A1.
2. Criar contratos/datasets A2 com IDs próprios (`a2-*`), validadores e um `A2_COURSE` derivado do blueprint.
3. Reutilizar o motor de exercícios, `ExerciseView`, áudio do sistema, `LessonVocabulary`, `Progress` v1 e o padrão de conclusão derivada.
4. Vocabulário A2 no registro canônico, com IDs `ko:<forma>` estáveis, frases contextuais e reusos do A1/Hangul quando forma e sentido coincidirem.
5. Progressão por pré-requisitos no player e no catálogo; nenhum passo futuro ganha link ou conclusão antes do dataset.
6. Cobrir validação, referências, gabaritos, bloqueios, conclusão, opt-in, 320–1280 e axe; atualizar docs no mesmo commit.
