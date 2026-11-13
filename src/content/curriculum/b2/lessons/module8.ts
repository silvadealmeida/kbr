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

/** b2-l36 — leitura longa e síntese. */
export const B2_L36 = defineB2Lesson({
  id: "b2-l36", number: 36, moduleId: "b2-m08", title: "Ler um texto longo",
  objective: "Ler um texto longo, identificar sua estrutura e sintetizar a ideia central.",
  prerequisites: ["b2-c07"], estimatedMinutes: 80, dialogueTitle: "O artigo sobre o bairro",
  intro: [
    { title: "Enquanto; em meio a", body: "-ㄴ/는 가운데 significa “enquanto” ou “em meio a”. Use -는 가운데 com verbos e -ㄴ/은 가운데 com adjetivos. Compare com -는 동안 (enquanto, temporal) e -는 중에 (durante). Registro: escrito/formal.", ko: "새로운 가게가 늘어나는 가운데 오래된 시장은 문을 닫았다." },
    { title: "Além de", body: "-ㄴ/는 데다가 acrescenta informação na mesma direção: “além de...”. Compare com -뿐만 아니라 (não só, mais enfático) e -고 (e, neutro). Registro: neutro a formal.", ko: "임대료가 오르는 데다가 교통 문제까지 겹쳤어요." },
  ],
  dialogue: [
    ["아나", "이 기사, 생각보다 길어요.", "Este artigo é mais longo do que eu pensava."],
    ["민수", "다섯 문단이에요. 첫 문단은 문제, 가운데 문단은 원인과 사례, 마지막은 제안이에요.", "São cinco parágrafos. O primeiro é o problema, os do meio são causas e exemplos, e o último é a proposta."],
    ["아나", "도시화가 진행되는 가운데 상업 지역이 확대됐다고 나와 있어요.", "Diz que, enquanto a urbanização avançava, a área comercial se expandiu."],
    ["민수", "네. 녹지 공간은 축소됐고, 재개발 계획도 발표됐어요.", "Sim. A área verde diminuiu, e o plano de reurbanização também foi anunciado."],
    ["아나", "주민들은 어떻게 반응했어요?", "Como os moradores reagiram?"],
    ["민수", "논의가 오랫동안 지속됐어요. 임대료가 오르는 데다가 교통 문제까지 겹쳐서 부담이 커졌거든요.", "A discussão durou muito. Além do aluguel subir, o problema de transporte se somou, e o peso aumentou."],
    ["아나", "결론은 뭐예요?", "Qual é a conclusão?"],
    ["민수", "개발과 보존을 동시에 해결하기는 어렵지만, 비용을 누가 부담하는지 먼저 물어야 한다는 거예요. 제안은 설명회와 임대료 대책이에요.", "É difícil resolver desenvolvimento e preservação ao mesmo tempo, mas é preciso perguntar primeiro quem assume o custo. As propostas são uma audiência pública e medidas para o aluguel."],
  ],
  readingText: {
    titlePt: "O bairro que muda",
    paragraphs: [
      "우리 동네는 최근 빠르게 급변하고 있다. 도시화가 진행되면서 상업 지역은 확대되고, 녹지 공간은 축소되었다. 재개발 계획이 발표된 뒤로 주민들의 관심도 커졌다.",
      "개발과 보존을 동시에 해결하기는 어렵다. 새로운 가게가 늘어나는 가운데, 오래된 시장은 문을 닫았다. 임대료가 오르는 데다가 교통 문제까지 겹쳐 생활비 부담이 커졌다.",
      "주민들은 설명회를 요구했다. 논의가 오랫동안 지속되었지만, 모든 요구를 받아들이기는 어려웠다. 중요한 것은 변화의 속도보다, 누가 그 변화의 비용을 부담하는지 묻는 일이다. 주민들은 다음 달 설명회에서 구체적인 대책을 요구할 예정이다. 그 과정을 기록해야 한다.",
    ],
    pt: "Nosso bairro vem mudando rapidamente. Com o avanço da urbanização, a área comercial se expandiu e a área verde diminuiu. Depois do anúncio do plano de reurbanização, o interesse dos moradores também cresceu. Resolver desenvolvimento e preservação ao mesmo tempo é difícil. Enquanto novas lojas surgiam, o mercado antigo fechou as portas. Além do aluguel subir, o problema de transporte se somou, e o peso do custo de vida aumentou. Os moradores exigiram uma audiência pública. A discussão durou muito tempo, mas era difícil aceitar todas as reivindicações. O importante não é a velocidade da mudança, mas perguntar quem assume o custo dessa mudança.",
    objective: "Identificar a estrutura do artigo, a tese e a ressalva sobre quem paga o custo.",
  },
  reusedIds: ["ko:문제", "ko:교통", "ko:계획"],
  grammar: [
    ["-ㄴ/는 가운데 — enquanto; em meio a", "동사 + -는 가운데 / 형용사 + -ㄴ/은 가운데", "Significa “enquanto” ou “em meio a”. Use -는 가운데 com verbos e -ㄴ/은 가운데 com adjetivos. Compare com -는 동안 (enquanto, temporal) e -는 중에 (durante). Registro: escrito/formal.", [["새로운 가게가 늘어나는 가운데 오래된 시장은 문을 닫았다.", "Enquanto novas lojas surgiam, o mercado antigo fechou as portas."], ["어려운 상황인 가운데에서도 주민들은 대화를 이어 갔다.", "Mesmo em meio a uma situação difícil, os moradores continuaram o diálogo."]]],
    ["-ㄴ/는 데다가 — além de", "동사 + -는 데다가 / 형용사 + -ㄴ/은 데다가", "Acrescenta informação na mesma direção: “além de...”. Compare com -뿐만 아니라 (não só, mais enfático) e -고 (e, neutro). Registro: neutro a formal.", [["임대료가 오르는 데다가 교통 문제까지 겹쳤어요.", "Além do aluguel subir, o problema de transporte se somou."], ["비가 오는 데다가 바람도 불었습니다.", "Além de chover, também ventava."]]],
  ],
  guided: [
    mcq("Qual é a estrutura do artigo?", ["Problema, causas e proposta.", "Poema, música e receita.", "Apenas uma lista de números."], "Problema, causas e proposta.", "첫 문단은 문제, 가운데는 원인, 마지막은 제안이에요."),
    cloze("Complete o acréscimo: 임대료가 오르___ 데다가 교통 문제까지 겹쳤어요.", "는", "오르는 데다가 = além de subir."),
    listen("Ouça e escreva o que diminuiu.", "녹지 공간이 축소됐어요.", "녹지 공간이 축소됐어요.", "A área verde diminuiu."),
    reading("우리 동네는 최근 빠르게 급변하고 있다. 도시화가 진행되면서 상업 지역은 확대되고, 녹지 공간은 축소되었다. 재개발 계획이 발표된 뒤로 주민들의 관심도 커졌다.", "O que aconteceu com a área verde?", ["Diminuiu.", "Aumentou.", "Ficou igual."], "Diminuiu.", "녹지 공간은 축소됐어요."),
    translate("pt-ko", "Traduza: “Além do aluguel subir, o problema de transporte se somou.”", "임대료가 오르는 데다가 교통 문제까지 겹쳤어요.", "-는 데다가 acrescenta informação na mesma direção.", ["임대료가 오르는 데다가 교통 문제까지 겹쳤습니다."]),
  ],
  independent: [
    mcq("Qual frase expressa “além de”?", ["비가 오는 데다가 바람도 불었어요.", "비가 와서 바람이 불었어요.", "비가 오면 바람이 불 거예요."], "비가 오는 데다가 바람도 불었어요.", "-는 데다가 acrescenta informação."),
    cloze("Complete o “em meio a”: 새로운 가게가 늘어나___ 가운데 오래된 시장은 문을 닫았어요.", "는", "늘어나는 가운데 = enquanto novas lojas surgiam."),
    listen("Ouça e escreva a tese sobre o custo.", "변화의 비용을 누가 부담하는지 물어야 해요.", "변화의 비용을 누가 부담하는지 물어야 해요.", "É preciso perguntar quem assume o custo da mudança."),
    translate("ko-pt", "Traduza: 개발과 보존을 동시에 해결하기는 어려워요.", "É difícil resolver desenvolvimento e preservação ao mesmo tempo.", "동시에 = ao mesmo tempo; 보존 = preservação.", ["Não é fácil conciliar desenvolvimento e preservação ao mesmo tempo."]),
    reading("개발과 보존을 동시에 해결하기는 어렵다. 새로운 가게가 늘어나는 가운데, 오래된 시장은 문을 닫았다. 임대료가 오르는 데다가 교통 문제까지 겹쳐 생활비 부담이 커졌다.", "O que tornou a vida mais cara?", ["Aluguel alto e problema de transporte.", "A abertura do mercado antigo.", "A redução das lojas."], "Aluguel alto e problema de transporte.", "임대료 상승과 교통 문제가 겹쳤어요."),
  ],
  summary: ["-ㄴ/는 가운데 significa enquanto/em meio a.", "-ㄴ/는 데다가 acrescenta informação.", "Texto longo tem estrutura e tese reconhecíveis.", "Conteúdo novo permanece em revisão."],
  production: production(
    "Produção independente · resumo de texto longo",
    "Resuma um texto longo (real ou inventado) em cinco a sete frases. Inclua a tese, dois argumentos e uma ressalva.",
    "긴 글을 읽고 중심 생각과 근거를 요약해 보세요.",
    ["Diga o tema e a tese.", "Resuma dois argumentos.", "Use -는 가운데 ou -는 데다가.", "Inclua uma ressalva."],
    ["Tese clara.", "Dois argumentos.", "Uma forma da lição.", "Ressalva preservada.", "Resumo sem copiar frases inteiras."],
    "이 글은 도시화로 동네가 빠르게 변한다고 말해요. 상업 지역은 확대됐지만 녹지 공간은 축소됐어요. 임대료가 오르는 데다가 교통 문제까지 겹쳐 생활비 부담이 커졌어요. 그래서 주민들은 설명회와 임대료 대책을 요구했어요.",
    "Este texto diz que o bairro muda rapidamente com a urbanização. A área comercial se expandiu, mas a área verde diminuiu. Além do aluguel subir, o problema de transporte se somou, e o peso do custo de vida aumentou. Por isso, os moradores exigiram uma audiência pública e medidas para o aluguel.",
    "Exemplo original de quatro frases. Tese, dois argumentos e consequência aparecem. Compare a estrutura.",
  ),
});

