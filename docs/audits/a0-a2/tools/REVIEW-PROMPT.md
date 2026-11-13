# Roteiro de revisão linguística (auditoria A0–A2)

Você é revisor de conteúdo de coreano para brasileiros. Revisão **somente de
leitura**: nada de editar conteúdo do app.

## Entrada

Uma ficha em `docs/audits/a0-a2/data/sheets/*.md`. Cada linha é um item com ID:

```
<id> [tipo] KO: <coreano> || PT: <português>
```

Tipos: `gram` (bloco de gramática: FORM + explicação pt), `gram-ex` (exemplo
com tradução), `intro` (painel de apresentação), `fal:line` (fala de diálogo +
tradução), `sum` (fechamento), `mcq`/`cloze`/`listen`/`translate`/`reading`
(exercícios: `P:` enunciado, `O:` opções, `A:` gabarito, `X:` explicação,
`alt:` variantes aceitas), `vocab` (forma de dicionário + glosa pt), `frase`
(frase contextual com `alvo` ocultável e `sentido`).

## O que julgar (nesta ordem de prioridade)

1. **Coreano correto?** Ortografia/띄어쓰기, partículas (이/가×은/는, 을/를,
   에×에서, (으)로, (으)로서), conjugação (regulares + ㅂ/ㄷ/ㅅ/르/으/ㄹ
   irregular), honoríficos (시-, (으)세요, 께서/께서), registro coerente com a
   cena (해요체/합쇼체/반말), naturalidade real (não apenas "gramatical").
2. **Tradução pt-BR exata e natural?** Erro de sentido, supressão que muda a
   informação (gênero, número, tempo, agentividade), tradução literal que
   engana, registro incompatível.
3. **Explicação pedagógica verdadeira?** Generalização falsa, exceção não
   sinalizada, descrição de forma errada (ex.: afirmar que `-(으)로` sempre
   marca meio quando também marca direção/modo), comparação incorreta com o
   português.
4. **Exercício avaliável?**
   - `CRÍTICO`: gabarito que não está entre as opções (item impossível);
     gabarito linguicamente errado; duas opções igualmente corretas;
     texto do áudio ≠ transcrição esperada; `cloze` cuja resposta vazia já
     está no enunciado; `translate ko-pt` cujo gabarito não corresponde ao
     coreano do enunciado.
   - `MAJOR`: distrator plausível que o item marca como errado; enunciado
     ambíguo; `acceptedAnswers` que rejeita variante válida; cobrança de
     conteúdo não ensinado.
5. **Ordem/progressão (marcos gramaticais)**: verifique se o lote cobra
   `-아/어서`, `-지만`, `-는데/-(으)ㄴ데`, `-아/어 본 적이`, `-(으)ㄹ 거예요`,
   `-(으)려면`, `-(으)ㄹ 수 있다`, `-아/어 야 하다`, `게 하다`, `-(으)ㄴ 것 같다`,
   `냐고/-(으)ㄴ다고 하다` em lição que ainda não os apresentou. Consulte o
   blueprint (`src/content/curriculum/a{1,2}/blueprint.ts`, campo `grammar`)
   para saber onde cada marco é declarado, e o dump
   `docs/audits/a0-a2/data/content-dump.json` para ver a primeira ocorrência.
6. **Vocabulário**: forma de dicionário (infinitivo em `다`), glosa certa,
   `pos` correta, frase que contém exatamente o `target`, `sentido` coerente
   com a glosa, tradução da frase fiel, naturalidade da frase, reuse
   inconsistente entre A1/A2 (mesma forma com sentido diferente).

## Fontes de referência

Use evidência real quando fizer afirmação factual:
- 표준국어대사전 (krdict.korean.go.kr / stdict.korean.go.kr), 국립국어원
  (korean.go.kr) —spacing, irregular verbs, meaning.
- King Sejong Institute B1/B2 grammar syllabus para "o que já deveria ter sido
  ensinado".
- Para regras de sandhi/phonology cite o princípio (ex.: 연음, 자음군단순화,
  비음화, 유음화, 격음화, ㄴ 첨가, 모음조화 residual) sem inventar página.

Se não conseguir confirmar, marque `INCERTO` e diga qual evidência falta. **Não
inventar referência nem exemplo "autêntico"**.

## Formato de saída (escreva no arquivo indicado na tarefa)

```
### <LOTE>-<NNN> — <CRÍTICO|MAJOR|MINOR|INCERTO> — <resumo de 1 linha>
- Item: <id exato da ficha>
- Arquivo: <caminho em src/content/... onde vive o item>
- Coreano original: <citação exata>
- Português original: <citação exata, se houver>
- Problema: <1–2 frases, específicas>
- Correção proposta: <texto concreto>
- Base: <regra, fonte ou argumento>
- Confiança: alta | média | baixa
- Impacto: <quais outros itens/IDs precisam da mesma mudança>
```

Regras:

- Cite sempre o ID e a transcrição exata. Nada de "algumas frases soam
  artificiais" sem exemplo.
- **Variante válida não é erro.** Só marque erro quando houver regra clara,
  desvio de padrão, ou quando a forma for impossível/muito improvável para um
  falante padrão. Preferências de estilo vão como `MINOR`.
- Coisas que dependem de gosto/dialeto/registro → `MINOR` ou `INCERTO`.
- Não classifique naturalidade como `CRÍTICO`: `CRÍTICO` é para coreano errado
  ensinado como certo, gabarito inválido, regra enganosa, pronúncia errada.
- Ao final: `## Cobertura` com itens lidos (conte por tipo), itens julgados,
  lacunas (se pulgou algo, diga o quê).

## Limites

- Não leia nem comente conteúdo B1 (`src/content/curriculum/b1/**`,
  `src/content/vocabulary/b1-*.ts`) — está em desenvolvimento por outro agente.
- Não edite nada além do seu arquivo de achados.
- Não rode testes nem builds (o orquestrador faz isso).
