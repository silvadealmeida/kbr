# Sumário executivo — auditoria de conteúdo educacional A0–A2

**Baseline auditado:** `3103ce3` (ponta do A2 concluído), em worktree isolado
`/root/estudos/kbr-audit-a0a2`, branch `audit/a0-a2-linguistic`.
**B1 não foi lido nem alterado.** **Nenhum conteúdo, schema, registro, `Progress`,
áudio ou teste foi modificado** — ver §"Provas".

## 1. Resultado em uma linha

O conteúdo A0–A2 está **estruturalmente sólido e linguisticamente muito acima do
temido para texto gerado**, mas contém **falhas reais e localizadas** — incluindo
**6 problemas críticos confirmados** que vão de um exercício impossível de acertar a
uma partícula errada impresa como modelo e a um item de vocabulário ancorado na
palavra errada. **Nada disso é consertado nesta fase**: tudo está proposto, com
evidência, em `correction-proposals.md`.

## 2. Números medidos (não declarados)

| Curso | Passos | Exercícios | Itens de conteúdo | Status |
|---|---|---|---|---|
| A0 Hangul | 29 (25 lições + 4 checkpoints) | 405 | 1.044 (fichas de lição/checkpoint/jamo/sílaba/palavra/regra + léxico legado) | revisado |
| A1 | 48 | 615 | 2.561 (1.675 de lições/checkpoints + 886 de léxico/frases) | revisado (m01–m05 com 2 revisores) |
| A2 | 48 | 615 | 2.206 (1.406 de lições/checkpoints + 800 de léxico/frases) | revisado |

**5.811 itens** entraram em ficha de leitura e foram revisados — 100% dos passos dos
três cursos e 100% das 976 entradas canônicas com suas 868 frases.

As contagens do projeto batem exatamente com o repositório (A1 443+443, A2 400+400,
615+615 exercícios, distribuição por tipo idêntica ao `AGENTS.md`). Divergência
encontrada só na **contagem de testes**: a suíte nesta baseline tem **543 testes /
35 arquivos**, não os 549 citados em `docs/roadmap.md`/`AGENTS.md`.

**298 achados** em 25 arquivos de lote: **10 CRÍTICO · 84 MAJOR · 191 MINOR ·
13 INCERTO**. Depois da re-verificação: **8 problemas críticos distintos**,
porque dois lotes (m01 e m03 de A1) foram revistados por dois revisores e
encontraram o mesmo problema, e **3 achados críticos de revisor foram rejeitados**
por erro do próprio revisor (ver §4).

## 3. Os críticos que sobrevivem à verificação

Os 10 achados brutos com severidade CRÍTICO viram **8 IDs distintos** após remover as duplicatas de segundo revisor (`A1M1-001` e `A1M3-001`). Desses 8, **6 permanecem críticos** após verificação: `A2M1-001`, `A1M3-001`, `A1M1-001`, `A1M5-001`, `A0-001` e `V2-001`. `V0-001` foi **rejeitado** e `A1M1-002` foi **rebaixado a MAJOR**. A tabela mantém os 8 para proveniência; o status final de cada um está em [`correction-ledger.md`](correction-ledger.md).

