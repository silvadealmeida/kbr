import { cloze, defineC1Lesson, listen, mcq, reading, translate } from "../shared";
import type { CourseProductionTask } from "../../course-types";

const RUBRIC = [
  { criterion: "task" as const, labelPt: "Cumprimento da tarefa", descriptorPt: "O texto responde ao enunciado e assume o gênero pedido." },
  { criterion: "organization" as const, labelPt: "Organização e progressão", descriptorPt: "Cada parágrafo tem função própria e a argumentação avança em vez de repetir." },
  { criterion: "vocabulary" as const, labelPt: "Vocabulário e colocação", descriptorPt: "Usa léxico preciso do tema, inclusive parte do léxico da lição, com colocações naturais." },
  { criterion: "grammar" as const, labelPt: "Gramática e registro", descriptorPt: "As formas-alvo aparecem corretas e o registro se mantém coerente do início ao fim." },
  { criterion: "argument" as const, labelPt: "Qualidade do argumento", descriptorPt: "A tese é delimitada, sustentada por evidência e responde a uma objeção real." },
  { criterion: "synthesis" as const, labelPt: "Síntese e fechamento", descriptorPt: "A conclusão integra o que foi demonstrado e nomeia o que permanece em aberto." },
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
    minWords: 100,
    rubric: RUBRIC,
    sample: { ko: sampleKo, pt: samplePt, notePt },
  };
}

/** c1-l36 — mapa argumentativo de um artigo longo. */
export const C1_L36 = defineC1Lesson({
  id: "c1-l36", number: 36, moduleId: "c1-m08", title: "Mapear um artigo longo",
  objective: "Ler um artigo de vários parágrafos e reconstruir seu mapa argumentativo.",
  prerequisites: ["c1-c07"], estimatedMinutes: 95, dialogueTitle: "Dois mapas do mesmo artigo",
  intro: [
    {
      title: "O mapa vem antes do resumo",
      body: "Diante de um artigo longo, a primeira tarefa não é resumir: é localizar funções. Marque onde a tese aparece, quais parágrafos a sustentam, em que ponto surge a objeção e como a conclusão responde. Um mapa não repete o conteúdo; ele mostra o trabalho que cada parte faz. Com o mapa pronto, o resumo deixa de ser uma colagem de frases e passa a seguir a linha do argumento.",
      ko: "지도를 그리듯 각 문단의 역할을 먼저 표시하면, 요약은 그다음에 자연스럽게 따라온다.",
    },
    {
      title: "Conectivos que revelam a estrutura",
      body: "Textos longos anunciam sua arquitetura por meio de conectivos. -ㄴ/는 가운데 apresenta o pano de fundo ou a circunstância em que algo ocorre; -ㄴ/는 데다가 acrescenta um fato na mesma direção, muitas vezes agravando o quadro. Ao encontrar essas formas, pare e pergunte: este parágrafo está descrevendo o contexto, somando uma evidência ou preparando uma objeção? A resposta define o lugar do parágrafo no mapa.",
      ko: "물가가 오르는 가운데 임금은 거의 오르지 않았고, 청년 고용은 줄어드는 데다가 근로 시간까지 불안정해졌다.",
    },
  ],
  dialogue: [
    ["민서", "도현 씨, 같은 기사를 읽었는데 우리 지도가 조금 다르네요.", "Dohyeon, lemos a mesma matéria, mas nossos mapas estão um pouco diferentes."],
    ["도현", "그러네요. 저는 둘째 문단을 근거로 표시했어요.", "É verdade. Eu marquei o segundo parágrafo como evidência."],
    ["민서", "저도 처음에는 그렇게 봤는데, 다시 읽으니 둘째 문단 끝에 반론이 시작돼요.", "No começo também vi assim, mas, relendo, a objeção começa no fim do segundo parágrafo."],
    ["도현", "아, ‘다만 표본이 수도권에 치우쳐 있다’는 문장 말이죠?", "Ah, a frase ‘mas a amostra está concentrada na região metropolitana’?"],
    ["민서", "네. 그래서 저는 둘째 문단을 근거와 한계가 겹친 곳으로 표시했어요.", "Sim. Por isso marquei o segundo parágrafo como um ponto em que evidência e limite se sobrepõem."],
    ["도현", "그러면 셋째 문단은 반론에 대한 답이 아니라, 반론을 인정한 뒤 범위를 좁히는 부분이네요.", "Então o terceiro parágrafo não é a resposta à objeção, mas a parte em que ele reconhece a objeção e estreita o alcance."],
    ["민서", "맞아요. 지도에는 ‘반론 인정 → 범위 축소 → 조건부 제안’으로 적었어요.", "Exato. No mapa, escrevi ‘reconhecer a objeção → reduzir o alcance → proposta condicional’."],
    ["도현", "좋아요. 그러면 요약할 때 첫 문단의 주장을 그대로 반복하지 않아도 되겠네요.", "Bom. Então, ao resumir, não precisamos repetir a tese do primeiro parágrafo tal como está."],
  ],
  readingText: {
    titlePt: "O mapa de um artigo sobre entregas",
    paragraphs: [
      "배달 플랫폼 노동을 둘러싼 논쟁은 대개 ‘근로자로 인정할 것인가’라는 질문으로 좁혀진다. 그러나 이 글은 그 질문이 법적 지위에만 집중하다 보니, 실제로 일하는 사람의 시간 배분을 놓친다고 본다. 필자는 2023년 수도권 배달 노동자 240명을 인터뷰한 자료를 근거로 삼아, 지위 논쟁보다 최소 휴식 시간을 먼저 보장해야 한다고 주장한다. 분석 대상은 음식 배달에 한정되며, 다른 플랫폼 업종은 다루지 않는다.",
      "인터뷰에 응한 노동자 가운데 167명은 하루에 열두 시간 이상 접속한 적이 있다고 답했다. 이들은 주문이 몰리는 시간에 집중해서 일하고, 남는 시간에 쉬는 방식으로 소득을 맞춘다고 설명했다. 문제는 이 ‘자유로운 배분’이 실제로는 선택이 아니라는 점이다. 주문이 끊기면 소득도 끊기기 때문에, 쉬는 시간을 늘릴수록 생활비가 부족해진다. 필자는 이 구조를 ‘선택처럼 보이는 압박’이라고 부른다. 다만 인터뷰 표본이 수도권에 치우쳐 있어 전국적 일반화에는 분명한 한계가 있다.",
      "가장 강한 반론은 최소 휴식 시간이 노동자의 소득을 줄일 수 있다는 것이다. 필자도 이 점을 인정하며, 휴식 보장과 소득 보전을 함께 설계해야 한다고 덧붙인다. 결론은 근로자성 판단을 대체하는 것이 아니라, 그 판단이 끝날 때까지 기다릴 수 없는 문제부터 다루자는 제안이다. 마지막 문단은 법적 지위, 소득, 휴식이라는 세 변수를 함께 놓고 정책을 설계해야 한다고 정리한다. 이 글의 주장은 배달 노동을 특별 취급하자는 것이 아니라, 시간을 선택한 것처럼 보이게 만드는 구조를 드러내자는 것이다.",
    ],
    pt: "O debate sobre o trabalho em plataformas de entrega costuma se reduzir à pergunta ‘devemos reconhecê-los como empregados?’. Este artigo, porém, considera que essa pergunta concentra tudo no status jurídico e deixa de lado a distribuição real do tempo de quem trabalha. O autor toma como base entrevistas com 240 entregadores da região metropolitana feitas em 2023 e defende que, antes da disputa sobre o status, seja garantido um tempo mínimo de descanso. O recorte são as entregas de comida; outros setores de plataforma não são tratados. Entre os trabalhadores entrevistados, 167 disseram já ter ficado conectados mais de doze horas em um dia. Eles explicaram que se concentram nos horários de pico e descansam no tempo restante para ajustar a renda. O problema é que essa ‘distribuição livre’ não é, na prática, uma escolha. Como, quando os pedidos param, a renda também para, quanto mais aumentam o descanso, mais falta dinheiro para as despesas. O autor chama essa estrutura de ‘pressão que parece escolha’. Há, no entanto, um limite claro para a generalização nacional: a amostra de entrevistas está concentrada na região metropolitana. A objeção mais forte é que o tempo mínimo de descanso pode reduzir a renda dos trabalhadores. O autor também reconhece esse ponto e acrescenta que a garantia de descanso deve ser desenhada junto com a proteção da renda. A conclusão não substitui o julgamento sobre o vínculo de emprego; propõe tratar primeiro o problema que não pode esperar até que esse julgamento termine. O último parágrafo resume que a política deve ser desenhada colocando lado a lado três variáveis: status jurídico, renda e descanso. A tese do texto não é dar tratamento especial às entregas, mas revelar a estrutura que faz o tempo parecer uma escolha.",
    objective: "Mapear tese, evidências, objeções e conclusão do artigo, distinguindo função de conteúdo.",
  },
  reusedIds: ["ko:문제", "ko:근거", "ko:분석", "ko:집중하다"],
  grammar: [
    [
      "-ㄴ/는 가운데 — em meio a; enquanto (circunstância)",
      "동사 + -는 가운데 / 형용사 + -(으)ㄴ 가운데 / 명사 + (의) 가운데",
      "Apresenta a circunstância ou o pano de fundo em que outro fato ocorre, muitas vezes com a ideia de que algo segue seu curso apesar disso. É comum na escrita jornalística e acadêmica. Compare com -는 동안, que é apenas temporal e neutro; -는 가운데 acrescenta a noção de ambiente ou situação em curso. Também pode aparecer como 가운데에서, com o mesmo valor. Não use para uma sequência simples de ações do mesmo sujeito.",
      [
        ["물가가 오르는 가운데에서도 임금은 거의 변하지 않았다.", "Mesmo em meio à alta dos preços, os salários quase não mudaram."],
        ["논쟁이 이어지는 가운데 새로운 자료가 공개되었다.", "Enquanto o debate prosseguia, novos dados foram divulgados."],
      ],
    ],
    [
      "-ㄴ/는 데다가 — além de; somando-se a",
      "동사/형용사 + -ㄴ/는 데다가 / 명사 + 인 데다가",
      "Acrescenta um segundo fato na mesma direção do primeiro, com frequência agravando a situação descrita. É típico da escrita argumentativa e de relatos. Compare com -ㄹ 뿐더러, que também soma, mas costuma ter força avaliativa mais forte; -는 데다가 é mais descritivo e aceita adjetivos com naturalidade. A segunda oração não pode ser uma ordem, um convite ou uma promessa. Registro: neutro a formal, sobretudo escrito.",
      [
        ["인터뷰 표본이 수도권에 치우친 데다가 응답률도 낮아 일반화가 어렵다.", "Além de a amostra de entrevistas estar concentrada na região metropolitana, a taxa de resposta foi baixa, o que dificulta a generalização."],
        ["보고서는 근거가 부족한 데다가 결론도 성급하다.", "O relatório, além de carecer de evidências, tem uma conclusão precipitada."],
      ],
    ],
  ],
  guided: [
    mcq("Qual é a função do terceiro parágrafo do artigo?", ["Reconhecer a objeção mais forte e reduzir o alcance da proposta.", "Repetir os números do segundo parágrafo.", "Apresentar um setor de plataforma que o artigo não havia citado."], "Reconhecer a objeção mais forte e reduzir o alcance da proposta.", "O terceiro parágrafo admite a crítica sobre a renda e transforma a conclusão em uma proposta condicional."),
    cloze("Complete a circunstância: 물가가 오르는 ___ 임금은 거의 오르지 않았다.", "가운데", "-는 가운데 apresenta o pano de fundo em que o outro fato ocorre."),
    listen("Ouça e escreva a proposta central do artigo.", "필자는 지위 논쟁보다 최소 휴식 시간을 먼저 보장해야 한다고 주장한다.", "필자는 지위 논쟁보다 최소 휴식 시간을 먼저 보장해야 한다고 주장한다.", "O autor defende que, antes da disputa sobre o status, seja garantido um tempo mínimo de descanso."),
    reading("인터뷰에 응한 노동자 가운데 167명은 하루에 열두 시간 이상 접속한 적이 있다고 답했다. 이들은 주문이 몰리는 시간에 집중해서 일하고, 남는 시간에 쉬는 방식으로 소득을 맞춘다고 설명했다. 다만 인터뷰 표본이 수도권에 치우쳐 있어 전국적 일반화에는 분명한 한계가 있다.", "Por que o artigo não generaliza o resultado para todo o país?", ["Porque a amostra está concentrada na região metropolitana.", "Porque todos os entrevistados trabalham há menos de um mês.", "Porque o estudo foi feito apenas com empresas de comida."], "Porque a amostra está concentrada na região metropolitana.", "O texto declara que a concentração regional da amostra limita a generalização nacional."),
    translate("pt-ko", "Traduza: “Além de o emprego juvenil diminuir, as horas de trabalho ficaram instáveis.”", "청년 고용이 줄어드는 데다가 근로 시간까지 불안정해졌다.", "-ㄴ/는 데다가 soma um segundo fato na mesma direção, agravando o quadro.", ["청년 고용이 줄어드는 데다가 근로 시간까지 불안정해졌어요."]),
  ],
  independent: [
    mcq("Qual frase usa -ㄴ/는 데다가 corretamente?", ["보고서는 근거가 부족한 데다가 결론도 성급하다.", "보고서는 근거가 부족하는 데다가 결론도 성급하다.", "보고서는 근거가 부족할 데다가 결론도 성급하라."], "보고서는 근거가 부족한 데다가 결론도 성급하다.", "Com adjetivo, a forma é -(으)ㄴ 데다가: 부족한 데다가."),
    cloze("Complete o limite da amostra: 인터뷰 표본이 수도권에 치우쳐 있어 전국적 일반화에는 뚜렷한 ___가 있다.", "한계", "O texto aponta a concentração regional como limite explícito da generalização."),
    listen("Ouça e escreva como o autor resume a conclusão.", "결론은 근로자성 판단을 대체하는 것이 아니라, 당장 다뤄야 할 문제부터 손대자는 제안이다.", "결론은 근로자성 판단을 대체하는 것이 아니라, 당장 다뤄야 할 문제부터 손대자는 제안이다.", "A conclusão não substitui o julgamento sobre o vínculo, mas propõe começar pelo problema que precisa ser tratado já."),
    translate("ko-pt", "Traduza: 주문이 끊기면 소득도 끊기기 때문에, 쉬는 시간을 늘릴수록 생활비가 부족해진다.", "Como, quando os pedidos param, a renda também para, quanto mais aumenta o descanso, mais falta dinheiro para as despesas.", "A relação causal é marcada por -기 때문에; 늘릴수록 indica proporção.", ["Quando os pedidos param, a renda para junto, então quanto mais descanso, mais falta dinheiro para viver."]),
    reading("가장 강한 반론은 최소 휴식 시간이 노동자의 소득을 줄일 수 있다는 것이다. 필자도 이 점을 인정하며, 휴식 보장과 소득 보전을 함께 설계해야 한다고 덧붙인다. 결론은 근로자성 판단을 대체하는 것이 아니라, 그 판단이 끝날 때까지 기다릴 수 없는 문제부터 다루자는 제안이다.", "Como o autor responde à objeção sobre a renda?", ["Reconhece o risco e propõe desenhar descanso e proteção da renda em conjunto.", "Nega que o descanso possa afetar a renda.", "Abandona a proposta de tempo mínimo de descanso."], "Reconhece o risco e propõe desenhar descanso e proteção da renda em conjunto.", "O texto admite a objeção e acrescenta a necessidade de proteger a renda junto com o descanso."),
  ],
  summary: [
    "Mapear um artigo longo é localizar a função de cada parte antes de resumir.",
    "Tese, evidência, objeção e conclusão podem ocupar mais de um parágrafo e se sobrepor.",
    "-ㄴ/는 가운데 apresenta a circunstância em que outro fato ocorre.",
    "-ㄴ/는 데다가 soma um fato na mesma direção, geralmente agravando o quadro.",
    "Conteúdo novo permanece em revisão.",
  ],
  production: production(
    "Produção independente · o mapa de um artigo",
    "Escolha um artigo longo que você já leu e escreva um mapa argumentativo em um parágrafo. Diga qual é a tese, quais partes a sustentam, onde surge a objeção mais forte e como a conclusão responde.",
    "읽은 글의 논증 지도를 한 문단으로 정리해 보세요.",
    ["Comece pela tese e pelo recorte, não pelo primeiro parágrafo.", "Use -ㄴ/는 가운데 uma vez para situar o contexto do problema.", "Use -ㄴ/는 데다가 uma vez para somar um segundo fator.", "Termine indicando a objeção e o que a conclusão deixa em aberto."],
    ["Tese e recorte identificados.", "Função de cada parte do artigo.", "Contexto com -ㄴ/는 가운데.", "Segundo fator com -ㄴ/는 데다가.", "Objeção e limite da conclusão nomeados."],
    "이 글은 배달 노동자의 근로 시간을 다룬 기사를 지도처럼 정리한 것이다. 필자의 주장은 근로자성 논쟁보다 최소 휴식 시간을 먼저 보장하자는 것이다. 분석 대상은 수도권 음식 배달로 한정된다. 둘째 문단은 240명 인터뷰를 근거로 삼아, 노동자가 주문이 몰리는 시간에 집중해서 일한다는 점을 보여 준다. 소득이 주문에 묶여 있는 가운데 휴식은 선택처럼 보이지만 실제로는 압박에 가깝다. 표본이 수도권에 치우친 데다가 응답률도 높지 않아 전국적 일반화에는 한계가 있다. 셋째 문단은 소득 감소라는 반론을 인정하고, 휴식 보장과 소득 보전을 함께 설계하자고 제안한다. 이 지도에서 남는 질문은 지방 노동자의 경험이 자료에 없다는 점이다.",
    "Este texto organiza como um mapa uma matéria sobre a jornada dos entregadores. A tese do autor é garantir primeiro um tempo mínimo de descanso, antes do debate sobre o vínculo de emprego. O recorte são as entregas de comida na região metropolitana. O segundo parágrafo usa como base entrevistas com 240 pessoas e mostra que os trabalhadores se concentram nos horários de pico. Em meio a uma renda atrelada aos pedidos, o descanso parece escolha, mas está mais para pressão. Além de a amostra estar concentrada na região metropolitana, a taxa de resposta não foi alta, o que limita a generalização nacional. O terceiro parágrafo reconhece a objeção da queda de renda e propõe desenhar descanso e proteção da renda em conjunto. A pergunta que resta neste mapa é a ausência da experiência de trabalhadores de outras regiões nos dados.",
    "Exemplo original de oito frases. O mapa nomeia funções e conecta evidência, objeção e limite. Exemplo ilustrativo; não é gabarito.",
  ),
});

