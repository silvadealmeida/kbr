# A1 — syllabus completo da Fase 9A

Blueprint editorial: **8 módulos, 40 lições e 8 checkpoints**. Os dados de diálogos, frases, listas lexicais e exercícios finais foram implementados nas fases 9B–9H. Cada lição prevê 45–60 minutos de percurso principal e duas revisões distribuídas de 10–15 minutos. `contextual` abaixo significa a prática 9A-V; tipos entre “planejado” ainda não existem e não podem ser requisito de conclusão até fase própria.

Convenções:

- IDs de lição: `a1-l01`…`a1-l40`; checkpoints: `a1-c01`…`a1-c08`; módulos: `a1-m01`…`a1-m08`.
- toda lição introduz 10–14 identidades lexicais e revisita ao menos 6 anteriores;
- `prévio` é requisito estrutural; `revisão` indica dependências que precisam reaparecer nos exercícios;
- critério padrão de lição: 8/10 itens avaliados + a tarefa comunicativa indicada; produções abertas são autoavaliação/rubrica humana;
- todos os cenários, traduções e exemplos futuros serão originais e `in-review`.

## Status de implementação (Fases 9C–9H)

**Todas as 40 lições e os 8 checkpoints estão implementados e jogáveis.** `a1-l01` foi preservada (conteúdo, IDs e progresso); as demais lições seguem o mesmo contrato. O curso `ko-a1` está `available`, com 48 passos, `requiresAllSteps: true`, `finalStepId: "a1-c08"` e sem `plannedTotals`.

- **Lições:** 10 exercícios automáticos por lição, 5 guiados + 5 independentes, mínimo 8/10 (80%). Todas têm introdução, diálogo original traduzido, 3–5 notas gramaticais, vocabulário novo + reuso, frases contextuais e `summary`.
- **Checkpoints:** `a1-c01`–`a1-c07` têm 25 itens e mínimo 20/25; `a1-c08` tem 40 itens e mínimo 32/40. A tarefa funcional aberta é autoavaliação/rubrica e não entra na nota automática.
- **Vocabulário:** 443 identidades novas do A1 + 443 frases contextuais próprias; 52 identidades do Hangul foram retomadas (495 identidades distintas ensinadas). Todo o conteúdo segue `in-review`.
- **Exercícios:** 615 no total (400 de lição + 215 de checkpoint), usando somente tipos implementados: 79 `mcq`, 183 `cloze`, 132 `listen`, 97 `translate` e 124 `reading`. Nenhum `order-words`, `short-answer` ou `dialogue-choice` foi usado como item avaliado.
- **Progressão:** `a1-l01` é o único passo inicial; cada lição seguinte depende da anterior; cada checkpoint depende das cinco lições do módulo e dos checkpoints anteriores; `a1-c08` depende de `a1-l36`–`a1-l40` e de `a1-c01`–`a1-c07`. A conclusão A1 exige os 48 passos.
- **Limites:** a revisão nativa continua pendente; os critérios de produção aberta/fala não são automáticos; a conclusão é interna do KBR, sem certificação CEFR/TOPIK.

## Módulo 1 — Primeiro contato (`a1-m01`)

### `a1-l01` — Olá, eu sou…

- **Meta comunicativa:** cumprimentar, dizer o nome e identificar-se de modo polido.
- **Prévio:** Hangul concluído ou leitura equivalente; **revisão:** nenhuma.
- **Vocabulário:** saudações, nome, pessoa, Brasil/Coreia, estudante; 10–12 itens.
- **Gramática:** cópula `이에요/예요`; tópico `은/는` em blocos formulaicos; ordem nome + identidade.
- **Diálogo:** duas pessoas se encontram numa atividade e trocam nome/apresentação.
- **Escuta:** localizar saudação, nome e identidade em 2–4 turnos lentos.
- **Escrita:** preencher nome e produzir 2 frases de apresentação; na 9B, o preenchimento e uma frase aparecem em `cloze`/`translate` automáticos, e a produção aberta de duas frases fica como prática humana fora da nota.
- **Exercícios:** 10 itens automáticos com `mcq`, `cloze`, `listen` e `translate` (5 guiados + 5 independentes); a prática contextual 9A-V está disponível pelo vocabulário, e `dialogue-choice` (planejado) não foi usado.
- **Avaliação/esforço:** 8/10 automáticos implementados; a apresentação de 2 frases do plano não entra no denominador desta fatia; 50 min + 20 min de revisão são estimativa editorial.

### `a1-l02` — De onde você é?

- **Meta comunicativa:** perguntar/responder nacionalidade e ocupação básica.
- **Prévio:** `a1-l01`; **revisão:** cópula e saudações de `a1-l01`.
- **Vocabulário:** países, nacionalidades, ocupações frequentes; 12–14 itens.
- **Gramática:** `은/는`; perguntas com `어느`, `뭐`; cópula interrogativa pela entonação/contexto.
- **Diálogo:** apresentação entre colegas internacionais.
- **Escuta:** distinguir país, nacionalidade e ocupação.
- **Escrita:** ficha pessoal com 3 campos e 3 frases.
- **Exercícios:** contextual, `cloze`, `listen`, `reading`, `translate`.
- **Avaliação/esforço:** 8/10 + troca pergunta/resposta completa; 55 min + 20 min.

### `a1-l03` — O que é isto?

