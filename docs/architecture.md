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
    exercises/              # MultipleChoice, Cloze, SyllableBuilder, Listen, Match
    auth/                   # AuthProvider, AuthControl, ProtectedArea, AccountCard
    site/                   # header/footer públicos e CTA de login
  content/                  # DADOS originais (TS tipado, sem lógica)
    hangul.ts  lessons/*.ts  vocab.ts
  lib/
    auth/                   # redirect seguro, estados de acesso
    supabase/               # clientes browser/server, sessão no proxy
    srs/                    # interface Scheduler + leitner.ts (trocável por fsrs.ts)
    storage/                # interface ProgressStore + localStorageStore.ts (versionado)
    speech/                 # detecção, escolha de voz ko, fallback
    exercises/              # geração e validação de respostas (funções puras)
    hangul/                 # composição de sílabas (Unicode), puro
  types/
tests/  (vitest)   e2e/ (playwright)
docs/
supabase/                    # migrations e testes pgTAP de RLS
```

## Modelo de dados (TS)
- `Card { id, ko, pt, romanization?, audioText, tags, sentenceId? }`
- `Lesson { id, title, objectives, dialogue: Line[], vocab: Card[], grammar: Note[], exercises: ExerciseSpec[] }`
- `ExerciseSpec` = união discriminada (`mcq | cloze | build-syllable | listen | translate`); validação por função pura `check(spec, answer) → {correct, expected, explanation}`.
- `Progress { v: 1, lessons: Record<id,{done,score}>, cards: Record<id, SrsState>, history: Attempt[], streak, dailyGoal, lastActive }`

## Interfaces de troca futura
- `ProgressStore { async load(); async save(p); }` → implementações para `localStorage` e Supabase sem acoplar telas. PostgreSQL mantém um snapshot JSONB v1 por `auth.users.id`; a PK elimina linhas duplicadas e RLS restringe todas as operações ao dono.
- `Scheduler { review(state, grade, now) → state; due(states, now) }` → hoje Leitner (caixas 1,2,4,8,16 dias; erro volta à caixa 1); `SrsState` é opaco (`{due, ...}`) para acomodar FSRS (stability/difficulty) via `ts-fsrs`. `now` injetado → testável.
- Conteúdo isolado em `content/` → pode virar JSON/CMS/API depois.

## Rotas e autenticação
- Públicas: `/` (landing), `/privacidade`, `/impressum`, `/auth/error` e `/auth/callback`. O callback e a página de erro continuam acessíveis sem sessão.
- Privadas: `/dashboard`, `/hangul`, `/licoes`, `/vocabulario`, `/revisao` (e subrotas). A lista canônica está em `lib/routes.ts` (`PROTECTED_PATHS` / `isProtectedPath`).
- `src/proxy.ts` valida a sessão com `supabase.auth.getClaims()` antes de renderizar. Sem sessão, redireciona para `/?next=<caminho interno validado>`; se havia cookie de sessão inválido, acrescenta `motivo=sessao-expirada`. Sem configuração do Supabase, rotas privadas vão para `/?motivo=indisponivel`.
- O layout de `(app)` repete a verificação no servidor como defesa em profundidade. `ProtectedArea` (client) nunca renderiza conteúdo para `guest` e, se a sessão expirar após o carregamento, redireciona com `motivo=sessao-expirada`. Não há laço: a landing é pública e não redireciona por conta própria.
- `safeNextPath` aceita apenas caminhos internos, rejeita `//`, barra invertida, controles e separadores percent-encoded. É aplicado na landing, no `redirectTo` do OAuth e na callback.
- `AuthProvider` mantém a sessão e o `ProgressStore` do convidado; a proteção de rotas não removeu o modo convidado nem a migração de progresso. O dashboard e os controles de conta leem o usuário apenas no cliente.

## Hangul
Composição por Unicode: `0xAC00 + (L*21 + V)*28 + T` — sem tabela de sílabas; testes unitários. Cards de letras: nome, som aproximado em pt-BR, grupo, exemplo.

## Voz
`speech/`: `isSupported()`, `getKoVoice()` (aguarda `voiceschanged`, timeout ~1s), `speak(text)` com `lang='ko-KR'`, rate ~0.8. Se sem voz: UI mostra aviso claro e esconde "ouvir" nos exercícios de escuta (substituídos por leitura). Sem avaliação de pronúncia.

## UI/UX
- Mobile-first: nav inferior fixa, alvos ≥48px, safe-area (`env(safe-area-inset-*)`), `100dvh`.
- Tipografia: Noto Sans KR para Hangul (tamanhos grandes), sistema para pt-BR.
- Dark mode: `prefers-color-scheme` + toggle; tokens CSS via Tailwind; contraste AA.
- Feedback: cor + ícone + texto (não só cor); `aria-live` para resultado; `prefers-reduced-motion` respeitado.
- `lang="pt-BR"` no html, `lang="ko"` nos spans coreanos.
- Landing pública original: tipografia grande, cartão ilustrativo de estudo, seções de recursos/método, CTA Google e links de privacidade/Impressum. Usuários autenticados veem "Continuar no painel".

## Privacidade
- Inventário real de cookies, `localStorage`, analytics e terceiros: `docs/privacy-audit.md`.
- Apenas cookies necessários (sessão Supabase) e storage funcional; sem analytics, ads, iframes ou rastreamento. Não há banner de consentimento. Qualquer recurso não essencial futuro exige consentimento prévio (ver auditoria).
- Política pública em `/privacidade`; aviso legal/Impressum em `/impressum` com pendências explícitas, sem inventar identidade, endereço ou prazos.

## Testes
- Vitest: composição Hangul, validação de exercícios, scheduler, store (migração/corrupção).
- Auth/sync: redirecionamento fechado, config pública, stores local/remoto, merge/migração/offline, classificação de rotas, estados de acesso, conteúdo da política/auditoria e inspeção estrutural da migration.
- Playwright: landing pública, links legais, bloqueio de rotas privadas sem sessão, retorno seguro via `next`, sessão inválida, ausência de vazamento no HTML, navegação mobile/desktop em 375, 390, 768 e 1280px. Projetos Chromium e WebKit; iPhone real/Chrome iOS não testável aqui.

## Decisões/limites
- PWA limitada à instalação standalone; sem service worker ou cache offline.
- Google OAuth é delegado ao Supabase; só URL e chave publicável chegam ao app. Client secret do Google fica no painel Supabase e service-role key não é usada pelo KBR.
- Progresso remoto é um snapshot atômico porque o modelo local já é versionado. `cards` contém vocabulário e agenda de revisão; `lessons`, `history`, `streak` e `dailyGoal` permanecem no mesmo documento.
- Cada usuário tem cache local isolado (`kbr:user:<uuid>:v1`). Gravações são local-first; merge usa campos monotônicos para lições/histórico/streak e o snapshot mais recente para agenda; o status exibido reflete a última operação remota (incluindo falhas após a sincronização inicial). Migração do convidado só recebe marcador após confirmação remota e nunca apaga a origem local.
- O Proxy do Next 16 deve ficar em `src/proxy.ts` quando o App Router está em `src/app`; um `proxy.ts` na raiz era ignorado silenciosamente. Corrigido na Fase 2B.
- Setup operacional e configuração manual do Google/Supabase: `docs/supabase-setup.md`.
- Dados só locais: limpar o navegador apaga progresso (avisar na UI e oferecer exportar/importar JSON como possível item do roadmap).
