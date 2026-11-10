# KBR — Arquitetura

## Stack
Next.js (App Router) + React + TypeScript + Tailwind; Vitest (unit); Playwright (e2e/responsivo); Supabase Auth/PostgreSQL. Google OAuth usa PKCE e sessão em cookies via `@supabase/ssr`, renovada pelo Proxy do Next.js 16. PWA mínima instalável (manifesto, ícones e modo standalone), sem service worker ou cache offline. Deploy: Node/Next (a renovação segura de sessão impede export puramente estático); páginas interativas leem storage após montagem para evitar mismatch de hidratação.

## Estrutura
```
src/
  proxy.ts                  # Proxy do Next 16: renova sessão e bloqueia rotas privadas
  app/
    layout.tsx              # raiz: html, tema, fonte, AuthProvider
    (site)/                 # público: landing, privacidade, impressum, auth/error
    (app)/                  # protegido: dashboard, hangul, licoes, vocabulario, revisao
    auth/callback/route.ts  # route handler do OAuth (público)
  components/
    ui/                     # Button, Card, ProgressBar, Feedback
    hangul/                 # catálogo do curso e player de lição (client)
    review/                 # ReviewArea: fila, sessão e conclusão de revisão (client)
    auth/                   # AuthProvider, AuthControl, ProtectedArea, AccountCard
    site/                   # header/footer públicos e CTA de login
  content/                  # DADOS originais (TS tipado, sem lógica)
    hangul/                 # types, jamo, sílabas, palavras, lições h01–h03, outline, validate
  lib/
    auth/                   # redirect seguro, estados de acesso
    supabase/               # clientes browser/server, sessão no proxy
    srs/                    # interface Scheduler + leitner.ts (trocável por fsrs.ts)
    review/                 # fila determinística, exercícios de revisão e applyReview (puro)
    storage/                # interface ProgressStore + localStorageStore.ts (versionado)
    exercises/              # tipos + check/checkAnswer (funções puras)
    hangul/                 # composição/decomposição de sílabas (Unicode), puro
    progress/               # score de lição, tentativas e desbloqueio (puro)
  types/
tests/  (vitest)   e2e/ (playwright; Supabase mock para fluxo autenticado)
docs/
supabase/                    # migrations e testes pgTAP de RLS
```

## Modelo de dados (TS)
- `Card { id, ko, pt, romanization?, audioText, tags, sentenceId? }`
- `Lesson { id, title, objectives, dialogue: Line[], vocab: Card[], grammar: Note[], exercises: ExerciseSpec[] }`
- `ExerciseSpec` = união discriminada (`mcq | cloze | build-syllable | listen | translate | audio-to-char | char-to-audio | minimal-pair | reading`); `check(spec, answer)` mantém o contrato antigo e `checkAnswer(spec, ExerciseAnswer)` devolve resultado detalhado (`errorTags`, `scored`).
- `Progress { v: 1, lessons: Record<id,{done,score}>, cards: Record<id, SrsState>, history: Attempt[], streak, dailyGoal, lastActive }`. `lib/progress/lesson` calcula score/desbloqueio, avalia lições e checkpoints e grava tentativas sem alterar esse formato; checkpoints usam a mesma entrada `lessons[id]`. O painel deriva suas estatísticas apenas de `lessons` e `history`; `streak` permanece no formato por compatibilidade, mas não é a fonte da sequência exibida.

## Interfaces de troca futura
- `ProgressStore { async load(); async save(p); }` → implementações para `localStorage` e Supabase sem acoplar telas. PostgreSQL mantém um snapshot JSONB v1 por `auth.users.id`; a PK elimina linhas duplicadas e RLS restringe todas as operações ao dono.
- `Scheduler { review(state, grade, now) → state; due(states, now) }` → hoje Leitner (caixas 1,2,4,8,16 dias; erro volta à caixa 1); `SrsState` é opaco (`{due, ...}`) para acomodar FSRS (stability/difficulty) via `ts-fsrs`. `now` injetado → testável.
- Conteúdo isolado em `content/` → pode virar JSON/CMS/API depois.

