import {
  cloze,
  defineA2Lesson,
  listen,
  mcq,
  reading,
  translate,
} from "./shared";

/** a2-l23 — entrevista e registro formal. */
export const A2_L23 = defineA2Lesson({
  id: "a2-l23",
  number: 23,
  moduleId: "a2-m05",
  title: "Na entrevista",
  objective:
    "Usar tratamento formal e responder sobre experiência, qualidades e motivação em uma entrevista.",
  prerequisites: ["a2-l22"],
  estimatedMinutes: 60,
  dialogueTitle: "A entrevista de Sujin",
  intro: [
    {
      title: "Formalidade com -ㅂ니다/습니다",
      body:
        "Em entrevistas e apresentações formais, use -ㅂ니다/습니다. É mais distante que -아/어요, mas adequado ao contexto profissional.",
      ko: "저는 수진이라고 합니다.",
    },
    {
      title: "Honorífico -(으)시-",
      body:
        "Ao falar de uma pessoa mais velha ou de um superior, o verbo recebe -(으)시-. O sujeito pode aparecer com 께서. Não use o honorífico para si mesmo.",
      ko: "면접관님께서 질문하셨어요.",
    },
  ],
  dialogue: [
    ["면접관", "먼저 자기소개를 해 주시겠어요?", "Primeiro, poderia se apresentar?"],
    ["수진", "네, 저는 수진이라고 합니다. 고객 지원 경험이 있습니다.", "Sim, meu nome é Sujin. Tenho experiência em suporte ao cliente."],
    ["면접관", "이 회사에 지원하신 이유가 무엇입니까?", "Qual é o motivo de se candidatar a esta empresa?"],
    ["수진", "사람들을 돕는 일을 좋아하기 때문입니다. 그리고 한국어를 계속 배우고 있습니다.", "Porque gosto de ajudar pessoas. E continuo aprendendo coreano."],
    ["면접관", "본인의 장점은 무엇이라고 생각하십니까?", "Qual você considera ser seu ponto forte?"],
    ["수진", "저는 어려운 상황에서도 침착하게 대답하는 편입니다.", "Costumo responder com calma mesmo em situações difíceis."],
  ],
  reusedIds: ["ko:질문", "ko:성격", "ko:경력", "ko:회사", "ko:준비하다"],
  grammar: [
    [
      "-ㅂ니다/습니다 — registro formal",
      "동사/형용사 + -ㅂ니다 / -습니다",
      "Use -ㅂ니다 depois de vogal e -습니다 depois de consoante. A forma é típica de entrevistas, apresentações e atendimento formal. Perguntas sobem com entonação ou com -ㅂ니까?.",
      [
        ["저는 수진이라고 합니다.", "Meu nome é Sujin."],
        ["고객 지원 경험이 있습니다.", "Tenho experiência em suporte ao cliente."],
      ],
    ],
    [
      "-(으)시- — honorífico do sujeito",
      "동사/형용사 + -(으)시-",
      "O honorífico marca respeito pelo sujeito da frase. 면접관님께서 질문하셨어요. Não use -(으)시- para falar de si mesmo.",
      [
        ["면접관님께서 질문하셨어요.", "O entrevistador fez uma pergunta."],
        ["대표님께서 오셨어요.", "O diretor chegou."],
      ],
    ],
  ],
  guided: [
    mcq(
      "Qual é a experiência de Sujin?",
      ["Suporte ao cliente.", "Ensino de matemática.", "Cozinha."],
      "Suporte ao cliente.",
      "고객 지원 경험이 있습니다.",
    ),
    cloze(
      "Complete o registro formal: 저는 수진이라고 ___.",
      "합니다",
      "합니다 é a forma formal de 하다.",
    ),
    listen(
      "Ouça e escreva a frase completa que contém o motivo de Sujin.",
      "사람들을 돕는 일을 좋아하기 때문입니다.",
      "사람들을 돕는 일을 좋아하기 때문입니다.",
      "Ela gosta de ajudar pessoas.",
      ["사람들을 돕는 일을 좋아하기 때문입니다"],
    ),
    reading(
      "수진은 고객 지원 경험이 있습니다. 그녀는 사람들을 돕는 일을 좋아합니다. 어려운 상황에서도 침착하게 대답합니다.",
      "Qual é o ponto forte de Sujin?",
      ["Responder com calma.", "Falar rápido.", "Evitar perguntas."],
      "Responder com calma.",
      "침착하게 대답하는 편입니다.",
    ),
    translate(
      "pt-ko",
      "Traduza para o coreano formal: “Tenho experiência em suporte ao cliente.”",
      "고객 지원 경험이 있습니다.",
      "있습니다 é a forma formal de 있어요.",
    ),
  ],
  independent: [
    mcq(
      "Qual frase usa o honorífico corretamente?",
      ["면접관님께서 질문하셨어요.", "저는 질문하셨어요.", "제가 오셨어요."],
      "면접관님께서 질문하셨어요.",
      "O honorífico se refere ao entrevistador, não ao falante.",
    ),
    cloze(
      "Complete o formal: 지원하신 이유가 무엇___?",
      "입니까",
      "무엇입니까 é a pergunta formal de “o que é?”.",
    ),
    listen(
      "Ouça e escreva a frase completa que contém a apresentação formal.",
      "저는 수진이라고 합니다.",
      "저는 수진이라고 합니다.",
      "A candidata se apresenta formalmente como Sujin.",
      ["저는 수진이라고 합니다"],
    ),
    translate(
      "ko-pt",
      "Traduza para o português: 어려운 상황에서도 침착하게 대답합니다.",
      "Respondo com calma mesmo em situações difíceis.",
      "침착하게 é “com calma”; 대답합니다 é a forma formal.",
      ["Mesmo em situações difíceis, respondo com calma."],
    ),
    reading(
      "면접관이 지원 동기를 물었습니다. 수진은 사람들을 돕는 일을 좋아한다고 대답했습니다. 면접관은 만족해했습니다.",
      "O que o entrevistador perguntou?",
      ["O motivo da candidatura.", "O endereço dela.", "O time de futebol dela."],
      "O motivo da candidatura.",
      "지원 동기를 물었습니다.",
    ),
  ],
  summary: [
    "-ㅂ니다/습니다 é o registro formal de entrevistas.",
    "-(으)시- marca respeito pelo sujeito da frase.",
    "Uma resposta de entrevista conecta experiência e motivação.",
    "Formalidade não é o mesmo que excesso de palavras difíceis.",
  ],
});
