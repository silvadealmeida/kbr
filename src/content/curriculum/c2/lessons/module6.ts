import { cloze, defineC2Lesson, listen, mcq, reading, translate } from "../shared";
import type { CourseProductionTask } from "../../course-types";

const RUBRIC = [
  { criterion: "task" as const, labelPt: "Cumprimento da tarefa", descriptorPt: "O texto responde ao enunciado, assume o gênero pedido — interpretação, análise de focalização, leitura de símbolo, nota de contexto ou crítica — e deixa claro o que o leitor deve fazer com a análise." },
  { criterion: "organization" as const, labelPt: "Organização e progressão", descriptorPt: "A análise avança da pista textual para a interpretação e para o limite, sem repetir a mesma observação em parágrafos diferentes." },
  { criterion: "vocabulary" as const, labelPt: "Vocabulário e colocação", descriptorPt: "Usa léxico preciso da leitura literária, inclusive parte do léxico da lição, com colocações naturais e sem tradução literal." },
  { criterion: "grammar" as const, labelPt: "Gramática e registro", descriptorPt: "As formas-alvo aparecem corretas e o registro crítico se mantém consistente do início ao fim." },
  { criterion: "argument" as const, labelPt: "Qualidade da interpretação", descriptorPt: "A leitura é sustentada por evidências do texto e reconhece explicitamente uma leitura alternativa." },
  { criterion: "mediation" as const, labelPt: "Mediação e responsabilidade", descriptorPt: "Reformula a leitura para outro leitor sem fechar o sentido nem apagar a ambiguidade que o texto mantém." },
];

function production(
  titlePt: string,
  promptPt: string,
  promptKo: string,
  guidance: readonly string[],
  checklist: readonly string[],
  sampleKo: string,
  samplePt: string,
  notePt: string,
): CourseProductionTask {
  return {
    titlePt,
    promptPt,
    promptKo,
    guidance,
    checklist,
    minWords: 110,
    rubric: RUBRIC,
    sample: { ko: sampleKo, pt: samplePt, notePt },
  };
}

/** c2-l26 — um conto curto, interpretação e evidência textual. */
export const C2_L26 = defineC2Lesson({
  id: "c2-l26", number: 26, moduleId: "c2-m06", title: "Um conto, muitas leituras",
  objective: "Ler um conto curto e sustentar uma interpretação com evidência textual.",
  prerequisites: ["c2-c05"], estimatedMinutes: 85, dialogueTitle: "O bilhete que ficou no balcão",
  intro: [
    {
      title: "O conto não entrega a chave",
      body: "Um conto curto raramente diz ao leitor o que ele deve concluir. Ele oferece cenas, objetos e falas, e a interpretação nasce da relação entre esses elementos. Por isso, duas leituras opostas podem ser defensáveis ao mesmo tempo: o texto não é uma senha com uma resposta única, mas um arranjo de pistas que autoriza certos caminhos e deixa outros sem apoio. O trabalho do leitor não é adivinhar a intenção do autor, e sim mostrar quais marcas do texto tornam uma leitura possível.",
      ko: "화자는 결말부에서 행간으로 말을 아끼고, 독자가 해석할 여백을 남긴다.",
    },
    {
      title: "O que uma pista sustenta",
      body: "Uma impressão pessoal se transforma em interpretação quando aponta para uma pista verificável: uma palavra repetida, uma mudança de tempo verbal, um objeto que volta em outra cena, uma informação que o narrador evita. Duas pistas que apontam para direções diferentes não anulam a leitura; elas explicam por que o final permanece ambíguo. Reconhecer esse limite é parte da análise, não uma desistência dela.",
      ko: "문면의 균열은 오래된 기억을 환기하고 장면에 긴장감을 만든다. 그래서 이 작품은 다의적으로 읽힌다.",
    },
  ],
  dialogue: [
    ["하린", "나는 마지막 장면에서 명주가 배를 탔다고 읽었어.", "Eu li que, na cena final, Myeongju embarcou no navio."],
    ["도현", "나는 아니라고 봤어. 표를 쓰레기통에 버렸잖아.", "Eu vi de outro jeito. Ela jogou o bilhete no lixo, não foi?"],
    ["하린", "버린 게 아니라 접어서 놓은 거야. 접는다는 건 아직 마음이 남아 있다는 뜻일 수도 있고.", "Ela não jogou fora: dobrou e deixou ali. Dobrar também pode significar que ainda resta alguma coisa no coração."],
    ["도현", "그럼 둘 다 맞을 수 있다는 거야?", "Então as duas leituras podem estar certas?"],
    ["하린", "작가가 답을 정하지 않았더라. 그래서 독자가 결정해야 해.", "A autora não fixou uma resposta. Por isso, o leitor precisa decidir."],
    ["도현", "하지만 아무 해석이나 되는 건 아니지. 배가 떠난 시각과 표의 날짜가 맞지 않는다는 점도 봐야 해.", "Mas não vale qualquer interpretação. Também é preciso considerar que o horário da partida e a data do bilhete não coincidem."],
    ["하린", "맞아. 표에 날짜가 없더라. 그건 오래된 표라는 뜻이고, 그래서 더 애매해.", "Exato. Não havia data no bilhete. Isso significa que era um bilhete antigo e, por isso, tudo fica ainda mais ambíguo."],
    ["도현", "결국 우리가 합의할 수 있는 건 '명주가 떠났는지 확실하지 않다'는 것뿐이네.", "No fim, o único ponto em que podemos concordar é que não está claro se Myeongju partiu."],
  ],
  readingText: {
    titlePt: "O bilhete dobrado",
    paragraphs: [
      "그날 나는 북포항 매표소 앞에서 마지막 배를 기다리고 있었다. 오후 네 시 배는 이미 두 번 연착되었고, 대합실에는 짐을 든 사람이 서너 명뿐이었다. 명주가 들어왔더라. 십오 년 만에 보는 얼굴이었지만 나는 한눈에 알아보았다. 그녀는 창가에 놓인 낡은 가방을 집어 들고, 매표소 앞에서 오랫동안 서 있었다. 표를 사려는 것인지, 누군가를 기다리는 것인지 알 수 없었다. 창밖에서는 비가 내리는 듯 바람이 유리창을 두드렸다. 목소리를 내지 않는 대합실에는 이상한 긴장감이 돌았다.",
      "정호는 창구 안에서 고개를 들지 않았다. 그는 명주가 다가오자 천천히 표 두 장을 밀어냈다. 명주는 두 장을 받아 들고도 바로 떠나지 않았다. 손가락 사이로 접힌 승선권이 보였고, 그녀는 그것을 한참 바라보다가 새 표만 구겨서 쓰레기통에 넣었다. 나는 숨을 죽였다. 새 표를 버리는 일은 떠나지 않겠다는 뜻처럼 보였지만, 동시에 미련을 버리는 일처럼도 보였다. 그 순간 오래된 기억이 환기되었다. 정호는 아무 말도 하지 않았고, 명주도 뒤돌아보지 않았다.",
      "배가 출항을 알리는 소리를 냈을 때, 명주는 출구 쪽으로 걸어갔다. 나는 그녀가 계단을 오르는지 내리는지 보지 못했다. 유리문이 닫히고, 빗물에 번진 불빛만 남았다. 배가 부두를 떠난 뒤에도 매표소 앞에는 접힌 승선권 한 장이 남아 있었다. 쓰레기통에 넣은 새 표가 아니라, 정호가 함께 내민 오래된 표였다. 그녀는 두 장 가운데 새 표를 버리고, 오래된 표는 남겨 둔 셈이다. 어느 쪽이 진짜였는지는 지금도 알 수 없다. 다만 그날의 빗소리는 지금도 내 귀에 남아 있다. 그 장면은 지금도 나를 멈추게 한다.",
    ],
    pt: "Naquele dia, eu esperava o último navio em frente à bilheteria do porto de Bukpo. O navio das quatro da tarde já havia atrasado duas vezes, e na sala de espera havia apenas três ou quatro pessoas com bagagem. Myeongju entrou. Era um rosto que eu não via havia quinze anos, mas a reconheci de imediato. Ela pegou a mala velha deixada junto à janela e ficou muito tempo parada diante da bilheteria. Não era possível saber se queria comprar uma passagem ou esperar alguém. Lá fora, o vento batia na vidraça como se estivesse chovendo. Na sala de espera, onde ninguém falava, pairou uma estranha tensão. Jeongho não levantou a cabeça atrás do guichê. Quando Myeongju se aproximou, ele empurrou lentamente dois bilhetes na direção dela. Ela recebeu os dois, mas não saiu em seguida. Entre seus dedos apareceu uma passagem dobrada; ela a olhou por um longo tempo e depois amassou apenas o bilhete novo e jogou no lixo. Eu prendi a respiração. Jogar o bilhete novo fora parecia significar que ela não partiria, mas ao mesmo tempo parecia um gesto de abandonar o que restava de apego. Naquele instante, uma lembrança antiga foi evocada. Jeongho não disse nada, e Myeongju também não olhou para trás. Quando o navio anunciou a partida, Myeongju caminhou na direção da saída. Não vi se ela subiu ou desceu as escadas. A porta de vidro se fechou, e restou apenas a luz da chuva borrada no vidro. Depois que o navio deixou o cais, ainda havia uma passagem dobrada diante da bilheteria. Não era o bilhete novo que eu pensava ter sido jogado no lixo, mas o bilhete antigo que Jeongho havia estendido junto. Ela recebeu dois e deixou o antigo para trás. Até hoje não sei qual dos dois era o verdadeiro. Só o som da chuva daquele dia continua nos meus ouvidos.",
    objective: "Sustentar uma leitura do final com duas pistas do texto e reconhecer a leitura alternativa.",
  },
  reusedIds: ["ko:독자", "ko:문면", "ko:기억", "ko:합의"],
  grammar: [
    [
      "-더라 — retomada narrativa de experiência observada",
      "동사·형용사 + -더라 (해라체)",
      "Marca uma lembrança do que o falante viu ou viveu, não uma informação que ouviu de terceiros. Na conversa, soa como um relato pessoal e pode vir com emoção contida; na narrativa literária, cria uma voz testemunhal. Compare com -다고 하더라, que atribui a informação a outra pessoa, e com -았더라, que não é a forma padrão para esse uso. Como pertence ao registro 해라체, não deve ser usado diretamente com um superior.",
      [
        ["명주가 들어왔더라.", "Myeongju entrou."],
        ["표에 날짜가 없더라.", "Não havia data no bilhete."],
      ],
    ],
    [
      "-ㄴ/는 듯 — como se; ao modo de",
      "동사 + -는 듯(이) / 형용사 + -(으)ㄴ 듯(이)",
      "Compara uma cena a outra ou apresenta uma impressão sem afirmá-la como fato. Na literatura, aproxima o leitor da percepção da personagem sem revelar uma certeza. Compare com -처럼, que faz uma comparação mais direta, e com -는 듯하다, que funciona como predicação completa: 'parece que'. A forma sem 하다 é mais literária e pode soar mais distante.",
      [
        ["바람이 유리창을 두드리는 듯했다.", "Parecia que o vento batia na janela."],
        ["그녀는 두 장 가운데 새 표를 버린 듯하다.", "Parece que ela jogou fora o bilhete novo dos dois."],
      ],
    ],
  ],
  guided: [
    mcq("Na cena final, qual detalhe impede uma conclusão segura sobre a partida de Myeongju?", ["O bilhete antigo continua no balcão, enquanto o novo foi jogado fora.", "O narrador diz que viu Myeongju subir as escadas.", "Jeongho confessa em voz alta que ela partiu."], "O bilhete antigo continua no balcão, enquanto o novo foi jogado fora.", "A presença do bilhete antigo, sem data, mantém aberta a leitura sobre o que ela decidiu."),
    cloze("Complete a retomada narrativa da entrada de Myeongju: 명주가 들어왔___.", "더라", "-더라 retoma uma cena que o narrador observou pessoalmente."),
    listen("Ouça e escreva a fala de Harin sobre a data do bilhete. Escreva a frase completa que ouvir.", "표에 날짜가 없더라. 그건 오래된 표라는 뜻이고, 그래서 더 애매해.", "표에 날짜가 없더라. 그건 오래된 표라는 뜻이고, 그래서 더 애매해.", "Não havia data no bilhete. Isso significa que era um bilhete antigo e, por isso, tudo fica ainda mais ambíguo."),
    translate("pt-ko", "Traduza: “Parecia que o vento batia na janela.”", "바람이 유리창을 두드리는 듯했다.", "-는 듯했다 apresenta uma impressão perceptiva sem afirmá-la como fato."),
    reading("배가 출항을 알리는 소리를 냈을 때, 명주는 출구 쪽으로 걸어갔다. 나는 그녀가 계단을 오르는지 내리는지 보지 못했다. 유리문이 닫히고, 빗물에 번진 불빛만 남았다. 배가 부두를 떠난 뒤에도 매표소 앞에는 접힌 승선권 한 장이 남아 있었다.", "Por que o narrador não pode afirmar se Myeongju embarcou?", ["Porque ele deixou de ver o movimento dela na escada e o bilhete encontrado não confirma a partida.", "Porque Myeongju lhe disse claramente que não partiria.", "Porque o navio não chegou a sair do porto naquela noite de chuva."], "Porque ele deixou de ver o movimento dela na escada e o bilhete encontrado não confirma a partida.", "A limitação do olhar do narrador e a presença do bilhete sustentam a incerteza."),
  ],
  independent: [
    mcq("Qual interpretação do conto é mais defensável?", ["O final mantém duas leituras porque o narrador não vê a escolha de Myeongju e o bilhete desmente sua suposição.", "O conto afirma claramente que Myeongju desistiu de partir no final.", "O conto não tem enredo e por isso não admite nenhuma interpretação."], "O final mantém duas leituras porque o narrador não vê a escolha de Myeongju e o bilhete desmente sua suposição.", "A interpretação se apoia em dois limites concretos do relato, não em uma impressão sobre a personagem."),
    cloze("Complete o objeto que sustenta a ambiguidade final: 매표소 앞에는 접힌 ___ 한 장이 남아 있었다.", "승선권", "O bilhete encontrado no balcão contradiz a cena anterior e impede uma conclusão única."),
    listen("Ouça e escreva a frase que resume o limite do narrador. Escreva a frase completa que ouvir.", "어느 쪽이 진짜였는지는 지금도 알 수 없다.", "어느 쪽이 진짜였는지는 지금도 알 수 없다.", "Até hoje não sei qual dos dois era o verdadeiro."),
    translate("ko-pt", "Traduza: 표를 버리는 일은 떠나지 않겠다는 뜻처럼 보였지만, 동시에 미련을 버리는 일처럼도 보였다.", "Jogar o bilhete fora parecia significar que ela não partiria, mas ao mesmo tempo parecia um gesto de abandonar o que restava de apego.", "미련을 버리다 = abandonar o apego, o que ainda prende a pessoa ao passado.", ["Jogar fora o bilhete parecia querer dizer que ela não partiria; ao mesmo tempo, porém, parecia um modo de deixar para trás o apego."]),
    reading("명주는 그 표를 받아 들고도 바로 떠나지 않았다. 손가락 사이로 접힌 승선권이 보였고, 그녀는 그것을 한참 바라보다가 구겨서 쓰레기통에 넣었다. 나는 숨을 죽였다.", "O que o gesto de dobrar e depois amassar o bilhete permite concluir?", ["Que o sentido do gesto é ambíguo: pode indicar decisão de ficar ou de romper com o passado.", "Que Myeongju comprou o bilhete por engano e se arrependeu.", "Que o narrador conhece a intenção secreta dela e a esconde."], "Que o sentido do gesto é ambíguo: pode indicar decisão de ficar ou de romper com o passado.", "O texto oferece duas explicações para o mesmo gesto e não escolhe entre elas."),
  ],
  summary: [
    "Uma interpretação literária se sustenta em pistas verificáveis, não em impressões sobre a intenção do autor.",
    "-더라 retoma uma experiência observada pelo narrador e cria uma voz testemunhal.",
    "-ㄴ/는 듯 aproxima uma impressão de uma comparação, sem afirmá-la como fato.",
    "Quando duas pistas apontam para direções opostas, a ambiguidade pode ser o resultado mais honesto da leitura.",
    "Reconhecer a leitura alternativa faz parte da análise, não a enfraquece.",
  ],
  production: production(
    "Produção independente · interpretar um final ambíguo",
    "Escolha o final de um conto, filme ou série que você conheça e escreva uma interpretação curta. Defenda uma leitura com duas pistas concretas do texto ou da cena e explique, no fim, por que outra leitura também é possível. Não tente decidir o que o autor quis dizer; mostre o que o texto permite.",
    "결말이 모호한 작품을 골라 두 가지 단서로 해석을 뒷받침하고, 다른 해석이 가능한 이유도 설명해 보세요.",
    ["Comece pela cena ou frase que você vai interpretar, sem resumi-la por inteiro.", "Nomeie duas pistas concretas: um objeto, uma repetição, uma fala ou uma lacuna.", "Use -더라 ou -ㄴ/는 듯 uma vez, de modo natural.", "Distinga o que o texto mostra do que você conclui.", "Feche reconhecendo a leitura alternativa e o limite da sua."],
    ["Interpretação única e delimitada.", "Duas pistas textuais nomeadas.", "Uma forma-alvo usada com naturalidade.", "Leitura alternativa reconhecida.", "Limite da própria análise explicitado."],
    "나는 단편 소설 「겨울 창고」의 마지막 장면을 다음과 같이 읽는다. 주인공은 창고 문을 열지 않은 채 열쇠를 문 아래로 밀어 넣는다. 첫 번째 단서는 열쇠의 행방이다. 그녀가 열쇠를 가지고 떠나지 않았다는 사실은 다시 돌아올 가능성을 남긴다. 두 번째 단서는 문 앞에 쌓인 눈이다. 눈은 오래된 시간을 보여 주지만, 동시에 아직 아무도 들어가지 않았다는 뜻이기도 하다. 그래서 나는 이 장면을 '떠남'이 아니라 '유예'로 읽는다. 그러나 다른 해석도 가능하다. 열쇠를 밀어 넣는 행위는 소유를 포기하는 일로 볼 수도 있다. 이 경우 마지막 장면은 작별이다. 두 해석 중 어느 것이 작가의 의도인지는 알 수 없다. 열쇠를 밀어 넣는 손의 떨림도 하나의 단서가 될 수 있다. 그러나 그 떨림이 슬픔인지 안도인지는 텍스트가 말하지 않는다. 다만 열쇠와 눈이라는 두 단서가 서로 다른 방향을 가리키기 때문에, 이 결말은 하나의 답으로 닫히지 않는다.",
    "Leio a cena final do conto 'O armazém de inverno' da seguinte maneira. A protagonista empurra a chave para baixo da porta sem abrir o armazém. A primeira pista é o destino da chave. O fato de ela não levar a chave consigo deixa aberta a possibilidade de voltar. A segunda pista é a neve acumulada diante da porta. A neve mostra o tempo decorrido, mas também significa que ninguém entrou ali. Por isso, leio essa cena como 'suspensão', não como 'partida'. Outra leitura, porém, é possível. Empurrar a chave para dentro pode ser visto como abandono da posse. Nesse caso, a cena final é uma despedida. Não é possível saber qual das duas leituras corresponde à intenção da autora. O tremor da mão que empurra a chave também pode ser uma pista. No entanto, o texto não diz se esse tremor é tristeza ou alívio. Como a chave e a neve apontam para direções diferentes, o final não se fecha em uma única resposta.",
    "Exemplo original. Observe que a leitura nomeia duas pistas, distingue o que o texto mostra do que o leitor conclui e preserva a leitura alternativa. Exemplo ilustrativo; não é gabarito.",
  ),
});