/** b2-l37 — arquitetura do argumento. */
export const B2_L37 = defineB2Lesson({
  id: "b2-l37", number: 37, moduleId: "b2-m08", title: "Construir um argumento",
  objective: "Organizar um argumento escrito com tese, evidência, objeção e conclusão.",
  prerequisites: ["b2-l36"], estimatedMinutes: 80, dialogueTitle: "A revisão do texto de opinião",
  intro: [
    { title: "Por um lado; ao mesmo tempo", body: "-는 한편(으로) apresenta dois lados ou duas ações paralelas: “por um lado...”, “ao mesmo tempo...”. Compare com -는 반면 (contraste) e -고도 (mesmo fazendo). Registro: neutro a formal.", ko: "재택근무는 시간을 절약하는 한편 협업을 어렵게 만들기도 해요." },
    { title: "Já que; uma vez que", body: "-ㄴ/는 이상 estabelece uma premissa aceita e tira uma consequência: “já que...”, “uma vez que...”. Compare com -니까 (porque) e -는 한 (enquanto). Registro: neutro a formal.", ko: "회사를 선택한 이상 책임을 다해야 해요." },
  ],
  dialogue: [
    ["아나", "이 글, 주장은 분명한데 중간에 힘이 빠지는 느낌이에요.", "Neste texto, a tese é clara, mas sinto que perde força no meio."],
    ["민수", "서론에서 문제를 제시하고, 본론에서 근거를 연결했어요. 그런데 반대 의견을 다루지 않았어요.", "Apresentei o problema na introdução e conectei as evidências no corpo. Mas não tratei da objeção."],
    ["아나", "그럼 반론을 넣어야겠네요.", "Então é preciso incluir a objeção."],
    ["민수", "네. 재택근무는 시간을 절약하는 한편 협업을 어렵게 만들기도 해요. 이 점을 인정하고 답해야 해요.", "Sim. O home office economiza tempo, ao mesmo tempo que pode dificultar a colaboração. É preciso reconhecer isso e responder."],
    ["아나", "결론은 어떻게 쓸 거예요?", "Como vai escrever a conclusão?"],
    ["민수", "회사를 선택한 이상 책임을 다해야 한다는 점을 강조할 거예요. 다만 모든 업무를 같은 방식으로 평가해서는 안 된다고 덧붙일게요.", "Vou enfatizar que, uma vez que escolhemos a empresa, devemos cumprir nossas responsabilidades. Mas acrescentarei que não se deve avaliar todo trabalho do mesmo modo."],
    ["아나", "논조는 유지됐어요?", "O tom do argumento se manteve?"],
    ["민수", "네. 같은 주장을 반복하지 않고, 사례와 자료를 연결했어요. 각 문단의 역할을 구조화하니 설득이 더 쉬워졌어요.", "Sim. Não repeti a mesma tese; conectei exemplos e dados. Ao estruturar o papel de cada parágrafo, ficou mais fácil persuadir."],
  ],
  readingText: {
    titlePt: "Um argumento que se sustenta",
    paragraphs: [
      "글의 서론에서는 문제를 분명히 제시해야 한다. 본론에서는 근거를 제시하고, 결론에서는 주장을 다시 강조한다. 이 구조가 갖추어지면 독자는 논조를 따라가기 쉽다.",
      "같은 주장을 반복하면 설득력이 떨어질 수 있다. 대신 사례와 자료를 연결하고, 각 문단의 역할을 구조화해야 한다. 한편으로는 반대 의견도 다루어야 한다.",
      "주장을 개진하는 것과 상대를 설득하는 것은 다르다. 근거가 부족한 이상, 목소리를 높여도 설득은 어렵다. 좋은 글은 논리와 태도가 함께 갖추어져야 한다. 그래서 나는 결론을 쓰기 전에 반론을 먼저 정리했다. 그 과정에서 주장이 더 분명해졌다. 설득은 독자의 시간을 존중하는 일이다.",
    ],
    pt: "Na introdução, é preciso apresentar o problema com clareza. No corpo, apresentamos as evidências e, na conclusão, voltamos a enfatizar a tese. Quando essa estrutura está presente, o leitor acompanha o tom do argumento com facilidade. Repetir a mesma tese pode enfraquecer a persuasão. Em vez disso, é preciso conectar exemplos e dados e estruturar o papel de cada parágrafo. Por um lado, também é necessário tratar da opinião contrária. Apresentar uma opinião e persuadir o outro são coisas diferentes. Já que a evidência é insuficiente, não adianta levantar a voz. Um bom texto precisa combinar lógica e atitude.",
    objective: "Reconhecer tese, evidência, objeção e conclusão na arquitetura do texto.",
  },
  reusedIds: ["ko:주장", "ko:근거", "ko:의견"],
  grammar: [
    ["-는 한편(으로) — por um lado; ao mesmo tempo", "동사 + -는 한편(으로) / 형용사 + -ㄴ/은 한편(으로)", "Apresenta dois lados ou duas ações paralelas: “por um lado...”, “ao mesmo tempo...”. Compare com -는 반면 (contraste) e -고도 (mesmo fazendo). Registro: neutro a formal.", [["재택근무는 시간을 절약하는 한편 협업을 어렵게 만들기도 해요.", "O home office economiza tempo, ao mesmo tempo que pode dificultar a colaboração."], ["그 정책은 비용을 줄이는 한편 새로운 문제를 낳았습니다.", "A política reduziu custos, ao mesmo tempo que criou novos problemas."]]],
    ["-ㄴ/는 이상 — já que; uma vez que", "동사 + -는 이상 / 형용사 + -ㄴ/은 이상", "Estabelece uma premissa aceita e tira uma consequência: “já que...”, “uma vez que...”. Compare com -니까 (porque) e -는 한 (enquanto). Registro: neutro a formal.", [["회사를 선택한 이상 책임을 다해야 해요.", "Já que escolhemos a empresa, devemos cumprir nossas responsabilidades."], ["약속한 이상 지켜야 합니다.", "Uma vez que prometemos, é preciso cumprir."]]],
  ],
  guided: [
    mcq("O que faltava no texto?", ["A objeção contrária.", "O título.", "A conclusão."], "A objeção contrária.", "반대 의견을 다루지 않았어요."),
    cloze("Complete o contraste paralelo: 재택근무는 시간을 절약하___ 한편 협업을 어렵게 만들기도 해요.", "는", "절약하는 한편 = ao mesmo tempo que economiza."),
    listen("Ouça e escreva a consequência da escolha.", "회사를 선택한 이상 책임을 다해야 해요.", "회사를 선택한 이상 책임을 다해야 해요.", "Já que escolhemos a empresa, devemos cumprir nossas responsabilidades."),
    reading("글의 서론에서는 문제를 분명히 제시해야 한다. 본론에서는 근거를 제시하고, 결론에서는 주장을 다시 강조한다. 이 구조가 갖추어지면 독자는 논조를 따라가기 쉽다.", "Qual é a função da conclusão?", ["Reforçar a tese.", "Apresentar um novo tema.", "Listar todas as fontes."], "Reforçar a tese.", "결론에서는 주장을 다시 강조해요."),
    translate("pt-ko", "Traduza: “Já que escolhemos a empresa, devemos cumprir nossas responsabilidades.”", "회사를 선택한 이상 책임을 다해야 해요.", "-ㄴ/는 이상 estabelece a premissa.", ["회사를 선택한 이상 책임을 다해야 합니다."]),
  ],
  independent: [
    mcq("Qual frase apresenta dois lados paralelos?", ["그 정책은 비용을 줄이는 한편 새 문제를 낳았어요.", "그 정책은 비용을 줄였어요.", "그 정책은 새 문제를 낳았어요."], "그 정책은 비용을 줄이는 한편 새 문제를 낳았어요.", "-는 한편 apresenta os dois lados."),
    cloze("Complete a premissa: 약속한 ___ 지켜야 합니다.", "이상", "약속한 이상 = uma vez que prometeu."),
    listen("Ouça e escreva a estratégia de persuasão.", "사례와 자료를 연결하면 설득이 쉬워져요.", "사례와 자료를 연결하면 설득이 쉬워져요.", "Conectar exemplos e dados facilita a persuasão."),
    translate("ko-pt", "Traduza: 같은 주장을 반복하면 설득력이 떨어져요.", "Repetir a mesma tese enfraquece a persuasão.", "반복하다 = repetir; 설득력 = poder de persuasão.", ["A repetição da mesma tese reduz a força persuasiva."]),
    reading("주장을 개진하는 것과 상대를 설득하는 것은 다르다. 근거가 부족한 이상, 목소리를 높여도 설득은 어렵다. 좋은 글은 논리와 태도가 함께 갖추어져야 한다. 그래서 나는 결론을 쓰기 전에 반론을 먼저 정리했다. 그 과정에서 주장이 더 분명해졌다. 설득은 독자의 시간을 존중하는 일이다.", "O que um bom texto precisa combinar?", ["Lógica e atitude.", "Volume e velocidade.", "Título e imagem."], "Lógica e atitude.", "논리와 태도가 함께 갖추어져야 해요."),
  ],
  summary: ["-는 한편(으로) apresenta dois lados.", "-ㄴ/는 이상 estabelece premissa e consequência.", "Argumento completo inclui objeção e conclusão.", "Conteúdo novo permanece em revisão."],
  production: production(
    "Produção independente · argumento estruturado",
    "Escreva um argumento de seis a oito frases com tese, dois argumentos, uma objeção respondida e conclusão. Use -는 한편 ou -ㄴ/는 이상.",
    "주장, 근거, 반론, 결론을 갖춘 글을 써 보세요.",
    ["Enuncie a tese.", "Apresente dois argumentos.", "Reconheça e responda à objeção.", "Conclua retomando a tese."],
    ["Tese explícita.", "Dois argumentos.", "Objeção respondida.", "Uma forma da lição.", "Conclusão coerente."],
    "저는 재택근무를 유지해야 한다고 생각해요. 첫째, 통근 시간을 줄이면 집중할 시간이 늘어나요. 둘째, 집에서 일하는 사람도 온라인으로 협업할 수 있어요. 물론 모든 업무가 재택에 적합한 것은 아니에요. 그런 업무는 출근을 원칙으로 하되, 선택권을 주는 게 좋아요. 회사를 선택한 이상 책임을 다하되, 방식은 유연하게 정할 수 있다고 생각해요.",
    "Penso que o home office deve ser mantido. Primeiro, reduzir o tempo de deslocamento aumenta o tempo de concentração. Segundo, quem trabalha em casa também pode colaborar on-line. É claro que nem todo trabalho é adequado ao home office. Para esses casos, o princípio pode ser o trabalho presencial, mas é bom dar escolha. Já que escolhemos a empresa, devemos cumprir nossas responsabilidades, mas podemos definir o formato com flexibilidade.",
    "Exemplo original de seis frases. Tese, dois argumentos, concessão e conclusão aparecem. Compare a arquitetura.",
  ),
});

