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

/** b2-l16 — registro profissional e mensagem de trabalho. */
export const B2_L16 = defineB2Lesson({
  id: "b2-l16", number: 16, moduleId: "b2-m04", title: "Como dizer isso no trabalho",
  objective: "Adequar registro e estrutura em comunicação profissional escrita e oral.",
  prerequisites: ["b2-c03"], estimatedMinutes: 75, dialogueTitle: "O e-mail atrasado",
  intro: [
    { title: "Compromisso formal", body: "-도록 하겠습니다 expressa um compromisso formal de fazer algo: “farei com que...”. É comum em e-mails, reuniões e atendimento. Compare com -겠습니다 (vontade/decidir) e -기로 하다 (decisão combinada). Registro: formal, polido.", ko: "자료를 금요일까지 보내 드리도록 하겠습니다." },
    { title: "O fato é que", body: "-ㄴ/는 바 é uma nominalização formal usada em documentos: “o que foi dito/feito”. É mais burocrática que -는 것. Use com moderação; em e-mail comum, -는 내용이나 -는 점이 더 natural. Registro: escrito/formal.", ko: "검토한 바에 따르면 오류가 두 건 있었습니다." },
  ],
  dialogue: [
    ["아나", "팀장님이 보낸 메일을 봤어요?", "Você viu o e-mail que o chefe enviou?"],
    ["민수", "네. 그런데 상황 설명이 너무 짧아서 뭘 먼저 해야 할지 모르겠어요.", "Sim. Mas a explicação da situação é curta demais; não sei o que fazer primeiro."],
    ["아나", "마감이 이틀 남았고, 자료 검토가 아직 안 끝났다는 사실도 빠졌죠.", "Também faltou dizer que faltam dois dias para o prazo e que a revisão dos materiais ainda não terminou."],
    ["민수", "그래서 제가 다시 정리해 봤어요. 제목에 요청을 쓰고, 본문에는 배경과 필요한 조치를 넣었어요.", "Então reorganizei. Coloquei o pedido no título e, no corpo, o contexto e a ação necessária."],
    ["아나", "결재를 기다리는 문서라면 더 분명해야 해요.", "Se é um documento aguardando aprovação, precisa ser ainda mais claro."],
    ["민수", "맞아요. “목요일까지 협조 부탁드립니다”라고 쓰고, 급한 건은 구두로 먼저 알렸어요.", "Exato. Escrevi “peço a colaboração até quinta” e avisei antes por telefone os casos urgentes."],
    ["아나", "상신 전에 공람은 했어요?", "Você circulou o documento para leitura antes de enviar para aprovação?"],
    ["민수", "네. 서면으로 남길 내용과 말로 할 내용을 구분하니 독촉하는 일도 줄었어요. 약속한 조건을 이행하겠다는 문장도 넣었고요.", "Sim. Ao separar o que deve ficar por escrito do que é falado, também diminuiu a necessidade de cobrar. Também incluí uma frase comprometendo-nos a cumprir as condições combinadas."],
  ],
  readingText: {
    titlePt: "O e-mail que faltava com o contexto",
    paragraphs: [
      "팀장님께 보낸 이메일에는 상황 설명이 빠져 있었다. 마감이 이틀 남았고, 자료 검토가 아직 끝나지 않았다는 사실도 쓰지 않았다. 상대는 무엇을 먼저 해야 할지 알기 어려웠다.",
      "업무 메일은 구두 대화와 다르다. 결재를 기다리는 문서라면 특히 더 분명해야 한다. 제목에 요청을 적고, 본문에는 배경, 현재 상황, 필요한 조치를 순서대로 쓰는 것이 좋다. 협조를 구할 때는 기한도 함께 밝혀야 한다.",
      "다음 메일에서는 “자료 검토를 위해 목요일까지 협조 부탁드립니다”라고 썼다. 상신 전에 팀원들에게 공람을 요청했고, 급한 건은 구두로 먼저 알렸다. 서면으로 남길 내용과 말로 할 내용을 구분하니 독촉하는 일도 줄었다. 약속한 조건을 이행하겠다는 문장도 넣었다. 그 뒤로 팀의 메일 처리 시간도 조금 줄었다. 작은 변화였지만 효과는 분명했다.",
    ],
    pt: "O e-mail enviado ao gerente não trazia a explicação da situação. Também não dizia que faltavam dois dias para o prazo nem que a revisão dos materiais ainda não havia terminado. Para o destinatário, era difícil saber o que fazer primeiro. Um e-mail de trabalho é diferente de uma conversa oral. Se for um documento aguardando aprovação, precisa ser ainda mais claro. É bom colocar o pedido no título e, no corpo, escrever o contexto, a situação atual e a ação necessária em ordem. Ao pedir colaboração, também é preciso informar o prazo. No e-mail seguinte, escrevi: “Peço a colaboração até quinta-feira para a revisão dos materiais.” Antes de enviar para aprovação, pedi aos membros da equipe que circulassem o documento para leitura, e os casos urgentes foram avisados antes por telefone. Ao separar o que deve ficar por escrito do que é falado, também diminuíram as cobranças. Incluí ainda a frase de compromisso de cumprir as condições combinadas.",
    objective: "Reconhecer contexto, pedido, prazo e compromisso em uma mensagem profissional.",
  },
  reusedIds: ["ko:업무", "ko:자료", "ko:요청"],
  grammar: [
    ["-도록 하겠습니다 — compromisso formal", "동사 + -도록 하겠습니다", "Expressa um compromisso formal de fazer algo: “farei com que...”. É comum em e-mails, reuniões e atendimento ao cliente. Compare com -겠습니다 (vontade/decisão) e -기로 하다 (decisão combinada). Não use em conversa casual entre amigos. Registro: formal, polido.", [["자료를 금요일까지 보내 드리도록 하겠습니다.", "Enviarei os materiais até sexta-feira."], ["다음 회의 전에 확인하도록 하겠습니다.", "Vou verificar antes da próxima reunião."]]],
    ["-ㄴ/는 바 — o fato/o conteúdo (formal)", "동사 + -ㄴ/는 바 / 형용사 + -ㄴ/은 바", "Nominalização formal usada em documentos e relatórios: “o que foi dito/feito”. É mais burocrática que -는 것; use com moderação. Em e-mail comum, -는 내용이나 -는 점이 mais naturais. Registro: escrito/formal.", [["검토한 바에 따르면 오류가 두 건 있었습니다.", "Segundo o que foi verificado, havia dois erros."], ["안내드린 바와 같이 일정이 변경되었습니다.", "Conforme informado, o cronograma foi alterado."]]],
  ],
  guided: [
    mcq("O que faltava no primeiro e-mail?", ["Contexto, prazo e ação necessária.", "O nome do remetente.", "O endereço da empresa."], "Contexto, prazo e ação necessária.", "상황 설명과 필요한 조치가 빠졌어요."),
    cloze("Complete o compromisso: 자료를 금요일까지 보내 드리___ 하겠습니다.", "도록", "보내 드리도록 하겠습니다 = enviarei."),
    listen("Ouça e escreva o prazo da revisão.", "자료 검토를 목요일까지 끝내 주세요.", "자료 검토를 목요일까지 끝내 주세요.", "Por favor, termine a revisão dos materiais até quinta-feira."),
    reading("팀장님께 보낸 이메일에는 상황 설명이 빠져 있었다. 마감이 이틀 남았고, 자료 검토가 아직 끝나지 않았다는 사실도 쓰지 않았다. 상대는 무엇을 먼저 해야 할지 알기 어려웠다.", "Por que o destinatário ficou sem saber o que fazer?", ["Porque faltavam contexto e prioridade.", "Porque o e-mail era curto demais em número de linhas.", "Porque o gerente estava de férias."], "Porque faltavam contexto e prioridade.", "상황 설명과 우선순위가 빠졌어요."),
    translate("pt-ko", "Traduza: “Enviarei os materiais até sexta-feira.”", "자료를 금요일까지 보내 드리도록 하겠습니다.", "-도록 하겠습니다 expressa compromisso formal.", ["자료를 금요일까지 보내겠습니다."]),
  ],
  independent: [
    mcq("Qual frase usa registro formal de compromisso?", ["다음 회의 전에 확인하도록 하겠습니다.", "다음 회의 전에 확인할게.", "다음 회의 전에 확인해."], "다음 회의 전에 확인하도록 하겠습니다.", "-도록 하겠습니다 é compromisso formal."),
    cloze("Complete o relatório formal: 검토한 ___에 따르면 오류가 두 건 있었습니다.", "바", "검토한 바에 따르면 = segundo o que foi verificado."),
    listen("Ouça e escreva a ação antes da aprovação.", "상신 전에 팀원들에게 공람을 요청했어요.", "상신 전에 팀원들에게 공람을 요청했어요.", "Antes de enviar para aprovação, pedi aos membros da equipe que lessem o documento."),
    translate("ko-pt", "Traduza: 서면으로 남길 내용과 말로 할 내용을 구분했어요.", "Separei o que deveria ficar por escrito do que seria falado.", "서면 = por escrito; 구두 = oral.", ["Distingui o que registrar por escrito do que dizer oralmente."]),
    reading("다음 메일에서는 “자료 검토를 위해 목요일까지 협조 부탁드립니다”라고 썼다. 상신 전에 팀원들에게 공람을 요청했고, 급한 건은 구두로 먼저 알렸다. 서면으로 남길 내용과 말로 할 내용을 구분하니 독촉하는 일도 줄었다.", "O que melhorou na segunda mensagem?", ["O contexto, o prazo e a separação entre escrito e oral.", "O número de destinatários do e-mail.", "O uso de emojis na mensagem."], "O contexto, o prazo e a separação entre escrito e oral.", "상황, 기한, 서면/구두 구분이 분명해졌어요."),
  ],
  summary: ["-도록 하겠습니다 é compromisso formal.", "-ㄴ/는 바 é nominalização formal de documento.", "Mensagem de trabalho precisa de contexto, pedido e prazo.", "Conteúdo novo permanece em revisão."],
  production: production(
    "Produção independente · e-mail profissional",
    "Escreva um e-mail de cinco a sete frases sobre um problema de trabalho. Inclua assunto, contexto, pedido, prazo e encerramento.",
    "업무 문제를 다루는 정중한 이메일을 써 보세요.",
    ["Escreva um assunto com o pedido.", "Explique o contexto em duas frases.", "Peça uma ação com prazo.", "Use -도록 하겠습니다 ou -ㄴ/는 바.", "Encerre com agradecimento."],
    ["Assunto e contexto claros.", "Pedido e prazo explícitos.", "Registro formal adequado.", "Uma forma da lição.", "Encerramento polido."],
    "안녕하세요. 다음 주 월요일 회의 자료와 관련하여 연락드립니다. 현재 자료 검토가 금요일까지 필요합니다. 혹시 목요일까지 초안을 보내 주실 수 있을까요? 어려우시면 미리 알려 주시기 바랍니다. 협조해 주셔서 감사합니다.",
    "Olá. Entro em contato a respeito dos materiais da reunião da próxima segunda-feira. Atualmente, a revisão dos materiais é necessária até sexta-feira. Será que você poderia enviar o rascunho até quinta-feira? Se for difícil, peço que avise com antecedência. Agradeço a colaboração.",
    "Exemplo original de cinco frases. Note assunto implícito, contexto, pedido com prazo e encerramento. Compare o registro.",
  ),
});