/** c2-l27 — ponto de vista, focalização e voz narrativa. */
export const C2_L27 = defineC2Lesson({
  id: "c2-l27", number: 27, moduleId: "c2-m06", title: "Quem vê e quem narra",
  objective: "Distinguir ponto de vista, focalização e voz narrativa.",
  prerequisites: ["c2-l26"], estimatedMinutes: 85, dialogueTitle: "O que o balconista sabia",
  intro: [
    {
      title: "Voz não é o mesmo que ponto de vista",
      body: "A voz é quem fala; a focalização é de quem o texto empresta a percepção. Um narrador em terceira pessoa pode contar a cena a partir do que apenas um personagem vê, sente e ignora. Nesse caso, a voz está fora da história, mas a informação passa pelo corpo e pelos limites da personagem. Separar as duas coisas evita dizer que o narrador 'é' a personagem só porque o texto revela o que ela pensa.",
      ko: "초점화는 작가가 아니라 작품이 정보를 배분하는 방식이며, 제한적 화법은 독자에게 다른 시야를 준다. 인물의 응시와 증인의 위치가 장면의 의미를 바꾼다.",
    },
    {
      title: "O leitor que sabe mais",
      body: "Quando a focalização se limita a um personagem, o leitor pode saber algo que outro personagem ignora. Essa diferença produz tensão: vemos a consequência de um gesto antes de quem o pratica entender o que ele significa. O efeito não depende de o narrador mentir, mas de escolher o que entra no campo de percepção. Uma simples fala, colocada fora do alcance de quem ouve, muda a experiência inteira da cena.",
      ko: "짧은 발화 하나가 인물의 내면을 드러내지만, 초점화가 바뀌면 독자가 아는 범위도 바뀐다.",
    },
  ],
  dialogue: [
    ["서윤", "이 장면은 정호의 시점에서 서술돼.", "Esta cena é narrada do ponto de vista de Jeongho."],
    ["민규", "그런데 명주가 그를 알아보지 못한다는 건 독자만 아는 거지.", "Mas só o leitor sabe que Myeongju não o reconhece."],
    ["서윤", "맞아. 정호는 알아보지만 명주는 모르잖아.", "Exato. Jeongho a reconhece, mas Myeongju não."],
    ["민규", "그래서 독자는 명주보다 정보를 더 많이 가진 상태에서 장면을 읽어.", "Por isso, o leitor acompanha a cena sabendo mais que Myeongju."],
    ["서윤", "그런데 서술자가 정호의 마음까지 다 아는 건 아니야.", "No entanto, o narrador não sabe tudo o que se passa no coração de Jeongho."],
    ["민규", "제한적이네. 정호가 왜 설명하지 않았는지는 짐작만 할 수 있어.", "É limitado. Só podemos conjecturar por que Jeongho não explicou."],
    ["서윤", "그의 태도를 보면 두려움인지 배려인지 애매해.", "Pela atitude dele, é ambíguo se era medo ou consideração."],
    ["민규", "결국 초점화가 누구에게 맞춰지느냐에 따라 같은 사건이 다른 이야기가 되는 거네.", "No fim, dependendo de quem recebe a focalização, o mesmo acontecimento se torna outra história."],
  ],
  readingText: {
    titlePt: "O que Jeongho viu",
    paragraphs: [
      "정호는 창구 안쪽의 시계를 세 번째 확인했다. 오후 네 시 배는 이미 떠났고, 다음 배는 한 시간 뒤였다. 그는 명주가 들어오는 순간을 놓치지 않았다. 십오 년 전, 같은 창구에서 그녀에게 표를 팔았던 손이 아직 기억하고 있었다. 하지만 명주는 그를 알아보지 못한 듯했다. 그녀의 시야는 창밖의 배에 고정되어 있었고, 정호는 그 침묵을 깨지 않았다. 유리창에 비친 얼굴이 겹쳐 보였다.",
      "그가 서랍에서 꺼낸 것은 오래된 승선권 한 장이었다. 날짜는 지워져 있었고, 모서리는 손때에 닳아 있었다. 정호는 그 표를 새 표와 함께 밀어냈다. 명주는 두 장을 받아 들고 잠시 멈췄다. 그가 설명하지 않은 이유는 간단했다. 설명하면 그녀가 떠나지 않을까 봐 두려웠다. 동시에, 설명하지 않으면 영원히 모를 것이라는 생각도 들었다. 그는 자기 판단이 맞는지 확신할 수 없었다. 창구 아래에서 그의 손이 가볍게 떨렸다. 그는 그 떨림을 들키지 않으려고 서류를 다시 정리했다.",
      "명주가 출구로 걸어갈 때, 정호는 창구를 나와 그녀의 뒷모습을 바라보았다. 그녀가 계단을 오르면 배를 타는 것이고, 내려가면 역으로 가는 것이었다. 그러나 계단은 두 방향으로 나뉘어 있었고, 그는 끝까지 보지 않았다. 대합실의 방송이 다음 배를 알렸다. 정호는 돌아와 서랍을 정리했다. 그 안에는 명주가 매표소에 두고 간 오래된 승선권이 남아 있었다. 그는 그것을 버리지 않았다. 명주는 끝내 뒤를 돌아보지 않았고, 정호는 그 사실을 오래 기억했다. 그날 이후 정호는 매표소 창구를 바꾸지 않았다. 창구 위의 시계도 같은 자리에 걸려 있었다.",
    ],
    pt: "Jeongho conferiu o relógio do outro lado do guichê pela terceira vez. O navio das quatro já havia partido, e o próximo sairia dali a uma hora. Ele não perdeu o instante em que Myeongju entrou. A mão que, quinze anos antes, vendera a ela uma passagem no mesmo guichê ainda se lembrava. Myeongju, porém, pareceu não reconhecê-lo. O campo de visão dela estava fixo no navio do lado de fora, e Jeongho não rompeu aquele silêncio. O rosto refletido no vidro parecia sobreposto. O que ele tirou da gaveta era uma passagem antiga. A data estava apagada, e as bordas, gastas pelo manuseio. Jeongho empurrou aquele bilhete junto com um novo. Myeongju recebeu os dois e parou por um instante. O motivo de ele não explicar era simples: tinha medo de que, se explicasse, ela não partisse. Ao mesmo tempo, pensou que, sem explicação, ela nunca saberia. Não tinha certeza de que seu julgamento estivesse certo. Sob o guichê, sua mão tremia de leve. Quando Myeongju caminhou para a saída, Jeongho deixou o guichê e observou suas costas. Se ela subisse a escada, pegaria o navio; se descesse, iria para a estação. Mas a escada se dividia em duas direções, e ele não olhou até o fim. O anúncio da sala de espera informou o próximo navio. Jeongho voltou e arrumou a gaveta. Dentro dela, restava a passagem antiga que Myeongju havia deixado na bilheteria. Ele não a jogou fora. Myeongju não olhou para trás, e Jeongho guardou esse fato por muito tempo.",
    objective: "Reconhecer de quem é a focalização e o que o leitor sabe que a personagem ignora.",
  },
  reusedIds: ["ko:장면", "ko:초점", "ko:확신", "ko:판단"],
  grammar: [
    [
      "-ㄴ/는 시점 — o ponto de vista de",
      "명사 + 의 시점 / 동사 + -는 시점",
      "Indica de onde uma cena é percebida ou narrada. Pode descrever a perspectiva de um personagem, de um grupo ou de uma época. Compare com -ㄴ/는 입장, que enfatiza a posição de quem fala em uma discussão, e com -ㄴ/는 관점, mais próximo de 'enfoque analítico'. Na análise literária, '시점' costuma nomear o recorte de informação, não apenas a opinião de alguém.",
      [
        ["정호의 시점에서 보면, 명주는 아무것도 모르는 사람이다.", "Do ponto de vista de Jeongho, Myeongju é alguém que não sabe de nada."],
        ["이 장면은 명주의 시점에서 서술된다.", "Esta cena é narrada do ponto de vista de Myeongju."],
      ],
    ],
    [
      "-ㄴ/는 태도 — a atitude de",
      "동사 + -는 태도 / 형용사 + -(으)ㄴ 태도",
      "Descreve um modo de agir ou de se posicionar diante de uma situação. É mais observável do que 'sentimento' e mais delimitado do que 'personalidade'. Compare com -ㄴ/는 마음, que fala do estado afetivo, e com -ㄴ/는 방식, que descreve o procedimento. Na análise, '태도' permite dizer o que o texto mostra sem afirmar o que a personagem sente.",
      [
        ["그는 침묵을 지키는 태도를 취했다.", "Ele adotou a atitude de manter silêncio."],
        ["명주는 아무것도 묻지 않는 태도로 창밖을 보았다.", "Myeongju olhou pela janela com a atitude de quem não pergunta nada."],
      ],
    ],
  ],
  guided: [
    mcq("O que o leitor sabe que Myeongju parece ignorar?", ["Que Jeongho a reconhece e guardou uma passagem antiga.", "Que o navio das quatro já partiu.", "Que a escada tem duas direções."], "Que Jeongho a reconhece e guardou uma passagem antiga.", "A focalização em Jeongho permite ao leitor ver o reconhecimento e o bilhete guardado, que ficam fora do conhecimento dela."),
    cloze("Complete a análise da perspectiva: 이 장면은 정호의 ___에서 서술된다.", "시점", "-의 시점에서 indica de onde a cena é percebida."),
    listen("Ouça e escreva o motivo do silêncio de Jeongho. Escreva a frase completa que ouvir.", "그가 설명하지 않은 이유는 간단했다. 설명하면 그녀가 떠나지 않을까 봐 두려웠다.", "그가 설명하지 않은 이유는 간단했다. 설명하면 그녀가 떠나지 않을까 봐 두려웠다.", "O motivo de ele não explicar era simples: tinha medo de que, se explicasse, ela não partisse."),
    translate("pt-ko", "Traduza: “Do ponto de vista de Jeongho, Myeongju não sabe de nada.”", "정호의 시점에서 보면, 명주는 아무것도 모르는 사람이다.", "-의 시점에서 보면 introduz o recorte de informação de um personagem.", ["정호의 시점에서 보면 명주는 아무것도 모르는 사람이다."]),
    reading("그는 명주가 들어오는 순간을 놓치지 않았다. 십오 년 전, 같은 창구에서 그녀에게 표를 팔았던 손이 아직 기억하고 있었다. 하지만 명주는 그를 알아보지 못한 듯했다. 그녀의 시야는 창밖의 배에 고정되어 있었고, 정호는 그 침묵을 깨지 않았다.", "O que a cena revela sobre o conhecimento dos dois personagens?", ["Jeongho reconhece Myeongju, mas ela não demonstra reconhecê-lo.", "Os dois se reconhecem e conversam sobre o passado.", "Myeongju reconhece Jeongho, mas ele não a vê."], "Jeongho reconhece Myeongju, mas ela não demonstra reconhecê-lo.", "O texto entra na memória de Jeongho e mostra a ausência de reação dela."),
  ],
  independent: [
    mcq("Qual é o efeito de limitar a cena à percepção de Jeongho?", ["O leitor entende o medo dele sem receber uma explicação sobre o que Myeongju sente.", "O leitor passa a saber tudo o que Myeongju pensa.", "O narrador desaparece e a cena perde perspectiva."], "O leitor entende o medo dele sem receber uma explicação sobre o que Myeongju sente.", "A focalização dá acesso ao interior de um personagem e mantém o outro opaco."),
    cloze("Complete a descrição do comportamento dele: 그는 침묵을 지키는 ___를 취했다.", "태도", "-는 태도 descreve um modo de agir observável, sem afirmar o sentimento."),
    listen("Ouça e escreva o limite do olhar de Jeongho. Escreva a frase completa que ouvir.", "그러나 계단은 두 방향으로 나뉘어 있었고, 그는 끝까지 보지 않았다.", "그러나 계단은 두 방향으로 나뉘어 있었고, 그는 끝까지 보지 않았다.", "Mas a escada se dividia em duas direções, e ele não olhou até o fim."),
    translate("ko-pt", "Traduza: 그가 설명하지 않은 이유는 간단했다. 설명하면 그녀가 떠나지 않을까 봐 두려웠다.", "O motivo de ele não explicar era simples: tinha medo de que, se explicasse, ela não partisse.", "ㄹ까 봐 두려웠다 = tinha medo de que (algo acontecesse).", ["A razão pela qual ele não explicou era simples: temia que, ao explicar, ela não partisse."]),
    reading("그가 서랍에서 꺼낸 것은 오래된 승선권 한 장이었다. 날짜는 지워져 있었고, 모서리는 손때에 닳아 있었다. 정호는 그 표를 새 표와 함께 밀어냈다. 명주는 두 장을 받아 들고 잠시 멈췄다.", "O que a presença de dois bilhetes acrescenta à cena?", ["Sugere uma história anterior que Myeongju não conhece, mas não a explica por completo.", "Prova que Myeongju comprou os dois bilhetes naquele dia.", "Indica que Jeongho queria enganar Myeongju."], "Sugere uma história anterior que Myeongju não conhece, mas não a explica por completo.", "O bilhete antigo abre uma informação que a focalização mantém parcial."),
  ],
  summary: [
    "Voz é quem narra; focalização é por quem a percepção passa.",
    "Um narrador em terceira pessoa pode revelar apenas o que um personagem percebe.",
    "-ㄴ/는 시점 nomeia o recorte de percepção de uma cena.",
    "-ㄴ/는 태도 descreve um modo de agir observável, sem afirmar o sentimento.",
    "A diferença entre o que o leitor sabe e o que a personagem ignora produz tensão narrativa.",
  ],
  production: production(
    "Produção independente · mudar a focalização",
    "Reescreva uma cena curta do conto 'O bilhete dobrado' a partir da focalização de Myeongju. O leitor deve continuar sem acesso ao que Jeongho pensa. Mantenha os mesmos fatos e mostre o que muda na interpretação quando a cena passa a ser percebida por ela.",
    "「접힌 승선권」의 한 장면을 명주의 초점화로 다시 써 보세요. 같은 사건이 어떻게 다르게 보이는지 드러내야 합니다.",
    ["Mantenha os mesmos objetos e gestos da cena original.", "Retire do texto o que somente Jeongho sabia.", "Use -ㄴ/는 시점 ou -ㄴ/는 태도 uma vez.", "Mostre uma percepção de Myeongju que o texto original não trazia.", "Explique em uma frase o que a mudança de focalização alterou."],
    ["Mesmos fatos, outra percepção.", "Informação de Jeongho não vaza para a cena.", "Uma forma-alvo usada corretamente.", "Diferença de interpretação nomeada.", "Fechamento que justifica a escolha."],
    "명주는 매표소 앞에서 낡은 가방을 내려놓았다. 창구 안의 남자는 고개를 들지 않았다. 그녀는 그를 처음 보는 사람이라고 생각했다. 그는 표를 한 장 밀어냈고, 잠시 뒤에 오래된 표를 하나 더 내밀었다. 명주는 두 장을 받아 들고 손가락으로 종이의 접힌 자리를 만졌다. 오래된 표에는 날짜가 없었다. 그녀는 그것을 버려야 할지, 가방에 넣어야 할지 몰랐다. 창밖에서는 배가 출항을 준비하고 있었다. 그녀의 시점에서 보면, 남자의 침묵은 무관심처럼 보였다. 그러나 독자는 그 침묵이 무관심이 아닐 수도 있다는 사실을 짐작할 수 없다. 명주는 표를 구겨 쓰레기통에 넣고 출구로 걸어갔다. 창구 안의 남자는 그녀가 떠난 뒤에도 한동안 같은 자리에 서 있었다. 그는 끝까지 아무 말도 하지 않았다. 그러나 명주는 그 모습을 보지 못했다. 그녀는 자신이 무엇을 버렸는지 끝까지 알지 못했다.",
    "Myeongju pousou a mala velha diante da bilheteria. O homem atrás do guichê não levantou a cabeça. Ela pensou que era alguém que via pela primeira vez. Ele empurrou uma passagem e, pouco depois, estendeu mais um bilhete antigo. Myeongju recebeu os dois e passou os dedos pela dobra do papel. O bilhete antigo não tinha data. Ela não sabia se devia jogá-lo fora ou guardá-lo na mala. Do lado de fora, o navio se preparava para partir. Do ponto de vista dela, o silêncio do homem parecia indiferença. No entanto, o leitor não pode conjecturar que aquele silêncio talvez não fosse indiferença. Myeongju amassou o bilhete, jogou-o no lixo e caminhou para a saída. O homem atrás do guichê permaneceu por um tempo no mesmo lugar depois que ela partiu. Até o fim, ele não disse nada. Myeongju, porém, não viu essa cena. Até o fim, ela não soube o que havia deixado para trás.",
    "Exemplo original. Observe que os fatos permanecem, mas o acesso ao interior de Jeongho desaparece e a interpretação de Myeongju ocupa o lugar. Exemplo ilustrativo; não é gabarito.",
  ),
});

