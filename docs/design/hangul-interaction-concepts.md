# Hangul — conceitos de interação

> Fase 7A. Conceitos originais para tornar a composição do Hangul visível e manipulável, usando os jamo e as lições `h01`–`h25` já existentes. Nenhum conceito altera conteúdo, IDs, respostas corretas ou o modelo de `Progress` v1. Ilustrações e metadados de traço são **proposta** e exigem revisão pedagógica antes da implementação.
>
> **Status 7D:** os conceitos 1 (Bancada de composição) e 3 (camadas de pronúncia) foram implementados. A bancada usa zonas e botões (sem drag), com prévia C+V e `aria-live`; as camadas mostram escrita e fala aproximada ao mesmo tempo, com comparação por bloco opcional em vez de revelação passo a passo, para que nenhuma informação dependa de animação.
>
> **Status 7E:** o conceito 6 (cartão de revisão) foi implementado como cartão-prancha com “Mostrar resposta”.
>
> **Status 7F:** os conceitos 2 (Anatomia da sílaba), 4 (Mapa de sons) e 7 (Percurso de 25 lâminas) foram implementados com conteúdo existente. A anatomia usa `한` e nomes de posição já presentes, com estado estático, partes como botões e descrição textual; o mapa entrega a versão compacta verificada (40 jamo em `<details>` nativos, sem áudio por item); o percurso virou a jornada de 29 passos da conclusão, derivada de `Progress` v1. O player de traço (conceito 5) continua proposto e depende de dados de ordem revisados.

## 1. Princípios

1. **A sílaba é um bloco, não uma sequência de letras.** A interface deve mostrar posições (inicial, medial, final), não uma fila latina.
2. **Manipular para entender.** Tocar, montar, isolar e comparar ensinam mais que assistir.
3. **Som e forma juntos.** Cada manipulação tem equivalente sonoro (TTS existente) e textual.
4. **Nada de drag obrigatório.** Toda interação por arraste tem alternativa por toque/teclado.
5. **Sem inventar pronúncia.** Usar as transcrições e regras já revisadas no conteúdo; marcar o que está `in-review`.
6. **Ilustração funcional.** Traço, seta, medida e camada; sem mascotes, sem caligrafia decorativa falsa.
7. **Reduced motion sempre.** A informação está no estado final, não na animação.

## 2. Vocabulário visual comum

| Elemento | Função | Regra |
|---|---|---|
| **Bloco** | contêiner quadrado da sílaba | marcas de registro nos cantos; proporção 1:1 |
| **Zonas** | inicial (topo/esquerda), medial (direita/baixo), final (base) | linhas tracejadas 1 px, nunca preenchimento forte |
| **Traço** | path do jamo | tinta; traço ativo em celadon; número da ordem em mono |
| **Camada** | regra fonológica aplicada | cor semântica + rótulo; empilhamento vertical |
| **Régua** | sequência de sílabas/lições | marcas a cada unidade; posição atual destacada |
| **Selo** | confirmação | vermelho-selo; apenas em marcos |

## 3. Conceito 1 — Bancada de composição

**Problema:** o exercício `build-syllable` atual monta a sílaba, mas a relação espacial entre as partes ainda é abstrata. O aluno pode acertar por eliminação sem entender por que a vogal fica à direita ou embaixo.

**Conceito:** uma bancada com três zonas visíveis. O aluno toca em consoante/vogal/batchim e vê o bloco se formar em tempo real, com o nome da parte e uma nota curta (“ㅏ é vertical: fica à direita do ㄱ”).

**Fluxo:**

1. A sílaba-alvo aparece em áudio e/ou texto (conforme o exercício existente).
2. Zonas vazias mostram “inicial”, “medial”, “final (opcional)”.
3. O aluno toca em um jamo da bandeja; ele ocupa a zona compatível.
4. O bloco composto é renderizado com a fonte coreana; um contorno mostra a posição.
5. “Ouvir” reproduz a sílaba; “Conferir” valida com a mesma lógica atual.
6. Feedback explica a posição, não só o acerto.

