import { cloze, defineB1Lesson, listen, mcq, reading, translate } from "./shared";

/** b1-l31 — relato jornalístico com fonte e verificação. */
export const B1_L31 = defineB1Lesson({
  id: "b1-l31", number: 31, moduleId: "b1-m07", title: "Segundo a notícia",
  objective: "Relatar informação jornalística com fonte explícita e separar o que está confirmado do que é comentário.",
  prerequisites: ["b1-c06"], estimatedMinutes: 65, dialogueTitle: "A notícia da manhã",
  intro: [
    { title: "-에 따르면 — segundo a fonte", body: "A expressão -에 따르면 atribui a informação a uma fonte: “segundo…”. Ela aparece no início da frase ou logo depois do nome da fonte e é típica de notícias e relatórios.", ko: "보도에 따르면 공사가 다음 달에 시작돼요." },
    { title: "-다고 한다 — o que dizem", body: "A forma -다고 한다 relata uma afirmação de terceiros que o falante não confirmou pessoalmente. É mais impessoal que -다고 했어요 e costuma vir acompanhada da fonte.", ko: "피해가 크다고 한다." },
  ],
  dialogue: [
    ["지민", "오늘 아침에 나온 기사 봤어요?", "Você viu a notícia que saiu hoje de manhã?"],
    ["수진", "네. 보도에 따르면 그 시장이 다음 달에 문을 닫는다고 해요.", "Sim. Segundo a reportagem, dizem que aquele mercado fecha no mês que vem."],
    ["지민", "이 소식을 처음 알린 사람이 누구예요?", "Quem foi a primeira pessoa a divulgar essa notícia?"],
    ["수진", "시청 발표를 인용한 기사예요. 그래도 원문을 확인해야 해요.", "É uma matéria que cita um anúncio da prefeitura. Ainda assim, é preciso verificar o texto original."],
    ["지민", "다른 매체에서도 같은 내용을 보도했어요?", "Outros veículos também noticiaram o mesmo conteúdo?"],
    ["수진", "두 곳은 보도했는데, 한 곳은 논평만 있고 자료가 없었어요.", "Dois noticiaram, mas um só tinha comentário e nenhum dado."],
  ],
  reusedIds: ["ko:확인하다", "ko:자료", "ko:사람", "ko:소식"],
  grammar: [
    ["-에 따르면 — atribuir a fonte", "명사 + -에 따르면", "Use -에 따르면 para indicar de onde vem a informação. A fonte pode ser uma pessoa, um documento ou um veículo. Sem fonte explícita, a frase perde credibilidade no registro jornalístico.", [["보도에 따르면 시장이 다음 달에 문을 닫는다고 해요.", "Segundo a reportagem, o mercado fecha no mês que vem."], ["시청 발표에 따르면 공사가 내년에 끝난다고 해요.", "Segundo o anúncio da prefeitura, a obra termina no ano que vem."]]],
    ["-다고 한다 — informação de terceiros", "동사/형용사 + -다고 한다", "A forma relata o que outra pessoa afirmou, sem que o falante tenha verificado. É comum em notícias e resumos. Diferente de -다고 했어요, que aponta para uma fala concreta já mencionada.", [["기사에 따르면 피해가 크다고 한다.", "Segundo a notícia, dizem que o prejuízo é grande."], ["그 시장은 오래전부터 유명하다고 한다.", "Dizem que esse mercado é famoso há muito tempo."]]],
  ],
  guided: [
    mcq("O que a reportagem afirma sobre o mercado?", ["Que ele fecha no mês que vem.", "Que ele mudou de endereço.", "Que ele foi reformado."], "Que ele fecha no mês que vem.", "보도에 따르면 … 문을 닫는다고 해요."),
    cloze("Complete a fonte da informação: 보도___ 따르면 시장이 문을 닫는다고 해요.", "에", "A fonte recebe -에 따르면: 보도에 따르면."),
    listen("Ouça e escreva de onde vem a informação citada.", "시청 발표를 인용한 기사예요.", "시청 발표를 인용한 기사예요.", "A matéria cita um anúncio da prefeitura.", ["시청 발표를 인용한 기사예요"]),
    reading("보도에 따르면 시장이 다음 달에 문을 닫는다고 해요. 기사는 시청 발표를 인용했지만, 원문은 아직 공개되지 않았어요.", "O que ainda falta para confirmar a notícia?", ["O texto original do anúncio.", "A data do fechamento.", "O nome do mercado."], "O texto original do anúncio.", "원문은 아직 공개되지 않았어요."),
    translate("pt-ko", "Traduza: “Segundo a reportagem, o mercado fecha no mês que vem.”", "보도에 따르면 시장이 다음 달에 문을 닫는다고 해요.", "Fonte com -에 따르면 e relato com -다고 해요.", ["보도에 따르면 그 시장은 다음 달에 문을 닫는다고 해요."]),
  ],
  independent: [
    mcq("Qual frase relata informação de terceiros com fonte explícita?", ["보도에 따르면 피해가 크다고 한다.", "피해가 커요.", "피해가 컸어요."], "보도에 따르면 피해가 크다고 한다.", "-에 따르면 apresenta a fonte e -다고 한다 relata a informação."),
    cloze("Complete o relato indireto: 피해가 크___ 한다.", "다고", "형용사 크다 + -다고 한다: 크다고 한다."),
    listen("Ouça e escreva o que faltava em um dos veículos.", "한 곳은 논평만 있고 자료가 없었어요.", "한 곳은 논평만 있고 자료가 없었어요.", "Um dos veículos tinha apenas comentário, sem dados.", ["한 곳은 논평만 있고 자료가 없었어요"]),
    translate("ko-pt", "Traduza: 보도에 따르면 시장이 다음 달에 문을 닫는다고 해요.", "Segundo a reportagem, o mercado fecha no mês que vem.", "보도에 따르면 marca a fonte; -다고 해요 relata a afirmação.", ["Segundo a reportagem, o mercado fecha no próximo mês."]),
    reading("같은 사건을 다룬 기사라도 매체마다 강조하는 부분이 달라요. 그래서 원문과 자료를 함께 확인하는 습관이 중요해요.", "Qual é o conselho do texto?", ["Conferir o original e os dados.", "Ler apenas um veículo.", "Evitar notícias de mercado."], "Conferir o original e os dados.", "원문과 자료를 함께 확인하는 습관이 중요해요."),
  ],
  summary: ["-에 따르면 atribui a informação a uma fonte.", "-다고 한다 relata a fala de terceiros sem confirmação pessoal.", "Notícia boa mostra fonte, dado e o que ainda não foi confirmado.", "Todo o coreano novo continua em revisão."],
  production: {
    titlePt: "Produção independente · resumo de notícia", promptPt: "Resuma uma notícia que você leu ou ouviu. Diga a fonte, o dado principal e o que ainda precisa ser confirmado. Escreva de quatro a cinco frases.", promptKo: "오늘 본 기사를 짧게 요약해 보세요.",
    guidance: ["Comece com a fonte usando -에 따르면.", "Relate a informação principal com -다고 한다.", "Diga o que ainda não foi confirmado."],
    checklist: ["A fonte aparece no início.", "O dado principal está claro.", "Há uma ressalva sobre o que falta confirmar.", "O resumo tem quatro ou cinco frases."], minWords: 35,
  },
});

