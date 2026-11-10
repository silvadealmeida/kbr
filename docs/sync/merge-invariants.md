# KBR — Invariantes de merge do Progress (Fase 4D.1)

**Objetivo:** definir regras determinísticas para que duas sessões possam convergir sem perda de aprendizado. Este documento é normativo para a implementação da Fase 4D.2; não descreve o código atual (as diferenças estão em `concurrency-audit.md`).

## 1. Definições

- **Documento:** um `Progress` v1 válido segundo `isProgress`.
- **Merge:** função pura `mergeProgress(a, b) → Progress` que combina duas versões do mesmo usuário.
- **Ação:** uma alteração local que gera um novo documento (resposta, revisão, conclusão, migração).
- **Estação de revisão:** instante lógico em que um cartão foi atualizado pelo scheduler.
- **Token de versão:** `user_progress.sync_id` lido pelo cliente e devolvido ao RPC. Não é um timestamp.
- **Igualdade semântica:** mesma árvore de valores, independentemente da ordem das chaves do objeto ou da ordem de tentativas com o mesmo timestamp.

## 2. Propriedades algébricas obrigatórias

`mergeProgress` deve ser, para documentos válidos:

1. **Pura:** não muta `a` nem `b`; não lê relógio, storage ou rede.
2. **Total:** sempre devolve um documento válido; entradas inválidas são rejeitadas antes do merge, não "consertadas" silenciosamente.
3. **Comutativa:** `merge(a, b)` é semanticamente igual a `merge(b, a)`.
4. **Associativa:** `merge(merge(a, b), c)` é semanticamente igual a `merge(a, merge(b, c))`.
5. **Idempotente:** `merge(a, a)` é semanticamente igual a `a`.
6. **Determinística:** o mesmo par de entradas produz sempre a mesma saída canônica.

Essas propriedades são necessárias para retry, ordem de chegada de conflitos e migração de convidado. Sem elas, dois clientes podem convergir para documentos diferentes mesmo com o mesmo conjunto de ações.

## 3. Invariantes por campo

### I1 — Lições concluídas nunca regridem

```
lessons[id].done = a.lessons[id].done OR b.lessons[id].done
```

- `done: true` é pegajoso.
- Um documento sem a chave não apaga a chave do outro lado.
- Retentativa reprovada não desfaz conclusão anterior.
- `done` não pode ser inferido de `score`: o documento não guarda total de itens nem critério de aprovação.

### I2 — Checkpoints concluídos nunca regridem

Checkpoints usam a mesma entrada `lessons[id]`; valem I1 e I3. `c1`–`c4` não podem ser rebaixados por um snapshot sem a chave, com `done: false` ou com score menor. A conclusão do módulo continua derivada: `isCourseComplete` exige todos os 25 + 4 com `done: true`.

### I3 — Maior score é preservado, mas só para lições/checkpoints

```
lessons[id].score = max(a.lessons[id].score ?? 0, b.lessons[id].score ?? 0)
```

- Aplicar `Math.max` a **todos** os campos é errado: cartões, histórico, `lastActive` e `dailyGoal` não são scores.
- Score é percentual inteiro 0–100 validado por `isProgress`.
- O merge não recalcula aprovação a partir do score.

### I4 — Histórico é união sem perda, com identidade estável

- Nenhuma tentativa válida é removida.
- A identidade preferida é `attempt.id` (campo aditivo opcional proposto na 4D.2).
- Para registros antigos sem `id`, a identidade é a tupla canônica `(exerciseId, at, correct)`.
- Se duas tentativas têm a mesma identidade, elas são a mesma tentativa; escolher uma representação deterministicamente.
- A ordem canônica é por `at` ascendente e, no empate, por `id` (ou `exerciseId` + `correct`) ascendente. A ordem não pode depender da ordem dos argumentos.
- O merge nunca trunca o histórico nem aplica limite de quantidade.
- Uma tentativa com data inválida não entra; `isProgress` já a rejeita.

### I5 — Tentativas históricas válidas continuam válidas

- O merge não altera `exerciseId`, `correct` nem `at` de uma tentativa existente.
- Repetições legítimas do mesmo exercício em instantes diferentes são tentativas distintas e devem ser preservadas.
- Deduplicar por `exerciseId` isolado é errado.

### I6 — Cartões: vence a revisão mais nova, por cartão

Para cada `cardId` na união das chaves:

```
stamp(card) = parse(card.reviewedAt) ?? (parse(card.due) - intervalo[card.box - 1])
```