- **Meta comunicativa:** identificar objetos próximos e perguntar o nome de algo.
- **Prévio:** `a1-l02`; **revisão:** identificação pessoal de `a1-l01`–`a1-l02`.
- **Vocabulário:** objetos de estudo e pessoais, isto/isso/aquilo; 10–12 itens.
- **Gramática:** `이/그/저`, `이것/그것/저것`, `뭐예요?`, sujeito `이/가` em identificação.
- **Diálogo:** colega pergunta por objetos numa mesa.
- **Escuta:** associar demonstrativo e objeto à distância indicada.
- **Escrita:** rotular 5 objetos e formular 2 perguntas.
- **Exercícios:** contextual, `mcq`, `cloze`, `listen`, `reading`.
- **Avaliação/esforço:** 8/10 + identificar 4 de 5 objetos; 50 min + 20 min.

### `a1-l04` — Onde está?

- **Meta comunicativa:** dizer se algo existe e onde está.
- **Prévio:** `a1-l03`; **revisão:** objetos/demonstrativos de `a1-l03`.
- **Vocabulário:** lugares imediatos, posição, presença/ausência; 12 itens.
- **Gramática:** `있어요/없어요`, `에`, `여기/거기/저기`, `어디`.
- **Diálogo:** procurar um objeto numa sala.
- **Escuta:** localizar objeto e posição em instruções curtas.
- **Escrita:** 4 frases de existência/localização.
- **Exercícios:** contextual, `cloze`, `listen`, `mcq`, `translate`.
- **Avaliação/esforço:** 8/10 + localizar corretamente 4 de 5 itens; 55 min + 20 min.

### `a1-l05` — Pode repetir, por favor?

- **Meta comunicativa:** confirmar, negar e pedir repetição, ajuda ou fala mais lenta.
- **Prévio:** `a1-l04`; **revisão:** `a1-l01`–`a1-l04`.
- **Vocabulário:** sim/não, entender, repetir, devagar, novamente, desculpa/obrigado; 10–12 itens.
- **Gramática:** respostas `네/아니요`; pedidos formulaicos com `주세요`; `잘 모르겠어요` como bloco.
- **Diálogo:** aprendiz repara uma apresentação que não compreendeu.
- **Escuta:** reconhecer confirmação, negação e três pedidos de reparo.
- **Escrita:** completar minidiálogo de 4 turnos.
- **Exercícios:** contextual, `listen`, `cloze`, `mcq`, `reading`; `dialogue-choice` (planejado).
- **Avaliação/esforço:** 8/10 + escolher reparo adequado em 4 de 5 cenários; 50 min + 25 min.

### Checkpoint `a1-c01` — Apresentar-se e reparar

Abrange `a1-l01`–`a1-l05`; 25 itens (mínimo 20) + apresentação guiada. Testa leitura/escuta de dados pessoais, identificação/localização, registro `-요` e pedido de repetição. Esforço: 40 min. Pré-requisitos: cinco lições do módulo.

## Módulo 2 — Números, tempo e rotina (`a1-m02`)

### `a1-l06` — Números que usamos

- **Meta comunicativa:** compreender e informar números pessoais e quantidades simples.
- **Prévio:** `a1-c01`; **revisão:** dados pessoais de `a1-l01`–`a1-l02`.
- **Vocabulário:** numerais sino-coreanos/nativos de alta frequência, telefone, idade e quantidade; 12–14 itens.
- **Gramática:** sistemas numéricos por função; blocos `몇`, `몇 살`; sem lista exaustiva de contadores.
- **Diálogo:** preencher contato e confirmar um número.
- **Escuta:** discriminar sequências curtas, idade e quantidade.
- **Escrita:** registrar telefone/idade/quantidade a partir de áudio/texto.
- **Exercícios:** contextual, `listen`, `cloze`, `mcq`, `reading`.
- **Avaliação/esforço:** 8/10 + transcrever 4 de 5 números funcionais; 60 min + 25 min.

### `a1-l07` — Que horas e que dia?

- **Meta comunicativa:** perguntar/dizer hora, dia da semana e data simples.
- **Prévio:** `a1-l06`; **revisão:** numerais de `a1-l06`.
- **Vocabulário:** horas, minutos, dias, hoje/amanhã/ontem; 12–14 itens.
- **Gramática:** `몇 시`, `몇 분`, `무슨 요일`, marcador temporal `에`.
- **Diálogo:** combinar horário de uma aula.
- **Escuta:** extrair data e horário de aviso curto.
- **Escrita:** agenda de 4 compromissos e 3 frases.
- **Exercícios:** contextual, `listen`, `reading`, `cloze`, `translate`.
- **Avaliação/esforço:** 8/10 + registrar 4 de 5 horários; 55 min + 25 min.

### `a1-l08` — Minha rotina

- **Meta comunicativa:** dizer ações habituais no presente polido.
- **Prévio:** `a1-l07`; **revisão:** tempo de `a1-l07` e tópico de `a1-l02`.
- **Vocabulário:** acordar, comer, estudar, trabalhar, descansar, dormir; 12–14 itens.
- **Gramática:** presente informal polido `-아요/어요`; ordem tempo–lugar–ação.
- **Diálogo:** colegas comparam um dia comum.
- **Escuta:** ordenar 4 ações de uma rotina.
- **Escrita:** 4–5 frases sobre um dia.
- **Exercícios:** contextual, `cloze`, `listen`, `translate`, `reading`; `order-words` (planejado).
- **Avaliação/esforço:** 8/10 + rotina coerente de 4 frases; 60 min + 25 min.

