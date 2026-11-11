# Fase 7 — roadmap de implementação

> Fase 7A concluída em pesquisa e documentação. Nenhum código de app foi alterado. A implementação começa na 7B **somente após revisão humana** desta direção. Cada fase abaixo é uma fatia verificável, com commit próprio e árvore limpa ao final.

## 1. Estado da 7A

| Entrega | Status |
|---|---|
| Pesquisa do Heron AI (DOM/CSS/motion/mobile/reduced motion) | concluída em 11/11/2026 |
| Direção criativa “Composição” | concluída |
| Design system (tokens, tipografia, layout, componentes) | concluído |
| Especificação de movimento | concluída |
| Conceitos de interação de Hangul | concluídos |
| Plano por componente (áreas A–J) | concluído |
| Roadmap 7B+ | este documento |
| Código de app | **não alterado** |

**Decisão pendente de revisão humana:** aprovar a direção, a paleta, a tipografia e a ordem das fases. Sem aprovação, não iniciar a 7B.

## 2. Princípios de execução

1. **Uma fatia, um commit.** Typecheck + test + build verdes antes de cada commit.
2. **Nada de “big bang”.** Tokens e primitivas primeiro; telas depois.
3. **Comportamento intocável.** Nenhuma mudança em rotas, conteúdo, `Progress` v1, CAS, SRS ou auth.
4. **Sem dependências novas** sem decisão registrada.
5. **Acessibilidade e performance são critérios de saída**, não polimento final.
6. **Documentar antes de implementar** qualquer desvio deste plano.
7. **Sem push** nesta fase; commits locais com autor `silvadealmeida`, sem trailers de IA.

### 2.1 Stack recomendada

| Camada | Escolha | Motivo |
|---|---|---|
| Framework | Next.js 16 (App Router) + React 19.3 | já instalado; Server Components; `<ViewTransition>` disponível |
| Estilo | Tailwind 4 + CSS custom properties | tokens sem runtime; bundle pequeno |
| Tipografia | `next/font` (Archivo, IBM Plex Mono, Noto Sans KR) | self-host, subset, `display: swap` |
| Ilustração | SVG inline + HTML | acessível, sem canvas/WebGL |
| Movimento | CSS transitions/keyframes + WAAPI | sem dependência; controle de reduced motion |
| Transições de rota | React `<ViewTransition>` com fallback | continuidade sem biblioteca |
| Revelação | IntersectionObserver | sem scroll listener/pin |
| Ícones | SVG inline | sem biblioteca |
| Testes | Vitest + Playwright + axe | já existentes |
| **Rejeitado** | WebGL/Three.js, Lottie, Rive, GSAP no bundle inicial, Lenis, Framer Motion | custo sem ganho pedagógico nesta fase |

## 3. Ordem das fases

```
7A  pesquisa + docs                         ✅ concluída
 │
7B  fundação: tokens, tipografia, primitivas
 │
7C  shell + público: nav, landing, auth
 │
7D  lição: player, respostas, composição, pronúncia
 │
7E  superfícies: revisão, catálogo, visão Hangul, painel, checkpoint
 │
7F  movimento + ilustrações + conclusão
 │
7G  hardening: limpeza, performance, a11y, docs
```

Dependências: 7C depende de 7B; 7D de 7B (e reusa primitivas da 7C); 7E de 7D; 7F de 7E; 7G de tudo. Não paralelizar 7D e 7E na mesma árvore sem worktree/coordenação.

## 4. Fase 7B — Fundação

**Objetivo:** introduzir o sistema sem mudar a aparência de forma arriscada. Tokens novos + aliases + tipografia + primitivas.

**Entregas:**