- `reviewedAt` é um campo aditivo opcional, proposto para a 4D.2, gravado no instante da ação (`applyReview`/`scheduleMissedReview`).
- Para registros antigos sem `reviewedAt`, o instante é inferido da agenda Leitner: `due = reviewedAt + [1,2,4,8,16][box-1] dias`. Isso é exato para todo estado produzido por `leitner.review`.
- Vence o maior `stamp`. O `due` isolado **não** serve: um cartão antigo na caixa 5 tem `due` 16 dias à frente e venceria uma falha nova na caixa 1.
- Nunca escolher o vencedor pelo `lastActive` do documento inteiro. Uma lição posterior não pode rebaixar a agenda de um cartão.
- Cartões presentes em apenas um lado são preservados. O merge não apaga cartões.
- Um cartão com estado inválido é rejeitado antes do merge; não é "consertado" nem substituído por um estado inventado.

### I7 — Empate de revisão do mesmo cartão

Se `stamp(a) == stamp(b)` e os estados diferem, o desempate é total e determinístico:

1. menor `box` (política conservadora: preserva a falha e agenda mais cedo);
2. menor `due` (ISO comparável em UTC);
3. menor representação JSON canônica do estado.

A ordem dos argumentos não pode mudar o resultado. O empate é raro (duas ações no mesmo milissegundo), mas precisa ser definido para garantir I3 (comutatividade).

### I8 — Revisões concorrentes do mesmo cartão

Política da 4D.2: **a última ação por estação lógica vence**, e as duas tentativas permanecem no histórico. Exemplo: base `box: 2`; A acerta e calcula `box: 3` às 11:00; B erra e calcula `box: 1` às 11:00:01. O cartão fica `box: 1`; o acerto de A continua em `history`.

Limitação explícita: isso **não** é a composição sequencial dos dois eventos. Se B errou e A acertou depois, a composição correta seria `box: 1 → box: 2`, não `box: 3` nem `box: 1`. O `Progress` v1 não guarda a base de cada ação nem um log ordenado de revisões; portanto, a composição exata não pode ser garantida sem um event log (ver §6). Não inventar essa garantia.

### I9 — Relógio divergente

- `reviewedAt`, `lastActive` e `at` são **tempos de ação do cliente**. O merge os trata como ordem lógica, não como verdade física.
- O merge é determinístico mesmo com relógios divergentes: a mesma dupla de snapshots sempre converge para o mesmo resultado.
- O merge **não** garante que a ordem real de duas ações em dispositivos com relógios diferentes seja respeitada. Um relógio adiantado pode fazer uma ação antiga vencer.
- Mitigação mínima: usar `reviewedAt`/inferência por cartão, em vez de `lastActive`, para que uma atividade não relacionada não decida cartões. Isso resolve o caso C3/C4 da auditoria, mas não elimina skew entre duas revisões do mesmo cartão.
- Garantia forte exigiria timestamp do servidor por ação + log append-only; fica fora da 4D.2.
- `updated_at` do banco deve ser gerado no servidor (`now()`), não pelo cliente, para auditoria. Ele não é usado como token de versão.

### I10 — Retentativas idempotentes

- O RPC recebe o token `sync_id` lido e só aplica se o token atual for igual.
- Se o response se perder depois de aplicar, o retry com o token antigo recebe conflito com o documento atual.
- Se o documento atual for semanticamente igual ao candidato, o cliente considera sucesso **sem** nova escrita e **sem** trocar o token outra vez.
- Um conflito não é erro fatal: o cliente faz merge com o remoto retornado e tenta de novo, com limite.
- O merge é idempotente; reaplicar o mesmo snapshot não duplica histórico nem altera scores.

### I11 — Offline e reconexão

- A gravação local acontece primeiro e é a fonte de verdade imediata.
- Falha remota mantém o status `offline` e não anuncia sincronização.
- Ao reconectar, a próxima gravação ou carga faz merge com o remoto **antes** de substituir. Nunca enviar o snapshot local cego.
- O cache local da conta deve ser atualizado com o resultado do merge remoto quando possível; se não for, o próximo load remoto corrige.
- Nenhuma ação confirmada localmente pode ser descartada por uma falha de rede.
- Não há background sync nesta fase; a retomada é por ação do usuário, load ou reload.

### I12 — Migração de convidado

- O convidado é mesclado com a conta usando as mesmas regras I1–I11.
- O marcador `kbr:migrated:<uuid>:v1` só é gravado depois de o remoto confirmar a gravação.
- Se o marcador falhar, o próximo login repete o merge; ele precisa ser idempotente.
- A origem (`kbr:v1`) nunca é apagada.
- Se o snapshot do convidado mudar depois, ele é migrado de novo; cartões antigos não podem vencer revisões novas por causa de `lastActive`.
- O marcador é por usuário. O mesmo convidado em um navegador compartilhado pode ser migrado para mais de uma conta; isso é um comportamento de produto/privacidade documentado, não uma perda de dados.

### I13 — Conexão entre abas

