import {
  cloze,
  defineA2Lesson,
  listen,
  mcq,
  reading,
  translate,
} from "./shared";

/** a2-l04 — impossibilidade, contraste e desculpa. */
export const A2_L04 = defineA2Lesson({
  id: "a2-l04",
  number: 4,
  moduleId: "a2-m01",
  title: "Não pude ir",
  objective:
    "Explicar por que não pôde fazer algo, reconhecer o impacto e propor uma nova combinação.",
  prerequisites: ["a2-l03"],
  estimatedMinutes: 55,
  dialogueTitle: "O encontro perdido",
  intro: [
    {
      title: "Não consegui, não pude",
      body:
        "-지 못했어요 indica que a pessoa não conseguiu realizar uma ação por uma circunstância. É diferente de não querer. Use a forma de passado quando o compromisso já passou.",
      ko: "약속에 가지 못했어요.",
    },
    {
      title: "Contraste com -지만",
      body:
        "-지만 liga duas ideias opostas: “embora”, “mas”. A primeira parte reconhece o fato; a segunda mostra o contraste. É uma forma útil para se desculpar sem parecer evasivo.",
      ko: "가고 싶었지만 일이 있었어요.",
    },
    {
      title: "Desculpa com proposta",
      body:
        "Uma desculpa completa reconhece o problema, explica a causa e propõe uma solução. Evite apenas dizer “não pude”; diga o motivo e ofereça uma nova data quando possível.",
      ko: "미안하지만 다음 주에 만날 수 있어요?",
    },
  ],
  dialogue: [
    ["지우", "민수 씨, 어제 약속에 왜 안 왔어요?", "Minsu, por que você não veio ao encontro de ontem?"],
    ["민수", "정말 미안해요. 갑자기 회사 일이 생겨서 가지 못했어요.", "Desculpe de verdade. Surgiu um trabalho urgente na empresa e não consegui ir."],
    ["지우", "연락을 못 받아서 조금 걱정했어요.", "Não recebi seu contato e fiquei um pouco preocupada."],
    ["민수", "죄송해요. 회의가 길어져서 연락을 못 했어요.", "Desculpe. A reunião se alongou e não consegui avisar."],
    ["지우", "다음에는 미리 알려 주세요.", "Da próxima vez, avise com antecedência, por favor."],
    ["민수", "네, 다음 주 토요일에는 꼭 갈게요. 시간을 다시 정할까요?", "Sim, no próximo sábado eu vou sem falta. Vamos marcar o horário de novo?"],
  ],
  reusedIds: ["ko:약속", "ko:연락하다", "ko:미안하다", "ko:걱정하다", "ko:다음"],
  grammar: [
    [
      "-지 못했어요 — não consegui",
      "동사 + -지 못했어요",
      "A forma -지 못하다 expressa impossibilidade ou incapacidade. No passado, Use -지 못했어요. Não confunda com 안 + verbo, que indica que a ação simplesmente não foi feita.",
      [
        ["약속에 가지 못했어요.", "Não consegui ir ao encontro."],
        ["어제는 잠을 자지 못했어요.", "Ontem não consegui dormir."],
      ],
    ],
    [
      "-지만 — mas, embora",
      "radical + -지만",
      "-지만 liga uma informação à outra em contraste. Pode aparecer depois de verbos e adjetivos. A segunda oração não é uma consequência automática; é uma oposição.",
      [
        ["가고 싶었지만 일이 있었어요.", "Queria ir, mas tive um imprevisto de trabalho."],
        ["회의가 길어졌지만 연락을 못 했어요.", "A reunião se alongou, mas não consegui avisar."],
      ],
    ],
    [
      "-아/어서 como desculpa",
      "radical + -아서/어서",
      "A causa vem antes de -아/어서. Em uma desculpa, ela explica o impedimento. Evite usar -아/어서 para ordens; para pedir desculpas, a segunda parte descreve o resultado.",
      [
        ["갑자기 일이 생겨서 못 갔어요.", "Surgiu um imprevisto de trabalho, então não pude ir."],
        ["길이 막혀서 늦었어요.", "O trânsito estava engarrafado, então cheguei tarde."],
      ],
    ],
  ],
  guided: [
    mcq(
      "Por que Minsu não foi ao encontro?",
      ["Porque surgiu um trabalho urgente.", "Porque esqueceu o endereço.", "Porque estava doente."],
      "Porque surgiu um trabalho urgente.",
      "갑자기 회사 일이 생겨서: surgiu um imprevisto na empresa.",
    ),
    cloze(
      "Complete com “não consegui ir”: 약속에 가지 ___.",
      "못했어요",
      "가지 못했어요 expressa impossibilidade no passado.",
    ),
    listen(
      "Ouça e escreva a frase completa que contém a desculpa de Minsu.",
      "갑자기 회사 일이 생겨서 가지 못했어요.",
      "갑자기 회사 일이 생겨서 가지 못했어요.",
      "Minsu explica que surgiu um trabalho urgente e não conseguiu ir.",
      ["갑자기 회사 일이 생겨서 가지 못했어요"],
    ),
    reading(
      "민수는 회사 일 때문에 약속에 가지 못했어요. 그는 연락을 못 해서 미안해했어요.",
      "Como Minsu se sentiu?",
      ["Culpado por não ter avisado.", "Irritado com Jiwoo.", "Indiferente."],
      "Culpado por não ter avisado.",
      "그는 연락을 못 해서 미안해했어요: ele lamentou não ter avisado.",
    ),
    translate(
      "pt-ko",
      "Traduza para o coreano: “Não consegui ir ao encontro.”",
      "약속에 가지 못했어요.",
      "약속에 가지 못했어요 usa -지 못했어요 para impossibilidade.",
      ["약속에 가지 못 했어요."],
    ),
  ],
  independent: [
    mcq(
      "Qual frase contrasta duas ideias?",
      [
        "가고 싶었지만 시간이 없었어요.",
        "가고 싶어서 갔어요.",
        "시간이 없어서 못 갔어요.",
      ],
      "가고 싶었지만 시간이 없었어요.",
      "-지만 marca o contraste entre querer ir e não ter tempo.",
    ),
    cloze(
      "Complete com “mas”: 회의가 길어졌___ 연락을 못 했어요.",
      "지만",
      "길어졌지만 significa “embora tenha se alongado”.",
    ),
    listen(
      "Ouça e escreva a frase completa que contém a nova proposta.",
      "다음 주 토요일에는 꼭 갈게요.",
      "다음 주 토요일에는 꼭 갈게요.",
      "Minsu promete ir no próximo sábado sem falta.",
      ["다음 주 토요일에는 꼭 갈게요"],
    ),
    translate(
      "ko-pt",
      "Traduza para o português: 갑자기 일이 생겨서 못 갔어요.",
      "Surgiu um imprevisto de repente e não pude ir.",
      "갑자기 일이 생겨서 é a causa; 못 갔어요 é “não pude ir”.",
      ["De repente surgiu um imprevisto e não pude ir.", "Surgiu um imprevisto de repente, então não pude ir."],
    ),
    reading(
      "지우는 민수의 연락을 받지 못해서 걱정했어요. 민수는 “다음 주에 다시 만나요.”라고 말했어요.",
      "O que Jiwoo sentiu?",
      ["Preocupação.", "Raiva.", "Cansaço."],
      "Preocupação.",
      "걱정했어요 significa “ficou preocupada”.",
    ),
  ],
  summary: [
    "-지 못했어요 indica que não foi possível realizar a ação.",
    "-지만 apresenta contraste entre duas informações.",
    "Uma boa desculpa reconhece o fato, explica a causa e propõe uma solução.",
    "O conteúdo continua em revisão e não substitui validação nativa.",
  ],
});
