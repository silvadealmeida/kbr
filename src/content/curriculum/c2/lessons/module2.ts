import { cloze, defineC2Lesson, listen, mcq, reading, translate } from "../shared";
import type { CourseProductionTask } from "../../course-types";

const RUBRIC = [
  { criterion: "task" as const, labelPt: "Cumprimento da tarefa", descriptorPt: "O texto assume o gênero e a voz pedidos, responde ao enunciado e deixa claro o efeito que quer produzir no leitor." },
  { criterion: "organization" as const, labelPt: "Organização e progressão", descriptorPt: "As partes têm função própria e a análise avança da marca linguística para o efeito de sentido, sem repetir a mesma observação." },
  { criterion: "vocabulary" as const, labelPt: "Vocabulário e colocação", descriptorPt: "Usa léxico preciso do registro estudado, com colocações naturais e sem misturar vocabulário técnico e coloquial fora de propósito." },
  { criterion: "grammar" as const, labelPt: "Gramática e registro", descriptorPt: "As formas-alvo aparecem corretas e o registro escolhido se mantém consistente ao longo do texto." },
  { criterion: "argument" as const, labelPt: "Qualidade da análise", descriptorPt: "A interpretação é sustentada por marcas do texto e distingue o que a voz diz do que ela deixa entender." },
  { criterion: "mediation" as const, labelPt: "Mediação e responsabilidade", descriptorPt: "Reformula a fala para outro leitor sem apagar a posição original nem usar o estilo para esconder responsabilidade." },
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

/** c2-l06 — voz narrativa, distância e o que o narrador pode saber. */
export const C2_L06 = defineC2Lesson({
  id: "c2-l06", number: 6, moduleId: "c2-m02", title: "A voz que conta",
  objective: "Reconhecer voz narrativa e efeito de distância em um conto curto.",
  prerequisites: ["c2-c01"], estimatedMinutes: 85, dialogueTitle: "Quem sabe o quê",
  intro: [
    {
      title: "Voz não é opinião do autor",
      body: "A voz narrativa é a instância que conta a história, e não necessariamente o autor. Ela decide o que o leitor pode saber, em que ordem e com que grau de certeza. Um narrador em primeira pessoa só fala do que viveu ou ouviu; um narrador em terceira pessoa pode circular entre cenas, mas não se torna onisciente por isso. O efeito de distância nasce dessa limitação: quanto menos o narrador explica, mais o leitor precisa interpretar. Por isso, analisar voz é perguntar quem fala, de onde fala e o que não pode saber.",
      ko: "서술자는 모든 것을 아는 사람이 아니라, 독자가 볼 수 있는 범위를 정하는 사람이다.",
    },
    {
      title: "Distância entre narrador e personagem",
      body: "A distância pode ser física, temporal ou afetiva. Um narrador pode observar um personagem de longe, recordar um episódio muitos anos depois ou habitar seus pensamentos sem aderir a eles. A mudança de distância não é um detalhe técnico: ela altera o que o leitor sente como verdade. Quando o texto passa da descrição externa para uma lembrança íntima, a cena ganha proximidade; quando volta ao gesto observado, o leitor percebe o limite do que sabe. O conto trabalha justamente nessa oscilação.",
      ko: "가까이 보여 주는 장면과 멀리서 요약하는 문장이 번갈아 나오면, 독자는 인물과의 거리를 몸으로 느낀다.",
    },
  ],
  dialogue: [
    ["지안", "이 소설, 서술자가 결국 아무것도 모른 채 끝나잖아.", "Neste conto, o narrador termina sem saber quase nada, não é?"],
    ["하람", "그게 이 이야기의 힘이라고 봐. 관찰자는 사건을 가까이서 보지만 해석은 미뤄.", "Acho que é aí que está a força da história. O observador vê o fato de perto, mas adia a interpretação."],
    ["지안", "그런데 마지막에 시점이 갑자기 넓어지는 느낌이야. 전지적 서술자로 바뀐 건 아닌데.", "Mas no fim tenho a impressão de que o ponto de vista se amplia de repente. Não é que vire um narrador onisciente."],
    ["하람", "맞아. 삼인칭처럼 보이지만 여전히 '나'의 기억 안에 있어. 일인칭의 한계를 일부러 드러낸 거지.", "Exato. Parece terceira pessoa, mas continua dentro da memória do 'eu'. Ele expõe de propósito o limite da primeira pessoa."],
    ["지안", "그러면 독자는 인물보다 더 많이 아는 걸까, 아니면 나만큼 모르는 걸까?", "Então o leitor sabe mais que o personagem ou sabe tanto quanto o narrador?"],
    ["하람", "나만큼 모른다고 생각해. 대신 장면화가 아주 구체적이라서 빈틈을 상상하게 돼.", "Acho que sabe tanto quanto o narrador. Em compensação, a construção da cena é tão concreta que faz imaginar as lacunas."],
    ["지안", "서사성은 사건의 수가 아니라 침묵의 배치에서 나오는구나.", "Então a narratividade não vem da quantidade de acontecimentos, mas da disposição dos silêncios."],
    ["하람", "그래. 좋은 서술자는 설명을 늘리지 않고, 독자가 볼 자리를 남겨 둬.", "Isso. Um bom narrador não aumenta as explicações; deixa um lugar para o leitor olhar."],
  ],
  readingText: {
    titlePt: "O homem do ponto de ônibus",
    paragraphs: [
      "버스 정류장에는 늘 같은 시간에 같은 남자가 서 있었다. 나는 7시 40분쯤 창가 자리에 앉아 그를 보았다. 그는 낡은 회색 코트를 입고, 손에는 비닐봉지를 하나 들고 있었다. 봉지 안에 무엇이 들었는지는 보이지 않았다. 그는 버스가 오면 타지 않고, 한 대를 그냥 보내곤 했다. 나는 그를 오래 기다리는 사람이라고 생각했다. 어떤 날은 그가 누군가를 기다리는 것처럼 보였고, 어떤 날은 아무것도 기다리지 않는 사람처럼 보였다. 관찰자는 늘 대상을 설명하려 하지만, 설명은 관찰보다 오래 걸린다.",
      "어느 날 나는 그에게 말을 걸었다. '매일 이 시간에 버스를 보내시네요.' 그가 웃었다. '여기 앉아 있으면 아내가 장을 보고 나오는 시간이 보여요. 저 건너편 시장 입구요. 저 사람이 나오면 같이 집에 갑니다.' 나는 그가 무언가를 기다린다고 생각했지만, 실제로 그는 사람을 기다리고 있었다. 다만 내 상상 속의 기다림과는 달랐다. 그는 버스를 타지 않는 이유를 설명하지 않았고, 나도 묻지 않았다. 그날 이후 나는 같은 창가에서 그를 보면서도 더 이상 그의 하루를 혼자 지어내지 않았다.",
      "이야기를 쓸 때 우리는 흔히 전지적 시점을 원한다. 인물의 속마음을 모두 알고, 사건의 이유를 다 설명하고 싶어 한다. 그러나 이 장면에서 내가 알 수 있었던 것은 회색 코트와 비닐봉지, 그리고 그가 웃을 때 눈가에 생기는 주름뿐이었다. 일인칭 서술자는 자기 경험만 말할 수 있고, 삼인칭 서술자도 다른 사람의 마음을 완전히 알 수는 없다. 서사성은 모든 것을 아는 데서 오지 않는다. 모르는 것을 남겨 두는 방식이 이야기에 깊이를 준다.",
    ],
    pt: "No ponto de ônibus, o mesmo homem estava sempre lá, no mesmo horário. Eu me sentava junto à janela por volta das 7h40 e o observava. Ele usava um sobretudo cinza gasto e levava uma sacola plástica na mão. Não dava para ver o que havia dentro. Quando o ônibus chegava, ele não subia; deixava um passar. Eu pensava nele como alguém que esperava há muito tempo. Em alguns dias, parecia esperar alguém; em outros, parecia um homem que não esperava nada. O observador sempre quer explicar o que vê, mas a explicação demora mais que a observação. Um dia, puxei conversa. 'O senhor deixa o ônibus passar todos os dias neste horário.' Ele sorriu. 'Quando me sento aqui, vejo a hora em que minha mulher termina as compras. É a entrada do mercado, do outro lado. Quando ela aparece, voltamos juntos para casa.' Eu pensava que ele esperava alguma coisa, mas na verdade esperava uma pessoa. Só que não era a espera que eu tinha imaginado. Ele não explicou por que não tomava o ônibus, e eu não perguntei. Depois daquele dia, continuei a observá-lo da mesma janela, mas não inventei mais o seu dia sozinho. Ao escrever uma história, muitas vezes queremos o ponto de vista onisciente. Queremos saber tudo o que os personagens pensam e explicar todas as razões dos acontecimentos. Mas, naquela cena, o que eu podia saber era apenas o sobretudo cinza, a sacola e as rugas que apareciam ao redor dos olhos quando ele sorria. Um narrador em primeira pessoa só pode falar da própria experiência, e um narrador em terceira pessoa também não conhece completamente a mente do outro. A narratividade não vem de saber tudo. O modo de deixar o desconhecido no texto é o que dá profundidade à história.",
    objective: "Reconhecer o limite do narrador e o efeito da mudança de distância na cena.",
  },
  reusedIds: ["ko:기억", "ko:여전히", "ko:한계", "ko:해석"],
  grammar: [
    [
      "-더라 — retomada de experiência observada na narrativa",
      "동사·형용사 + -더라 (해라체)",
      "Marca uma lembrança daquilo que o falante observou diretamente no passado, com tom de relato íntimo. É típico da narrativa oral e literária em estilo direto. Compare com -았/었더라, que também registra uma constatação passada, e com -ㄴ/는대, que transmite a fala de outra pessoa. -더라 não serve para relatar um fato objetivo sem testemunho: ele pressupõe que quem conta viu ou viveu aquilo.",
      [
        ["그는 버스가 와도 타지 않더라.", "Ele não subia no ônibus, mesmo quando ele chegava."],
        ["어린 시절, 할머니는 늘 창가에 앉아 계시더라.", "Na infância, minha avó sempre se sentava junto à janela."],
      ],
    ],
    [
      "-ㄴ/는 듯 — como se; ao modo de",
      "동사 + -는 듯 / 형용사 + -(으)ㄴ 듯 / 명사 + 인 듯",
      "Compara uma aparência a uma cena ou intenção sem afirmar que ela seja verdadeira. Pode vir seguido de 하다, 보이다 ou 말하다. Compare com -ㄴ/는 것처럼, mais coloquial e direto, e com -ㄴ/는 척하다, que indica fingimento deliberado. A forma -는 듯 é frequente na literatura porque mantém a dúvida sobre o que o narrador realmente sabe.",
      [
        ["그는 아무 일도 없었다는 듯 말했다.", "Ele falou como se nada tivesse acontecido."],
        ["창밖은 비가 그친 듯 조용했다.", "Do lado de fora, tudo estava silencioso como se a chuva tivesse parado."],
      ],
    ],
  ],
  guided: [
    mcq("O que a narradora descobre ao conversar com o homem?", ["Que ele esperava a esposa sair do mercado, e não um ônibus ou algo abstrato.", "Que ele era funcionário da empresa de ônibus.", "Que ele morava no ponto de ônibus."], "Que ele esperava a esposa sair do mercado, e não um ônibus ou algo abstrato.", "A conversa desfaz a hipótese anterior da narradora sem eliminar o mistério do gesto."),
    cloze("Complete a reflexão sobre o limite de quem narra: 이 이야기의 ___는 인물의 속마음을 다 알지 못한다.", "서술자", "O texto afirma que nem o narrador em primeira nem o de terceira pessoa conhece completamente o outro."),
    listen("Ouça e escreva o que o observador faz com a interpretação.", "관찰자는 사건을 가까이서 보지만 해석은 미뤄.", "관찰자는 사건을 가까이서 보지만 해석은 미뤄.", "O observador vê o fato de perto, mas adia a interpretação."),
    translate("pt-ko", "Traduza: “Um narrador em primeira pessoa só pode falar da própria experiência.”", "일인칭 서술자는 자기 경험만 말할 수 있다.", "일인칭 서술자 = narrador em primeira pessoa; 자기 경험만 = apenas a própria experiência."),
    reading("버스 정류장에는 늘 같은 시간에 같은 남자가 서 있었다. 나는 7시 40분쯤 창가 자리에 앉아 그를 보았다. 그는 낡은 회색 코트를 입고, 손에는 비닐봉지를 하나 들고 있었다. 봉지 안에 무엇이 들었는지는 보이지 않았다. 그는 버스가 오면 타지 않고, 한 대를 그냥 보내곤 했다.", "O que a narradora não consegue saber nessa cena?", ["O conteúdo da sacola e a razão real da espera do homem.", "O horário em que o homem chega ao ponto.", "A cor do sobretudo que o homem usa."], "O conteúdo da sacola e a razão real da espera do homem.", "O texto enumera o que é visível e deixa explícito o que permanece fora do alcance da narradora."),
  ],
  independent: [
    mcq("Qual leitura da voz narrativa é mais sustentada pelo conto?", ["A narradora abandona a fantasia de onisciência e passa a reconhecer o limite do que viu.", "A narradora confirma que conhece todos os pensamentos do homem.", "O conto troca para um narrador totalmente onisciente no último parágrafo."], "A narradora abandona a fantasia de onisciência e passa a reconhecer o limite do que viu.", "O último parágrafo transforma a limitação em princípio da própria narrativa."),
    cloze("Complete o contraste entre ver e explicar: 설명은 ___보다 오래 걸린다.", "관찰", "A frase aparece no fim do primeiro parágrafo e sustenta a ideia de que explicar é posterior a ver."),
    listen("Ouça e escreva o que um bom narrador deixa para o leitor.", "좋은 서술자는 설명을 늘리지 않고, 독자가 볼 자리를 남겨 둬.", "좋은 서술자는 설명을 늘리지 않고, 독자가 볼 자리를 남겨 둬.", "Um bom narrador não aumenta as explicações; deixa um lugar para o leitor olhar."),
    translate("ko-pt", "Traduza: 서사성은 모든 것을 아는 데서 오지 않는다.", "A narratividade não vem de saber tudo.", "서사성 = narratividade; -ㄴ/는 데서 오다 = vir de."),
    reading("이야기를 쓸 때 우리는 흔히 전지적 시점을 원한다. 인물의 속마음을 모두 알고, 사건의 이유를 다 설명하고 싶어 한다. 그러나 이 장면에서 내가 알 수 있었던 것은 회색 코트와 비닐봉지, 그리고 그가 웃을 때 눈가에 생기는 주름뿐이었다.", "Por que o texto recusa a onisciência nesse ponto?", ["Porque a força da cena está no que a narradora viu, não no que ela poderia inventar.", "Porque a narradora não se lembra de nada do episódio.", "Porque o homem se recusa a aparecer na história."], "Porque a força da cena está no que a narradora viu, não no que ela poderia inventar.", "A limitação da voz é apresentada como condição da profundidade, não como falha a corrigir."),
  ],
  summary: [
    "Voz narrativa é a instância que decide o que o leitor pode saber, não a opinião do autor.",
    "Primeira e terceira pessoa não se definem pela quantidade de informação, mas pelo acesso que constroem.",
    "-더라 retoma uma experiência diretamente observada e é frequente na narrativa.",
    "-ㄴ/는 듯 compara aparência e realidade sem afirmar que sejam a mesma coisa.",
    "A distância narrativa muda o efeito de verdade e o lugar deixado ao leitor.",
  ],
  production: production(
    "Produção independente · a mesma cena em duas vozes",
    "Reescreva uma cena curta do seu cotidiano em duas versões: uma em primeira pessoa, com o limite do que você viu, e outra em terceira pessoa, observando de fora. Depois, explique em um parágrafo o que cada voz permite saber e o que ela deixa de fora.",
    "같은 장면을 일인칭과 삼인칭으로 각각 써 보고, 각 목소리가 독자에게 허용하는 정보와 감추는 정보를 설명해 보세요.",
    ["Mantenha o mesmo fato nas duas versões para que a diferença esteja no acesso à informação.", "Use -더라 uma vez na versão de lembrança.", "Use -ㄴ/는 듯 uma vez para marcar uma aparência que não é confirmada.", "Na análise, diga o que a primeira pessoa não poderia saber.", "Feche nomeando o efeito de distância que você escolheu."],
    ["Duas versões da mesma cena.", "Limite de informação diferente em cada voz.", "Duas formas-alvo empregadas com função clara.", "Efeito de distância nomeado.", "Nenhuma informação inventada apresentada como certeza."],
    "작년 겨울, 나는 오래된 빵집 앞에서 한 남자를 보았다. 그는 유리창에 손을 대고 안을 들여다보더라. 안에는 빵이 거의 남아 있지 않았다. 나는 그가 문을 열지 않고 한참 서 있는 이유를 알 수 없었다. 그가 값을 치를 돈이 없어서일까, 아니면 누군가를 기다리는 것일까. 내가 아는 것은 그의 낡은 장갑과 유리창에 남은 손자국뿐이었다. 삼인칭으로 다시 쓰면 이렇게 된다. 한 남자가 빵집 앞에 서서 유리창 안을 들여다본다. 그는 문을 열지 않는다. 점원이 그를 보지만, 그는 고개를 돌리지 않는다. 이 버전에서 독자는 남자의 표정을 볼 수 있지만, 그의 사정은 여전히 모른다. 두 버전의 차이는 정보의 양이 아니라 정보의 통로다. 일인칭은 내가 본 것에 충실하고, 삼인칭은 남자의 행동을 관찰하지만 그의 마음을 대신 말하지 않는다. 나는 이 장면에서 설명을 늘리는 대신, 유리창에 남은 손자국을 그대로 남겨 두고 싶다.",
    "No inverno passado, vi um homem diante de uma padaria antiga. Ele encostou a mão no vidro e olhou para dentro. Quase não havia pão. Não consegui entender por que ele ficava tanto tempo ali sem abrir a porta. Seria porque não tinha dinheiro para pagar, ou porque esperava alguém? O que eu sabia era apenas as luvas gastas e a marca da mão no vidro. Reescrita em terceira pessoa, a cena fica assim: um homem está diante da padaria e olha para dentro. Ele não abre a porta. A atendente o vê, mas ele não vira o rosto. Nessa versão, o leitor pode ver a expressão do homem, mas continua sem saber a sua situação. A diferença entre as duas versões não está na quantidade de informação, mas no canal pelo qual ela chega. A primeira pessoa se mantém fiel ao que vi; a terceira observa o comportamento do homem, mas não fala por sua mente. Nesta cena, prefiro não aumentar as explicações e deixar a marca da mão no vidro como está.",
    "Exemplo original. Observe que as duas vozes não acrescentam fatos novos, apenas mudam o acesso à informação. Exemplo ilustrativo; não é gabarito.",
  ),
});

/** c2-l07 — ensaio público, voz autoral e apelo cívico. */
export const C2_L07 = defineC2Lesson({
  id: "c2-l07", number: 7, moduleId: "c2-m02", title: "O ensaio público",
  objective: "Escrever um ensaio público com voz autoral, tese e apelo cívico.",
  prerequisites: ["c2-l06"], estimatedMinutes: 85, dialogueTitle: "A voz de um ensaio",
  intro: [
    {
      title: "Ensaio não é desabafo",
      body: "O ensaio público parte de uma experiência pessoal, mas não termina nela. A voz autoral torna visível de onde o autor fala e por que aquilo importa a quem não viveu a mesma cena. A tese não precisa ser uma proposta técnica; pode ser uma mudança de olhar. O que distingue o ensaio do desabafo é a tradução do privado em problema comum. O leitor não é convidado a concordar com o autor, mas a reconhecer uma pergunta que também lhe diz respeito.",
      ko: "필자의 경험은 결론이 아니라, 독자가 자기 자리에서 다시 생각해 볼 수 있는 출발점이어야 한다.",
    },
    {
      title: "Apelo cívico sem manipulação",
      body: "Um apelo cívico pede que o leitor faça algo: olhe de novo, compare, compareça, pergunte. Ele se torna manipulação quando esconde o custo daquilo que pede ou quando trata quem discorda como ignorante. A voz responsável nomeia o destinatário, delimita o pedido e reconhece o que não pode resolver sozinha. No ensaio, a força do 'nós' depende de o autor não se esconder atrás dele. Dizer 'nós deveríamos' sem dizer quem é esse nós costuma transferir a tarefa para um sujeito vago.",
      ko: "공적 글쓰기에서 '우리'는 감정을 키우는 장치가 아니라, 누가 무엇을 함께 책임질 것인지 밝히는 말이어야 한다.",
    },
  ],
  dialogue: [
    ["편집자", "원고의 서두가 너무 일반적이에요. '도시는 사람을 위한 공간이다'로 시작하면 필자의 목소리가 안 보여요.", "A abertura do texto está genérica demais. Se começa com 'a cidade é um espaço para as pessoas', a voz do autor não aparece."],
    ["서윤", "그럼 제 경험부터 꺼내는 게 나을까요?", "Então seria melhor começar pela minha experiência?"],
    ["편집자", "네. 다만 단상으로 끝나면 에세이가 아니라 일기예요. 그 경험이 어떤 공적 쟁점과 연결되는지 보여 줘야 합니다.", "Sim. Mas, se terminar como impressão solta, não é ensaio, é diário. É preciso mostrar como essa experiência se liga a uma questão pública."],
    ["서윤", "벤치에 앉는 사람들을 보면서 느낀 걸 쓰고 싶어요.", "Quero escrever o que senti ao ver as pessoas que se sentam no banco."],
    ["편집자", "좋아요. 필체는 유지하되 주장은 더 선명하게. 마지막에 독자에게 무엇을 청할 건가요?", "Certo. Mantenha o estilo, mas deixe a tese mais nítida. No fim, o que você vai pedir ao leitor?"],
    ["서윤", "설명회에 와 달라고 하고 싶어요.", "Quero pedir que venham à reunião de apresentação."],
    ["편집자", "그 청유가 설교처럼 들리지 않게, 독자가 이미 알고 있는 장면에서 출발하세요.", "Para que esse convite não soe como sermão, parta de uma cena que o leitor já conhece."],
    ["서윤", "공론의 장으로 초대하는 느낌으로 다시 써 볼게요.", "Vou reescrever com a sensação de convidar para o espaço do debate público."],
  ],
  readingText: {
    titlePt: "Quem pode se sentar na praça",
    paragraphs: [
      "우리 동네에는 큰 광장이 하나 있고, 그 한가운데에 낡은 벤치가 있다. 시는 지난달 그 벤치를 새것으로 바꾸겠다고 발표했다. 예산은 크지 않지만, 주민 설명회는 두 번 열렸다. 회의에서 가장 많은 이야기가 나온 것은 벤치의 색이나 재질이 아니었다. 누가 그 자리에 앉을 수 있는가였다. 필자인 나는 이 문제를 단순한 시설 교체로 보지 않는다. 벤치는 오래도록 누군가의 거실이었고, 우리는 그 사실을 잊고 살았다.",
      "낮에는 어머니들이 아이를 재우고, 저녁에는 퇴근한 노동자들이 컵라면을 먹었다. 밤늦게는 집으로 돌아가지 못한 사람들이 조용히 앉아 있었다. 벤치를 새로 만들면 더 깨끗해지고 관리하기 쉬워질 것이다. 그러나 청소가 쉬운 재질을 고르는 순간, 오래 앉아 있기 어려운 디자인이 선택될 수도 있다. 공적 공간은 모두에게 열려 있다고 말하지만, 실제로는 앉을 수 있는 사람과 앉았다가 눈총을 받는 사람이 나뉜다. 나는 이 차이를 공론의 장으로 가져와야 한다고 본다.",
      "이 글에서 내가 말하고자 하는 바는 분명하다. 도시의 품격은 얼마나 많은 시설을 갖추었는가가 아니라, 가장 불편한 사람이 어디에 앉을 수 있는가로 드러난다. 물론 모든 요구를 한 자리에서 해결할 수는 없다. 소음과 안전 문제도 함께 고려해야 한다. 그럼에도 우리는 벤치 하나를 바꾸면서 누가 사라지는지를 물어야 한다. 우리는 편안함을 이유로 누군가의 자리를 없애면서도 그것을 개선이라고 부른다. 그 말이 틀렸다고 단정할 수는 없지만, 적어도 누가 그 편안함을 누리는지는 밝혀야 한다. 독자에게 청하는 것은 거창한 계획이 아니다. 다음 주민 설명회에 가서, 지금 그 자리에 앉는 사람의 이름을 한 번 불러 보자는 것이다.",
    ],
    pt: "No meu bairro há uma praça grande e, bem no meio dela, um banco velho. No mês passado, a prefeitura anunciou que trocaria o banco por um novo. O orçamento não é grande, mas houve duas reuniões com os moradores. O que ocupou a maior parte da conversa não foi a cor nem o material do banco. Foi quem pode se sentar naquele lugar. Eu, autor deste texto, não vejo a questão como uma simples troca de equipamento. Durante muito tempo, o banco foi a sala de estar de alguém, e vivemos esquecendo esse fato. De dia, mães faziam seus filhos dormir ali; à noite, trabalhadores que voltavam do serviço comiam macarrão instantâneo. Tarde da noite, pessoas que não tinham para onde voltar ficavam sentadas em silêncio. Um banco novo será mais limpo e mais fácil de administrar. No entanto, no momento em que se escolhe um material fácil de limpar, também se pode escolher um desenho desconfortável para quem precisa ficar muito tempo sentado. Dizemos que o espaço público é aberto a todos, mas, na prática, há os que podem se sentar e os que, ao se sentar, recebem olhares de reprovação. Considero que essa diferença precisa ser levada ao debate público. O que pretendo dizer neste texto é claro. A dignidade de uma cidade não se revela pela quantidade de equipamentos que ela possui, mas pelo lugar onde a pessoa mais desconfortável pode se sentar. É evidente que não se pode resolver todas as demandas de uma só vez. Ruído e segurança também precisam ser considerados. Ainda assim, ao trocar um banco, precisamos perguntar quem desaparece. Chamamos de melhoria o ato de eliminar o lugar de alguém em nome do conforto. Não se pode afirmar que essa palavra esteja errada, mas ao menos é preciso esclarecer quem usufrui desse conforto. O que peço ao leitor não é um plano grandioso. É que vá à próxima reunião de moradores e pronuncie uma vez o nome de quem se senta ali hoje.",
    objective: "Reconhecer a voz autoral, a tese e o pedido dirigido ao leitor no ensaio.",
  },
  reusedIds: ["ko:독자", "ko:주장", "ko:해지", "ko:주민"],
  grammar: [
    [
      "-ㄴ/는 바 — o que; o fato",
      "동사 + -는 바 / 형용사 + -(으)ㄴ 바 / 명사 + 인 바",
      "Substantiva o conteúdo de uma afirmação e o apresenta como base do que vem depois. É formal e frequente em ensaios, relatórios e discursos. Compare com -ㄴ/는 것, que é neutro e pode aparecer em qualquer registro, e com -(으)ㅁ, mais nominal e abstrato. A construção '말하고자 하는 바' e '아는 바와 같이' são fórmulas recorrentes; fora desses usos, prefira uma frase mais direta.",
      [
        ["이 글에서 내가 말하고자 하는 바는 분명하다.", "O que pretendo dizer neste texto é claro."],
        ["우리가 아는 바와 같이, 공간은 사람의 행동을 바꾼다.", "Como sabemos, o espaço muda o comportamento das pessoas."],
      ],
    ],
    [
      "-고자 한다 — pretende-se; tenho a intenção de",
      "동사 + -고자 한다 / -고자 하다",
      "Declara uma intenção de modo formal e controlado, comum em ensaios, propostas e discursos institucionais. Compare com -려고 하다, mais coloquial e ligado a uma decisão imediata, e com -겠다, que assume publicamente o compromisso. -고자 한다 costuma introduzir o objetivo do próprio texto ou de uma política, não um desejo pessoal passageiro.",
      [
        ["나는 이 글에서 도시의 고요함을 다시 생각하고자 한다.", "Neste texto, pretendo repensar o silêncio da cidade."],
        ["위원회는 주민의 의견을 먼저 듣고자 한다.", "O comitê pretende ouvir primeiro a opinião dos moradores."],
      ],
    ],
  ],
  guided: [
    mcq("Qual é a tese do ensaio sobre o banco da praça?", ["A dignidade urbana se mede por quem consegue permanecer sentado no espaço público.", "O banco deve ser substituído pelo modelo mais barato disponível.", "A praça deveria ser fechada durante a noite."], "A dignidade urbana se mede por quem consegue permanecer sentado no espaço público.", "A tese aparece no terceiro parágrafo e reorganiza o episódio do banco."),
    cloze("Complete a marca de autoria: ___인 나는 이 문제를 단순한 시설 교체로 보지 않는다.", "필자", "O ensaio torna visível de onde fala quem escreve, em vez de esconder a autoria."),
    listen("Ouça e escreva o que o autor pede ao leitor.", "다음 주민 설명회에 가서, 지금 그 자리에 앉는 사람의 이름을 한 번 불러 보자는 것이다.", "다음 주민 설명회에 가서, 지금 그 자리에 앉는 사람의 이름을 한 번 불러 보자는 것이다.", "É que vá à próxima reunião de moradores e pronuncie uma vez o nome de quem se senta ali hoje."),
    translate("pt-ko", "Traduza: “Neste texto, pretendo repensar o silêncio da cidade.”", "나는 이 글에서 도시의 고요함을 다시 생각하고자 한다.", "-고자 한다 declara uma intenção formal, adequada ao ensaio."),
    reading("공적 공간은 모두에게 열려 있다고 말하지만, 실제로는 앉을 수 있는 사람과 앉았다가 눈총을 받는 사람이 나뉜다. 나는 이 차이를 공론의 장으로 가져와야 한다고 본다.", "O que o ensaio critica na ideia de espaço público aberto a todos?", ["A diferença entre o acesso declarado e o acesso efetivo de quem usa o banco.", "A existência de bancos em praças públicas e a falta de manutenção.", "A realização de reuniões com moradores e a demora nas obras."], "A diferença entre o acesso declarado e o acesso efetivo de quem usa o banco.", "O texto opõe a abertura proclamada à experiência de quem é olhado com reprovação."),
  ],
  independent: [
    mcq("O que faz esse texto ser um ensaio público, e não um diário?", ["A experiência pessoal é convertida em uma questão coletiva com tese e pedido ao leitor.", "O autor narra apenas o que sentiu na infância, sem tese.", "O texto evita qualquer contato com o leitor e não faz pedidos."], "A experiência pessoal é convertida em uma questão coletiva com tese e pedido ao leitor.", "A passagem do privado ao público é o que sustenta o gênero."),
    cloze("Complete o espaço de debate: 나는 이 차이를 ___의 장으로 가져와야 한다고 본다.", "공론", "O ensaio pede que a diferença seja discutida publicamente, não resolvida em silêncio."),
    listen("Ouça e escreva por que o 'nós' precisa ser definido.", "공적 글쓰기에서 '우리'는 감정을 키우는 장치가 아니라, 누가 무엇을 함께 책임질 것인지 밝히는 말이어야 한다.", "공적 글쓰기에서 '우리'는 감정을 키우는 장치가 아니라, 누가 무엇을 함께 책임질 것인지 밝히는 말이어야 한다.", "Na escrita pública, o 'nós' deve dizer quem compartilha qual responsabilidade, não apenas ampliar a emoção."),
    translate("ko-pt", "Traduza: 필자의 경험은 결론이 아니라, 독자가 자기 자리에서 다시 생각해 볼 수 있는 출발점이어야 한다.", "A experiência do autor não deve ser a conclusão, mas o ponto de partida para que o leitor repense a partir do próprio lugar.", "필자 = autor; 출발점 = ponto de partida."),
    reading("이 글에서 내가 말하고자 하는 바는 분명하다. 도시의 품격은 얼마나 많은 시설을 갖추었는가가 아니라, 가장 불편한 사람이 어디에 앉을 수 있는가로 드러난다. 물론 모든 요구를 한 자리에서 해결할 수는 없다. 소음과 안전 문제도 함께 고려해야 한다.", "Como o autor delimita sua tese?", ["Reconhece que há outros problemas, mas mantém o critério de quem fica de fora.", "Afirma que ruído e segurança não importam para a praça.", "Promete resolver todas as demandas na próxima reunião."], "Reconhece que há outros problemas, mas mantém o critério de quem fica de fora.", "A concessão sobre ruído e segurança não apaga o critério central da tese."),
  ],
  summary: [
    "O ensaio público transforma uma experiência pessoal em questão comum, sem esconder a voz de quem escreve.",
    "-ㄴ/는 바 nominaliza o conteúdo de uma afirmação em registro formal.",
    "-고자 한다 declara uma intenção de modo controlado e adequado ao texto público.",
    "A tese pode ser um critério de olhar, não apenas uma proposta técnica.",
    "Um apelo responsável nomeia o destinatário, delimita o pedido e reconhece o custo.",
  ],
  production: production(
    "Produção independente · abertura de um ensaio público",
    "Escolha um espaço ou costume do seu bairro que mudou recentemente. Escreva a abertura de um ensaio público com voz autoral, tese e um pedido claro ao leitor. Não escreva uma crônica completa: concentre-se em instalar a voz e a questão.",
    "동네에서 최근에 바뀐 공간이나 관습을 골라, 필자의 목소리와 논지, 독자에게 건네는 청유가 드러나는 공적 에세이의 서두를 써 보세요.",
    ["Comece com uma cena concreta, não com uma generalidade sobre a sociedade.", "Diga de onde você fala e por que isso importa a quem não viveu a cena.", "Formule a tese em uma frase que possa ser contestada.", "Use -ㄴ/는 바 ou -고자 한다 uma vez, sem empilhar fórmulas.", "Termine com um pedido que o leitor possa realizar."],
    ["Cena inicial concreta.", "Voz autoral visível.", "Tese contestável em uma frase.", "Pedido delimitado ao leitor.", "Uma forma-alvo usada com naturalidade."],
    "우리 아파트 단지에는 작은 놀이터가 하나 있다. 작년까지 그곳에는 낡은 미끄럼틀과 그늘을 만들어 주던 큰 나무가 있었다. 재개발 계획이 발표된 뒤 나무는 먼저 사라졌고, 미끄럼틀은 안전 검사에서 탈락했다. 새 놀이터는 더 밝고 안전해 보인다. 그러나 나는 그곳에 서 있는 아이들이 예전보다 적다는 사실을 외면할 수 없다. 필자인 나는 이 변화를 단순한 시설 개선으로 보지 않는다. 우리는 아이들이 어디서 놀 수 있는가를 이야기하면서, 정작 아이들이 머무는 시간과 어른들의 시선은 묻지 않았다. 이 글에서 내가 말하고자 하는 바는 분명하다. 좋은 놀이터는 장비의 수가 아니라, 아이가 혼자서도 오래 머물 수 있는 그늘의 유무로 판단해야 한다. 물론 예산과 안전 기준을 무시할 수는 없다. 그럼에도 다음 주 설명회에서는 새로운 놀이터에 나무를 다시 심을 수 있는지, 그리고 그 결정을 누가 책임질 것인지 물어야 한다.",
    "No nosso condomínio há um pequeno parque infantil. Até o ano passado, havia ali um escorregador velho e uma árvore grande que fazia sombra. Depois do anúncio do projeto de reurbanização, a árvore desapareceu primeiro, e o escorregador foi reprovado na inspeção de segurança. O novo parque parece mais claro e mais seguro. No entanto, não posso ignorar o fato de que há menos crianças ali do que antes. Eu, autor deste texto, não vejo essa mudança como uma simples melhoria de equipamentos. Discutimos onde as crianças podem brincar, mas não perguntamos quanto tempo elas permanecem no lugar nem como os adultos as olham. O que pretendo dizer neste texto é claro. Um bom parque infantil não se mede pela quantidade de equipamentos, mas pela presença de sombra suficiente para que uma criança possa ficar muito tempo sozinha. É evidente que não se pode ignorar o orçamento nem as normas de segurança. Ainda assim, na próxima reunião de apresentação, devemos perguntar se é possível plantar árvores novamente no novo parque e quem assumirá a responsabilidade por essa decisão.",
    "Exemplo original. Observe que a cena concreta sustenta a tese e que o pedido final é verificável. Exemplo ilustrativo; não é gabarito.",
  ),
});

/** c2-l08 — retórica política: promessa, condição e legitimação. */
export const C2_L08 = defineC2Lesson({
  id: "c2-l08", number: 8, moduleId: "c2-m02", title: "A retórica política",
  objective: "Analisar promessa, legitimação e apelo em discurso político.",
  prerequisites: ["c2-l07"], estimatedMinutes: 85, dialogueTitle: "Duas versões da mesma medida",
  intro: [
    {
      title: "Promessa, condição e valor",
      body: "Um discurso político raramente promete apenas um ato; ele organiza uma relação entre promessa, condição e valor. 'Vamos ampliar o transporte' é uma promessa; 'enquanto houver recursos' é uma condição; 'para que as crianças respirem melhor' é um valor. A análise começa quando separamos esses três níveis e perguntamos quem pode verificar cada um. A condição pode servir para tornar a promessa honesta ou para diluí-la até que nada reste. O valor, por sua vez, pode justificar um custo que o discurso não nomeia.",
      ko: "약속과 조건을 분리하지 않으면, 연설은 감동적으로 들리지만 무엇을 확인해야 하는지는 보이지 않는다.",
    },
    {
      title: "Legitimar uma medida impopular",
      body: "Legitimar não é apenas dizer que a medida é boa. É construir uma razão aceitável para decidir agora, mesmo contra a maioria momentânea. O orador pode invocar urgência, competência técnica, responsabilidade com as gerações futuras ou o custo de não agir. Cada uma dessas razões distribui a responsabilidade de modo diferente: a urgência apaga o debate, a técnica o desloca para especialistas, o futuro o estende a quem ainda não vota. Uma retórica responsável não elimina o conflito; ela diz em nome de que ele está sendo resolvido e quem arcará com o preço.",
      ko: "정당성은 찬성의 크기가 아니라, 반대를 어떻게 다루고 비용을 누구에게 물을 것인가에서 드러난다.",
    },
  ],
  dialogue: [
    ["준호", "두 연설 다 읽었어요? 같은 통행료인데 완전히 다른 이야기 같아요.", "Você leu os dois discursos? É a mesma taxa de congestionamento, mas parece uma história completamente diferente."],
    ["수진", "첫 번째는 연설의 처음부터 미래를 말하고, 두 번째는 현재의 비용부터 말하죠.", "O primeiro fala do futuro desde o início; o segundo começa pelo custo presente."],
    ["준호", "시장 쪽은 '대중교통을 먼저 확충할 것을 약속합니다'라고 했는데, 조건이 뭐예요?", "O lado do prefeito disse 'prometemos ampliar primeiro o transporte público'. Qual é a condição?"],
    ["수진", "시민이 지켜봐 주시는 한 이행하겠다는 거죠. 그런데 그 조건은 시민이 확인할 수 있는 약속이에요.", "É que cumprirá enquanto os cidadãos acompanharem. Mas essa condição é uma promessa que os cidadãos podem verificar."],
    ["준호", "야당은 절차의 정당성을 문제 삼던데요.", "A oposição questiona a legitimidade do procedimento."],
    ["수진", "맞아요. 유세 때 말이 없었다는 점을 표심과 연결해서 비판해요.", "Exato. Critica ligando o silêncio durante a campanha ao cálculo eleitoral."],
    ["준호", "그럼 우리가 비교해야 할 건 말의 정직함보다 약속과 조건의 구조네요.", "Então o que devemos comparar não é tanto a honestidade das palavras, mas a estrutura da promessa e da condição."],
    ["수진", "그래요. 구호가 아니라 예산안과 노선표를 봐야 합니다.", "Isso. É preciso olhar o orçamento e o mapa de linhas, não o slogan."],
  ],
  readingText: {
    titlePt: "Duas maneiras de defender a mesma taxa",
    paragraphs: [
      "존경하는 시민 여러분, 오늘 우리는 오랜 논의 끝에 혼잡 통행료를 도입하기로 했습니다. 이 결정이 쉽지 않았다는 것을 압니다. 그러나 도심의 교통과 대기 질을 생각한다면 더 이상 미룰 수 없습니다. 우리는 대중교통을 먼저 확충할 것을 약속합니다. 버스 노선을 늘리고, 환승 시간을 줄이고, 청년과 노인에게 할인을 적용하겠습니다. 시민 여러분이 지켜봐 주시는 한, 이 약속을 반드시 이행하겠습니다. 작은 불편을 감수하더라도 아이들이 숨 쉴 수 있는 도시를 남기자는 것이 저의 간절한 바람입니다.",
      "시장은 오늘 연설에서 '대중교통을 먼저 확충하겠다'고 말했습니다. 그러나 순서가 뒤바뀌었습니다. 통행료는 다음 달부터 걷고, 버스 노선 확충은 내년 예산에나 올라갑니다. 구호는 훌륭하지만, 시민이 체감할 변화는 아직 없습니다. 이 공약은 예산안에 숫자로 적혀 있지 않습니다. 우리는 이 조치의 정당성을 인정하지 않습니다. 절차도 문제입니다. 유세 기간에는 아무 말도 없다가 당선 후에 갑자기 추진하는 것은 표심을 겨냥한 정치라고밖에 볼 수 없습니다. 지지층조차 설명을 요구하고 있습니다. 시장이 약속을 지킬 것인지, 우리는 예산안과 노선표를 함께 놓고 판단할 것입니다.",
      "두 연설은 같은 사실을 다르게 배열한다. 첫 번째는 미래의 혜택을 먼저 말하고 현재의 비용을 뒤로 미룬다. 두 번째는 현재의 비용을 먼저 말하고 미래의 약속을 의심한다. 어느 쪽도 거짓말을 하지는 않는다. 그러나 '먼저'라는 단어가 어디에 놓이느냐에 따라 책임의 위치가 달라진다. 연설을 읽을 때 우리는 무엇이 약속이고 무엇이 조건인지, 누가 그 조건을 확인할 수 있는지 물어야 한다. 또한 그 약속이 실현되지 않았을 때 누가 설명할 책임을 지는지도 함께 보아야 한다.",
    ],
    pt: "Prezados cidadãos, hoje decidimos, após longa discussão, introduzir a taxa de congestionamento. Sei que esta decisão não foi fácil. No entanto, pensando no trânsito e na qualidade do ar no centro, não podemos mais adiar. Prometemos ampliar primeiro o transporte público. Vamos aumentar as linhas de ônibus, reduzir o tempo de baldeação e aplicar descontos a jovens e idosos. Enquanto os cidadãos acompanharem, cumprirei essa promessa. Mesmo com algum transtorno, o meu desejo sincero é deixar uma cidade onde as crianças possam respirar. O prefeito disse hoje, em seu discurso, que 'ampliará primeiro o transporte público'. Mas a ordem foi invertida. A taxa será cobrada a partir do mês que vem, e a ampliação das linhas só entrará no orçamento do ano que vem. O slogan é excelente, mas a mudança que o cidadão sente ainda não existe. Essa promessa não está registrada em números no orçamento. Não reconhecemos a legitimidade desta medida. O procedimento também é problemático. Não dizer nada durante a campanha e depois, eleito, impor a medida de repente só pode ser visto como política voltada ao cálculo eleitoral. Até os próprios apoiadores exigem explicações. Se o prefeito cumprirá a promessa, julgaremos colocando lado a lado o orçamento e o mapa de linhas. Os dois discursos organizam os mesmos fatos de maneiras diferentes. O primeiro fala primeiro dos benefícios futuros e deixa o custo presente para depois. O segundo fala primeiro do custo presente e desconfia da promessa futura. Nenhum dos dois mente. No entanto, a posição da palavra 'primeiro' muda o lugar da responsabilidade. Ao ler um discurso, devemos perguntar o que é promessa e o que é condição, e quem pode verificar essa condição. Também devemos observar quem assume a responsabilidade de explicar caso a promessa não se realize.",
    objective: "Separar promessa, condição e estratégia de legitimação nos dois discursos.",
  },
  reusedIds: ["ko:연결", "ko:이행", "ko:감수", "ko:거짓말"],
  grammar: [
    [
      "-ㄹ 것을 — o que será feito; compromisso",
      "동사 + -ㄹ 것을 (약속하다/요구하다/촉구하다)",
      "Nominaliza uma ação futura e a apresenta como conteúdo de uma promessa, exigência ou recomendação formal. É comum em discursos e documentos. Compare com -겠다고 약속하다, que é mais direto e pessoal, e com -도록 하겠다, que enfatiza a disposição de agir. Cuidado: em registro oral, '-ㄹ 것을' também pode expressar arrependimento ('deveria ter feito'); o contexto e o verbo que o segue decidem o sentido.",
      [
        ["정부는 대중교통을 먼저 확충할 것을 약속했습니다.", "O governo prometeu ampliar primeiro o transporte público."],
        ["위원회는 시민의 의견을 다시 들을 것을 요구했습니다.", "O comitê exigiu que se ouvissem novamente as opiniões dos cidadãos."],
      ],
    ],
    [
      "-ㄴ/는 한 — enquanto; na medida em que",
      "동사·형용사 + -ㄴ/는 한",
      "Estabelece a condição ou o limite dentro do qual a afirmação seguinte vale. É formal e frequente em discursos e textos argumentativos. Compare com -는 동안, que indica apenas simultaneidade temporal, e com -ㄴ다면, que abre uma hipótese. '-ㄴ/는 한' costuma vir seguido de uma promessa, uma obrigação ou uma consequência, e pode ser usado para transferir a condição ao ouvinte.",
      [
        ["시민이 지켜봐 주시는 한, 이 약속을 이행하겠습니다.", "Enquanto os cidadãos acompanharem, cumprirei esta promessa."],
        ["예산이 허락하는 한, 지원을 계속하겠습니다.", "Enquanto o orçamento permitir, continuarei o apoio."],
      ],
    ],
  ],
  guided: [
    mcq("Qual é a condição que o primeiro discurso coloca para cumprir a promessa?", ["Que os cidadãos acompanhem a implementação.", "Que a oposição aprove o orçamento.", "Que a taxa seja cobrada por dez anos."], "Que os cidadãos acompanhem a implementação.", "A fórmula '-ㄴ/는 한' transforma o acompanhamento dos cidadãos em condição da promessa."),
    cloze("Complete a promessa registrada no primeiro discurso: 대중교통을 먼저 확충할 것을 ___.", "약속합니다", "O compromisso aparece como conteúdo de uma promessa formal, não como simples intenção."),
    listen("Ouça e escreva o que a oposição exige para julgar a promessa.", "우리는 예산안과 노선표를 함께 놓고 판단할 것입니다.", "우리는 예산안과 노선표를 함께 놓고 판단할 것입니다.", "Julgaremos colocando lado a lado o orçamento e o mapa de linhas."),
    translate("pt-ko", "Traduza: “Enquanto os cidadãos acompanharem, cumprirei esta promessa.”", "시민이 지켜봐 주시는 한, 이 약속을 이행하겠습니다.", "-ㄴ/는 한 estabelece o limite dentro do qual a promessa vale."),
    reading("시장은 오늘 연설에서 '대중교통을 먼저 확충하겠다'고 말했습니다. 그러나 순서가 뒤바뀌었습니다. 통행료는 다음 달부터 걷고, 버스 노선 확충은 내년 예산에나 올라갑니다. 구호는 훌륭하지만, 시민이 체감할 변화는 아직 없습니다.", "Como a oposição contesta a ordem da medida?", ["Mostra que a cobrança começa antes da ampliação prometida do transporte.", "Nega que exista uma taxa de congestionamento.", "Afirma que o transporte público já foi ampliado."], "Mostra que a cobrança começa antes da ampliação prometida do transporte.", "A crítica se concentra na sequência entre custo presente e benefício futuro."),
  ],
  independent: [
    mcq("O que os dois discursos fazem com os mesmos fatos?", ["Organizam-nos em ordens diferentes para deslocar a responsabilidade e o foco do leitor.", "Apresentam versões incompatíveis dos números oficiais.", "Recusam-se a mencionar o transporte público."], "Organizam-nos em ordens diferentes para deslocar a responsabilidade e o foco do leitor.", "A análise do terceiro parágrafo mostra que a diferença está na disposição dos fatos."),
    cloze("Complete a crítica à legitimidade da medida: 우리는 이 조치의 ___을 인정하지 않습니다.", "정당성", "A oposição não discute apenas a eficácia; questiona a legitimidade do procedimento."),
    listen("Ouça e escreva o que o primeiro orador promete preservar.", "작은 불편을 감수하더라도 아이들이 숨 쉴 수 있는 도시를 남기자는 것이 저의 간절한 바람입니다.", "작은 불편을 감수하더라도 아이들이 숨 쉴 수 있는 도시를 남기자는 것이 저의 간절한 바람입니다.", "Mesmo com algum transtorno, o meu desejo sincero é deixar uma cidade onde as crianças possam respirar."),
    translate("ko-pt", "Traduza: 정당성은 찬성의 크기가 아니라, 반대를 어떻게 다루고 비용을 누구에게 물을 것인가에서 드러난다.", "A legitimidade não se revela pelo tamanho do apoio, mas por como se trata a oposição e a quem se cobra o custo.", "정당성 = legitimidade; 비용을 묻다 = cobrar o custo."),
    reading("두 연설은 같은 사실을 다르게 배열한다. 첫 번째는 미래의 혜택을 먼저 말하고 현재의 비용을 뒤로 미룬다. 두 번째는 현재의 비용을 먼저 말하고 미래의 약속을 의심한다. 어느 쪽도 거짓말을 하지는 않는다.", "Por que o texto diz que nenhum dos dois discursos mente?", ["Porque ambos usam fatos verdadeiros, mas mudam a ordem e o peso que lhes dão.", "Porque os dois apresentam exatamente a mesma interpretação.", "Porque nenhum deles menciona custos."], "Porque ambos usam fatos verdadeiros, mas mudam a ordem e o peso que lhes dão.", "A diferença está na organização retórica, não na invenção de fatos."),
  ],
  summary: [
    "Promessa, condição e valor são níveis distintos do discurso político e devem ser analisados separadamente.",
    "-ㄹ 것을 nominaliza uma ação futura como conteúdo de promessa ou exigência formal.",
    "-ㄴ/는 한 delimita a condição ou o limite em que a promessa vale.",
    "Legitimar uma medida impopular é construir uma razão aceitável, não apenas afirmar que ela é boa.",
    "A ordem dos fatos desloca a responsabilidade e o ponto em que o leitor começa a julgar.",
  ],
  production: production(
    "Produção independente · reescrever uma promessa vaga",
    "Escolha um trecho de discurso, comunicado ou promessa pública que você conheça. Reescreva-o reduzindo a vaguidade: separe o que é promessa, o que é condição e quem poderá verificar o resultado. Depois, explique o custo político que a versão mais clara assume.",
    "모호한 공적 약속을 골라, 약속과 조건과 확인 가능한 결과를 분리해 다시 쓰고, 그 명료함이 어떤 정치적 비용을 감수하는지 설명해 보세요.",
    ["Mantenha o valor invocado pelo original, mas torne explícito o ato prometido.", "Diga qual é a condição e quem pode verificá-la.", "Use -ㄹ 것을 uma vez e -ㄴ/는 한 uma vez.", "Nomeie um prazo ou um documento verificável.", "Explique o custo de assumir essa clareza."],
    ["Promessa, condição e verificação separadas.", "Duas formas-alvo com função clara.", "Prazo ou documento verificável.", "Custo político nomeado.", "Nenhuma promessa além do que se pode verificar."],
    "시는 다음 달부터 도심 혼잡 통행료를 도입하겠다고 발표했다. 원문은 '교통 문제를 해결하기 위해 단계적으로 시행하겠다'고만 적고 있었다. 나는 이 문장을 다음처럼 고쳐 쓴다. 시는 11월 1일부터 평일 오전 7시부터 10시까지 도심 진입 차량에 2천 원의 통행료를 부과할 것을 예고한다. 징수된 금액은 2027년 3월까지 버스 노선 두 개를 늘리는 데 사용하며, 분기마다 집행 내역을 공개한다. 다만 이 계획은 시의회가 예산안을 통과시키는 한 유지된다. 시민이 확인할 수 있는 것은 통행료 고지서, 노선표, 분기 보고서다. 이렇게 쓰면 약속은 작아지지만 검증 가능해진다. 정치적 비용도 분명하다. 날짜와 금액을 밝히는 순간, 시는 실패의 기준을 스스로 정하게 된다. 그러나 그 기준이 없으면 시민은 무엇을 기다려야 하는지 알 수 없다.",
    "A prefeitura anunciou que introduzirá a taxa de congestionamento no centro a partir do mês que vem. O texto original dizia apenas que 'será implementada por etapas para resolver o problema do trânsito'. Reescrevo a frase assim: a prefeitura anuncia que, a partir de 1º de novembro, cobrará 2.000 won dos veículos que entrarem no centro nos dias úteis, das 7h às 10h. O valor arrecadado será usado até março de 2027 para ampliar duas linhas de ônibus, e a execução será divulgada a cada trimestre. No entanto, o plano será mantido enquanto o conselho municipal aprovar o orçamento. O que o cidadão pode verificar são a fatura da taxa, o mapa de linhas e o relatório trimestral. Escrito assim, a promessa fica menor, mas se torna verificável. O custo político também é claro. Ao revelar data e valor, a prefeitura estabelece ela mesma o critério do fracasso. Sem esse critério, porém, o cidadão não sabe o que deve esperar.",
    "Exemplo original. Observe que a reescrita troca a promessa vaga por atos verificáveis e nomeia o custo dessa escolha. Exemplo ilustrativo; não é gabarito.",
  ),
});

/** c2-l09 — coloquialidade, gíria e marcadores de solidariedade. */
export const C2_L09 = defineC2Lesson({
  id: "c2-l09", number: 9, moduleId: "c2-m02", title: "A língua do dia a dia",
  objective: "Reconhecer coloquialidade, gíria e marcadores de solidariedade sem imitar sem critério.",
  prerequisites: ["c2-l08"], estimatedMinutes: 85, dialogueTitle: "Quando o grupo já sabe",
  intro: [
    {
      title: "O que a fala coloquial economiza",
      body: "A conversa espontânea encurta palavras, muda a ordem e apoia-se no que já foi dito. Essa economia não é preguiça: ela sinaliza que os falantes compartilham contexto. Um marcador como -잖아 retoma algo que o ouvinte deveria saber; -거든 acrescenta uma razão que o outro talvez não tenha. O problema começa quando a economia pressupõe um conhecimento que o recém-chegado não tem. A mesma frase que cria intimidade entre amigos pode funcionar como porteira fechada para quem chega de fora. Entender a gíria é também perceber quem ela deixa fora.",
      ko: "구어의 친밀함은 공유된 지식 위에서 자라지만, 그 지식이 없는 사람에게는 배제의 신호가 되기도 한다.",
    },
    {
      title: "Gíria não é licença para tudo",
      body: "A gíria tem valor afetivo e social, mas não é intercambiável em qualquer relação. Ela depende de idade, proximidade, região e situação. Usar uma gíria de um grupo do qual você não faz parte pode soar como imitação ou apropriação; usar uma gíria antiga pode soar forçado. Em vez de decorar listas, observe quem usa a expressão, com quem e em que momento. Em contexto formal ou assimétrico, a versão neutra costuma ser mais segura. A competência coloquial inclui saber quando não usar.",
      ko: "속어를 아는 것과 그것을 쓸 자격이 있는지는 다른 문제다.",
    },
  ],
  dialogue: [
    ["민수", "야, 어제 카페 못 갔어? 나 기다렸잖아.", "Ei, você não foi ao café ontem? Eu esperei, né."],
    ["지훈", "미안. 과제가 산더미였거든. 문자를 못 보냈어.", "Desculpa. Estava com uma montanha de tarefas, sabe. Não consegui mandar mensagem."],
    ["민수", "괜찮아. 다음엔 미리 말해 줘. 진짜 바빴다는 건 알겠어.", "Tudo bem. Da próxima vez, avisa antes. Entendo que você estava realmente ocupado."],
    ["하늘", "두 사람 말이 너무 빨라서 따라가기 어려웠어요. '산더미'가 뭐예요?", "A fala de vocês é tão rápida que foi difícil acompanhar. O que é 'sandamí'?"],
    ["지훈", "숙제가 아주 많다는 뜻이에요. 줄임말은 아니고 그냥 비유예요.", "Significa que há muita lição de casa. Não é abreviação, é só uma metáfora."],
    ["민수", "하늘 씨, 우리가 은어를 쓴 건 아니에요. 그런데 모르는 말이 있으면 바로 물어봐 주세요.", "Haneul, não usamos gíria de grupo. Mas, se houver uma palavra que você não conhece, pergunte na hora."],
    ["하늘", "고마워요. '바보야'는 욕인 줄 알았어요.", "Obrigada. Achei que 'babo-ya' fosse um insulto."],
    ["지훈", "친한 친구끼리는 놀리는 말로 쓰기도 해요. 하지만 처음 만난 사람에게 쓰면 무례해요.", "Entre amigos próximos, às vezes é usado como brincadeira. Mas, com quem acabou de conhecer, é indelicado."],
  ],
  readingText: {
    titlePt: "A conversa da qual alguém fica de fora",
    paragraphs: [
      "민수: 야, 너 어제 그 카페 갔어? 지훈: 아니, 못 갔어. 과제가 산더미였거든. 민수: 아 진짜? 나는 네가 간 줄 알고 먼저 갔잖아. 지훈: 미안, 미안. 문자라도 했어야지. 민수: 괜찮아, 다음에 같이 가자. 그런데 그 카페 이름이 뭐였지? 지훈: 몰라, 나 그런 유행어 잘 몰라. 민수: 유행어가 아니라 이름이야, 바보야. 지훈: 아, 그거? 줄임말 같은 이름이었지.",
      "옆자리에서 듣던 하늘: 두 사람 대화가 빠르고 재미있어 보여요. 저도 끼어도 돼요? 민수: 그럼요. 하늘 씨는 한국어 되게 잘하잖아요. 하늘: 고마워요. 그런데 '산더미'는 무슨 뜻이에요? 지훈: 숙제가 아주 많다는 뜻이에요. 산처럼 쌓였다는 거죠. 민수: 그리고 '바보야'는 여기서 진짜 욕이 아니야. 친한 사이에서 놀리는 말이거든. 하늘: 아, 그래도 처음 들으면 조금 놀랄 것 같아요. 민수: 맞아요. 그래서 저는 처음 만난 사람에게는 그런 말을 안 써요.",
      "이 대화에서 -거든은 상대가 모를 수 있는 이유를 붙이며 말의 속도를 높인다. 반면 -잖아는 상대도 이미 알고 있어야 하는 사실을 다시 꺼내며 친밀감을 만들거나, 가볍게 나무라는 효과를 낸다. 두 표현은 관계가 가까울수록 자연스럽다. 그러나 같은 말이 낯선 사람에게는 배제의 신호가 될 수 있다. 억양이 조금만 달라져도 농담이 비꼬는 말로 들리기 때문이다. 하늘이 '끼어도 돼요?'라고 물은 것은 예의가 아니라, 대화의 규칙이 자기에게 열려 있는지 확인하는 일이었다. 구어의 즐거움과 은어의 배제는 같은 문법에서 나온다.",
    ],
    pt: "Minsu: Ei, você foi àquele café ontem? Jihun: Não, não consegui. Estava com uma montanha de tarefas, sabe. Minsu: Ah, é mesmo? Eu achei que você tinha ido e fui primeiro, né. Jihun: Desculpa, desculpa. Eu deveria ter mandado uma mensagem. Minsu: Tudo bem, vamos juntos da próxima vez. Mas qual era o nome do café? Jihun: Sei lá, eu não entendo bem dessas expressões da moda. Minsu: Não é expressão da moda, é o nome, seu bobo. Jihun: Ah, aquilo? Era um nome meio abreviado, né. Haneul, que ouvia ao lado: A conversa de vocês parece rápida e divertida. Posso entrar também? Minsu: Claro. Você fala coreano muito bem, né. Haneul: Obrigada. Mas o que significa 'sandamí'? Jihun: Significa que há muita lição de casa. É como se estivesse empilhada como uma montanha. Minsu: E 'babo-ya' aqui não é um insulto de verdade. Entre pessoas próximas, é uma forma de brincar, sabe. Haneul: Ah, mesmo assim, quando se ouve pela primeira vez, dá um susto. Minsu: É. Por isso eu não uso esse tipo de palavra com quem acabei de conhecer. Nesta conversa, -geodeun acrescenta uma razão que o outro talvez não saiba e acelera a fala. Já -janha retoma um fato que o outro deveria conhecer e cria proximidade ou uma leve reprimenda. As duas formas soam mais naturais quanto mais próxima é a relação. No entanto, a mesma fala pode ser um sinal de exclusão para um estranho. Basta uma pequena mudança de entonação para que a brincadeira soe como ironia. Quando Haneul perguntou 'posso entrar também?', não era apenas uma questão de educação: era verificar se as regras da conversa estavam abertas para ela. O prazer da fala coloquial e a exclusão da gíria nascem da mesma gramática.",
    objective: "Reconhecer o que os marcadores coloquiais pressupõem e avaliar o risco de exclusão.",
  },
  reusedIds: ["ko:유예", "ko:억양", "ko:무례", "ko:비유"],
  grammar: [
    [
      "-거든 — porque; explicação com pressuposição",
      "동사·형용사 + -거든(요)",
      "Introduz uma razão que o falante considera ainda não compartilhada pelo ouvinte, muitas vezes com tom de justificativa ou confidência. Em registro oral, -거든요 pode encerrar a fala e pedir compreensão. Compare com -잖아(요), que invoca algo que o outro já deveria saber, e com -니까, que apresenta a causa de modo mais neutro. Há também o -거든 condicional ('se'), comum em instruções; o contexto e a entonação distinguem os dois usos.",
      [
        ["과제가 산더미였거든. 문자를 못 보냈어.", "Estava com uma montanha de tarefas, sabe. Não consegui mandar mensagem."],
        ["내일 비가 오거든 우산을 챙겨.", "Se chover amanhã, leve um guarda-chuva."],
      ],
    ],
    [
      "-잖아 — né; como você sabe",
      "동사·형용사 + -잖아(요)",
      "Retoma uma informação que o falante supõe compartilhada, para justificar, lembrar ou repreender de modo leve. É muito frequente na fala espontânea e pode soar íntimo ou irritado conforme o tom. Compare com -지, que busca confirmação sem a mesma cobrança, e com -거든, que apresenta uma razão nova. Com pessoas de mais idade ou em contexto formal, -잖아요 pode ser aceitável, mas -잖아 sem '요' costuma ser reservado a relações próximas.",
      [
        ["나 기다렸잖아. 왜 연락 안 했어?", "Eu esperei, né. Por que não me avisou?"],
        ["하늘 씨는 한국어 되게 잘하잖아요.", "Você fala coreano muito bem, né."],
      ],
    ],
  ],
  guided: [
    mcq("O que o marcador -잖아 faz na fala de Minsu?", ["Retoma algo que ele supõe que o outro já saiba, criando cobrança afetiva.", "Introduz uma informação completamente nova para o ouvinte.", "Marca uma hipótese sobre o futuro."], "Retoma algo que ele supõe que o outro já saiba, criando cobrança afetiva.", "-잖아 pressupõe conhecimento compartilhado e, nesse contexto, soa como leve reprimenda."),
    cloze("Complete a explicação sobre o registro espontâneo: ___에서는 문장이 짧아지고 어순이 자주 바뀐다.", "구어", "O texto contrasta a fala cotidiana com a escrita e mostra que a economia é social, não apenas gramatical."),
    listen("Ouça e escreva a explicação de Jihun sobre a expressão.", "숙제가 아주 많다는 뜻이에요. 줄임말은 아니고 그냥 비유예요.", "숙제가 아주 많다는 뜻이에요. 줄임말은 아니고 그냥 비유예요.", "Significa que há muita lição de casa. Não é abreviação, é só uma metáfora."),
    translate("pt-ko", "Traduza: “Estava com uma montanha de tarefas, sabe. Não consegui mandar mensagem.”", "과제가 산더미였거든. 문자를 못 보냈어.", "-거든 apresenta a razão como algo que o ouvinte talvez ainda não saiba."),
    reading("민수: 야, 너 어제 그 카페 갔어? 지훈: 아니, 못 갔어. 과제가 산더미였거든. 민수: 아 진짜? 나는 네가 간 줄 알고 먼저 갔잖아.", "O que a fala de Minsu pressupõe?", ["Que Jihun deveria saber que ele tinha ido ao café e esperado por ele.", "Que Jihun nunca havia visitado aquele café.", "Que o café estava fechado naquele dia."], "Que Jihun deveria saber que ele tinha ido ao café e esperado por ele.", "O -잖아 de Minsu trata a ida e a espera como conhecimento compartilhado."),
  ],
  independent: [
    mcq("Por que a pergunta de Haneul ('posso entrar também?') é mais do que cortesia?", ["Porque ela verifica se as regras implícitas da conversa estão abertas a quem chega de fora.", "Porque ela quer mudar o assunto da conversa para outro tema.", "Porque ela não entende nada de coreano e precisa de ajuda."], "Porque ela verifica se as regras implícitas da conversa estão abertas a quem chega de fora.", "A cena mostra que a solidariedade linguística também define quem pode participar."),
    cloze("Complete o efeito da entonação: ___이 조금만 달라져도 농담이 비꼬는 말로 들리기 때문이다.", "억양", "A entonação transforma a mesma frase em brincadeira ou em ironia."),
    listen("Ouça e escreva o limite que Jihun reconhece.", "친한 친구끼리는 놀리는 말로 쓰기도 해요. 하지만 처음 만난 사람에게 쓰면 무례해요.", "친한 친구끼리는 놀리는 말로 쓰기도 해요. 하지만 처음 만난 사람에게 쓰면 무례해요.", "Entre amigos próximos, às vezes é usado como brincadeira. Mas, com quem acabou de conhecer, é indelicado."),
    translate("ko-pt", "Traduza: 구어의 친밀함은 공유된 지식 위에서 자라지만, 그 지식이 없는 사람에게는 배제의 신호가 되기도 한다.", "A intimidade da fala coloquial cresce sobre conhecimento compartilhado, mas, para quem não tem esse conhecimento, também pode se tornar um sinal de exclusão.", "구어 = fala coloquial; 배제 = exclusão."),
    reading("-거든은 상대가 모를 수 있는 이유를 붙이며 말의 속도를 높인다. 반면 -잖아는 상대도 이미 알고 있어야 하는 사실을 다시 꺼내며 친밀감을 만들거나, 가볍게 나무라는 효과를 낸다. 두 표현은 관계가 가까울수록 자연스럽다.", "Qual é a diferença central entre -거든 e -잖아?", ["-거든 acrescenta uma razão que o outro talvez não saiba; -잖아 retoma algo que ele deveria saber.", "-거든 é sempre formal; -잖아 é sempre escrito.", "-거든 serve para pedir desculpas; -잖아 serve para fazer perguntas."], "-거든 acrescenta uma razão que o outro talvez não saiba; -잖아 retoma algo que ele deveria saber.", "A diferença está no status da informação: nova para o ouvinte ou pressuposta como compartilhada."),
  ],
  summary: [
    "A fala coloquial economiza e sinaliza contexto compartilhado; a economia também pode excluir.",
    "-거든 apresenta uma razão que o ouvinte talvez não tenha e pode soar como confidência.",
    "-잖아 retoma um saber supostamente comum e pode criar intimidade ou leve repreensão.",
    "Gíria depende de relação, idade, região e situação; saber quando não usar faz parte da competência.",
    "Entender a gíria inclui perceber quem ela deixa de fora.",
  ],
  production: production(
    "Produção independente · traduzir o coloquial sem apagar a relação",
    "Reescreva um diálogo coloquial curto que você tenha ouvido ou imaginado, com pelo menos duas marcas de oralidade, em uma versão neutra para alguém de fora do grupo. Depois, explique o que se perdeu na tradução e por que a versão neutra não deve fingir a mesma intimidade.",
    "구어 표현이 들어간 짧은 대화를 중립적인 문어체로 바꾸고, 그 과정에서 사라진 관계의 결을 설명해 보세요.",
    ["Mantenha o conteúdo do diálogo, mas remova gírias e marcadores que dependem de intimidade.", "Use -거든 ou -잖아 no original e explique a função escolhida.", "Diga quem ficaria de fora da versão original.", "Explique o que a versão neutra ganha e o que perde.", "Feche avaliando se a tradução deveria manter alguma marca de oralidade."],
    ["Diálogo original com duas marcas de oralidade.", "Versão neutra que preserva o sentido.", "Função de -거든 ou -잖아 explicada.", "Perda relacional nomeada.", "Avaliação final sobre o limite da tradução."],
    "친구와의 대화를 중립적인 문장으로 바꾸어 보겠다. 원래 대화는 이랬다. '너 어제 왜 안 왔어? 나 기다렸잖아.' '미안, 갑자기 일이 생겼거든.' 여기서 -잖아는 상대가 당연히 알아야 할 사실을 다시 꺼내며 서운함을 전달한다. -거든은 상대가 모를 사정을 뒤늦게 설명하며 변명의 문을 연다. 두 표현이 있어서 대화는 짧지만 관계의 긴장이 살아 있다. 이를 중립적으로 바꾸면 '어제 왜 오지 않았어요? 기다렸어요.' '미안해요. 갑자기 일이 생겼어요.'가 된다. 뜻은 같지만 서운함의 강도는 약해지고, 두 사람이 얼마나 가까운지도 드러나지 않는다. 이 번역은 처음 만난 사람에게도 쓸 수 있지만, 원래의 친밀함을 재현하지는 못한다. 따라서 중립화는 정보를 보존하는 대신 관계의 결을 지운다. 나는 이 차이를 설명하는 것이 단순히 문장을 바꾸는 것보다 중요하다고 본다.",
    "Vou transformar uma conversa entre amigos em frases neutras. O diálogo original era assim: 'Por que você não veio ontem? Eu esperei, né.' 'Desculpa, aconteceu uma coisa de repente, sabe.' Aqui, -janha retoma um fato que o outro deveria conhecer e transmite o ressentimento. -geodeun explica tardiamente uma circunstância que o outro não conhecia e abre espaço para a justificativa. Com essas duas formas, o diálogo é curto, mas a tensão da relação continua viva. Numa versão neutra, ficaria: 'Por que você não veio ontem? Eu esperei.' 'Desculpe. Aconteceu uma coisa de repente.' O sentido é o mesmo, mas a intensidade do ressentimento diminui, e também não se revela o grau de proximidade entre os dois. Essa tradução pode ser usada com quem acabou de conhecer, mas não reproduz a intimidade original. A neutralização, portanto, preserva a informação ao custo de apagar a textura da relação. Considero que explicar essa diferença é mais importante do que apenas trocar as frases.",
    "Exemplo original. Observe que a versão neutra preserva o conteúdo, mas não finge a mesma intimidade. Exemplo ilustrativo; não é gabarito.",
  ),
});

/** c2-l10 — estilo jornalístico, atribuição e objetividade construída. */
export const C2_L10 = defineC2Lesson({
  id: "c2-l10", number: 10, moduleId: "c2-m02", title: "O estilo jornalístico",
  objective: "Reconhecer voz jornalística, atribuição e efeito de objetividade.",
  prerequisites: ["c2-l09"], estimatedMinutes: 85, dialogueTitle: "Quem disse o quê",
  intro: [
    {
      title: "Objetividade não é ausência de voz",
      body: "O texto jornalístico parece falar sem autor porque esconde o repórter atrás de fontes, documentos e verbos de atribuição. Essa construção é útil: permite ao leitor localizar quem afirmou o quê. Mas ela também pode produzir um efeito de objetividade que não corresponde ao grau de verificação. Dizer 'foi divulgado que' sem dizer por quem transfere a responsabilidade para uma voz anônima. A pergunta decisiva não é se o texto parece neutro, mas se o leitor consegue reconstruir de onde vem cada afirmação.",
      ko: "객관성은 목소리를 지우는 것이 아니라, 누가 말했는지를 독자가 추적할 수 있게 하는 데서 만들어진다.",
    },
    {
      title: "Atribuição e responsabilidade",
      body: "Atribuir é ligar uma afirmação a uma fonte identificável, com o cuidado de não transformar a fala da fonte em fato do jornal. 'Segundo a polícia, o incêndio começou na cozinha' é diferente de 'o incêndio começou na cozinha'. A primeira formulação permite discordar da polícia; a segunda apresenta a versão como realidade. Quando a fonte é anônima, o texto precisa dizer por que o anonimato foi concedido e o que a fonte pode ganhar com aquilo. Sem isso, a atribuição vira um selo de autoridade sem endereço.",
      ko: "출처를 밝힌다는 것은 책임을 넘기는 일이 아니라, 독자가 확인하고 반박할 수 있는 길을 여는 일이다.",
    },
  ],
  dialogue: [
    ["편집장", "이 속보, 제목이 너무 단정적이에요. 시가 공식적으로 인정한 건 '검토 중'뿐이잖아요.", "Esta notícia urgente tem um título conclusivo demais. O que a prefeitura reconheceu oficialmente foi apenas 'em análise', não é?"],
    ["기자", "현장 기자회견에서 나온 말을 그대로 썼습니다.", "Usei exatamente o que foi dito na coletiva de imprensa."],
    ["편집장", "그런데 리드에 '백지화'를 넣으면 독자는 결정이 끝난 줄 알아요. 취재원이 누구죠?", "Mas, se o lide traz 'cancelamento', o leitor entende que a decisão foi concluída. Quem é a fonte?"],
    ["기자", "시 관계자 한 명인데, 이름을 밝히지 말아 달라고 했어요.", "É um funcionário da prefeitura, que pediu para não ter o nome divulgado."],
    ["편집장", "그러면 최소한 '관계자 한 명에 따르면'이라고 써야죠. 특파원이 본 현장 상황도 넣고요.", "Então, no mínimo, escreva 'segundo um funcionário'. E inclua também a cena que o correspondente observou."],
    ["기자", "단독 보도 쪽은 취재원 두 명을 확보했다고 합니다.", "O lado da reportagem exclusiva diz ter garantido duas fontes."],
    ["편집장", "숫자는 중요하지만, 그들이 왜 익명을 요구했는지도 확인해야 해요. 탐사보도처럼 문서의 한계도 밝혀야 하고요.", "O número importa, mas também é preciso verificar por que pediram anonimato. E revelar os limites do documento, como na reportagem investigativa."],
    ["기자", "확인된 사실과 추정을 나눠서 다시 쓰겠습니다.", "Vou reescrever separando os fatos confirmados das suposições."],
  ],
  readingText: {
    titlePt: "Três versões de uma coletiva",
    paragraphs: [
      "어제 오후 3시, 시청 앞에서 열린 기자회견은 예정보다 20분 늦게 시작됐다. 시 관계자는 '재개발 계획과 관련한 새로운 자료를 확인 중'이라고 말했다. 그러나 구체적인 자료의 출처는 밝히지 않았다. 이 자리에는 현장을 취재한 특파원과 지역 신문 기자들이 함께 있었다. 속보 기사는 회견이 끝난 직후 나갔고, 제목에는 '재개발 백지화 검토'라는 표현이 들어갔다. 그러나 시가 공식적으로 밝힌 것은 '검토 중'이라는 말뿐이었다.",
      "다음 날 아침, 지역 신문은 단독 보도를 내보냈다. 기사의 리드는 '시가 민간 사업자와의 계약을 해지하는 방안을 검토하고 있다'는 한 문장으로 시작한다. 취재원은 사업 관련 부서의 관계자 두 명이며, 두 사람 모두 익명을 요구했다. 신문은 이들의 말이 공식 발표와 다르다는 점을 본문에 명시했다. 제목은 '계약 해지 검토'였지만, 본문은 아직 결정된 것이 없다고 밝혔다. 이처럼 제목과 본문의 온도가 다른 기사는 독자의 첫인상과 실제 확인 사이에 간격을 만든다. 같은 사안을 다룬 탐사보도 프로그램은 계약서 원본 일부를 공개했지만, 해당 문서가 최종본인지는 확인하지 못했다고 밝혔다.",
      "두 보도는 같은 사건을 다루지만 독자에게 주는 확신은 다르다. 속보는 빠르지만 확인의 정도를 말하지 않는다. 단독 보도는 출처를 숨기면서도 취재원의 수와 이해관계를 일부 공개한다. 논픽션 형식의 탐사보도는 문서와 인터뷰를 함께 제시하며 불확실한 부분을 남겨 둔다. 좋은 저널리즘은 모든 것을 아는 척하지 않는다. 무엇을 확인했고, 무엇을 확인하지 못했으며, 누가 그 말을 했는지를 독자가 구분할 수 있게 해야 한다.",
    ],
    pt: "Ontem, às 15h, a coletiva de imprensa em frente à prefeitura começou vinte minutos atrasada. Um funcionário da prefeitura disse que 'novos documentos relacionados ao projeto de reurbanização estão em verificação'. No entanto, não revelou a origem concreta dos documentos. Estavam ali um correspondente que cobriu a cena e repórteres do jornal local. A notícia urgente saiu logo após o fim da coletiva, e o título trazia a expressão 'análise de cancelamento da reurbanização'. Mas o que a prefeitura declarou oficialmente foi apenas que a questão estava 'em análise'. Na manhã seguinte, o jornal local publicou uma reportagem exclusiva. O lide começa com uma frase: 'A prefeitura analisa a possibilidade de rescindir o contrato com a empresa privada'. As fontes são dois funcionários do departamento responsável pelo projeto, e ambos pediram anonimato. O jornal deixou explícito no corpo do texto que as falas deles divergem do comunicado oficial. O título era 'análise de rescisão do contrato', mas o corpo do texto afirmava que nada havia sido decidido. Uma notícia em que título e corpo têm temperaturas diferentes cria um intervalo entre a primeira impressão do leitor e a confirmação real. Um programa de reportagem investigativa sobre o mesmo assunto divulgou parte do contrato original, mas afirmou não ter conseguido confirmar se aquele documento era a versão final. As duas reportagens tratam do mesmo caso, mas produzem graus diferentes de certeza no leitor. A notícia urgente é rápida, mas não informa o grau de verificação. A reportagem exclusiva esconde a identidade das fontes, embora revele em parte o número de fontes e seus interesses. A reportagem investigativa em formato de não ficção apresenta documentos e entrevistas juntos, deixando explícitas as incertezas. O bom jornalismo não finge saber tudo. Ele precisa permitir que o leitor distinga o que foi confirmado, o que não foi confirmado e quem fez cada afirmação.",
    objective: "Comparar o grau de atribuição e o efeito de objetividade nas três versões.",
  },
  reusedIds: ["ko:자료", "ko:단정적", "ko:객관성", "ko:재개발"],
  grammar: [
    [
      "-ㄴ/는 것으로 전해졌다 — foi divulgado que; chegou-se a saber que",
      "동사 + -ㄴ/는 것으로 전해졌다 / 형용사 + -(으)ㄴ 것으로 전해졌다",
      "Apresenta uma informação como transmitida por outra fonte, mantendo distância entre o jornal e o conteúdo. É típico da escrita jornalística e permite relatar sem assumir a afirmação. Compare com -다고 한다, mais direto e oral, e com -ㄴ/는 것으로 확인됐다, que indica verificação, não apenas transmissão. Se a fonte não é nomeada, o texto precisa dizer quem transmitiu e com que interesse.",
      [
        ["사고 원인은 전기 누전인 것으로 전해졌다.", "Foi divulgado que a causa do acidente foi um curto-circuito."],
        ["피해자는 모두 병원으로 이송된 것으로 전해졌다.", "Chegou-se a saber que todas as vítimas foram levadas ao hospital."],
      ],
    ],
    [
      "-ㄴ/는 데 따르면 — segundo o que foi dito/divulgado",
      "동사 + -ㄴ/는 데 따르면 / 형용사 + -(으)ㄴ 데 따르면",
      "Introduz a fonte de uma informação a partir do que ela declarou, publicou ou registrou. É formal e comum em reportagens. Compare com -에 따르면, que se liga diretamente a um substantivo-fonte ('경찰에 따르면'), e com -라고 하다, que reproduz a fala sem organizar a fonte. A forma '-ㄴ/는 데 따르면' é útil quando a fonte é um ato de fala ou um documento, e não uma instituição.",
      [
        ["경찰이 발표한 데 따르면, 사고는 오전 6시에 발생했다.", "Segundo o que a polícia divulgou, o acidente ocorreu às 6h."],
        ["보고서에 적힌 데 따르면, 예산의 절반이 집행되지 않았다.", "Segundo o que está escrito no relatório, metade do orçamento não foi executada."],
      ],
    ],
  ],
  guided: [
    mcq("Qual é o problema principal do título da notícia urgente?", ["Ele apresenta como decisão concluída algo que a prefeitura disse estar apenas em análise.", "Ele não menciona o nome do repórter nem a data da notícia.", "Ele é longo demais para uma notícia urgente e deveria ser mais curto."], "Ele apresenta como decisão concluída algo que a prefeitura disse estar apenas em análise.", "O título transforma 'em análise' em 'cancelamento', elevando o grau de certeza."),
    cloze("Complete a função do profissional que observa a cena: 이 자리에는 현장을 취재한 ___과 지역 신문 기자들이 함께 있었다.", "특파원", "O correspondente está no local e pode relatar o que viu, mas não substitui a confirmação documental."),
    listen("Ouça e escreva o que o editor exige além do número de fontes.", "숫자는 중요하지만, 그들이 왜 익명을 요구했는지도 확인해야 해요.", "숫자는 중요하지만, 그들이 왜 익명을 요구했는지도 확인해야 해요.", "O número importa, mas também é preciso verificar por que pediram anonimato."),
    translate("pt-ko", "Traduza: “Foi divulgado que todas as vítimas foram levadas ao hospital.”", "피해자는 모두 병원으로 이송된 것으로 전해졌다.", "-ㄴ/는 것으로 전해졌다 atribui a informação a uma fonte não nomeada no enunciado."),
    reading("속보 기사는 회견이 끝난 직후 나갔고, 제목에는 '재개발 백지화 검토'라는 표현이 들어갔다. 그러나 시가 공식적으로 밝힌 것은 '검토 중'이라는 말뿐이었다.", "O que o contraste entre título e declaração oficial revela?", ["O título aumentou o grau de certeza sem que a fonte oficial tivesse confirmado a decisão.", "A prefeitura confirmou o cancelamento antes da coletiva.", "O jornal se recusou a publicar a notícia."], "O título aumentou o grau de certeza sem que a fonte oficial tivesse confirmado a decisão.", "A notícia urgente antecipa uma conclusão que a própria fonte não havia dado."),
  ],
  independent: [
    mcq("O que diferencia a reportagem exclusiva das outras duas versões?", ["Ela revela o número de fontes e o conflito com a versão oficial, mas mantém o anonimato.", "Ela dispensa completamente o uso de fontes e de documentos.", "Ela foi escrita antes da coletiva de imprensa e sem ouvir a empresa."], "Ela revela o número de fontes e o conflito com a versão oficial, mas mantém o anonimato.", "A reportagem exclusiva combina atribuição parcial com proteção das fontes."),
    cloze("Complete a proteção da fonte: ___은 신원을 보호받을 권리가 있다.", "취재원", "O texto jornalístico precisa equilibrar proteção da fonte e informação ao leitor."),
    listen("Ouça e escreva o que o repórter promete separar.", "확인된 사실과 추정을 나눠서 다시 쓰겠습니다.", "확인된 사실과 추정을 나눠서 다시 쓰겠습니다.", "Vou reescrever separando os fatos confirmados das suposições."),
    translate("ko-pt", "Traduza: 좋은 저널리즘은 모든 것을 아는 척하지 않는다.", "O bom jornalismo não finge saber tudo.", "모든 것을 아는 척하다 = fingir saber tudo."),
    reading("좋은 저널리즘은 모든 것을 아는 척하지 않는다. 무엇을 확인했고, 무엇을 확인하지 못했으며, 누가 그 말을 했는지를 독자가 구분할 수 있게 해야 한다.", "Qual é o critério de objetividade defendido no texto?", ["Permitir que o leitor reconstrua o grau de verificação e a origem de cada afirmação.", "Eliminar completamente a voz do repórter e das fontes.", "Publicar apenas documentos oficiais sem interpretação."], "Permitir que o leitor reconstrua o grau de verificação e a origem de cada afirmação.", "A objetividade é apresentada como transparência sobre a origem e o limite da informação."),
  ],
  summary: [
    "A objetividade jornalística é construída por atribuição, não pela ausência de voz.",
    "Atribuir corretamente permite ao leitor discordar da fonte sem confundir a fonte com o jornal.",
    "-ㄴ/는 것으로 전해졌다 relata uma informação transmitida e mantém distância da redação.",
    "-ㄴ/는 데 따르면 introduz a fonte a partir do que ela declarou ou registrou.",
    "Anonimato exige explicar por que foi concedido e o que a fonte pode ganhar com ele.",
  ],
  production: production(
    "Produção independente · atribuir sem transferir responsabilidade",
    "Pegue uma nota curta, um comunicado ou uma manchete que você conheça e reescreva-a como uma notícia com atribuição explícita. Diga quem afirmou cada fato, o que está confirmado e o que permanece incerto. Depois, explique o que a sua versão deixa de afirmar em comparação com o original.",
    "출처가 불분명한 짧은 기사나 공지문을 골라, 누가 무엇을 말했는지 드러나는 기사로 다시 쓰고, 원문과 달라진 점을 설명해 보세요.",
    ["Separe fato confirmado, versão de fonte e suposição.", "Use -ㄴ/는 것으로 전해졌다 e -ㄴ/는 데 따르면 uma vez cada.", "Nomeie a fonte ou explique por que ela é anônima.", "Inclua o que não foi possível confirmar.", "Explique o que o original dava a entender sem atribuição."],
    ["Fatos, versões e suposições separados.", "Duas formas-alvo com função clara.", "Fonte identificada ou anonimato justificado.", "Limite da confirmação explícito.", "Comparação com o original."],
    "원문은 '시가 재개발 계획을 전면 백지화했다'는 한 문장이었다. 그러나 취재 결과, 시가 공식적으로 확인해 준 것은 없었다. 시 관계자가 '계획을 재검토하고 있다'고 말한 것이 전부였다. 나는 기사를 이렇게 다시 쓴다. 시가 재개발 계획을 재검토하고 있다고 밝혔다. 시 관계자는 기자회견에서 '새로운 자료를 확인 중'이라고 말했으며, 계획의 취소 여부는 확인되지 않았다. 해당 발언은 기자회견에 참석한 특파원이 직접 들은 것이다. 시가 발표한 데 따르면, 최종 결정은 다음 달 시의회에서 나온다. 취재원 두 명은 계획이 축소될 가능성을 언급했지만, 두 사람 모두 익명을 요구했고 문서로 확인된 내용은 없었다. 원문은 확인되지 않은 결정을 사실처럼 전했지만, 수정된 기사는 무엇이 확인되고 무엇이 남아 있는지를 독자에게 보여 준다.",
    "O texto original era uma única frase: 'A prefeitura cancelou totalmente o projeto de reurbanização'. No entanto, a apuração não encontrou nenhuma confirmação oficial. Tudo o que havia era a fala de um funcionário da prefeitura dizendo que 'o plano está sendo reexaminado'. Reescrevo a notícia assim: a prefeitura informou que está reexaminando o projeto de reurbanização. Um funcionário da prefeitura disse na coletiva que 'novos documentos estão em verificação', e não foi confirmado se o plano será cancelado. A declaração foi ouvida diretamente pelo correspondente presente na coletiva. Segundo o que a prefeitura divulgou, a decisão final sairá na reunião do conselho municipal do mês que vem. Duas fontes mencionaram a possibilidade de redução do projeto, mas ambas pediram anonimato, e não há conteúdo confirmado por documento. O original tratava uma decisão não confirmada como fato; a versão corrigida mostra ao leitor o que foi confirmado e o que continua em aberto.",
    "Exemplo original. Observe que a reescrita atribui cada afirmação e mantém explícito o que não foi confirmado. Exemplo ilustrativo; não é gabarito.",
  ),
});