/** b1-l32 — tese, exemplo e conclusão em texto conectado. */
export const B1_L32 = defineB1Lesson({
  id: "b1-l32", number: 32, moduleId: "b1-m07", title: "O que o texto diz",
  objective: "Identificar tese, exemplo e conclusão em um texto conectado e resumi-los.",
  prerequisites: ["b1-l31"], estimatedMinutes: 70, dialogueTitle: "A aula sobre o texto",
  intro: [
    { title: "-다는 내용이다 — o texto diz que", body: "Para resumir o conteúdo de um texto, use -다는 내용이다. A forma retoma a informação sem copiar a frase original e deixa claro que se trata do que o texto afirma.", ko: "글은 예산이 부족하다는 내용이에요." },
    { title: "-는 것으로 보이다 — pelo que se vê", body: "A forma -는 것으로 보이다 indica uma leitura baseada em indícios, não uma certeza. Serve para interpretar a intenção do autor com cautela.", ko: "계획이 아직 확정되지 않은 것으로 보여요." },
  ],
  dialogue: [
    ["선생님", "오늘 읽은 글의 요지가 뭐예요?", "Qual é a ideia central do texto que lemos hoje?"],
    ["마르코", "학교 버스가 줄어서 학생들이 불편하다는 내용이에요.", "O texto diz que os alunos estão incomodados porque os ônibus escolares diminuíram."],
    ["선생님", "좋아요. 그 주장을 뒷받침하는 예는 뭐였죠?", "Certo. Qual foi o exemplo que sustenta essa afirmação?"],
    ["마르코", "버스가 아침에 두 번밖에 없다는 예가 나와요.", "Aparece o exemplo de que há apenas dois ônibus pela manhã."],
    ["선생님", "맞아요. 그래서 글쓴이는 무엇을 제안해요?", "Isso. E o que o autor propõe por isso?"],
    ["마르코", "예산을 늘려야 한다는 결론으로 끝나요.", "Termina com a conclusão de que o orçamento precisa aumentar."],
  ],
  reusedIds: ["ko:학교", "ko:읽다", "ko:문제"],
  grammar: [
    ["-다는 내용이다 — resumir o conteúdo", "동사/형용사 + -다는 내용이다", "Use a forma para dizer o que um texto afirma. Ela resume sem reproduzir a frase inteira e funciona bem em fichamentos e apresentações.", [["글은 예산이 부족하다는 내용이에요.", "O texto diz que o orçamento é insuficiente."], ["기사는 버스가 줄었다는 내용이에요.", "A notícia diz que os ônibus diminuíram."]]],
    ["-는 것으로 보이다 — interpretar com cautela", "동사 + -는 것으로 보이다 / 형용사 + -(으)ㄴ 것으로 보이다", "A forma apresenta uma interpretação sustentada por indícios. Não é uma afirmação de fato; por isso combina com análises de texto e de dados.", [["계획이 아직 확정되지 않은 것으로 보여요.", "Parece que o plano ainda não foi confirmado."], ["글쓴이는 문제를 심각하게 보는 것으로 보여요.", "Parece que o autor vê o problema como grave."]]],
  ],
  guided: [
    mcq("Qual é a ideia central do texto discutido?", ["A redução dos ônibus escolares causa transtornos.", "Os alunos preferem caminhar para a escola.", "A escola comprou ônibus novos."], "A redução dos ônibus escolares causa transtornos.", "버스가 줄어서 학생들이 불편하다는 내용이에요."),
    cloze("Complete o resumo: 학교 버스가 줄었___ 내용이에요.", "다는", "줄었다 + -는 conteúdo: 줄었다는 내용이에요."),
    listen("Ouça e escreva qual exemplo aparece no texto.", "버스가 아침에 두 번밖에 없다는 예가 나와요.", "버스가 아침에 두 번밖에 없다는 예가 나와요.", "O texto dá o exemplo de que só há dois ônibus pela manhã.", ["버스가 아침에 두 번밖에 없다는 예가 나와요"]),
    reading("글은 학교 버스가 줄어서 학생들이 불편하다고 말해요. 예로 아침에는 버스가 두 번밖에 없다는 내용이 나와요. 글쓴이는 그래서 예산을 늘려야 한다고 주장해요.", "Qual é a conclusão do texto?", ["O orçamento precisa aumentar.", "Os alunos devem ir a pé.", "A escola deve fechar."], "O orçamento precisa aumentar.", "예산을 늘려야 한다는 결론으로 끝나요."),
    translate("pt-ko", "Traduza: “O texto diz que o orçamento é insuficiente.”", "글은 예산이 부족하다는 내용이에요.", "부족하다 + -다는 내용이다 resume a tese.", ["글은 예산이 부족하다는 내용이에요."]),
  ],
  independent: [
    mcq("Qual frase resume o conteúdo de um texto?", ["글은 예산이 부족하다는 내용이다.", "예산이 부족해요.", "예산을 늘릴까요?"], "글은 예산이 부족하다는 내용이다.", "-다는 내용이다 marca o resumo do texto."),
    cloze("Complete a interpretação cautelosa: 계획이 아직 확정되지 않은 것___ 보여요.", "으로", "-(으)ㄴ 것으로 보이다: 확정되지 않은 것으로 보여요."),
    listen("Ouça e escreva o transtorno citado no texto.", "버스가 두 번밖에 없어서 학생들이 아침에 오래 기다려요.", "버스가 두 번밖에 없어서 학생들이 아침에 오래 기다려요.", "Como só há dois ônibus, os alunos esperam muito pela manhã.", ["버스가 두 번밖에 없어서 학생들이 아침에 오래 기다려요"]),
    translate("ko-pt", "Traduza: 글쓴이는 예산을 늘려야 한다고 주장해요.", "O autor defende que o orçamento deve ser aumentado.", "-다고 주장하다 apresenta a tese do autor.", ["O autor argumenta que o orçamento precisa ser aumentado."]),
    reading("좋은 글은 요지가 먼저 보이고, 예가 그 요지를 받쳐 줘요. 마지막에는 글쓴이의 결론이 남아요. 이 세 부분을 찾으면 내용을 쉽게 정리할 수 있어요.", "O que ajuda a organizar o conteúdo de um texto?", ["Encontrar tese, exemplo e conclusão.", "Copiar todas as frases.", "Ler apenas o título."], "Encontrar tese, exemplo e conclusão.", "이 세 부분을 찾으면 내용을 쉽게 정리할 수 있어요."),
  ],
  summary: ["-다는 내용이다 resume o que um texto afirma.", "-는 것으로 보이다 interpreta com base em indícios.", "Tese, exemplo e conclusão organizam a leitura.", "Resumir não é copiar: é dizer o que o texto faz."],
  production: {
    titlePt: "Produção independente · resumo de texto", promptPt: "Escolha um texto curto que você leu e resuma a tese, um exemplo e a conclusão. Escreva de quatro a seis frases.", promptKo: "읽은 글의 요지와 예, 결론을 정리해 보세요.",
    guidance: ["Diga qual é a tese com -다는 내용이다.", "Apresente um exemplo concreto do texto.", "Feche com a conclusão do autor."],
    checklist: ["A tese está explícita.", "O exemplo está ligado à tese.", "A conclusão aparece no fim.", "Usei uma forma de interpretação cautelosa."], minWords: 38,
  },
});

