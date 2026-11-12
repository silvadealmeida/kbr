import type { VocabEntry, VocabSentence } from "@/content/vocabulary/types";
import { isImplementedExerciseType } from "@/lib/exercises/registry";
import type {
  A1ContentIssue,
  A1CurriculumBlueprint,
  A1LessonContent,
} from "./types";

/**
 * Valida relações de um dataset A1 futuro. Continua estrutural: não prova
 * naturalidade, tradução, registro ou correção linguística.
 */
export function validateA1LessonContent(
  content: readonly A1LessonContent[],
  blueprint: A1CurriculumBlueprint,
  entries: readonly VocabEntry[],
  sentences: readonly VocabSentence[],
): A1ContentIssue[] {
  const issues: A1ContentIssue[] = [];
  const add = (code: string, path: string, message: string) => issues.push({ code, path, message });
  const lessonPositions = new Map(blueprint.lessons.map((lesson, index) => [lesson.id, index]));
  const entryById = new Map(entries.map((entry) => [entry.id, entry]));
  const sentenceById = new Map(sentences.map((sentence) => [sentence.id, sentence]));
  const contentIds = new Set<string>();

  content.forEach((lesson, index) => {
    const path = `content[${index}]`;
    const position = lessonPositions.get(lesson.id);
    const plan = blueprint.lessons[position ?? -1];
    if (position === undefined) add("lesson-unknown", path, `Lição fora do blueprint: ${lesson.id}.`);
    if (contentIds.has(lesson.id)) add("lesson-duplicate", path, `Dataset duplicado: ${lesson.id}.`);
    contentIds.add(lesson.id);
    if (!lesson.title.trim() || !lesson.objective.trim()) add("lesson-field", path, "Título e objetivo são obrigatórios.");
    if (lesson.dialogue.length < 2) add("dialogue-short", path, "Diálogo precisa de ao menos dois turnos.");
    const dialogueIds = new Set<string>();
    lesson.dialogue.forEach((line, lineIndex) => {
      const linePath = `${path}.dialogue[${lineIndex}]`;
      if (dialogueIds.has(line.id)) add("dialogue-id", linePath, `Fala duplicada: ${line.id}.`);
      dialogueIds.add(line.id);
      if (!line.speaker.trim() || !line.ko.trim() || !line.pt.trim() || !line.audioText.trim()) add("dialogue-field", linePath, "Fala exige locutor, coreano, tradução e áudio.");
      if (!/[가-힣]/.test(line.ko) || !/[가-힣]/.test(line.audioText)) add("dialogue-korean", linePath, "Fala e áudio precisam conter Hangul.");
    });

    const newIds = new Set(lesson.vocabulary.newIds);
    const reusedIds = new Set(lesson.vocabulary.reusedIds);
    if (newIds.size !== lesson.vocabulary.newIds.length) add("vocab-duplicate", path, "Vocabulário novo contém referência duplicada.");
    if (reusedIds.size !== lesson.vocabulary.reusedIds.length) add("vocab-duplicate", path, "Vocabulário reutilizado contém referência duplicada.");
    if (plan && (newIds.size < plan.vocabulary.newItems.min || newIds.size > plan.vocabulary.newItems.max)) add("vocab-count", path, `Vocabulário novo precisa ter ${plan.vocabulary.newItems.min}–${plan.vocabulary.newItems.max} itens.`);
    for (const id of newIds) {
      const entry = entryById.get(id);
      if (!entry) add("vocab-unknown", path, `Vocabulário novo inexistente: ${id}.`);
      else if (entry.course !== "ko-a1" || entry.lesson !== lesson.id) add("vocab-origin", path, `Origem canônica incorreta: ${id}.`);
      if (reusedIds.has(id)) add("vocab-overlap", path, `Item novo e reutilizado ao mesmo tempo: ${id}.`);
    }
    for (const id of reusedIds) {
      const entry = entryById.get(id);
      if (!entry) { add("vocab-unknown", path, `Vocabulário reutilizado inexistente: ${id}.`); continue; }
      if (entry.course === "ko-a1") {
        const origin = lessonPositions.get(entry.lesson);
        if (origin === undefined || position === undefined || origin >= position) add("vocab-reuse-order", path, `Reuso antes da origem: ${id}.`);
      }
    }
    const sentenceIds = new Set(lesson.vocabulary.sentenceIds);
    if (sentenceIds.size !== lesson.vocabulary.sentenceIds.length) add("sentence-duplicate", path, "Frases contêm referência duplicada.");
    const coveredNewIds = new Set<string>();
    for (const id of sentenceIds) {
      const sentence = sentenceById.get(id);
      if (!sentence) { add("sentence-unknown", path, `Frase inexistente: ${id}.`); continue; }
      if (!newIds.has(sentence.vocabId) && !reusedIds.has(sentence.vocabId)) add("sentence-vocab", path, `Frase aponta para item fora da lição: ${id}.`);
      if (newIds.has(sentence.vocabId)) coveredNewIds.add(sentence.vocabId);
    }
    for (const id of newIds) if (!coveredNewIds.has(id)) add("sentence-coverage", path, `Item novo sem frase contextual: ${id}.`);

    const grammarIds = new Set<string>();
    lesson.grammar.forEach((note, noteIndex) => {
      const notePath = `${path}.grammar[${noteIndex}]`;
      if (grammarIds.has(note.id)) add("grammar-id", notePath, `Nota duplicada: ${note.id}.`);
      grammarIds.add(note.id);
      if (!note.titlePt.trim() || !note.form.trim() || !note.explanationPt.trim() || note.examples.length === 0) add("grammar-field", notePath, "Nota gramatical incompleta.");
      for (const example of note.examples) if (!example.ko.trim() || !example.pt.trim() || !example.audioText.trim()) add("grammar-example", notePath, "Exemplo exige coreano, tradução e áudio.");
    });

    const exerciseIds = new Set<string>();
    if (lesson.exercises.length === 0) add("exercise-empty", path, "Lição precisa de exercícios.");
    for (const exercise of lesson.exercises) {
      if (exerciseIds.has(exercise.id)) add("exercise-id", path, `Exercício duplicado: ${exercise.id}.`);
      exerciseIds.add(exercise.id);
      if (!isImplementedExerciseType(exercise.type)) add("exercise-unimplemented", path, `Tipo não implementado: ${exercise.type}.`);
      if (plan && !plan.exerciseTypes.includes(exercise.type)) add("exercise-outside-plan", path, `Tipo fora do plano da lição: ${exercise.type}.`);
    }
    if (lesson.exercises.length > 0 && (lesson.completion.minCorrect < 0 || lesson.completion.minCorrect > lesson.exercises.length)) add("completion", path, "Mínimo de acertos não cabe nos exercícios.");
    if (lesson.completion.minScore < 0 || lesson.completion.minScore > 100) add("completion", path, "Nota mínima precisa ficar entre 0 e 100.");
    if (lesson.review.status === "reviewed" && (!lesson.review.reviewedBy || !lesson.review.reviewedAt)) add("review-evidence", path, "Conteúdo revisado exige revisor e data.");
  });

  return issues;
}