### `a1-l09` — Faço ou não faço

- **Meta comunicativa:** negar ação/identidade e responder sobre hábitos.
- **Prévio:** `a1-l08`; **revisão:** cópula de `a1-l01` e presente de `a1-l08`.
- **Vocabulário:** hábitos adicionais, frequência básica, confirmação; 10–12 itens.
- **Gramática:** `안` + predicado, `아니에요`; contraste inicial com `못` apenas como bloco de incapacidade.
- **Diálogo:** duas pessoas com rotinas diferentes.
- **Escuta:** distinguir afirmação, negação e incapacidade formulaica.
- **Escrita:** 3 afirmações e 3 negações verdadeiras sobre a rotina.
- **Exercícios:** contextual, `cloze`, `listen`, `mcq`, `translate`.
- **Avaliação/esforço:** 8/10 + negar corretamente 4 de 5 enunciados; 50 min + 20 min.

### `a1-l10` — Do começo ao fim do dia

- **Meta comunicativa:** organizar rotina por intervalo e sequência simples.
- **Prévio:** `a1-l09`; **revisão:** `a1-l06`–`a1-l09`.
- **Vocabulário:** partes do dia, antes/depois como expressões, escola/trabalho/casa; 10–12 itens.
- **Gramática:** `부터/까지`; `그리고`; elipse de tópico em sequência controlada.
- **Diálogo:** explicar disponibilidade ao marcar encontro.
- **Escuta:** identificar começo, fim e ordem de atividades.
- **Escrita:** agenda comentada de 5 frases.
- **Exercícios:** contextual, `reading`, `listen`, `cloze`, `translate`; `order-words` (planejado).
- **Avaliação/esforço:** 8/10 + sequência temporal sem contradição; 55 min + 25 min.

### Checkpoint `a1-c02` — Dados, horário e rotina

Abrange `a1-l06`–`a1-l10` e recupera `a1-l01`–`a1-l05`; 25 itens (mínimo 20) + agenda/rotina de 5 frases. Esforço: 40 min. Pré-requisitos: cinco lições e `a1-c01`.

## Módulo 3 — Pessoas e casa (`a1-m03`)

### `a1-l11` — Minha família

- **Meta comunicativa:** apresentar relações familiares sem presumir uma única configuração.
- **Prévio:** `a1-c02`; **revisão:** apresentação e idade de `a1-l01`/`a1-l06`.
- **Vocabulário:** relações familiares e pessoas próximas; 12–14 itens com notas de uso.
- **Gramática:** posse/relação `의` (incluindo omissão frequente); `우리` como uso cultural contextualizado.
- **Diálogo:** mostrar uma foto e apresentar pessoas.
- **Escuta:** identificar relação, nome e idade aproximada.
- **Escrita:** 4 frases sobre pessoas reais ou fictícias.
- **Exercícios:** contextual, `listen`, `reading`, `cloze`, `translate`.
- **Avaliação/esforço:** 8/10 + apresentação inclusiva de 3 pessoas; 55 min + 25 min.

### `a1-l12` — Como é essa pessoa?

- **Meta comunicativa:** descrever traços visíveis/gerais e evitar julgamentos inadequados.
- **Prévio:** `a1-l11`; **revisão:** pessoas de `a1-l11` e presente de `a1-l08`.
- **Vocabulário:** adjetivos básicos de aparência, tamanho e personalidade neutra; 10–12 itens.
- **Gramática:** predicados descritivos no presente `-아요/어요`; sujeito `이/가`.
- **Diálogo:** identificar alguém para um encontro.
- **Escuta:** escolher pessoa a partir de 2–3 características.
- **Escrita:** 3 descrições curtas sem comparação avaliativa.
- **Exercícios:** contextual, `mcq`, `listen`, `cloze`, `reading`.
- **Avaliação/esforço:** 8/10 + descrição identificável de 3 traços; 55 min + 20 min.

### `a1-l13` — Na minha casa

- **Meta comunicativa:** nomear cômodos/móveis e localizar itens.
- **Prévio:** `a1-l12`; **revisão:** existência/localização de `a1-l04`.
- **Vocabulário:** cômodos, móveis e objetos domésticos; 12–14 itens.
- **Gramática:** expansão de `에 있어요/없어요`; marcadores de posição (`앞/뒤/옆/안/밖`).
- **Diálogo:** explicar onde está um objeto em casa.
- **Escuta:** montar mapa simples de posição.
- **Escrita:** 5 frases descrevendo um cômodo real ou imaginário.
- **Exercícios:** contextual, `listen`, `cloze`, `mcq`, `reading`.
- **Avaliação/esforço:** 8/10 + localizar 5 itens sem ambiguidade; 55 min + 25 min.

### `a1-l14` — O que fazemos em casa

