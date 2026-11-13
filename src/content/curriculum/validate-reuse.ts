import type { CourseLessonContent } from "@/content/curriculum/course-types";
import type { VocabEntry } from "@/content/vocabulary/types";

/**
 * Texto coreano efetivamente exibido na lição. Não inclui tradução em pt-BR:
 * `reusedIds` declara retomada lexical, não tema.
 */
export function lessonKoreanText(lesson: CourseLessonContent): string {
  const parts: string[] = [];
  for (const panel of lesson.intro) {
    if (panel.ko) parts.push(panel.ko);
  }
  for (const line of lesson.dialogue) parts.push(line.ko);
  if (lesson.readingText) {
    for (const paragraph of lesson.readingText.paragraphs) parts.push(paragraph);
  }
  for (const note of lesson.grammar) {
    for (const example of note.examples) parts.push(example.ko);
  }
  for (const exercise of lesson.exercises) {
    for (const key of ["prompt", "text", "answer", "correctAnswer", "audioText"] as const) {
      const value = exercise[key as keyof typeof exercise];
      if (typeof value === "string") parts.push(value);
    }
    if ("options" in exercise && Array.isArray(exercise.options)) {
      for (const option of exercise.options) {
        if (typeof option === "string") parts.push(option);
        else if (option && typeof option === "object") {
          if ("label" in option && typeof option.label === "string") parts.push(option.label);
          if ("audioText" in option && typeof option.audioText === "string") parts.push(option.audioText);
          if ("jamo" in option && typeof option.jamo === "string") parts.push(option.jamo);
        }
      }
    }
  }
  return parts.join("\n");
}

function candidateForms(entry: VocabEntry): readonly string[] {
  const forms = new Set([entry.ko, entry.audioText]);
  if (entry.ko.endsWith("다") && entry.ko.length > 1) {
    const stem = entry.ko.slice(0, -1);
    forms.add(stem);
    for (const ending of [
      "아요", "어요", "여요", "해요", "았어요", "었어요", "했어요",
      "습니다", "ㅂ니다", "고", "서", "면", "지만", "는", "은", "을",
      "를", "ㄹ", "할", "한", "하는", "해서", "하러", "하려고", "하지",
      "합니다", "했습니다", "해", "했", "하", "된", "될", "되는",
      "돼요", "됐어요", "되어요", "어", "아",
    ]) {
      forms.add(stem + ending);
    }
  }
  return [...forms].filter(Boolean);
}

export type UnusedReusedRef = {
  step: string;
  id: string;
  form: string;
};

/**
 * Referências declaradas em `reusedIds` cuja forma não aparece no texto
 * coreano da lição. É uma checagem conservadora: palavras irregulares podem
 * escapar, por isso o resultado é usado como dívida congelada, não como prova
 * de que o reuso é inválido.
 */
export function findUnusedReusedRefs(
  lessons: readonly CourseLessonContent[],
  entries: readonly VocabEntry[],
): UnusedReusedRef[] {
  const entryById = new Map(entries.map((entry) => [entry.id, entry]));
  const missing: UnusedReusedRef[] = [];
  for (const lesson of lessons) {
    const text = lessonKoreanText(lesson);
    for (const id of lesson.vocabulary.reusedIds) {
      const entry = entryById.get(id);
      if (!entry) continue;
      if (!candidateForms(entry).some((form) => text.includes(form))) {
        missing.push({ step: lesson.id, id, form: entry.ko });
      }
    }
  }
  return missing;
}
