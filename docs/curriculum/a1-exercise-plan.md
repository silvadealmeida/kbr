# A1 — estratégia de exercícios e avaliação

## 1. Capacidades existentes

| Tipo | Estado | Uso A1 adequado | Limite |
|---|---|---|---|
| `mcq` | implementado | compreensão de leitura, forma/sentido, registro e gramática em contexto | alternativas plausíveis; embaralhamento só na apresentação |
| `cloze` | implementado | forma lexical ou gramatical com resposta curta e conservadora | não serve para produção aberta; aceita apenas variantes registradas |
| `listen` | implementado | ditado curto, informação concreta e fala controlada | voz do sistema/fallback; não é gravação nativa |
| `translate` | implementado | microtradução pt↔ko de padrão já ensinado | não cobre traduções livres equivalentes sem cadastro |
| `reading` | implementado | texto curto + escolha ou autoavaliação | autoavaliação não entra na nota |
| `audio-to-char` / `char-to-audio` | implementados | revisão pontual de forma/som | foco original é Hangul; uso lexical exige desenho cuidadoso |
| `minimal-pair` | implementado | diagnóstico fonológico opcional | não avalia pronúncia produzida |
| `build-syllable` | implementado | remediação de Hangul | não é objetivo central do A1 |
| prática contextual 9A-V | implementada fora de `ExerciseSpec` | recordação lexical em frase, tradução e áudio | agenda só palavra salva; não conta conclusão da lição hoje |
| `order-words` | planejado | ordem de palavras e partículas | não implementar na 9A |
| `short-answer` | planejado | escrita curta com variantes explícitas | produção livre deve ser rubrica humana/autoavaliação |
| `dialogue-choice` | planejado | coerência pragmática de turnos | não implementar na 9A |

A 9B implementou `a1-l01` somente com `mcq`, `cloze`, `listen` e `translate`: 10 itens automáticos, 5 guiados e 5 independentes, nenhum tipo planejado. A prática contextual 9A-V existe separadamente em `/vocabulario`, não conta a nota da lição e não cria cartões sem ação do aluno.

## 2. Mapeamento por objetivo

- **Recordação lexical:** prática contextual como principal; `cloze` e `translate` como variação; flashcard como fallback sem frase.
- **Gramática em contexto:** `cloze`, `mcq`, `translate`; futuro `order-words` após implementação determinística.
- **Escuta:** `listen`, `audio-to-char` quando apropriado e perguntas `mcq`/`reading` sobre texto ouvido. Sempre oferecer repetição e fallback honesto.
- **Diálogo:** hoje, `reading`/`mcq` sobre turnos e `listen` para informação; `dialogue-choice` é a lacuna principal.
- **Leitura:** `reading`, `mcq`, contextual com alvo lexical.
- **Ordem de palavras:** `cloze` e tradução controlada cobrem parcialmente; `order-words` falta.
- **Escrita:** `translate`/`cloze` cobrem produção restrita; `short-answer` falta; parágrafo exige rubrica humana/autoavaliação.
- **Fala:** ensaio opcional com roteiro e voz do sistema. `/fala` permanece experimental, sem nota, progresso ou requisito.

## 3. Anatomia de uma lição futura

1. **Encontro:** diálogo original curto e objetivo em pt-BR.
2. **Compreensão:** 2–3 itens de leitura/escuta sobre intenção e dados concretos.
3. **Descoberta guiada:** exemplos antes da explicação gramatical.
4. **Vocabulário contextual:** 6–10 recuperações com dica pt-BR e feedback completo.
5. **Forma em contexto:** 4–6 `cloze`/`mcq`/`translate`.
6. **Transferência:** microtarefa comunicativa do cenário.
7. **Revisão:** 2–4 itens de dependências anteriores.
8. **Saída:** resumo, tradução, áudio, palavras da lição e ação explícita “Salvar”.

Uma tentativa ativa mantém ordem de alternativas; nova tentativa renova a ordem. Correção usa ID/valor, nunca posição.

## 4. Avaliação

### Lições

- 10 itens automáticos avaliados, mínimo 8;
- item opcional de produção/autoavaliação fora do denominador;
- critério comunicativo explícito por lição;
- ajuda lexical impacta só o Leitner, não inventa outra nota de curso;
- maior score permanece no `Progress.lessons` quando o player existir.

### Checkpoints 1–7

- 25 itens, mínimo 20;
- equilíbrio recomendado: 6 escuta, 6 leitura, 8 vocabulário/gramática, 5 intenção/registro;
- tarefa funcional adicional por rubrica, sem nota automática se aberta;
- dependem das cinco lições do módulo e checkpoints anteriores.

### Checkpoint 8

- 40 itens, mínimo 32, distribuição em `a1-syllabus.md`;
- seis tarefas funcionais; sucesso humano/autoavaliado em cinco;
- conclusão interna somente com todos os 48 passos implementados/concluídos;
- nenhum resultado equivale a certificado CEFR ou TOPIK.

## 5. Capacidades ausentes e decisão 9A

Faltam três capacidades relevantes: ordenar palavras, resposta curta e escolha de turno. Elas já constam como planejadas no registro de capacidades. A 9A **não** estende `ExerciseSpec`, `checkAnswer` ou o player. Até implementação futura:

- lições usam tipos existentes para checagem automática;
- objetivos de produção aberta usam rubrica/autoavaliação explícita;
- nenhum passo futuro pode declarar um tipo planejado como requisito automático;
- fala não pode depender de microfone, reconhecimento ou serviço remoto.

## 6. Validação estrutural × linguística

Automação pode verificar: IDs, tipos conhecidos, status implementado/planejado, contagem, critérios, referências, pré-requisitos, presença de tradução e lacuna não ambígua.

Automação não pode certificar: naturalidade, pragmática, prosódia, nível, verdade cultural, equivalência total de tradução ou todas as respostas aceitáveis. Esses itens exigem revisão humana registrada; `reviewed` sem `reviewedBy`/`reviewedAt` é inválido.