- **Meta comunicativa:** dizer ações e seus objetos em ambiente doméstico.
- **Prévio:** `a1-l13`; **revisão:** ações de `a1-l08` e casa de `a1-l13`.
- **Vocabulário:** cozinhar, limpar, ler, assistir, ouvir, usar; 10–12 itens.
- **Gramática:** objeto `을/를`; contraste básico `에` (destino/localização) × `에서` (lugar da ação).
- **Diálogo:** dividir atividades numa casa compartilhada.
- **Escuta:** identificar ação, objeto e lugar.
- **Escrita:** 4 frases lugar–objeto–ação.
- **Exercícios:** contextual, `cloze`, `listen`, `translate`, `reading`; `order-words` (planejado).
- **Avaliação/esforço:** 8/10 + 4 relações corretas ação/objeto/lugar; 60 min + 25 min.

### `a1-l15` — Visita e tratamento

- **Meta comunicativa:** chegar, entrar, agradecer e tratar alguém com cortesia básica.
- **Prévio:** `a1-l14`; **revisão:** pedidos/reparo de `a1-l05` e casa de `a1-l13`–`a1-l14`.
- **Vocabulário:** visita, entrada, assento, água, títulos/tratamentos frequentes; 10–12 itens.
- **Gramática:** pedidos/convites formulaicos com `(으)세요`; contraste de tratamento sem ensinar banmal produtivo.
- **Diálogo:** primeira visita a uma casa.
- **Escuta:** reconhecer convite, agradecimento e resposta cortês.
- **Escrita:** mensagem curta de chegada/agradecimento.
- **Exercícios:** contextual, `listen`, `reading`, `cloze`, `mcq`; `dialogue-choice` (planejado).
- **Avaliação/esforço:** 8/10 + registro adequado em 4 de 5 cenários; 50 min + 25 min.

### Checkpoint `a1-c03` — Pessoas, casa e cortesia

Abrange `a1-l11`–`a1-l15` e recupera localização/presente; 25 itens (mínimo 20) + descrição de pessoa/casa. Esforço: 40 min. Pré-requisitos: cinco lições e `a1-c02`.

## Módulo 4 — Comida e compras (`a1-m04`)

### `a1-l16` — Do que você gosta?

- **Meta comunicativa:** expressar gosto e perguntar preferências de comida/bebida.
- **Prévio:** `a1-c03`; **revisão:** presente e sujeito de `a1-l08`/`a1-l12`.
- **Vocabulário:** alimentos, bebidas, gosto/desgosto; 12–14 itens.
- **Gramática:** `좋아해요/싫어해요`; objeto `을/를`; pergunta `어떤` em preferência simples.
- **Diálogo:** escolher algo para comer juntos.
- **Escuta:** mapear pessoa a preferência.
- **Escrita:** 4 frases de gosto e 2 perguntas.
- **Exercícios:** contextual, `listen`, `cloze`, `mcq`, `translate`.
- **Avaliação/esforço:** 8/10 + troca de 3 preferências; 55 min + 25 min.

### `a1-l17` — Um pedido, por favor

- **Meta comunicativa:** pedir itens e combinar opções num café/restaurante.
- **Prévio:** `a1-l16`; **revisão:** `주세요` de `a1-l05` e alimentos de `a1-l16`.
- **Vocabulário:** cardápio, prato, bebida, pedido e serviço; 10–12 itens.
- **Gramática:** substantivo + `주세요`; coordenação nominal `하고`; `뭐 드릴까요?` apenas receptivo/formulaico.
- **Diálogo:** pedido curto no balcão.
- **Escuta:** identificar itens e alterações de pedido.
- **Escrita:** anotar pedido de 3 itens.
- **Exercícios:** contextual, `listen`, `reading`, `cloze`, `mcq`; `dialogue-choice` (planejado).
- **Avaliação/esforço:** 8/10 + pedido completo e cortês; 50 min + 20 min.

### `a1-l18` — Quantos e quanto custa?

- **Meta comunicativa:** perguntar quantidade/preço e compreender a resposta.
- **Prévio:** `a1-l17`; **revisão:** números de `a1-l06` e itens de `a1-l16`–`a1-l17`.
- **Vocabulário:** dinheiro, preço e contadores `개/명/잔/병`; 10–12 itens.
- **Gramática:** numeral + contador; `몇`, `얼마예요?`; sino-coreano para preço.
- **Diálogo:** confirmar quantidade e total de uma compra.
- **Escuta:** distinguir quantidade, contador e preço.
- **Escrita:** lista de compras com quantidade/preço.
- **Exercícios:** contextual, `listen`, `cloze`, `reading`, `translate`.
- **Avaliação/esforço:** 8/10 + 4 de 5 transações corretas; 60 min + 25 min.

### `a1-l19` — Quero este

- **Meta comunicativa:** selecionar produto por tamanho/cor e perguntar disponibilidade.
- **Prévio:** `a1-l18`; **revisão:** demonstrativos de `a1-l03`, descrição de `a1-l12`, preço de `a1-l18`.
- **Vocabulário:** roupa/objetos básicos, cores, tamanho, disponibilidade; 12–14 itens.
- **Gramática:** modificadores demonstrativos; `있어요/없어요`; `더` e comparação apenas em escolhas simples.
- **Diálogo:** escolher um produto em loja.
- **Escuta:** identificar variante solicitada e resposta de estoque.
- **Escrita:** pedido curto com produto, cor, tamanho e quantidade.
- **Exercícios:** contextual, `listen`, `mcq`, `cloze`, `reading`.
- **Avaliação/esforço:** 8/10 + especificar produto sem ambiguidade; 55 min + 25 min.

### `a1-l20` — O que você quer fazer ou comer?

