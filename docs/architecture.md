# KBR — Arquitetura

## Stack
Next.js (App Router) + React + TypeScript + Tailwind; Vitest (unit); Playwright (e2e/responsivo); Supabase Auth/PostgreSQL. Google OAuth usa PKCE e sessão em cookies via `@supabase/ssr`, renovada pelo Proxy do Next.js 16. PWA mínima instalável (manifesto, ícones e modo standalone), sem service worker ou cache offline. Deploy: Node/Next (a renovação segura de sessão impede export puramente estático); páginas interativas leem storage após montagem para evitar mismatch de hidratação.

## Estrutura
```
src/
  app/                      # rotas (App Router)
    page.tsx                # Dashboard
    hangul/                 # lista + [grupo]
    vocabulario/
    licoes/ + [id]/
    revisao/
    layout.tsx              # shell: nav inferior (mobile) / lateral (≥md), tema
  components/
    ui/                     # Button, Card, ProgressBar, Feedback
    exercises/              # MultipleChoice, Cloze, SyllableBuilder, Listen, Match
    SpeakButton.tsx
  content/                  # DADOS originais (TS tipado, sem lógica)
    hangul.ts  lessons/*.ts  vocab.ts
  lib/
    supabase/               # clientes browser/server, sessão no proxy
    auth/                   # regras puras do fluxo OAuth
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

## Testes
- Vitest: composição Hangul, validação de exercícios, scheduler, store (migração/corrupção).
- Auth/sync: redirecionamento fechado, config pública, stores local/remoto, merge/migração/offline e inspeção estrutural da migration no Vitest; isolamento RLS em pgTAP (`supabase test db`).
- Playwright: fluxo completo (lição → exercício → revisão → persistência após reload) em 375, 390, 768, 1280px; projetos Chromium e WebKit. iPhone real/Chrome iOS: **não testável aqui**; documentar como verificação manual.

## Decisões/limites
- PWA limitada à instalação standalone; sem service worker ou cache offline.
- Google OAuth é delegado ao Supabase; só URL e chave publicável chegam ao app. Client secret do Google fica no painel Supabase e service-role key não é usada pelo KBR.
- Progresso remoto é um snapshot atômico porque o modelo local já é versionado. `cards` contém vocabulário e agenda de revisão; `lessons`, `history`, `streak` e `dailyGoal` permanecem no mesmo documento.
- Cada usuário tem cache local isolado (`kbr:user:<uuid>:v1`). Gravações são local-first; merge usa campos monotônicos para lições/histórico/streak e o snapshot mais recente para agenda; o status exibido reflete a última operação remota (incluindo falhas após a sincronização inicial). Migração do convidado só recebe marcador após confirmação remota e nunca apaga a origem local.
- Setup operacional e configuração manual do Google/Supabase: `docs/supabase-setup.md`.
- Dados só locais: limpar o navegador apaga progresso (avisar na UI e oferecer exportar/importar JSON como possível item do roadmap).
