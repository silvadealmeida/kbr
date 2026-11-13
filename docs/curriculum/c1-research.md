# C1 — pesquisa, referências e decisões pedagógicas

Pesquisa curricular concluída em **2026-11-13** para a implementação do curso C1 do KBR. Documento original: não licencia copiar lições, diálogos, textos jornalísticos, obras literárias ou exercícios de terceiros. Todo o coreano novo permanece `in-review`.

## 1. Referenciais e limites

O KBR usa o **CEFR** para descrever resultados comunicativos observáveis, o **currículo nacional coreano (NIKL)** e o **King Sejong Institute** como referências de progressão de funções e gêneros, e o **TOPIK II** apenas como referência secundária de tarefas receptivas. Não existe equivalência oficial entre CEFR, TOPIK e o curso interno do KBR.

O C1 do KBR é um curso interno:

- não certifica CEFR C1;
- não prepara oficialmente para o TOPIK;
- não promete nota, nível ou aprovação em exame;
- não avalia fala espontânea nem corrige escrita aberta automaticamente;
- não transforma complexidade gramatical em proficiência comunicativa;
- não substitui revisão por falante nativo.

## 2. CEFR C1 — descritores usados

**Paráfrase dos descritores publicados.** O C1 compreende textos longos e exigentes, reconhece sentidos implícitos e consegue expressar-se com fluência e espontaneidade sem buscar palavras de forma muito evidente. Produz texto claro, bem estruturado e detalhado sobre temas complexos, mostrando controle de mecanismos de organização, conectores e coesão. Consegue usar a língua com flexibilidade e eficácia para fins sociais, acadêmicos e profissionais, incluindo a mediação de ideias e a reformulação de discurso para públicos diferentes.

O KBR traduz esses descritores em tarefas observáveis, não em uma etiqueta de nível:

| Dimensão | Resultado observável no curso |
|---|---|
| Compreensão escrita | Ler textos longos, reconstruir o mapa argumentativo, distinguir pressuposto, evidência e inferência. |
| Compreensão oral | Seguir diálogos longos com mudança de posição, registro e fonte da informação. |
| Produção escrita | Organizar argumento complexo, sintetizar fontes e revisar o próprio texto com critérios explícitos. |
| Interação | Reformular, negociar premissas, mediar posições e ajustar registro a relações de poder. |
| Mediação | Sintetizar fontes heterogêneas, explicar conceitos culturais e reformular discurso técnico. |
| Autonomia | Editar o próprio texto, justificar escolhas e reconhecer limites da própria posição. |

Fonte: Council of Europe, *Common European Framework of Reference for Languages: Learning, teaching, assessment — Companion Volume* (2020), descritores de nível e escalas de recepção, produção e mediação. Página consultada: <https://www.coe.int/en/web/common-european-framework-reference-languages/level-descriptions>.

## 3. Currículo coreano e referências lexicais

**Currículo nacional (paráfrase).** O nível avançado amplia funções acadêmicas, profissionais, públicas e culturais, com textos argumentativos, institucionais e literários, maior exigência de adequação de registro e maior responsabilidade enunciativa. O KBR usa essa cobertura como referência de temas e funções, sem copiar a sequência oficial nem reproduzir lições de terceiros.

**Dicionário de aprendiz.** O *Korean-English Learners' Dictionary* do National Institute of Korean Language (NIKL) foi usado como referência de forma de dicionário, classe de palavra e sentido. As glosas em português são autorais do KBR e não foram validadas por falante nativo.

**King Sejong Institute.** O currículo do King Sejong Institute foi usado como referência de progressão comunicativa e de gêneros (apresentação, artigo, carta institucional, mediação), não como fonte de texto.

**TOPIK II (paráfrase).** O exame intermediário-avançado avalia escuta, leitura e escrita em níveis distintos. O KBR não reproduz o formato, não usa itens oficiais e não afirma equivalência. Tarefas de leitura e escuta informam os checkpoints; a escrita aberta fica fora da nota automática.

Fontes institucionais:

- National Institute of Korean Language — Korean-English Learners' Dictionary: <https://krdict.korean.go.kr/eng/mainAction>
- National Institute of Korean Language — International Standard Curriculum for Korean Language (referência de funções e temas).
- National Institute of Korean Language — Korean Grammar Dictionary (consulta de forma, função e restrições).
- King Sejong Institute Foundation — currículo e materiais *Sejong Korean* (referência de progressão).
- National Institute for International Education — TOPIK overview (referência secundária, sem equivalência).

