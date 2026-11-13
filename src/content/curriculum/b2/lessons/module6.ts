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

/** b2-l26 — condições e limites de negociação. */
export const B2_L26 = defineB2Lesson({
  id: "b2-l26", number: 26, moduleId: "b2-m06", title: "Vamos negociar",
  objective: "Negociar condições e apresentar uma oferta com limites claros.",
  prerequisites: ["b2-c05"], estimatedMinutes: 75, dialogueTitle: "A renovação do aluguel",
  intro: [
    { title: "Sob a condição de", body: "-는 조건으로 significa “sob a condição de...”. Apresenta uma oferta que só vale se a outra parte aceitar o limite. Compare com -는 대신(에) (em troca de) e -기로 하다 (decidir). Registro: neutro a formal, comum em contratos e negociações.", ko: "2년 갱신하는 조건으로 제안했어요." },
    { title: "A menos que", body: "-지 않는 이상 significa “a menos que...”. A condição negativa funciona como limite: se não acontecer, o resultado não vale. Compare com -지 않으면 (se não) e -는 한 (enquanto). Registro: neutro a formal.", ko: "한 달 전에 알리지 않는 이상 해지가 어려워요." },
  ],
  dialogue: [
    ["아나", "집주인이 월세를 얼마나 올리겠대요?", "Quanto o locador quer aumentar o aluguel?"],
    ["민수", "10%요. 저는 너무 크다고 느꼈어요. 중개인은 최근 거래를 근거로 제시했지만, 모두 같은 조건은 아니었어요.", "Dez por cento. Achei grande demais. O corretor apresentou transações recentes como base, mas nem todas tinham as mesmas condições."],
    ["아나", "계약 조항은 확인했어요?", "Você conferiu as cláusulas do contrato?"],
    ["민수", "네. 갱신과 해지 조항을 읽었어요. 해지는 한 달 전에 알려야 하고, 위약금도 있어요.", "Sim. Li as cláusulas de renovação e rescisão. A rescisão exige aviso com um mês de antecedência, e há multa."],
    ["아나", "그럼 어떻게 제안할 거예요?", "Então como vai propor?"],
    ["민수", "2년 갱신하는 조건으로 인상을 5%로 낮춰 달라고 할 거예요. 상한선을 정하는 건 어렵겠지만, 두 달 전 통보는 요구할 수 있어요.", "Vou pedir para baixar o aumento para 5% sob a condição de renovar por dois anos. Definir um teto será difícil, mas posso pedir aviso com dois meses de antecedência."],
    ["아나", "집주인이 거절하면요?", "E se o locador recusar?"],
    ["민수", "그때는 다른 조건을 논의하죠. 한 달 전에 알리지 않는 이상 해지가 어렵다는 점도 설명할 거예요.", "Aí discutimos outras condições. Também vou explicar que, a menos que eu avise com um mês de antecedência, a rescisão é difícil."],
    ["아나", "좋아요. 감정보다 조건을 중심으로 이야기하세요.", "Bom. Fale com base em condições, não em emoções."],
  ],
  readingText: {
    titlePt: "Condições que podem ser cumpridas",
    paragraphs: [
      "임차인은 계약 갱신을 앞두고 월세 인상 폭이 너무 크다고 느꼈다. 임대인은 시장 가격을 이유로 들었고, 중개인은 최근 거래를 근거로 제시했다. 양쪽은 조건을 다시 논의하기로 했다.",
      "임차인은 한 달 전 통보라는 해지 조항을 확인하고, 위약금과 갱신 조건을 문서로 요구했다. 임대인은 일부 조정은 가능하지만, 상한선을 정하는 것은 어렵다고 답했다.",
      "결국 임차인은 2년 갱신과 두 달 전 통보를 조건으로 제안했다. 임대인은 그 조건으로 협의를 계속하기로 했다. 좋은 협상은 한쪽의 승리가 아니라, 지킬 수 있는 조건을 만드는 일이다. 조건을 글로 남기면 나중에 해석 차이를 줄일 수 있다. 그것이 신뢰다.",
    ],
    pt: "O inquilino, às vésperas da renovação, sentiu que o aumento do aluguel era grande demais. O locador alegou o preço de mercado, e o corretor apresentou transações recentes como base. Os dois lados decidiram discutir as condições de novo. O inquilino conferiu a cláusula de rescisão, que exigia aviso com um mês de antecedência, e pediu por escrito as condições de multa e renovação. O locador respondeu que algum ajuste era possível, mas que definir um teto seria difícil. No fim, o inquilino propôs renovar por dois anos, com aviso prévio de dois meses, como condição. O locador concordou em continuar a negociação nesses termos. Uma boa negociação não é a vitória de um lado, mas a construção de condições que possam ser cumpridas.",
    objective: "Identificar oferta, condição, limite e o que cada parte pode cumprir.",
  },
  reusedIds: ["ko:계약", "ko:조건", "ko:월세"],
  grammar: [
    ["-는 조건으로 — sob a condição de", "동사 + -는 조건으로 / 명사 + 의 조건으로", "Significa “sob a condição de...”. Apresenta uma oferta que só vale se a outra parte aceitar o limite. Compare com -는 대신(에) (em troca de) e -기로 하다 (decidir). Registro: neutro a formal, comum em contratos e negociações.", [["2년 갱신하는 조건으로 제안했어요.", "Propûs sob a condição de renovar por dois anos."], ["보증금을 낮추는 조건으로 계약을 연장했습니다.", "Prorroguei o contrato sob a condição de reduzir o depósito."]]],
    ["-지 않는 이상 — a menos que", "동사/형용사 + -지 않는 이상", "Significa “a menos que...”. A condição negativa funciona como limite: se não acontecer, o resultado não vale. Compare com -지 않으면 (se não) e -는 한 (enquanto). Registro: neutro a formal.", [["한 달 전에 알리지 않는 이상 해지가 어려워요.", "A menos que avise com um mês de antecedência, a rescisão é difícil."], ["예산이 늘지 않는 이상 일정을 앞당길 수 없습니다.", "A menos que o orçamento aumente, não é possível adiantar o cronograma."]]],
  ],
  guided: [
    mcq("Qual condição o inquilino propôs?", ["Renovar por dois anos em troca de aumento menor.", "Sair imediatamente sem multa.", "Pagar dois aluguéis adiantados."], "Renovar por dois anos em troca de aumento menor.", "2년 갱신하는 조건으로 인상을 낮춰 달라고 했어요."),
    cloze("Complete a condição: 2년 갱신하___ 조건으로 제안했어요.", "는", "갱신하는 조건으로 = sob a condição de renovar."),
    listen("Ouça e escreva o limite da rescisão.", "한 달 전에 알리지 않는 이상 해지가 어려워요.", "한 달 전에 알리지 않는 이상 해지가 어려워요.", "A menos que avise com um mês de antecedência, a rescisão é difícil."),
    reading("임차인은 계약 갱신을 앞두고 월세 인상 폭이 너무 크다고 느꼈다. 임대인은 시장 가격을 이유로 들었고, 중개인은 최근 거래를 근거로 제시했다. 양쪽은 조건을 다시 논의하기로 했다.", "Por que houve negociação?", ["Porque o aumento do aluguel parecia grande demais.", "Porque o contrato terminou sem aviso.", "Porque o imóvel foi vendido."], "Porque o aumento do aluguel parecia grande demais.", "월세 인상 폭이 너무 크다고 느꼈어요."),
    translate("pt-ko", "Traduza: “Propûs sob a condição de renovar por dois anos.”", "2년 갱신하는 조건으로 제안했어요.", "-는 조건으로 indica a condição da oferta.", ["2년 갱신을 조건으로 제안했습니다."]),
  ],
  independent: [
    mcq("Qual frase expressa uma condição limite?", ["예산이 늘지 않는 이상 일정을 앞당길 수 없어요.", "예산이 늘어서 일정을 앞당겼어요.", "예산이 늘면 좋겠어요."], "예산이 늘지 않는 이상 일정을 앞당길 수 없어요.", "-지 않는 이상 = a menos que."),
    cloze("Complete o limite: 한 달 전에 알리___ 않는 이상 해지가 어려워요.", "지", "알리지 않는 이상 = a menos que avise."),
    listen("Ouça e escreva a condição da renovação.", "2년 갱신하는 조건으로 인상을 낮춰 달라고 했어요.", "2년 갱신하는 조건으로 인상을 낮춰 달라고 했어요.", "Pedi para baixar o aumento sob a condição de renovar por dois anos."),
    translate("ko-pt", "Traduza: 좋은 협상은 한쪽의 승리가 아니라 지킬 수 있는 조건을 만드는 일이에요.", "Uma boa negociação não é a vitória de um lado, mas a construção de condições que possam ser cumpridas.", "승리 = vitória; 지킬 수 있는 = que se pode cumprir.", ["Negociar bem é criar condições cumpríveis, não vencer sozinho."]),
    reading("결국 임차인은 2년 갱신과 두 달 전 통보를 조건으로 제안했다. 임대인은 그 조건으로 협의를 계속하기로 했다. 좋은 협상은 한쪽의 승리가 아니라, 지킬 수 있는 조건을 만드는 일이다. 조건을 글로 남기면 나중에 해석 차이를 줄일 수 있다. 그것이 신뢰다.", "O que caracteriza uma boa negociação?", ["Criar condições que ambas as partes possam cumprir.", "Ganhar a qualquer custo.", "Evitar falar de limites."], "Criar condições que ambas as partes possam cumprir.", "지킬 수 있는 조건을 만드는 일."),
  ],
  summary: ["-는 조건으로 apresenta a condição da oferta.", "-지 않는 이상 estabelece um limite negativo.", "Negociação boa produz condições cumpríveis.", "Conteúdo novo permanece em revisão."],
  production: production(
    "Produção independente · contraproposta",
    "Escreva uma contraproposta de cinco a sete frases para um contrato ou acordo. Inclua o que você oferece, o que pede e o limite que não aceita.",
    "계약이나 합의에 대한 대안을 제안해 보세요.",
    ["Resuma a proposta atual.", "Diga o que você oferece.", "Use -는 조건으로 ou -지 않는 이상.", "Nomeie o limite que não aceita."],
    ["Proposta atual resumida.", "Oferta e pedido claros.", "Uma forma da lição.", "Limite explícito.", "Tom negociável."],
    "현재 제안은 월세를 10% 올리는 것이었어요. 저는 2년 갱신하는 조건으로 5% 인상을 제안합니다. 대신 두 달 전에 통보하는 조항을 넣어 주세요. 한 달 전 통보로는 이사 준비가 어렵습니다.",
    "A proposta atual era aumentar o aluguel em 10%. Proponho um aumento de 5% sob a condição de renovar por dois anos. Em troca, inclua a cláusula de aviso com dois meses de antecedência. Com um mês de aviso, é difícil preparar a mudança.",
    "Exemplo original de quatro frases. Oferta, condição e limite aparecem. Compare a estrutura.",
  ),
});

