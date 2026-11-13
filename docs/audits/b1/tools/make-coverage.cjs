/**
 * Auditoria 12B — gera a matriz de cobertura por passo (read-only).
 * Uso: node docs/audits/b1/tools/make-coverage.cjs
 * Saída: docs/audits/b1/data/coverage-matrix.json (+ resumo por lição)
 */
const fs = require("node:fs");
const path = require("node:path");

const ROOT = path.resolve(__dirname, "..", "..", "..", "..");
const data = require(path.join(ROOT, "docs/audits/b1/data/content-dump.json"));

const rows = [];
for (const l of data.b1Lessons) {
  rows.push({
    id: l.id,
    kind: "lesson",
    newIds: l.vocabulary.newIds.length,
    reusedIds: l.vocabulary.reusedIds.length,
    sentences: l.vocabulary.sentenceIds.length,
    intro: l.intro.length,
    dialogue: l.dialogue.length,
    grammar: l.grammar.length,
    examples: l.grammar.reduce((n, g) => n + g.examples.length, 0),
    exercises: l.exercises.length,
    byType: l.exercises.reduce((a, e) => ((a[e.type] = (a[e.type] || 0) + 1), a), {}),
    production: l.production ? 1 : 0,
    rubric: l.production ? l.production.checklist.length : 0,
    guidance: l.production ? l.production.guidance.length : 0,
    reviewed: l.review.status === "reviewed",
  });
}
for (const c of data.b1Checkpoints) {
  rows.push({
    id: c.id,
    kind: "checkpoint",
    exercises: c.exercises.length,
    byType: c.exercises.reduce((a, e) => ((a[e.type] = (a[e.type] || 0) + 1), a), {}),
    minCorrect: c.minCorrect,
    reviewed: c.review.status === "reviewed",
  });
}

fs.writeFileSync(path.join(ROOT, "docs/audits/b1/data/coverage-matrix.json"), JSON.stringify(rows, null, 2));

const totals = {
  lessons: rows.filter((r) => r.kind === "lesson").length,
  checkpoints: rows.filter((r) => r.kind === "checkpoint").length,
  exercises: rows.reduce((n, r) => n + r.exercises, 0),
  newIds: rows.reduce((n, r) => n + (r.newIds || 0), 0),
  reusedIds: rows.reduce((n, r) => n + (r.reusedIds || 0), 0),
  sentences: rows.reduce((n, r) => n + (r.sentences || 0), 0),
  introPanels: rows.reduce((n, r) => n + (r.intro || 0), 0),
  dialogueLines: rows.reduce((n, r) => n + (r.dialogue || 0), 0),
  grammarBlocks: rows.reduce((n, r) => n + (r.grammar || 0), 0),
  grammarExamples: rows.reduce((n, r) => n + (r.examples || 0), 0),
  productions: rows.reduce((n, r) => n + (r.production || 0), 0),
};
console.log(JSON.stringify(totals, null, 2));
for (const r of rows) {
  console.log(
    `${r.id} ${r.kind}: ex=${r.exercises}${r.newIds !== undefined ? ` novo=${r.newIds} reuso=${r.reusedIds} frases=${r.sentences}` : ""}${r.production ? ` prod=1(rub=${r.rubric},guid=${r.guidance})` : ""}`,
  );
}
