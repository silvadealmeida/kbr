import { JAMO, RULES, SYLLABLES, WORDS } from "@/content/hangul";
import type {
  JamoRecord,
  RuleRecord,
  SyllableRecord,
  WordRecord,
} from "@/content/hangul/types";
import type { ExerciseSpec } from "@/lib/exercises";
import { leitner, parseSrsCardKey, type ReviewGrade, type SrsState } from "@/lib/srs";
import type { Progress } from "@/lib/storage";

/** Teto documentado para uma sessão de revisão (`docs/pedagogy/exercise-design.md`, §11.3). */
export const MAX_REVIEW_SESSION = 20;

export type ReviewKind = "jamo" | "syllable" | "word" | "rule";

export type ReviewItem = {
  cardId: string;
  kind: ReviewKind;
  due: string;
  box: number;
  exercise: ExerciseSpec;
};

export type ReviewCatalog = {
  jamo: readonly JamoRecord[];
  syllables: readonly SyllableRecord[];
  words: readonly WordRecord[];
  rules: readonly RuleRecord[];
};

export type ReviewQueue = {
  /** Todos os cartões vencidos, na ordem determinística. */
  due: readonly ReviewItem[];
  /** Fatia que a sessão deve apresentar, limitada por `limit`. */
  session: readonly ReviewItem[];
  totalDue: number;
  overdue: number;
  dueToday: number;
  /** Data do próximo cartão futuro, ou `null` quando não há nenhum. */
  nextDue: string | null;
};

export type ReviewQueueOptions = {
  limit?: number;
};

export const HANGUL_REVIEW_CATALOG: ReviewCatalog = {
  jamo: JAMO,
  syllables: SYLLABLES,
  words: WORDS,
  rules: RULES,
};

export const REVIEW_KIND_LABELS: Readonly<Record<ReviewKind, string>> = {
  jamo: "Jamo",
  syllable: "Sílaba",
  word: "Palavra",
  rule: "Regra de pronúncia",
};

function isDate(value: string): boolean {
  return !Number.isNaN(Date.parse(value));
}

function unique<T>(values: readonly T[]): T[] {
  return [...new Set(values)];
}

/**
 * Escolhe até `max` opções incluindo a correta. A posição da correta varia de
 * forma determinística com `salt`, para não ficar sempre no primeiro botão.
 */
function pickOptions<T>(correct: T, candidates: readonly T[], salt: number, max = 4): T[] {
  const distractors = unique(candidates.filter((value) => value !== correct)).slice(0, max - 1);
  const options = [...distractors];
  const position = Math.abs(salt) % (options.length + 1);
  options.splice(position, 0, correct);
  return options;
}

function optionList(correct: string, candidates: readonly string[], salt: number) {
  const labels = pickOptions(correct, candidates, salt);
  const correctIndex = labels.indexOf(correct);
  return {
    options: labels.map((label, index) => ({ id: `o${index}`, label })),
    correctOptionId: `o${correctIndex}`,
  };
}

function jamoExercise(
  record: JamoRecord,
  catalog: ReviewCatalog,
): ExerciseSpec | null {
  const sameKind = catalog.jamo.filter((item) => item.kind === record.kind);
  const names = unique(sameKind.map((item) => item.nameKo));
  if (names.length < 2) return null;

  const salt = catalog.jamo.findIndex((item) => item.symbol === record.symbol);
  return {
    id: `review:${record.kind === "vowel" ? "jamo-vowel" : "jamo-consonant"}:${record.symbol}`,
    type: "mcq",
    prompt: `Qual é o nome deste jamo? ${record.symbol}`,
    options: pickOptions(record.nameKo, names, salt),
    correctAnswer: record.nameKo,
    explanation: record.notes ?? `Este jamo é ${record.nameKo}, com som aproximado ${record.ipa.join(" ou ")}.`,
    tags: record.tags,
  };
}