/** c1-l37 — síntese de três fontes heterogêneas. */
export const C1_L37 = defineC1Lesson({
  id: "c1-l37", number: 37, moduleId: "c1-m08", title: "Sintetizar três fontes",
  objective: "Integrar três fontes heterogêneas em uma síntese com atribuição e divergência.",
  prerequisites: ["c1-l36"], estimatedMinutes: 95, dialogueTitle: "Três fontes, uma mesa",
  intro: [
    {
      title: "Somar não é apagar",
      body: "Sintetizar três fontes não é escolher a que parece mais forte e resumir as outras como apoio. Uma síntese madura mostra o que cada fonte acrescenta, onde elas convergem e onde se separam. Se a sua versão final poderia ser escrita com uma única fonte, as outras duas não entraram de verdade. A atribuição precisa ser verificável: o leitor deve conseguir saber de onde veio cada afirmação.",
      ko: "세 자료를 하나로 묶을 때에는 무엇이 겹치고 무엇이 어긋나는지를 함께 남겨야 한다.",
    },
    {
      title: "Atribuir e qualificar",
      body: "Ao integrar vozes diferentes, o texto precisa marcar quem disse o quê e com que alcance. -ㄴ/는 바 retoma formalmente o conteúdo de uma fonte ou de um argumento anterior; -ㄴ/는 동시에 liga dois fatos que ocorrem juntos, sem transformar um em causa do outro. Use essas formas para construir camadas: primeiro o que a fonte estabelece, depois o que ela não alcança. A síntese ganha precisão quando a atribuição e o limite aparecem na mesma frase.",
      ko: "인터뷰 연구가 밝힌 바에 따르면, 청년은 일자리를 먼저 고려하는 동시에 가족과의 거리도 함께 계산한다.",
    },
  ],
  dialogue: [
    ["하윤", "세 자료를 한 문단으로 줄이려니까 자꾸 한 자료만 남네요.", "Quando tento reduzir os três materiais a um parágrafo, sempre sobra só um deles."],
    ["준호", "그건 합친 게 아니라 고른 거예요. 먼저 각 자료가 무엇을 설명하는지 나눠 볼까요?", "Isso não é integrar, é escolher. Vamos primeiro separar o que cada material explica?"],
    ["하윤", "설문은 거주 기간을, 인터뷰는 이주 결정을, 행정 자료는 지원 규모를 보여 줘요.", "A pesquisa mostra o tempo de permanência, a entrevista mostra a decisão de mudar e os dados administrativos mostram a escala do apoio."],
    ["준호", "좋아요. 그러면 설문과 행정 자료는 수렴하고, 인터뷰는 다른 질문에 답하는 거네요.", "Bom. Então a pesquisa e os dados administrativos convergem, e a entrevista responde a outra pergunta."],
    ["하윤", "그런데 인터뷰 결과를 설문의 반례로 쓰면 안 되겠죠?", "Mas não devo usar o resultado da entrevista como contraexemplo da pesquisa, certo?"],
    ["준호", "맞아요. 서로 다른 질문에 답하니까요. 대신 ‘이동’이라는 변수를 추가했다고 써야 해요.", "Exato, porque respondem a perguntas diferentes. Em vez disso, escreva que a entrevista acrescentou a variável ‘mobilidade’."],
    ["하윤", "그러면 첫 문장에 세 자료의 방법을 밝히고, 마지막에 아직 없는 자료를 적을게요.", "Então vou indicar os métodos dos três materiais na primeira frase e, no fim, o material que ainda falta."],
    ["준호", "바로 그게 좋은 합성이에요. 세 목소리를 하나로 만들지 않고, 각각의 자리를 남기는 거죠.", "É exatamente isso uma boa síntese: não transformar três vozes em uma, mas deixar o lugar de cada uma."],
  ],
  readingText: {
    titlePt: "Três fontes sobre moradia jovem",
    paragraphs: [
      "이 글은 청년 주거 지원을 다룬 세 자료를 함께 읽는다. 첫째는 전국 2,000가구를 대상으로 한 설문 조사이고, 둘째는 수도권 청년 30명을 심층 인터뷰한 질적 연구이며, 셋째는 지자체가 공개한 행정 자료다. 세 자료는 방법도 규모도 다르지만, 모두 주거비 부담이 청년의 이주와 취업 결정에 영향을 준다고 본다. 다만 각 자료가 설명하는 범위는 서로 다르다. 설문은 경향을, 인터뷰는 이유를, 행정 자료는 실제 지원의 규모를 보여 준다.",
      "설문 조사와 행정 자료는 주거비 지원이 거주 기간을 늘리는 데 기여한다는 결과를 보여 준다. 반면 인터뷰 연구는 지원이 있어도 일자리를 따라 다른 지역으로 옮기는 청년이 적지 않다고 보고한다. 두 결과가 상충하는 것은 아니다. 한쪽은 남는 결정을, 다른 쪽은 떠나는 결정을 설명하기 때문이다. 다만 인터뷰 연구의 참여자가 수도권에 한정되어 있어, 지방 청년의 경험은 자료에 드러나지 않는다. 이 공백은 세 자료를 합쳐도 메워지지 않는다.",
      "세 자료가 수렴하는 지점은 주거비가 이동의 유일한 원인이 아니라는 사실이다. 청년은 주거비뿐 아니라 일자리, 관계, 돌봄을 함께 고려해 이동한다. 따라서 지원의 효과는 ‘얼마나 오래 머무는가’만으로 평가할 수 없다. 정책은 거주 기간을 늘리는 데서 멈추지 않고, 옮겨 간 사람이 새 지역에서 안정을 찾도록 돕는 단계까지 포함해야 한다. 이 글의 결론은 지원을 늘리자는 주장이 아니라, 지원의 성과를 이동의 맥락에서 다시 정의하자는 제안이다. 지방 청년을 대상으로 한 자료가 없다는 점은 남은 과제로 적어 둔다.",
    ],
    pt: "Este texto lê em conjunto três materiais sobre apoio à moradia de jovens. O primeiro é uma pesquisa por questionário com 2.000 domicílios em todo o país; o segundo, um estudo qualitativo com entrevistas em profundidade de 30 jovens da região metropolitana; o terceiro, dados administrativos divulgados por um governo local. Os três materiais diferem em método e escala, mas todos consideram que o peso do custo de moradia influencia as decisões de mudança e de emprego dos jovens. O alcance de cada material, porém, é diferente. A pesquisa mostra tendências, a entrevista mostra motivos e os dados administrativos mostram a escala real do apoio. A pesquisa e os dados administrativos indicam que o auxílio para moradia contribui para aumentar o tempo de permanência. Já o estudo de entrevistas relata que não são poucos os jovens que, mesmo com o apoio, se mudam para outra região em busca de trabalho. Os dois resultados não se contradizem: um explica a decisão de ficar, o outro a decisão de partir. No entanto, como os participantes da entrevista se limitam à região metropolitana, a experiência de jovens do interior não aparece nos dados. Essa lacuna não é preenchida nem somando os três materiais. O ponto em que os três convergem é o fato de o custo de moradia não ser a única causa da mobilidade. Os jovens consideram, junto com a moradia, emprego, relações e cuidado. Por isso, o efeito do apoio não pode ser avaliado apenas por ‘quanto tempo a pessoa permanece’. A política não deve parar em aumentar o tempo de residência; precisa incluir a etapa de ajudar quem se mudou a encontrar estabilidade na nova região. A conclusão deste texto não é defender mais apoio, mas redefinir o sucesso do apoio no contexto da mobilidade. A ausência de dados sobre jovens de outras regiões fica registrada como tarefa pendente.",
    objective: "Mapear contribuição, convergência e divergência das três fontes, com atribuição explícita.",
  },
  reusedIds: ["ko:자료", "ko:결과", "ko:일자리", "ko:조사"],
  grammar: [
    [
      "-ㄴ/는 바 — o fato de que; aquilo que (retomada formal)",
      "동사 + -는 바 / 형용사 + -(으)ㄴ 바 / 명사 + 인 바",
      "Retoma formalmente um conteúdo já apresentado ou o teor de uma fonte, sobretudo em relatórios e textos acadêmicos. Aparece em expressões fixas como -는 바에 따르면 e -는 바이다. Compare com -는 것, neutro e muito mais amplo; -는 바 é marcado, escrito e frequentemente remete a uma fonte ou a uma conclusão anterior. Não use em conversa casual nem como substituto geral de 것 em qualquer contexto.",
      [
        ["인터뷰 연구가 밝힌 바에 따르면, 청년은 일자리를 우선 고려한다.", "Segundo o que o estudo de entrevistas revelou, os jovens consideram o emprego em primeiro lugar."],
        ["이 글에서 말하고자 하는 바는 지원의 성과를 다시 정의하자는 것이다.", "O que este texto pretende dizer é que se redefina o sucesso do apoio."],
      ],
    ],
    [
      "-ㄴ/는 동시에 — ao mesmo tempo que; e também",
      "동사/형용사 + -ㄴ/는 동시에 / 명사 + 인 동시에",
      "Liga dois fatos que coexistem, podendo ser complementares ou contrastantes. É comum na escrita analítica para mostrar que duas dimensões são verdadeiras ao mesmo tempo. Compare com -(으)면서, que descreve ações do mesmo sujeito em sequência ou simultaneidade e é mais oral; -ㄴ/는 동시에 é mais formal e aceita sujeitos e dimensões diferentes. Não use para uma relação de causa e efeito.",
      [
        ["지원은 거주 기간을 늘리는 동시에 이동의 자유를 제한할 수 있다.", "O apoio pode aumentar o tempo de permanência e, ao mesmo tempo, limitar a liberdade de se mudar."],
        ["설문은 경향을 보여 주는 동시에 개인의 이유를 설명하지는 못한다.", "A pesquisa mostra tendências e, ao mesmo tempo, não explica as razões individuais."],
      ],
    ],
  ],
  guided: [
    mcq("O que os três materiais têm em comum?", ["Todos consideram que o custo de moradia influencia as decisões dos jovens.", "Todos usam a mesma amostra de 2.000 domicílios.", "Todos concluem que o apoio deve ser reduzido."], "Todos consideram que o custo de moradia influencia as decisões dos jovens.", "O texto afirma que os três veem o peso da moradia nas decisões de mudança e emprego."),
    cloze("Complete a divergência aparente: 두 결과가 ___하는 것은 아니다.", "상충", "O texto explica que os resultados não se contradizem porque respondem a perguntas diferentes."),
    listen("Ouça e escreva o ponto em que as três fontes convergem.", "세 자료가 수렴하는 지점은 주거비가 이동의 유일한 원인이 아니라는 사실이다.", "세 자료가 수렴하는 지점은 주거비가 이동의 유일한 원인이 아니라는 사실이다.", "O ponto em que os três materiais convergem é o fato de o custo de moradia não ser a única causa da mobilidade."),
    reading("설문 조사와 행정 자료는 주거비 지원이 거주 기간을 늘리는 데 기여한다는 결과를 보여 준다. 반면 인터뷰 연구는 지원이 있어도 일자리를 따라 다른 지역으로 옮기는 청년이 적지 않다고 보고한다. 두 결과가 상충하는 것은 아니다.", "Por que os resultados não se contradizem?", ["Porque um explica a decisão de ficar e o outro a de partir.", "Porque os dois usam exatamente a mesma amostra.", "Porque ambos foram feitos pelo mesmo pesquisador."], "Porque um explica a decisão de ficar e o outro a de partir.", "Cada material ilumina uma decisão diferente: permanecer ou mudar."),
    translate("pt-ko", "Traduza: “A pesquisa mostra tendências e, ao mesmo tempo, não explica as razões individuais.”", "설문은 경향을 보여 주는 동시에 개인의 이유를 설명하지는 못한다.", "-ㄴ/는 동시에 liga dois fatos coexistentes, sem transformar um em causa do outro.", ["설문은 경향을 보여 주는 동시에 개인의 이유를 설명하지는 못해요."]),
  ],
  independent: [
    mcq("Qual frase usa -ㄴ/는 동시에 corretamente?", ["이 정책은 비용을 늘리는 동시에 접근성을 높인다.", "이 정책은 비용을 늘리면서 동시에 접근성을 높여라.", "이 정책은 비용을 늘릴 동시에 접근성을 높였다."], "이 정책은 비용을 늘리는 동시에 접근성을 높인다.", "A forma correta é -는 동시에, ligando dois fatos coexistentes."),
    cloze("Complete a convergência das fontes: 세 자료가 ___하는 지점은 주거비가 이동의 유일한 원인이 아니라는 사실이다.", "수렴", "수렴 indica o ponto em que as três fontes se aproximam sem apagar suas diferenças."),
    listen("Ouça e escreva o que a entrevista acrescenta à síntese.", "인터뷰 연구는 지원이 있어도 일자리를 따라 이동하는 청년이 적지 않다고 본다.", "인터뷰 연구는 지원이 있어도 일자리를 따라 이동하는 청년이 적지 않다고 본다.", "O estudo de entrevistas considera que não são poucos os jovens que se mudam em busca de trabalho mesmo com o apoio."),
    translate("ko-pt", "Traduza: 청년은 주거비뿐 아니라 일자리, 관계, 돌봄을 함께 고려해 이동한다.", "Os jovens se mudam considerando não só o custo de moradia, mas também emprego, relações e cuidado.", "뿐 아니라 acrescenta dimensões; 함께 고려해 indica consideração conjunta.", ["Os jovens decidem se mudar levando em conta emprego, relações e cuidado, além do custo de moradia."]),
    reading("세 자료가 수렴하는 지점은 주거비가 이동의 유일한 원인이 아니라는 사실이다. 청년은 주거비뿐 아니라 일자리, 관계, 돌봄을 함께 고려해 이동한다. 따라서 지원의 효과는 ‘얼마나 오래 머무는가’만으로 평가할 수 없다.", "Qual é a consequência metodológica dessa convergência?", ["O efeito do apoio não pode ser medido apenas pelo tempo de permanência.", "O apoio deve ser avaliado somente pela escala do orçamento.", "A entrevista substitui a pesquisa e os dados administrativos."], "O efeito do apoio não pode ser medido apenas pelo tempo de permanência.", "Se a mobilidade depende de vários fatores, o tempo de permanência isolado não basta como medida."),
  ],
  summary: [
    "Sintetizar três fontes exige mostrar o que cada uma acrescenta, não escolher uma e citar as outras.",
    "Convergência e divergência podem coexistir quando as fontes respondem a perguntas diferentes.",
    "-ㄴ/는 바 retoma formalmente o teor de uma fonte ou de uma conclusão.",
    "-ㄴ/는 동시에 liga dois fatos coexistentes, sem afirmar causalidade.",
    "Conteúdo novo permanece em revisão.",
  ],
  production: production(
    "Produção independente · síntese de três fontes",
    "Reúna três fontes que tratam do mesmo tema por métodos diferentes e escreva uma síntese de seis a oito frases. Diga o que cada fonte acrescenta, onde convergem, onde divergem e qual lacuna permanece.",
    "방법이 다른 세 자료를 하나의 글로 종합해 보세요.",
    ["Apresente método e alcance de cada fonte na abertura.", "Use -ㄴ/는 바 uma vez para retomar o que uma fonte estabelece.", "Use -ㄴ/는 동시에 uma vez para ligar duas dimensões.", "Não transforme divergência em erro de uma das fontes.", "Termine nomeando a lacuna que nenhuma das três preenche."],
    ["Três fontes identificadas por método.", "Contribuição de cada uma.", "Convergência explícita.", "Divergência explicada, não apagada.", "Lacuna final nomeada."],
    "이 글은 청년 주거 지원을 다룬 세 자료를 종합한다. 설문 조사는 전국 2,000가구의 경향을, 인터뷰 연구는 수도권 청년 30명의 이유를, 행정 자료는 지원의 실제 규모를 보여 준다. 설문과 행정 자료가 밝힌 바에 따르면, 지원은 거주 기간을 늘리는 데 기여한다. 반면 인터뷰 연구는 지원이 있어도 일자리를 따라 이동하는 청년이 적지 않다고 보고한다. 두 결과는 서로 모순되지 않는다. 한쪽은 남는 결정을, 다른 쪽은 떠나는 결정을 설명하는 동시에 이동의 이유가 하나가 아님을 보여 주기 때문이다. 세 자료가 수렴하는 지점은 주거비가 이동의 유일한 원인이 아니라는 사실이다. 다만 지방 청년의 경험이 자료에 없다는 점은 남은 과제다. 후속 연구는 이동한 청년의 정착 과정을 추적해야 한다.",
    "Este texto sintetiza três materiais sobre apoio à moradia de jovens. A pesquisa mostra tendências de 2.000 domicílios no país, o estudo de entrevistas mostra os motivos de 30 jovens da região metropolitana e os dados administrativos mostram a escala real do apoio. Segundo o que a pesquisa e os dados administrativos revelam, o apoio contribui para aumentar o tempo de permanência. Já o estudo de entrevistas relata que não são poucos os jovens que se mudam em busca de trabalho mesmo com o apoio. Os dois resultados não se contradizem. Um explica a decisão de ficar e o outro a de partir e, ao mesmo tempo, mostra que a razão da mobilidade não é única. O ponto em que os três convergem é o fato de o custo de moradia não ser a única causa da mudança. Falta, porém, a experiência de jovens de outras regiões nos dados. Estudos posteriores devem acompanhar o processo de estabilização de quem se mudou.",
    "Exemplo original de oito frases. As três fontes mantêm seu lugar; a divergência é explicada, não apagada. Exemplo ilustrativo; não é gabarito.",
  ),
});