/** c2-l28 — símbolo literário, contexto e sentido aberto. */
export const C2_L28 = defineC2Lesson({
  id: "c2-l28", number: 28, moduleId: "c2-m06", title: "Símbolo e ambiguidade",
  objective: "Interpretar símbolos literários sem fixar um único sentido.",
  prerequisites: ["c2-l27"], estimatedMinutes: 85, dialogueTitle: "O que o bilhete quer dizer",
  intro: [
    {
      title: "Símbolo não é uma senha",
      body: "Um símbolo literário não funciona como uma legenda que o leitor decora. Ele ganha sentido pela repetição, pelo lugar em que aparece e pelas relações que estabelece com outros elementos da obra. O mesmo objeto pode condensar perda e promessa, sem que o texto escolha entre as duas. Interpretar não é traduzir o símbolo em uma palavra única, mas mostrar que nexos o texto construiu e quais permanecem abertos.",
      ko: "접힌 승선권의 상징성은 사물의 표상과 인물의 관계를 겹쳐 놓는다.",
    },
    {
      title: "A ambiguidade não é falta de rigor",
      body: "Quando duas pistas sustentam sentidos opostos, o crítico não precisa declarar que uma delas é falsa. Ele pode mostrar por que o texto mantém as duas e o que cada leitura ilumina. O risco aparece quando o leitor transforma o símbolo em alegoria fechada: cada detalhe passa a ter um equivalente fixo e a obra perde justamente o que a tornava interessante. Preservar a ambiguidade exige mais precisão, não menos.",
      ko: "이 모티프의 다의성은 우의나 환유로 축소되지 않으며, 색채와 잔상 같은 세부가 해석을 열어 둔다.",
    },
  ],
  dialogue: [
    ["예린", "접힌 승선권이 이 작품의 중심 상징인 것 같아.", "Parece que a passagem dobrada é o símbolo central desta obra."],
    ["준호", "상징이라기보다 그냥 오래된 표 아닐까?", "Não seria apenas um bilhete antigo, em vez de um símbolo?"],
    ["소미", "표가 세 번 나오잖아. 사고, 접기, 남기기. 반복되면 의미가 생겨.", "O bilhete aparece três vezes: compra, dobra e permanência. A repetição cria sentido."],
    ["예린", "맞아. 접힌 자국은 되돌릴 수 없다는 뜻일 수도 있어.", "Exato. A marca da dobra também pode significar que não há como voltar atrás."],
    ["준호", "그런데 마지막에 한 장이 더 남아 있잖아. 그건 반대로 돌아올 수 있다는 뜻이기도 하고.", "Mas no final sobra mais um bilhete. Isso, ao contrário, também pode significar que é possível voltar."],
    ["소미", "그래서 하나로 정하면 안 돼. 색이 바랜 표라는 점도 중요해.", "Por isso não devemos fixar um único sentido. Também importa que o bilhete esteja desbotado."],
    ["예린", "색채가 바랜 건 시간을 보여 주지만, 동시에 기억이 남아 있다는 뜻이지.", "A cor desbotada mostra o tempo, mas ao mesmo tempo indica que a memória permanece."],
    ["준호", "결국 이 표는 떠남과 귀환을 동시에 표상하는 셈이네.", "No fim, o bilhete representa ao mesmo tempo a partida e o retorno."],
  ],
  readingText: {
    titlePt: "A dobra e o tempo",
    paragraphs: [
      "접힌 승선권은 이 작품에서 가장 자주 언급되는 사물이다. 명주는 표를 사고, 손가락으로 접는다. 그리고 마지막 장면에서 그 표는 매표소 앞에 남아 있다. 세 장면은 같은 물건을 서로 다른 상태로 보여 준다. 처음에는 아직 사용되지 않은 가능성이고, 다음에는 선택의 흔적이며, 마지막에는 누군가의 손을 떠난 잔여물이다. 작품은 표의 재질과 색채를 자세히 묘사한다. 종이는 얇고, 인쇄된 글자는 빛에 바랬고, 접힌 자리는 이미 여러 번 펴진 듯하다. 이 세부는 표를 단순한 장식이 아니라 시간을 담은 사물로 만든다.",
      "표의 의미는 한 방향으로 정리되지 않는다. 한 해석에서는 접힌 자국이 미련의 흔적이다. 명주가 표를 완전히 버리지 못했다는 뜻이므로, 마지막에 남은 표는 귀환의 가능성을 가리킨다. 다른 해석에서는 같은 자국이 결심의 흔적이다. 여러 번 접었다 편 끝에 그녀는 표를 버렸고, 남은 표는 그녀가 이미 떠났다는 증거가 된다. 두 해석 모두 텍스트의 세부와 충돌하지 않는다. 문제는 어느 쪽이 작가의 의도인지가 아니라, 어느 쪽이 더 많은 세부를 설명하는가이다.",
      "이 표를 작품 전체의 우의로 읽는 것은 위험하다. 배는 운명이고, 매표소는 사회이며, 정호는 과거를 상징한다고 정리하면 편하다. 그러나 그렇게 읽는 순간, 표의 얇은 종이와 바랜 색채, 손때 묻은 모서리는 의미를 잃는다. 상징은 개념의 암호가 아니라 감각적 세부와 독자의 기억이 만나는 자리다. 그래서 나는 이 표를 하나의 뜻으로 닫지 않는다. 그것은 어떤 사람이 남긴 잔상이며, 그 잔상이 누구에게는 약속으로, 누구에게는 상처로 남는다는 점만 말할 수 있다.",
    ],
    pt: "A passagem dobrada é o objeto mais mencionado nesta obra. Myeongju compra o bilhete e o dobra com os dedos. E, na cena final, o bilhete permanece diante da bilheteria. As três cenas mostram o mesmo objeto em estados diferentes. No começo, é uma possibilidade ainda não usada; depois, o vestígio de uma escolha; por fim, o resto que saiu das mãos de alguém. A obra descreve com cuidado o material e a cor do bilhete. O papel é fino, as letras impressas desbotaram com a luz e a dobra parece já ter sido aberta várias vezes. Esse detalhe transforma o bilhete em um objeto que carrega tempo, não em simples decoração. O sentido do bilhete não se organiza em uma única direção. Em uma leitura, a marca da dobra é vestígio de apego. Significa que Myeongju não conseguiu descartar completamente o bilhete; por isso, o bilhete que resta no final indica a possibilidade de retorno. Em outra leitura, a mesma marca é vestígio de decisão. Depois de dobrar e abrir várias vezes, ela jogou o bilhete fora, e o que resta é a prova de que ela já partiu. Nenhuma das duas interpretações entra em conflito com os detalhes do texto. A questão não é qual delas corresponde à intenção da autora, mas qual explica mais detalhes. Ler esse bilhete como alegoria do conjunto da obra é arriscado. Seria cômodo concluir que o navio é o destino, a bilheteria é a sociedade e Jeongho representa o passado. No entanto, no momento em que lemos assim, o papel fino, a cor desbotada e as bordas gastas pelo manuseio perdem sentido. O símbolo não é um código de conceitos, mas um lugar onde detalhes sensoriais e a memória do leitor se encontram. Por isso não fecho o bilhete em um único sentido. Ele é a imagem residual que alguém deixou, e só posso dizer que essa imagem permanece como promessa para uns e como ferida para outros.",
    objective: "Relacionar o símbolo aos detalhes do texto e sustentar duas leituras sem fechar o sentido.",
  },
  reusedIds: ["ko:상징", "ko:반복", "ko:운명", "ko:위험"],
  grammar: [
    [
      "-ㄴ/는 상징이다 — é símbolo de",
      "명사 + 의 상징이다 / 명사 + 를 상징하다",
      "Apresenta um objeto, gesto ou imagem como portador de um sentido mais amplo. Na análise, é mais prudente quando vem acompanhado da pista que autoriza a relação. Compare com 표상이다, que enfatiza a representação de um coletivo, e com 대표하다, que sugere exemplaridade. '상징이다' não prova que o autor quis dizer isso; descreve uma relação construída pelo texto e pela leitura.",
      [
        ["접힌 승선권은 떠남의 상징이다.", "A passagem dobrada é símbolo da partida."],
        ["바랜 색채는 지나간 시간의 상징이다.", "A cor desbotada é símbolo do tempo passado."],
      ],
    ],
    [
      "-ㄹ 수 있다 — pode ser que",
      "동사·형용사 + -ㄹ 수 있다",
      "Além da capacidade, marca possibilidade epistêmica: o falante apresenta uma inferência sem assumi-la como certeza. Na crítica literária, é útil para formular leituras concorrentes. Compare com -ㄹ 수도 있다, que acrescenta 'também', e com -ㄹ 것이다, que projeta uma consequência com mais força. Não confunda possibilidade com permissão: para pedir ou autorizar, o coreano usa outras formas.",
      [
        ["이 표는 귀환의 의미로 읽힐 수 있다.", "Este bilhete pode ser lido com o sentido de retorno."],
        ["작가는 의도를 밝히지 않았을 수 있다.", "Pode ser que a autora não tenha revelado sua intenção."],
      ],
    ],
  ],
  guided: [
    mcq("Qual detalhe sustenta a leitura do bilhete como possibilidade de retorno?", ["O bilhete que resta no balcão depois da partida do navio.", "O fato de o navio atrasar duas vezes.", "A presença de outras pessoas na sala de espera."], "O bilhete que resta no balcão depois da partida do navio.", "O objeto que permanece mantém aberta a possibilidade de que alguém ainda não tenha rompido com o lugar."),
    cloze("Complete a formulação do símbolo: 접힌 승선권은 떠남의 ___이다.", "상징", "-의 상징이다 apresenta o objeto como portador de um sentido mais amplo."),
    listen("Ouça e escreva a leitura de Yerin sobre a dobra. Escreva a frase completa que ouvir.", "접힌 자국은 되돌릴 수 없다는 뜻일 수도 있어.", "접힌 자국은 되돌릴 수 없다는 뜻일 수도 있어.", "A marca da dobra também pode significar que não há como voltar atrás."),
    translate("pt-ko", "Traduza: “O bilhete dobrado pode ser lido como símbolo de retorno.”", "접힌 승선권은 귀환의 상징으로 읽힐 수 있다.", "-ㄹ 수 있다 formula uma possibilidade de leitura, não uma certeza."),
    reading("한 해석에서는 접힌 자국이 미련의 흔적이다. 명주가 표를 완전히 버리지 못했다는 뜻이므로, 마지막에 남은 표는 귀환의 가능성을 가리킨다. 다른 해석에서는 같은 자국이 결심의 흔적이다.", "Por que as duas leituras do bilhete podem coexistir?", ["Porque o mesmo detalhe — a dobra — pode indicar tanto apego quanto decisão.", "Porque o texto foi escrito por duas pessoas diferentes.", "Porque o bilhete não aparece na história."], "Porque o mesmo detalhe — a dobra — pode indicar tanto apego quanto decisão.", "As duas leituras partem do mesmo traço material e o interpretam em direções opostas."),
  ],
  independent: [
    mcq("Por que a autora do ensaio evita ler o bilhete como alegoria fechada?", ["Porque a alegoria fixa cada detalhe em um conceito e apaga a materialidade do objeto.", "Porque a obra não tem personagens suficientes para uma alegoria.", "Porque o bilhete não aparece no final."], "Porque a alegoria fixa cada detalhe em um conceito e apaga a materialidade do objeto.", "A crítica preserva os detalhes sensoriais que uma chave alegórica eliminaria."),
    cloze("Complete a possibilidade de leitura: 이 표는 귀환의 의미로 읽힐 ___ 있다.", "수", "A estrutura -ㄹ 수 있다 marca possibilidade, não permissão."),
    listen("Ouça e escreva a advertência de Somi sobre o sentido. Escreva a frase completa que ouvir.", "그래서 하나로 정하면 안 돼.", "그래서 하나로 정하면 안 돼.", "Por isso não devemos fixar um único sentido."),
    translate("ko-pt", "Traduza: 이 모티프의 다의성은 우의나 환유로 축소되지 않는다.", "A polissemia deste motivo não se reduz a alegoria nem a metonímia.", "축소되다 = ser reduzido; 우의 = alegoria; 환유 = metonímia.", ["A multiplicidade de sentidos desse motivo não se deixa reduzir a alegoria ou metonímia."]),
    reading("이 표를 작품 전체의 우의로 읽는 것은 위험하다. 배는 운명이고, 매표소는 사회이며, 정호는 과거를 상징한다고 정리하면 편하다. 그러나 그렇게 읽는 순간, 표의 얇은 종이와 바랜 색채, 손때 묻은 모서리는 의미를 잃는다.", "O que se perde quando o símbolo é convertido em alegoria fixa?", ["Os detalhes materiais que não se encaixam em um único conceito.", "A possibilidade de identificar o personagem principal.", "A diferença entre o navio e a bilheteria."], "Os detalhes materiais que não se encaixam em um único conceito.", "A alegoria fecha o sentido e deixa de explicar a textura, a cor e o desgaste do objeto."),
  ],
  summary: [
    "O símbolo se constrói pela repetição, pelo contexto e pelas relações com outros elementos da obra.",
    "Duas leituras podem ser defensáveis quando o mesmo detalhe sustenta direções opostas.",
    "-ㄴ/는 상징이다 descreve uma relação de sentido, não uma intenção comprovada do autor.",
    "-ㄹ 수 있다 formula possibilidade epistêmica e ajuda a manter leituras concorrentes.",
    "A alegoria fechada simplifica o texto, mas apaga os detalhes materiais que o sustentam.",
  ],
  production: production(
    "Produção independente · duas leituras de um símbolo",
    "Escolha um objeto recorrente em um conto, filme ou série e escreva duas interpretações possíveis para ele. Cada interpretação deve citar um detalhe concreto da obra e explicar o que esse detalhe ilumina. Termine dizendo por que você não fecha o sentido em uma única leitura.",
    "반복해서 등장하는 사물을 골라 두 가지 해석을 쓰고, 각 해석을 구체적인 세부로 뒷받침한 뒤 왜 하나로 닫지 않는지 설명해 보세요.",
    ["Apresente o objeto e as cenas em que ele aparece.", "Dê a cada leitura uma pista material distinta: cor, textura, posição ou gesto.", "Use -ㄴ/는 상징이다 e -ㄹ 수 있다 ao menos uma vez cada.", "Não atribua a interpretação à intenção declarada do autor.", "Feche explicando o que se ganha ao preservar as duas leituras."],
    ["Objeto e recorrência apresentados.", "Duas leituras com pistas distintas.", "Duas formas-alvo empregadas corretamente.", "Intenção do autor não usada como prova.", "Sentido aberto justificado."],
    "영화 「여름의 우산」에는 주인공이 계속 들고 다니는 검은 우산이 나온다. 우산은 비가 오지 않는 날에도 접힌 채 가방에 들어 있다. 첫 번째 해석에서 이 우산은 보호의 상징이다. 주인공은 어머니가 남긴 우산을 버리지 못하고, 그것은 그가 아직 상실을 받아들이지 못했다는 뜻이 된다. 우산의 검은 색과 닳은 손잡이는 오래된 보호가 여전히 작동하고 있음을 보여 준다. 두 번째 해석에서 우산은 거절의 표상이다. 그는 누군가와 같은 우산을 쓰지 않으려고 일부러 접어 둔다. 비가 와도 우산을 펴지 않는 장면은 관계를 피하려는 태도로 읽힐 수 있다. 두 해석은 서로 모순되지만, 둘 다 우산의 재질과 반복되는 위치라는 세부에 근거한다. 그래서 나는 이 우산을 하나의 뜻으로 닫지 않는다. 그것은 상실을 감추는 동시에 드러내는 사물이다. 이처럼 사물의 의미는 한 번에 결정되지 않고, 장면이 반복될수록 두꺼워진다.",
    "No filme 'O guarda-chuva de verão', o protagonista carrega sempre um guarda-chuva preto. Mesmo em dias sem chuva, ele fica dobrado dentro da bolsa. Na primeira interpretação, esse guarda-chuva é símbolo de proteção. O protagonista não consegue descartar o guarda-chuva que a mãe deixou, e isso significa que ainda não aceitou a perda. A cor preta e o cabo gasto mostram que uma proteção antiga continua em funcionamento. Na segunda interpretação, o guarda-chuva é emblema de recusa. Ele o mantém dobrado de propósito para não dividir o guarda-chuva com ninguém. A cena em que não o abre mesmo quando chove pode ser lida como atitude de evitar relações. As duas leituras se contradizem, mas ambas se apoiam no material do guarda-chuva e na repetição de sua posição. Por isso não fecho esse guarda-chuva em um único sentido. É um objeto que ao mesmo tempo esconde e revela a perda. O sentido do objeto não se decide de uma vez: ele se adensa à medida que as cenas se repetem.",
    "Exemplo original. Observe que cada leitura se apoia em um detalhe material diferente e que o fechamento preserva a contradição. Exemplo ilustrativo; não é gabarito.",
  ),
});