/** b2-l27 — reclamação formal. */
export const B2_L27 = defineB2Lesson({
  id: "b2-l27", number: 27, moduleId: "b2-m06", title: "Uma reclamação formal",
  objective: "Formalizar uma reclamação com fato, pedido, prazo e tom adequado.",
  prerequisites: ["b2-l26"], estimatedMinutes: 75, dialogueTitle: "A entrega errada",
  intro: [
    { title: "Assim que", body: "-는 즉시 significa “assim que...”, em registro formal. Use com verbos de ação e uma oração seguinte que descreve a providência. Compare com -자마자 (oral, imediato) e -고 나서 (depois de). Registro: escrito/formal.", ko: "문제를 발견하는 즉시 알려 주세요." },
    { title: "Solicito que tome providências", body: "-도록 조치해 주시기 바랍니다 é uma fórmula formal de reclamação: “solicito que tome providências para que...”. Compare com -도록 요청하다 (pedir) e -기 바랍니다 (espero que). Use em cartas e e-mails formais, não em conversa cotidiana.", ko: "환불해 주시도록 조치해 주시기 바랍니다." },
  ],
  dialogue: [
    ["지민", "지난달에 주문한 제품이 잘못 왔어요.", "O produto que pedi no mês passado chegou errado."],
    ["수진", "회사에 연락했어요?", "Você entrou em contato com a empresa?"],
    ["지민", "네. 담당자와 통화했지만 처리 기한이 분명하지 않았어요. 그래서 공문을 보내고 접수증을 받았어요.", "Sim. Falei com o responsável, mas o prazo de tratamento não era claro. Então enviei um ofício e recebi o protocolo."],
    ["수진", "회사가 뭐라고 했어요?", "O que a empresa disse?"],
    ["지민", "“불편을 드려 유감”이라고만 했고, 반품과 환불 절차는 미뤘어요.", "Só disseram “lamentamos o incômodo” e adiaram o reembolso."],
    ["수진", "그럼 문서로 요청하세요. 문제를 발견하는 즉시 처리하겠다는 답을 받아야 해요.", "Então peça por escrito. Você precisa receber uma resposta de que tratarão assim que o problema for identificado."],
    ["지민", "변상 기준과 시정 계획도 요구할 거예요.", "Também vou exigir o critério de compensação e um plano de correção."],
    ["수진", "좋아요. “환불해 주시도록 조치해 주시기 바랍니다”라고 쓰고, 기한을 정하세요. 감정보다 사실이 중요해요.", "Bom. Escreva “solicito que tomem providências para o reembolso” e defina um prazo. Fatos importam mais que emoções."],
  ],
  readingText: {
    titlePt: "Reclamar com fatos e prazo",
    paragraphs: [
      "지난달 주문한 제품이 잘못 배송되어 회사에 공문을 보냈다. 담당자와 통화했지만, 처리 기한은 분명하지 않았다. 그래서 접수증과 통화 기록을 남겼다.",
      "회사는 “불편을 드려 유감”이라고 답했지만, 반품과 환불 절차는 미뤘다. 나는 변상 기준과 시정 계획을 문서로 요청했다. 답변이 늦어지면 소비자 보호 기관에 알리겠다고 덧붙였다.",
      "며칠 뒤 회사는 환불과 배상을 약속했다. 문제를 해결하려면 감정보다 사실과 기한이 필요하다. 정중하지만 분명한 요청이 오히려 대화를 앞당겼다. 또한 모든 연락을 문서로 남겼다. 그 기록이 이후 협상에서 도움이 됐다. 감정은 시간이 지나면 약해지지만, 기록은 남는다.",
    ],
    pt: "O produto encomendado no mês passado foi entregue errado, então enviei um ofício à empresa. Falei com o responsável, mas o prazo de tratamento não estava claro. Por isso, guardei o protocolo e o registro da ligação. A empresa respondeu apenas que “lamentava o incômodo” e adiou o procedimento de reembolso. Pedi por escrito o critério de compensação e o plano de correção. Acrescentei que, se a resposta demorasse, informaria o órgão de defesa do consumidor. Alguns dias depois, a empresa prometeu o reembolso e a compensação. Para resolver um problema, fatos e prazos são mais necessários que emoção. Um pedido educado, mas claro, acabou acelerando a conversa.",
    objective: "Identificar fato, pedido, prazo e tom em uma reclamação formal.",
  },
  reusedIds: ["ko:문제", "ko:요청", "ko:처리"],
  grammar: [
    ["-는 즉시 — assim que", "동사 + -는 즉시", "Significa “assim que...”, em registro formal. Use com verbos de ação e uma oração seguinte que descreve a providência. Compare com -자마자 (oral, imediato) e -고 나서 (depois de). Registro: escrito/formal.", [["문제를 발견하는 즉시 알려 주세요.", "Por favor, avise assim que identificar o problema."], ["확인하는 즉시 처리하겠습니다.", "Trataremos assim que confirmarmos."]]],
    ["-도록 조치해 주시기 바랍니다 — solicito providências", "동사 + -도록 조치해 주시기 바랍니다", "Fórmula formal de reclamação: “solicito que tome providências para que...”. Compare com -도록 요청하다 (pedir) e -기 바랍니다 (espero que). Use em cartas e e-mails formais, não em conversa cotidiana. Registro: formal/escrito.", [["환불해 주시도록 조치해 주시기 바랍니다.", "Solicito que tomem providências para o reembolso."], ["문제를 시정하도록 조치해 주시기 바랍니다.", "Solicito que tomem providências para corrigir o problema."]]],
  ],
  guided: [
    mcq("Qual foi o problema inicial?", ["O produto chegou errado.", "A empresa fechou.", "O pagamento não foi feito."], "O produto chegou errado.", "제품이 잘못 배송됐어요."),
    cloze("Complete o prazo formal: 문제를 발견하___ 즉시 알려 주세요.", "는", "발견하는 즉시 = assim que identificar."),
    listen("Ouça e escreva o pedido formal.", "환불해 주시도록 조치해 주시기 바랍니다.", "환불해 주시도록 조치해 주시기 바랍니다.", "Solicito que tomem providências para o reembolso."),
    reading("지난달 주문한 제품이 잘못 배송되어 회사에 공문을 보냈다. 담당자와 통화했지만, 처리 기한은 분명하지 않았다. 그래서 접수증과 통화 기록을 남겼다.", "O que a cliente fez para ter registro?", ["Guardou o protocolo e o registro da ligação.", "Enviou o produto de volta sem aviso.", "Publicou uma reclamação nas redes."], "Guardou o protocolo e o registro da ligação.", "접수증과 통화 기록을 남겼어요."),
    translate("pt-ko", "Traduza: “Solicito que tomem providências para o reembolso.”", "환불해 주시도록 조치해 주시기 바랍니다.", "-도록 조치해 주시기 바랍니다 é fórmula formal.", ["환불해 주시도록 조치해 주십시오."]),
  ],
  independent: [
    mcq("Qual frase usa registro formal de reclamação?", ["문제를 시정하도록 조치해 주시기 바랍니다.", "문제를 고쳐 주세요.", "문제를 빨리 해결해."], "문제를 시정하도록 조치해 주시기 바랍니다.", "-도록 조치해 주시기 바랍니다 é formal."),
    cloze("Complete o imediato formal: 확인하___ 즉시 처리하겠습니다.", "는", "확인하는 즉시 = assim que confirmar."),
    listen("Ouça e escreva a resposta inicial da empresa.", "불편을 드려 유감이라고만 했어요.", "불편을 드려 유감이라고만 했어요.", "Disseram apenas que lamentavam o incômodo."),
    translate("ko-pt", "Traduza: 감정보다 사실과 기한이 중요해요.", "Fatos e prazos são mais importantes que emoções.", "기한 = prazo; 사실 = fato.", ["O fato e o prazo importam mais que a emoção."]),
    reading("며칠 뒤 회사는 환불과 배상을 약속했다. 문제를 해결하려면 감정보다 사실과 기한이 필요하다. 정중하지만 분명한 요청이 오히려 대화를 앞당겼다. 또한 모든 연락을 문서로 남겼다. 그 기록이 이후 협상에서 도움이 됐다. 감정은 시간이 지나면 약해지지만, 기록은 남는다.", "O que ajudou a resolver a reclamação?", ["Fatos, prazos e um pedido educado, mas claro.", "Uma mensagem agressiva.", "Esperar sem cobrar."], "Fatos, prazos e um pedido educado, mas claro.", "사실과 기한, 정중하지만 분명한 요청."),
  ],
  summary: ["-는 즉시 é “assim que” formal.", "-도록 조치해 주시기 바랍니다 é fórmula de reclamação.", "Reclamação eficaz tem fato, pedido, prazo e tom.", "Conteúdo novo permanece em revisão."],
  production: production(
    "Produção independente · reclamação formal",
    "Escreva uma reclamação formal de seis a oito frases sobre um produto ou serviço. Inclua fato, protocolo, pedido, prazo e encerramento.",
    "제품이나 서비스에 대한 정중한 항의문을 써 보세요.",
    ["Comece pelo fato e pelo protocolo.", "Diga o que já tentou.", "Use -는 즉시 ou -도록 조치해 주시기 바랍니다.", "Defina um prazo e encerre com respeito."],
    ["Fato e protocolo.", "Tentativa anterior.", "Pedido e prazo.", "Registro formal.", "Tom firme e respeitoso."],
    "지난달 주문한 제품이 잘못 배송되어 연락드립니다. 접수증 번호는 2026-041입니다. 담당자와 통화했지만, 아직 환불 절차가 시작되지 않았습니다. 확인하는 즉시 처리해 주시고, 다음 주까지 답변해 주시기 바랍니다.",
    "Entro em contato porque o produto encomendado no mês passado foi entregue errado. O número do protocolo é 2026-041. Falei com o responsável, mas o procedimento de reembolso ainda não começou. Solicito que seja tratado assim que confirmado e que respondam até a próxima semana.",
    "Exemplo original de quatro frases. Fato, protocolo, pedido e prazo aparecem. Compare o registro.",
  ),
});