/** c1-l38 — defender uma posição com evidência, objeção e limite. */
export const C1_L38 = defineC1Lesson({
  id: "c1-l38", number: 38, moduleId: "c1-m08", title: "Defender uma posição",
  objective: "Defender uma posição em texto argumentativo com evidência, objeção e limite.",
  prerequisites: ["c1-l37"], estimatedMinutes: 95, dialogueTitle: "Duas objeções fortes",
  intro: [
    {
      title: "Defender é sustentar, não gritar",
      body: "Defender uma posição em C1 significa tornar explícito o que a sustenta e o que a limita. Uma tese sem evidência é opinião; uma evidência sem limite vira promessa. O texto precisa mostrar por que a posição é razoável mesmo quando o leitor não a aceita de imediato. Por isso, a defesa inclui três movimentos: apresentar o critério, demonstrar com dados e dizer em que condições a própria posição deixaria de valer.",
      ko: "주장을 펼칠 때에는 무엇을 근거로 삼았는지와 어떤 조건에서 그 주장이 흔들리는지를 함께 밝혀야 한다.",
    },
    {
      title: "Concessão que não desmonta a tese",
      body: "Conceder um ponto ao adversário não é abandonar a posição. -ㄹ지언정 marca uma concessão forte: admite-se o custo ou a consequência, mas mantém-se uma recusa deliberada. -고자 하다 declara a intenção do texto em registro formal. Juntas, as duas formas permitem dizer: ‘mesmo que isso custe caro, pretendo defender este ponto’. O limite aparece como condição, não como recuo.",
      ko: "비용이 늘어날지언정 판단의 근거를 감추고자 하지는 않는다.",
    },
  ],
  dialogue: [
    ["지안", "발표 잘 들었어요. 그런데 설명 의무가 기업 비용을 너무 키우지 않을까요?", "Gostei da apresentação. Mas a obrigação de explicar não aumentaria demais o custo para as empresas?"],
    ["태우", "타당한 지적이에요. 저도 모든 알고리즘을 공개하자고 주장하지는 않아요.", "É uma crítica válida. Eu também não defendo divulgar todos os algoritmos."],
    ["지안", "그러면 어디까지 공개하자는 건가요?", "Então até onde você propõe divulgar?"],
    ["태우", "탈락 판단에 쓰인 기준의 요약, 그리고 이의 제기 절차예요.", "O resumo dos critérios usados na decisão de eliminação e o procedimento de recurso."],
    ["지안", "기준을 요약해도 차별이 숨겨질 수 있지 않나요?", "Mesmo resumindo os critérios, a discriminação não pode ficar escondida?"],
    ["태우", "그 위험을 인정해요. 그래서 요약 공개만으로 충분하다고 말하지 않고, 외부 감사를 함께 요구해요.", "Reconheço esse risco. Por isso não digo que o resumo basta; exijo também auditoria externa."],
    ["지안", "그렇게 하면 비용이 더 늘어나는데, 그래도 하자는 건가요?", "Assim o custo aumenta ainda mais. Ainda assim você defende fazer?"],
    ["태우", "네. 비용이 늘어날지언정, 탈락자가 자기 평가를 이해할 최소한의 조건은 지켜야 한다고 봐요.", "Sim. Mesmo que o custo aumente, considero que se deve garantir a condição mínima para que o eliminado entenda sua avaliação."],
  ],
  readingText: {
    titlePt: "Por que explicar a decisão",
    paragraphs: [
      "이 글은 채용 과정에서 쓰이는 자동화된 심사 도구의 설명 의무를 주장한다. 필자는 지원자가 탈락 이유를 알 수 없을 때 절차에 대한 신뢰가 무너진다고 본다. 분석 대상은 100명 이상을 선별하는 기업의 1차 서류 심사로 한정한다. 모든 채용을 규제하자는 주장이 아니라는 점을 먼저 밝힌다. 필자가 문제로 삼는 것은 알고리즘의 존재 자체가 아니라, 판단의 근거가 지원자에게 돌아가지 않는 구조다.",
      "2023년 조사에서 구직자 800명 가운데 612명은 탈락 통보에 구체적인 이유가 없었다고 답했다. 이 가운데 74퍼센트는 그 경험이 재지원 의사를 낮췄다고 말했다. 필자는 이 수치를 근거로 설명 의무가 신뢰를 회복할 수 있다고 본다. 가장 강한 반론은 설명 의무가 기업에 과도한 비용을 지운다는 것이다. 필자는 이 반론을 인정하되, 모든 알고리즘의 공개가 아니라 판단 기준의 요약 공개로 범위를 좁힌다. 비용과 신뢰를 함께 고려하자는 판단이다.",
      "그러나 요약 공개만으로 차별을 막을 수 있다고 단정하기는 어렵다. 필자도 이 한계를 인정하며, 외부 감사와 이의 제기 절차를 함께 요구한다. 결론은 설명 의무가 채용의 성공을 보장한다는 것이 아니라, 탈락자가 자기 평가를 이해할 최소한의 조건을 마련하자는 것이다. 이 글은 효율을 포기하자는 주장을 하지 않는다. 오히려 설명 가능한 절차가 장기적으로 기업의 신뢰를 높인다고 본다. 다만 비용 부담이 큰 소규모 기업에는 적용 시점을 달리할 필요가 있다는 점을 남은 과제로 적는다.",
    ],
    pt: "Este texto defende a obrigação de explicar as ferramentas automatizadas de triagem usadas em processos seletivos. O autor considera que, quando o candidato não consegue saber por que foi eliminado, a confiança no procedimento se rompe. O recorte são as triagens de currículo de empresas que selecionam mais de 100 pessoas. Ele deixa claro desde o início que não defende regular toda contratação. O problema apontado não é a existência do algoritmo em si, mas a estrutura em que a base da decisão não retorna ao candidato. Em uma pesquisa de 2023, 612 dos 800 candidatos disseram que a notificação de eliminação não trazia um motivo concreto. Desses, 74% afirmaram que a experiência reduziu a disposição de se candidatar novamente. O autor usa esse número como base para sustentar que a obrigação de explicar pode restaurar a confiança. A objeção mais forte é que essa obrigação impõe custo excessivo às empresas. O autor reconhece a objeção, mas restringe o alcance: não a divulgação de todos os algoritmos, e sim o resumo dos critérios de julgamento. É um juízo que considera custo e confiança em conjunto. No entanto, é difícil afirmar categoricamente que só o resumo público impede a discriminação. O autor também admite esse limite e exige, junto, auditoria externa e procedimento de recurso. A conclusão não é que a obrigação de explicar garanta o sucesso da contratação, mas que se estabeleça a condição mínima para o eliminado entender sua avaliação. O texto não defende abandonar a eficiência. Ao contrário, considera que procedimentos explicáveis aumentam a confiança das empresas no longo prazo. Registra, porém, como tarefa pendente, a necessidade de aplicar prazos diferentes a empresas pequenas, com maior peso de custo.",
    objective: "Reconhecer a estrutura e o limite da posição defendida, incluindo a objeção e a resposta.",
  },
  reusedIds: ["ko:주장", "ko:판단", "ko:자동화", "ko:장기적"],
  grammar: [
    [
      "-고자 하다 — pretender fazer (registro formal)",
      "동사 + -고자 하다",
      "Declara a intenção de quem escreve ou fala em artigos, relatórios e apresentações. A forma -고자 합니다 é comum em contextos institucionais. Compare com -(으)려고 하다, neutro e oral, que também descreve a intenção de terceiros; -고자 하다 soa formal e raramente aparece em conversa informal. Não se usa com adjetivos nem com ordens ou convites. Na defesa de uma posição, ajuda a separar o que o texto pretende demonstrar do que ele apenas sugere.",
      [
        ["이 글은 설명 의무의 범위를 비용과 신뢰의 균형에서 검토하고자 한다.", "Este texto pretende examinar o alcance da obrigação de explicar no equilíbrio entre custo e confiança."],
        ["필자는 모든 알고리즘을 공개할 생각은 없다.", "O autor não tem a intenção de divulgar todos os algoritmos."],
      ],
    ],
    [
      "-ㄹ지언정 — mesmo que seja para; ainda que",
      "동사/형용사 + -ㄹ지언정",
      "Marca uma concessão forte: o falante admite o custo, a consequência ou o cenário negativo, mas mantém uma recusa ou uma escolha deliberada. É típico da escrita argumentativa e do discurso formal. Compare com -아/어도, mais neutro e amplo; -ㄹ지언정 destaca o preço aceito e a determinação de não ceder no ponto seguinte. A segunda oração costuma expressar uma recusa, não uma ordem. Não use para fatos cotidianos sem peso argumentativo.",
      [
        ["비용이 늘어날지언정 판단의 근거를 감추지는 않겠다.", "Mesmo que o custo aumente, não vou esconder a base da decisão."],
        ["속도가 느려질지언정 절차의 투명성을 포기하지 않겠다.", "Ainda que a velocidade diminua, não abrirei mão da transparência do procedimento."],
      ],
    ],
  ],
  guided: [
    mcq("Qual é a tese do texto?", ["Empresas que fazem triagem automatizada devem explicar os critérios aos candidatos.", "Todo algoritmo de contratação deve ser proibido.", "Candidatos devem pagar para conhecer sua avaliação."], "Empresas que fazem triagem automatizada devem explicar os critérios aos candidatos.", "O texto defende a obrigação de explicar os critérios, não a proibição dos algoritmos."),
    cloze("Complete a concessão: 비용이 늘어날___ 판단의 근거를 감추지는 않겠다.", "지언정", "-ㄹ지언정 admite o custo e mantém uma recusa deliberada."),
    listen("Ouça e escreva o que o autor pretende demonstrar.", "이 글은 설명 의무의 범위를 비용과 신뢰의 균형에서 검토하고자 한다.", "이 글은 설명 의무의 범위를 비용과 신뢰의 균형에서 검토하고자 한다.", "Este texto pretende examinar o alcance da obrigação de explicar no equilíbrio entre custo e confiança."),
    reading("가장 강한 반론은 설명 의무가 기업에 과도한 비용을 지운다는 것이다. 필자는 이 반론을 인정하되, 모든 알고리즘의 공개가 아니라 판단 기준의 요약 공개로 범위를 좁힌다. 비용과 신뢰를 함께 고려하자는 판단이다.", "Como o autor responde à objeção do custo?", ["Aceita a objeção e restringe a exigência ao resumo dos critérios.", "Nega que exista qualquer custo adicional.", "Defende que só o governo pague a explicação."], "Aceita a objeção e restringe a exigência ao resumo dos critérios.", "O autor concede o ponto e reduz o escopo da proposta."),
    translate("pt-ko", "Traduza: “Mesmo que o custo aumente, não vou esconder a base da decisão.”", "비용이 늘어날지언정 판단의 근거를 감추지는 않겠다.", "-ㄹ지언정 liga o custo aceito a uma recusa deliberada.", ["비용이 늘어날지언정 판단의 근거를 감추지는 않겠어요."]),
  ],
  independent: [
    mcq("Qual frase mantém a concessão e a recusa?", ["속도가 느려질지언정 절차의 투명성은 포기하지 않겠다.", "속도가 느려지면 절차의 투명성은 포기하겠다.", "속도가 느려질지언정 절차의 투명성을 포기해라."], "속도가 느려질지언정 절차의 투명성은 포기하지 않겠다.", "-ㄹ지언정 introduz o custo aceito; a oração seguinte expressa a recusa mantida."),
    cloze("Complete a limitação reconhecida: 요약 공개만으로 차별을 막을 수 있다고 ___하기는 어렵다.", "단정", "O texto recusa a certeza categórica sobre o efeito do resumo público."),
    listen("Ouça e escreva a condição que acompanha a proposta.", "요약 공개와 함께 외부 감사와 이의 제기 절차를 요구한다.", "요약 공개와 함께 외부 감사와 이의 제기 절차를 요구한다.", "Junto com o resumo público, exige auditoria externa e procedimento de recurso."),
    translate("ko-pt", "Traduza: 설명 의무가 채용의 성공을 보장한다는 것이 아니라, 탈락자가 자기 평가를 이해할 최소한의 조건을 마련하자는 것이다.", "Não se trata de garantir o sucesso da contratação, mas de estabelecer a condição mínima para que o eliminado entenda sua avaliação.", "A estrutura -는 것이 아니라 ... -자는 것이다 contrasta a promessa exagerada com a proposta delimitada.", ["A proposta não promete o sucesso da contratação; cria a condição mínima para o candidato entender a própria avaliação."]),
    reading("그러나 요약 공개만으로 차별을 막을 수 있다고 단정하기는 어렵다. 필자도 이 한계를 인정하며, 외부 감사와 이의 제기 절차를 함께 요구한다. 결론은 설명 의무가 채용의 성공을 보장한다는 것이 아니라, 탈락자가 자기 평가를 이해할 최소한의 조건을 마련하자는 것이다.", "Qual é o limite que o próprio autor reconhece?", ["O resumo público pode não impedir a discriminação sozinho.", "A auditoria externa torna a explicação desnecessária.", "Nenhum candidato quer saber o motivo da eliminação."], "O resumo público pode não impedir a discriminação sozinho.", "O autor admite que o resumo não basta e acrescenta auditoria e recurso."),
  ],
  summary: [
    "Defender uma posição é tornar explícitos critério, evidência, objeção e condição de validade.",
    "Conceder um ponto ao adversário pode fortalecer a tese em vez de enfraquecê-la.",
    "-고자 하다 declara a intenção do texto em registro formal.",
    "-ㄹ지언정 admite o custo e mantém uma recusa deliberada.",
    "Conteúdo novo permanece em revisão.",
  ],
  production: production(
    "Produção independente · uma posição defendida",
    "Defenda uma posição sobre um tema do seu entorno em sete a nove frases. Apresente o critério, uma evidência concreta, a objeção mais forte, a concessão e o limite da própria posição.",
    "근거와 반론을 함께 다루는 주장을 펼쳐 보세요.",
    ["Delimite o objeto na abertura.", "Declare a intenção do texto com -고자 하다.", "Apresente uma objeção real, não uma versão fraca.", "Use -ㄹ지언정 uma vez para conceder sem abandonar a tese.", "Feche dizendo em que condição sua posição deixaria de valer."],
    ["Posição e recorte claros.", "Evidência concreta.", "Objeção forte reconstruída.", "Concessão com -ㄹ지언정.", "Limite da posição declarado."],
    "이 글은 공공기관의 회의록 공개 범위를 넓히자는 주장을 펼치고자 한다. 현재 회의록은 결정만 남기고, 어떤 대안이 왜 제외되었는지는 거의 담지 않는다. 2023년 시민단체 조사에서 정보 공개를 요청한 300건 가운데 214건은 이러한 과정 정보가 빠져 있었다. 이 자료는 공개 범위가 결정의 정당성을 이해하는 데 중요하다는 점을 보여 준다. 가장 강한 반론은 과정까지 공개하면 회의가 위축되고 시간이 길어진다는 것이다. 이 비용은 실제로 발생할 수 있으므로, 나는 모든 발언을 기록하자는 주장을 하지 않는다. 대신 제외된 대안과 그 이유만 요약해 공개하는 조건을 제안한다. 회의가 길어질지언정, 결정의 근거를 시민이 확인할 수 있어야 한다.",
    "Este texto pretende defender a ampliação do alcance da divulgação das atas de reuniões de órgãos públicos. Hoje a ata registra apenas a decisão e quase não diz quais alternativas foram descartadas e por quê. Em um levantamento de 2023 feito por uma entidade civil, 214 dos 300 pedidos de acesso à informação não traziam essas informações de processo. Esses dados mostram que o alcance da divulgação é importante para entender a legitimidade da decisão. A objeção mais forte é que divulgar até o processo inibe as reuniões e as torna mais longas. Esse custo pode de fato ocorrer, por isso não defendo registrar todas as falas. Em vez disso, proponho divulgar um resumo apenas das alternativas descartadas e dos motivos. Ainda que a reunião fique mais longa, o cidadão deve poder verificar a base da decisão.",
    "Exemplo original de oito frases. A objeção é enfrentada no ponto exato, e a concessão não apaga a tese. Exemplo ilustrativo; não é gabarito.",
  ),
});