- **Meta comunicativa:** expressar desejo imediato e negociar escolha simples.
- **Prévio:** `a1-l19`; **revisão:** ações de `a1-l08`, preferências/pedidos de `a1-l16`–`a1-l19`.
- **Vocabulário:** desejos, opções, mais/menos, junto/separado; 10–12 itens.
- **Gramática:** `-고 싶어요`; pergunta correspondente; revisão de `안` para recusa simples.
- **Diálogo:** decidir refeição ou compra com outra pessoa.
- **Escuta:** distinguir desejo, preferência e recusa.
- **Escrita:** 4 desejos e uma escolha justificada por bloco simples.
- **Exercícios:** contextual, `cloze`, `listen`, `translate`, `reading`; `dialogue-choice` (planejado).
- **Avaliação/esforço:** 8/10 + chegar a escolha em diálogo guiado; 55 min + 25 min.

### Checkpoint `a1-c04` — Comer e comprar

Abrange `a1-l16`–`a1-l20` e recupera números/demonstrativos; 25 itens (mínimo 20) + transação roteirizada. Esforço: 45 min. Pré-requisitos: cinco lições e `a1-c03`.

## Módulo 5 — Lugares e deslocamento (`a1-m05`)

### `a1-l21` — Aonde você vai?

- **Meta comunicativa:** dizer origem/destino e perguntar para onde alguém vai.
- **Prévio:** `a1-c04`; **revisão:** lugares/localização de `a1-l04` e presente de `a1-l08`.
- **Vocabulário:** lugares da cidade, ir/vir, casa/escola/trabalho; 12–14 itens.
- **Gramática:** destino `에 가요/와요`; `어디에`; tópico omitido em respostas previsíveis.
- **Diálogo:** colegas dizem para onde vão depois da aula.
- **Escuta:** identificar pessoa, origem e destino.
- **Escrita:** 4 deslocamentos com tempo e destino.
- **Exercícios:** contextual, `listen`, `cloze`, `reading`, `translate`.
- **Avaliação/esforço:** 8/10 + informar 4 destinos corretamente; 55 min + 25 min.

### `a1-l22` — Como você vai?

- **Meta comunicativa:** dizer meio de transporte e duração aproximada.
- **Prévio:** `a1-l21`; **revisão:** números/tempo de `a1-l06`–`a1-l07` e destino de `a1-l21`.
- **Vocabulário:** transporte, a pé, minutos/horas, rápido/devagar; 10–12 itens.
- **Gramática:** meio/instrumento `(으)로`; duração com `걸려요` como bloco frequente.
- **Diálogo:** comparar trajetos para um lugar.
- **Escuta:** associar destino, transporte e duração.
- **Escrita:** 3 trajetos completos.
- **Exercícios:** contextual, `listen`, `cloze`, `mcq`, `reading`.
- **Avaliação/esforço:** 8/10 + descrever um trajeto em 3 dados; 55 min + 20 min.

### `a1-l23` — Onde fica?

- **Meta comunicativa:** perguntar localização e compreender direção espacial curta.
- **Prévio:** `a1-l22`; **revisão:** posição de `a1-l13` e lugares de `a1-l21`.
- **Vocabulário:** rua, cruzamento, estação, perto/longe, esquerda/direita/reto; 12–14 itens.
- **Gramática:** `어디에 있어요?`; `에서` como ponto de partida; posição + `에`.
- **Diálogo:** pedir localização de uma estação/loja.
- **Escuta:** seguir 2–3 etapas num mapa simples.
- **Escrita:** indicar localização com 3 relações espaciais.
- **Exercícios:** contextual, `listen`, `reading`, `cloze`, `mcq`.
- **Avaliação/esforço:** 8/10 + localizar destino sem etapa contraditória; 60 min + 25 min.

### `a1-l24` — Vá reto, por favor

- **Meta comunicativa:** dar/seguir instruções e pedidos curtos com cortesia.
- **Prévio:** `a1-l23`; **revisão:** pedidos de `a1-l05`/`a1-l15` e direções de `a1-l23`.
- **Vocabulário:** virar, atravessar, parar, entrar, sair, esperar; 10–12 itens.
- **Gramática:** `(으)세요` produtivo em instrução/pedido; `주세요` com ação em blocos controlados.
- **Diálogo:** passageiro pede orientação a funcionário.
- **Escuta:** executar sequência de 3 instruções.
- **Escrita:** 3 instruções para um mapa.
- **Exercícios:** contextual, `listen`, `cloze`, `reading`, `translate`; `order-words` (planejado).
- **Avaliação/esforço:** 8/10 + sequência correta de 3 instruções; 55 min + 25 min.

### `a1-l25` — Vamos juntos?

- **Meta comunicativa:** sugerir destino/horário e aceitar ou recusar.
- **Prévio:** `a1-l24`; **revisão:** desejo de `a1-l20`, horário de `a1-l07`, transporte de `a1-l21`–`a1-l24`.
- **Vocabulário:** encontro, junto, cedo/tarde, disponível/ocupado; 10–12 itens.
- **Gramática:** sugestão `(으)ㄹ까요?`; respostas formulaicas `좋아요/미안하지만…`.
- **Diálogo:** combinar deslocamento para um encontro.
- **Escuta:** identificar proposta, mudança e acordo final.
- **Escrita:** mensagem de encontro com lugar/hora/transporte.
- **Exercícios:** contextual, `listen`, `reading`, `cloze`, `translate`; `dialogue-choice` (planejado).
- **Avaliação/esforço:** 8/10 + acordo com três dados completos; 55 min + 25 min.

