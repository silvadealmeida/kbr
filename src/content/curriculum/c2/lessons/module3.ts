import { cloze, defineC2Lesson, listen, mcq, reading, translate } from "../shared";
import type { CourseProductionTask } from "../../course-types";

const RUBRIC = [
  { criterion: "task" as const, labelPt: "Cumprimento da tarefa", descriptorPt: "O texto reconstrói, avalia ou produz o movimento argumentativo pedido, em vez de apenas opinar sobre o tema." },
  { criterion: "organization" as const, labelPt: "Organização e progressão", descriptorPt: "A análise avança da formulação à premissa, da premissa à consequência e da consequência ao limite, sem repetir etapas." },
  { criterion: "vocabulary" as const, labelPt: "Vocabulário e colocação", descriptorPt: "Usa léxico preciso da argumentação, inclusive parte do léxico da lição, com colocações naturais e sem tradução literal." },
  { criterion: "grammar" as const, labelPt: "Gramática e registro", descriptorPt: "As formas-alvo aparecem corretas e o registro se mantém adequado ao gênero e ao destinatário." },
  { criterion: "argument" as const, labelPt: "Qualidade do argumento", descriptorPt: "A premissa, a analogia, a reductio ou a concessão é apresentada com caridade e tem seu alcance delimitado." },
  { criterion: "mediation" as const, labelPt: "Mediação e responsabilidade", descriptorPt: "Reformula a posição do outro para um terceiro sem caricatura, sem apagar o desacordo e sem transferir responsabilidade." },
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

/** c2-l11 — premissa oculta, validade e conclusão. */
export const C2_L11 = defineC2Lesson({
  id: "c2-l11", number: 11, moduleId: "c2-m03", title: "A premissa escondida",
  objective: "Reconstruir premissas implícitas e testar a validade de um argumento.",
  prerequisites: ["c2-c02"], estimatedMinutes: 85, dialogueTitle: "O anúncio que conclui sozinho",
  intro: [
    {
      title: "O argumento que falta",
      body: "Muitos argumentos chegam até nós incompletos. O falante enuncia uma premissa e uma conclusão, mas deixa a outra premissa por conta do ouvinte. Esse espaço vazio não é um acidente: é um convite para que completemos o raciocínio com aquilo que já aceitamos. Reconstruir a premissa oculta é formular a frase que precisa ser verdadeira para que a conclusão siga das premissas dadas. A reconstrução deve ser a mais generosa possível: se a versão caridosa não funciona, a versão fraca também não prova nada.",
      ko: "광고는 결론만 크게 말하고, 그 결론을 떠받치는 전제는 작게 숨긴다.",
    },
    {
      title: "Validade não é verdade",
      body: "Um argumento é válido quando a conclusão decorre necessariamente das premissas; é verdadeiro quando as premissas e a conclusão correspondem ao mundo. As duas coisas são independentes. Um raciocínio pode ter forma perfeita e partir de uma premissa falsa; outro pode ter premissas verdadeiras e uma conclusão que não segue delas. Por isso, ao avaliar um argumento, faça duas perguntas separadas: a conclusão realmente decorre? As premissas são aceitáveis? Misturar as duas perguntas é a forma mais rápida de vencer uma discussão sem entender o que foi dito.",
      ko: "전제가 거짓이면 결론이 따라와도 그 결론이 참이라고 보장되지는 않는다.",
    },
  ],
  dialogue: [
    ["지안", "이 광고 문구, 뭔가 이상하지 않아요? ‘상위 1%는 매일 20분씩 복습합니다. 우리 앱은 그 20분을 설계합니다.’", "Este anúncio não parece estranho? ‘Os 1% melhores revisam 20 minutos por dia. Nosso aplicativo planeja esses 20 minutos.’"],
    ["태오", "이상하다기보다 결론이 하나 빠진 것 같아요. ‘그러니 당신도 상위 1%가 될 수 있습니다’가 생략되어 있죠.", "Mais do que estranho, parece faltar uma conclusão. Está omitido: ‘portanto, você também pode se tornar um dos 1% melhores’."],
    ["지안", "그 결론을 성립시키려면 어떤 전제가 필요하죠?", "Que premissa seria necessária para que essa conclusão se sustente?"],
    ["태오", "‘20분씩 복습하는 사람은 누구나 상위 1%가 된다’는 전제요. 그런데 광고는 그걸 말하지 않아요.", "A premissa de que ‘qualquer pessoa que revise 20 minutos por dia se torna uma das 1% melhores’. Mas o anúncio não diz isso."],
    ["지안", "실제로는 상위 1%가 20분을 복습했을 뿐인데, 광고는 순서를 뒤집어 놓은 거네요.", "Na verdade, os 1% melhores apenas revisavam 20 minutos; o anúncio inverteu a ordem."],
    ["태오", "맞아요. 삼단논법의 얼개만 빌려 왔을 뿐, 대전제는 검증되지 않았어요.", "Exato. Tomou emprestada apenas a estrutura do silogismo; a premissa maior não foi verificada."],
    ["지안", "그럼 우리가 할 일은 부정이 아니라, 숨어 있는 전제를 꺼내서 물어보는 거죠. ‘그 20분이 실력의 원인입니까?’", "Então o que temos de fazer não é negar, mas trazer a premissa oculta para fora e perguntar: ‘esses 20 minutos são a causa do desempenho?’"],
    ["태오", "네. 전제를 드러내면 결론이 얼마나 멀리 가 있는지 보여요. 연역이 성립하려면 대전제부터 참이어야 하니까요.", "Sim. Expor a premissa mostra o quanto a conclusão se afastou. Para a dedução se sustentar, a premissa maior precisa ser verdadeira desde o início."],
  ],
  readingText: {
    titlePt: "A conclusão que chega antes da prova",
    paragraphs: [
      "자전거 도로를 늘리자는 제안이 나올 때마다 같은 논리가 따라온다. ‘자전거 이용률이 높은 도시는 교통사고 사망자가 적다. 그러므로 자전거 도로를 늘리면 사망자도 줄어든다.’ 문장은 짧고 숫자는 그럴듯하다. 그러나 이 주장에는 말해지지 않은 전제가 하나 있다. 이용률과 사망자 감소의 관계가 자전거 도로 때문이라는 전제다. 광고나 정책 제안은 대개 이 전제를 생략한다. 생략된 전제는 독자가 이미 동의하고 있다고 전제되기 때문에, 검증 없이 결론까지 이어진다.",
      "논증의 얼개를 펼쳐 보면 구조가 더 분명해진다. 대전제는 ‘자전거 이용률이 높으면 사망자가 적다’이고, 소전제는 ‘이 도시도 자전거 이용률을 높일 수 있다’이다. 여기서 첫 번째 전제는 상관관계를 인과관계로 바꾸어 놓았다. 자전거 이용률이 높은 도시는 대개 차량 속도가 낮고, 대중교통이 잘 갖춰져 있으며, 보행자와 자전거 이용자를 위한 시설이 이미 많다. 사망자 감소는 자전거 도로 하나가 아니라 그 조건들의 합일 수 있다. 상관관계에서 인과를 도출하는 순간, 대전제는 검증 없이 통과된다. 연역의 형식이 올바르더라도 전제가 거짓이면 결론이 참이라고 보장되지는 않는다.",
      "그렇다면 이 주장을 논파하려면 어떻게 해야 할까. 먼저 숨어 있는 전제를 꺼내 놓고, 그 전제가 이 도시에서도 성립하는지 물어야 한다. 사고가 많은 구간은 어디인지, 자전거 이용자는 실제로 얼마나 늘었는지, 다른 교통 정책과 함께 시행되었는지를 확인해야 한다. 전제를 꺼내 놓는 일은 주장을 논파하려는 것이 아니다. 오히려 주장을 더 강하게 만드는 절차다. 자전거 도로가 안전에 기여한다는 결론은 맞을 수 있다. 그러나 이 논증만으로는 아직 그것을 보여 주지 못한다. 결론을 믿으려면, 결론을 떠받치는 전제부터 확인해야 한다.",
    ],
    pt: "Sempre que surge a proposta de ampliar as ciclovias, a mesma lógica aparece. ‘Cidades com maior taxa de uso de bicicleta têm menos mortes no trânsito. Portanto, ampliar as ciclovias também reduzirá as mortes.’ A frase é curta e os números parecem plausíveis. No entanto, esse argumento tem uma premissa não declarada: a de que a relação entre uso de bicicleta e queda de mortes se deve às ciclovias. Anúncios e propostas de política costumam omitir essa premissa. Como se presume que o leitor já concorda com a premissa omitida, ela passa até a conclusão sem verificação. Se abrirmos a estrutura do argumento, ela fica mais clara. A premissa maior é ‘se a taxa de uso de bicicleta é alta, há menos mortes’; a premissa menor é ‘esta cidade também pode aumentar a taxa de uso de bicicleta’. Aqui, a primeira premissa transformou correlação em causalidade. Cidades com alto uso de bicicleta geralmente têm velocidades veiculares menores, transporte público bem estruturado e muitas instalações para pedestres e ciclistas. A queda de mortes pode ser a soma dessas condições, e não de uma única ciclovia. No momento em que se deriva causalidade de uma correlação, a premissa maior passa sem verificação. Mesmo que a forma da dedução esteja correta, se a premissa é falsa, não se garante que a conclusão seja verdadeira. Então, como refutar esse argumento? Primeiro, é preciso trazer a premissa oculta para fora e perguntar se ela se sustenta nesta cidade. É preciso verificar onde estão os trechos com mais acidentes, quanto o número de ciclistas realmente aumentou e se a medida foi implementada junto com outras políticas de trânsito. Expor a premissa não é tentar demolir a tese. É, ao contrário, um procedimento que fortalece a tese. A conclusão de que as ciclovias contribuem para a segurança pode estar correta. Mas este argumento, sozinho, ainda não mostra isso. Para acreditar na conclusão, é preciso começar verificando a premissa que a sustenta.",
    objective: "Reconstruir a premissa oculta do argumento e separar validade formal de verdade das premissas.",
  },
  reusedIds: ["ko:근거", "ko:주장", "ko:상관관계", "ko:인과관계"],
  grammar: [
    [
      "-ㄴ/는 전제하에 — sob a premissa de",
      "절 + -(ㄴ/는)다는 전제하에 / 명사 + -(이)라는 전제하에",
      "Torna explícita a premissa que precisa ser aceita para que uma decisão, análise ou proposta faça sentido. É formal e frequente em documentos, relatórios e artigos acadêmicos. Compare com -ㄴ/는 조건에서, que descreve uma condição prática, e com -ㄴ/는 가정하에, que enfatiza uma hipótese a ser testada. Com 전제하에, a premissa é apresentada como algo já concedido; por isso, a expressão é útil tanto para esclarecer um raciocínio quanto para revelar o que um texto esconde.",
      [
        ["그 계획은 예산이 확보된다는 전제하에 추진되었다.", "O plano foi levado adiante sob a premissa de que o orçamento seria garantido."],
        ["우리는 그 수치가 정확하다는 전제하에 분석을 시작했다.", "Começamos a análise sob a premissa de que os números eram exatos."],
      ],
    ],
    [
      "-ㄹ 경우 — no caso de",
      "동사·형용사 + -(으)ㄹ 경우(에) / 명사 + 일 경우(에)",
      "Apresenta um caso hipotético de modo formal, sem afirmar que ele ocorrerá. É mais objetivo que -면 e mais específico que -ㄹ 때, que indica tempo. Em textos argumentativos, -ㄹ 경우 permite testar uma premissa: ‘se X for verdade, então Y’. Não confunda com -ㄴ다면, que costuma marcar uma hipótese contrafactual ou a fala do adversário; -ㄹ 경우 apenas coloca um cenário possível na mesa.",
      [
        ["전제가 거짓일 경우, 결론이 참이어도 논증은 성립하지 않는다.", "Se a premissa for falsa, o argumento não se sustenta nem que a conclusão seja verdadeira."],
        ["이의를 제기할 경우, 근거를 함께 제출해야 한다.", "No caso de apresentar objeção, é preciso apresentar também a evidência."],
      ],
    ],
  ],
  guided: [
    mcq("Qual premissa o anúncio deixa implícita?", ["Que qualquer pessoa que revise 20 minutos por dia se torna uma das 1% melhores.", "Que os 1% melhores nunca revisam o conteúdo.", "Que o aplicativo foi criado por professores universitários."], "Que qualquer pessoa que revise 20 minutos por dia se torna uma das 1% melhores.", "Sem essa premissa, a conclusão ‘você também pode ser um dos 1%’ não decorre do fato de o aplicativo organizar 20 minutos."),
    cloze("Complete a premissa que o anúncio não enuncia: 그 광고는 ‘20분이면 누구나 상위 1%가 된다’는 ___ 아래에서만 성립한다.", "전제", "-ㄴ/는 전제하에 nomeia a premissa que precisa ser aceita para a conclusão valer."),
    listen("Ouça e escreva o que a premissa revela sobre a conclusão.", "전제를 드러내면 결론이 얼마나 멀리 가 있는지 보여요.", "전제를 드러내면 결론이 얼마나 멀리 가 있는지 보여요.", "Expor a premissa mostra o quanto a conclusão se afastou."),
    translate("pt-ko", "Traduza: “Se a premissa for falsa, a conclusão não se sustenta.”", "전제가 거짓일 경우 결론은 성립하지 않는다.", "-ㄹ 경우 apresenta o cenário hipotético e mantém o registro analítico.", ["전제가 거짓일 경우, 결론은 성립하지 않는다."]),
    reading("논증의 얼개를 펼쳐 보면 구조가 더 분명해진다. 대전제는 ‘자전거 이용률이 높으면 사망자가 적다’이고, 소전제는 ‘이 도시도 자전거 이용률을 높일 수 있다’이다. 여기서 첫 번째 전제는 상관관계를 인과관계로 바꾸어 놓았다.", "O que acontece com a premissa maior nesse argumento?", ["Ela transforma uma correlação em relação causal sem verificar essa passagem.", "Ela repete a conclusão com outras palavras.", "Ela foi confirmada por um experimento local."], "Ela transforma uma correlação em relação causal sem verificar essa passagem.", "A premissa maior salta da observação de que duas coisas ocorrem juntas para a afirmação de que uma causa a outra."),
  ],
  independent: [
    mcq("Qual distinção evita confundir um argumento convincente com um argumento válido?", ["Validade depende da forma; verdade depende do conteúdo das premissas e da conclusão.", "Um argumento válido nunca pode ter premissa falsa.", "Toda conclusão verdadeira torna o argumento válido."], "Validade depende da forma; verdade depende do conteúdo das premissas e da conclusão.", "A forma pode ser correta e a premissa falsa; por isso, as duas perguntas precisam ser feitas separadamente."),
    cloze("Complete o salto apontado no texto: 상관관계에서 인과를 ___ 순간, 대전제는 검증 없이 통과된다.", "도출하는", "도출하다 indica a extração de uma conclusão a partir de dados; aqui, a extração indevida de causalidade."),
    listen("Ouça e escreva o que expor a premissa não significa.", "전제를 꺼내 놓는 일은 주장을 논파하려는 것이 아니다.", "전제를 꺼내 놓는 일은 주장을 논파하려는 것이 아니다.", "Expor a premissa não é tentar demolir a tese."),
    translate("ko-pt", "Traduza: 전제를 드러내면 결론이 얼마나 멀리 가 있는지 보여요.", "Expor a premissa mostra o quanto a conclusão se afastou.", "멀리 가 있다 = estar longe, ter avançado demais em relação ao ponto de partida.", ["Mostrar a premissa revela até onde a conclusão foi longe."]),
    reading("자전거 도로가 안전에 기여한다는 결론은 맞을 수 있다. 그러나 이 논증만으로는 아직 그것을 보여 주지 못한다. 결론을 믿으려면, 결론을 떠받치는 전제부터 확인해야 한다.", "Qual é a atitude do autor em relação à conclusão sobre ciclovias?", ["Ele admite que ela pode ser verdadeira, mas nega que este argumento já a demonstre.", "Ele afirma que a conclusão é necessariamente falsa.", "Ele considera a conclusão irrelevante para a política pública."], "Ele admite que ela pode ser verdadeira, mas nega que este argumento já a demonstre.", "O autor separa a plausibilidade da conclusão da força do argumento apresentado."),
  ],
  summary: [
    "A premissa oculta é a frase que precisa ser verdadeira para a conclusão seguir do que foi dito.",
    "Reconstrua a premissa de forma caritativa antes de avaliar o argumento.",
    "Validade (forma) e verdade (conteúdo) são perguntas distintas.",
    "-ㄴ/는 전제하에 explicita o que está sendo concedido; -ㄹ 경우 abre um cenário hipotético.",
    "Expor a premissa não é demolir a tese: é verificar o que a tese já pode sustentar.",
  ],
  production: production(
    "Produção independente · reconstruir e reescrever um argumento",
    "Escolha um anúncio, slogan ou proposta que você conheça e que salte direto para a conclusão. Reconstrua a premissa oculta, diga se ela é aceitável e reescreva o argumento explicando premissa e conclusão. Feche indicando o que ainda precisaria ser verificado.",
    "결론만 말하는 광고나 제안을 골라, 숨은 전제를 드러내고 다시 써 보세요.",
    ["Cite ou parafraseie o texto original sem já interpretá-lo.", "Formule a premissa oculta em uma frase completa.", "Diga se a premissa é plausível, duvidosa ou falsa, e por quê.", "Use -ㄴ/는 전제하에 ou -ㄹ 경우 uma vez.", "Reescreva a conclusão em tamanho compatível com a evidência.", "Termine com o dado que falta para confirmar a premissa."],
    ["Premissa oculta formulada com clareza.", "Avaliação separada de validade e verdade.", "Reescrita com conclusão delimitada.", "Uma forma-alvo empregada com função clara.", "Dado faltante nomeado.", "Registro adequado ao gênero original."],
    "나는 한 영어 학원의 광고를 분석해 보았다. 광고는 ‘상위 1%는 매일 20분씩 복습한다. 우리 프로그램은 그 20분을 설계한다. 그러니 당신도 상위 1%가 될 수 있다’고 말한다. 이 주장이 성립하려면 ‘20분씩 복습하는 사람은 누구나 상위 1%가 된다’는 전제가 참이어야 한다. 그러나 광고는 그 전제를 말하지 않는다. 실제로는 상위 1%가 20분을 복습했을 뿐일 수 있다. 나는 광고를 이렇게 고쳐 쓸 수 있다고 본다. ‘상위 1%의 복습 습관을 20분 프로그램으로 따라 해 보세요. 다만 결과는 개인의 기존 실력과 학습 환경에 따라 다릅니다.’ 이렇게 쓰면 전제가 드러나고, 결론도 근거보다 앞서지 않는다. 다만 어떤 습관이 실제로 성과를 내는지는 별도의 비교 연구가 필요하다. 광고를 비판하는 일은 광고를 없애는 일이 아니라, 숨은 전제를 확인하게 만드는 일이다.",
    "Analisei o anúncio de um curso de inglês. O anúncio diz: ‘Os 1% melhores revisam 20 minutos por dia. Nosso programa planeja esses 20 minutos. Portanto, você também pode se tornar um dos 1% melhores.’ Para que essa tese se sustente, precisa ser verdadeira a premissa de que ‘qualquer pessoa que revise 20 minutos por dia se torna uma das 1% melhores’. Mas o anúncio não diz isso. Na verdade, pode ser apenas que os 1% melhores revisavam 20 minutos. Considero que o anúncio poderia ser reescrito assim: ‘Siga o hábito de revisão dos 1% melhores com um programa de 20 minutos. No entanto, o resultado varia conforme o nível prévio e o ambiente de estudo de cada pessoa.’ Escrito desse modo, a premissa fica visível e a conclusão não ultrapassa a evidência. Ainda assim, seria necessária uma pesquisa comparativa separada para saber se esse hábito realmente produz resultados. Criticar o anúncio não é eliminá-lo, mas fazer com que a premissa oculta seja verificada.",
    "Exemplo original. Observe a separação entre premissa, validade e verdade, e a conclusão reescrita em tamanho compatível com a evidência. Exemplo ilustrativo; não é gabarito.",
  ),
});

/** c2-l12 — analogia, metáfora e o limite da comparação. */
export const C2_L12 = defineC2Lesson({
  id: "c2-l12", number: 12, moduleId: "c2-m03", title: "Analogia e metáfora",
  objective: "Avaliar o alcance e o limite de uma analogia argumentativa.",
  prerequisites: ["c2-l11"], estimatedMinutes: 85, dialogueTitle: "A empresa é um corpo?",
  intro: [
    {
      title: "A analogia como ponte, não como prova",
      body: "Uma analogia transporta uma relação conhecida para um campo desconhecido. Ela ilumina: de repente, entendemos um processo abstrato porque ele se parece com algo que já vivemos. Mas a analogia não é uma prova. Ela mostra uma semelhança, não demonstra que a mesma causa ou a mesma solução se aplicam aos dois casos. O teste é perguntar qual semelhança é relevante para a conclusão e qual diferença poderia mudar tudo. Quando a diferença incide justamente sobre o que está em disputa, a analogia perde força argumentativa, mesmo que continue útil como explicação.",
      ko: "비유는 이해를 돕지만, 비유가 곧 증거는 아니다.",
    },
    {
      title: "Onde a comparação quebra",
      body: "Toda analogia tem um ponto de ruptura. Comparar uma empresa a um organismo destaca adaptação e sobrevivência, mas esconde que trabalhadores podem sair, negociar e organizar-se, enquanto células não fazem nada disso. O limite não invalida a comparação inteira: ele delimita o que ela pode explicar. Um bom uso da analogia declara esse limite antes que o interlocutor o encontre. Um mau uso apresenta a comparação como se fosse uma lei natural e, com isso, transforma uma decisão política em destino biológico.",
      ko: "닮은 점보다 다른 점이 결론에 걸리는 순간, 비유는 힘을 잃는다.",
    },
  ],
  dialogue: [
    ["유진", "이 보고서, 회사를 하나의 유기체로 비유했네요. 부서는 장기, 직원은 세포라고요.", "Este relatório compara a empresa a um organismo. Departamentos são órgãos, funcionários são células."],
    ["상우", "비유 자체는 이해하기 쉽죠. 조직체가 환경에 적응한다는 점에서는 설득력도 있고요.", "A comparação em si é fácil de entender. No ponto de que o organismo se adapta ao ambiente, ela até tem força."],
    ["유진", "그런데 이 비유가 결론을 대신하고 있어요. ‘그러니 해고는 세포를 줄이는 것과 같다’고 하잖아요.", "Mas essa comparação está substituindo a conclusão. Diz que ‘portanto, demitir é como reduzir células’."],
    ["상우", "직유로 바꾸면 더 이상해지죠. ‘회사는 마치 몸과 같다. 그러므로 아픈 부분은 잘라내야 한다.’", "Se trocarmos por um símile, fica ainda mais estranho: ‘A empresa é como um corpo. Portanto, é preciso cortar a parte doente.’"],
    ["유진", "맞아요. 유비가 성립하려면 닮은 점이 결론과 관련 있어야 하는데, 여기서는 조직의 권력 관계가 빠져 있어요.", "Exato. Para a analogia se sustentar, a semelhança precisa ter relação com a conclusão; aqui, as relações de poder da organização ficam de fora."],
    ["상우", "세포는 자기가 몸을 떠날지 결정하지 못하지만, 직원은 다른 회사로 갈 수 있죠. 그 차이가 핵심이에요.", "Uma célula não decide se sai do corpo, mas um funcionário pode ir para outra empresa. Essa diferença é central."],
    ["유진", "그러니 비유를 없애자는 게 아니라, 비유가 어디까지 유효한지 선을 그어야 해요.", "Então não é questão de eliminar a comparação, mas de traçar até onde ela é válida."],
    ["상우", "동의해요. 좋은 비유는 설명을 돕고, 나쁜 비유는 책임을 자연처럼 보이게 하죠.", "Concordo. Uma boa comparação ajuda a explicar; uma ruim faz a responsabilidade parecer natural."],
  ],
  readingText: {
    titlePt: "A cidade como corpo — e quem fica fora da circulação",
    paragraphs: [
      "도시를 하나의 몸으로 비유하는 글은 오래되었다. 도로는 혈관, 지하철은 동맥, 사람은 세포라는 식이다. 도시를 몸에 비유하면 이해가 빨라진다. 흐름이 막히면 어딘가가 아프다는 설명은 직관적이다. 그러나 비유가 편리할수록 그 안에 숨은 선택을 보기 어려워진다. 몸에는 중심과 주변이 있고, 주변은 중심을 위해 희생된다. 도시를 몸으로 그리면, 어떤 동네가 ‘주변’이 되는지가 자연스러워 보인다.",
      "이 글의 설계도는 단순하다. 교통이 원활하면 도시가 건강해진다. 그러므로 막히는 구간을 넓히면 전체가 좋아진다. 문제는 비유가 골격을 제공하지만, 누가 그 골격을 따라 걷는지는 말해 주지 않는다는 점이다. 차를 가진 사람에게 도로는 혈관이지만, 차가 없는 사람에게는 단절된 벽이다. 유비가 성립하려면 닮은 점이 결론과 관련 있어야 한다. 여기서 결정적인 차이는 이동의 자유가 누구에게 주어지는가이다. 몸의 세포는 스스로 이동할 수 없지만, 도시의 주민은 이사할 수도 있고 정치적으로 목소리를 낼 수도 있다. 이 관점에서 보면, 도시의 문제는 세포의 건강이 아니라 권리의 분배 문제가 된다.",
      "물론 비유를 버릴 필요는 없다. 도시가 서로 연결되어 있다는 사실은 여전히 중요하다. 좋은 비유는 설명을 돕고, 나쁜 비유는 책임을 자연처럼 보이게 한다. 그러므로 비유법을 쓸 때는 무엇을 밝히고 무엇을 가리는지 함께 적어야 한다. ‘도시는 몸과 같다’는 직유는 출발점으로는 유용하다. 그러나 그 직유가 정책의 근거가 되는 순간, 우리는 다시 물어야 한다. 이 몸에서 누가 중심이고, 누가 주변으로 밀려나는가. 비유의 한계를 밝히는 일은 비유를 배신하는 것이 아니라, 비유를 끝까지 책임지는 일이다.",
    ],
    pt: "Os textos que comparam a cidade a um corpo são antigos. As ruas são vasos sanguíneos, o metrô é uma artéria, as pessoas são células. Comparar a cidade a um corpo torna a compreensão mais rápida. A explicação de que, quando o fluxo entope, alguma parte adoece, é intuitiva. No entanto, quanto mais conveniente é a comparação, mais difícil fica ver a escolha escondida dentro dela. Um corpo tem centro e periferia, e a periferia é sacrificada em favor do centro. Ao desenhar a cidade como corpo, o fato de que algum bairro se torne ‘periferia’ passa a parecer natural. A planta deste texto é simples. Se o trânsito flui, a cidade fica saudável. Portanto, se alargarmos os trechos congestionados, o conjunto melhora. O problema é que a comparação oferece um esqueleto, mas não diz quem caminha por ele. Para quem tem carro, a rua é um vaso sanguíneo; para quem não tem, é um muro que separa. Para que a analogia se sustente, a semelhança precisa ter relação com a conclusão. Aqui, a diferença decisiva é a quem se concede a liberdade de movimento. As células do corpo não podem se deslocar por conta própria, mas os moradores da cidade podem mudar de casa e também levantar a voz politicamente. Sob essa perspectiva, o problema da cidade deixa de ser a saúde das células e passa a ser a distribuição de direitos. É claro que não é preciso abandonar a comparação. O fato de que a cidade é feita de conexões continua importante. Uma boa comparação ajuda a explicar; uma ruim faz a responsabilidade parecer natural. Por isso, ao usar uma figura de comparação, é preciso registrar o que ela revela e o que ela esconde. O símile ‘a cidade é como um corpo’ é útil como ponto de partida. Mas, no momento em que esse símile se torna a base de uma política, temos de perguntar de novo: neste corpo, quem é o centro e quem é empurrado para a periferia? Expor o limite da comparação não é traí-la; é assumi-la até o fim.",
    objective: "Distinguir o que a analogia da cidade-corpo ilumina do que ela esconde sobre circulação e exclusão.",
  },
  reusedIds: ["ko:관점", "ko:설득력", "ko:흐름", "ko:설계"],
  grammar: [
    [
      "-에 비유하다 — comparar a",
      "명사 + 에 비유하다 / -ㄴ/는 것에 비유하다",
      "Introduz a imagem usada para explicar ou avaliar outra coisa. O foco está na operação de comparação, não na igualdade entre os termos. Compare com 빗대다, mais coloquial e geralmente com intenção indireta ou crítica, e com 비유되다, que apresenta a comparação do ponto de vista de quem é comparado. Em texto argumentativo, convém explicitar o critério da comparação: sem ele, o leitor não sabe o que deve transportar de um campo para o outro.",
      [
        ["그는 회사를 하나의 유기체에 비유했다.", "Ele comparou a empresa a um organismo."],
        ["도시의 교통을 혈관에 비유하면, 막힌 구간이 먼저 보인다.", "Se compararmos o trânsito da cidade a vasos sanguíneos, os trechos entupidos aparecem primeiro."],
      ],
    ],
    [
      "-ㄴ/는 것과 같다 — é como",
      "동사 + -는 것과 같다 / 형용사 + -(으)ㄴ 것과 같다 / 명사 + 인 것과 같다",
      "Estabelece uma equivalência explicativa entre uma ação ou estado e uma imagem. Pode funcionar como símile ou como avaliação (“é como se…”). Compare com -듯하다, que marca impressão ou aparência, e com -에 불과하다, que reduz algo a uma categoria menor. Em um argumento, a expressão precisa vir acompanhada do limite da equivalência; caso contrário, o leitor toma a imagem como prova.",
      [
        ["해고는 세포를 줄이는 것과 같다고 말하면, 책임이 사라진다.", "Dizer que demitir é como reduzir células faz a responsabilidade desaparecer."],
        ["회사는 마치 하나의 몸과 같다.", "A empresa é como um corpo."],
      ],
    ],
  ],
  guided: [
    mcq("O que a analogia da empresa-organismo esconde, segundo o diálogo?", ["Que funcionários podem sair e negociar, enquanto células não podem.", "Que as empresas precisam de departamentos.", "Que toda organização cresce com o tempo."], "Que funcionários podem sair e negociar, enquanto células não podem.", "A diferença sobre mobilidade e poder é justamente o que a comparação deixa de fora."),
    cloze("Complete a operação que torna a imagem inteligível: 도시를 몸에 ___ 이해가 빨라진다.", "비유하면", "-에 비유하다 introduz a imagem usada para explicar outro campo."),
    listen("Ouça e escreva a diferença que o falante considera central.", "세포는 자기가 몸을 떠날지 결정하지 못하지만, 직원은 다른 회사로 갈 수 있죠.", "세포는 자기가 몸을 떠날지 결정하지 못하지만, 직원은 다른 회사로 갈 수 있죠.", "Uma célula não decide se sai do corpo, mas um funcionário pode ir para outra empresa."),
    translate("pt-ko", "Traduza: “Comparar a empresa a um organismo ajuda a entender, mas não prova.”", "회사를 유기체에 비유하면 이해는 쉬워지지만 증명은 되지 않는다.", "-에 비유하다 introduz a comparação; a segunda oração delimita o que ela não faz.", ["회사를 유기체에 비유하면 이해는 쉬워지지만, 그것이 증명은 아니다."]),
    reading("도시를 하나의 몸으로 비유하는 글은 오래되었다. 도로는 혈관, 지하철은 동맥, 사람은 세포라는 식이다. 도시를 몸에 비유하면 이해가 빨라진다. 그러나 비유가 편리할수록 그 안에 숨은 선택을 보기 어려워진다.", "Qual é o risco que o texto atribui à comparação da cidade com um corpo?", ["Ela pode tornar naturais as relações de centro e periferia que deveriam ser discutidas.", "Ela impede qualquer compreensão do trânsito urbano.", "Ela prova que a cidade não tem centros."], "Ela pode tornar naturais as relações de centro e periferia que deveriam ser discutidas.", "A comparação facilita a explicação, mas naturaliza uma divisão que é política."),
  ],
  independent: [
    mcq("Quando uma analogia deixa de servir como argumento?", ["Quando a diferença entre os dois casos recai sobre o ponto que a conclusão precisa provar.", "Quando a comparação usa imagens do corpo humano.", "Quando o texto explica a imagem antes de usá-la."], "Quando a diferença entre os dois casos recai sobre o ponto que a conclusão precisa provar.", "A semelhança precisa ser relevante para a conclusão; se a diferença atinge esse ponto, a analogia não prova o que pretende."),
    cloze("Complete o critério apontado no texto: 이 ___가 성립하려면 닮은 점이 결론과 관련 있어야 한다.", "유비", "유비 designa o raciocínio por semelhança; ele depende da relevância das semelhanças."),
    listen("Ouça e escreva o efeito oposto entre bons e maus usos da comparação.", "좋은 비유는 설명을 돕고, 나쁜 비유는 책임을 자연처럼 보이게 하죠.", "좋은 비유는 설명을 돕고, 나쁜 비유는 책임을 자연처럼 보이게 하죠.", "Uma boa comparação ajuda a explicar; uma ruim faz a responsabilidade parecer natural."),
    translate("ko-pt", "Traduza: 비유는 이해를 돕지만, 비유가 곧 증거는 아니다.", "A comparação ajuda a entender, mas a comparação não é prova.", "곧 = imediatamente, por si só; 증거 = prova, evidência.", ["A analogia facilita a compreensão, mas não é evidência por si mesma."]),
    reading("좋은 비유는 설명을 돕고, 나쁜 비유는 책임을 자연처럼 보이게 한다. 그러므로 비유법을 쓸 때는 무엇을 밝히고 무엇을 가리는지 함께 적어야 한다.", "O que o autor recomenda a quem usa uma analogia em texto argumentativo?", ["Declarar o que a comparação revela e o que ela esconde.", "Evitar qualquer imagem que venha do corpo humano.", "Substituir a analogia por dados estatísticos sempre que possível."], "Declarar o que a comparação revela e o que ela esconde.", "A recomendação é tornar explícito o alcance da imagem, não eliminar toda comparação."),
  ],
  summary: [
    "A analogia transfere uma relação de um campo conhecido para outro; ela explica, mas não prova.",
    "O teste é a relevância da semelhança para a conclusão e o peso da diferença que a comparação esconde.",
    "-에 비유하다 introduz a imagem; -ㄴ/는 것과 같다 aproxima os dois termos, mas não os identifica.",
    "Declarar o limite da analogia fortalece o argumento em vez de enfraquecê-lo.",
    "Uma comparação que naturaliza uma decisão política transforma responsabilidade em destino.",
  ],
  production: production(
    "Produção independente · analogia com limite declarado",
    "Escolha uma analogia usada para defender uma ideia — uma empresa como família, a escola como fábrica, a cidade como corpo. Reescreva o argumento mantendo a analogia, mas explicite o que ela ilumina, o que ela esconde e onde deixa de valer.",
    "한 비유를 골라, 그것이 밝히는 점과 가리는 점, 그리고 한계를 밝히며 다시 써 보세요.",
    ["Apresente a analogia original em uma frase.", "Nomeie a semelhança que sustenta a comparação.", "Nomeie uma diferença relevante para a conclusão.", "Use -에 비유하다 ou -ㄴ/는 것과 같다 uma vez.", "Reescreva a conclusão sem tratar a analogia como prova.", "Feche dizendo o que a comparação ainda ajuda a entender."],
    ["Analogia original apresentada.", "Semelhança relevante nomeada.", "Diferença decisiva nomeada.", "Conclusão separada da imagem.", "Uma forma-alvo empregada corretamente.", "Limite da comparação declarado."],
    "한 스타트업의 채용 공고는 회사를 가족에 비유한다. ‘우리는 가족입니다. 가족은 어려울 때 서로를 떠나지 않습니다.’ 이 비유는 소속감을 쉽게 이해하게 한다. 그러나 가족과 회사 사이에는 결정적인 차이가 있다. 가족은 계약으로 해고할 수 있는 관계가 아니고, 회사는 급여와 평가로 관계를 조정한다. 회사를 가족에 비유하면, 장시간 노동이나 역할 외의 요구가 ‘가족이니까’ 자연스러워진다. 나는 이 문장을 ‘우리는 서로를 돕는 팀입니다. 다만 업무 범위와 평가 기준은 문서로 분명히 합니다’로 바꾸고 싶다. 이렇게 쓰면 협력은 남지만, 권리와 의무가 가족이라는 이미지 뒤로 숨지 않는다. 좋은 비유는 설명을 돕는다. 그러나 회사를 가족처럼 대한다는 말이 근로 조건의 근거가 되는 순간, 그 비유는 책임을 흐린다. 비유의 한계를 밝히는 일은 비유를 버리는 일이 아니라, 비유를 정확하게 쓰는 일이다.",
    "O anúncio de recrutamento de uma startup compara a empresa a uma família: ‘Somos uma família. Uma família não abandona uns aos outros nos momentos difíceis.’ A comparação torna o sentimento de pertencimento fácil de entender. No entanto, há uma diferença decisiva entre família e empresa. Não se demite alguém de uma família por contrato, enquanto a empresa ajusta a relação por meio de salário e avaliação. Ao comparar a empresa a uma família, o trabalho prolongado e as exigências fora da função passam a parecer naturais, ‘porque somos uma família’. Eu gostaria de mudar a frase para: ‘Somos uma equipe que se ajuda. No entanto, o escopo do trabalho e os critérios de avaliação estão claramente definidos por escrito.’ Escrito assim, a cooperação permanece, mas direitos e deveres não se escondem atrás da imagem de família. Uma boa comparação ajuda a explicar. Mas, no momento em que dizer que a empresa é como uma família se torna base das condições de trabalho, a comparação turva a responsabilidade. Expor o limite da analogia não é abandoná-la; é usá-la com precisão.",
    "Exemplo original. A analogia é mantida, mas o texto nomeia a semelhança, a diferença decisiva e o limite antes de concluir. Exemplo ilustrativo; não é gabarito.",
  ),
});

/** c2-l13 — reductio ad absurdum sem caricatura. */
export const C2_L13 = defineC2Lesson({
  id: "c2-l13", number: 13, moduleId: "c2-m03", title: "Reductio ad absurdum",
  objective: "Usar reductio para testar uma posição sem distorcer a posição original.",
  prerequisites: ["c2-l12"], estimatedMinutes: 85, dialogueTitle: "Até onde a regra vai",
  intro: [
    {
      title: "Levar a sério até o fim",
      body: "A reductio ad absurdum não consiste em dizer que a posição do outro é ridícula. Consiste em aceitar a premissa dele, aplicá-la com consistência e mostrar que ela leva a uma consequência inaceitável. O procedimento é generoso por construção: quanto mais forte a versão testada, mais convincente o resultado. Se a consequência absurda só aparece porque alteramos a regra no meio do caminho, não testamos a posição do outro; testamos uma invenção nossa.",
      ko: "귀류법은 상대의 말을 끝까지 받아들여 그 결론이 터무니없다는 것을 보여 준다.",
    },
    {
      title: "O risco da caricatura",
      body: "Uma regra razoável quase sempre tem exceções e um domínio de aplicação. O erro típico é estender a regra a um domínio que ela não pretendia cobrir e chamar o resultado de absurdo. Isso produz um espantalho: uma posição fraca, fácil de derrubar, que ninguém defende. O teste é perguntar se a consequência decorre da posição original ou de uma versão ampliada por nós. Se a resposta é a segunda, a reductio falhou como argumento — mesmo que tenha produzido uma boa piada.",
      ko: "상대의 주장을 허수아비로 바꾸면 반박이 아니라 회피가 된다.",
    },
  ],
  dialogue: [
    ["하람", "규정을 하나 만들자는 제안이 있어요. ‘공원에서는 확성기를 쓰지 못한다.’ 그런데 반대쪽에서 극단으로 몰고 가더군요.", "Há uma proposta de criar uma regra: ‘Não se pode usar alto-falante no parque.’ Mas o lado contrário levou a coisa ao extremo."],
    ["준서", "어떻게요?", "Como assim?"],
    ["하람", "‘그럼 아이들 웃음소리도 금지할 거냐’고요. 그건 귀류법이 아니라 확대해석이에요.", "Disseram: ‘Então vão proibir até o riso das crianças?’ Isso não é reductio, é interpretação extensiva."],
    ["준서", "맞아요. 확성기와 웃음소리는 같은 범주가 아니니까요. 그런 논박은 상대를 허수아비로 만드는 거죠.", "Exato. Alto-falante e riso não são a mesma categoria. Esse tipo de refutação cria um espantalho do outro."],
    ["하람", "제대로 하려면, 제안을 그대로 받아들이고 실제로 곤란한 결과가 따라오는지 봐야 해요. ‘확성기를 금지하면 야외 행사는 모두 취소된다’는 식으로요.", "Para fazer direito, é preciso aceitar a proposta como ela é e ver se uma consequência realmente problemática decorre dela. Algo como: ‘se proibirmos alto-falantes, todos os eventos ao ar livre serão cancelados’."],
    ["준서", "그 경우에도 예외를 두면 되니까, 규정 자체가 터무니없다는 결론은 나오지 않아요.", "Nesse caso também se podem abrir exceções, então não se chega à conclusão de que a regra em si é absurda."],
    ["하람", "그래서 귀류법은 결론이 정말 따라오는지 보여 줘야 해요. 따라오지 않는데 따라온다고 하면 자가당착이 되죠.", "Por isso a reductio precisa mostrar que a consequência realmente decorre. Caso contrário, cai em autocontradição."],
    ["준서", "결국 좋은 반박은 상대의 주장을 약하게 만드는 게 아니라, 강하게 만든 뒤에 시험하는 거네요.", "No fim, uma boa refutação não enfraquece a posição do outro: ela a fortalece e depois a testa."],
  ],
  readingText: {
    titlePt: "Quando a reductio acerta o alvo errado",
    paragraphs: [
      "요즘 사내 게시판에서 ‘회의를 없애자’는 제안이 화제다. 제안자는 회의가 결론 없이 끝나는 일이 많고, 준비에 드는 시간도 만만치 않다고 지적한다. 이 지적은 타당하다. 나도 회의가 낭비가 되는 순간을 여러 번 보았다. 그러나 제안을 읽다 보면, ‘회의를 줄이자’는 말과 ‘회의를 없애자’는 말이 조용히 뒤바뀐다. 논쟁의 과녁이 달라지는 순간이다.",
      "제안을 끝까지 밀어붙여 보자. 회의가 순수한 시간 낭비라면, 얼굴을 마주 보는 대화도 낭비다. 짧은 질문도, 잡담도, 점심시간의 인사도 낭비다. 그렇다면 회사는 침묵 속에서 운영되어야 한다. 보고는 문서로만 하고, 갈등은 메일로만 해결하고, 새로운 사람은 아무에게도 질문하지 않아야 한다. 이것이 귀류법의 형식이다. 상대의 전제를 받아들여, 그 전제가 끝까지 적용될 경우 어떤 결론이 나오는지 보여 주는 것이다. 이 결론이 터무니없다면, 전제 어딘가에 문제가 있다.",
      "그러나 이 귀류법은 과녁을 맞혔을까. 여기서 조심해야 할 점이 있다. 제안자는 ‘모든 회의’를 없애자고 하지 않았다. 형식적인 보고 회의를 줄이자고 했다. 극단으로 밀어붙인 결과는 원래 주장이 아니라, 아무도 주장하지 않은 허수아비를 논박한 것이다. 상대의 주장을 희화화하면 반박은 쉬워지지만, 실제 문제는 그대로 남는다. 좋은 귀류법은 상대의 주장을 약하게 만드는 것이 아니라, 가장 강한 형태로 세운 뒤에 시험한다. 그렇게 해야 자가당착을 피하고, 무엇이 정말 문제인지 볼 수 있다. 그 차이를 구분하지 않으면, 우리는 가장 설득력 있는 반박을 가장 약한 주장에 쓴 셈이 된다. 이 판단을 건너뛰면, 반박은 상대를 이기는 기술이 되고 만다.",
    ],
    pt: "Ultimamente, um quadro de avisos interno virou tema de conversa com a proposta ‘vamos acabar com as reuniões’. O autor aponta que muitas reuniões terminam sem conclusão e que o tempo de preparação também é considerável. Essa crítica é válida. Também vi várias vezes momentos em que a reunião se tornou desperdício. No entanto, ao ler a proposta, a frase ‘vamos reduzir as reuniões’ é silenciosamente trocada por ‘vamos acabar com as reuniões’. É o momento em que o alvo do debate muda. Vamos levar a proposta até o fim. Se a reunião é puro desperdício de tempo, então a conversa cara a cara também é desperdício. Uma pergunta curta, uma conversa informal, um cumprimento na hora do almoço: tudo é desperdício. Nesse caso, a empresa deveria operar em silêncio. Os relatórios seriam apenas documentos, os conflitos seriam resolvidos apenas por e-mail, e as pessoas novas não deveriam perguntar nada a ninguém. Esta é a forma da reductio ad absurdum: aceitar a premissa do outro e mostrar que conclusão surge quando ela é aplicada até o fim. Se essa conclusão é absurda, há algum problema na premissa. Mas essa reductio acertou o alvo? Aqui é preciso cuidado. O autor não propôs ‘acabar com todas as reuniões’. Propôs reduzir as reuniões formais de relatório. O resultado de levar a proposta ao extremo refuta não a tese original, mas um espantalho que ninguém defendeu. Transformar a posição do outro em caricatura facilita a refutação, mas o problema real permanece. Uma boa reductio não enfraquece a posição do outro: ela a ergue na forma mais forte e então a testa. Só assim se evita a autocontradição e se consegue ver o que é realmente problemático. Se pulamos essa avaliação, a refutação se torna uma técnica de vencer o outro.",
    objective: "Identificar a premissa levada ao extremo, a consequência derivada e o ponto em que a reductio perde o alvo.",
  },
  reusedIds: ["ko:판단", "ko:문제", "ko:설득력", "ko:설득"],
  grammar: [
    [
      "-ㄴ다면 — se dissermos que",
      "동사 + -ㄴ/는다면 / 형용사 + -다면 / 명사 + (이)라면",
      "Introduz uma hipótese, muitas vezes retomando a posição do interlocutor para examiná-la. Diferente de -ㄹ 경우, que apenas apresenta um cenário possível, -ㄴ다면 pode marcar distância crítica: ‘se você diz que…’. Também aparece em hipóteses contrafactuais. Em uma reductio, a forma ajuda a deixar claro que o falante está assumindo temporariamente a premissa do outro, sem endossá-la.",
      [
        ["회의가 순수한 시간 낭비라면, 얼굴을 마주 보는 대화도 낭비다.", "Se a reunião é puro desperdício de tempo, a conversa cara a cara também é desperdício."],
        ["네 말대로 모든 회의를 없앤다면, 회사는 침묵 속에서 운영될 것이다.", "Se, como você diz, acabarmos com todas as reuniões, a empresa vai operar em silêncio."],
      ],
    ],
    [
      "-ㄹ 것이다 — seria; consequência projetada",
      "동사·형용사 + -(으)ㄹ 것이다",
      "Projeta a consequência de uma premissa ou de um cenário. Nem sempre indica futuro real: em um argumento, costuma marcar o resultado que ‘deveria’ seguir se a premissa fosse aceita. Compare com -게 될 것이다, que descreve um processo que se desenrola, e com -ㄹ 수 있다, que apenas abre uma possibilidade. Na reductio, -ㄹ 것이다 dá à consequência o tom de necessidade, que é justamente o que precisa ser testado.",
      [
        ["그 규칙을 끝까지 적용하면, 모든 대화가 금지될 것이다.", "Se aplicarmos essa regra até o fim, toda conversa será proibida."],
        ["전제가 거짓이라면, 결론도 성립하지 않을 것이다.", "Se a premissa for falsa, a conclusão também não se sustentará."],
      ],
    ],
  ],
  guided: [
    mcq("Por que o argumento do ‘riso das crianças’ não é uma reductio adequada?", ["Porque amplia a regra para uma categoria que ela não pretendia regular.", "Porque o riso infantil é mais importante que o alto-falante.", "Porque a regra do parque não tem nenhuma consequência."], "Porque amplia a regra para uma categoria que ela não pretendia regular.", "A extrapolação troca o alvo: em vez de testar a regra, cria uma versão que ninguém defendeu."),
    cloze("Complete a imagem que nomeia a distorção da posição alheia: 상대의 주장을 ___로 바꾸면 반박이 아니라 회피가 된다.", "허수아비", "허수아비 traduz a ideia de espantalho: uma posição enfraquecida para ser derrubada com facilidade."),
    listen("Ouça e escreva o que uma boa refutação faz com a posição do outro.", "결국 좋은 반박은 상대의 주장을 약하게 만드는 게 아니라, 강하게 만든 뒤에 시험하는 거네요.", "결국 좋은 반박은 상대의 주장을 약하게 만드는 게 아니라, 강하게 만든 뒤에 시험하는 거네요.", "No fim, uma boa refutação não enfraquece a posição do outro: ela a fortalece e depois a testa."),
    translate("pt-ko", "Traduza: “Se aceitarmos essa regra, toda conversa será proibida.”", "그 규칙을 받아들인다면 모든 대화가 금지될 것이다.", "-ㄴ다면 abre a hipótese e -ㄹ 것이다 projeta a consequência.", ["그 규칙을 받아들인다면, 모든 대화가 금지될 것이다."]),
    reading("제안을 끝까지 밀어붙여 보자. 회의가 순수한 시간 낭비라면, 얼굴을 마주 보는 대화도 낭비다. 짧은 질문도, 잡담도, 점심시간의 인사도 낭비다. 그렇다면 회사는 침묵 속에서 운영되어야 한다.", "Qual é a função desse trecho no texto?", ["Levar a premissa ao extremo para mostrar uma consequência inaceitável.", "Provar que as reuniões realmente não têm utilidade.", "Descrever como a empresa funciona atualmente."], "Levar a premissa ao extremo para mostrar uma consequência inaceitável.", "O trecho é a etapa de derivação da reductio, não uma descrição da realidade."),
  ],
  independent: [
    mcq("O que uma reductio precisa preservar para não se tornar caricatura?", ["A posição original, com seu domínio e suas exceções.", "A conclusão oposta, mesmo que ela não decorra da premissa.", "Apenas a parte da posição que é fácil de refutar."], "A posição original, com seu domínio e suas exceções.", "A força da reductio depende de aplicar a posição real, não uma versão ampliada por conveniência."),
    cloze("Complete a avaliação do argumento: 이 ___이 인상적이지만, 과녁을 맞혔는지 따져야 한다.", "귀류법", "귀류법 é o procedimento de derivar uma consequência absurda da premissa do outro."),
    listen("Ouça e escreva como o falante classifica o argumento do riso das crianças.", "그건 귀류법이 아니라 확대해석이에요.", "그건 귀류법이 아니라 확대해석이에요.", "Isso não é reductio, é interpretação extensiva."),
    translate("ko-pt", "Traduza: 상대의 주장을 허수아비로 바꾸면 반박이 아니라 회피가 된다.", "Transformar a posição do outro em espantalho não é refutação, mas fuga.", "허수아비 = espantalho; 회피 = fuga, esquiva.", ["Trocar a tese do outro por um espantalho deixa de ser refutação e vira evasão."]),
    reading("제안자는 ‘모든 회의’를 없애자고 하지 않았다. 형식적인 보고 회의를 줄이자고 했다. 극단으로 밀어붙인 결과는 원래 주장이 아니라, 아무도 주장하지 않은 허수아비를 논박한 것이다.", "O que a reductio do texto acabou refutando?", ["Uma versão ampliada da proposta, não a proposta original.", "A proposta original, com todas as suas exceções.", "A posição de quem defendia todas as reuniões."], "Uma versão ampliada da proposta, não a proposta original.", "A consequência absurda foi construída sobre ‘todas as reuniões’, enquanto a proposta falava apenas das reuniões formais de relatório."),
  ],
  summary: [
    "A reductio aceita a premissa do outro e mostra a consequência inaceitável que dela decorre.",
    "Ela é caritativa por construção: quanto mais forte a versão testada, mais convincente o resultado.",
    "-ㄴ다면 assume a hipótese; -ㄹ 것이다 projeta a consequência que precisa ser testada.",
    "Ampliar o domínio da regra produz um espantalho, não uma refutação.",
    "Uma reductio que preserva a posição original mostra o que está realmente em disputa.",
  ],
  production: production(
    "Produção independente · uma reductio com alvo preservado",
    "Escolha uma regra ou proposta recente e construa uma reductio curta: assuma a premissa, derive uma consequência e diga o que ela mostra. Depois, explique se a consequência decorre mesmo da posição original ou de uma versão ampliada por você.",
    "규칙이나 제안을 하나 골라 귀류법으로 시험하고, 그 결론이 원래 주장에서 정말 따라오는지 설명해 보세요.",
    ["Enuncie a posição original com suas exceções, sem já enfraquecê-la.", "Assuma a premissa em uma frase com -ㄴ다면.", "Derive a consequência com -ㄹ 것이다.", "Diga por que a consequência é inaceitável para quem defende a posição.", "Verifique se você não ampliou o domínio da regra.", "Feche com o que a reductio mostra e o que ela não mostra."],
    ["Posição original preservada.", "Premissa assumida sem caricatura.", "Consequência derivada com necessidade.", "Limite da reductio avaliado.", "Duas formas-alvo usadas com função clara.", "Fechamento que não exagera o resultado."],
    "도서관에서 음식 반입을 전면 금지하자는 규칙을 시험해 보겠다. 이 규칙이 성립하려면 ‘음식은 도서관의 목적과 항상 충돌한다’는 전제가 필요하다. 그 전제를 받아들인다면, 물 한 병도 금지되어야 할 것이다. 더 나아가 약을 먹는 일도, 당이 떨어져 간식을 꺼내는 일도 금지되어야 한다. 그런데 이런 결론은 도서관 이용자의 건강과 접근성을 해친다. 여기서 귀류법은 규칙의 전제가 지나치게 넓다는 점을 보여 준다. 다만 주의할 점이 있다. 원래 제안은 ‘냄새가 강한 음식’을 문제로 삼았을 수 있다. 그렇다면 내가 만든 결론은 원래 주장이 아니라, 내가 확대한 버전을 논박한 셈이다. 따라서 좋은 결론은 ‘모든 음식을 금지하지 말고, 냄새와 소음이 큰 음식만 제한하자’가 되어야 한다. 귀류법은 규칙을 없애는 도구가 아니라, 규칙의 범위를 정확히 하게 만드는 도구다.",
    "Vou testar a regra de proibir completamente a entrada de alimentos na biblioteca. Para que essa regra se sustente, é necessária a premissa de que ‘comida sempre entra em conflito com a finalidade da biblioteca’. Se aceitarmos essa premissa, até uma garrafa de água deveria ser proibida. Mais ainda, tomar remédio ou tirar um lanche porque o açúcar caiu também deveria ser proibido. Mas essa conclusão prejudica a saúde e a acessibilidade dos usuários da biblioteca. Aqui, a reductio mostra que a premissa da regra é ampla demais. Há, porém, um ponto de atenção. A proposta original pode ter tido como problema apenas ‘alimentos com cheiro forte’. Nesse caso, a conclusão que construí refutou não a tese original, mas uma versão que eu ampliei. Por isso, uma boa conclusão seria: ‘Não proibir todos os alimentos, mas restringir apenas os que produzem cheiro e ruído fortes.’ A reductio não é uma ferramenta para eliminar regras, mas para fazer com que seu alcance seja delimitado com precisão.",
    "Exemplo original. O texto constrói a reductio, mas verifica se não ampliou a posição original e corrige o próprio alvo. Exemplo ilustrativo; não é gabarito.",
  ),
});

/** c2-l14 — concessão estratégica e limite da disputa. */
export const C2_L14 = defineC2Lesson({
  id: "c2-l14", number: 14, moduleId: "c2-m03", title: "Concessão estratégica",
  objective: "Usar concessão para fortalecer a posição e delimitar o que está em disputa.",
  prerequisites: ["c2-l13"], estimatedMinutes: 85, dialogueTitle: "O que se pode ceder",
  intro: [
    {
      title: "Conceder para não perder o essencial",
      body: "Conceder não é concordar com tudo. É reconhecer, antes do outro, os pontos que a sua posição realmente não precisa negar. Uma concessão bem feita faz três coisas: mostra que você ouviu, reduz o espaço de disputa e dá credibilidade ao que você vai defender depois. O erro é conceder o que está no centro da questão e chamar isso de flexibilidade. A pergunta decisiva não é ‘o que posso ceder?’, mas ‘o que precisa permanecer para que a minha posição continue sendo a minha posição?’.",
      ko: "핵심을 지키려면, 지엽적인 것부터 기꺼이 내줄 수 있어야 한다.",
    },
    {
      title: "O limite da concessão",
      body: "Toda concessão tem um limite, e esse limite precisa ser dito em voz alta. Se ele fica implícito, o outro lado pode interpretar cada cedência como abertura para pedir mais. A concessão estratégica é diferente da capitulação: ela nomeia o que foi aceito, o que permanece em disputa e por quê. Em uma negociação, esse mapa protege a relação porque impede que as partes descubram tarde demais que estavam falando de coisas diferentes.",
      ko: "양보는 상대의 말을 인정하는 일이지, 내 주장을 포기하는 일이 아니다.",
    },
  ],
  dialogue: [
    ["미라", "일정은 저희가 양보할 수 있어요. 개장을 두 달 늦춰도 괜찮아요.", "No cronograma, podemos ceder. Não há problema em adiar a inauguração em dois meses."],
    ["도현", "그러면 설계 변경도 받아들이시겠어요? 상가 배치를 조정하는 건요.", "Então vocês também aceitariam mudanças no projeto? Ajustar a disposição das lojas?"],
    ["미라", "배치가 바뀌어도 공공 통로가 남는다면 논의할 수 있어요. 다만 통로 폭은 줄일 수 없어요.", "Se o corredor público permanecer, podemos discutir mesmo com a mudança de layout. Mas a largura do corredor não pode diminuir."],
    ["도현", "폭을 유지하면 상가 수가 줄어들어요. 그 점은 인정하시죠?", "Se mantivermos a largura, o número de lojas diminui. Vocês reconhecem isso, certo?"],
    ["미라", "인정해요. 수익이 줄어든다는 점은 저희도 알고 있어요. 하지만 통로를 사유 공간으로 바꾸는 건 별개예요.", "Reconhecemos. Também sabemos que o lucro diminui. Mas transformar o corredor em espaço privado é outra questão."],
    ["도현", "그럼 저희는 주차장 규모를 줄이고, 대신 통로를 유지하는 안을 제시할게요.", "Então apresentaremos uma proposta que reduz o estacionamento e, em troca, mantém o corredor."],
    ["미라", "좋아요. 저희는 마감 시한과 조경 예산에서 물러설 수 있어요. 그 대신 통로의 공공성은 양보안에 넣지 마세요.", "Certo. Podemos recuar no prazo final e no orçamento de paisagismo. Em troca, não incluam a natureza pública do corredor na proposta de concessão."],
    ["도현", "알겠어요. 서로 물러설 수 있는 것과 없는 것을 분명히 했으니, 이제 쟁점이 좁아졌네요.", "Entendido. Como deixamos claro o que cada lado pode ceder e o que não pode, o ponto em disputa agora ficou mais estreito."],
  ],
  readingText: {
    titlePt: "Três concessões e uma linha que não se move",
    paragraphs: [
      "재택근무 확대는 논쟁적이다. 나는 반대쪽의 세 가지 지적을 먼저 인정한다. 첫째, 신입 직원은 옆자리에서 배우는 것이 많다. 둘째, 긴급한 문제를 즉석에서 해결하는 힘은 대면 회의가 여전히 강하다. 셋째, 집에 적절한 공간이 없는 사람에게 재택은 오히려 부담이 된다. 이 세 가지는 모두 타당한 지적이다. 인정하지 않으려고 버티면, 정작 내가 지키려는 주장까지 의심받는다.",
      "그러나 이 세 가지를 인정한다고 해서 논쟁이 끝나는 것은 아니다. 여기서 내가 고수하는 것은 재택근무를 선택할 권리다. 출퇴근에 두 시간을 쓰는 사람, 돌봄 책임을 혼자 지는 사람, 장애로 이동이 어려운 사람에게 재택은 편의가 아니라 조건이다. 이 사람들에게 사무실 출근을 유일한 기준으로 삼으면, 우리는 가장 필요한 사람부터 배제하게 된다. 상대가 제시하는 생산성 저하 우려는 자료와 분석으로 확인할 수 있다. 그러나 선택권 자체를 협상의 대상으로 만들면, 논의는 처음부터 다른 문제가 된다.",
      "전략적으로 보면, 세 가지 지적을 인정하는 것은 약해 보이지 않는다. 오히려 무엇이 쟁점이고 무엇이 아닌지를 분명히 한다. 근무 시간과 평가 방식은 조정할 수 있다. 사무실 공간과 회의 문화도 바꿀 수 있다. 내가 선을 긋는 지점은 하나다. 재택을 원하는 사람에게 그 선택을 빼앗지 않는 것. 지엽적인 조건을 양보하는 것과 핵심을 내주는 것은 다르다. 교집합은 이 선 안에서 얼마든지 만들 수 있다. 예를 들어 주 2일 출근을 기본으로 하되, 예외는 팀이 아니라 당사자가 신청하게 하는 방식이다. 시각차가 크다고 해서 협상이 불가능한 것은 아니다. 다만 타협안에 무엇이 포함되고 무엇이 빠졌는지는 끝까지 확인해야 한다.",
    ],
    pt: "A ampliação do trabalho remoto é polêmica. Começo reconhecendo três críticas do lado contrário. Primeiro, quem acaba de ser contratado aprende muito ao lado de um colega. Segundo, a reunião presencial ainda é forte para resolver problemas urgentes na hora. Terceiro, para quem não tem espaço adequado em casa, o trabalho remoto pode ser um peso. As três críticas são válidas. Se eu me recusar a reconhecê-las, até a tese que quero defender passa a ser suspeita. No entanto, reconhecer essas três coisas não encerra o debate. O que eu sustento aqui é o direito de escolher o trabalho remoto. Para quem gasta duas horas no deslocamento, para quem assume sozinho a responsabilidade de cuidar de alguém e para quem tem dificuldade de locomoção por deficiência, o remoto não é uma comodidade, mas uma condição. Se tomarmos a ida ao escritório como único critério para essas pessoas, começaremos excluindo justamente as mais necessitadas. A preocupação com queda de produtividade pode ser verificada com dados e análise. Mas, se transformarmos o próprio direito de escolha em objeto de negociação, o debate passa a ser outro desde o início. Estrategicamente, reconhecer as três críticas não parece fraqueza. Ao contrário, deixa claro o que está em disputa e o que não está. Horário de trabalho e forma de avaliação podem ser ajustados. Espaço de escritório e cultura de reuniões também podem mudar. O ponto em que traço uma linha é um só: não tirar a escolha de quem quer trabalhar remotamente. Ceder em condições secundárias é diferente de entregar o essencial. A interseção pode ser construída dentro dessa linha. Por exemplo, adotar dois dias presenciais como padrão, mas fazer com que as exceções sejam solicitadas pelo próprio interessado, e não pela equipe. Uma grande diferença de perspectiva não torna a negociação impossível. Só é preciso verificar até o fim o que uma proposta de acordo inclui e o que deixa de fora.",
    objective: "Distinguir as três concessões do ponto que o autor se recusa a ceder e avaliar o que a concessão fortalece.",
  },
  reusedIds: ["ko:자료", "ko:분석", "ko:시각", "ko:조항"],
  grammar: [
    [
      "-ㄹ지언정 — mesmo que seja para",
      "동사 + -ㄹ지언정",
      "Marca uma concessão forte: o falante aceita a primeira consequência, mas recusa a segunda. A estrutura costuma vir seguida de uma negação (‘-지는 않겠다’, ‘-지 않을 것이다’). Compare com -ㄹ지라도, que apenas admite um caso extremo, e com -더라도, mais geral. -ㄹ지언정 dá ênfase ao preço que se está disposto a pagar para não ceder no ponto central; por isso, é frequente em negociações, declarações e textos de posicionamento.",
      [
        ["조경 예산은 줄일지언정, 통로의 공공성은 포기하지 않겠습니다.", "Podemos reduzir o orçamento de paisagismo, mas não abriremos mão do caráter público do corredor."],
        ["일정은 늦출지언정, 안전 점검을 생략하지는 않겠다.", "Podemos atrasar o cronograma, mas não vamos omitir a inspeção de segurança."],
      ],
    ],
    [
      "-ㄴ/는 한이 있더라도 — mesmo que haja a consequência de",
      "동사 + -는 한이 있더라도 / 형용사 + -(으)ㄴ 한이 있더라도",
      "Aceita explicitamente a pior consequência possível para preservar um princípio. É mais dramático e formal que -ㄹ지언정 e costuma aparecer em declarações públicas, discursos e textos de mobilização. Compare com -더라도, que é mais neutro, e com -ㄹ지언정, que enfatiza a troca entre duas ações. Use com moderação: em contexto cotidiano, a forma pode soar excessivamente solene.",
      [
        ["협상이 결렬되는 한이 있더라도, 통로를 사유화하는 조항은 받아들일 수 없다.", "Mesmo que a negociação fracasse, não podemos aceitar a cláusula que privatiza o corredor."],
        ["비판을 받는 한이 있더라도, 조사 결과는 공개해야 한다.", "Mesmo que sejamos criticados, os resultados da investigação devem ser divulgados."],
      ],
    ],
  ],
  guided: [
    mcq("O que a autora concede e o que ela preserva como ponto central?", ["Concede horário, avaliação e espaço; preserva o direito de escolher o trabalho remoto.", "Concede o direito ao remoto; preserva apenas o horário de trabalho.", "Concede tudo, porque reconhece as três críticas do lado contrário."], "Concede horário, avaliação e espaço; preserva o direito de escolher o trabalho remoto.", "As concessões são sobre condições ajustáveis; o direito de escolha é a linha que não se move."),
    cloze("Complete a concessão que preserva o ponto central: 조경 예산은 줄일___ 통로의 공공성은 포기하지 않겠습니다.", "지언정", "-ㄹ지언정 aceita uma perda menor para não ceder no ponto decisivo."),
    listen("Ouça e escreva o que a negociação delimitou.", "서로 물러설 수 있는 것과 없는 것을 분명히 했으니, 이제 쟁점이 좁아졌네요.", "서로 물러설 수 있는 것과 없는 것을 분명히 했으니, 이제 쟁점이 좁아졌네요.", "Como deixamos claro o que cada lado pode ceder e o que não pode, o ponto em disputa agora ficou mais estreito."),
    translate("pt-ko", "Traduza: “Reconheço que os lucros diminuem, mas não abro mão do acesso público.”", "수익이 줄어든다는 점은 인정하지만, 공공 접근권은 양보하지 않겠습니다.", "인정하지만 mantém a concessão; 양보하지 않겠습니다 marca o limite.", ["수익이 줄어든다는 점은 인정합니다. 그러나 공공 접근권은 양보하지 않겠습니다."]),
    reading("여기서 내가 고수하는 것은 재택근무를 선택할 권리다. 출퇴근에 두 시간을 쓰는 사람, 돌봄 책임을 혼자 지는 사람, 장애로 이동이 어려운 사람에게 재택은 편의가 아니라 조건이다.", "Por que a autora chama o trabalho remoto de ‘condição’, e não de ‘comodidade’?", ["Porque, para certos grupos, o remoto é o que torna o trabalho possível.", "Porque todos preferem trabalhar em casa.", "Porque a empresa economiza com o escritório."], "Porque, para certos grupos, o remoto é o que torna o trabalho possível.", "A palavra ‘condição’ desloca o remoto do campo do gosto pessoal para o da possibilidade de participação."),
  ],
  independent: [
    mcq("Qual é a função argumentativa de uma concessão bem feita?", ["Delimitar o que está em disputa e dar credibilidade ao que será defendido depois.", "Concordar com o outro para encerrar o debate mais rápido.", "Evitar que o interlocutor apresente objeções."], "Delimitar o que está em disputa e dar credibilidade ao que será defendido depois.", "A concessão não encerra a disputa: ela a organiza e fortalece a posição no ponto que resta."),
    cloze("Complete a alternativa que preserva a linha: 이 선 안에서 ___은 얼마든지 만들 수 있다.", "타협안", "타협안 é a proposta negociada que pode existir sem cruzar o limite definido."),
    listen("Ouça e escreva o que se deve fazer antes de ceder em algo secundário.", "핵심을 지키려면, 지엽적인 것부터 기꺼이 내줄 수 있어야 한다.", "핵심을 지키려면, 지엽적인 것부터 기꺼이 내줄 수 있어야 한다.", "Para preservar o essencial, é preciso estar disposto a ceder primeiro nas coisas secundárias."),
    translate("ko-pt", "Traduza: 양보는 상대의 말을 인정하는 일이지, 내 주장을 포기하는 일이 아니다.", "Conceder é reconhecer o que o outro diz, não abandonar a própria tese.", "양보 = concessão; 포기하다 = abandonar, desistir de.", ["Uma concessão reconhece a fala do outro; não significa abrir mão da própria posição."]),
    reading("전략적으로 보면, 세 가지 지적을 인정하는 것은 약해 보이지 않는다. 오히려 무엇이 쟁점이고 무엇이 아닌지를 분명히 한다. 근무 시간과 평가 방식은 조정할 수 있다. 사무실 공간과 회의 문화도 바꿀 수 있다. 내가 선을 긋는 지점은 하나다.", "O que a autora ganha ao tornar explícitas as três concessões?", ["Ela separa o que é ajustável do que é inegociável, tornando a disputa mais precisa.", "Ela prova que o trabalho remoto não tem desvantagens.", "Ela evita dizer qual é a sua posição final."], "Ela separa o que é ajustável do que é inegociável, tornando a disputa mais precisa.", "A concessão funciona como mapa: mostra onde a negociação pode avançar e onde ela encontrará um limite."),
  ],
  summary: [
    "Conceder cedo o que não é central aumenta a credibilidade e reduz o espaço da disputa.",
    "O limite da concessão precisa ser dito: sem ele, cada cedência vira convite para pedir mais.",
    "-ㄹ지언정 aceita uma perda menor para preservar o ponto decisivo.",
    "-ㄴ/는 한이 있더라도 aceita até a pior consequência para não abandonar um princípio.",
    "Uma boa concessão não apaga a diferença central; ela a torna mais visível.",
  ],
  production: production(
    "Produção independente · duas concessões e um limite",
    "Defenda uma posição em uma disputa real ou imaginada. Faça duas concessões ao lado contrário, diga com clareza o que permanece em disputa e explique por que esse ponto não pode ser cedido sem descaracterizar a sua posição.",
    "상대의 지적 두 가지를 인정한 뒤, 양보할 수 없는 핵심을 분명히 밝히는 글을 써 보세요.",
    ["Enuncie a posição em uma frase antes das concessões.", "Faça duas concessões específicas, não genéricas.", "Use -ㄹ지언정 ou -ㄴ/는 한이 있더라도 uma vez.", "Nomeie o ponto que não será cedido e justifique.", "Diga o que ainda pode ser negociado dentro desse limite.", "Feche sem transformar a concessão em elogio ao adversário."],
    ["Posição inicial clara.", "Duas concessões específicas.", "Limite nomeado e justificado.", "Espaço de negociação delimitado.", "Uma forma-alvo usada corretamente.", "Diferença central preservada."],
    "나는 중학교에서 휴대전화 사용을 전면 금지하는 규칙에 반대한다. 다만 반대쪽의 지적 두 가지는 인정한다. 첫째, 수업 중 알림 소리는 실제로 수업을 방해한다. 둘째, 시험 시간에는 모든 학생에게 같은 조건이 필요하다. 이 두 가지는 규칙으로 해결할 수 있다. 수업 전에 기기를 보관함에 넣고, 시험 중에는 감독 교사가 수거하는 방식이다. 그러나 등교부터 하교까지 전면 금지는 다른 문제다. 학생은 긴급 연락을 받을 수 있어야 하고, 점심시간에 가족과 연락할 권리도 있다. 규칙이 편의를 넘어서 통제가 되는 순간, 학교는 책임을 가르치는 대신 복종을 가르친다. 나는 수업 중 사용 제한은 받아들일지언정, 종일 금지는 수용하지 않겠다. 대신 교사와 학생이 함께 구역과 시간을 정하는 타협안을 제안한다. 이 타협안이 모든 불편을 없애 주지는 않는다. 그래도 규칙의 목적과 범위를 분명히 한다는 점에서, 전면 금지보다 낫다.",
    "Sou contra a regra que proíbe totalmente o uso de celular em uma escola de ensino fundamental. No entanto, reconheço duas críticas do lado contrário. Primeiro, o som de notificações durante a aula realmente atrapalha. Segundo, em provas todos os alunos precisam das mesmas condições. Esses dois pontos podem ser resolvidos por regras: guardar os aparelhos em um armário antes da aula e recolhê-los durante as provas, por exemplo. Mas a proibição total, da entrada à saída, é outra questão. O estudante precisa poder receber contatos de emergência e tem direito de falar com a família no intervalo do almoço. No momento em que a regra ultrapassa a conveniência e se torna controle, a escola ensina obediência em vez de responsabilidade. Aceito restringir o uso durante as aulas, mas não aceito a proibição o dia inteiro. Em vez disso, proponho uma solução negociada em que professores e estudantes definem juntos áreas e horários. Essa proposta não elimina todo o incômodo. Ainda assim, é melhor que a proibição total porque deixa claros o objetivo e o alcance da regra.",
    "Exemplo original. O texto faz duas concessões verificáveis, nomeia o limite com -ㄹ지언정 e mantém aberto o espaço de negociação. Exemplo ilustrativo; não é gabarito.",
  ),
});

/** c2-l15 — conclusão proporcional e apelo responsável. */
export const C2_L15 = defineC2Lesson({
  id: "c2-l15", number: 15, moduleId: "c2-m03", title: "Conclusão e apelo",
  objective: "Fechar um argumento com conclusão proporcional à evidência e apelo responsável.",
  prerequisites: ["c2-l14"], estimatedMinutes: 85, dialogueTitle: "O último parágrafo",
  intro: [
    {
      title: "A conclusão não pode ser maior que a evidência",
      body: "Um texto pode ser bem argumentado e, ainda assim, terminar mal. Isso acontece quando a conclusão promete mais do que as premissas entregaram: um indício vira certeza, uma hipótese vira diagnóstico, uma melhora local vira transformação geral. A conclusão proporcional não é tímida; ela é exata. Ela diz o que foi demonstrado, com que alcance e sob quais condições. Quando a evidência é forte, a conclusão pode ser forte. Quando é parcial, a conclusão precisa carregar essa parcialidade — não escondê-la atrás de uma frase de efeito.",
      ko: "결론의 크기는 근거의 크기를 넘지 않아야 한다.",
    },
    {
      title: "O apelo que assume responsabilidade",
      body: "Todo texto público termina pedindo algo: que o leitor assine, compareça, vote ou mude de hábito. Um apelo responsável nomeia o destinatário, a ação e o prazo, e não transforma quem discorda em inimigo. Ele também deixa claro o que o próprio autor se compromete a fazer. O apelo irresponsável faz o contrário: fala em nome de ‘todos’, promete resultados que não pode garantir e usa o medo para impedir a pergunta. A força de um apelo não está no volume da emoção, mas na precisão do que ele pede.",
      ko: "촉구는 상대를 탓하는 일이 아니라, 함께 할 일을 구체적으로 제안하는 일이다.",
    },
  ],
  dialogue: [
    ["서윤", "이 문장으로 마무리하면 어떨까요? ‘이제 모두가 나서야 합니다. 그렇지 않으면 이 도시는 끝입니다.’", "Que tal terminar com esta frase? ‘Agora todos precisam agir. Caso contrário, esta cidade está acabada.’"],
    ["민규", "너무 세요. 우리가 제시한 근거는 조사 하나뿐이에요. 결론이 근거보다 훨씬 앞서 나갔어요.", "É forte demais. A única evidência que apresentamos é uma pesquisa. A conclusão saltou muito além da evidência."],
    ["서윤", "그럼 ‘이 도시는 끝입니다’를 빼고, ‘우리가 지금 시작하지 않으면 기회를 잃을 수 있습니다’로 바꿀까요?", "Então tiramos ‘esta cidade está acabada’ e mudamos para ‘se não começarmos agora, podemos perder a oportunidade’?"],
    ["민규", "좋아요. 대신 누가 무엇을 해야 하는지가 빠져 있어요. ‘모두가’는 아무도 책임지지 않게 만들죠.", "Bom. Mas falta quem deve fazer o quê. ‘Todos’ faz com que ninguém se responsabilize."],
    ["서윤", "그럼 구체적으로 써 봅시다. ‘시의회는 다음 달까지 조사 결과를 공개하도록 촉구합니다. 주민은 공청회에 참석해 의견을 내 주시기 바랍니다.’", "Então vamos escrever concretamente: ‘Exortamos o conselho municipal a divulgar os resultados da pesquisa até o próximo mês. Pedimos aos moradores que compareçam à audiência pública e apresentem sua opinião.’"],
    ["민규", "좋아요. 마지막 문장은 서명운동으로 매듭짓는 게 자연스럽겠네요.", "Ótimo. A última frase pode arrematar naturalmente com a campanha de assinaturas."],
    ["서윤", "‘서명은 다음 주 금요일까지 받습니다. 서명하기 전에 자료를 꼭 읽어 주세요.’ 이렇게 하면 책임도 분명해지고요.", "‘As assinaturas serão recebidas até a próxima sexta-feira. Antes de assinar, leiam os dados, por favor.’ Assim a responsabilidade também fica clara."],
    ["민규", "네. 우리가 요구하는 것과 우리가 감당할 책임을 함께 적었으니, 이제 결론이 과장되지 않았어요.", "Sim. Como registramos juntos o que exigimos e a responsabilidade que assumimos, a conclusão agora não está exagerada."],
  ],
  readingText: {
    titlePt: "Dois fechamentos para o mesmo diagnóstico",
    paragraphs: [
      "같은 조사 결과를 두고 두 단체가 서로 다른 마무리를 붙였다. 조사는 지역 공원의 야간 조명이 범죄 불안을 얼마나 줄이는지 물었다. 응답자의 62퍼센트는 조명이 밝아진 뒤 밤에 공원을 더 걷게 되었다고 답했다. 그러나 조사는 한 지역, 한 계절에 머물렀고, 범죄 발생률 자체를 측정하지는 않았다. A 단체의 성명서는 이렇게 끝난다. ‘이것은 재앙이다. 모든 시민은 즉시 거리로 나와야 한다. 조명이 꺼지는 순간, 우리의 안전도 끝난다.’",
      "B 단체의 호소문은 같은 자료를 다르게 매듭짓는다. ‘조사는 한 지역에 머문 한계가 있다. 그러나 밝은 조명이 주민의 외출을 늘렸다는 응답은 무시하기 어렵다. 시의회는 다음 달까지 지역별 조명 현황과 범죄 통계를 공개하도록 촉구한다. 관심 있는 주민은 공청회에 참석해 주시기 바란다. 서명은 공청회 전까지 받는다.’ B 단체는 호소문과 함께 청원을 올렸고, 서명운동은 다음 주 금요일까지 이어진다. 두 글의 길이는 비슷하지만, 결론이 근거에서 얼마나 멀리 가 있는지는 전혀 다르다.",
      "차이는 세 가지다. 첫째, A 단체는 ‘불안이 줄었다’는 응답을 ‘범죄가 줄었다’는 사실로 바꾼다. 둘째, ‘모든 시민’이라는 표현은 책임을 흐린다. 누가 무엇을 해야 하는지 말하지 않기 때문이다. 셋째, A 단체는 자신의 요구가 틀렸을 경우 누가 책임질지를 적지 않는다. 같은 내용도 성명서인지 호소문인지, 결의문인지에 따라 요구의 강도와 책임의 범위가 달라진다. 독자는 문장의 강도보다 근거의 범위를 먼저 봐야 한다. 그래야 호소의 설득력을 판단할 수 있다. 강한 표현이 언제나 나쁜 것은 아니다. 그러나 결론의 크기는 근거의 크기를 넘지 않아야 한다. 촉구는 상대를 탓하는 일이 아니라, 함께 할 일을 구체적으로 제안하는 일이다. 권고와 동참의 문장이 그 뒤를 받쳐야 하는 이유가 여기에 있다.",
    ],
    pt: "Duas organizações deram fechamentos diferentes ao mesmo resultado de pesquisa. A pesquisa perguntou em que medida a iluminação noturna de um parque local reduzia o medo do crime. Sessenta e dois por cento dos entrevistados responderam que, depois que a iluminação ficou mais clara, passaram a caminhar mais à noite no parque. No entanto, a pesquisa se limitou a uma região e a uma estação do ano, e não mediu a taxa de criminalidade em si. O manifesto da organização A termina assim: ‘Isto é uma catástrofe. Todos os cidadãos devem sair imediatamente às ruas. No momento em que as luzes se apagarem, nossa segurança também terá acabado.’ O apelo público da organização B arremata os mesmos dados de outra forma: ‘A pesquisa tem a limitação de ficar restrita a uma região. Mas a resposta de que a iluminação mais clara aumentou as saídas dos moradores é difícil de ignorar. Exortamos o conselho municipal a divulgar, até o próximo mês, a situação da iluminação por região e as estatísticas criminais. Pedimos aos moradores interessados que compareçam à audiência pública e apresentem sua opinião. As assinaturas serão recebidas até a audiência.’ A organização B protocolou uma petição junto com o apelo, e a campanha de assinaturas continua até a próxima sexta-feira. Os dois textos têm extensão parecida, mas a distância entre a conclusão e a evidência é completamente diferente. As diferenças são três. Primeiro, a organização A transforma a resposta ‘o medo diminuiu’ no fato ‘o crime diminuiu’. Segundo, a expressão ‘todos os cidadãos’ turva a responsabilidade, porque não diz quem deve fazer o quê. Terceiro, a organização A não registra quem assumirá a responsabilidade caso sua exigência esteja errada. O mesmo conteúdo muda de intensidade e de alcance de responsabilidade conforme seja um manifesto, um apelo público ou uma moção. O leitor deve olhar primeiro para o alcance da evidência, e não para a intensidade da frase. Só assim pode avaliar a força de persuasão do apelo. Uma expressão forte não é sempre ruim. Mas o tamanho da conclusão não pode ultrapassar o tamanho da evidência. Exortar não é culpar o outro: é propor concretamente o que deve ser feito em conjunto. É por isso que as frases de recomendação e de participação precisam dar sustentação ao que foi dito antes.",
    objective: "Comparar os dois fechamentos e avaliar qual deles mantém a conclusão proporcional à evidência e ao apelo.",
  },
  reusedIds: ["ko:독자", "ko:설득력", "ko:응답자", "ko:호소"],
  grammar: [
    [
      "-도록 촉구하다 — exortar a que",
      "동사 + -도록 촉구하다",
      "Formula um apelo público dirigido a um destinatário identificável, com uma ação clara. É comum em manifestos, petições e declarações institucionais. Compare com -라고 요구하다, que soa mais direto e confrontador, e com -기를 바라다, que apenas expressa expectativa. -도록 촉구하다 pressupõe que o falante tem legitimidade para se dirigir ao destinatário e costuma vir acompanhado de prazo ou de uma obrigação verificável.",
      [
        ["시의회는 다음 달까지 조사 결과를 공개하도록 촉구합니다.", "Exortamos o conselho municipal a divulgar os resultados da pesquisa até o próximo mês."],
        ["위원회는 해당 기관에 즉각적인 안전 점검을 실시하도록 촉구했다.", "O comitê exortou a instituição a realizar imediatamente uma inspeção de segurança."],
      ],
    ],
    [
      "-기를 바란다 — espera-se que",
      "동사 + -기를 바란다 / 명사 + 을/를 바란다",
      "Expressa uma expectativa em registro cortês e formal, comum em comunicados e discursos. Não nomeia obrigação nem prazo por si só; quando usada em um apelo, precisa vir acompanhada de uma ação concreta para não soar vazia. Compare com -기 바랍니다, forma honorífica dirigida ao público, e com -도록 하겠습니다, que anuncia um compromisso do próprio falante. A diferença entre pedir e prometer é decisiva em um fechamento público.",
      [
        ["주민은 공청회에 참석해 의견을 내 주시기 바랍니다.", "Pedimos aos moradores que compareçam à audiência pública e apresentem sua opinião."],
        ["서명 전에 자료를 충분히 읽어 보시기를 바랍니다.", "Esperamos que leiam os dados com atenção antes de assinar."],
      ],
    ],
  ],
  guided: [
    mcq("Qual fechamento mantém a conclusão proporcional à evidência?", ["O da organização B, que reconhece o limite da pesquisa e pede atos verificáveis.", "O da organização A, que transforma o medo em catástrofe iminente.", "Os dois, porque ambos usam a mesma pesquisa."], "O da organização B, que reconhece o limite da pesquisa e pede atos verificáveis.", "B separa o que foi medido do que não foi, nomeia destinatários e prazos, e não converte resposta em fato."),
    cloze("Complete o pedido concreto do fechamento: 관심 있는 주민은 공청회에 참석해 주시기 ___.", "바랍니다", "-기를 바란다 expressa expectativa em registro formal; aqui, acompanhada de uma ação concreta."),
    listen("Ouça e escreva o que o fechamento revisado conseguiu equilibrar.", "우리가 요구하는 것과 우리가 감당할 책임을 함께 적었으니, 이제 결론이 과장되지 않았어요.", "우리가 요구하는 것과 우리가 감당할 책임을 함께 적었으니, 이제 결론이 과장되지 않았어요.", "Como registramos juntos o que exigimos e a responsabilidade que assumimos, a conclusão agora não está exagerada."),
    translate("pt-ko", "Traduza: “O conselho deve divulgar os dados até o próximo mês.”", "시의회는 다음 달까지 자료를 공개하도록 촉구합니다.", "-도록 촉구하다 nomeia o destinatário e a ação pedida, em registro público."),
    reading("A 단체의 성명서는 이렇게 끝난다. ‘이것은 재앙이다. 모든 시민은 즉시 거리로 나와야 한다. 조명이 꺼지는 순간, 우리의 안전도 끝난다.’", "Qual é o principal problema do fechamento da organização A?", ["Ele transforma uma resposta sobre medo em certeza sobre crime e catástrofe, sem nomear responsáveis.", "Ele é curto demais para um manifesto público.", "Ele cita uma pesquisa que não existe."], "Ele transforma uma resposta sobre medo em certeza sobre crime e catástrofe, sem nomear responsáveis.", "O salto entre ‘o medo diminuiu’ e ‘a segurança acabou’ é o que torna a conclusão desproporcional."),
  ],
  independent: [
    mcq("O que distingue um apelo responsável de um apelo manipulador?", ["O responsável nomeia destinatário, ação e limite; o manipulador usa ‘todos’ e medo para impedir perguntas.", "O responsável evita qualquer emoção; o manipulador sempre chora.", "O responsável promete resultados garantidos; o manipulador não promete nada."], "O responsável nomeia destinatário, ação e limite; o manipulador usa ‘todos’ e medo para impedir perguntas.", "A precisão do que se pede e a assunção de responsabilidade são os critérios centrais."),
    cloze("Complete a diferença entre gêneros: 같은 내용도 성명서인지 ___인지에 따라 요구의 강도가 달라진다.", "호소문", "호소문 é o texto de apelo público; o gênero muda a intensidade e o alcance da responsabilidade."),
    listen("Ouça e escreva a regra que limita o tamanho da conclusão.", "결론의 크기는 근거의 크기를 넘지 않아야 한다.", "결론의 크기는 근거의 크기를 넘지 않아야 한다.", "O tamanho da conclusão não pode ultrapassar o tamanho da evidência."),
    translate("ko-pt", "Traduza: 촉구는 상대를 탓하는 일이 아니라, 함께 할 일을 구체적으로 제안하는 일이다.", "Exortar não é culpar o outro, mas propor concretamente o que deve ser feito em conjunto.", "탓하다 = culpar; 구체적으로 = de forma concreta.", ["Uma exortação não acusa o outro: propõe com precisão o que precisa ser feito junto."]),
    reading("강한 표현이 언제나 나쁜 것은 아니다. 그러나 결론의 크기는 근거의 크기를 넘지 않아야 한다. 촉구는 상대를 탓하는 일이 아니라, 함께 할 일을 구체적으로 제안하는 일이다.", "Como o texto equilibra força e responsabilidade no fechamento?", ["Aceita a força expressiva, mas exige que a conclusão permaneça dentro da evidência e que o pedido seja concreto.", "Recomenda que todo texto público evite palavras fortes.", "Diz que a emoção invalida qualquer apelo."], "Aceita a força expressiva, mas exige que a conclusão permaneça dentro da evidência e que o pedido seja concreto.", "O critério não é a intensidade da emoção, mas a proporção entre conclusão, evidência e pedido."),
  ],
  summary: [
    "A conclusão proporcional diz o que foi demonstrado, com que alcance e sob quais condições.",
    "Uma frase de efeito não corrige a distância entre a evidência e a promessa final.",
    "-도록 촉구하다 nomeia destinatário e ação; -기를 바란다 expressa expectativa em registro formal.",
    "Um apelo responsável define quem faz o quê, até quando, e o que o próprio autor assume.",
    "‘Todos’ sem função definida dilui a responsabilidade em vez de mobilizar.",
  ],
  production: production(
    "Produção independente · reescrever um fechamento",
    "Escolha um texto público com um fechamento exagerado — uma notícia, um manifesto, um post. Reescreva apenas o último parágrafo, ajustando a conclusão à evidência e transformando o apelo em uma ação concreta, com destinatário e prazo.",
    "과장된 마무리를 근거에 맞게 고치고, 누가 무엇을 해야 하는지 분명한 마지막 문단을 써 보세요.",
    ["Resuma em uma frase o que a evidência realmente mostra.", "Retire a promessa que o texto não pode sustentar.", "Use -도록 촉구하다 ou -기를 바란다 uma vez.", "Nomeie um destinatário e uma ação verificável.", "Diga o que o próprio autor ou a organização se compromete a fazer.", "Feche sem transformar quem discorda em inimigo."],
    ["Conclusão ajustada à evidência.", "Apelo com destinatário e ação.", "Prazo ou ato verificável.", "Compromisso do próprio autor declarado.", "Uma forma-alvo empregada com função clara.", "Ausência de promessa excessiva."],
    "한 주민단체가 버스 노선 신설을 요구하는 글을 준비하고 있다. 원래 마지막 문단은 이렇게 끝났다. ‘이대로라면 이 동네는 죽습니다. 모든 주민이 당장 나서지 않으면, 우리는 영원히 고립될 것입니다.’ 나는 이 문단을 다음과 같이 고쳐 쓴다. ‘조사에 따르면 이 동네 주민의 68퍼센트가 버스 이용을 위해 다른 동네까지 걸어간다고 답했다. 표본이 300명이라 전체를 대표한다고 단정하기는 어렵다. 그러나 이동 불편이 크다는 점은 분명하다. 주민단체는 시청이 다음 달까지 노선 검토 결과를 공개하도록 촉구한다. 관심 있는 주민은 공청회에 참석해 주시기 바란다. 우리 단체는 검토 자료를 쉽게 정리해 공유하고, 공청회 전까지 의견을 모으겠다. 서명은 공청회 당일까지 받는다.’ 이렇게 쓰면 요구는 여전히 분명하지만, 결론이 근거보다 크지 않고, 누가 무엇을 해야 하는지도 드러난다.",
    "Um grupo de moradores está preparando um texto para pedir a criação de uma linha de ônibus. O parágrafo final original terminava assim: ‘Desse jeito, este bairro morre. Se todos os moradores não agirem agora, ficaremos isolados para sempre.’ Reescrevo o parágrafo da seguinte forma: ‘Segundo a pesquisa, 68% dos moradores deste bairro responderam que caminham até outro bairro para usar o ônibus. Como a amostra foi de 300 pessoas, é difícil afirmar que ela representa o conjunto. No entanto, é claro que a dificuldade de deslocamento é grande. O grupo de moradores exorta a prefeitura a divulgar o resultado da análise da linha até o próximo mês. Pedimos aos moradores interessados que compareçam à audiência pública e apresentem sua opinião. Nosso grupo se compromete a organizar e compartilhar os materiais de forma acessível e a reunir as opiniões até a audiência. As assinaturas serão recebidas até o dia da audiência.’ Escrito assim, a exigência continua clara, mas a conclusão não ultrapassa a evidência e fica visível quem deve fazer o quê.",
    "Exemplo original. O fechamento reescrito reduz a conclusão, nomeia destinatário e prazo e declara o compromisso do próprio grupo. Exemplo ilustrativo; não é gabarito.",
  ),
});