**Visual:** fundo papel, bloco central 160–220 px, bandeja inferior com jamo em botões 48 px, notas em mono. Sem animação de “explosão”.

**Acessibilidade:**

- Botões com `aria-label="Consoante ㄱ, giyeok"`.
- Zonas com `role="group"` e rótulo; estado “vazia/ocupada”.
- Alternativa por teclado: focar jamo, Enter seleciona, Tab navega zonas.
- Não usar drag como única opção.
- Feedback textual + foco.

**Técnica:** React state + SVG para o contorno; o texto coreano continua em HTML. Nenhuma dependência nova. A animação de encaixe é `transform` 160 ms; reduced: instantâneo.

**Dependência:** nenhuma além do conteúdo atual. **Prioridade P0** (substitui a UI de `build-syllable` sem mudar a resposta).

## 4. Conceito 2 — Anatomia da sílaba

**Problema:** o aluno vê `한` e não enxerga `ㅎ + ㅏ + ㄴ`. Sem decompor, a leitura vira memorização de blocos inteiros.

**Conceito:** tocar em uma sílaba abre uma vista “explodida” com as três posições e seus nomes. Tocar em uma parte isola o traço, mostra o som e exemplos de outras sílabas com a mesma parte.

**Fluxo:**

1. Sílaba em display, com três “pontos” invisíveis sobre as zonas.
2. Toque/clique em uma zona destaca o jamo correspondente e atualiza a legenda.
3. “Ver em outras sílabas” troca o exemplo (ex.: ㄱ em 가, 고, 구).
4. “Ouvir” reproduz a sílaba inteira e a parte isolada (quando o TTS suportar jamo; senão, apenas a sílaba).
5. “Voltar ao bloco” restaura.

**Visual:** o bloco permanece; as partes se separam 12–16 px (não 100 px), com linhas de chamada e rótulos em mono. A sílaba nunca sai do centro.

**Acessibilidade:** cada zona é um botão com nome completo; a decomposição também existe como lista textual em pt-BR (`Inicial ㅎ`, `Medial ㅏ`, `Final ㄴ`) para leitores de tela. Nada essencial depende de posição espacial.

**Técnica:** SVG ou HTML posicionado; sem canvas. **Prioridade P1.** **Status 7F:** implementado em `src/components/hangul/SyllableAnatomy.tsx` com `한`, geometria esquemática, botões de parte, “Ouvir a sílaba 한”, descrição textual e controles de teclado/toque; sem caligrafia e sem fonologia inventada.

## 5. Conceito 3 — Régua de leitura e camadas de pronúncia

**Problema:** as lições `h21`–`h25` introduzem ligação, nasalização e aspiração. O aluno precisa ver a palavra “de cima” (forma escrita) e “de baixo” (pronúncia), sem decorar regras soltas.

**Conceito:** uma régua horizontal mostra a palavra dividida em sílabas. Abaixo, camadas mostram a pronúncia passo a passo. Cada camada tem um rótulo (“ligação”, “nasalização”, “aspiração”) e uma seta conectando a sílaba afetada.

**Fluxo:**

1. Palavra escrita em blocos, com a transcrição didática existente.
2. Botão “Ver passo a passo” revela uma camada por vez.
3. A camada ativa destaca as sílabas envolvidas e mostra a regra em uma frase.
4. “Ouvir” reproduz a pronúncia de referência (TTS existente).
5. “Ver tudo” mostra o resultado final; “Recolher” volta ao escrito.

**Visual:** trilho 6 px, marcas verticais, etiquetas mono, cores semânticas: celadon = transformação; selo = atenção; tinta = forma escrita. Sem animação de “mágica”; as camadas entram por fade/8 px.

**Acessibilidade:** a versão passo a passo é uma lista ordenada; “Ver tudo” é um resumo textual. Não usar apenas setas/cores. Reduced motion: camadas aparecem instantaneamente. Conteúdo permanece o existente, com status `in-review`.

