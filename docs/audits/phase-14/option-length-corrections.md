# Correção das pistas de comprimento (F13-012)

## 1. O problema

A auditoria 13C detectou que, em itens de múltipla escolha e leitura, o gabarito podia ser identificado por ser muito mais longo que os distratores. O censo usava o comprimento bruto da string (incluindo espaços e pontuação) e o limite de **1,7×** o maior distrator.

O `findings.json` registrava 7 correções de maior risco e 230 itens adiados. Ao refazer o censo no estado real da branch `phase-13/c1-c2-audit`, o número era **237**: o conteúdo mudou desde o snapshot e a dívida precisava ser medida de novo, não presumida.

## 2. Método

Para cada item `mcq` ou `reading` com `mode: "mcq"` de A1–C2:

1. o gabarito foi localizado por `correctAnswer` ou `correctOptionId`;
2. o maior distrator foi medido pelo mesmo critério da auditoria;
3. itens com razão > 1,7 entraram no lote;
4. o gabarito foi mantido na mesma posição e os distratores foram reescritos com informação plausível, específica e **errada pelo conteúdo** — não foi adicionado texto de enchimento genérico;
5. o item foi recontado até ficar abaixo do limite.

O patch completo está em `data/option-length-corrections.json`. Ele é a lista canônica das 237 opções finais e permite reconstruir a autoria das escolhas. O teste `tests/content/phase14-fairness.test.ts` recalcula o censo em **1.381 itens** de escolha e falha em qualquer regressão acima de 1,7×.

Distribuição dos 237 itens corrigidos:

| Nível | Itens |
|---|---:|
| A1 | 11 |
| A2 | 34 |
| B1 | 32 |
| B2 | 57 |
| C1 | 31 |
| C2 | 72 |
| **Total** | **237** |

## 3. Exemplos

### A1 — `a1-c01-e07`

Antes: `É estudante.` / `É funcionário de empresa.` / `É professor.`  
Depois: `É estudante em uma escola de idiomas.` / `É funcionário de empresa.` / `É professor de coreano em uma escola pública.`

O gabarito continua sendo a ocupação informada pelo texto; os distratores ganharam contexto suficiente para não serem escolhidos apenas por tamanho.

### B1 — `b1-l38-e06`

Antes: `회신 기한` / `제목` / `서명`  
Depois: `회신 기한` / `메일 제목` / `보낸 사람 서명`

O item pergunta qual parte da mensagem indica o prazo; os distratores continuam sendo partes reais de um e-mail, mas não respondem ao prazo.

### C1 — `c1-l39-e01`

Antes: o gabarito era a única alternativa com uma explicação longa; os distratores eram `Trocou o tema do ensaio.` e `Acrescentou uma nova objeção ao texto.`  
Depois: `Trocou o tema do ensaio por outro completamente diferente e mais amplo.` e `Acrescentou uma nova objeção ao texto sem revisar a tese principal.`

A alternativa correta continua sendo a que descreve o estreitamento da tese; as duas erradas continuam erradas por mudarem o tema ou por acrescentarem objeção, não por serem curtas.

### C2 — `c2-l36-e01`

Antes: a pergunta delimitada era muito mais longa que `Por que a juventude sofre com a moradia?` e `Qual é a solução definitiva para a crise habitacional?`.  
Depois: os distratores passaram a incluir `... e quais soluções o governo deveria adotar em todo o país?` e `... nas grandes cidades e como aplicá-la rapidamente?`.

Os distratores continuam amplos demais para um projeto de pesquisa; o gabarito continua sendo o único com objeto, período, casos e tipo de decisão observável.

### C2 — `c2-l18-e06`

Antes: o gabarito nomeava agente e processo; os distratores eram frases curtas de resultado.  
Depois: `A participação da comunidade foi ampliada por meio de oficinas.`, `A equidade foi promovida de forma sustentável no projeto.` e `O projeto contribuiu para o caráter público da iniciativa.`

As três continuam erradas porque não nomeiam quem agiu nem o que foi feito, que é exatamente o critério do item.

## 4. Limite residual

O teste permanente usa o limite documentado de **1,7×**. Permanecem **46 itens** na faixa 1,65–1,70; eles não fazem parte da dívida registrada e muitos são diferenças naturais de uma palavra coreana contra uma glosa portuguesa. Se o produto quiser um limite mais rígido, a decisão deve ser editorial e acompanhada de nova revisão nativa, não de um novo arredondamento automático.
