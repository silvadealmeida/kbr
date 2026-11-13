/**
 * Auditoria 12B — registro lexical B1 (read-only).
 * Portado de `docs/audits/a0-a2/tools/analyze-vocabulary.cjs` (12A), com
 * checagens específicas: colisão de forma nova B1 × A1/A2/Hangul, alvos de
 * frase dentro de palavra maior, homógrafos, suspeita de pos=verbo para
 * adjetivo e reuso antes da origem (com o corpus A1/A2+B1 ordenado).
 *
 * Uso: node docs/audits/b1/tools/analyze-vocabulary.cjs
 * Saída: docs/audits/b1/data/vocabulary-findings.json
 */
const fs = require("node:fs");
const path = require("node:path");

const ROOT = path.resolve(__dirname, "..", "..", "..", "..");
const data = require(path.join(ROOT, "docs/audits/b1/data/content-dump.json"));

const out = {
  counts: {},
  collisionPrior: [],
  homographs: [],
  idFormMismatch: [],
  reusedButUntaught: [],
  surfaceOnlyInSentence: [],
  targetInsideWord: [],
  adjectiveSuspect: [],
  findings: [],
};

const HANGUL = /[가-힣]/;
const b1Vocab = data.vocab.filter((v) => v.course === "ko-b1");
const priorVocab = data.vocab.filter((v) => v.course !== "ko-b1");
const priorForms = new Set(priorVocab.map((v) => v.ko));
const byId = new Map(data.vocab.map((v) => [v.id, v]));

const b1Sentences = data.sentences.filter((s) => s.id.startsWith("sent:b1-"));
const sentencesByVocab = new Map();
for (const s of b1Sentences) {
  if (!sentencesByVocab.has(s.vocabId)) sentencesByVocab.set(s.vocabId, []);
  sentencesByVocab.get(s.vocabId).push(s);
}

out.counts = {
  b1Entries: b1Vocab.length,
  b1Sentences: b1Sentences.length,
  priorEntries: priorVocab.length,
  b1ByLesson: (() => {
    const m = {};
    for (const v of b1Vocab) m[v.lesson] = (m[v.lesson] || 0) + 1;
    return m;
  })(),
};

// colisão de ID com cursos anteriores (mesma forma → mesmo `ko:<forma>`)
for (const v of b1Vocab) {
  if (priorForms.has(v.ko)) out.collisionPrior.push({ id: v.id, ko: v.ko, curso: v.course, lesson: v.lesson });
}

for (const v of b1Vocab) {
  const bare = v.id.includes("#") ? v.id.slice(0, v.id.indexOf("#")) : v.id;
  if (bare !== `ko:${v.ko}`) out.idFormMismatch.push({ id: v.id, ko: v.ko, esperado: `ko:${v.ko}` });
  const group = b1Vocab.filter((x) => x.ko === v.ko);
  if (group.length > 1 && !v.sense && !out.homographs.some((h) => h.ko === v.ko)) {
    out.homographs.push({
      ko: v.ko,
      entradas: group.map((g) => `${g.id} (${g.lesson}) ${g.pos || "-"} ${g.pt}`),
    });
  }
  if ((v.pos === "verbo") && !v.ko.endsWith("다"))
    out.findings.push({ check: "pos-dict-form", item: v.id, message: `pos=verbo mas a forma não termina em 다: ${v.ko}` });
  // adjetivos rotulados como verbo: glosas pt que começam com "ser"/"estar"
  if (v.pos === "verbo" && /^(ser|estar|parecer)\b/i.test(v.pt))
    out.adjectiveSuspect.push({ id: v.id, ko: v.ko, pt: v.pt, lesson: v.lesson });
  if (v.audioText && !HANGUL.test(v.audioText))
    out.findings.push({ check: "audio-no-hangul", item: v.id, message: `audioText sem Hangul: ${v.audioText}` });
}

