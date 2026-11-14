# Revisão editorial final assistida por IA — Hangul–C2

**Data:** 14 de novembro de 2026
**Estado:** concluída e aceita pelo responsável pelo projeto.
**Natureza:** revisão editorial final assistida por IA, aceita pelo responsável pelo projeto. **Não é revisão por falante nativo e não é parecer jurídico.**

## Escopo e evidências

- Consolidação do corpus Hangul, A1, A2, B1, B2, C1 e C2 com os registros das auditorias 13C e 14, seus testes de regressão e o ledger `docs/audits/phase-13/findings.json`.
- Leitura das 237 correções de alternativas da Fase 14 com pergunta, texto-base, gabarito e distratores: A1 11, A2 34, B1 32, B2 57, C1 31 e C2 72. O teste `tests/content/phase14-fairness.test.ts` cobre 1.381 itens e mantém o limite de comprimento; a inspeção editorial verificou plausibilidade e erro pelo conteúdo, não apenas a razão de tamanho.
- Revisão dos achados ainda classificados como `requires-native-review`/`in-review`, incluindo o risco sistêmico F13-040, além das correções verificadas de A1–C2 e das regressões C2 da Fase 14. O ledger 13C termina com 32 achados `fixed`, 0 `deferred` e 1 risco sistêmico de revisão humana; o responsável aceita esse risco residual sem torná-lo bloqueio.

## Correções concretas desta revisão

1. **Hangul `h05-e10`:** substituído o distrator `버리`, que usa ㅂ ainda não apresentado, por `다리`, formada apenas por jamo ensinados até h05. Regressão em `tests/content/hangul.test.ts`.
2. **Hangul `h13-e02`:** a pergunta pedia uma sílaba com glide, mas o gabarito era `고`, sem glide. O enunciado agora pede a sílaba sem glide; tags e cartões SRS foram alinhados a ㅗ/고. Regressão em `tests/content/hangul.test.ts`.
3. **Hangul `h15`:** `주의` era chamado de exemplo de ㅢ “depois de consoante”, mas ㅢ está em posição não inicial. A introdução e a explicação de `h15-e04` agora descrevem essa condição corretamente. Regressão em `tests/content/hangul.test.ts`.
4. **Hangul `h18`:** “28 finais escritos” confundia as 27 grafias consonantais com as 28 possibilidades de coda quando se inclui a ausência de batchim. Texto e documentação pedagógica foram alinhados; regressão em `tests/content/hangul.test.ts`.
5. **A2 `a2-l03-e04`:** o texto afirmava diferenças de altura e personalidade, mas a pergunta genérica “No que os irmãos são diferentes?” oferecia só personalidade como correta. A pergunta agora delimita: “Além da diferença de altura, no que os irmãos são diferentes?”. Regressão em `tests/content/a2-curriculum.test.ts`.
6. **A2 `a2-l23-e05`:** a instrução pedia registro formal, mas `acceptedAnswers` aceitava `있어요` em 해요체. A variante informal foi removida. Regressão em `tests/content/a2-curriculum.test.ts`.
7. **A2 `a2-l30`:** o título/FORM ensinava passado `-았/었고`, enquanto exemplos e cloze praticavam `-고` com tempo marcado no predicado final. Título, forma e explicação agora correspondem aos exemplos e ao item. Regressão em `tests/content/a2-curriculum.test.ts`.
8. **B2 `b2-l35`:** diálogo, leitura-âncora e exercício repetiam `체했지만`, forma incorreta para “fingiu que”. Os três usos agora dizem `없는 척했지만`, coerente com `-ㄴ/는 척하다`. Regressão em `tests/b2-lesson.test.ts`; o MP3 correspondente foi regenerado pelo pipeline documentado.
9. **A2 `a2-l14-d3`:** a tradução acrescentava “demais” a `조금 시끄러워서`, contradizendo “um pouco”. A tradução foi alinhada ao coreano. Regressão em `tests/content/a2-curriculum.test.ts`.
10. **A1 `a1-l36-d4` e nota `g:a1-l36-repair`:** “Carne de porco não pode” soava como proibição geral, embora o falante recusasse por alergia pessoal. A tradução agora explicita “Não posso comer carne de porco”. Regressão em `tests/content/a1-curriculum.test.ts`.

Além das correções editoriais, a landing e o rodapé ainda diziam que A2–C2 estavam planejados. O texto público agora informa corretamente que Hangul e A1–C2 estão disponíveis e que a conclusão não certifica CEFR/TOPIK. Regressão em `tests/site.test.ts`.

As 237 escolhas corrigidas na Fase 14 foram lidas com seus enunciados, textos-base, gabaritos e alternativas. As alternativas foram mantidas quando eram plausíveis e claramente incorretas pelo conteúdo; não foram alteradas por preferência de estilo. Também foi confirmada na fonte a correção já existente de `h21-e11` (ㅇ final de `강` permanece como [ŋ]); a alegação antiga de que o item negava a coda está superada.

A continuidade de Minsu (“estudante” em A1 L01, “funcionário” em A1 L02), registrada em auditoria anterior, também foi conferida. As ocupações não são mutuamente exclusivas e os textos não afirmam que ele deixou de estudar; não há erro concreto que justifique reescrita.

## Decisão editorial e limites

- A revisão editorial assistida por IA foi aceita pelo responsável como conclusão editorial do produto. Isso não é apresentado como validação nativa.
- Os metadados `in-review` permanecem sem alteração para não sugerir revisão por falante nativo. Nenhum item é marcado `reviewed` com revisor fictício.
- Naturalidade, registro, nuance cultural, tradução, validade pedagógica e qualidade do áudio ainda podem ter riscos. Não houve falante nativo, teste com aprendizes, avaliação psicométrica ou revisão profissional jurídica nesta execução.
- O responsável aceita esses riscos residuais como não bloqueantes para o release público. Nenhum nível ou curso é descrito como certificado ou validado por CEFR/TOPIK.

## Regressões relacionadas

- `tests/content/phase14-fairness.test.ts`
- `tests/content/c2-curriculum.test.ts`
- `tests/content/a2-curriculum.test.ts`
- `tests/content/a1-curriculum.test.ts`
- `tests/b2-lesson.test.ts`
- `tests/content/hangul.test.ts`
- `tests/site.test.ts`