/** c1-l39 — edição final do ensaio. */
export const C1_L39 = defineC1Lesson({
  id: "c1-l39", number: 39, moduleId: "c1-m08", title: "Editar o ensaio final",
  objective: "Aplicar revisão editorial completa e justificar as escolhas finais.",
  prerequisites: ["c1-l38"], estimatedMinutes: 95, dialogueTitle: "A última revisão",
  intro: [
    {
      title: "Editar é escolher com motivo",
      body: "Na última revisão, cada mudança precisa de um motivo verificável: excesso de generalização, referência ambígua, registro misturado, argumento repetido. Mudar por gosto pessoal não é editar. O protocolo mínimo tem três leituras: uma para o argumento, uma para a coesão e uma para a superfície do texto. Ao final, o autor deve conseguir explicar o que ganhou e o que perdeu em cada corte. Sem essa justificativa, a versão nova é apenas diferente, não necessariamente melhor.",
      ko: "마지막 교정에서는 무엇을 왜 고쳤는지 설명할 수 있어야 하고, 무엇을 포기했는지도 함께 남겨야 한다.",
    },
    {
      title: "Corrigir para que, trocar em vez de",
      body: "Duas formas ajudam a explicitar a edição. -도록 고치다 indica a finalidade da correção: o texto foi alterado para que determinado efeito ocorresse. -ㄴ/는 대신 apresenta a troca: em vez de manter um recurso, escolhe-se outro, com um custo assumido. Usadas juntas, elas transformam a revisão em argumento sobre o próprio texto. O leitor deixa de ver apenas a versão final e passa a entender por que ela é mais adequada.",
      ko: "문장이 짧아지도록 고쳤고, 사례를 늘리는 대신 근거의 범위를 분명히 했다.",
    },
  ],
  dialogue: [
    ["수진", "마지막 원고인데, 첫 문단의 ‘청년 정책은 실패했다’가 여전히 걸려요.", "É o último manuscrito, mas ainda me incomoda o ‘a política para jovens fracassou’ do primeiro parágrafo."],
    ["현우", "저도 그 문장이 너무 넓다고 생각했어요. 어느 정책, 어느 지역인지도 없고요.", "Também acho essa frase ampla demais. Não diz qual política nem qual região."],
    ["수진", "그러면 ‘청년 주거 정책은 특정 지역에서 기대만큼 성과를 내지 못했다’로 고치면 어떨까요?", "Então que tal mudar para ‘a política de moradia jovem não teve o desempenho esperado em certas regiões’?"],
    ["현우", "좋아요. 대신 뒤에 있는 ‘모두가 불만이다’도 손봐야 해요.", "Bom. Mas também precisamos mexer no ‘todos estão insatisfeitos’ que vem depois."],
    ["수진", "그 문장은 삭제하고, 인터뷰에 응한 24명 가운데 17명이 대기 기간을 꼽았다는 기록으로 바꿀게요.", "Vou excluir essa frase e trocar pelo registro de que 17 das 24 pessoas entrevistadas apontaram o tempo de espera."],
    ["현우", "그게 낫네요. 사례를 앞으로 옮기면 주장과 근거의 거리도 줄어들어요.", "É melhor. Se movermos o caso para a frente, a distância entre tese e evidência também diminui."],
    ["수진", "문체도 ‘~했음’으로 끝나던 부분을 ‘~했다’로 고칠까요?", "Devo também corrigir o estilo, trocando as terminações em ‘~했음’ por ‘~했다’?"],
    ["현우", "네, 그렇게 고치도록 합시다. 대신 사례를 줄이면서 잃는 생생함은 각주로 남겨요.", "Sim, vamos corrigir assim. Em vez de perder a vivacidade ao reduzir o caso, deixemos isso numa nota de rodapé."],
  ],
  readingText: {
    titlePt: "O que mudou na última versão",
    paragraphs: [
      "이 글은 한 편의 에세이가 마지막 검토에서 어떻게 달라졌는지 기록한다. 원고의 첫 문단은 ‘청년 정책이 실패했다’는 단정으로 시작했고, 둘째 문단에서는 근거 없이 ‘모두가 불만이다’라고 썼다. 편집자는 먼저 주장의 범위를 좁히고, 근거가 없는 문장을 삭제하도록 요청했다. 셋째 문단에 있던 사례는 앞으로 옮겨 주장과 근거의 거리를 줄였다. 이 과정에서 필자는 문장 몇 개를 잃었지만, 독자가 반박할 지점은 오히려 선명해졌다.",
      "수정된 첫 문단은 ‘청년 주거 정책은 특정 지역에서 기대만큼 성과를 내지 못했다’로 시작한다. ‘모두가 불만이다’는 문장은 삭제되었고, 대신 인터뷰에 응한 24명 가운데 17명이 대기 기간을 문제로 꼽았다는 기록이 들어갔다. 필자는 결론에서 정책을 폐기하자는 대신, 배정 기준을 공개하고 대기 기간을 줄이자고 제안한다. 문체도 ‘~했음’으로 끝나던 건조한 어조에서 ‘~했다’로 바뀌었다. 이 변화는 내용을 바꾸지 않으면서도 글의 온도를 조금 높였다.",
      "편집자는 모든 수정에 이유를 붙였다. 예를 들어 ‘실패’라는 단어를 ‘성과가 부족했다’로 고친 것은, 정책 전체를 부정하지 않으면서 문제를 정확히 지적하기 위해서였다. 사례를 앞으로 옮긴 대신, 필자의 해석은 짧아졌다. 이 교환은 손실이 아니라 선택이다. 글은 짧아졌지만, 주장과 근거의 연결은 선명해졌다. 저자는 다음 원고에서도 같은 절차를 적용하겠다고 밝혔다. 편집의 성과는 문장의 수가 아니라, 독자가 따라갈 수 있는 논리의 길이로 측정된다.",
    ],
    pt: "Este texto registra como um ensaio mudou na revisão final. O primeiro parágrafo do original começava com a afirmação categórica ‘a política para jovens fracassou’, e o segundo dizia, sem evidência, que ‘todos estão insatisfeitos’. A editora pediu primeiro que se estreitasse o alcance da tese e se excluísse a frase sem base. O caso que estava no terceiro parágrafo foi movido para a frente, reduzindo a distância entre tese e evidência. Nesse processo, o autor perdeu algumas frases, mas os pontos em que o leitor poderia discordar ficaram mais claros. O primeiro parágrafo revisado começa com ‘a política de moradia jovem não teve o desempenho esperado em certas regiões’. A frase ‘todos estão insatisfeitos’ foi excluída e, em seu lugar, entrou o registro de que 17 das 24 pessoas entrevistadas apontaram o tempo de espera como problema. Na conclusão, o autor, em vez de defender a extinção da política, propõe divulgar os critérios de alocação e reduzir o tempo de espera. O estilo também mudou das terminações secas em ‘~했음’ para ‘~했다’. Essa mudança não alterou o conteúdo, mas elevou um pouco a temperatura do texto. A editora justificou cada alteração. Por exemplo, trocar a palavra ‘fracasso’ por ‘o desempenho foi insuficiente’ serviu para apontar o problema com precisão sem negar a política inteira. Em vez de manter o caso no lugar, a interpretação do autor ficou mais curta. Essa troca não é perda, mas escolha. O texto encurtou, porém a ligação entre tese e evidência ficou mais clara. O autor declarou que aplicará o mesmo procedimento no próximo manuscrito. O resultado da edição não se mede pelo número de frases, mas pelo caminho argumentativo que o leitor consegue percorrer.",
    objective: "Comparar as versões e avaliar o que a revisão melhorou e o que ela sacrificou.",
  },
  reusedIds: ["ko:기록", "ko:근거", "ko:주거", "ko:손실"],
  grammar: [
    [
      "-도록 고치다 — corrigir para que",
      "동사 + -도록 고치다",
      "Expressa a finalidade de uma correção: algo foi alterado para que determinado estado ou efeito passasse a valer. É comum em relatos de revisão, atas e instruções editoriais. Compare com -게 고치다, que descreve o resultado de modo mais direto e neutro; -도록 고치다 destaca a intenção por trás da mudança. Não use quando não há uma correção deliberada, apenas uma transformação natural.",
      [
        ["문장이 길어서 읽기 어려웠으므로 두 문장으로 나누어 고쳤다.", "Como a frase era longa e difícil de ler, dividi-a em duas."],
        ["주장과 근거가 가까워지도록 사례의 위치를 고쳤다.", "Corrigi a posição do exemplo para que tese e evidência ficassem mais próximas."],
      ],
    ],
    [
      "-ㄴ/는 대신 — em vez de; em troca de",
      "동사/형용사 + -ㄴ/는 대신 / 명사 + 대신",
      "Apresenta uma troca: o que se escolhe em lugar de outra coisa, ou o custo assumido em contrapartida. Pode ligar fatos de polaridade oposta e é comum na escrita argumentativa. Compare com -는 대신에, variante mais explícita e igualmente correta; com substantivos, usa-se 대신 diretamente. Não confunda com -는 대신으로, forma inadequada nesse sentido. A segunda parte deve mostrar o que se ganha ou se perde na troca.",
      [
        ["사례를 늘리는 대신 근거의 범위를 분명히 했다.", "Em vez de aumentar os exemplos, deixei claro o alcance da evidência."],
        ["모든 발언을 기록하는 대신 결정에 이른 이유만 남겼다.", "Em vez de registrar todas as falas, mantive apenas as razões que levaram à decisão."],
      ],
    ],
  ],
  guided: [
    mcq("O que a revisão do primeiro parágrafo mudou?", ["Estreitou o alcance da tese, de ‘a política fracassou’ para ‘não teve o desempenho esperado em certas regiões’.", "Trocou o tema do ensaio por outro completamente diferente e mais amplo.", "Acrescentou uma nova objeção ao texto sem revisar a tese principal."], "Estreitou o alcance da tese, de ‘a política fracassou’ para ‘não teve o desempenho esperado em certas regiões’.", "A editora pediu que se reduzisse a generalização da tese."),
    cloze("Complete a finalidade da correção: 문장이 길어서 두 문장으로 나누___ 고쳤다.", "도록", "-도록 고치다 indica a finalidade da correção."),
    listen("Ouça e escreva o que o autor trocou ao reduzir o caso.", "사례의 길이를 줄인 대신 장면의 생생함은 각주에 남겼다.", "사례의 길이를 줄인 대신 장면의 생생함은 각주에 남겼다.", "Encurtei o caso, mas, em troca, preservei a vivacidade da cena numa nota de rodapé."),
    reading("수정된 첫 문단은 ‘청년 주거 정책은 특정 지역에서 기대만큼 성과를 내지 못했다’로 시작한다. ‘모두가 불만이다’는 문장은 삭제되었고, 대신 인터뷰에 응한 24명 가운데 17명이 대기 기간을 문제로 꼽았다는 기록이 들어갔다.", "O que substituiu a frase ‘todos estão insatisfeitos’?", ["O registro de que 17 das 24 pessoas entrevistadas apontaram o tempo de espera.", "Uma nova afirmação de que todos concordam com a política.", "A exclusão de qualquer dado sobre o tema da moradia."], "O registro de que 17 das 24 pessoas entrevistadas apontaram o tempo de espera.", "A frase sem base foi trocada por um dado concreto da entrevista."),
    translate("pt-ko", "Traduza: “Em vez de registrar todas as falas, mantive apenas as razões que levaram à decisão.”", "모든 발언을 기록하는 대신 결정에 이른 이유만 남겼다.", "-ㄴ/는 대신 apresenta a troca entre dois procedimentos.", ["모든 발언을 기록하는 대신 결정에 이른 이유만 남겼어요."]),
  ],
  independent: [
    mcq("Qual frase usa -도록 고치다 corretamente?", ["독자가 이해하기 쉽도록 문장을 고쳤다.", "독자가 이해하기 쉬운도록 문장을 고쳤다.", "독자가 이해하도록 문장을 고쳐라."], "독자가 이해하기 쉽도록 문장을 고쳤다.", "A forma -도록 liga a correção à finalidade: 이해하기 쉽도록."),
    cloze("Complete a troca assumida: 사례를 앞으로 옮긴 ___, 필자의 해석은 짧아졌다.", "대신", "-ㄴ/는 대신 explicita o que se ganha e o que se perde na troca."),
    listen("Ouça e escreva o critério final de avaliação da edição.", "편집의 성과는 문장의 수가 아니라 독자가 따라갈 수 있는 논리의 길이로 측정된다.", "편집의 성과는 문장의 수가 아니라 독자가 따라갈 수 있는 논리의 길이로 측정된다.", "O resultado da edição não se mede pelo número de frases, mas pelo caminho argumentativo que o leitor consegue percorrer."),
    translate("ko-pt", "Traduza: ‘실패’라는 단어를 ‘성과가 부족했다’로 고친 것은 정책 전체를 부정하지 않기 위해서였다.", "Trocar a palavra ‘fracasso’ por ‘o desempenho foi insuficiente’ foi para não negar a política inteira.", "A estrutura -기 위해서였다 explicita a intenção da escolha editorial.", ["A troca de ‘fracasso’ por ‘desempenho insuficiente’ teve o objetivo de não condenar toda a política."]),
    reading("편집자는 모든 수정에 이유를 붙였다. 예를 들어 ‘실패’라는 단어를 ‘성과가 부족했다’로 고친 것은, 정책 전체를 부정하지 않으면서 문제를 정확히 지적하기 위해서였다. 사례를 앞으로 옮긴 대신, 필자의 해석은 짧아졌다. 이 교환은 손실이 아니라 선택이다.", "Como o texto avalia a troca feita na revisão?", ["Como uma escolha consciente, não como perda.", "Como um erro que será desfeito.", "Como uma mudança sem consequências."], "Como uma escolha consciente, não como perda.", "O texto nomeia o que se perdeu e o que se ganhou, e trata a troca como decisão."),
  ],
  summary: [
    "Toda mudança editorial precisa de um motivo verificável, não de preferência pessoal.",
    "O protocolo mínimo revisa argumento, coesão e superfície do texto em leituras separadas.",
    "-도록 고치다 explicita a finalidade de uma correção deliberada.",
    "-ㄴ/는 대신 nomeia a troca e o custo assumido na revisão.",
    "Conteúdo novo permanece em revisão.",
  ],
  production: production(
    "Produção independente · revisão justificada",
    "Escolha um parágrafo seu e revise-o em duas versões: a original e a editada. Depois escreva um texto curto justificando cinco mudanças e dizendo o que você perdeu em cada uma.",
    "자기 글을 고친 뒤, 무엇을 왜 바꿨는지 설명해 보세요.",
    ["Apresente o problema de cada trecho antes da versão nova.", "Use -도록 고치다 uma vez para explicar a finalidade de uma correção.", "Use -ㄴ/는 대신 uma vez para nomear uma troca.", "Diga o que a versão nova perdeu, não apenas o que ganhou.", "Feche com o critério que você usaria na próxima revisão."],
    ["Versão original e versão editada.", "Cinco mudanças com motivo.", "Finalidade com -도록 고치다.", "Troca com -ㄴ/는 대신.", "Perda assumida e critério final."],
    "원고의 첫 문단은 ‘청년 정책은 실패했다’로 시작했다. 이 문장은 범위가 넓어 독자가 반박할 지점을 찾기 어렵게 만들었다. 그래서 대상을 주거 정책과 특정 지역으로 좁히도록 고쳤다. 둘째, 근거 없는 ‘모두가 불만이다’를 삭제했다. 대신 인터뷰 24명 가운데 17명이 대기 기간을 꼽았다는 기록을 넣었다. 셋째, 사례를 앞으로 옮기는 대신 필자의 해석을 줄였다. 넷째, ‘~했음’으로 끝나던 문체를 ‘~했다’로 바꾸었다. 다섯째, 결론의 ‘폐기하자’를 ‘기준을 공개하고 대기 기간을 줄이자’로 고쳤다. 이 과정에서 잃은 것은 사례의 생생함이었지만, 얻은 것은 검증 가능한 주장이었다.",
    "O primeiro parágrafo do manuscrito começava com ‘a política para jovens fracassou’. Essa frase tinha alcance amplo e dificultava ao leitor localizar o ponto de discordância. Por isso corrigi para que o objeto se limitasse à política de moradia e a certas regiões. Segundo, excluí o ‘todos estão insatisfeitos’ sem base. Em vez disso, incluí o registro de que 17 das 24 pessoas entrevistadas apontaram o tempo de espera. Terceiro, em vez de manter o caso no início, reduzi a interpretação do autor. Quarto, troquei o estilo das terminações em ‘~했음’ por ‘~했다’. Quinto, mudei o ‘vamos extinguir’ da conclusão para ‘divulgar os critérios e reduzir o tempo de espera’. Nesse processo, o que se perdeu foi a vivacidade do caso; o que se ganhou foi uma tese verificável.",
    "Exemplo original de oito frases. Cada mudança tem motivo, e a perda é declarada. Exemplo ilustrativo; não é gabarito.",
  ),
});

