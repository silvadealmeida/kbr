import { cloze, defineC2Checkpoint, listen, mcq, reading, translate } from "../shared";
import type { CourseProductionTask } from "../../course-types";

const RUBRIC = [
  { criterion: "task" as const, labelPt: "Cumprimento da tarefa", descriptorPt: "A produção responde ao enunciado, assume o gênero pedido e deixa claro o efeito de voz ou registro que quer produzir." },
  { criterion: "organization" as const, labelPt: "Organização e progressão", descriptorPt: "O texto avança da marca linguística para o efeito de sentido e da análise para a reescrita, sem repetir etapas." },
  { criterion: "vocabulary" as const, labelPt: "Vocabulário e colocação", descriptorPt: "Usa léxico preciso do módulo, com colocações naturais e sem misturar registros de forma involuntária." },
  { criterion: "grammar" as const, labelPt: "Gramática e registro", descriptorPt: "As formas do módulo aparecem corretas e o registro se mantém coerente com a situação e o destinatário." },
  { criterion: "argument" as const, labelPt: "Qualidade da análise", descriptorPt: "A interpretação é sustentada por marcas do texto e distingue o que a voz diz do que ela deixa entender." },
  { criterion: "mediation" as const, labelPt: "Mediação e responsabilidade", descriptorPt: "Reformula a fala para outro leitor sem apagar a posição original nem usar o estilo para esconder responsabilidade." },
];

const PRODUCTION: CourseProductionTask = {
  titlePt: "Produção do checkpoint · a mesma notícia em duas vozes",
  promptPt: "Escolha um fato simples do seu entorno — uma reunião, uma mudança no bairro, uma decisão de escola ou de trabalho. Escreva duas versões curtas: uma nota jornalística com atribuição explícita e um trecho de ensaio público com voz autoral. Depois, explique o que cada voz permite ao leitor saber e o que ela deixa de fora.",
  promptKo: "주변에서 일어난 간단한 사건을 골라, 출처가 분명한 짧은 기사와 필자의 목소리가 드러나는 공적 에세이 한 단락을 각각 써 보고, 두 목소리가 독자에게 허용하는 정보와 감추는 정보를 설명해 보세요.",
  guidance: [
    "Mantenha o mesmo fato nas duas versões para que a diferença esteja na voz e na atribuição.",
    "Na nota jornalística, diga quem afirmou cada fato e o que não foi confirmado.",
    "No ensaio, mostre de onde fala o autor e qual é a tese.",
    "Use ao menos uma forma-alvo de cada lição do módulo.",
    "Na análise final, diga o que a nota não pode afirmar e o que o ensaio não pode provar.",
  ],
  checklist: [
    "Mesmo fato nas duas versões.",
    "Atribuição explícita na nota.",
    "Voz autoral e tese no ensaio.",
    "Formas-alvo empregadas com função clara.",
    "Limite de cada voz reconhecido.",
    "Registro consistente em cada versão.",
  ],
  minWords: 110,
  rubric: RUBRIC,
  sample: {
    ko: "우리 동네 도서관은 다음 달부터 일요일 문을 닫는다. 사서는 '인력 부족과 예산 삭감이 겹쳤다'고 설명했다. 도서관이 공식적으로 밝힌 데 따르면, 주말 이용자는 지난해보다 18퍼센트 줄었다. 그러나 이용자 단체는 감소가 폐관 결정의 원인인지 결과인지 확인되지 않았다고 반박했다. 이 사실만으로는 일요일 휴관이 불가피했다고 단정할 수 없다. 같은 사실을 공적 에세이로 쓰면 이렇게 된다. 우리 동네 도서관은 일요일마다 문을 닫는다. 나는 지난겨울 그 건물 앞에서 아이와 함께 책을 들고 돌아서던 아버지를 떠올린다. 그에게 일요일은 유일하게 아이와 함께 도서관에 갈 수 있는 날이었다. 휴관의 이유로 제시된 이용자 감소는, 어쩌면 휴관이 이미 예고된 뒤의 숫자일지도 모른다. 필자인 나는 이 결정이 틀렸다고 단정하지 않는다. 다만 예산과 인력의 문제를 이용자의 선택으로 바꾸어 말하지는 말아야 한다고 본다. 다음 시의회 회의에서 우리가 물어야 할 것은 숫자가 아니라, 문이 닫힌 뒤 누가 가장 먼저 잊히는가이다.",
    pt: "A biblioteca do meu bairro fechará aos domingos a partir do mês que vem. A bibliotecária explicou que 'faltou pessoal e houve corte de orçamento'. Segundo o que a biblioteca divulgou oficialmente, o número de usuários nos fins de semana caiu 18% em relação ao ano passado. No entanto, uma associação de usuários rebateu que não está confirmado se a queda foi causa ou consequência da decisão de fechar. Só com esse fato, não se pode afirmar que o fechamento aos domingos era inevitável. O mesmo fato, escrito como ensaio público, fica assim: a biblioteca do meu bairro fecha aos domingos. Lembro-me de um pai que, no inverno passado, voltava da porta daquele prédio com um livro e uma criança pela mão. Para ele, o domingo era o único dia em que podia ir à biblioteca com o filho. A queda no número de usuários apresentada como razão do fechamento talvez seja o número posterior ao anúncio do próprio fechamento. Eu, autor deste texto, não afirmo que a decisão esteja errada. Apenas considero que não se deve transformar um problema de orçamento e pessoal em escolha dos usuários. Na próxima reunião do conselho municipal, o que devemos perguntar não é o número, mas quem será esquecido primeiro depois que a porta fechar.",
    notePt: "Exemplo original. Observe a atribuição explícita na nota, a voz autoral e a tese no ensaio, e o limite que cada versão reconhece. Exemplo ilustrativo; não é gabarito.",
  },
};

