# Vocabulário — comportamento da revisão e Leitner

Sem algoritmo novo: `lib/vocabulary/state.ts` chama `leitner.review` (intervalos 1, 2, 4, 8, 16 dias).

| Resultado | Quando | Efeito no cartão `v:<id>` |
|---|---|---|
| `correct` | acerto **sem** tradução aberta e **sem** pista (ou "Lembrei" no cartão) | `leitner.review(…, "correct")`: avança a caixa. |
| `assisted` | acerto depois de abrir a tradução (mesmo que fechada) ou usar a pista | **mesma caixa**, reagendada com o intervalo dessa caixa (implementado como `review` de um estado uma caixa abaixo). Na caixa 1 permanece 1. |
| `again` | erro (ou "Não lembrei") | `leitner.review(…, "again")`: caixa 1, revisão em 1 dia. |

Regra transparente: a ajuda não é tratada como recordação plena e também não pune. A interface avisa antes de responder e depois do resultado.

- **Só a primeira resposta** de um cartão na sessão reagenda. "Tentar de novo" é prática extra e avisa isso.
- Cada `reviewedAt` é gravado com o `now` da revisão; datas são determinísticas (`now` injetado).
- Fila diária (`buildVocabQueue`): salvos e vencidos, do mais atrasado ao mais novo, desempate por id, **uma vez por item**, até 10 por sessão. Item com frase → prática contextual; sem frase (ou "só cartões") → cartão simples.
- **Retomar** sessão interrompida = reconstruir a fila: o que já foi respondido foi reagendado e sai dela. Não há estado de sessão a persistir.
- Contextos múltiplos (contextual × cartão) compartilham **um** cartão por palavra: não há duplicação nem agendas conflitantes.
- Não existe mecânica de sequência punitiva nem estatística inventada; os números da página são contagens reais de `Progress.cards`.
- Consolidada = caixa ≥ 4.
- O SRS do Hangul não é alterado (chaves `h:*`); o painel e a fila do Hangul ignoram `v:*`.
