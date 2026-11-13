import {
  cloze,
  defineA2Lesson,
  listen,
  mcq,
  reading,
  translate,
} from "./shared";

/** a2-l03 — comparação de aparência, personalidade e gostos. */
export const A2_L03 = defineA2Lesson({
  id: "a2-l03",
  number: 3,
  moduleId: "a2-m01",
  title: "É parecido, mas diferente",
  objective:
    "Comparar duas pessoas ou coisas, dizer no que são parecidas e no que são diferentes.",
  prerequisites: ["a2-l02"],
  estimatedMinutes: 55,
  dialogueTitle: "Os irmãos de Jiwoo",
  intro: [
    {
      title: "Comparar com critério",
      body:
        "A estrutura X보다 Y가 더… significa “Y é mais… que X”. O critério precisa estar claro: altura, personalidade, idade ou gosto. Sem critério, a comparação fica vaga.",
      ko: "동생이 저보다 키가 더 커요.",
    },
    {
      title: "Parecido e diferente",
      body:
        "비슷하다 significa “ser parecido”; 다르다, “ser diferente”. Use 와/과 ou 하고 entre os dois elementos. O predicado concorda com o que está sendo comparado.",
      ko: "성격은 저와 달라요.",
    },
    {
      title: "Semelhança com 처럼",
      body:
        "처럼 significa “como” ou “igual a”. Ele cria uma comparação direta e não deve ser usado para dizer que duas pessoas são idênticas em tudo.",
      ko: "동생은 저처럼 조용해요.",
    },
  ],
  dialogue: [
    ["아나", "지우 씨, 사진 속 사람이 누구예요?", "Jiwoo, quem é a pessoa na foto?"],
    ["지우", "제 동생이에요. 저보다 키가 더 커요.", "É meu irmão mais novo. Ele é mais alto que eu."],
    ["아나", "얼굴은 비슷해요?", "O rosto é parecido?"],
    ["지우", "네, 얼굴은 비슷한데 성격은 완전히 달라요.", "Sim, o rosto é parecido, mas a personalidade é completamente diferente."],
    ["아나", "동생은 어떤 사람이에요?", "Como é a personalidade dele?"],
    ["지우", "저처럼 조용하지 않고 아주 외향적이에요.", "Ele não é quieto como eu; é bem extrovertido."],
  ],
  reusedIds: ["ko:사진", "ko:키", "ko:성격", "ko:동생", "ko:조용하다"],
  grammar: [
    [
      "X보다 더 — mais que",
      "A + 보다 + B가/는 더 + predicado",
      "보다 marca o ponto de referência da comparação. A partícula 이/가 ou 은/는 marca o elemento que recebe o predicado. 더 é opcional, mas deixa a comparação explícita.",
      [
        ["동생이 저보다 키가 더 커요.", "Meu irmão é mais alto que eu."],
        ["오늘이 어제보다 더 따뜻해요.", "Hoje está mais quente que ontem."],
      ],
    ],
    [
      "비슷하다 e 다르다",
      "A와/과 B가 비슷하다/다르다",
      "비슷하다 descreve semelhança; 다르다, diferença. A partícula 와/과 liga os dois elementos. Para negar semelhança, use 비슷하지 않아요 em vez de inventar uma forma nova.",
      [
        ["얼굴은 비슷해요.", "O rosto é parecido."],
        ["성격은 저와 달라요.", "A personalidade é diferente da minha."],
      ],
    ],
    [
      "처럼 — como, igual a",
      "substantivo + 처럼",
      "처럼 compara sem afirmar identidade. Pode acompanhar verbos e adjetivos. Em contextos de aparência, prefira complementar com o critério para evitar generalizações.",
      [
        ["동생은 저처럼 조용해요.", "Meu irmão é quieto como eu."],
        ["사진처럼 보여요.", "Parece uma foto."],
      ],
    ],
  ],
  guided: [
    mcq(
      "Quem é mais alto?",
      ["O irmão de Jiwoo.", "Jiwoo.", "Ana."],
      "O irmão de Jiwoo.",
      "동생이 저보다 키가 더 커요: o irmão é mais alto que Jiwoo.",
    ),
    cloze(
      "Complete a comparação: 동생이 저___ 키가 더 커요.",
      "보다",
      "보다 marca o ponto de referência: “mais alto que eu”.",
    ),
    listen(
      "Ouça e escreva a frase completa que contém o que é parecido.",
      "얼굴은 비슷해요.",
      "얼굴은 비슷해요.",
      "A fala diz que o rosto é parecido.",
      ["얼굴은 비슷해요"],
    ),
    reading(
      "지우의 동생은 지우보다 키가 커요. 얼굴은 비슷하지만 성격은 달라요.",
      "No que os irmãos são diferentes?",
      ["Na personalidade.", "Na altura.", "No rosto."],
      "Na personalidade.",
      "성격은 달라요: a personalidade é diferente.",
    ),
    translate(
      "pt-ko",
      "Traduza para o coreano: “Meu irmão é mais alto que eu.”",
      "동생이 저보다 키가 더 커요.",
      "동생이 é o sujeito; 저보다 marca a comparação; 키가 더 커요 é “é mais alto”.",
      ["제 동생이 저보다 키가 더 커요."],
    ),
  ],
  independent: [
    mcq(
      "Qual frase compara personalidades?",
      [
        "성격은 저와 달라요.",
        "키가 더 커요.",
        "사진을 봤어요.",
      ],
      "성격은 저와 달라요.",
      "성격은 저와 달라요 fala diretamente de personalidade.",
    ),
    cloze(
      "Complete com “como”: 동생은 저___ 조용해요.",
      "처럼",
      "저처럼 조용해요 significa “é quieto como eu”.",
    ),
    listen(
      "Ouça e escreva a frase completa que contém a diferença mencionada.",
      "성격은 완전히 달라요.",
      "성격은 완전히 달라요.",
      "A fala diz que a personalidade é completamente diferente.",
      ["성격은 완전히 달라요"],
    ),
    translate(
      "ko-pt",
      "Traduza para o português: 얼굴은 비슷한데 성격은 달라요.",
      "O rosto é parecido, mas a personalidade é diferente.",
      "비슷한데 introduz contraste; 달라요 significa “é diferente”.",
      ["O rosto é parecido, mas a personalidade é diferente", "Os rostos são parecidos, mas as personalidades são diferentes."],
    ),
    reading(
      "제 친구는 저보다 키가 작아요. 하지만 저보다 더 활발해요. 우리는 성격이 아주 달라요.",
      "Como é a personalidade da amiga?",
      ["Mais extrovertida que a pessoa que fala.", "Igual à pessoa que fala.", "Mais quieta que a pessoa que fala."],
      "Mais extrovertida que a pessoa que fala.",
      "저보다 더 활발해요: a amiga é mais extrovertida.",
    ),
  ],
  summary: [
    "X보다 Y가 더… compara dois elementos com um critério claro.",
    "비슷하다 e 다르다 descrevem semelhança e diferença.",
    "처럼 significa “como” e não afirma identidade total.",
    "Comparações sobre pessoas devem evitar julgamentos absolutos.",
  ],
});
