# Fase 13C — plano de auditoria editorial e técnica A1–C2

**Status:** auditoria assistida por IA com verificação de referências externas. **Não é revisão nativa.** Nenhum conteúdo será marcado como `reviewed` sem revisor humano identificável.

## Escopo

| Nível | Conteúdo | Fonte de verdade |
|---|---|---|
| Hangul (Pré-A1) | 25 lições + 4 checkpoints | `src/content/hangul/`, `docs/pedagogy/` |
| A1 | 40 lições + 8 checkpoints | `src/content/curriculum/a1/` |
| A2 | 40 lições + 8 checkpoints | `src/content/curriculum/a2/` |
| B1 | 40 lições + 8 checkpoints | `src/content/curriculum/b1/`, `docs/audits/b1/` |
| B2 | 40 lições + 8 checkpoints | `src/content/curriculum/b2/` |
| C1 | 40 lições + 8 checkpoints | `src/content/curriculum/c1/` |
| C2 | 40 lições + 8 checkpoints | `src/content/curriculum/c2/` |

## Dimensões

1. **Linguística:** gramática, morfologia, partículas, tempo/aspecto/modalidade, naturalidade, honoríficos, registro, léxico, colocação, explicações em pt-BR, tradução, distratores, variantes aceitas, coesão, cultura.
2. **Pedagógica:** progressão, alinhamento exercício–objetivo, introdução/reuso lexical, pré-requisitos gramaticais, carga cognitiva, dificuldade de leitura/escuta, variedade, autenticidade da produção, fairness, checkpoints, divulgação acidental de resposta, scaffolding.
3. **Técnica/UX:** 320/375/390/768/1280 px, overflow, tipografia coreana/portuguesa, alvos de toque, leitura longa, teclado, leitor de tela, foco, tema escuro, movimento reduzido, navegação, conclusão, recuperação de sessão, TTS, sincronização.

## Métodos

- **Automático:** validadores de conteúdo, testes de fairness, unicidade de IDs, cobertura vocabular, referências de reuso, módulos de acessibilidade e Playwright.
- **Revisão assistida por IA:** leitura integral de amostras por módulo, com referência a dicionários e gramáticas; achados registrados com localização exata.
- **Referência externa:** NIKL Korean-English Learners' Dictionary, NIKL Korean Grammar Dictionary, CEFR Companion Volume, King Sejong Institute, Yeon & Brown.
- **Navegador real:** Playwright em Chromium e WebKit, com screenshots e checagem de overflow/axe.
- **Não realizado:** revisão por falante nativo, teste com aprendizes, validação psicométrica, iPhone físico, leitor de tela real.

## Entregáveis

- `findings.json` — ledger canônico por achado.
- `executive-summary.md` — contagem, riscos e limitações.
- `references.md` — fontes consultadas e o que cada uma sustenta.
- `technical-audit.md` — resultados de Playwright, axe, viewports e performance.
- `progression-matrix.md` — matriz A1–C2 de resultados, gramática, léxico e avaliação.

## Critério de conclusão

- Falhas críticas confirmadas corrigidas ou explicitamente registradas como pendentes de decisão humana.
- Validadores e testes verdes, sem skips novos e sem enfraquecer asserções.
- Nenhuma alegação de revisão nativa, certificação CEFR/TOPIK ou eficácia pedagógica comprovada.
