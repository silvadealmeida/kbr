import type { ExerciseSpec } from "@/lib/exercises";

export type DiagnosticCategoryId =
  | "vowel"
  | "consonant-basic"
  | "consonant-tense"
  | "reading"
  | "structure";

export type DiagnosticAnswer = {
  correct: boolean;
  scored?: boolean;
};

export type DiagnosticCategory = {
  id: DiagnosticCategoryId;
  label: string;
  advice: string;
  lessonIds: readonly string[];
};

export type DiagnosticBreakdown = DiagnosticCategory & {
  missed: number;
  total: number;
};

export type DiagnosticSummary = {
  categories: DiagnosticBreakdown[];
  missedExerciseIds: string[];
};

const CATEGORY_ORDER: readonly DiagnosticCategoryId[] = [
  "vowel",
  "consonant-basic",
  "consonant-tense",
  "reading",
  "structure",
];

const CATEGORIES: Record<DiagnosticCategoryId, DiagnosticCategory> = {
  vowel: {
    id: "vowel",
    label: "Vogais",
    advice:
      "Reveja os contrastes de vogais (ㅏ/ㅓ, ㅗ/ㅜ, ㅡ/ㅜ) e a posição dos lábios antes de tentar de novo.",
    lessonIds: ["h02", "h03"],
  },
  "consonant-basic": {
    id: "consonant-basic",
    label: "Consoantes básicas",
    advice:
      "Volte às lições das consoantes simples e aspiradas. O contraste de som é mais importante que o nome da letra.",
    lessonIds: ["h04", "h05", "h06", "h07", "h08"],
  },
  "consonant-tense": {
    id: "consonant-tense",
    label: "Consoantes tensas",
    advice:
      "Pratique o contraste simples × aspirada × tensa sem sopro. Escute primeiro, produza depois.",
    lessonIds: ["h09", "h10"],
  },
  reading: {
    id: "reading",
    label: "Leitura de sílabas C+V",
    advice:
      "Leia bloco por bloco: inicial, vogal e, quando houver, final. Use as palavras já estudadas para conferir o sentido.",
    lessonIds: ["h04", "h05", "h06", "h07", "h08", "h09", "h10"],
  },
  structure: {
    id: "structure",
    label: "Blocos e posições",
    advice:
      "Reveja como o bloco silábico se organiza: inicial, medial e final não são lidos em fila como no português.",
    lessonIds: ["h01"],
  },
};

export function diagnosticCategoryFor(exercise: ExerciseSpec): DiagnosticCategoryId | null {
  const tag = exercise.tags?.find((value) => value.startsWith("diag:"));
  if (!tag) return null;
  const id = tag.slice("diag:".length);
  return CATEGORY_ORDER.includes(id as DiagnosticCategoryId)
    ? (id as DiagnosticCategoryId)
    : null;
}

/**
 * Agrupa os erros pela tag primária `diag:*` do exercício. Itens sem tag não
 * entram no diagnóstico, mas continuam contando normalmente para a nota.
 * A saída é determinística: mesma resposta, mesma ordem e mesmos números.
 */
export function summarizeDiagnostics(
  exercises: readonly ExerciseSpec[],
  answers: Readonly<Record<string, DiagnosticAnswer>>,
): DiagnosticSummary {
  const totals = new Map<DiagnosticCategoryId, { missed: number; total: number }>();
  const missedExerciseIds: string[] = [];

  for (const exercise of exercises) {
    const answer = answers[exercise.id];
    if (answer?.scored === false) continue;

    const category = diagnosticCategoryFor(exercise);
    if (category) {
      const current = totals.get(category) ?? { missed: 0, total: 0 };
      current.total += 1;
      if (answer?.correct === false) current.missed += 1;
      totals.set(category, current);
    }

    if (answer?.correct === false) missedExerciseIds.push(exercise.id);
  }

  const categories = CATEGORY_ORDER.filter((id) => (totals.get(id)?.total ?? 0) > 0).map(
    (id) => ({
      ...CATEGORIES[id],
      ...totals.get(id)!,
    }),
  );

  return { categories, missedExerciseIds };
}

export function diagnosticLabel(id: DiagnosticCategoryId): string {
  return CATEGORIES[id].label;
}