function syllableExercise(
  record: SyllableRecord,
  catalog: ReviewCatalog,
): ExerciseSpec | null {
  const sameLesson = catalog.syllables.filter(
    (item) => item.introducedIn === record.introducedIn && item.text !== record.text,
  );
  const initialCandidates = unique([
    ...sameLesson.map((item) => item.initial),
    ...catalog.syllables.map((item) => item.initial),
  ]);
  const medialCandidates = unique([
    ...sameLesson.map((item) => item.medial),
    ...catalog.syllables.map((item) => item.medial),
  ]);
  const finalCandidates = unique([
    ...sameLesson.map((item) => item.final).filter((value) => value !== ""),
    ...catalog.syllables.map((item) => item.final).filter((value) => value !== ""),
  ]);

  const salt = catalog.syllables.findIndex((item) => item.id === record.id);
  const initialOptions = pickOptions(record.initial, initialCandidates, salt, 3);
  const medialOptions = pickOptions(record.medial, medialCandidates, salt + 1, 3);

  return {
    id: `review:syllable:${record.text}`,
    type: "build-syllable",
    prompt: `Monte a sílaba ${record.text}.`,
    initial: record.initial,
    medial: record.medial,
    final: record.final,
    target: record.text,
    initialOptions,
    medialOptions,
    finalOptions: record.final
      ? pickOptions(record.final, finalCandidates, salt + 2, 3)
      : undefined,
    explanation: `A sílaba ${record.text} é formada por ${record.initial} + ${record.medial}${
      record.final ? ` + ${record.final}` : ""
    }.`,
    tags: ["review:syllable"],
  };
}

function wordExercise(record: WordRecord, catalog: ReviewCatalog): ExerciseSpec | null {
  const meanings = unique(catalog.words.map((item) => item.pt));
  if (meanings.length < 2) return null;

  const salt = catalog.words.findIndex((item) => item.id === record.id);
  const { options, correctOptionId } = optionList(record.pt, meanings, salt);

  return {
    id: `review:word:${record.ko}`,
    type: "reading",
    prompt: "Leia a palavra e escolha o significado.",
    text: record.ko,
    mode: "mcq",
    question: "O que significa esta palavra?",
    options,
    correctOptionId,
    audioText: record.audioText,
    explanation: record.notes ?? `${record.ko} significa “${record.pt}”.`,
    tags: record.tags,
  };
}

function ruleExercise(record: RuleRecord): ExerciseSpec | null {
  const spoken = unique(record.examples.map((example) => example.spoken));
  if (spoken.length < 2) return null;

  // O primeiro exemplo é uma frase completa e serve de pergunta estável.
  const example = record.examples[0];
  if (!example) return null;

  const options = unique(record.examples.map((item) => item.spoken));
  const correctIndex = options.indexOf(example.spoken);
  if (correctIndex < 0) return null;

  return {
    id: `review:rule:${record.kind}`,
    type: "reading",
    prompt: "Leia a expressão e escolha a pronúncia didática.",
    text: example.written,
    mode: "mcq",
    question: `Como ${example.written} é pronunciado nesta regra?`,
    options: options.map((label, index) => ({ id: `o${index}`, label })),
    correctOptionId: `o${correctIndex}`,
    explanation: `${record.title}: ${example.written} → ${example.spoken}.${
      example.note ? ` ${example.note}` : ""
    } A transcrição é didática, não IPA.`,
    tags: ["review:rule", record.kind],
  };
}

/** Constrói o exercício de revisão a partir da chave estável já existente. */
export function buildReviewExercise(
  cardId: string,
  catalog: ReviewCatalog = HANGUL_REVIEW_CATALOG,
): { kind: ReviewKind; exercise: ExerciseSpec } | null {
  const ref = parseSrsCardKey(cardId);
  if (!ref) return null;

  if (ref.kind === "jamo-consonant" || ref.kind === "jamo-vowel") {
    const record = catalog.jamo.find((item) => item.symbol === ref.value);
    if (!record) return null;
    const exercise = jamoExercise(record, catalog);
    return exercise ? { kind: "jamo", exercise } : null;
  }

  if (ref.kind === "syllable") {
    const record = catalog.syllables.find((item) => item.text === ref.value);
    if (!record) return null;
    const exercise = syllableExercise(record, catalog);
    return exercise ? { kind: "syllable", exercise } : null;
  }

  if (ref.kind === "word") {
    const record = catalog.words.find((item) => item.ko === ref.value);
    if (!record) return null;
    const exercise = wordExercise(record, catalog);
    return exercise ? { kind: "word", exercise } : null;
  }

  const record = catalog.rules.find((item) => item.kind === ref.value);
  if (!record) return null;
  const exercise = ruleExercise(record);
  return exercise ? { kind: "rule", exercise } : null;
}

