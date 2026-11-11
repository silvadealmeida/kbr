# Plano de redesign por componente

> Fase 7A. Plano de implementação incremental, área por área, sem alterar comportamento. Cada fatia deve caber em um commit pequeno, com typecheck + testes + build verdes. Referências: `design-system-spec.md`, `motion-design-spec.md`, `hangul-interaction-concepts.md`.

## 0. Contratos que não podem mudar

| Contrato | Regra |
|---|---|
| Rotas | `/`, `/dashboard`, `/cursos`, `/hangul`, `/hangul/[lessonId]`, `/revisao`, `/vocabulario`, `/licoes` (legado), `/privacidade`, `/impressum`, `/auth/error` |
| Conteúdo | IDs `h01`–`h25`, `c1`–`c4`; enunciados, respostas e ordem |
| Progresso | `Progress` v1, chaves `h:*`, conclusão, checkpoints, tentativas |
| SRS | Leitner, fila determinística, atualização por acerto/erro |
| Sync | CAS, `sync_id`, merge por cartão, timeouts, estados pendente/sincronizado/offline |
| Auth | Google OAuth, sessão SSR, guest mode, logout explícito, redirect `next` |
| Privacidade | sem rastreadores, sem service worker, `no-store` nas rotas privadas |
| Acessibilidade | foco no resultado, Enter para conferir, alvos ≥44 px, reduced motion |
| Conteúdo coreano | `lang="ko"`, status `in-review`, sem invenção de pronúncia |

**Regra de ouro:** se uma mudança visual exigir tocar em `lib/`, `content/`, `supabase/` ou contratos de sync, ela está fora do redesign e precisa de fase própria.

## 1. Inventário de componentes

| Componente | Arquivo | Estado | Ação |
|---|---|---|---|
| Landing | `src/app/(site)/page.tsx` | funcional, visual antigo | redesenhar seções, manter auth/redirect |
| SiteHeader/Footer | `src/components/site/*` | simples | tipografia, espaçamento, foco |
| LandingAuth | `src/components/site/LandingAuth.tsx` | funcional | botão/estado, sem mudar OAuth |
| AuthControl/AccountCard | `src/components/auth/*` | funcional | estados e tipografia |
| CourseCatalog | `src/components/courses/CourseCatalog.tsx` | cards | prancha/card, CEFR disclaimer |
| HangulCourse | `src/components/hangul/HangulCourse.tsx` | lista de unidades | lâminas, status, progresso |
| LessonPlayer | `src/components/hangul/LessonPlayer.tsx` | fases/foco/guardas | layout, header, ações |
| CheckpointPlayer | `src/components/hangul/CheckpointPlayer.tsx` | reusa player | mesmo tratamento |
| ExerciseView / exercise-ui | `src/components/hangul/exercise-ui.tsx` | 541 linhas | dividir em primitivas + tipos |
| ReviewArea | `src/components/review/ReviewArea.tsx` | fila/estado | cartão, sync, vazio |
| DashboardArea | `src/components/dashboard/DashboardArea.tsx` | cards/stats | hierarquia, régua, estados |
| CourseCompletionPanel | `src/components/hangul/CourseCompletionPanel.tsx` | conclusão | percurso/selo |
| Nav | `src/components/Nav.tsx` | sidebar+bottom | tokens, indicador ativo |
| Button/Card/ProgressBar/EmptyState/PageHeader | `src/components/ui/*` | primitivas | atualizar tokens e variantes |

## 2. Área A — Landing pública

**Arquivo:** `src/app/(site)/page.tsx` (+ `SiteHeader`, `SiteFooter`, `LandingAuth`).

**Problemas atuais:** hero com cartão de preview e blocos arredondados; paleta verde genérica; tipografia sem caráter; muitas seções com o mesmo peso; o cartão ilustrativo compete com a mensagem.

**Redesign:**

1. Hero assimétrico (7/5): título display em duas linhas, subtítulo curto, CTA primário + “Conhecer o método”. À direita, **bloco de composição** com SVG de `한` (outline) e anotações mono (`ㅎ + ㅏ + ㄴ`, “som: han”).
2. Faixa de método em três lâminas numeradas (01 Reconhecer, 02 Usar, 03 Retomar) com hairlines.
3. Seção “o que você encontra” em grid 2×2, mas com **placas** (não cartões fofos), ícone jamo + título + uma frase.
4. Seção de privacidade curta, com link para a política.
5. CTA final com selo e frase coreana; manter `LandingAuth` e mensagens de `motivo`.
6. Rodapé com links legais e “conteúdo em revisão”.

