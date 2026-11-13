import type { A1LessonContent } from "../types";
import {
  choices,
  cloze,
  defineA1Lesson,
  examples,
  grammarNote,
  line,
  listen,
  mcq,
  reading,
} from "./shared";

export const A1_L03: A1LessonContent = defineA1Lesson({
  id: "a1-l03",
  number: 3,
  moduleId: "a1-m01",
  title: "O que é isto?",
  objective:
    "Identificar objetos próximos e distantes e perguntar o nome de algo em uma mesa de estudo.",
  prerequisites: ["a1-l02"],
  estimatedMinutes: 50,
  dialogueTitle: "Objetos sobre a mesa",
  intro: [
    {
      title: "Três distâncias",
      body:
        "O coreano diferencia o que está perto de quem fala (이), perto de quem ouve (그) e longe dos dois (저). Essa diferença aparece antes do substantivo: 이 책, 그 가방, 저 의자.",
      ko: "이 책",
    },
    {
      title: "Pronomes para objetos",
      body:
        "Quando o objeto já está claro, use 이것, 그것 ou 저것 sem repetir o substantivo. Eles significam “isto”, “isso” e “aquilo”. O verbo continua sendo 이에요/예요.",
      ko: "이것이 뭐예요?",
    },
    {
      title: "Perguntar o nome de algo",
      body:
        "뭐 significa “o que”. A pergunta 이것이 뭐예요? usa a partícula 이 para marcar o sujeito e pede a identificação de um objeto. A resposta pode ser 이것은 공책이에요.",
      ko: "이것이 뭐예요?",
    },
    {
      title: "A cena desta lição",
      body:
        "Dois colegas olham para objetos numa mesa. Um pergunta o que é cada coisa; o outro responde com a distância adequada. Observe quando aparece 이것, 그것 e 저것.",
    },
  ],
  dialogue: [
    line("a1-l03-d1", "민수", "저기요, 이것이 뭐예요?", "Com licença, o que é isto?"),
    line("a1-l03-d2", "아나", "그것은 공책이에요.", "Isso é um caderno."),
    line("a1-l03-d3", "민수", "그리고 이것은 뭐예요?", "E o que é isto?"),
    line("a1-l03-d4", "아나", "이것은 연필이에요.", "Isto é um lápis."),
    line("a1-l03-d5", "민수", "저것은 책이에요?", "Aquilo é um livro?"),
    line("a1-l03-d6", "아나", "아니요, 저것은 안경이에요.", "Não, aquilo são óculos."),
  ],
  vocabulary: {
    reusedIds: ["ko:책", "ko:시계", "ko:의자", "ko:뭐", "ko:이름", "ko:학생"],
  },
  grammar: [
    grammarNote(
      "g:a1-l03-demonstratives",
      "이 / 그 / 저 — indicar distância",
      "이 + substantivo / 그 + substantivo / 저 + substantivo",
      "Use 이 para algo perto de quem fala, 그 para algo perto de quem ouve ou já mencionado, e 저 para algo longe dos dois. O substantivo vem depois, sem partícula entre eles.",
      examples(["이 책은 제 책이에요.", "Este livro é meu."], ["저 의자는 제 의자예요.", "Aquela cadeira é minha."]),
    ),
    grammarNote(
      "g:a1-l03-pronouns",
      "이것 / 그것 / 저것 — isto, isso, aquilo",
      "이것 / 그것 / 저것",
      "Esses pronomes substituem o substantivo quando ele já está claro. Também seguem a mesma lógica de distância. Podem receber 은/는 ou 이/가 conforme o papel na frase.",
      examples(["이것은 연필이에요.", "Isto é um lápis."], ["저것은 안경이에요.", "Aquilo são óculos."]),
    ),
    grammarNote(
      "g:a1-l03-subject",
      "이/가 — marcar o sujeito da identificação",
      "이것이 뭐예요?",
      "이/가 marca o sujeito. Em 이것이 뭐예요?, o foco está em “o que é isto?”. Já 이것은 뭐예요? apresenta “isto” como tópico. Nesta lição, as duas formas são compreensíveis; comece pela pergunta com 이/가.",
      examples(["이것이 뭐예요?", "O que é isto?"], ["이것은 공책이에요.", "Isto é um caderno."]),
    ),
    grammarNote(
      "g:a1-l03-what",
      "뭐예요? — perguntar o que é",
      "뭐 + 예요?",
      "뭐 é “o que” e 예요 é a forma polida ligada a uma palavra terminada em vogal. A pergunta 뭐예요? pode ser usada sozinha em contexto, mas é mais clara com o objeto: 이것이 뭐예요?.",
      examples(["이것이 뭐예요?", "O que é isto?"], ["이름이 뭐예요?", "Qual é o seu nome?"]),
    ),
  ],
  exercises: [
    mcq(
      "a1-l03-e01",
      "guided",
      "Você aponta para um objeto que está perto de você. Qual palavra usa?",
      ["이것", "그것", "저것"],
      "이것",
      "이것 indica algo perto de quem fala.",
    ),
    cloze(
      "a1-l03-e02",
      "guided",
      "Complete com “isso” (perto de quem ouve): ___은 연필이에요.",
      "그것",
      "그것 indica algo perto de quem ouve ou que acabou de ser mencionado.",
    ),
    listen(
      "a1-l03-e03",
      "guided",
      "Ouça a pergunta e escreva o que ouviu.",
      "이것이 뭐예요?",
      "이것이 뭐예요?",
      "A pergunta é 이것이 뭐예요?, “o que é isto?”.",
      ["이것이 뭐예요"],
    ),
    reading(
      "a1-l03-e04",
      "guided",
      "이것은 공책이에요. 저것은 가방이에요.",
      "O que está perto de quem fala?",
      choices("Um caderno.", "Uma mochila.", "Óculos."),
      "Um caderno.",
      "이것은 공책이에요: o objeto próximo é um caderno.",
    ),
    cloze(
      "a1-l03-e05",
      "guided",
      "Complete a pergunta: 이것이 ___예요?",
      "뭐",
      "뭐 significa “o que”; a pergunta pede a identificação do objeto.",
    ),
    mcq(
      "a1-l03-e06",
      "independent",
      "Qual pergunta significa “O que é aquilo?”",
      ["이것이 뭐예요?", "그것이 뭐예요?", "저것이 뭐예요?"],
      "저것이 뭐예요?",
      "저것 indica algo longe de quem fala e de quem ouve: “aquilo”.",
    ),
    reading(
      "a1-l03-e07",
      "independent",
      "그것은 휴대폰이에요. 저것은 안경이에요.",
      "O que é o objeto indicado por 그것?",
      choices("Um celular.", "Óculos.", "Uma chave."),
      "Um celular.",
      "그것은 휴대폰이에요: o objeto próximo de quem ouve é um celular.",
    ),
    listen(
      "a1-l03-e08",
      "independent",
      "Ouça e escreva a frase que você ouviu.",
      "그것은 열쇠예요.",
      "그것은 열쇠예요.",
      "A frase é 그것은 열쇠예요, “isso é uma chave”.",
      ["그것은 열쇠예요"],
    ),
    mcq(
      "a1-l03-e09",
      "independent",
      "Complete com o marcador de tópico: 저것___ 의자예요.",
      ["은", "이", "뭐"],
      "은",
      "저것은 의자예요: 은 marca “aquilo” como tópico da frase. 저것이 의자예요 também é possível, mas aqui o enunciado pede o tópico.",
    ),
    cloze(
      "a1-l03-e10",
      "independent",
      "Complete com “caneta”: 이것은 ___이에요.",
      "볼펜",
      "볼펜 é “caneta”; a forma é 볼펜이에요 porque termina em consoante.",
    ),
  ],
  summary: [
    "이, 그 e 저 indicam objeto perto de quem fala, perto de quem ouve e longe dos dois.",
    "이것, 그것 e 저것 substituem o substantivo: isto, isso, aquilo.",
    "이것이 뭐예요? pergunta o que é algo; responda com 은/는 + objeto + 이에요/예요.",
    "O conteúdo é original e está em revisão; esta lição não certifica CEFR ou TOPIK.",
  ],
});