**Técnica:** dados de regras já tipados em `src/content/hangul` (não recriar). Componente puramente apresentacional. **Prioridade P0/P1** (alto valor em h21–h25).

## 6. Conceito 4 — Mapa de sons

**Problema:** consoantes e vogais são ensinadas em sequência, mas o aluno não vê o sistema. Pares mínimos ficam soltos.

**Conceito:** um mapa tipográfico (grid) de jamo organizado por categoria (oclusivas, nasais, fricativas, líquidas; vogais simples/compostas). Tocar em um jamo mostra nome, som aproximado, exemplo e pares mínimos.

**Fluxo:**

1. Grid de botões com o jamo e o nome em mono.
2. Filtro por categoria (chips acessíveis, não apenas cor).
3. Detalhe lateral/sheet com exemplo e “ouvir”.
4. “Comparar” seleciona dois jamo e mostra um par mínimo existente.

**Visual:** prancha de classificação, sem hierarquia “fofa”. Células 56–64 px, hairlines, categoria em mono. Uma cor de apoio por categoria, sempre com rótulo.

**Acessibilidade:** o grid é uma tabela semântica ou lista de grupos com headings; navegação por setas opcional, Tab funcional. Não usar posição absoluta como única informação.

**Técnica:** HTML/CSS grid; TTS existente; sem dependência. **Prioridade P1**, desde que não introduza conteúdo novo — usar apenas jamo e exemplos já presentes. **Status 7F:** entregue em versão compacta (`SoundMap.tsx`) a partir de `JAMO`: 40 entradas em `<details>` nativos, agrupadas por classe, com nome, IPA e nota; sem filtros, pares mínimos ou áudio por item. A prancha completa com comparação continua backlog.

## 7. Conceito 5 — Player de traço

**Problema:** a ordem dos traços é parte de aprender a escrever, mas o app atual não a mostra. Um desenho animado sem numeração pode ensinar errado.

**Conceito:** player de traço para um jamo: SVG com paths na ordem correta, números de traço, botão play/pause, scrub e “ver estático”. Cada traço é uma unidade; a animação desenha com `stroke-dashoffset`.

**Fluxo:**

1. Escolher jamo (a partir de uma lição ou do mapa).
2. Ver o traço completo e os números.
3. “Desenhar” anima do traço 1 ao N; “passo” avança um traço; “repetir” reinicia.
4. Legenda:“1. traço horizontal; 2. traço vertical…”
5. Em reduced motion, todos os traços aparecem com números; sem animação.

**Visual:** papel, traço tinta 6–8 px, guias 1 px, números em mono, sem “pincel” texturizado. O traço ativo em celadon; concluído em tinta.

**Acessibilidade:** botões de controle rotulados; `aria-live` anuncia o traço atual; a ordem também está em lista textual. Não depender de hover. Play não inicia sozinho.

**Técnica:** SVG + WAAPI/CSS; `pathLength="1"`. **Dependência:** dados de ordem de traço para cada jamo, com revisão pedagógica. **Prioridade P2** — não bloqueou a 7B–7F. Na landing, usa-se apenas um traço decorativo sem pretensão de ensino; um player completo fica para depois da 7G.

## 8. Conceito 6 — Cartão de revisão tipográfico

**Problema:** a revisão Leitner atual é funcional, mas o cartão parece um formulário. O aluno não sente que está relembrando um objeto de escrita.

**Conceito:** o cartão é uma pequena prancha: frente com a sílaba/palavra em bloco e a pergunta; verso com som, significado e exemplo. A virada é opcional (reduced motion) e o botão “Mostrar resposta” é explícito.

**Fluxo:**

1. Frente: bloco + pergunta (“Como se lê?”).
2. “Mostrar resposta” vira/troca para o verso.
3. Aluno avalia (“Ainda não” / “Lembrei”) — mantendo a lógica Leitner atual.
4. Cartão sai; próximo entra.