| ID | Onde | O que acontece |
|---|---|---|
| A2M1-001 | `a2-l02-e01` | gabarito `"Foi uma fonte termal."` não coincide com nenhuma opção (`"Foi a uma fonte termal."`). Sonda no motor: **nenhuma das 3 opções passa**. O aluno não pode acertar o item, e a lição perde 1 dos 10 pontos do mínimo 8/10. |
| A1M3-001 | `a1-l11-e06`, `a1-c03-e13` | lacuna com `은` fixo + gabarito `언니` → a frase exibida fica **`제 언니은 선생님이에요`** (agramatical; o certo é `언니는`). O motor aceita só a forma errada e **rejeita** `언니는`. |
| A1M1-001 | `a1-l01-e03` | a explicação ensina a regra falsa *"nome próprio não recebe 이에요"*; o próprio curso tem `제 국적은 브라질이에요` (duas lições depois). |
| A1M1-002 | `a1-l03-e09` | MCQ com `은` e `이` ambos defensáveis para o mesmo vão; a lição acabou de dizer que as duas formas são compreensíveis. |
| A1M5-001 | `g:a1-l25-appointment` | `극장 앞에 만나요.` ensina `에` para ponto de encontro de ação; o curso corrige em `a1-l23` com `사거리에서 만나요`. Onde a ação acontece é `에서`. |
| A0-001 | `h21-e02`, `rule:liaison` | a prosa diz *"o **ㄱ** final de 음 passa para 악"*; o batchim de `음` é **ㅁ**. Transcrição `으막` está certa (o motor produz `으막`, e o 온라인가나다 escreve `[옏 으막]`); só a explicação está errada — em dois lugares, e contradizendo a nota da própria palavra. |
| V2-001 | `ko:따라서` | a frase-âncora é `규칙을 따라서 행동하세요` — aí `따라서` é `따르다`+`-아/서` ("seguindo"), não o conectivo "portanto". A tradução pt inventa um "Portanto," que o coreano não diz. O cartão canônico fica ancorado em exemplo falso, e o validador estrutural não vê (a string bate). |
| V0-003 | `ko:안` | risco de identidade: `ko:안` só glosa "dentro; interior", mas a forma `안` também é usada como negação em A1/A2 sob a mesma identidade canônica. Sem colisão de IDs ainda, sem `sense`. |

## 4. Rejeições e rebaixamentos — a auditoria não engoliu tudo o que recebeu

| Achado rejeitado | Por quê |
|---|---|
| **V0-001** (`으막` "não existe") | Errado: `음악` → `으 + 막` é a 연음 regular (o motor `applyLiaison` faz exatamente isso e o corpus MP3 já tem as duas chaves). O problema real é só o nome da letra na prosa (A0-001). |
| **A2M2-003** (distrator `잔 후에` "inexistente") | Errado: `자다` → `잔` é regular; a forma *`잰`* proposta pelo revisor é que não existe aqui. Distrator válido. |
| **A2M3-001** (premissa) | `삼 층` **é** a forma de princípio (`한글 맞춤법` 제43항; 온라인가나다 336486). O defeito real e menor: o ditado aceita só `삼 층이에요` e rejeita `삼층이에요`, variação permitida para numeração de pavimento. |
| **A1M1-002** (severidade) | Mantido como achado, mas rebaixado de CRÍTICO para MAJOR: ambiguidade de avaliação, não coreano errado. |

## 5. Padrões sistêmicos (vale corrigir por regra, não item a item)

Detalhes e números em `cross-level-findings.md`; resumo:

1. **Produção corrigida por igualdade exata.** Em A2, **126 de 794** itens digitados
   só aceitam a forma com a pontuação exata (`normalize()` não remove `.`/`?`); em
   A1 o app já publica a variante sem ponto — ou seja, é uma regressão de A2, não uma
   decisão de design.
2. **Ditado que pede um fragmento e cobra a frase inteira**: **65** itens `listen`
   (26% dos 264) com enunciado "escreva o número / a idade / a ação…" e gabarito que
   só aceita a frase completa. Achado por 5 lotes diferentes → padrão de geração.
3. **Marcos gramaticais cobrados antes de serem ensinados**: discurso indireto
   (`-라고/-(으)ㄴ다고/자고 하다`), `-았/어야 했어요`, `-(으)ㄹ 때`, `-면서` aparecem em
   itens avaliados sem declaração no blueprint (grep em A1+A2: zero ocorrências
   antes do uso cobrado).
4. **Reusos de `reusedIds` sem correspondência com a lição** (ex.: `계산서` em
   `a1-l36`…`l40`) e **`pos` sem categoria para 형용사** (adjetivos coreanos entram
   como `verbo` porque o esquema não tem "adjetivo").
5. **`acceptedAnswers` estreitas demais** para variantes legítimas: `계셔요`,
   `뵀어요`, `삼층이에요`, `언니는`, `저는`-elipse, `가격이 얼마예요?`.

## 6. O que a auditoria **não** pode dizer

- Nada substitui **falante nativo**: 100% do coreano continua `in-review`, e assim
  fica registrado. Nenhuma frase desta auditoria afirma pronúncia correta,
  naturalidade certificada ou equivalência CEFR/TOPIK.
