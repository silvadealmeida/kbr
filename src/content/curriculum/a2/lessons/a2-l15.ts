import {
  cloze,
  defineA2Lesson,
  listen,
  mcq,
  reading,
  translate,
} from "./shared";

/** a2-l15 — mudança, adaptação e mudança de estado. */
export const A2_L15 = defineA2Lesson({
  id: "a2-l15",
  number: 15,
  moduleId: "a2-m03",
  title: "Mudança",
  objective:
    "Contar como foi uma mudança de vida, o que mudou e como foi o processo de adaptação.",
  prerequisites: ["a2-l14"],
  estimatedMinutes: 60,
  dialogueTitle: "A mudança para Seul",
  intro: [
    {
      title: "Mudança de estado com -게 되다",
      body:
        "-게 되다 indica que uma situação passou a acontecer, muitas vezes sem ser uma decisão isolada. É útil para falar de mudanças de vida.",
      ko: "서울에서 살게 되었어요.",
    },
    {
      title: "Processo com -아/어지다",
      body:
        "-아/어지다 descreve uma mudança gradual: “ficar mais…”, “tornar-se…”. Use com adjetivos para mostrar adaptação ao longo do tempo.",
      ko: "이제 생활이 조금 편해졌어요.",
    },
    {
      title: "Saudade com 그리워하다",
      body:
        "그리워하다 expressa saudade de alguém ou de um lugar. Não use para dizer que algo é difícil; para dificuldade, use 힘들다.",
      ko: "고향 친구들이 그리워요.",
    },
  ],
  dialogue: [
    ["지민", "수진 씨, 서울로 이사했다면서요?", "Sujin, ouvi dizer que você se mudou para Seul."],
    ["수진", "네, 지난달에 이사하게 되었어요.", "Sim, acabei me mudando no mês passado."],
    ["지민", "새집은 어때요?", "Como é a casa nova?"],
    ["수진", "처음에는 모든 게 낯설었어요. 그런데 이제는 조금 익숙해졌어요.", "No começo tudo era estranho. Mas agora já me acostumei um pouco."],
    ["지민", "고향 생각이 많이 나요?", "Você sente muita saudade da sua cidade?"],
    ["수진", "네, 가끔 친구들이 그리워요. 그래도 새로운 생활에 적응하고 있어요.", "Sim, às vezes sinto saudade dos amigos. Mesmo assim, estou me adaptando à nova vida."],
  ],
  reusedIds: ["ko:집", "ko:가구", "ko:주소", "ko:친구", "ko:사진"],
  grammar: [
    [
      "-게 되다 — passar a",
      "동사 + -게 되다",
      "A forma indica uma mudança que aconteceu na vida da pessoa. Pode ser uma consequência ou uma circunstância, não necessariamente uma escolha. No passado, -게 되었어요.",
      [
        ["서울에서 살게 되었어요.", "Passei a morar em Seul."],
        ["새 친구를 만나게 되었어요.", "Acabei conhecendo novos amigos."],
      ],
    ],
    [
      "-아/어지다 — tornar-se",
      "adjetivo + -아/어지다",
      "A forma descreve mudança gradual de estado. Com 편하다, fica 편해지다; com 익숙하다, 익숙해지다. Use para mostrar adaptação.",
      [
        ["이제 생활이 조금 편해졌어요.", "Agora a vida ficou um pouco mais confortável."],
        ["동네가 익숙해졌어요.", "O bairro se tornou familiar."],
      ],
    ],
  ],
  guided: [
    mcq(
      "Quando Sujin se mudou?",
      ["No mês passado.", "No ano passado.", "Na semana passada."],
      "No mês passado.",
      "지난달에 이사하게 되었어요.",
    ),
    cloze(
      "Complete a mudança: 서울에서 살___ 되었어요.",
      "게",
      "살게 되었어요 significa “passei a morar”.",
    ),
    listen(
      "Ouça e escreva como Sujin se sente agora.",
      "이제는 조금 익숙해졌어요.",
      "이제는 조금 익숙해졌어요.",
      "Agora ela já se acostumou um pouco.",
      ["이제는 조금 익숙해졌어요"],
    ),
    reading(
      "수진은 지난달에 서울로 이사했어요. 처음에는 낯설었지만 지금은 적응하고 있어요.",
      "Como foi o começo?",
      ["Tudo era estranho.", "Tudo era fácil.", "Ela já conhecia a cidade."],
      "Tudo era estranho.",
      "처음에는 모든 게 낯설었어요.",
    ),
    translate(
      "pt-ko",
      "Traduza para o coreano: “Sinto saudade dos meus amigos.”",
      "친구들이 그리워요.",
      "그리워요 expressa saudade.",
      ["친구가 그리워요.", "고향 친구들이 그리워요."],
    ),
  ],
  independent: [
    mcq(
      "Qual frase descreve uma mudança gradual?",
      ["생활이 편해졌어요.", "생활이 편해요.", "생활이 편할 거예요."],
      "생활이 편해졌어요.",
      "-아/어졌어요 indica que o estado mudou.",
    ),
    cloze(
      "Complete a adaptação: 동네가 익숙___.",
      "해졌어요",
      "익숙해졌어요 significa “tornou-se familiar”.",
    ),
    listen(
      "Ouça e escreva o que ainda causa saudade.",
      "가끔 친구들이 그리워요.",
      "가끔 친구들이 그리워요.",
      "Às vezes ela sente saudade dos amigos.",
      ["가끔 친구들이 그리워요"],
    ),
    translate(
      "ko-pt",
      "Traduza para o português: 새로운 생활에 적응하고 있어요.",
      "Estou me adaptando à nova vida.",
      "적응하고 있어요 é “estou me adaptando”.",
      ["Estou me adaptando à vida nova."],
    ),
    reading(
      "마르코는 새집으로 이사했어요. 짐을 포장하는 데 이틀이 걸렸어요. 이제 집이 조금씩 편해졌어요.",
      "Quanto tempo levou para embalar as coisas?",
      ["Dois dias.", "Duas horas.", "Uma semana."],
      "Dois dias.",
      "짐을 포장하는 데 이틀이 걸렸어요.",
    ),
  ],
  summary: [
    "-게 되다 indica uma mudança que passou a acontecer.",
    "-아/어지다 mostra mudança gradual de estado.",
    "그리워하다 expressa saudade de pessoas ou lugares.",
    "Relatos de mudança ganham clareza com antes, durante e depois.",
  ],
});
