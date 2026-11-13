import type { ReviewMeta } from "@/content/hangul/types";
import { targetBoundaryIssue, targetPosition } from "@/content/vocabulary/validate";
import type { VocabEntry, VocabSentence } from "@/content/vocabulary/types";
import { isImplementedExerciseType } from "@/lib/exercises/registry";
import type { CourseLessonExercise } from "../course-types";
import { validateExerciseSpec } from "../validate-exercises";
import type {
  AdvancedCheckpointContent,
  AdvancedContentIssue,
  AdvancedContentStandards,
  AdvancedCurriculumBlueprint,
  AdvancedLessonContent,
} from "./types";

const HANGUL = /[가-힣]/;
const CORE_TYPES = ["mcq", "cloze", "listen", "translate", "reading"] as const;

function checkReview(
  add: (code: string, path: string, message: string) => void,
  review: ReviewMeta,
  path: string,
) {
  if (review.status === "reviewed" && (!review.reviewedBy || !review.reviewedAt)) {
    add("review-evidence", path, "Conteúdo revisado exige revisor e data.");
  }
}

function koreanSentences(text: string): number {
  return text.split(/[.?!。？！]/).filter((part) => part.trim().length > 0).length;
}

function textLength(text: string): number {
  return text.replace(/\s/g, "").length;
}

function checkReadingPassage(
  add: (code: string, path: string, message: string) => void,
  text: string,
  path: string,
  minimum: number,
) {
  if (!HANGUL.test(text)) add("reading-no-korean", path, "Texto de leitura sem Hangul.");
  if (textLength(text) < minimum) add("reading-short", path, `Texto de leitura curto demais (${textLength(text)} caracteres).`);
  if (koreanSentences(text) < 2) add("reading-sentences", path, "Texto de leitura precisa de ao menos duas frases.");
}

function checkProduction(
  add: (code: string, path: string, message: string) => void,
  production: AdvancedLessonContent["production"] | AdvancedCheckpointContent["production"],
  path: string,
  criteria: readonly string[],
) {
  if (!production) {
    add("production-missing", path, "O curso avançado exige produção independente em cada passo.");
    return;
  }
  if (!production.titlePt.trim() || !production.promptPt.trim()) {
    add("production-field", path, "Produção exige título e enunciado.");
  }
  if (production.guidance.length === 0) add("production-guidance", path, "Produção sem orientação.");
  if (production.checklist.length < 4) add("production-checklist", path, "Produção precisa de checklist com ao menos quatro itens.");
  if (!production.rubric || production.rubric.length !== criteria.length) {
    add("production-rubric", path, `Produção avançada precisa de ${criteria.length} critérios de rubrica.`);
  } else {
    const present = new Set(production.rubric.map((item) => item.criterion));
    for (const required of criteria) {
      if (!present.has(required as never)) add("production-criterion", path, `Rubrica sem o critério ${required}.`);
    }
    if (production.rubric.some((item) => !item.labelPt.trim() || !item.descriptorPt.trim())) {
      add("production-rubric-field", path, "Critério de rubrica incompleto.");
    }
  }
  if (!production.sample || !production.sample.ko.trim() || !production.sample.pt.trim() || !production.sample.notePt.trim()) {
    add("production-sample", path, "Produção avançada precisa de exemplo ilustrativo e nota de uso.");
  } else if (!HANGUL.test(production.sample.ko)) {
    add("production-sample-korean", path, "Exemplo ilustrativo sem Hangul.");
  }
  if (production.minWords !== undefined && production.minWords < 60) {
    add("production-min-words", path, "Produção avançada pede ao menos 60 palavras sugeridas.");
  }
}

function teachingText(lesson: AdvancedLessonContent): string {
  const parts: string[] = [];
  for (const panel of lesson.intro) if (panel.ko) parts.push(panel.ko);
  for (const line of lesson.dialogue) parts.push(line.ko);
  if (lesson.readingText) parts.push(...lesson.readingText.paragraphs);
  for (const note of lesson.grammar) {
    parts.push(note.form);
    for (const example of note.examples) parts.push(example.ko);
  }
  for (const exercise of lesson.exercises) {
    if (exercise.type === "reading") parts.push(exercise.text);
    if (exercise.type === "listen") parts.push(exercise.audioText);
  }
  return parts.join("\n");
}

/**
 * Validação estrutural de C1/C2. Não prova naturalidade, tradução, registro ou
 * correção linguística; todo o conteúdo novo permanece `in-review`.
 */