### Checkpoint `a1-c05` — Chegar a um lugar

Abrange `a1-l21`–`a1-l25` e recupera tempo/pedidos; 25 itens (mínimo 20) + mapa/encontro. Esforço: 45 min. Pré-requisitos: cinco lições e `a1-c04`.

## Módulo 6 — Lazer e vida social (`a1-m06`)

### `a1-l26` — O que você faz no tempo livre?

- **Meta comunicativa:** falar de hobbies e frequência simples.
- **Prévio:** `a1-c05`; **revisão:** rotina de `a1-l08`–`a1-l10` e preferência de `a1-l16`.
- **Vocabulário:** esportes, música, leitura, filmes, jogos, frequência; 12–14 itens.
- **Gramática:** `자주/가끔/별로`; objeto `을/를`; `좋아해요` + atividade nominalizada só como bloco.
- **Diálogo:** conhecer interesses de um novo colega.
- **Escuta:** associar pessoas, hobbies e frequência.
- **Escrita:** 4 frases sobre lazer.
- **Exercícios:** contextual, `listen`, `cloze`, `reading`, `translate`.
- **Avaliação/esforço:** 8/10 + descrever 3 hobbies/frequências; 55 min + 25 min.

### `a1-l27` — Sei fazer ou não consigo

- **Meta comunicativa:** informar capacidade prática e pedir ajuda.
- **Prévio:** `a1-l26`; **revisão:** negação de `a1-l09` e reparo de `a1-l05`.
- **Vocabulário:** saber, conseguir, bem/mal, fácil/difícil, habilidades frequentes; 10–12 itens.
- **Gramática:** `잘/못` + verbo; `(으)ㄹ 수 있어요/없어요` em produção controlada.
- **Diálogo:** organizar atividade conforme habilidades do grupo.
- **Escuta:** distinguir preferência, capacidade e incapacidade.
- **Escrita:** 3 capacidades e 2 pedidos de ajuda.
- **Exercícios:** contextual, `listen`, `cloze`, `mcq`, `translate`.
- **Avaliação/esforço:** 8/10 + expressar capacidade em 4 cenários; 60 min + 25 min.

### `a1-l28` — Quer vir comigo?

- **Meta comunicativa:** convidar, aceitar, recusar e propor alternativa.
- **Prévio:** `a1-l27`; **revisão:** sugestão de `a1-l25` e hobbies de `a1-l26`.
- **Vocabulário:** convite, evento, cinema/parque/café, disponibilidade; 10–12 itens.
- **Gramática:** `(으)ㄹ까요?` revisitado; `같이`; recusa cortês com razão curta formulaica.
- **Diálogo:** convite para atividade no fim de semana.
- **Escuta:** localizar evento, dia/hora e resposta.
- **Escrita:** convite/mensagem de resposta com 3 dados.
- **Exercícios:** contextual, `listen`, `reading`, `cloze`, `translate`; `dialogue-choice` (planejado).
- **Avaliação/esforço:** 8/10 + convite e resposta socialmente adequados; 50 min + 20 min.

### `a1-l29` — Meu plano

- **Meta comunicativa:** dizer um plano futuro simples.
- **Prévio:** `a1-l28`; **revisão:** tempo de `a1-l07`, desejo de `a1-l20`, convite de `a1-l28`.
- **Vocabulário:** fim de semana, viagem curta, compromisso, preparar/encontrar; 10–12 itens.
- **Gramática:** futuro/intenção `(으)ㄹ 거예요`; marcadores temporais sem `에` quando lexicalizados.
- **Diálogo:** trocar planos para o fim de semana.
- **Escuta:** distinguir plano, horário e companhia.
- **Escrita:** 4 frases de plano e uma pergunta.
- **Exercícios:** contextual, `listen`, `cloze`, `reading`, `translate`.
- **Avaliação/esforço:** 8/10 + plano de 4 dados coerentes; 55 min + 25 min.

### `a1-l30` — Uma mensagem curta

- **Meta comunicativa:** enviar mensagem de encontro, agradecimento, desculpa ou mudança.
- **Prévio:** `a1-l29`; **revisão:** reparo de `a1-l05`, tempo de `a1-l07`, sequência de `a1-l10`.
- **Vocabulário:** mensagem, chegar, atrasar, mudar, confirmar, desculpar/agradecer; 10–12 itens.
- **Gramática:** conector `-고` em enumeração simples; `그래서` como ligação de resultado formulaica.
- **Diálogo:** troca de mensagens para alterar um encontro.
- **Escuta:** compreender mensagem de voz curta com mudança principal.
- **Escrita:** mensagem de 3–5 frases com saudação e fechamento adequados.
- **Exercícios:** contextual, `reading`, `listen`, `cloze`, `translate`; `short-answer` (planejado).
- **Avaliação/esforço:** 8/10 + mensagem contém motivo, mudança e cortesia; 60 min + 25 min.

### Checkpoint `a1-c06` — Convites, capacidades e planos

Abrange `a1-l26`–`a1-l30` e recupera tempo/desejo; 25 itens (mínimo 20) + convite/mensagem. Esforço: 45 min. Pré-requisitos: cinco lições e `a1-c05`.