function startOfLocalDay(now: Date): number {
  return new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
}

function nextDueAt(entries: Iterable<readonly [string, SrsState]>, now: Date): string | null {
  const nowValue = now.getTime();
  let next: string | null = null;

  for (const [, state] of entries) {
    if (!state || !Number.isInteger(state.box) || !isDate(state.due)) continue;
    const due = Date.parse(state.due);
    if (due <= nowValue) continue;
    if (next === null || due < Date.parse(next)) next = state.due;
  }

  return next;
}

/**
 * Seleciona os cartões vencidos de uma lista de entradas. Entradas repetidas
 * são deduplicadas antes da ordenação; chaves desconhecidas são ignoradas, sem
 * criar cartões novos. A ordem é sempre por vencimento ascendente e, no empate,
 * pela chave estável do cartão.
 */
export function buildReviewQueueFromEntries(
  entries: Iterable<readonly [string, SrsState]>,
  now: Date,
  catalog: ReviewCatalog = HANGUL_REVIEW_CATALOG,
  options: ReviewQueueOptions = {},
): ReviewQueue {
  const nowValue = now.getTime();
  if (Number.isNaN(nowValue)) throw new RangeError("Relógio inválido");

  const cards = new Map<string, SrsState>();
  for (const [cardId, state] of entries) {
    if (!cards.has(cardId)) cards.set(cardId, state);
  }

  const due: ReviewItem[] = [];
  for (const [cardId, state] of cards) {
    if (!state || !Number.isInteger(state.box) || state.box < 1 || state.box > 5) continue;
    if (!isDate(state.due)) continue;
    if (Date.parse(state.due) > nowValue) continue;

    const built = buildReviewExercise(cardId, catalog);
    if (!built) continue;

    due.push({
      cardId,
      kind: built.kind,
      due: state.due,
      box: state.box,
      exercise: built.exercise,
    });
  }

  due.sort((a, b) => {
    const difference = Date.parse(a.due) - Date.parse(b.due);
    if (difference !== 0) return difference;
    return a.cardId.localeCompare(b.cardId, "en");
  });

  const limit = Math.max(0, Math.floor(options.limit ?? MAX_REVIEW_SESSION));
  const dayStart = startOfLocalDay(now);
  const overdue = due.filter((item) => Date.parse(item.due) < dayStart).length;

  return {
    due,
    session: due.slice(0, limit),
    totalDue: due.length,
    overdue,
    dueToday: due.length - overdue,
    nextDue: nextDueAt(cards, now),
  };
}

export function buildReviewQueue(
  progress: Progress,
  now: Date,
  options: ReviewQueueOptions = {},
): ReviewQueue {
  return buildReviewQueueFromEntries(Object.entries(progress.cards), now, HANGUL_REVIEW_CATALOG, options);
}

/**
 * Aplica uma revisão ao cartão já existente. Um acerto avança a caixa Leitner;
 * um erro volta à caixa 1. A chave é preservada, então nenhum cartão novo é
 * criado. Cada ação também entra no histórico, que a sincronização preserva.
 */
export function applyReview(
  progress: Progress,
  item: Pick<ReviewItem, "cardId">,
  grade: ReviewGrade,
  now: Date,
  attemptId?: string,
): Progress {
  const current = progress.cards[item.cardId];
  if (!current) return progress;

  const at = now.toISOString();
  const nextState = { ...leitner.review(current, grade, now), reviewedAt: at };

  return {
    ...progress,
    cards: { ...progress.cards, [item.cardId]: nextState },
    history: [
      ...progress.history,
      {
        ...(attemptId ? { id: attemptId } : {}),
        exerciseId: `review:${item.cardId}`,
        correct: grade === "correct",
        at,
      },
    ],
    lastActive: at,
  };
}