export function validateAdvancedLessonContent(
  content: readonly AdvancedLessonContent[],
  blueprint: AdvancedCurriculumBlueprint,
  entries: readonly VocabEntry[],
  sentences: readonly VocabSentence[],
  standards: AdvancedContentStandards,
): AdvancedContentIssue[] {
  const issues: AdvancedContentIssue[] = [];
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
    if (lesson.dialogue.length < 6) add("dialogue-short", path, "Diálogo avançado precisa de ao menos seis turnos.");
    const dialogueIds = new Set<string>();
    lesson.dialogue.forEach((line, lineIndex) => {
      const linePath = `${path}.dialogue[${lineIndex}]`;
      if (dialogueIds.has(line.id)) add("dialogue-id", linePath, `Fala duplicada: ${line.id}.`);
      dialogueIds.add(line.id);
      if (!line.speaker.trim() || !line.ko.trim() || !line.pt.trim() || !line.audioText.trim()) add("dialogue-field", linePath, "Fala exige locutor, coreano, tradução e áudio.");
      if (!HANGUL.test(line.ko) || !HANGUL.test(line.audioText)) add("dialogue-korean", linePath, "Fala e áudio precisam conter Hangul.");
      checkReview(add, line.review, linePath);
    });

    if (!lesson.readingText) {
      add("reading-missing", path, "O curso avançado exige um texto-âncora de leitura longa.");
    } else {
      const readingPath = `${path}.readingText`;
      if (!lesson.readingText.titlePt.trim() || !lesson.readingText.pt.trim() || !lesson.readingText.objective.trim()) {
        add("reading-field", readingPath, "Leitura longa exige título, tradução e objetivo.");
      }
      if (lesson.readingText.paragraphs.length < standards.readingMinParagraphs) {
        add("reading-paragraphs", readingPath, `Leitura longa exige ao menos ${standards.readingMinParagraphs} parágrafos.`);
      }
      lesson.readingText.paragraphs.forEach((paragraph, paragraphIndex) => {
        if (!HANGUL.test(paragraph)) add("reading-korean", `${readingPath}.paragraphs[${paragraphIndex}]`, "Parágrafo sem Hangul.");
        if (textLength(paragraph) < 40) add("reading-short", `${readingPath}.paragraphs[${paragraphIndex}]`, "Parágrafo curto demais.");
      });
      const anchorLength = lesson.readingText.paragraphs.reduce((total, paragraph) => total + textLength(paragraph), 0);
      if (anchorLength < standards.readingMinCharacters) {
        add("reading-length", readingPath, `Texto-âncora curto demais para o nível (${anchorLength} caracteres).`);
      }
      checkReview(add, lesson.readingText.review, readingPath);
    }

    const newIds = new Set(lesson.vocabulary.newIds);
    const reusedIds = new Set(lesson.vocabulary.reusedIds);
    if (newIds.size !== lesson.vocabulary.newIds.length) add("vocab-duplicate", path, "Vocabulário novo contém referência duplicada.");
    if (reusedIds.size !== lesson.vocabulary.reusedIds.length) add("vocab-duplicate", path, "Vocabulário reutilizado contém referência duplicada.");
    if (newIds.size !== 8) add("vocab-count", path, `Vocabulário novo precisa ter exatamente 8 itens (tem ${newIds.size}).`);
    for (const id of newIds) {
      const entry = entryById.get(id);
      if (!entry) add("vocab-unknown", path, `Vocabulário novo inexistente: ${id}.`);
      else if (entry.course !== standards.courseId || entry.lesson !== lesson.id) add("vocab-origin", path, `Origem canônica incorreta: ${id}.`);
      if (reusedIds.has(id)) add("vocab-overlap", path, `Item novo e reutilizado ao mesmo tempo: ${id}.`);
    }
    for (const id of reusedIds) {
      const entry = entryById.get(id);
      if (!entry) { add("vocab-unknown", path, `Vocabulário reutilizado inexistente: ${id}.`); continue; }
      if (entry.course === standards.courseId) {
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
      const entry = entryById.get(sentence.vocabId);
      if (entry) {
        const boundary = targetBoundaryIssue(sentence, entry);
        if (boundary) add("sentence-boundary", path, `${id}: ${boundary}.`);
      }
      checkReview(add, sentence.review, path);
    }
    for (const id of newIds) if (!coveredNewIds.has(id)) add("sentence-coverage", path, `Item novo sem frase contextual: ${id}.`);

    const grammarIds = new Set<string>();
    if (lesson.grammar.length !== 2) add("grammar-count", path, "A lição avançada precisa de dois focos gramaticais.");
    lesson.grammar.forEach((note, noteIndex) => {
      const notePath = `${path}.grammar[${noteIndex}]`;
      if (grammarIds.has(note.id)) add("grammar-id", notePath, `Nota duplicada: ${note.id}.`);
      grammarIds.add(note.id);
      if (!note.titlePt.trim() || !note.form.trim() || !note.explanationPt.trim() || note.examples.length === 0) add("grammar-field", notePath, "Nota gramatical incompleta.");
      if (note.examples.length < 2) add("grammar-examples", notePath, "Nota avançada precisa de ao menos dois exemplos.");
      for (const example of note.examples) {
        if (!example.ko.trim() || !example.pt.trim() || !example.audioText.trim()) add("grammar-example", notePath, "Exemplo exige coreano, tradução e áudio.");
        if (!HANGUL.test(example.ko) || !HANGUL.test(example.audioText)) add("grammar-example-korean", notePath, "Exemplo e áudio precisam conter Hangul.");
      }
      checkReview(add, note.review, notePath);
    });

    const exerciseIds = new Set<string>();
    const stages = { guided: 0, independent: 0 };
    const types = { mcq: 0, cloze: 0, listen: 0, translate: 0, reading: 0 };
    if (lesson.exercises.length !== 10) add("exercise-count", path, "A lição avançada precisa de 10 itens avaliados.");
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
      if ((CORE_TYPES as readonly string[]).includes(exercise.type)) {
        types[exercise.type as keyof typeof types] += 1;
      }
      if (exercise.type === "reading") {
        checkReadingPassage(add, exercise.text, `${path}.${exercise.id}.text`, 50);
      }
    }
    lesson.exercises.forEach((exercise, exerciseIndex) => {
      issues.push(
        ...validateExerciseSpec(
          exercise,
          `${path}.exercises[${exerciseIndex}]`,
          { checkRedundantAccepted: true },
        ),
      );
    });
    if (stages.guided !== 5) add("exercise-guided", path, `A lição precisa de 5 itens guiados (tem ${stages.guided}).`);
    if (stages.independent !== 5) add("exercise-independent", path, `A lição precisa de 5 itens independentes (tem ${stages.independent}).`);
    for (const type of CORE_TYPES) {
      if (types[type] !== 2) add("exercise-type-count", path, `A lição precisa de 2 itens do tipo ${type} (tem ${types[type]}).`);
    }
    if (lesson.exercises.length > 0 && (lesson.completion.minCorrect < 0 || lesson.completion.minCorrect > lesson.exercises.length)) add("completion", path, "Mínimo de acertos não cabe nos exercícios.");
    if (lesson.completion.minScore !== 80 || lesson.completion.minCorrect !== 8) add("completion", path, "A lição avançada usa 80% e 8/10.");
    checkReview(add, lesson.review, path);
    checkProduction(add, lesson.production, `${path}.production`, standards.rubricCriteria);

    const taught = teachingText(lesson);
    for (const exercise of lesson.exercises) {
      if (exercise.type !== "cloze") continue;
      const answer = exercise.answer.normalize("NFC").trim();
      if (!/^[가-힣]{2,}$/.test(answer)) continue;
      if (!taught.includes(answer)) {
        add(
          "cloze-untaught",
          `${path}.${exercise.id}`,
          `A resposta “${answer}” não aparece no texto ensinado da lição.`,
        );
      }
    }
  });

  return issues;
}