// alvos de frase: regra exata do validador compartilhado da 12A
// (`targetBoundaryIssue` em src/content/vocabulary/validate.ts): só substantivos,
// SAFE_AFTER_NOUN fechado, verbalizadores 하/되/해/했/한/할/될/됐/시/받 permitidos.
const SAFE_AFTER_NOUN = [
  "은", "는", "이", "가", "을", "를", "에", "에서", "에게", "한테", "께",
  "도", "만", "부터", "까지", "와", "과", "랑", "이랑", "로", "으로", "의",
  "처럼", "보다", "밖에", "마다", "씩", "쯤", "요", "입니다", "이에요", "예요",
  "이다", "인", "이며", "이고", "이라", "라는", "이라고", "에는", "에도",
  "에만", "에서도", "에서는", "으로는", "로는", "에게는", "한테는", "께서",
  "께서는", "들", "들과", "들과는", "들도", "들이", "들을", "들에", "들의",
  "들로", "들보다", "들처럼", "들만", "들까지", "들부터", "이라도", "으로도",
  "로도",
];
const VERBALIZER = /^[하되해했한할될됐시받]/;

for (const s of b1Sentences) {
  const e = byId.get(s.vocabId);
  if (!e) continue;
  const occ = s.ko.split(s.target).length - 1;
  if (occ !== 1) out.findings.push({ check: "target-occurrences", item: s.id, message: `alvo '${s.target}' ocorre ${occ}x: ${s.ko}` });
  const at = s.ko.indexOf(s.target);
  if (at > 0 && !/\s/.test(s.ko[at - 1]))
    out.findings.push({ check: "target-not-word-start", item: s.id, message: `alvo '${s.target}' não começa em fronteira de palavra: ${s.ko}` });
  if (e.pos === "substantivo" && at >= 0) {
    const rest = s.ko.slice(at + s.target.length);
    if (rest && /[가-힣]/.test(rest[0]) && !SAFE_AFTER_NOUN.some((suffix) => rest.startsWith(suffix)) && !VERBALIZER.test(rest))
      out.targetInsideWord.push({ sentence: s.id, vocab: e.id, target: s.target, frase: s.ko, motivo: `alvo dentro de “${s.target}${rest.split(/\s/)[0]}”` });
  }
  if (s.target !== e.ko) {
    const stem = e.ko.endsWith("다") ? e.ko.slice(0, -1) : e.ko;
    if (!s.target.startsWith(stem.slice(0, Math.min(stem.length, 2))))
      out.surfaceOnlyInSentence.push({ sentence: s.id, vocab: e.id, ko: e.ko, target: s.target, frase: s.ko });
  }
}

// reuso antes da origem — ordem real: A1 completa → A2 completa → B1
const order = new Map();
let i = 0;
for (const l of data.a1Lessons) order.set(l.id, i++);
for (const c of data.a1Checkpoints) order.set(c.id, i++);
for (const l of data.a2Lessons) order.set(l.id, i++);
for (const c of data.a2Checkpoints) order.set(c.id, i++);
for (const l of data.b1Lessons) order.set(l.id, i++);
for (const c of data.b1Checkpoints) order.set(c.id, i++);

for (const step of [...data.a1Lessons, ...data.a2Lessons, ...data.b1Lessons]) {
  for (const id of step.vocabulary.reusedIds || []) {
    const e = byId.get(id);
    if (!e) continue;
    const at = order.get(e.lesson);
    const mine = order.get(step.id);
    if (at !== undefined && mine !== undefined && at >= mine)
      out.reusedButUntaught.push({ step: step.id, vocab: id, apresentadoEm: e.lesson });
  }
}

fs.writeFileSync(path.join(ROOT, "docs/audits/b1/data/vocabulary-findings.json"), JSON.stringify(out, null, 2));
console.log(
  JSON.stringify(
    {
      counts: { b1Entries: out.counts.b1Entries, b1Sentences: out.counts.b1Sentences },
      collisionPrior: out.collisionPrior.length,
      homographs: out.homographs.length,
      idFormMismatch: out.idFormMismatch.length,
      reusedButUntaught: out.reusedButUntaught.length,
      surfaceOnlyInSentence: out.surfaceOnlyInSentence.length,
      targetInsideWord: out.targetInsideWord.length,
      adjectiveSuspect: out.adjectiveSuspect.length,
      otherFindings: out.findings.reduce((a, f) => ({ ...a, [f.check]: (a[f.check] || 0) + 1 }), {}),
    },
    null,
    2,
  ),
);
for (const c of out.collisionPrior) console.log(`colisão: ${c.id} (${c.lesson}) também existe em curso anterior`);
for (const h of out.homographs) console.log(`homógrafo: ${h.ko} → ${h.entradas.join(" | ")}`);
for (const t of out.targetInsideWord.slice(0, 20)) console.log(`alvo: ${t.sentence} '${t.target}' — ${t.motivo}\n    ${t.frase}`);