/** c2-l29 — contexto histórico, intertextualidade e limite da explicação. */
export const C2_L29 = defineC2Lesson({
  id: "c2-l29", number: 29, moduleId: "c2-m06", title: "Contexto e intertexto",
  objective: "Relacionar um texto ao contexto histórico e a outros textos sem reduzir um ao outro.",
  prerequisites: ["c2-l28"], estimatedMinutes: 85, dialogueTitle: "O navio e a história",
  intro: [
    {
      title: "O contexto ilumina, mas não explica tudo",
      body: "Saber quando uma obra foi escrita e quais debates circulavam ao redor dela ajuda a entender escolhas que o texto não justifica. Uma rota de ferry desativada, uma população que migra, uma crise econômica: esses dados podem tornar visível o que os personagens não dizem. O risco é transformar o contexto em chave única, como se cada elemento da ficção fosse um espelho direto de um fato histórico. O contexto deve explicar o que o texto pressupõe, não substituir o que ele constrói.",
      ko: "이 작품의 시대적 배경에는 산업화와 이촌향도, 그리고 북포항의 폐항이 겹쳐 있다.",
    },
    {
      title: "Intertexto não é dívida",
      body: "Um texto conversa com outros sem precisar copiá-los. A intertextualidade aparece na citação, na paródia, na retomada de um motivo ou na recusa de uma forma anterior. Reconhecer essa conversa amplia a leitura, mas não autoriza dizer que duas obras são iguais. A comparação precisa nomear o que muda: o tom, o ponto de vista, o uso do mesmo material. Fora disso, a semelhança vira anacronismo ou simples curiosidade.",
      ko: "원전을 패러디한 연극은 상호텍스트성 속에서 읽어야 하며, 시대착오적인 해석은 피해야 한다.",
    },
  ],
  dialogue: [
    ["지안", "이 소설을 1990년대 구조조정의 이야기로 읽는 사람들이 많아.", "Muitas pessoas leem este conto como uma história da reestruturação dos anos 1990."],
    ["태오", "북포항의 폐항과 이촌향도가 실제로 있었으니 그 해석도 설득력이 있어.", "Como o fechamento do porto de Bukpo e o êxodo rural realmente aconteceram, essa leitura também tem força."],
    ["지안", "그런데 작품이 그 사건을 직접 언급하지는 않아.", "No entanto, a obra não menciona diretamente esses acontecimentos."],
    ["태오", "그래도 시대적 배경을 무시하면 인물의 선택이 이해되지 않아.", "Mesmo assim, se ignorarmos o contexto histórico, a escolha dos personagens fica incompreensível."],
    ["지안", "맞아. 다만 배가 반드시 국가를 상징한다고 보는 건 지나쳐.", "Exato. Mas é exagero afirmar que o navio necessariamente simboliza o Estado."],
    ["태오", "상호텍스트성도 조심해야 해. 다른 작품과 비슷하다고 같은 작품은 아니잖아.", "Também é preciso cuidado com a intertextualidade. Ser parecido com outra obra não faz dele o mesmo texto."],
    ["지안", "원전을 패러디한 연극도 마찬가지지. 패러디는 원작을 비웃는 것만은 아니야.", "O mesmo vale para a peça que parodia o texto original. Paródia não é apenas zombar da obra anterior."],
    ["태오", "결국 맥락은 해석을 돕지만, 답을 대신하지는 않는 거네.", "No fim, o contexto ajuda a interpretar, mas não substitui a resposta."],
  ],
  readingText: {
    titlePt: "Uma rota que deixou de existir",
    paragraphs: [
      "북포항은 1970년대 이후 산업화와 이촌향도를 겪었다. 젊은 사람들이 일자리를 찾아 도시로 떠나면서 항구의 인구는 꾸준히 줄었고, 1990년대 후반에는 여객선 노선이 하나씩 줄었다. 1998년 겨울, 마지막 정기 노선의 운항이 중단되었고, 북포항은 사실상 폐항하였다. 그 이후 여객선은 다시 다니지 않는다. 이 사실은 소설이 직접 설명하지 않는 배경이지만, 인물이 왜 그렇게 오래 매표소에 서 있는지를 이해하는 데 도움을 준다. 배는 교통수단이면서 동시에 떠난 사람들과 남은 사람들을 연결하던 마지막 통로였기 때문이다.",
      "그러나 이 배경을 작품의 알레고리로 바꾸면 세부가 사라진다. 항구는 국가의 몰락이고, 표는 생존권이며, 정호는 역사의 증인이라고 정리할 수는 있다. 그런 정리는 편리하지만, 명주가 표를 접는 방식이나 대합실의 빗소리 같은 구체적인 장면을 설명하지 못한다. 소설은 역사적 사건을 재현하는 대신, 그 사건이 사람들의 시간 감각을 어떻게 바꾸었는지 보여 준다. 폐항은 배경이고, 인물의 선택은 그 배경에 대한 응답이지 그 자체로 역사의 축소판은 아니다.",
      "이 작품을 다른 텍스트와 함께 읽을 때도 같은 조심이 필요하다. 2000년대의 한 연극은 이 소설을 패러디하여, 배가 떠나지 않는 마을을 무대에 올렸다. 두 작품의 상호텍스트성은 분명하지만, 연극은 결말을 바꾸고 인물의 대사를 늘렸다. 원전을 기준으로 연극을 평가하면 연극의 고유한 선택을 놓치고, 연극만으로 소설을 읽으면 소설의 침묵을 메울 수 없다. 맥락은 두 작품 사이의 거리를 재는 데 쓰여야 하며, 그 거리를 지우는 데 쓰이면 안 된다. 시대착오적인 질문을 피하려면, 먼저 각 작품이 자기 시대에 무엇을 할 수 있었는지 물어야 한다.",
    ],
    pt: "O porto de Bukpo passou, desde a década de 1970, por industrialização e êxodo rural. À medida que os jovens partiam em busca de trabalho nas cidades, a população do porto diminuía constantemente e, no fim dos anos 1990, as linhas de balsa foram sendo reduzidas uma a uma. No inverno de 1998, a última linha regular foi desativada. Depois do fechamento do porto, nenhuma balsa voltou a circular. Esse fato é um pano de fundo que o conto não explica diretamente, mas ajuda a entender por que os personagens ficam tanto tempo diante da bilheteria. O navio era meio de transporte e, ao mesmo tempo, o último canal que ligava quem partia a quem ficava. No entanto, transformar esse contexto em alegoria da obra faz os detalhes desaparecerem. Pode-se organizar tudo dizendo que o porto é a decadência do Estado, o bilhete é o direito à sobrevivência e Jeongho é a testemunha da história. Essa organização é cômoda, mas não explica cenas concretas, como o modo de dobrar o bilhete ou o som da chuva na sala de espera. Em vez de reproduzir o acontecimento histórico, o conto mostra como ele alterou a percepção do tempo das pessoas. O fechamento do porto é pano de fundo, e a escolha dos personagens é uma resposta a esse fundo, não uma miniatura da história. Ao ler esta obra junto com outros textos, é preciso o mesmo cuidado. Uma peça dos anos 2000 parodiou o conto e levou ao palco uma vila em que o navio não parte. A intertextualidade entre as duas obras é evidente, mas a peça muda o desfecho e amplia as falas dos personagens. Avaliar a peça tendo o texto original como única régua faz perder as escolhas próprias da encenação; ler o conto apenas pela peça impede que se preencha o silêncio do conto. O contexto deve servir para medir a distância entre as duas obras, não para apagá-la. Para evitar perguntas anacrônicas, é preciso primeiro perguntar o que cada obra podia fazer em seu próprio tempo.",
    objective: "Relacionar o conto ao contexto histórico e a outra obra, delimitando o que cada explicação pode afirmar.",
  },
  reusedIds: ["ko:맥락", "ko:일자리", "ko:상호", "ko:상징"],
  grammar: [
    [
      "-ㄴ/는 배경이다 — é o pano de fundo de",
      "명사 + 는/은 배경이다 / 동사 + -는 배경이다",
      "Situa um fato, uma obra ou uma escolha em um conjunto de condições anteriores. É mais amplo do que -ㄴ/는 원인이다, que estabelece causalidade direta, e mais histórico do que -ㄴ/는 상황이다, que descreve o momento imediato. Na análise cultural, '배경' ajuda a evitar a causalidade simplista: o contexto torna algo inteligível, mas não o determina por completo.",
      [
        ["폐항은 이 소설의 역사적 배경이다.", "O fechamento do porto é o pano de fundo histórico deste conto."],
        ["인구 감소는 인물의 이별을 이해하는 배경이 된다.", "A queda populacional se torna o pano de fundo para compreender a separação dos personagens."],
      ],
    ],
    [
      "-ㄴ/는 맥락에서 — no contexto de",
      "명사 + 의 맥락에서 / 동사 + -는 맥락에서",
      "Delimita o quadro em que uma fala, escolha ou obra adquire sentido. Diferente de -ㄴ/는 배경에서, que aponta para condições históricas mais amplas, '맥락' costuma indicar a situação interpretativa concreta. Compare com -ㄴ/는 상황에서, que descreve circunstâncias imediatas. A expressão não garante que o contexto explique tudo; ela apenas define onde a interpretação deve começar.",
      [
        ["산업화의 맥락에서 보면, 이 이주는 개인의 선택만이 아니다.", "No contexto da industrialização, essa migração não é apenas uma escolha individual."],
        ["이 대사를 시대적 맥락에서 읽어야 한다.", "Esta fala deve ser lida no contexto histórico da época."],
      ],
    ],
  ],
  guided: [
    mcq("Qual informação contextual é relevante para entender a cena do terminal?", ["O fechamento da última linha regular de balsas no fim dos anos 1990.", "A cor do uniforme dos funcionários do porto.", "O nome do ator que interpretou Jeongho no teatro."], "O fechamento da última linha regular de balsas no fim dos anos 1990.", "A perda da rota explica por que o navio e a bilheteria têm um peso que vai além do transporte."),
    cloze("Complete a formulação do contexto: 폐항은 이 소설의 역사적 ___이다.", "배경", "-ㄴ/는 배경이다 situa a obra em condições históricas mais amplas."),
    listen("Ouça e escreva o dado histórico sobre a rota. Escreva a frase completa que ouvir.", "북포항이 폐항한 이후 여객선은 다시 다니지 않는다.", "북포항이 폐항한 이후 여객선은 다시 다니지 않는다.", "Depois que o porto de Bukpo fechou, nenhuma balsa voltou a circular."),
    translate("pt-ko", "Traduza: “No contexto da industrialização, muitas famílias deixaram o campo.”", "산업화의 맥락에서 많은 가족이 농촌을 떠났다.", "-의 맥락에서 delimita o quadro histórico da interpretação."),
    reading("북포항은 1970년대 이후 산업화와 이촌향도를 겪었다. 젊은 사람들이 일자리를 찾아 도시로 떠나면서 항구의 인구는 꾸준히 줄었고, 1990년대 후반에는 여객선 노선이 하나씩 줄었다. 1998년 겨울, 마지막 정기 노선의 운항이 중단되었고, 북포항은 사실상 폐항하였다.", "Por que o contexto histórico ajuda a entender a cena?", ["Porque a perda da linha marítima explica o peso do navio para quem parte e para quem fica.", "Porque o texto informa a data exata em que os personagens se conheceram.", "Porque a industrialização é o tema explícito de todas as falas."], "Porque a perda da linha marítima explica o peso do navio para quem parte e para quem fica.", "O dado histórico ilumina a espera no terminal sem aparecer como explicação direta no texto."),
  ],
  independent: [
    mcq("Qual é o risco de usar o contexto histórico como chave única da obra?", ["Transformar cada detalhe em alegoria histórica e perder os detalhes que não se encaixam.", "Deixar de saber em que ano a obra foi publicada.", "Confundir o nome dos personagens com o nome do autor."], "Transformar cada detalhe em alegoria histórica e perder os detalhes que não se encaixam.", "A explicação histórica pode apagar a materialidade e a ambiguidade da ficção."),
    cloze("Complete a delimitação interpretativa: 이 대사를 시대적 ___에서 읽어야 한다.", "맥락", "-ㄴ/는 맥락에서 indica o quadro concreto em que a fala ganha sentido."),
    listen("Ouça e escreva a ressalva sobre a referência histórica. Escreva a frase completa que ouvir.", "그런데 작품이 그 사건을 직접 언급하지는 않아.", "그런데 작품이 그 사건을 직접 언급하지는 않아.", "No entanto, a obra não menciona diretamente esses acontecimentos."),
    translate("ko-pt", "Traduza: 그래도 시대적 배경을 무시하면 인물의 선택이 이해되지 않는다.", "Mesmo assim, se ignorarmos o contexto histórico, a escolha dos personagens fica incompreensível.", "무시하다 = ignorar; 시대적 배경 = contexto histórico da época.", ["Ainda assim, sem levar em conta o contexto histórico, não se entende a escolha dos personagens."]),
    reading("두 작품의 상호텍스트성은 분명하지만, 연극은 결말을 바꾸고 인물의 대사를 늘렸다. 원전을 기준으로 연극을 평가하면 연극의 고유한 선택을 놓치고, 연극만으로 소설을 읽으면 소설의 침묵을 메울 수 없다.", "O que a comparação entre o conto e a peça exige do leitor?", ["Que reconheça a relação entre as obras sem apagar as escolhas próprias de cada uma.", "Que escolha a peça como versão definitiva do conto.", "Que ignore o texto original para não interferir na leitura."], "Que reconheça a relação entre as obras sem apagar as escolhas próprias de cada uma.", "A intertextualidade deve medir a distância entre as obras, não eliminar suas diferenças."),
  ],
  summary: [
    "O contexto histórico torna visíveis pressupostos da obra, mas não a explica por inteiro.",
    "Ler ficção como espelho direto de um fato histórico apaga os detalhes que a constituem.",
    "-ㄴ/는 배경이다 situa a obra em condições amplas; -ㄴ/는 맥락에서 delimita o quadro interpretativo.",
    "A intertextualidade se analisa pelo que muda entre as obras, não apenas pelo que se repete.",
    "Evitar anacronismo exige perguntar o que cada obra podia fazer em seu próprio tempo.",
  ],
  production: production(
    "Produção independente · contexto com limite",
    "Escolha uma obra que dialogue com um acontecimento histórico ou com outra obra. Escreva uma nota de leitura que apresente esse contexto, mostre duas passagens em que ele ajuda a entender a cena e explique um ponto em que a explicação histórica deixa de ser suficiente.",
    "역사적 사건이나 다른 작품과 대화하는 작품을 골라, 맥락이 해석에 도움이 되는 지점과 그 한계를 함께 써 보세요.",
    ["Apresente o contexto em duas ou três frases, sem resumir a obra inteira.", "Relacione o contexto a duas passagens concretas.", "Use -ㄴ/는 배경이다 e -ㄴ/는 맥락에서 ao menos uma vez cada.", "Diga o que o contexto não explica.", "Evite transformar personagens em alegorias históricas fixas."],
    ["Contexto apresentado com precisão.", "Duas passagens relacionadas ao contexto.", "Duas formas-alvo usadas corretamente.", "Limite da explicação histórica nomeado.", "Anacronismo ou alegoria fixa evitados."],
    "소설 「겨울 항구」는 1990년대 말의 항만 구조조정을 배경으로 한다. 그 시기 여러 지방 항구에서 정기 여객선 노선의 운항이 중단되었고, 북포항도 폐항하였다. 젊은 인구의 이촌향도가 이어졌다. 이 맥락은 주인공이 왜 마지막 배를 기다리는지 이해하는 데 도움을 준다. 첫째, 그녀가 매표소에서 오래 머무는 장면은 교통수단의 상실이 곧 관계의 단절이었음을 보여 준다. 둘째, 창밖의 빈 부두를 바라보는 대사는 지역 공동체의 축소를 암시한다. 그러나 이 배경만으로 모든 장면을 설명할 수는 없다. 주인공이 표를 접는 행동은 역사적 조건만으로 환원되지 않는다. 그것은 개인의 기억과 후회가 만든 선택이기 때문이다. 따라서 시대적 배경은 해석의 출발점이지 결론이 아니다. 이 작품을 역사의 축소판으로 읽으면, 인물의 침묵과 망설임이 지닌 고유한 의미를 놓치게 된다. 그러나 시대적 배경을 완전히 무시하면 인물의 선택이 왜 그렇게 오래 이어졌는지 설명하기 어렵다. 그래서 나는 배경과 인물의 구체성을 함께 읽으려 한다.",
    "O conto 'Porto de inverno' tem como pano de fundo a reestruturação portuária do fim dos anos 1990. Naquele período, linhas regulares de balsas foram desativadas em vários portos regionais, e o êxodo rural dos jovens continuou. Esse contexto ajuda a entender por que a protagonista espera o último navio. Primeiro, a cena em que ela permanece muito tempo na bilheteria mostra que a perda do transporte significava também a ruptura de relações. Segundo, a fala em que ela olha para o cais vazio sugere a redução da comunidade local. No entanto, esse fundo não explica todas as cenas. O gesto de dobrar o bilhete não se reduz às condições históricas. É uma escolha feita de memória e arrependimento pessoais. Portanto, o contexto histórico é o ponto de partida da interpretação, não a conclusão. Ler esta obra como miniatura da história faz perder o sentido próprio do silêncio e da hesitação dos personagens. No entanto, ignorar completamente o contexto histórico também dificulta explicar por que a escolha deles se prolonga por tanto tempo. Por isso procuro ler o contexto e a concretude dos personagens em conjunto.",
    "Exemplo original. Observe que o contexto é apresentado com precisão, relacionado a duas passagens e limitado por um detalhe que ele não explica. Exemplo ilustrativo; não é gabarito.",
  ),
});