**Visual:** borda 1 px, marcas de registro, número do cartão em mono, sem sombra pesada. A resposta usa a mesma tipografia do conteúdo, não uma “tela de resultado” genérica.

**Acessibilidade:** a virada não pode esconder conteúdo de leitor de tela; usar `aria-expanded`/região revelada. Foco vai para a resposta. Reduced: sem rotação 3D.

**Técnica:** CSS 3D + estado React; **Prioridade P1**.

## 9. Conceito 7 — Percurso de 25 lâminas

**Problema:** a conclusão do curso precisa comunicar progresso acumulado sem inventar métricas.

**Conceito:** uma régua de 25 marcas + 4 checkpoints, cada uma carimbada quando concluída. O percurso é uma peça editorial, não um gráfico de vaidade.

**Fluxo:** o aluno vê a régua, o que concluiu, o que revisitou e o diagnóstico real. “Rever” abre a lição; “Voltar ao painel” mantém a navegação.

**Visual:** papel, tinta, selo; marcas preenchidas em celadon; checkpoints com losango; texto em mono. Sem confete.

**Acessibilidade:** lista ordenada com status textual; a régua é decorativa (`aria-hidden`) e a informação está na lista.

**Técnica:** componente existente `CourseCompletionPanel` reestilizado; sem novos dados. **Prioridade P2.** **Status 7F:** implementado como `CourseJourney` intercalado de 25 lições e 4 checkpoints, com lista ordenada, status textual, selo e resumo real; a régua é decorativa (`aria-hidden`) e a informação está na lista. A conclusão incompleta usa o mesmo percurso e só aparece quando `allowIncomplete` é intencional.

## 10. Ilustração de Hangul — regras

1. **Geometria antes de caligrafia.** Traços retos e curvos fiéis à forma tipográfica, sem textura de pincel.
2. **Ordem verificável.** Só publicar ordem de traço após revisão; até lá, mostrar a forma completa.
3. **Sem romanização dentro do bloco.** A romanização fica ao lado/abaixo, em mono.
4. **Sem separar jamo com espaço latino.** Usar as zonas do bloco.
5. **Sem “pronúncia inventada”.** Usar as transcrições existentes e o status `in-review`.
6. **Contraste:** traço `--fg` sobre papel; destaque `--accent`; atenção `--brand`.
7. **Tamanho mínimo:** sílaba display ≥48 px; em exercício, ≥64 px; no herói, ≥160 px.
8. **SVG acessível:** `role="img"`, `<title>` e `<desc>` quando a imagem comunica algo; `aria-hidden` quando decorativa.

## 11. Priorização

| Conceito | Valor pedagógico | Esforço | Dependência | Fase |
|---|---|---|---|---|
| Bancada de composição | Alto | Médio | Nenhuma | 7D |
| Régua/camadas de pronúncia | Alto | Médio | Conteúdo existente | 7D |
| Anatomia da sílaba | Alto | Médio | Nenhuma | 7F (feita) |
| Cartão de revisão | Médio | Baixo | Nenhuma | 7E (feito) |
| Mapa de sons | Médio | Médio | Conteúdo existente | 7F (compacto); completo depois |
| Percurso de 25 lâminas | Médio | Baixo | Nenhuma | 7F (feito) |
| Player de traço | Alto | Alto | Dados + revisão | depois da 7G |

## 12. Critérios de aceite

1. Nenhum conceito altera respostas, IDs, ordem de lições ou `Progress` v1.
2. Toda interação tem equivalente por teclado e leitor de tela.
3. Nenhuma informação depende de animação, cor ou posição espacial.
4. Reduced motion mostra o estado final completo.
5. Nenhum conteúdo coreano novo é inventado; tudo vem do módulo existente ou é marcado `in-review`.
6. O tempo de resposta percebido não piora; nenhuma animação bloqueia “Conferir”.
7. Em 375 px, o bloco e os controles continuam utilizáveis sem scroll horizontal.
