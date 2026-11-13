# B2 — pesquisa, referências e decisões pedagógicas

Pesquisa curricular concluída em **2026-11-13** para a implementação do curso B2 do KBR. Documento original: não licencia copiar lições, diálogos, textos jornalísticos ou exercícios de terceiros. Todo o coreano novo permanece `in-review`.

## 1. Referenciais e limites

O KBR usa o **CEFR** para descrever resultados comunicativos observáveis, o **currículo nacional coreano (NIKL)** e o **King Sejong Institute** como referências de progressão de funções e temas, e o **TOPIK II** apenas como referência secundária de tarefas receptivas. Não existe equivalência oficial entre CEFR, TOPIK e o curso interno do KBR.

O B2 do KBR é um curso interno:

- não certifica CEFR B2;
- não prepara oficialmente para o TOPIK;
- não promete nota, nível ou aprovação em exame;
- não avalia fala espontânea nem corrige escrita aberta automaticamente;
- não transforma complexidade gramatical em proficiência comunicativa.

## 2. CEFR B2 — descritores usados

**Paráfrase dos descritores publicados.** O B2 compreende as ideias principais de textos complexos sobre temas concretos e abstratos, inclusive discussões técnicas dentro de sua área. Consegue interagir com fluência e espontaneidade suficientes para uma conversa regular com falantes nativos sem grande esforço de nenhuma das partes. Produz texto claro e detalhado sobre uma ampla gama de assuntos, explica um ponto de vista sobre um tema atual e apresenta vantagens e desvantagens. Consegue acompanhar argumentação extensa, identificar pontos importantes e distinguir o que é afirmação, hipótese, opinião e inferência.

O KBR traduz esses descritores em tarefas observáveis, não em uma etiqueta de nível:

| Dimensão | Resultado observável no curso |
|---|---|
| Compreensão escrita | Ler texto conectado de vários parágrafos, localizar tese, evidência, ressalva e inferência. |
| Compreensão oral | Seguir diálogos e falas mais longas, reconstruir causa, posição e mudança de perspectiva. |
| Produção escrita | Organizar parágrafos com função clara, usar conectores e sustentar uma posição. |
| Interação | Negociar condições, reformular, discordar com concessão e reparar mal-entendidos. |
| Mediação | Resumir e sintetizar duas fontes sem apagar divergências. |
| Autonomia | Revisar o próprio texto, identificar o que falta e planejar o próximo passo. |

Fonte: Council of Europe, *Common European Framework of Reference for Languages: Learning, teaching, assessment — Companion Volume* (2020), descritores de nível e escalas de recepção, produção e mediação. Página consultada: <https://www.coe.int/en/web/common-european-framework-reference-languages/level-descriptions>.

## 3. Currículo coreano e referências lexicais

**Currículo nacional (paráfrase).** O nível intermediário-avançado amplia funções sociais, trabalho, estudo, mídia, cultura, relações, saúde, serviços e resolução de problemas, com textos e discursos mais longos e maior exigência de adequação de registro. O KBR usa essa cobertura como referência de temas e funções, sem copiar a sequência oficial nem reproduzir lições de terceiros.

**Dicionário de aprendiz.** O *Korean-English Learners' Dictionary* do National Institute of Korean Language (NIKL) foi usado como referência de forma de dicionário, classe de palavra e sentido. As glosas em português são autorais do KBR e não foram validadas por falante nativo.

**King Sejong Institute.** O currículo do King Sejong Institute foi usado como referência de progressão comunicativa e de gêneros (mensagem, reclamação, resumo, apresentação), não como fonte de texto.

**TOPIK II (paráfrase).** O exame intermediário-avançado avalia escuta, leitura e escrita em níveis distintos. O KBR não reproduz o formato, não usa itens oficiais e não afirma equivalência. Tarefas de leitura e escuta informam os checkpoints; a escrita aberta fica fora da nota automática.

Fontes institucionais:

- National Institute of Korean Language — Korean-English Learners' Dictionary: <https://krdict.korean.go.kr/eng/mainAction>
- National Institute of Korean Language — International Standard Curriculum for Korean Language (referência de funções e temas).
- King Sejong Institute Foundation — currículo e materiais *Sejong Korean* (referência de progressão).
- National Institute for International Education — TOPIK overview (referência secundária, sem equivalência).

## 4. Evidência de aprendizagem usada no desenho

- **Texto conectado antes de itens isolados:** cada lição tem diálogo, texto-âncora de três parágrafos e duas leituras avaliadas. O B2 não é uma sequência de frases soltas.
- **Recuperação espaçada:** o curso mantém o Leitner existente e reencontra léxico em novos contextos; não cria agenda paralela.
- **Progressão controlada:** oito identidades lexicais novas por lição, dois focos gramaticais e dez itens avaliados. A carga é comparável à do B1, mas o texto e a tarefa de produção são maiores.
- **Produção com rubrica:** a tarefa aberta é obrigatória no desenho, opcional para o aluno, local, não persistida e não corrigida automaticamente. O exemplo ilustrativo não é gabarito.
- **Fairness determinística:** respostas digitadas aceitam variantes de pontuação final; alternativas lexicalmente válidas são registradas; não se inventa correção semântica por IA.
- **Limite honesto de escuta:** o motor atual transcreve uma frase por item. O B2 usa frases mais longas e diálogos, mas não simula compreensão de áudio de vários minutos. Essa limitação está registrada em `b2-exercise-plan.md`.

## 5. Decisões KBR para o B2

1. 8 módulos, 40 lições, 8 checkpoints e 48 passos; entrada após `b1-c08`.
2. Dois focos gramaticais por lição, sempre ensinados antes da avaliação e reutilizados depois.
3. Oito identidades lexicais novas por lição (320 no total), cada uma com uma frase contextual original.
4. Reuso explícito de A1/A2/B1 em contexto; nenhum cartão duplicado e nenhum ID existente renomeado.
5. Texto-âncora obrigatório de três parágrafos por lição, além do diálogo.
6. Produção independente obrigatória em todas as lições e checkpoints, com rubrica de cinco critérios e exemplo ilustrativo.
7. Apenas os cinco tipos de exercício já implementados (`mcq`, `cloze`, `listen`, `translate`, `reading`); nenhum motor novo.
8. Checkpoints determinísticos: 25 itens/20 acertos nos módulos 1–7; 40/32 no `b2-c08`.
9. Todo o conteúdo novo marcado `in-review`; nenhuma aprovação nativa é alegada.

## 6. Fontes de gramática e critérios de aceitação

As notas gramaticais foram escritas a partir de descrições pedagógicas gerais de coreano intermediário-avançado (formas de concessão, discurso relatado, nominalização, evidencialidade e organização textual), com conferência interna de conjugação e de registro. Referências gerais de consulta, sem cópia de exercícios:

- Yeon, J., & Brown, L. *Korean: A Comprehensive Grammar*. Routledge (referência descritiva).
- Yonsei University Korean Language Institute. *Korean Grammar for International Learners* (referência pedagógica).
- National Institute of Korean Language. *Korean Grammar Dictionary* (consultas pontuais de forma e uso).

Para cada construção nova, o curso verifica:

1. significado e função comunicativa;
2. registro (formal/escrito, oral, neutro);
3. padrão de conjugação e restrições;
4. contraste com uma forma já ensinada no A1–B1;
5. exemplos naturais;
6. ensino antes da cobrança;
7. reutilização em lições posteriores.

## 7. Limites explícitos

Naturalidade, partículas, conjugações, registro e tradução **não foram validados por falante nativo**. Não há estudo de validade, calibração psicométrica ou teste com aprendizes. A fala espontânea e a escrita aberta não são corrigidas automaticamente. A revisão nativa de Hangul, A1, A2, B1 e B2 continua como risco separado e não é substituída por validação estrutural.
