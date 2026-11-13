# Transição para o A1 — handoff após as Fases 9A–9H

**Decisão vigente (atualizada na Fase 14):** os cursos **A1, A2 e B1 estão completos no currículo interno do KBR** — 40 lições, 8 checkpoints e 48 passos jogáveis cada. `a1-l01` foi preservada. A entrada do A2 exige `a1-c08`; a do B1 exige `a2-c08`. A próxima frente é **B2 — planejamento editorial e primeira fatia**, ou uma correção/native review explicitamente pedida; **o B1 ainda precisa de auditoria linguística própria**. A infraestrutura de áudio está **completa e servida por padrão**: 4.051 MP3 de Hangul, A1, A2, B1 e vocabulário em `public/audio/v1/`, `NEXT_PUBLIC_KBR_STATIC_AUDIO` ligado (`=0` é kill switch) e `public/audio/` publicado. A decisão de risco do dono não é licença; o deploy público continua sujeito a revisão jurídica (`docs/audio/license-audit.md` §13).

## 1. Pronto para desenvolvimento contínuo

| Área | Estado | Onde |
|---|---|---|
| Módulo Hangul completo (`h01`–`h25`, `c1`–`c4`) | conteúdo `in-review`, estável | `src/content/hangul`, `tests/content/*` |
| Curso A1 completo (`a1-l01`–`a1-l40`, `a1-c01`–`a1-c08`) | 48 passos, `in-review`, disponível | `src/content/curriculum/a1`, `/a1/[lessonId]` |
| Curso A2 completo (`a2-l01`–`a2-l40`, `a2-c01`–`a2-c08`) | 48 passos, `in-review`, disponível após `a1-c08` | `src/content/curriculum/a2`, `/a2/[lessonId]` |
| Curso B1 completo (`b1-l01`–`b1-l40`, `b1-c01`–`b1-c08`) | 48 passos, `in-review`, disponível após `a2-c08`, produção independente opcional | `src/content/curriculum/b1`, `/b1/[lessonId]` |
| Registro multi-curso (Hangul, A1, A2 e B1 disponíveis; B2–C2 planejados) | tipado e validado, com `entryPrerequisites` | `src/content/courses/{types,registry,a1,a2,b1,planned,hangul}.ts` |
| Blueprint A1 | 8 módulos, 40 lições, 8 checkpoints; tipado e validado | `src/content/curriculum/a1`, `docs/curriculum/` |
| Vocabulário A1 | 443 identidades novas, 443 frases; 52 reusos do Hangul (495 distintas) | `src/content/vocabulary/{a1,a1-course}.ts` |
| Vocabulário A2 | 400 identidades novas, 400 frases; 115 reusos distintos (515 ensinadas/retomadas) | `src/content/vocabulary/a2-*.ts` |
| Vocabulário B1 | 320 identidades novas, 320 frases; 96 reusos distintos (416 ensinadas/retomadas) | `src/content/vocabulary/b1-*.ts` |
| Contrato de conteúdo A1 | lição, checkpoint, vocabulário contextual, exercícios com etapa, revisão | `A1LessonContent`, `A1CheckpointContent`, `validateA1*` |
| Tipos de exercício | 9 implementados, 3 planejados (`order-words`, `short-answer`, `dialogue-choice`) | `src/lib/exercises/registry.ts` |
| Progresso e SRS | `Progress` v1 + Leitner por erro, cartões `v:` opt-in, CAS multi-dispositivo | `src/lib/{storage,srs,progress,supabase}` |
| Conclusão A1/A2 | relatório derivado compartilhado + painel interno, sem CEFR/TOPIK | `src/lib/courses/completion.ts`, `A1CompletionPanel` |
| Revisão, painel, catálogo, PWA | funcionais | `/revisao`, `/dashboard`, `/cursos` |
| Reprodução de áudio | asset (desligado) → voz coreana explícita → dica textual | `src/lib/audio/playback.ts` |
| Testes | typecheck, Vitest, Playwright (Chromium 4 larguras + WebKit) | `AGENTS.md` |

## 2. Interfaces reutilizáveis por B1–C2

