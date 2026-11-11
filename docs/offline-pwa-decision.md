# KBR — Decisão sobre PWA offline e service worker (Fase 6B)

**Status:** decidido em 11/11/2026 — **não** adicionar service worker nesta fase.
**Escopo:** PWA instalável, comportamento sem rede e limites de cache.

## Resumo

O KBR continua sendo um app web instalável **sem funcionamento offline**. A Fase 6B
auditou o custo/benefício de um service worker mínimo e concluiu que ele não traz
ganho real de aprendizado offline sem violar as regras de privacidade do projeto.
A decisão é **adiar**, não “fingir offline”.

## O que já existe

- Manifesto e metadados iOS completos (`src/app/manifest.ts`, layout raiz), ícones
  `any`/`maskable` e `display: standalone`. O app instala e abre no modo standalone.
- `Cache-Control: private, no-store, max-age=0` em `/auth/*` e em todas as rotas
  privadas (`/dashboard`, `/cursos`, `/hangul`, `/vocabulario`, `/revisao`, `/licoes`).
- Assets públicos (JS/CSS/imagens/ícones) com cache HTTP normal do Next/CDN.
- `localStorage` local-first por conta; a sincronização com Supabase acontece quando
  há rede. Progresso não sincronizado nunca é apresentado como salvo na conta.
- Nenhum `serviceWorker`, `caches` ou `Cache Storage` é registrado hoje; há teste
  E2E garantindo isso (`e2e/pwa.spec.ts`).

## Por que não implementar agora

1. **O conteúdo da lição é HTML privado renderizado no servidor.** As páginas de
   `/hangul`, `/revisao` e `/dashboard` dependem da sessão em cookie e são servidas
   com `no-store`. Para abrir uma lição offline seria necessário cachear HTML
   personalizado — exatamente o que a política do projeto proíbe.
2. **Cachear HTML privado cria vazamento entre contas.** Um service worker que
   guarda respostas de páginas autenticadas mantém conteúdo de uma conta no
   dispositivo depois do logout ou da troca de conta, a menos que todo o cache seja
   apagado em cada evento de auth — o que reintroduz o problema de “abrir offline”
   logo após o logout.
3. **APIs por usuário não podem ser cacheadas.** O snapshot de progresso e as
   respostas do RPC CAS são específicos da conta. Cachear isso viola a regra de não
   guardar dados por usuário em cache HTTP/service worker e cria risco de exibir
   progresso de outra pessoa.
4. **Sem esse conteúdo, o ganho offline é quase nulo.** Restaria cachear apenas o
   shell público e assets estáticos. A landing já abre com o cache HTTP do navegador;
   um service worker adicionaria versão, invalidação e uma segunda fonte de verdade
   de deploy sem permitir estudar uma lição.
5. **Custo de atualização e suporte.** Um service worker exige estratégia de
   versionamento, `skipWaiting`/`clients.claim` conscientes, limpeza de caches
   antigos, tratamento de usuários presos em versão velha e testes de migração.
   Nesta fase, esse custo não se paga.
6. **Risco de mascarar falhas de rede.** A UI hoje informa com honestidade “sem
   conexão” e mantém o progresso local. Um cache agressivo poderia dar a impressão
   de que a lição está disponível quando a gravação remota continua pendente.

## Alternativas avaliadas

| Alternativa | Decisão | Motivo |
|---|---|---|
| Service worker cacheando shell + assets | Adiada | Não permite abrir lição privada; ganho marginal sobre o cache HTTP. |
| Cachear HTML de lições | Rejeitada | HTML privado/personalizado; viola `no-store` e a regra de não cachear dados privados. |
| Cachear respostas do Supabase/RPC | Rejeitada | Dados por usuário e progresso sensível; risco de vazamento entre contas. |
| “Offline completo” com IndexedDB + fila própria | Fora de escopo | Duplicaria o modelo `Progress` v1 e o CAS; exigiria fase própria com auditoria. |
| Apenas melhorar UX de rede (feito na 6B) | Adotada | Aviso de conexão, estados pendente/sincronizado corretos e reconexão automática. |

## Comportamento offline atual (honesto)

- Abrir o app **já aberto** numa aba/instalação: a tela atual continua montada, o que
  já foi carregado permanece visível e o progresso é salvo no `localStorage`.
- Recarregar ou abrir uma rota nova sem rede: o navegador mostra o erro padrão de
  rede; **não há fallback offline**. O aviso “Sem conexão” aparece quando o documento
  chega a montar.
- Concluir lição/revisão sem rede: o resultado é gravado localmente, a UI mostra
  “Salvo neste dispositivo… pendente” e o envio remoto é tentado de novo ao
  reconectar (inclusive sem recarregar a página).
- Login/logout: continuam exigindo rede. Sair da conta limpa a sessão e não tenta
  manter conteúdo privado em cache.

## Regras invioláveis para uma fase futura

Se o offline for retomado, o service worker:

1. Nunca deve cachear `/auth/*`, tokens, cookies, respostas REST/RPC do Supabase,
   HTML de rotas privadas nem snapshots de progresso.
2. Deve limitar-se a assets públicos versionados (`/_next/static`, ícones, fontes
   públicas) com cache por versão de build e limpeza de caches antigos.
3. Deve garantir que uma nova versão chegue de forma confiável (versionamento no
   build, atualização explícita e teste de “usuário preso em versão antiga”).
4. Deve apagar qualquer cache ao detectar logout/troca de conta, mesmo que só haja
   assets públicos.
5. Precisa de testes E2E de offline real, reconexão, atualização de versão e troca
   de conta; e de uma decisão explícita sobre o que a pessoa pode fazer offline.

## Critérios para revisitar

- Existir conteúdo de lição genuinamente público (não personalizado) que valha a
  pena estudar offline; ou
- Uma arquitetura de conteúdo que separe dados públicos de progresso privado e
  permita cachear a lição sem HTML de sessão; ou
- Pedido explícito do produto com orçamento para a fase de cache, versionamento e
  auditoria de privacidade.

Até lá, a promessa continua: **instalável, com progresso local e sincronização
quando há rede; não é um app de estudo offline.**
