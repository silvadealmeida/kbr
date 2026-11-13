# B2 — plano de vocabulário

**Decisão:** **8 identidades lexicais novas por lição × 40 lições = 320 identidades novas**, cada uma com **uma frase contextual original**. A carga é igual à do B1, mas o texto-âncora e a produção são maiores. Não há uma lista oficial de “vocabulário B2” do NIKL/CEFR usada como recorte; o alvo é uma decisão editorial do KBR, baseada na carga do B1 e na necessidade de sustentar textos abstratos.

## 1. Critérios de seleção

Cada item novo precisa:

1. aparecer no texto-âncora, no diálogo ou em uma leitura avaliada da lição;
2. ter forma de dicionário estável e sentido adequado ao contexto;
3. acrescentar uma identidade lexical ainda não registrada no curso (Hangul/A1/A2/B1/B2);
4. ser reutilizável em pelo menos um contexto posterior;
5. não depender de uma forma gramatical ainda não ensinada para ser compreendido;
6. não ser um sinônimo ornamental de um item já ensinado sem necessidade comunicativa.

A seleção prioriza vocabulário de argumentação, mídia, trabalho, negociação, hipótese e interpretação. Não força listas temáticas artificiais nem quantidades por classe gramatical.

## 2. Identidade canônica e homógrafos

- ID: `ko:<forma>`; homógrafos novos com sentidos separados usam `ko:<forma>#<sentido>`.
- Nenhum ID existente é renomeado.
- Todas as entradas da mesma forma precisam de `sense` único se forem separadas.
- Sentidos amplos já publicados permanecem com `contextMeaning` na frase, sem divisão retroativa.
- A forma de dicionário (`ko`) e a forma de superfície (`target`) são distintas: verbos e adjetivos podem ter `target` conjugado na frase.
- `pos` usa `substantivo`, `verbo`, `adjetivo`, `advérbio`, `pronome`, `interjeição` ou `numeral`. O valor `adjetivo` foi acrescentado ao tipo compartilhado para o B2; nenhum item existente foi reclassificado.

## 3. Frase contextual

Cada identidade nova tem uma `VocabSentence` com:

- `ko`: frase coreana original, com o alvo uma única vez, no início de uma palavra;
- `pt`: tradução integral em pt-BR;
- `target`: forma exata ocultada;
- `contextMeaning`: dica de sentido em português;
- `vocabId`: referência ao cartão canônico;
- `review`: `in-review`.

O validador B2 acrescenta `targetBoundaryIssue` para substantivos: o alvo não pode estar embutido em uma palavra maior (`감기약`, `해외여행`). Verbos e adjetivos são verificados pela posição e pela unicidade.

Não há áudio estático novo. `audioText` é a própria forma coreana e o navegador usa TTS `ko-KR`.

## 4. Reuso

Cada lição declara **3 identidades anteriores** em `reusedIds`, retomadas no texto coreano da lição. O total é de **120 referências de reuso** (56 identidades distintas, porque algumas formas são retomadas em mais de uma lição), sem duplicar cartões. Reusos do próprio B2 só podem apontar para lições anteriores; reusos de A1/A2/B1/Hangul são permitidos quando a forma e o sentido coincidem.

A auditoria `findUnusedReusedRefs` verifica se a forma reaparece no texto da lição (incluindo o texto-âncora). A dívida histórica de A1/A2/B1 permanece congelada; o B2 deve entrar com zero referências sem superfície.

## 5. Distribuição por módulo

| Módulo | Lições | Identidades novas | Reusos declarados |
|---|---|---|---|
| 1 — Narrativas e perspectivas | b2-l01–b2-l05 | 40 | 15 |
| 2 — Argumentação | b2-l06–b2-l10 | 40 | 15 |
| 3 — Sociedade e relações | b2-l11–b2-l15 | 40 | 15 |
| 4 — Trabalho e tecnologia | b2-l16–b2-l20 | 40 | 15 |
| 5 — Mídia e informação | b2-l21–b2-l25 | 40 | 15 |
| 6 — Negociação | b2-l26–b2-l30 | 40 | 15 |
| 7 — Hipóteses e nuances | b2-l31–b2-l35 | 40 | 15 |
| 8 — Integração | b2-l36–b2-l40 | 40 | 15 |
| **Total** | **40** | **320** | **120** |

## 6. Integração com o SRS existente

- O B2 não cria agenda paralela.
- O aluno salva uma palavra explicitamente; o cartão vira `Progress.cards["v:<id>"]`.
- Nenhum item novo é salvo automaticamente.
- A revisão contextual continua usando a frase, a dica e a tradução integral.
- Nenhuma mudança em `Progress` v1, CAS, SQL, RLS ou migração.
- Nenhum cartão do Hangul/A1/A2/B1 é renomeado ou apagado.

## 7. Limites

A planilha não prova naturalidade, colocação, registro ou adequação ao nível. As glosas em pt-BR são autorais e não foram validadas por falante nativo. Não há áudio gravado, MP3 novo ou aprovação de pronúncia. A contagem de 320 é uma decisão editorial interna, não um padrão oficial.
