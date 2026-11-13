import { cloze, defineC1Lesson, listen, mcq, reading, translate } from "../shared";
import type { CourseProductionTask } from "../../course-types";

const RUBRIC = [
  { criterion: "task" as const, labelPt: "Cumprimento da tarefa", descriptorPt: "O texto assume o gênero pedido — apresentação, artigo, ata, proposta ou carta — e responde ao enunciado." },
  { criterion: "organization" as const, labelPt: "Organização e progressão", descriptorPt: "As partes do gênero aparecem na ordem adequada e cada uma cumpre uma função reconhecível." },
  { criterion: "vocabulary" as const, labelPt: "Vocabulário e colocação", descriptorPt: "Usa léxico preciso do contexto acadêmico ou institucional, inclusive parte do léxico da lição, com colocações naturais." },
  { criterion: "grammar" as const, labelPt: "Gramática e registro", descriptorPt: "As formas-alvo aparecem corretas e o registro formal se mantém coerente do início ao fim." },
  { criterion: "argument" as const, labelPt: "Precisão do conteúdo", descriptorPt: "O conteúdo é delimitado: método, ressalva, premissa ou pedido não prometem mais do que o texto pode sustentar." },
  { criterion: "synthesis" as const, labelPt: "Síntese e fechamento", descriptorPt: "O fechamento retoma o essencial, indica o próximo passo e deixa claro o que permanece em aberto." },
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

/** c1-l11 — apresentação acadêmica: pergunta, método, achado e limite. */
export const C1_L11 = defineC1Lesson({
  id: "c1-l11", number: 11, moduleId: "c1-m03", title: "Apresentar uma pesquisa",
  objective: "Apresentar problema, método e resultado em registro acadêmico oral.",
  prerequisites: ["c1-c02"], estimatedMinutes: 80, dialogueTitle: "O ensaio da abertura",
  intro: [
    {
      title: "A apresentação começa pela pergunta",
      body: "Em uma comunicação acadêmica, o ouvinte precisa saber nos primeiros dois minutos qual pergunta o estudo responde. Problema, método e resultado são etapas de uma mesma resposta; se a pergunta fica implícita, o público acompanha os números sem saber o que eles demonstram. Diga a pergunta em uma frase, mostre por que ela importa e só então apresente o desenho da pesquisa. A ordem protege o ouvinte de confundir o achado com a interpretação.",
      ko: "발표의 첫 문장은 연구 질문이어야 하며, 방법은 그 질문에 어떻게 답했는지를 설명해야 한다.",
    },
    {
      title: "Transições que o ouvinte consegue seguir",
      body: "Uma apresentação acadêmica não é uma sequência de slides: é uma sequência de passagens. Anuncie cada mudança — do problema para o método, do resultado para a ressalva — com uma frase curta que diga o que vem a seguir e por quê. Em uma aula ou palestra, o ouvinte tolera mais digressões; em uma comunicação de pesquisa, a transição explícita é o que permite reconstruir o argumento depois. Fechar com o limite do estudo não enfraquece a fala: mostra que você sabe o que seus dados sustentam.",
      ko: "학술 발표에서는 ‘다음으로’, ‘이 점에서’ 같은 전환이 강연보다 더 분명해야 한다.",
    },
  ],
  dialogue: [
    ["지안", "도현 씨, 내일 학술대회 발표 연습을 한 번만 들어 줄 수 있어요?", "Dohyeon, você pode ouvir uma vez meu ensaio da apresentação para o congresso acadêmico de amanhã?"],
    ["도현", "그럼요. 초록에 쓴 질문부터 시작해 보세요.", "Claro. Comece pela pergunta que você escreveu no resumo."],
    ["지안", "저는 오늘 도시 열섬과 야간 기온의 관계를 발표하고자 합니다.", "Pretendo apresentar hoje a relação entre ilha de calor urbana e temperatura noturna."],
    ["도현", "좋아요. 그런데 ‘관계’라고만 하면 무엇을 확인했는지 흐려져요. 질문을 한 문장으로 말해 볼까요?", "Bom. Mas dizer apenas ‘relação’ torna obscuro o que foi verificado. Que tal dizer a pergunta em uma frase?"],
    ["지안", "녹지 면적이 늘어날수록 야간 기온의 상승 폭이 줄어드는가, 입니다.", "É: à medida que a área verde aumenta, a amplitude da alta da temperatura noturna diminui?"],
    ["도현", "이제 방법으로 넘어가세요. 청중은 숫자보다 질문과 방법의 연결을 먼저 궁금해해요.", "Agora passe ao método. O público se interessa primeiro pela ligação entre a pergunta e o método, mais do que pelos números."],
    ["지안", "그럼 ‘이 질문에 답하기 위해 25개 구의 3년 자료를 비교했습니다’라고 하면 되겠네요.", "Então posso dizer ‘para responder a esta pergunta, comparei dados de três anos dos 25 distritos’."],
    ["도현", "네. 마지막에는 이 결과가 말해 주지 않는 것을 분명히 하세요. 그게 발표의 신뢰를 지켜요.", "Sim. No fim, deixe claro o que este resultado não diz. Isso preserva a credibilidade da apresentação."],
  ],
  readingText: {
    titlePt: "Uma abertura que diz o que será demonstrado",
    paragraphs: [
      "존경하는 심사위원 여러분, 저는 오늘 도시 열섬 현상이 야간 기온에 미치는 영향을 발표하고자 합니다. 연구의 출발점은 단순한 관찰이었습니다. 같은 날에도 녹지가 많은 구와 그렇지 않은 구의 밤 기온 차이가 섭씨 2도 이상 벌어지는 날이 있었습니다. 저희가 답하고자 하는 질문은 녹지 면적이 늘어날수록 야간 기온의 상승 폭이 줄어드는가입니다. 이 질문이 중요한 대목은, 지자체가 조성 예산을 배분할 때 근거로 삼을 만한 수치가 아직 부족하다는 점입니다.",
      "분석에는 2021년부터 2023년까지 서울 25개 구의 야간 위성 관측값과 공원 면적 자료를 사용했습니다. 구별 평균 기온을 종속 변수로 두고, 녹지 비율과 건물 밀도를 독립 변수로 설정했습니다. 그 결과 녹지 비율이 10퍼센트 높은 구는 야간 기온 상승 폭이 평균 0.4도 낮았습니다. 다만 이 차이가 녹지 때문이라고 단정하기는 어렵습니다. 냉각 효과가 큰 구에는 오래된 공원이 많고, 그 공원 주변의 건물 밀도도 함께 낮기 때문입니다. 이 점은 결과를 해석할 때 반드시 짚어야 할 대목입니다.",
      "발표를 준비하면서 가장 고민한 부분은 한계를 어디까지 말할 것인가였습니다. 저는 이 연구가 인과관계를 증명하지 못한다는 점을 먼저 밝히고자 합니다. 대신 다음 단계로 구별 녹지 조성 시점을 활용한 비교 연구를 제안합니다. 발표 뒤 질의 시간에는 수치의 신뢰 구간과 표본 기간에 대한 질문을 받을 것으로 예상합니다. 청중 가운데 정책 담당자가 있다면, 이 결과를 예산 배분의 유일한 근거가 아니라 우선순위를 정하는 참고 자료로 읽어 주시기를 부탁드립니다. 슬라이드에는 구별 지도를 넣었으니, 지역 차이를 함께 봐 주시면 좋겠습니다.",
    ],
    pt: "Senhores membros da banca, hoje pretendo apresentar o efeito do fenômeno de ilha de calor urbana sobre a temperatura noturna. O ponto de partida da pesquisa foi uma observação simples. Mesmo no mesmo dia, havia ocasiões em que a diferença de temperatura noturna entre um distrito com muita área verde e outro sem tanta chegava a mais de 2 graus Celsius. A pergunta que pretendemos responder é se, à medida que a área verde aumenta, a amplitude da alta da temperatura noturna diminui. O ponto em que essa pergunta é importante está em que ainda faltam valores numéricos que sirvam de base para os governos locais distribuírem o orçamento de implantação. Para a análise, usamos observações noturnas por satélite e dados de área de parques dos 25 distritos de Seul entre 2021 e 2023. Tomamos a temperatura média por distrito como variável dependente e definimos a proporção de área verde e a densidade de edifícios como variáveis independentes. Como resultado, os distritos com proporção de área verde 10% maior tiveram, em média, alta noturna 0,4 grau menor. No entanto, é difícil afirmar categoricamente que essa diferença se deva à área verde. Isso porque os distritos com maior efeito de resfriamento têm muitos parques antigos, e a densidade de edifícios ao redor desses parques também é baixa. Esse é justamente um ponto que precisa ser destacado ao interpretar o resultado. Ao preparar a apresentação, a parte que mais me preocupou foi até onde falar dos limites. Quero deixar claro primeiro que este estudo não comprova uma relação causal. Em vez disso, proponho como próximo passo um estudo comparativo que utilize o momento de criação de áreas verdes por distrito. Depois da apresentação, no tempo de perguntas, prevejo questões sobre o intervalo de confiança dos números e o período da amostra. Se houver entre o público alguém responsável por políticas, peço que leia este resultado não como a única base para a distribuição do orçamento, mas como material de referência para definir prioridades. Incluí no slide um mapa por distrito; será bom que observem também as diferenças regionais.",
    objective: "Identificar a pergunta de pesquisa, o achado principal e o limite declarado pela apresentadora.",
  },
  reusedIds: ["ko:연구", "ko:결과", "ko:담당자", "ko:연결"],
  grammar: [
    [
      "-ㄴ/는 대목이다 — é o ponto em que; é justamente o ponto",
      "동사 + -는 대목이다 / 형용사 + -(으)ㄴ 대목이다 / 명사 + 인 대목이다",
      "Aponta o trecho ou aspecto específico que merece atenção dentro de um texto, argumento ou fenômeno. Diferente de -는 부분이다, mais neutro e genérico, -는 대목이다 soa analítico e costuma preparar uma explicação ou uma ressalva. É comum em apresentações, resenhas e relatórios. Não indica lugar físico; para lugar, use 장소 ou 곳.",
      [
        ["논지가 흔들리는 대목은 결론이 근거보다 앞서 나간다는 점이다.", "O ponto em que a tese vacila é que a conclusão avança antes da evidência."],
        ["이 질문이 중요한 대목은 예산 배분의 근거가 아직 부족하다는 데 있다.", "O ponto em que esta pergunta é importante está em que ainda faltam bases para a distribuição do orçamento."],
      ],
    ],
    [
      "-고자 합니다 — pretendo (registro formal de apresentação)",
      "동사 + -고자 합니다",
      "Declara o objetivo de quem fala em uma apresentação, um discurso, uma ata ou uma carta. É mais solene que -(으)려고 합니다 e aparece quase sempre na primeira pessoa em comunicações orais. Em texto escrito, -고자 한다 pode retomar a intenção do autor, como em um artigo. Não use para a intenção de terceiros nem em conversa casual.",
      [
        ["저는 오늘 세 가지 결과를 발표하고자 합니다.", "Pretendo apresentar hoje três resultados."],
        ["마지막으로 후속 연구의 방향을 제안하고자 합니다.", "Por fim, pretendo propor a direção de pesquisas futuras."],
      ],
    ],
  ],
  guided: [
    mcq("Qual é a pergunta de pesquisa anunciada na apresentação?", ["Se o aumento da área verde reduz a alta da temperatura noturna.", "Quanto custa a criação de parques em Seul.", "Quantos moradores participaram da pesquisa."], "Se o aumento da área verde reduz a alta da temperatura noturna.", "A pergunta aparece em “녹지 면적이 늘어날수록 야간 기온의 상승 폭이 줄어드는가”."),
    cloze("Complete o ponto que dá importância à pergunta: 이 질문이 중요한 ___은, 예산 배분의 근거가 아직 부족하다는 점입니다.", "대목", "A forma -ㄴ/는 대목이다 destaca o aspecto relevante da pergunta."),
    listen("Ouça e escreva a pergunta de pesquisa apresentada.", "저희가 답하고자 하는 질문은 녹지 면적이 늘어날수록 야간 기온의 상승 폭이 줄어드는가입니다.", "저희가 답하고자 하는 질문은 녹지 면적이 늘어날수록 야간 기온의 상승 폭이 줄어드는가입니다.", "A pergunta que pretendemos responder é se, à medida que a área verde aumenta, a amplitude da alta da temperatura noturna diminui."),
    reading("분석에는 2021년부터 2023년까지 서울 25개 구의 야간 위성 관측값과 공원 면적 자료를 사용했습니다. 구별 평균 기온을 종속 변수로 두고, 녹지 비율과 건물 밀도를 독립 변수로 설정했습니다.", "O que a pesquisa comparou?", ["A temperatura média por distrito com a proporção de área verde e a densidade de edifícios.", "O número de moradores com o preço dos imóveis.", "O consumo de energia com a quantidade de parques infantis."], "A temperatura média por distrito com a proporção de área verde e a densidade de edifícios.", "O texto descreve a temperatura como variável dependente e a área verde e a densidade como independentes."),
    translate("pt-ko", "Traduza: “Pretendo apresentar os resultados e os limites desta pesquisa.”", "저는 이 연구의 결과와 한계를 발표하고자 합니다.", "-고자 합니다 declara a intenção em registro formal de apresentação.", ["이 연구의 결과와 한계를 발표하고자 합니다."]),
  ],
  independent: [
    mcq("Qual frase usa -는 대목이다 de forma adequada?", ["해석이 갈리는 대목은 표본의 성격이다.", "해석이 갈리는 대목에 회의장은 넓다.", "해석이 갈리는 대목으로 내일 만나자."], "해석이 갈리는 대목은 표본의 성격이다.", "A forma destaca o aspecto em que a interpretação se divide, não um lugar físico."),
    cloze("Complete o anúncio do objetivo: 저는 오늘 연구 결과를 발표___ 합니다.", "하고자", "A forma é -고자 합니다, usada para declarar a intenção do falante."),
    listen("Ouça e escreva o limite que a apresentadora reconhece.", "이 차이가 녹지 때문이라고 단정하기는 어렵습니다.", "이 차이가 녹지 때문이라고 단정하기는 어렵습니다.", "É difícil afirmar categoricamente que essa diferença se deva à área verde."),
    translate("ko-pt", "Traduza: 발표 뒤 질의 시간에는 수치의 신뢰 구간에 대한 질문이 나올 것으로 예상합니다.", "Prevejo que, no tempo de perguntas após a apresentação, surgirão questões sobre o intervalo de confiança dos números.", "질의 시간 = tempo de perguntas; 신뢰 구간 = intervalo de confiança.", ["Espero que, depois da apresentação, as perguntas tratem do intervalo de confiança dos valores."]),
    reading("발표를 준비하면서 가장 고민한 부분은 한계를 어디까지 말할 것인가였습니다. 저는 이 연구가 인과관계를 증명하지 못한다는 점을 먼저 밝히고자 합니다. 대신 다음 단계로 구별 녹지 조성 시점을 활용한 비교 연구를 제안합니다.", "O que a apresentadora propõe como próximo passo?", ["Um estudo comparativo que use o momento de criação das áreas verdes por distrito.", "Uma nova medição de temperatura em todos os países.", "O fim da distribuição de orçamento para parques."], "Um estudo comparativo que use o momento de criação das áreas verdes por distrito.", "Ela reconhece o limite causal e propõe um desenho comparativo por momento de implantação."),
  ],
  summary: [
    "A comunicação acadêmica começa pela pergunta de pesquisa, não pelos números.",
    "Método, resultado e limite devem ser apresentados como partes da mesma resposta.",
    "-ㄴ/는 대목이다 destaca o aspecto relevante de um texto ou argumento.",
    "-고자 합니다 declara o objetivo em registro formal oral.",
    "Conteúdo novo permanece em revisão.",
  ],
  production: production(
    "Produção independente · abertura de uma apresentação",
    "Escreva a abertura de uma comunicação acadêmica sobre um tema que você conhece. Apresente a pergunta de pesquisa, por que ela importa, o método em uma frase e o limite que você já reconhece.",
    "연구 질문과 방법, 한계를 차례로 밝히는 발표 도입부를 써 보세요.",
    ["Comece pela pergunta, não pelo tema geral.", "Use -는 대목이다 uma vez para explicar por que a pergunta importa.", "Use -고자 합니다 uma vez para anunciar o objetivo.", "Diga o método em uma frase e termine com o limite do estudo."],
    ["Pergunta de pesquisa explícita.", "Justificativa da pergunta.", "Método descrito em uma frase.", "Limite declarado sem invalidar o estudo.", "Duas formas-alvo usadas com sentido."],
    "존경하는 심사위원 여러분, 저는 오늘 청소년 독서 프로그램의 재참여 요인을 분석한 결과를 발표하고자 합니다. 연구 질문은 ‘어떤 운영 방식이 재참여를 높이는가’입니다. 이 질문이 중요한 대목은, 지역 도서관의 예산이 줄어드는 가운데 어떤 프로그램을 남길지 판단할 근거가 부족하다는 점입니다. 저희는 2024년부터 2025년까지 세 지역 도서관의 참여 기록 1,800건을 비교했습니다. 그 결과 2주에 두 번 운영한 프로그램의 재참여율이 주 한 번 운영보다 12퍼센트 높았습니다. 다만 이 차이가 운영 방식 때문이라고 단정하기는 어렵습니다. 지역별 이용자 구성이 달랐기 때문입니다. 저는 이 결과를 모든 도서관에 적용하기보다, 비슷한 규모의 기관에서 먼저 검증할 것을 제안하고자 합니다.",
    "Senhores membros da banca, hoje pretendo apresentar os resultados de uma análise dos fatores de retorno ao programa de leitura juvenil. A pergunta de pesquisa é ‘que formato de operação aumenta a volta dos participantes?’. O ponto em que essa pergunta é importante está em que, com o orçamento das bibliotecas regionais diminuindo, faltam bases para decidir quais programas manter. Comparamos 1.800 registros de participação de três bibliotecas regionais entre 2024 e 2025. Como resultado, o índice de retorno do programa realizado duas vezes a cada duas semanas foi 12% maior do que o do programa semanal. No entanto, é difícil afirmar categoricamente que essa diferença se deva ao formato de operação. A composição dos usuários variava por região. Em vez de aplicar este resultado a todas as bibliotecas, proponho primeiro verificá-lo em instituições de porte semelhante.",
    "Exemplo original de oito frases. Observe a pergunta, a justificativa, o método e o limite antes do pedido final. Exemplo ilustrativo; não é gabarito.",
  ),
});

/** c1-l12 — artigo curto: método, resultado e seção de limitações. */
export const C1_L12 = defineC1Lesson({
  id: "c1-l12", number: 12, moduleId: "c1-m03", title: "O artigo e sua ressalva",
  objective: "Redigir método e ressalva de um artigo curto com precisão e cautela.",
  prerequisites: ["c1-l11"], estimatedMinutes: 80, dialogueTitle: "Antes da submissão",
  intro: [
    {
      title: "Método descrito não é método executado",
      body: "A seção de método existe para que outro pesquisador possa avaliar o que foi feito e, em princípio, repetir o percurso. Por isso ela nomeia a amostra, o período, o instrumento e o tipo de análise, sem adjetivos de valor. Quando o método fica vago, o leitor não consegue separar o que o estudo mediu do que o autor gostaria de ter medido. A precisão do método é o que dá sentido à ressalva: só é possível limitar corretamente o alcance de um resultado que se sabe como foi produzido.",
      ko: "방법 절은 표본, 기간, 도구, 분석 방식을 사실적으로 기술해야 한다.",
    },
    {
      title: "A ressalva tem lugar próprio",
      body: "Uma limitação bem escrita é específica e localizada: diz o que o desenho não permite concluir, não desqualifica o estudo inteiro. Ela pode aparecer na discussão, em uma subseção de limitações ou em nota, mas precisa ser encontrável por quem lê apenas o resumo e a conclusão. Evite fórmulas vazias como “faltam dados”: nomeie a variável não controlada, o recorte da amostra ou o instrumento que não foi validado. A ressalva protege o leitor e também o autor, porque impede que terceiros usem o resultado para fins que ele não sustenta.",
      ko: "한계는 구체적으로 쓰되, 연구 전체의 가치를 부정하지 않을 만큼 정확해야 한다.",
    },
  ],
  dialogue: [
    ["하나", "준호 씨, 투고 전에 한계 절만 다시 읽어 볼까요?", "Junho, que tal relermos só a seção de limitações antes da submissão?"],
    ["준호", "네. 지금 초안은 ‘표본이 작다’고만 써서 너무 막연해요.", "Sim. O rascunho atual diz apenas ‘a amostra é pequena’, o que é vago demais."],
    ["하나", "그러면 어떤 점에서 작은지 구체적으로 쓰는 게 좋겠어요. 세 병원, 4만 2천 건이면 규모는 크지만 기관 수가 적죠.", "Então é melhor escrever em que sentido ela é pequena. Três hospitais e 42 mil casos é um volume grande, mas o número de instituições é pequeno."],
    ["준호", "맞아요. ‘세 병원의 기록이라 다른 병원에 일반화하기는 어렵다’고 쓰면 어떨까요?", "Exato. Que tal escrever ‘como são registros de três hospitais, é difícil generalizar para outros hospitais’?"],
    ["하나", "좋아요. 그리고 중증도 보정이 빠졌다는 점도 밝혀야 해요.", "Bom. E também é preciso deixar claro que faltou o ajuste por gravidade."],
    ["준호", "그 부분은 각주로 돌릴까요, 본문에 넣을까요?", "Devo colocar essa parte em nota de rodapé ou no corpo do texto?"],
    ["하나", "심사위원이 먼저 찾을 문제이니 본문에 넣고, 분석 코드는 부록에 두세요.", "É um problema que o avaliador vai procurar primeiro, então ponha no corpo e deixe o código da análise no apêndice."],
    ["준호", "알겠습니다. 재현 가능성까지 챙기고 다시 투고할게요.", "Entendido. Vou cuidar também da reprodutibilidade e submeter de novo."],
  ],
  readingText: {
    titlePt: "O que o artigo promete e o que ele apenas sugere",
    paragraphs: [
      "이 글은 중소 병원의 야간 당직 인력 배치가 환자 대기 시간에 미치는 영향을 분석한다. 저자들은 2022년 1월부터 12월까지 세 개 병원의 응급실 기록 4만 2천 건을 검토했다. 당직 의사 수와 평균 대기 시간의 관계를 비교한 결과, 의사가 한 명 많은 시간대에는 대기 시간이 평균 7분 짧았다. 이 차이는 야간과 주말에 더 크게 나타났다. 다만 이 결과만으로 당직 인력을 늘리면 대기 시간이 같은 폭으로 줄어든다고 판단하기는 어렵다.",
      "방법론 측면에서 이 연구는 관찰 자료에 의존한다. 연구진은 교대 근무표와 환자 분류 기록을 연결했지만, 환자의 중증도가 시간대마다 다르다는 점을 완전히 통제하지는 못했다. 또한 세 병원의 규모와 진료 과목이 달라 결과를 다른 병원에 그대로 적용하기는 어렵다. 논문은 이 한계를 각주와 마지막 절에서 밝히고 있다. 그럼에도 일부 보도는 이 결과를 ‘당직 확대의 근거’로만 인용해, 저자들이 밝힌 조건을 지면에서 지웠다.",
      "저자들이 투고 단계에서 강조한 것은 결론의 범위였다. 그들은 당직 인력 배치가 대기 시간에 영향을 줄 수 있다고 보지만, 그 효과의 크기를 약속하지는 않는다. 심사 과정에서 한 심사위원은 재현 가능성을 높이라며 분석 코드와 표본 기준을 부록에 추가할 것을 요구했다. 게재가 확정된 뒤에도 저자들은 후속 연구에서 중증도 보정이 필요하다고 덧붙였다. 독자는 이 논문을 인력 확대의 선언이 아니라, 조건부로 읽어야 할 근거로 받아들일 필요가 있다.",
    ],
    pt: "Este artigo analisa o efeito da alocação de plantonistas noturnos sobre o tempo de espera dos pacientes em hospitais de pequeno e médio porte. Os autores examinaram 42 mil registros de pronto-socorro de três hospitais entre janeiro e dezembro de 2022. Comparando o número de médicos de plantão com o tempo médio de espera, verificaram que, nos horários com um médico a mais, a espera era em média 7 minutos menor. Essa diferença aparecia com mais força à noite e nos fins de semana. Só com esse resultado, porém, é difícil julgar que aumentar o número de plantonistas reduza o tempo de espera na mesma proporção. Do ponto de vista metodológico, o estudo depende de dados observacionais. A equipe relacionou escalas de turno e registros de classificação de pacientes, mas não conseguiu controlar completamente o fato de a gravidade dos pacientes variar conforme o horário. Além disso, como o porte e as especialidades dos três hospitais são diferentes, é difícil aplicar diretamente o resultado a outros hospitais. O artigo explicita esse limite em nota de rodapé e na última seção. Ainda assim, parte da imprensa citou o resultado apenas como ‘base para ampliar o plantão’, apagando do espaço editorial as condições que os autores haviam deixado claras. O que os autores enfatizaram na etapa de submissão foi o alcance da conclusão. Eles consideram que a alocação de plantonistas pode influenciar o tempo de espera, mas não prometem o tamanho desse efeito. Durante a avaliação, um parecerista pediu que acrescentassem ao apêndice o código da análise e os critérios da amostra, para aumentar a reprodutibilidade. Mesmo depois da confirmação da publicação, os autores acrescentaram que estudos posteriores precisam de ajuste por gravidade. O leitor precisa receber este artigo não como um anúncio de ampliação de pessoal, mas como uma base que deve ser lida com condições.",
    objective: "Separar resultado, interpretação e ressalva, e reconhecer o que a imprensa apagou.",
  },
  reusedIds: ["ko:근거", "ko:판단", "ko:사실적", "ko:이면"],
  grammar: [
    [
      "-ㄴ/는 것으로 판단된다 — julga-se que; considera-se que",
      "동사 + -는 것으로 판단된다 / 형용사 + -(으)ㄴ 것으로 판단된다 / 명사 + 인 것으로 판단된다",
      "Apresenta um juízo baseado em evidência sem atribuí-lo a uma pessoa específica. É típico de laudos, resumos de pesquisa e relatórios institucionais. Compare com -ㄴ/는 것으로 보인다, mais brando e menos comprometido; -것으로 판단된다 assume que houve avaliação de dados e soa mais conclusivo. Não use para gostos pessoais nem para uma impressão passageira.",
      [
        ["이 차이는 중증도 차이에서 비롯된 것으로 판단된다.", "Julga-se que essa diferença se origina da diferença de gravidade."],
        ["현재 자료만으로는 원인을 확정하기 어려운 것으로 판단된다.", "Considera-se difícil confirmar a causa apenas com os dados atuais."],
      ],
    ],
    [
      "-ㄹ 여지가 다분하다 — há ampla margem para; há muita possibilidade de",
      "동사/형용사 + -ㄹ 여지가 다분하다",
      "Indica que existe bastante espaço para uma interpretação, um risco ou um desdobramento. É mais formal e mais cauteloso que -ㄹ 수 있다, porque não afirma a possibilidade: mede a margem disponível. Compare com -ㄹ 가능성이 크다, que estima probabilidade de modo mais neutro; -ㄹ 여지가 다분하다 costuma preparar uma crítica ou uma ressalva. Registro escrito e institucional.",
      [
        ["세 병원의 규모가 달라 결과를 다른 기관에 적용하는 데 무리가 따를 여지가 다분하다.", "Como o porte dos três hospitais é diferente, há ampla margem para que a aplicação do resultado a outras instituições seja problemática."],
        ["해석을 서두르면 독자가 결론을 오독할 여지가 다분하다.", "Se a interpretação for apressada, há grande margem para o leitor ler a conclusão de forma equivocada."],
      ],
    ],
  ],
  guided: [
    mcq("O que o artigo sustenta sobre o número de plantonistas e o tempo de espera?", ["Que há uma relação observada, mas não se pode prometer a mesma redução ao ampliar a equipe.", "Que cada médico adicional reduz exatamente sete minutos de espera em qualquer hospital.", "Que o tempo de espera não tem relação com a escala de plantão."], "Que há uma relação observada, mas não se pode prometer a mesma redução ao ampliar a equipe.", "O texto separa a diferença observada da conclusão causal e do tamanho do efeito."),
    cloze("Complete o juízo cauteloso: 당직 인력을 늘리면 대기 시간이 같은 폭으로 줄어든다고 ___ 어렵다.", "판단하기는", "A forma -ㄴ/는 것으로 판단된다 aparece no texto e sustenta o juízo baseado em evidência."),
    listen("Ouça e escreva a ressalva sobre a aplicação do resultado.", "세 병원의 규모와 진료 과목이 달라 결과를 다른 병원에 그대로 적용하기는 어렵다.", "세 병원의 규모와 진료 과목이 달라 결과를 다른 병원에 그대로 적용하기는 어렵다.", "Como o porte e as especialidades dos três hospitais são diferentes, há ampla margem para aplicar o resultado diretamente a outros hospitais."),
    reading("논문은 이 한계를 각주와 마지막 절에서 밝히고 있다. 그럼에도 일부 보도는 이 결과를 ‘당직 확대의 근거’로만 인용해, 저자들이 밝힌 조건을 지면에서 지웠다.", "O que a imprensa fez, segundo o texto?", ["Citou o resultado como base para ampliar o plantão, omitindo as condições declaradas pelos autores.", "Corrigiu os erros metodológicos do artigo.", "Publicou o artigo completo com as notas dos autores."], "Citou o resultado como base para ampliar o plantão, omitindo as condições declaradas pelos autores.", "O texto diz que a imprensa apagou do espaço editorial as condições que os autores haviam explicitado."),
    translate("pt-ko", "Traduza: “Considera-se difícil confirmar a causa apenas com estes dados.”", "이 자료만으로 원인을 확정하기 어려운 것으로 판단된다.", "-ㄴ/는 것으로 판단된다 apresenta um juízo impessoal baseado nos dados.", ["현재 자료만으로는 원인을 확정하기 어려운 것으로 판단된다."]),
  ],
  independent: [
    mcq("Qual frase usa -ㄹ 여지가 다분하다 corretamente?", ["표본이 편향되어 결과를 일반화하는 데 무리가 따를 여지가 다분하다.", "표본이 편향되어 결과를 일반화할 여지가 다분한다.", "표본이 편향되어 결과를 일반화할 여지가 다분하자."], "표본이 편향되어 결과를 일반화하는 데 무리가 따를 여지가 다분하다.", "여지가 다분하다 é uma expressão fixa com 형용사 다분하다."),
    cloze("Complete a ressalva metodológica: 결론을 성급히 읽으면 오독할 여지가 ___.", "다분하다", "여지가 다분하다 indica margem ampla para uma leitura equivocada."),
    listen("Ouça e escreva o que o artigo enfatiza na submissão.", "저자들이 투고 단계에서 강조한 것은 결론의 범위였다.", "저자들이 투고 단계에서 강조한 것은 결론의 범위였다.", "O que os autores enfatizaram na etapa de submissão foi o alcance da conclusão."),
    translate("ko-pt", "Traduza: 심사 과정에서 한 심사위원은 재현 가능성을 높이라며 분석 코드를 부록에 추가할 것을 요구했다.", "Durante a avaliação, um parecerista pediu que o código da análise fosse acrescentado ao apêndice para aumentar a reprodutibilidade.", "재현 가능성 = reprodutibilidade; 부록 = apêndice.", ["No processo de avaliação, um dos pareceristas exigiu que o código de análise fosse incluído no apêndice para ampliar a reprodutibilidade."]),
    reading("저자들이 투고 단계에서 강조한 것은 결론의 범위였다. 그들은 당직 인력 배치가 대기 시간에 영향을 줄 수 있다고 보지만, 그 효과의 크기를 약속하지는 않는다.", "Qual é o alcance que os autores dão à conclusão?", ["Podem influenciar o tempo de espera, mas não prometem o tamanho do efeito.", "Garantem que o efeito será idêntico em todos os hospitais.", "Negam qualquer relação entre plantão e espera."], "Podem influenciar o tempo de espera, mas não prometem o tamanho do efeito.", "Os autores limitam a conclusão à possibilidade de influência, sem prometer magnitude."),
  ],
  summary: [
    "O método nomeia amostra, período, instrumento e análise para permitir avaliação e replicação.",
    "A ressalva é específica: aponta a variável não controlada ou o limite do recorte.",
    "-ㄴ/는 것으로 판단된다 apresenta um juízo impessoal baseado em evidência.",
    "-ㄹ 여지가 다분하다 mede a margem de interpretação ou de risco, não a probabilidade exata.",
    "Conteúdo novo permanece em revisão.",
  ],
  production: production(
    "Produção independente · seção de limitações",
    "Escreva a seção de limitações de um artigo curto sobre um tema que você conhece. Descreva o método em duas frases e depois nomeie dois limites específicos, sem invalidar o estudo inteiro.",
    "방법을 요약한 뒤 구체적인 한계를 두 가지로 나누어 써 보세요.",
    ["Resuma amostra, período e instrumento antes de comentar os limites.", "Use -ㄴ/는 것으로 판단된다 uma vez para um juízo baseado nos dados.", "Use -ㄹ 여지가 다분하다 uma vez para apontar uma margem de erro ou leitura equivocada.", "Diga o que um estudo posterior precisaria controlar."],
    ["Método descrito com amostra e período.", "Dois limites específicos.", "Nenhum limite invalida o estudo por inteiro.", "Duas formas-alvo usadas com sentido.", "Próximo passo de pesquisa indicado."],
    "이 연구는 지역 도서관 두 곳에서 2024년 3월부터 9월까지 운영한 야간 독서 프로그램의 참여 기록 640건을 분석했다. 참여 시간과 재참여 여부를 비교한 결과, 야간 프로그램 참여자의 재참여율이 주간 참여자보다 9퍼센트 높은 것으로 판단된다. 다만 두 프로그램의 대상 연령이 달라 결과를 전체 이용자에게 일반화하는 데 무리가 따를 여지가 다분하다. 또한 참여 기록에는 프로그램을 중간에 그만둔 사람의 이유가 남아 있지 않다. 이 한계 때문에 재참여율만으로 프로그램의 효과를 확정하기는 어렵다. 후속 연구는 참여자 인터뷰와 운영 시간대별 비교를 함께 설계해야 한다.",
    "Esta pesquisa analisou 640 registros de participação do programa noturno de leitura operado em duas bibliotecas regionais entre março e setembro de 2024. Comparando o horário de participação e o retorno, julga-se que o índice de retorno dos participantes do período noturno foi 9% maior que o dos participantes do período diurno. No entanto, como a faixa etária dos dois programas é diferente, há ampla margem para generalizar o resultado a todos os usuários. Além disso, os registros não trazem o motivo de quem abandonou o programa no meio. Por esse limite, é difícil confirmar o efeito do programa apenas pelo índice de retorno. Estudos posteriores devem combinar entrevistas com participantes e comparação por faixa de horário.",
    "Exemplo original de oito frases. O método vem antes da ressalva, e os limites são específicos. Exemplo ilustrativo; não é gabarito.",
  ),
});

/** c1-l13 — reformulação fiel e ata de reunião. */
export const C1_L13 = defineC1Lesson({
  id: "c1-l13", number: 13, moduleId: "c1-m03", title: "Reformular na reunião",
  objective: "Reformular uma posição alheia e responder sem distorcer o que foi dito.",
  prerequisites: ["c1-l12"], estimatedMinutes: 80, dialogueTitle: "A fala e a ata",
  intro: [
    {
      title: "Reformular é devolver o argumento ao outro",
      body: "Em uma reunião, reformular não é repetir com palavras mais bonitas: é devolver ao interlocutor uma versão que ele reconheça como sua. Uma reformulação fiel separa o que foi dito do que foi inferido e nomeia o interesse por trás da posição. Quando alguém ouve sua fala recomposta sem distorção, baixa a guarda e a discussão avança para o problema real. Quando ouve uma versão enfraquecida, passa a defender o que não disse e a reunião perde o fio.",
      ko: "상대의 발언을 되돌려 주되, 말하지 않은 의도를 덧붙이지 않는다.",
    },
    {
      title: "A ata como gênero de decisão",
      body: "A ata não é uma transcrição completa nem um resumo livre: é um registro seletivo que distingue posição, debate e decisão. Ela deve permitir que quem faltou saiba o que foi proposto, o que ficou pendente e o que foi efetivamente decidido. Verbos como “제안했다”, “요청했다”, “보류했다” e “가결했다” marcam o estatuto de cada fala. Misturar opinião com deliberação cria responsabilidade onde não houve acordo e apaga a diferença entre o que foi discutido e o que foi aprovado.",
      ko: "회의록은 발언과 결정을 구분하고, 보류된 사항을 명시해야 한다.",
    },
  ],
  dialogue: [
    ["소미", "태윤 씨, 회의록 초안을 보니 발언이 결정처럼 적혀 있네요.", "Taeyun, vejo no rascunho da ata que uma fala foi registrada como se fosse decisão."],
    ["태윤", "아, 제가 요약하면서 표현을 단순화했어요.", "Ah, simplifiquei a expressão enquanto resumia."],
    ["소미", "발언과 결정은 구분해야 해요. 태윤 씨가 ‘비용이 부담스럽다’고 했지, ‘반대한다’고 하지는 않았죠.", "É preciso separar fala e decisão. Você disse ‘o custo é pesado’, não disse ‘sou contra’."],
    ["태윤", "맞아요. 저는 조건부 동의에 가까웠어요.", "Exato. Minha posição estava mais para um consentimento condicional."],
    ["소미", "그러면 ‘비용 상한이 정해지는 것을 전제로 검토하겠다’고 적을게요.", "Então vou registrar ‘revisarei sob a premissa de que se defina um teto de custos’."],
    ["태윤", "좋습니다. 그리고 제가 요청한 유예 기간도 빠뜨리지 말아 주세요.", "Certo. E não deixe de fora o prazo de carência que eu pedi."],
    ["소미", "넣을게요. 결정문에는 시범 운영만 확정하고, 본계약은 다음 회의로 보류했다고 쓰겠습니다.", "Vou incluir. No texto da decisão, escreverei que apenas a operação piloto foi confirmada e que o contrato principal ficou suspenso para a próxima reunião."],
    ["태윤", "그렇게 하면 나중에 책임 소재도 분명해지겠네요.", "Assim, a responsabilidade também fica clara mais tarde."],
  ],
  readingText: {
    titlePt: "A ata que separa fala e decisão",
    paragraphs: [
      "3월 12일 오후 두 시, 신규 배송 거점 설치를 검토하기 위한 실무 회의가 소집되었다. 참석자는 물류팀 세 명과 재무팀 두 명이었다. 회의는 거점 후보지 세 곳의 비용과 배송 시간을 비교하는 순서로 시작되었다. 재무팀은 강남 후보지의 임대료가 예산의 40퍼센트를 차지한다는 점을 근거로 보류를 제안했다. 물류팀은 배송 시간이 평균 25분 줄어든다는 시험 결과를 제시하며 즉시 상정을 요구했다.",
      "논의가 길어지자 진행자는 양쪽 발언을 차례로 재진술했다. ‘물류팀은 시간 단축의 효과가 크다고 보고, 재무팀은 초기 비용의 부담이 크다고 본다’는 정리였다. 이어서 진행자는 두 우려가 서로 다른 시간대를 보고 있다는 점을 감안하면, 1년 차 비용과 2년 차 절감액을 함께 비교할 필요가 있다고 말했다. 재무팀의 관점에서는 첫해 지출이 가장 큰 위험이었다. 발언권을 얻은 재무팀 담당자는 자신들의 입장이 반대가 아니라 조건부 동의임을 분명히 했다. 속기록에는 이 수정이 그대로 남았다.",
      "회의는 후보지 한 곳을 즉시 채택하는 대신, 6개월 시범 운영을 조건으로 하는 안을 가결했다. 다만 임대료 상한선은 다음 회의에서 다시 논의하기로 하고 최종 결정은 보류했다. 진행자는 결정문에 ‘시범 운영 결과와 비용 상한을 함께 검토한 뒤 본계약을 체결하지 않을 수 있다’는 문장을 넣자고 제안했다. 참석자들은 이 문장이 나중에 책임 소재를 분명히 한다는 데 동의했다. 회의 뒤 발송된 속기록에는 각 팀의 주장과 남은 쟁점이 구분되어 기록되었다.",
    ],
    pt: "Em 12 de março, às duas da tarde, foi convocada uma reunião de trabalho para examinar a instalação de um novo centro de distribuição. Participaram três pessoas da equipe de logística e duas da equipe financeira. A reunião começou comparando custos e prazos de entrega de três locais candidatos. A equipe financeira propôs suspender a decisão com base no fato de o aluguel do candidato de Gangnam consumir 40% do orçamento. A equipe de logística apresentou um teste que mostrava redução média de 25 minutos no tempo de entrega e pediu que o assunto fosse imediatamente levado à deliberação. Como o debate se prolongou, a facilitadora reformulou as falas dos dois lados, uma por uma. A síntese foi: ‘a equipe de logística considera grande o efeito da redução de tempo, e a equipe financeira considera grande o peso do custo inicial’. Em seguida, a facilitadora disse que, considerando que as duas preocupações olham para períodos diferentes, era preciso comparar o custo do primeiro ano com a economia do segundo. Do ponto de vista da equipe financeira, o gasto do primeiro ano era o maior risco. Ao receber a palavra, a responsável da equipe financeira deixou claro que a posição deles não era de oposição, mas de consentimento condicional. A ata registrou essa correção tal como foi feita. Em vez de adotar imediatamente um dos locais, a reunião aprovou a proposta de levá-lo à deliberação com a condição de uma operação piloto de seis meses. No entanto, decidiu-se rediscutir o teto do aluguel na reunião seguinte, e a decisão final ficou suspensa. A facilitadora propôs incluir no texto da decisão a frase ‘após examinar conjuntamente os resultados do piloto e o teto de custos, o contrato principal poderá não ser celebrado’. Os participantes concordaram que essa frase esclareceria a responsabilidade mais tarde. A ata enviada após a reunião registrou separadamente os argumentos de cada equipe e as questões pendentes.",
    objective: "Reconhecer onde a ata reformula uma fala e onde registra uma decisão.",
  },
  reusedIds: ["ko:관점", "ko:주장", "ko:상한선", "ko:문서"],
  grammar: [
    [
      "-라는 점을 감안하면 — considerando que; levando em conta que",
      "동사 + -ㄴ/는 점을 감안하면 / 명사 + (이)라는 점을 감안하면",
      "Introduz um fato que precisa ser levado em conta antes de julgar ou propor algo. É comum em reuniões, relatórios e negociações, sobretudo quando o falante quer justificar uma mudança de critério. Compare com -를 고려하면, mais neutro e geral; -라는 점을 감안하면 destaca um aspecto específico e costuma preceder uma proposta. Não use para uma consideração física simples, como o clima.",
      [
        ["두 우려가 서로 다른 시간대를 보고 있다는 점을 감안하면, 비용과 절감액을 함께 비교해야 한다.", "Considerando que as duas preocupações olham para períodos diferentes, é preciso comparar custo e economia em conjunto."],
        ["첫해 지출이 크다는 점을 감안하면, 유예 기간을 두는 것이 합리적이다.", "Levando em conta que o gasto do primeiro ano é grande, é razoável estabelecer um prazo de carência."],
      ],
    ],
    [
      "즉 — isto é; ou seja (advérbio de reformulação)",
      "즉 + reformulação / A, 즉 B",
      "즉 é um advérbio de reformulação: retoma o que acabou de ser dito e o explica com outras palavras. Aparece em atas, relatórios e textos institucionais, muitas vezes depois de uma pausa ou no início da oração. Não é uma terminação verbal; não se escreve “끝났는 즉”. Compare com “다시 말해” e “그러니까”, mais orais. Registro: formal, escrito.",
      [
        ["합의된 내용은 분명하다. 즉, 다음 분기부터 시범 운영을 시작한다는 것이다.", "O que foi acordado é claro. Isto é, iniciar a operação piloto a partir do próximo trimestre."],
        ["재무팀의 요청은 분명하다. 즉, 비용 상한을 문서에 명시하라는 것이다.", "O pedido da equipe financeira é claro. Ou seja, especificar por escrito o teto de custos."],
      ],
    ],
  ],
  guided: [
    mcq("Como a facilitadora trata as duas posições?", ["Reformula as duas falas antes de propor um critério comum.", "Escolhe a posição da equipe financeira sem discutir.", "Registra as duas como se já houvesse decisão."], "Reformula as duas falas antes de propor um critério comum.", "Ela reapresenta as falas e só então sugere comparar custo do primeiro ano e economia do segundo."),
    cloze("Complete a consideração que muda o critério: 두 우려가 서로 다른 시간대를 보고 있다는 점을 ___ 비교해야 한다.", "감안하면", "-라는 점을 감안하면 introduz o fato a ser levado em conta antes da proposta."),
    listen("Ouça e escreva a reformulação feita pela facilitadora.", "물류팀은 시간 단축의 효과가 크다고 보고, 재무팀은 초기 비용의 부담이 크다고 본다.", "물류팀은 시간 단축의 효과가 크다고 보고, 재무팀은 초기 비용의 부담이 크다고 본다.", "A equipe de logística considera grande o efeito da redução de tempo, e a equipe financeira considera grande o peso do custo inicial."),
    reading("발언권을 얻은 재무팀 담당자는 자신들의 입장이 반대가 아니라 조건부 동의임을 분명히 했다. 속기록에는 이 수정이 그대로 남았다.", "O que a responsável da equipe financeira esclarece?", ["Que a posição deles é de consentimento condicional, não de oposição.", "Que eles abandonaram a reunião.", "Que o aluguel já foi aprovado."], "Que a posição deles é de consentimento condicional, não de oposição.", "A fala corrige a leitura de que a equipe financeira era contrária ao projeto."),
    translate("pt-ko", "Traduza: “Considerando que o gasto do primeiro ano é grande, é razoável prever um prazo de carência.”", "첫해 지출이 크다는 점을 감안하면, 유예 기간을 두는 것이 합리적이다.", "-라는 점을 감안하면 apresenta o fato que justifica a proposta.", ["첫해 지출이 크다는 점을 고려하면 유예 기간을 두는 것이 합리적이다."]),
  ],
  independent: [
    mcq("Qual registro de ata distingue corretamente fala e decisão?", ["재무팀은 비용 부담을 이유로 보류를 제안했고, 위원회는 시범 운영만 가결했다.", "재무팀은 반대했고, 위원회는 모든 안건을 부결했다.", "회의에서 여러 이야기가 오갔고 결론은 없었다."], "재무팀은 비용 부담을 이유로 보류를 제안했고, 위원회는 시범 운영만 가결했다.", "A frase nomeia a proposta de uma parte e a deliberação efetiva do colegiado."),
    cloze("Complete a reformulação formal: 재무팀의 요청은 분명하다. ___, 비용 상한을 문서에 명시하라는 것이다.", "즉", "즉 é o advérbio que introduz a reformulação equivalente do pedido."),
    listen("Ouça e escreva o que a reunião decidiu.", "회의는 6개월 시범 운영을 조건으로 하는 안을 가결했다.", "회의는 6개월 시범 운영을 조건으로 하는 안을 가결했다.", "A reunião aprovou a proposta de realizar uma operação piloto de seis meses como condição."),
    translate("ko-pt", "Traduza: 참석자들은 이 문장이 나중에 책임 소재를 분명히 한다는 데 동의했다.", "Os participantes concordaram que essa frase esclareceria a responsabilidade mais tarde.", "책임 소재 = a quem cabe a responsabilidade; 동의했다 = concordaram.", ["Os presentes concordaram que a frase tornaria clara, mais tarde, a responsabilidade."]),
    reading("회의는 후보지 한 곳을 즉시 채택하는 대신, 6개월 시범 운영을 조건으로 하는 안을 가결했다. 다만 임대료 상한선은 다음 회의에서 다시 논의하기로 하고 최종 결정은 보류했다.", "O que ficou decidido e o que ficou pendente?", ["Aprovou-se o piloto de seis meses; o teto do aluguel ficou para a próxima reunião.", "Aprovou-se o contrato principal e rejeitou-se o piloto.", "Nada foi decidido e a reunião foi encerrada sem registro."], "Aprovou-se o piloto de seis meses; o teto do aluguel ficou para a próxima reunião.", "A ata separa a aprovação do piloto da suspensão da decisão sobre o teto."),
  ],
  summary: [
    "Reformular é devolver ao outro uma versão que ele reconheça como sua.",
    "A ata distingue proposta, debate, pendência e decisão.",
    "-라는 점을 감안하면 introduz o fato que justifica uma mudança de critério.",
    "즉 marca uma reformulação equivalente em registro formal.",
    "Conteúdo novo permanece em revisão.",
  ],
  production: production(
    "Produção independente · reformulação e ata",
    "Reescreva uma discussão de reunião em forma de ata curta. Registre duas posições, reformule cada uma sem distorcer, indique o que foi decidido e o que ficou pendente.",
    "회의의 두 입장을 공정하게 정리하고 결정과 보류를 구분해 써 보세요.",
    ["Comece com data, assunto e participantes.", "Reformule as duas posições usando -라는 점을 감안하면 uma vez.", "Use 즉 uma vez para explicitar o teor de uma proposta.", "Separe explicitamente decisão, pendência e próximo passo."],
    ["Duas posições reformuladas sem distorção.", "Decisão e pendência separadas.", "Duas formas-alvo usadas com sentido.", "Registro formal e impessoal.", "Próxima reunião ou próximo passo indicado."],
    "4월 8일 오후 세 시, 공동 작업 공간의 주말 개방을 논의하는 회의가 열렸다. 운영팀은 인건비가 20퍼센트 늘어난다는 점을 근거로 격주 개방을 제안했다. 이용자 대표는 주말 이용의 절반이 학생이라는 점을 감안하면 매주 개방이 필요하다고 주장했다. 진행자는 두 요구가 비용과 접근성을 각각 우선한다는 점을 감안하면, 시험 기간에만 매주 개방하는 안을 검토할 수 있다고 말했다. 이용자 대표의 요청은 분명하다. 즉, 최소한 시험 기간에는 문을 닫지 말자는 것이다. 회의는 시험 기간 매주 개방을 시범 운영하기로 가결했고, 인건비 충당 방식은 다음 회의로 보류했다. 결정문에는 시범 운영 뒤 비용과 만족도를 함께 검토한다고 기록했다.",
    "Em 8 de abril, às três da tarde, realizou-se uma reunião para discutir a abertura do espaço de trabalho compartilhado nos fins de semana. A equipe de operação propôs abertura a cada duas semanas, com base no fato de que o custo de pessoal aumentaria 20%. A representante dos usuários argumentou que, considerando que metade do uso de fim de semana é de estudantes, é necessária abertura semanal. A facilitadora disse que, considerando que as duas demandas priorizam custo e acesso respectivamente, era possível examinar a proposta de abrir semanalmente apenas no período de provas. O pedido da representante dos usuários é, ou seja, não fechar as portas ao menos durante as provas. A reunião aprovou a operação piloto de abertura semanal no período de provas e deixou para a reunião seguinte a forma de cobrir o custo de pessoal. O texto da decisão registrou que, após o piloto, custo e satisfação seriam examinados em conjunto.",
    "Exemplo original de oito frases. A ata separa posições, reformulação, decisão e pendência. Exemplo ilustrativo; não é gabarito.",
  ),
});

/** c1-l14 — negociação com premissas, contrapartidas e cláusula de saída. */
export const C1_L14 = defineC1Lesson({
  id: "c1-l14", number: 14, moduleId: "c1-m03", title: "Negociar com premissas",
  objective: "Negociar condições explicitando premissas, limites e o que não está incluído.",
  prerequisites: ["c1-l13"], estimatedMinutes: 80, dialogueTitle: "A oferta e a saída",
  intro: [
    {
      title: "Premissa não é letra miúda",
      body: "Em uma negociação, a premissa é a condição que precisa valer para que a oferta faça sentido. Se ela fica implícita, cada lado a interpreta de um modo e o acordo se desfaz na execução. Diga o que você presume — orçamento, prazo, autonomia, avaliação — antes de dizer o que oferece. Uma oferta sem premissa parece generosa e depois se revela impossível; uma oferta com premissa pode ser recusada, mas é negociável.",
      ko: "제안 전에 전제를 밝히면, 나중에 조건 해석을 둘러싼 분쟁을 줄일 수 있다.",
    },
    {
      title: "Oferta, contrapartida e saída",
      body: "Toda proposta madura tem três partes: o que cada lado oferece, o que cada lado recebe e em que condições o acordo pode ser encerrado. A cláusula de saída não é sinal de desconfiança: é o que permite aceitar o risco de um piloto. Ao redigir, separe o que está incluído do que fica fora e nomeie o critério de avaliação. Se o outro lado pede algo que você não pode dar, diga o que oferece no lugar, em vez de deixar a recusa implícita.",
      ko: "제안에는 제공, 대가, 종료 조건이 함께 있어야 하며, 포함되지 않는 범위도 밝혀야 한다.",
    },
  ],
  dialogue: [
    ["유나", "마르코 씨, 저희 쪽은 공간 사용료를 받지 않는 조건까지는 받아들일 수 있어요.", "Marco, do nosso lado, podemos aceitar até a condição de não cobrar taxa de uso do espaço."],
    ["마르코", "고맙습니다. 그럼 저희는 프로그램 기획권을 가질 것을 전제로 인력을 배치하겠습니다.", "Obrigado. Então colocaremos pessoal sob a premissa de que teremos o direito de planejar o programa."],
    ["유나", "기획권은 드릴 수 있어요. 다만 첫 6개월 평가 기준은 저희와 함께 정했으면 합니다.", "Podemos conceder o direito de planejamento. Só gostaríamos de definir com vocês os critérios de avaliação dos primeiros seis meses."],
    ["마르코", "좋습니다. 대신 목표의 70퍼센트에 못 미치면 철회할 수 있는 조항을 넣어 주세요.", "Certo. Em troca, incluam uma cláusula que permita retirar o acordo se ficarmos abaixo de 70% da meta."],
    ["유나", "철회 조항은 넣되, 유예 기간을 두자는 겁니다. 준비 기간까지 같은 기준을 적용하면 불공정하니까요.", "Incluímos a cláusula de retirada, mas queremos um prazo de carência. Aplicar o mesmo critério ao período de preparação seria injusto."],
    ["마르코", "그 점은 감안할 수 있어요. 대신 유예 기간이 끝나면 지표를 다시 확인해야 합니다.", "Podemos levar isso em conta. Em troca, ao fim da carência os indicadores precisam ser revistos."],
    ["유나", "물론이죠. 예산 분배와 지분 산정은 다음 회의에서 확정하고, 오늘은 합의서 초안까지 만들까요?", "Claro. Vamos confirmar a distribuição do orçamento e o cálculo das cotas na próxima reunião, e hoje produzir o rascunho do termo de acordo?"],
    ["마르코", "좋습니다. 서면으로 남겨야 나중에 이행 여부도 확인할 수 있으니까요.", "Certo. É preciso registrar por escrito para depois verificar o cumprimento."],
  ],
  readingText: {
    titlePt: "Uma parceria com premissas e porta de saída",
    paragraphs: [
      "이 제안서는 지역 도서관과 독서 교육 단체가 2년간 공동 사업을 운영하는 조건을 담고 있다. 사업 예산은 총 1억 2천만 원이며, 도서관이 7천만 원을, 단체가 5천만 원을 부담한다. 단체는 인력과 프로그램을 제공하고, 도서관은 공간과 홍보를 맡는다. 양측은 성과 지표를 참여 인원과 프로그램 만족도로 정하고, 매 분기 결과를 공유하기로 했다. 이 합의의 출발점은 역할 분배를 먼저 문서로 확정하는 것이다.",
      "단체가 제시한 선행조건은 세 가지다. 첫째, 도서관이 공간 사용료를 받지 않는다. 둘째, 프로그램 기획권은 단체가 갖는다. 셋째, 중간 평가에서 목표의 70퍼센트에 미달하면 단체가 사업을 철회할 수 있다. 도서관은 앞의 두 조건은 받아들였지만, 세 번째 조건에는 유예 기간을 요구했다. 도서관 측은 “첫 6개월은 준비 기간이므로 같은 기준을 적용하지 않는다”는 단서를 붙일 것을 전제로 협상에 응했다.",
      "예산 분배와 성과 산정 방식은 아직 확정되지 않았다. 단체는 참여 인원을 기준으로 지분을 계산하자고 했고, 도서관은 만족도와 지역 주민의 재참여율을 함께 보자고 했다. 이견의 원인은 두 기관이 성과를 다르게 정의한다는 데 있었다. 양측은 이견을 좁히지 못한 채 합의서 초안을 마련했다. 초안에는 “세부 지표에 합의하지 않는 한 본계약은 효력을 갖지 않는다”는 문장이 들어갔다. 또한 어느 한쪽이 의무를 이행하지 않을 경우 상대방이 서면으로 시정을 요구하고, 30일 안에 개선이 없으면 계약을 종료할 수 있다고 명시했다.",
    ],
    pt: "Esta proposta contém as condições para que uma biblioteca regional e uma organização de educação para a leitura operem um projeto conjunto por dois anos. O orçamento total é de 120 milhões de won, com a biblioteca contribuindo com 70 milhões e a organização com 50 milhões. A organização fornece pessoal e programa, e a biblioteca se encarrega do espaço e da divulgação. As duas partes definiram como indicadores de desempenho o número de participantes e a satisfação com o programa, e decidiram compartilhar os resultados a cada trimestre. O ponto de partida desse acordo é confirmar por escrito, primeiro, a divisão de papéis. A organização apresentou três condições prévias. Primeira: a biblioteca não cobra taxa de uso do espaço. Segunda: o direito de planejar o programa fica com a organização. Terceira: se a avaliação intermediária ficar abaixo de 70% da meta, a organização pode retirar o projeto. A biblioteca aceitou as duas primeiras condições, mas exigiu um prazo de carência para a terceira. O lado da biblioteca entrou na negociação sob a premissa de que se acrescentaria a ressalva ‘os primeiros seis meses são período de preparação, portanto não se aplica o mesmo critério’. A distribuição do orçamento e a forma de cálculo dos resultados ainda não foram confirmadas. A organização propôs calcular as cotas com base no número de participantes, e a biblioteca propôs considerar em conjunto a satisfação e a taxa de retorno dos moradores da região. A causa da divergência estava em que as duas instituições definiam o desempenho de modo diferente. Sem conseguir reduzir a divergência, as partes prepararam um rascunho do termo de acordo. O rascunho incluiu a frase ‘enquanto não houver acordo sobre os indicadores detalhados, o contrato principal não terá efeito’. Também especificou que, se uma das partes não cumprir suas obrigações, a outra pode exigir por escrito a correção e, se não houver melhora em 30 dias, encerrar o contrato.",
    objective: "Separar premissa, oferta, contrapartida e condição de saída na proposta.",
  },
  reusedIds: ["ko:원인", "ko:결과", "ko:단서", "ko:전제"],
  grammar: [
    [
      "-ㄹ 것을 전제로 — sob a premissa de que; partindo do pressuposto de que",
      "동사/형용사 + -ㄹ 것을 전제로",
      "Estabelece uma condição prévia que precisa valer para que a oferta ou a ação faça sentido. É mais analítico que -는 조건으로, que nomeia uma condição concreta negociada; -ㄹ 것을 전제로 apresenta o pressuposto a partir do qual o acordo é pensado. Comum em propostas, contratos e textos institucionais. Não use para uma relação causal simples.",
      [
        ["프로그램 기획권을 가질 것을 전제로 인력을 배치하겠습니다.", "Colocaremos pessoal sob a premissa de que teremos o direito de planejar o programa."],
        ["첫해 비용을 공동 부담할 것을 전제로 예산을 산정했다.", "Calculamos o orçamento partindo do pressuposto de que os custos do primeiro ano serão divididos."],
      ],
    ],
    [
      "-지 않는 한 — a menos que; enquanto não",
      "동사/형용사 + -지 않는 한",
      "Delimita a validade do que vem depois: a condição expressa é o limite sem o qual o resultado não se aplica. É mais enfático que -지 않으면, porque apresenta uma fronteira necessária, e não apenas uma hipótese. Aparece em contratos, propostas e análises formais. A oração seguinte costuma ser negativa ou restritiva.",
      [
        ["세부 지표에 합의하지 않는 한 본계약은 효력을 갖지 않는다.", "Enquanto não houver acordo sobre os indicadores detalhados, o contrato principal não terá efeito."],
        ["상대가 의무를 이행하지 않는 한 추가 지원은 어렵다.", "A menos que a outra parte cumpra suas obrigações, apoio adicional é difícil."],
      ],
    ],
  ],
  guided: [
    mcq("Qual é a premissa que a biblioteca exige para negociar?", ["Que os primeiros seis meses não sejam avaliados pelo mesmo critério.", "Que a organização pague toda a taxa de uso do espaço.", "Que o contrato tenha duração de dez anos."], "Que os primeiros seis meses não sejam avaliados pelo mesmo critério.", "A biblioteca condiciona a negociação à ressalva de que o período de preparação não siga o mesmo critério."),
    cloze("Complete a premissa da organização: 프로그램 기획권을 가질 것을 ___ 인력을 배치하겠습니다.", "전제로", "-ㄹ 것을 전제로 introduz o pressuposto que sustenta a oferta."),
    listen("Ouça e escreva a condição de saída pedida pela organização.", "중간 평가에서 목표의 70퍼센트에 미달하면 단체가 사업을 철회할 수 있다.", "중간 평가에서 목표의 70퍼센트에 미달하면 단체가 사업을 철회할 수 있다.", "Se a avaliação intermediária ficar abaixo de 70% da meta, a organização pode retirar o projeto."),
    reading("단체가 제시한 선행조건은 세 가지다. 첫째, 도서관이 공간 사용료를 받지 않는다. 둘째, 프로그램 기획권은 단체가 갖는다. 셋째, 중간 평가에서 목표의 70퍼센트에 미달하면 단체가 사업을 철회할 수 있다.", "Quais são as três condições prévias?", ["Isenção da taxa de espaço, direito de planejamento e possibilidade de retirada abaixo da meta.", "Pagamento integral do aluguel, cessão do espaço e contrato vitalício.", "Aumento do orçamento, mudança de público e fim da avaliação."], "Isenção da taxa de espaço, direito de planejamento e possibilidade de retirada abaixo da meta.", "As três condições aparecem numeradas no segundo parágrafo."),
    translate("pt-ko", "Traduza: “Enquanto não houver acordo sobre os indicadores detalhados, o contrato principal não terá efeito.”", "세부 지표에 합의하지 않는 한 본계약은 효력을 갖지 않는다.", "-지 않는 한 apresenta o limite sem o qual o contrato não vale.", ["세부 지표에 합의하지 않는 한 본계약은 효력이 없다."]),
  ],
  independent: [
    mcq("Qual frase usa -지 않는 한 com o sentido de limite necessário?", ["예산이 확정되지 않는 한 계약을 체결할 수 없다.", "예산이 확정되지 않으면 회의를 시작했다.", "예산이 확정되지 않는 한 계약을 체결했다."], "예산이 확정되지 않는 한 계약을 체결할 수 없다.", "A oração seguinte é restritiva e depende do limite expresso por -지 않는 한."),
    cloze("Complete o limite do acordo: 세부 지표에 합의하지 ___ 한 본계약은 효력을 갖지 않는다.", "않는", "A forma é -지 않는 한, com o verbo no negativo antes de 한."),
    listen("Ouça e escreva a condição de carência exigida pela biblioteca.", "첫 6개월은 준비 기간이므로 같은 기준을 적용하지 않는다.", "첫 6개월은 준비 기간이므로 같은 기준을 적용하지 않는다.", "Os primeiros seis meses são período de preparação, portanto não se aplica o mesmo critério."),
    translate("ko-pt", "Traduza: 이견의 원인은 두 기관이 성과를 다르게 정의한다는 데 있었다.", "A causa da divergência estava em que as duas instituições definiam o desempenho de modo diferente.", "이견 = divergência; 원인 = causa.", ["A divergência se devia ao fato de as duas instituições definirem o desempenho de formas distintas."]),
    reading("양측은 이견을 좁히지 못한 채 합의서 초안을 마련했다. 초안에는 “세부 지표에 합의하지 않는 한 본계약은 효력을 갖지 않는다”는 문장이 들어갔다.", "O que o rascunho estabelece sobre o contrato principal?", ["Ele não terá efeito enquanto não houver acordo sobre os indicadores detalhados.", "Ele entra em vigor imediatamente, sem indicadores.", "Ele foi assinado apesar da divergência."], "Ele não terá efeito enquanto não houver acordo sobre os indicadores detalhados.", "A cláusula condiciona a eficácia do contrato ao acordo sobre os indicadores."),
  ],
  summary: [
    "Premissa é a condição que precisa valer para a oferta fazer sentido.",
    "Toda proposta madura tem oferta, contrapartida e condição de saída.",
    "-ㄹ 것을 전제로 apresenta o pressuposto de uma oferta ou cálculo.",
    "-지 않는 한 delimita a validade do que vem depois.",
    "Conteúdo novo permanece em revisão.",
  ],
  production: production(
    "Produção independente · contraproposta com premissa",
    "Escreva uma contraproposta a uma parceria entre duas organizações com orçamentos desiguais. Diga a premissa, o que você oferece, o que pede em troca e em que condição o acordo pode ser encerrado.",
    "전제와 제공, 대가, 종료 조건을 갖춘 수정 제안서를 써 보세요.",
    ["Abra com a premissa que sustenta sua proposta.", "Use -ㄹ 것을 전제로 uma vez.", "Use -지 않는 한 uma vez para fixar o limite do acordo.", "Diga explicitamente o que fica fora da proposta."],
    ["Premissa explícita.", "Oferta e contrapartida distintas.", "Condição de saída nomeada.", "Duas formas-alvo usadas com sentido.", "Limite do acordo verificável."],
    "저희는 공동 사업의 예산을 6대 4로 분담할 것을 전제로 참여하겠습니다. 저희는 프로그램 기획과 강사 배치를 맡고, 귀 기관은 공간과 홍보를 제공해 주시기를 요청합니다. 다만 첫 6개월은 준비 기간으로 두어 성과 평가를 유예해 주시기 바랍니다. 저희가 제안하는 성과 지표는 참여 인원과 재참여율 두 가지입니다. 예산 산정 방식은 다음 회의에서 함께 확정하되, 인건비 상한이 정해지지 않는 한 추가 인력을 투입하기는 어렵습니다. 상호 의무를 이행하지 않을 경우 30일의 시정 기간을 두고, 그 뒤에도 개선이 없으면 계약을 종료할 수 있도록 합시다. 이 조건은 협상을 막기 위한 것이 아니라, 양측이 감당할 수 있는 범위를 분명히 하기 위한 것입니다.",
    "Participaremos sob a premissa de dividir o orçamento do projeto conjunto na proporção de 6 para 4. Ficamos responsáveis pelo planejamento do programa e pela alocação de instrutores, e pedimos que a instituição de vocês forneça o espaço e a divulgação. No entanto, pedimos que os primeiros seis meses sejam tratados como período de preparação, com a avaliação de desempenho suspensa. Os indicadores que propomos são dois: número de participantes e taxa de retorno. A forma de cálculo do orçamento será confirmada em conjunto na próxima reunião, mas, enquanto não se definir um teto para o custo de pessoal, será difícil alocar pessoal adicional. Se uma das partes não cumprir suas obrigações, estabeleçamos um prazo de correção de 30 dias e, se não houver melhora depois disso, a possibilidade de encerrar o contrato. Esta condição não serve para bloquear a negociação, mas para deixar claro o alcance que cada lado pode assumir.",
    "Exemplo original de oito frases. A premissa vem antes da oferta, e o limite fecha o texto. Exemplo ilustrativo; não é gabarito.",
  ),
});

/** c1-l15 — carta institucional: protocolo, pedido, anexo e prazo. */
export const C1_L15 = defineC1Lesson({
  id: "c1-l15", number: 15, moduleId: "c1-m03", title: "A carta institucional",
  objective: "Produzir correspondência institucional com referência, pedido e prazo.",
  prerequisites: ["c1-l14"], estimatedMinutes: 80, dialogueTitle: "Antes do envio",
  intro: [
    {
      title: "A carta que pode ser protocolada",
      body: "Uma carta institucional precisa funcionar fora do contexto de quem a escreveu: alguém que nunca participou da conversa deve conseguir identificar o assunto, o pedido e o prazo. Por isso ela abre com número de documento, data, destinatário e referência, e só depois entra no pedido. Cada parágrafo cumpre uma função: contexto, pedido, anexos e encerramento. Se o leitor precisa procurar o que você quer, a carta ainda não está pronta para envio.",
      ko: "공문은 문서번호, 시행일, 수신처, 참조를 먼저 밝히고 본문에서 요청을 분명히 해야 한다.",
    },
    {
      title: "Pedido, prazo e cortesia",
      body: "Registro institucional não é sinônimo de frase longa. A cortesia aparece na previsão do esforço do outro e na clareza do pedido, não em fórmulas acumuladas. Divida pedidos diferentes em itens, diga o que cada anexo contém e fixe um prazo verificável. Se houver consequência para o atraso, diga isso com neutralidade. Uma carta respeitosa é aquela que permite ao destinatário responder sem precisar pedir esclarecimentos.",
      ko: "요청은 항목으로 나누고, 붙임과 별첨을 구분하며, 회신 기한을 분명히 적는다.",
    },
  ],
  dialogue: [
    ["은지", "병수 씨, 이 공문 초안에서 문서번호와 시행일이 빠졌어요.", "Byeongsu, faltam o número do documento e a data de expedição neste rascunho de ofício."],
    ["병수", "아, 본문부터 쓰다 보니 머리 부분을 놓쳤습니다.", "Ah, comecei pelo corpo do texto e acabei esquecendo o cabeçalho."],
    ["은지", "수신처와 참조도 정확히 적어야 해요. 담당관 이름이 바뀌었는지 확인했어요?", "É preciso escrever com precisão o destinatário e a referência. Você verificou se o nome do responsável mudou?"],
    ["병수", "확인했습니다. 지역교육 담당관으로 적겠습니다.", "Verifiquei. Vou escrever ‘responsável pela educação regional’."],
    ["은지", "그리고 요청이 세 개인데 한 문단에 다 들어가 있어요. 항목으로 나눌까요?", "E há três pedidos todos em um único parágrafo. Vamos separá-los em itens?"],
    ["병수", "그게 읽기 편하겠네요. 붙임과 별첨도 구분해서 적겠습니다.", "Vai ficar mais fácil de ler. Também vou distinguir anexo no corpo e anexo separado."],
    ["은지", "마지막에 회신 기한을 꼭 넣으세요. 기한이 없으면 상대도 일정을 잡기 어려워요.", "Inclua obrigatoriamente o prazo de resposta no final. Sem prazo, o outro lado também não consegue organizar o calendário."],
    ["병수", "4월 30일까지로 쓰고, 늦어질 경우 일정이 취소될 수 있다는 점도 밝히겠습니다.", "Vou escrever até 30 de abril e deixar claro que, em caso de atraso, o calendário pode ser cancelado."],
  ],
  readingText: {
    titlePt: "Uma carta que se pode protocolar",
    paragraphs: [
      "문서번호: 교육협력과-2026-0417 / 시행일: 2026년 4월 17일 / 수신: ○○시 교육청 평생교육과 / 참조: 지역교육 담당관. 이 문서는 지난달 협의한 청소년 독서 프로그램의 공간 지원을 요청하기 위해 발송합니다. 지난 협의 기록을 확인한 결과, 양측은 5월부터 11월까지 주말 운영을 이어 가기로 했습니다. 관련 규정에 준하여 신청 절차를 진행하였으며, 담당 직위와 연락처는 문서 말미에 적었습니다. 본문의 요지는 세 가지입니다. 공간 사용 허가, 주말 운영 시간 연장, 그리고 안전 인력 배치입니다.",
      "첫째, 저희 단체는 5월부터 11월까지 매주 토요일 오전에 교육청 별관 강당을 사용하고자 합니다. 사용 인원은 회차당 40명 이내로 제한하겠습니다. 둘째, 행사가 있는 주말에는 운영 시간을 오후 6시까지 연장해 주시기를 요청드립니다. 셋째, 안전 인력을 두 명 배치하되, 교육청이 지정한 교육을 이수한 사람으로 구성하겠습니다. 이 세 가지 조건이 충족되지 않는 한 행사 일정을 확정하기 어렵다는 점을 미리 말씀드립니다.",
      "검토에 필요한 자료는 붙임 1에 정리했고, 참가자 명단과 안전 교육 이수증은 별첨으로 따로 보냅니다. 회신은 4월 30일까지 교육협력과 담당자 앞으로 보내 주시기 바랍니다. 기한 안에 회신이 없으면 5월 일정은 취소될 수 있습니다. 아울러 결과를 지역 학교에 통보해 주시면 홍보에 큰 도움이 되겠습니다. 행사 준비가 원활히 진행될 수 있도록 협조를 구합니다. 담당관님의 검토를 부탁드리며, 추가 자료가 필요하시면 언제든 연락 주시기 바랍니다.",
    ],
    pt: "Número do documento: Educação e Cooperação-2026-0417 / Data de expedição: 17 de abril de 2026 / Destinatário: Departamento de Educação ao Longo da Vida da Secretaria de Educação de ○○ / Referência: responsável pela educação regional. Este documento é enviado para solicitar apoio de espaço ao programa de leitura juvenil acordado no mês passado. Ao verificar o registro da negociação anterior, constatou-se que as duas partes decidiram manter a operação de fim de semana de maio a novembro. O procedimento de solicitação foi conduzido em conformidade com as normas pertinentes, e o cargo e o contato do responsável estão indicados ao final do documento. O teor do corpo do texto tem três pontos: autorização de uso do espaço, extensão do horário de funcionamento nos fins de semana e alocação de pessoal de segurança. Primeiro, nossa organização pretende usar o auditório do anexo da Secretaria de Educação todos os sábados pela manhã, de maio a novembro. Limitaremos o número de participantes a 40 por sessão. Segundo, nos fins de semana com eventos, solicitamos que o horário de funcionamento seja estendido até as 18h. Terceiro, alocaremos dois profissionais de segurança, compostos por pessoas que tenham concluído a formação indicada pela Secretaria. Informamos desde já que, enquanto essas três condições não forem atendidas, será difícil confirmar o calendário do evento. Os materiais necessários à análise estão organizados no anexo 1, e a lista de participantes e os certificados de formação em segurança seguem em anexo separado. Pedimos que a resposta seja enviada ao responsável da Divisão de Cooperação Educacional até 30 de abril. Se não houver resposta dentro do prazo, o calendário de maio poderá ser cancelado. Além disso, se comunicarem o resultado às escolas da região, será de grande ajuda para a divulgação. Solicito cooperação para que a preparação do evento transcorra sem problemas. Conto com a análise do responsável e, caso sejam necessários materiais adicionais, peço que entrem em contato a qualquer momento.",
    objective: "Reconhecer a estrutura, o pedido e o prazo de uma carta institucional.",
  },
  reusedIds: ["ko:자료", "ko:시간", "ko:참조", "ko:발송"],
  grammar: [
    [
      "-에 준하여 — em conformidade com; segundo (norma ou modelo)",
      "명사 + 에 준하여",
      "Indica que um procedimento segue uma norma, um modelo ou um padrão já existente. É típico de documentos institucionais e jurídicos. Compare com -에 따라, mais amplo e capaz de expressar causa, meio ou conformidade; -에 준하여 destaca a aplicação por conformidade a um padrão. Não use para movimento físico nem para uma preferência pessoal.",
      [
        ["관련 규정에 준하여 신청 절차를 진행했습니다.", "Conduzimos o procedimento de solicitação em conformidade com as normas pertinentes."],
        ["기존 계약에 준하여 새 일정을 조정하겠습니다.", "Ajustaremos o novo cronograma conforme o contrato existente."],
      ],
    ],
    [
      "-도록 협조를 구하다 — solicitar cooperação para que",
      "동사 + -도록 협조를 구하다",
      "Formula um pedido institucional de cooperação para que uma ação ocorra. É mais indireto e formal que -어 주시기 바랍니다 e aparece em cartas, e-mails e ofícios enviados a organizações. A ação marcada por -도록 é executada pelo destinatário. Não use em pedidos cotidianos entre colegas próximos, onde -아/어 주세요 soa mais natural.",
      [
        ["행사 준비가 원활히 진행되도록 협조를 구합니다.", "Solicito cooperação para que a preparação do evento transcorra sem problemas."],
        ["명단을 4월 30일까지 보내 주시도록 협조를 구합니다.", "Solicito a cooperação para que a lista seja enviada até 30 de abril."],
      ],
    ],
  ],
  guided: [
    mcq("Quantos pedidos o corpo da carta apresenta?", ["Três: uso do espaço, extensão do horário e pessoal de segurança.", "Um: apenas a autorização do auditório.", "Cinco: espaço, horário, segurança, divulgação e orçamento."], "Três: uso do espaço, extensão do horário e pessoal de segurança.", "O texto enumera três pedidos no segundo parágrafo."),
    cloze("Complete o envio conforme a norma: 관련 규정에 ___ 신청 절차를 진행하였습니다.", "준하여", "-에 준하여 indica conformidade com uma norma ou padrão."),
    listen("Ouça e escreva o prazo de resposta da carta.", "회신은 4월 30일까지 교육협력과 담당자 앞으로 보내 주시기 바랍니다.", "회신은 4월 30일까지 교육협력과 담당자 앞으로 보내 주시기 바랍니다.", "Pedimos que a resposta seja enviada ao responsável da Divisão de Cooperação Educacional até 30 de abril."),
    reading("검토에 필요한 자료는 붙임 1에 정리했고, 참가자 명단과 안전 교육 이수증은 별첨으로 따로 보냅니다. 회신은 4월 30일까지 교육협력과 담당자 앞으로 보내 주시기 바랍니다.", "Como os anexos são organizados?", ["Materiais de análise no anexo 1; lista e certificados em anexo separado.", "Todos os documentos em um único anexo.", "Nenhum documento foi enviado."], "Materiais de análise no anexo 1; lista e certificados em anexo separado.", "O texto distingue 붙임 1 de 별첨."),
    translate("pt-ko", "Traduza: “Solicito cooperação para que a preparação do evento transcorra sem problemas.”", "행사 준비가 원활히 진행될 수 있도록 협조를 구합니다.", "-도록 협조를 구하다 formula um pedido institucional de cooperação.", ["행사 준비가 원활히 진행되도록 협조를 구합니다."]),
  ],
  independent: [
    mcq("Qual item pertence ao cabeçalho de uma carta institucional?", ["Número do documento e data de expedição.", "A conclusão do pedido.", "A lista de participantes."], "Número do documento e data de expedição.", "O cabeçalho identifica o documento e sua data antes do corpo."),
    cloze("Complete o pedido institucional: 행사 준비가 원활히 진행되도록 ___ 구합니다.", "협조를", "A forma é -도록 협조를 구하다."),
    listen("Ouça e escreva a condição sob a qual o calendário não pode ser confirmado.", "이 세 가지 조건이 충족되지 않는 한 행사 일정을 확정하기 어렵습니다.", "이 세 가지 조건이 충족되지 않는 한 행사 일정을 확정하기 어렵습니다.", "Enquanto essas três condições não forem atendidas, será difícil confirmar o calendário do evento."),
    translate("ko-pt", "Traduza: 기한 안에 회신이 없으면 5월 일정은 취소될 수 있습니다.", "Se não houver resposta dentro do prazo, o calendário de maio poderá ser cancelado.", "기한 = prazo; 취소되다 = ser cancelado.", ["Caso não haja resposta até o prazo, a programação de maio pode ser cancelada."]),
    reading("본문의 요지는 세 가지입니다. 공간 사용 허가, 주말 운영 시간 연장, 그리고 안전 인력 배치입니다. 이 세 가지 조건이 충족되지 않는 한 행사 일정을 확정하기 어렵다는 점을 미리 말씀드립니다.", "O que a carta pede e como condiciona o calendário?", ["Pede três condições e diz que o calendário não pode ser confirmado sem elas.", "Pede apenas o auditório e não menciona condições.", "Confirma o calendário independentemente da resposta."], "Pede três condições e diz que o calendário não pode ser confirmado sem elas.", "A carta enumera os três pedidos e declara que o calendário depende deles."),
  ],
  summary: [
    "A carta institucional identifica documento, data, destinatário e referência antes do pedido.",
    "Pedidos distintos vão em itens; cada anexo é nomeado pelo que contém.",
    "-에 준하여 indica conformidade com uma norma ou modelo.",
    "-도록 협조를 구하다 formula um pedido formal de cooperação.",
    "Conteúdo novo permanece em revisão.",
  ],
  production: production(
    "Produção independente · carta institucional",
    "Escreva uma carta institucional curta a um órgão público solicitando apoio para um evento. Inclua cabeçalho, referência, três pedidos, anexos, prazo de resposta e encerramento.",
    "공공 기관에 보낼 공문 형식의 요청서를 써 보세요.",
    ["Abra com número, data, destinatário e referência.", "Use -에 준하여 uma vez para indicar a norma seguida.", "Use -도록 협조를 구하다 uma vez no encerramento.", "Separe os pedidos em itens e fixe um prazo verificável."],
    ["Cabeçalho completo.", "Três pedidos distintos.", "Anexos nomeados.", "Prazo de resposta explícito.", "Duas formas-alvo usadas com sentido."],
    "문서번호: 청소년지원과-2026-0512 / 시행일: 2026년 5월 12일 / 수신: ○○구청 문화체육과 / 참조: 지역문화 담당관. 이 문서는 6월 청소년 낭독회의 공공 도서관 공간 사용을 요청하기 위해 발송합니다. 관련 조례에 준하여 신청 서류를 갖추었으며, 세부 내용은 다음과 같습니다. 첫째, 6월 13일과 20일 오후에 시청각실을 사용하게 해 주시기 바랍니다. 둘째, 행사 당일 운영 시간을 오후 8시까지 연장해 주시기를 요청드립니다. 셋째, 참가자 안내를 위해 담당 직원 한 분의 협조를 요청드립니다. 행사 계획서는 붙임 1에, 참가 신청 명단은 별첨으로 정리했습니다. 회신은 5월 26일까지 문화체육과 담당자 앞으로 보내 주시기 바랍니다. 기한 안에 회신이 없으면 6월 일정은 조정될 수 있습니다. 행사가 안전하게 진행될 수 있도록 협조를 구합니다.",
    "Número do documento: Apoio à Juventude-2026-0512 / Data de expedição: 12 de maio de 2026 / Destinatário: Departamento de Cultura e Esportes da Subprefeitura de ○○ / Referência: responsável pela cultura regional. Este documento é enviado para solicitar o uso do espaço da biblioteca pública para a leitura dramática juvenil de junho. Em conformidade com o regulamento pertinente, preparamos os documentos de solicitação, e os detalhes são os seguintes. Primeiro, pedimos que nos permitam usar a sala audiovisual nas tardes de 13 e 20 de junho. Segundo, solicitamos que o horário de funcionamento seja estendido até as 20h no dia do evento. Terceiro, pedimos a cooperação de um funcionário responsável para orientar os participantes. O plano do evento está organizado no anexo 1, e a lista de inscritos segue em anexo separado. Pedimos que a resposta seja enviada ao responsável do Departamento de Cultura e Esportes até 26 de maio. Se não houver resposta dentro do prazo, o calendário de junho poderá ser ajustado. Solicito cooperação para que o evento transcorra com segurança.",
    "Exemplo original de oito frases. O cabeçalho, os três pedidos e o prazo aparecem em ordem. Exemplo ilustrativo; não é gabarito.",
  ),
});