**Regras:** sem preloader; sem scroll pinado; no máximo uma sequência de entrada; 0 fontes coreanas (SVG); imagens ≤120 KB; CTAs mantêm os mesmos fluxos e parâmetros `next`.

**Acessibilidade:** um `h1`; seções com `h2`; CTA com nome acessível; foco visível; contraste AA; links legais não somem no mobile.

**Aceite:** landing <450 KB, JS <260 KB, CLS <0,1, axe limpo, OAuth mockado funcionando, mensagens de erro/logout preservadas.

**Fase:** 7C. **Esforço:** M. **Risco:** médio (performance/SEO).

## 3. Área B — Autenticação e conta

**Arquivos:** `LandingAuth.tsx`, `AuthControl.tsx`, `AccountCard.tsx`, `src/app/(site)/auth/error/page.tsx`.

**Mudanças:** botão Google com marca existente, hierarquia tipográfica, estado “Entrando…” com spinner e `aria-busy`, erro inline com `role="alert"`, conta em formato de ficha (avatar/inicial, e-mail, “Sair”). Não mudar scopes, redirects, cookies ou mensagens de motivo.

**Estados:** guest, carregando sessão, autenticado, erro de login, logout em andamento, offline.

**Acessibilidade:** botão ≥48 px; foco no erro; “Sair” com confirmação? Manter comportamento atual (logout explícito) e evitar diálogo extra se hoje não existe.

**Aceite:** fluxo OAuth mockado e2e continua; nenhuma mudança em `AuthProvider`; contraste e foco ok.

**Fase:** 7C. **Esforço:** S. **Risco:** baixo.

## 4. Área C — Catálogo de cursos

**Arquivo:** `src/components/courses/CourseCatalog.tsx` (+ `/cursos`).

**Problemas:** cards genéricos; estados “em breve” pouco claros; CEFR disclaimer fácil de ignorar.

**Redesign:** catálogo como **índice de lâminas**: cada curso é uma linha/placa com código (`HANGUL`, `A1`…), status (disponível/em breve), progresso e CTA. Hangul em destaque; CEFR em uma nota de margem persistente, não escondida em tooltip.

**Estados:** carregando (skeleton estático), erro (card com retry), vazio (texto honesto), curso disponível/bloqueado/em breve.

**Acessibilidade:** lista semântica; status em texto; não usar apenas opacidade para “bloqueado”; CTA desabilitado com explicação.

**Aceite:** nenhum curso novo; links e permissões iguais; e2e de catálogo/`lang="ko"` preservado.

**Fase:** 7E. **Esforço:** S/M. **Risco:** baixo.

## 5. Área D — Visão geral do Hangul

**Arquivo:** `src/components/hangul/HangulCourse.tsx` (+ `/hangul`).

**Problemas:** lista longa de lições com bordas iguais; status e progresso competem; difícil ver “onde estou”.

**Redesign:** cabeçalho de curso com régua de 25 marcas + 4 checkpoints; unidades como **pranchas** com número, título, status e progresso; lição atual em destaque (borda 2 px + etiqueta “AGORA”); concluídas com selo discreto; bloqueadas com cadeado textual e motivo.

**Estados:** carregando, erro, sem progresso, em andamento, concluído.

**Acessibilidade:** `aria-current` na lição atual; status textual; lista ordenada; foco no link; alvos ≥48 px.

**Aceite:** mesmos links/ordem/status; e2e de navegação e `aria-current`; contraste.

**Fase:** 7E. **Esforço:** M. **Risco:** médio (muitos estados).

## 6. Área E — Lição e checkpoint (player)

**Arquivos:** `LessonPlayer.tsx`, `CheckpointPlayer.tsx`, `exercise-ui.tsx`, `DiagnosticsList.tsx`.

**Problemas:** `exercise-ui.tsx` concentra muitas responsabilidades; cartões e opções com aparência de formulário; feedback e progresso poderiam ter mais hierarquia; o enunciado coreano às vezes compete com o texto de apoio.

**Redesign:**

