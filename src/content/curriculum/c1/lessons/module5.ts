import { cloze, defineC1Lesson, listen, mcq, reading, translate } from "../shared";
import type { CourseProductionTask } from "../../course-types";

const RUBRIC = [
  { criterion: "task" as const, labelPt: "Cumprimento da tarefa", descriptorPt: "O texto responde ao enunciado e assume o gênero pedido." },
  { criterion: "organization" as const, labelPt: "Organização e progressão", descriptorPt: "As partes têm função própria e a exposição avança sem repetição." },
  { criterion: "vocabulary" as const, labelPt: "Vocabulário e colocação", descriptorPt: "Usa léxico preciso do tema, inclusive parte do léxico da lição, com colocações naturais." },
  { criterion: "grammar" as const, labelPt: "Gramática e registro", descriptorPt: "As formas-alvo aparecem corretas e o registro se mantém coerente." },
  { criterion: "argument" as const, labelPt: "Precisão da análise", descriptorPt: "A análise distingue os elementos pedidos e não promete mais do que os dados permitem." },
  { criterion: "synthesis" as const, labelPt: "Síntese e fechamento", descriptorPt: "O fechamento integra o percurso e nomeia o que permanece em aberto." },
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

/** c1-l21 — causa principal, fatores contribuintes e atribuição de responsabilidade. */
export const C1_L21 = defineC1Lesson({
  id: "c1-l21", number: 21, moduleId: "c1-m05", title: "Causa e contribuição",
  objective: "Atribuir causa e contribuição com precisão, sem confundir correlação e responsabilidade.",
  prerequisites: ["c1-c04"], estimatedMinutes: 80, dialogueTitle: "O que causou a falha",
  intro: [
    {
      title: "Causa principal, fator e coincidência",
      body: "Explicar uma falha exige separar três coisas: o que a provocou, o que aumentou seu tamanho e o que apenas estava presente no mesmo período. A causa principal é o elemento sem o qual o resultado não teria ocorrido; um fator contribuinte altera a extensão ou a duração do dano, mas não basta sozinho. Uma coincidência, por sua vez, não explica nada. Quando os três níveis se misturam, o relatório parece completo, mas distribui responsabilidade sem critério.",
      ko: "오류가 없었다면 장애도 없었을 것이므로 설정 오류는 주된 원인이고, 접속량 증가는 피해를 키운 요인이다.",
    },
    {
      title: "Atribuir sem simplificar",
      body: "A linguagem da causalidade carrega uma acusação implícita. Dizer que um problema “decorre de” uma decisão é diferente de dizer que essa decisão “contribuiu para” ele. A primeira formulação trata o elemento como origem; a segunda reconhece participação sem transformá-lo em culpa exclusiva. Em relatórios e textos de opinião, escolher entre uma e outra é um ato de responsabilidade: o leitor pode não distinguir os matizes, mas a organização cobrada certamente distinguirá.",
      ko: "원인을 하나로 뭉뚱그리면 책임의 소재가 흐려지므로, 각 요소의 무게를 따로 밝혀야 한다.",
    },
  ],
  dialogue: [
    ["지안", "이번 장애 보고서, 원인을 아직 하나로 정리하지 못했네요.", "O relatório desta falha ainda não definiu uma única causa, pelo visto."],
    ["도현", "네. 설정 오류와 접속량 증가가 동시에 나타나서 복합적으로 보입니다.", "Sim. O erro de configuração e o aumento dos acessos apareceram ao mesmo tempo, então parece complexo."],
    ["지안", "하지만 둘의 무게는 다르지 않아요? 오류가 없었다면 장애도 없었을 텐데요.", "Mas o peso dos dois não é diferente? Se não houvesse o erro, também não haveria a falha, certo?"],
    ["도현", "맞습니다. 그래서 설정 오류를 주된 원인으로 보고, 접속량은 피해를 키운 요인으로 분류했습니다.", "Exato. Por isso tratamos o erro de configuração como causa principal e classificamos o volume de acessos como fator que ampliou o dano."],
    ["지안", "점검 인력 부재는요?", "E a ausência de equipe de plantão?"],
    ["도현", "그건 원인이라기보다 복구를 늦춘 조건입니다. 원인과 조건을 섞으면 책임 소재가 흐려져요.", "Isso é mais uma condição que atrasou a recuperação do que uma causa. Misturar causa e condição turva a atribuição de responsabilidade."],
    ["지안", "그러면 보고서에 ‘기인하다’와 ‘기여하다’를 구분해서 써야겠네요.", "Então no relatório precisamos distinguir ‘decorrer de’ e ‘contribuir para’."],
    ["도현", "네. 장애는 설정 오류에 기인하고, 피해 확대에는 접속량 증가가 기여했다고 적으면 됩니다.", "Sim. Basta escrever que a falha decorreu do erro de configuração e que o aumento dos acessos contribuiu para ampliar o dano."],
  ],
  readingText: {
    titlePt: "Três camadas de uma mesma falha",
    paragraphs: [
      "지난달 14일 시립 도서관의 대출 시스템이 네 시간 동안 멈추면서 이용자 3,200명이 대출과 반납을 하지 못했다. 운영팀은 사고 기록과 서버 로그를 분석해 원인을 세 층위로 나누었다. 첫째는 주말 배포 과정에서 생긴 설정 오류로, 이것이 장애를 촉발한 직접적 계기였다. 둘째는 평소보다 두 배로 늘어난 접속량으로, 오류가 난 뒤 피해를 키우는 데 기여했다. 셋째는 야간 점검 인력의 부재로, 복구를 늦춘 조건 가운데 하나다. 이 셋은 서로 다른 무게를 지니므로 하나의 원인으로 뭉뚱그리면 책임의 소재도 흐려진다.",
      "운영팀은 설정 오류를 주된 원인으로 판단했다. 오류가 없었다면 접속량이 늘어도 시스템은 정상적으로 작동했을 것이기 때문이다. 반면 접속량 증가는 단독으로 장애를 일으킬 만한 요인이 아니었다. 점검 인력 부재도 사고를 발생시킨 원인이 아니라 피해의 범위와 기간에 영향을 준 조건이었다. 따라서 보고서는 원인과 조건을 구분하고, 각 요소가 결과에 어떻게 기여했는지를 따로 적었다. 이러한 구분은 책임을 한 사람에게 귀속하려는 유혹을 막는다. 파급 효과가 큰 사고일수록 원인을 단순화하지 않는 절차가 필요하다.",
      "이 사고는 원인을 하나로 정하는 일과 책임을 묻는 일이 같지 않다는 점을 보여 준다. 설정 오류는 기술적 원인이지만, 배포 절차를 충분히 검증하지 않은 조직의 판단도 함께 검토해야 한다. 반대로 접속량 증가를 주원인으로 부르면, 같은 오류가 다음에도 반복될 가능성을 놓치게 된다. 보고서는 재발 방지를 위해 배포 전 자동 점검과 야간 대응 체계를 제안했다. 원인 분석의 목적은 책임자를 빨리 찾는 것이 아니라, 같은 연쇄를 끊을 지점을 찾는 데 있다.",
    ],
    pt: "No dia 14 do mês passado, o sistema de empréstimos da biblioteca municipal parou por quatro horas, e 3.200 usuários não conseguiram pegar nem devolver livros. A equipe de operação analisou os registros do incidente e os logs do servidor e dividiu as causas em três camadas. A primeira foi um erro de configuração surgido durante a implantação de fim de semana, e esse foi o gatilho direto da falha. A segunda foi um volume de acessos duas vezes maior que o normal, que contribuiu para ampliar o dano depois do erro. A terceira foi a ausência de equipe de plantão noturno, uma das condições que atrasaram a recuperação. Essas três camadas têm pesos diferentes; portanto, agrupá-las numa única causa também turva a atribuição de responsabilidade. A equipe considerou o erro de configuração a causa principal. Sem o erro, o sistema teria funcionado normalmente mesmo com o aumento dos acessos. Já o aumento do volume de acessos não era um fator capaz de provocar a falha sozinho. A ausência de plantão também não foi a causa do incidente, mas uma condição que influenciou a extensão e a duração do dano. Por isso, o relatório separou causas e condições e registrou à parte como cada elemento contribuiu para o resultado. Essa distinção impede a tentação de atribuir a responsabilidade a uma única pessoa. Quanto maior a repercussão de um incidente, mais necessário é um procedimento que não simplifique as causas. Este incidente mostra que determinar uma causa e cobrar responsabilidade não são a mesma coisa. O erro de configuração é uma causa técnica, mas também é preciso examinar o julgamento da organização que não verificou suficientemente o procedimento de implantação. Por outro lado, chamar o aumento dos acessos de causa principal faz perder de vista a possibilidade de o mesmo erro se repetir. Para evitar a recorrência, o relatório propôs verificação automática antes da implantação e um sistema de resposta noturna. O objetivo da análise de causas não é encontrar rapidamente um culpado, mas localizar o ponto em que a mesma cadeia pode ser interrompida.",
    objective: "Distinguir causa principal, fator contribuinte e condição, e reconhecer como o texto atribui responsabilidade.",
  },
  reusedIds: ["ko:원인", "ko:분석", "ko:장애", "ko:오류"],
  grammar: [
    [
      "-에 기인하다 — decorrer de; ser atribuível a",
      "명사 + -에 기인하다",
      "Indica a origem ou a causa de um fenômeno, sobretudo em relatórios e textos acadêmicos. O foco recai sobre o elemento que explica o surgimento do problema, não sobre o agente que o provocou. Compare com -때문이다, que apresenta a causa de modo direto e serve também à fala; -에 기인하다 é mais analítico e impessoal. Evite usar para atribuir culpa direta a uma pessoa; o registro é analítico e impessoal, não acusatório.",
      [
        ["이번 혼란은 배포 절차의 미비에 기인한다.", "Esta confusão decorre da insuficiência do procedimento de implantação."],
        ["청년층의 이탈은 주거비 상승에 기인한다는 분석이 나왔다.", "Surgiu uma análise de que o êxodo dos jovens decorre da alta dos custos de moradia."],
      ],
    ],
    [
      "-ㄴ/는 데 기여하다 — contribuir para",
      "동사 + -는 데 기여하다 / 명사 + 에 기여하다",
      "Afirma que um elemento ajudou a produzir um resultado, sem dizer que foi a causa única. Pode ter valor positivo ou negativo e é comum em relatórios, avaliações e textos de política. Compare com -에 기인하다, que aponta a origem; -는 데 기여하다 mede participação. A forma com substantivo pede 에 기여하다, como 피해 확대에 기여했다.",
      [
        ["사전 점검이 부족했던 점은 피해 확대에 기여했다.", "A insuficiência da verificação prévia contribuiu para ampliar o dano."],
        ["공공 데이터 개방은 행정의 투명성을 높이는 데 기여한다.", "A abertura de dados públicos contribui para aumentar a transparência da administração."],
      ],
    ],
  ],
  guided: [
    mcq("Qual elemento o relatório trata como causa principal da falha?", ["O erro de configuração na implantação.", "O aumento do volume de acessos.", "A ausência de equipe de plantão noturno."], "O erro de configuração na implantação.", "O texto afirma que, sem o erro, o sistema teria funcionado mesmo com mais acessos."),
    cloze("Complete a atribuição da causa: 보고서는 장애가 설정 오류에 ___고 적었다.", "기인한다", "-에 기인하다 indica a origem do fenômeno em registro analítico."),
    listen("Ouça e escreva a distinção entre causa e fator contribuinte.", "장애는 설정 오류에 기인하고, 피해 확대에는 접속량 증가가 기여했다.", "장애는 설정 오류에 기인하고, 피해 확대에는 접속량 증가가 기여했다.", "A falha decorreu do erro de configuração, e o aumento dos acessos contribuiu para ampliar o dano."),
    reading("운영팀은 설정 오류를 주된 원인으로 판단했다. 오류가 없었다면 접속량이 늘어도 시스템은 정상적으로 작동했을 것이기 때문이다. 반면 접속량 증가는 단독으로 장애를 일으킬 만한 요인이 아니었다.", "Por que o erro de configuração é tratado como causa principal?", ["Porque sem ele o sistema teria funcionado apesar do aumento de acessos.", "Porque foi o único elemento registrado nos logs.", "Porque a equipe noturna não estava presente."], "Porque sem ele o sistema teria funcionado apesar do aumento de acessos.", "O critério é contrafactual: sem o erro, o resultado não teria ocorrido."),
    translate("pt-ko", "Traduza: “O aumento dos acessos contribuiu para ampliar o dano.”", "접속량 증가는 피해 확대에 기여했다.", "A forma é -는 데 기여하다, com o substantivo 피해 확대 + 에 기여하다.", ["접속량 증가가 피해 확대에 기여했다."]),
  ],
  independent: [
    mcq("Qual frase usa -에 기인하다 corretamente?", ["이번 지연은 인력 부족에 기인한다.", "이번 지연은 인력 부족에 기인한다고 한다면이다.", "이번 지연은 인력 부족을 기인한다."], "이번 지연은 인력 부족에 기인한다.", "A forma pede o substantivo com 에: 인력 부족에 기인한다."),
    cloze("Complete o fator que ampliou o problema: 접속량 증가는 피해 확대에 ___.", "기여했다", "-는 데 기여하다 / 에 기여하다 indica participação, não causa exclusiva."),
    listen("Ouça e escreva o objetivo da análise de causas.", "원인 분석의 목적은 책임자를 빨리 찾는 것이 아니라 같은 연쇄를 끊는 데 있다.", "원인 분석의 목적은 책임자를 빨리 찾는 것이 아니라 같은 연쇄를 끊는 데 있다.", "O objetivo da análise de causas não é encontrar rapidamente um culpado, mas interromper a mesma cadeia."),
    translate("ko-pt", "Traduza: 점검 인력 부재는 사고의 원인이 아니라 피해 기간을 늘린 조건이었다.", "A ausência de equipe de plantão não foi a causa do incidente, mas uma condição que prolongou o período do dano.", "조건 = condição; o texto distingue causa de condição.", ["A falta de pessoal de plantão não causou o incidente; foi uma condição que aumentou a duração do dano."]),
    reading("설정 오류는 기술적 원인이지만, 배포 절차를 충분히 검증하지 않은 조직의 판단도 함께 검토해야 한다. 반대로 접속량 증가를 주원인으로 부르면, 같은 오류가 다음에도 반복될 가능성을 놓치게 된다.", "O que o texto recomenda além de apontar a causa técnica?", ["Examinar também o julgamento da organização sobre o procedimento de implantação.", "Considerar o volume de acessos como causa única.", "Substituir todo o sistema imediatamente."], "Examinar também o julgamento da organização sobre o procedimento de implantação.", "O texto separa a causa técnica da responsabilidade organizacional."),
  ],
  summary: [
    "Causa principal é o elemento sem o qual o resultado não ocorreria; fator contribuinte altera extensão ou duração.",
    "-에 기인하다 atribui origem em registro analítico e impessoal.",
    "-ㄴ/는 데 기여하다 reconhece participação sem transformá-la em causa exclusiva.",
    "Atribuir causa não é o mesmo que distribuir culpa: a análise deve indicar onde interromper a cadeia.",
    "Conteúdo novo permanece em revisão.",
  ],
  production: production(
    "Produção independente · explicar uma falha",
    "Pense em uma falha que você acompanhou — um atraso, um sistema fora do ar, um evento cancelado. Explique o que aconteceu separando uma causa principal, dois fatores contribuintes e um elemento que foi apenas coincidência.",
    "하나의 실패를 원인과 기여 요인으로 나누어 설명해 보세요.",
    ["Comece pelo fato, sem atribuir culpa.", "Use -에 기인하다 uma vez para a causa principal.", "Use -ㄴ/는 데 기여하다 uma vez para um fator contribuinte.", "Diga explicitamente o que não foi causa, apesar de estar presente.", "Feche com o ponto em que a cadeia poderia ser interrompida."],
    ["Fato descrito com clareza.", "Causa principal distinta dos fatores.", "Dois fatores contribuintes nomeados.", "Uma coincidência descartada.", "Conclusão voltada à prevenção."],
    "지난달 우리 동아리의 발표 행사는 예정보다 한 시간 늦게 시작했다. 행사가 예정보다 늦게 시작한 것은 발표 장비를 미리 점검하지 않은 데 기인한다. 노트북과 프로젝터의 연결 방식이 달라졌는데, 담당자가 이를 확인하지 않았다. 행사장 앞 도로 공사로 참가자의 도착이 늦어진 점은 준비를 어렵게 하는 데 기여했다. 또한 안내 문자가 늦게 발송된 것도 혼잡을 키운 요인이었다. 다만 그날 내린 비는 행사 지연과 무관했다. 실내 행사였고, 우산을 쓴 참가자도 많지 않았다. 문제는 장비 점검 절차가 당일 아침에야 시작되었다는 점이다. 다음 행사에서는 전날 장비를 연결해 보고, 담당자 두 명이 결과를 확인하는 절차를 마련할 필요가 있다.",
    "No mês passado, o evento de apresentação do nosso grupo começou uma hora mais tarde do que o previsto. A causa principal decorre de não termos verificado o equipamento de apresentação com antecedência. O modo de conexão entre o notebook e o projetor havia mudado, e o responsável não conferiu isso. O fato de os participantes chegarem atrasados por causa de obras na rua em frente ao local contribuiu para dificultar os preparativos. Além disso, o envio tardio da mensagem de orientação foi um fator que aumentou a confusão. A chuva daquele dia, porém, não teve relação com o atraso. O evento era indoor e poucos participantes usaram guarda-chuva. O problema é que a verificação do equipamento só começou na manhã do próprio dia. Para o próximo evento, é preciso testar a conexão na véspera e criar um procedimento em que duas pessoas confirmem o resultado.",
    "Exemplo original de oito frases. Observe a causa principal, os fatores e a coincidência descartada. Exemplo ilustrativo; não é gabarito.",
  ),
});

/** c1-l22 — avaliação calibrada com critério explícito. */
export const C1_L22 = defineC1Lesson({
  id: "c1-l22", number: 22, moduleId: "c1-m05", title: "Avaliar sem exagerar",
  objective: "Avaliar ideias, textos e propostas com critérios explícitos e linguagem calibrada.",
  prerequisites: ["c1-l21"], estimatedMinutes: 80, dialogueTitle: "Três propostas, dois critérios",
  intro: [
    {
      title: "O critério antes do veredito",
      body: "Uma avaliação honesta nomeia o critério antes de dizer se algo é bom ou ruim. “Viável” e “relevante” não são sinônimos: uma proposta pode resolver pouco com pouco custo e, ainda assim, ser a melhor escolha disponível. Sem critério, o veredito revela apenas a preferência de quem avalia. Com critério, o leitor pode discordar do peso atribuído a cada dimensão e continuar entendendo a decisão.",
      ko: "평가의 준거를 먼저 밝히지 않으면, 독자는 무엇을 기준으로 내린 판단인지 알 수 없다.",
    },
    {
      title: "Elogio e ressalva no mesmo parágrafo",
      body: "Calibrar não é escolher um meio-termo morno. É dizer com clareza o que funciona, em que medida e sob quais condições. Uma ressalva específica não enfraquece o elogio; mostra que quem avalia conhece o objeto. O exagero, tanto no elogio quanto na crítica, produz o efeito contrário: promete mais do que pode sustentar e, quando o limite aparece, faz o leitor desconfiar de toda a avaliação.",
      ko: "구체적인 유보는 평가를 약하게 만들지 않고, 오히려 판단의 근거를 드러낸다.",
    },
  ],
  dialogue: [
    ["수민", "세 제안을 같은 기준으로 평가할 수 있을까요?", "Podemos avaliar as três propostas com o mesmo critério?"],
    ["현우", "먼저 준거를 정해야 해요. 실현 가능성과 영향력을 따로 보는 게 좋겠습니다.", "Primeiro precisamos definir os critérios. É melhor examinar separadamente viabilidade e impacto."],
    ["수민", "1번은 비용이 적게 들지만 영향력도 작고, 3번은 영향력이 크지만 예산이 과도해요.", "A proposta 1 custa pouco, mas tem pouco impacto; a 3 tem grande impacto, mas o orçamento é excessivo."],
    ["현우", "2번은 두 기준 모두 중간 정도인데, 지역 편중이 흠결이에요.", "A 2 fica no meio nos dois critérios, mas a concentração regional é uma falha."],
    ["수민", "그러면 2번을 탈락시키는 게 맞나요?", "Então o certo é eliminar a 2?"],
    ["현우", "아니요. 2번은 예산을 조정하면 충분히 검토할 만해요. 다만 시범 지역을 넓히는 조건이 필요합니다.", "Não. A 2 merece ser examinada se ajustarmos o orçamento. Só é preciso a condição de ampliar as áreas-piloto."],
    ["수민", "평가를 너무 온건하게 쓰면 결정이 흐려질까 봐 걱정돼요.", "Preocupa-me que uma avaliação moderada demais torne a decisão confusa."],
    ["현우", "온건한 것과 모호한 것은 달라요. 기준과 조건을 숫자로 밝히면 판단은 오히려 선명해집니다.", "Moderado e vago são coisas diferentes. Se indicarmos critérios e condições com números, o julgamento fica até mais nítido."],
  ],
  readingText: {
    titlePt: "Uma política aprovada com ressalvas",
    paragraphs: [
      "시는 지난해 9월부터 심야 버스 두 노선을 시범 운영했다. 평가팀은 접근성, 운영 비용, 안전의 세 준거를 미리 정하고 석 달간의 자료를 수집했다. 접근성 측면에서는 심야 이동이 어려웠던 주민의 이용률이 18퍼센트 늘었다. 그러나 이용자의 71퍼센트가 도심 두 구에 집중되었고, 외곽 지역의 대기 시간은 거의 줄지 않았다. 운영 비용은 예상보다 9퍼센트 높았다. 평가팀은 이 결과를 성공이나 실패로 단정하지 않고, 기준별로 다른 판단을 내렸다.",
      "접근성 개선은 분명한 성과로 평가된다. 특히 야간 근무자의 이동 시간이 평균 22분 줄었다는 점은 정책의 근거를 뒷받침한다. 다만 이 수치는 설문 응답자 240명을 기준으로 한 것이며, 무응답자의 상황은 알 수 없다. 비용 측면에서는 적정 수준을 넘지 않았다고 보기 어렵다. 차량 한 대당 이용자가 적어 운영 효율이 낮았기 때문이다. 안전 지표는 긍정적이었지만, 사고 건수가 원래 적어 통계적 판단을 내리기에는 이르다. 이처럼 기준마다 결론이 다르면, 하나의 점수로 정책 전체를 평가절하하거나 과대평가하기 쉽다.",
      "평가팀의 결론은 조건부 승인이었다. 심야 버스는 외곽 노선을 포함해 6개월 더 운영할 만하지만, 차량 규모와 배차 간격을 조정하지 않으면 비용 문제가 반복될 수 있다. 이 판단은 정책을 옹호하지도, 폐기하지도 않는다. 대신 어떤 조건에서 계속할지를 명시한다. 독자는 이 평가가 정책의 가치와 운영의 효율을 구분하고 있음을 알아야 한다. 그 구분이 사라지면, 근거 없는 확신이나 근거 없는 회의가 결정을 대신하게 된다.",
    ],
    pt: "Desde setembro do ano passado, a cidade operou em caráter piloto duas linhas de ônibus noturno. A equipe de avaliação definiu previamente três critérios — acessibilidade, custo operacional e segurança — e coletou dados durante três meses. No aspecto da acessibilidade, o uso por moradores que tinham dificuldade de se deslocar à noite aumentou 18%. No entanto, 71% dos usuários se concentraram em dois distritos centrais, e o tempo de espera nas áreas periféricas quase não diminuiu. O custo operacional ficou 9% acima do previsto. A equipe não classificou o resultado como sucesso ou fracasso, mas emitiu julgamentos distintos por critério. A melhora da acessibilidade é avaliada como um ganho claro. Em especial, o fato de o tempo de deslocamento dos trabalhadores noturnos ter caído, em média, 22 minutos sustenta a justificativa da política. Esse número, porém, se baseia em 240 respondentes de questionário, e não se sabe a situação dos que não responderam. No aspecto do custo, é difícil sustentar que o nível tenha permanecido adequado. Como havia poucos usuários por veículo, a eficiência operacional foi baixa. Os indicadores de segurança foram positivos, mas o número de acidentes já era pequeno, então é cedo para um julgamento estatístico. Quando as conclusões divergem por critério, é fácil desvalorizar ou superestimar a política inteira com uma única nota. A conclusão da equipe foi uma aprovação condicional. Os ônibus noturnos merecem mais seis meses de operação, inclusive em linhas periféricas, mas o problema de custo pode se repetir se não se ajustarem o tamanho da frota e o intervalo entre partidas. Esse julgamento não defende nem descarta a política. Em vez disso, especifica sob que condições continuar. O leitor deve perceber que essa avaliação separa o valor da política da eficiência da operação. Se essa distinção desaparecer, convicções sem evidência ou ceticismo sem evidência passarão a decidir no lugar dela.",
    objective: "Distinguir avaliação fundamentada de preferência pessoal e reconhecer o critério de cada veredito.",
  },
  reusedIds: ["ko:판단", "ko:근거", "ko:설문", "ko:단정"],
  grammar: [
    [
      "-ㄴ/는 것으로 평가된다 — é avaliado como",
      "동사 + -는 것으로 평가된다 / 형용사 + -(으)ㄴ 것으로 평가된다 / 명사 + (으)로 평가된다",
      "Atribui uma avaliação a um consenso ou a um observador externo, sem apresentá-la como fato objetivo. É típica de resenhas, relatórios e textos jornalísticos. Compare com -다고 평가하다, que nomeia o avaliador e serve também à fala; a forma passiva apaga o agente e sugere um consenso que pode ou não existir. Em textos críticos, vale perguntar quem avalia e com que critério.",
      [
        ["이 정책은 비용 대비 효과가 큰 것으로 평가된다.", "Esta política é avaliada como tendo grande efeito em relação ao custo."],
        ["보고서는 자료의 신뢰도가 낮은 것으로 평가된다.", "O relatório é avaliado como tendo baixa confiabilidade dos dados."],
      ],
    ],
    [
      "-ㄹ 만하다 — vale a pena; é digno de",
      "동사 + -ㄹ 만하다",
      "Indica que uma ação ou opção merece consideração, sem afirmar que é a melhor. É uma forma de aprovação calibrada, comum em recomendações e avaliações. Compare com -아/어야 한다, que expressa obrigação; -ㄹ 만하다 apenas diz que algo é suficientemente razoável para ser considerado. Pode vir com 조건이 필요하다 ou 다만 para introduzir a ressalva.",
      [
        ["외곽 노선을 포함해 6개월 더 운영할 만하다.", "Vale a pena operar mais seis meses, incluindo as linhas periféricas."],
        ["이 제안은 예산을 조정하면 검토할 만하다.", "Esta proposta merece ser examinada se o orçamento for ajustado."],
      ],
    ],
  ],
  guided: [
    mcq("Qual critério revelou o principal limite da política?", ["O custo operacional, que ficou acima do previsto.", "A segurança, que piorou durante o piloto.", "A acessibilidade, que não teve nenhum avanço."], "O custo operacional, que ficou acima do previsto.", "O texto afirma que o custo ficou 9% acima do previsto e que a eficiência foi baixa."),
    cloze("Complete a avaliação calibrada: 외곽 노선을 포함해 6개월 더 운영할 ___.", "만하다", "-ㄹ 만하다 indica que algo merece consideração, sem impor a decisão."),
    listen("Ouça e escreva a conclusão condicional da equipe.", "외곽 노선을 포함해 6개월 더 운영할 만하지만, 비용 문제는 조정이 필요하다.", "외곽 노선을 포함해 6개월 더 운영할 만하지만, 비용 문제는 조정이 필요하다.", "Vale a pena operar mais seis meses, incluindo as linhas periféricas, mas o problema de custo exige ajuste."),
    reading("접근성 개선은 분명한 성과로 평가된다. 특히 야간 근무자의 이동 시간이 평균 22분 줄었다는 점은 정책의 근거를 뒷받침한다. 다만 이 수치는 설문 응답자 240명을 기준으로 한 것이며, 무응답자의 상황은 알 수 없다.", "Como o texto qualifica o ganho de acessibilidade?", ["Reconhece o ganho, mas aponta o limite dos dados de questionário.", "Nega o ganho porque a amostra era pequena.", "Afirma que o ganho vale para toda a cidade."], "Reconhece o ganho, mas aponta o limite dos dados de questionário.", "O texto sustenta o ganho e, ao mesmo tempo, restringe o alcance do número."),
    translate("pt-ko", "Traduza: “A política é avaliada como tendo grande efeito em relação ao custo.”", "이 정책은 비용 대비 효과가 큰 것으로 평가된다.", "A forma passiva é -ㄴ/는 것으로 평가된다.", ["이 정책은 비용 대비 효과가 큰 것으로 평가됩니다."]),
  ],
  independent: [
    mcq("Qual frase expressa aprovação calibrada, e não obrigação?", ["이 제안은 예산을 조정하면 검토할 만하다.", "이 제안은 반드시 즉시 시행해야 한다.", "이 제안은 모든 기준에서 완벽하다."], "이 제안은 예산을 조정하면 검토할 만하다.", "-ㄹ 만하다 recomenda sem impor; as outras opções prometem demais."),
    cloze("Complete a avaliação externa: 보고서는 자료의 신뢰도가 낮은 것으로 ___.", "평가된다", "A forma passiva -ㄴ/는 것으로 평가된다 atribui a avaliação sem nomear o agente."),
    listen("Ouça e escreva a diferença entre moderado e vago.", "온건한 것과 모호한 것은 다르며, 기준을 밝히면 판단은 더 선명해진다.", "온건한 것과 모호한 것은 다르며, 기준을 밝히면 판단은 더 선명해진다.", "Moderado e vago são diferentes; explicitar o critério torna o julgamento mais nítido."),
    translate("ko-pt", "Traduza: 이 수치는 설문 응답자 240명을 기준으로 한 것이며, 무응답자의 상황은 알 수 없다.", "Esse número se baseia em 240 respondentes do questionário, e não se sabe a situação dos que não responderam.", "무응답자 = os que não responderam; o texto limita o alcance do dado.", ["O número tem como base 240 respostas de questionário, e a situação de quem não respondeu é desconhecida."]),
    reading("평가팀의 결론은 조건부 승인이었다. 심야 버스는 외곽 노선을 포함해 6개월 더 운영할 만하지만, 차량 규모와 배차 간격을 조정하지 않으면 비용 문제가 반복될 수 있다.", "O que a conclusão condicional especifica?", ["Que a continuação depende de ajustes na frota e no intervalo entre partidas.", "Que a política deve ser encerrada imediatamente.", "Que o custo não tem relação com a operação."], "Que a continuação depende de ajustes na frota e no intervalo entre partidas.", "A aprovação é condicionada a mudanças operacionais concretas."),
  ],
  summary: [
    "Avaliar exige nomear o critério antes do veredito e separar dimensões como viabilidade, impacto e custo.",
    "-ㄴ/는 것으로 평가된다 atribui uma avaliação a um consenso implícito, sem nomear o avaliador.",
    "-ㄹ 만하다 recomenda sem transformar a recomendação em obrigação.",
    "Elogio e ressalva convivem: a ressalva específica sustenta a avaliação em vez de enfraquecê-la.",
    "Conteúdo novo permanece em revisão.",
  ],
  production: production(
    "Produção independente · avaliar uma proposta",
    "Escolha uma proposta que você conhece — um projeto de escola, de bairro ou de trabalho. Avalie-a com dois critérios explícitos, apresente um mérito e um limite, e feche com uma recomendação condicional.",
    "두 가지 준거로 제안을 평가하고 조건부 결론을 써 보세요.",
    ["Declare os dois critérios antes de emitir o veredito.", "Use -ㄴ/는 것으로 평가된다 uma vez para a avaliação geral.", "Use -ㄹ 만하다 uma vez para a recomendação condicional.", "Apresente um limite específico, não uma desconfiança genérica.", "Diga em que condição a proposta deveria seguir."],
    ["Dois critérios explícitos.", "Mérito apoiado em dado ou exemplo.", "Limite específico e não genérico.", "Recomendação condicional.", "Fechamento que separa valor e eficiência."],
    "나는 우리 동아리의 야간 스터디 운영안을 두 가지 준거로 평가한다. 첫째는 참여 접근성이고, 둘째는 운영 부담이다. 지난 학기에는 20명 중 14명이 저녁 8시 이후에는 참여하기 어렵다고 답했다. 운영안은 스터디를 오후 7시로 앞당기고, 진행자를 두 명으로 나누는 내용을 담고 있다. 접근성 측면에서 이 안은 검토할 만하다. 참여 시간이 30분 앞당겨지면 퇴근 후 이동이 수월해지기 때문이다. 다만 운영 부담은 오히려 커질 수 있다. 진행자 두 명을 매주 배치하려면 준비 시간이 지금보다 40퍼센트 늘어난다. 따라서 이 안은 두 달간 시범 운영하는 것으로 평가된다. 참여율이 10퍼센트 이상 오르고 진행자의 부담이 감당 가능한 수준에 머문다면, 다음 학기에도 유지할 만하다.",
    "Avalio o plano de estudos noturnos do nosso grupo com dois critérios. O primeiro é a acessibilidade à participação; o segundo, a carga operacional. No semestre passado, 14 de 20 pessoas responderam que tinham dificuldade de participar depois das oito da noite. O plano propõe adiantar o estudo para as sete e dividir a condução entre duas pessoas. No aspecto da acessibilidade, esse plano merece ser examinado. Adiantar o horário em 30 minutos facilita o deslocamento depois do trabalho. A carga operacional, porém, pode até aumentar. Escalar dois responsáveis por semana exige 40% mais tempo de preparação do que hoje. Por isso, o plano é avaliado como um piloto de dois meses. Se a participação subir mais de 10% e a carga dos responsáveis se mantiver em nível administrável, vale a pena mantê-lo no semestre seguinte.",
    "Exemplo original de oito frases. Observe os critérios declarados, o mérito, o limite e a condição. Exemplo ilustrativo; não é gabarito.",
  ),
});

/** c1-l23 — verbos de atribuição e fidelidade da paráfrase. */
export const C1_L23 = defineC1Lesson({
  id: "c1-l23", number: 23, moduleId: "c1-m05", title: "Verbos de dizer e escrever",
  objective: "Atribuir fala, escrita e intenção com verbos precisos e sem distorção.",
  prerequisites: ["c1-l22"], estimatedMinutes: 80, dialogueTitle: "O mesmo comunicado, duas matérias",
  intro: [
    {
      title: "Cada verbo de atribuição distribui responsabilidade",
      body: "“Afirmar”, “sugerir”, “insinuar” e “reconhecer” não descrevem o mesmo ato. O primeiro apresenta uma posição assumida; o segundo, uma proposta; o terceiro, algo dito de modo indireto; o quarto, uma admissão. Ao parafrasear uma fonte, o verbo escolhido pode transformar uma hipótese em acusação ou uma proposta em exigência. A fidelidade da paráfrase não depende só de repetir o conteúdo: depende de preservar o tipo de ato que a fonte realizou.",
      ko: "자료가 ‘제안했다’고 적은 내용을 ‘요구했다’로 바꾸면, 같은 문장이 전혀 다른 책임을 만든다.",
    },
    {
      title: "Intenção declarada e intenção inferida",
      body: "Um comunicado tem um teor — aquilo que ele efetivamente diz — e pode ter intenções que o leitor infere. As duas coisas não se confundem. Ao resumir, atribua ao texto apenas o que ele declara e marque a inferência como inferência. Expresões como “o comunicado dá a entender” ou “a leitura sugerida é” mantêm a distância. Sem essa marca, o jornalista ou o analista passa a falar em nome da fonte e assume uma responsabilidade que não era sua.",
      ko: "자료의 취지를 요약할 때는 선언된 내용과 해석자가 추론한 내용을 구분해야 한다.",
    },
  ],
  dialogue: [
    ["나영", "같은 보도자료인데 두 기사가 완전히 다르게 읽혀요.", "É o mesmo release, mas as duas matérias se leem de forma completamente diferente."],
    ["준호", "첫 기사는 시가 임대료를 ‘인상했다’고 썼고, 둘째는 ‘조정했다’고 썼네요.", "A primeira matéria escreveu que a cidade ‘aumentou’ o aluguel; a segunda, que ‘ajustou’."],
    ["나영", "자료에는 ‘시장 수준에 맞게 조정’이라고만 되어 있어요.", "No material, só está escrito ‘ajustar ao nível de mercado’."],
    ["준호", "그러면 ‘인상’은 추론이고, ‘조정’은 자료의 표현이에요.", "Então ‘aumento’ é inferência, e ‘ajuste’ é a expressão do material."],
    ["나영", "둘째 기사는 시가 주거 지원을 ‘축소할 계획’이라고 단정했어요.", "A segunda matéria afirmou categoricamente que a cidade ‘planeja reduzir’ o apoio habitacional."],
    ["준호", "그 표현은 자료의 취지와 거리가 있어요. 자료는 대상 기준을 바꾸겠다고만 언급했어요.", "Essa expressão está longe do teor do material. O material apenas mencionou que mudaria o critério de elegibilidade."],
    ["나영", "그럼 ‘축소’ 대신 ‘기준 조정’이라고 써야겠네요.", "Então em vez de ‘redução’ devemos escrever ‘ajuste de critério’."],
    ["준호", "네. 그리고 해석이 들어간 부분은 ‘시사한다’나 ‘보인다’로 표시해야 합니다.", "Sim. E as partes com interpretação devem ser marcadas com ‘sugere’ ou ‘parece’."],
  ],
  readingText: {
    titlePt: "O que o comunicado disse — e o que fizeram dele",
    paragraphs: [
      "시는 어제 보도자료에서 청년 주거 지원 사업의 지원금을 월 20만 원에서 25만 원으로 인상하겠다고 밝혔다. 담당자는 “신청 자격은 유지하되, 소득 기준은 시장 상황에 맞게 조정할 계획”이라고 언급했다. 자료에는 올해 예산 12억 원과 지원 대상 1,200명이 명시되어 있었다. 또한 사업 기간은 내년까지 유지한다는 내용이 부연되었다. 이 자료에서 확인되는 사실은 지원금 인상, 소득 기준 조정 계획, 예산과 대상 규모, 사업 기간이다.",
      "한 매체는 이 자료를 “시, 청년 주거 지원 대폭 확대”라는 제목으로 보도했다. 기사 본문에는 지원금이 인상된다는 사실이 정확히 전달되었지만, 소득 기준 조정은 “지원 대상 확대”로 바뀌었다. 그러나 소득 기준을 조정한다고 해서 대상이 늘어난다고 단정할 수는 없다. 기준이 높아지면 대상은 오히려 줄어들 수 있기 때문이다. 다른 매체는 같은 자료를 “시, 주거 지원 축소 가능성”이라고 보도하며, 기준 조정을 곧 수혜자 감소로 해석했다. 두 기사 모두 자료에 없는 결론을 전면에 내세웠다.",
      "자료의 취지는 지원금을 인상하되 자격 기준을 다시 검토하겠다는 것이다. 이 취지를 정확히 전하려면, 확인된 사실과 해석을 분리해야 한다. “시는 소득 기준을 조정할 계획이라고 밝혔다”는 사실 진술이고, “이 조정이 대상 축소로 이어질 수 있다”는 해석이다. 해석을 쓸 때는 “가능성이 있다”, “시사한다”, “보인다” 같은 표현으로 책임의 범위를 표시할 필요가 있다. 독자는 제목만 읽고 판단하므로, 제목이 자료의 전언을 넘어서면 왜곡은 본문보다 오래 남는다.",
    ],
    pt: "A cidade informou ontem, em release à imprensa, que aumentará o auxílio do programa de moradia para jovens de 200 mil para 250 mil won por mês. O responsável mencionou que “a elegibilidade será mantida, mas o critério de renda será ajustado conforme a situação do mercado”. O material especificava um orçamento de 1,2 bilhão de won e 1.200 beneficiários para este ano. Também foi acrescentado que o período do programa será mantido até o ano que vem. Os fatos confirmados nesse material são o aumento do auxílio, o plano de ajuste do critério de renda, o orçamento e o número de beneficiários, e a duração do programa. Um veículo noticiou o material com o título “Cidade amplia drasticamente o apoio habitacional a jovens”. No corpo da matéria, o fato de o auxílio aumentar foi transmitido com precisão, mas o ajuste do critério de renda virou “ampliação dos beneficiários”. No entanto, não se pode afirmar categoricamente que ajustar o critério de renda aumente o número de beneficiários. Se o critério ficar mais rigoroso, os beneficiários podem até diminuir. Outro veículo noticiou o mesmo material como “Cidade pode reduzir apoio habitacional”, interpretando o ajuste do critério diretamente como redução de beneficiários. As duas matérias colocaram em primeiro plano conclusões que não estavam no material. O teor do material é aumentar o auxílio, mas rever o critério de elegibilidade. Para transmitir esse teor com precisão, é preciso separar os fatos confirmados da interpretação. “A cidade informou que planeja ajustar o critério de renda” é uma declaração de fato; “esse ajuste pode levar à redução de beneficiários” é interpretação. Ao escrever uma interpretação, é preciso marcar o alcance da responsabilidade com expressões como “há possibilidade”, “sugere” ou “parece”. Como o leitor julga pelo título, quando o título ultrapassa o teor do material, a distorção dura mais que o corpo da matéria.",
    objective: "Comparar as paráfrases com o comunicado original e identificar onde a atribuição se desvia.",
  },
  reusedIds: ["ko:자료", "ko:보도자료", "ko:부연", "ko:담당자"],
  grammar: [
    [
      "-라고 언급하다 — mencionar que",
      "동사 + -라고 언급하다 / 형용사 + -다고 언급하다 / 명사 + (이)라고 언급하다",
      "Introduz uma fala citada de modo neutro, sem comprometer o enunciador com a verdade do conteúdo. É o verbo típico para retomar o que uma fonte disse em comunicados e entrevistas. Compare com -라고 주장하다, que apresenta a fala como posição a ser defendida; 언급하다 apenas registra que o assunto foi tocado. Não use para ordens diretas nem para promessas solenes, contextos em que outros verbos são mais precisos.",
      [
        ["담당자는 소득 기준을 조정할 계획이라고 언급했다.", "O responsável mencionou que planeja ajustar o critério de renda."],
        ["보고서는 예산이 충분하지 않다고 언급했다.", "O relatório mencionou que o orçamento não é suficiente."],
      ],
    ],
    [
      "-ㄴ/는 취지다 — a intenção/o teor é",
      "동사 + -는 취지다 / 형용사 + -(으)ㄴ 취지다 / 명사 + 인 취지다",
      "Explicita o sentido pretendido de um texto, comunicado ou proposta, sobretudo quando as palavras literais poderiam gerar leitura equivocada. É comum em textos jornalísticos e institucionais. Compare com -는 뜻이다, mais neutro e oral; -ㄴ/는 취지다 enfatiza a intenção global do enunciado. Não use para resumir um conteúdo inteiro sem indicar que se trata de interpretação do teor.",
      [
        ["자료의 취지는 지원금을 인상하되 자격 기준을 다시 검토하겠다는 것이다.", "O teor do material é aumentar o auxílio, mas rever o critério de elegibilidade."],
        ["제안의 취지는 비용을 줄이자는 것이지 인력을 줄이자는 것이 아니다.", "O teor da proposta é reduzir custos, não reduzir pessoal."],
      ],
    ],
  ],
  guided: [
    mcq("O que o comunicado efetivamente afirma sobre o critério de renda?", ["Que será ajustado conforme a situação do mercado.", "Que os beneficiários serão ampliados.", "Que o programa será encerrado."], "Que será ajustado conforme a situação do mercado.", "O material menciona ajuste, não ampliação nem encerramento."),
    cloze("Complete a atribuição neutra: 담당자는 소득 기준을 조정할 계획이라고 ___.", "언급했다", "-라고 언급하다 registra a fala sem assumir sua verdade."),
    listen("Ouça e escreva a diferença entre o que o material diz e o que a matéria conclui.", "자료는 기준 조정을 언급했을 뿐, 대상 축소를 단정하지 않았다.", "자료는 기준 조정을 언급했을 뿐, 대상 축소를 단정하지 않았다.", "O material apenas mencionou o ajuste do critério; não afirmou categoricamente a redução de beneficiários."),
    reading("한 매체는 이 자료를 “시, 청년 주거 지원 대폭 확대”라는 제목으로 보도했다. 기사 본문에는 지원금이 인상된다는 사실이 정확히 전달되었지만, 소득 기준 조정은 “지원 대상 확대”로 바뀌었다.", "Onde está a distorção na primeira matéria?", ["Em transformar ajuste do critério de renda em ampliação de beneficiários.", "Em informar corretamente o aumento do auxílio.", "Em citar o orçamento de 1,2 bilhão de won."], "Em transformar ajuste do critério de renda em ampliação de beneficiários.", "O ajuste não implica ampliação; o critério pode até ficar mais rigoroso."),
    translate("pt-ko", "Traduza: “O responsável mencionou que o critério será ajustado.”", "담당자는 기준을 조정할 것이라고 언급했다.", "-라고 언급하다 introduz a fala citada de modo neutro.", ["담당자는 기준을 조정할 계획이라고 언급했다."]),
  ],
  independent: [
    mcq("Qual verbo preserva melhor uma proposta feita por uma fonte?", ["제안했다", "요구했다", "비난했다"], "제안했다", "제안하다 descreve uma proposta; 요구 e 비난 mudam o ato de fala e a responsabilidade."),
    cloze("Complete o teor do material: 자료의 ___는 지원금을 인상하되 자격을 다시 검토하겠다는 것이다.", "취지", "-ㄴ/는 취지다 explicita a intenção global do enunciado."),
    listen("Ouça e escreva a regra para marcar interpretações.", "해석을 쓸 때는 가능성이나 시사한다는 표현으로 책임의 범위를 표시해야 한다.", "해석을 쓸 때는 가능성이나 시사한다는 표현으로 책임의 범위를 표시해야 한다.", "Ao escrever uma interpretação, é preciso marcar o alcance da responsabilidade com expressões de possibilidade ou de sugestão."),
    translate("ko-pt", "Traduza: 두 기사 모두 자료에 없는 결론을 전면에 내세웠다.", "As duas matérias colocaram em primeiro plano conclusões que não estavam no material.", "전면에 내세우다 = colocar em primeiro plano; 자료에 없는 = ausente do material.", ["Ambas as matérias destacaram conclusões ausentes do documento original."]),
    reading("“시는 소득 기준을 조정할 계획이라고 밝혔다”는 사실 진술이고, “이 조정이 대상 축소로 이어질 수 있다”는 해석이다. 해석을 쓸 때는 “가능성이 있다” 같은 표현으로 책임의 범위를 표시할 필요가 있다.", "Por que o texto separa fato e interpretação?", ["Para limitar a responsabilidade de quem parafraseia a fonte.", "Para aumentar o impacto do título.", "Para eliminar qualquer conclusão sobre o tema."], "Para limitar a responsabilidade de quem parafraseia a fonte.", "Marcar a interpretação impede atribuir à fonte uma conclusão que ela não declarou."),
  ],
  summary: [
    "O verbo de atribuição define o ato de fala: mencionar, sugerir, afirmar e insinuar não são intercambiáveis.",
    "-라고 언급하다 registra uma fala citada sem assumir sua verdade.",
    "-ㄴ/는 취지다 explicita o teor global de um texto ou proposta.",
    "Paráfrase fiel separa o que a fonte declarou do que o analista inferiu.",
    "Conteúdo novo permanece em revisão.",
  ],
  production: production(
    "Produção independente · parafrasear sem distorcer",
    "Escolha um comunicado, uma nota ou uma fala pública que você conhece. Escreva um parágrafo de paráfrase fiel e, em seguida, uma frase que explicite o teor do documento e uma que marque uma inferência sua.",
    "자료의 취지를 살려 공정하게 요약해 보세요.",
    ["Comece pelo que o documento declara, com um verbo de atribuição preciso.", "Use -라고 언급하다 uma vez para uma fala citada.", "Use -ㄴ/는 취지다 uma vez para o teor global.", "Marque claramente a parte que é inferência sua.", "Não transforme proposta em exigência nem hipótese em conclusão."],
    ["Fato declarado separado da inferência.", "Verbo de atribuição adequado ao ato de fala.", "Teor global explicitado.", "Inferência marcada com cautela.", "Nenhuma intenção atribuída sem apoio no texto."],
    "지난주 시 교육청은 초등학교 돌봄 교실을 다음 학기부터 오후 7시까지 연장하겠다고 밝혔다. 담당자는 “이용 신청이 많은 학교부터 단계적으로 적용하겠다”고 언급했다. 자료에는 대상 학교 40곳과 추가 인력 120명이 명시되어 있었다. 이 자료의 취지는 돌봄 시간을 늘리되, 모든 학교에 동시에 적용하지는 않겠다는 것이다. 다만 추가 인력이 실제로 확보될 수 있는지는 자료에 드러나 있지 않다. 따라서 인력 부족이 생길 가능성이 있다는 것은 필자의 해석이다. 이 해석을 사실처럼 쓰면 교육청이 준비 없이 정책을 밀어붙인 것처럼 읽힌다. 확인된 내용과 전망을 분리해 쓰는 것이 공정한 보도의 출발점이다.",
    "Na semana passada, a secretaria de educação informou que, a partir do próximo semestre, estenderá o horário das salas de acolhimento em escolas primárias até as 19h. O responsável mencionou que “a aplicação será gradual, começando pelas escolas com mais solicitações”. O material especificava 40 escolas-alvo e 120 profissionais adicionais. O teor do material é ampliar o horário de acolhimento, mas não aplicar simultaneamente em todas as escolas. No entanto, não está claro no material se os profissionais adicionais serão de fato garantidos. Portanto, a afirmação de que pode haver falta de pessoal é interpretação do autor. Escrever essa interpretação como fato faz parecer que a secretaria está impondo a política sem preparo. Separar o conteúdo confirmado da projeção é o ponto de partida de uma cobertura justa.",
    "Exemplo original de oito frases. Observe o verbo de atribuição, o teor e a marcação da inferência. Exemplo ilustrativo; não é gabarito.",
  ),
});

/** c1-l24 — contraste e concessão a serviço da tese. */
export const C1_L24 = defineC1Lesson({
  id: "c1-l24", number: 24, moduleId: "c1-m05", title: "Contraste e concessão",
  objective: "Usar contraste e concessão lexical para qualificar uma posição sem enfraquecê-la.",
  prerequisites: ["c1-l23"], estimatedMinutes: 80, dialogueTitle: "Duas políticas, um orçamento",
  intro: [
    {
      title: "Contraste simétrico e assimétrico",
      body: "Comparar duas opções não é apenas listar diferenças. Um contraste é simétrico quando os dois lados são medidos pela mesma régua; é assimétrico quando uma dimensão pesa mais que a outra na decisão. Dizer que a opção A é mais barata “enquanto” a opção B é mais rápida só ajuda se soubermos qual diferença importa para o problema. Sem essa hierarquia, o contraste vira um catálogo neutro de vantagens e desvantagens.",
      ko: "두 정책을 같은 기준으로 대비하되, 어느 차이가 결정적인지 밝혀야 비교가 판단으로 이어진다.",
    },
    {
      title: "A concessão que preserva a tese",
      body: "Conceder não é abandonar a posição. É reconhecer um custo real antes de mostrar por que ele não anula a escolha. A concessão bem feita tem três partes: o fato admitido, o limite desse fato e a razão que mantém a tese. Quando falta a terceira parte, o texto parece apenas hesitante; quando falta a primeira, parece ingênuo. A força de uma defesa depende tanto do que ela admite quanto do que ela sustenta.",
      ko: "비용이 든다는 점을 인정하더라도, 그 비용이 선택 자체를 뒤집지는 않는다는 이유를 함께 제시해야 한다.",
    },
  ],
  dialogue: [
    ["유라", "심야 버스 증차와 요금 인하 중에 어느 쪽을 먼저 해야 할까요?", "Entre aumentar os ônibus noturnos e reduzir a tarifa, qual deveríamos fazer primeiro?"],
    ["민석", "증차는 접근성을 넓히는 반면, 요금 인하는 기존 이용자의 부담을 줄여요.", "Aumentar a frota amplia o acesso, enquanto a redução da tarifa alivia o custo dos usuários atuais."],
    ["유라", "예산은 한쪽에만 쓸 수 있어요. 두 효과를 같은 기준으로 비교해야겠네요.", "O orçamento só permite investir em um lado. Precisamos comparar os dois efeitos com o mesmo critério."],
    ["민석", "증차는 대기 시간을 줄이고, 요금 인하는 이용률을 높입니다. 다만 증차의 비용이 훨씬 큽니다.", "Aumentar a frota reduz o tempo de espera, e a redução da tarifa eleva o uso. Mas o custo de aumentar a frota é muito maior."],
    ["유라", "그러면 비용이 큰 증차를 포기해야 하나요?", "Então devemos abandonar o aumento da frota, que custa mais?"],
    ["민석", "비용이 든다 할지라도, 야간 노동자의 이동권을 먼저 봐야 합니다. 그분들에게는 요금보다 배차가 문제예요.", "Mesmo que custe, devemos priorizar o direito de circulação dos trabalhadores noturnos. Para eles, o problema é a frequência, não a tarifa."],
    ["유라", "좋아요. 다만 요금 인하의 편익도 함께 인정해야 비교가 공정하겠죠.", "Certo. Mas também precisamos reconhecer o benefício da redução da tarifa para que a comparação seja justa."],
    ["민석", "그럼 증차를 우선하되, 요금 인하는 다음 단계로 미루는 조건부 제안을 쓰겠습니다.", "Então escreverei uma proposta condicional que prioriza o aumento da frota e adia a redução da tarifa para a etapa seguinte."],
  ],
  readingText: {
    titlePt: "O custo que não anula a escolha",
    paragraphs: [
      "시는 내년 교통 예산을 심야 버스 증차와 요금 인하 가운데 한 사업에 배정해야 한다. 두 사업은 같은 예산을 두고 경쟁하지만, 효과의 대상이 다르다. 증차는 기존 노선이 닿지 않는 외곽 지역의 접근성을 높이는 반면, 요금 인하는 이미 버스를 이용하는 시민의 부담을 줄인다. 예산 규모를 고정하면 두 효과를 동시에 얻을 수 없다. 따라서 비교의 핵심은 어느 집단의 문제가 더 시급한가, 그리고 그 효과가 비용을 정당화하는가이다. 이 관점에서 보면 두 정책은 같은 예산을 두고도 다른 결과를 겨냥한다.",
      "자료에 따르면 심야 노동자는 평균 38분을 더 기다린 뒤 첫 차를 탄다. 이 집단의 이동권은 요금보다 배차에 달려 있다. 반면 요금 인하는 모든 이용자에게 혜택을 주지만, 1인당 절감액은 월 6,000원 수준이다. 증차 비용은 요금 인하의 세 배에 이른다. 여기서 비용이 크다는 사실만 보면 증차가 열세로 보인다. 그러나 비용 대비 효과를 집단별로 나누어 보면, 증차의 편익은 대기 시간 38분을 줄이는 데 집중된다. 두 정책의 우열은 단일 지표로 가릴 수 없으며, 어떤 가치를 우선하는지에 따라 달라진다.",
      "이 글은 증차를 우선하자는 쪽에 선다. 그 선택에는 분명한 반대급부가 있다. 요금 인하를 미루면 저소득층의 월 부담이 계속되고, 이는 증차의 편익만큼이나 실제적인 손실이다. 그럼에도 심야 노동자의 대기 시간이 생계와 안전에 직결된다는 점을 고려하면, 두 사업을 맞바꿀 수는 없다. 다만 증차가 요금 문제를 해결하지 못한다는 점도 인정해야 한다. 따라서 이 글은 증차를 먼저 시행하되, 요금 인하를 2년 안에 검토하는 조건을 함께 제안한다. 양립이 어려운 두 요구를 한꺼번에 약속하지 않는 것이 이 제안의 정직성이다.",
    ],
    pt: "No ano que vem, a cidade precisa destinar o orçamento de transportes a uma das duas medidas: aumentar a frota de ônibus noturnos ou reduzir a tarifa. As duas disputam o mesmo orçamento, mas os efeitos atingem públicos diferentes. O aumento da frota melhora o acesso nas áreas periféricas que as linhas atuais não alcançam, enquanto a redução da tarifa alivia o custo dos cidadãos que já usam ônibus. Com o orçamento fixo, não é possível obter os dois efeitos ao mesmo tempo. Portanto, o centro da comparação é qual grupo tem o problema mais urgente e se o efeito justifica o custo. Sob essa perspectiva, as duas políticas miram resultados diferentes com o mesmo orçamento. Segundo os dados, os trabalhadores noturnos esperam, em média, 38 minutos a mais antes de pegar o primeiro ônibus. O direito de circulação desse grupo depende mais da frequência do que da tarifa. Já a redução da tarifa beneficia todos os usuários, mas a economia por pessoa fica em torno de 6.000 won por mês. O custo do aumento da frota chega ao triplo do da redução tarifária. Olhando apenas o fato de que custa mais, o aumento da frota parece estar em desvantagem. No entanto, ao dividir o custo-benefício por grupo, o ganho do aumento da frota se concentra na redução de 38 minutos de espera. A superioridade das duas políticas não pode ser decidida por um único indicador e depende de qual valor se prioriza. Este texto toma partido pela prioridade ao aumento da frota. Essa escolha tem uma contrapartida clara. Adiar a redução da tarifa mantém o custo mensal das famílias de baixa renda, e essa é uma perda tão real quanto o benefício do aumento da frota. Ainda assim, considerando que o tempo de espera dos trabalhadores noturnos está ligado diretamente ao sustento e à segurança, não se pode simplesmente trocar uma medida pela outra. É preciso admitir também que o aumento da frota não resolve o problema da tarifa. Por isso, o texto propõe executar primeiro o aumento da frota e incluir a condição de rever a redução tarifária em até dois anos. A honestidade dessa proposta está em não prometer ao mesmo tempo duas exigências difíceis de conciliar.",
    objective: "Reconhecer onde o texto contrasta, onde concede e como a concessão preserva a tese.",
  },
  reusedIds: ["ko:관점", "ko:결과", "ko:편익", "ko:단계"],
  grammar: [
    [
      "-ㄴ/는 반면 — enquanto, por outro lado",
      "동사 + -는 반면 / 형용사 + -(으)ㄴ 반면 / 명사 + 인 반면",
      "Compara dois fatos que apresentam lados opostos, sem necessariamente estabelecer hierarquia entre eles. É comum na escrita analítica e jornalística. Compare com -ㄴ/는 데 반해, mais formal e mais atento ao desequilíbrio entre os lados; -는 반면 é mais neutro e pode apenas justapor vantagens e desvantagens. Não use quando os dois fatos não são comparáveis pela mesma dimensão.",
      [
        ["증차는 접근성을 넓히는 반면, 요금 인하는 기존 이용자의 부담을 줄인다.", "O aumento da frota amplia o acesso, enquanto a redução da tarifa alivia o custo dos usuários atuais."],
        ["비용은 크게 늘어난 반면, 대기 시간은 조금밖에 줄지 않았다.", "O custo aumentou muito, enquanto o tempo de espera diminuiu apenas um pouco."],
      ],
    ],
    [
      "-ㄹ지라도 — mesmo que",
      "동사/형용사 + -ㄹ지라도",
      "Introduz uma concessão forte: admite a hipótese mais desfavorável e mantém a posição principal. É mais enfático que -아/어도 e aparece sobretudo na escrita argumentativa. Compare com -ㄴ/는 반면, que apenas contrasta; -ㄹ지라도 cria um obstáculo que a tese atravessa. A oração seguinte pode ser uma afirmação, um pedido ou uma recomendação; o que a define é manter a posição apesar da hipótese adversa.",
      [
        ["비용이 든다 할지라도, 야간 노동자의 이동권을 먼저 봐야 한다.", "Mesmo que custe, é preciso priorizar o direito de circulação dos trabalhadores noturnos."],
        ["결과가 예상과 다를지라도, 절차를 공개해야 한다.", "Mesmo que o resultado seja diferente do esperado, o procedimento deve ser divulgado."],
      ],
    ],
  ],
  guided: [
    mcq("Qual é a principal diferença entre as duas medidas?", ["Uma amplia o acesso de quem não é atendido; a outra reduz o custo de quem já usa.", "Uma aumenta a tarifa para todos; a outra reduz a frota de ônibus.", "As duas beneficiam exatamente o mesmo grupo de usuários."], "Uma amplia o acesso de quem não é atendido; a outra reduz o custo de quem já usa.", "O texto contrasta acesso para áreas periféricas com alívio tarifário para usuários atuais."),
    cloze("Complete o contraste: 증차는 접근성을 넓히는 ___ 요금 인하는 부담을 줄인다.", "반면", "-ㄴ/는 반면 justapõe dois lados opostos na mesma dimensão."),
    listen("Ouça e escreva a concessão que mantém a prioridade.", "비용이 든다 할지라도 야간 노동자의 이동권을 먼저 봐야 한다.", "비용이 든다 할지라도 야간 노동자의 이동권을 먼저 봐야 한다.", "Mesmo que custe, é preciso priorizar o direito de circulação dos trabalhadores noturnos."),
    reading("증차 비용은 요금 인하의 세 배에 이른다. 여기서 비용이 크다는 사실만 보면 증차가 열세로 보인다. 그러나 비용 대비 효과를 집단별로 나누어 보면, 증차의 편익은 대기 시간 38분을 줄이는 데 집중된다.", "Por que o texto não conclui que o aumento da frota é inferior?", ["Porque o custo-benefício deve ser examinado por grupo, não por um único indicador.", "Porque o aumento da frota é mais barato do que parece.", "Porque a redução tarifária não tem nenhum efeito."], "Porque o custo-benefício deve ser examinado por grupo, não por um único indicador.", "O texto reconhece o custo maior, mas distribui o benefício por grupo afetado."),
    translate("pt-ko", "Traduza: “Mesmo que o custo aumente, a frequência deve vir primeiro.”", "비용이 늘어날지라도 배차를 먼저 봐야 한다.", "-ㄹ지라도 introduz a concessão forte que preserva a tese.", ["비용이 늘어난다 할지라도 배차를 우선해야 한다."]),
  ],
  independent: [
    mcq("Qual frase usa -ㄹ지라도 corretamente?", ["결과가 좋지 않을지라도 절차는 공개해야 한다.", "결과가 좋지 않을지라도 절차가 공개해 주세요.", "결과가 좋지 않을지라도 절차를 공개해야 한다면이다."], "결과가 좋지 않을지라도 절차는 공개해야 한다.", "-ㄹ지라도 liga uma concessão a uma posição mantida; a oração seguinte pode ser afirmação, pedido ou recomendação, desde que a forma esteja correta."),
    cloze("Complete a concessão: 비용이 크다 ___ 요금 인하를 완전히 포기할 수는 없다.", "할지라도", "A forma -ㄹ지라도 admite a objeção sem abandonar a posição."),
    listen("Ouça e escreva a contrapartida reconhecida pelo texto.", "요금 인하를 미루면 저소득층의 부담이 계속된다는 점도 인정해야 한다.", "요금 인하를 미루면 저소득층의 부담이 계속된다는 점도 인정해야 한다.", "É preciso admitir também que adiar a redução da tarifa mantém o custo para as famílias de baixa renda."),
    translate("ko-pt", "Traduza: 두 정책의 우열은 단일 지표로 가릴 수 없다.", "A superioridade das duas políticas não pode ser decidida por um único indicador.", "우열 = superioridade/inferioridade; 단일 지표 = indicador único.", ["Não é possível determinar qual das duas políticas é melhor com um único indicador."]),
    reading("이 글은 증차를 우선하자는 쪽에 선다. 그 선택에는 분명한 반대급부가 있다. 요금 인하를 미루면 저소득층의 월 부담이 계속되고, 이는 증차의 편익만큼이나 실제적인 손실이다.", "Como o texto trata o custo da opção que defende?", ["Reconhece a contrapartida antes de manter a escolha.", "Nega que a redução tarifária tenha beneficiários.", "Abandona a defesa do aumento da frota."], "Reconhece a contrapartida antes de manter a escolha.", "A concessão admite a perda real e ainda sustenta a prioridade."),
  ],
  summary: [
    "Contraste compara; concessão admite um custo sem abandonar a tese.",
    "-ㄴ/는 반면 justapõe dois lados opostos e é mais neutro que -ㄴ/는 데 반해.",
    "-ㄹ지라도 introduz a hipótese mais desfavorável e mantém a posição principal.",
    "Uma concessão completa tem fato admitido, limite do fato e razão que sustenta a escolha.",
    "Conteúdo novo permanece em revisão.",
  ],
  production: production(
    "Produção independente · defender com concessão",
    "Escolha duas opções que disputam o mesmo recurso — tempo, orçamento ou atenção. Compare-as com um contraste explícito, defenda uma delas e reconheça uma contrapartida real antes de explicar por que a escolha se mantém.",
    "대조와 양보를 사용해 한쪽 선택을 변호해 보세요.",
    ["Apresente as duas opções pela mesma dimensão de comparação.", "Use -ㄴ/는 반면 uma vez para o contraste.", "Use -ㄹ지라도 uma vez para a concessão.", "Nomeie uma perda concreta da opção defendida.", "Explique por que essa perda não anula a escolha."],
    ["Duas opções comparadas pela mesma régua.", "Contraste explícito.", "Concessão com perda concreta.", "Tese mantida depois da concessão.", "Fechamento sem prometer o impossível."],
    "우리 팀은 남은 예산을 교육 프로그램과 장비 교체 가운데 한 곳에만 쓸 수 있다. 교육 프로그램은 신입 인력의 적응을 돕는 반면, 장비 교체는 작업 속도를 높인다. 신입 인력은 최근 석 달 동안 두 배로 늘었고, 교육 없이 투입되면 오류가 반복될 가능성이 크다. 장비가 낡아 생기는 지연도 무시할 수 없지만, 교육 부재는 사람과 관계된 문제라 회복에 더 오래 걸린다. 물론 교육에 예산을 쓰면 장비 교체는 내년으로 미뤄진다. 그동안 유지 보수 비용이 더 들 수 있다는 점은 분명한 반대급부다. 그렇다 할지라도, 새 인력이 기본 절차를 익히지 못한 채 일하는 위험이 더 크다고 판단한다. 따라서 교육을 먼저 시행하되, 장비 상태를 분기마다 점검해 교체 시점을 다시 계산할 것을 제안한다. 두 요구를 동시에 해결할 수 없다는 사실을 숨기지 않는 것이 이 제안의 조건이다.",
    "Nossa equipe só pode usar o orçamento restante em um dos dois: programa de formação ou troca de equipamentos. O programa de formação ajuda a adaptação dos novos funcionários, enquanto a troca de equipamentos aumenta a velocidade do trabalho. O número de novos funcionários dobrou nos últimos três meses, e, se forem colocados a trabalhar sem formação, a probabilidade de erros repetidos é grande. O atraso causado por equipamentos velhos também não pode ser ignorado, mas a falta de formação é um problema ligado às pessoas e leva mais tempo para ser revertido. É claro que, se usarmos o orçamento na formação, a troca de equipamentos ficará para o ano que vem. O fato de os custos de manutenção poderem aumentar nesse meio-tempo é uma contrapartida clara. Mesmo assim, julgo maior o risco de os novos funcionários trabalharem sem dominar os procedimentos básicos. Por isso, proponho executar primeiro a formação e revisar o estado dos equipamentos a cada trimestre, recalculando o momento da troca. Não esconder que as duas exigências não podem ser resolvidas ao mesmo tempo é a condição desta proposta.",
    "Exemplo original de oito frases. Observe o contraste, a perda admitida e a razão que mantém a escolha. Exemplo ilustrativo; não é gabarito.",
  ),
});

/** c1-l25 — precisão lexical, colocação e implicação. */
export const C1_L25 = defineC1Lesson({
  id: "c1-l25", number: 25, moduleId: "c1-m05", title: "Precisão e sinonímia",
  objective: "Escolher entre palavras próximas considerando colocação, registro e implicação.",
  prerequisites: ["c1-l24"], estimatedMinutes: 80, dialogueTitle: "Duas palavras, duas responsabilidades",
  intro: [
    {
      title: "Sinônimos não são intercambiáveis",
      body: "Duas palavras podem compartilhar o sentido geral e divergir na colocação, no registro e na implicação. “Apontar” e “denunciar” podem descrever o mesmo gesto, mas o segundo acrescenta uma acusação moral. “Reduzir” e “cortar” podem indicar a mesma mudança numérica, mas o segundo sugere decisão abrupta. A precisão lexical não é preciosismo: é o que permite ao leitor saber de que ação se está falando e quem deve responder por ela.",
      ko: "비슷한 뜻의 단어라도 어감과 함의가 다르면 문장의 책임 범위도 달라진다.",
    },
    {
      title: "Colocação denuncia o texto traduzido",
      body: "Cada língua combina palavras de modo próprio. Em português dizemos “tomar uma decisão”; em coreano, 결정을 내리다, não 결정을 하다 em todos os contextos. Uma colocação inadequada não impede a compreensão, mas faz o leitor desconfiar da fluência de quem escreve. Revisar colocações exige ler o texto em blocos, não palavra por palavra: o verbo certo depende do substantivo, do registro e da intenção. Quando a combinação soa estranha, muitas vezes o problema não é a palavra isolada, mas a parceria entre duas palavras.",
      ko: "정확한 어휘를 고르는 일은 개별 단어의 뜻을 아는 데 그치지 않고, 함께 쓰이는 표현을 점검하는 일이다.",
    },
  ],
  dialogue: [
    ["혜린", "이 문장에서 ‘비난했다’와 ‘비판했다’ 중에 어느 쪽이 맞을까요?", "Nesta frase, qual é o certo: ‘condenou’ ou ‘criticou’?"],
    ["태오", "자료를 보면 상대의 주장을 평가한 것이지, 인격을 공격한 건 아니에요.", "Pelo material, ele avaliou o argumento do outro, não atacou a pessoa."],
    ["혜린", "그러면 ‘비난했다’는 감정적이고, ‘비판했다’가 더 정확하겠네요.", "Então ‘condenou’ é emocional, e ‘criticou’ é mais preciso."],
    ["태오", "네. ‘비난’은 도덕적 책임을 묻는 어감이 강해서, 근거가 없으면 과장으로 읽힙니다.", "Sim. ‘Condenar’ tem uma carga forte de cobrança moral; sem evidência, soa exagerado."],
    ["혜린", "그리고 ‘거부했다’와 ‘거절했다’도 구분해야 해요.", "E também precisamos distinguir ‘rejeitou’ e ‘recusou’."],
    ["태오", "‘거부’는 원칙이나 권한에 대한 거부에 가깝고, ‘거절’은 제안이나 요청을 받아들이지 않는 쪽이에요.", "‘Rejeitar’ se aproxima de recusa de princípio ou de autoridade; ‘recusar’ é não aceitar uma proposta ou pedido."],
    ["혜린", "그럼 제목의 ‘지원금 거부’는 너무 강하게 들릴 수 있겠네요.", "Então ‘recusa do auxílio’ no título pode soar forte demais."],
    ["태오", "맞아요. ‘신청 철회’로 바꾸면 사실은 유지하면서 책임의 강도는 낮아집니다.", "Exato. Trocando por ‘retirada da solicitação’, mantém-se o fato e se reduz a intensidade da responsabilidade."],
  ],
  readingText: {
    titlePt: "O mesmo fato, outra acusação",
    paragraphs: [
      "초안의 첫 문장은 “시가 복지 예산을 삭감하자 지역 단체들이 강하게 비난했다”였다. 문장 자체는 틀리지 않았지만, ‘비난’은 도덕적 잘못을 전제하는 어감을 지닌다. 원자료에는 단체가 “예산 배분의 근거를 공개하라”고 요구했다는 내용만 있었다. 즉 단체의 행위는 비판이나 요구였지, 인격적 비난은 아니었다. ‘삭감’ 역시 실제 변화가 3퍼센트 감소였음을 고려하면 과도하게 강한 표현이었다. 이 두 단어만 바꾸어도 독자가 느끼는 갈등의 크기는 달라진다.",
      "둘째 문제는 ‘거부’와 ‘철회’의 혼동이었다. 시는 단체의 제안을 ‘거부’한 것이 아니라, 검토 일정을 다음 달로 미루겠다고 밝혔다. ‘거부’는 원칙적인 반대를 함축하고, ‘유보’는 판단을 잠시 미룬다는 뜻이다. 이 차이를 무시하면 시의 태도가 실제보다 강경하게 보인다. 마지막으로 ‘미흡하다’와 ‘부족하다’도 구분할 필요가 있다. ‘미흡’은 기준에 못 미친다는 평가이고, ‘부족’은 양이나 정도가 모자라다는 기술이다. 기준이 명시되지 않은 문장에서 ‘미흡’을 쓰면, 누가 어떤 기준으로 판단했는지가 막연해진다.",
      "수정된 문장은 다음과 같다. “시가 복지 예산을 3퍼센트 줄이자 지역 단체들은 배분 근거를 공개하라고 요구했다. 시는 제안 검토를 다음 달로 미루겠다고 밝혔다. 단체는 예산 규모가 기준에 못 미친다고 지적했다.” 이 버전은 사실을 유지하면서 책임의 강도를 조정한다. ‘비난’ 대신 ‘요구’, ‘거부’ 대신 ‘유보’, ‘미흡’ 대신 ‘기준에 못 미친다’를 쓴 결과, 독자는 갈등의 원인을 더 정확히 파악할 수 있다. 정확한 어휘는 문장을 약하게 만드는 것이 아니라, 설득력을 높이는 조건이다.",
    ],
    pt: "A primeira frase do rascunho era “quando a cidade cortou o orçamento de assistência social, entidades locais o condenaram duramente”. A frase em si não estava errada, mas ‘condenar’ tem uma carga que pressupõe uma falta moral. No material original, havia apenas o registro de que as entidades exigiram “a divulgação dos critérios de distribuição do orçamento”. Ou seja, o ato das entidades foi uma crítica ou uma exigência, não uma condenação pessoal. ‘Corte’ também era uma expressão forte demais, considerando que a mudança real foi uma redução de 3%. Só trocando essas duas palavras, o tamanho do conflito percebido pelo leitor muda. O segundo problema era a confusão entre ‘recusa’ e ‘retirada’. A cidade não ‘recusou’ a proposta das entidades; informou que adiaria a análise para o mês seguinte. ‘Recusa’ implica oposição de princípio, e ‘reserva’ significa adiar a decisão por um tempo. Ignorar essa diferença faz a atitude da cidade parecer mais rígida do que foi. Por fim, é preciso distinguir ‘insuficiente’ e ‘escasso’. ‘Insuficiente’ é uma avaliação de que algo não atingiu um critério; ‘escasso’ descreve que a quantidade ou o grau é pequeno. Ao usar ‘insuficiente’ numa frase em que o critério não está explícito, fica vago quem julgou e com base em quê. A frase revisada é a seguinte: “Quando a cidade reduziu o orçamento de assistência social em 3%, entidades locais exigiram a divulgação dos critérios de distribuição. A cidade informou que adiaria a análise da proposta para o mês seguinte. As entidades apontaram que o volume do orçamento não atingia o critério.” Essa versão mantém os fatos e ajusta a intensidade da responsabilidade. Ao usar ‘exigência’ em vez de ‘condenação’, ‘reserva’ em vez de ‘recusa’ e ‘não atingia o critério’ em vez de ‘insuficiente’, o leitor consegue identificar com mais precisão a causa do conflito. O léxico preciso não enfraquece a frase: é uma condição para aumentar seu poder de persuasão.",
    objective: "Comparar o parágrafo original e a versão revisada e justificar cada troca lexical.",
  },
  reusedIds: ["ko:설득력", "ko:독자", "ko:미흡하다", "ko:예산"],
  grammar: [
    [
      "-ㄴ/는 것과는 거리가 멀다 — está longe de",
      "동사 + -는 것과는 거리가 멀다 / 형용사 + -(으)ㄴ 것과는 거리가 멀다 / 명사 + 과는 거리가 멀다",
      "Nega com força que uma descrição corresponda ao que se afirma, sobretudo quando há uma expectativa contrária. É comum em críticas e revisões. Compare com -지 않다, que apenas nega; -ㄴ/는 것과는 거리가 멀다 rejeita a própria adequação da caracterização. Não use para fatos simples do cotidiano, em que a negação direta é mais natural.",
      [
        ["‘비난했다’는 표현은 중립적이라는 것과는 거리가 멀다.", "A expressão ‘condenou’ está longe de ser neutra."],
        ["이 문장은 정확한 어휘를 쓴 것과는 거리가 멀다.", "Esta frase está longe de usar um léxico preciso."],
      ],
    ],
    [
      "-ㄹ 필요가 있다 — é preciso",
      "동사 + -ㄹ 필요가 있다",
      "Indica necessidade de modo mais brando e impessoal que -아/어야 한다. É frequente em recomendações editoriais, relatórios e textos acadêmicos. Compare com -아/어야 한다, que soa mais direto e pode soar como ordem; -ㄹ 필요가 있다 apresenta a medida como condição razoável. Pode vir com 또한, 먼저 ou 문장 차원에서 para localizar a necessidade.",
      [
        ["‘거부’와 ‘유보’의 차이를 구분할 필요가 있다.", "É preciso distinguir a diferença entre ‘recusa’ e ‘reserva’."],
        ["제목을 다시 쓸 필요가 있다.", "É preciso reescrever o título."],
      ],
    ],
  ],
  guided: [
    mcq("Por que ‘비난했다’ foi substituído por ‘요구했다’?", ["Porque ‘비난’ pressupõe falta moral, e o material registrava apenas uma exigência.", "Porque ‘비난’ é uma palavra informal demais para o texto.", "Porque o material não mencionava as entidades."], "Porque ‘비난’ pressupõe falta moral, e o material registrava apenas uma exigência.", "A troca ajusta a implicação do verbo ao ato que realmente ocorreu."),
    cloze("Complete a análise da implicação: ‘비난했다’는 표현은 중립적이라는 것과는 ___.", "거리가 멀다", "-ㄴ/는 것과는 거리가 멀다 rejeita a adequação da caracterização."),
    listen("Ouça e escreva a diferença entre recusa e reserva.", "‘거부’는 원칙적인 반대를 함축하고, ‘유보’는 판단을 잠시 미룬다는 뜻이다.", "‘거부’는 원칙적인 반대를 함축하고, ‘유보’는 판단을 잠시 미룬다는 뜻이다.", "‘Recusa’ implica oposição de princípio, e ‘reserva’ significa adiar a decisão por um tempo."),
    reading("‘삭감’ 역시 실제 변화가 3퍼센트 감소였음을 고려하면 과도하게 강한 표현이었다. 이 두 단어만 바꾸어도 독자가 느끼는 갈등의 크기는 달라진다.", "O que a troca de ‘삭감’ por uma expressão mais precisa altera?", ["A intensidade do conflito percebido pelo leitor.", "O valor real da redução orçamentária.", "O número de entidades citadas."], "A intensidade do conflito percebido pelo leitor.", "A palavra não muda o dado, mas muda a carga que o leitor atribui a ele."),
    translate("pt-ko", "Traduza: “É preciso distinguir a diferença entre as duas palavras.”", "두 단어의 차이를 구분할 필요가 있다.", "-ㄹ 필요가 있다 apresenta a necessidade de modo brando e impessoal.", ["두 단어의 차이를 구별할 필요가 있다."]),
  ],
  independent: [
    mcq("Qual troca preserva o fato e reduz a intensidade da acusação?", ["‘거부했다’ → ‘검토를 미뤘다’", "‘요구했다’ → ‘비난했다’", "‘줄였다’ → ‘삭감했다’"], "‘거부했다’ → ‘검토를 미뤘다’", "A troca descreve o ato real sem atribuir oposição de princípio."),
    cloze("Complete a recomendação editorial: 제목을 다시 쓸 ___ 있다.", "필요가", "A forma é -ㄹ 필요가 있다, recomendação impessoal."),
    listen("Ouça e escreva o efeito de uma colocação inadequada.", "어색한 표현은 이해를 막지는 않지만, 글의 신뢰를 떨어뜨린다.", "어색한 표현은 이해를 막지는 않지만, 글의 신뢰를 떨어뜨린다.", "Uma expressão estranha não impede a compreensão, mas reduz a confiança no texto."),
    translate("ko-pt", "Traduza: 정확한 어휘는 문장을 약하게 만드는 것이 아니라 설득력을 높이는 조건이다.", "O léxico preciso não enfraquece a frase: é uma condição para aumentar seu poder de persuasão.", "설득력 = poder de persuasão; a frase rejeita a ideia de que precisão enfraquece.", ["Um vocabulário preciso não torna a frase fraca; é condição para torná-la mais persuasiva."]),
    reading("‘미흡’은 기준에 못 미친다는 평가이고, ‘부족’은 양이나 정도가 모자라다는 기술이다. 기준이 명시되지 않은 문장에서 ‘미흡’을 쓰면, 누가 어떤 기준으로 판단했는지가 막연해진다.", "Qual é o risco de usar ‘미흡’ sem critério explícito?", ["Tornar vago quem julgou e com base em qual critério.", "Indicar que a quantidade é pequena.", "Descrever apenas a opinião do leitor."], "Tornar vago quem julgou e com base em qual critério.", "‘미흡’ pressupõe um critério; sem ele, a avaliação perde responsável."),
  ],
  summary: [
    "Sinônimos próximos divergem em colocação, registro e implicação.",
    "-ㄴ/는 것과는 거리가 멀다 rejeita a adequação de uma caracterização, não apenas o fato.",
    "-ㄹ 필요가 있다 recomenda de modo impessoal, sem o tom direto de -아/어야 한다.",
    "Revisar léxico é ajustar a responsabilidade que cada palavra atribui.",
    "Conteúdo novo permanece em revisão.",
  ],
  production: production(
    "Produção independente · revisar cinco escolhas lexicais",
    "Pegue um parágrafo seu ou de um texto público e revise cinco escolhas lexicais. Para cada troca, diga o que a palavra original implicava e por que a nova é mais precisa.",
    "다섯 개의 어휘 선택을 근거와 함께 고쳐 보세요.",
    ["Apresente o trecho original antes de revisar.", "Troque ao menos um verbo de atribuição por outro mais preciso.", "Troque uma palavra que exagera a responsabilidade.", "Use -ㄴ/는 것과는 거리가 멀다 uma vez.", "Use -ㄹ 필요가 있다 uma vez.", "Justifique cada troca por colocação, registro ou implicação."],
    ["Trecho original identificado.", "Cinco trocas justificadas.", "Uma troca de verbo de atribuição.", "Uma redução de exagero.", "Uso das duas formas-alvo.", "Versão final coerente."],
    "원문은 “시가 예산을 삭감하자 단체들이 강하게 비난했다”였다. 먼저 ‘삭감’을 ‘3퍼센트 줄였다’로 바꾸었다. 실제 변화가 작은데 ‘삭감’은 급격한 결정을 함축하기 때문이다. 둘째, ‘비난했다’를 ‘근거 공개를 요구했다’로 고쳤다. 자료에는 인격적 공격이 아니라 요구만 담겨 있었다. 셋째, ‘강하게’를 삭제했다. 강도는 행위 자체보다 감정을 앞세우는 부사여서 근거 없이 갈등을 키웠다. 넷째, ‘단체들이’를 ‘지역 단체 세 곳이’로 바꾸었다. 주체의 범위를 분명히 할 필요가 있다. 다섯째, ‘예산이 부족하다’를 ‘예산이 기준에 못 미친다’로 고쳤다. 기준 없는 평가를 피하기 위해서다. 이 수정은 사건을 약하게 만드는 것과는 거리가 멀다. 오히려 독자가 갈등의 원인을 정확히 이해하도록 돕는다.",
    "O texto original era “quando a cidade cortou o orçamento, as entidades o condenaram duramente”. Primeiro, troquei ‘cortou’ por ‘reduziu em 3%’. A mudança real era pequena, e ‘cortou’ implica uma decisão abrupta. Segundo, troquei ‘condenaram’ por ‘exigiram a divulgação dos critérios’. O material continha apenas uma exigência, não um ataque pessoal. Terceiro, apaguei ‘duramente’. A intensidade era um advérbio que colocava a emoção à frente do ato e aumentava o conflito sem evidência. Quarto, troquei ‘as entidades’ por ‘três entidades locais’. É preciso deixar claro o alcance do sujeito. Quinto, troquei ‘o orçamento é insuficiente’ por ‘o orçamento não atinge o critério’. Para evitar uma avaliação sem critério. Essa revisão está longe de enfraquecer o incidente. Pelo contrário, ajuda o leitor a entender com precisão a causa do conflito.",
    "Exemplo original de oito frases. Observe as cinco trocas justificadas por implicação e colocação. Exemplo ilustrativo; não é gabarito.",
  ),
});