/** b2-l17 — método, resultado e limitação. */
export const B2_L17 = defineB2Lesson({
  id: "b2-l17", number: 17, moduleId: "b2-m04", title: "O que a pesquisa mostra",
  objective: "Relatar resultados de pesquisa e distinguir método, resultado e conclusão.",
  prerequisites: ["b2-l16"], estimatedMinutes: 75, dialogueTitle: "O relatório da pesquisa",
  intro: [
    { title: "Revelou-se que", body: "-ㄴ/는 것으로 드러났다 relata um resultado revelado por pesquisa, investigação ou análise: “revelou-se que...”. É impessoal e formal. Compare com -ㄴ/는 것으로 보이다 (parece) e -고 하다 (alguém disse).", ko: "조사 결과, 대기 시간이 만족도에 영향을 주는 것으로 드러났어요." },
    { title: "Com base em", body: "-에 근거하여 indica a base de uma afirmação ou decisão: “com base em...”. É formal e exige uma fonte ou dado. Compare com -에 따르면 (segundo a fonte) e -을 바탕으로 (tendo como base, mais amplo).", ko: "설문 결과에 근거하여 결론을 썼어요." },
  ],
  dialogue: [
    ["아나", "이번 조사 결과를 어떻게 정리했어요?", "Como você organizou o resultado desta pesquisa?"],
    ["민수", "먼저 설문 조사 방법을 적었어요. 응답자는 백 명이었고, 만족도를 다섯 단계로 측정했어요.", "Primeiro escrevi o método da pesquisa. Foram cem respondentes, e medimos a satisfação em cinco níveis."],
    ["아나", "결과는 어땠어요?", "Como foi o resultado?"],
    ["민수", "대기 시간이 짧을수록 만족도가 높다는 가설을 세웠는데, 분석 결과 상관관계가 있었어요.", "Estabelecemos a hipótese de que, quanto menor o tempo de espera, maior a satisfação; a análise mostrou uma correlação."],
    ["아나", "그럼 인과관계도 있다고 쓸 수 있나요?", "Então podemos escrever que também há causalidade?"],
    ["민수", "아니요. 상관관계만으로 인과관계를 말할 수 없어요. 다른 변수가 있을 수 있거든요.", "Não. Não se pode falar de causalidade só com correlação. Pode haver outras variáveis."],
    ["아나", "보고서에는 어떻게 썼어요?", "Como escreveu no relatório?"],
    ["민수", "“설문 결과에 근거하여 대기 시간과 만족도 사이의 상관관계가 있는 것으로 드러났다”라고 썼고, 한계도 함께 밝혔어요.", "Escrevi: “Com base no resultado da pesquisa, revelou-se que há correlação entre tempo de espera e satisfação”, e também deixei claro o limite."],
  ],
  readingText: {
    titlePt: "Método, resultado e limite",
    paragraphs: [
      "우리 팀은 고객 만족도에 대한 설문 조사를 진행했다. 응답자는 모두 백 명이었고, 만족도를 다섯 단계로 측정했다. 결과를 분석한 뒤, 우리는 “대기 시간이 짧을수록 만족도가 높다”는 가설을 세웠다.",
      "자료를 보면 대기 시간과 만족도 사이에 상관관계가 있었다. 그러나 상관관계만으로 인과관계를 말할 수는 없다. 다른 변수가 영향을 주었을 가능성도 있기 때문이다.",
      "우리는 추가 인터뷰를 통해 이유를 확인했다. 조사 결과가 드러난 뒤에도 해석에는 주의가 필요했다. 표본과 방법을 함께 밝혀야 독자가 결과를 신뢰할 수 있다. 또한 조사에 참여하지 않은 고객의 의견은 반영되지 않았다. 이 한계를 밝히는 것이 신뢰를 높인다. 표본이 작다는 점도 한계로 남는다. 따라서 결과를 전체 고객으로 확대하려면 더 큰 조사가 필요하다.",
    ],
    pt: "Nossa equipe realizou uma pesquisa por questionário sobre a satisfação dos clientes. Os respondentes foram cem pessoas, e medimos a satisfação em cinco níveis. Depois de analisar os resultados, formulamos a hipótese de que “quanto menor o tempo de espera, maior a satisfação”. Nos dados, havia uma correlação entre tempo de espera e satisfação. No entanto, não se pode falar de causalidade apenas com a correlação. Isso porque outras variáveis podem ter influenciado. Confirmamos as razões por meio de entrevistas adicionais. Mesmo depois de revelado o resultado da pesquisa, a interpretação exige cuidado. É preciso informar a amostra e o método para que o leitor confie no resultado.",
    objective: "Separar método, resultado e interpretação, e reconhecer o limite da causalidade.",
  },
  reusedIds: ["ko:결과", "ko:자료", "ko:방법"],
  grammar: [
    ["-ㄴ/는 것으로 드러났다 — revelou-se que", "동사 + -는 것으로 드러났다 / 형용사 + -ㄴ/은 것으로 드러났다", "Relata um resultado revelado por pesquisa, investigação ou análise: “revelou-se que...”. É impessoal e formal. Compare com -ㄴ/는 것으로 보이다 (parece) e -고 하다 (alguém disse). Use quando há método ou evidência, não para opinião. Registro: escrito/formal.", [["조사 결과, 대기 시간이 만족도에 영향을 주는 것으로 드러났어요.", "O resultado da pesquisa revelou que o tempo de espera influencia a satisfação."], ["면접에서 경력이 중요한 것으로 드러났습니다.", "Revelou-se na entrevista que a experiência é importante."]]],
    ["-에 근거하여 — com base em", "명사 + 에 근거하여", "Indica a base de uma afirmação ou decisão: “com base em...”. É formal e exige uma fonte ou dado. Compare com -에 따르면 (segundo a fonte) e -을 바탕으로 (tendo como base, mais amplo). Registro: escrito/formal.", [["설문 결과에 근거하여 결론을 썼어요.", "Escrevi a conclusão com base no resultado da pesquisa."], ["확인된 자료에 근거하여 판단해야 합니다.", "É preciso julgar com base em dados confirmados."]]],
  ],
  guided: [
    mcq("Qual foi o método da pesquisa?", ["Questionário com cem respondentes e escala de cinco níveis.", "Entrevista aberta com uma única pessoa.", "Observação de uma loja durante um dia."], "Questionário com cem respondentes e escala de cinco níveis.", "응답자 백 명, 다섯 단계 측정."),
    cloze("Complete a base da conclusão: 설문 결과___ 근거하여 결론을 썼어요.", "에", "결과에 근거하여 = com base no resultado."),
    listen("Ouça e escreva o resultado revelado.", "대기 시간이 만족도에 영향을 주는 것으로 드러났어요.", "대기 시간이 만족도에 영향을 주는 것으로 드러났어요.", "Revelou-se que o tempo de espera influencia a satisfação."),
    reading("우리 팀은 고객 만족도에 대한 설문 조사를 진행했다. 응답자는 모두 백 명이었고, 만족도를 다섯 단계로 측정했다. 결과를 분석한 뒤, 우리는 “대기 시간이 짧을수록 만족도가 높다”는 가설을 세웠다.", "O que a equipe fez depois de analisar?", ["Formulou uma hipótese.", "Encerrou a pesquisa sem conclusão.", "Mudou o produto."], "Formulou uma hipótese.", "가설을 세웠어요."),
    translate("pt-ko", "Traduza: “Escrevi a conclusão com base no resultado da pesquisa.”", "설문 결과에 근거하여 결론을 썼어요.", "-에 근거하여 indica a base.", ["조사 결과에 근거하여 결론을 썼습니다."]),
  ],
  independent: [
    mcq("Qual frase relata um resultado de pesquisa?", ["대기 시간이 만족도에 영향을 주는 것으로 드러났어요.", "대기 시간이 짧으면 정말 좋겠어요.", "대기 시간을 줄입시다. 모두 함께요."], "대기 시간이 만족도에 영향을 주는 것으로 드러났어요.", "-ㄴ/는 것으로 드러났다 relata resultado."),
    cloze("Complete o resultado: 조사 결과, 두 변수 사이에 상관관계가 있___ 것으로 드러났어요.", "는", "있는 것으로 드러났어요 = revelou-se que há."),
    listen("Ouça e escreva o limite da interpretação.", "상관관계만으로 인과관계를 말할 수 없어요.", "상관관계만으로 인과관계를 말할 수 없어요.", "Não se pode falar de causalidade apenas com correlação."),
    translate("ko-pt", "Traduza: 표본과 방법을 함께 밝혀야 독자가 결과를 신뢰할 수 있어요.", "É preciso informar a amostra e o método para que o leitor confie no resultado.", "표본 = amostra; 신뢰하다 = confiar.", ["O leitor só confia no resultado se a amostra e o método forem informados."]),
    reading("자료를 보면 대기 시간과 만족도 사이에 상관관계가 있었다. 그러나 상관관계만으로 인과관계를 말할 수는 없다. 다른 변수가 영향을 주었을 가능성도 있기 때문이다.", "Por que não se pode afirmar causalidade?", ["Porque outras variáveis podem ter influenciado.", "Porque não havia dados.", "Porque todos responderam igual."], "Porque outras variáveis podem ter influenciado.", "다른 변수가 영향을 주었을 수 있어요."),
  ],
  summary: ["-ㄴ/는 것으로 드러났다 relata resultado com método.", "-에 근거하여 indica a base da afirmação.", "Correlação não é causalidade.", "Conteúdo novo permanece em revisão."],
  production: production(
    "Produção independente · resumo de pesquisa",
    "Resuma uma pesquisa pequena (real ou inventada) em cinco a sete frases: método, resultado, limite e próximo passo.",
    "작은 조사 결과를 방법, 결과, 한계 순서로 써 보세요.",
    ["Diga quem respondeu e como foi medido.", "Apresente o resultado principal.", "Use -ㄴ/는 것으로 드러났다 ou -에 근거하여.", "Reconheça uma limitação."],
    ["Método e amostra.", "Resultado principal.", "Limite explícito.", "Uma forma da lição.", "Próximo passo."],
    "이번 조사에는 백 명이 응답했어요. 응답자의 60%가 대기 시간이 짧다고 답했어요. 분석 결과, 대기 시간과 만족도 사이에는 상관관계가 있는 것으로 드러났어요. 하지만 인과관계를 단정하기는 어려워요. 추가 인터뷰가 필요합니다.",
    "Esta pesquisa teve cem respondentes. Sessenta por cento responderam que o tempo de espera é curto. A análise revelou que há correlação entre tempo de espera e satisfação. No entanto, é difícil afirmar causalidade. São necessárias entrevistas adicionais.",
    "Exemplo original de cinco frases. Método, resultado, limite e próximo passo estão separados. Compare a estrutura.",
  ),
});

