# Transição para o desenvolvimento do currículo (A1–C2) — Fase 8F

**Decisão do dono:** priorizar o currículo coreano completo (A1→C2) em vez de mais reconhecimento de fala ou da licença do TTS. A infraestrutura de áudio está **encerrada**: o que falta é de licença/pronúncia e pode ser retomado depois sem bloquear conteúdo original.

## 1. Pronto para desenvolvimento contínuo

| Área | Estado | Onde |
|---|---|---|
| Módulo Hangul completo (`h01`–`h25`, `c1`–`c4`) | conteúdo `in-review`, estável | `src/content/hangul`, `tests/content/*` |
| Registro multi-curso (A1–C2 planejados) | tipado e validado | `src/content/courses/{types,registry,planned,hangul}.ts` |
| Tipos de exercício | 9 implementados, 3 planejados (`order-words`, `short-answer`, `dialogue-choice`) | `src/lib/exercises/registry.ts` |
| Progresso e SRS | `Progress` v1 + Leitner por erro, CAS multi-dispositivo | `src/lib/{storage,srs,progress,supabase}` |
| Revisão, painel, catálogo, PWA | funcionais | `/revisao`, `/dashboard`, `/cursos` |
| Reprodução de áudio | asset (desligado) → voz coreana explícita → dica textual | `src/lib/audio/playback.ts` |
| Testes | typecheck, Vitest, Playwright (Chromium 4 larguras + WebKit) | `AGENTS.md` |

## 2. Interfaces reutilizáveis por cursos A1–C2

- **`CourseDefinition` / `COURSE_REGISTRY`**: para ativar um curso, mudar o `status` de planejado para disponível e fornecer unidades/passos (`CourseStepDefinition`, `CourseCompletionDefinition`); `validateCourseRegistry` e `assertCourseRegistry` pegam rotas e passos quebrados.
- **`ExerciseSpec` + `EXERCISE_TYPE_REGISTRY`**: novo tipo = extensão da união + entrada no registro com `skills` e `grading`; correção determinística em `checkAnswer`; apresentação com `lib/exercises/shuffle` + `use-shuffled-order` (regra de randomização do `AGENTS.md`).
- **Conteúdo**: `content/` sem lógica, com `ReviewMeta` (`in-review`); esquema de referência em `docs/pedagogy/content-schema.md`. O `Lesson`/`Checkpoint`/`Curriculum` atuais são específicos do Hangul — **um curso de vocabulário/gramática vai precisar de um esquema próprio** (palavra, frase, nota de gramática, diálogo), registrado em `docs/architecture.md`.
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

## 6. Primeira fase recomendada

**9A — Esquema e esqueleto do curso A1 (sem lições ainda):** definir o esquema de conteúdo para vocabulário/frases/gramática/diálogo, o mapa A1 (unidades, objetivos, vocabulário-alvo, notas de gramática e quais tipos de exercício existentes cobrem cada habilidade), a política de fonte original e revisão nativa, e a ativação do curso no registro — **com 0 lições escritas**. Só depois **9B**, a primeira lição (cumprimentos/apresentação, `이에요/예요`), usando voz do sistema.
