# Transição para o A1 — handoff histórico (superado)

> **Arquivo histórico; não é o handoff atual.** O projeto está concluído para release público, a produção foi aceita pelo responsável, não há próximo curso ou fase planejada, e o áudio está resolvido com créditos: 7.790 MP3 servidos por padrão; `NEXT_PUBLIC_KBR_STATIC_AUDIO=0` é apenas kill switch. As recomendações e bloqueios abaixo refletem o estado à época e foram superados. Ver `docs/roadmap.md` e `docs/release/beta-readiness.md`.

**Estado registrado na época:** os cursos A1–C2 foram concluídos após este handoff. A revisão editorial final assistida por IA foi aceita pelo responsável; não houve revisão nativa, e esse risco é aceito e não bloqueia o release.

## 1. Pronto para desenvolvimento contínuo

| Área | Estado | Onde |
|---|---|---|
| Módulo Hangul completo (`h01`–`h25`, `c1`–`c4`) | conteúdo `in-review`, estável | `src/content/hangul`, `tests/content/*` |
| Curso A1 completo (`a1-l01`–`a1-l40`, `a1-c01`–`a1-c08`) | 48 passos, `in-review`, disponível | `src/content/curriculum/a1`, `/a1/[lessonId]` |
| Curso A2 completo (`a2-l01`–`a2-l40`, `a2-c01`–`a2-c08`) | 48 passos, `in-review`, disponível após `a1-c08` | `src/content/curriculum/a2`, `/a2/[lessonId]` |
| Curso B1 completo (`b1-l01`–`b1-l40`, `b1-c01`–`b1-c08`) | 48 passos, `in-review`, disponível após `a2-c08`, produção independente opcional | `src/content/curriculum/b1`, `/b1/[lessonId]` |
| Registro multi-curso (Hangul e A1–C2 disponíveis) | tipado e validado, com `entryPrerequisites` | `src/content/courses/` |
| Blueprint A1 | 8 módulos, 40 lições, 8 checkpoints; tipado e validado | `src/content/curriculum/a1`, `docs/curriculum/` |
| Vocabulário A1 | 443 identidades novas, 443 frases; 52 reusos do Hangul (495 distintas) | `src/content/vocabulary/{a1,a1-course}.ts` |
| Vocabulário A2 | 400 identidades novas, 400 frases; 115 reusos distintos (515 ensinadas/retomadas) | `src/content/vocabulary/a2-*.ts` |
| Vocabulário B1 | 320 identidades novas, 320 frases; 96 reusos distintos (416 ensinadas/retomadas) | `src/content/vocabulary/b1-*.ts` |
| Contrato de conteúdo A1 | lição, checkpoint, vocabulário contextual, exercícios com etapa, revisão | `A1LessonContent`, `A1CheckpointContent`, `validateA1*` |
| Tipos de exercício | 9 implementados, 3 planejados (`order-words`, `short-answer`, `dialogue-choice`) | `src/lib/exercises/registry.ts` |
| Progresso e SRS | `Progress` v1 + Leitner por erro, cartões `v:` opt-in, CAS multi-dispositivo | `src/lib/{storage,srs,progress,supabase}` |
| Conclusão A1/A2 | relatório derivado compartilhado + painel interno, sem CEFR/TOPIK | `src/lib/courses/completion.ts`, `A1CompletionPanel` |
| Revisão, painel, catálogo, PWA | funcionais | `/revisao`, `/dashboard`, `/cursos` |
| Reprodução de áudio (estado atual) | 7.790 MP3 servidos por padrão; sem TTS; kill switch `=0` | `src/lib/audio/playback.ts` |
| Testes | typecheck, Vitest, Playwright (Chromium 4 larguras + WebKit) | `AGENTS.md` |

## 2. Interfaces reutilizáveis por B1–C2

- **`CourseDefinition` / `COURSE_REGISTRY`**: `ko-a1` usa `status: "available"`, 48 passos, `requiresAllSteps: true`, `finalStepId: "a1-c08"`, prefixo SRS `a1:` e `stepIdPattern` próprio. Para um novo curso, crie outro prefixo e outro namespace de IDs; não reutilize `a1-*`/`h*`/`c*`.
- **`ExerciseSpec` + `EXERCISE_TYPE_REGISTRY`**: novo tipo = extensão da união + entrada no registro com `skills` e `grading`; correção determinística em `checkAnswer`; apresentação com `lib/exercises/shuffle` + `use-shuffled-order`.
- **Conteúdo**: `content/` sem lógica, com `ReviewMeta` (`in-review`). O A1 já tem contratos próprios e validadores; um curso novo deve criar contrato/validador equivalentes, não reutilizar IDs de lição.
- **IDs leves**: importe `A1_LESSON_IDS` de `@/content/curriculum/a1/ids` em código de cliente/registro; o índice `@/content/curriculum/a1` carrega o blueprint e os datasets, sendo apropriado a servidor e testes. O A2 tem `A2_LESSON_IDS`/`A2_STEP_IDS` em `src/content/curriculum/a2/ids.ts`; um curso novo deve criar o equivalente.
- **Progresso**: `Progress` v1 guarda tentativas por ID global de exercício/passo; IDs novos não exigem migração. **Não alterar o formato nem o CAS** sem fase explícita.
- **Áudio (estado vigente)**: o corpus de 7.790 MP3 é servido por padrão; `=0` é apenas kill switch; o player não usa TTS de navegador.
- **Guardas (registro da fase)**: os controles da antiga contenção não representam a configuração vigente; ver `docs/audio/license-audit.md` §13.

