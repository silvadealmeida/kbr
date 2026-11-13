import {
  cloze,
  defineA2Lesson,
  listen,
  mcq,
  reading,
  translate,
} from "./shared";

/** a2-l33 — tratamento, honoríficos e respeito. */
export const A2_L33 = defineA2Lesson({
  id: "a2-l33",
  number: 33,
  moduleId: "a2-m07",
  title: "Tratamento e respeito",
  objective:
    "Adequar o tratamento a pessoas mais velhas e situações formais, usando honoríficos e vocabulário de respeito.",
  prerequisites: ["a2-l32"],
  estimatedMinutes: 60,
  dialogueTitle: "Na casa da avó",
  intro: [
    {
      title: "Honorífico no verbo",
      body:
        "Ao falar de uma pessoa mais velha, o verbo recebe -(으)시-: 할머니께서 오셨어요. O sujeito pode receber 께서 em vez de 이/가.",
      ko: "할머니께서 지금 계세요.",
    },
    {
      title: "Vocabulário humilde e honorífico",
      body:
        "Alguns verbos têm forma humilde: 드리다 (dar), 뵙다 (encontrar), 여쭙다 (perguntar). Use-as para falar de si mesmo diante de alguém mais velho.",
      ko: "할머니께 선물을 드렸어요.",
    },
  ],
  dialogue: [
    ["지민", "수진 씨, 이번 주말에 뭐 해요?", "Sujin, o que você faz neste fim de semana?"],
    ["수진", "할머니 댁에 가요. 할머니께서 요즘 조금 편찮으세요.", "Vou à casa da minha avó. Ultimamente ela não está muito bem."],
    ["지민", "그럼 제가 같이 가도 될까요?", "Então posso ir junto?"],
    ["수진", "물론이죠. 할머니께서 사람 만나시는 것을 좋아하세요.", "Claro. Minha avó gosta de conhecer pessoas."],
    ["지민", "처음 뵙는 분이라서 긴장돼요. 어떻게 인사하면 좋을까요?", "Como é a primeira vez que vou encontrá-la, estou nervoso. Como devo cumprimentá-la?"],
    ["수진", "그냥 공손하게 인사하시면 돼요. 너무 걱정하지 마세요.", "Basta cumprimentar com respeito. Não se preocupe tanto."],
  ],
  reusedIds: ["ko:할머니", "ko:성함", "ko:댁", "ko:어머니", "ko:아버지"],
  grammar: [
    [
      "-(으)시- — honorífico",
      "동사/형용사 + -(으)시-",
      "O honorífico concorda com o sujeito respeitado, não com o interlocutor. 편찮으시다 é a forma honorífica de não estar bem. Não use -(으)시- para si mesmo.",
      [
        ["할머니께서 지금 계세요.", "Minha avó está aqui agora."],
        ["할머니께서 조금 편찮으세요.", "Minha avó não está muito bem."],
      ],
    ],
    [
      "드리다, 뵙다, 계시다",
      "formas humildes/honoríficas",
      "드리다 substitui 주다 quando o falante dá algo a alguém respeitado; 뵙다 substitui 만나다; 계시다 substitui 있다 para o sujeito respeitado. São formas lexicalizadas, não uma conjugação regular.",
      [
        ["할머니께 선물을 드렸어요.", "Dei um presente à minha avó."],
        ["할머니를 오랜만에 뵈었어요.", "Encontrei minha avó depois de muito tempo."],
      ],
    ],
  ],
  guided: [
    mcq(
      "Por que Sujin vai à casa da avó?",
      ["Porque a avó não está muito bem.", "Porque é aniversário de Jimin.", "Porque vai estudar."],
      "Porque a avó não está muito bem.",
      "할머니께서 요즘 조금 편찮으세요.",
    ),
    cloze(
      "Complete o honorífico: 할머니께서 지금 ___.",
      "계세요",
      "계세요 é a forma honorífica de 있어요; 계셔요 é variante padrão.",
      ["계셔요"],
    ),
    listen(
      "Ouça e escreva a frase completa que contém a forma de tratamento usada por Jimin.",
      "처음 뵙는 분이라서 긴장돼요.",
      "처음 뵙는 분이라서 긴장돼요.",
      "Jimin está nervoso porque vai encontrar a pessoa pela primeira vez.",
      ["처음 뵙는 분이라서 긴장돼요"],
    ),
    reading(
      "수진은 할머니 댁에 가요. 할머니는 요즘 조금 편찮으세요. 지민도 같이 가기로 했어요.",
      "Quem está doente?",
      ["A avó de Sujin.", "Jimin.", "Sujin."],
      "A avó de Sujin.",
      "할머니께서 조금 편찮으세요.",
    ),
    translate(
      "pt-ko",
      "Traduza para o coreano: “Dei um presente à minha avó.”",
      "할머니께 선물을 드렸어요.",
      "께 marca o destinatário respeitado; 드렸어요 é a forma humilde de dar.",
      ["할머니에게 선물을 드렸어요."],
    ),
  ],
  independent: [
    mcq(
      "Qual frase usa o honorífico corretamente?",
      ["할머니께서 오셨어요.", "저는 오셨어요.", "제가 할머니셨어요."],
      "할머니께서 오셨어요.",
      "O honorífico se refere à avó.",
    ),
    cloze(
      "Complete a forma humilde: 할머니를 오랜만에 ___.",
      "뵈었어요",
      "뵈었어요 é a forma humilde de encontrar; 뵀어요 é a contração padrão.",
      ["뵀어요"],
    ),
    listen(
      "Ouça e escreva a frase completa que contém o conselho de Sujin.",
      "공손하게 인사하시면 돼요.",
      "공손하게 인사하시면 돼요.",
      "Basta cumprimentar com respeito.",
      ["공손하게 인사하시면 돼요"],
    ),
    translate(
      "ko-pt",
      "Traduza para o português: 할머니께서 사람 만나시는 것을 좋아하세요.",
      "Minha avó gosta de conhecer pessoas.",
      "만나시는 것은 a forma honorífica nominalizada.",
      ["Minha avó gosta de encontrar pessoas."],
    ),
    reading(
      "한국에서는 어른께 먼저 인사하는 것이 중요해요. 처음 만나는 어른에게는 공손하게 인사하고, 상대방의 말을 끝까지 듣는 것이 좋아요.",
      "O que é importante ao conhecer um adulto?",
      ["Cumprimentar com respeito e ouvir.", "Falar primeiro e alto.", "Usar linguagem informal."],
      "Cumprimentar com respeito e ouvir.",
      "공손하게 인사하고 말을 끝까지 들어요.",
    ),
  ],
  summary: [
    "-(으)시- marca respeito pelo sujeito.",
    "드리다, 뵙다 e 계시다 são formas lexicalizadas de respeito.",
    "Adequar o tratamento depende da relação e do contexto.",
    "Honoríficos não tornam a frase automaticamente formal demais.",
  ],
});
