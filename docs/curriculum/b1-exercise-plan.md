# B1 — plano e contagens de exercícios

## Tipos

Somente tipos implementados: `mcq`, `cloze`, `listen`, `translate` e `reading`. Nenhum tipo novo foi introduzido; `short-answer`, `order-words` e escrita conectada automática não foram usados no motor determinístico.

## Lições

Cada uma das 40 lições tem **10 itens**: 5 guiados + 5 independentes, com 2 de cada tipo. Total: **400 itens**, 80 por tipo. Mínimo de aprovação: **8/10**.

## Checkpoints

| Checkpoint | Itens | Mínimo | Escuta | Leitura | Gramática/vocab | Produção controlada |
|---|---:|---:|---:|---:|---:|---:|
| b1-c01–c07 (cada) | 25 | 20 | 6 | 6 | 8 | 5 |
| b1-c08 | 40 | 32 | 10 | 10 | 10 | 10 |
| **Total** | **215** | — | **52** | **52** | **66** | **45** |

Totais por tipo nos checkpoints: **52 `listen`**, **52 `reading`**, **22 `mcq`**, **44 `cloze`**, **45 `translate`**.

## Total do curso

- **615 itens** = 400 de lição + 215 de checkpoint.
- **132 `listen`**, **132 `reading`**, **102 `mcq`**, **124 `cloze`**, **125 `translate`**.
- `tests/b1-lesson.test.ts` verifica contagens, etapas, gabaritos e critérios.

## Produção independente

Cada lição tem uma tarefa opcional com:
- prompt em português e coreano;
- 3 orientações;
- 4 critérios de rubrica;
- extensão sugerida;
- campo de texto local.

O texto **não é corrigido automaticamente**, não é enviado, não é persistido e não entra no denominador. A conclusão da lição depende apenas dos 10 itens determinísticos. Checkpoints também podem exibir rubrica, mas a nota não simula avaliação de fala/escrita aberta.

## Critérios

- Lição: 8/10.
- Checkpoints 1–7: 20/25.
- `b1-c08`: 32/40.
- Repetição preserva conclusão e maior score.
- Checkpoint exige cinco lições do módulo + checkpoints anteriores.
- Curso conclui com 48/48.

## Limites

A dificuldade não foi calibrada psicometricamente. A produção aberta depende de autoavaliação ou revisão humana. Não houve revisão por falante nativo dos gabaritos, partículas e traduções; o risco residual foi aceito e não bloqueia o release.
