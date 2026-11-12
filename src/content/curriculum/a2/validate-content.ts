import type { ReviewMeta } from "@/content/hangul/types";
import { targetPosition } from "@/content/vocabulary/validate";
import type { VocabEntry, VocabSentence } from "@/content/vocabulary/types";
import { isImplementedExerciseType } from "@/lib/exercises/registry";
import type {
  A2CheckpointContent,
  A2ContentIssue,
  A2CurriculumBlueprint,
  A2LessonContent,
} from "./types";

const HANGUL = /[가-힣]/;

function checkReview(
  add: (code: string, path: string, message: string) => void,
  review: ReviewMeta,
  path: string,
) {
  if (review.status === "reviewed" && (!review.reviewedBy || !review.reviewedAt)) {
    add("review-evidence", path, "Conteúdo revisado exige revisor e data.");
  }
}

/**
 * Validação estrutural do A2. Não prova naturalidade, tradução, registro ou
 * correção linguística; todo o conteúdo novo permanece `in-review`.
 */
export function validateA2LessonContent(
  content: readonly A2LessonContent[],
  blueprint: A2CurriculumBlueprint,
  entries: readonly VocabEntry[],
  sentences: readonly VocabSentence[],
): A2ContentIssue[] {
  const issues: A2ContentIssue[] = [];
  const add = (code: string, path: string, message: string) => issues.push({ code, path, message });
  const lessonPositions = new Map(blueprint.lessons.map((lesson, index) => [lesson.id, index]));
  const entryById = new Map(entries.map((entry) => [entry.id, entry]));
  const sentenceById = new Map(sentences.map((sentence) => [sentence.id, sentence]));
  const contentIds = new Set<string>();
  const globalExerciseIds = new Set<string>();

  content.forEach((lesson, index) => {
    const path = `content[${index}]`;
    const position = lessonPositions.get(lesson.id);
    const plan = blueprint.lessons[position ?? -1];
    if (position === undefined) add("lesson-unknown", path, `Lição fora do blueprint: ${lesson.id}.`);
    if (contentIds.has(lesson.id)) add("lesson-duplicate", path, `Dataset duplicado: ${lesson.id}.`);
    contentIds.add(lesson.id);
    if (!lesson.title.trim() || !lesson.objective.trim()) add("lesson-field", path, "Título e objetivo são obrigatórios.");
    if (plan) {
      if (lesson.number !== plan.number) add("lesson-number", path, `Número diverge do blueprint: ${lesson.number}.`);
      if (lesson.moduleId !== plan.moduleId) add("lesson-module", path, `Módulo diverge do blueprint: ${lesson.moduleId}.`);
      if (lesson.prerequisites.join(",") !== plan.prerequisites.join(",")) add("lesson-prerequisite", path, "Pré-requisitos divergem do blueprint.");
    }
    if (!Number.isInteger(lesson.estimatedMinutes) || lesson.estimatedMinutes <= 0) add("lesson-duration", path, "Duração precisa ser positiva.");
    if (!lesson.dialogueTitle.trim()) add("lesson-field", path, "O diálogo precisa de um título.");
    if (lesson.intro.length === 0) add("intro-empty", path, "A lição precisa ensinar antes de testar.");
    lesson.intro.forEach((panel, panelIndex) => {
      if (!panel.title.trim() || !panel.body.trim()) add("intro-field", `${path}.intro[${panelIndex}]`, "Painel de introdução incompleto.");
    });
    if (lesson.summary.length === 0) add("summary-empty", path, "A lição precisa de um fechamento.");
    if (lesson.summary.some((point) => !point.trim())) add("summary-field", path, "O fechamento não pode ter item vazio.");
    if (lesson.dialogue.length < 2) add("dialogue-short", path, "Diálogo precisa de ao menos dois turnos.");
    const dialogueIds = new Set<string>();
    lesson.dialogue.forEach((line, lineIndex) => {
      const linePath = `${path}.dialogue[${lineIndex}]`;
      if (dialogueIds.has(line.id)) add("dialogue-id", linePath, `Fala duplicada: ${line.id}.`);
      dialogueIds.add(line.id);
      if (!line.speaker.trim() || !line.ko.trim() || !line.pt.trim() || !line.audioText.trim()) add("dialogue-field", linePath, "Fala exige locutor, coreano, tradução e áudio.");
      if (!HANGUL.test(line.ko) || !HANGUL.test(line.audioText)) add("dialogue-korean", linePath, "Fala e áudio precisam conter Hangul.");
      checkReview(add, line.review, linePath);
    });

    const newIds = new Set(lesson.vocabulary.newIds);
    const reusedIds = new Set(lesson.vocabulary.reusedIds);
    if (newIds.size !== lesson.vocabulary.newIds.length) add("vocab-duplicate", path, "Vocabulário novo contém referência duplicada.");
    if (reusedIds.size !== lesson.vocabulary.reusedIds.length) add("vocab-duplicate", path, "Vocabulário reutilizado contém referência duplicada.");
    if (plan && (newIds.size < plan.vocabulary.newItems.min || newIds.size > plan.vocabulary.newItems.max)) add("vocab-count", path, `Vocabulário novo precisa ter ${plan.vocabulary.newItems.min}–${plan.vocabulary.newItems.max} itens.`);
    for (const id of newIds) {
      const entry = entryById.get(id);
      if (!entry) add("vocab-unknown", path, `Vocabulário novo inexistente: ${id}.`);
      else if (entry.course !== "ko-a2" || entry.lesson !== lesson.id) add("vocab-origin", path, `Origem canônica incorreta: ${id}.`);
      if (reusedIds.has(id)) add("vocab-overlap", path, `Item novo e reutilizado ao mesmo tempo: ${id}.`);
    }
    for (const id of reusedIds) {
      const entry = entryById.get(id);
      if (!entry) { add("vocab-unknown", path, `Vocabulário reutilizado inexistente: ${id}.`); continue; }
      if (entry.course === "ko-a2") {
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
      if (!sentence.pt.trim()) add("sentence-translation", path, `Frase sem tradução completa: ${id}.`);
      if (!sentence.contextMeaning.trim()) add("sentence-cue", path, `Frase sem dica de sentido: ${id}.`);
      if (!HANGUL.test(sentence.ko)) add("sentence-korean", path, `Frase sem Hangul: ${id}.`);
      if (!sentence.target.trim()) add("sentence-target", path, `Frase sem alvo: ${id}.`);
      if (targetPosition(sentence) === null) add("sentence-gap", path, `Alvo deve ocorrer uma vez, no início de palavra: ${id}.`);
      checkReview(add, sentence.review, path);
    }
    for (const id of newIds) if (!coveredNewIds.has(id)) add("sentence-coverage", path, `Item novo sem frase contextual: ${id}.`);

    const grammarIds = new Set<string>();
    lesson.grammar.forEach((note, noteIndex) => {
      const notePath = `${path}.grammar[${noteIndex}]`;
      if (grammarIds.has(note.id)) add("grammar-id", notePath, `Nota duplicada: ${note.id}.`);
      grammarIds.add(note.id);
      if (!note.titlePt.trim() || !note.form.trim() || !note.explanationPt.trim() || note.examples.length === 0) add("grammar-field", notePath, "Nota gramatical incompleta.");
      for (const example of note.examples) {
        if (!example.ko.trim() || !example.pt.trim() || !example.audioText.trim()) add("grammar-example", notePath, "Exemplo exige coreano, tradução e áudio.");
        if (!HANGUL.test(example.ko) || !HANGUL.test(example.audioText)) add("grammar-example-korean", notePath, "Exemplo e áudio precisam conter Hangul.");
      }
      checkReview(add, note.review, notePath);
    });

    const exerciseIds = new Set<string>();
    const stages = { guided: 0, independent: 0 };
    if (lesson.exercises.length === 0) add("exercise-empty", path, "Lição precisa de exercícios.");
    if (plan && lesson.exercises.length !== plan.assessment.automaticItems) {
      add("exercise-count", path, `A lição precisa de ${plan.assessment.automaticItems} itens avaliados.`);
    }
    for (const exercise of lesson.exercises) {
      if (exerciseIds.has(exercise.id)) add("exercise-id", path, `Exercício duplicado: ${exercise.id}.`);
      if (globalExerciseIds.has(exercise.id)) add("exercise-id-global", path, `Exercício reutilizado em outro passo: ${exercise.id}.`);
      exerciseIds.add(exercise.id);
      globalExerciseIds.add(exercise.id);
      if (exercise.stage !== "guided" && exercise.stage !== "independent") {
        add("exercise-stage", path, `Etapa inválida no exercício: ${exercise.id}.`);
      } else {
        stages[exercise.stage] += 1;
      }
      if (!isImplementedExerciseType(exercise.type)) add("exercise-unimplemented", path, `Tipo não implementado: ${exercise.type}.`);
      if (plan && !plan.exerciseTypes.includes(exercise.type)) add("exercise-outside-plan", path, `Tipo fora do plano da lição: ${exercise.type}.`);
    }
    if (stages.guided === 0) add("exercise-guided", path, "A lição precisa de prática guiada.");
    if (stages.independent === 0) add("exercise-independent", path, "A lição precisa de prática independente.");
    if (plan && lesson.completion.minCorrect !== plan.assessment.minCorrect) add("completion", path, "Mínimo de acertos diverge do plano da lição.");
    if (lesson.exercises.length > 0 && (lesson.completion.minCorrect < 0 || lesson.completion.minCorrect > lesson.exercises.length)) add("completion", path, "Mínimo de acertos não cabe nos exercícios.");
    if (lesson.completion.minScore < 0 || lesson.completion.minScore > 100) add("completion", path, "Nota mínima precisa ficar entre 0 e 100.");
    checkReview(add, lesson.review, path);
  });

  return issues;
}

/**
 * Valida os checkpoints A2 contra o blueprint e os datasets de lição. A
 * tarefa funcional aberta continua fora da nota automática.
 */
export function validateA2CheckpointContent(
  checkpoints: readonly A2CheckpointContent[],
  blueprint: A2CurriculumBlueprint,
  lessons: readonly A2LessonContent[],
): A2ContentIssue[] {
  const issues: A2ContentIssue[] = [];
  const add = (code: string, path: string, message: string) => issues.push({ code, path, message });
  const planById = new Map(blueprint.checkpoints.map((checkpoint) => [checkpoint.id, checkpoint]));
  const lessonIds = new Set(lessons.map((lesson) => lesson.id));
  const contentIds = new Set<string>();
  const exerciseIds = new Set<string>(
    lessons.flatMap((lesson) => lesson.exercises.map((exercise) => exercise.id)),
  );

  checkpoints.forEach((checkpoint, index) => {
    const path = `checkpoints[${index}]`;
    const plan = planById.get(checkpoint.id);
    if (!plan) add("checkpoint-unknown", path, `Checkpoint fora do blueprint: ${checkpoint.id}.`);
    if (contentIds.has(checkpoint.id)) add("checkpoint-duplicate", path, `Checkpoint duplicado: ${checkpoint.id}.`);
    contentIds.add(checkpoint.id);
    if (!checkpoint.title.trim() || !checkpoint.objective.trim()) add("checkpoint-field", path, "Título e objetivo são obrigatórios.");
    if (checkpoint.instructions.length === 0) add("checkpoint-instructions", path, "Checkpoint precisa de instruções.");
    if (plan) {
      if (checkpoint.number !== plan.number) add("checkpoint-number", path, "Número diverge do blueprint.");
      if (checkpoint.moduleId !== plan.moduleId) add("checkpoint-module", path, "Módulo diverge do blueprint.");
      if (checkpoint.lessonIds.join(",") !== plan.lessonIds.join(",")) add("checkpoint-lessons", path, "Escopo diverge do blueprint.");
      if (checkpoint.prerequisites.join(",") !== plan.prerequisites.join(",")) add("checkpoint-prerequisite", path, "Pré-requisitos divergem do blueprint.");
      if (checkpoint.exercises.length !== plan.assessment.automaticItems) add("checkpoint-count", path, `Checkpoint precisa de ${plan.assessment.automaticItems} itens.`);
      if (checkpoint.minCorrect !== plan.assessment.minCorrect) add("checkpoint-min-correct", path, "Mínimo de acertos diverge do plano.");
    }
    for (const id of checkpoint.lessonIds) {
      if (!lessonIds.has(id)) add("checkpoint-lesson-unknown", path, `Lição sem dataset: ${id}.`);
    }
    if (checkpoint.passingScore !== 80) add("checkpoint-passing-score", path, "O critério documentado é 80%.");
    if (!Number.isInteger(checkpoint.estimatedMinutes) || checkpoint.estimatedMinutes <= 0) add("checkpoint-duration", path, "Duração precisa ser positiva.");
    if (checkpoint.exercises.length > 0 && (checkpoint.minCorrect < 0 || checkpoint.minCorrect > checkpoint.exercises.length)) add("checkpoint-min-correct", path, "Mínimo de acertos não cabe nos itens.");
    checkpoint.exercises.forEach((exercise) => {
      if (exerciseIds.has(exercise.id)) add("checkpoint-exercise-id", path, `Exercício reutilizado: ${exercise.id}.`);
      exerciseIds.add(exercise.id);
      if (!isImplementedExerciseType(exercise.type)) add("checkpoint-exercise-type", path, `Tipo não implementado: ${exercise.type}.`);
      if (exercise.stage !== "guided" && exercise.stage !== "independent") add("checkpoint-exercise-stage", path, `Etapa inválida: ${exercise.id}.`);
    });
    if (checkpoint.exercises.length > 0 && !checkpoint.exercises.some((exercise) => exercise.type === "listen")) add("checkpoint-listening", path, "Checkpoint precisa de escuta.");
    if (checkpoint.exercises.length > 0 && !checkpoint.exercises.some((exercise) => exercise.type === "reading" || exercise.type === "mcq")) add("checkpoint-reading", path, "Checkpoint precisa de leitura/compreensão.");
    checkReview(add, checkpoint.review, path);
  });

  return issues;
}