- Duas abas do mesmo navegador são duas sessões concorrentes. O merge e o CAS precisam proteger contra elas.
- O ideal é ouvir `storage`/`BroadcastChannel` e recarregar/mergear; se não for implementado na 4D.2, o CAS ainda impede perda remota, mas a aba pode exibir estado velho até o próximo load.
- Nenhuma aba pode sobrescrever o remoto sem CAS.

### I14 — Metadados não autoritativos

- `streak`: legado, não é mantido pelo código atual. O merge usa `max` apenas para não regredir um valor antigo; o painel deriva sequência do histórico.
- `dailyGoal`: escolher o valor do lado com `lastActive` mais recente; no empate, o maior. Não é um dado de aprendizado crítico.
- `lastActive`: maior instante válido; no empate, representação canônica. Não decide cartões.
- `v`: sempre `1`; documentos `v: 0` são migrados na carga local antes do merge. O banco rejeita `v != 1`.

## 4. Algoritmo de referência

```ts
function mergeProgress(a: Progress, b: Progress): Progress {
  const lessons = mergeLessons(a.lessons, b.lessons);
  const cards = mergeCards(a.cards, b.cards);
  const history = mergeHistory(a.history, b.history);
  const lastActive = laterDate(a.lastActive, b.lastActive);
  const dailyGoal = chooseDailyGoal(a, b, lastActive);
  return { v: 1, lessons, cards, history, streak: Math.max(a.streak, b.streak), dailyGoal, lastActive };
}
```

`mergeCards`:

```ts
for (const id of union(keys(a), keys(b))) {
  const left = a[id];
  const right = b[id];
  if (!left) result[id] = right;
  else if (!right) result[id] = left;
  else result[id] = newerCard(left, right); // stamp + desempate I7
}
```

`mergeHistory`:

```ts
const byId = new Map<string, Attempt>();
for (const attempt of [...a.history, ...b.history]) {
  const key = attempt.id ?? `${attempt.exerciseId}\0${attempt.at}\0${attempt.correct}`;
  const existing = byId.get(key);
  if (!existing) byId.set(key, attempt);
  else byId.set(key, canonicalAttempt(existing, attempt)); // determinístico
}
return [...byId.values()].sort(compareAttempt);
```

`newerCard` nunca usa `lastActive` do documento. `laterDate` ignora datas inválidas (que `isProgress` já rejeitou).

## 5. Matriz de testes

| Invariante | Teste |
|---|---|
| I1/I2/I3 | `tests/sync-concurrency.test.ts` — lições e checkpoint |
| I4/I5 | união, dedup, idempotência, repetição legítima |
| I6/I7 | cartão mais novo vence; empate determinístico; `due` isolado não vence |
| I8 | duas revisões concorrentes; histórico preservado; limitação documentada |
| I9 | skew não deixa atividade não relacionada decidir cartão |
| I10 | retry com mesmo token; conflito; igualdade semântica |
| I11 | offline → reconexão; sem perda local; status |
| I12 | convidado + conta + remoto; marcador; retry |
| I13 | duas abas/duas sessões com CAS |
| I14 | `streak`/`dailyGoal`/`lastActive` determinísticos |
| RPC/RLS | pgTAP local (não disponível neste ambiente) |

## 6. Limitações do `Progress` v1 que o merge não pode eliminar

1. **Sem base por ação de cartão:** não é possível compor duas revisões concorrentes do mesmo cartão na ordem correta. O merge escolhe a mais nova.
2. **Sem timestamp do servidor por ação:** com relógios divergentes, a ordem real pode ser diferente da ordem lógica. O resultado é determinístico, não fisicamente correto.
3. **Sem ID de tentativa:** a tupla `(exerciseId, at, correct)` é a única identidade; duas tentativas iguais no mesmo milissegundo colapsam.
4. **Sem tombstones:** não há como distinguir "cartão removido" de "cartão nunca existiu". O merge nunca remove cartões; remoção/exclusão não é uma operação suportada.
5. **Sem event log:** não há reconstrução completa do passado; o estado atual é a verdade.
6. **Histórico ilimitado:** o merge não trunca; o custo cresce com o uso.

Para garantir composição exata de revisões concorrentes e ordem física sob skew, seria necessário um log append-only de ações com ID idempotente e timestamp do servidor (event sourcing parcial ou total). Isso é uma evolução maior, avaliada em `implementation-plan.md`, e não deve ser simulada com `Math.max` nem com "merge mais recente" apresentado como se fosse composição.

## 7. Compatibilidade

- Registros antigos sem `reviewedAt` e sem `Attempt.id` continuam válidos.
- `reviewedAt` é aditivo e opcional; `isProgress` deve aceitá-lo apenas se for uma data válida quando presente.
- `Attempt.id` é aditivo e opcional; o fallback por tupla mantém registros antigos.
- Nenhum campo existente muda de tipo ou significado.
- Nenhum reset, migração destrutiva ou reescrita em massa é necessária.