/** b2-l18 — tendências, dados e previsão. */
export const B2_L18 = defineB2Lesson({
  id: "b2-l18", number: 18, moduleId: "b2-m04", title: "Números e tendências",
  objective: "Descrever tendências e previsões com precisão e cautela.",
  prerequisites: ["b2-l17"], estimatedMinutes: 75, dialogueTitle: "O gráfico do trimestre",
  intro: [
    { title: "A tendência é", body: "-는 추세이다 descreve uma direção geral observada nos dados: “a tendência é...”. Use com verbos de mudança (늘다, 줄다, 오르다). Compare com -는 경향이 있다 (tendência de comportamento) e -고 있다 (ação em andamento). Registro: escrito/formal.", ko: "온라인 주문이 늘어나는 추세예요." },
    { title: "Projeta-se que", body: "-ㄹ 것으로 전망된다 expressa uma previsão baseada em dados: “projeta-se que...”. É mais formal que -ㄹ 것 같다 e mais cauteloso que -ㄹ 것이다. Compare com -ㄹ 가능성이 있다 (possibilidade) e -ㄹ 예정이다 (plano). Registro: escrito/formal.", ko: "올해 매출이 5% 늘어날 것으로 전망됩니다." },
  ],
  dialogue: [
    ["지민", "이 그래프를 어떻게 읽어야 해요?", "Como devo ler este gráfico?"],
    ["수진", "작년 온라인 주문이 급증했어요. 전년 대비 10% 늘었고, 모바일 결제가 큰 부분을 차지했어요.", "No ano passado, os pedidos on-line aumentaram subitamente. Cresceram 10% em relação ao ano anterior, e o pagamento móvel respondeu por uma parte grande."],
    ["지민", "그럼 계속 성장하는 추세인가요?", "Então é uma tendência de crescimento contínuo?"],
    ["수진", "월별로 보면 변동이 커요. 여름에는 정체되다가 가을에 반등했고, 겨울에는 최고치를 기록했어요.", "Visto mês a mês, há grande variação. No verão estagnou, no outono teve recuperação e no inverno registrou o valor máximo."],
    ["지민", "오프라인 매장은요?", "E as lojas físicas?"],
    ["수진", "반대로 최저치로 떨어졌어요. 그래서 전체 성장이라고 단정하기는 어려워요.", "Ao contrário, caíram para o mínimo. Por isso, é difícil afirmar que houve crescimento geral."],
    ["지민", "보고서에는 어떻게 쓸 거예요?", "Como vai escrever no relatório?"],
    ["수진", "“온라인 주문은 증가 추세이지만, 월별 변동이 크다”라고 쓰고, 올해 전망치는 5% 성장으로 제시할 거예요.", "Vou escrever “os pedidos on-line estão em tendência de aumento, mas a variação mensal é grande” e apresentar a projeção deste ano como crescimento de 5%."],
  ],
  readingText: {
    titlePt: "Crescimento com variação",
    paragraphs: [
      "지난해 온라인 주문이 급증했다. 특히 모바일 결제가 늘면서 전체 매출의 절반을 차지했다. 전년 대비 10% 성장이라는 전망치도 발표됐다.",
      "그러나 월별 매출에는 변동이 컸다. 여름에는 주문이 정체되다가 가을에 반등했고, 겨울에는 최고치를 기록했다. 반면 오프라인 매장 매출은 최저치로 떨어졌다.",
      "숫자만 보면 성장처럼 보이지만, 원인을 단정하기는 이르다. 모바일 결제 증가가 전체 성장을 이끌었다고 말하려면 더 많은 자료가 필요하다. 보고서는 “증가 추세”와 “전망”을 구분해 써야 한다. 특히 계절 요인이 큰 영향을 주었을 수 있다. 또한 온라인과 오프라인의 기준이 다를 수 있다. 그 점을 조심해야 한다.",
    ],
    pt: "No ano passado, os pedidos on-line aumentaram subitamente. Em especial, com o crescimento do pagamento móvel, ele passou a representar metade das vendas totais. Também foi divulgada uma projeção de crescimento de 10% em relação ao ano anterior. No entanto, houve grande variação nas vendas mês a mês. No verão, os pedidos estagnaram; no outono, recuperaram-se; no inverno, registraram o valor máximo. Em contrapartida, as vendas das lojas físicas caíram ao mínimo. Olhando apenas os números, parece crescimento, mas é cedo para afirmar a causa. Para dizer que o aumento do pagamento móvel liderou o crescimento total, são necessários mais dados. O relatório deve separar “tendência de aumento” de “projeção”.",
    objective: "Distinguir dado, tendência e previsão, e reconhecer a variação por trás da média.",
  },
  reusedIds: ["ko:자료", "ko:원인", "ko:성장"],
  grammar: [
    ["-는 추세이다 — a tendência é", "동사 + -는 추세이다", "Descreve uma direção geral observada nos dados: “a tendência é...”. Use com verbos de mudança (늘다, 줄다, 오르다). Compare com -는 경향이 있다 (tendência de comportamento) e -고 있다 (ação em andamento). Registro: escrito/formal.", [["온라인 주문이 늘어나는 추세예요.", "A tendência é de aumento dos pedidos on-line."], ["인구가 줄어드는 추세입니다.", "A tendência é de redução da população."]]],
    ["-ㄹ 것으로 전망된다 — projeta-se que", "동사/형용사 + -ㄹ 것으로 전망된다", "Expressa uma previsão baseada em dados: “projeta-se que...”. É mais formal que -ㄹ 것 같다 e mais cauteloso que -ㄹ 것이다. Compare com -ㄹ 가능성이 있다 (possibilidade) e -ㄹ 예정이다 (plano). Registro: escrito/formal.", [["올해 매출이 5% 늘어날 것으로 전망됩니다.", "Projeta-se que as vendas deste ano cresçam 5%."], ["시장이 안정될 것으로 전망된다.", "Projeta-se que o mercado se estabilize."]]],
  ],
  guided: [
    mcq("Qual foi a tendência dos pedidos on-line?", ["Aumento com grande variação mensal.", "Queda constante ao longo do ano.", "Estabilidade total, sem oscilações."], "Aumento com grande variação mensal.", "증가 추세이지만 월별 변동이 커요."),
    cloze("Complete a tendência: 온라인 주문이 늘어나___ 추세예요.", "는", "늘어나는 추세 = tendência de aumento."),
    listen("Ouça e escreva a projeção para este ano.", "올해 매출이 5% 늘어날 것으로 전망됩니다.", "올해 매출이 5% 늘어날 것으로 전망됩니다.", "Projeta-se que as vendas deste ano cresçam 5%."),
    reading("지난해 온라인 주문이 급증했다. 특히 모바일 결제가 늘면서 전체 매출의 절반을 차지했다. 전년 대비 10% 성장이라는 전망치도 발표됐다.", "O que aconteceu com o pagamento móvel?", ["Cresceu e passou a ser metade das vendas.", "Caiu ao mínimo no mesmo período.", "Ficou estável, sem crescimento."], "Cresceu e passou a ser metade das vendas.", "모바일 결제가 전체 매출의 절반을 차지했어요."),
    translate("pt-ko", "Traduza: “Projeta-se que as vendas deste ano cresçam 5%.”", "올해 매출이 5% 늘어날 것으로 전망됩니다.", "-ㄹ 것으로 전망된다 expressa previsão.", ["올해 매출은 5% 성장할 것으로 전망됩니다."]),
  ],
  independent: [
    mcq("Qual frase descreve uma tendência observada?", ["온라인 주문이 늘어나는 추세예요.", "온라인 주문이 늘었어요.", "온라인 주문이 늘어날 거예요."], "온라인 주문이 늘어나는 추세예요.", "-는 추세이다 descreve a direção geral."),
    cloze("Complete a previsão: 시장이 안정될 것___ 전망된다.", "으로", "것으로 전망된다 = projeta-se que."),
    listen("Ouça e escreva a variação mensal.", "월별 매출 변동이 컸어요.", "월별 매출 변동이 컸어요.", "A variação mensal das vendas foi grande."),
    translate("ko-pt", "Traduza: 숫자만 보면 성장처럼 보이지만 원인을 단정하기는 이르다.", "Olhando apenas os números, parece crescimento, mas é cedo para afirmar a causa.", "단정하기는 이르다 = é cedo para afirmar.", ["Os números parecem crescimento, mas ainda é cedo para concluir a causa."]),
    reading("숫자만 보면 성장처럼 보이지만, 원인을 단정하기는 이르다. 모바일 결제 증가가 전체 성장을 이끌었다고 말하려면 더 많은 자료가 필요하다. 보고서는 ‘증가 추세’와 ‘전망’을 구분해 써야 한다.", "O que o relatório deve separar?", ["Tendência e projeção.", "Online e offline.", "Preço e qualidade."], "Tendência e projeção.", "증가 추세와 전망을 구분해야 해요."),
  ],
  summary: ["-는 추세이다 descreve direção geral dos dados.", "-ㄹ 것으로 전망된다 expressa previsão formal.", "Média pode esconder variação mensal.", "Conteúdo novo permanece em revisão."],
  production: production(
    "Produção independente · descrever um gráfico",
    "Descreva um gráfico imaginário em cinco a sete frases: dado principal, variação, tendência e uma projeção cautelosa.",
    "그래프를 보고 추세와 전망을 설명해 보세요.",
    ["Comece pelo dado principal.", "Mostre uma variação ou exceção.", "Use -는 추세이다 ou -ㄹ 것으로 전망된다.", "Não confunda correlação com causa."],
    ["Dado principal.", "Variação ou exceção.", "Tendência e projeção separadas.", "Uma forma da lição.", "Cautela causal."],
    "작년 온라인 주문은 전년 대비 10% 늘었어요. 특히 모바일 결제가 급증했어요. 다만 월별 변동이 커서 단순한 성장이라고 말하기는 어려워요. 올해는 5% 성장이 전망됩니다.",
    "No ano passado, os pedidos on-line cresceram 10% em relação ao ano anterior. O pagamento móvel, em especial, aumentou subitamente. No entanto, a variação mensal é grande, então é difícil falar em crescimento simples. Para este ano, projeta-se crescimento de 5%.",
    "Exemplo original de quatro frases. Dado, variação e projeção estão separados. Compare o grau de cautela.",
  ),
});

