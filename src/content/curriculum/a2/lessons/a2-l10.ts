import {
  cloze,
  defineA2Lesson,
  listen,
  mcq,
  reading,
  translate,
} from "./shared";

/** a2-l10 — condições e planos alternativos. */
export const A2_L10 = defineA2Lesson({
  id: "a2-l10",
  number: 10,
  moduleId: "a2-m02",
  title: "Se der tempo…",
  objective:
    "Fazer planos condicionais, prever consequências simples e oferecer um plano alternativo.",
  prerequisites: ["a2-l09"],
  estimatedMinutes: 55,
  dialogueTitle: "Plano A e plano B",
  intro: [
    {
      title: "Condição com -(으)면",
      body:
        "-(으)면 significa “se” ou “quando”. A condição vem primeiro; o resultado vem depois. Não use passado na condição para fatos hipotéticos simples.",
      ko: "비가 오면 집에 있을 거예요.",
    },
    {
      title: "Hipótese com 만약",
      body:
        "만약 reforça que a situação é hipotética. É opcional, mas ajuda a deixar claro que você está imaginando um cenário, não afirmando um fato.",
      ko: "만약 시간이 없으면 다음에 만나요.",
    },
    {
      title: "Alternativa com 아니면",
      body:
        "아니면 significa “ou, se não”. Use para oferecer um plano B. Em uma conversa, uma alternativa pronta evita deixar o encontro sem solução.",
      ko: "공원에 갈까요? 아니면 카페에 갈까요?",
    },
  ],
  dialogue: [
    ["수진", "토요일에 등산할까요?", "Vamos fazer trilha no sábado?"],
    ["마르코", "좋아요. 그런데 만약 비가 오면 어떻게 해요?", "Certo. Mas se chover, o que fazemos?"],
    ["수진", "비가 오면 등산을 못 해요. 대신 영화를 볼까요?", "Se chover, não podemos fazer trilha. Em vez disso, que tal ver um filme?"],
    ["마르코", "좋아요. 그럼 토요일 아침에 날씨를 확인해요.", "Combinado. Então, no sábado de manhã, verificamos o tempo."],
    ["수진", "날씨가 좋으면 산에 가고, 아니면 영화관에 가요.", "Se o tempo estiver bom, vamos à montanha; se não, ao cinema."],
    ["마르코", "완벽한 계획이에요.", "Plano perfeito."],
  ],
  reusedIds: ["ko:날씨", "ko:비", "ko:공원", "ko:취소하다", "ko:시간"],
  grammar: [
    [
      "-(으)면 — condição",
      "radical + -(으)면",
      "A condição vem antes de -(으)면. O resultado pode ser presente, futuro ou uma sugestão. Não use -(으)면 para falar de uma causa já concluída; nesse caso, -아/어서 é mais adequado.",
      [
        ["비가 오면 집에 있을 거예요.", "Se chover, ficarei em casa."],
        ["시간이 있으면 같이 공부해요.", "Se tiver tempo, estudamos juntos."],
      ],
    ],
    [
      "만약 e 아니면",
      "만약 … -(으)면 / 아니면",
      "만약 introduz a hipótese; 아니면 oferece a alternativa. Juntos, organizam um plano A e um plano B. Não confunda 아니면 com 아니에요 (“não é”).",
      [
        ["만약 비가 오면 영화를 봐요.", "Se chover, vemos um filme."],
        ["산에 가요. 아니면 영화관에 가요.", "Vamos à montanha. Ou vamos ao cinema."],
      ],
    ],
  ],
  guided: [
    mcq(
      "O que eles fazem se chover?",
      ["Vão ao cinema.", "Fazem trilha.", "Ficam em casa."],
      "Vão ao cinema.",
      "비가 오면 등산을 못 해요. 대신 영화를 볼까요?",
    ),
    cloze(
      "Complete a condição: 비가 오___ 집에 있을 거예요.",
      "면",
      "오면 significa “se chover”.",
    ),
    listen(
      "Ouça e escreva a frase completa que contém o plano para sábado de manhã.",
      "토요일 아침에 날씨를 확인해요.",
      "토요일 아침에 날씨를 확인해요.",
      "No sábado de manhã, eles verificam o tempo.",
      ["토요일 아침에 날씨를 확인해요"],
    ),
    reading(
      "날씨가 좋으면 산에 가요. 비가 오면 영화관에 가요.",
      "Qual é o plano B?",
      ["Ir ao cinema.", "Ir à montanha.", "Ficar em casa."],
      "Ir ao cinema.",
      "비가 오면 영화관에 가요: o plano B é o cinema.",
    ),
    translate(
      "pt-ko",
      "Traduza para o coreano: “Se chover, ficarei em casa.”",
      "비가 오면 집에 있을 거예요.",
      "오면 é a condição; 있을 거예요 é o futuro.",
      ["비가 오면 집에 있어요."],
    ),
  ],
  independent: [
    mcq(
      "Qual palavra introduz uma hipótese?",
      ["만약", "그래서", "하지만"],
      "만약",
      "만약 introduz uma condição hipotética.",
    ),
    cloze(
      "Complete a alternativa: 산에 갈까요? ___ 영화관에 갈까요?",
      "아니면",
      "아니면 oferece a segunda opção.",
    ),
    listen(
      "Ouça e escreva a frase completa que contém a condição para ir à montanha.",
      "날씨가 좋으면 산에 가요.",
      "날씨가 좋으면 산에 가요.",
      "Se o tempo estiver bom, eles vão à montanha.",
      ["날씨가 좋으면 산에 가요"],
    ),
    translate(
      "ko-pt",
      "Traduza para o português: 만약 시간이 없으면 다음에 만나요.",
      "Se não tiver tempo, nos encontramos na próxima.",
      "만약 reforça a hipótese; 없으면 é “se não houver”.",
      ["Se não houver tempo, nos encontramos depois.", "Se você não tiver tempo, nos encontramos na próxima."],
    ),
    reading(
      "내일 비가 오면 소풍을 취소해요. 대신 집에서 영화를 봐요. 비가 오지 않으면 공원에 가요.",
      "Quando o passeio será cancelado?",
      ["Se chover.", "Se fizer sol.", "Se houver vento."],
      "Se chover.",
      "비가 오면 소풍을 취소해요: a chuva cancela o passeio.",
    ),
  ],
  summary: [
    "-(으)면 introduz condições e resultados.",
    "만약 deixa a hipótese explícita; 아니면 oferece uma alternativa.",
    "Um bom plano B não depende do plano A dar certo.",
    "Condições hipotéticas não são promessas.",
  ],
});