- `globals.css`: primitivos, semânticos claro/escuro, `@theme inline`, aliases dos tokens antigos.
- Fontes: Archivo (variável) e IBM Plex Mono via `next/font`, com `display: swap`; Noto Sans KR permanece em `(app)` com `preload: false`.
- Primitivas: `Button`, `Card`/`Plate`, `Field`, `Choice`, `Badge`, `Notice`, `ProgressBar`, `Sheet` (se necessário).
- Utilitários de foco, `sr-only`, textura de papel (≤2 KB).
- Atualizar `e2e/performance.spec.ts` de “0 fontes na landing” para “≤2 arquivos, ≤60 KB” **de forma intencional**, com comentário e orçamento revisado.
- Testes de contraste dos tokens (script ou teste unitário simples).

**Não entra:** redesenho de tela, mudança de copy, novas rotas, novas dependências.

**Status (concluída em 11/11/2026):** tokens primitivos/semânticos, aliases, escala tipográfica, movimento, textura, primitivas `Button`/`ButtonLink`, `Card`/`Plate`, `Field`/`Input`, `Badge`/`Seal`, `ProgressBar`, `Ruler`, `Notice`, `NavLink`/`SkipLink`, Archivo + IBM Plex Mono e `display: optional` para preservar CLS. Sheet/Dialog adiado por falta de fluxo real. Medição local: landing 278.444 B (JS 212.310 B, CSS 10.148 B, 1 fonte/35.240 B, CLS 0,00065) e painel 479.026 B (6 fontes/134.544 B, CLS 0,00426); testes unitários de contraste/tokens/primitivas e performance/axe atualizados. Detalhes em `docs/architecture.md` §Design system.

**Saída:** typecheck/test/build verdes; landing visualmente quase igual; axe sem regressão; orçamento de bytes atualizado e documentado.

**Rollback:** reverter o commit de tokens; aliases garantem que nenhum componente quebre.

## 5. Fase 7C — Shell e público

**Objetivo:** a nova identidade aparece primeiro onde não há risco de progresso: navegação, landing, auth.

**Entregas:**

1. `Nav.tsx`: sidebar 240 px, bottom nav 56 px + safe-area, indicador ativo, tipografia, tokens.
2. `(app)/layout.tsx` e `(site)/layout.tsx`: skip link, foco no `main`, textura, cabeçalho.
3. Landing: hero com bloco SVG de Hangul, seções em placas, CTA, rodapé; preservar `LandingAuth`, `LandingRedirect`, mensagens de `motivo`.
4. Auth: botão Google, estados, ficha de conta; sem tocar em `AuthProvider`/OAuth.
5. `SiteHeader`, `SiteFooter`, `PageHeader`, `EmptyState` alinhados.

**Não entra:** lição, revisão, painel, catálogo.

**Testes:** e2e de landing/OAuth mockado/logout, axe, WebKit, 320/375/390/768/1280; performance da landing; reduced motion.

**Saída:** landing <450 KB, JS <260 KB, CLS <0,1; zero fontes coreanas; fluxo de login intacto.

**Rollback:** reverter por arquivo; landing e nav são independentes do player.

## 6. Fase 7D — Lição e composição

**Objetivo:** redesenhar o coração do produto sem alterar respostas ou progresso.

**Entregas:**

1. Extrair `exercise-ui.tsx` em primitivas: `ChoiceList`, `TextAnswer`, `SyllableBuilder`, `AudioPrompt`, `ReadingPrompt`, `FeedbackPanel`.
2. Cabeçalho de lâmina no `LessonPlayer` (o `CheckpointPlayer` reusa a mesma moldura, mas o diagnóstico/final fica na 7E).
3. Feedback com foco, ícone, explicação; progresso com `aria-valuetext`.
4. **Bancada de composição** (`SyllableBuilder`) com zonas inicial/medial/final, toque + teclado, fallback sem drag.
5. **Camadas de pronúncia** para `h21`–`h25` (ligação, nasalização, aspiração) usando dados existentes.
6. Ajustes de alvos, contraste, inputs 16 px, `enterKeyHint`, anti-duplo-envio preservado.

