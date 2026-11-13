/**
 * Auditoria 12B — origem lexical de palavras cobradas em gabaritos (read-only).
 * Para cada token não ensinado (progression-findings.unknownNoun/answerNotTaught),
 * localiza a entrada B1 canônica correspondente e compara a lição de origem com
 * o passo que a cobra (ordem real do currículo: l01..l05,c01,l06..l10,c02,...).
 * Uso: node docs/audits/b1/tools/analyze-lexicon-origin.cjs
 * Saída: docs/audits/b1/data/lexicon-origin-findings.json
 */
const fs = require("node:fs");
const path = require("node:path");

const ROOT = path.resolve(__dirname, "..", "..", "..", "..");
const data = require(path.join(ROOT, "docs/audits/b1/data/content-dump.json"));
const prog = require(path.join(ROOT, "docs/audits/b1/data/progression-findings.json"));

const order = new Map();
{
  let i = 0;
  for (let m = 0; m < 8; m++) {
    for (let l = 0; l < 5; l++) order.set(`b1-l${String(m * 5 + l + 1).padStart(2, "0")}`, i++);
    order.set(`b1-c${String(m + 1).padStart(2, "0")}`, i++);
  }
}

const b1Entries = data.vocab.filter((v) => v.course === "ko-b1");
const formLesson = new Map();
for (const v of b1Entries) {
  if (!formLesson.has(v.ko)) formLesson.set(v.ko, v.lesson);
}

const rows = [];

for (const r of prog.unknownNoun) {
  if (!formLesson.has(r.noun)) continue;
  const origin = formLesson.get(r.noun);
  const po = order.get(origin);
  const co = order.get(r.step);
  if (po !== undefined && co !== undefined && po > co)
    rows.push({ kind: "substantivo-em-item", step: r.step, exercise: r.exercise, token: r.token, noun: r.noun, origin });
}

for (const r of prog.answerNotTaught) {
  for (const t of r.unknownTokens) {
    for (const [form, lesson] of formLesson.entries()) {
      if (form.length < 2) continue;
      if (t === form || t.startsWith(form)) {
        const po = order.get(lesson);
        const co = order.get(r.step);
        if (po !== undefined && co !== undefined && po > co)
          rows.push({ kind: "gabarito", step: r.step, exercise: r.exercise, answer: r.answer, token: t, form, origin: lesson });
      }
    }
  }
}

const seen = new Set();
const uniq = rows.filter((r) => {
  const k = `${r.step}|${r.exercise}|${r.noun || r.form}`;
  if (seen.has(k)) return false;
  seen.add(k);
  return true;
});

fs.writeFileSync(path.join(ROOT, "docs/audits/b1/data/lexicon-origin-findings.json"), JSON.stringify({ rows: uniq }, null, 2));
console.log(`cobranças com vocabulário de origem FUTURA: ${uniq.length}`);
for (const r of uniq) console.log(`- ${r.step}/${r.exercise} [${r.kind}] cobra '${r.noun || r.form}' (ensinada em ${r.origin}) :: ${(r.token || r.answer || "").slice(0, 70)}`);