/** c2-c02 — avaliação do Módulo 2: voz, ensaio, retórica política, coloquialidade e jornalismo. */
export const C2_C02 = defineC2Checkpoint({
  id: "c2-c02", number: 2, moduleId: "c2-m02",
  title: "Checkpoint · Registro, estilo e voz",
  objective: "Avaliar voz narrativa, ensaio, retórica política, coloquialidade e jornalismo do Módulo 2.",
  instructions: [
    "Responda aos 25 itens sem consultar as lições.",
    "Nos itens de escuta, escreva a frase completa que ouvir.",
    "Nos itens de tradução, mantenha o sentido, o registro e a função do original.",
    "A produção escrita é avaliada por rubrica e não entra na nota automática.",
  ],
  lessonIds: ["c2-l06", "c2-l07", "c2-l08", "c2-l09", "c2-l10"],
  prerequisites: ["c2-l06", "c2-l07", "c2-l08", "c2-l09", "c2-l10", "c2-c01"],
  estimatedMinutes: 55,
  exercises: [
    mcq("Qual pergunta permite analisar a voz narrativa de um conto?", ["Quem fala, de onde fala e o que essa voz não pode saber?", "Quantas páginas tem o conto?", "Qual é a idade do autor no momento da publicação?"], "Quem fala, de onde fala e o que essa voz não pode saber?", "A voz se define pelo acesso à informação e pela posição de quem narra, não por dados biográficos do autor."),
    mcq("O que distingue um ensaio público de um desabafo pessoal?", ["A experiência individual é convertida em questão comum, com tese e destinatário.", "O texto é necessariamente mais longo.", "O autor evita dizer de onde fala."], "A experiência individual é convertida em questão comum, com tese e destinatário.", "O ensaio não abandona a experiência; ele a torna pública e argumentável."),
    mcq("O que uma boa atribuição jornalística permite ao leitor?", ["Reconstruir quem afirmou cada fato e com que grau de confirmação.", "Eliminar a necessidade de verificar a informação.", "Confundir a opinião da fonte com a posição do jornal."], "Reconstruir quem afirmou cada fato e com que grau de confirmação.", "Atribuir é abrir o caminho da verificação, não apenas proteger a redação."),

    cloze("Complete o limite do observador: 설명은 ___보다 오래 걸린다.", "관찰", "A frase sustenta a ideia de que a interpretação vem depois do que foi visto."),
    cloze("Complete o espaço de debate: 나는 이 차이를 ___의 장으로 가져와야 한다고 본다.", "공론", "O ensaio pede que a diferença seja discutida publicamente, e não resolvida em silêncio."),
    cloze("Complete a crítica à medida: 우리는 이 조치의 ___을 인정하지 않습니다.", "정당성", "A oposição questiona a legitimidade do procedimento, não apenas a eficácia da medida."),
    cloze("Complete o efeito da entonação: ___이 조금만 달라져도 농담이 비꼬는 말로 들리기 때문이다.", "억양", "A entonação transforma a mesma frase em brincadeira ou ironia."),
    cloze("Complete a proteção da fonte: ___은 신원을 보호받을 권리가 있다.", "취재원", "O texto jornalístico precisa equilibrar a proteção da fonte e a informação ao leitor."),

    listen("Ouça e escreva o limite do narrador.", "서술자는 인물의 속마음을 모두 알지 못한다.", "서술자는 인물의 속마음을 모두 알지 못한다.", "O narrador não conhece todos os pensamentos dos personagens."),
    listen("Ouça e escreva o que o autor do ensaio torna visível.", "필자는 이 글에서 자신의 위치를 먼저 밝힌다.", "필자는 이 글에서 자신의 위치를 먼저 밝힌다.", "O autor revela primeiro a própria posição neste texto."),
    listen("Ouça e escreva o critério para uma promessa política.", "공약은 지킬 수 있는 범위 안에서 구체적으로 제시되어야 한다.", "공약은 지킬 수 있는 범위 안에서 구체적으로 제시되어야 한다.", "As promessas de campanha devem ser apresentadas concretamente dentro do que se pode cumprir."),
    listen("Ouça e escreva o limite do uso da brincadeira entre amigos.", "친한 친구끼리는 놀리는 말로 쓰기도 해요. 하지만 처음 만난 사람에게 쓰면 무례해요.", "친한 친구끼리는 놀리는 말로 쓰기도 해요. 하지만 처음 만난 사람에게 쓰면 무례해요.", "Entre amigos próximos, às vezes é usado como brincadeira. Mas, com quem acabou de conhecer, é indelicado."),
    listen("Ouça e escreva o que a notícia precisa separar.", "기사는 확인된 사실과 추정을 구분해야 한다.", "기사는 확인된 사실과 추정을 구분해야 한다.", "A notícia precisa separar os fatos confirmados das suposições."),
    listen("Ouça e escreva o efeito do ponto de vista.", "같은 사건도 시점에 따라 전혀 다르게 보인다.", "같은 사건도 시점에 따라 전혀 다르게 보인다.", "O mesmo acontecimento parece completamente diferente conforme o ponto de vista."),

    translate("pt-ko", "Traduza: “O narrador não conhece todos os pensamentos dos personagens.”", "서술자는 인물의 속마음을 모두 알지 못한다.", "서술자 = narrador; 속마음 = pensamentos íntimos."),
    translate("pt-ko", "Traduza: “Enquanto os cidadãos acompanharem, cumprirei esta promessa.”", "시민이 지켜봐 주시는 한, 이 약속을 이행하겠습니다.", "-ㄴ/는 한 estabelece a condição dentro da qual a promessa vale."),
    translate("ko-pt", "Traduza: 공적 글쓰기에서 '우리'는 감정을 키우는 장치가 아니라, 누가 무엇을 함께 책임질 것인지 밝히는 말이어야 한다.", "Na escrita pública, o 'nós' não deve ser um dispositivo para ampliar a emoção, mas uma palavra que diga quem compartilha qual responsabilidade.", "감정을 키우다 = ampliar a emoção; 책임지다 = assumir responsabilidade."),
    translate("ko-pt", "Traduza: 구어의 친밀함은 공유된 지식 위에서 자라지만, 그 지식이 없는 사람에게는 배제의 신호가 되기도 한다.", "A intimidade da fala coloquial cresce sobre conhecimento compartilhado, mas, para quem não tem esse conhecimento, também pode se tornar um sinal de exclusão.", "구어 = fala coloquial; 배제 = exclusão."),
    translate("ko-pt", "Traduza: 객관성은 목소리를 지우는 것이 아니라, 누가 말했는지를 독자가 추적할 수 있게 하는 데서 만들어진다.", "A objetividade não é apagar a voz, mas se constrói ao permitir que o leitor rastreie quem disse o quê.", "목소리를 지우다 = apagar a voz; 추적하다 = rastrear."),

    reading("버스 정류장에는 늘 같은 시간에 같은 남자가 서 있었다. 나는 7시 40분쯤 창가 자리에 앉아 그를 보았다. 그는 낡은 회색 코트를 입고, 손에는 비닐봉지를 하나 들고 있었다. 봉지 안에 무엇이 들었는지는 보이지 않았다. 그는 버스가 오면 타지 않고, 한 대를 그냥 보내곤 했다.", "O que a voz narrativa deixa fora do alcance do leitor?", ["O conteúdo da sacola e a razão real da espera do homem.", "O horário em que a narradora chega à janela.", "A cor do sobretudo do homem."], "O conteúdo da sacola e a razão real da espera do homem.", "A narradora enumera o que vê e mantém explícito o limite da própria observação."),
    reading("이야기를 쓸 때 우리는 흔히 전지적 시점을 원한다. 인물의 속마음을 모두 알고, 사건의 이유를 다 설명하고 싶어 한다. 그러나 이 장면에서 내가 알 수 있었던 것은 회색 코트와 비닐봉지, 그리고 그가 웃을 때 눈가에 생기는 주름뿐이었다.", "Por que o texto recusa a onisciência?", ["Porque a força da cena está no que foi visto, não no que poderia ser inventado.", "Porque a narradora não se lembra do episódio.", "Porque o homem se recusa a falar."], "Porque a força da cena está no que foi visto, não no que poderia ser inventado.", "A limitação da voz é apresentada como condição da profundidade narrativa."),
    reading("공적 공간은 모두에게 열려 있다고 말하지만, 실제로는 앉을 수 있는 사람과 앉았다가 눈총을 받는 사람이 나뉜다. 나는 이 차이를 공론의 장으로 가져와야 한다고 본다.", "O que o ensaio critica na ideia de espaço aberto a todos?", ["A diferença entre o acesso declarado e o acesso efetivo de quem usa o banco.", "A existência de bancos em praças públicas.", "A realização de reuniões com moradores."], "A diferença entre o acesso declarado e o acesso efetivo de quem usa o banco.", "O texto opõe a abertura proclamada à experiência de quem recebe olhares de reprovação."),
    reading("두 연설은 같은 사실을 다르게 배열한다. 첫 번째는 미래의 혜택을 먼저 말하고 현재의 비용을 뒤로 미룬다. 두 번째는 현재의 비용을 먼저 말하고 미래의 약속을 의심한다. 어느 쪽도 거짓말을 하지는 않는다. 그러나 '먼저'라는 단어가 어디에 놓이느냐에 따라 책임의 위치가 달라진다.", "Como os dois discursos produzem efeitos diferentes sem mentir?", ["Mudam a ordem dos fatos e, com isso, o lugar da responsabilidade.", "Apresentam números oficiais incompatíveis.", "Recusam-se a mencionar o custo da medida."], "Mudam a ordem dos fatos e, com isso, o lugar da responsabilidade.", "A análise mostra que a retórica opera pela disposição dos fatos, não pela invenção."),
    reading("이 대화에서 -거든은 상대가 모를 수 있는 이유를 붙이며 말의 속도를 높인다. 반면 -잖아는 상대도 이미 알고 있어야 하는 사실을 다시 꺼내며 친밀감을 만들거나, 가볍게 나무라는 효과를 낸다. 두 표현은 관계가 가까울수록 자연스럽다. 그러나 같은 말이 낯선 사람에게는 배제의 신호가 될 수 있다.", "Qual é a diferença entre os dois marcadores?", ["-거든 acrescenta uma razão que o outro talvez não saiba; -잖아 retoma algo que ele deveria saber.", "-거든 é sempre escrito; -잖아 é sempre formal.", "-거든 serve para pedir desculpas; -잖아 serve para fazer perguntas."], "-거든 acrescenta uma razão que o outro talvez não saiba; -잖아 retoma algo que ele deveria saber.", "A diferença está no status da informação: nova para o ouvinte ou pressuposta como compartilhada."),
    reading("좋은 저널리즘은 모든 것을 아는 척하지 않는다. 무엇을 확인했고, 무엇을 확인하지 못했으며, 누가 그 말을 했는지를 독자가 구분할 수 있게 해야 한다.", "Qual é o critério de objetividade defendido?", ["Permitir que o leitor reconstrua o grau de verificação e a origem de cada afirmação.", "Eliminar completamente a voz do repórter.", "Publicar apenas documentos oficiais sem interpretação."], "Permitir que o leitor reconstrua o grau de verificação e a origem de cada afirmação.", "A objetividade é definida como transparência sobre a origem e o limite da informação."),
  ],
  production: PRODUCTION,
  minCorrect: 20,
});