/** b1-l33 — fato, opinião e inferência. */
export const B1_L33 = defineB1Lesson({
  id: "b1-l33", number: 33, moduleId: "b1-m07", title: "Fatos e opiniões",
  objective: "Separar fato, opinião e inferência em um artigo e justificar a classificação com o texto.",
  prerequisites: ["b1-l32"], estimatedMinutes: 70, dialogueTitle: "Duas leituras do mesmo artigo",
  intro: [
    { title: "-는 반면 — contraste entre dois lados", body: "-는 반면(에) coloca duas informações em contraste, como “enquanto” ou “ao passo que”. Com verbos, use -는 반면; com adjetivos, -(으)ㄴ 반면.", ko: "제목은 강한 반면 본문은 차분해요." },
    { title: "-다고 볼 수 있다 — pode-se considerar", body: "A forma apresenta uma interpretação sustentada por evidências. É diferente de afirmar um fato: sinaliza que alguém está lendo o texto de um certo ângulo.", ko: "그 문장은 의견이라고 볼 수 있어요." },
  ],
  dialogue: [
    ["지민", "이 기사 읽었어요? 제목이 아주 강해요.", "Você leu esta matéria? O título é bem forte."],
    ["수진", "읽었는데, 제목은 사실보다 논평에 가까워요.", "Li, mas o título está mais para comentário do que para fato."],
    ["지민", "그래도 본문에는 숫자가 있잖아요.", "Mas o corpo do texto tem números, não tem?"],
    ["수진", "숫자는 사실이지만, 최악이라는 표현은 의견이라고 볼 수 있어요.", "Os números são fato, mas a expressão “o pior” pode ser considerada opinião."],
    ["지민", "그럼 어느 부분이 추론이에요?", "Então qual parte é inferência?"],
    ["수진", "원인이 아직 확인되지 않았는데 기사가 원인을 하나만 말하는 부분이요.", "A parte em que a matéria aponta uma única causa, embora a causa ainda não tenha sido confirmada."],
  ],
  reusedIds: ["ko:의견", "ko:주장", "ko:확인하다"],
  grammar: [
    ["-는 반면 — enquanto, ao passo que", "동사 + -는 반면(에) / 형용사 + -(으)ㄴ 반면(에)", "A forma contrasta dois aspectos do mesmo objeto ou de objetos diferentes. Os dois lados precisam ser comparáveis; não use para simples sequência de ideias.", [["제목은 강한 반면 본문은 차분해요.", "O título é forte, enquanto o corpo do texto é contido."], ["숫자는 많은 반면 설명은 부족해요.", "Há muitos números, ao passo que a explicação é insuficiente."]]],
    ["-다고 볼 수 있다 — interpretação fundamentada", "동사/형용사 + -다고 볼 수 있다", "Use a forma para propor uma leitura apoiada no texto, sem transformá-la em fato. É comum em análise de discurso e em comentários críticos.", [["그 문장은 의견이라고 볼 수 있어요.", "Pode-se considerar que essa frase é opinião."], ["자료가 오래돼서 신뢰도가 낮다고 볼 수 있어요.", "Pode-se considerar que os dados têm baixa credibilidade por serem antigos."]]],
  ],
  guided: [
    mcq("O que os dois leitores tratam como fato?", ["Os números do corpo do texto.", "A palavra “o pior”.", "A causa apontada pela matéria."], "Os números do corpo do texto.", "숫자는 사실이지만 … 표현은 의견이라고 볼 수 있어요."),
    cloze("Complete o contraste: 제목은 강한 ___ 본문은 차분해요.", "반면", "형용사 강하다 + -(으)ㄴ 반면: 강한 반면."),
    listen("Ouça e escreva qual parte é considerada opinião.", "최악이라는 표현은 의견이라고 볼 수 있어요.", "최악이라는 표현은 의견이라고 볼 수 있어요.", "A expressão “o pior” pode ser vista como opinião.", ["최악이라는 표현은 의견이라고 볼 수 있어요"]),
    reading("기사 제목에는 최악이라는 표현이 있어요. 본문에는 사고 시간과 피해 규모가 숫자로 나와요. 하지만 사고 원인은 아직 확인되지 않았어요.", "Qual trecho é uma inferência?", ["A causa apontada pela matéria.", "O horário do acidente.", "O número de feridos."], "A causa apontada pela matéria.", "원인은 아직 확인되지 않았어요."),
    translate("pt-ko", "Traduza: “Esse trecho pode ser considerado uma opinião.”", "그 부분은 의견이라고 볼 수 있어요.", "볼 수 있어요 marca a interpretação, não o fato.", ["그 문장은 의견이라고 볼 수 있어요."]),
  ],
  independent: [
    mcq("Qual afirmação é um fato verificável?", ["O mercado fechou na segunda-feira.", "O mercado é o melhor da cidade.", "O fechamento foi injusto."], "O mercado fechou na segunda-feira.", "Data e fechamento podem ser conferidos; “melhor” e “injusto” são avaliações."),
    cloze("Complete a interpretação: 이 자료는 신뢰도가 높___ 볼 수 있어요.", "다고", "형용사 높다 + -다고 볼 수 있다: 높다고 볼 수 있어요."),
    listen("Ouça e escreva o que ainda não foi confirmado.", "원인은 아직 확인되지 않았어요.", "원인은 아직 확인되지 않았어요.", "A causa ainda não foi confirmada.", ["원인은 아직 확인되지 않았어요"]),
    translate("ko-pt", "Traduza: 제목은 강한 반면 본문은 차분해요.", "O título é forte, enquanto o corpo do texto é contido.", "-는 반면 marca o contraste entre título e corpo.", ["O título é forte, ao passo que o corpo do texto é contido."]),
    reading("사실은 확인할 수 있는 정보예요. 의견은 누군가의 판단이고, 추론은 근거에서 이끌어 낸 해석이에요. 이 셋을 구분하면 기사를 더 신중하게 읽을 수 있어요.", "Como o texto define inferência?", ["Uma interpretação tirada de evidências.", "Um número confirmado.", "Uma opinião sem relação com o texto."], "Uma interpretação tirada de evidências.", "추론은 근거에서 이끌어 낸 해석이에요."),
  ],
  summary: ["-는 반면 contrasta dois lados comparáveis.", "-다고 볼 수 있다 apresenta interpretação, não fato.", "Fato se verifica; opinião avalia; inferência deduz.", "Classificar exige voltar ao texto e citar o trecho."],
  production: {
    titlePt: "Produção independente · separar fato de opinião", promptPt: "Escolha três opiniões sobre um tema do seu bairro e reescreva cada uma como um fato verificável. Depois escreva uma frase dizendo o que ainda é inferência. Use de cinco a seis frases.", promptKo: "의견을 사실로 바꿔 쓰고, 추론을 따로 표시해 보세요.",
    guidance: ["Transforme avaliações em dados conferíveis.", "Use -는 반면 para comparar dois aspectos.", "Marque o que é inferência com -다고 볼 수 있다."],
    checklist: ["Três opiniões reescritas como fatos.", "Um contraste com -는 반면.", "Uma inferência claramente marcada.", "Nenhuma opinião apresentada como fato."], minWords: 34,
  },
});

