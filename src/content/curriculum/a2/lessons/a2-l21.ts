import {
  cloze,
  defineA2Lesson,
  listen,
  mcq,
  reading,
  translate,
} from "./shared";

/** a2-l21 — profissões, funções e rotina de trabalho. */
export const A2_L21 = defineA2Lesson({
  id: "a2-l21",
  number: 21,
  moduleId: "a2-m05",
  title: "O que você faz?",
  objective:
    "Descrever profissão, local de trabalho, tarefas e rotina profissional.",
  prerequisites: ["a2-c04"],
  estimatedMinutes: 55,
  dialogueTitle: "Dois trabalhos",
  intro: [
    {
      title: "Nominalizar a função",
      body:
        "-는 것 também pode nomear uma tarefa: 제가 하는 것은 고객 상담이에요 (“o que eu faço é atendimento ao cliente”). É uma forma útil de explicar funções.",
      ko: "제가 하는 일은 고객 상담이에요.",
    },
    {
      title: "Rotina de trabalho",
      body:
        "Combine 출근하다, 근무하다 e 퇴근하다 com horários. Use 에서 para o local da ação e 에 para o destino.",
      ko: "아침 아홉 시에 출근해서 여섯 시에 퇴근해요.",
    },
  ],
  dialogue: [
    ["수진", "마르코 씨는 무슨 일을 해요?", "Marco, o que você faz?"],
    ["마르코", "저는 회사에서 일해요. 제 부서는 고객 지원이에요.", "Trabalho em uma empresa. Meu departamento é de suporte ao cliente."],
    ["수진", "하루에 몇 시간 근무해요?", "Quantas horas você trabalha por dia?"],
    ["마르코", "아홉 시부터 여섯 시까지 일해요. 가끔 야근도 해요.", "Trabalho das nove às seis. Às vezes faço hora extra."],
    ["수진", "저는 학교에서 가르쳐요. 학생들을 만나는 게 재미있어요.", "Eu ensino em uma escola. Gostar de conhecer os alunos é interessante para mim."],
    ["마르코", "두 직업 모두 사람을 만나는 일이네요.", "Os dois trabalhos envolvem conhecer pessoas."],
  ],
  reusedIds: ["ko:직업", "ko:회사원", "ko:직장", "ko:일", "ko:경험"],
  grammar: [
    [
      "-는 것 — nomear a tarefa",
      "동사 + -는 것",
      "A nominalização permite falar de uma função como um bloco: 제가 하는 일은… (“o trabalho que eu faço é…”). O predicado seguinte descreve a função.",
      [
        ["제가 하는 일은 고객 상담이에요.", "O que eu faço é atendimento ao cliente."],
        ["학생들을 만나는 것이 즐거워요.", "Conhecer os alunos é prazeroso."],
      ],
    ],
    [
      "Rotina com -부터 -까지",
      "시간 + 부터 + 시간 + 까지",
      "Para descrever horário de trabalho, use 부터 e 까지. O verbo 근무하다 é mais formal que 일하다 e aparece em anúncios e contratos.",
      [
        ["아홉 시부터 여섯 시까지 근무해요.", "Trabalho das nove às seis."],
        ["주말에는 일하지 않아요.", "Não trabalho nos fins de semana."],
      ],
    ],
  ],
  guided: [
    mcq(
      "Em que departamento Marco trabalha?",
      ["Suporte ao cliente.", "Vendas.", "Recursos humanos."],
      "Suporte ao cliente.",
      "제 부서는 고객 지원이에요.",
    ),
    cloze(
      "Complete a função: 제가 하___ 일은 고객 상담이에요.",
      "는",
      "하는 일 é “o trabalho que faço”.",
    ),
    listen(
      "Ouça e escreva o horário de trabalho de Marco.",
      "아홉 시부터 여섯 시까지 일해요.",
      "아홉 시부터 여섯 시까지 일해요.",
      "Ele trabalha das nove às seis.",
      ["아홉 시부터 여섯 시까지 일해요"],
    ),
    reading(
      "마르코는 회사에서 고객 지원을 해요. 수진은 학교에서 가르쳐요. 두 사람 모두 사람을 만나는 일을 해요.",
      "O que Sujin faz?",
      ["Ensina em uma escola.", "Trabalha em vendas.", "Faz atendimento ao cliente."],
      "Ensina em uma escola.",
      "수진은 학교에서 가르쳐요.",
    ),
    translate(
      "pt-ko",
      "Traduza para o coreano: “Trabalho das nove às seis.”",
      "아홉 시부터 여섯 시까지 일해요.",
      "부터 e 까지 delimitam o horário.",
      ["아홉 시부터 여섯 시까지 근무해요."],
    ),
  ],
  independent: [
    mcq(
      "Qual frase descreve uma função?",
      [
        "제가 하는 일은 고객 상담이에요.",
        "저는 회사에 가요.",
        "오늘은 바빠요.",
      ],
      "제가 하는 일은 고객 상담이에요.",
      "하는 일 nominaliza a tarefa.",
    ),
    cloze(
      "Complete o horário: 아홉 시___ 여섯 시까지 일해요.",
      "부터",
      "부터 marca o início do intervalo.",
    ),
    listen(
      "Ouça e escreva a função de Marco.",
      "제 부서는 고객 지원이에요.",
      "제 부서는 고객 지원이에요.",
      "O departamento dele é suporte ao cliente.",
      ["제 부서는 고객 지원이에요"],
    ),
    translate(
      "ko-pt",
      "Traduza para o português: 가끔 야근도 해요.",
      "Às vezes também faço hora extra.",
      "야근 é trabalho fora do horário; 도 reforça “também”.",
      ["Às vezes faço hora extra também."],
    ),
    reading(
      "수진은 학교에서 일해요. 그녀는 학생들을 가르치는 것을 좋아해요. 마르코는 회사에서 고객 지원을 해요.",
      "O que Sujin gosta de fazer?",
      ["Ensinar os alunos.", "Fazer hora extra.", "Trabalhar em vendas."],
      "Ensinar os alunos.",
      "학생들을 가르치는 것을 좋아해요.",
    ),
  ],
  summary: [
    "-는 것 nomeia tarefas e funções.",
    "부터 e 까지 descrevem horários de trabalho.",
    "Rotina profissional combina local, tarefa e horário.",
    "Nem todo trabalho é exercido no mesmo formato.",
  ],
});
