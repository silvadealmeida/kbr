# C2 — plano de exercícios e avaliação

**Status:** desenho interno. Não é certificação CEFR/TOPIK. Todo o coreano permanece `in-review`.

## 1. O que o motor avalia

O C2 usa os cinco tipos já implementados:

| Tipo | O que verifica | Limite |
|---|---|---|
| `mcq` | Interpretação, forma ou função em contexto. | Não prova produção nem justificativa aberta. |
| `cloze` | Forma-alvo em contexto controlado. | Uma lacuna por item. |
| `listen` | Transcrição de uma frase ouvida. | Não avalia discurso longo, ironia oral ou compreensão global de áudio. |
| `translate` | Equivalência de uma frase. | Não avalia texto inteiro; variantes precisam ser registradas. |
| `reading` | Compreensão de trecho com pergunta de escolha. | Não avalia resposta aberta nem interpretação longa. |

A produção aberta fica fora da nota automática. A fala espontânea não é avaliada. O curso não mede proficiência C2; mede desempenho em uma amostra interna de tarefas.

## 2. Estrutura de cada lição

- **5 itens guiados:** logo após as explicações, com apoio do texto.
- **5 itens independentes:** sem o texto-âncora à vista, exigindo transferência.
- **Distribuição fixa:** 2 `mcq`, 2 `cloze`, 2 `listen`, 2 `translate`, 2 `reading`.
- **Mínimo:** 8/10 (80%).
- **Produção:** tarefa aberta com rubrica de seis critérios; não entra no denominador.

## 3. Checkpoints

- **Módulos 1–7:** 25 itens (6 `listen`, 6 `reading`, 5 `cloze`, 5 `translate`, 3 `mcq`), mínimo 20/25.
- **`c2-c08`:** 40 itens (10 `listen`, 10 `reading`, 8 `cloze`, 8 `translate`, 4 `mcq`), mínimo 32/40.
- **Cobertura:** cada checkpoint retoma as cinco lições do módulo e os checkpoints anteriores.
- **Sem conteúdo novo obrigatório:** o checkpoint avalia o que foi ensinado.

## 4. Produção e rubrica

A produção é obrigatória no desenho, opcional para o aluno, local e não persistida. A rubrica tem seis critérios:

1. **Tarefa:** responde ao enunciado e ao gênero pedido.
2. **Organização:** parágrafos com função e progressão.
3. **Vocabulário:** léxico preciso, idiomático e com colocação natural.
4. **Gramática e registro:** formas inteligíveis, estilo e registro coerentes.
5. **Argumento:** tese delimitada, evidência e objeção.
6. **Mediação:** reformula, integra fontes e representa sem distorcer.

O exemplo ilustrativo é original e não é gabarito. A autoavaliação não substitui revisão humana.

## 5. Fairness determinística

- Respostas digitadas aceitam a variante sem pontuação final.
- `listen` pede a frase completa; o gabarito é o próprio `audioText`.
- `acceptedAnswers` só registra variantes genuinamente equivalentes; o validador rejeita redundâncias.
- Alternativas são embaralhadas na apresentação, com ordem estável durante a tentativa.
- Não há correção semântica por IA nem inferência de resposta “parecida”.

## 6. Limites explícitos

- O motor não avalia fala espontânea, pronúncia, fluência, ironia oral ou interação em tempo real.
- O motor não corrige texto aberto; a rubrica é apoio de autoavaliação/revisão humana.
- A escuta é de uma frase por item; não há áudio de vários minutos.
- A leitura é de trechos; o texto-âncora completo é lido fora da nota.
- O curso não afirma que 8/10 em uma lição equivale a domínio do conteúdo.
- Não há estudo de validade, calibração ou teste com aprendizes.
- A competência literária e a mediação real não são certificadas por itens de múltipla escolha.