## 3. Bloqueios registrados no handoff original (superados)

1. Créditos do áudio sintético: **resolvido com créditos**; ver `/impressum` e `docs/audio/credits.md`.
2. Exposição do corpus: risco de distribuição aceito pelo responsável; não exige ação de remoção para este release.
3. Privacidade/Impressum: política operacional publicada, sem alegação de parecer profissional ou dados pessoais inventados.
4. Revisão editorial: final assistida por IA e aceita pelo responsável, sem revisão nativa. Testes físicos não foram feitos e não são requisito; os riscos são aceitos e não bloqueiam o release.

## 4. Opcional / experimental

`/fala` permanece experimental. Avaliação de TTS alternativo, flashcards ilustrados e export/import JSON são anotações históricas de ideias, não trabalho planejado.

## 5. Tarefas de áudio/pronúncia que podem ser retomadas depois

Os e-mails e alternativas de TTS são históricos e não precisam ser enviados ou avaliados: o áudio atual está resolvido com créditos. Gravação nativa e checklist físico não são tarefas planejadas nem requisitos de release.

## 5b. Vocabulário (Fase 9A-V + A1)

Infraestrutura pronta: registro `src/content/vocabulary` (cada curso entrega `VocabEntry[]` + frases; passos em `docs/vocabulary/content-schema.md`), `/vocabulario` (busca, filtros, salvar/remover, detalhes), revisão diária contextual, cartões simples e Leitner reaproveitado em `Progress.cards["v:<id>"]` (sem migração). Há 133 IDs legados imutáveis; homógrafos novos podem usar `ko:<forma>#<sentido>`. O A1 adiciona 443 itens e 443 frases e reusa 52 identidades do Hangul. O metadado `in-review` é mantido sem alegação de revisão nativa; o responsável aceitou o risco editorial e a produção. O trecho sobre sincronização real é um registro histórico.

## 6. Escopo fechado da implementação A1 (9B–9H)

1. **40 lições** em `src/content/curriculum/a1/lessons/a1-lNN.ts`, com introdução, diálogo traduzido, gramática, vocabulário, exercícios guiados/independentes, fechamento e `review: "in-review"`.
2. **8 checkpoints** em `src/content/curriculum/a1/checkpoints/a1-cNN.ts`, com 25 itens (20/25) ou 40 no final (32/40), sem conteúdo novo obrigatório.
3. **Vocabulário** em `src/content/vocabulary/a1.ts` (l01) + `a1-course.ts` (l02–l40), uma frase contextual por item novo; reusos explícitos referenciam IDs existentes.
4. **Curso** em `src/content/courses/a1.ts`, derivado do blueprint; `available`, 48 passos, `requiresAllSteps: true`, `finalStepId: "a1-c08"`.
5. **Players** `A1LessonPlayer` e `A1CheckpointPlayer` reutilizam `ExerciseView`, `AudioControl` e `LessonVocabulary`; URL direta bloqueada por pré-requisitos; conclusão gravada somente em `Progress.lessons`.
6. **Conclusão** derivada por `buildA1CompletionReport`; painel só com 48/48, sem certificação e com estatísticas reais de vocabulário.
7. **Sem mudanças** em `Progress` v1, CAS, SQL, RLS, SRS do Hangul ou cartões `v:` existentes. Nenhum MP3 novo, nenhum microfone obrigatório.
8. **Testes** unitários cobrem 40+8 datasets, gabaritos, IDs, contagens, thresholds, progressão, conclusão, opt-in e isolamento. Playwright cobre catálogo, bloqueio por URL, lição, checkpoints, conclusão, áudio, 320–1280 e axe claro/escuro.

Critério da fase cumprido: o curso está jogável em `/a1` e a conclusão só aparece com 48/48. O estado atual do áudio é resolvido com créditos; a revisão editorial assistida por IA foi aceita pelo responsável e os riscos residuais não bloqueiam o release.

## 7. A2 e B1 concluídos

O A2 está implementado com 40 lições, 8 checkpoints, 400 identidades novas e 400 frases; o B1 tem 40 lições e 8 checkpoints. Os cursos foram posteriormente seguidos por B2–C2. A revisão editorial final assistida por IA foi aceita pelo responsável, sem alegação de revisão nativa; esse risco não bloqueia o release.

## 8. Padrão para B2

1. Criar um blueprint B2 validado (módulos, lições, checkpoints, dependências, resultados), sem copiar o B1.
2. Criar `src/content/curriculum/b2/` com IDs `b2-*`, contratos/validadores próprios e registrar somente datasets completos.
3. Derivar `B2_COURSE` do blueprint, com `entryPrerequisites: ["b1-c08"]`, `requiresAllSteps`/`finalStepId` somente quando todos os passos existirem e namespace SRS `b2:`.
4. Vocabulário B2 no registro canônico, com IDs `ko:<forma>` estáveis, frases contextuais e reusos do A1/A2/B1/Hangul quando forma e sentido coincidirem.
5. Reutilizar os players parametrizados, `ExerciseView`, áudio do sistema, `LessonVocabulary`, `Progress` v1 e a conclusão derivada.
6. Progressão por pré-requisitos no player e no catálogo; nenhum passo futuro ganha link ou conclusão antes do dataset.
7. Cobrir validação, referências, gabaritos, bloqueios, conclusão, opt-in, 320–1280 e axe; atualizar docs no mesmo commit.
8. Marcar todo o coreano novo como `in-review` e não prometer CEFR/TOPIK.