## Rotas e autenticação
- Públicas: `/` (landing), `/privacidade`, `/impressum`, `/auth/error` e `/auth/callback`. O callback e a página de erro continuam acessíveis sem sessão.
- Privadas: `/dashboard`, `/hangul`, `/licoes`, `/vocabulario`, `/revisao` (e subrotas). A lista canônica está em `lib/routes.ts` (`PROTECTED_PATHS` / `isProtectedPath`).
- `src/proxy.ts` valida a sessão com `supabase.auth.getClaims()` antes de renderizar. Com sessão, `/` redireciona para `/dashboard` (ou para o `next` interno validado), então o retorno do login nunca para na landing. Sem sessão, rotas privadas vão para `/?next=<caminho interno validado>`; se havia cookie de sessão inválido, acrescenta `motivo=sessao-expirada`. Sem configuração do Supabase, rotas privadas vão para `/?motivo=indisponivel`.
- O layout de `(app)` repete a verificação no servidor como defesa em profundidade. `ProtectedArea` (client) nunca renderiza conteúdo para `guest` e, se a sessão expirar após o carregamento, redireciona com `motivo=sessao-expirada`. Não há laço: o proxy só sai de `/` com sessão válida e `postLoginPath` nunca devolve a própria landing.
- `safeNextPath` aceita apenas caminhos internos, rejeita `//`, barra invertida, controles e separadores percent-encoded. `postLoginPath` aplica a mesma validação e troca a landing pelo painel.
- Login: o `redirectTo` aponta para `/auth/callback` sem query params, porque o Supabase pode descartá-los ao validar a lista de URLs permitidas. O destino seguro (`/dashboard` por padrão ou rota profunda) viaja no cookie `kbr_auth_next` (10 min), que a callback lê, valida e apaga; `?next=` continua aceito por compatibilidade. Se o Supabase devolver o `code` direto para `/` (Site URL), o cliente troca a sessão e `LandingRedirect` retoma o cookie. Qualquer falha na troca vai para `/auth/error`, nunca para rota privada.
- `AuthProvider` mantém a sessão e o `ProgressStore` do convidado; a proteção de rotas não removeu o modo convidado nem a migração de progresso. O dashboard e os controles de conta leem o usuário apenas no cliente.

## Hangul
Composição por Unicode: `0xAC00 + (L*21 + V)*28 + T` — sem tabela de sílabas; testes unitários. `decomposeSyllable`, `isHangulText` e `normalizeHangul` completam as funções puras (round-trip e NFC).

Currículo e especificação pedagógica: `docs/pedagogy/`. A Fase 3B.5 implementa o curso completo `h01`–`h25` + checkpoints `c1`–`c4`:

- `src/content/hangul/` contém tipos, registro de jamo (21 vogais + 19 consoantes), sílabas, palavras, as três regras de fronteira em `rules.ts`, as 25 lições, os checkpoints `c1`–`c4` e `validateCurriculum`/`assertCurriculum`. Todo conteúdo está `in-review`; o validador rejeita jamo não ensinado, composição inconsistente, IDs repetidos, revisão sem revisor, exercícios ambíguos, cartão SRS com conteúdo posterior à lição, regra duplicada/fora de h21–h23, exemplo de regra inválido, checkpoint fora do escopo de unidade ou com duração fora de 15–30 minutos e pré-requisito inexistente/fora de ordem (lições e checkpoints compartilham a mesma ordem curricular).
- `Lesson.newFinals` registra os batchim introduzidos por lição; o validador monta `finalIntroducedIn`, exige os 27 finais com batchim uma única vez e rejeita exercício/palavra/SRS que use um final antes da introdução. Iniciais/mediais continuam vindo de `JamoRecord`, então o mesmo símbolo não precisa de registro duplicado para atuar como inicial e final.
- `Lesson.completion` ganhou `rules` opcionais para critérios documentados que não cabem em "todos os itens obrigatórios" (ex.: 3 dos 4 contrastes de aspiração em `h07`, 4 dos 6 contrastes tensos em `h09`, um acerto por contraste de três vias em `h10`, ortografia de `h12`/`h14`, exceção de `밟다` em `h20`).
- `Lesson.completion.minCorrect` e `Checkpoint.minCorrect` são opcionais e autoritativos sobre a porcentagem arredondada. Valores atuais: c1 = 16/20, c2 = 19/24, c3 = 19/24, c4 = 24/30; h16 = 10/12, h17 = 10/12, h18 = 11/14, h19 = 10/12, h20 = 11/14, h21–h23 = 11/14, h24 = 12/14 avaliados e h25 = 13/15 avaliados. Em h24/h25, o item de autoavaliação (`scored: false`) não entra no denominador, mas o critério documentado continua sendo 12/15 e 13/16. O player exibe “X de Y acertos (Z% documentado)” para não sugerir que 19/24 (79%) reprova.
- `src/lib/exercises` mantém os nove tipos e `checkAnswer(spec, answer)`; `ExerciseBase` ganhou `tags` estáveis (`diag:*`) e `srsCards` determinísticas. `ReadingExercise.selfCheckLabel` permite rotular a autoavaliação sem nota (h24/h25). `check(spec, string)` mantém exatamente o formato antigo.
- `src/lib/srs/cards.ts` gera chaves estáveis (`h:jamo:c:ㄱ`, `h:jamo:v:ㅏ`, `h:syl:가`, `h:word:고기`, `h:rule:liaison`), interpreta-as e aplica `scheduleMissedReview`: erro cria/atualiza cartões na caixa 1 do Leitner, sem duplicar chaves. `Progress` v1 permanece intacto. Erros de `h11`–`h25`/`c2`–`c4` reutilizam o mesmo scheduler para vogais, sílabas, palavras e regras; batchim duplo usa sílaba/palavra, nunca jamo isolado.
- `src/lib/progress/diagnostics.ts` agrupa erros pela tag primária `diag:*` em vogais simples, vogais compostas, consoantes básicas, consoantes tensas, batchim simples, batchim duplo, ligação, nasalização, aspiração, escrita × pronúncia, leitura de sílabas, leitura em contexto e estrutura de bloco. A saída é determinística e itens sem tag continuam contando para a nota, mas não para o diagnóstico.
- `src/lib/progress/lesson.ts` avalia lições e checkpoints. A aprovação prioriza `minCorrect` e, quando ausente, usa o número mínimo de acertos (`Math.round(total × nota / 100)`), evitando que 19/24 (79% arredondado) reprove um critério documentado como 80%. `isCheckpointUnlocked` exige todas as lições do escopo e todos os checkpoints anteriores (`c2` depende de `c1`, `c3` de `c1`–`c2`, `c4` de `c1`–`c3`); `isLessonUnlocked` aceita um checkpoint como pré-requisito (`h11` depende de `c1`, `h16` de `c2`, `h21` de `c3`). `buildCourseSteps` produz a ordem intercalada `h10` → `c1` → `h11` … `c2` → `h16` … `c3` → `h21` … `h25` → `c4` e inclui os checkpoints anteriores nos pré-requisitos de cada checkpoint; `isCourseStepDone`, `isCourseStepUnlocked` e `nextRecommendedCourseStep` são a base do próximo passo do painel. `nextCourseStepAfter` reutiliza essa ordem. `isCourseComplete` só retorna `true` com todas as 25 lições e os quatro checkpoints concluídos; não desbloqueia CEFR A1.
- O player compartilhado fica em `components/hangul/exercise-ui.tsx`; `LessonPlayer.tsx` e `CheckpointPlayer.tsx` reutilizam a mesma prática com feedback imediato, foco no botão de continuar e alvos ≥44 px. A rota `/hangul/[lessonId]` resolve lições e checkpoints; IDs desconhecidos dão 404. Introdução, prática e conclusão mostram erros por categoria.
- `/hangul` lista o curso completo, com lições disponíveis, bloqueadas (pré-requisito pendente) e checkpoints no ponto do currículo, sem “em breve” nem links quebrados. `c1` só abre com `h01`–`h10` concluídas; `c2` com `h01`–`h15` e `c1`; `c3` com `h16`–`h20` e `c1`–`c2`; `c4` com as 25 lições e `c1`–`c3`. Todos guardam o maior score.
- A conclusão do módulo é derivada, não persistida: `src/lib/progress/completion.ts` expõe `buildCourseCompletionReport(progress, { now, lessons, checkpoints, finalCheckpoint?, finalResult? })`, que reutiliza `buildDashboardSummary`, lista lições/checkpoints realmente concluídos com score, o que falta e as estatísticas reais. `CourseCompletionPanel` renderiza o mesmo relatório em `/hangul`, no `/dashboard` (`compact`, sem duplicar estatísticas) e na conclusão do `c4`, com aviso explícito de que não é certificação, não avalia pronúncia/fala e não libera CEFR A1. O diagnóstico final do `c4` reutiliza `DiagnosticsList` com links para as lições relacionadas e para `/revisao`.
- Lições e checkpoints concluídos abrem em estado de revisita (“Lição concluída”/“Checkpoint concluído”) com o maior score, próximo passo e “Refazer…”, sem reiniciar a prática automaticamente. Checkpoints bloqueados mostram separadamente checkpoints anteriores e lições do escopo. Depois de recarregar, a conclusão do `c4` exibe apenas o maior score persistido e informa que o diagnóstico por item não é guardado pelo `Progress` v1.
- Progresso reutiliza `Progress` v1: cada primeira resposta acrescenta um `Attempt`; ao concluir lição ou checkpoint, `lessons[id]` recebe o maior `score` e `done` quando atinge a nota mínima. Checkpoint não desfaz conclusão anterior nem corrompe histórico em retentativas. Não há tabela, migração ou campo novo.
- Áudio usa `speechSynthesis` com `lang="ko-KR"` e fallback textual descritivo; não há arquivos de áudio nem avaliação de pronúncia. Em navegador sem voz coreana, a dica de som sustenta o exercício.
- Vogais compostas: `ㅑ/ㅕ/ㅛ/ㅠ` usam glide palatal; `ㅐ/ㅔ` e `ㅒ/ㅖ` são ensinadas como grafias distintas com fala moderna em fusão; `ㅚ/ㅙ/ㅞ` convergem para [we] em Seul; `ㅟ` aceita [wi]~[y]; `ㅢ` aceita [ɰi]/[i] e [e] na partícula possessiva. Os exercícios avaliam leitura e ortografia, não um contraste oral obrigatório, e carregam tags `pronunciation:*`.
- `src/lib/hangul/pronunciation.ts` implementa as três regras como funções puras: `applyLiaison` cobre finais simples e os 11 duplos, a queda do ㅎ final e não move ㅇ final; `applyNasalization` cobre as famílias ㄱ/ㄷ/ㅂ antes de ㄴ/ㅁ, não antes de vogal nem ㄹ → ㄴ; `applyAspiration` cobre ㄱ/ㄷ/ㅂ/ㅈ + ㅎ nas duas ordens. Casos fora do escopo retornam `null`; a grafia escrita nunca é alterada. Tensificação, lateralização e ㅎ enfraquecido após ㄴ/ㅁ/ㅇ ficam de fora. As transcrições são didáticas, não IPA, e não avaliam fala.