## Módulo 7 — Experiências, clima e saúde (`a1-m07`)

### `a1-l31` — O que você fez?

- **Meta comunicativa:** relatar atividade passada curta.
- **Prévio:** `a1-c06`; **revisão:** presente de `a1-l08`, conectores de `a1-l10`/`a1-l30`.
- **Vocabulário:** ontem/fim de semana, encontrar, visitar, ver, comer, fazer; 10–12 itens.
- **Gramática:** passado `-았/었어요`; formas frequentes irregulares só quando previstas lexicalmente.
- **Diálogo:** comentar o que fez no fim de semana.
- **Escuta:** ordenar 3 eventos passados.
- **Escrita:** 4 frases sobre um dia passado real ou fictício.
- **Exercícios:** contextual, `listen`, `cloze`, `reading`, `translate`; `order-words` (planejado).
- **Avaliação/esforço:** 8/10 + relato temporalmente coerente; 60 min + 25 min.

### `a1-l32` — Como está o tempo?

- **Meta comunicativa:** descrever clima/estação e escolher plano adequado.
- **Prévio:** `a1-l31`; **revisão:** descrição de `a1-l12` e planos de `a1-l29`.
- **Vocabulário:** sol, chuva, neve, vento, quente/frio, estações; 12–14 itens.
- **Gramática:** predicados descritivos; `많이/조금`; `그래서` em causa previsível.
- **Diálogo:** ajustar plano por causa do clima.
- **Escuta:** identificar clima, temperatura aproximada e decisão.
- **Escrita:** previsão simples + plano de 3 frases.
- **Exercícios:** contextual, `listen`, `reading`, `cloze`, `mcq`.
- **Avaliação/esforço:** 8/10 + combinar clima/plano em 4 de 5 casos; 55 min + 20 min.

### `a1-l33` — Não estou bem

- **Meta comunicativa:** nomear parte do corpo e sintoma básico.
- **Prévio:** `a1-l32`; **revisão:** existência/negação de `a1-l04`/`a1-l09` e descrição de estado.
- **Vocabulário:** partes do corpo, dor, febre, tosse, cansaço, hospital/farmácia; 12–14 itens.
- **Gramática:** `이/가 아파요`; `있어요` para sintoma; intensificadores básicos.
- **Diálogo:** explicar sintoma a atendente/amigo.
- **Escuta:** localizar pessoa, parte do corpo e intensidade.
- **Escrita:** ficha breve de 3 sintomas/necessidades.
- **Exercícios:** contextual, `listen`, `cloze`, `reading`, `translate`.
- **Avaliação/esforço:** 8/10 + comunicar sintoma sem diagnóstico inventado; 55 min + 25 min.

### `a1-l34` — Descanse e não faça isso

- **Meta comunicativa:** compreender/dar recomendação cotidiana e proibição simples.
- **Prévio:** `a1-l33`; **revisão:** instruções de `a1-l24` e saúde de `a1-l33`.
- **Vocabulário:** descansar, beber, tomar, dormir, evitar, medicamento; 10–12 itens.
- **Gramática:** `(으)세요` revisitado; proibição `-지 마세요`; limites entre conselho linguístico e orientação médica.
- **Diálogo:** atendente dá instruções simples; sem diagnóstico.
- **Escuta:** distinguir ação recomendada e proibida.
- **Escrita:** 3 recomendações controladas para cenário fictício.
- **Exercícios:** contextual, `listen`, `cloze`, `mcq`, `reading`.
- **Avaliação/esforço:** 8/10 + interpretar 4 de 5 instruções; 55 min + 20 min.

### `a1-l35` — Minha primeira visita

- **Meta comunicativa:** relatar visita/experiência concreta com lugar, tempo e avaliação simples.
- **Prévio:** `a1-l34`; **revisão:** passado de `a1-l31`, lugares de `a1-l21`, clima de `a1-l32`.
- **Vocabulário:** atração, viagem, foto, bonito/interessante/divertido, chegada/saída; 10–12 itens.
- **Gramática:** passado cumulativo; conectores `그리고/그래서`; `어땠어요?` como pergunta frequente.
- **Diálogo:** contar uma visita recente.
- **Escuta:** extrair lugar, companhia, atividade e avaliação.
- **Escrita:** relato de 5 frases com ordem simples.
- **Exercícios:** contextual, `listen`, `reading`, `cloze`, `translate`; `short-answer` (planejado).
- **Avaliação/esforço:** 8/10 + relato contém 4 elementos essenciais; 60 min + 30 min.

### Checkpoint `a1-c07` — Passado, clima e saúde

Abrange `a1-l31`–`a1-l35` e recupera instruções/planos; 25 itens (mínimo 20) + relato e interpretação de saúde. Esforço: 45 min. Pré-requisitos: cinco lições e `a1-c06`.

## Módulo 8 — Integração A1 (`a1-m08`)

### `a1-l36` — Resolver uma refeição

