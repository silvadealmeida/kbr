import { cloze, defineC1Lesson, listen, mcq, reading, translate } from "../shared";
import type { CourseProductionTask } from "../../course-types";

const RUBRIC = [
  { criterion: "task" as const, labelPt: "Cumprimento da tarefa", descriptorPt: "O texto responde ao enunciado e assume o gênero argumentativo pedido." },
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

/** c1-l01 — tese delimitada e contra-tese antecipada. */
export const C1_L01 = defineC1Lesson({
  id: "c1-l01", number: 1, moduleId: "c1-m01", title: "A tese e seu limite",
  objective: "Delimitar o escopo de uma tese e antecipar a contra-tese mais forte.",
  prerequisites: [], estimatedMinutes: 80, dialogueTitle: "O recorte da tese",
  intro: [
    {
      title: "O que a tese promete — e o que ela não promete",
      body: "Em C1, a tese não diz apenas o que o autor defende: ela diz até onde a defesa vale. Delimite o objeto, o período e o tipo de caso; em seguida, diga o que a conclusão não pretende cobrir. Sem esse recorte, o leitor testa a tese com um caso que ela nunca prometeu explicar e conclui, injustamente, que ela falhou. O recorte é parte do argumento, não uma formalidade de introdução.",
      ko: "이 글은 수도권 중소 소프트웨어 기업 세 곳의 재택근무만 다루며, 모든 업종에 적용되는 결론을 주장하지 않는다.",
    },
    {
      title: "A contra-tese mais forte antes da defesa",
      body: "Antes de refinar a defesa, nomeie a objeção que mais ameaça a tese. Uma objeção bem formulada protege o texto de duas falhas: atacar uma versão fraca do adversário e prometer mais do que os dados permitem. Coloque a objeção no fim da introdução e volte a ela na conclusão: assim o leitor vê que o texto foi escrito contra a melhor crítica disponível, não contra a mais confortável.",
      ko: "가장 강한 반론은 표본이 자발적 참여자로 구성되었다는 점이다.",
    },
  ],
  dialogue: [
    ["서연", "하린 씨, 서론 첫 문단부터 다시 볼까요?", "Harim, vamos rever o primeiro parágrafo da introdução?"],
    ["하린", "네. 지금은 ‘재택근무가 생산성을 높인다’고만 써 두었어요.", "Sim. No momento, só escrevi que ‘o trabalho remoto aumenta a produtividade’."],
    ["서연", "그 문장은 너무 넓어요. 어떤 업종, 어떤 기간, 어떤 규모를 다루는지 드러나지 않죠.", "Essa frase é ampla demais. Não fica claro que setor, que período e que porte ela abrange."],
    ["하린", "그러면 대상을 수도권 중소 소프트웨어 기업 세 곳으로 한정할게요.", "Então vou restringir o objeto a três pequenas e médias empresas de software da região metropolitana."],
    ["서연", "좋아요. 대신 범위를 좁힌 만큼 결론도 좁아진다는 점을 인정해야 해요.", "Bom. Em troca, é preciso admitir que, na medida em que o escopo se estreita, a conclusão também se estreita."],
    ["하린", "모든 업종에 적용된다고 쓰지 않겠다는 뜻이네요.", "Então quer dizer que não vou escrever que isso vale para todos os setores."],
    ["서연", "맞아요. 그리고 가장 강한 반론을 먼저 꺼내 보세요. 문제는 표본이 스스로 지원한 사람들로 구성됐다는 점이에요.", "Exato. E traga primeiro a objeção mais forte. O problema é que a amostra foi formada por pessoas que se candidataram por conta própria."],
    ["하린", "그 지적을 서론 끝에 넣고, 3절에서 판단 근거를 따로 설명할게요.", "Vou incluir essa crítica no fim da introdução e explicar à parte, na seção 3, a base do julgamento."],
  ],
  readingText: {
    titlePt: "Uma tese que sabe onde termina",
    paragraphs: [
      "재택근무가 생산성에 미치는 영향을 둘러싼 논의는 흔히 대기업 사례에 집중된다. 그러나 중소 소프트웨어 기업은 인력 구성과 협업 방식이 달라, 대기업의 결과를 그대로 적용하기 어렵다. 이 글은 2022년부터 2024년까지 수도권 중소 소프트웨어 기업 세 곳에서 시행된 재택근무를 분석 대상으로 삼고, 범위를 개발 직군으로 한정한다. 문제는 이 세 기업이 규모와 업무 특성에서 완전히 동질적이지 않다는 점이다. 따라서 여기서 도출된 결과는 산업 전체가 아니라 비슷한 규모의 조직에만 시사점을 준다.",
      "조사에 참여한 직원 87명 가운데 61명은 재택근무 이후 집중도가 높아졌다고 답했다. 이 수치는 통근 시간이 줄어든 집단에서 특히 두드러졌다. 이에 반해 대면 협업이 잦은 직무에서는 의사소통 비용이 늘었다는 응답이 많았다. 다만 표본이 자발적으로 참여한 사람들로 구성되었다는 점은 분명한 한계다. 재택근무에 우호적인 직원이 더 많이 참여했을 가능성을 배제할 수 없기 때문이다. 그러므로 이 결과를 조직 전체의 생산성 향상으로 일반화하는 판단은 아직 이르다.",
      "이 글은 재택근무가 모든 직종에 유리하다고 주장하지 않는다. 확인하고자 하는 것은 제한된 조건에서 근무 방식의 변화가 집중도와 협업 비용에 어떤 차이를 만드는가이다. 가장 강한 반론은 생산성 측정이 자기 보고에 의존한다는 지적일 것이다. 후속 연구는 산출물 지표를 함께 살펴야 한다. 독자는 이 글의 결론을 하나의 조건부 판단으로 읽어 주기 바란다.",
    ],
    pt: "O debate sobre o efeito do trabalho remoto na produtividade costuma se concentrar em casos de grandes empresas. Pequenas e médias empresas de software, porém, têm composição de pessoal e formas de colaboração diferentes, o que torna difícil aplicar diretamente os resultados das grandes. Este artigo toma como objeto o trabalho remoto praticado entre 2022 e 2024 em três pequenas e médias empresas de software da região metropolitana e restringe o recorte às funções de desenvolvimento. O problema é que essas três empresas não são completamente homogêneas em porte e em natureza das tarefas. Por isso, os resultados obtidos aqui dão indicações apenas a organizações de porte semelhante, e não ao setor inteiro. Entre os 87 funcionários que participaram da pesquisa, 61 responderam que a concentração aumentou depois do trabalho remoto. Esse número foi especialmente notável no grupo com menos tempo de deslocamento. Em contrapartida, nas funções com colaboração presencial frequente, muitos responderam que o custo de comunicação aumentou. Há, no entanto, um limite claro: a amostra foi formada por pessoas que participaram voluntariamente. Não se pode descartar a possibilidade de que tenham participado mais funcionários favoráveis ao trabalho remoto. Portanto, generalizar esse resultado como aumento de produtividade de toda a organização ainda é precipitado. Este artigo não pretende defender que o trabalho remoto seja vantajoso para todas as ocupações. O que se quer verificar é que diferença a mudança na forma de trabalho produz na concentração e no custo de colaboração sob condições restritas. A objeção mais forte será provavelmente a crítica de que a medição da produtividade depende de autorrelato. Estudos posteriores devem examinar também indicadores de produção. Peço ao leitor que leia a conclusão deste texto como um julgamento condicional.",
    objective: "Separar a tese do que ela não pretende demonstrar e localizar o limite declarado pela autora.",
  },
  reusedIds: ["ko:문제", "ko:판단", "ko:일반화", "ko:독자"],
  grammar: [
    [
      "-ㄴ/는 데 반해 — em contraste com; enquanto que",
      "동사 + -는 데 반해 / 형용사 + -(으)ㄴ 데 반해 / 명사 + 인 데 반해",
      "Marca um contraste entre dois fatos, com a ideia de que um lado não acompanha o outro. É típico da escrita acadêmica e jornalística e costuma comparar dimensões distintas, como custo e qualidade ou adoção e resultado. Compare com -는 반면(에), mais neutro e possível na fala; -는 데 반해 é mais formal e destaca o desequilíbrio entre os dois lados. Não use depois de uma oração que expressa intenção, ordem ou proposta.",
      [
        ["대기업은 재택근무를 적극 도입한 데 반해, 중소기업은 아직 시범 운영 단계에 머물러 있다.", "Enquanto as grandes empresas adotaram o trabalho remoto de forma ativa, as pequenas e médias ainda estão na fase de operação piloto."],
        ["표본의 규모는 충분한 데 반해, 대표성은 부족하다.", "O tamanho da amostra é suficiente; a representatividade, porém, é insuficiente."],
      ],
    ],
    [
      "-고자 하다 — pretender fazer (registro formal)",
      "동사 + -고자 하다",
      "Declara a intenção de quem escreve ou fala, sobretudo em artigos, relatórios e discursos. A forma -고자 합니다 é comum em apresentações formais. Compare com -(으)려고 하다, neutro e oral, que também pode descrever a intenção de terceiros; -고자 하다 soa institucional e raramente aparece em conversa informal. Não se usa com adjetivos nem com ordens ou convites.",
      [
        ["이 글은 재택근무의 장기 효과를 검토하고자 한다.", "Este artigo pretende examinar os efeitos de longo prazo do trabalho remoto."],
        ["연구진은 표본의 한계를 밝히고자 했다.", "A equipe de pesquisa quis deixar claro o limite da amostra."],
      ],
    ],
  ],
  guided: [
    mcq("Segundo o texto, até onde vai a conclusão do estudo?", ["A organizações de porte semelhante ao das empresas analisadas.", "A todos os setores da economia.", "A empresas de outros países."], "A organizações de porte semelhante ao das empresas analisadas.", "O texto afirma que os resultados dão indicações apenas a organizações de porte parecido."),
    cloze("Complete o recorte do objeto: 이 글은 분석 대상을 개발 직군으로 ___.", "한정한다", "한정한다 delimita o escopo da análise e prepara a conclusão condicional."),
    listen("Ouça e escreva a conclusão cautelosa da autora.", "이 결과를 조직 전체의 생산성 향상으로 일반화하는 판단은 아직 이르다.", "이 결과를 조직 전체의 생산성 향상으로 일반화하는 판단은 아직 이르다.", "Generalizar este resultado como aumento de produtividade de toda a organização ainda é precipitado."),
    reading("이 글은 수도권 중소 소프트웨어 기업 세 곳에서 시행된 재택근무를 분석하되, 대상을 개발 직군으로 한정한다. 따라서 여기서 도출된 결과는 산업 전체가 아니라 비슷한 규모의 조직에만 시사점을 준다.", "O que o texto delimitou?", ["O setor, o porte e a função analisados.", "O número de funcionários de todas as empresas do país.", "O orçamento da pesquisa."], "O setor, o porte e a função analisados.", "O recorte aparece em “중소 소프트웨어 기업 세 곳” e em “개발 직군”."),
    translate("pt-ko", "Traduza: “Este artigo pretende examinar apenas os efeitos de curto prazo.”", "이 글은 단기 효과만 살펴보고자 한다.", "-고자 한다 marca a intenção declarada em registro formal.", ["이 글은 단기 효과만 검토하고자 한다."]),
  ],
  independent: [
    mcq("Qual frase usa -는 데 반해 de forma correta?", ["가격은 저렴한 데 반해 품질은 뛰어나다.", "가격은 저렴하는 데 반해 품질은 뛰어나다.", "가격은 저렴했는 데 반해 품질은 뛰어나다."], "가격은 저렴한 데 반해 품질은 뛰어나다.", "Com adjetivo, a forma é -(으)ㄴ 데 반해: 저렴한 데 반해."),
    cloze("Complete o contraste: 표본의 규모는 충분한 데 ___ 대표성은 부족하다.", "반해", "A expressão -ㄴ/는 데 반해 introduz o lado que não acompanha o primeiro."),
    listen("Ouça e escreva o objetivo declarado pelo artigo.", "이 글은 재택근무의 장기 효과를 검토하고자 한다.", "이 글은 재택근무의 장기 효과를 검토하고자 한다.", "Este artigo pretende examinar os efeitos de longo prazo do trabalho remoto."),
    translate("ko-pt", "Traduza: 가장 강한 반론은 생산성 측정이 자기 보고에 의존한다는 지적일 것이다.", "A objeção mais forte será provavelmente a crítica de que a medição da produtividade depende de autorrelato.", "지적일 것이다 projeta a objeção mais forte; não a apresenta como fato confirmado.", ["A objeção mais forte deve ser a crítica de que a medição de produtividade se baseia em autorrelato."]),
    reading("조사에 참여한 직원 87명 가운데 61명은 재택근무 이후 집중도가 높아졌다고 답했다. 다만 표본이 자발적으로 참여한 사람들로 구성되었다는 점은 분명한 한계다. 재택근무에 우호적인 직원이 더 많이 참여했을 가능성을 배제할 수 없기 때문이다.", "Por que a autora evita generalizar o resultado?", ["Porque a amostra foi formada por pessoas que se ofereceram para participar.", "Porque todos os participantes eram gerentes.", "Porque o estudo durou apenas uma semana."], "Porque a amostra foi formada por pessoas que se ofereceram para participar.", "A autosseleção da amostra impede descartar que os participantes já fossem favoráveis ao trabalho remoto."),
  ],
  summary: [
    "A tese C1 declara o próprio limite: objeto, período, tipo de caso e o que fica fora.",
    "-ㄴ/는 데 반해 marca contraste formal entre dois fatos que não acompanham o mesmo ritmo.",
    "-고자 하다 declara intenção em registro acadêmico e institucional.",
    "A contra-tese mais forte deve aparecer cedo e voltar na conclusão.",
    "Conteúdo novo permanece em revisão.",
  ],
  production: production(
    "Produção independente · uma tese com escopo",
    "Escreva um parágrafo de abertura para um artigo curto sobre um tema que você conhece. Delimite o objeto, diga o que a conclusão não pretende cobrir e apresente a objeção mais forte que você terá de enfrentar.",
    "주장의 범위를 분명히 밝히는 서론을 써 보세요.",
    ["Comece pelo problema e pelo recorte, não pela conclusão.", "Use -고자 하다 uma vez para declarar o objetivo.", "Use -ㄴ/는 데 반해 uma vez para contrastar dois grupos ou dimensões.", "Termine a abertura com a objeção mais forte, sem respondê-la ainda."],
    ["Objeto, período e tipo de caso delimitados.", "Uma frase explícita sobre o que a conclusão não cobre.", "Objetivo declarado com -고자 하다.", "Contraste com -ㄴ/는 데 반해.", "Objeção mais forte nomeada."],
    "이 글은 중소 소프트웨어 기업 두 곳에서 시행된 재택근무를 다룬다. 분석 기간은 2023년 3월부터 2024년 2월까지이며, 대상은 개발 직군으로 한정한다. 조사에 참여한 직원 54명 가운데 38명은 집중도가 높아졌다고 답했다. 그러나 참여자가 자발적으로 지원했다는 점은 분명한 한계다. 재택근무에 우호적인 직원이 더 많이 포함되었을 가능성을 배제할 수 없다. 따라서 이 글은 재택근무가 모든 직무의 생산성을 높인다고 주장하지 않는다. 확인하고자 하는 것은 반복 업무가 많은 직군에서 근무 방식의 변화가 집중도에 어떤 차이를 만드는가이다. 개발 직군의 집중도가 높아진 데 반해, 대면 협업이 많은 직군에서는 의사소통 비용이 늘었다. 후속 연구는 산출물 지표를 함께 측정해야 한다.",
    "Este artigo trata do trabalho remoto praticado em duas pequenas e médias empresas de software. O período de análise vai de março de 2023 a fevereiro de 2024, e o recorte se limita às funções de desenvolvimento. Entre os 54 funcionários que participaram da pesquisa, 38 responderam que a concentração aumentou. No entanto, é um limite claro que os participantes tenham se candidatado voluntariamente. Não se pode descartar a possibilidade de que tenham sido incluídos mais funcionários favoráveis ao trabalho remoto. Por isso, este artigo não defende que o trabalho remoto aumente a produtividade de todas as funções. O que se pretende verificar é que diferença a mudança na forma de trabalho produz na concentração em funções com muitas tarefas repetitivas. Enquanto a concentração nas funções de desenvolvimento aumentou, nas funções com muita colaboração presencial o custo de comunicação cresceu. Estudos posteriores devem medir também indicadores de produção.",
    "Exemplo original de oito frases. Observe o recorte, a ressalva e a objeção; o texto não promete mais do que pode demonstrar. Exemplo ilustrativo; não é gabarito.",
  ),
});

/** c1-l02 — arquitetura do ensaio e função dos parágrafos. */
export const C1_L02 = defineC1Lesson({
  id: "c1-l02", number: 2, moduleId: "c1-m01", title: "A arquitetura do ensaio",
  objective: "Organizar um ensaio com função clara para cada parágrafo e progressão argumentativa.",
  prerequisites: ["c1-l01"], estimatedMinutes: 80, dialogueTitle: "O mapa dos parágrafos",
  intro: [
    {
      title: "Cada parágrafo tem uma função",
      body: "Um ensaio C1 não é uma sequência de parágrafos corretos: é uma sequência de funções. O primeiro apresenta o problema e a tese; o segundo sustenta a tese com evidência; o terceiro examina a objeção mais forte; o quarto responde e conclui. Se dois parágrafos fazem a mesma coisa, um deles ainda é rascunho. Antes de polir frases, escreva ao lado de cada parágrafo uma linha com sua função.",
      ko: "둘째 문단은 근거를 제시하고, 셋째 문단은 반론을 검토한다.",
    },
    {
      title: "Progressão, não repetição",
      body: "Progressão significa que cada parágrafo responde a uma pergunta que o anterior abriu. Repetir a tese com outras palavras não avança o argumento; apenas ocupa espaço. Uma conclusão forte não resume o que já foi dito: ela mostra o que o percurso demonstrou, o que continua incerto e qual é o próximo passo. Se o leitor puder pular um parágrafo sem perder o fio, esse parágrafo provavelmente não tem função própria.",
      ko: "결론은 앞 문단을 반복하지 않고 남은 질문에 답한다.",
    },
  ],
  dialogue: [
    ["정우", "유진 씨, 초안의 문단마다 무슨 역할을 하는지 한 줄로 적어 볼래요?", "Yujin, que tal escrever uma linha sobre a função de cada parágrafo do rascunho?"],
    ["유진", "네, 지금 바로 정리해 보겠습니다.", "Sim, vou organizar isso agora mesmo."],
    ["유진", "첫 문단은 문제를 소개하고, 둘째 문단은 근거를 제시합니다.", "O primeiro parágrafo apresenta o problema, e o segundo oferece a evidência."],
    ["정우", "셋째 문단은요?", "E o terceiro parágrafo?"],
    ["유진", "셋째 문단은 반론을 다루지만, 아직 답을 주지 않습니다.", "O terceiro parágrafo trata da objeção, mas ainda não dá a resposta."],
    ["정우", "그러면 독자는 넷째 문단에서 답을 기대하겠네요.", "Então o leitor vai esperar a resposta no quarto parágrafo."],
    ["유진", "그런데 넷째 문단이 다시 첫 문단의 주장을 반복하고 있습니다.", "Mas o quarto parágrafo está repetindo a tese do primeiro."],
    ["정우", "바로 그게 문제예요. 반복은 진행이 아니에요. 넷째 문단은 반론에 답하고, 남은 질문을 결론으로 이어야 해요.", "É exatamente esse o problema. Repetição não é progressão. O quarto parágrafo precisa responder à objeção e ligar o que resta à conclusão."],
  ],
  readingText: {
    titlePt: "Quatro funções, uma tese",
    paragraphs: [
      "주 4일 근무를 시범 운영한 기획팀은 결과 보고서에서 분명한 주장을 내세웠다. 근무일을 하루 줄이면 집중도가 높아지고 이직률이 낮아진다는 것이다. 보고서는 이 주장을 세 문단에 나누어 전개한다. 첫 문단은 문제를 소개하고, 둘째 문단은 근거를 제시하며, 셋째 문단은 반론을 검토한다. 각 문단은 앞 문단의 질문을 이어받아 다음 질문으로 넘긴다. 독자는 첫 문단에서 무엇을 기대해야 할지 정하고, 마지막 문단에서 그 기대가 채워졌는지 확인한다.",
      "시범 기간 동안 일평균 처리량은 3퍼센트 늘었고, 오류율은 0.4퍼센트 줄었다. 인터뷰에 응한 직원 열두 명은 오후 집중도가 높아졌다고 말했다. 이 근거는 근무 시간이 짧아져도 업무 강도가 유지될 수 있음을 보여 준다. 이 수치는 시범 운영에 참여한 부서의 기록을 평균한 것이며, 부서별 편차가 컸다. 다만 이 자료는 한 회사, 한 업종에 머문다는 점을 기억해야 한다. 규모가 다른 조직에 같은 결과를 기대하기는 어렵다.",
      "가장 강한 반론은 추가 인력 비용이 장기적으로 처리량 이익을 상쇄할 수 있다는 것이다. 실제로 시범 기간에는 임시 인건비가 8퍼센트 증가했다. 그럼에도 이 글은 주 4일 근무를 모든 기업에 권고하지 않는다. 대신 반복 업무가 많고 채용이 안정적인 조직에서 먼저 시험할 것을 제안한다. 결론은 조건부이며, 그 조건을 밝히는 것이 이 글의 목적이다. 정책 제안은 확신을 낮추는 대신, 다른 조직이 자기 조건에 맞게 판단할 여지를 남긴다.",
    ],
    pt: "A equipe de planejamento que testou a jornada de quatro dias apresentou uma tese clara no relatório de resultados: reduzir um dia de trabalho aumenta a concentração e diminui a rotatividade. O relatório desenvolve essa tese em três parágrafos. O primeiro apresenta o problema, o segundo oferece as evidências e o terceiro examina a objeção. Cada parágrafo recebe a pergunta do anterior e a encaminha para a seguinte. O leitor define no primeiro parágrafo o que deve esperar e, no último, verifica se essa expectativa foi atendida. Durante o período piloto, o volume médio diário processado aumentou 3% e a taxa de erros caiu 0,4%. Doze funcionários entrevistados disseram que a concentração à tarde aumentou. Essas evidências mostram que é possível manter a intensidade do trabalho mesmo com menos horas. Esse número é a média dos registros dos departamentos que participaram do piloto, e a variação entre departamentos foi grande. É preciso lembrar, porém, que esses dados vêm de uma única empresa e de um único setor. Esperar o mesmo resultado em organizações de outro porte é difícil. A objeção mais forte é que o custo adicional de pessoal pode, no longo prazo, anular o ganho de produtividade. De fato, durante o piloto, os custos temporários de pessoal aumentaram 8%. Ainda assim, este texto não recomenda a jornada de quatro dias a todas as empresas. Em vez disso, propõe testá-la primeiro em organizações com muitas tarefas repetitivas e contratação estável. A conclusão é condicional, e esclarecer essa condição é o objetivo do texto. A proposta de política, em vez de reduzir a certeza, deixa espaço para que outras organizações julguem conforme suas próprias condições.",
    objective: "Identificar a função de cada parágrafo e o elo que o liga ao seguinte.",
  },
  reusedIds: ["ko:근거", "ko:주장", "ko:그럼에도", "ko:장기적"],
  grammar: [
    [
      "-ㄴ/는 바가 크다 — a importância/o peso do fato é grande",
      "동사 + -는 바가 크다 / 형용사 + -(으)ㄴ 바가 크다",
      "Avalia a importância ou o peso de um fato, geralmente em resenhas, relatórios e conclusões. 바 retoma o fato ou o efeito mencionado antes, e 크다 indica magnitude. Compare com -는 데 기여하다, que afirma uma contribuição direta e específica; -ㄴ/는 바가 크다 avalia a relevância sem dizer exatamente como ela ocorre. Registro: formal, escrito. Não use em conversa casual nem com valor de ordem.",
      [
        ["이 연구는 중소기업의 채용 전략을 이해하는 데 시사하는 바가 크다.", "Esta pesquisa tem grande importância para compreender as estratégias de contratação das pequenas e médias empresas."],
        ["시범 운영의 결과는 근무 제도 논의에 영향을 미친 바가 크다.", "O resultado da operação piloto teve grande peso no debate sobre o regime de trabalho."],
      ],
    ],
    [
      "-ㄹ 뿐더러 — não só, mas também (com acréscimo)",
      "동사/형용사 + -ㄹ 뿐더러",
      "Acrescenta um segundo fato na mesma direção do primeiro, muitas vezes com um grau a mais. É comum na escrita argumentativa e em avaliações. Compare com -뿐만 아니라, mais neutro e compatível com substantivos; -ㄹ 뿐더러 exige forma verbal e soa mais avaliativo. A segunda oração não pode ser uma ordem, um convite ou uma promessa. Registro: neutro a formal, sobretudo escrito.",
      [
        ["주 4일 근무는 이직률을 낮출 뿐더러 채용 경쟁력도 높인다.", "A jornada de quatro dias não só reduz a rotatividade, como também aumenta a competitividade na contratação."],
        ["보고서는 근거가 부족할 뿐더러 결론도 성급하다.", "O relatório não só carece de evidências, como também tem uma conclusão precipitada."],
      ],
    ],
  ],
  guided: [
    mcq("Qual é a função do terceiro parágrafo do ensaio?", ["Apresentar a objeção mais forte.", "Resumir os dados do primeiro parágrafo.", "Listar os custos de contratação."], "Apresentar a objeção mais forte.", "O terceiro parágrafo examina a objeção antes de a conclusão responder."),
    cloze("Complete a adição de uma segunda falha: 보고서는 근거가 부족할 ___ 결론도 성급하다.", "뿐더러", "-ㄹ 뿐더러 soma a segunda falha na mesma direção."),
    listen("Ouça e escreva o princípio que o orientador repete.", "결론은 앞 문단을 반복하지 않고 남은 질문에 답한다.", "결론은 앞 문단을 반복하지 않고 남은 질문에 답한다.", "A conclusão não repete o parágrafo anterior: responde à pergunta que restou."),
    reading("주 4일 근무를 시범 운영한 기획팀은 결과 보고서에서 분명한 주장을 내세웠다. 근무일을 하루 줄이면 집중도가 높아지고 이직률이 낮아진다는 것이다. 보고서는 이 주장을 세 문단에 나누어 전개한다.", "Qual é a tese do relatório?", ["Reduzir um dia de trabalho aumenta a concentração e reduz a rotatividade.", "Toda empresa deve adotar a jornada de quatro dias.", "O volume processado caiu durante o piloto."], "Reduzir um dia de trabalho aumenta a concentração e reduz a rotatividade.", "A tese aparece em “집중도가 높아지고 이직률이 낮아진다는 것이다”."),
    translate("pt-ko", "Traduza: “O relatório não só carece de evidências, como também tem uma conclusão precipitada.”", "보고서는 근거가 부족할 뿐더러 결론도 성급하다.", "-ㄹ 뿐더러 acrescenta uma segunda falha na mesma direção.", ["보고서는 근거가 부족할 뿐만 아니라 결론도 성급하다."]),
  ],
  independent: [
    mcq("Qual frase usa -ㄹ 뿐더러 corretamente?", ["이 제도는 비용을 줄일 뿐더러 만족도도 높인다.", "이 제도는 비용을 줄이면 뿐더러 만족도도 높인다.", "이 제도는 비용을 줄일 뿐더러 만족도도 높여라."], "이 제도는 비용을 줄일 뿐더러 만족도도 높인다.", "-ㄹ 뿐더러 liga dois fatos na mesma direção e não introduz ordem."),
    cloze("Complete a avaliação de relevância: 이 연구는 채용 전략을 이해하는 데 시사하는 ___ 크다.", "바가", "A forma fixa é -ㄴ/는 바가 크다."),
    listen("Ouça e escreva o argumento sobre a jornada de quatro dias.", "주 4일 근무는 이직률을 낮출 뿐더러 채용 경쟁력도 높인다.", "주 4일 근무는 이직률을 낮출 뿐더러 채용 경쟁력도 높인다.", "A jornada de quatro dias não só reduz a rotatividade, como também aumenta a competitividade na contratação."),
    translate("ko-pt", "Traduza: 시범 기간에는 임시 인건비가 8퍼센트 증가했다.", "Durante o período piloto, os custos temporários de pessoal aumentaram 8%.", "인건비 = custos de pessoal; 증가했다 = aumentaram.", ["No período piloto, houve um aumento de 8% nos custos temporários com pessoal."]),
    reading("가장 강한 반론은 추가 인력 비용이 장기적으로 처리량 이익을 상쇄할 수 있다는 것이다. 실제로 시범 기간에는 임시 인건비가 8퍼센트 증가했다. 그럼에도 이 글은 주 4일 근무를 모든 기업에 권고하지 않는다.", "Como a autora responde à objeção dos custos?", ["Ela reconhece o custo e limita a recomendação a organizações com certas características.", "Ela nega que os custos tenham aumentado.", "Ela abandona a defesa da jornada de quatro dias."], "Ela reconhece o custo e limita a recomendação a organizações com certas características.", "O texto admite o aumento de 8% e restringe a proposta a organizações com tarefas repetitivas e contratação estável."),
  ],
  summary: [
    "Cada parágrafo do ensaio cumpre uma função: problema, evidência, objeção, resposta.",
    "Progressão é responder à pergunta aberta pelo parágrafo anterior; repetir não avança.",
    "-ㄴ/는 바가 크다 avalia formalmente a importância de um fato.",
    "-ㄹ 뿐더러 acrescenta um segundo fato na mesma direção, com mais força avaliativa.",
    "Conteúdo novo permanece em revisão.",
  ],
  production: production(
    "Produção independente · o mapa do ensaio",
    "Escolha um tema polêmico do seu cotidiano e escreva um esboço de ensaio em que cada parágrafo tenha uma função explícita: problema e tese, evidência, objeção, resposta e conclusão condicional.",
    "문단마다 역할이 드러나는 글의 개요를 써 보세요.",
    ["Comece indicando a função de cada parágrafo em uma linha.", "Use -ㄴ/는 바가 크다 uma vez para avaliar uma evidência ou um antecedente.", "Use -ㄹ 뿐더러 uma vez para somar um segundo argumento.", "Faça a conclusão responder a uma objeção, não repetir a tese."],
    ["Quatro funções identificáveis.", "Tese delimitada no primeiro parágrafo.", "Evidência concreta no segundo.", "Objeção real no terceiro.", "Conclusão que responde e nomeia o que resta em aberto."],
    "이 글은 회의 시간을 절반으로 줄인 조직의 사례를 다룬다. 첫 문단에서는 회의가 업무 시간을 잠식한다는 문제를 제시한다. 둘째 문단에서는 두 달간의 시범 운영 결과를 근거로 제시한다. 회의 시간은 46퍼센트 줄었고, 결정까지 걸리는 기간도 짧아졌다. 회의를 줄이면 집중 시간이 늘어날 뿐더러 결정도 빨라진다. 셋째 문단에서는 중요한 안건이 사라질 수 있다는 반론을 검토한다. 넷째 문단에서는 안건을 사전에 공유하고 결정권자를 명시하는 조건을 제안한다. 이 글의 주장은 회의를 없애자는 것이 아니라, 회의의 기능을 분명히 하자는 것이다. 이 사례는 다른 조직의 회의 문화를 검토하는 데 시사하는 바가 크다. 조건이 갖춰지지 않은 조직에 같은 결과를 기대해서는 안 된다.",
    "Este artigo trata do caso de uma organização que reduziu pela metade o tempo de reunião. No primeiro parágrafo, apresenta o problema de as reuniões consumirem o tempo de trabalho. No segundo, oferece como evidência o resultado de dois meses de operação piloto. O tempo de reunião caiu 46% e o período até a decisão também encurtou. Reduzir as reuniões não só aumenta o tempo de concentração, como também acelera as decisões. No terceiro parágrafo, examina a objeção de que pautas importantes podem desaparecer. No quarto, propõe a condição de compartilhar a pauta com antecedência e indicar quem decide. A tese deste texto não é eliminar as reuniões, mas tornar clara a função delas. Este caso tem grande importância para se repensar a cultura de reuniões de outras organizações. Não se deve esperar o mesmo resultado em organizações que não cumprem essas condições.",
    "Exemplo original de oito frases. Cada parágrafo tem uma função declarada; a conclusão responde à objeção. Exemplo ilustrativo; não é gabarito.",
  ),
});

/** c1-l03 — o que o dado mostra e o que o autor conclui. */
export const C1_L03 = defineC1Lesson({
  id: "c1-l03", number: 3, moduleId: "c1-m01", title: "O que a evidência sustenta",
  objective: "Distinguir o que um dado mostra do que o autor conclui e calibrar a generalização.",
  prerequisites: ["c1-l02"], estimatedMinutes: 80, dialogueTitle: "A manchete e o dado",
  intro: [
    {
      title: "Dado, interpretação e inferência",
      body: "Um dado pode ser verdadeiro e a conclusão, falsa. Separe três camadas: o que foi medido, o que foi inferido a partir da medição e o que foi apenas sugerido pelo título. A média de horas trabalhadas cair, por exemplo, não prova que a produtividade subiu; mostra apenas que as pessoas passaram menos tempo no trabalho. Quando as camadas se misturam, o leitor não consegue avaliar o que realmente foi demonstrado.",
      ko: "평균 근무 시간이 줄었다는 사실과 생산성이 높아졌다는 해석은 서로 다른 층위다.",
    },
    {
      title: "Correlação não é causa",
      body: "Dois fenômenos podem variar juntos sem que um cause o outro. Uma terceira variável — renda, idade, acesso a serviços — pode explicar os dois. Em textos de divulgação, o verbo costuma revelar o salto: “associado a” descreve uma relação; “provoca” afirma uma causa. Ao resumir um estudo, preserve o verbo do original e diga o que a amostra permite concluir. Se o estudo é observacional, a conclusão precisa continuar condicional.",
      ko: "커피를 마시는 사람이 오래 산다는 관찰만으로 커피가 수명을 늘린다고 말할 수 없다.",
    },
  ],
  dialogue: [
    ["사라", "이 기사 제목, ‘커피가 수명을 늘린다’는 표현이 너무 단정적이지 않아요?", "O título desta matéria, ‘o café aumenta a longevidade’, não é categórico demais?"],
    ["지훈", "그렇죠. 원 연구는 관찰 연구라서 인과관계를 확증할 수 없어요.", "É verdade. O estudo original é observacional, então não pode confirmar uma relação causal."],
    ["사라", "그런데 본문에는 상관관계라는 말이 거의 없어요.", "Mas o corpo da matéria quase não menciona correlação."],
    ["지훈", "숫자만 보면 인과관계처럼 읽히니까요. 문제는 해석의 층위가 섞인다는 점이에요.", "Porque, vistos só os números, eles são lidos como causalidade. O problema é que as camadas de interpretação se misturam."],
    ["사라", "그럼 제목을 어떻게 바꾸면 좋을까요?", "Então como seria bom mudar o título?"],
    ["지훈", "‘커피와 장수 사이의 연관성이 관찰됐다’ 정도가 안전해요. 다만 표본의 대표성도 함께 언급해야 해요.", "Algo como ‘foi observada uma associação entre café e longevidade’ é mais seguro. Mas também é preciso mencionar a representatividade da amostra."],
    ["사라", "연구에 참여한 사람들이 건강 관리를 잘하는 집단이었다는 점도요?", "Também o fato de os participantes serem um grupo que cuidava bem da saúde?"],
    ["지훈", "네. 그 점을 빼면 독자는 결과를 과대평가하게 돼요.", "Sim. Se omitirmos isso, o leitor passa a superestimar o resultado."],
  ],
  readingText: {
    titlePt: "O que o verde realmente mostra",
    paragraphs: [
      "도시 녹지와 스트레스의 관계를 살핀 연구가 지난달 발표됐다. 연구진은 서울 시내 12개 구에서 1,200명을 선정해 설문과 수면 기록을 수집했다. 결과는 녹지가 가까운 주민일수록 스트레스 지수가 낮다는 것이었다. 그러나 이 결과만으로 녹지가 스트레스를 줄인다고 단정하기는 어렵다. 관찰 연구는 두 변수의 관계를 보여 줄 뿐, 원인을 확증하지는 못한다. 표본은 무작위로 추출되지 않았고, 설문에 응한 사람들의 거주지 분포도 서울 전체와 같지 않았다.",
      "연구진은 표집 과정에서 연령과 소득을 고려했지만, 표본의 대표성에는 한계가 있었다. 특히 자가 보고에 의존한 스트레스 측정은 계절과 개인차에 민감하다. 또한 녹지가 가까운 지역에 소득 수준이 높은 주민이 더 많이 산다는 점도 결과에 영향을 주었을 수 있다. 이 경우 낮은 스트레스 지수가 녹지 때문인지 소득 때문인지 구분하기 어려워진다. 연구진은 이러한 한계를 논문 마지막 부분에서 밝혔지만, 보도 자료에는 그 문장이 빠져 있었다.",
      "따라서 이 연구가 지지하는 것은 상관관계이지 인과관계가 아니다. 정책적으로는 녹지 확대를 계속 검토할 근거가 되지만, 효과의 크기를 약속해서는 안 된다. 결과를 과대평가하지 않으려면 후속 연구가 무작위 배정과 장기 추적을 통해 원인을 확인해야 한다. 독자는 이 결론을 정책의 필요성과 효과의 크기를 구분해 읽을 필요가 있다. 정책 담당자가 이 구분을 무시하면, 근거보다 기대가 앞서는 결정을 하게 된다.",
    ],
    pt: "No mês passado, foi publicado um estudo que examinou a relação entre áreas verdes urbanas e estresse. A equipe selecionou 1.200 pessoas em 12 distritos de Seul e coletou questionários e registros de sono. O resultado foi que os moradores mais próximos de áreas verdes apresentavam índices de estresse mais baixos. Só com esse resultado, porém, é difícil afirmar categoricamente que as áreas verdes reduzem o estresse. Um estudo observacional apenas mostra a relação entre duas variáveis; não confirma a causa. A amostra não foi extraída aleatoriamente, e a distribuição de residência dos respondentes também não coincide com a de Seul como um todo. A equipe considerou idade e renda no processo de amostragem, mas a representatividade da amostra tinha limites. Em especial, a medição de estresse baseada em autorrelato é sensível à estação e às diferenças individuais. Além disso, o fato de mais moradores de renda alta viverem perto de áreas verdes também pode ter influenciado o resultado. Nesse caso, fica difícil distinguir se o índice baixo de estresse se deve à área verde ou à renda. A equipe divulgou esses limites no final do artigo, mas a frase ficou de fora do release de imprensa. Portanto, o que este estudo sustenta é uma correlação, não uma relação causal. Para a política pública, ele serve como base para continuar avaliando a ampliação de áreas verdes, mas não se deve prometer o tamanho do efeito. Para não superestimar o resultado, estudos posteriores precisam confirmar a causa por meio de distribuição aleatória e acompanhamento de longo prazo. O leitor precisa separar, nesta conclusão, a necessidade da política do tamanho do seu efeito. Se o responsável pela política ignorar essa distinção, tomará decisões em que a expectativa vem antes da evidência.",
    objective: "Identificar a conclusão que o dado sustenta e a que ele não sustenta.",
  },
  reusedIds: ["ko:연구", "ko:결과", "ko:상관관계", "ko:인과관계"],
  grammar: [
    [
      "-ㄴ/는 데서 비롯된다 — origina-se de",
      "동사 + -는 데서 비롯된다 / 명사 + 에서 비롯된다",
      "Aponta a origem abstrata de um problema, erro ou mudança. O foco não é a causa mecânica, mas o ponto de partida que explica o fenômeno. Compare com -때문이다, que apresenta uma causa de modo direto e serve à fala; -는 데서 비롯된다 é mais formal e analítico, típico de relatórios. Não use com uma origem física concreta nem com uma causa já provada como única.",
      [
        ["이 오해는 표본의 대표성을 확인하지 않은 데서 비롯된다.", "Esse mal-entendido se origina da falta de verificação da representatividade da amostra."],
        ["신뢰의 손실은 약속을 지키지 않은 데서 비롯되었다.", "A perda de confiança se originou do descumprimento da promessa."],
      ],
    ],
    [
      "-다고 단정하기 어렵다 — é difícil afirmar categoricamente que",
      "동사/형용사 + -다고 단정하기 어렵다 / 명사 + (이)라고 단정하기 어렵다",
      "Introduz uma conclusão possível, mas recusa o grau de certeza de uma afirmação categórica. É uma forma de cautela acadêmica e jornalística. Compare com -다고 보기 어렵다, que também atenua, mas questiona o julgamento; -다고 단정하기 어렵다 rejeita explicitamente o excesso de certeza. Registro: formal, escrito. Não use para uma dúvida pessoal simples, como “não sei se...”; nesse caso, -ㄴ/는지 모르겠다 é mais natural.",
      [
        ["이 자료만으로 청년 실업이 줄었다고 단정하기 어렵다.", "Só com estes dados, é difícil afirmar categoricamente que o desemprego juvenil diminuiu."],
        ["한 지역의 사례를 전국에 적용할 수 있다고 단정하기 어렵다.", "É difícil afirmar categoricamente que o caso de uma região se aplica ao país inteiro."],
      ],
    ],
  ],
  guided: [
    mcq("Por que a manchete é considerada precipitada?", ["Porque apresenta uma correlação como se fosse causalidade.", "Porque omite o nome dos pesquisadores.", "Porque usa uma foto inadequada."], "Porque apresenta uma correlação como se fosse causalidade.", "O estudo é observacional: ele mostra associação, não causa."),
    cloze("Complete a origem do erro: 이 오해는 표본의 대표성을 확인하지 않은 데서 ___.", "비롯된다", "-는 데서 비롯된다 indica a origem abstrata do problema."),
    listen("Ouça e escreva o limite que a autora do estudo destaca.", "이 결과만으로 녹지가 스트레스를 줄인다고 단정하기는 어렵다.", "이 결과만으로 녹지가 스트레스를 줄인다고 단정하기는 어렵다.", "Só com este resultado, é difícil afirmar categoricamente que as áreas verdes reduzem o estresse."),
    reading("연구진은 서울 시내 12개 구에서 1,200명을 선정해 설문과 수면 기록을 수집했다. 결과는 녹지가 가까운 주민일수록 스트레스 지수가 낮다는 것이었다. 그러나 이 결과만으로 녹지가 스트레스를 줄인다고 단정하기는 어렵다.", "O que o estudo observou?", ["Que moradores mais próximos de áreas verdes tinham índices de estresse mais baixos.", "Que áreas verdes causam redução definitiva do estresse.", "Que todos os moradores de Seul têm o mesmo nível de estresse."], "Que moradores mais próximos de áreas verdes tinham índices de estresse mais baixos.", "O dado é a associação entre proximidade de áreas verdes e índice de estresse."),
    translate("pt-ko", "Traduza: “É difícil afirmar categoricamente que este dado comprova a causa.”", "이 자료가 원인을 입증한다고 단정하기 어렵다.", "-다고 단정하기 어렵다 recusa a certeza categórica em registro formal.", ["이 자료가 원인을 입증한다고 단정하기는 어렵다."]),
  ],
  independent: [
    mcq("Qual formulação mantém o grau de certeza adequado a um resumo acadêmico?", ["이 결과는 인과관계를 시사하지만 단정하기는 어렵다.", "이 결과는 원인을 완벽히 증명한다.", "이 결과는 아무 의미가 없다."], "이 결과는 인과관계를 시사하지만 단정하기는 어렵다.", "A formulação separa a sugestão de causalidade da prova definitiva."),
    cloze("Complete o limite do dado: 이 결과만으로 녹지가 스트레스를 줄인다고 ___ 어렵다.", "단정하기는", "단정하기는 어렵다 aparece no texto-âncora e reduz o grau de certeza."),
    listen("Ouça e escreva a diferença entre associação e causa.", "상관관계만으로 인과관계를 확증할 수는 없어요.", "상관관계만으로 인과관계를 확증할 수는 없어요.", "Não se pode confirmar uma relação causal apenas com uma correlação."),
    translate("ko-pt", "Traduza: 이 오해는 표본의 대표성을 확인하지 않은 데서 비롯된다.", "Esse mal-entendido se origina da falta de verificação da representatividade da amostra.", "비롯된다 = origina-se; a construção é -는 데서 비롯된다.", ["Esse equívoco nasce de uma leitura que não levou em conta a representatividade da amostra."]),
    reading("따라서 이 연구가 지지하는 것은 상관관계이지 인과관계가 아니다. 정책적으로는 녹지 확대를 계속 검토할 근거가 되지만, 효과의 크기를 약속해서는 안 된다. 결과를 과대평가하지 않으려면 후속 연구가 무작위 배정과 장기 추적을 통해 원인을 확인해야 한다.", "Qual é a consequência prática defendida no texto?", ["Usar o estudo como base para continuar avaliando a política, sem prometer o tamanho do efeito.", "Abandonar a ampliação de áreas verdes até haver prova definitiva.", "Afirmar que a renda explica todo o resultado."], "Usar o estudo como base para continuar avaliando a política, sem prometer o tamanho do efeito.", "O texto separa a necessidade da política do tamanho do efeito e pede estudos causais."),
  ],
  summary: [
    "Dado, interpretação e inferência são camadas distintas de um texto de pesquisa.",
    "-ㄴ/는 데서 비롯된다 aponta a origem abstrata de um problema, em registro analítico.",
    "-다고 단정하기 어렵다 recusa a certeza categórica e mantém a conclusão condicional.",
    "Correlação não autoriza conclusão causal; amostra não representativa limita a generalização.",
    "Conteúdo novo permanece em revisão.",
  ],
  production: production(
    "Produção independente · reescrever uma generalização",
    "Escolha um resultado de pesquisa que você viu circular em uma manchete e reescreva-o em um parágrafo cauteloso. Diga o que foi medido, o que pode ser inferido e o que a amostra não permite concluir.",
    "연구 결과를 과장하지 않는 문단으로 다시 써 보세요.",
    ["Comece pelo dado, sem interpretá-lo.", "Use -ㄴ/는 데서 비롯된다 uma vez para indicar a origem de um erro ou limite.", "Use -다고 단정하기 어렵다 uma vez para calibrar a conclusão.", "Termine dizendo o que um estudo posterior precisaria verificar."],
    ["Dado separado da interpretação.", "Origem do limite nomeada.", "Conclusão calibrada, sem prometer causalidade.", "Uma ressalva metodológica específica.", "Fechamento com próximo passo de pesquisa."],
    "이 글은 수면 시간과 학업 성취의 관계를 다룬 연구를 검토한다. 연구진은 대학생 300명을 선정해 수면 기록과 학점을 비교했다. 결과는 수면 시간이 긴 학생의 학점이 조금 더 높다는 것이었다. 그러나 이 결과만으로 수면이 학점을 높인다고 단정하기는 어렵다. 학점이 높은 학생이 규칙적인 생활을 할 가능성도 있다. 이런 낙관적 해석은 표본의 대표성을 확인하지 않은 데서 비롯된다. 또한 표본의 대표성이 부족해 전체 대학생에게 일반화하기 어렵다. 이 연구가 지지하는 것은 상관관계이지 인과관계가 아니다. 후속 연구는 무작위 배정과 장기 추적을 통해 원인을 확인해야 한다.",
    "Este texto examina um estudo sobre a relação entre horas de sono e desempenho acadêmico. A equipe selecionou 300 universitários e comparou registros de sono com as notas. O resultado foi que estudantes com mais horas de sono tinham notas um pouco mais altas. Só com esse resultado, porém, é difícil afirmar categoricamente que o sono aumenta as notas. Também é possível que estudantes com notas altas tenham uma rotina mais regular. Essa interpretação otimista se origina da falta de verificação da representatividade da amostra. Além disso, a representatividade da amostra é insuficiente para generalizar a todos os universitários. O que este estudo sustenta é uma correlação, não uma relação causal. Estudos posteriores devem confirmar a causa por meio de distribuição aleatória e acompanhamento de longo prazo.",
    "Exemplo original de oito frases. O dado vem primeiro; a interpretação e o limite vêm depois. Exemplo ilustrativo; não é gabarito.",
  ),
});

/** c1-l04 — refutação sem adversário de palha. */
export const C1_L04 = defineC1Lesson({
  id: "c1-l04", number: 4, moduleId: "c1-m01", title: "Refutar sem distorcer",
  objective: "Responder à objeção mais forte sem construir um adversário de palha.",
  prerequisites: ["c1-l03"], estimatedMinutes: 80, dialogueTitle: "A objeção mais forte",
  intro: [
    {
      title: "Reconstruir antes de responder",
      body: "Antes de refutar, formule a objeção na versão mais forte que ela pode ter. Se você precisa enfraquecê-la para vencê-la, o problema está no seu argumento, não no adversário. A caridade interpretativa não é gentileza: é uma condição de validade da réplica. Um leitor atento percebe quando o texto ataca uma frase que ninguém defendeu, e a vitória contra um adversário de palha custa a credibilidade de todo o ensaio.",
      ko: "상대의 주장을 가장 강한 형태로 다시 말한 뒤에야 반박을 시작할 수 있다.",
    },
    {
      title: "Conceder para não perder o fio",
      body: "Concessão não é rendição. Reconheça primeiro o que a objeção tem de válido e delimite o ponto exato em que você discorda. Isso reduz a defensividade do leitor e mostra que a réplica foi escrita depois de escutar, não antes. A ordem importa: primeiro a objeção em sua melhor forma, depois o que se concede, por último o que se contesta e por quê.",
      ko: "타당한 지적은 먼저 인정하고, 남은 쟁점으로 넘어간다.",
    },
  ],
  dialogue: [
    ["민재", "본격적으로 반박하기 전에, 엘레나 씨의 주장을 제 말로 정리해 볼게요.", "Antes de refutar de fato, vou resumir a tese da Elena com minhas palavras."],
    ["엘레나", "좋아요. 제가 어떤 부분을 놓치면 바로 고쳐 주세요.", "Ótimo. Se eu deixar passar algum ponto, corrija na hora."],
    ["민재", "엘레나 씨는 무상 급식이 학습 격차를 줄인다는 근거가 아직 약하다고 보시는 거죠?", "A Elena considera que a evidência de que a merenda gratuita reduz a desigualdade de aprendizagem ainda é fraca, certo?"],
    ["엘레나", "네, 정확해요. 저는 급식 자체를 반대하는 게 아니라, 효과의 크기를 먼저 확인하자는 쪽이에요.", "Sim, exato. Não sou contra a merenda em si; defendo que primeiro se verifique o tamanho do efeito."],
    ["민재", "그 지적은 타당해요. 저도 그 부분에는 양보할 수밖에 없네요.", "Essa crítica é válida. Nesse ponto, não tenho como não ceder."],
    ["엘레나", "그런데 민재 씨는 왜 급식을 먼저 시행해야 한다고 보세요?", "Mas por que o Minjae acha que a merenda deve ser implementada primeiro?"],
    ["민재", "지금 격차가 커지고 있어서, 완벽한 근거를 기다리는 것 자체가 비용이라고 생각해요.", "Porque a desigualdade está aumentando agora, e penso que esperar por evidência perfeita já é um custo em si."],
    ["엘레나", "그 논리에는 동의해요. 다만 2년 뒤에 효과를 검증할 지표를 지금 정하자는 조건을 붙이고 싶어요.", "Concordo com essa lógica. Só quero acrescentar a condição de definirmos agora os indicadores que verificarão o efeito em dois anos."],
  ],
  readingText: {
    titlePt: "A objeção que fortalece a tese",
    paragraphs: [
      "가당 음료에 세금을 부과하자는 주장은 한국에서도 여러 번 제기되었다. 지지자들은 가격 인상이 소비를 줄이고 청소년 비만을 낮출 수 있다고 본다. 그러나 이 주장이 설득력을 얻으려면 가장 강한 반론을 먼저 통과해야 한다. 반론을 약하게 만들어 이기는 방식은 토론의 결론을 바꾸지 못한다. 토론에서 설득력은 상대를 얼마나 정확히 이해했는지에서 먼저 드러난다.",
      "가장 강한 반론은 세금이 소비를 다른 지역으로 옮길 뿐, 건강 행동을 바꾸지 못한다는 것이다. 실제로 일부 국가에서는 세금 도입 후 인접 지역 구매가 늘었다. 또한 저소득층이 같은 세금을 더 크게 부담한다는 형평성 문제도 제기된다. 이 반론은 세금 정책의 효과를 의심하는 것이 아니라, 효과가 나타나는 조건을 묻는다. 그 조건을 답하지 않으면 정책은 상징에 머문다. 세금이 소비를 줄였다는 연구와 그렇지 않다는 연구가 공존하는 이유도 여기에 있다. 지지자와 반대자가 같은 자료를 다르게 읽는 지점을 밝히는 것이 먼저다.",
      "따라서 지지자들이 답해야 할 질문은 ‘세금이 옳은가’가 아니라 ‘어떤 설계에서 효과가 나타나는가’이다. 나는 세금만으로 비만을 해결할 수 있다고 보지 않는다. 그럼에도 가격 신호를 무시하는 정책이 더 낫다고는 생각하지 않는다. 최소한의 개입을 택할지언정, 근거 없는 확신을 택해서는 안 된다. 이 글은 그 조건을 밝히는 데 목적이 있다. 정책의 정당성은 의도가 아니라 검증 가능한 결과와 조건에서 나온다.",
    ],
    pt: "A proposta de taxar bebidas adoçadas com açúcar foi apresentada várias vezes também na Coreia. Os defensores consideram que o aumento de preço pode reduzir o consumo e diminuir a obesidade entre adolescentes. Para ganhar força de persuasão, porém, essa tese precisa antes passar pela objeção mais forte. Vencer enfraquecendo a objeção não muda a conclusão do debate. Em um debate, a força de persuasão se revela primeiro em quão precisamente se compreende o outro. A objeção mais forte é que o imposto apenas desloca o consumo para outra região, sem mudar o comportamento de saúde. De fato, em alguns países, as compras em regiões vizinhas aumentaram após a adoção do imposto. Também se levanta a questão de equidade: a população de baixa renda suporta o mesmo imposto de forma mais pesada. Essa objeção não duvida do efeito da política, mas pergunta em que condições ele aparece. Se não responder a essas condições, a política permanece simbólica. É também por isso que convivem estudos que afirmam que o imposto reduziu o consumo e estudos que afirmam o contrário. Primeiro é preciso esclarecer o ponto em que defensores e opositores leem os mesmos dados de forma diferente. Portanto, a pergunta que os defensores precisam responder não é ‘o imposto é certo?’, mas ‘em que desenho o efeito aparece?’. Não considero que o imposto sozinho resolva a obesidade. Ainda assim, não penso que uma política que ignora o sinal de preço seja melhor. Mesmo que seja preciso escolher uma intervenção mínima, não se deve escolher uma convicção sem evidências. O objetivo deste texto é esclarecer essas condições. A legitimidade de uma política não vem da intenção, mas de resultados e condições verificáveis.",
    objective: "Distinguir a objeção real da versão enfraquecida e localizar o ponto exato da réplica.",
  },
  reusedIds: ["ko:주장", "ko:설득력", "ko:상징", "ko:그럼에도"],
  grammar: [
    [
      "-ㄹ지언정 — mesmo que seja para; ainda que",
      "동사/형용사 + -ㄹ지언정",
      "Apresenta uma concessão forte ligada a uma escolha deliberada: o falante aceita uma consequência ruim em vez de aceitar algo pior. A segunda oração costuma expressar uma recusa ou um compromisso, não um fato neutro. Compare com -아/어도, que apenas admite um contraste; -ㄹ지언정 é mais enfático e literário. Registro: escrito e formal, comum em declarações.",
      [
        ["비용이 늘어날지언정 근거 없는 결정은 하지 않겠다.", "Mesmo que os custos aumentem, não tomarei uma decisão sem evidências."],
        ["늦어질지언정 보도를 왜곡하지는 않겠습니다.", "Mesmo que atrase, não vou distorcer a reportagem."],
      ],
    ],
    [
      "-ㄴ/는 한이 있더라도 — mesmo que haja a consequência de",
      "동사 + -는 한이 있더라도 / 형용사 + -(으)ㄴ 한이 있더라도",
      "Declara que o falante aceita um custo indesejável para manter uma decisão. É mais forte e mais formal que -더라도. A oração anterior nomeia a consequência temida; a seguinte mantém o compromisso. Compare com -ㄹ지언정, que constrói uma escolha entre dois males; -ㄴ/는 한이 있더라도 enfatiza o preço que se aceita pagar. Registro: formal, escrito e oral solene.",
      [
        ["오해를 살 한이 있더라도 사실을 그대로 말하겠습니다.", "Mesmo que haja o risco de mal-entendido, direi os fatos como são."],
        ["시간이 걸리는 한이 있더라도 검증을 생략하지 않겠다.", "Mesmo que leve tempo, não vou omitir a verificação."],
      ],
    ],
  ],
  guided: [
    mcq("O que a autora concede à objeção?", ["Que o imposto, sozinho, não resolve a obesidade.", "Que o imposto não tem nenhum efeito sobre o consumo.", "Que a obesidade não é um problema de saúde pública."], "Que o imposto, sozinho, não resolve a obesidade.", "Ela afirma que não considera o imposto suficiente por si só, mas mantém a defesa de um desenho adequado."),
    cloze("Complete a concessão: 비용이 늘어날___ 근거 없는 결정은 하지 않겠다.", "지언정", "-ㄹ지언정 liga o custo aceito a uma recusa deliberada."),
    listen("Ouça e escreva a objeção mais forte apresentada no texto.", "가장 강한 반론은 세금이 건강 행동을 바꾸지 못한다는 것이다.", "가장 강한 반론은 세금이 건강 행동을 바꾸지 못한다는 것이다.", "A objeção mais forte é que o imposto não muda o comportamento de saúde."),
    reading("가장 강한 반론은 세금이 소비를 다른 지역으로 옮길 뿐, 건강 행동을 바꾸지 못한다는 것이다. 실제로 일부 국가에서는 세금 도입 후 인접 지역 구매가 늘었다. 또한 저소득층이 같은 세금을 더 크게 부담한다는 형평성 문제도 제기된다.", "Como o texto trata a objeção?", ["Reconstrói a objeção em sua versão mais forte antes de responder.", "Apresenta uma versão enfraquecida para refutá-la com facilidade.", "Ignora a objeção e passa direto à conclusão."], "Reconstrói a objeção em sua versão mais forte antes de responder.", "O texto inclui os dois argumentos mais difíceis — deslocamento do consumo e equidade — antes de responder."),
    translate("pt-ko", "Traduza: “Mesmo que haja o risco de mal-entendido, direi os fatos como são.”", "오해를 살 한이 있더라도 사실을 그대로 말하겠습니다.", "-ㄴ/는 한이 있더라도 nomeia o custo aceito antes do compromisso.", ["오해를 살지언정 사실을 그대로 말하겠습니다."]),
  ],
  independent: [
    mcq("Qual frase admite um custo antes de manter a decisão?", ["오해를 살 한이 있더라도 사실을 말하겠다.", "오해를 사지 않도록 사실을 말하지 않겠다.", "오해가 없었기 때문에 사실을 말했다."], "오해를 살 한이 있더라도 사실을 말하겠다.", "A primeira frase aceita o custo do mal-entendido para preservar a decisão."),
    cloze("Complete a concessão do debate: 타당한 지적에는 ___ 수밖에 없었다.", "양보할", "양보할 수밖에 없었다 indica que a concessão era inevitável diante da crítica válida."),
    listen("Ouça e escreva a ordem que evita o adversário de palha.", "타당한 지적은 먼저 인정하고 남은 쟁점으로 넘어간다.", "타당한 지적은 먼저 인정하고 남은 쟁점으로 넘어간다.", "Reconheça primeiro a crítica válida e passe então ao ponto que resta."),
    translate("ko-pt", "Traduza: 이 반론은 세금 정책의 효과를 의심하는 것이 아니라, 효과가 나타나는 조건을 묻는다.", "Essa objeção não duvida do efeito da política tributária, mas pergunta em que condições ele aparece.", "A construção -가 아니라 separa a suspeita da pergunta pelas condições.", ["Essa objeção não põe em dúvida o efeito do imposto; pergunta pelas condições em que ele se manifesta."]),
    reading("따라서 지지자들이 답해야 할 질문은 ‘세금이 옳은가’가 아니라 ‘어떤 설계에서 효과가 나타나는가’이다. 나는 세금만으로 비만을 해결할 수 있다고 보지 않는다. 그럼에도 가격 신호를 무시하는 정책이 더 낫다고는 생각하지 않는다.", "Qual é a posição final da autora?", ["Aceita a crítica e defende avaliar o desenho da política, não apenas sua intenção.", "Rejeita a crítica e mantém a defesa do imposto sem condições.", "Conclui que nenhuma política de saúde deve ser tentada."], "Aceita a crítica e defende avaliar o desenho da política, não apenas sua intenção.", "Ela concede o limite e desloca a discussão para o desenho e as condições."),
  ],
  summary: [
    "Reconstruir a objeção em sua versão mais forte é parte da refutação, não preparação externa.",
    "-ㄹ지언정 expressa concessão forte ligada a uma escolha deliberada.",
    "-ㄴ/는 한이 있더라도 nomeia o custo aceito para manter um compromisso.",
    "Conceder o que é válido antes de contestar preserva a credibilidade do texto.",
    "Conteúdo novo permanece em revisão.",
  ],
  production: production(
    "Produção independente · uma réplica justa",
    "Escolha uma posição que você defende e escreva uma réplica a uma objeção real. Apresente primeiro a objeção em sua versão mais forte, diga o que concede e só então responda.",
    "상대의 반론을 공정하게 재구성한 뒤 답해 보세요.",
    ["Resuma a objeção sem ironia e sem enfraquecê-la.", "Diga explicitamente o que você concede.", "Use -ㄹ지언정 ou -ㄴ/는 한이 있더라도 uma vez.", "Responda ao ponto mais forte, não ao mais fácil.", "Feche com o que ainda não está resolvido."],
    ["Objeção reconstruída em versão forte.", "Concessão explícita.", "Réplica dirigida ao ponto central.", "Uma forma de concessão forte usada com sentido.", "Fechamento que não promete vitória total."],
    "나는 온라인 투표 도입에 조건부로 찬성한다. 가장 강한 반론은 접근성이 낮은 유권자가 소외된다는 지적이다. 이 반론은 타당하며, 단순히 투표율이 오른다는 이유로 무시할 수 없다. 실제로 고령 유권자의 디지털 접근성은 지역마다 차이가 크다. 그럼에도 오프라인 투표소를 함께 운영하는 한, 온라인 투표는 접근성을 넓힐 수 있다. 문제는 수단이 아니라 설계다. 나는 모든 유권자에게 같은 정보가 제공되고, 결과 검증 절차가 공개되는 조건에서만 도입해야 한다고 본다. 속도가 늦어질지언정 검증 없는 도입은 하지 않겠다. 근거 없는 확신보다 검증 가능한 절차가 우선이다.",
    "Sou favorável à adoção do voto online, com condições. A objeção mais forte é a crítica de que eleitores com pouca acessibilidade digital ficam excluídos. Essa objeção é válida e não pode ser ignorada apenas porque a participação aumentaria. De fato, o acesso digital de eleitores idosos varia muito conforme a região. Ainda assim, desde que as seções eleitorais presenciais continuem funcionando, o voto online pode ampliar o acesso. O problema não está no meio, mas no desenho. Considero que ele só deve ser adotado sob a condição de que todos os eleitores recebam a mesma informação e de que o procedimento de verificação dos resultados seja público. Mesmo que o processo atrase, não farei uma adoção sem verificação. Procedimentos verificáveis vêm antes de convicções sem evidência.",
    "Exemplo original de oito frases. A objeção vem antes da resposta, e a concessão aparece sem apagar a posição. Exemplo ilustrativo; não é gabarito.",
  ),
});

/** c1-l05 — apelo retórico e responsabilidade enunciativa. */
export const C1_L05 = defineC1Lesson({
  id: "c1-l05", number: 5, moduleId: "c1-m01", title: "O apelo e a responsabilidade",
  objective: "Reconhecer recursos retóricos e avaliar quando o apelo ultrapassa a evidência.",
  prerequisites: ["c1-l04"], estimatedMinutes: 80, dialogueTitle: "O medo como argumento",
  intro: [
    {
      title: "Emoção e evidência não ocupam o mesmo lugar",
      body: "Um apelo emocional pode ser legítimo: ele mostra por que um problema importa e dá rosto a um número. O que ele não pode fazer é substituir a evidência. Quando o texto intensifica o medo para compensar a falta de dados, o leitor perde a possibilidade de discordar sem parecer insensível. Avaliar um texto argumentativo exige separar o que é valor, o que é evidência e o que é apenas pressão.",
      ko: "불안을 키우는 문장은 설득력이 아니라 압박을 만든다.",
    },
    {
      title: "Quem responde pelo que diz",
      body: "Generalizações vagas transferem ao leitor um custo que o autor não assume. Expressões como “todos sabem” ou “é evidente” escondem a fonte e impedem a verificação. Em C1, responsabilidade enunciativa significa dizer quem mediu, em que condições e com que limite. Também significa não usar o medo como atalho para a conclusão: se a urgência é real, ela sobrevive à apresentação dos dados; se não sobrevive, era retórica.",
      ko: "‘모두가 알고 있듯이’라는 표현은 근거를 숨기는 방식이 될 수 있다.",
    },
  ],
  dialogue: [
    ["혜원", "토마스 씨, 이 문안은 읽는 사람을 꽤 불안하게 만들어요.", "Thomas, este texto deixa o leitor bastante ansioso."],
    ["토마스", "긴급하다는 점을 알리고 싶었습니다. 그래서 ‘지금 행동하지 않으면 큰일 납니다’라고 썼습니다.", "Eu queria comunicar que é urgente. Por isso escrevi ‘se não agirmos agora, vai ser um desastre’."],
    ["혜원", "긴급성은 이해해요. 그런데 이 문장에는 근거가 없어요. 어떤 수치를 보고 그렇게 판단하셨어요?", "Entendo a urgência. Mas essa frase não tem evidência. Com base em que número o senhor chegou a essa conclusão?"],
    ["토마스", "작년 조사에서 예방 접종률이 12퍼센트 떨어졌습니다. 그 수치를 강조하고 싶었습니다.", "Na pesquisa do ano passado, a taxa de vacinação caiu 12%. Eu queria destacar esse número."],
    ["혜원", "수치는 넣되, ‘큰일’ 대신에 그 수치가 의미하는 위험을 구체적으로 쓰면 좋겠어요.", "Inclua o número, mas, em vez de ‘desastre’, seria bom escrever concretamente o risco que esse número representa."],
    ["토마스", "그러면 문장이 약해지지 않겠습니까?", "Mas então a frase não perde força?"],
    ["혜원", "오히려 독자가 스스로 판단할 여지가 생겨요. 감정에 호소하는 문장은 근거를 대신하지 못해요.", "Ao contrário, abre espaço para o leitor julgar por conta própria. Uma frase que apela à emoção não substitui a evidência."],
    ["토마스", "알겠습니다. 수치와 출처를 넣고, 마지막 문장은 행동을 제안하는 쪽으로 고치겠습니다.", "Entendido. Vou incluir o número e a fonte, e reescrever a última frase para propor uma ação."],
  ],
  readingText: {
    titlePt: "O que o medo não demonstra",
    paragraphs: [
      "존경하는 시의원 여러분, 저는 청소년 교통비 지원 조례를 지지하지 않을 수 없습니다. 등교 시간대 버스 요금이 지난 3년 사이 두 차례 인상되었고, 저소득 가정에서는 그 비용을 다른 지출에서 덜어 내고 있습니다. 제가 말씀드리고자 하는 바는 단순합니다. 이동권은 교육권의 일부이며, 비용 때문에 등교를 포기하는 학생이 있어서는 안 된다는 것입니다. 조례의 목적은 모든 학생에게 같은 혜택을 주는 것이 아니라, 비용 때문에 생기는 결석을 줄이는 것입니다.",
      "시가 공개한 자료에 따르면, 지원 대상 학생의 월평균 교통비는 4만 2천 원입니다. 이 금액은 한 달 급식비의 절반에 해당합니다. 그러나 자료에는 통학 거리별 차이가 빠져 있습니다. 먼 곳에서 오는 학생에게 같은 금액을 지원하면 부담이 충분히 줄지 않습니다. 이 빈틈을 인정하지 않으면 지원은 형평성을 잃을 수 있습니다. 통학 거리가 먼 학생의 실제 지출을 확인하려면 추가 조사가 필요합니다.",
      "그럼에도 저는 이 조례가 지금 필요한 이유를 분명히 말하고자 합니다. 정책의 완벽한 설계를 기다리는 동안 비용을 감당하는 사람은 학생입니다. 물론 재원 마련과 형평성은 함께 검토해야 합니다. 그러나 불확실성을 이유로 아무것도 하지 않는 선택은 책임 있는 판단이 아닙니다. 저는 독자 여러분께 이 조례를 조건부로 검토해 주실 것을 요청합니다. 조건을 붙인 검토는 결론을 미루는 것이 아니라, 책임의 범위를 분명히 하는 일입니다.",
    ],
    pt: "Senhores vereadores, não posso deixar de apoiar o projeto de apoio ao transporte de adolescentes. A tarifa de ônibus no horário de entrada escolar subiu duas vezes nos últimos três anos, e as famílias de baixa renda vêm retirando esse custo de outras despesas. O que desejo dizer nesta ocasião é simples: o direito de ir e vir faz parte do direito à educação, e não deve haver estudante que desista de ir à escola por causa do custo. O objetivo do projeto não é dar o mesmo benefício a todos os estudantes, mas reduzir as faltas causadas pelo custo. Segundo os dados divulgados pela prefeitura, o gasto médio mensal de transporte dos estudantes atendidos é de 42 mil won. Esse valor corresponde à metade do custo mensal da merenda. Os dados, porém, não trazem a diferença por distância de deslocamento. Se o mesmo valor for concedido a estudantes que vêm de longe, a carga não diminui o suficiente. Se essa lacuna não for reconhecida, o apoio pode perder equidade. Para confirmar o gasto real de estudantes que vêm de longe, é necessária uma pesquisa adicional. Ainda assim, quero dizer com clareza por que este projeto é necessário agora. Enquanto se espera o desenho perfeito da política, quem arca com o custo são os estudantes. É claro que a fonte de recursos e a equidade devem ser examinadas em conjunto. No entanto, escolher não fazer nada por causa da incerteza não é um julgamento responsável. Peço aos leitores que examinem este projeto de forma condicional. Uma análise com condições não adia a conclusão: ela esclarece o alcance da responsabilidade.",
    objective: "Avaliar onde o apelo retórico excede a base empírica e o que o orador concede.",
  },
  reusedIds: ["ko:자료", "ko:독자", "ko:설득력", "ko:강조"],
  grammar: [
    [
      "-지 않을 수 없다 — não se pode deixar de",
      "동사 + -지 않을 수 없다",
      "Expressa que algo é inevitável diante das circunstâncias, e não apenas um dever. A dupla negação cria a ideia de “não há como não”. Compare com -아/어야 한다, que impõe uma obrigação externa; -지 않을 수 없다 descreve uma constatação do falante, muitas vezes com carga emocional. Registro: formal, escrito e oral solene. Não use com uma ação corriqueira que simplesmente precisa ser feita.",
      [
        ["등교 비용을 논의할 때 학부모의 부담을 언급하지 않을 수 없다.", "Ao discutir os custos de deslocamento escolar, não se pode deixar de mencionar o peso para os pais."],
        ["자료에 한계가 있어도 정책의 필요성을 인정하지 않을 수 없었다.", "Mesmo com os limites dos dados, não se podia deixar de reconhecer a necessidade da política."],
      ],
    ],
    [
      "-고자 하는 바이다 — é o que se pretende (registro muito formal)",
      "동사 + -고자 하는 바이다",
      "Anuncia o ponto central de um discurso, de uma carta oficial ou de um artigo, nominalizando a intenção com 바. É mais solene que -고자 하다 e aparece sobretudo na abertura de falas institucionais. Compare com -(으)려고 하다, oral e neutro, e com -고자 합니다, formal, mas menos enfático. Não use em conversa cotidiana nem para intenções de terceiros.",
      [
        ["제가 이 자리에서 말씀드리고자 하는 바는 절차의 투명성입니다.", "O que desejo dizer nesta ocasião é a transparência do procedimento."],
        ["이 글에서 확인하고자 하는 바는 비용의 분배입니다.", "O que este texto pretende verificar é a distribuição dos custos."],
      ],
    ],
  ],
  guided: [
    mcq("O que a editora critica no texto da campanha?", ["O uso do medo sem dados que o sustentem.", "A ausência de imagens na peça.", "O tamanho excessivo das frases."], "O uso do medo sem dados que o sustentem.", "Ela pergunta qual número sustenta a frase e critica a falta de evidência."),
    cloze("Complete a crítica ao apelo vazio: 감정에 ___ 문장은 근거를 대신하지 못해요.", "호소하는", "호소하는 문장 apela à emoção, mas não substitui a evidência."),
    listen("Ouça e escreva o princípio que a editora defende.", "감정에 호소하는 문장은 근거를 대신하지 못해요.", "감정에 호소하는 문장은 근거를 대신하지 못해요.", "Uma frase que apela à emoção não substitui a evidência."),
    reading("시가 공개한 자료에 따르면, 지원 대상 학생의 월평균 교통비는 4만 2천 원입니다. 이 금액은 한 달 급식비의 절반에 해당합니다. 그러나 자료에는 통학 거리별 차이가 빠져 있습니다.", "O que o orador reconhece sobre os dados?", ["Que falta a diferença por distância de deslocamento.", "Que os valores são inventados.", "Que o transporte já é gratuito para todos."], "Que falta a diferença por distância de deslocamento.", "Ele aponta que os dados não trazem a diferença por distância, o que limita a equidade do apoio."),
    translate("pt-ko", "Traduza: “Não se pode deixar de mencionar o peso para os pais.”", "학부모의 부담을 언급하지 않을 수 없다.", "-지 않을 수 없다 expressa inevitabilidade, não uma obrigação externa.", ["학부모의 부담을 언급하지 않을 수 없습니다."]),
  ],
  independent: [
    mcq("Qual frase expressa uma inevitabilidade, e não uma obrigação externa?", ["그 자료를 보면 한계를 인정하지 않을 수 없다.", "그 자료를 반드시 제출해야 한다.", "그 자료를 내일 다시 보겠다."], "그 자료를 보면 한계를 인정하지 않을 수 없다.", "A dupla negação indica que o falante não tem como deixar de reconhecer o limite."),
    cloze("Complete o anúncio formal do propósito: 이 글에서 확인하고자 ___ 바는 비용의 분배입니다.", "하는", "A forma fixa é -고자 하는 바이다."),
    listen("Ouça e escreva a posição do orador sobre o projeto.", "이 조례를 지지하지 않을 수 없습니다.", "이 조례를 지지하지 않을 수 없습니다.", "Não posso deixar de apoiar este projeto."),
    translate("ko-pt", "Traduza: 정책의 완벽한 설계를 기다리는 동안 비용을 감당하는 사람은 학생이다.", "Enquanto se espera o desenho perfeito da política, quem arca com o custo são os estudantes.", "A estrutura -는 동안 marca o período em que o custo recai sobre os estudantes.", ["Enquanto aguardamos o desenho ideal da política, são os estudantes que suportam o custo."]),
    reading("그럼에도 저는 이 조례가 지금 필요한 이유를 분명히 말하고자 합니다. 정책의 완벽한 설계를 기다리는 동안 비용을 감당하는 사람은 학생입니다. 물론 재원 마련과 형평성은 함께 검토해야 합니다. 그러나 불확실성을 이유로 아무것도 하지 않는 선택은 책임 있는 판단이 아닙니다.", "Qual é a posição final do orador?", ["Defende a análise condicional da proposta, sem esperar certeza total.", "Defende a aprovação imediata sem qualquer ressalva.", "Defende adiar o projeto até que os dados sejam perfeitos."], "Defende a análise condicional da proposta, sem esperar certeza total.", "Ele reconhece os limites e pede exame condicional, não aprovação cega nem adiamento indefinido."),
  ],
  summary: [
    "O apelo emocional pode motivar, mas não substitui a evidência.",
    "-지 않을 수 없다 expressa inevitabilidade, distinta da obrigação de -아/어야 한다.",
    "-고자 하는 바이다 anuncia o propósito em registro institucional solene.",
    "Responsabilidade enunciativa exige fonte, condição e limite explícitos.",
    "Conteúdo novo permanece em revisão.",
  ],
  production: production(
    "Produção independente · urgência com responsabilidade",
    "Reescreva um apelo de campanha sobre um problema real do seu entorno. Mantenha a urgência, mas substitua o medo vago por dados, fonte e uma condição clara.",
    "긴급성을 유지하면서 근거를 갖춘 호소문을 써 보세요.",
    ["Abra com o problema e o público afetado.", "Use -지 않을 수 없다 uma vez para marcar a inevitabilidade.", "Use -고자 하는 바이다 uma vez para anunciar o propósito.", "Inclua um número, sua fonte e o limite do dado.", "Feche com uma ação concreta e condicional."],
    ["Urgência preservada sem exagero.", "Ao menos um dado com fonte.", "Limite do dado reconhecido.", "Duas formas-alvo usadas com sentido.", "Pedido final específico e verificável."],
    "존경하는 위원님들, 저는 야간 도서관 운영을 축소하려는 계획을 재검토해 주시기를 요청합니다. 시가 공개한 자료에 따르면, 지난해 야간 이용자는 1만 8천 명이었습니다. 이 가운데 62퍼센트가 재수생과 야간 근무자였습니다. 물론 운영 비용이 적지 않다는 점을 부정하지 않습니다. 그러나 비용만으로 이 이용자들의 필요를 지울 수는 없습니다. 저는 이 점을 다시 강조하지 않을 수 없습니다. 제가 제안하고자 하는 바는 모든 시간대를 유지하는 것이 아니라, 시험 기간과 주말에 한해 운영을 유지하는 조건입니다. 자료와 조건을 함께 놓고 판단해 주시기 바랍니다.",
    "Senhores conselheiros, peço que reexaminem o plano de reduzir o horário noturno da biblioteca. Segundo os dados divulgados pela prefeitura, no ano passado houve 18 mil usuários noturnos. Desses, 62% eram estudantes em cursinho e trabalhadores do turno da noite. É claro que não nego que o custo operacional seja considerável. No entanto, o custo sozinho não pode apagar a necessidade desses usuários. Não posso deixar de reiterar esse ponto. O que proponho não é manter todos os horários, mas a condição de manter o funcionamento apenas durante o período de provas e nos fins de semana. Peço que avaliem os dados e as condições em conjunto.",
    "Exemplo original de oito frases. A urgência aparece, mas é sustentada por um dado, uma fonte e uma condição. Exemplo ilustrativo; não é gabarito.",
  ),
});
