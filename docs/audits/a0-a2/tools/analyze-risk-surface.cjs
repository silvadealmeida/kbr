/**
 * Auditoria PASS A/B — superfície de risco linguístico (read-only).
 * Uso: node docs/audits/a0-a2/tools/analyze-risk-surface.cjs
 * Saída: docs/audits/a0-a2/data/risk-surface.txt (uma linha por ocorrência)
 *
 * Agrupa todas as ocorrências de formas onde um LLM generativo costuma errar
 * em coreano, com o ID do item, para revisão humana/modelo focal. É triagem de
 * evidência: não classifica certo/errado.
 */
const fs = require("node:fs");
const path = require("node:path");

const ROOT = path.resolve(__dirname, "..", "..", "..", "..");
const data = require(path.join(ROOT, "docs/audits/a0-a2/data/content-dump.json"));

const GROUPS = [
  ["parentesco com gênero do falante", /(형|오빠|누나|언니|남편|아내|처남|시동생|조카)/],
  ["honorífico lexicalizado", /(드리|뵈|뵙|계시|세상| 편무|진지|여쭤|쭈)/],
  ["subject honorific -시-", /시(?:다|는|렀|러|면|고|เซ)/],
  ["counters", /(명|개|잔|병| 팩|그릇| 켤레| 대| 자| 살| 번| 시| 분| 초| 일| 주| 달| 년)/],
  ["numerais nativos × sino", /(한|두|세|네|다섯|여섯|일|이|삼|사|오|육)\s*(시|분|년|월|일|개|명|잔|병)/],
  ["-에서 × -에", /에서|([^가-힣]에\s)/],
  ["-으로 × -로", /[으]?로\b/],
  ["-는 데 × -는 것", /(는|ㄴ)\s?(데|것)/],
  ["-아/어 본 적이 × -아/어 봤다", /(아|어|여)\s?본\s?(적이|적|적\s)?|(아|어|여)\s?봤/],
  ["irregulares ㄷ/ㅂ/ㅅ/르/으", /(들[어옵ㅅ]|걸[어]|서[어]|더[워]|추[워]|기[뻘]|알[라]|멀[리]|러[워]|르)/],
  ["negativa 못 × 안", /(못|안)\s?[가-힣]/],
  ["conectores de fala", /(라고|자고|라고\s?해요|냐고| 잖아요| 대요| 거래요)/],
  ["expressões de cortesia/apologia", /(죄송|미안|실례|감사|부탁|폐 폐| 폐를| 폐)/],
  ["falsos amigos coreano-português", /(야채|생선|회전|소주| 서비스| 아저씨| 아주머니| 할머니| 할아버지)/],
  ["pronomes de 3ª pessoa", /(그녀|그 사람|그분|저분|이 사람)/],
  ["tópico × foco (은/는 × 이/가)", /(는|은)\s/],
];

const rows = [];
function emit(stepId, where, ko, extra) {
  for (const [group, re] of GROUPS) if (re.test(ko)) rows.push({ group, step: stepId, where, ko, extra });
}

for (const course of ["a1", "a2"]) {
  for (const l of data[`${course}Lessons`]) {
    for (const d of l.dialogue || []) emit(l.id, d.id, d.ko, d.pt);
    for (const p of l.intro || []) if (p.ko) emit(l.id, `${l.id}/intro`, p.ko, p.title);
    for (const g of l.grammar || []) for (const e of g.examples || []) emit(l.id, g.id, e.ko, e.pt);
    for (const ex of l.exercises || []) {
      const ko = [ex.audioText, ex.text, ex.answer, ...(ex.acceptedAnswers || []), ...(ex.options || []).map((o) => (typeof o === "string" ? o : o.label))].filter((s) => typeof s === "string" && /[가-힣]/.test(s));
      for (const k of ko) emit(l.id, ex.id, k, ex.prompt);
    }
  }
  for (const c of data[`${course}Checkpoints`])
    for (const ex of c.exercises || []) {
      const ko = [ex.audioText, ex.text, ex.answer, ...(ex.acceptedAnswers || []), ...(ex.options || []).map((o) => (typeof o === "string" ? o : o.label))].filter((s) => typeof s === "string" && /[가-힣]/.test(s));
      for (const k of ko) emit(c.id, ex.id, k, ex.prompt);
    }
}
for (const s of data.sentences) emit("vocab", s.vocabId, s.ko, s.pt);
for (const v of data.vocab) emit("vocab", v.id, v.audioText || v.ko, v.pt);
for (const w of data.hangul.words) emit("hangul", w.id, w.ko, w.pt);
for (const r of data.hangul.rules) for (const e of r.examples) emit("hangul", r.id, `${e.written} → ${e.spoken}`, e.note || r.explanation);

const byGroup = new Map();
for (const r of rows) {
  if (!byGroup.has(r.group)) byGroup.set(r.group, []);
  byGroup.get(r.group).push(r);
}

const lines = [];
for (const [group, list] of byGroup) {
  lines.push(`\n## ${group} — ${list.length} ocorrências`);
  for (const r of list) lines.push(`- [${r.step}] ${r.where} :: ${r.ko}  || ${r.extra || ""}`);
}
fs.writeFileSync(path.join(ROOT, "docs/audits/a0-a2/data/risk-surface.txt"), lines.join("\n") + "\n");
console.log(JSON.stringify(Object.fromEntries([...byGroup].map(([g, l]) => [g, l.length])), null, 2));