/** b2-l28 — consequências encadeadas. */
export const B2_L28 = defineB2Lesson({
  id: "b2-l28", number: 28, moduleId: "b2-m06", title: "As consequências de uma decisão",
  objective: "Explicar consequências encadeadas e distinguir impacto direto de efeito indireto.",
  prerequisites: ["b2-l27"], estimatedMinutes: 75, dialogueTitle: "A obra parada",
  intro: [
    { title: "Provocar o resultado de", body: "-는 결과를 초래하다 significa “provocar o resultado de...”. É formal e aponta uma consequência negativa ou indesejada. Compare com -게 만들다 (fazer com que) e -는 원인이 되다 (ser a causa de). Registro: escrito/formal.", ko: "그 결정은 큰 손실을 초래하는 결과를 낳았어요." },
    { title: "Chegar a; atingir", body: "-에 이르다 indica que algo chegou a um ponto ou valor: “chegar a...”. Pode ser literal (valor) ou figurado (conclusão). Compare com -에 도달하다 (atingir, mais técnico) e -까지 오다 (chegar até). Registro: neutro a formal.", ko: "피해가 수억 원에 이르렀어요." },
  ],
  dialogue: [
    ["아나", "공사가 갑자기 중단됐다면서요?", "Ouvi dizer que a obra parou de repente."],
    ["민수", "네. 상인들은 매출 손실을 겪었고, 주민들은 통행 불편을 치렀어요.", "Sim. Os comerciantes sofreram perda de vendas, e os moradores passaram por dificuldades de circulação."],
    ["아나", "여파가 오래갔나요?", "O impacto durou muito?"],
    ["민수", "생각보다 오래갔어요. 교통 통제가 상인들에게 큰 타격이었고, 소음과 먼지는 건강에 악영향을 줄 수 있어요.", "Durou mais que o esperado. O controle de trânsito foi um grande golpe para os comerciantes, e o barulho e a poeira podem prejudicar a saúde."],
    ["아나", "일부 지연은 불가피했나요?", "Parte do atraso era inevitável?"],
    ["민수", "지연 자체는 불가피했을 수 있어요. 하지만 설명 부족은 피할 수 있었죠.", "O atraso em si pode ter sido inevitável. Mas a falta de explicação poderia ter sido evitada."],
    ["아나", "시는 뭐라고 해요?", "O que a prefeitura diz?"],
    ["민수", "사후 대책을 발표했지만, 비용이 막대하다는 지적이 나왔어요. 결정이 어떤 결과를 초래했는지 제대로 분석해야 해요. 파장은 아직 끝나지 않았어요.", "Anunciou medidas posteriores, mas surgiu a crítica de que o custo é enorme. É preciso analisar direito que resultados a decisão provocou. A repercussão ainda não terminou."],
  ],
  readingText: {
    titlePt: "A cadeia de consequências",
    paragraphs: [
      "도시가 공사를 갑자기 중단하면서 여러 문제가 생겼다. 상인들은 매출 손실을 겪었고, 주민들은 통행 불편을 치렀다. 공사 중단의 여파는 예상보다 오래갔다.",
      "전문가들은 이 결정이 지역 경제에 큰 타격을 줄 수 있다고 말했다. 소음과 먼지는 건강에 악영향을 줄 수 있고, 신뢰 회복에는 시간이 걸린다. 일부 지연은 불가피했지만, 설명 부족은 피할 수 있었다.",
      "시는 사후 대책을 발표했다. 그러나 비용이 막대하다는 지적과 함께, 결정이 어떤 결과를 초래했는지 제대로 분석해야 한다는 요구가 나왔다. 파장은 아직 끝나지 않았다. 주민들은 다음 공사 전에 설명회를 요구했다. 그 요구는 합리적이다. 설명이 중요하다.",
    ],
    pt: "Quando a cidade interrompeu a obra de repente, surgiram vários problemas. Os comerciantes sofreram perda de vendas, e os moradores passaram por dificuldades de circulação. O impacto da paralisação durou mais que o esperado. Especialistas disseram que a decisão poderia causar um grande golpe na economia local. O barulho e a poeira podem prejudicar a saúde, e recuperar a confiança leva tempo. Parte do atraso era inevitável, mas a falta de explicação poderia ter sido evitada. A prefeitura anunciou medidas posteriores. No entanto, junto com a crítica de que o custo é enorme, surgiu a exigência de analisar corretamente que resultados a decisão provocou. A repercussão ainda não terminou.",
    objective: "Distinguir consequência direta, efeito indireto e responsabilidade pela decisão.",
  },
  reusedIds: ["ko:문제", "ko:분석", "ko:결과"],
  grammar: [
    ["-는 결과를 초래하다 — provocar o resultado de", "동사 + -는 결과를 초래하다", "Significa “provocar o resultado de...”. É formal e aponta uma consequência negativa ou indesejada. Compare com -게 만들다 (fazer com que) e -는 원인이 되다 (ser a causa de). Registro: escrito/formal.", [["결국 신뢰를 잃는 결과를 초래했어요.", "No fim, isso provocou a perda de confiança."], ["설명 부족은 신뢰 하락을 초래했습니다.", "A falta de explicação provocou a queda de confiança."]]],
    ["-에 이르다 — chegar a; atingir", "명사 + 에 이르다", "Indica que algo chegou a um ponto ou valor: “chegar a...”. Pode ser literal (valor) ou figurado (conclusão). Compare com -에 도달하다 (atingir, mais técnico) e -까지 오다 (chegar até). Registro: neutro a formal.", [["피해가 수억 원에 이르렀어요.", "O prejuízo chegou a centenas de milhões de won."], ["논의가 결론에 이르지 못했습니다.", "A discussão não chegou a uma conclusão."]]],
  ],
  guided: [
    mcq("Qual foi o impacto direto nos comerciantes?", ["Perda de vendas.", "Aumento do aluguel.", "Mudança de cidade."], "Perda de vendas.", "상인들은 매출 손실을 겪었어요."),
    cloze("Complete a consequência: 결국 신뢰를 잃___ 결과를 초래했어요.", "는", "잃는 결과를 초래하다 = provocar o resultado de perder."),
    listen("Ouça e escreva o valor do prejuízo.", "피해가 수억 원에 이르렀어요.", "피해가 수억 원에 이르렀어요.", "O prejuízo chegou a centenas de milhões de won."),
    reading("도시가 공사를 갑자기 중단하면서 여러 문제가 생겼다. 상인들은 매출 손실을 겪었고, 주민들은 통행 불편을 치렀다. 공사 중단의 여파는 예상보다 오래갔다.", "Quais foram as consequências diretas?", ["Perda de vendas e dificuldade de circulação.", "Aumento do turismo.", "Melhoria do transporte."], "Perda de vendas e dificuldade de circulação.", "매출 손실과 통행 불편."),
    translate("pt-ko", "Traduza: “O prejuízo chegou a centenas de milhões de won.”", "피해가 수억 원에 이르렀어요.", "-에 이르다 indica que chegou a um valor.", ["피해가 수억 원에 이르렀습니다."]),
  ],
  independent: [
    mcq("Qual frase expressa consequência negativa formal?", ["설명 부족은 신뢰 하락을 초래했어요.", "설명이 부족했어요.", "설명을 보충하세요."], "설명 부족은 신뢰 하락을 초래했어요.", "-는 결과를 초래하다 aponta consequência."),
    cloze("Complete o limite: 논의가 결론___ 이르지 못했습니다.", "에", "결론에 이르다 = chegar a uma conclusão."),
    listen("Ouça e escreva o efeito indireto.", "소음과 먼지는 건강에 악영향을 줄 수 있어요.", "소음과 먼지는 건강에 악영향을 줄 수 있어요.", "O barulho e a poeira podem prejudicar a saúde."),
    translate("ko-pt", "Traduza: 일부 지연은 불가피했지만 설명 부족은 피할 수 있었어요.", "Parte do atraso era inevitável, mas a falta de explicação poderia ter sido evitada.", "불가피하다 = inevitável; 피하다 = evitar.", ["O atraso em parte era inevitável; a falta de explicação, não."]),
    reading("시는 사후 대책을 발표했다. 그러나 비용이 막대하다는 지적과 함께, 결정이 어떤 결과를 초래했는지 제대로 분석해야 한다는 요구가 나왔다. 파장은 아직 끝나지 않았다. 주민들은 다음 공사 전에 설명회를 요구했다. 그 요구는 합리적이다. 설명이 중요하다.", "O que ainda é exigido?", ["Analisar corretamente os resultados da decisão.", "Aumentar o custo da obra.", "Encerrar o debate."], "Analisar corretamente os resultados da decisão.", "결정이 어떤 결과를 초래했는지 분석해야 해요."),
  ],
  summary: ["-는 결과를 초래하다 indica consequência formal.", "-에 이르다 indica que algo chegou a um ponto.", "Impacto direto e efeito indireto são diferentes.", "Conteúdo novo permanece em revisão."],
  production: production(
    "Produção independente · consequências de uma decisão",
    "Descreva uma decisão e duas consequências em cinco a sete frases. Separe impacto direto de efeito indireto e diga o que era evitável.",
    "결정과 그 결과를 직접 영향과 간접 영향으로 나눠 써 보세요.",
    ["Apresente a decisão.", "Mostre uma consequência direta.", "Mostre um efeito indireto.", "Use -는 결과를 초래하다 ou -에 이르다.", "Diga o que era evitável."],
    ["Decisão clara.", "Consequência direta.", "Efeito indireto.", "Uma forma da lição.", "Distinção entre inevitável e evitável."],
    "회사가 갑자기 공사를 중단했어요. 상인들은 매출 손실을 겪었고, 주민들은 통행 불편을 치렀어요. 소음과 먼지는 건강에 악영향을 줄 수 있어요. 일부 지연은 불가피했지만, 설명 부족은 피할 수 있었어요.",
    "A empresa interrompeu a obra de repente. Os comerciantes sofreram perda de vendas, e os moradores passaram por dificuldades de circulação. O barulho e a poeira podem prejudicar a saúde. Parte do atraso era inevitável, mas a falta de explicação poderia ter sido evitada.",
    "Exemplo original de quatro frases. Impacto direto, efeito indireto e o que era evitável aparecem. Compare a estrutura.",
  ),
});