- **Meta comunicativa:** integrar preferência, pedido, quantidade, preço e reparo.
- **Prévio:** `a1-c07`; **revisão:** `a1-l05`, `a1-l16`–`a1-l20`, `a1-l27`.
- **Vocabulário:** reuso prioritário; alergia/restrição apenas como necessidades linguísticas básicas; 8–10 novos.
- **Gramática:** revisão de `주세요`, contadores, negação/desejo e perguntas.
- **Diálogo:** pedido com indisponibilidade e alternativa.
- **Escuta:** acompanhar 5–6 turnos e identificar solução final.
- **Escrita:** pedido/mensagem com restrição e alternativa.
- **Exercícios:** contextual, `listen`, `reading`, `cloze`, `translate`; `dialogue-choice` (planejado).
- **Avaliação/esforço:** 8/10 + concluir transação com reparo; 60 min + 25 min.

### `a1-l37` — Encontrar e chegar

- **Meta comunicativa:** integrar aviso, horário, transporte, direção e mudança.
- **Prévio:** `a1-l36`; **revisão:** `a1-l07`, `a1-l21`–`a1-l25`, `a1-l30`.
- **Vocabulário:** reuso prioritário + entrada/saída/plataforma/fechado; 8–10 novos.
- **Gramática:** revisão de `에/에서/(으)로`, futuro e instruções.
- **Diálogo:** trajeto muda e o aprendiz pede nova direção.
- **Escuta:** extrair 5 dados de aviso/diálogo curto.
- **Escrita:** instrução de encontro com alternativa.
- **Exercícios:** contextual, `listen`, `reading`, `cloze`, `mcq`; `order-words` (planejado).
- **Avaliação/esforço:** 8/10 + plano de chegada completo; 60 min + 25 min.

### `a1-l38` — Manter contato

- **Meta comunicativa:** combinar, confirmar, agradecer, desculpar-se e remarcar por mensagem.
- **Prévio:** `a1-l37`; **revisão:** `a1-l05`, `a1-l15`, `a1-l28`–`a1-l30`.
- **Vocabulário:** reuso prioritário + contato, resposta, confirmação; 8–10 novos.
- **Gramática:** revisão de `-고`, `그래서`, passado/futuro e fórmulas de cortesia.
- **Diálogo:** sequência de mensagens antes/depois de um encontro.
- **Escuta:** compreender mensagem de voz com pedido e motivo.
- **Escrita:** cadeia coerente de 3 mensagens curtas.
- **Exercícios:** contextual, `reading`, `listen`, `cloze`, `translate`; `short-answer` (planejado).
- **Avaliação/esforço:** 8/10 + mensagens cumprem intenção/registro; 60 min + 30 min.

### `a1-l39` — Meu perfil em coreano

- **Meta comunicativa:** integrar identidade, pessoas, rotina, preferências, capacidade e planos.
- **Prévio:** `a1-l38`; **revisão:** todos os módulos, com foco `a1-l01`–`a1-l12` e `a1-l26`–`a1-l29`.
- **Vocabulário:** reuso; conectores e campos de perfil, 6–8 novos no máximo.
- **Gramática:** revisão cumulativa; coesão com `그리고/-고`; escolha de tópico/sujeito/objeto.
- **Diálogo:** entrevista guiada de apresentação.
- **Escuta:** compreender perfil de 6–8 frases e localizar 6 dados.
- **Escrita:** perfil de 6 frases; versão aberta usa rubrica humana/autoavaliação.
- **Exercícios:** contextual, `listen`, `reading`, `cloze`, `translate`; `short-answer` (planejado).
- **Avaliação/esforço:** 8/10 + perfil cobre 5 categorias; 60 min + 30 min.

### `a1-l40` — Consigo me virar

- **Meta comunicativa:** completar interação cotidiana com pedido de ajuda e reparo quando necessário.
- **Prévio:** `a1-l39`; **revisão:** `a1-l01`–`a1-l39`, amostra espaçada por resultados.
- **Vocabulário:** nenhum alvo obrigatório além de 4–6 expressões de reparo/consolidação.
- **Gramática:** seleção cumulativa conforme intenção; não introduz estrutura central nova.
- **Diálogo:** cadeia original com apresentação, deslocamento, transação e mudança de plano.
- **Escuta:** compreender essência e dados concretos em diálogo de até 6 turnos lentos.
- **Escrita:** nota final de 5–6 frases e formulário funcional.
- **Exercícios:** contextual, `listen`, `reading`, `cloze`, `translate`, `mcq`; formatos planejados apenas como prática não obrigatória.
- **Avaliação/esforço:** 8/10 + concluir 4 de 5 intenções com reparo adequado; 60 min + 30 min.

### Checkpoint final `a1-c08` — Desempenho A1 interno

Abrange `a1-l01`–`a1-l40` e todos os checkpoints anteriores. São 40 itens avaliados (mínimo 32): 10 escuta, 10 leitura, 10 vocabulário/gramática contextual e 10 interação/escrita controlada. Acrescenta 6 tarefas funcionais por rubrica, com sucesso em pelo menos 5; fala aberta e escrita livre não recebem nota automática. Esforço: 60–75 min, podendo ser dividido em duas sessões. A conclusão é interna, sem certificação CEFR/TOPIK.

## Ordem estrutural

`a1-l01` → … → `a1-l05` → `a1-c01` → `a1-l06` → … → `a1-c02` → … → `a1-l40` → `a1-c08`.

Cada primeira lição de módulo depende do checkpoint anterior; as demais dependem da lição imediatamente anterior. Cada checkpoint depende das cinco lições do módulo e de todos os checkpoints anteriores. Assim, progresso inconsistente nunca abre um atalho.
