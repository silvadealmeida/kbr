# A2 — plano e contagens de exercícios

## 1. Tipos usados

O A2 usa somente tipos já implementados e corrigidos deterministicamente:

| Tipo | Uso no A2 | Correção |
|---|---|---|
| `mcq` | escolha de forma, função ou interpretação | alternativa correta única |
| `cloze` | completar partícula, terminação ou palavra | texto normalizado + variantes registradas |
| `listen` | transcrever fala curta | texto normalizado + variantes |
| `translate` | traduzir pt→ko ou ko→pt | texto normalizado + variantes |
| `reading` | compreender texto curto | alternativa correta única |

Não foram adicionados `dialogue-choice`, `order-words`, `short-answer` nem outro tipo planejado. A fala espontânea e a escrita aberta não entram na nota automática.

## 2. Distribuição nas lições

Cada lição tem **10 itens**: 5 de prática guiada e 5 de prática independente. A distribuição editorial é **2 `mcq`, 2 `cloze`, 2 `listen`, 2 `translate` e 2 `reading`**, totalizando:

- 40 lições × 10 = **400 itens de lição**;
- 80 `mcq`, 80 `cloze`, 80 `listen`, 80 `translate`, 80 `reading`;
- mínimo de **8/10** por lição.

A ordem dentro da lição alterna compreensão, forma e produção; a etapa guiada vem depois das notas gramaticais e antes da independente.

## 3. Distribuição nos checkpoints

| Checkpoint | Itens | Mínimo | Escuta | Leitura | Gramática/vocabulário | Produção controlada |
|---|---:|---:|---:|---:|---:|---:|
| a2-c01 | 25 | 20 | 6 | 6 | 8 | 5 |
| a2-c02 | 25 | 20 | 6 | 6 | 8 | 5 |
| a2-c03 | 25 | 20 | 6 | 6 | 8 | 5 |
| a2-c04 | 25 | 20 | 6 | 6 | 8 | 5 |
| a2-c05 | 25 | 20 | 6 | 6 | 8 | 5 |
| a2-c06 | 25 | 20 | 6 | 6 | 8 | 5 |
| a2-c07 | 25 | 20 | 6 | 6 | 8 | 5 |
| a2-c08 | 40 | 32 | 10 | 10 | 10 | 10 |
| **Total** | **215** | — | **52** | **52** | **66** | **45** |

A soma de tipos nos checkpoints é: 52 `listen`, 52 `reading`, 21 `mcq`, 45 `cloze`, 45 `translate`. Gramática/vocabulário = `mcq` + `cloze` = 66; produção controlada = `translate` = 45.

## 4. Total do curso

- **615 itens avaliados** = 400 de lição + 215 de checkpoint.
- **132 `listen`**, **132 `reading`**, **101 `mcq`**, **125 `cloze`**, **125 `translate`**.
- Gabaritos declarados em cada dataset; a suíte `tests/a2-lesson.test.ts` verifica que todo gabarito é aceito e que a correção determinística funciona.

## 5. Critérios de aprovação

- Lição: 8/10 (80%).
- Checkpoints 1–7: 20/25 (80%).
- `a2-c08`: 32/40 (80%).
- Repetir uma tentativa nunca reduz a conclusão nem o maior score.
- Um checkpoint só abre com as cinco lições do módulo e todos os checkpoints anteriores.
- O A2 só é concluído com os 48 passos.

## 6. Qualidade e limites

- Cada item tem explicação em português e usa conteúdo já ensinado.
- Itens de leitura têm texto curto próprio; não são perguntas sobre um texto ausente.
- Itens de escuta têm `audioText` e fallback de voz do sistema.
- A dificuldade não foi calibrada psicometricamente; a distribuição é editorial.
- A revisão nativa dos gabaritos, partículas e traduções continua pendente.
- Não há alegação de validade de teste nem de cobertura total de CEFR/TOPIK.
