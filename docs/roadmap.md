# KBR — Roadmap

## Estado atual (atualize a cada commit — é o ponto de retomada entre agentes)
- **Fase concluída:** 2 (Núcleo puro).
- **Em andamento:** Conta e sincronização — OAuth, RLS e sync local-first implementados, incluindo merge idempotente, migração convidado e restauração automática; documentação/configuração manual e validação responsiva pendentes.
- **Próximo passo:** documentar setup Google/Supabase, validar estados de UI e executar gates finais.
- **Bloqueios / decisões pendentes:** nenhum.
- **Último agente:** Codex.

Fases pequenas, cada uma com commit(s) próprio e `npm test` verde antes de avançar.

| # | Fase | Entrega | Verificação |
|---|---|---|---|
| 0 | Pesquisa e arquitetura (**feita**) | docs/* | — |
| 1 | Scaffold (**feita**, só Chromium; WebKit/iPhone pendentes) | `git init`, Next+TS+Tailwind, Vitest, Playwright, fontes, shell com nav, tema claro/escuro | `npm run build`, smoke e2e |
| 2 | Núcleo puro (**feita**) | `lib/hangul`, `lib/exercises`, `lib/srs` (Leitner), `lib/storage` + testes | Vitest |
| 2A | Conta e sincronização (**em andamento**) | Google OAuth, sessão SSR, guest mode, PostgreSQL/RLS, migração e sync resiliente | Vitest + Supabase DB tests |
| 3 | Módulo Hangul | cards de letras, TTS com fallback, construtor de sílabas, quiz de reconhecimento | Vitest + e2e |
| 4 | Lições 1–3 | 3 lições originais (diálogo, vocabulário, nota de gramática, exercícios): ex. cumprimentos/apresentação (이에요/예요), objetos/lugares (은/는, 이/가), rotina/comida (을/를, -아요/어요) | e2e fluxo |
| 5 | Vocabulário | frases com lacuna, tradução, escuta | e2e |
| 6 | Revisão + Dashboard | cartões vencidos, histórico, estatísticas reais, streak, meta diária, "continuar" | Vitest + e2e |
| 7 | Polimento | acessibilidade, dark mode, reduced motion, estados vazios, export/import JSON (opcional) | axe/manual |
| 8 | Teste responsivo | 375/390/768/1280 em Chromium + WebKit; checklist manual iPhone/Chrome iOS | screenshots |
| 9 | README | instruções locais, limitações | — |

## Riscos
- **Qualidade do conteúdo coreano**: sem revisão nativa; marcar como "conteúdo em revisão" e pedir revisão humana.
- **TTS coreano ausente** em alguns dispositivos → fallback documentado.
- **iPhone real**: não testável neste ambiente.
- Perda de progresso (localStorage) → aviso/exportação.

## Pós-MVP (não implementar agora)
FSRS (`ts-fsrs`), sync em nuvem, auth, cache/offline via service worker, notificações, exercícios com IA, empacotamento nativo.

## Status Fase 1 (real)
Feito: Next 16 + React 19 + TS 5.9 + Tailwind 4; Vitest (1 teste); Playwright (Chromium, 375/390/768/1280; 28 testes); shell com nav inferior (mobile) e lateral (≥md); tema claro/escuro persistido; Noto Sans KR; safe-area; 5 rotas com estados vazios "Em desenvolvimento".
Pendente: projeto WebKit do Playwright (fase 8); verificação manual em iPhone/Chrome iOS; contraste AA verificado só por escolha de tokens, sem axe; `next/font` baixa a fonte no build (precisa de rede).

## Status PWA mínima (real)
Feito: manifesto web, ícones 192/512 (incluindo ícone `maskable`), ícone Apple 180, metadados de instalação e modo `standalone`, cores de tema claro/escuro e suporte a safe-area já existente.
Limites: sem service worker, cache ou funcionamento offline; instalação e apresentação em iPhone/Chrome iOS reais exigem verificação manual fora deste ambiente.
