/**
 * Auditoria — primeira ocorrência de lexias novas em material ENSINADO ×
 * material AVALIADO, na ordem real do curso. Read-only, triagem.
 *
 * Uso: node docs/audits/a0-a2/tools/analyze-lexicon-first-use.cjs
 * Saída: docs/audits/a0-a2/data/lexicon-first-use.json
 */
const fs = require("node:fs");
const path = require("node:path");

const ROOT = path.resolve(__dirname, "..", "..", "..", "..");
const data = require(path.join(ROOT, "docs/audits/a0-a2/data/content-dump.json"));

/** ordem canônica: módulos na sequência do blueprint, lições 1–5 e depois o checkpoint */
function sequence(course) {
  const bp = data[`${course}Blueprint`];
  const out = [];
  for (const m of bp.modules) {
    out.push(...bp.lessons.filter((l) => l.moduleId === m.id).map((l) => l.id));
    out.push(...bp.checkpoints.filter((c) => c.moduleId === m.id).map((c) => c.id));
  }
  const content = new Map();
  for (const l of data[`${course}Lessons`]) content.set(l.id, l);
  for (const c of data[`${course}Checkpoints`]) content.set(c.id, c);
  return out.filter((id) => content.has(id)).map((id) => content.get(id));
}

const a1 = sequence("a1");
const a2 = sequence("a2");
const allSteps = [...a1, ...a2];
const pos = new Map(allSteps.map((s, i) => [s.id, i]));

const taughtText = (l) => {
  const b = [];
  for (const x of l.dialogue || []) b.push(x.ko);
  for (const p of l.intro || []) b.push(p.ko || "", p.body || "");
  for (const g of l.grammar || []) {
    b.push(g.form || "", g.titlePt || "", g.explanationPt || "");
    for (const e of g.examples || []) b.push(e.ko, e.pt || "");
  }
  for (const s of l.summary || []) b.push(s);
  return b.join(" ");
};
const gradedText = (l) => (l.exercises || []).map((e) => JSON.stringify(e)).join(" ");

/** lição em que a forma entra no léxico canônico */
const vocabLesson = new Map();
for (const v of data.vocab) if (!vocabLesson.has(v.ko)) vocabLesson.set(v.ko, v.lesson);

const CANDIDATAS = [
  "그녀", "환자", "마을", "상대방", "이웃", "동기", "종류", "룸메이트", "공간", "규정",
  "팀장", "매장", "기간", "배움", "고마움", "쓰레기", "소풍", "경우", "부분", "번역",
  "기기", "예절", "질문", "절약", "기부", "후기", "오지", "소녀", "월급", "이력서",
  "자기소개서", "자격증", "지원하다", "포함하다", "확인서", "분실물", "수화물", "예약",
];

const rows = [];
for (const w of CANDIDATAS) {
  let firstTaught = null;
  let firstGraded = null;
  for (const s of allSteps) {
    if (!firstTaught && taughtText(s).includes(w)) firstTaught = s.id;
    if (!firstGraded && gradedText(s).includes(w)) firstGraded = s.id;
    if (firstTaught && firstGraded) break;
  }
  const lex = vocabLesson.get(w) || null;
  const emLexicoAntesDoExercicio = lex && firstGraded ? (pos.get(lex) ?? Number.POSITIVE_INFINITY) <= pos.get(firstGraded) : null;
  rows.push({
    forma: w,
    entradaNoLexico: lex,
    primeiroTextoEnsinado: firstTaught,
    primeiroExercicio: firstGraded,
    cobradaAntesDeQualquerEnsino: !!(firstGraded && !firstTaught),
    cobradaAntesDaPropriaEntradaCanonica: !!(firstGraded && lex && pos.get(lex) > pos.get(firstGraded)),
  });
}

fs.writeFileSync(path.join(ROOT, "docs/audits/a0-a2/data/lexicon-first-use.json"), JSON.stringify(rows, null, 2));
const ruins = rows.filter((r) => r.cobradaAntesDeQualquerEnsino || r.cobradaAntesDaPropriaEntradaCanonica);
console.log(`lexias testadas: ${rows.length}; com cobrança antecipada: ${ruins.length}`);
for (const r of ruins) console.log(`- ${r.forma}: léxico ${r.entradaNoLexico || "—"} | ensinada em ${r.primeiroTextoEnsinado || "NUNCA"} | primeiro exercício ${r.primeiroExercicio}`);