/** b1-l34 — tendências e comparação de dados. */
export const B1_L34 = defineB1Lesson({
  id: "b1-l34", number: 34, moduleId: "b1-m07", title: "Interpretar dados",
  objective: "Descrever tendências e comparar dados de dois períodos sem afirmar causalidade indevida.",
  prerequisites: ["b1-l33"], estimatedMinutes: 70, dialogueTitle: "O gráfico de dois anos",
  intro: [
    { title: "-에 비해 — em comparação com", body: "-에 비해(서) compara dois números ou situações e exige uma base explícita: “em comparação com…”. Sem a base, a comparação fica incompleta.", ko: "올해 이용자는 작년에 비해 두 배 늘었어요." },
    { title: "-는 경향이 있다 — tender a", body: "A forma descreve uma tendência observada nos dados, não uma regra universal. Use com períodos e grupos definidos, e evite transformar tendência em causa.", ko: "짧은 영상을 더 보는 경향이 있어요." },
  ],
  dialogue: [
    ["지민", "이 자료 봤어요? 작년과 올해를 비교했네요.", "Você viu estes dados? Comparam o ano passado com este ano."],
    ["수진", "네. 이용자 수는 작년에 비해 많이 늘었어요.", "Sim. O número de usuários aumentou muito em comparação com o ano passado."],
    ["지민", "그런데 평균 이용 시간은 줄었어요?", "Mas o tempo médio de uso diminuiu?"],
    ["수진", "네. 짧게 여러 번 접속하는 경향이 있어요.", "Sim. Há uma tendência a acessar várias vezes, por pouco tempo."],
    ["지민", "그럼 이용자가 줄었다고 말하면 안 되겠네요.", "Então não se pode dizer que os usuários diminuíram."],
    ["수진", "맞아요. 수는 늘었지만 한 번에 머무는 시간은 줄었어요.", "Exato. O número cresceu, mas o tempo de permanência por acesso caiu."],
  ],
  reusedIds: ["ko:비교", "ko:자료", "ko:많다"],
  grammar: [
    ["-에 비해 — base de comparação", "명사 + -에 비해(서)", "Use -에 비해 para comparar dois valores ou situações. A base vem antes da forma e o resultado vem depois. Não confunda com -보다, que é mais simples e não pede o mesmo enquadramento.", [["올해 이용자는 작년에 비해 두 배 늘었어요.", "Os usuários deste ano dobraram em comparação com o ano passado."], ["평균 시간은 지난달에 비해 줄었어요.", "O tempo médio diminuiu em comparação com o mês passado."]]],
    ["-는 경향이 있다 — tendência observada", "동사 + -는 경향이 있다 / 형용사 + -(으)ㄴ 경향이 있다", "A forma indica uma tendência, não uma lei. Ela pede um recorte claro: período, grupo ou condição. Para causalidade, seria necessário outro argumento.", [["짧은 영상을 더 보는 경향이 있어요.", "Há uma tendência a ver mais vídeos curtos."], ["주말에는 이용자가 줄어드는 경향이 있어요.", "Nos fins de semana, há uma tendência de queda no número de usuários."]]],
  ],
  guided: [
    mcq("O que aconteceu com o número de usuários?", ["Aumentou em relação ao ano passado.", "Caiu pela metade.", "Ficou igual."], "Aumentou em relação ao ano passado.", "이용자 수는 작년에 비해 많이 늘었어요."),
    cloze("Complete a comparação: 이용자 수는 작년___ 비해 늘었어요.", "에", "A base da comparação recebe -에 비해."),
    listen("Ouça e escreva a tendência de uso descrita.", "짧게 여러 번 접속하는 경향이 있어요.", "짧게 여러 번 접속하는 경향이 있어요.", "As pessoas tendem a acessar várias vezes, por pouco tempo.", ["짧게 여러 번 접속하는 경향이 있어요"]),
    reading("작년보다 올해 이용자 수가 두 배 늘었어요. 하지만 한 번에 머무는 시간은 줄었어요. 자료는 이 변화의 원인을 설명하지 않아요.", "Qual ressalva o texto faz?", ["O material não explica a causa da mudança.", "O número de usuários caiu.", "O tempo de uso aumentou."], "O material não explica a causa da mudança.", "자료는 이 변화의 원인을 설명하지 않아요."),
    translate("pt-ko", "Traduza: “O tempo médio diminuiu em comparação com o mês passado.”", "평균 시간은 지난달에 비해 줄었어요.", "-에 비해 introduz a base de comparação.", ["평균 이용 시간은 지난달에 비해 줄었어요."]),
  ],
  independent: [
    mcq("Qual frase descreve uma tendência sem afirmar causa?", ["주말에는 이용자가 줄어드는 경향이 있어요.", "주말에는 비가 와서 이용자가 줄어요.", "주말 이용자는 반드시 줄어요."], "주말에는 이용자가 줄어드는 경향이 있어요.", "-는 경향이 있다 descreve padrão observado, sem provar causa."),
    cloze("Complete a tendência: 주말에는 이용자가 줄어드___ 경향이 있어요.", "는", "Verbo 줄어들다 + -는 경향이 있다: 줄어드는 경향이 있어요."),
    listen("Ouça e escreva o que aconteceu com o tempo de permanência.", "수는 늘었지만 한 번에 머무는 시간은 줄었어요.", "수는 늘었지만 한 번에 머무는 시간은 줄었어요.", "O número cresceu, mas o tempo por acesso caiu.", ["수는 늘었지만 한 번에 머무는 시간은 줄었어요"]),
    translate("ko-pt", "Traduza: 올해 이용자는 작년에 비해 두 배 늘었어요.", "Os usuários deste ano dobraram em comparação com o ano passado.", "-에 비해 compara os dois anos.", ["O número de usuários deste ano dobrou em comparação com o ano passado."]),
    reading("그래프는 두 해의 이용자 수를 보여 줘요. 수는 늘었지만 평균 시간은 줄었어요. 이 자료만으로 광고 효과가 커졌다고 말하기는 어려워요.", "O que o texto evita concluir?", ["Que a publicidade ficou mais eficaz.", "Que o número de usuários cresceu.", "Que o tempo médio caiu."], "Que a publicidade ficou mais eficaz.", "이 자료만으로 광고 효과가 커졌다고 말하기는 어려워요."),
  ],
  summary: ["-에 비해 exige uma base de comparação explícita.", "-는 경향이 있다 descreve padrão, não lei nem causa.", "Descrever dados é diferente de explicar por que mudaram.", "Uma ressalva protege a leitura do gráfico."],
  production: {
    titlePt: "Produção independente · descrever um gráfico", promptPt: "Descreva um gráfico simples de dois períodos: o que aumentou, o que caiu e qual ressalva você faria. Escreva cinco frases.", promptKo: "두 시기의 자료를 비교해서 그래프를 설명해 보세요.",
    guidance: ["Use -에 비해 para comparar os dois períodos.", "Descreva a tendência com -는 경향이 있다.", "Inclua uma ressalva sobre causa."],
    checklist: ["A base de comparação está explícita.", "Há um aumento e uma queda descritos.", "A tendência não é apresentada como lei.", "Uma ressalva encerra o texto."], minWords: 36,
  },
});