/** c1-l40 — portfólio C1 e autonomia. */
export const C1_L40 = defineC1Lesson({
  id: "c1-l40", number: 40, moduleId: "c1-m08", title: "Portfólio C1",
  objective: "Integrar leitura, argumento, síntese, mediação e edição em um portfólio autoavaliado.",
  prerequisites: ["c1-l39"], estimatedMinutes: 100, dialogueTitle: "A conversa de encerramento",
  intro: [
    {
      title: "Um portfólio é uma trajetória, não uma vitrine",
      body: "No fim do C1, o portfólio reúne textos de gêneros diferentes: uma análise de fonte, um argumento, uma mediação e uma revisão. O valor não está em mostrar apenas o que ficou pronto, mas em tornar visível o percurso: o que foi tentado, o que foi corrigido e o que ainda falta. Um portfólio honesto inclui a versão que não funcionou. É essa comparação que permite ao leitor — e ao próprio autor — avaliar o aprendizado.",
      ko: "포트폴리오는 완성된 작품만 모은 전시장이 아니라, 무엇을 시도하고 무엇을 고쳤는지 보여 주는 기록이다.",
    },
    {
      title: "Integrar gêneros e fechar o ciclo",
      body: "A integração exige conectores cumulativos: -ㄴ/는 데다가 soma um fator, -ㄴ/는 가운데 situa o contexto, -ㄴ/는 대신 nomeia uma troca e -ㄹ지언정 sustenta uma recusa. Ao revisar o conjunto, verifique se cada texto mantém o próprio registro e se a autoavaliação se apoia em evidências, não em impressões. O próximo passo do C1 não é começar de novo: é escolher uma habilidade para continuar praticando com método.",
      ko: "세 편의 글을 묶으면서, 나는 무엇을 고쳤고 무엇을 아직 고치지 못했는지 함께 적었다.",
    },
  ],
  dialogue: [
    ["재현", "이번 학기 포트폴리오는 어떻게 정리했나요?", "Como você organizou o portfólio deste semestre?"],
    ["은채", "기사 비교, 주거 지원 주장, 갈등 중재 기록 세 편으로 정리했어요.", "Organizei em três textos: uma comparação de matérias, uma defesa sobre apoio à moradia e um registro de mediação de conflito."],
    ["재현", "셋이 서로 다른 갈래인데, 어떤 점이 이어지나요?", "Os três são gêneros diferentes. O que os conecta?"],
    ["은채", "모두 근거의 범위를 밝히는 절차를 공유해요. 주장글에서는 반론을 먼저 인정했고요.", "Todos compartilham o procedimento de explicitar o alcance da evidência. No texto argumentativo, reconheci primeiro a objeção."],
    ["재현", "중재 기록에서는 무엇을 조심했나요?", "No registro de mediação, com o que você teve cuidado?"],
    ["은채", "어느 쪽도 대표하지 않으려고 했어요. 대신 두 집단의 요구를 각각 적고, 합의되지 않은 부분도 남겼어요.", "Tentei não representar nenhum dos lados. Em vez disso, registrei as demandas de cada grupo e deixei também o que não foi acordado."],
    ["재현", "좋아요. 마지막으로, 다음에 가장 먼저 고칠 한 가지는 무엇인가요?", "Bom. Por último, qual é a única coisa que você vai corrigir primeiro da próxima vez?"],
    ["은채", "인용의 정확도예요. 인용마다 전거를 표시하고, 원문에서의 역할도 함께 적을 계획이에요.", "É a precisão das citações. Vou indicar a fonte de cada citação e registrar também seu papel no texto original."],
  ],
  readingText: {
    titlePt: "O que o portfólio mostra",
    paragraphs: [
      "이 포트폴리오는 한 학기 동안 고친 세 편의 글을 묶은 것이다. 첫 글은 배달 노동 기사 두 편을 비교하며, 같은 통계가 서로 다른 결론에 쓰이는 방식을 분석했다. 둘째 글은 청년 주거 지원을 조건부로 확대하자는 주장을 담고 있으며, 비용 문제를 반론으로 세우고 시범 운영을 대안으로 제시한다. 셋째 글은 지역 상인과 청년 단체의 갈등을 중재한 기록을 정리했다. 세 글은 주제도 형식도 다르지만, 모두 근거의 범위를 밝히는 절차를 공유한다.",
      "가장 어려웠던 부분은 둘째 글의 결론이었다. 초고에서는 ‘지원을 늘려야 한다’고만 썼는데, 비용을 우려하는 반론을 다루지 않았다. 수정 과정에서 필자는 반론을 먼저 인정하고, 지원의 규모가 아니라 지원의 조건을 논의하자는 쪽으로 결론을 옮겼다. 이 변화는 주장을 약하게 만든 것이 아니라, 독자가 반대할 지점을 줄였다. 셋째 글에서는 두 집단의 요구를 각각 정리한 뒤, 어느 쪽도 대표하지 않으려고 노력했다. 합의되지 않은 쟁점도 지우지 않고 남겼다.",
      "되돌아보면, 남은 과제는 인용의 정확도다. 필자는 아직 원문의 맥락을 충분히 확인하지 않은 채 문장을 옮긴 적이 있다. 다음 학기에는 인용마다 전거를 표시하고, 인용한 문장이 원문에서 어떤 역할을 하는지 함께 적을 계획이다. 포트폴리오의 완결성은 글의 수보다 이 절차를 얼마나 지켰는가에서 드러난다. 독자는 이 글을 완성된 작품이 아니라 계속 고쳐 나가는 기록으로 읽어 주기 바란다. 세 편의 글은 서로 다른 갈래지만, 같은 질문을 공유한다. 좋은 글은 얼마나 많은 것을 말했는가보다, 무엇을 근거로 말했는가에서 결정된다.",
    ],
    pt: "Este portfólio reúne três textos revisados ao longo de um semestre. O primeiro compara duas matérias sobre trabalho de entrega e analisa como a mesma estatística é usada em conclusões diferentes. O segundo contém a defesa de uma ampliação condicional do apoio à moradia de jovens, apresenta o custo como objeção e propõe um piloto como alternativa. O terceiro organiza o registro da mediação de um conflito entre comerciantes locais e um coletivo de jovens. Os três textos diferem em tema e forma, mas todos compartilham o procedimento de explicitar o alcance da evidência. A parte mais difícil foi a conclusão do segundo texto. No rascunho, o autor escreveu apenas ‘é preciso aumentar o apoio’ e não tratou da objeção relativa ao custo. No processo de revisão, reconheceu primeiro a objeção e deslocou a conclusão para a discussão das condições do apoio, e não do seu volume. Essa mudança não enfraqueceu a tese; reduziu os pontos em que o leitor poderia discordar. No terceiro texto, organizou separadamente as demandas dos dois grupos e tentou não representar nenhum dos lados. Também não apagou os pontos não acordados. Olhando para trás, a tarefa que resta é a precisão das citações. O autor ainda tem passagens em que transportou frases sem conferir suficientemente o contexto do original. No próximo semestre, planeja indicar a fonte documental de cada citação e registrar que papel a frase citada cumpre no texto original. O acabamento do portfólio se revela menos no número de textos do que no quanto esse procedimento foi respeitado. Peço ao leitor que leia este texto não como uma obra concluída, mas como um registro que continua sendo revisado. Os três textos são de gêneros diferentes, mas compartilham a mesma pergunta. Um bom texto se decide menos por quanto diz do que por aquilo em que se baseia para dizer.",
    objective: "Identificar análise, argumento, mediação e revisão no texto final, e a autoavaliação que o acompanha.",
  },
  reusedIds: ["ko:분석", "ko:독자", "ko:포트폴리오", "ko:역할"],
  grammar: [
    [
      "Conectores cumulativos I — -ㄴ/는 가운데 e -ㄴ/는 데다가",
      "동사/형용사 + -ㄴ/는 가운데 / -ㄴ/는 데다가",
      "No fechamento do C1, as duas formas organizam o acúmulo de informações. -ㄴ/는 가운데 situa o contexto em que algo ocorre; -ㄴ/는 데다가 soma um fato na mesma direção. Juntas, permitem apresentar um percurso sem transformar cada etapa em uma lista. Compare com -는 동안 e -ㄹ 뿐더러, suas alternativas mais neutras ou mais avaliativas. Evite encadear mais de duas dessas formas no mesmo parágrafo: o acúmulo deve servir à clareza, não à decoração.",
      [
        ["세 편을 고치는 과정에서, 필자는 반론을 먼저 인정하는 절차를 익혔다.", "Ao revisar os três textos, o autor aprendeu o procedimento de reconhecer primeiro a objeção."],
        ["인용의 맥락을 확인하지 않은 데다가 전거도 밝히지 않아 신뢰를 잃었다.", "Além de não verificar o contexto da citação, não indicou a fonte documental e perdeu credibilidade."],
      ],
    ],
    [
      "Conectores cumulativos II — -ㄴ/는 대신 e -ㄹ지언정",
      "동사/형용사 + -ㄴ/는 대신 / -ㄹ지언정",
      "As duas formas fecham uma avaliação. -ㄴ/는 대신 nomeia a troca: o que se escolhe em lugar de outra coisa e o custo assumido. -ㄹ지언정 admite o cenário negativo e mantém uma recusa deliberada. No portfólio, elas ajudam a explicar por que uma versão foi preferida e o que ela deixou de fora. Compare com -는 대신에, variante mais explícita, e com -아/어도, concessão mais neutra. Não use -ㄹ지언정 para decisões cotidianas sem peso argumentativo.",
      [
        ["글의 수를 늘리는 대신, 한 편을 끝까지 고치는 쪽을 택했다.", "Em vez de aumentar o número de textos, escolhi revisar um até o fim."],
        ["시간이 걸릴지언정 인용의 전거는 빠뜨리지 않겠다.", "Ainda que leve tempo, não vou omitir a fonte documental das citações."],
      ],
    ],
  ],
  guided: [
    mcq("O que os três textos do portfólio compartilham?", ["O procedimento de explicitar o alcance da evidência.", "O mesmo tema e o mesmo gênero.", "A mesma quantidade de palavras."], "O procedimento de explicitar o alcance da evidência.", "O texto afirma que os três, apesar das diferenças, compartilham esse procedimento."),
    cloze("Complete o contexto do percurso: 세 편을 고치는 ___ 필자는 반론을 먼저 인정하는 절차를 익혔다.", "가운데", "-는 가운데 situa o contexto em que o aprendizado ocorreu."),
    listen("Ouça e escreva a tarefa que ainda resta ao autor.", "남은 과제는 인용의 정확도이며, 다음 학기에는 인용마다 전거를 표시할 계획이다.", "남은 과제는 인용의 정확도이며, 다음 학기에는 인용마다 전거를 표시할 계획이다.", "A tarefa que resta é a precisão das citações; no próximo semestre, o autor planeja indicar a fonte de cada citação."),
    reading("가장 어려웠던 부분은 둘째 글의 결론이었다. 초고에서는 ‘지원을 늘려야 한다’고만 썼는데, 비용을 우려하는 반론을 다루지 않았다. 수정 과정에서 필자는 반론을 먼저 인정하고, 지원의 규모가 아니라 지원의 조건을 논의하자는 쪽으로 결론을 옮겼다.", "Como a conclusão do segundo texto mudou?", ["Passou de aumentar o volume para discutir as condições do apoio.", "Passou de apoiar a política para rejeitá-la por completo.", "Passou de um dado estatístico para uma opinião pessoal."], "Passou de aumentar o volume para discutir as condições do apoio.", "O autor reconhece a objeção do custo e desloca o foco para as condições."),
    translate("pt-ko", "Traduza: “Em vez de aumentar o número de textos, escolhi revisar um até o fim.”", "글의 수를 늘리는 대신, 한 편을 끝까지 고치는 쪽을 택했다.", "-ㄴ/는 대신 nomeia a troca entre duas alternativas.", ["글의 수를 늘리는 대신, 한 편을 끝까지 고치는 쪽을 택했어요."]),
  ],
  independent: [
    mcq("Qual frase mantém o registro e a concessão adequados a uma autoavaliação formal?", ["시간이 걸릴지언정 인용의 전거는 빠뜨리지 않겠다.", "시간이 걸릴지언정 인용의 전거는 빼먹을래.", "시간이 걸리면 인용의 전거는 몰라도 된다."], "시간이 걸릴지언정 인용의 전거는 빠뜨리지 않겠다.", "A forma -ㄹ지언정 sustenta uma recusa deliberada em registro formal."),
    cloze("Complete a troca do portfólio: 사례를 늘리는 ___ 근거의 범위를 분명히 했다.", "대신", "-ㄴ/는 대신 apresenta a escolha em lugar de outra."),
    listen("Ouça e escreva o critério que o autor usa para avaliar o próprio portfólio.", "좋은 글은 얼마나 많은 것을 말했는가보다, 무엇을 근거로 말했는가에서 결정된다.", "좋은 글은 얼마나 많은 것을 말했는가보다, 무엇을 근거로 말했는가에서 결정된다.", "Um bom texto se decide menos por quanto diz do que por aquilo em que se baseia para dizer."),
    translate("ko-pt", "Traduza: 포트폴리오의 완결성은 글의 수보다 이 절차를 얼마나 지켰는가에서 드러난다.", "O acabamento do portfólio se revela menos no número de textos do que no quanto esse procedimento foi respeitado.", "완결성 = acabamento; a comparação é entre quantidade e procedimento.", ["O que mostra se o portfólio está acabado não é a quantidade de textos, mas o quanto se seguiu esse procedimento."]),
    reading("되돌아보면, 남은 과제는 인용의 정확도다. 필자는 아직 원문의 맥락을 충분히 확인하지 않은 채 문장을 옮긴 적이 있다. 다음 학기에는 인용마다 전거를 표시하고, 인용한 문장이 원문에서 어떤 역할을 하는지 함께 적을 계획이다.", "Qual é a próxima etapa do autor?", ["Indicar a fonte de cada citação e registrar sua função no original.", "Parar de citar qualquer texto por precaução.", "Reescrever os três textos do zero, sem citar fontes."], "Indicar a fonte de cada citação e registrar sua função no original.", "O autor nomeia a precisão das citações como tarefa e descreve o procedimento do próximo semestre."),
  ],
  summary: [
    "O portfólio C1 integra análise, argumento, mediação e revisão em uma trajetória visível.",
    "Versões que não funcionaram também fazem parte da avaliação do aprendizado.",
    "-ㄴ/는 가운데 situa o contexto; -ㄴ/는 데다가 soma um fator na mesma direção.",
    "-ㄴ/는 대신 nomeia a troca; -ㄹ지언정 sustenta uma recusa deliberada.",
    "Conteúdo novo permanece em revisão.",
  ],
  production: production(
    "Produção independente · portfólio e autoavaliação",
    "Escreva uma apresentação do seu portfólio de C1 em dez a doze frases. Descreva os textos que o compõem, explique o que cada um demonstra, diga o que você corrigiu e qual habilidade pretende continuar praticando.",
    "C1 포트폴리오를 소개하고 스스로 평가해 보세요.",
    ["Apresente os gêneros e o que cada texto demonstra.", "Use -ㄴ/는 가운데 ou -ㄴ/는 데다가 para situar o percurso.", "Use -ㄴ/는 대신 uma vez para explicar uma escolha.", "Use -ㄹ지언정 uma vez para sustentar um compromisso.", "Apoie a autoavaliação em evidências, não em impressões."],
    ["Gêneros e textos identificados.", "Contribuição de cada texto.", "Uma correção concreta descrita.", "Escolha com -ㄴ/는 대신.", "Compromisso com -ㄹ지언정.", "Próximo passo de aprendizagem."],
    "이 포트폴리오는 한 학기 동안 고친 세 편의 글을 묶은 것이다. 첫 글은 배달 노동 기사를 비교한 분석이고, 둘째 글은 청년 주거 지원을 조건부로 확대하자는 주장이며, 셋째 글은 지역 갈등을 중재한 기록이다. 세 글은 갈래가 다르지만, 근거의 범위를 밝힌다는 절차를 공유한다. 글을 고치는 가운데, 나는 반론을 먼저 인정하는 태도를 익혔다. 둘째 글에서는 비용 문제를 다루지 않았던 초고를 수정해, 지원의 규모가 아니라 조건을 논의하도록 결론을 옮겼다. 사례를 늘리는 대신 근거의 정확도를 높인 것도 같은 이유다. 남은 과제는 인용의 정확도다. 시간이 걸릴지언정 인용마다 전거를 표시하고, 원문에서의 역할도 함께 적겠다. 포트폴리오의 완결성은 글의 수가 아니라 이 절차를 얼마나 지켰는가에서 드러난다. 다음 학기에는 인용과 요약을 집중적으로 연습할 계획이다.",
    "Este portfólio reúne três textos revisados ao longo de um semestre. O primeiro é uma análise que compara matérias sobre trabalho de entrega; o segundo, uma defesa da ampliação condicional do apoio à moradia de jovens; o terceiro, o registro da mediação de um conflito local. Os três textos têm gêneros diferentes, mas compartilham o procedimento de explicitar o alcance da evidência. Ao revisar os textos, aprendi a atitude de reconhecer primeiro a objeção. No segundo texto, revisei o rascunho que não tratava do custo e desloquei a conclusão para a discussão das condições, não do volume do apoio. Em vez de aumentar os exemplos, aumentei a precisão das evidências pelo mesmo motivo. A tarefa que resta é a precisão das citações. Ainda que leve tempo, vou indicar a fonte de cada citação e registrar também seu papel no original. O acabamento do portfólio se revela não no número de textos, mas no quanto esse procedimento foi respeitado. No próximo semestre, pretendo praticar intensivamente citação e resumo.",
    "Exemplo original de dez frases. O portfólio integra gêneros, nomeia uma correção e um próximo passo. Exemplo ilustrativo; não é gabarito.",
  ),
});
