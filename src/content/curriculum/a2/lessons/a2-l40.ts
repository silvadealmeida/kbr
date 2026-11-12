import {
  cloze,
  defineA2Lesson,
  listen,
  mcq,
  reading,
  translate,
} from "./shared";

/** a2-l40 — consolidação integrada do A2. */
export const A2_L40 = defineA2Lesson({
  id: "a2-l40",
  number: 40,
  moduleId: "a2-m08",
  title: "Consigo me virar em A2",
  objective:
    "Integrar relato, opinião, plano e resolução de problema em uma conversa cotidiana mais longa.",
  prerequisites: ["a2-l39"],
  estimatedMinutes: 65,
  dialogueTitle: "Balanço do curso",
  intro: [
    {
      title: "Escolher a forma pela intenção",
      body:
        "Em uma conversa, você alterna passado, opinião, condição e plano. A escolha da terminação comunica o grau de certeza e o tipo de relação. Não existe uma forma única para tudo.",
      ko: "경험을 이야기하고, 의견을 말하고, 계획을 세워요.",
    },
    {
      title: "Fechar sem prometer demais",
      body:
        "Ao avaliar o próprio percurso, reconheça o que aprendeu e o que ainda precisa praticar. A conclusão do A2 é interna do KBR e não certifica CEFR ou TOPIK.",
      ko: "아직 배울 것이 많지만 계속 연습할 거예요.",
    },
  ],
  dialogue: [
    ["지민", "수진 씨, A2 과정을 거의 다 끝냈네요. 어땠어요?", "Sujin, você está quase terminando o curso A2. Como foi?"],
    ["수진", "처음에는 과거 이야기가 어려웠어요. 그런데 여행 이야기를 하면서 많이 익숙해졌어요.", "No começo, falar do passado era difícil. Mas, contando histórias de viagem, fiquei muito mais à vontade."],
    ["지민", "이제 가장 자신 있는 게 뭐예요?", "O que você se sente mais confiante em fazer agora?"],
    ["수진", "간단한 문제를 설명하고 도움을 요청하는 것이 자신 있어요. 아직 뉴스는 어려워요.", "Tenho confiança em explicar problemas simples e pedir ajuda. Ainda acho notícias difíceis."],
    ["지민", "그건 자연스러운 것 같아요. 저도 계속 연습하려고 해요.", "Isso parece natural. Eu também pretendo continuar praticando."],
    ["수진", "좋아요. 우리 같이 다음 단계도 천천히 준비해요.", "Legal. Vamos nos preparar juntos para a próxima etapa, com calma."],
  ],
  reusedIds: ["ko:목표", "ko:자신감", "ko:성장", "ko:경험", "ko:감사합니다"],
  grammar: [
    [
      "Selecionar a forma pela intenção",
      "passado / opinião / condição / plano",
      "Um relato usa -았/었어요; uma opinião, -라고 생각해요; uma condição, -(으)면; um plano, -려고 해요 ou -(으)ㄹ 거예요. A fluência depende de escolher a forma adequada, não de acumular gramática.",
      [
        ["여행을 하면서 많이 배웠어요.", "Aprendi muito viajando."],
        ["다음에는 더 천천히 말하려고 해요.", "Na próxima vez, pretendo falar mais devagar."],
      ],
    ],
    [
      "Conectores de fechamento",
      "그래서 / 하지만 / 결국",
      "Use conectores para organizar o balanço: 그래서 para consequência, 하지만 para contraste e 결국 para conclusão. Não é preciso usar todos.",
      [
        ["처음에는 어려웠지만 지금은 익숙해졌어요.", "No começo era difícil, mas agora estou acostumado."],
        ["그래서 계속 연습하려고 해요.", "Por isso, pretendo continuar praticando."],
      ],
    ],
  ],
  guided: [
    mcq(
      "O que Sujin achava difícil no começo?",
      ["Falar do passado.", "Pedir ajuda.", "Explicar problemas simples."],
      "Falar do passado.",
      "처음에는 과거 이야기가 어려웠어요.",
    ),
    cloze(
      "Complete a avaliação: 여행 이야기를 하___ 많이 익숙해졌어요.",
      "면서",
      "하면서 indica ação simultânea: “enquanto contava histórias”.",
    ),
    listen(
      "Ouça e escreva o que Sujin ainda acha difícil.",
      "아직 뉴스는 어려워요.",
      "아직 뉴스는 어려워요.",
      "Ela ainda acha notícias difíceis.",
      ["아직 뉴스는 어려워요"],
    ),
    reading(
      "수진은 과거 이야기를 연습하면서 많이 익숙해졌어요. 간단한 문제를 설명하고 도움을 요청하는 것도 자신 있어요. 하지만 뉴스는 아직 어려워요.",
      "O que Sujin ainda acha difícil?",
      ["Notícias.", "Pedir ajuda.", "Falar do passado."],
      "Notícias.",
      "아직 뉴스는 어려워요.",
    ),
    translate(
      "pt-ko",
      "Traduza para o coreano: “Ainda tenho muito a aprender.”",
      "아직 배울 것이 많아요.",
      "배울 것이 많아요 significa “há muitas coisas a aprender”.",
      ["아직 배울 게 많아요."],
    ),
  ],
  independent: [
    mcq(
      "Qual frase expressa um plano?",
      ["계속 연습하려고 해요.", "계속 연습했어요.", "계속 연습하면 좋겠어요."],
      "계속 연습하려고 해요.",
      "-려고 해요 expressa intenção.",
    ),
    cloze(
      "Complete o contraste: 처음에는 어려웠___ 지금은 익숙해졌어요.",
      "지만",
      "어려웠지만 introduz o contraste com o presente.",
    ),
    listen(
      "Ouça e escreva o plano de Jimin.",
      "저도 계속 연습하려고 해요.",
      "저도 계속 연습하려고 해요.",
      "Jimin também pretende continuar praticando.",
      ["저도 계속 연습하려고 해요"],
    ),
    translate(
      "ko-pt",
      "Traduza para o português: 간단한 문제를 설명하고 도움을 요청하는 것이 자신 있어요.",
      "Tenho confiança em explicar problemas simples e pedir ajuda.",
      "자신 있어요 significa “tenho confiança”.",
      ["Sinto confiança para explicar problemas simples e pedir ajuda."],
    ),
    reading(
      "A2 과정을 끝내도 배움은 계속돼요. 자신 있는 부분을 유지하고, 어려운 부분은 작은 목표로 나누어 연습하는 게 좋아요.",
      "Qual é a recomendação?",
      ["Dividir dificuldades em metas pequenas.", "Parar de estudar.", "Evitar conteúdo difícil para sempre."],
      "Dividir dificuldades em metas pequenas.",
      "어려운 부분은 작은 목표로 나누어 연습하는 게 좋아요.",
    ),
  ],
  summary: [
    "O A2 integra relato, opinião, condição, plano e resolução de problema.",
    "A forma verbal comunica intenção e grau de certeza.",
    "Reconhecer limites é parte de uma autoavaliação honesta.",
    "A conclusão do A2 é interna e não certifica CEFR ou TOPIK.",
  ],
});