## Revisão
`/revisao` é funcional desde a Fase 4A e não altera `Progress` v1, auth, migração, tabela ou RLS.

- `src/lib/review/index.ts` é a camada pura: `buildReviewQueue`/`buildReviewQueueFromEntries` leem somente `Progress.cards`, aceitam o limite inclusivo `due <= now` do Leitner, deduplicam chaves, ignoram chaves desconhecidas e ordenam por vencimento ascendente, desempatando por `cardId`. A sessão é limitada a 20 cartões (`MAX_REVIEW_SESSION`); os demais ficam pendentes. Nenhum cartão novo é criado quando não há dados.
- `buildReviewExercise` converte a chave estável existente em um exercício determinístico usando os registros de conteúdo: jamo → nome (`mcq`), sílaba → montagem (`build-syllable`), palavra → significado (`reading` com `mcq`) e regra → pronúncia didática (`reading` com `mcq`). A resposta correta não é marcada nem revelada antes do envio; o áudio do navegador é apoio e não avalia pronúncia.
- `applyReview(progress, item, grade, now)` chama `leitner.review` no mesmo `cardId` (acerto avança, erro volta à caixa 1), acrescenta `Attempt` com prefixo `review:` e atualiza `lastActive`. Chave ausente é no-op; chaves e lições existentes não são recriadas nem apagadas.
- `src/components/review/ReviewArea.tsx` reutiliza `ExerciseView`, `checkAnswer` e os componentes de UI. Cada envio persiste imediatamente pelo `ProgressStore` local-first, então recarregar a página não desfaz uma revisão concluída. Clique duplo é bloqueado por refs; a sessão não pode enviar o mesmo cartão duas vezes. Falha de gravação/sincronização mostra aviso local e nunca é apresentada como sincronizada.
- Contagens de “vencido” usam o início do dia local; o restante da agenda permanece ISO UTC, como no Leitner. O store sincronizado grava o snapshot inteiro: o merge entre dispositivos acontece na carga/login, não durante a sessão, então edições simultâneas em dois dispositivos continuam sujeitas à última gravação remota.