/** b2-l29 — compromisso e limites do acordo. */
export const B2_L29 = defineB2Lesson({
  id: "b2-l29", number: 29, moduleId: "b2-m06", title: "Até onde podemos ceder",
  objective: "Propor um compromisso delimitando o que cada parte concede.",
  prerequisites: ["b2-l28"], estimatedMinutes: 75, dialogueTitle: "O orçamento dividido",
  intro: [
    { title: "Dentro do limite de", body: "-는 선에서 significa “dentro do limite de...”, “na medida em que...”. Delimita até onde uma concessão ou ação é possível. Compare com -는 범위에서 (no escopo de) e -는 한 (enquanto). Registro: neutro a formal.", ko: "예산을 지킬 수 있는 선에서 조정했어요." },
    { title: "Decidir fazer, com ressalva", body: "-기로 하되 significa “decidir fazer, mas com uma ressalva”. Combina a decisão (-기로 하다) com uma condição ou limite (-되). Compare com -기로 했지만 (decidiu, mas...) e -기로 하고 (decidiu e...). Registro: formal/escrito.", ko: "계획을 유지하기로 하되 다음 분기에 다시 논의하기로 했어요." },
  ],
  dialogue: [
    ["아나", "두 팀이 아직도 예산 때문에 싸우고 있어요?", "As duas equipes ainda estão brigando por causa do orçamento?"],
    ["민수", "네. 한쪽은 신규 장비를, 다른 쪽은 교육을 원해서 접점이 거의 없었어요.", "Sim. Um lado quer equipamentos novos; o outro, treinamento. Quase não havia ponto de contato."],
    ["아나", "중재안은 나왔어요?", "Surgiu uma proposta de mediação?"],
    ["민수", "장비 예산의 절반을 먼저 집행하고, 나머지는 교육에 쓰자는 중재안이 나왔어요.", "Surgiu uma proposta de mediação: executar primeiro metade do orçamento de equipamentos e usar o restante em treinamento."],
    ["아나", "양측이 받아들였어요?", "Os dois lados aceitaram?"],
    ["민수", "세부 조건을 조율한 뒤 합의하기로 했어요. 완전한 합의점은 아니지만, 예산을 지킬 수 있는 선에서 조정했어요.", "Decidiram chegar a um acordo depois de ajustar as condições detalhadas. Não é um ponto de acordo completo, mas foi ajustado dentro do limite que o orçamento permite."],
    ["아나", "최종 합의문에는 뭐가 들어갔어요?", "O que entrou no documento final?"],
    ["민수", "현재 계획을 유지하기로 하되, 다음 분기에 다시 논의하기로 했어요. 절충은 만족의 최대치가 아니라 지속 가능한 최소치예요.", "Decidiram manter o plano atual, com a ressalva de discutir de novo no próximo trimestre. O compromisso não é o máximo de satisfação, mas o mínimo sustentável."],
  ],
  readingText: {
    titlePt: "O mínimo sustentável",
    paragraphs: [
      "두 팀은 같은 예산을 두고 다른 우선순위를 주장했다. 한쪽은 신규 장비를, 다른 쪽은 교육을 원했다. 회의는 몇 시간째 접점을 찾지 못했다.",
      "중재자가 중재안을 제시했다. 장비 예산의 절반을 먼저 집행하고, 나머지는 교육에 쓰자는 안이었다. 양측은 세부 조건을 조율한 뒤 합의하기로 했다.",
      "최종 합의문에는 지킬 수 있는 범위가 적혔다. 완전한 합의점은 아니었지만, 양측은 다음 분기에 다시 논의하기로 하되 현재 계획은 유지하기로 했다. 절충은 만족의 최대치가 아니라, 지속 가능한 최소치다. 그래서 다음 회의에서는 지킬 수 있는 범위를 먼저 확인하기로 했다. 작은 합의가 큰 갈등을 막는다. 합의는 계속 관리해야 한다.",
    ],
    pt: "Duas equipes defendiam prioridades diferentes para o mesmo orçamento. Uma queria equipamentos novos; a outra, treinamento. A reunião passou horas sem encontrar um ponto de contato. O mediador apresentou uma proposta de mediação: executar primeiro metade do orçamento de equipamentos e usar o restante em treinamento. Os dois lados decidiram ajustar as condições detalhadas e chegar a um acordo. No documento final, ficou registrado o limite que poderia ser cumprido. Não era um ponto de acordo completo, mas os dois lados decidiram manter o plano atual, com a ressalva de discutir de novo no próximo trimestre. O compromisso não é o máximo de satisfação, mas o mínimo sustentável.",
    objective: "Identificar o que cada parte cede, o limite do acordo e o que fica pendente.",
  },
  reusedIds: ["ko:예산", "ko:합의", "ko:조건"],
  grammar: [
    ["-는 선에서 — dentro do limite de", "동사 + -는 선에서 / 명사 + 의 선에서", "Significa “dentro do limite de...”, “na medida em que...”. Delimita até onde uma concessão ou ação é possível. Compare com -는 범위에서 (no escopo de) e -는 한 (enquanto). Registro: neutro a formal.", [["예산을 지킬 수 있는 선에서 조정했어요.", "Ajustamos dentro do limite que o orçamento permite."], ["서로 만족할 수 있는 선에서 합의했습니다.", "Chegamos a um acordo dentro de um limite satisfatório para ambos."]]],
    ["-기로 하되 — decidir fazer, com ressalva", "동사 + -기로 하되", "Significa “decidir fazer, mas com uma ressalva”. Combina a decisão (-기로 하다) com uma condição ou limite (-되). Compare com -기로 했지만 (decidiu, mas...) e -기로 하고 (decidiu e...). Registro: formal/escrito.", [["계획을 유지하기로 하되 다음 분기에 다시 논의하기로 했어요.", "Decidimos manter o plano, com a ressalva de discutir de novo no próximo trimestre."], ["참여하기로 하되 개인정보는 제공하지 않기로 했습니다.", "Decidimos participar, com a ressalva de não fornecer dados pessoais."]]],
  ],
  guided: [
    mcq("Qual foi o ponto de impasse?", ["As duas equipes queriam usos diferentes do orçamento.", "Não havia orçamento nenhum.", "As equipes não compareceram."], "As duas equipes queriam usos diferentes do orçamento.", "예산 사용 우선순위가 달랐어요."),
    cloze("Complete o limite: 예산을 지킬 수 있___ 선에서 조정했어요.", "는", "있는 선에서 = dentro do limite possível."),
    listen("Ouça e escreva o acordo com ressalva.", "계획을 유지하기로 하되 다음 분기에 다시 논의하기로 했어요.", "계획을 유지하기로 하되 다음 분기에 다시 논의하기로 했어요.", "Decidiram manter o plano, com a ressalva de discutir de novo no próximo trimestre."),
    reading("두 팀은 같은 예산을 두고 다른 우선순위를 주장했다. 한쪽은 신규 장비를, 다른 쪽은 교육을 원했다. 회의는 몇 시간째 접점을 찾지 못했다.", "Por que a reunião não avançou?", ["Porque as prioridades eram diferentes e não havia ponto de contato.", "Porque o orçamento era infinito.", "Porque ninguém queria falar."], "Porque as prioridades eram diferentes e não havia ponto de contato.", "우선순위가 달라 접점을 찾지 못했어요."),
    translate("pt-ko", "Traduza: “Ajustamos dentro do limite que o orçamento permite.”", "예산을 지킬 수 있는 선에서 조정했어요.", "-는 선에서 delimita a concessão.", ["예산을 지킬 수 있는 범위에서 조정했습니다."]),
  ],
  independent: [
    mcq("Qual frase decide algo com uma ressalva?", ["참여하기로 하되 개인정보는 제공하지 않기로 했어요.", "참여하기로 했어요.", "참여하지 않았어요."], "참여하기로 하되 개인정보는 제공하지 않기로 했어요.", "-기로 하되 acrescenta uma ressalva."),
    cloze("Complete a ressalva: 계획을 유지하___ 하되 다음 분기에 다시 논의해요.", "기로", "유지하기로 하되 = decidir manter, com ressalva."),
    listen("Ouça e escreva a definição de compromisso.", "절충은 만족의 최대치가 아니라 지속 가능한 최소치예요.", "절충은 만족의 최대치가 아니라 지속 가능한 최소치예요.", "O compromisso não é o máximo de satisfação, mas o mínimo sustentável."),
    translate("ko-pt", "Traduza: 양측은 세부 조건을 조율한 뒤 합의했어요.", "Os dois lados chegaram a um acordo depois de ajustar as condições detalhadas.", "양측 = ambos os lados; 조율하다 = coordenar.", ["Ambas as partes acordaram após ajustar os detalhes."]),
    reading("최종 합의문에는 지킬 수 있는 범위가 적혔다. 완전한 합의점은 아니었지만, 양측은 다음 분기에 다시 논의하기로 하되 현재 계획은 유지하기로 했다.", "O que o acordo final registra?", ["O limite que pode ser cumprido e o que fica para depois.", "A vitória total de um lado.", "O cancelamento de todo o plano."], "O limite que pode ser cumprido e o que fica para depois.", "지킬 수 있는 범위와 다음 논의."),
  ],
  summary: ["-는 선에서 delimita a concessão.", "-기로 하되 acrescenta uma ressalva à decisão.", "Compromisso nomeia o que fica pendente.", "Conteúdo novo permanece em revisão."],
  production: production(
    "Produção independente · proposta de compromisso",
    "Escreva uma proposta de compromisso em cinco a sete frases. Diga o que cada lado cede, o limite do acordo e o que fica para depois.",
    "양보와 한계를 포함한 절충안을 써 보세요.",
    ["Resuma as duas posições.", "Proponha uma divisão concreta.", "Use -는 선에서 ou -기로 하되.", "Diga o que fica pendente."],
    ["Duas posições resumidas.", "Concessão recíproca.", "Limite do acordo.", "Uma forma da lição.", "Pendência explícita."],
    "두 팀 모두 예산을 중요하게 생각해요. 저는 장비 예산의 절반을 먼저 집행하고, 나머지를 교육에 쓰는 안을 제안해요. 예산을 지킬 수 있는 선에서 조정하되, 다음 분기에 다시 논의합시다.",
    "As duas equipes consideram o orçamento importante. Proponho executar primeiro metade do orçamento de equipamentos e usar o restante em treinamento. Vamos ajustar dentro do limite que o orçamento permite, com a ressalva de discutir de novo no próximo trimestre.",
    "Exemplo original de três frases. Concessão, limite e pendência aparecem. Compare a estrutura.",
  ),
});

