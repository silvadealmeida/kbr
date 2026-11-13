import { cloze, defineB2Lesson, listen, mcq, reading, translate } from "./shared";
import type { CourseProductionTask } from "../../course-types";

const RUBRIC = [
  { criterion: "task" as const, labelPt: "Cumprimento da tarefa", descriptorPt: "O texto responde ao enunciado e cumpre o gênero pedido." },
  { criterion: "organization" as const, labelPt: "Organização e coesão", descriptorPt: "As ideias têm ordem reconhecível e os parágrafos se conectam." },
  { criterion: "vocabulary" as const, labelPt: "Vocabulário", descriptorPt: "Usa palavras adequadas ao tema, inclusive parte do léxico da lição." },
  { criterion: "grammar" as const, labelPt: "Gramática e registro", descriptorPt: "As formas são inteligíveis e o registro combina com o destinatário." },
  { criterion: "argument" as const, labelPt: "Clareza da posição", descriptorPt: "A posição ou avaliação fica explícita e sustentada pelo texto." },
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
  minWords = 80,
): CourseProductionTask {
  return { titlePt, promptPt, promptKo, guidance, checklist, minWords, rubric: RUBRIC, sample: { ko: sampleKo, pt: samplePt, notePt } };
}

/** b2-l11 — normas, expectativas e hábitos. */
export const B2_L11 = defineB2Lesson({
  id: "b2-l11", number: 11, moduleId: "b2-m03", title: "O que se espera de nós",
  objective: "Descrever expectativas sociais e distinguir norma, hábito e escolha pessoal.",
  prerequisites: ["b2-c02"], estimatedMinutes: 75, dialogueTitle: "A expectativa não escrita",
  intro: [
    { title: "Está estabelecido que", body: "-도록 되어 있다 descreve uma regra, um sistema ou um combinado já estabelecido. Não expressa a intenção de quem fala. Compare com -기로 하다 (decisão tomada) e -게 되어 있다 (resultado natural ou arranjo). Registro: neutro a formal.", ko: "회의는 매주 월요일 열리도록 되어 있어요." },
    { title: "Costumava fazer", body: "-곤 하다 marca um hábito ou uma repetição no passado, ou um hábito recorrente no presente. Compare com -는 편이다 (tendência) e -기 마련이다 (resultado inevitável). Não use para uma ação única. Registro: neutro, levemente narrativo.", ko: "어릴 때 이 공원에서 놀곤 했어요." },
  ],
  dialogue: [
    ["아나", "이 회사에는 이상한 규칙이 많네요.", "Esta empresa tem muitas regras estranhas."],
    ["민수", "문서에 있는 규범은 몇 개 안 돼요. 문제는 말로만 전해지는 기대예요.", "As normas escritas são poucas. O problema são as expectativas que passam só pela fala."],
    ["아나", "예를 들면요?", "Por exemplo?"],
    ["민수", "회식은 참석하는 게 좋다는 분위기요. 규칙은 아니지만, 눈치를 보게 돼요.", "O clima de que é bom participar das confraternizações. Não é regra, mas a gente fica medindo o clima."],
    ["아나", "저는 체면 때문에 거절을 못 했어요.", "Eu não conseguia recusar por causa da imagem social."],
    ["민수", "최근에는 자율성을 중시하는 사람이 늘었어요. 휴일 근무를 강요하지 말자는 기대감도 커졌고요.", "Ultimamente aumentou o número de pessoas que valorizam a autonomia. Também cresceu a expectativa de não forçar trabalho em feriados."],
    ["아나", "그럼 규칙을 어기면 어떻게 돼요?", "E se alguém quebrar uma regra?"],
    ["민수", "문서에 적힌 규칙을 어기면 분명한 결과가 있어요. 하지만 관습은 대화로 바꿀 수 있어요. 지킬 수 있는 범위를 말하는 게 중요해요.", "Se quebrar uma regra escrita, há uma consequência clara. Mas o costume pode mudar pela conversa. O importante é dizer o limite que se consegue cumprir."],
  ],
  readingText: {
    titlePt: "A expectativa que não está escrita",
    paragraphs: [
      "회사에는 문서로 정해진 규범이 있고, 말로만 전해지는 기대도 있다. 예를 들어 ‘회식은 참석하는 게 좋다’는 말은 규칙이 아니지만, 많은 사람이 지켜야 할 일처럼 느낀다. 눈치를 보는 분위기가 생기는 이유다.",
      "최근에는 자율성을 중시하는 목소리가 커졌다. 휴일 근무를 강요하지 말자는 기대감도 생겼다. 그러나 새로운 규범이 자리 잡기까지는 시간이 걸린다. 회식에 참석하지 않으면 체면이 상한다고 느끼는 사람도 있다.",
      "중요한 것은 규칙과 관습을 구분하는 일이다. 규칙을 어기면 분명한 결과가 있지만, 관습은 협의할 수 있다. 회사가 기대를 문서로 밝히고, 개인이 지킬 수 있는 범위를 말할 때 서로의 부담이 줄어든다.",
    ],
    pt: "Na empresa há normas definidas em documentos e também expectativas transmitidas apenas pela fala. Por exemplo, a frase “é bom participar das confraternizações” não é uma regra, mas muitas pessoas sentem que precisam cumpri-la. É por isso que se cria um clima de medir o olhar dos outros. Recentemente, cresceu a voz de quem valoriza a autonomia. Também surgiu a expectativa de não forçar trabalho em feriados. No entanto, até uma nova norma se firmar, leva tempo. Há quem sinta que a imagem social é afetada ao não participar de uma confraternização. O importante é distinguir regra de costume. Quem quebra uma regra enfrenta uma consequência clara; o costume, porém, pode ser negociado. Quando a empresa declara suas expectativas por escrito e o indivíduo diz o limite que consegue cumprir, o peso de ambos diminui.",
    objective: "Separar regra escrita, costume e escolha pessoal, e identificar o custo social de cada uma.",
  },
  reusedIds: ["ko:회사", "ko:사람", "ko:시간"],
  grammar: [
    ["-도록 되어 있다 — estar estabelecido/previsto", "동사 + -도록 되어 있다", "Descreve uma regra, um sistema ou um combinado já estabelecido, não a intenção de quem fala. Compare com -기로 하다 (decisão tomada por alguém) e -게 되어 있다 (resultado natural ou arranjo). É comum em manuais, avisos e descrições de instituições. Registro: neutro a formal.", [["회의는 매주 월요일 열리도록 되어 있어요.", "As reuniões estão previstas para ocorrer toda segunda-feira."], ["신청서는 온라인으로 내도록 되어 있습니다.", "O formulário deve ser enviado on-line, conforme o sistema."]]],
    ["-곤 하다 — costumava/solia fazer", "동사 + -곤 하다", "Marca um hábito ou repetição no passado, ou um hábito recorrente no presente. Compare com -는 편이다 (tendência) e -기 마련이다 (resultado inevitável). Não use para uma ação única. Registro: neutro, levemente narrativo.", [["어릴 때 이 공원에서 놀곤 했어요.", "Quando criança, eu costumava brincar neste parque."], ["요즘은 점심을 집에서 먹곤 해요.", "Ultimamente costumo almoçar em casa."]]],
  ],
  guided: [
    mcq("Qual é o problema apontado na conversa?", ["As expectativas que não estão escritas.", "A falta de computadores.", "O excesso de férias."], "As expectativas que não estão escritas.", "말로만 전해지는 기대가 문제예요."),
    cloze("Complete a regra estabelecida: 회의는 매주 월요일 열리___ 되어 있어요.", "도록", "열리도록 되어 있다 = está previsto para ocorrer."),
    listen("Ouça e escreva o hábito de infância.", "어릴 때 이 공원에서 놀곤 했어요.", "어릴 때 이 공원에서 놀곤 했어요.", "Quando criança, eu costumava brincar neste parque."),
    reading("회사에는 문서로 정해진 규범이 있고, 말로만 전해지는 기대도 있다. 예를 들어 ‘회식은 참석하는 게 좋다’는 말은 규칙이 아니지만, 많은 사람이 지켜야 할 일처럼 느낀다.", "Por que as pessoas sentem pressão?", ["Porque há expectativas não escritas.", "Porque a empresa proíbe confraternizações.", "Porque não existe nenhuma regra."], "Porque há expectativas não escritas.", "말로만 전해지는 기대 때문에 눈치를 봐요."),
    translate("pt-ko", "Traduza: “As reuniões estão previstas para ocorrer toda segunda-feira.”", "회의는 매주 월요일 열리도록 되어 있어요.", "도록 되어 있다 descreve uma regra estabelecida.", ["회의는 매주 월요일에 열리도록 되어 있습니다."]),
  ],
  independent: [
    mcq("Qual frase descreve um hábito passado?", ["어릴 때 여기에서 놀곤 했어요.", "어릴 때 여기에서 놀았어요.", "내일 여기에서 놀 거예요."], "어릴 때 여기에서 놀곤 했어요.", "-곤 하다 marca repetição/hábito."),
    cloze("Complete o hábito: 요즘은 점심을 집에서 먹___ 해요.", "곤", "먹곤 해요 = costumo comer."),
    listen("Ouça e escreva a norma sobre o formulário.", "신청서는 온라인으로 내도록 되어 있습니다.", "신청서는 온라인으로 내도록 되어 있습니다.", "O formulário deve ser enviado on-line, conforme o sistema."),
    translate("ko-pt", "Traduza: 휴일 근무를 강요하지 말자는 기대감이 커졌어요.", "Cresceu a expectativa de não forçar trabalho em feriados.", "기대감 = expectativa; 강요하다 = forçar.", ["A expectativa de não obrigar a trabalhar em feriados aumentou."]),
    reading("중요한 것은 규칙과 관습을 구분하는 일이다. 규칙을 어기면 분명한 결과가 있지만, 관습은 협의할 수 있다. 회사가 기대를 문서로 밝히고, 개인이 지킬 수 있는 범위를 말할 때 서로의 부담이 줄어든다.", "O que reduz o peso das expectativas?", ["Distinguir regra de costume e negociar o que se pode cumprir.", "Ignorar todas as regras.", "Participar de todas as confraternizações."], "Distinguir regra de costume e negociar o que se pode cumprir.", "규칙과 관습을 구분하고 지킬 수 있는 범위를 말해요."),
  ],
  summary: ["-도록 되어 있다 descreve regra ou sistema estabelecido.", "-곤 하다 marca hábito ou repetição.", "Norma escrita e costume têm consequências diferentes.", "Conteúdo novo permanece em revisão."],
  production: production(
    "Produção independente · uma expectativa social",
    "Descreva uma expectativa que você sente no trabalho, na família ou na escola. Diga se ela é regra, costume ou escolha, e como você lida com ela.",
    "주변에서 느끼는 사회적 기대에 대해 써 보세요.",
    ["Apresente a expectativa.", "Diga se é regra ou costume.", "Use -도록 되어 있다 ou -곤 하다.", "Explique seu limite ou sua escolha."],
    ["Expectativa clara.", "Distinção entre regra e costume.", "Uma forma da lição.", "Limite pessoal explícito.", "Conclusão sem generalização absoluta."],
    "저는 회사에서 회식에 꼭 참석해야 한다는 분위기를 느껴요. 문서에 정해진 규칙은 아니지만, 많은 사람이 당연하게 생각해요. 저는 예전에는 눈치를 보느라 매번 참석곤 했어요. 지금은 중요한 일이 있으면 미리 양해를 구하고, 참석할 수 있는 범위를 말해요. 규칙과 관습을 구분하면 부담이 조금 줄어드는 것 같아요.",
    "Na empresa, sinto um clima de que é obrigatório participar das confraternizações. Não é uma regra escrita, mas muitas pessoas acham natural. Antes, eu costumava participar sempre, com medo do que os outros pensariam. Agora, quando tenho algo importante, peço compreensão com antecedência e digo até onde consigo participar. Acho que, ao distinguir regra de costume, o peso diminui um pouco.",
    "Exemplo original de cinco frases. Note a distinção entre regra e costume e o limite pessoal no final. Compare a estrutura.",
  ),
});

