import type {
  Checkpoint,
  Curriculum,
  Lesson,
  RuleRecord,
  SyllableRecord,
  WordRecord,
} from "@/content/hangul/types";
import { composeSyllable, decomposeSyllable } from "@/lib/hangul";
import type { ExerciseSpec } from "@/lib/exercises";
import { normalizeAudioText } from "./text";

export type AudioInventorySourceKind =
  | "exercise"
  | "option"
  | "build-target"
  | "syllable"
  | "word"
  | "rule"
  | "anatomy";

export type AudioInventoryItem = {
  /** Texto exato do conteúdo (NFC), usado como chave de busca. */
  text: string;
  /** Referências de origem no currículo, para auditoria. */
  sources: readonly string[];
  /** Passos (`h01`…`c4`) em que o texto aparece. */
  steps: readonly string[];
  /** Tags pedagógicas e fonéticas derivadas do conteúdo. */
  tags: readonly string[];
  /** 1 = fala de exercício/regra; 2 = sílaba/palavra/referência. */
  priority: 1 | 2;
};

type MutableItem = {
  text: string;
  sources: string[];
  steps: Set<string>;
  tags: Set<string>;
  priority: 1 | 2;
};

const CONTRAST_TAGS: readonly [RegExp, string][] = [
  [/ㄹ/, "ㄹ"],
  [/ㅓ/, "vowel-ㅓ"],
  [/ㅗ/, "vowel-ㅗ"],
  [/ㅡ/, "vowel-ㅡ"],
  [/ㅜ/, "vowel-ㅜ"],
  [/ㅐ/, "vowel-ㅐ"],
  [/ㅔ/, "vowel-ㅔ"],
  [/ㅚ/, "vowel-ㅚ"],
  [/ㅙ/, "vowel-ㅙ"],
  [/ㅞ/, "vowel-ㅞ"],
  [/ㅟ/, "vowel-ㅟ"],
  [/ㅢ/, "vowel-ㅢ"],
  [/[ㄲㄸㅃㅆㅉ]/, "tense"],
  [/[ㅋㅌㅍㅊ]/, "aspirated"],
];

function addContrastTags(text: string, tags: Set<string>) {
  for (const [pattern, tag] of CONTRAST_TAGS) {
    if (pattern.test(text)) tags.add(tag);
  }

  for (const syllable of text) {
    const parts = decomposeSyllable(syllable);
    if (!parts) continue;
    if (parts.final) tags.add("batchim");
    if (parts.final && parts.final.length > 1) tags.add("batchim-double");
    if (parts.initial === "ㄹ") tags.add("ㄹ-initial");
    if (parts.final === "ㄹ") tags.add("ㄹ-final");
  }
}

function add(
  items: Map<string, MutableItem>,
  rawText: string,
  source: string,
  step: string,
  tags: readonly string[],
  priority: 1 | 2,
) {
  if (typeof rawText !== "string") return;
  const text = normalizeAudioText(rawText);
  if (!text) return;

  let item = items.get(text);
  if (!item) {
    item = {
      text,
      sources: [],
      steps: new Set<string>(),
      tags: new Set<string>(),
      priority,
    };
    items.set(text, item);
  }

  if (!item.sources.includes(source)) item.sources.push(source);
  item.steps.add(step);
  if (priority < item.priority) item.priority = priority;
  for (const tag of tags) item.tags.add(tag);
  addContrastTags(text, item.tags);
}

function addExercise(
  items: Map<string, MutableItem>,
  step: string,
  exercise: ExerciseSpec,
) {
  const tags = exercise.tags ?? [];
  const base = `exercise:${step}:${exercise.id}`;

  if ("audioText" in exercise && typeof exercise.audioText === "string") {
    add(items, exercise.audioText, base, step, tags, 1);
  }

  if ("options" in exercise && Array.isArray(exercise.options)) {
    for (const option of exercise.options) {
      if (
        option &&
        typeof option === "object" &&
        "audioText" in option &&
        typeof option.audioText === "string"
      ) {
        add(
          items,
          option.audioText,
          `${base}:option:${option.id}`,
          step,
          tags,
          1,
        );
      }
    }
  }

  if (exercise.type === "build-syllable") {
    let target = exercise.target;
    if (!target) {
      try {
        target = composeSyllable(exercise.initial, exercise.medial, exercise.final);
      } catch {
        target = undefined;
      }
    }
    if (target) {
      add(items, target, `build-target:${step}:${exercise.id}`, step, tags, 2);
    }
  }
}

function addStep(
  items: Map<string, MutableItem>,
  step: Lesson | Checkpoint,
) {
  for (const exercise of step.exercises) {
    addExercise(items, step.id, exercise);
  }
}

function addSyllable(items: Map<string, MutableItem>, syllable: SyllableRecord) {
  if (!syllable.audioText) return;
  add(items, syllable.audioText, `syllable:${syllable.id}`, syllable.introducedIn, [], 2);
}

function addWord(items: Map<string, MutableItem>, word: WordRecord) {
  if (!word.audioText) return;
  add(
    items,
    word.audioText,
    `word:${word.id}`,
    word.introducedIn,
    word.tags,
    2,
  );
}

function addRule(items: Map<string, MutableItem>, rule: RuleRecord) {
  for (const example of rule.examples) {
    add(
      items,
      example.spoken,
      `rule:${rule.kind}:${example.written}`,
      rule.introducedIn,
      ["rule", rule.kind],
      1,
    );
  }
}

/**
 * Inventário determinístico de tudo que pode ser falado no currículo atual.
 *
 * Inclui `audioText` de exercícios e alternativas, alvos de montagem, os
 * `audioText` de sílabas/palavras, as formas `spoken` das regras e a sílaba da
 * anatomia (`한`). O construtor livre de sílabas é dinâmico e não entra aqui;
 * combinações sem asset caem no fallback de voz do sistema.
 */
export function collectAudioInventory(curriculum: Curriculum): AudioInventoryItem[] {
  const items = new Map<string, MutableItem>();

  for (const lesson of curriculum.lessons) addStep(items, lesson);
  for (const checkpoint of curriculum.checkpoints) addStep(items, checkpoint);
  for (const syllable of curriculum.syllables) addSyllable(items, syllable);
  for (const word of curriculum.words) addWord(items, word);
  for (const rule of curriculum.rules) addRule(items, rule);

  // A anatomia de `한` tem um controle de áudio próprio. Normalmente `한` já
  // aparece em SYLLABLES; a referência explícita mantém a cobertura se o
  // conteúdo mudar.
  add(items, "한", "anatomy:한", "h18", ["anatomy"], 2);

  return [...items.values()]
    .map((item) => ({
      text: item.text,
      sources: [...item.sources].sort(),
      steps: [...item.steps].sort(),
      tags: [...item.tags].sort(),
      priority: item.priority,
    }))
    .sort((a, b) => a.text.localeCompare(b.text, "ko"));
}

/** Lista os textos falados que não são cobertos pelo inventário. */
export function missingAudioTexts(
  curriculum: Curriculum,
  covered: ReadonlySet<string>,
): string[] {
  return collectAudioInventory(curriculum)
    .map((item) => item.text)
    .filter((text) => !covered.has(text));
}
