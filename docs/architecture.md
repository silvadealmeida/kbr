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
    auth/                   # AuthProvider, AuthControl, ProtectedArea, AccountCard
    site/                   # header/footer públicos e CTA de login
  content/                  # DADOS originais (TS tipado, sem lógica)
    hangul/                 # types, jamo, sílabas, palavras, lições h01–h03, outline, validate
  lib/
    auth/                   # redirect seguro, estados de acesso
    supabase/               # clientes browser/server, sessão no proxy
    srs/                    # interface Scheduler + leitner.ts (trocável por fsrs.ts)
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
- `Progress { v: 1, lessons: Record<id,{done,score}>, cards: Record<id, SrsState>, history: Attempt[], streak, dailyGoal, lastActive }`. `lib/progress/lesson` calcula score/desbloqueio, avalia lições e checkpoints e grava tentativas sem alterar esse formato; checkpoints usam a mesma entrada `lessons[id]`.

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
- `src/lib/progress/lesson.ts` avalia lições e checkpoints. A aprovação prioriza `minCorrect` e, quando ausente, usa o número mínimo de acertos (`Math.round(total × nota / 100)`), evitando que 19/24 (79% arredondado) reprove um critério documentado como 80%. `isCheckpointUnlocked` exige todas as lições do escopo; `isLessonUnlocked` aceita um checkpoint como pré-requisito (`h11` depende de `c1`, `h16` de `c2`, `h21` de `c3`). `nextCourseStepAfter` percorre `h10` → `c1` → `h11` … `c2` → `h16` … `c3` → `h21` … `h25` → `c4`. `isCourseComplete` só retorna `true` com todas as 25 lições e os quatro checkpoints concluídos; não desbloqueia CEFR A1.
- O player compartilhado fica em `components/hangul/exercise-ui.tsx`; `LessonPlayer.tsx` e `CheckpointPlayer.tsx` reutilizam a mesma prática com feedback imediato, foco no botão de continuar e alvos ≥44 px. A rota `/hangul/[lessonId]` resolve lições e checkpoints; IDs desconhecidos dão 404. Introdução, prática e conclusão mostram erros por categoria.
- `/hangul` lista o curso completo, com lições disponíveis, bloqueadas (pré-requisito pendente) e checkpoints no ponto do currículo, sem “em breve” nem links quebrados. `c1` só abre com `h01`–`h10` concluídas; `c2` com `h01`–`h15`; `c3` com `h16`–`h20`; `c4` com as 25 lições. Todos guardam o maior score. A conclusão de `c4` mostra “Checkpoint final concluído” ou, com tudo concluído, “Módulo Hangul concluído”, sempre sem certificado e sem A1 automático.
- Progresso reutiliza `Progress` v1: cada primeira resposta acrescenta um `Attempt`; ao concluir lição ou checkpoint, `lessons[id]` recebe o maior `score` e `done` quando atinge a nota mínima. Checkpoint não desfaz conclusão anterior nem corrompe histórico em retentativas. Não há tabela, migração ou campo novo.
- Áudio usa `speechSynthesis` com `lang="ko-KR"` e fallback textual descritivo; não há arquivos de áudio nem avaliação de pronúncia. Em navegador sem voz coreana, a dica de som sustenta o exercício.
- Vogais compostas: `ㅑ/ㅕ/ㅛ/ㅠ` usam glide palatal; `ㅐ/ㅔ` e `ㅒ/ㅖ` são ensinadas como grafias distintas com fala moderna em fusão; `ㅚ/ㅙ/ㅞ` convergem para [we] em Seul; `ㅟ` aceita [wi]~[y]; `ㅢ` aceita [ɰi]/[i] e [e] na partícula possessiva. Os exercícios avaliam leitura e ortografia, não um contraste oral obrigatório, e carregam tags `pronunciation:*`.
- `src/lib/hangul/pronunciation.ts` implementa as três regras como funções puras: `applyLiaison` cobre finais simples e os 11 duplos, a queda do ㅎ final e não move ㅇ final; `applyNasalization` cobre as famílias ㄱ/ㄷ/ㅂ antes de ㄴ/ㅁ, não antes de vogal nem ㄹ → ㄴ; `applyAspiration` cobre ㄱ/ㄷ/ㅂ/ㅈ + ㅎ nas duas ordens. Casos fora do escopo retornam `null`; a grafia escrita nunca é alterada. Tensificação, lateralização e ㅎ enfraquecido após ㄴ/ㅁ/ㅇ ficam de fora. As transcrições são didáticas, não IPA, e não avaliam fala.

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
- Vitest (15 arquivos, 205 testes): composição/decomposição Hangul (simples e os 27 finais com batchim), NFC, jamo inválido, validação de exercícios (`check` e `checkAnswer`), validação do currículo `h01`–`h25` + `c1`–`c4`, cobertura das 21 vogais e dos 27 finais na ordem de introdução, metadados de pronúncia, transformações puras e limites de ligação/nasalização/aspiração, consistência entre exemplos de regra e funções, critérios adicionais de conclusão, score/desbloqueio de lição e checkpoint, limites autoritativos (`16/20`, `19/24`, `24/30`, `10/12`, `11/14`, `12/14`, `13/15`), exceção de `밟다`, diagnóstico por categoria (incluindo regras e leitura em contexto), chaves/criação/deduplicação de cartões SRS (incluindo `h:rule:*`), conclusão do módulo, scheduler, store (migração/corrupção) e persistência após recarga.
- Auth/sync: redirecionamento fechado, config pública, stores local/remoto, merge/migração/offline, classificação de rotas, estados de acesso, conteúdo da política/auditoria e inspeção estrutural da migration.
- Playwright (Chromium, 375/390/768/1280; 100 testes): landing pública, links legais, bloqueio de rotas privadas sem sessão (incluindo `/hangul/h01`, `/hangul/h11`, `/hangul/h21`, `/hangul/h25`, `/hangul/c1`, `/hangul/c2`, `/hangul/c3` e `/hangul/c4`), retorno seguro via `next`, sessão inválida, callback sem código indo para `/auth/error`, ausência de vazamento no HTML, navegação mobile/desktop e tema.
- O fluxo autenticado de Hangul é testado contra um Supabase mock local (`e2e/mock-supabase.mjs`, porta 54321) com cookie de sessão de teste: lição completa por teclado, feedback de erro, persistência após reload, liberação da próxima lição, `h11` desbloqueada após `c1`, `h16` após `c2`, `h21` após `c3` e jogada por teclado, checkpoints bloqueados e `c1`/`c2`/`c3`/`c4` completos com 20/24/24/30 itens e score 100, incluindo reload, banner de módulo concluído e ausência de overflow. O mock não substitui um teste de integração com o Supabase real; login Google real e sync remoto continuam manuais.
- iPhone real/Chrome iOS não é testável aqui.

## Decisões/limites
- PWA limitada à instalação standalone; sem service worker ou cache offline.
- Google OAuth é delegado ao Supabase; só URL e chave publicável chegam ao app. Client secret do Google fica no painel Supabase e service-role key não é usada pelo KBR.
- Progresso remoto é um snapshot atômico porque o modelo local já é versionado. `cards` contém vocabulário e agenda de revisão; `lessons`, `history`, `streak` e `dailyGoal` permanecem no mesmo documento.
- Cada usuário tem cache local isolado (`kbr:user:<uuid>:v1`). Gravações são local-first; merge usa campos monotônicos para lições/histórico/streak e o snapshot mais recente para agenda; o status exibido reflete a última operação remota (incluindo falhas após a sincronização inicial). Migração do convidado só recebe marcador após confirmação remota e nunca apaga a origem local.
- O Proxy do Next 16 deve ficar em `src/proxy.ts` quando o App Router está em `src/app`; um `proxy.ts` na raiz era ignorado silenciosamente. Corrigido na Fase 2B.
- Setup operacional e configuração manual do Google/Supabase: `docs/supabase-setup.md`.
- Dados só locais: limpar o navegador apaga progresso (avisar na UI e oferecer exportar/importar JSON como possível item do roadmap).