/** b1-l35 — ética, erro e correção na mídia. */
export const B1_L35 = defineB1Lesson({
  id: "b1-l35", number: 35, moduleId: "b1-m07", title: "Notícias e responsabilidade",
  objective: "Avaliar o impacto de uma informação errada e a responsabilidade de corrigi-la.",
  prerequisites: ["b1-l34"], estimatedMinutes: 75, dialogueTitle: "A correção do erro",
  intro: [
    { title: "-도록 — para que, de modo que", body: "A forma -도록 indica finalidade ou resultado pretendido. Em textos sobre mídia, aparece em pedidos e medidas: “para que o leitor saiba”, “para reforçar o procedimento”.", ko: "독자가 오류를 알 수 있도록 설명을 붙였어요." },
    { title: "-(으)ㄹ 수밖에 없다 — única saída", body: "A expressão indica que não havia outra opção: “não teve como não…”. Serve para avaliar decisões e consequências sem suavizar a responsabilidade.", ko: "매체는 잘못을 인정할 수밖에 없었어요." },
  ],
  dialogue: [
    ["지민", "어제 그 기사 정정됐어요?", "A matéria de ontem foi corrigida?"],
    ["수진", "네. 처음 보도는 사실과 달랐어요.", "Sim. A primeira reportagem não correspondia aos fatos."],
    ["지민", "어떤 부분이 틀렸어요?", "Qual parte estava errada?"],
    ["수진", "사고 시간을 잘못 알려서 여론이 크게 흔들렸어요.", "Informaram errado o horário do acidente, e a opinião pública ficou muito abalada."],
    ["지민", "매체는 어떻게 했어요?", "E o que o veículo fez?"],
    ["수진", "기사 끝에 정정을 붙이고, 확인 절차를 강화하겠다고 했어요.", "Acrescentou uma correção ao fim da matéria e disse que vai reforçar o procedimento de verificação."],
  ],
  reusedIds: ["ko:확인하다", "ko:책임", "ko:오해"],
  grammar: [
    ["-도록 — finalidade e providência", "동사 + -도록", "Use -도록 para indicar o objetivo de uma ação ou uma providência tomada para certo resultado. Na mídia, aparece em promessas e normas: “para que o leitor entenda”, “para reforçar o processo”.", [["확인 절차를 강화하도록 요구했어요.", "Exigiram que o processo de verificação fosse reforçado."], ["독자가 오류를 알 수 있도록 설명을 붙였어요.", "Acrescentaram uma explicação para que o leitor soubesse do erro."]]],
    ["-(으)ㄹ 수밖에 없다 — não há outra opção", "동사/형용사 + -(으)ㄹ 수밖에 없다", "A forma mostra que uma decisão era inevitável diante das circunstâncias. Não é um desejo; é uma consequência que se impõe.", [["매체는 잘못을 인정할 수밖에 없었어요.", "O veículo não teve como não reconhecer o erro."], ["확인되지 않은 정보는 빠르게 퍼질 수밖에 없어요.", "Informação não confirmada não tem como deixar de se espalhar rápido."]]],
  ],
  guided: [
    mcq("O que aconteceu com a notícia?", ["Foi corrigida depois de um erro.", "Foi apagada sem explicação.", "Foi confirmada por um leitor."], "Foi corrigida depois de um erro.", "처음 보도는 사실과 달랐고, 기사 끝에 정정을 붙였어요."),
    cloze("Complete a providência: 확인 절차를 강화하___ 요구했어요.", "도록", "강화하다 + -도록 indica a medida exigida."),
    listen("Ouça e escreva o erro e o impacto causado.", "사고 시간을 잘못 알려서 여론이 크게 흔들렸어요.", "사고 시간을 잘못 알려서 여론이 크게 흔들렸어요.", "O horário errado abalou a opinião pública.", ["사고 시간을 잘못 알려서 여론이 크게 흔들렸어요"]),
    reading("한 매체가 사고 시간을 잘못 보도했어요. 그 소식이 퍼지면서 여론이 흔들렸어요. 매체는 기사 끝에 정정을 붙이고 확인 절차를 강화하겠다고 했어요.", "O que o veículo prometeu?", ["Reforçar o procedimento de verificação.", "Publicar mais opiniões.", "Retirar todas as notícias."], "Reforçar o procedimento de verificação.", "확인 절차를 강화하겠다고 했어요."),
    translate("pt-ko", "Traduza: “O veículo não teve como não reconhecer o erro.”", "매체는 잘못을 인정할 수밖에 없었어요.", "-(으)ㄹ 수밖에 없었어요 marca a decisão inevitável.", ["매체는 잘못을 인정할 수밖에 없었어요."]),
  ],
  independent: [
    mcq("Qual frase indica que não havia outra opção?", ["사과할 수밖에 없었어요.", "사과하고 싶어요.", "사과할까요?"], "사과할 수밖에 없었어요.", "-ㄹ 수밖에 없다 expressa consequência inevitável."),
    cloze("Complete a consequência inevitável: 매체는 잘못을 인정할 수밖에 ___.", "없었어요", "수밖에 없었어요 indica que não houve alternativa.", ["없어요"]),
    listen("Ouça e escreva por que a informação errada se espalhou.", "확인되지 않은 정보는 빠르게 퍼질 수밖에 없어요.", "확인되지 않은 정보는 빠르게 퍼질 수밖에 없어요.", "Informação não confirmada se espalha rápido, sem alternativa.", ["확인되지 않은 정보는 빠르게 퍼질 수밖에 없어요"]),
    translate("ko-pt", "Traduza: 기사 끝에 정정을 붙였어요.", "Acrescentaram uma correção ao fim da matéria.", "정정 é a retificação publicada.", ["Puseram uma correção no final da matéria."]),
    reading("정보가 틀렸을 때는 빠른 정정이 필요해요. 정정은 독자가 오류를 알 수 있도록 같은 자리에 있어야 해요. 늦은 정정은 이미 퍼진 오해를 모두 되돌리지 못해요.", "O que o texto exige de uma correção?", ["Que esteja no mesmo lugar e seja rápida.", "Que apareça só na edição impressa.", "Que seja escrita pelo leitor."], "Que esteja no mesmo lugar e seja rápida.", "빠른 정정이 필요하고, 같은 자리에 있어야 해요."),
  ],
  summary: ["-도록 indica finalidade ou providência.", "-(으)ㄹ 수밖에 없다 mostra uma decisão inevitável.", "Erro de informação tem impacto público e exige correção visível.", "Uma análise de responsabilidade precisa de erro, impacto e medida."],
  production: {
    titlePt: "Produção independente · responsabilidade da informação", promptPt: "Analise um caso de informação errada que você conhece. Diga qual foi o erro, quem foi afetado e que correção deveria ter sido feita. Escreva de cinco a seis frases.", promptKo: "잘못된 정보가 미친 영향과 책임을 짧게 분석해 보세요.",
    guidance: ["Descreva o erro com precisão.", "Explique o impacto com -도록 ou -(으)ㄹ 수밖에 없다.", "Proponha uma correção concreta."],
    checklist: ["O erro está descrito sem exagero.", "O impacto aparece com um exemplo.", "A correção é viável e visível.", "A análise separa fato de opinião."], minWords: 40,
  },
});