/** b2-l12 — comparação cultural sem estereótipos. */
export const B2_L12 = defineB2Lesson({
  id: "b2-l12", number: 12, moduleId: "b2-m03", title: "Não é assim em todo lugar",
  objective: "Comparar práticas culturais sem generalizações absolutas.",
  prerequisites: ["b2-l11"], estimatedMinutes: 75, dialogueTitle: "Duas maneiras de morar",
  intro: [
    { title: "Diferentemente de", body: "-와/과 달리 compara um caso com outro de forma direta: “diferentemente de...”. Pode seguir um substantivo ou uma situação nominalizada. Compare com -에 비해 (em comparação com, mais neutro) e -는 반면 (contraste entre orações).", ko: "한국과 달리 브라질에서는 인사할 때 포옹을 하기도 해요." },
    { title: "Enquanto, por outro lado", body: "-ㄴ/는 반면 contrasta dois fatos. Use -는 반면 com verbos e -ㄴ/은 반면 com adjetivos. Compare com -지만, que é uma concessão, e com -에 비해, que compara graus. A forma é típica de texto explicativo e não exige que um lado seja melhor.", ko: "도시는 편리한 반면 공기가 나빠요." },
  ],
  dialogue: [
    ["아나", "한국에서는 가족과 함께 사는 사람이 많다고 들었어요.", "Ouvi dizer que na Coreia muita gente mora com a família."],
    ["민수", "그런 편이에요. 하지만 모든 사람이 그런 건 아니에요. 혼자 사는 사람도 빠르게 늘고 있어요.", "É comum, mas não é todo mundo. O número de pessoas que moram sozinhas também cresce rápido."],
    ["아나", "브라질과 달리 식사 시간이 꽤 규칙적인 것 같아요.", "Parece que os horários das refeições são bem mais regulares do que no Brasil."],
    ["민수", "맞아요. 회사 생활에서는 점심시간이 정해져 있는 반면, 주말에는 자유로운 편이에요.", "Sim. No trabalho, o horário de almoço é fixo; nos fins de semana, é mais livre."],
    ["아나", "문화를 비교할 때 조심해야 할 점이 있을까요?", "Há algo com que se preocupar ao comparar culturas?"],
    ["민수", "편견이나 고정관념으로 단정하지 않는 게 중요해요. 같은 문화권 안에서도 세대와 지역에 따라 달라요.", "É importante não afirmar com base em preconceito ou estereótipo. Dentro da mesma cultura, muda conforme a geração e a região."],
    ["아나", "그럼 어떻게 비교하면 좋을까요?", "Então como é bom comparar?"],
    ["민수", "구체적인 관습을 접근해서 설명하고, 상호 이해와 포용의 태도를 가지면 좋아요. 서로 다른 방식이 공존할 수 있다는 점도 인정하고요. 두 문화의 유사한 점을 찾는 것도 도움이 돼요.", "É bom abordar e explicar costumes concretos, com atitude de compreensão mútua e acolhimento. E reconhecer que modos diferentes podem coexistir. Encontrar pontos semelhantes entre as duas culturas também ajuda."],
  ],
  readingText: {
    titlePt: "Duas maneiras de morar",
    paragraphs: [
      "한국에 온 지 얼마 되지 않았을 때, 나는 식사 예절에서 작은 혼란을 겪었다. 내가 자란 문화권에서는 접시를 들고 먹는 것이 자연스러웠지만, 여기서는 그렇지 않았다. 두 방식 중 어느 쪽이 더 옳다고 말하기는 어렵다.",
      "문화를 비교할 때 편견이나 고정관념이 끼어들기 쉽다. ‘이 문화는 원래 그렇다’고 단정하면 개인의 차이를 지운다. 대신 구체적인 관습을 비교하고, 세대와 지역에 따라 달라질 수 있다는 점을 인정해야 한다.",
      "차이를 접근하는 방식도 중요하다. 상호 이해와 포용의 태도가 있으면 갈등은 줄어든다. 서로 다른 방식이 공존할 수 있다는 사실을 받아들일 때, 비교는 우열이 아니라 설명이 된다. 두 문화의 유사한 점을 찾는 것도 도움이 된다.",
    ],
    pt: "Quando cheguei à Coreia, tive uma pequena confusão com etiqueta à mesa. Na cultura em que cresci, era natural comer segurando o prato; aqui, não era. É difícil dizer qual dos dois modos é mais correto. Ao comparar culturas, é fácil deixar entrar preconceito ou estereótipo. Afirmar que “esta cultura é assim por natureza” apaga as diferenças individuais. Em vez disso, é preciso comparar costumes concretos e reconhecer que eles podem variar conforme a geração e a região. A forma de abordar a diferença também importa. Com compreensão mútua e acolhimento, o conflito diminui. Quando aceitamos que modos diferentes podem coexistir, a comparação deixa de ser uma hierarquia e passa a ser uma explicação. Encontrar pontos semelhantes entre as duas culturas também ajuda.",
    objective: "Identificar o critério da comparação e a ressalva que evita a generalização.",
  },
  reusedIds: ["ko:문화", "ko:차이", "ko:생활"],
  grammar: [
    ["-와/과 달리 — diferentemente de", "명사 + 와/과 달리", "Compara um caso com outro de forma direta: “diferentemente de...”. Compare com -에 비해 (comparação de grau, mais neutra) e -는 반면 (contraste entre orações). Pode seguir um substantivo ou uma situação nominalizada. Registro: neutro, comum em textos explicativos.", [["한국과 달리 브라질에서는 인사할 때 포옹을 하기도 해요.", "Diferentemente da Coreia, no Brasil às vezes se abraça ao cumprimentar."], ["예전과 달리 지금은 혼자 사는 사람이 많아요.", "Diferentemente do passado, hoje muitas pessoas moram sozinhas."]]],
    ["-ㄴ/는 반면 — enquanto, por outro lado", "동사 + -는 반면 / 형용사 + -ㄴ/은 반면", "Contrasta dois fatos sem transformar um lado em concessão. Use -는 반면 com verbos e -ㄴ/은 반면 com adjetivos. Compare com -지만 (concessão) e -에 비해 (comparação de grau). É típico de texto explicativo e não exige que um lado seja melhor. Registro: neutro a formal.", [["도시는 편리한 반면 공기가 나빠요.", "A cidade é prática, por outro lado o ar é ruim."], ["그 제품은 가격이 비싼 반면 품질이 좋아요.", "Aquele produto é caro, em contrapartida a qualidade é boa."]]],
  ],
  guided: [
    mcq("O que a comparação do texto evita?", ["Transformar uma prática em regra para todos.", "Falar de comida.", "Mencionar diferenças regionais."], "Transformar uma prática em regra para todos.", "편견이나 고정관념으로 단정하지 않아요."),
    cloze("Complete a comparação: 한국___ 달리 브라질에서는 포옹을 하기도 해요.", "과", "한국과 달리 = diferentemente da Coreia."),
    listen("Ouça e escreva o contraste entre cidade e campo.", "도시는 편리한 반면 공기가 나빠요.", "도시는 편리한 반면 공기가 나빠요.", "A cidade é prática; por outro lado, o ar é ruim."),
    reading("한국에 온 지 얼마 되지 않았을 때, 나는 식사 예절에서 작은 혼란을 겪었다. 내가 자란 문화권에서는 접시를 들고 먹는 것이 자연스러웠지만, 여기서는 그렇지 않았다. 두 방식 중 어느 쪽이 더 옳다고 말하기는 어렵다.", "O que causou a confusão?", ["Uma diferença concreta de etiqueta à mesa.", "A falta de restaurantes.", "A língua coreana."], "Uma diferença concreta de etiqueta à mesa.", "식사 예절에서 작은 혼란을 겪었어요."),
    translate("pt-ko", "Traduza: “Diferentemente do passado, hoje muitas pessoas moram sozinhas.”", "예전과 달리 지금은 혼자 사는 사람이 많아요.", "과 달리 compara passado e presente.", ["예전과 달리 요즘은 혼자 사는 사람이 많아요."]),
  ],
  independent: [
    mcq("Qual frase contrasta dois fatos sem dizer que um é melhor?", ["도시는 편리한 반면 공기가 나빠요.", "도시는 편리해서 최고예요.", "도시가 시골보다 훨씬 좋아요."], "도시는 편리한 반면 공기가 나빠요.", "-ㄴ/는 반면 apresenta contraste, não hierarquia."),
    cloze("Complete o contraste: 그 제품은 가격이 비싼 ___ 품질이 좋아요.", "반면", "비싼 반면 = em contrapartida, é caro."),
    listen("Ouça e escreva a comparação com o passado.", "예전과 달리 지금은 혼자 사는 사람이 많아요.", "예전과 달리 지금은 혼자 사는 사람이 많아요.", "Diferentemente do passado, hoje muitas pessoas moram sozinhas."),
    translate("ko-pt", "Traduza: 문화를 비교할 때 편견이나 고정관념으로 단정하면 안 돼요.", "Ao comparar culturas, não se deve afirmar com base em preconceito ou estereótipo.", "편견 = preconceito; 고정관념 = estereótipo.", ["Não se deve generalizar culturas com preconceito ou estereótipo."]),
    reading("차이를 접근하는 방식도 중요하다. 상호 이해와 포용의 태도가 있으면 갈등은 줄어든다. 서로 다른 방식이 공존할 수 있다는 사실을 받아들일 때, 비교는 우열이 아니라 설명이 된다. 두 문화의 유사한 점을 찾는 것도 도움이 된다.", "Como a comparação deve ser feita?", ["Como explicação, não como hierarquia.", "Como competição entre culturas.", "Como uma lista de regras fixas."], "Como explicação, não como hierarquia.", "비교는 우열이 아니라 설명이 된다."),
  ],
  summary: ["-와/과 달리 compara diretamente dois casos.", "-ㄴ/는 반면 contrasta fatos sem hierarquia.", "Comparar exige ressalva e contexto.", "Conteúdo novo permanece em revisão."],
  production: production(
    "Produção independente · comparar duas práticas",
    "Compare duas práticas culturais que você conhece (moradia, refeição, cumprimento ou estudo). Use um critério concreto e uma ressalva.",
    "두 문화의 구체적인 관습을 비교해 보세요.",
    ["Escolha práticas concretas, não povos.", "Use -와/과 달리 ou -ㄴ/는 반면.", "Reconheça variação de geração ou região.", "Evite dizer que um lado é superior."],
    ["Duas práticas concretas.", "Critério de comparação.", "Uma forma da lição.", "Ressalva contra generalização.", "Conclusão descritiva."],
    "한국에서는 식사할 때 밥그릇을 들지 않는 경우가 많아요. 브라질과 달리 접시를 입 가까이 들고 먹는 모습도 낯설 수 있어요. 하지만 같은 문화권 안에서도 가정마다 다르고, 세대에 따라 방식이 달라져요. 그래서 저는 한 가지 예절만 보고 전체 문화를 판단하지 않으려고 해요.",
    "Na Coreia, em muitas situações não se levanta a tigela de arroz ao comer. Diferentemente do Brasil, pode ser estranho ver alguém levantar o prato até perto da boca. Mas, dentro da mesma cultura, cada família é diferente, e o modo muda conforme a geração. Por isso, procuro não julgar toda uma cultura por uma única etiqueta.",
    "Exemplo original de quatro frases. A comparação é concreta e termina com uma ressalva. Compare o critério e o cuidado contra generalização.",
  ),
});