- Áudio não foi ouvido (corpus sintético, licença bloqueada) — os achados de
  pronúncia são sobre **texto explicativo**, não sobre som real.
- Onde faltou evidência normativa, o item está marcado `INCERTO` (13), não "corrigido".

## 7. Provas

- `npm run typecheck` → limpo. `npx vitest run` → **35 arquivos / 543 testes passando**.
  `npm run build` → **sucesso** (rodado no worktree isolado, com `node_modules` em
  hardlink local; nenhuma escrita em `src/`).
- Checagens determinísticas com **controle positivo** (disparam em exemplos falsos
  deliberados): `structure-findings.json` (2 achados), `particle-findings.json` (2),
  `form-findings.json` (0), `typed-normalization.json` (126),
  `listen-prompt-findings.json` (65), `vocabulary-findings.json` (0 colisões de id,
  0 reusos anteriores ao ensino, 48 alvos flexionados — todos irregulares legítimos).
- Motor de correção real exercitado em `data/engine-probe.json` (gabarito impossível,
  `언니는` rejeitado, pontuação obrigatória, variantes `계셔요`/`뵀어요`).

## 8. Recomendação de sequência (fase seguinte, quando você pedir)

1. Corrigir os 8 críticos (≈ 10 strings; nenhuma migração, nenhum ID muda).
2. Fechar os 3 buracos do validador que deixaram esses erros passarem
   (gabarito × opções, frase preenchida × concordância de partícula, âncora de
   vocabulário × sentido). Isso vale mais que qualquer correção pontual.
3. Tratar os 5 padrões sistêmicos por regra de geração, não por item.
4. Só então: pacote para revisão nativa, priorizando A0 (fonética) e os 13 `INCERTO`.

## 9. Fase 12A — o que foi corrigido (2026-11-13)

O relatório acima descreve a auditoria read-only na baseline `3103ce3`. A fase 12A aplicou as correções verificadas, sem reescrever B1, sem migração e sem regenerar áudio. O detalhe item a item está em [`correction-ledger.md`](correction-ledger.md).

- **Críticos:** 6/6 verificados corrigidos — `A2M1-001`, `A1M3-001`, `A1M5-001`, `A1M1-001`, `A0-001`, `V2-001`. `A1M1-002` foi rebaixado a MAJOR e corrigido; `V0-001` continua rejeitado.
- **Reconciliação:** 298 linhas brutas (10/84/191/13); 55 linhas com ID repetido por segundo revisor; 243 IDs únicos (8/68/156/11 por maior severidade). A soma 6+84+191+13=294 usa os 6 críticos *verificados*, não as 10 linhas críticas brutas.
- **Avaliação:** 126 itens digitados do A2 não exigem mais pontuação final; 188 ocorrências de `listen` foram alinhadas; variantes válidas passaram a ser aceitas; 6 `acceptedAnswers` redundantes do A1/A2 foram removidas (3 do B1 ficaram intactas).
- **Sistêmico:** 3 alvos contextuais dentro de palavra maior corrigidos; 297 referências de `reusedIds` sem ocorrência medida e congelada (o número 76 não se reproduziu); validador novo para gabarito fora das opções, referência de escolha, partícula, resposta vazia/redundante, `listen` divergente e fronteira de alvo.
- **Progressão:** `-았/어야 했어요`, `-(으)ㄹ 때`, `-라고 하다` e `-면서` deixaram de ser cobrados antes do ensino; `-면서` ganhou bloco em `a2-l40`.
- **Áudio:** 2.907 MP3 preservados; 12 textos corrigidos sem MP3 e 10 MP3 antigos órfãos documentados em `docs/audio/stale-audio-manifest.md`; `public/audio/` fora do deploy e áudio estático opt-in.
- **Limites:** revisão nativa continua necessária; **B1 ainda precisa de auditoria linguística própria**; os 84 MAJOR e 191 MINOR restantes não foram corrigidos em massa.

Validação da 12A: typecheck + **595 Vitest** + build (`[audio-guard] OK`) + **646 Playwright (619 executados + 27 skips)**.