**Não entra:** mudar enunciados, opções, respostas, `checkAnswer`, ordem, guards, `Progress` v1, SRS.

**Testes:** unitários de `checkAnswer`; e2e de lição, Enter, duplo envio, foco, voltar/avançar, WebKit, reduced motion; axe; 320/375.

**Saída:** todos os testes de lição verdes; nenhuma diferença de comportamento observável além da visual; conteúdo coreano intocado.

**Rollback:** manter a versão antiga de `exercise-ui` atrás de flag? Preferir reverter o commit; a extração deve ser mecânica e testada.

**Risco:** alto. Fazer em sub-fatias: (a) primitivas + lição, (b) composição, (c) pronúncia.

## 7. Fase 7E — Superfícies do app e checkpoint

**Objetivo:** revisão, catálogo, visão do Hangul, painel e checkpoint com a nova linguagem.

**Entregas:**

1. `CheckpointPlayer`/`DiagnosticsList`: mesma moldura da lição, diagnóstico legível, resultado final.
2. `ReviewArea`: cartão-prancha, mostrar resposta, botões, sync, vazio, conclusão.
3. `CourseCatalog`: índice de lâminas, estados, CEFR visível.
4. `HangulCourse`: régua 25+4, lição atual, pranchas, status; estados de carregamento/erro.
5. `DashboardArea`: próximo passo dominante, régua, estatísticas, revisão, atividade.

**Não entra:** conclusão (7F), novas métricas, novos campos, novas consultas.

**Testes:** SRS, sync/offline/reconexão, dashboard, catálogo, overview, checkpoint; axe; WebKit; 375/768; performance do painel <1,2 MB.

**Saída:** dados reais em todos os estados; nenhuma estatística falsa; navegação consistente.

## 8. Fase 7F — Movimento, ilustrações e conclusão

**Objetivo:** adicionar a camada expressiva onde ela tem significado, com orçamento controlado.

**Entregas:**

1. Tokens de movimento + bloco global de reduced motion.
2. Microinterações de botão, foco, nav, toast, sheet.
3. Hero da landing: sequência de entrada + SVG stroke; sem preloader/scroll hijack.
4. Conclusão: percurso de 25 lâminas + selo; sequência única.
5. `SyllableAnatomy` e `SoundMap` (se aprovados; usar conteúdo existente).
6. View Transitions para curso → lição e selo de conclusão, com fallback.
7. Remover qualquer animação decorativa que não tenha função.

**Não entra:** player de traço completo (depende de dados revisados), GSAP, Lottie, Rive, WebGL.

**Testes:** reduced motion em Chromium/WebKit; performance (CPU 4×, Fast 3G); e2e de conclusão/revisita; axe; screenshots.

**Saída:** nenhuma tarefa bloqueada por animação; 100% da informação disponível com reduced motion; LCP/CLS dentro do orçamento.

## 9. Fase 7G — Hardening e limpeza

**Objetivo:** consolidar, remover dívida e provar que o sistema é sustentável.

**Entregas:**

- Remover aliases antigos e classes legadas; garantir que nenhum componente usa hex solto.
- Atualizar `docs/roadmap.md`, `docs/architecture.md` (seção de UI/tokens), `docs/design/*` com o que foi realmente implementado.
- Rodar suíte completa: typecheck, test, build, e2e Chromium/WebKit, performance, axe.
- Revisão manual: teclado, VoiceOver/NVDA, 200% zoom, 320 px, sol direto (contraste).
- Atualizar `graphify update .` e commitar `graphify-out/`.
- Registrar limitações restantes (iPhone físico, revisão coreana, conteúdo CEFR).

**Saída:** árvore limpa; documentação coerente; nenhum “TODO” visual sem registro; fase 7 encerrada.

## 10. O que fica para depois da 7G

