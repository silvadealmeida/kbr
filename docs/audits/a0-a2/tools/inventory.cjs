#!/usr/bin/env node
/**
 * Auditoria A0–A2 — inventário e cobertura medidas do repositório.
 * Gera docs/audits/a0-a2/data/inventory.json (fonte dos documentos markdown).
 * Read-only quanto ao conteúdo: só lê src/ e escreve dentro de docs/audits.
 */
const fs = require("node:fs");
const path = require("node:path");

const ROOT = path.resolve(__dirname, "..", "..", "..", "..");
const data = require(path.join(ROOT, "docs/audits/a0-a2/data/content-dump.json"));

const n = (a) => a.reduce((s, x) => s + (x.exercises ? x.exercises.length : 0), 0);
const count = (a, f) => a.reduce((s, x) => s + f(x), 0);
const courseSentences = (course) => {
  const ids = new Set(data.vocab.filter((v) => v.course === course).map((v) => v.id));
  return data.sentences.filter((s) => ids.has(s.vocabId)).length;
};
const entriesOf = (course) => data.vocab.filter((v) => v.course === course).length;

function typesOf(steps) {
  const t = {};
  for (const s of steps) for (const e of s.exercises) t[e.type] = (t[e.type] || 0) + 1;
  return t;
}

const A0 = {
  course: "A0 Hangul",
  lessons: data.hangul.lessons.length,
  checkpoints: data.hangul.checkpoints.length,
  steps: data.hangul.lessons.length + data.hangul.checkpoints.length,
  exercises: n(data.hangul.lessons) + n(data.hangul.checkpoints),
  exerciseTypes: typesOf([...data.hangul.lessons, ...data.hangul.checkpoints]),
  jamoRecords: data.hangul.jamo.length,
  syllables: data.hangul.syllables.length,
  words: data.hangul.words.length,
  soundRules: data.hangul.rules.length,
  ruleExamplePairs: count(data.hangul.rules, (r) => r.examples.length),
  introPanels: count(data.hangul.lessons, (l) => (l.intro || []).length),
  lessonObjectives: count(data.hangul.lessons, (l) => (l.objectives || []).length),
  checkpointInstructions: count(data.hangul.checkpoints, (c) => (c.instructions || []).length),
  vocabEntries: entriesOf("hangul"),
  vocabSentences: courseSentences("hangul"),
};

function curso(key, label) {
  const L = data[`${key}Lessons`];
  const C = data[`${key}Checkpoints`];
  const bp = data[`${key}Blueprint`];
  return {
    course: label,
    modules: bp.modules.length,
    lessons: L.length,
    checkpoints: C.length,
    steps: L.length + C.length,
    lessonsInBlueprint: bp.lessons.length,
    checkpointsInBlueprint: bp.checkpoints.length,
    exercises: n(L) + n(C),
    lessonExercises: n(L),
    checkpointExercises: n(C),
    exerciseTypes: typesOf([...L, ...C]),
    dialogueLines: count(L, (l) => l.dialogue.length),
    dialogueTitles: L.length,
    grammarBlocks: count(L, (l) => l.grammar.length),
    grammarExamples: count(L, (l) => count(l.grammar, (g) => g.examples.length)),
    introPanels: count(L, (l) => l.intro.length),
    summaryPoints: count(L, (l) => l.summary.length),
    vocabEntries: entriesOf(key === "a1" ? "ko-a1" : "ko-a2"),
    vocabSentences: courseSentences(key === "a1" ? "ko-a1" : "ko-a2"),
    newVocabIds: count(L, (l) => l.vocabulary.newIds.length),
    reusedVocabIds: count(L, (l) => l.vocabulary.reusedIds.length),
    distinctReused: new Set(L.flatMap((l) => l.vocabulary.reusedIds)).size,
    grammarTopicsDeclared: new Set(bp.lessons.flatMap((l) => l.grammar)).size,
  };
}

const out = {
  generatedAt: "baseline 3103ce3",
  a0: A0,
  a1: curso("a1", "A1"),
  a2: curso("a2", "A2"),
  vocabulary: {
    entries: data.vocab.length,
    byCourse: data.vocab.reduce((a, v) => ({ ...a, [v.course]: (a[v.course] || 0) + 1 }), {}),
    sentences: data.sentences.length,
    entriesWithoutSentence: data.vocab.filter((v) => !data.sentences.some((s) => s.vocabId === v.id)).length,
    allInReview: data.vocab.every((v) => v.review.status === "in-review"),
  },
};
out.totals = {
  steps: out.a0.steps + out.a1.steps + out.a2.steps,
  exercises: out.a0.exercises + out.a1.exercises + out.a2.exercises,
  vocabEntries: out.a0.vocabEntries + out.a1.vocabEntries + out.a2.vocabEntries,
  vocabSentences: out.a0.vocabSentences + out.a1.vocabSentences + out.a2.vocabSentences,
  koreanStringBearingItems:
    out.a0.exercises +
    out.a1.exercises +
    out.a2.exercises +
    out.a1.dialogueLines +
    out.a2.dialogueLines +
    out.a1.grammarExamples +
    out.a2.grammarExamples +
    out.a1.introPanels +
    out.a2.introPanels +
    out.a0.vocabEntries +
    out.a1.vocabEntries +
    out.a2.vocabEntries +
    out.a0.vocabSentences +
    out.a1.vocabSentences +
    out.a2.vocabSentences,
};

fs.writeFileSync(path.join(ROOT, "docs/audits/a0-a2/data/inventory.json"), JSON.stringify(out, null, 2));
console.log(JSON.stringify(out.totals, null, 2));
console.log(JSON.stringify({ a1: out.a1.exerciseTypes, a2: out.a2.exerciseTypes, a0: out.a0.exerciseTypes }));