/** b2-l13 — limites e pedidos. */
export const B2_L13 = defineB2Lesson({
  id: "b2-l13", number: 13, moduleId: "b2-m03", title: "Onde fica o limite?",
  objective: "Negociar limites pessoais com pedidos claros e polidez.",
  prerequisites: ["b2-l12"], estimatedMinutes: 75, dialogueTitle: "O empréstimo",
  intro: [
    { title: "Deveria / vou fazer", body: "-아/어야지요 pode expressar obrigação ou conselho (“deveria...”) e também autocompromisso (“vou fazer...”). O tom pode soar como leve cobrança. Compare com -아/어야 해요, mais forte, e -는 게 좋겠다, sugestão neutra. Registro: oral, polido.", ko: "약속을 지켜야지요." },
    { title: "Por que não...?", body: "-지 그래요? sugere algo que o interlocutor não fez, com leve reprovação: “por que não...?”. Compare com -(으)ㄹ래요? (convite) e -는 게 어때요? (sugestão neutra). Não use com uma pessoa de hierarquia superior em contexto formal. Registro: oral, familiar.", ko: "피곤하면 좀 쉬지 그래요?" },
  ],
  dialogue: [
    ["지민", "요즘 왜 그렇게 피곤해 보여요?", "Por que você parece tão cansada ultimamente?"],
    ["수진", "친구가 자주 물건을 빌려 가서 부담감을 느껴요.", "Uma amiga vive pedindo coisas emprestadas, e eu sinto peso."],
    ["지민", "거절하면 되잖아요.", "É só recusar."],
    ["수진", "관계를 깨고 싶지 않아서 솔직하게 말하지 못했어요. 작은 서운함이 쌓였어요.", "Não queria romper a relação, então não conseguia falar com sinceridade. Pequenas mágoas foram se acumulando."],
    ["지민", "그럴 때는 필요한 범위를 말해 보지 그래요?", "Nessas horas, por que não dizer até onde você pode ajudar?"],
    ["수진", "어제는 용기를 내서 이야기했어요. “미리 말해 주면 좋겠어”라고 표현했더니 마음이 후련했어요.", "Ontem criei coragem e conversei. Quando expressei “gostaria que você avisasse antes”, meu coração ficou mais leve."],
    ["지민", "친구는 뭐라고 했어요?", "O que a amiga disse?"],
    ["수진", "자기 상황을 설명했어요. 우리는 시간을 조율해서 규칙을 정했어요. 친구 사이에도 경계선이 필요하다는 걸 배웠어요. 배려심은 참는 게 아니라 함께 범위를 만드는 거예요.", "Ela explicou a situação dela. Combinamos os horários e definimos uma regra. Aprendi que até entre amigos é preciso haver limites. Consideração não é engolir tudo, mas construir juntos o limite."],
  ],
  readingText: {
    titlePt: "Dizer o limite sem romper a relação",
    paragraphs: [
      "친구가 자주 물건을 빌려 가서 나는 부담감을 느꼈다. 거절하고 싶었지만, 관계를 깨고 싶지 않아 솔직하게 말하지 못했다. 시간이 지나면서 작은 서운함이 쌓였다.",
      "어느 날 나는 조심스럽게 이야기를 꺼냈다. “나는 네가 필요할 때 빌려주고 싶지만, 미리 말해 주면 좋겠어.” 감정을 표현하니 마음이 후련했고, 친구도 자신의 상황을 설명했다.",
      "우리는 서로 시간을 조율해서 규칙을 정했다. 친구 사이에도 경계선이 필요하다는 것을 배웠다. 배려심은 참는 것이 아니라, 서로 지킬 수 있는 범위를 함께 만드는 일이다. 솔직한 대화가 관계를 더 오래 지켜 준다. 그래서 우리는 한 달에 한 번 서로의 상황을 이야기하기로 했다.",
    ],
    pt: "Uma amiga vivia pedindo objetos emprestados, e eu sentia peso. Queria recusar, mas, para não romper a relação, não conseguia falar com sinceridade. Com o tempo, pequenas mágoas foram se acumulando. Um dia, puxei o assunto com cuidado. “Quero emprestar quando você precisar, mas gostaria que avisasse antes.” Quando expressei o sentimento, meu coração ficou mais leve, e a amiga também explicou a situação dela. Combinamos os horários e definimos uma regra. Aprendi que até entre amigos é preciso haver limites. Consideração não é engolir tudo, mas construir juntos o limite que cada um consegue cumprir. Uma conversa sincera protege a relação por mais tempo.",
    objective: "Identificar o limite, o pedido e a solução que preserva a relação.",
  },
  reusedIds: ["ko:친구", "ko:시간", "ko:감정"],
  grammar: [
    ["-아/어야지요 — deveria / vou fazer", "동사/형용사 + -아/어야지요", "Pode expressar obrigação ou conselho (“deveria...”) e autocompromisso (“vou fazer...”). O tom pode soar como leve cobrança. Compare com -아/어야 해요, mais forte, e -는 게 좋겠다, sugestão neutra. Registro: oral, polido.", [["약속을 지켜야지요.", "É preciso cumprir o combinado."], ["저도 이제 준비해야지요.", "Agora eu também preciso me preparar."]]],
    ["-지 그래요? — por que não...?", "동사 + -지 그래요?", "Sugere algo que o interlocutor não fez, com leve reprovação: “por que não...?”. Compare com -(으)ㄹ래요? (convite) e -는 게 어때요? (sugestão neutra). Não use com alguém de hierarquia superior em contexto formal. Registro: oral, familiar.", [["피곤하면 좀 쉬지 그래요?", "Se está cansado, por que não descansa um pouco?"], ["모르면 물어보지 그래요?", "Se não sabe, por que não pergunta?"]]],
  ],
  guided: [
    mcq("Por que Sujin não recusou antes?", ["Porque não queria romper a relação.", "Porque não gostava da amiga.", "Porque não tinha objetos."], "Porque não queria romper a relação.", "관계를 깨고 싶지 않아서 말하지 못했어요."),
    cloze("Complete o conselho: 필요한 범위를 말해 보___ 그래요?", "지", "말해 보지 그래요? = por que não tenta dizer?"),
    listen("Ouça e escreva o sentimento depois da conversa.", "이야기하고 나니 마음이 후련했어요.", "이야기하고 나니 마음이 후련했어요.", "Depois de conversar, meu coração ficou mais leve."),
    reading("친구가 자주 물건을 빌려 가서 나는 부담감을 느꼈다. 거절하고 싶었지만 관계를 깨고 싶지 않아 솔직하게 말하지 못했다. 시간이 지나면서 작은 서운함이 쌓였다.", "Qual era o problema da narradora?", ["Ela sentia peso e não expressava o limite.", "Ela não tinha amigos.", "Ela emprestava tudo sem se importar."], "Ela sentia peso e não expressava o limite.", "부담감을 느꼈지만 솔직하게 말하지 못했어요."),
    translate("pt-ko", "Traduza: “É preciso cumprir o combinado.”", "약속을 지켜야지요.", "-아/어야지요 expressa obrigação/conselho.", ["약속을 지켜야 해요."]),
  ],
  independent: [
    mcq("Qual frase sugere com leve reprovação?", ["피곤하면 좀 쉬지 그래요?", "같이 쉬어요.", "쉬는 게 좋아요."], "피곤하면 좀 쉬지 그래요?", "-지 그래요? sugere algo que a pessoa não fez."),
    cloze("Complete o autocompromisso: 저도 이제 준비___지요.", "해야", "준비해야지요 = agora eu também preciso me preparar."),
    listen("Ouça e escreva o limite combinado.", "친구 사이에도 경계선이 필요해요.", "친구 사이에도 경계선이 필요해요.", "Até entre amigos é preciso haver limites."),
    translate("ko-pt", "Traduza: 배려심은 참는 게 아니라 함께 범위를 만드는 거예요.", "Consideração não é engolir tudo, mas construir juntos o limite.", "배려심 = consideração; 범위 = limite/escopo.", ["Ter consideração não é só aguentar; é construir o limite junto."]),
    reading("우리는 서로 시간을 조율해서 규칙을 정했다. 친구 사이에도 경계선이 필요하다는 것을 배웠다. 배려심은 참는 것이 아니라, 서로 지킬 수 있는 범위를 함께 만드는 일이다.", "O que é consideração no texto?", ["Construir juntos um limite que ambos possam cumprir.", "Nunca dizer não.", "Evitar todos os conflitos."], "Construir juntos um limite que ambos possam cumprir.", "서로 지킬 수 있는 범위를 함께 만드는 일."),
  ],
  summary: ["-아/어야지요 expressa obrigação, conselho ou autocompromisso.", "-지 그래요? sugere com leve reprovação.", "Limite claro preserva a relação.", "Conteúdo novo permanece em revisão."],
  production: production(
    "Produção independente · um limite pessoal",
    "Escreva uma mensagem a alguém próximo dizendo um limite. Inclua o contexto, o que você sente, o pedido e uma alternativa.",
    "가까운 사람에게 경계를 말하는 메시지를 써 보세요.",
    ["Descreva a situação sem acusar.", "Diga o que você sente.", "Faça um pedido concreto.", "Ofereça uma alternativa."],
    ["Contexto claro.", "Sentimento expresso sem acusação.", "Pedido concreto.", "Alternativa oferecida.", "Relação preservada."],
    "지민아, 요즘 네가 급하게 물건을 빌려 달라고 할 때 내가 준비하지 못할 때가 있어. 그래서 조금 부담을 느껴. 다음부터는 하루 전에 말해 줄 수 있을까? 급할 때는 내가 가진 것 중에서 먼저 빌려줄게.",
    "Jimin, ultimamente, quando você pede algo emprestado com pressa, às vezes eu não consigo me preparar. Por isso, sinto um pouco de peso. Da próxima vez, você poderia me avisar um dia antes? Quando for urgente, empresto primeiro o que eu tiver.",
    "Exemplo original de três frases. O pedido é concreto e vem com alternativa; não há acusação. Compare o tom.",
  ),
});

