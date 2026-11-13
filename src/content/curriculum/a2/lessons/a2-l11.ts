import {
  cloze,
  defineA2Lesson,
  listen,
  mcq,
  reading,
  translate,
} from "./shared";

/** a2-l11 — moradia e vida independente. */
export const A2_L11 = defineA2Lesson({
  id: "a2-l11",
  number: 11,
  moduleId: "a2-m03",
  title: "Morando sozinho",
  objective:
    "Descrever o tipo de moradia, falar de custos e comparar a vida sozinho com a vida em república.",
  prerequisites: ["a2-c02"],
  estimatedMinutes: 55,
  dialogueTitle: "República ou apartamento?",
  intro: [
    {
      title: "Nominalizar com -는 것",
      body:
        "-는 것 transforma uma ação em substantivo: “o ato de…”. Na conversa, aparece como -는 게 (sujeito) ou -는 것을 (objeto). É útil para falar de vantagens e custos.",
      ko: "혼자 사는 게 편해요.",
    },
    {
      title: "Custos de moradia",
      body:
        "Na Coreia, além do aluguel mensal, é comum haver depósito caução e taxa de manutenção. Ao comparar opções, mencione o custo total, não apenas o valor mensal.",
      ko: "보증금과 관리비도 있어요.",
    },
  ],
  dialogue: [
    ["지민", "마르코 씨는 지금 어디에 살아요?", "Marco, onde você mora agora?"],
    ["마르코", "역 근처 원룸에 살아요. 혼자 사는 게 편해요.", "Moro em um apartamento de um cômodo perto da estação. Viver sozinho é confortável."],
    ["지민", "집세가 비싸지 않아요?", "O aluguel não é caro?"],
    ["마르코", "조금 비싸요. 보증금도 많고 관리비도 따로 내요.", "É um pouco caro. O depósito é alto e a taxa de manutenção é separada."],
    ["지민", "저는 친구들과 아파트에서 살아요. 같이 사는 게 재미있어요.", "Eu moro em um apartamento com amigos. Viver junto é divertido."],
    ["마르코", "그렇지만 혼자 사는 게 조용해서 좋아요.", "Mas viver sozinho é bom porque é silencioso."],
  ],
  reusedIds: ["ko:집", "ko:방", "ko:이사", "ko:주소", "ko:가구"],
  grammar: [
    [
      "-는 것 — nominalização",
      "동사 + -는 것 / -는 게 / -는 것을",
      "-는 것 transforma a ação em um substantivo. -는 게 é a forma com 이/가 contraída; -는 것을 é a forma com 을/를. Use para avaliar uma atividade.",
      [
        ["혼자 사는 게 편해요.", "Viver sozinho é confortável."],
        ["집을 구하는 것을 도와주세요.", "Ajude-me a encontrar uma casa."],
      ],
    ],
    [
      "-고 있다 — estado atual",
      "동사 + -고 있다",
      "A forma descreve uma ação em andamento ou uma situação atual. Com 살다, 살고 있다 significa “estar morando”. Não confunda com o presente habitual 살아요.",
      [
        ["저는 지금 원룸에 살고 있어요.", "Agora estou morando em um apartamento de um cômodo."],
        ["친구들은 아파트에 살고 있어요.", "Meus amigos estão morando em um apartamento."],
      ],
    ],
  ],
  guided: [
    mcq(
      "Onde Marco mora?",
      ["Em um apartamento de um cômodo perto da estação.", "Em uma república com amigos.", "Na casa dos pais."],
      "Em um apartamento de um cômodo perto da estação.",
      "역 근처 원룸에 살아요.",
    ),
    cloze(
      "Complete: 혼자 사___ 게 편해요.",
      "는",
      "사는 게 편해요 significa “viver sozinho é confortável”.",
    ),
    listen(
      "Ouça e escreva a frase completa que contém o custo extra mencionado.",
      "보증금도 많고 관리비도 따로 내요.",
      "보증금도 많고 관리비도 따로 내요.",
      "O depósito caução é alto e a taxa de manutenção é paga separadamente.",
      ["보증금도 많고 관리비도 따로 내요"],
    ),
    reading(
      "마르코는 원룸에 살아요. 집세와 관리비를 따로 내요. 지민은 친구들과 아파트에서 살아요.",
      "Com quem Jimin mora?",
      ["Com amigos.", "Sozinha.", "Com a família."],
      "Com amigos.",
      "친구들과 아파트에서 살아요.",
    ),
    translate(
      "pt-ko",
      "Traduza para o coreano: “Viver sozinho é confortável.”",
      "혼자 사는 게 편해요.",
      "사는 게 nominaliza a ação; 편해요 é “é confortável”.",
      ["혼자 사는 것이 편해요."],
    ),
  ],
  independent: [
    mcq(
      "Qual frase fala de uma situação atual?",
      ["지금 원룸에 살고 있어요.", "작년에 원룸에 살았어요.", "내년에 원룸에 살 거예요."],
      "지금 원룸에 살고 있어요.",
      "-고 있어요 indica situação em andamento.",
    ),
    cloze(
      "Complete: 아파트에 살___ 있어요.",
      "고",
      "살고 있어요 significa “estou morando”.",
    ),
    listen(
      "Ouça e escreva a frase completa que contém a vantagem de morar sozinho.",
      "혼자 사는 게 조용해서 좋아요.",
      "혼자 사는 게 조용해서 좋아요.",
      "Morar sozinho é bom porque é silencioso.",
      ["혼자 사는 게 조용해서 좋아요"],
    ),
    translate(
      "ko-pt",
      "Traduza para o português: 보증금이 너무 비싸요.",
      "O depósito caução é caro demais.",
      "보증금 é o depósito; 비싸요 é “é caro”.",
      ["O depósito é caro demais.", "A caução é muito cara."],
    ),
    reading(
      "수진은 기숙사에서 살아요. 집세가 없어서 좋아요. 하지만 룸메이트와 함께 쓰는 공간이 많아요.",
      "Qual é a vantagem da moradia de Sujin?",
      ["Não paga aluguel.", "Tem um quarto só para ela.", "Mora perto do trabalho."],
      "Não paga aluguel.",
      "집세가 없어서 좋아요: ela não paga aluguel.",
    ),
  ],
  summary: [
    "-는 것/-는 게 nominaliza ações para avaliar atividades.",
    "-고 있다 descreve uma situação atual.",
    "Ao comparar moradia, considere aluguel, depósito e manutenção.",
    "A escolha de moradia envolve custo, privacidade e convivência.",
  ],
});