1. **Cabeçalho de lâmina:** `LÂMINA h05`, título, progresso “3 de 8”, botão sair (com confirmação se hoje existe).
2. **Enunciado:** bloco de composição quando houver sílaba; áudio com botão claro; instrução em 1–2 linhas.
3. **Área de resposta:** extrair primitivas `ChoiceList`, `TextAnswer`, `SyllableBuilder`, `AudioPrompt`, `ReadingPrompt` para `src/components/hangul/exercise/` (novos arquivos), mantendo `checkAnswer` e tipos.
4. **Feedback:** faixa/plate com ícone + título + explicação; foco no resultado; “Continuar” primário.
5. **Checkpoint:** mesma moldura, com diagnóstico por categoria em lista e selo final.

**Regras:** não mudar enunciados, opções, respostas, ordem, guards de envio, foco no resultado, `enterKeyHint`, input 16 px. Nenhuma animação bloqueia ação.

**Acessibilidade:** cada opção é botão/rádio com estado; resultado `role="status"`; progresso com `aria-valuetext`; teclado completo; coreano com `lang="ko"`.

**Aceite:** testes de lição/checkpoint, duplo envio, Enter, foco, reduced motion e WebKit passam; nenhum arquivo de conteúdo alterado.

**Fase:** 7D (primitivas + lição), 7E (checkpoint/diagnóstico). **Esforço:** L. **Risco:** alto (regressão funcional).

## 7. Área F — Ilustrações interativas de Hangul

**Arquivos novos:** `src/components/hangul/illustrations/` (`SyllableAnatomy.tsx`, `PronunciationLayers.tsx`, `SoundMap.tsx`, `StrokePlayer.tsx`).

**Mudanças:** implementar os conceitos P0/P1 de `hangul-interaction-concepts.md` dentro das lições existentes, sem novo conteúdo. Começar por `SyllableAnatomy` e `PronunciationLayers`, que usam dados já presentes.

**Regras:** SVG + HTML; sem canvas/WebGL; sem dependência; toda ilustração tem fallback textual; ordem de traço só após revisão.

**Aceite:** 375 px sem overflow; teclado; leitor de tela; reduced motion; conteúdo `in-review` visível.

**Fase:** 7D/7F. **Esforço:** M/L. **Risco:** médio (conteúdo pedagógico).

## 8. Área G — Revisão Leitner

**Arquivo:** `src/components/review/ReviewArea.tsx`.

**Problemas:** cartão com cara de formulário; estado de sincronização pode ser sutil demais; transição entre cartões inexistente.

**Redesign:** cartão-prancha com bloco, pergunta, “Mostrar resposta”, verso com som/significado/exemplo; botões “Ainda não” / “Lembrei” com hierarquia; contador e barra; faixa de sync com ícone + texto; vazio com CTA para lição; conclusão com resumo real.

**Regras:** mesma fila, mesmos critérios, mesmos estados `syncing/synced/offline`; não prometer sucesso antes da confirmação; não esconder resposta de leitor de tela.

**Acessibilidade:** virada com `aria-expanded`; foco na resposta; botões ≥48 px; cores + texto; reduced motion sem 3D.

**Aceite:** testes de SRS, sync, offline/reconexão; e2e de revisão; nenhuma mudança em `lib/srs`.

**Fase:** 7E. **Esforço:** M. **Risco:** médio.

## 9. Área H — Painel

**Arquivo:** `src/components/dashboard/DashboardArea.tsx`.

**Problemas:** muitos cards com o mesmo peso; estatísticas sem hierarquia; “próximo passo” diluído.

**Redesign:**
1. Faixa “Bom dia/Boa tarde” + frase de estado real (“Você concluiu 7 de 25 lâminas”).
2. **Próximo passo** como bloco dominante (placa grande, CTA).
3. Régua de progresso do curso.
4. Estatísticas em 3–4 colunas com números tabulares e rótulos mono.
5. Revisão: fila + CTA.
6. Atividade recente em lista compacta; estados vazios honestos.

**Regras:** não criar campos; não inventar streak se não houver dados; manter loading/erro; não duplicar consultas.

**Acessibilidade:** headings por seção; listas; contraste; alvos; números com contexto textual.

**Aceite:** dados reais, testes de dashboard, performance <1,2 MB, e2e de painel.

**Fase:** 7E. **Esforço:** M. **Risco:** médio.

## 10. Área I — Conclusão do curso

**Arquivo:** `src/components/hangul/CourseCompletionPanel.tsx`.

**Redesign:** percurso de 25 lâminas + 4 checkpoints; selo; resumo real (lições, checkpoints, tentativas, diagnóstico); ações “Rever percurso” e “Voltar ao painel”. Sem confete; sequência de selo única e opcional.