## Painel
`/dashboard` é funcional desde a Fase 4B, lê apenas `Progress` v1 e não altera auth, migração, tabela, RLS ou formato persistido.

- `src/lib/progress/dashboard.ts` é a camada pura: `buildDashboardSummary(progress, { now, lessons, checkpoints })` devolve curso, tentativas, atividade, revisão, recentes e `generatedAt`. Não muta o progresso, não cria cartões e rejeita relógio inválido.
- Curso: `buildCourseSteps` define a ordem intercalada de lições/checkpoints; `isCourseStepDone`/`isCourseStepUnlocked` usam `Progress.lessons`; `nextRecommendedCourseStep` devolve o primeiro passo incompleto com pré-requisitos satisfeitos. Conteúdo bloqueado nunca é recomendado. A porcentagem é `(lições concluídas + checkpoints concluídos) / (25 + 4)`, arredondada; o estado “concluído” exige todos os 29 passos e não implica CEFR A1.
- Estatísticas: cada `Attempt` válido (`exerciseId` string, `correct` booleano, `at` parseável) entra no total; IDs de exercícios de lições/checkpoints são classificados por conteúdo, `review:<cardId>` vira revisão e o restante “atividade anterior”. `exerciseAttempts`/`exerciseCorrect` excluem revisões; `uniqueExercises` conta IDs distintos e `uniqueReviewCards` conta cartões distintos. Precisão é `null` sem denominador (a UI mostra “—”). Tentativas inválidas são ignoradas, não inventadas.
- Atividade: dias e sequências usam a chave de dia local (`localDayKey`) derivada de cada `at`, coerente com a virada de dia da revisão. `Progress.streak` não é usado porque o código de lições/revisão não o mantém. `lastActivityAt` e “atividade recente” (8 itens) vêm da ordenação por timestamp, com desempate pela ordem do histórico.
- Revisão: a fila reutiliza `buildReviewQueue` e o limite de 20 cartões (`MAX_REVIEW_SESSION`). As caixas Leitner contam somente chaves reconhecidas com estado válido (`box` 1–5, `due` parseável); chaves antigas/desconhecidas são contadas em `unknownCards` e não entram na fila nem na sessão. `nextDue` continua vindo da agenda futura.
- `src/components/dashboard/DashboardArea.tsx` carrega pelo `ProgressStore`, trata carregando/erro/vazio, usa `ProgressBar` (`role="progressbar"`), listas semânticas e alvos ≥44 px. O banner de sincronização mostra “Salvo neste dispositivo… pendente” apenas com status `offline` e “Sincronizando…” durante o envio; nenhum dado não sincronizado é apresentado como salvo na conta.

## Risco de sincronização (documentado, não resolvido)
O store remoto grava o documento `Progress` inteiro (snapshot JSONB). O merge entre local e remoto ocorre na carga/login; durante a sessão, cada gravação é um *upsert* de última escrita. Se dois dispositivos alterarem o mesmo usuário sem recarregar, um pode sobrescrever a agenda de cartões e o histórico do outro (last-write-wins), mesmo que a UI local tenha mostrado “salvo neste dispositivo”.