/** b2-l38 — síntese de fontes. */
export const B2_L38 = defineB2Lesson({
  id: "b2-l38", number: 38, moduleId: "b2-m08", title: "Resumir e sintetizar",
  objective: "Sintetizar duas fontes curtas sem apagar divergências.",
  prerequisites: ["b2-l37"], estimatedMinutes: 80, dialogueTitle: "Duas fontes, uma síntese",
  intro: [
    { title: "O que foi dito/feito (formal)", body: "-ㄴ/는 바 é uma nominalização formal: “o que foi dito/feito”. Use em relatórios e documentos. Compare com -는 것 (neutro) e -는 내용 (conteúdo). Registro: escrito/formal.", ko: "조사한 바에 따르면 두 집단의 차이가 컸습니다." },
    { title: "Resume-se como", body: "-는 것으로 요약된다 significa “resume-se como”. Apresenta a conclusão de uma síntese. Compare com -는 셈이다 (pode-se dizer que) e -고 요약할 수 있다 (pode-se resumir dizendo). Registro: formal/escrito.", ko: "두 자료의 공통점은 비용 문제로 요약된다." },
  ],
  dialogue: [
    ["아나", "두 자료를 하나로 합치려고 하는데, 쉽지 않네요.", "Quero juntar as duas fontes em uma, mas não é fácil."],
    ["민수", "먼저 각각의 요약문을 만들어 보세요. 핵심만 간추리고, 반복은 생략하는 거예요.", "Primeiro faça um resumo de cada uma. Sintetize o essencial e omita as repetições."],
    ["아나", "설명이 부족한 부분은요?", "E as partes com explicação insuficiente?"],
    ["민수", "짧게 부연하고, 긴 문장은 압축하세요. 자료의 순서를 새로 재구성할 수도 있어요.", "Complemente brevemente e comprima as frases longas. Também pode reorganizar a ordem dos materiais."],
    ["아나", "보고서 형식은 어떻게 해요?", "E o formato do relatório?"],
    ["민수", "개조식으로 쓰면 읽기 쉬워요. 조사한 바에 따르면 두 자료의 결론이 조금 달라요.", "Escrever em tópicos facilita a leitura. Segundo o que foi pesquisado, as conclusões das duas fontes são um pouco diferentes."],
    ["아나", "그 차이도 넣어야죠?", "Também devo incluir essa diferença, certo?"],
    ["민수", "물론이죠. 두 내용을 종합해 결론을 쓰되, 공통점과 차이점을 모두 남기세요. 요약은 줄이는 일이 아니라, 중요한 것을 남기는 일이에요.", "Claro. Escreva a conclusão sintetizando os dois conteúdos, mas preserve tanto as semelhanças quanto as diferenças. Resumir não é reduzir, é manter o que é importante."],
  ],
  readingText: {
    titlePt: "Como sintetizar sem apagar diferenças",
    paragraphs: [
      "두 자료를 하나로 통합하려면 먼저 각각의 요약문을 만들어야 한다. 핵심만 간추려 쓰고, 반복되는 부분은 생략한다. 그다음 공통점과 차이점을 표로 정리한다.",
      "설명이 부족한 부분은 조금 부연한다. 긴 문장은 압축하고, 자료의 순서를 새로 재구성한다. 보고서는 개조식으로 쓰면 읽기 쉽다.",
      "마지막으로 두 내용을 종합해 결론을 쓴다. 요약은 많이 줄이는 일이 아니라, 중요한 것을 남기는 일이다. 출처를 밝히는 것도 잊지 않아야 한다. 보고서를 읽는 사람은 요약문만으로도 핵심을 파악할 수 있어야 한다. 그래서 나는 표와 소제목을 함께 사용했다. 다음에는 인용문도 짧게 넣을 계획이다. 요약은 기술이다.",
    ],
    pt: "Para integrar dois materiais em um, primeiro é preciso criar um resumo de cada um. Sintetize apenas o essencial e omita as repetições. Em seguida, organize os pontos em comum e as diferenças em uma tabela. As partes com explicação insuficiente recebem um complemento breve. Frases longas são comprimidas e a ordem dos materiais pode ser reorganizada. Se o relatório for escrito em tópicos, fica mais fácil de ler. Por fim, sintetize os dois conteúdos e escreva a conclusão. Resumir não é reduzir muito, mas manter o que é importante. Também não se deve esquecer de indicar a fonte.",
    objective: "Sintetizar duas fontes preservando convergência, divergência e atribuição.",
  },
  reusedIds: ["ko:자료", "ko:결론", "ko:내용"],
  grammar: [
    ["-ㄴ/는 바 — o que foi dito/feito (formal)", "동사 + -ㄴ/는 바 / 형용사 + -ㄴ/은 바", "Nominalização formal: “o que foi dito/feito”. Use em relatórios e documentos. Compare com -는 것 (neutro) e -는 내용 (conteúdo). Registro: escrito/formal.", [["조사한 바에 따르면 두 집단의 차이가 컸습니다.", "Segundo o que foi pesquisado, a diferença entre os dois grupos era grande."], ["안내드린 바와 같이 일정이 변경되었습니다.", "Conforme informado, o cronograma foi alterado."]]],
    ["-는 것으로 요약된다 — resume-se como", "동사/형용사 + -는 것으로 요약된다", "Significa “resume-se como”. Apresenta a conclusão de uma síntese. Compare com -는 셈이다 (pode-se dizer que) e -고 요약할 수 있다 (pode-se resumir dizendo). Registro: formal/escrito.", [["두 자료의 공통점은 비용 문제로 요약된다.", "O ponto comum das duas fontes resume-se à questão do custo."], ["논의는 세 가지 쟁점으로 요약됩니다.", "A discussão resume-se a três questões."]]],
  ],
  guided: [
    mcq("Qual é o primeiro passo da síntese?", ["Criar um resumo de cada fonte.", "Copiar as duas fontes inteiras.", "Escolher só uma fonte."], "Criar um resumo de cada fonte.", "각각의 요약문을 먼저 만들어요."),
    cloze("Complete a nominalização formal: 조사한 ___에 따르면 차이가 컸습니다.", "바", "조사한 바에 따르면 = segundo o que foi pesquisado."),
    listen("Ouça e escreva o resumo da discussão.", "논의는 세 가지 쟁점으로 요약됩니다.", "논의는 세 가지 쟁점으로 요약됩니다.", "A discussão resume-se a três questões."),
    reading("두 자료를 하나로 통합하려면 먼저 각각의 요약문을 만들어야 한다. 핵심만 간추려 쓰고, 반복되는 부분은 생략한다. 그다음 공통점과 차이점을 표로 정리한다.", "O que fazer depois dos resumos?", ["Organizar semelhanças e diferenças.", "Apagar as duas fontes.", "Escrever a conclusão antes."], "Organizar semelhanças e diferenças.", "공통점과 차이점을 표로 정리해요."),
    translate("pt-ko", "Traduza: “O ponto comum das duas fontes resume-se à questão do custo.”", "두 자료의 공통점은 비용 문제로 요약된다.", "-는 것으로 요약된다 apresenta a síntese.", ["두 자료의 공통점은 비용 문제로 요약됩니다."]),
  ],
  independent: [
    mcq("Qual frase usa nominalização formal?", ["조사한 바에 따르면 차이가 컸습니다.", "조사했어요. 지난달에 했어요.", "조사할 거예요. 다음 달에요."], "조사한 바에 따르면 차이가 컸습니다.", "-ㄴ/는 바 é nominalização formal."),
    cloze("Complete a síntese: 논의는 세 가지 쟁점___ 요약됩니다.", "으로", "쟁점으로 요약된다 = resume-se a três questões."),
    listen("Ouça e escreva o que não se deve esquecer.", "출처를 밝히는 것도 잊지 마세요.", "출처를 밝히는 것도 잊지 마세요.", "Também não se esqueça de indicar a fonte."),
    translate("ko-pt", "Traduza: 요약은 줄이는 일이 아니라 중요한 것을 남기는 일이에요.", "Resumir não é reduzir, mas manter o que é importante.", "줄이다 = reduzir; 남기다 = manter/deixar.", ["Resumir é preservar o essencial, não apenas encurtar."]),
    reading("마지막으로 두 내용을 종합해 결론을 쓴다. 요약은 많이 줄이는 일이 아니라, 중요한 것을 남기는 일이다. 출처를 밝히는 것도 잊지 않아야 한다. 보고서를 읽는 사람은 요약문만으로도 핵심을 파악할 수 있어야 한다. 그래서 나는 표와 소제목을 함께 사용했다. 다음에는 인용문도 짧게 넣을 계획이다. 요약은 기술이다.", "O que um bom resumo preserva?", ["O que é importante e a fonte.", "Todas as frases originais.", "Apenas a opinião do autor."], "O que é importante e a fonte.", "중요한 것과 출처를 남겨요."),
  ],
  summary: ["-ㄴ/는 바 é nominalização formal.", "-는 것으로 요약된다 apresenta a síntese.", "Síntese preserva convergência e divergência.", "Conteúdo novo permanece em revisão."],
  production: production(
    "Produção independente · síntese de duas fontes",
    "Sintetize duas fontes curtas sobre o mesmo tema em seis a oito frases. Inclua uma convergência, uma divergência e a fonte de cada afirmação.",
    "두 자료를 비교하고 공통점과 차이점을 남겨 요약해 보세요.",
    ["Resuma cada fonte em uma frase.", "Aponte a convergência.", "Aponte a divergência.", "Use -ㄴ/는 바 ou -는 것으로 요약된다.", "Atribua as fontes."],
    ["Duas fontes resumidas.", "Convergência.", "Divergência.", "Uma forma da lição.", "Atribuição clara."],
    "두 자료 모두 비용 문제를 중요하게 봐요. 첫 번째 자료는 교육 투자를 강조하고, 두 번째 자료는 장비 투자를 강조해요. 조사한 바에 따르면 두 집단의 우선순위가 달랐어요. 공통점은 예산을 먼저 정해야 한다는 점으로 요약됩니다.",
    "As duas fontes consideram a questão do custo importante. A primeira enfatiza investimento em treinamento; a segunda, em equipamentos. Segundo o que foi pesquisado, as prioridades dos dois grupos eram diferentes. O ponto comum resume-se à necessidade de definir primeiro o orçamento.",
    "Exemplo original de quatro frases. Convergência, divergência e atribuição aparecem. Compare a estrutura.",
  ),
});

