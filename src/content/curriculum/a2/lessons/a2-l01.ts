import {
  cloze,
  defineA2Lesson,
  listen,
  mcq,
  reading,
  translate,
} from "./shared";

/** a2-l01 — relato do fim de semana, passado e motivo. */
export const A2_L01 = defineA2Lesson({
  id: "a2-l01",
  number: 1,
  moduleId: "a2-m01",
  title: "Como foi o fim de semana?",
  objective:
    "Contar o que você fez no passado e encadear motivo, sequência e resultado em um relato curto.",
  prerequisites: [],
  estimatedMinutes: 55,
  dialogueTitle: "O fim de semana de Ana e Minsu",
  intro: [
    {
      title: "Retomar o passado",
      body:
        "No A1 você viu -았/었어요. No A2, essa forma aparece dentro de relatos maiores: primeiro o fato, depois o motivo e o resultado. Observe o ritmo das frases antes de praticar.",
      ko: "토요일에 전시를 봤어요.",
    },
    {
      title: "Ligar motivo e consequência",
      body:
        "A terminação -아/어서 liga uma causa ou uma sequência à frase seguinte. Ela não é usada para ordens nem para propostas; neste contexto, explica por que algo aconteceu.",
      ko: "사람이 많아서 피곤했어요.",
    },
    {
      title: "Marcar o tempo",
      body:
        "Expressões como 토요일에, 어제 e 지난주에 situam o relato. Use uma referência temporal por frase para não deixar o ouvinte sem saber quando o fato ocorreu.",
      ko: "지난주에 박물관에 갔어요.",
    },
  ],
  dialogue: [
    ["민수", "아나 씨, 주말에 뭐 했어요?", "Ana, o que você fez no fim de semana?"],
    ["아나", "토요일에 친구와 전시를 봤어요.", "No sábado, vi uma exposição com uma amiga."],
    ["민수", "재미있었어요?", "Foi interessante?"],
    ["아나", "네, 아주 좋았어요. 그런데 사람이 많아서 조금 피곤했어요.", "Sim, foi muito bom. Mas havia muita gente, então fiquei um pouco cansada."],
    ["민수", "저는 공원에서 피크닉을 했어요.", "Eu fiz um piquenique no parque."],
    ["아나", "좋았겠어요. 다음 주말에는 같이 박물관에 가요.", "Que bom. No próximo fim de semana, vamos juntos ao museu."],
  ],
  reusedIds: ["ko:주말", "ko:친구", "ko:공원", "ko:재미있다", "ko:사람"],
  grammar: [
    [
      "-았/었어요 — o fato concluído",
      "동사/형용사 + -았/었어요",
      "A forma de passado polida marca um fato concluído. Com verbos em 하다, a terminação aparece como 했어요: 공부했어요, 피크닉했어요. Com 좋다, a forma é 좋았어요.",
      [
        ["토요일에 전시를 봤어요.", "No sábado, vi uma exposição."],
        ["주말에 아주 좋았어요.", "O fim de semana foi muito bom."],
      ],
    ],
    [
      "-아/어서 — motivo e sequência",
      "radical + -아서/어서",
      "Use -아/어서 para explicar uma causa ou para encadear duas ações próximas. A segunda parte não pode ser uma ordem, um convite ou uma proposta. Em 사람이 많아서 피곤했어요, a multidão é a causa do cansaço.",
      [
        ["사람이 많아서 조금 피곤했어요.", "Havia muita gente, então fiquei um pouco cansada."],
        ["친구를 만나서 같이 갔어요.", "Encontrei uma amiga e fomos juntos."],
      ],
    ],
    [
      "Referências de tempo no relato",
      "토요일에 / 어제 / 지난주에",
      "O marcador temporal costuma vir no início ou logo depois do sujeito. Não é obrigatório em todas as frases, mas ajuda a situar a sequência quando você conta algo.",
      [
        ["어제 도서관에서 공부했어요.", "Ontem estudei na biblioteca."],
        ["지난주에는 비가 왔어요.", "Na semana passada, choveu."],
      ],
    ],
  ],
  guided: [
    mcq(
      "O que Ana fez no sábado?",
      ["Foi a uma exposição.", "Fez um piquenique.", "Foi ao museu."],
      "Foi a uma exposição.",
      "Ana diz 토요일에 친구와 전시를 봤어요 — ela viu uma exposição com uma amiga.",
    ),
    cloze(
      "Complete com a terminação de motivo: 사람이 많___ 조금 피곤했어요.",
      "아서",
      "사람이 많아서 expressa a causa do cansaço: havia muita gente.",
    ),
    listen(
      "Ouça e escreva o que Minsu fez.",
      "저는 공원에서 피크닉을 했어요.",
      "저는 공원에서 피크닉을 했어요.",
      "Minsu fez um piquenique no parque.",
      ["저는 공원에서 피크닉을 했어요"],
    ),
    reading(
      "토요일에 친구와 전시를 봤어요. 사람이 많아서 조금 피곤했어요.",
      "Por que Ana ficou cansada?",
      ["Porque havia muita gente.", "Porque choveu.", "Porque trabalhou sábado."],
      "Porque havia muita gente.",
      "사람이 많아서 indica a causa: a multidão deixou Ana cansada.",
    ),
    translate(
      "pt-ko",
      "Traduza para o coreano: “No sábado, vi uma exposição com uma amiga.”",
      "토요일에 친구와 전시를 봤어요.",
      "토요일에 marca o dia; 친구와 indica companhia; 전시를 봤어요 é “vi uma exposição”.",
      ["토요일에 친구하고 전시를 봤어요."],
    ),
  ],
  independent: [
    mcq(
      "Qual frase usa -아/어서 para explicar um motivo?",
      [
        "비가 와서 집에 있었어요.",
        "비가 왔어요. 집에 있었어요.",
        "비가 오지만 집에 있었어요.",
      ],
      "비가 와서 집에 있었어요.",
      "비가 와서 liga a chuva ao fato de ficar em casa como causa.",
    ),
    cloze(
      "Complete no passado: 지난주에 박물관에 ___.",
      "갔어요",
      "갔어요 é o passado polido de 가다: “fui”.",
      ["갔어요."],
    ),
    listen(
      "Ouça e escreva a justificativa que você ouviu.",
      "사람이 많아서 조금 피곤했어요.",
      "사람이 많아서 조금 피곤했어요.",
      "A fala diz que havia muita gente e por isso a pessoa ficou um pouco cansada.",
      ["사람이 많아서 조금 피곤했어요"],
    ),
    translate(
      "ko-pt",
      "Traduza para o português: 저는 공원에서 피크닉을 했어요.",
      "Eu fiz um piquenique no parque.",
      "공원에서 marca o lugar da ação; 피크닉을 했어요 é “fiz um piquenique”.",
      ["Eu fiz um piquenique no parque", "Fiz um piquenique no parque."],
    ),
    reading(
      "지난주에는 비가 와서 캠핑을 못 갔어요. 그래서 집에서 영화를 봤어요.",
      "Por que a pessoa não foi acampar?",
      ["Porque choveu.", "Porque estava doente.", "Porque trabalhou."],
      "Porque choveu.",
      "비가 와서 캠핑을 못 갔어요: a chuva impediu o acampamento.",
    ),
  ],
  summary: [
    "O passado polido -았/었어요 aparece em relatos de fatos concluídos.",
    "-아/어서 liga causa ou sequência e não introduz ordens ou convites.",
    "Marcadores como 토요일에 e 지난주에 situam o relato no tempo.",
    "Todo o coreano desta lição é original e continua em revisão por falante nativo.",
  ],
});