function exerciseTypeCounts(exercises: readonly CourseLessonExercise[]) {
  const counts = { mcq: 0, cloze: 0, listen: 0, translate: 0, reading: 0 };
  for (const exercise of exercises) {
    if (exercise.type in counts) counts[exercise.type as keyof typeof counts] += 1;
  }
  return counts;
}

/**
 * Valida os checkpoints avançados contra o blueprint e os datasets de lição.
 * A produção aberta continua fora da nota automática.
 */
export function validateAdvancedCheckpointContent(
  checkpoints: readonly AdvancedCheckpointContent[],
  blueprint: AdvancedCurriculumBlueprint,
  lessons: readonly AdvancedLessonContent[],
  standards: AdvancedContentStandards,
): AdvancedContentIssue[] {
  const issues: AdvancedContentIssue[] = [];
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
    const final = checkpoint.id === standards.checkpointFinalId;
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
      if (exercise.stage !== "independent") add("checkpoint-exercise-stage", path, `Etapa inválida: ${exercise.id}.`);
      if (exercise.type === "reading") {
        checkReadingPassage(add, exercise.text, `${path}.${exercise.id}.text`, 50);
      }
    });
    checkpoint.exercises.forEach((exercise, exerciseIndex) => {
      issues.push(
        ...validateExerciseSpec(
          exercise,
          `${path}.exercises[${exerciseIndex}]`,
          { checkRedundantAccepted: true },
        ),
      );
    });
    const counts = exerciseTypeCounts(checkpoint.exercises);
    if (final) {
      const expected = { listen: 10, reading: 10, cloze: 8, translate: 8, mcq: 4 };
      for (const [type, count] of Object.entries(expected)) {
        if (counts[type as keyof typeof counts] !== count) {
          add("checkpoint-distribution", path, `Checkpoint final espera ${count} itens ${type}.`);
        }
      }
    } else {
      const expected = { listen: 6, reading: 6, cloze: 5, translate: 5, mcq: 3 };
      for (const [type, count] of Object.entries(expected)) {
        if (counts[type as keyof typeof counts] !== count) {
          add("checkpoint-distribution", path, `Checkpoint espera ${count} itens ${type}.`);
        }
      }
    }
    checkReview(add, checkpoint.review, path);
    checkProduction(add, checkpoint.production, `${path}.production`, standards.rubricCriteria);
  });

  return issues;
}
