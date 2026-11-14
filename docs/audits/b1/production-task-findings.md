# B1 — achados das tarefas de produção (Fase 12B)

> **Registro histórico, superado como decisão de release.** Este arquivo preserva evidência e
> estado da auditoria na época. O veredito atual é projeto concluído, áudio resolvido com
> créditos (7.790 MP3 servidos por padrão) e revisão editorial final assistida por IA aceita
> pelo responsável. Não houve revisão nativa nem teste físico; esses riscos são aceitos e não
> bloqueiam release. Pendências, bloqueios e contagens antigas abaixo não controlam o estado
> atual. Ver `docs/release/beta-readiness.md`.


Escopo: as 40 tarefas independentes por lição (`production` nos datasets B1) — `promptPt`, `promptKo`, `guidance[]`, `checklist[]`, `minWords`. Todas lidas uma a uma (cobertura 40/40; ver `coverage-ledger.md`).

## Como a produção é corrigida hoje (relevante para severidade)

A tarefa de produção **não é corrigida automaticamente**: o engine não faz matching de texto livre; o learner escreve e o checklist é autoassunção guiada. Consequência da auditoria: **não existe risco de correção falsa** nesta classe, e defeitos aqui são pedagógicos (consistência enunciado×critério×registro), não de grading. Nenhum achado abaixo altera correção de item.

## Estado medido

| Dimensão | Resultado |
|---|---|
| Completeza | 40/40 com `promptPt`, `promptKo`, `guidance` (≥2), `checklist` (exatamente 4 em todas), `minWords` (30–40; moda 35) |
| Alinhamento objetivo×tarefa | 40/40 a tarefa corresponde à `communicativeGoal` do blueprint da lição |
| Checklist ×ensino da lição | 38/40 verificáveis só com o material ensinado; exceções abaixo |
| Registro declarado na tarefa | 0/40 — nenhuma produção informa ao aluno o registro esperado (해요체 vs formal); padrão herdado de A2, mas em B1 (formalidade é conteúdo) vale decidir |

## Achados

- **B1-12B-M025 (parte a) — `b1-l13`**: `promptKo` "동네 서비스를 **확대하자는** 제안을 써 보세요." exige reconhecer o propositivo `-자` em modelo, nunca ensinado (a própria guidance manda usar `-뿐만 아니라`/`-기도 하다`). Alternativa sem `-자`: "동네 서비스 확대 방안에 대한 제안을 써 보세요."
- **B1-12B-M019 (eco) — l06**: o checklist "Não apresentei possibilidade como promessa" convive com o c02/c08 aceitando `예정이에요` para plano aberto — a tarefa treina uma distinção que o checkpoint depois fura.
- **B1-12B-U007 (l23)**: a produção pede "conselho a um amigo" alinhada ao diálogo em 반말, mas nada informa o registro a usar; aluno que escreva 해요체 não é penalizado (ok) nem orientado (lacuna).
- Menores, sem ID próprio (registados só aqui, abaixo do limiar de ledger): `minWords` mede "palavras" mas as instruções contam frases (5–6 frases ≈ 35 palavras é coerente para ko, apertado para textos com partículas contadas como palavras? — a contagem do engine é por espaços; para coreano isso ≈ eojeol, aceitável). `titlePt` idêntico padrão "Produção independente · X" em 40/40 (consistente).

## Rejeições desta classe (verificadas e negadas)

- Revisor alegou que produções cobram `-면서`/`-라고 하다` no checklist: grep — nenhuma produção B1 nomeia forma não ensinada no `checklist[]` além do caso l13 acima (que está no promptKo, não no checklist).
- Alegação de `minWords` inconsistente com fraseologia ("cinco a seis frases" vs 35 palavras): conferido contra 10 amostras de respostas-modelo das lições — coerente (29–41 eojeol).
