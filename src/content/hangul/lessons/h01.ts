import type { Lesson } from "../types";

export const H01: Lesson = {
  id: "h01",
  unit: 1,
  title: "Um alfabeto desenhado a partir da boca",
  objective:
    "Entender que o Hangul agrupa letras em blocos silábicos e que cada bloco é lido como uma sílaba.",
  objectives: [
    "Reconhecer que o Hangul foi criado como um sistema de escrita acessível.",
    "Contar blocos silábicos em uma palavra coreana.",
    "Identificar as posições inicial, medial e final dentro de um bloco.",
  ],
  intro: [
    {
      title: "Um alfabeto que se explica",
      body:
        "O Hangul foi promulgado entre 1443 e 1446, no reinado de Sejong, com o nome Hunminjeongeum. As formas das letras foram pensadas a partir dos órgãos da fala e de elementos naturais, para que o sistema fosse aprendido com menos esforço do que a escrita chinesa usada na época. Não é preciso decorar desenhos arbitrários: há um princípio por trás das formas.",
    },
    {
      title: "Letras viram blocos",
      body:
        "Em coreano, as letras não aparecem em fila como no português. Elas se agrupam em blocos quadrados, e cada bloco corresponde a uma sílaba. A palavra 한글 tem dois blocos: 한 e 글. A unidade visual que você lê é o bloco, não a letra isolada.",
      ko: "한글",
    },
    {
      title: "Dentro do bloco",
      body:
        "Um bloco pode ter uma consoante inicial, uma vogal medial e, às vezes, uma consoante final. A ordem interna depende do formato: a vogal pode ficar à direita ou embaixo. Por isso não se lê um bloco como uma palavra latina, da esquerda para a direita.",
      ko: "한",
    },
    {
      title: "O que vem agora",
      body:
        "Nesta primeira lição você não precisa ler nenhuma letra coreana. O foco é entender a lógica dos blocos. Nas próximas lições você aprende as primeiras vogais e já forma sílabas.",
    },
  ],
  prerequisites: [],
  newJamo: [],
  newFinals: [],
  examples: [],
  exercises: [
    {
      id: "h01-e01",
      type: "mcq",
      prompt: "Quantos blocos silábicos há em 한글?",
      options: ["1 bloco", "2 blocos", "3 blocos"],
      correctAnswer: "2 blocos",
      explanation: "한 é um bloco e 글 é outro; portanto, 한글 tem duas sílabas.",
      tags: ["diag:structure", "blocks", "syllable-count"],
    },
    {
      id: "h01-e02",
      type: "mcq",
      prompt: "Cada bloco coreano equivale a uma sílaba.",
      options: ["Verdadeiro", "Falso"],
      correctAnswer: "Verdadeiro",
      explanation: "O bloco é a unidade silábica: um bloco, uma sílaba.",
      tags: ["diag:structure", "blocks", "syllable-count"],
    },
    {
      id: "h01-e03",
      type: "mcq",
      prompt: "O Hangul foi criado para ser difícil de aprender.",
      options: ["Verdadeiro", "Falso"],
      correctAnswer: "Falso",
      explanation:
        "O Hunminjeongeum foi pensado justamente para tornar a escrita acessível a mais pessoas.",
      tags: ["diag:structure", "history"],
    },
    {
      id: "h01-e04",
      type: "mcq",
      prompt: "Dentro de um bloco, onde fica a vogal?",
      options: [
        "Na posição medial, à direita ou embaixo da consoante inicial",
        "Sempre na posição final, embaixo de tudo",
        "Antes da consoante inicial, na borda esquerda",
      ],
      correctAnswer:
        "Na posição medial, à direita ou embaixo da consoante inicial",
      explanation:
        "A vogal ocupa o centro do bloco: pode aparecer à direita ou embaixo da consoante inicial.",
      tags: ["diag:structure", "blocks", "positions"],
    },
    {
      id: "h01-e05",
      type: "mcq",
      prompt: "Qual sequência resume a história apresentada nesta lição?",
      options: [
        "Escrita chinesa antes do Hangul → criação do Hunminjeongeum em 1443–1446 → uso cotidiano hoje",
        "Hangul criado na Antiguidade → substituído pelo chinês → proibido hoje",
        "Hangul inventado no século XX → expandido para o japonês → abandonado na Coreia",
      ],
      correctAnswer:
        "Escrita chinesa antes do Hangul → criação do Hunminjeongeum em 1443–1446 → uso cotidiano hoje",
      explanation:
        "O Hangul foi promulgado no século XV e hoje é a escrita cotidiana do coreano.",
      tags: ["diag:structure", "history"],
    },
    {
      id: "h01-e06",
      type: "mcq",
      prompt: "Por que as letras do Hangul têm formas simples e relacionadas entre si?",
      options: [
        "Porque foram desenhadas a partir da boca, da língua e de elementos naturais",
        "Porque copiam diretamente o alfabeto latino",
        "Porque cada letra é o desenho de uma palavra inteira",
      ],
      correctAnswer:
        "Porque foram desenhadas a partir da boca, da língua e de elementos naturais",
      explanation:
        "O princípio de construção relaciona as formas das letras aos sons e aos órgãos que os produzem.",
      tags: ["diag:structure", "history"],
    },
  ],
  estimatedMinutes: 6,
  completion: {
    minScore: 83,
    requiredExerciseIds: ["h01-e01", "h01-e02"],
  },
  review: {
    status: "in-review",
    notes: "História e exemplos aguardam revisão de falante nativo ou professor.",
  },
};