/** b2-l30 — retrospectiva e resultado hipotético. */
export const B2_L30 = defineB2Lesson({
  id: "b2-l30", number: 30, moduleId: "b2-m06", title: "Se tivéssemos feito diferente",
  objective: "Revisar um resultado hipotético e extrair aprendizado para decisões futuras.",
  prerequisites: ["b2-l29"], estimatedMinutes: 80, dialogueTitle: "A retrospectiva do prazo",
  intro: [
    { title: "Deveria ter feito", body: "-았/었어야 했다 expressa que uma ação deveria ter sido feita no passado, mas não foi. É mais direto que -았/었어야 했는데, sem o amaciamento de -는데. Compare com -았/었으면 좋겠다 (desejo) e -았/었더라면 (condição contrafactual). Registro: neutro.", ko: "더 일찍 점검했어야 했어요." },
    { title: "Quase aconteceu", body: "-ㄹ 뻔했다 indica que algo quase aconteceu, mas não aconteceu: “quase...”. Pode ser negativo (quase perdi) ou positivo (quase perdi o voo). Compare com -ㄹ 수 있었다 (poderia ter) e -았/었을 것이다 (teria). Registro: neutro, muito comum na fala.", ko: "같은 문제가 반복될 뻔했어요." },
  ],
  dialogue: [
    ["아나", "이번 프로젝트는 왜 늦었어요?", "Por que este projeto atrasou?"],
    ["민수", "마감 직전에 위기가 찾아왔어요. 초기 점검이 부족했고, 체크리스트도 실제 업무와 맞지 않았어요.", "Uma crise surgiu pouco antes do prazo. A verificação inicial foi insuficiente, e a lista de verificação não correspondia ao trabalho real."],
    ["아나", "사후 분석은 했어요?", "Fizeram a análise posterior?"],
    ["민수", "네. 준비가 미흡했다는 점을 인정했지만, 책임을 한 사람에게 몰아넣지는 않았어요.", "Sim. Admitimos que a preparação foi insuficiente, mas não jogamos a responsabilidade em uma só pessoa."],
    ["아나", "대응책은 있었어요?", "Havia medidas de resposta?"],
    ["민수", "대응책은 있었지만 예방책은 없었어요. 같은 문제가 반복될 뻔했어요.", "Havia medidas de resposta, mas não de prevenção. Quase o mesmo problema se repetiu."],
    ["아나", "그래서 어떻게 하기로 했어요?", "E o que decidiram fazer?"],
    ["민수", "부족한 부분을 보완하고, 다음 프로젝트 전에 점검을 강화하기로 했어요. 더 일찍 점검했어야 했어요. 반성은 끝이 아니라 다음 행동의 시작이에요.", "Decidimos complementar o que faltou e reforçar a verificação antes do próximo projeto. Deveríamos ter verificado mais cedo. A reflexão não é o fim, mas o começo da próxima ação."],
  ],
  readingText: {
    titlePt: "A lição depois do prazo perdido",
    paragraphs: [
      "마감을 놓친 뒤 팀은 사후 분석을 시작했다. 준비가 미흡했다는 점을 인정했지만, 책임을 한 사람에게 몰아넣지는 않았다. 먼저 무엇이 위기를 만들었는지 확인했다.",
      "검토 결과, 초기 점검이 부족했다. 대응책은 있었지만, 예방책은 없었다. 체크리스트도 실제 업무와 맞지 않았다. 팀은 같은 문제가 반복될 뻔했다는 사실을 인정했다.",
      "팀은 부족한 부분을 보완하고, 다음 프로젝트 전에 점검을 강화하기로 했다. 반성은 끝이 아니라 다음 행동의 시작이다. 위기를 겪은 뒤에야 보이는 문제도 있다. 그래서 다음 프로젝트에서는 중간 점검을 두 번 하기로 했다. 기록도 남기기로 했다. 기록은 다음 판단을 돕는다.",
    ],
    pt: "Depois de perder o prazo, a equipe começou a análise posterior. Admitiu que a preparação foi insuficiente, mas não concentrou a responsabilidade em uma única pessoa. Primeiro, verificou o que havia criado a crise. A revisão mostrou que a checagem inicial era fraca. Havia medidas de resposta, mas não de prevenção. A lista de verificação também não correspondia ao trabalho real. A equipe admitiu que quase o mesmo problema se repetiu. A equipe complementou o que faltava e decidiu reforçar a verificação antes do próximo projeto. A reflexão não é o fim, mas o começo da próxima ação. Alguns problemas só se tornam visíveis depois de uma crise.",
    objective: "Distinguir responsabilidade, hipótese contrafactual e aprendizado acionável.",
  },
  reusedIds: ["ko:문제", "ko:분석", "ko:회의"],
  grammar: [
    ["-았/었어야 했다 — deveria ter feito", "동사 + -았/었어야 했다", "Expressa que uma ação deveria ter sido feita no passado, mas não foi. É mais direto que -았/었어야 했는데, sem o amaciamento de -는데. Compare com -았/었으면 좋겠다 (desejo) e -았/었더라면 (condição contrafactual). Registro: neutro.", [["더 일찍 점검했어야 했어요.", "Deveríamos ter verificado mais cedo."], ["회의에서 분명히 말했어야 했습니다.", "Eu deveria ter falado claramente na reunião."]]],
    ["-ㄹ 뻔했다 — quase aconteceu", "동사 + -ㄹ 뻔했다", "Indica que algo quase aconteceu, mas não aconteceu: “quase...”. Pode ser negativo ou positivo. Compare com -ㄹ 수 있었다 (poderia ter) e -았/었을 것이다 (teria). Registro: neutro, muito comum na fala.", [["같은 문제가 반복될 뻔했어요.", "Quase o mesmo problema se repetiu."], ["지하철을 놓칠 뻔했어요.", "Quase perdi o metrô."]]],
  ],
  guided: [
    mcq("Por que o projeto atrasou?", ["A verificação inicial foi insuficiente.", "A equipe tinha gente demais.", "O cliente cancelou tudo."], "A verificação inicial foi insuficiente.", "초기 점검이 부족했어요."),
    cloze("Complete o arrependimento: 더 일찍 점검했___ 했어요.", "어야", "점검했어야 했어요 = deveria ter verificado."),
    listen("Ouça e escreva o que quase aconteceu.", "같은 문제가 반복될 뻔했어요.", "같은 문제가 반복될 뻔했어요.", "Quase o mesmo problema se repetiu."),
    reading("마감을 놓친 뒤 팀은 사후 분석을 시작했다. 준비가 미흡했다는 점을 인정했지만, 책임을 한 사람에게 몰아넣지는 않았다. 먼저 무엇이 위기를 만들었는지 확인했다.", "O que a equipe fez primeiro?", ["Verificou o que criou a crise.", "Demitiu um funcionário.", "Cancelou o projeto."], "Verificou o que criou a crise.", "무엇이 위기를 만들었는지 확인했어요."),
    translate("pt-ko", "Traduza: “Deveríamos ter verificado mais cedo.”", "더 일찍 점검했어야 했어요.", "-았/었어야 했다 expressa dever não cumprido.", ["더 일찍 점검했어야 했습니다."]),
  ],
  independent: [
    mcq("Qual frase indica que algo quase aconteceu?", ["지하철을 놓칠 뻔했어요.", "지하철을 놓쳤어요.", "지하철을 놓치지 않았어요."], "지하철을 놓칠 뻔했어요.", "-ㄹ 뻔했다 = quase aconteceu."),
    cloze("Complete o quase: 같은 문제가 반복될 ___ 했어요.", "뻔", "반복될 뻔했어요 = quase se repetiu."),
    listen("Ouça e escreva a decisão de melhoria.", "부족한 부분을 보완하고 점검을 강화하기로 했어요.", "부족한 부분을 보완하고 점검을 강화하기로 했어요.", "Decidimos complementar o que faltou e reforçar a verificação."),
    translate("ko-pt", "Traduza: 반성은 끝이 아니라 다음 행동의 시작이에요.", "A reflexão não é o fim, mas o começo da próxima ação.", "반성 = reflexão; 행동 = ação.", ["Refletir não é o fim; é o começo da próxima ação."]),
    reading("팀은 부족한 부분을 보완하고, 다음 프로젝트 전에 점검을 강화하기로 했다. 반성은 끝이 아니라 다음 행동의 시작이다. 위기를 겪은 뒤에야 보이는 문제도 있다. 그래서 다음 프로젝트에서는 중간 점검을 두 번 하기로 했다. 기록도 남기기로 했다. 기록은 다음 판단을 돕는다.", "O que a equipe decidiu?", ["Complementar o que faltou e reforçar a verificação.", "Não fazer mais projetos.", "Esquecer o problema."], "Complementar o que faltou e reforçar a verificação.", "부족한 부분을 보완하고 점검을 강화하기로 했어요."),
  ],
  summary: ["-았/었어야 했다 expressa dever não cumprido.", "-ㄹ 뻔했다 indica quase acontecimento.", "Retrospectiva boa separa responsabilidade, hipótese e ação.", "Conteúdo novo permanece em revisão."],
  production: production(
    "Produção independente · retrospectiva",
    "Faça a retrospectiva de um projeto ou prazo perdido em cinco a sete frases. Inclua o que deveria ter sido feito, o que quase aconteceu e duas mudanças para a próxima vez.",
    "지난 프로젝트를 돌아보고 다음을 위한 변화를 써 보세요.",
    ["Descreva o resultado.", "Use -았/었어야 했다 uma vez.", "Use -ㄹ 뻔했다 uma vez.", "Proponha duas mudanças concretas."],
    ["Resultado descrito.", "Dever não cumprido.", "Quase acontecimento.", "Duas mudanças.", "Sem culpa genérica."],
    "지난 프로젝트에서 우리는 마감을 놓쳤어요. 초기 점검이 부족했고, 예방책도 없었어요. 더 일찍 점검했어야 했어요. 같은 문제가 반복될 뻔했지만, 이번에 체크리스트를 새로 만들었어요. 다음에는 회의 전에 점검 결과를 공유할 거예요.",
    "No projeto passado, perdemos o prazo. A verificação inicial foi insuficiente e não havia medidas de prevenção. Deveríamos ter verificado mais cedo. Quase o mesmo problema se repetiu, mas desta vez criamos uma nova lista de verificação. Na próxima, compartilharemos o resultado da verificação antes da reunião.",
    "Exemplo original de cinco frases. Arrependimento, quase acontecimento e duas ações aparecem. Compare a estrutura.",
  ),
});