/** b2-l14 — problema social, causa e proposta. */
export const B2_L14 = defineB2Lesson({
  id: "b2-l14", number: 14, moduleId: "b2-m03", title: "O problema não é só seu",
  objective: "Descrever um problema social com causa, impacto e proposta viável.",
  prerequisites: ["b2-l13"], estimatedMinutes: 80, dialogueTitle: "A reunião de moradores",
  intro: [
    { title: "A situação é que", body: "-는 실정이다 descreve uma situação atual indesejável de forma formal: “a situação é que...”. Use -는 실정 com verbos e -ㄴ/은 실정 com adjetivos. Compare com -는 상황이다 (neutro) e -는 편이다 (tendência). Registro: escrito/formal.", ko: "대기자가 백 명이 넘는 실정이에요." },
    { title: "Mesmo fazendo...", body: "-고도 mostra que, mesmo depois de fazer algo, o resultado esperado não acontece: “mesmo fazendo... e ainda assim...”. Compare com -고서도 (mesmo depois de fazer) e -에도 불구하고 (apesar de um substantivo/fato). Registro: neutro a formal.", ko: "돈을 들이고도 해결되지 않았어요." },
  ],
  dialogue: [
    ["아나", "이 동네 교통 문제가 심각하다면서요?", "Ouvi dizer que o problema de transporte deste bairro é grave."],
    ["민수", "네. 교통 인프라가 부족한 실정이에요. 버스는 자주 끊기고, 지하철역까지는 걸어서 삼십 분이 걸려요.", "Sim. A situação é de infraestrutura de transporte insuficiente. Os ônibus param com frequência e até a estação de metrô são trinta minutos a pé."],
    ["아나", "주거 비용도 오르고 있죠?", "Os custos de moradia também estão subindo, certo?"],
    ["민수", "맞아요. 주거비가 오르는데 교통 문제까지 겹쳐서 생활이 어려워졌어요.", "Exato. Com o custo de moradia subindo e o problema de transporte se somando, a vida ficou difícil."],
    ["아나", "시에서는 뭐라고 해요?", "O que a prefeitura diz?"],
    ["민수", "예산 부족을 이유로 공사를 미뤘어요. 문제를 인정하고도 해결을 미루면 신뢰가 떨어져요.", "Adiou a obra alegando falta de orçamento. Quando reconhecem o problema e ainda assim adiam a solução, a confiança cai."],
    ["아나", "주민들은 어떻게 했어요?", "E os moradores, o que fizeram?"],
    ["민수", "구체적인 대책을 요구했어요. 상황이 악화되면서 공사가 장기화됐지만, 대화를 통해 우선순위를 정할 수 있었어요. 문제는 직면했다고 끝나지 않아요.", "Exigiram medidas concretas. Com a situação piorando, a obra se prolongou, mas conseguimos definir prioridades por meio do diálogo. O problema não termina só porque foi enfrentado."],
  ],
  readingText: {
    titlePt: "Quando o problema deixa de ser individual",
    paragraphs: [
      "우리 동네는 교통 인프라가 부족한 실정이다. 버스는 자주 끊기고, 지하철역까지는 걸어서 삼십 분이 걸린다. 주거 비용은 계속 오르는데, 대중교통 문제까지 겹쳐 생활이 어려워졌다.",
      "시는 예산 부족을 이유로 공사를 미뤘다. 그러나 주민들은 이미 오래 기다렸다. 문제를 인정하고도 해결을 미루면 신뢰가 떨어진다. 상황이 악화되면서 아이를 학교에 보내는 일도 힘들어졌다.",
      "주민들은 구체적인 대책을 요구했다. 버스 노선을 늘리고, 임시 주차 공간을 마련하자는 제안이 나왔다. 공사가 장기화되면서 불편이 커졌지만, 대화를 통해 우선순위를 정할 수 있었다. 문제는 직면했다고 끝나지 않는다.",
    ],
    pt: "A situação do nosso bairro é de infraestrutura de transporte insuficiente. Os ônibus param com frequência, e até a estação de metrô são trinta minutos a pé. O custo de moradia continua subindo e, somado ao problema do transporte, a vida ficou difícil. A prefeitura adiou a obra alegando falta de orçamento. Mas os moradores já esperavam há muito tempo. Quando reconhecem o problema e ainda assim adiam a solução, a confiança cai. Com o agravamento da situação, até levar as crianças à escola ficou difícil. Os moradores exigiram medidas concretas. Surgiram propostas para aumentar as linhas de ônibus e criar vagas temporárias. A obra se prolongou e o incômodo aumentou, mas o diálogo permitiu definir prioridades. Um problema não termina só porque foi enfrentado.",
    objective: "Identificar o problema, a causa institucional, o impacto e a proposta dos moradores.",
  },
  reusedIds: ["ko:문제", "ko:교통", "ko:생활"],
  grammar: [
    ["-는 실정이다 — a situação é que", "동사 + -는 실정이다 / 형용사 + -ㄴ/은 실정이다", "Descreve uma situação atual indesejável de forma formal: “a situação é que...”. Compare com -는 상황이다 (neutro) e -는 편이다 (tendência). É comum em reportagens, relatórios e reclamações cidadãs. Registro: escrito/formal.", [["대기자가 백 명이 넘는 실정이에요.", "A situação é que há mais de cem pessoas na fila de espera."], ["예산이 부족한 실정입니다.", "A situação é de falta de orçamento."]]],
    ["-고도 — mesmo fazendo, ainda assim", "동사 + -고도", "Mostra que, mesmo depois de fazer algo, o resultado esperado não acontece. Compare com -고서도 (mesmo depois de fazer, com foco na sequência) e -에도 불구하고 (apesar de substantivo/fato). Registro: neutro a formal.", [["돈을 들이고도 해결되지 않았어요.", "Mesmo gastando dinheiro, não foi resolvido."], ["알고도 모르는 척했어요.", "Mesmo sabendo, fingiu que não sabia."]]],
  ],
  guided: [
    mcq("Qual é o problema principal do bairro?", ["Infraestrutura de transporte insuficiente.", "Excesso de ônibus.", "Falta de escolas."], "Infraestrutura de transporte insuficiente.", "교통 인프라가 부족한 실정이에요."),
    cloze("Complete a situação formal: 대기자가 백 명이 넘___ 실정이에요.", "는", "넘는 실정 = a situação é que passa de cem."),
    listen("Ouça e escreva a causa apontada pela prefeitura.", "예산 부족을 이유로 공사를 미뤘어요.", "예산 부족을 이유로 공사를 미뤘어요.", "Adiaram a obra alegando falta de orçamento."),
    reading("우리 동네는 교통 인프라가 부족한 실정이다. 버스는 자주 끊기고, 지하철역까지는 걸어서 삼십 분이 걸린다. 주거 비용은 계속 오르는데, 대중교통 문제까지 겹쳐 생활이 어려워졌다.", "Qual é o impacto combinado?", ["Custo de moradia e transporte difícil tornam a vida dura.", "Só o transporte é caro.", "Os moradores não precisam de ônibus."], "Custo de moradia e transporte difícil tornam a vida dura.", "주거비 상승과 교통 문제가 겹쳤어요."),
    translate("pt-ko", "Traduza: “A situação é que há mais de cem pessoas na fila.”", "대기자가 백 명이 넘는 실정이에요.", "-는 실정이다 descreve a situação atual.", ["대기자가 백 명이 넘는 상황이에요."]),
  ],
  independent: [
    mcq("Qual frase expressa “mesmo fazendo, não resolveu”?", ["돈을 들이고도 해결되지 않았어요.", "돈을 들여서 해결됐어요.", "돈이 들면 해결될 거예요."], "돈을 들이고도 해결되지 않았어요.", "-고도 marca o contraste entre ação e resultado."),
    cloze("Complete o contraste: 돈을 들이___ 해결되지 않았어요.", "고도", "들이고도 = mesmo gastando."),
    listen("Ouça e escreva a proposta dos moradores.", "주민들은 구체적인 대책을 요구했어요.", "주민들은 구체적인 대책을 요구했어요.", "Os moradores exigiram medidas concretas."),
    translate("ko-pt", "Traduza: 문제를 인정하고도 해결을 미루면 신뢰가 떨어져요.", "Quando reconhecem o problema e ainda assim adiam a solução, a confiança cai.", "인정하고도 = mesmo reconhecendo.", ["Se admitem o problema mas adiam a solução, a confiança cai."]),
    reading("주민들은 구체적인 대책을 요구했다. 버스 노선을 늘리고, 임시 주차 공간을 마련하자는 제안이 나왔다. 공사가 장기화되면서 불편이 커졌지만, 대화를 통해 우선순위를 정할 수 있었다.", "Como os moradores avançaram?", ["Com propostas concretas e definição de prioridades.", "Esperando sem falar nada.", "Mudando de bairro."], "Com propostas concretas e definição de prioridades.", "구체적인 대책과 우선순위를 levaram adiante."),
  ],
  summary: ["-는 실정이다 descreve uma situação indesejável.", "-고도 mostra que a ação não bastou.", "Problema social exige causa, impacto e proposta.", "Conteúdo novo permanece em revisão."],
  production: production(
    "Produção independente · um problema do bairro",
    "Descreva um problema coletivo em cinco a sete frases: situação, causa, impacto e proposta. Use -는 실정이다 ou -고도.",
    "우리 동네의 문제를 설명하고 해결책을 제안해 보세요.",
    ["Descreva a situação com um dado concreto.", "Explique a causa institucional.", "Mostre o impacto em grupos diferentes.", "Proponha uma medida viável."],
    ["Situação clara.", "Causa e impacto distinguidos.", "Uma forma da lição.", "Proposta específica.", "Conclusão sem generalização."],
    "우리 동네는 대중교통이 부족한 실정이에요. 버스 배차 간격이 길고, 지하철역까지 걷는 시간이 오래 걸려요. 그런데 예산을 이유로 노선 확대가 계속 미뤄지고 있어요. 저는 우선 출퇴근 시간에만이라도 버스를 늘리는 시범 운행을 제안해요.",
    "Nosso bairro está em uma situação de transporte público insuficiente. O intervalo dos ônibus é longo e o tempo a pé até a estação de metrô é grande. No entanto, a ampliação das linhas segue adiada por causa do orçamento. Proponho primeiro uma operação piloto com mais ônibus, ao menos no horário de pico.",
    "Exemplo original de quatro frases. O problema, a causa e a proposta são concretos. Compare a estrutura.",
  ),
});

