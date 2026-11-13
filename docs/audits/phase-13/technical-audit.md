# Auditoria técnica e de UX — A1–C2

**Data:** 2026-11-13. **Ambiente:** build local de produção, Chromium e WebKit via Playwright, servidor em `localhost:3100` com Supabase mockado. Não houve teste em iPhone físico, Chrome iOS real ou leitor de tela real.

## 1. Inventário verificado

| Curso | Passos | Lições | Checkpoints | Itens | Distribuição |
|---|---:|---:|---:|---:|---|
| Hangul | 29 | 25 | 4 | 405 | 116 mcq, 5 cloze, 121 reading, 8 tipos de composição |
| A1 | 48 | 40 | 8 | 615 | 79 mcq, 183 cloze, 132 listen, 97 translate, 124 reading |
| A2 | 48 | 40 | 8 | 615 | 101 mcq, 125 cloze, 132 listen, 125 translate, 132 reading |
| B1 | 48 | 40 | 8 | 615 | 102 mcq, 124 cloze, 132 listen, 125 translate, 132 reading |
| B2 | 48 | 40 | 8 | 615 | 105 mcq, 123 cloze, 132 listen, 123 translate, 132 reading |
| C1 | 48 | 40 | 8 | 615 | 105 mcq, 123 cloze, 132 listen, 123 translate, 132 reading |
| C2 | 48 | 40 | 8 | 615 | 105 mcq, 123 cloze, 132 listen, 123 translate, 132 reading |
| **Total** | **317** | **285** | **52** | **4.095** | |

Vocabulário canônico: **2.256 entradas**, **2.148 frases contextuais**. Hangul tem 133 entradas e 108 cartões sem frase (por desenho); A1–C2 têm frase para todas as entradas novas.

## 2. Matriz de navegador

| Dimensão | Cobertura | Resultado |
|---|---|---|
| Chromium 320 px | Todas as lições iniciais + catálogo | Sem overflow horizontal; controles ≥44 px; texto coreano quebra sem corte. |
| Chromium 375/390 px | Matriz completa de A1–C2 | Sem overflow; axe sem violações `wcag2a/aa/21a/21aa` nas lições iniciais. |
| Chromium 768/1280 px | Matriz completa | Layout de duas colunas estável; nenhuma rota quebrada. |
| WebKit 390 px | Smoke, PWA, a11y, A1–C2 | Fluxos principais e lições iniciais cobertos; axe sem violações. |
| Tema escuro | A1–C2 e catálogo | Contraste AA nos pares testados; axe sem violações. |
| Movimento reduzido | Fluxos de lição e navegação | Conteúdo e ações continuam disponíveis sem animação. |
| Teclado | Inputs, alternativas, bancada e navegação | Enter confirma resposta textual; foco vai ao feedback; sem armadilha de foco. |

Execução final: **695 testes Playwright aprovados + 30 skips intencionais** (Chromium 320/375/390/768/1280 + WebKit 390), `EXIT:0`. Os skips são instalabilidade no WebKit, orçamento/matriz restritos a desktop e as capturas visuais duplicadas nos quatro projetos (executadas uma vez em desktop-1280). Nenhuma falha foi convertida em skip.

## 2.1 Regressão de performance encontrada e corrigida

A primeira matriz completa acusou **4 falhas** nos orçamentos de bytes do painel, player, atlas do Hangul e conclusão do `c4` (até **1.618.605 B** contra o limite de 1.200.000 B). A causa era o registro de C1/C2 importar os datasets completos de lições para montar `steps`, o que puxava conteúdo e vocabulário para o bundle do catálogo. O registro passou a usar apenas o blueprint leve; depois disso, `e2e/performance.spec.ts` voltou a **6/6** verde. Nenhum limite foi afrouxado.

## 3. Capturas inspecionadas

As capturas foram geradas por `e2e/visual-audit.spec.ts` em `/tmp/kbr-audit-shots/` e inspecionadas visualmente nesta sessão:

- `hangul-320/375/390/768/1280.png`
- `a1-*`, `a2-*`, `b1-*`, `b2-*`, `c1-*`, `c2-*`
- `cursos-375.png`, `cursos-1280.png`

O que foi observado: títulos longos quebram em duas linhas sem invadir o cartão; leituras longas mantêm entrelinha e largura de medida; a bancada de composição não estoura em 320 px; o player de exercício mantém o botão “Conferir” visível; o catálogo mostra C1/C2 como disponíveis/bloqueados por pré-requisito, não como “planejado”; não há truncamento de texto coreano ou português.

## 4. Limites

- Playwright não substitui VoiceOver/TalkBack, teclado físico, safe-area real ou voz do sistema.
- axe não prova conformidade WCAG completa.
- WebKit automatizado não é Safari em iPhone real.
- As capturas são de build local/LAN, não field data.
- Não foram medidos orçamentos de bytes/CLS de C1/C2 nesta fase; a matriz de performance existente continua restrita às rotas medidas.
- A inspeção visual é humana assistida por IA; não houve revisão de design por especialista.