**Regras:** usar apenas dados existentes; não recalcular conclusão; manter revisita.

**Acessibilidade:** lista ordenada com status; selo `aria-hidden` + texto; foco no título; reduced motion estático.

**Aceite:** testes de conclusão/revisita; nenhum dado falso.

**Fase:** 7F. **Esforço:** S/M. **Risco:** baixo.

## 11. Área J — Navegação e responsividade

**Arquivos:** `Nav.tsx`, `(app)/layout.tsx`, `(site)/layout.tsx`, `globals.css`.

**Mudanças:** sidebar 240 px com marca, 5 links, indicador ativo; bottom nav 56 px + safe-area, 5 itens, rótulos 11 px; header mobile com tema/conta; skip link; foco no `main`.

**Regras:** não adicionar rotas; não esconder navegação no app; não usar hambúrguer; manter `aria-current`; alvos ≥44 px; não quebrar 320 px.

**Aceite:** matriz 320/375/390/768/1280; WebKit; teclado; contraste; sem overflow horizontal.

**Fase:** 7C. **Esforço:** S/M. **Risco:** baixo.

## 12. Mapeamento de classes (migração)

| Antes | Depois |
|---|---|
| `bg-bg` | `bg-bg` (token mantido) |
| `bg-soft` | `bg-surface-2` |
| `border-border` | `border-line` |
| `text-brand` | `text-accent` (links) ou `text-brand` (selo) |
| `rounded-3xl` | `rounded-xl` |
| `rounded-full` em botão | `rounded-[10px]` |
| `shadow-sm` | `shadow-print` (definido no tema) |
| `text-muted` | `text-muted` (mantido) |
| `font-ko` | `font-ko` (mantido) |

Durante a 7B, criar aliases para que a aparência antiga continue funcionando; a substituição é gradual.

## 13. Sequência de implementação

| Fatia | Conteúdo | Fase | Esforço |
|---|---|---|---|
| 1 | Tokens, tipografia, primitivas, aliases | 7B | M |
| 2 | Nav, shell, landing, auth | 7C | M |
| 3 | Lição: header, enunciado, respostas, feedback | 7D | L |
| 4 | Composição + camadas de pronúncia | 7D | M |
| 5 | Revisão, catálogo, Hangul overview, painel | 7E | L |
| 6 | Checkpoint, conclusão, anatomia, mapa | 7E/7F | M |
| 7 | Movimento, View Transitions, polimento | 7F | M |
| 8 | Limpeza de tokens, testes, docs | 7G | S/M |

## 14. Matriz de testes por área

| Área | Unit | e2e | axe | WebKit | reduced |
|---|---|---|---|---|---|
| Landing | — | OAuth mock, links | ✓ | ✓ | ✓ |
| Auth | auth | login/logout | ✓ | ✓ | — |
| Catálogo | catálogo | estados | ✓ | ✓ | — |
| Hangul overview | conteúdo | navegação | ✓ | ✓ | — |
| Lição | checkAnswer | fluxo, duplo envio, Enter | ✓ | ✓ | ✓ |
| Checkpoint | conteúdo | fluxo | ✓ | ✓ | ✓ |
| Revisão | SRS | fila/sync | ✓ | ✓ | ✓ |
| Painel | progresso | estados | ✓ | ✓ | — |
| Conclusão | conclusão | revisita | ✓ | ✓ | ✓ |
| Nav | — | 320/375/768 | ✓ | ✓ | — |

## 15. Critérios de aceite do redesign

1. Nenhuma rota, ID, resposta ou contrato de dados muda.
2. Todos os testes existentes continuam verdes; novos testes cobrem estados visuais críticos.
3. Acessibilidade AA em todas as áreas; foco, teclado, leitor de tela e reduced motion.
4. Performance dentro dos orçamentos; nenhuma dependência nova.
5. O produto parece um só sistema em landing, app, lição e revisão.
6. Nenhum texto essencial em imagem/SVG.
7. Nenhuma estatística falsa ou promessa de domínio.
8. A árvore fica limpa ao fim de cada fatia, com commit descritivo.

## 16. Fora de escopo

- Novas lições A1–C2, IA, Heron, push, export/import, service worker.
- Mudanças em Supabase/RLS/RPC/auth/Progress v1/SRS.
- Novas dependências de UI/animação/ícones.
- Redesign dos documentos legais além de tipografia/legibilidade.
- Testes em iPhone físico (permanecem manuais).
