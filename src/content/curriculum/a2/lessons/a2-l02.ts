import {
  cloze,
  defineA2Lesson,
  listen,
  mcq,
  reading,
  translate,
} from "./shared";

/** a2-l02 — experiências de vida com -아/어 본 적이 있어요. */
export const A2_L02 = defineA2Lesson({
  id: "a2-l02",
  number: 2,
  moduleId: "a2-m01",
  title: "Eu já visitei…",
  objective:
    "Falar de experiências de vida, dizer se já fez algo e perguntar sobre o repertório de outra pessoa.",
  prerequisites: ["a2-l01"],
  estimatedMinutes: 55,
  dialogueTitle: "Experiências de viagem",
  intro: [
    {
      title: "Experiência, não momento exato",
      body:
        "Para dizer “já fiz algo alguma vez”, use -아/어 본 적이 있어요. O foco está na experiência acumulada, não em quando aconteceu. A negação é -아/어 본 적이 없어요.",
      ko: "한국에 간 적이 있어요.",
    },
    {
      title: "Perguntar sem pressionar",
      body:
        "A pergunta sobe com entonação ou com -아/어 봤어요? Ela é adequada em conversa informal polida. 한번 significa “uma vez” e pode reforçar que a experiência aconteceu pelo menos uma vez.",
      ko: "외국에서 살아 본 적이 있어요?",
    },
    {
      title: "Viagem real e viagem sonhada",
      body:
        "Neste diálogo, Ana e Jiwoo separam o que já fizeram do que ainda querem fazer. Observe a diferença entre uma experiência concluída e um desejo com -고 싶어요.",
      ko: "저는 아직 온천에 가 본 적이 없어요.",
    },
  ],
  dialogue: [
    ["지우", "아나 씨는 해외여행을 많이 해 봤어요?", "Ana, você já viajou bastante para o exterior?"],
    ["아나", "네, 몇 번 해 봤어요. 일본에는 두 번 갔어요.", "Sim, já viajei algumas vezes. Fui ao Japão duas vezes."],
    ["지우", "일본에서 온천에도 가 봤어요?", "Você já foi a uma fonte termal no Japão?"],
    ["아나", "네, 가 봤어요. 경치가 정말 좋았어요.", "Sim, já fui. A paisagem era realmente bonita."],
    ["지우", "저는 아직 해외에서 살아 본 적이 없어요.", "Eu ainda nunca morei no exterior."],
    ["아나", "저도 살아 본 적은 없어요. 대신 출장으로 많이 다녀 봤어요.", "Eu também nunca morei. Em compensação, já viajei muito a trabalho."],
  ],
  reusedIds: ["ko:여행", "ko:일본", "ko:한국", "ko:정말", "ko:많이"],
  grammar: [
    [
      "-아/어 본 적이 있어요 — já experimentou",
      "동사 + -아/어 본 적이 있어요 / 없어요",
      "O verbo auxiliar 보다 indica “experimentar”. 적 é “ocasião”. Juntos, expressam que a pessoa já teve ou nunca teve uma experiência. Não use essa forma para algo que está acontecendo agora.",
      [
        ["한국에 간 적이 있어요.", "Já estive na Coreia."],
        ["온천에 가 본 적이 없어요.", "Nunca fui a uma fonte termal."],
      ],
    ],
    [
      "한번 e 전에",
      "한번 / 전에",
      "한번 significa “uma vez” e pode acompanhar a experiência. 전에 significa “antes” e costuma vir com um período, como 작년에. Os dois não substituem o marcador de experiência: o verbo continua em -아/어 본 적이 있어요.",
      [
        ["한번 가 봤어요.", "Já fui uma vez."],
        ["작년에 제주도에 간 적이 있어요.", "No ano passado, estive em Jeju."],
      ],
    ],
    [
      "Perguntar sobre experiência",
      "-(으)ㄴ 적이 있어요? / -아/어 봤어요?",
      "A pergunta pode usar a forma completa ou a versão mais curta com 봤어요?. A entonação final é o que transforma a frase em pergunta. Responda com 네/아니요 e a forma correspondente.",
      [
        ["외국에서 살아 본 적이 있어요?", "Você já morou no exterior?"],
        ["네, 한번 살아 봤어요.", "Sim, já morei uma vez."],
      ],
    ],
  ],
  guided: [
    mcq(
      "O que Ana já fez no Japão?",
      ["Foi a uma fonte termal.", "Morou no exterior.", "Trabalhou em uma ONG."],
      "Foi uma fonte termal.",
      "지우 pergunta sobre 온천 e Ana responde 가 봤어요: ela já foi a uma fonte termal.",
    ),
    cloze(
      "Complete com a forma de experiência: 저는 한국에 간 ___ 있어요.",
      "적이",
      "간 적이 있어요 significa “já estive/fui alguma vez”.",
    ),
    listen(
      "Ouça e escreva a experiência que Jiwoo ainda não teve.",
      "저는 아직 해외에서 살아 본 적이 없어요.",
      "저는 아직 해외에서 살아 본 적이 없어요.",
      "Jiwoo diz que ainda nunca morou no exterior.",
      ["저는 아직 해외에서 살아 본 적이 없어요"],
    ),
    reading(
      "지우는 해외에서 살아 본 적이 없어요. 대신 출장으로 여러 나라에 가 봤어요.",
      "O que Jiwoo já fez?",
      ["Viajou a trabalho por vários países.", "Morou no Japão.", "Foi a uma fonte termal."],
      "Viajou a trabalho por vários países.",
      "출장으로 여러 나라에 가 봤어요: ela já viajou a trabalho por vários países.",
    ),
    translate(
      "pt-ko",
      "Traduza para o coreano: “Já fui ao Japão uma vez.”",
      "일본에 한번 가 봤어요.",
      "한번 marca “uma vez”; 가 봤어요 é a experiência de ir.",
      ["일본에 한 번 가 봤어요."],
    ),
  ],
  independent: [
    mcq(
      "Qual frase diz que a pessoa nunca experimentou algo?",
      [
        "김치를 먹어 본 적이 없어요.",
        "김치를 먹고 있어요.",
        "김치를 먹을 거예요.",
      ],
      "김치를 먹어 본 적이 없어요.",
      "-아/어 본 적이 없어요 expressa ausência de experiência.",
    ),
    cloze(
      "Complete a pergunta: 외국에서 살아 본 적이 ___?",
      "있어요",
      "A pergunta completa é 살아 본 적이 있어요? — “você já morou no exterior?”.",
    ),
    listen(
      "Ouça e escreva a experiência de Ana.",
      "일본에는 두 번 갔어요.",
      "일본에는 두 번 갔어요.",
      "Ana já foi ao Japão duas vezes.",
      ["일본에는 두 번 갔어요"],
    ),
    translate(
      "ko-pt",
      "Traduza para o português: 저는 아직 온천에 가 본 적이 없어요.",
      "Eu ainda nunca fui a uma fonte termal.",
      "아직 reforça “ainda”; 가 본 적이 없어요 é “nunca fui”.",
      ["Eu ainda não fui a uma fonte termal.", "Ainda não fui a uma fonte termal."],
    ),
    reading(
      "아나는 일본에 두 번 갔어요. 온천에도 가 봤어요. 지우는 해외에서 산 적이 없어요.",
      "Quem já morou no exterior?",
      ["Nenhuma das duas.", "Ana.", "Jiwoo."],
      "Nenhuma das duas.",
      "O texto diz que Jiwoo nunca morou no exterior e não afirma que Ana morou.",
    ),
  ],
  summary: [
    "-아/어 본 적이 있어요/없어요 expressa experiência de vida.",
    "한번 e 전에 ajudam a situar a experiência sem substituir a estrutura.",
    "A pergunta pode ser feita com a forma completa ou com -아/어 봤어요?.",
    "Conteúdo original em revisão; a naturalidade das formas ainda depende de falante nativo.",
  ],
});