Soluções possíveis para uma fase futura, sem antecipar redesenho nem mudar schema agora:
1. **Concorrência otimista:** coluna de revisão/`updated_at` e `UPDATE ... WHERE revision = <lida>`, com conflito devolvido ao cliente para merge e nova tentativa.
2. **Merge no momento da gravação:** buscar o snapshot remoto, aplicar `mergeProgress` e gravar; reduz a janela, mas ainda exige controle de concorrência para não perder atualizações entre leitura e escrita.
3. **Histórico append-only:** tentativas como eventos imutáveis e estado derivado (lições/cartões) recalculado no servidor; o merge de eventos evita perda de histórico e preserva a agenda por cartão.
4. **Merge por entidade/cartão:** atualização por `cardId`/`lessonId` com versão por item, em vez de substituir o documento inteiro.
5. **Função transacional no banco** (RPC) que mescle no servidor com lock/versão e devolva o snapshot resultante.

Até lá, a mitigação é local-first, merge na carga/login, aviso explícito de sincronização pendente e recomendação de não usar duas sessões simultâneas no mesmo usuário. O painel não promete sincronização que não ocorreu.

## Voz
O player usa `window.speechSynthesis` com `lang="ko-KR"`, rate 0.85, sob demanda (sem autoplay). Como a disponibilidade de voz coreana varia por sistema, todo item de escuta exibe uma dica textual (`fallback`) que descreve o som sem entregar a resposta escrita. Não há arquivos de áudio, avaliação de pronúncia nem módulo próprio de voz nesta fase.

## UI/UX
- Mobile-first: nav inferior fixa, alvos ≥48px, safe-area (`env(safe-area-inset-*)`), `100dvh`.
- Tipografia: Noto Sans KR para Hangul (tamanhos grandes), sistema para pt-BR.
- Dark mode: `prefers-color-scheme` + toggle; tokens CSS via Tailwind; contraste AA.
- Feedback: cor + ícone + texto (não só cor); `aria-live` para resultado; `prefers-reduced-motion` respeitado.
- `lang="pt-BR"` no html, `lang="ko"` nos spans coreanos.
- Landing pública original: tipografia grande, cartão ilustrativo de estudo, seções de recursos/método, CTA Google e links de privacidade/Impressum. Usuários autenticados são levados ao painel pelo proxy; a landing não é destino final do login.

## Privacidade
- Inventário real de cookies, `localStorage`, analytics e terceiros: `docs/privacy-audit.md`.
- Apenas cookies necessários (sessão Supabase) e storage funcional; sem analytics, ads, iframes ou rastreamento. Não há banner de consentimento. Qualquer recurso não essencial futuro exige consentimento prévio (ver auditoria).
- Política pública em `/privacidade`; aviso legal/Impressum em `/impressum` com pendências explícitas, sem inventar identidade, endereço ou prazos.

