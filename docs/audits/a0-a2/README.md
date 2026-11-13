# README — auditoria A0–A2 (read-only)

> **Fase 12A (2026-11-13):** as correções verificadas foram aplicadas fora deste
> worktree, em commits focados no `main`. O estado final está em
> [`correction-ledger.md`](correction-ledger.md); `executive-summary.md` §9,
> `coverage-ledger.md` (seção 12A) e `correction-proposals.md` (tabela de status)
> foram atualizados. O texto original da auditoria permanece como proveniência.
> **B1 não foi auditado nem reescrito.**

Auditoria independente, **somente de leitura**, de todo o conteúdo educacional de
coreano do KBR do Hangul (A0) até o A2. **B1 não foi tocado, lido ou citado.**

## Onde estamos

| | |
|---|---|
| Commit auditado | `3103ce3` (*Record the public audio corpus decision*) |
| Branch desta auditoria | `audit/a0-a2-linguistic` (local, **sem push**) |
| Worktree | `/root/estudos/kbr-audit-a0a2` (criado a partir de `3103ce3`; o tree principal `/root/estudos/kbr` continua com o trabalho B1 de outro agente intocado) |
| Conteúdo alterado | **nenhum** (`src/**`, `docs/curriculum/**`, `docs/pedagogy/**`, vocabulário, audio, `Progress`, CAS, SQL, schemas: zero diff) |
| Estado | PASS A + PASS B + PASS C concluídos; entregáveis abaixo; correções **propostas, não aplicadas** |

## Leia nesta ordem

1. **`executive-summary.md`** — 6 críticos verificados, 5 padrões sistêmicos, o que
   fazer primeiro. Comece aqui se tiver 5 minutos.
2. `coverage-ledger.md` — o que de fato foi lido/revisado, com status honesto e a
   discordância medida entre revisores.
3. `inventory.md` — tudo que existe no escopo, medido no repositório (e a conferência
   com o que `AGENTS.md`/`roadmap.md` declaram).
4. `cross-level-findings.md` — os padrões que se repetem entre A0/A1/A2 e as lacunas
   de validação que deixaram os bugs passarem.
5. `correction-proposals.md` — as 20+ correções ranqueadas, cada uma com arquivo,
   string e critério de aceite. **Nenhuma foi aplicada.**
6. `hangul-findings.md` · `a1-findings.md` · `a2-findings.md` — consolidado por curso,
   com a coluna **Verificação** dizendo o que o orquestrador reproduziu.
7. `references.md` — cada norma/fonte usada e o que ela sustentou (incluindo as vezes
   em que a norma **derrubou** um achado de revisor).
8. `data/` — evidência: `findings/*.md` (25 relatórios de lote), `findings-index.*`,
   `engine-probe.json`, `structure/progression/vocabulary/particle/form/listen/
   typed-normalization/target-inside-word/reuse-findings.json`,
   `claim-verifications.json`, `second-model-packet.md`.
9. `tools/` — a máquina da auditoria (scripts deterministicos + roteiro do revisor +
   sondas do motor real de correção).

## Métodos e limites (sem maquiagem)

- **Triagem determinística** sobre 100% do corpus: gabarito × opção, lacuna preenchida
  × alomorfia de partícula, pontuação × `normalize()`, enunciado × granularidade de
  resposta, alvo × palavra composta, reuso × ordem, numeral × contador, formas
  irregulares inexistentes. Cada checagem tem **controle positivo** (dispara em
  exemplos falsos deliberados), senão "0 ocorrências" não significaria nada.
- **Revisão linguística por lote**: 24 revisores independentes sobre 20 fichas
  (5 lotes A1 revisados em dobro). Mesmo modelo-base (Claude Opus 5.5) em contextos
  limpos: é **cobertura adicional**, não validação cruzada entre famílias — a
  sobreposição medida entre os dois revisores do mesmo lote foi de 0,12 a 0,31.
- **Não houve segundo modelo**: a assinatura não tinha saldo para um modelo pago de
  outra família, e os gratuitos disponíveis não são confiáveis para juízo de coreano.
  O pacote pronto para essa verificação está em `data/second-model-packet.md`.
- **Não houve revisão por falante nativo.** Nada aqui autoriza remover `in-review`,
  afirmar pronúncia correta ou alegar equivalência CEFR/TOPIK. O áudio (sintético,
  licença bloqueada) não foi ouvido.
- Revisores erraram, e isso foi tratado: 4 achados CRÍTICO/MAJOR foram **rejeitados**
  por contradição com a norma (`으막`, `입어 보다`, `나의 → [에]`, `잔 후에`) e um teve
  a premissa corrigida (`삼 층`). Ver `correction-proposals.md` §"Rejeitados".

## Reproduzir

```bash
cd /root/estudos/kbr-audit-a0a2
npx vitest run --config docs/audits/a0-a2/tools/vitest.config.mts   # dump + sondas do motor
node docs/audits/a0-a2/tools/make-sheets.cjs
for t in analyze-structure analyze-progression analyze-vocabulary analyze-particles \
         analyze-forms analyze-listen-prompts analyze-typed-normalization \
         analyze-risk-surface analyze-lexicon-first-use inventory; do
  node docs/audits/a0-a2/tools/$t.cjs
done
node docs/audits/a0-a2/tools/tally-findings.cjs
node docs/audits/a0-a2/tools/verify-claims.cjs
node docs/audits/a0-a2/tools/render-index.cjs
node docs/audits/a0-a2/tools/render-inventory.cjs
node docs/audits/a0-a2/tools/render-coverage.cjs
node docs/audits/a0-a2/tools/render-course-reports.cjs
```

`data/content-dump.json` e `data/sheets/` são derivados e ficam fora do git
(`.gitignore`); `data/findings/*.md` são evidência de revisor e ficam versionados.

## Validação executada nesta baseline

- `npm run typecheck` → limpo.
- `npx vitest run` → 35 arquivos, **543 testes** passando (roadmap registra 549; a
  diferença é contagem de testes, não conteúdo).
- `npm run build` → sucesso, neste worktree isolado, sem alterar nada além de `.next/`.
- Playwright: **não executado** (a E2E exige o tree principal, onde o outro agente
  está trabalhando em B1). Nada nesta auditoria altera código de aplicação, então os
  cenários E2E não mudaram.

## Como continuar sem perder o fio

1. Decidir as correções de Prioridade 1 (`correction-proposals.md`) com o dono do
   projeto — são 4 itens, todos isolados e mecânicos.
2. Fechar as lacunas de validação (C-02, C-04) **antes** de gerar mais conteúdo: são
   elas que fazem gabarito impossível chegar ao curso.
3. Só depois, rodar as correções de superfície (C-05…C-20) em commits pequenos, um
   lote por commit, com os testes de conteúdo verdes a cada passo.
4. Levar `data/second-model-packet.md` a um modelo de outra família e, em seguida, o
   bloco de pronúncia/cultura (A0-001…A0-005, 13 `INCERTO`) a um falante nativo.
