import {
  cloze,
  defineA2Lesson,
  listen,
  mcq,
  reading,
  translate,
} from "./shared";

/** a2-l22 — procura de emprego, requisitos e candidatura. */
export const A2_L22 = defineA2Lesson({
  id: "a2-l22",
  number: 22,
  moduleId: "a2-m05",
  title: "Procurando emprego",
  objective:
    "Entender um anúncio de emprego, falar de requisitos e preparar uma candidatura simples.",
  prerequisites: ["a2-l21"],
  estimatedMinutes: 55,
  dialogueTitle: "O anúncio de emprego",
  intro: [
    {
      title: "Requisito com -는 데 필요하다",
      body:
        "-는 데 필요하다 significa “é necessário para…”. O verbo antes de -는 데 descreve a atividade; o substantivo com 이/가 é o requisito.",
      ko: "이 일을 하는 데 한국어가 필요해요.",
    },
    {
      title: "Intenção de se candidatar",
      body:
        "Use -려고 해요 para dizer que pretende se candidatar e -기로 했어요 quando a decisão já foi tomada. A empresa não garante o resultado.",
      ko: "그 회사에 지원하려고 해요.",
    },
  ],
  dialogue: [
    ["수진", "이 회사에서 사람을 찾고 있어요?", "Esta empresa está procurando alguém?"],
    ["마르코", "네, 고객 지원 담당자를 채용해요.", "Sim, estão contratando uma pessoa para suporte ao cliente."],
    ["수진", "무슨 조건이 필요해요?", "Que requisitos são necessários?"],
    ["마르코", "한국어로 의사소통하는 데 문제가 없어야 해요. 경력도 있으면 좋아요.", "É preciso não ter problemas para se comunicar em coreano. Também é bom ter experiência."],
    ["수진", "저는 경력이 없지만 자격증이 있어요. 지원해 볼까요?", "Não tenho experiência, mas tenho certificado. Devo tentar me candidatar?"],
    ["마르코", "네, 이력서와 자기소개서를 준비해서 지원해 보세요.", "Sim, prepare currículo e carta de apresentação e tente."],
  ],
  reusedIds: ["ko:취업", "ko:경험", "ko:준비하다", "ko:회사", "ko:질문"],
  grammar: [
    [
      "-는 데 필요하다 — necessário para",
      "동사 + -는 데 필요하다",
      "A forma indica o que é necessário para realizar uma atividade. O verbo antes de -는 데 não recebe tempo; o tempo fica em 필요해요/필요했어요.",
      [
        ["이 일을 하는 데 한국어가 필요해요.", "É necessário coreano para fazer este trabalho."],
        ["지원하는 데 이력서가 필요해요.", "É necessário currículo para se candidatar."],
      ],
    ],
    [
      "-아/어 보다 — tentar se candidatar",
      "동사 + -아/어 보세요",
      "A forma sugere tentar uma ação. Em contexto de emprego, não promete contratação; apenas incentiva a tentativa.",
      [
        ["지원해 보세요.", "Tente se candidatar."],
        ["면접을 준비해 보세요.", "Experimente se preparar para a entrevista."],
      ],
    ],
  ],
  guided: [
    mcq(
      "Que vaga a empresa oferece?",
      ["Suporte ao cliente.", "Professor de coreano.", "Cozinheiro."],
      "Suporte ao cliente.",
      "고객 지원 담당자를 채용해요.",
    ),
    cloze(
      "Complete o requisito: 이 일을 하___ 데 한국어가 필요해요.",
      "는",
      "하는 데 필요해요 significa “é necessário para fazer”.",
    ),
    listen(
      "Ouça e escreva os documentos necessários.",
      "이력서와 자기소개서를 준비하세요.",
      "이력서와 자기소개서를 준비하세요.",
      "Prepare currículo e carta de apresentação.",
      ["이력서와 자기소개서를 준비하세요"],
    ),
    reading(
      "회사는 고객 지원 담당자를 찾아요. 지원자는 한국어로 의사소통할 수 있어야 해요. 경력이 있으면 좋아요.",
      "O que é obrigatório para a vaga?",
      ["Comunicar-se em coreano.", "Ter mestrado.", "Morar no exterior."],
      "Comunicar-se em coreano.",
      "한국어로 의사소통하는 데 문제가 없어야 해요.",
    ),
    translate(
      "pt-ko",
      "Traduza para o coreano: “Vou me candidatar a esta empresa.”",
      "이 회사에 지원하려고 해요.",
      "지원하려고 해요 expressa a intenção de se candidatar.",
      ["이 회사에 지원할 거예요."],
    ),
  ],
  independent: [
    mcq(
      "Qual documento apresenta a trajetória profissional?",
      ["이력서", "자기소개서", "자격증"],
      "이력서",
      "이력서 é o currículo.",
    ),
    cloze(
      "Complete a intenção: 그 회사에 지원하___ 해요.",
      "려고",
      "지원하려고 해요 significa “pretendo me candidatar”.",
    ),
    listen(
      "Ouça e escreva o que é bom ter.",
      "경력이 있으면 좋아요.",
      "경력이 있으면 좋아요.",
      "É bom ter experiência.",
      ["경력이 있으면 좋아요"],
    ),
    translate(
      "ko-pt",
      "Traduza para o português: 자격증이 있으면 좋아요.",
      "É bom ter um certificado.",
      "있으면 좋아요 significa “se tiver, é bom”.",
      ["É bom se tiver certificado."],
    ),
    reading(
      "수진은 경력이 없지만 자격증이 있어요. 마르코는 그녀에게 이력서와 자기소개서를 준비해 보라고 했어요.",
      "O que Sujin tem?",
      ["Um certificado.", "Muita experiência.", "Uma empresa própria."],
      "Um certificado.",
      "경력이 없지만 자격증이 있어요.",
    ),
  ],
  summary: [
    "-는 데 필요하다 apresenta requisitos.",
    "-려고 해요 expressa intenção de se candidatar.",
    "Currículo e carta de apresentação têm funções diferentes.",
    "Candidatar-se não garante contratação.",
  ],
});