## Testes
- Vitest (18 arquivos, 252 testes): composição/decomposição Hangul (simples e os 27 finais com batchim), NFC, jamo inválido, validação de exercícios (`check` e `checkAnswer`), validação do currículo `h01`–`h25` + `c1`–`c4`, cobertura das 21 vogais e dos 27 finais na ordem de introdução, metadados de pronúncia, transformações puras e limites de ligação/nasalização/aspiração, consistência entre exemplos de regra e funções, critérios adicionais de conclusão, score/desbloqueio de lição e checkpoint, limites autoritativos (`16/20`, `19/24`, `24/30`, `10/12`, `11/14`, `12/14`, `13/15`), exceção de `밟다`, diagnóstico por categoria (incluindo regras e leitura em contexto), chaves/criação/deduplicação de cartões SRS (incluindo `h:rule:*`), conclusão do módulo, scheduler, store (migração/corrupção) e persistência após recarga. A cobertura da revisão inclui fila vazia, vencidos e limite inclusivo, ordem/deduplicação, exercícios das quatro categorias, avanço/rebaixamento Leitner, histórico e lições preservados, no-op para chave ausente, persistência local e falha remota. A cobertura do painel inclui ordem/recomendação do curso, checkpoints, zero/parcial/conclusão, tentativas e precisão, sequência por dia local, limites de data, persistência, dados legados, caixas Leitner e fila vazia/limite. A conclusão cobre relatório completo/incompleto, falta de lição ou checkpoint, snapshot inválido sem conclusão falsa, diagnóstico final com lições relacionadas, retentativa reprovada que não rebaixa a conclusão, maior score, pré-requisitos de checkpoint, fim da navegação e recarga.
- Auth/sync: redirecionamento fechado, config pública, stores local/remoto, merge/migração/offline, classificação de rotas, estados de acesso, conteúdo da política/auditoria e inspeção estrutural da migration.
- Playwright (Chromium, 375/390/768/1280; 152 testes): landing pública, links legais, bloqueio de rotas privadas sem sessão (incluindo `/dashboard`, `/revisao`, `/hangul/h01`, `/hangul/h11`, `/hangul/h21`, `/hangul/h25`, `/hangul/c1`, `/hangul/c2`, `/hangul/c3` e `/hangul/c4`), retorno seguro via `next`, sessão inválida, callback sem código indo para `/auth/error`, ausência de vazamento no HTML, navegação mobile/desktop e tema.
- O fluxo autenticado de Hangul é testado contra um Supabase mock local (`e2e/mock-supabase.mjs`, porta 54321) com cookie de sessão de teste: lição completa por teclado, feedback de erro, persistência após reload, liberação da próxima lição, `h11` desbloqueada após `c1`, `h16` após `c2`, `h21` após `c3` e jogada por teclado, checkpoints bloqueados (por lições e por checkpoint anterior) e `c1`/`c2`/`c3`/`c4` completos com 20/24/24/30 itens e score 100, incluindo reload, painel de conclusão com estatísticas reais, feedback do `c4` com um erro, ausência de promessa de A1/certificado e ausência de overflow. O mesmo mock cobre `/revisao`: estado vazio sem cartões inventados, ordem da fila, sessão por teclado/toque, avanço/rebaixamento persistido após reload, clique duplo, feedback de erro, preservação de lições e falha de sincronização determinística por HTTP 500 (sem `networkidle`). Cobre também `/dashboard`: estado inicial sem dados inventados, progresso parcial com próximo checkpoint, estatísticas/atividade/Leitner, conclusão sem prometer A1, reload, teclado, alvos ≥44 px, ausência de overflow, aviso de sincronização pendente e painel protegido. O mock não substitui um teste de integração com o Supabase real; login Google real e sync remoto continuam manuais.
- iPhone real/Chrome iOS não é testável aqui.

## Decisões/limites
- PWA limitada à instalação standalone; sem service worker ou cache offline.
- Google OAuth é delegado ao Supabase; só URL e chave publicável chegam ao app. Client secret do Google fica no painel Supabase e service-role key não é usada pelo KBR.
- Progresso remoto é um snapshot atômico porque o modelo local já é versionado. `cards` contém vocabulário e agenda de revisão; `lessons`, `history`, `streak` e `dailyGoal` permanecem no mesmo documento.
- A conclusão do módulo não é um campo persistido: é recalculada de `Progress.lessons`. O `Progress` v1 guarda apenas o maior score do `c4`, então acertos por item e diagnóstico detalhado existem só na sessão de conclusão; após recarregar, a UI mostra o score e explica a limitação em vez de reconstruir dados que não foram salvos.
- Cada usuário tem cache local isolado (`kbr:user:<uuid>:v1`). Gravações são local-first; merge usa campos monotônicos para lições/histórico/streak e o snapshot mais recente para agenda; o status exibido reflete a última operação remota (incluindo falhas após a sincronização inicial). Migração do convidado só recebe marcador após confirmação remota e nunca apaga a origem local. O risco de sobrescrita concorrente e as soluções possíveis estão em §Risco de sincronização; não há mudança de schema nesta fase.
- O Proxy do Next 16 deve ficar em `src/proxy.ts` quando o App Router está em `src/app`; um `proxy.ts` na raiz era ignorado silenciosamente. Corrigido na Fase 2B.
- Setup operacional e configuração manual do Google/Supabase: `docs/supabase-setup.md`.
- Dados só locais: limpar o navegador apaga progresso (avisar na UI e oferecer exportar/importar JSON como possível item do roadmap).