| Item | Motivo |
|---|---|
| Player de traço completo | Exige dados de ordem de traço revisados por falante/professor. |
| Conteúdo CEFR A1–C2 / IA | Fase 7 do roadmap original; só com pedido explícito; fora do redesign. |
| Service worker/offline | Adiado na 6B; decisão em `docs/offline-pwa-decision.md`. |
| Export/import | Opcional; não é redesign. |
| Testes em iPhone físico | Ambiente não permite; checklist manual. |
| Novas dependências (GSAP/Motion) | Só se uma necessidade real justificar; decisão registrada. |

## 11. Riscos e mitigação

| Risco | Impacto | Mitigação |
|---|---|---|
| Regressão no player | Alto | Extração mecânica, testes antes/depois, commits pequenos, sem tocar em `checkAnswer`/guards. |
| Fonte estoura orçamento/CLS | Médio | `next/font`, subset latin, `display: swap`, fallback ajustado, medição no e2e. |
| Contraste no dark mode | Médio | Tokens testados; axe + cálculo; não usar “soft” como texto. |
| Conteúdo coreano incorreto | Alto | Não criar conteúdo; usar `in-review`; revisão humana antes de publicar traço/pronúncia. |
| WebKit diverge | Médio | Testar cada fatia em WebKit; evitar APIs sem fallback. |
| Escopo cresce para “produto novo” | Alto | Contratos da seção 0; fases e não-objetivos explícitos. |
| Movimento vira espetáculo | Médio | Revisão contra `motion-design-spec.md`; remover o que não explica. |
| Créditos/tempo acabam no meio | Médio | Commits por sub-fatia; roadmap atualizado antes de cada uma. |

## 12. Critérios de saída da Fase 7

1. Todas as áreas A–J redesenhadas com o sistema “Composição”.
2. Nenhuma mudança de contrato (rotas, conteúdo, progresso, SRS, auth, sync).
3. Typecheck + test + build + e2e verdes; axe limpo; reduced motion e WebKit cobertos.
4. Landing <450 KB/JS <260 KB/CLS <0,1; painel <1,2 MB.
5. Nenhuma dependência nova de UI/animação.
6. Documentação atualizada e árvore limpa.
7. Limitações conhecidas registradas (iPhone físico, revisão coreana, CEFR).

## 13. Checklist de retomada (para o próximo agente)

1. Ler `docs/roadmap.md` (Estado atual), `docs/design/creative-direction.md` e este roadmap.
2. Verificar `git status` e `git log --oneline -10`; não começar com árvore suja.
3. Confirmar que a 7A foi aprovada por humano antes de iniciar a 7B.
4. Implementar **uma** fatia; rodar typecheck + test + build.
5. Atualizar o “Estado atual” do roadmap **antes** de começar a próxima fatia.
6. `graphify update .` e commitar `graphify-out/` junto do código.
7. Commit com autor `silvadealmeida`; sem trailers/menções de IA; sem push.
8. Registrar decisões novas em `docs/architecture.md` ou `docs/design/*`, não no chat.

## 14. Incertezas remanescentes

- **Aprovação humana** da direção, paleta e tipografia.
- **Licenciamento/self-host** de Archivo e IBM Plex Mono (ambas open source; confirmar a versão exata e o subset antes do build).
- **Orçamento de fontes** na landing: o teste atual exige zero; a mudança para ≤2 arquivos é intencional e precisa ser aceita.
- **Suporte a View Transitions** varia por navegador; o fallback é obrigatório e precisa ser testado em WebKit.
- **Dados de ordem de traço** para o player completo: autoria e revisão pedagógica pendentes.
- **Revisão nativa do conteúdo coreano**: continua pendente; o redesign não a resolve.
- **iPhone/Chrome iOS/VoiceOver reais**: não testáveis neste ambiente; checklist manual.
- **Percepção de “premium”**: só validável com teste visual humano; a direção é uma aposta informada, não uma certeza.
- **Escopo de ilustrações**: `SyllableAnatomy` e `SoundMap` podem ser cortados se consumirem mais que uma fatia; a prioridade é lição/revisão.
