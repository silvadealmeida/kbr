import type { A1LessonContent } from "../types";

const review = {
  status: "in-review",
  notes:
    "Conteúdo original do KBR para a primeira lição A1; naturalidade, tradução e registro aguardam revisão de falante nativo.",
} as const;

/**
 * Primeira lição jogável do A1. Ensina antes de testar: introdução, diálogo
 * com tradução, notas gramaticais e só então a prática guiada e independente.
 * Todo o coreano é original e continua `in-review`.
 */
export const A1_L01: A1LessonContent = {
  id: "a1-l01",
  number: 1,
  moduleId: "a1-m01",
  title: "Olá, eu sou…",
  objective:
    "Cumprimentar alguém, dizer seu nome e se apresentar de modo polido em situações simples.",
  prerequisites: [],
  estimatedMinutes: 50,
  dialogueTitle: "Minsu e Ana se conhecem",
  intro: [
    {
      title: "Falar com cortesia",
      body:
        "Em coreano, o verbo muda de forma conforme a situação e a pessoa com quem se fala. Nesta lição você usa o registro polido, que termina em -요 e é adequado para quem você acabou de conhecer. Não é preciso dominar todas as terminações agora: comece pelas fórmulas de apresentação.",
      ko: "안녕하세요",
    },
    {
      title: "Dizer quem você é",
      body:
        "A apresentação básica segue uma ordem estável: primeiro a pessoa, depois a identidade. 저는 significa “eu” com humildade, e 이에요/예요 liga a pessoa ao nome ou à ocupação. A escolha entre as duas formas depende do som final da palavra anterior.",
      ko: "저는 아나예요.",
    },
    {
      title: "Perguntar o nome",
      body:
        "Para perguntar o nome de alguém de modo polido, use 이름이 뭐예요? — literalmente “nome + o que é?”. Você não precisa montar a pergunta do zero: trate-a como uma fórmula útil e ouça o áudio para acompanhar o ritmo.",
      ko: "이름이 뭐예요?",
    },
    {
      title: "O encontro desta lição",
      body:
        "Minsu e Ana se encontram em uma atividade. Eles trocam saudação, nome e uma informação simples sobre si. Leia o diálogo abaixo com calma; a tradução em português fica ao lado de cada fala. O áudio é opcional e usa o corpus sintetizado do KBR.",
    },
  ],
  dialogue: [
    {
      id: "a1-l01-d1",
      speaker: "민수",
      ko: "안녕하세요.",
      pt: "Olá.",
      audioText: "안녕하세요.",
      review,
    },
    {
      id: "a1-l01-d2",
      speaker: "아나",
      ko: "안녕하세요. 반갑습니다.",
      pt: "Olá. Prazer em conhecer você.",
      audioText: "안녕하세요. 반갑습니다.",
      review,
    },
    {
      id: "a1-l01-d3",
      speaker: "민수",
      ko: "저는 민수예요. 이름이 뭐예요?",
      pt: "Eu sou Minsu. Qual é o seu nome?",
      audioText: "저는 민수예요. 이름이 뭐예요?",
      review,
    },
    {
      id: "a1-l01-d4",
      speaker: "아나",
      ko: "저는 아나예요. 저는 브라질 사람이에요.",
      pt: "Eu sou Ana. Eu sou brasileira.",
      audioText: "저는 아나예요. 저는 브라질 사람이에요.",
      review,
    },
    {
      id: "a1-l01-d5",
      speaker: "민수",
      ko: "저는 학생이에요. 만나서 반갑습니다.",
      pt: "Eu sou estudante. Prazer em conhecer você.",
      audioText: "저는 학생이에요. 만나서 반갑습니다.",
      review,
    },
    {
      id: "a1-l01-d6",
      speaker: "아나",
      ko: "네, 반갑습니다.",
      pt: "Sim, prazer em conhecer você.",
      audioText: "네, 반갑습니다.",
      review,
    },
  ],
  vocabulary: {
    newIds: [
      "ko:안녕하세요",
      "ko:반갑습니다",
      "ko:이름",
      "ko:저",
      "ko:제",
      "ko:브라질",
      "ko:아니요",
      "ko:친구",
      "ko:선생님",
      "ko:뭐",
      "ko:저기요",
    ],
    reusedIds: [
      "ko:감사합니다",
      "ko:네",
      "ko:사람",
      "ko:학생",
      "ko:한국",
      "ko:씨",
    ],
    sentenceIds: [
      "sent:a1-l01:안녕하세요",
      "sent:a1-l01:반갑습니다",
      "sent:a1-l01:이름",
      "sent:a1-l01:저",
      "sent:a1-l01:제",
      "sent:a1-l01:브라질",
      "sent:a1-l01:아니요",
      "sent:a1-l01:친구",
      "sent:a1-l01:선생님",
      "sent:a1-l01:뭐",
      "sent:a1-l01:저기요",
      "sent:학생:5",
    ],
  },
  grammar: [
    {
      id: "g:a1-l01-copula",
      titlePt: "이에요 / 예요 — ligar pessoa e identidade",
      form: "substantivo + 이에요 / 예요",
      explanationPt:
        "Essas formas equivalem a “ser” em uma apresentação polida. Depois de uma palavra terminada em consoante, use 이에요; depois de vogal, use 예요. O som final decide a forma, não o gênero da pessoa.",
      examples: [
        {
          ko: "저는 학생이에요.",
          pt: "Eu sou estudante.",
          audioText: "저는 학생이에요.",
        },
        {
          ko: "저는 아나예요.",
          pt: "Eu sou Ana.",
          audioText: "저는 아나예요.",
        },
      ],
      review,
    },
    {
      id: "g:a1-l01-topic",
      titlePt: "은/는 — marcar o tópico da frase",
      form: "저는 / 이름은",
      explanationPt:
        "은/는 destaca sobre o que a frase fala. Nesta lição, use-o como bloco pronto: 저는 para “eu” e 이름은 para “o nome”. Mais adiante você verá outros usos, inclusive contrastes.",
      examples: [
        {
          ko: "저는 민수예요.",
          pt: "Eu sou Minsu.",
          audioText: "저는 민수예요.",
        },
        {
          ko: "이름은 아나예요.",
          pt: "O nome é Ana.",
          audioText: "이름은 아나예요.",
        },
      ],
      review,
    },
    {
      id: "g:a1-l01-possessive",
      titlePt: "제 — “meu/minha” antes do substantivo",
      form: "제 + substantivo",
      explanationPt:
        "제 é a forma humilde de “meu/minha” e aparece antes do substantivo. 제 이름 é a expressão mais comum para “meu nome” em uma apresentação.",
      examples: [
        {
          ko: "제 이름은 아나예요.",
          pt: "Meu nome é Ana.",
          audioText: "제 이름은 아나예요.",
        },
        {
          ko: "제 친구는 학생이에요.",
          pt: "Meu amigo é estudante.",
          audioText: "제 친구는 학생이에요.",
        },
      ],
      review,
    },
    {
      id: "g:a1-l01-question",
      titlePt: "이름이 뭐예요? — perguntar o nome",
      form: "이름이 뭐예요?",
      explanationPt:
        "뭐 significa “o que”. A pergunta 이름이 뭐예요? é uma fórmula fixa e polida para pedir o nome. Você pode usá-la sem conhecer ainda todas as partículas da frase.",
      examples: [
        {
          ko: "이름이 뭐예요?",
          pt: "Qual é o seu nome?",
          audioText: "이름이 뭐예요?",
        },
        {
          ko: "저기요, 이름이 뭐예요?",
          pt: "Com licença, qual é o seu nome?",
          audioText: "저기요, 이름이 뭐예요?",
        },
      ],
      review,
    },
    {
      id: "g:a1-l01-register",
      titlePt: "Cortesia no encontro: -요, 씨 e 저기요",
      form: "-요 / 씨 / 저기요",
      explanationPt:
        "O registro polido aparece em termos como 안녕하세요, 반갑습니다 e nas formas em -요. 씨 acompanha o nome de alguém em um tratamento próximo, mas não equivale a “senhor/senhora” e pode soar inadequado com superiores. 저기요 serve para chamar a atenção de alguém com cortesia antes de falar.",
      examples: [
        {
          ko: "아나 씨, 안녕하세요.",
          pt: "Ana, olá.",
          audioText: "아나 씨, 안녕하세요.",
        },
        {
          ko: "저기요, 이름이 뭐예요?",
          pt: "Com licença, qual é o seu nome?",
          audioText: "저기요, 이름이 뭐예요?",
        },
      ],
      review,
    },
  ],
  exercises: [
    {
      id: "a1-l01-e01",
      type: "mcq",
      stage: "guided",
      prompt: "Qual saudação é adequada ao chegar e cumprimentar alguém com cortesia?",
      options: ["아니요", "안녕하세요", "뭐"],
      correctAnswer: "안녕하세요",
      explanation:
        "안녕하세요 é a saudação polida usada ao chegar ou cumprimentar alguém. 아니요 é “não” e 뭐 é “o que”.",
      tags: ["diag:vocabulary", "a1-l01", "vocabulary"],
    },
    {
      id: "a1-l01-e02",
      type: "mcq",
      stage: "guided",
      prompt: "Complete a apresentação: 저는 학생___.",
      options: ["예요", "이에요", "뭐"],
      correctAnswer: "이에요",
      explanation:
        "학생 termina em consoante (ㅇ), por isso a forma é 학생이에요. 뭐 não completa uma apresentação.",
      tags: ["diag:grammar", "a1-l01", "grammar"],
    },
    {
      id: "a1-l01-e03",
      type: "cloze",
      stage: "guided",
      prompt: "Complete com a forma polida correta: 저는 아나___.",
      answer: "예요",
      acceptedAnswers: ["예요."],
      explanation:
        "아나 termina em vogal, então a forma é 예요. O som final decide: nomes terminados em consoante recebem 이에요, como em 브라질이에요.",
      tags: ["diag:grammar", "a1-l01", "grammar"],
    },
    {
      id: "a1-l01-e04",
      type: "mcq",
      stage: "guided",
      prompt: "O que significa 저는 민수예요?",
      options: ["Meu nome não é Minsu.", "Eu sou Minsu.", "Você é Minsu?"],
      correctAnswer: "Eu sou Minsu.",
      explanation:
        "저는 marca “eu” como tópico e 민수예요 liga a pessoa ao nome: “Eu sou Minsu”.",
      tags: ["diag:reading", "a1-l01", "reading"],
    },
    {
      id: "a1-l01-e05",
      type: "listen",
      stage: "guided",
      prompt: "Ouça e escreva a frase completa que contém a saudação que você ouviu.",
      audioText: "안녕하세요.",
      answer: "안녕하세요",
      acceptedAnswers: ["안녕하세요."],
      explanation: "A saudação polida desta lição é 안녕하세요.",
      tags: ["diag:listening", "a1-l01", "listening"],
    },
    {
      id: "a1-l01-e06",
      type: "cloze",
      stage: "independent",
      prompt: "Complete com a palavra “nome”: 제 ___은 아나예요.",
      answer: "이름",
      explanation:
        "이름 significa “nome”. 제 이름 é “meu nome”; a partícula 은 marca o tema da frase.",
      tags: ["diag:vocabulary", "a1-l01", "vocabulary"],
    },
    {
      id: "a1-l01-e07",
      type: "mcq",
      stage: "independent",
      prompt: "Como perguntar “Qual é o seu nome?” de modo polido?",
      options: ["이름은 학생이에요.", "저는 이름이에요.", "이름이 뭐예요?"],
      correctAnswer: "이름이 뭐예요?",
      explanation:
        "이름이 뭐예요? é a fórmula polida para perguntar o nome. As outras opções são afirmações.",
      tags: ["diag:grammar", "a1-l01", "grammar"],
    },
    {
      id: "a1-l01-e08",
      type: "translate",
      stage: "independent",
      prompt: "Traduza para o coreano polido: “Eu sou brasileiro.”",
      direction: "pt-ko",
      answer: "저는 브라질 사람이에요.",
      acceptedAnswers: ["저는 브라질 사람이에요"],
      explanation:
        "저는 marca “eu”; 브라질 사람 é “pessoa brasileira”; 사람 termina em consoante, então a forma é 사람이에요.",
      tags: ["diag:writing", "a1-l01", "writing"],
    },
    {
      id: "a1-l01-e09",
      type: "translate",
      stage: "independent",
      prompt: "Traduza para o português: 저는 선생님이에요.",
      direction: "ko-pt",
      answer: "Eu sou professor.",
      acceptedAnswers: [
        "Eu sou professora.",
        "Eu sou professor",
        "Eu sou professora",
      ],
      explanation:
        "선생님 significa “professor/professora” e 이에요 liga a pessoa à ocupação.",
      tags: ["diag:reading", "a1-l01", "reading"],
    },
    {
      id: "a1-l01-e10",
      type: "listen",
      stage: "independent",
      prompt: "Ouça e escreva a frase completa que ouviu.",
      audioText: "이름이 뭐예요?",
      answer: "이름이 뭐예요?",
      acceptedAnswers: ["이름이 뭐예요"],
      explanation:
        "A pergunta é 이름이 뭐예요? — “Qual é o seu nome?”.",
      tags: ["diag:listening", "a1-l01", "listening"],
    },
  ],
  summary: [
    "Você aprendeu a cumprimentar com 안녕하세요 e a responder com 반갑습니다.",
    "Para se apresentar, use 저는 + nome/ocupação + 이에요/예요.",
    "제 이름 é “meu nome”; 이름이 뭐예요? pergunta o nome de alguém.",
    "Esta é a primeira lição do curso A1. O percurso completo tem 40 lições e 8 checkpoints; concluir esta lição não conclui o curso nem certifica CEFR ou TOPIK.",
  ],
  completion: { minScore: 80, minCorrect: 8 },
  review,
};