/** b2-l39 — carta formal completa. */
export const B2_L39 = defineB2Lesson({
  id: "b2-l39", number: 39, moduleId: "b2-m08", title: "Comunicação formal",
  objective: "Produzir uma mensagem formal completa com contexto, pedido e encerramento.",
  prerequisites: ["b2-l38"], estimatedMinutes: 80, dialogueTitle: "A carta à instituição",
  intro: [
    { title: "A respeito de", body: "-에 관하여 significa “a respeito de”, em registro formal. Compare com -에 대해 (sobre, neutro) e -에 대한 (modificador: “a respeito de”). Use em cartas, ofícios e documentos. Registro: formal/escrito.", ko: "문서 수정에 관하여 연락드립니다." },
    { title: "Solicito que", body: "-도록 요청드립니다 significa “solicito que...”, mais polido que -도록 요청합니다. Compare com -기 바랍니다 (espero que) e -도록 조치해 주시기 바랍니다 (solicito providências). Use em cartas formais.", ko: "수정된 문서를 보내 주시도록 요청드립니다." },
  ],
  dialogue: [
    ["아나", "기관에 보낼 편지를 쓰고 있는데, 너무 딱딱한가요?", "Estou escrevendo uma carta para uma instituição. Está rígida demais?"],
    ["민수", "격식은 필요해요. 다만 사실과 요청이 분명해야 해요.", "A formalidade é necessária. Mas os fatos e o pedido precisam ser claros."],
    ["아나", "첫 문단에는 뭘 써야 해요?", "O que devo escrever no primeiro parágrafo?"],
    ["민수", "문서 수정에 관하여 연락드린다는 말로 시작하세요. 문서 번호와 참조 부서도 적고요.", "Comece dizendo que entra em contato a respeito da correção do documento. Inclua o número do documento e o departamento em referência."],
    ["아나", "문제 설명은요?", "E a explicação do problema?"],
    ["민수", "유선으로도 말씀드렸지만, 문서로 다시 요청한다고 쓰세요. 안내문과 접수처도 확인했다고 밝히고요.", "Escreva que, embora tenha falado por telefone, solicita de novo por escrito. Diga também que conferiu o aviso e o local de protocolo."],
    ["아나", "마지막에는 뭐가 들어가요?", "O que entra no final?"],
    ["민수", "수정된 문서를 다음 주까지 발송해 주시도록 요청드린다고 쓰세요. 직인 날인 여부도 확인해 달라고 하고, 회신 부탁으로 끝내면 됩니다.", "Escreva que solicita o envio do documento corrigido até a próxima semana. Peça para confirmar também o carimbo oficial e encerre com um pedido de resposta."],
  ],
  readingText: {
    titlePt: "Uma carta formal completa",
    paragraphs: [
      "담당자님께, 문서 수정을 요청드리는 편지를 보냅니다. 첨부한 문서의 이름과 번호를 확인해 주시기 바랍니다. 참조에 관련 부서를 넣었습니다.",
      "문제가 된 부분은 3쪽의 금액입니다. 유선으로도 말씀드렸지만, 문서로 다시 요청드립니다. 격식을 갖추어 안내문과 접수처를 함께 적었습니다.",
      "수정된 문서를 다음 주까지 발송해 주시도록 요청드립니다. 직인 날인 여부도 확인해 주세요. 바쁘시겠지만, 회신 부탁드립니다. 회신이 늦어지면 다시 연락드리겠습니다. 담당자님의 확인을 기다리겠습니다. 감사합니다. 문서 번호는 2026-07입니다. 첨부 파일도 함께 확인해 주시기 바랍니다.",
    ],
    pt: "Prezado responsável, entro em contato a respeito da correção de um documento. Por favor, confira o nome e o número do documento anexado. Incluí o departamento relacionado no campo de referência. A parte com problema é o valor da página 3. Embora eu já tenha falado por telefone, solicito novamente por escrito. Redigi com formalidade, incluindo o aviso e o local de protocolo. Solicito que enviem o documento corrigido até a próxima semana. Confiram também se há carimbo oficial. Sei que estão ocupados, mas peço uma resposta.",
    objective: "Reconhecer assunto, contexto, pedido, prazo e encerramento em uma carta formal.",
  },
  reusedIds: ["ko:요청", "ko:회신"],
  grammar: [
    ["-에 관하여 — a respeito de", "명사 + 에 관하여", "Significa “a respeito de”, em registro formal. Compare com -에 대해 (sobre, neutro) e -에 대한 (modificador: “a respeito de”). Use em cartas, ofícios e documentos. Registro: formal/escrito.", [["문서 수정에 관하여 연락드립니다.", "Entro em contato a respeito da correção do documento."], ["계약 조건에 관하여 문의드리고 싶습니다.", "Gostaria de perguntar a respeito das condições do contrato."]]],
    ["-도록 요청드립니다 — solicito que", "동사 + -도록 요청드립니다", "Significa “solicito que...”, mais polido que -도록 요청합니다. Compare com -기 바랍니다 (espero que) e -도록 조치해 주시기 바랍니다 (solicito providências). Use em cartas formais. Registro: formal/escrito.", [["수정된 문서를 보내 주시도록 요청드립니다.", "Solicito que enviem o documento corrigido."], ["다음 주까지 회신해 주시도록 요청드립니다.", "Solicito que respondam até a próxima semana."]]],
  ],
  guided: [
    mcq("Qual é o assunto da carta?", ["A correção de um documento.", "A compra de um produto.", "A reserva de uma viagem."], "A correção de um documento.", "문서 수정에 관한 편지예요."),
    cloze("Complete a fórmula formal: 문서 수정___ 관하여 연락드립니다.", "에", "수정에 관하여 = a respeito da correção."),
    listen("Ouça e escreva o pedido final.", "수정된 문서를 다음 주까지 보내 주시도록 요청드립니다.", "수정된 문서를 다음 주까지 보내 주시도록 요청드립니다.", "Solicito que enviem o documento corrigido até a próxima semana."),
    reading("담당자님께, 문서 수정을 요청드리는 편지를 보냅니다. 첨부한 문서의 이름과 번호를 확인해 주시기 바랍니다. 참조에 관련 부서를 넣었습니다.", "O que o remetente pede primeiro?", ["Conferir nome e número do documento.", "Enviar um novo contrato.", "Cancelar o pedido."], "Conferir nome e número do documento.", "문서의 이름과 번호를 확인해 달라고 해요."),
    translate("pt-ko", "Traduza: “Solicito que enviem o documento corrigido.”", "수정된 문서를 보내 주시도록 요청드립니다.", "-도록 요청드립니다 é pedido formal polido.", ["수정된 문서를 보내 주시도록 요청합니다."]),
  ],
  independent: [
    mcq("Qual expressão é adequada a uma carta formal?", ["문서 수정에 관하여 연락드립니다.", "문서 고치는 건에 대해 연락해.", "문서 좀 고쳐 줘."], "문서 수정에 관하여 연락드립니다.", "-에 관하여 é registro formal."),
    cloze("Complete o pedido: 다음 주까지 회신해 주시___ 요청드립니다.", "도록", "회신해 주시도록 요청드립니다 = solicito que respondam."),
    listen("Ouça e escreva a confirmação pedida.", "직인 날인 여부도 확인해 주세요.", "직인 날인 여부도 확인해 주세요.", "Confira também se há carimbo oficial."),
    translate("ko-pt", "Traduza: 격식을 갖추어 안내문과 접수처를 함께 적었어요.", "Redigi com formalidade, incluindo o aviso e o local de protocolo.", "격식 = formalidade; 접수처 = local de protocolo.", ["Escrevi com formalidade o aviso e o local de recebimento."]),
    reading("수정된 문서를 다음 주까지 발송해 주시도록 요청드립니다. 직인 날인 여부도 확인해 주세요. 바쁘시겠지만, 회신 부탁드립니다. 회신이 늦어지면 다시 연락드리겠습니다. 담당자님의 확인을 기다리겠습니다. 감사합니다. 문서 번호는 2026-07입니다. 첨부 파일도 함께 확인해 주시기 바랍니다.", "O que a carta pede ao final?", ["Envio do documento corrigido, confirmação do carimbo e resposta.", "Uma visita presencial imediata ao escritório.", "O cancelamento do documento e do pedido."], "Envio do documento corrigido, confirmação do carimbo e resposta.", "발송, 직인 확인, 회신을 요청해요."),
  ],
  summary: ["-에 관하여 é “a respeito de” formal.", "-도록 요청드립니다 é pedido formal polido.", "Carta formal tem assunto, contexto, pedido, prazo e encerramento.", "Conteúdo novo permanece em revisão."],
  production: production(
    "Produção independente · carta formal",
    "Escreva uma carta formal de sete a nove frases a uma instituição. Inclua assunto, documento, problema, pedido, prazo e encerramento.",
    "기관에 보내는 격식 있는 편지를 써 보세요.",
    ["Comece com o assunto e o documento.", "Explique o problema com fatos.", "Use -에 관하여 ou -도록 요청드립니다.", "Defina prazo e encerre com cortesia."],
    ["Assunto e documento.", "Problema factual.", "Pedido e prazo.", "Registro formal.", "Encerramento polido."],
    "담당자님께, 문서 수정에 관하여 연락드립니다. 첨부한 문서 2026-07의 3쪽 금액에 오류가 있습니다. 유선으로도 말씀드렸지만, 문서로 다시 요청드립니다. 수정된 문서를 다음 주까지 보내 주시도록 요청드립니다. 바쁘시겠지만, 회신 부탁드립니다. 회신이 늦어지면 다시 연락드리겠습니다. 담당자님의 확인을 기다리겠습니다. 감사합니다. 문서 번호는 2026-07입니다. 첨부 파일도 함께 확인해 주시기 바랍니다.",
    "Prezado responsável, entro em contato a respeito da correção do documento. Há um erro no valor da página 3 do documento 2026-07 em anexo. Embora eu já tenha falado por telefone, solicito de novo por escrito. Solicito que enviem o documento corrigido até a próxima semana. Sei que estão ocupados, mas peço uma resposta.",
    "Exemplo original de cinco frases. Assunto, problema, pedido e prazo aparecem. Compare o registro.",
  ),
});