- **`CourseDefinition` / `COURSE_REGISTRY`**: `ko-a1` usa `status: "available"`, 48 passos, `requiresAllSteps: true`, `finalStepId: "a1-c08"`, prefixo SRS `a1:` e `stepIdPattern` próprio. Para um novo curso, crie outro prefixo e outro namespace de IDs; não reutilize `a1-*`/`h*`/`c*`.
- **`ExerciseSpec` + `EXERCISE_TYPE_REGISTRY`**: novo tipo = extensão da união + entrada no registro com `skills` e `grading`; correção determinística em `checkAnswer`; apresentação com `lib/exercises/shuffle` + `use-shuffled-order`.
- **Conteúdo**: `content/` sem lógica, com `ReviewMeta` (`in-review`). O A1 já tem contratos próprios e validadores; um curso novo deve criar contrato/validador equivalentes, não reutilizar IDs de lição.
- **IDs leves**: importe `A1_LESSON_IDS` de `@/content/curriculum/a1/ids` em código de cliente/registro; o índice `@/content/curriculum/a1` carrega o blueprint e os datasets, sendo apropriado a servidor e testes. O A2 tem `A2_LESSON_IDS`/`A2_STEP_IDS` em `src/content/curriculum/a2/ids.ts`; um curso novo deve criar o equivalente.
- **Progresso**: `Progress` v1 guarda tentativas por ID global de exercício/passo; IDs novos não exigem migração. **Não alterar o formato nem o CAS** sem fase explícita.
- **Áudio**: `audioText` por exercício; `resolveAudioAsset(text)` devolve `null` com a flag desligada, então a voz do sistema cobre texto coreano novo **sem novos MP3**.
- **Guardas**: `audio-containment.test.ts` e `verify-no-restricted-audio.mjs` continuam valendo para qualquer áudio novo.

## 3. Bloqueado para lançamento público (não bloqueia desenvolvimento local)

1. Licença do áudio sintético (MeloTTS + `kykim/bert-kor-base`): **BLOQUEADA**; corpus tem de ficar fora do HEAD público (ver `docs/audio/exposure-and-removal-plan.md`).
2. Exposição histórica do corpus de áudio no repositório público e em deployments antigos da Vercel (ações do dono).
3. Privacidade/Impressum com campos "a confirmar" e revisão jurídica.
4. Revisão nativa de todo o conteúdo coreano A1/Hangul; teste em dispositivos reais.

## 4. Opcional / experimental

`/fala` (reconhecimento de fala; **não expandir**), avaliação de TTS alternativo (`docs/audio/tts-alternatives.md`), flashcards ilustrados, export/import JSON.

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

## 7. A2 e B1 concluídos

O A2 está implementado em `src/content/curriculum/a2` com 40 lições, 8 checkpoints, 400 identidades novas e 400 frases. O B1 está em `src/content/curriculum/b1`, com 40 lições, 8 checkpoints, 320 identidades novas e uma produção independente opcional por lição. Os documentos estão em `docs/curriculum/b1-*.md`; a revisão nativa de A1, A2, B1 e Hangul continua pendente. As rotas `/a2` e `/b1` reutilizam os componentes do A1 parametrizados por `CourseClientView`; as entradas exigem `a1-c08` e `a2-c08`. Os documentos `docs/curriculum/a2-*.md` registram pesquisa, resultados, syllabus, vocabulário e exercícios. A revisão nativa de todo o conteúdo A2/B1 continua pendente.

## 8. Padrão para B2

1. Criar um blueprint B2 validado (módulos, lições, checkpoints, dependências, resultados), sem copiar o B1.
2. Criar `src/content/curriculum/b2/` com IDs `b2-*`, contratos/validadores próprios e registrar somente datasets completos.
3. Derivar `B2_COURSE` do blueprint, com `entryPrerequisites: ["b1-c08"]`, `requiresAllSteps`/`finalStepId` somente quando todos os passos existirem e namespace SRS `b2:`.
4. Vocabulário B2 no registro canônico, com IDs `ko:<forma>` estáveis, frases contextuais e reusos do A1/A2/B1/Hangul quando forma e sentido coincidirem.
5. Reutilizar os players parametrizados, `ExerciseView`, áudio do sistema, `LessonVocabulary`, `Progress` v1 e a conclusão derivada.
6. Progressão por pré-requisitos no player e no catálogo; nenhum passo futuro ganha link ou conclusão antes do dataset.
7. Cobrir validação, referências, gabaritos, bloqueios, conclusão, opt-in, 320–1280 e axe; atualizar docs no mesmo commit.
8. Marcar todo o coreano novo como `in-review` e não prometer CEFR/TOPIK.
