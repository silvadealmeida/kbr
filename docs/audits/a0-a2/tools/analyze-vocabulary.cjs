/**
 * Auditoria PASS A — registro lexical (read-only).
 * Uso: node docs/audits/a0-a2/tools/analyze-vocabulary.cjs
 * Saída: docs/audits/a0-a2/data/vocabulary-findings.json
 *
 * Fatos verificáveis por máquina sobre identidades, homógrafos, alvos de
 * frase e cobertura contextual. Não julga correção semântica.
 */
const fs = require("node:fs");
const path = require("node:path");

const ROOT = path.resolve(__dirname, "..", "..", "..", "..");
const data = require(path.join(ROOT, "docs/audits/a0-a2/data/content-dump.json"));
const out = { counts: {}, homographs: [], idFormMismatch: [], entriesWithoutSentenceByCourse: {}, reusedButUntaught: [], surfaceOnlyInSentence: [], findings: [] };

const HANGUL = /[가-힣]/;
const byId = new Map(data.vocab.map((v) => [v.id, v]));
const sentencesByVocab = new Map();
for (const s of data.sentences) {
  if (!sentencesByVocab.has(s.vocabId)) sentencesByVocab.set(s.vocabId, []);
  sentencesByVocab.get(s.vocabId).push(s);
}

out.counts = {
  entries: data.vocab.length,
  byCourse: data.vocab.reduce((a, v) => ({ ...a, [v.course]: (a[v.course] || 0) + 1 }), {}),
  sentences: data.sentences.length,
  byCourseSentences: data.sentences.reduce((a, s) => {
    const e = byId.get(s.vocabId);
    const c = e ? e.course : "?";
    return { ...a, [c]: (a[c] || 0) + 1 };
  }, {}),
};

for (const v of data.vocab) {
  if (!sentencesByVocab.has(v.id))
    out.entriesWithoutSentenceByCourse[v.course] = (out.entriesWithoutSentenceByCourse[v.course] || 0) + 1;

  // id deve terminar com a forma (ko:<forma> ou ko:<forma>#<sentido>)
  const bare = v.id.includes("#") ? v.id.slice(0, v.id.indexOf("#")) : v.id;
  if (bare !== `ko:${v.ko}`) out.idFormMismatch.push({ id: v.id, ko: v.ko, esperado: `ko:${v.ko}`, curso: v.course });

  // homógrafos: mesma forma, várias entradas
  const group = data.vocab.filter((x) => x.ko === v.ko);
  if (group.length > 1 && !v.sense && !out.homographs.some((h) => h.ko === v.ko)) {
    out.homographs.push({
      ko: v.ko,
      entradas: group.map((g) => `${g.id}${g.sense ? "#" + g.sense : ""} (${g.course}/${g.lesson}) ${g.pos || "-"} ${g.pt}`),
      semSense: group.filter((g) => !g.sense).length,
    });
  }

  // forma de dicionário: verbo/adjetivo deve terminar em 다
  if ((v.pos === "verbo" || v.pos === "adjetivo") && !v.ko.endsWith("다"))
    out.findings.push({ check: "pos-dict-form", item: v.id, message: `pos=${v.pos} mas a forma não termina em 다: ${v.ko}` });
  if (v.pos === "numeral" && /^[가-힣]+$/.test(v.ko) === false)
    out.findings.push({ check: "pos-numeral", item: v.id, message: `numeral com forma não-coreana: ${v.ko}` });
  if (v.audioText && !HANGUL.test(v.audioText))
    out.findings.push({ check: "audio-no-hangul", item: v.id, message: `audioText sem Hangul: ${v.audioText}` });
  if (v.audioText && v.audioText.replace(/\s/g, "") !== v.ko.replace(/\s/g, "") && !v.audioText.includes(v.ko.slice(0, 2)))
    out.findings.push({ check: "audio-diverges", item: v.id, message: `ko=${v.ko} × audioText=${v.audioText}`, curso: v.course });
}

// alvos de frase que não são flexão reconhecível da forma canônica
for (const s of data.sentences) {
  const e = byId.get(s.vocabId);
  if (!e) continue;
  if (s.target === e.ko) continue;
  const stem = e.ko.endsWith("다") ? e.ko.slice(0, -1) : e.ko;
  if (!s.target.startsWith(stem.slice(0, Math.min(stem.length, 2))))
    out.surfaceOnlyInSentence.push({ sentence: s.id, vocab: e.id, ko: e.ko, target: s.target, frase: s.ko });
}

// reuso em lição: reusedIds precisa existir (integridade já coberta) e o item
// reusado deve ter sido apresentado ANTES da lição que o reusa
const steps = [...data.a1Lessons, ...data.a2Lessons];
const order = new Map();
let i = 0;
for (const s of steps) order.set(s.id, i++);
for (const s of steps) {
  for (const id of s.vocabulary.reusedIds || []) {
    const e = byId.get(id);
    if (!e) continue;
    const at = order.get(e.lesson);
    if (at !== undefined && at >= order.get(s.id))
      out.reusedButUntaught.push({ step: s.id, vocab: id, apresentadoEm: e.lesson });
  }
}

fs.writeFileSync(path.join(ROOT, "docs/audits/a0-a2/data/vocabulary-findings.json"), JSON.stringify(out, null, 2));
console.log(
  JSON.stringify(
    {
      counts: out.counts,
      entriesWithoutSentenceByCourse: out.entriesWithoutSentenceByCourse,
      homographsSemSense: out.homographs.filter((h) => h.semSense > 1).length,
      idFormMismatch: out.idFormMismatch.length,
      surfaceOnlyInSentence: out.surfaceOnlyInSentence.length,
      reusedButUntaught: out.reusedButUntaught.length,
      otherFindings: out.findings.reduce((a, f) => ({ ...a, [f.check]: (a[f.check] || 0) + 1 }), {}),
    },
    null,
    2,
  ),
);
