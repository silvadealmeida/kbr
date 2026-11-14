# B2 — plano de exercícios e avaliação

**Princípio:** o B2 avalia compreensão conectada, interpretação e escolha contextualizada; não apenas reconhecimento de vocabulário isolado. Todos os itens são determinísticos e usam os cinco tipos já implementados. Nenhum motor novo, IA paga, microfone ou correção automática de escrita aberta foi introduzido.

## 1. Distribuição

### Lições (40 × 10 = 400 itens)

| Tipo | Por lição | Total | Uso no B2 |
|---|---:|---:|---|
| `mcq` | 2 | 80 | tese, intenção, classificação, escolha gramatical |
| `cloze` | 2 | 80 | forma ensinada em contexto, partícula e conector |
| `listen` | 2 | 80 | transcrição de frase longa; compreensão de detalhe |
| `translate` | 2 | 80 | ko↔pt com variantes registradas |
| `reading` | 2 | 80 | texto conectado com pergunta de inferência/tese |

Cada lição tem exatamente **5 itens guiados + 5 independentes**, dois de cada tipo. A ordem guiada é `mcq → cloze → listen → reading → translate`; a independente é `mcq → cloze → listen → translate → reading`.

### Checkpoints (7 × 25 + 40 = 215 itens)

| Tipo | c01–c07 (cada) | c08 | Total |
|---|---:|---:|---:|
| `listen` | 6 | 10 | 52 |
| `reading` | 6 | 10 | 52 |
| `cloze` | 5 | 8 | 43 |
| `translate` | 5 | 8 | 43 |
| `mcq` | 3 | 4 | 25 |
| **Total** | **25** | **40** | **215** |

- Checkpoints 1–7: mínimo **20/25** (80%).
- `b2-c08`: mínimo **32/40** (80%).
- Todos os itens de checkpoint são independentes.
- Nenhum item de produção entra no denominador.

## 2. Leitura

- Toda lição tem um **texto-âncora** de três parágrafos, com pelo menos 250 caracteres coreanos (sem espaços) e tradução integral em pt-BR.
- Cada lição tem duas leituras avaliadas com pelo menos 50 caracteres e duas frases coreanas.
- O validador rejeita `reading` sem Hangul, curto demais ou com menos de duas frases. Isso corrige a classe de defeito em que uma leitura era, na prática, uma pergunta em português sem texto coreano.
- As perguntas e alternativas ficam em pt-BR; o texto e a evidência ficam em coreano.
- A leitura avalia tese, detalhe, inferência, fonte, classificação e implicação — não tradução palavra a palavra.

## 3. Escuta

- `audioText` é sempre idêntico à resposta ou a uma variante aceita.
- Todo `listen` pede a **frase completa**; o builder acrescenta a instrução comum quando o enunciado específico não a contém.
- As frases do B2 são mais longas que no B1, mas continuam sendo **uma frase por item**.
- **Limitação declarada:** o motor atual não apresenta um áudio de vários minutos nem permite perguntas sobre um discurso longo. O curso usa diálogos no material de ensino e frases longas na avaliação; não simula uma compreensão extensiva que o motor não oferece.
- O áudio do B2 usa MP3 do corpus estático completo, servido por padrão; `NEXT_PUBLIC_KBR_STATIC_AUDIO=0` é apenas kill switch. O player não usa TTS de navegador.

## 4. Fairness e gabaritos

- Respostas digitadas (`cloze`, `listen`, `translate`) recebem variantes de pontuação final (`.`, `?`, `!`) pelo builder e pelo validador compartilhado.
- Variantes lexicais reais são registradas em `acceptedAnswers`; não se aceita qualquer paráfrase livre.
- `mcq` exige que o gabarito esteja entre as opções; `reading` exige `correctOptionId` existente.
- Não há pontuação por posição; a ordem das alternativas é embaralhada na apresentação e corrigida pelo conteúdo.
- A alomorfia de partícula depois da lacuna é validada (`은/는`, `이/가`, `을/를`, `과/와`, `으로/로`).
- `checkRedundantAccepted` está ligado: nenhuma variante repete a resposta após normalização.
- Nenhum item depende de vocabulário futuro não explicado; o validador B2 exige que a resposta de `cloze` (2+ sílabas) apareça no texto ensinado da lição.

## 5. Gramática e progressão

- Duas notas gramaticais por lição, com: significado, registro, padrão de conjugação, contraste com forma anterior e dois exemplos.
- Toda forma cobrada é ensinada na mesma lição antes da prática.
- Formas de lições anteriores são retomadas em leituras, traduções e checkpoints.
- O curso evita estruturas arcaicas ou desnecessariamente avançadas; a escolha é comunicativa, não uma lista de “gramática difícil”.
- O blueprint registra `grammar` e `discourse` separadamente; o discurso (tese, concessão, atribuição, enquadramento) é avaliado tanto quanto a forma.

## 6. Produção independente

Cada lição e checkpoint tem uma tarefa com:

- enunciado em pt-BR e coreano;
- orientação de conteúdo;
- checklist de autoavaliação;
- rubrica de cinco critérios: tarefa, organização/coesão, vocabulário, gramática/registro e clareza da posição;
- exemplo ilustrativo original em coreano e português, com nota de que não é gabarito.

A produção é **opcional para o aluno**, local, não enviada, não persistida, não sincronizada e não corrigida automaticamente. A rubrica é apoio de autoavaliação/revisão humana; não verifica correção linguística.

## 7. Validadores compartilhados e específicos

O B2 reutiliza `validateExerciseSpec` e acrescenta:

- contagem exata de 10 itens e 5+5 etapas;
- dois itens de cada tipo por lição;
- texto-âncora obrigatório com três parágrafos e tamanho mínimo;
- leitura avaliada com Hangul e duas frases;
- produção com rubrica de cinco critérios e exemplo;
- resposta de cloze presente no texto ensinado;
- fronteira do alvo lexical em substantivos;
- contagem e limiar de checkpoint por módulo;
- revisão `in-review`.

Nenhum validador prova naturalidade, registro ou correção linguística. Não houve revisão por falante nativo; a revisão editorial assistida por IA foi aceita pelo responsável, e esse risco residual não bloqueia o release.

## 8. Implementação verificada

O curso entregue tem **615 itens**: 400 de lição e 215 de checkpoint. Distribuição realizada: **105 `mcq`, 123 `cloze`, 132 `listen`, 132 `reading`, 123 `translate`**. Todos os itens de lição estão em 5 guiados + 5 independentes; todos os checkpoints são independentes. O `b2-c08` tem 40 itens e 32 acertos como mínimo. Há **48 produções** (40 lições + 8 checkpoints), todas com rubrica de cinco critérios e exemplo ilustrativo. A validação `validateB2Content()` retorna zero issues e os testes de fairness cobrem pontuação, gabaritos, leitura em coreano, IDs únicos, produção e extensão do texto-âncora.