/** b2-l19 — risco, benefício e custo da tecnologia. */
export const B2_L19 = defineB2Lesson({
  id: "b2-l19", number: 19, moduleId: "b2-m04", title: "Quanto custa a tecnologia",
  objective: "Avaliar riscos, benefícios e custos de uma decisão tecnológica.",
  prerequisites: ["b2-l18"], estimatedMinutes: 75, dialogueTitle: "A ferramenta de automação",
  intro: [
    { title: "Quanto mais..., mais...", body: "-ㄹ수록 expressa proporção: “quanto mais..., mais...”. Pode seguir verbo ou adjetivo. A forma é -ㄹ수록; com ㄹ final, contrai (살수록, 알수록). Compare com -면 -ㄹ수록 (condição + proporção) e -는 만큼 (na medida em que).", ko: "자동화를 확대할수록 교육도 늘려야 해요." },
    { title: "Em troca de / ao custo de", body: "-는 대가로 indica o custo ou a contrapartida de uma escolha: “em troca de...”, “ao custo de...”. Compare com -는 대신(에) (em vez de/substituição) e -을 통해 (por meio de). Registro: neutro a formal, comum em análises de decisão.", ko: "효율을 얻는 대가로 통제 비용을 감수했어요." },
  ],
  dialogue: [
    ["아나", "이 자동화 도구를 도입할까요?", "Vamos adotar esta ferramenta de automação?"],
    ["민수", "편익이 분명해요. 반복 업무를 줄이면 직원들이 상담에 더 집중할 수 있어요.", "O benefício é claro. Se reduzirmos tarefas repetitivas, os funcionários podem se concentrar mais no atendimento."],
    ["아나", "하지만 초기 투자 비용이 크죠?", "Mas o custo inicial de investimento é alto, certo?"],
    ["민수", "네. 유지비도 계속 들어요. 그리고 시스템에 너무 의존하면 오류가 생겼을 때 대응하기 어려워요.", "Sim. Também há custo de manutenção contínuo. E, se dependermos demais do sistema, fica difícil reagir quando surge um erro."],
    ["아나", "일자리 문제도 있지 않아요?", "Também há a questão dos empregos, não é?"],
    ["민수", "그래서 숙련된 직원의 역할이 더 중요해져요. 자동화를 확대할수록 교육과 점검도 늘려야 해요.", "Por isso, o papel dos funcionários qualificados se torna mais importante. Quanto mais expandimos a automação, mais precisamos aumentar treinamento e verificação."],
    ["아나", "그럼 도입을 추천하시는 건가요?", "Então você recomenda a adoção?"],
    ["민수", "조건부로요. 편익을 얻는 대가로 위험성과 유지비를 감수할 수 있는지 먼저 확인해야 해요.", "Condicionalmente. Primeiro é preciso verificar se podemos assumir os riscos e os custos de manutenção em troca dos benefícios."],
  ],
  readingText: {
    titlePt: "O preço da eficiência",
    paragraphs: [
      "작은 회사가 반복 업무를 줄이기 위해 자동화 도구를 도입했다. 초기 투자 비용은 컸지만, 편익도 분명했다. 직원들은 단순 입력에서 벗어나 상담에 더 많은 시간을 쓸 수 있었다.",
      "그러나 위험성도 있었다. 시스템에 너무 의존하면 오류가 생겼을 때 대응하기 어렵다. 숙련된 직원이 줄어들면 문제가 커질 수 있고, 유지비도 계속 든다. 일자리가 줄 것이라는 우려도 나왔다.",
      "회사는 자동화를 확대할수록 교육과 점검을 함께 늘리기로 했다. 효율을 얻는 대가로 통제 비용을 감수한 셈이다. 기술 도입은 편익만 세는 일이 아니라, 누가 비용을 부담하는지 묻는 일이다. 그래서 회사는 도입 범위를 단계적으로 넓히기로 했다. 속도보다 지속 가능성이 중요했기 때문이다.",
    ],
    pt: "Uma pequena empresa adotou uma ferramenta de automação para reduzir tarefas repetitivas. O investimento inicial foi alto, mas o benefício também era claro. Os funcionários puderam dedicar mais tempo ao atendimento. No entanto, havia riscos. Se dependermos demais do sistema, fica difícil responder quando surge um erro. Se o número de funcionários qualificados diminuir, o problema pode crescer, e o custo de manutenção continua. Também surgiu a preocupação com a redução de empregos. A empresa decidiu aumentar treinamento e verificação na mesma medida em que expande a automação. Em troca da eficiência, assumiu o custo de controle. Adotar tecnologia não é apenas somar benefícios; é perguntar quem paga o custo.",
    objective: "Identificar benefício, risco, custo e quem assume cada custo na decisão.",
  },
  reusedIds: ["ko:회사", "ko:효율", "ko:문제"],
  grammar: [
    ["-ㄹ수록 — quanto mais..., mais...", "동사/형용사 + -ㄹ수록", "Expressa proporção: “quanto mais..., mais...”. Pode seguir verbo ou adjetivo; com ㄹ final, contrai (살수록, 알수록). Compare com -는 만큼 (na medida em que) e -면 -ㄹ수록 (condição + proporção). Registro: neutro, comum em análise e conselho.", [["자동화를 확대할수록 교육도 늘려야 해요.", "Quanto mais expandimos a automação, mais precisamos aumentar o treinamento."], ["생각할수록 문제가 복잡해져요.", "Quanto mais penso, mais o problema se complica."]]],
    ["-는 대가로 — em troca de; ao custo de", "동사 + -는 대가로 / 명사 + 의 대가로", "Indica o custo ou a contrapartida de uma escolha: “em troca de...”, “ao custo de...”. Compare com -는 대신(에) (substituição) e -을 통해 (meio). Registro: neutro a formal, comum em análises de decisão.", [["효율을 얻는 대가로 통제 비용을 감수했어요.", "Assumimos o custo de controle em troca da eficiência."], ["시간을 쓰는 대가로 좋은 결과를 얻었어요.", "Obtivemos um bom resultado ao custo de tempo."]]],
  ],
  guided: [
    mcq("Qual é o benefício principal da automação?", ["Reduzir tarefas repetitivas e liberar tempo para atendimento.", "Eliminar todos os funcionários da empresa.", "Aumentar o custo de manutenção dos sistemas."], "Reduzir tarefas repetitivas e liberar tempo para atendimento.", "반복 업무를 줄이고 상담에 집중할 수 있어요."),
    cloze("Complete a proporção: 자동화를 확대하___ 교육도 늘려야 해요.", "ㄹ수록", "확대할수록 = quanto mais expandir."),
    listen("Ouça e escreva o custo assumido.", "효율을 얻는 대가로 통제 비용을 감수했어요.", "효율을 얻는 대가로 통제 비용을 감수했어요.", "Assumimos o custo de controle em troca da eficiência."),
    reading("작은 회사가 반복 업무를 줄이기 위해 자동화 도구를 도입했다. 초기 투자 비용은 컸지만, 편익도 분명했다. 직원들은 단순 입력에서 벗어나 상담에 더 많은 시간을 쓸 수 있었다.", "Qual foi o benefício?", ["Mais tempo para atendimento.", "Menos clientes.", "Fim do treinamento."], "Mais tempo para atendimento.", "상담에 더 많은 시간을 쓸 수 있었어요."),
    translate("pt-ko", "Traduza: “Quanto mais expandimos a automação, mais precisamos aumentar o treinamento.”", "자동화를 확대할수록 교육도 늘려야 해요.", "-ㄹ수록 expressa proporção.", ["자동화를 확대할수록 교육도 더 늘려야 합니다."]),
  ],
  independent: [
    mcq("Qual frase expressa proporção?", ["생각할수록 문제가 복잡해져요.", "생각해서 문제가 복잡해졌어요.", "생각하면 문제가 복잡할 거예요."], "생각할수록 문제가 복잡해져요.", "-ㄹ수록 = quanto mais, mais."),
    cloze("Complete a contrapartida: 시간을 쓰___ 대가로 좋은 결과를 얻었어요.", "는", "쓰는 대가로 = ao custo de usar tempo."),
    listen("Ouça e escreva o risco da dependência.", "시스템에 너무 의존하면 대응하기 어려워요.", "시스템에 너무 의존하면 대응하기 어려워요.", "Se depender demais do sistema, fica difícil responder."),
    translate("ko-pt", "Traduza: 기술 도입은 편익만 세는 일이 아니에요.", "Adotar tecnologia não é apenas somar benefícios.", "편익 = benefício; 세다 = contar.", ["Introduzir tecnologia não é só contabilizar benefícios."]),
    reading("회사는 자동화를 확대할수록 교육과 점검을 함께 늘리기로 했다. 효율을 얻는 대가로 통제 비용을 감수한 셈이다. 기술 도입은 편익만 세는 일이 아니라, 누가 비용을 부담하는지 묻는 일이다. 그래서 회사는 도입 범위를 단계적으로 넓히기로 했다. 속도보다 지속 가능성이 중요했기 때문이다.", "O que a empresa decidiu?", ["Aumentar treinamento e verificação junto com a automação.", "Demitir todos os funcionários mais antigos.", "Ignorar os custos de manutenção e treinamento."], "Aumentar treinamento e verificação junto com a automação.", "교육과 점검을 함께 늘리기로 했어요."),
  ],
  summary: ["-ㄹ수록 expressa proporção.", "-는 대가로 nomeia o custo da escolha.", "Benefício sem custo e risco é análise incompleta.", "Conteúdo novo permanece em revisão."],
  production: production(
    "Produção independente · recomendar tecnologia",
    "Recomende ou rejeite uma ferramenta tecnológica em cinco a sete frases. Nomeie um benefício, um custo, um risco e quem assume o custo.",
    "기술 도입을 찬성하거나 반대하는 글을 써 보세요.",
    ["Diga o benefício concreto.", "Nomeie o custo inicial ou de manutenção.", "Use -ㄹ수록 ou -는 대가로.", "Diga quem assume o risco."],
    ["Benefício concreto.", "Custo nomeado.", "Risco nomeado.", "Uma forma da lição.", "Recomendação condicionada."],
    "저는 자동화 도구 도입을 추천해요. 반복 업무를 줄이면 상담 시간이 늘어나요. 물론 초기 투자와 유지비가 들어요. 그래서 교육과 점검을 함께 계획해야 해요. 편익만 보지 말고 위험성도 평가해야 합니다.",
    "Recomendo a adoção da ferramenta de automação. Reduzir tarefas repetitivas aumenta o tempo de atendimento. É claro que há investimento inicial e custo de manutenção. Por isso, é preciso planejar treinamento e verificação junto. Não se deve olhar só o benefício; é preciso avaliar também o risco.",
    "Exemplo original de cinco frases. Benefício, custo e condição aparecem. Compare a estrutura da recomendação.",
  ),
});