/** c2-l30 — crítica cultural, recepção e critérios explícitos. */
export const C2_L30 = defineC2Lesson({
  id: "c2-l30", number: 30, moduleId: "c2-m06", title: "Crítica cultural",
  objective: "Avaliar uma obra cultural e o discurso que a recebeu com critérios explícitos.",
  prerequisites: ["c2-l29"], estimatedMinutes: 85, dialogueTitle: "O que o público fez com a peça",
  intro: [
    {
      title: "Obra, recepção e crítica da recepção",
      body: "Uma obra não termina quando o autor a entrega: ela passa a existir também nos usos que o público faz dela. Mas analisar a recepção não é substituir a obra pelo que se disse sobre ela. São três objetos distintos: o texto encenado, a interpretação dos espectadores e a discussão pública sobre essa interpretação. Confundir os três leva a atribuir à obra uma intenção que ela não tem ou a tratar o público como massa passiva.",
      ko: "이 연극의 흥행은 수용자의 취향과 대중성에 대한 기대를 드러냈고, 일부 평론가는 상업성에 반감을 보이며 연출을 비판했다.",
    },
    {
      title: "Critério explícito, risco nomeado",
      body: "Uma crítica cultural se fortalece quando declara o critério com que avalia: fidelidade à obra anterior, coerência interna, acesso a um público novo, ética da representação ou qualidade da encenação. Sem critério, a avaliação vira preferência pessoal. Com critério, é possível discordar sem acusar o outro de má-fé. Além disso, toda crítica corre riscos: o risco de confundir popularidade com valor e o risco de tratar o gosto do público como sinal de alienação.",
      ko: "다른 평론가는 작품을 옹호했고, 초연은 일부 평론가의 호평을 받았다.",
    },
  ],
  dialogue: [
    ["유진", "이 연극은 원작의 모호함을 관객에게 친절하게 번역했어.", "Esta peça traduziu a ambiguidade da obra original de forma acessível para o público."],
    ["상우", "친절한 게 문제야. 결말을 설명해 버리면 원작의 긴장이 사라져.", "O problema é justamente essa acessibilidade. Se o desfecho é explicado, a tensão do original desaparece."],
    ["유진", "하지만 처음 연극을 보는 수용자에게는 필요한 선택이었을 수 있어.", "Mas talvez tenha sido uma escolha necessária para o receptor que vê a peça pela primeira vez."],
    ["상우", "그 선택이 흥행을 노린 건 아닐까? 대중성과 상업성을 동시에 잡으려는.", "Não pode ter sido uma escolha voltada ao sucesso de público? Tentar alcançar popularidade e comercialidade ao mesmo tempo."],
    ["유진", "상업적이라고 해서 자동으로 나쁜 건 아니야.", "Ser comercial não faz algo automaticamente ruim."],
    ["상우", "물론이지. 다만 나는 그 연출을 옹호하기는 어려워.", "Claro. Apenas me é difícil defender essa direção."],
    ["유진", "평단의 혹평도 있었지만, 관객의 호평도 무시할 수 없어.", "Houve críticas negativas da crítica especializada, mas também não se pode ignorar a recepção favorável do público."],
    ["상우", "결국 작품과 수용을 나눠서 봐야 한다는 거네.", "No fim, é preciso separar a obra da recepção."],
  ],
  readingText: {
    titlePt: "Um final explicado, duas recepções",
    paragraphs: [
      "연극 「새벽호는 떠나지 않는다」는 소설 「접힌 승선권」의 마지막 장면을 무대의 중앙에 놓는다. 무대에는 배가 없고, 매표소와 계단만 있다. 연출가는 관객이 결말을 오해하지 않도록 마지막 대사를 추가했다. 주인공은 표를 주머니에 넣고, 무대 뒤에서 배의 경적이 울린다. 이 선택 덕분에 공연은 예매 시작 사흘 만에 매진되었고, 흥행은 제작사가 예상한 것보다 컸다. 대중성과 상업성을 동시에 얻은 사례로 언급되기도 한다. 그러나 원작의 마지막 문장은 사라졌다.",
      "평론은 둘로 갈렸다. 한 평론가는 이 연출을 새로운 수용자를 위한 각색으로 읽었다. 무대의 단순한 구조와 명확한 대사가 처음 연극을 보는 관객에게 작품을 가까이 가져왔다는 것이다. 다른 평론가는 같은 선택을 원작의 긴장을 훼손한 해석으로 보았다. 표를 주머니에 넣는 동작은 떠남을 확정하고, 남은 표가 만들어 내던 여지를 없앤다. 관객의 반응도 갈렸다. 공연 뒤 온라인 게시판에는 '이제야 이해했다'는 호평과 '결말을 설명해 버렸다'는 혹평이 함께 올라왔다. 일부 관객은 연출가와의 대화를 요청했고, 제작사는 두 차례의 관객 간담회를 열었다.",
      "이 논쟁을 읽을 때 우리는 작품, 수용, 그리고 수용에 대한 비판을 구분해야 한다. 작품은 무대 위의 선택이고, 수용은 관객이 그것을 받아들이는 방식이며, 비판은 그 받아들임을 다시 평가하는 담론이다. 대중의 호평을 곧 작품의 가치로 등치하면 비판의 몫이 사라지고, 반대로 흥행을 상업성의 증거로만 읽으면 관객의 경험을 무시하게 된다. 두 위험은 대칭적이다. 나는 이 연출을 '원작의 여지를 줄인 각색'으로 평가하되, 그 선택이 새로운 관객에게 문을 열었다는 점도 함께 기록해야 한다고 본다. 좋은 비평은 작품을 변호하거나 고발하는 일이 아니라, 어떤 기준으로 무엇을 얻고 무엇을 잃었는지 밝히는 일이다.",
    ],
    pt: "A peça 'O navio da madrugada não parte' coloca no centro do palco a cena final do conto 'A passagem dobrada'. Não há navio no palco, apenas a bilheteria e a escada. O diretor acrescentou uma última fala para que o público não interpretasse mal o desfecho. A protagonista guarda o bilhete no bolso, e, nos bastidores, soa a buzina do navio. Graças a essa escolha, o espetáculo esgotou os ingressos três dias após o início das vendas, e o sucesso de público foi maior do que a produtora esperava. Há quem o cite como exemplo de obra que conquistou ao mesmo tempo popularidade e retorno comercial. No entanto, a última frase do texto original desapareceu. A crítica se dividiu em dois lados. Um crítico leu essa direção como uma adaptação para um novo receptor. A estrutura simples do palco e as falas claras teriam aproximado a obra do público que via teatro pela primeira vez. Outro crítico viu na mesma escolha uma interpretação que prejudicou a tensão do original. O gesto de guardar o bilhete no bolso confirma a partida e elimina a margem que o bilhete restante criava. A reação do público também se dividiu. Depois do espetáculo, no fórum on-line, apareceram juntos comentários favoráveis — 'agora finalmente entendi' — e desfavoráveis — 'explicaram o desfecho'. Alguns espectadores pediram um debate com o diretor, e a produtora organizou dois encontros com o público. Ao ler essa polêmica, precisamos distinguir a obra, a recepção e a crítica da recepção. A obra é a escolha feita no palco; a recepção é o modo como o público a acolhe; a crítica é o discurso que avalia esse acolhimento. Equiparar o aplauso do público ao valor da obra elimina o papel da crítica; por outro lado, ler o sucesso de bilheteria apenas como prova de comercialidade ignora a experiência do espectador. Os dois riscos são simétricos. Considero que essa direção deve ser avaliada como 'uma adaptação que reduziu a margem do original', mas que também é preciso registrar que a escolha abriu uma porta para um novo público. Boa crítica não é defender nem denunciar a obra, mas explicitar com que critério se ganhou o quê e se perdeu o quê.",
    objective: "Distinguir a obra, a recepção e a crítica da recepção, nomeando o critério e o risco de cada avaliação.",
  },
  reusedIds: ["ko:반응", "ko:수용", "ko:비평", "ko:담론"],
  grammar: [
    [
      "-ㄴ/는 것으로 읽힌다 — é lido como",
      "명사 + (으)로 읽히다 / 동사 + -는 것으로 읽히다",
      "Atribui uma interpretação a um texto, gesto ou escolha sem apresentá-la como fato objetivo. É comum em crítica e análise cultural porque deixa explícito que se trata de uma leitura situada. Compare com -라고 해석된다, que soa mais técnico, e com -다는 뜻이다, que afirma o sentido com mais força. Na escrita crítica, a forma ajuda a separar a obra da interpretação que se faz dela.",
      [
        ["이 연출은 새로운 수용자를 위한 각색으로 읽힌다.", "Esta direção é lida como uma adaptação para um novo receptor."],
        ["마지막 대사는 결말을 확정하는 장치로 읽힌다.", "A última fala é lida como um recurso que fixa o desfecho."],
      ],
    ],
    [
      "-ㄹ 위험이 있다 — há risco de",
      "동사 + -ㄹ 위험이 있다",
      "Apresenta uma consequência indesejada possível, sem afirmar que ela já ocorreu. É frequente em crítica responsável, porque nomeia o risco sem transformar a discordância em acusação. Compare com -ㄹ 우려가 있다, mais formal e comum em contextos institucionais, e com -ㄹ 수도 있다, que apenas indica possibilidade. A forma pede um verbo de consequência: perder, apagar, reduzir, confundir.",
      [
        ["결말을 설명하면 원작의 긴장을 잃을 위험이 있다.", "Se o desfecho for explicado, há o risco de perder a tensão do original."],
        ["흥행을 작품의 가치로 등치할 위험이 있다.", "Há o risco de equiparar o sucesso de público ao valor da obra."],
      ],
    ],
  ],
  guided: [
    mcq("Qual critério o crítico favorável à montagem utiliza?", ["O acesso de um público novo à obra.", "A fidelidade absoluta ao texto original.", "O preço dos ingressos."], "O acesso de um público novo à obra.", "O crítico avalia a montagem pelo que ela permite a quem nunca teve contato com o texto."),
    cloze("Complete a leitura da montagem: 이 연출은 새로운 수용자를 위한 각색으로 ___.", "읽힌다", "-으로 읽힌다 atribui uma interpretação sem apresentá-la como fato objetivo."),
    listen("Ouça e escreva a objeção de Sangwoo. Escreva a frase completa que ouvir.", "결말을 설명해 버리면 원작의 긴장이 사라져.", "결말을 설명해 버리면 원작의 긴장이 사라져.", "Se o desfecho é explicado, a tensão do original desaparece."),
    translate("pt-ko", "Traduza: “A peça pode ser lida como uma adaptação para um novo público.”", "이 연극은 새로운 수용자를 위한 각색으로 읽힌다.", "-으로 읽힌다 apresenta a avaliação como leitura situada, não como fato.", ["이 연극은 새로운 수용자를 위한 각색으로 읽힐 수 있다."]),
    reading("한 평론가는 이 연출을 새로운 수용자를 위한 각색으로 읽었다. 무대의 단순한 구조와 명확한 대사가 처음 연극을 보는 관객에게 작품을 가까이 가져왔다는 것이다. 다른 평론가는 같은 선택을 원작의 긴장을 훼손한 해석으로 보았다.", "O que separa as duas avaliações da montagem?", ["O critério de cada crítico: acesso do novo público versus preservação da ambiguidade do original.", "O preço dos ingressos, o tamanho do teatro e o horário das sessões.", "A opinião dos atores sobre o texto original e sobre a nova montagem."], "O critério de cada crítico: acesso do novo público versus preservação da ambiguidade do original.", "As duas críticas partem de critérios diferentes e, por isso, avaliam o mesmo gesto de modos opostos."),
  ],
  independent: [
    mcq("Como a autora do ensaio evita confundir obra e recepção?", ["Distingue a escolha cênica, a acolhida do público e o discurso que avalia essa acolhida.", "Afirma que o público sempre entende a obra corretamente.", "Considera que o sucesso de bilheteria prova o valor da peça."], "Distingue a escolha cênica, a acolhida do público e o discurso que avalia essa acolhida.", "A distinção permite criticar a montagem sem tratar o público como massa passiva."),
    cloze("Complete o risco apontado pela crítica: 흥행을 작품의 가치로 등치할 ___이 있다.", "위험", "-ㄹ 위험이 있다 nomeia uma consequência indesejada possível."),
    listen("Ouça e escreva a conclusão sobre a análise. Escreva a frase completa que ouvir.", "결국 작품과 수용을 나눠서 봐야 한다는 거네.", "결국 작품과 수용을 나눠서 봐야 한다는 거네.", "No fim, é preciso separar a obra da recepção."),
    translate("ko-pt", "Traduza: 상업적이라고 해서 자동으로 나쁜 것은 아니다.", "Ser comercial não faz algo automaticamente ruim.", "자동으로 = automaticamente; 상업적 = comercial.", ["O fato de ser comercial não o torna automaticamente ruim."]),
    reading("대중의 호평을 곧 작품의 가치로 등치하면 비판의 몫이 사라지고, 반대로 흥행을 상업성의 증거로만 읽으면 관객의 경험을 무시하게 된다. 두 위험은 대칭적이다.", "Por que a autora chama os dois riscos de simétricos?", ["Porque um elimina a crítica e o outro elimina a experiência do público.", "Porque ambos foram cometidos pelo mesmo crítico.", "Porque os dois tratam do preço dos ingressos."], "Porque um elimina a crítica e o outro elimina a experiência do público.", "Os riscos são opostos, mas ambos reduzem a análise a um único fator."),
  ],
  summary: [
    "Obra, recepção e crítica da recepção são objetos diferentes e não devem ser confundidos.",
    "Uma crítica se torna discutível quando declara o critério com que avalia.",
    "-ㄴ/는 것으로 읽힌다 apresenta uma interpretação situada, não um fato objetivo.",
    "-ㄹ 위험이 있다 nomeia uma consequência indesejada sem acusar quem discorda.",
    "Popularidade não é prova de valor, e gosto do público não é prova de alienação.",
  ],
  production: production(
    "Produção independente · crítica com critério e ressalva",
    "Escreva uma crítica curta de uma adaptação, exposição ou série que você conheça. Declare o critério com que avalia, compare a obra com a recepção pública e nomeie um risco da sua própria posição. Não trate o público como massa passiva nem o sucesso como prova de qualidade.",
    "각색이나 전시, 드라마를 골라 평가 기준을 밝히고, 작품과 대중의 수용을 비교한 뒤 자신의 관점이 지닌 위험도 밝혀 보세요.",
    ["Declare o critério no início: fidelidade, acesso, ética ou coerência interna.", "Descreva uma escolha concreta da obra, não apenas a impressão geral.", "Distinga a obra da recepção pública.", "Use -ㄴ/는 것으로 읽힌다 e -ㄹ 위험이 있다 ao menos uma vez cada.", "Feche nomeando um risco da sua própria crítica."],
    ["Critério declarado.", "Escolha concreta analisada.", "Obra e recepção distinguidas.", "Duas formas-alvo usadas corretamente.", "Risco da própria posição reconhecido."],
    "드라마 「유리 정원」은 원작 소설의 결말을 크게 바꾼 각색으로 읽힌다. 나는 이 작품을 '원작의 침묵을 설명으로 바꾼 각색'이라는 기준으로 평가한다. 첫째, 주인공이 마지막에 편지를 읽는 장면은 원작에서 비어 있던 정보를 채운다. 덕분에 처음 접하는 시청자는 이해하기 쉬워졌다. 둘째, 그러나 원작의 마지막 문장이 주던 여지는 사라졌다. 방송 직후 시청자 게시판은 찬반으로 갈렸고, 제작진은 해설 영상을 올렸다. 이때 대중의 반응을 작품의 가치와 등치할 위험이 있다. 인기가 높다는 사실은 작품이 많은 사람에게 도달했다는 뜻이지, 그 자체로 미학적 성취를 증명하지는 않는다. 반대로 인기 때문에 작품을 가볍게 보는 것도 위험하다. 시청자는 수동적인 수용자가 아니라 자기 경험으로 작품을 다시 쓰는 존재이기 때문이다. 나의 기준도 절대적이지 않다. 원작을 우선하는 나의 태도는 각색의 독자성을 과소평가할 수 있다. 그럼에도 나는 이 작품이 얻은 접근성과 잃은 여백을 함께 기록하는 것이 비평의 책임이라고 본다.",
    "O drama 'Jardim de vidro' é lido como uma adaptação que alterou profundamente o desfecho do romance original. Avalio esta obra pelo critério de 'adaptação que transformou o silêncio do original em explicação'. Primeiro, a cena em que o protagonista lê a carta no final preenche uma informação que estava vazia no original. Graças a isso, quem tem o primeiro contato entende com mais facilidade. Segundo, porém, a margem que a última frase do original oferecia desapareceu. Logo após a exibição, o fórum dos espectadores se dividiu entre aplausos e críticas, e a equipe de produção publicou um vídeo explicativo. Nesse momento, há o risco de equiparar a reação do público ao valor da obra. O fato de ser popular significa que a obra chegou a muitas pessoas, mas não prova por si só um êxito estético. Por outro lado, desprezar a obra por causa da popularidade também é arriscado. O espectador não é um receptor passivo: ele reescreve a obra com sua própria experiência. Meu critério também não é absoluto. Minha atitude de priorizar o original pode subestimar a autonomia da adaptação. Ainda assim, considero responsabilidade da crítica registrar ao mesmo tempo a acessibilidade que a obra ganhou e o espaço em branco que perdeu.",
    "Exemplo original. Observe que o critério é declarado, a obra é separada da recepção e a própria crítica reconhece um risco. Exemplo ilustrativo; não é gabarito.",
  ),
});