## 4. Evidência de aprendizagem usada no desenho

- **Texto conectado antes de itens isolados:** cada lição tem diálogo, texto-âncora de três parágrafos e duas leituras avaliadas. O C1 não é uma sequência de frases soltas.
- **Progressão argumentativa:** cada módulo parte de uma operação discursiva (delimitar tese, comparar fontes, reformular, editar, mediar) e a reencontra em contextos mais complexos.
- **Recuperação espaçada:** o curso mantém o Leitner existente e reencontra léxico em novos contextos; não cria agenda paralela.
- **Progressão controlada:** oito identidades lexicais novas por lição, dois focos gramaticais e dez itens avaliados. O texto e a tarefa de produção são maiores que no B2.
- **Produção com rubrica:** a tarefa aberta é obrigatória no desenho, opcional para o aluno, local, não persistida e não corrigida automaticamente. A rubrica de seis critérios inclui síntese; o exemplo ilustrativo não é gabarito.
- **Fairness determinística:** respostas digitadas aceitam variantes de pontuação final; alternativas lexicalmente válidas são registradas; não se inventa correção semântica por IA.
- **Limite honesto de escuta:** o motor atual transcreve uma frase por item. O C1 usa frases mais longas e diálogos, mas não simula compreensão de áudio de vários minutos.

## 5. Decisões KBR para o C1

1. 8 módulos, 40 lições, 8 checkpoints e 48 passos; entrada após `b2-c08`.
2. Dois focos gramaticais por lição, sempre ensinados antes da avaliação e reutilizados depois.
3. Oito identidades lexicais novas por lição (320 no total), cada uma com uma frase contextual original.
4. Reuso explícito de B2/C1 em contexto; nenhum cartão duplicado e nenhum ID existente renomeado.
5. Texto-âncora obrigatório de três parágrafos por lição, com no mínimo 420 caracteres coreanos sem espaços, além do diálogo.
6. Produção independente obrigatória em todas as lições e checkpoints, com rubrica de seis critérios e exemplo ilustrativo.
7. Apenas os cinco tipos de exercício já implementados (`mcq`, `cloze`, `listen`, `translate`, `reading`); nenhum motor novo.
8. Checkpoints determinísticos: 25 itens/20 acertos nos módulos 1–7; 40/32 no `c1-c08`.
9. Todo o conteúdo novo marcado `in-review`; nenhuma aprovação nativa é alegada.
10. A fala espontânea e a escrita aberta não são corrigidas automaticamente; a rubrica é apoio de autoavaliação ou revisão humana.

## 6. Fontes de gramática e critérios de aceitação

As notas gramaticais foram escritas a partir de descrições pedagógicas gerais de coreano avançado (concessão, evidencialidade, nominalização, atribuição, reformulação e organização textual), com conferência interna de conjugação e de registro. Referências gerais de consulta, sem cópia de exercícios:

- Yeon, J., & Brown, L. *Korean: A Comprehensive Grammar*. Routledge (referência descritiva).
- Yonsei University Korean Language Institute. *Korean Grammar for International Learners* (referência pedagógica).
- National Institute of Korean Language. *Korean Grammar Dictionary* (consultas pontuais de forma e uso).
- King Sejong Institute Foundation. *Sejong Korean* (referência de progressão, não fonte de texto).

Para cada construção nova, o curso verifica:

1. significado e função comunicativa;
2. registro (formal/escrito, oral, neutro);
3. padrão de conjugação e restrições;
4. contraste com uma forma já ensinada no A1–B2;
5. exemplos naturais;
6. ensino antes da cobrança;
7. reutilização em lições posteriores.

## 7. Limites explícitos

Naturalidade, partículas, conjugações, honoríficos, registro e tradução **não foram validados por falante nativo**. Não há estudo de validade, calibração psicométrica ou teste com aprendizes. A fala espontânea e a escrita aberta não são corrigidas automaticamente. A revisão nativa de Hangul, A1, A2, B1, B2 e C1 continua como risco separado e não é substituída por validação estrutural.

A auditoria editorial da fase 13C é uma revisão assistida por IA com referências externas; ela **não** é revisão nativa e não deve ser apresentada como tal.
