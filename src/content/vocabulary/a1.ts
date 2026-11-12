import type { VocabEntry, VocabSentence } from "./types";

const REVIEW_NOTES =
  "Item original do KBR para a primeira lição A1; forma, tradução e naturalidade aguardam revisão de falante nativo.";

const review = { status: "in-review" as const, notes: REVIEW_NOTES };

/**
 * Primeiras identidades lexicais originais do A1. Formas que já existem no
 * vocabulário do Hangul (감사합니다, 네, 사람, 학생, 한국, 씨) NÃO são repetidas
 * aqui: a lição as referencia como reuso. O registro canônico continua único.
 */
export const A1_VOCABULARY: readonly VocabEntry[] = [
  {
    id: "ko:안녕하세요",
    ko: "안녕하세요",
    pt: "olá; bom dia; boa tarde; boa noite (saudação polida)",
    pos: "interjeição",
    course: "ko-a1",
    lesson: "a1-l01",
    audioText: "안녕하세요",
    notes: "Saudação polida usada ao chegar, atender ou cumprimentar alguém.",
    review,
  },
  {
    id: "ko:반갑습니다",
    ko: "반갑습니다",
    pt: "prazer em conhecer",
    pos: "interjeição",
    course: "ko-a1",
    lesson: "a1-l01",
    audioText: "반갑습니다",
    notes: "Fórmula polida de encontro. 만나서 반갑습니다 é uma variante mais explícita.",
    review,
  },
  {
    id: "ko:이름",
    ko: "이름",
    pt: "nome",
    pos: "substantivo",
    course: "ko-a1",
    lesson: "a1-l01",
    audioText: "이름",
    notes: "Nome de pessoa.",
    review,
  },
  {
    id: "ko:저",
    ko: "저",
    pt: "eu (forma humilde)",
    pos: "pronome",
    course: "ko-a1",
    lesson: "a1-l01",
    audioText: "저",
    notes: "저는 marca o tópico da frase; a forma é polida e humilde.",
    review,
  },
  {
    id: "ko:제",
    ko: "제",
    pt: "meu; minha (forma humilde)",
    pos: "pronome",
    course: "ko-a1",
    lesson: "a1-l01",
    audioText: "제",
    notes: "Forma humilde de 저의; aparece antes do substantivo, como em 제 이름.",
    review,
  },
  {
    id: "ko:브라질",
    ko: "브라질",
    pt: "Brasil",
    pos: "substantivo",
    course: "ko-a1",
    lesson: "a1-l01",
    audioText: "브라질",
    notes: "Nome do país. 브라질 사람 é a pessoa brasileira.",
    review,
  },
  {
    id: "ko:아니요",
    ko: "아니요",
    pt: "não (resposta polida)",
    pos: "interjeição",
    course: "ko-a1",
    lesson: "a1-l01",
    audioText: "아니요",
    notes: "Resposta polida de negação. Não confundir com 아니에요, usado em frases de identidade.",
    review,
  },
  {
    id: "ko:친구",
    ko: "친구",
    pt: "amigo; amiga",
    pos: "substantivo",
    course: "ko-a1",
    lesson: "a1-l01",
    audioText: "친구",
    notes: "Não marca gênero por si só.",
    review,
  },
  {
    id: "ko:선생님",
    ko: "선생님",
    pt: "professor; professora",
    pos: "substantivo",
    course: "ko-a1",
    lesson: "a1-l01",
    audioText: "선생님",
    notes: "O sufixo 님 marca respeito e pode acompanhar outras funções.",
    review,
  },
  {
    id: "ko:뭐",
    ko: "뭐",
    pt: "o que",
    pos: "pronome",
    course: "ko-a1",
    lesson: "a1-l01",
    audioText: "뭐",
    notes: "Forma curta e frequente de 무엇.",
    review,
  },
  {
    id: "ko:저기요",
    ko: "저기요",
    pt: "com licença; ei (para chamar a atenção com cortesia)",
    pos: "interjeição",
    course: "ko-a1",
    lesson: "a1-l01",
    audioText: "저기요",
    notes: "Usado para iniciar uma fala com alguém sem invadir o espaço.",
    review,
  },
];

type SentenceRow = readonly [
  target: string,
  ko: string,
  pt: string,
  contextMeaning: string,
];

const A1_SENTENCE_ROWS: readonly SentenceRow[] = [
  ["안녕하세요", "안녕하세요, 저는 아나예요.", "Olá, eu sou a Ana.", "olá (saudação polida)"],
  ["반갑습니다", "만나서 반갑습니다.", "Prazer em conhecer você.", "prazer em conhecer"],
  ["이름", "제 이름은 아나예요.", "Meu nome é Ana.", "nome"],
  ["저", "저는 학생이에요.", "Eu sou estudante.", "eu (forma humilde)"],
  ["제", "제 이름은 민수예요.", "Meu nome é Minsu.", "meu; minha"],
  ["브라질", "저는 브라질 사람이에요.", "Eu sou brasileiro; eu sou brasileira.", "Brasil"],
  ["아니요", "아니요, 저는 선생님이에요.", "Não, eu sou professor; não, eu sou professora.", "não (resposta polida)"],
  ["친구", "제 친구는 학생이에요.", "Meu amigo é estudante.", "amigo; amiga"],
  ["선생님", "선생님은 브라질 사람이에요.", "O professor é brasileiro.", "professor; professora"],
  ["뭐", "이름이 뭐예요?", "Qual é o seu nome?", "o que"],
  ["저기요", "저기요, 이름이 뭐예요?", "Com licença, qual é o seu nome?", "com licença (para chamar a atenção)"],
];

export const A1_VOCAB_SENTENCES: readonly VocabSentence[] = A1_SENTENCE_ROWS.map(
  ([target, ko, pt, contextMeaning]) => ({
    id: `sent:a1-l01:${target}`,
    vocabId: `ko:${target}`,
    ko,
    pt,
    target,
    contextMeaning,
    review: { status: "in-review", notes: "Frase original do KBR para a lição a1-l01; aguarda revisão de falante nativo." },
  }),
);