/** b2-l20 — processo e melhoria. */
export const B2_L20 = defineB2Lesson({
  id: "b2-l20", number: 20, moduleId: "b2-m04", title: "Como o processo funciona",
  objective: "Explicar um processo e avaliar uma proposta de melhoria.",
  prerequisites: ["b2-l19"], estimatedMinutes: 80, dialogueTitle: "A triagem de solicitações",
  intro: [
    { title: "Fazer com que", body: "-게 하다 é causativo: “fazer com que” ou “deixar que”. Use com verbos de ação; a forma não é um pedido educado. Compare com -도록 하다 (mandar/fazer de forma mais indireta) e -아/어지다 (passivo). Registro: neutro.", ko: "점검표가 누락을 빨리 발견하게 해요." },
    { title: "No processo de", body: "-는 과정에서 significa “no processo de...”. Destaca uma etapa ou um ponto dentro de um procedimento. Compare com -는 중에 (durante, mais temporal) e -는 동안 (enquanto). Registro: neutro a formal.", ko: "확인하는 과정에서 오류를 발견했어요." },
  ],
  dialogue: [
    ["아나", "고객 요청은 어떻게 처리해요?", "Como as solicitações dos clientes são processadas?"],
    ["민수", "접수, 확인, 처리의 세 단계로 되어 있어요. 각 단계에는 담당자와 점검표가 있어요.", "São três etapas: recepção, verificação e processamento. Cada etapa tem um responsável e uma lista de verificação."],
    ["아나", "문제는 어디에서 자주 생겨요?", "Onde os problemas costumam surgir?"],
    ["민수", "확인 단계예요. 입력 오류가 있어도 다음 단계로 넘어가면서 잘못된 안내가 나갔어요.", "Na etapa de verificação. Mesmo com erro de entrada, passava para a etapa seguinte e saía uma orientação errada."],
    ["아나", "새 절차는 무엇이 달라요?", "O que muda no novo procedimento?"],
    ["민수", "오류를 발견하면 즉시 되돌리게 설계했어요. 점검표도 간단하게 바꿨어요.", "Foi desenhado para voltar imediatamente quando se encontra um erro. Também simplificamos a lista de verificação."],
    ["아나", "직원들은 새 절차를 알고 있어요?", "Os funcionários conhecem o novo procedimento?"],
    ["민수", "다음 주부터 적용하기 전에 매뉴얼을 읽고 숙지하게 할 거예요. 사용자 피드백도 반영했어요. 좋은 과정은 한 번 설계하고 끝나는 게 아니에요.", "Antes de aplicar a partir da próxima semana, faremos com que leiam o manual e se familiarizem. Também incorporamos o feedback dos usuários. Um bom processo não termina quando é desenhado uma vez."],
  ],
  readingText: {
    titlePt: "O processo que aprende",
    paragraphs: [
      "고객 요청을 처리하는 과정은 세 단계로 나뉜다. 접수, 확인, 처리다. 각 단계에는 담당자와 점검표가 있고, 매뉴얼에 절차가 정리되어 있다.",
      "문제는 확인 단계에서 자주 생겼다. 입력 오류가 있어도 다음 단계로 넘어가면서 고객에게 잘못된 안내가 나갔다. 새 절차는 오류를 발견하면 즉시 되돌리게 설계되었다.",
      "다음 주부터 새 규칙을 적용한다. 직원들은 매뉴얼을 읽고 절차를 숙지해야 한다. 사용자 피드백을 반영해 점검표도 간단하게 바꿨다. 좋은 과정은 한 번 설계하고 끝나는 것이 아니라, 계속 고쳐지는 것이다. 그래서 다음 달에는 새 점검표를 시범 적용할 예정이다. 작은 개선도 계속 쌓이면 큰 차이를 만든다.",
    ],
    pt: "O processo de atendimento das solicitações dos clientes é dividido em três etapas: recepção, verificação e processamento. Cada etapa tem um responsável e uma lista de verificação, e o procedimento está organizado no manual. O problema costumava surgir na etapa de verificação. Mesmo quando havia erro de entrada, o caso passava para a etapa seguinte e o cliente recebia uma orientação errada. O novo procedimento foi desenhado para voltar imediatamente quando um erro é encontrado. A partir da próxima semana, a nova regra será aplicada. Os funcionários devem ler o manual e se familiarizar com o procedimento. Também simplificamos a lista de verificação refletindo o feedback dos usuários. Um bom processo não termina quando é desenhado uma vez; ele continua sendo corrigido.",
    objective: "Ordenar as etapas, localizar o ponto de falha e avaliar a melhoria proposta.",
  },
  reusedIds: ["ko:문제", "ko:절차", "ko:직원"],
  grammar: [
    ["-게 하다 — fazer com que", "동사 + -게 하다", "Causativo: “fazer com que” ou “deixar que”. Use com verbos de ação; não é um pedido educado. Compare com -도록 하다 (mandar/fazer de forma mais indireta) e -아/어지다 (passivo). Registro: neutro.", [["점검표가 누락을 빨리 발견하게 해요.", "A lista de verificação faz com que as omissões sejam descobertas rapidamente."], ["직원들이 새 절차를 이해하게 했어요.", "Fiz com que os funcionários entendessem o novo procedimento."]]],
    ["-는 과정에서 — no processo de", "동사 + -는 과정에서", "Significa “no processo de...”. Destaca uma etapa ou um ponto dentro de um procedimento. Compare com -는 중에 (durante, mais temporal) e -는 동안 (enquanto). Registro: neutro a formal.", [["확인하는 과정에서 오류를 발견했어요.", "Encontrei o erro no processo de verificação."], ["설계하는 과정에서 직원 의견을 들었어요.", "Ouvi a opinião dos funcionários no processo de design."]]],
  ],
  guided: [
    mcq("Onde o problema costumava surgir?", ["Na etapa de verificação.", "Na recepção dos pedidos.", "No manual de procedimentos."], "Na etapa de verificação.", "확인 단계에서 문제가 생겼어요."),
    cloze("Complete o processo: 확인하___ 과정에서 오류를 발견했어요.", "는", "확인하는 과정에서 = no processo de verificação."),
    listen("Ouça e escreva o que a lista de verificação faz.", "점검표가 누락을 빨리 발견하게 해요.", "점검표가 누락을 빨리 발견하게 해요.", "A lista de verificação faz com que as omissões sejam descobertas rapidamente."),
    reading("고객 요청을 처리하는 과정은 세 단계로 나뉜다. 접수, 확인, 처리다. 각 단계에는 담당자와 점검표가 있고, 매뉴얼에 절차가 정리되어 있다.", "Quais são as três etapas?", ["Recepção, verificação e processamento.", "Compra, venda e troca.", "Planejamento, férias e retorno."], "Recepção, verificação e processamento.", "접수, 확인, 처리."),
    translate("pt-ko", "Traduza: “Encontrei o erro no processo de verificação.”", "확인하는 과정에서 오류를 발견했어요.", "-는 과정에서 indica o processo.", ["확인 과정에서 오류를 발견했습니다."]),
  ],
  independent: [
    mcq("Qual frase é causativa?", ["점검표가 누락을 빨리 발견하게 해요.", "점검표가 누락을 발견했어요.", "점검표를 발견했어요."], "점검표가 누락을 빨리 발견하게 해요.", "-게 하다 = fazer com que."),
    cloze("Complete o processo: 설계하___ 과정에서 직원 의견을 들었어요.", "는", "설계하는 과정에서 = no processo de design."),
    listen("Ouça e escreva a nova regra.", "다음 주부터 새 규칙을 적용해요.", "다음 주부터 새 규칙을 적용해요.", "A nova regra será aplicada a partir da próxima semana."),
    translate("ko-pt", "Traduza: 직원들은 매뉴얼을 읽고 절차를 숙지해야 해요.", "Os funcionários devem ler o manual e se familiarizar com o procedimento.", "숙지하다 = familiarizar-se; 절차 = procedimento.", ["Os funcionários precisam ler o manual e dominar o procedimento."]),
    reading("다음 주부터 새 규칙을 적용한다. 직원들은 매뉴얼을 읽고 절차를 숙지해야 한다. 사용자 피드백을 반영해 점검표도 간단하게 바꿨다. 좋은 과정은 한 번 설계하고 끝나는 것이 아니라, 계속 고쳐지는 것이다. 그래서 다음 달에는 새 점검표를 시범 적용할 예정이다. 작은 개선도 계속 쌓이면 큰 차이를 만든다.", "O que caracteriza um bom processo?", ["Ele continua sendo corrigido.", "Ele nunca muda.", "Ele dispensa manual."], "Ele continua sendo corrigido.", "계속 고쳐지는 것."),
  ],
  summary: ["-게 하다 é causativo.", "-는 과정에서 localiza a etapa.", "Processo bom é revisado com feedback.", "Conteúdo novo permanece em revisão."],
  production: production(
    "Produção independente · explicar e melhorar um processo",
    "Explique um processo em cinco etapas e proponha uma melhoria. Diga qual ponto de falha a melhoria resolve.",
    "과정을 설명하고 개선안을 제안해 보세요.",
    ["Ordene as etapas.", "Nomeie o responsável e o critério.", "Use -게 하다 ou -는 과정에서.", "Ligue a melhoria ao ponto de falha."],
    ["Etapas ordenadas.", "Responsável e critério.", "Ponto de falha identificado.", "Uma forma da lição.", "Melhoria justificada."],
    "저희 절차는 접수, 확인, 처리의 세 단계로 되어 있어요. 먼저 접수 담당자가 내용을 확인해요. 그다음 점검표로 누락을 확인합니다. 마지막으로 처리 결과를 고객에게 알려요. 각 단계에서 오류가 발견되면 바로 되돌리게 했어요.",
    "Nosso procedimento tem três etapas: recepção, verificação e processamento. Primeiro, o responsável pela recepção confere o conteúdo. Depois, verifica omissões com a lista de verificação. Por fim, informa o resultado ao cliente. Fizemos com que cada etapa retorne imediatamente quando um erro é encontrado.",
    "Exemplo original de cinco frases. As etapas estão ordenadas e a melhoria aparece no fim. Compare a estrutura.",
  ),
});