/** b2-l15 — inferência e leitura de intenção. */
export const B2_L15 = defineB2Lesson({
  id: "b2-l15", number: 15, moduleId: "b2-m03", title: "Lendo nas entrelinhas",
  objective: "Interpretar intenções indiretas e distinguir inferência de certeza.",
  prerequisites: ["b2-l14"], estimatedMinutes: 75, dialogueTitle: "O que ele quis dizer?",
  intro: [
    { title: "Parece que", body: "-ㄴ/는 듯하다 expressa aparência ou suposição: “parece que...”. É mais escrito que -것 같다. Use -는 듯 com verbos, -ㄴ/은 듯 com adjetivos e -인 듯 com substantivos. Compare com -ㄴ/는 모양이다, que infere a partir da aparência.", ko: "비가 오는 듯해요." },
    { title: "A julgar por", body: "-ㄴ/는 것으로 보아 introduz uma inferência baseada em evidência: “a julgar por...”. A segunda oração é uma suposição. Compare com -ㄴ/는 것으로 보이다 (parece) e -때문에 (causa). Registro: neutro a formal.", ko: "사람들이 우산을 쓰는 것으로 보아 비가 오나 봐요." },
  ],
  dialogue: [
    ["마르코", "회의 끝나고 수진 씨가 “생각해 볼게요”라고 했죠?", "No fim da reunião, a Sujin disse “vou pensar”, certo?"],
    ["아나", "네. 저는 긍정으로 들었어요.", "Sim. Eu entendi como positivo."],
    ["마르코", "그런데 다른 사람은 거절의 뉘앙스로 받아들였어요.", "Mas outra pessoa entendeu como um tom de recusa."],
    ["아나", "같은 말도 다르게 해석될 수 있네요.", "A mesma frase pode ser interpretada de forma diferente."],
    ["마르코", "그 말의 의중을 정확히 알기 어려웠어요. 문장이 여러 가능성을 함축하고 있었거든요.", "Era difícil saber com precisão a intenção daquelas palavras. A frase implicava várias possibilidades."],
    ["아나", "완곡하게 거절하는 표현이었을 수도 있겠네요.", "Pode ter sido uma forma educada de recusar."],
    ["마르코", "저는 분위기가 이상하다는 걸 눈치채고 나중에 따로 물어봤어요. 상대는 은근히 시간이 부족하다고 말하고 있었어요.", "Percebi que o clima estava estranho e perguntei separadamente depois. A pessoa estava dizendo, de forma sutil, que não tinha tempo."],
    ["아나", "역시 의도를 추측만 하지 말고 확인해야겠네요.", "Então é melhor não só supor a intenção, mas confirmar."],
  ],
  readingText: {
    titlePt: "O que a frase não diz diretamente",
    paragraphs: [
      "회의가 끝난 뒤 동료가 “생각해 볼게요”라고 말했다. 나는 긍정으로 들었지만, 다른 사람은 거절의 뉘앙스로 받아들였다. 같은 말도 상황과 관계에 따라 다르게 해석된다.",
      "그 말의 의중을 정확히 알기 어려웠다. 문장은 여러 가능성을 함축하고 있었다. 완곡하게 거절하는 문화에서는 직접적인 ‘싫어요’보다 이런 표현이 흔하다. 직설적인 표현이 부담스러울 때도 있다.",
      "나는 분위기가 이상하다는 것을 눈치채고, 나중에 따로 물어보았다. 상대는 은근히 시간이 부족하다고 말하고 있었다. 의도를 추측만 하지 않고 확인하자 오해가 줄었다. 말의 표면보다 맥락을 보는 일이 중요하다. 맥락을 보는 연습이 필요하다.",
    ],
    pt: "Depois da reunião, uma colega disse “vou pensar”. Eu entendi como resposta positiva, mas outra pessoa recebeu aquilo como um tom de recusa. A mesma frase pode ser interpretada de modo diferente conforme a situação e a relação. Era difícil saber com precisão a intenção daquelas palavras. A frase implicava várias possibilidades. Em culturas que recusam de forma indireta, essa expressão é mais comum do que um “não” direto. Às vezes, uma fala direta também pode soar pesada. Percebi que o clima estava estranho e, depois, perguntei em particular. A pessoa estava dizendo, de forma sutil, que não tinha tempo. Quando confirmei em vez de apenas supor, o mal-entendido diminuiu. Mais importante do que a superfície da fala é olhar o contexto.",
    objective: "Inferir a intenção provável e localizar a pista textual que sustenta a inferência.",
  },
  reusedIds: ["ko:회의", "ko:사람", "ko:해석"],
  grammar: [
    ["-ㄴ/는 듯하다 — parece que", "동사 + -는 듯하다 / 형용사 + -ㄴ/은 듯하다 / 명사 + 인 듯하다", "Expressa aparência ou suposição: “parece que...”. É mais escrito que -것 같다. Compare com -ㄴ/는 모양이다, que infere a partir da aparência, e com -ㄴ/는 것으로 보이다, que é mais impessoal. Registro: escrito/neutro.", [["비가 오는 듯해요.", "Parece que está chovendo."], ["그는 이미 알고 있는 듯했다.", "Ele parecia já saber."]]],
    ["-ㄴ/는 것으로 보아 — a julgar por", "동사 + -는 것으로 보아 / 형용사 + -ㄴ/은 것으로 보아", "Introduz uma inferência baseada em evidência: “a julgar por...”. A segunda oração é uma suposição, não um fato. Compare com -ㄴ/는 것으로 보이다 (parece) e -때문에 (causa). Registro: neutro a formal.", [["사람들이 우산을 쓰는 것으로 보아 비가 오나 봐요.", "A julgar pelas pessoas usando guarda-chuva, parece que está chovendo."], ["늦게 온 것으로 보아 교통이 막혔나 봐요.", "A julgar por ter chegado tarde, o trânsito deve ter travado."]]],
  ],
  guided: [
    mcq("Como a frase “생각해 볼게요” foi interpretada?", ["De formas diferentes por colegas diferentes.", "Como uma ordem clara.", "Como um convite para viajar."], "De formas diferentes por colegas diferentes.", "한 사람은 긍정으로, 다른 사람은 거절로 들었어요."),
    cloze("Complete a inferência: 사람들이 우산을 쓰는 것___ 보아 비가 오나 봐요.", "으로", "것으로 보아 = a julgar por."),
    listen("Ouça e escreva a aparência de chuva.", "비가 오는 듯해요.", "비가 오는 듯해요.", "Parece que está chovendo."),
    reading("회의가 끝난 뒤 동료가 “생각해 볼게요”라고 말했다. 나는 긍정으로 들었지만, 다른 사람은 거절의 뉘앙스로 받아들였다. 같은 말도 상황과 관계에 따라 다르게 해석된다.", "Por que a interpretação varia?", ["Porque a mesma fala depende de situação e relação.", "Porque a reunião foi cancelada.", "Porque ninguém ouviu."], "Porque a mesma fala depende de situação e relação.", "상황과 관계에 따라 다르게 해석돼요."),
    translate("pt-ko", "Traduza: “A julgar pelas pessoas usando guarda-chuva, parece que está chovendo.”", "사람들이 우산을 쓰는 것으로 보아 비가 오나 봐요.", "것으로 보아 introduz inferência.", ["사람들이 우산을 쓰는 것을 보아 비가 오나 봐요."]),
  ],
  independent: [
    mcq("Qual frase expressa “parece que”, em registro mais escrito?", ["그는 이미 알고 있는 듯했다.", "그는 이미 알았어요.", "그는 이미 알 거예요."], "그는 이미 알고 있는 듯했다.", "-ㄴ/는 듯하다 é aparência/suposição escrita."),
    cloze("Complete a inferência: 늦게 온 것___ 보아 교통이 막혔나 봐요.", "으로", "것으로 보아 = a julgar por."),
    listen("Ouça e escreva a intenção sutil.", "상대는 은근히 시간이 부족하다고 말하고 있었어요.", "상대는 은근히 시간이 부족하다고 말하고 있었어요.", "A pessoa estava dizendo, de forma sutil, que não tinha tempo."),
    translate("ko-pt", "Traduza: 같은 말도 상황에 따라 다르게 해석될 수 있어요.", "A mesma fala pode ser interpretada de forma diferente conforme a situação.", "해석되다 = ser interpretado.", ["Até a mesma frase pode ter interpretações diferentes conforme o contexto."]),
    reading("나는 분위기가 이상하다는 것을 눈치채고, 나중에 따로 물어보았다. 상대는 은근히 시간이 부족하다고 말하고 있었다. 의도를 추측만 하지 않고 확인하자 오해가 줄었다.", "O que reduziu o mal-entendido?", ["Confirmar a intenção em vez de apenas supor.", "Ignorar o clima estranho.", "Repetir a mesma frase."], "Confirmar a intenção em vez de apenas supor.", "의도를 확인하자 오해가 줄었어요."),
  ],
  summary: ["-ㄴ/는 듯하다 marca aparência ou suposição.", "-ㄴ/는 것으로 보아 introduz inferência com evidência.", "Inferência não é fato; confirme quando possível.", "Conteúdo novo permanece em revisão."],
  production: production(
    "Produção independente · interpretar uma fala ambígua",
    "Descreva uma fala ambígua que você ouviu. Apresente duas interpretações possíveis, a pista que sustenta cada uma e o que você faria para confirmar.",
    "애매한 말을 두 가지로 해석해 보세요.",
    ["Cite a fala sem inventar contexto.", "Apresente duas interpretações.", "Use -ㄴ/는 듯하다 ou -ㄴ/는 것으로 보아.", "Diga como confirmaria."],
    ["Fala ambígua citada.", "Duas interpretações plausíveis.", "Pista textual para cada uma.", "Inferência marcada como hipótese.", "Ação de confirmação."],
    "지난주에 동료가 “다음에 다시 이야기해요”라고 했어요. 저는 긍정적인 답변으로 들었어요. 그런데 다른 사람은 지금은 어렵다는 뜻으로 이해했어요. 말투가 조금 빠르고 시선을 피했기 때문이에요. 저는 다음 날 따로 물어보아서 일정이 정말 어려운지 확인했어요.",
    "Na semana passada, uma colega disse “vamos conversar de novo na próxima”. Eu entendi como uma resposta positiva. Mas outra pessoa entendeu como “agora é difícil”. Isso porque o tom era um pouco rápido e ela desviou o olhar. No dia seguinte, perguntei em particular para confirmar se o horário estava realmente difícil.",
    "Exemplo original de cinco frases. Duas leituras são apresentadas e a confirmação evita transformar a inferência em fato. Compare a estrutura.",
  ),
});