/** b2-l40 — integração e autonomia. */
export const B2_L40 = defineB2Lesson({
  id: "b2-l40", number: 40, moduleId: "b2-m08", title: "Meu percurso B2",
  objective: "Integrar narrativa, argumento, síntese e comunicação formal em uma produção autônoma.",
  prerequisites: ["b2-l39"], estimatedMinutes: 90, dialogueTitle: "A conversa de encerramento",
  intro: [
    { title: "Revisão · concessão e contraste", body: "No B2, a concessão aparece em camadas: -기는커녕 nega o primeiro item; -ㄹ지라도 admite uma condição extrema; -는 한편 apresenta dois lados. Escolher a forma é escolher o grau de força e o registro.", ko: "쉬기는커녕 시간도 없었지만, 그럼에도 끝까지 했어요." },
    { title: "Revisão · síntese e registro", body: "-ㄴ/는 바 e -도록 요청드립니다 pertencem ao registro escrito formal. Em uma carta, eles organizam o pedido; em uma síntese, organizam a atribuição. Não use essas formas em conversa casual.", ko: "조사한 바에 따르면 개선이 필요합니다." },
  ],
  dialogue: [
    ["아나", "B2 과정을 거의 끝냈네요. 가장 많이 달라진 점이 뭐예요?", "Você está quase terminando o B2. O que mais mudou?"],
    ["민수", "긴 글을 읽고 핵심을 잡는 게 예전보다 쉬워졌어요. 처음에는 모든 문장을 외우려고 했는데, 지금은 구조를 먼저 봐요.", "Ler textos longos e captar o essencial ficou mais fácil do que antes. No começo eu tentava memorizar todas as frases; agora olho primeiro a estrutura."],
    ["아나", "쓰기는요?", "E a escrita?"],
    ["민수", "주장을 세우고 근거를 연결하는 연습을 많이 했어요. 반론을 넣고, 결론에서 다시 강조하는 방식도 배웠고요.", "Pratiquei muito formular uma tese e conectar evidências. Também aprendi a incluir objeções e reforçar na conclusão."],
    ["아나", "아직 어려운 점은요?", "O que ainda é difícil?"],
    ["민수", "자연스러운 어휘와 미묘한 뉘앙스예요. 그래서 앞으로도 읽고, 쓰고, 다시 고치는 과정을 이어 가려고 해요.", "Vocabulário natural e nuances sutis. Por isso, pretendo continuar lendo, escrevendo e revisando."],
    ["아나", "다음 목표는 뭐예요?", "Qual é o próximo objetivo?"],
    ["민수", "단기적인 성과보다 지속력을 기르고 싶어요. 주도적으로 학습 계획을 세우고, 장기적으로는 더 긴 글을 써 보고 싶어요.", "Quero cultivar a persistência mais do que resultados de curto prazo. Quero montar um plano de estudo com autonomia e, a longo prazo, escrever textos mais longos."],
    ["아나", "좋은 계획이네요. 마지막으로 하고 싶은 말은요?", "É um bom plano. O que gostaria de dizer no final?"],
    ["민수", "배움은 끝이 아니라 계속되는 선택이라고 생각해요. 부족한 점을 인정하고, 다음에 다시 시도하면 됩니다.", "Penso que aprender não é um fim, mas uma escolha que continua. Basta reconhecer o que falta e tentar de novo na próxima."],
  ],
  readingText: {
    titlePt: "O que ficou do B2",
    paragraphs: [
      "B2 과정을 시작할 때 나는 긴 글을 읽는 것이 가장 어려웠다. 지금 돌아보면, 매일 조금씩 읽은 것이 도움이 되었다. 단기적인 성과보다 지속력이 중요했다.",
      "나는 주도적으로 학습 계획을 세웠고, 자기주도 학습을 이어 갔다. 목표의식이 분명할수록 흔들리지 않았다. 물론 실행력이 부족했던 시기도 있었다.",
      "한 학기를 성찰해 보면, 장기적으로 남은 것은 성적이 아니라 습관이다. 앞으로도 읽고, 쓰고, 다시 고치는 과정을 이어 가고 싶다. 배움은 끝이 아니라 계속되는 선택이다. 지금의 습관이 다음 단계의 공부를 가능하게 한다. 나는 그 사실을 잊지 않으려고 한다. 배움을 이어 가는 사람이 결국 성장한다.",
    ],
    pt: "Quando comecei o B2, o mais difícil era ler textos longos. Olhando para trás, ler um pouco todos os dias ajudou. Mais do que resultados de curto prazo, a persistência foi importante. Montei um plano de estudo com autonomia e segui com o aprendizado autodirigido. Quanto mais clara a consciência de objetivo, menos eu oscilava. É claro que houve períodos em que faltou capacidade de execução. Refletindo sobre um semestre, o que ficou a longo prazo não foram as notas, mas os hábitos. Quero continuar lendo, escrevendo e revisando. Aprender não é um fim, mas uma escolha que continua.",
    objective: "Integrar narrativa, avaliação e plano de aprendizagem em um texto final.",
  },
  reusedIds: ["ko:계획", "ko:습관", "ko:읽다"],
  grammar: [
    ["Revisão · concessão e contraste", "-기는커녕 / -ㄹ지라도 / -는 한편(으로)", "As três formas têm forças diferentes: -기는커녕 nega o primeiro item e intensifica o segundo; -ㄹ지라도 admite uma condição extrema em registro formal; -는 한편 apresenta dois lados ou ações paralelas. Escolha pela força e pelo registro, não por dificuldade.", [["쉬기는커녕 시간도 없었어요.", "Longe de descansar, não tive nem tempo."], ["어려울지라도 계속하고 싶어요.", "Mesmo que seja difícil, quero continuar."]]],
    ["Revisão · síntese e registro formal", "-ㄴ/는 바 / -도록 요청드립니다", "-ㄴ/는 바 organiza a atribuição em relatórios e sínteses; -도록 요청드립니다 organiza o pedido em cartas formais. Ambas pertencem ao registro escrito e não devem ser usadas em conversa casual. Combine-as com fatos e prazos claros.", [["조사한 바에 따르면 개선이 필요합니다.", "Segundo o que foi pesquisado, é necessária uma melhoria."], ["다음 주까지 회신해 주시도록 요청드립니다.", "Solicito que respondam até a próxima semana."]]],
  ],
  guided: [
    mcq("O que ficou mais fácil para Minsu?", ["Ler textos longos e captar o essencial.", "Falar sem pensar antes de responder.", "Escrever sem revisar o texto final."], "Ler textos longos e captar o essencial.", "긴 글을 읽고 핵심을 잡는 게 쉬워졌어요."),
    cloze("Complete a revisão: 쉬기___ 시간도 없었어요.", "는커녕", "쉬기는커녕 = longe de descansar."),
    listen("Ouça e escreva o aprendizado final.", "배움은 끝이 아니라 계속되는 선택이에요.", "배움은 끝이 아니라 계속되는 선택이에요.", "Aprender não é um fim, mas uma escolha que continua."),
    reading("B2 과정을 시작할 때 나는 긴 글을 읽는 것이 가장 어려웠다. 지금 돌아보면, 매일 조금씩 읽은 것이 도움이 되었다. 단기적인 성과보다 지속력이 중요했다.", "O que ajudou a ler melhor?", ["Ler um pouco todos os dias.", "Ler tudo de uma vez.", "Evitar textos longos."], "Ler um pouco todos os dias.", "매일 조금씩 읽은 것이 도움이 됐어요."),
    translate("pt-ko", "Traduza: “Mesmo que seja difícil, quero continuar.”", "어려울지라도 계속하고 싶어요.", "-ㄹ지라도 é concessão formal.", ["어려울지라도 계속하고 싶습니다."]),
  ],
  independent: [
    mcq("Qual forma pertence ao registro escrito formal?", ["조사한 바에 따르면 개선이 필요합니다.", "조사했더니 개선이 필요해.", "조사해 봤는데 개선이 필요해."], "조사한 바에 따르면 개선이 필요합니다.", "-ㄴ/는 바 é registro escrito formal."),
    cloze("Complete o pedido formal: 다음 주까지 회신해 주시___ 요청드립니다.", "도록", "회신해 주시도록 요청드립니다 = solicito que respondam."),
    listen("Ouça e escreva o próximo objetivo.", "단기적인 성과보다 지속력을 기르고 싶어요.", "단기적인 성과보다 지속력을 기르고 싶어요.", "Quero cultivar a persistência mais do que resultados de curto prazo."),
    translate("ko-pt", "Traduza: 부족한 점을 인정하고 다음에 다시 시도하면 됩니다.", "Basta reconhecer o que falta e tentar de novo na próxima.", "부족한 점 = o que falta; 시도하다 = tentar.", ["Reconheça o que falta e tente de novo depois."]),
    reading("한 학기를 성찰해 보면, 장기적으로 남은 것은 성적이 아니라 습관이다. 앞으로도 읽고, 쓰고, 다시 고치는 과정을 이어 가고 싶다. 배움은 끝이 아니라 계속되는 선택이다. 지금의 습관이 다음 단계의 공부를 가능하게 한다. 나는 그 사실을 잊지 않으려고 한다. 배움을 이어 가는 사람이 결국 성장한다.", "O que ficou a longo prazo?", ["Os hábitos, não as notas.", "Apenas as notas.", "Nada."], "Os hábitos, não as notas.", "장기적으로 남은 것은 습관이에요."),
  ],
  summary: ["Concessão e contraste têm graus e registros diferentes.", "Síntese e pedido formal exigem registro escrito.", "Autonomia combina plano, prática e revisão.", "Conteúdo novo permanece em revisão."],
  production: production(
    "Produção independente · texto integrado B2",
    "Produza um texto de oito a dez frases integrando narrativa, argumento e plano de aprendizagem. Use ao menos três formas estudadas no B2.",
    "이야기, 주장, 학습 계획을 하나의 글로 써 보세요.",
    ["Comece com uma narrativa curta.", "Apresente uma posição ou avaliação.", "Inclua uma concessão.", "Termine com um plano concreto."],
    ["Narrativa com contexto.", "Posição explícita.", "Concessão ou contraste.", "Três formas do B2.", "Plano final concreto."],
    "B2를 시작할 때 저는 긴 글을 읽는 것이 가장 어려웠어요. 처음에는 모든 문장을 외우려고 했지만, 지금은 구조를 먼저 봅니다. 물론 어휘와 뉘앙스는 아직 어려워요. 그래도 매일 조금씩 읽다 보니 핵심을 잡는 힘이 생겼어요. 앞으로도 주도적으로 계획을 세우고, 장기적으로 더 긴 글을 써 보고 싶어요.",
    "Quando comecei o B2, o mais difícil era ler textos longos. No começo eu tentava memorizar todas as frases, mas agora olho primeiro a estrutura. É claro que vocabulário e nuance ainda são difíceis. Mesmo assim, à força de ler um pouco todos os dias, ganhei a capacidade de captar o essencial. Quero continuar montando planos com autonomia e, a longo prazo, escrever textos mais longos.",
    "Exemplo original de cinco frases. Narrativa, concessão e plano aparecem. Compare a integração.",
    100,
  ),
});
