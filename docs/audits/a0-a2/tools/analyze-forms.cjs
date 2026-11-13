/**
 * Auditoria — superfícies de alta precisão (numeral×contador e irregulares).
 * Read-only, triagem determinística. As listas são fechadas para minimizar
 * falso positivo; toda ocorrência ainda é confirmada na revisão humana.
 *
 * Uso: node docs/audits/a0-a2/tools/analyze-forms.cjs
 * Saída: docs/audits/a0-a2/data/form-findings.json
 *
 * Regras aplicadas:
 *  - numerais sino-coreanos (일/이/삼/…) colados em contador que pede numeral
 *    NATIVO (개·명·잔·병·살·켤레·그릇·시간). Contadores que pedem sino-coreano
 *    (층·번·일·월·년·초·인분) ficam deliberadamente fora.
 *  - formas irregulares que não existem no coreano padrão (lista fechada).
 */
const fs = require("node:fs");
const path = require("node:path");

const ROOT = path.resolve(__dirname, "..", "..", "..", "..");
const data = require(path.join(ROOT, "docs/audits/a0-a2/data/content-dump.json"));

const NATIVE_COUNTERS = /(?<![가-힣])(?:일|이|삼|사|오|육|칠|팔|구|십|백)\s?(개|명|잔|병|살|켤레|그릇|시간)(?:은|는|이|가|을|를|과|와|도|만|처럼|보다|부터|까지)?(?![가-힣])/g;

const BAD_FORMS = [
  ["듣어요", "듣다 → 들어요"],
  ["듣었", "듣다 → 들었-"],
  ["덥어요", "덥다 → 더워요"],
  ["춥어요", "춥다 → 추워요"],
  ["쉽어요", "쉽다 → 쉬워요"],
  ["어렵어요", "어렵다 → 어려워요"],
  ["무겁어요", "무겁다 → 무거워요"],
  ["가볍어요", "가볍다 → 가벼워요"],
  ["뜨겁어요", "뜨겁다 → 뜨거워요"],
  ["차갑어요", "차갑다 → 차가워요"],
  ["다르어요", "다르다 → 달라요"],
  ["모르어요", "모르다 → 몰라요"],
  ["부르어요", "부르다 → 불러요"],
  ["빠르어요", "빠르다 → 빨라요"],
  ["쓰어요", "쓰다 → 써요"],
  ["짓어요", "짓다 → 지어요"],
  ["안되요", "안 돼요"],
  ["되요", "돼요"],
  ["없어세요", "honorífico negativo: 안 계세요"],
];

const findings = [];
function scan(where, text) {
  if (typeof text !== "string" || !/[가-힣]/.test(text)) return;
  let m;
  NATIVE_COUNTERS.lastIndex = 0;
  while ((m = NATIVE_COUNTERS.exec(text)))
    findings.push({ where, kind: "numeral-sino-com-contador-nativo", hit: m[0], text });
  for (const [bad, why] of BAD_FORMS) {
    if (text.includes(bad)) findings.push({ where, kind: "forma-irregular-inexistente", hit: bad, motivo: why, text });
  }
}

const collect = (ex) => {
  const t = [];
  for (const s of [ex.prompt, ex.text, ex.answer, ex.audioText, ex.question, ...(ex.acceptedAnswers || [])]) if (typeof s === "string") t.push(s);
  for (const o of ex.options || []) t.push(typeof o === "string" ? o : o.label);
  return t;
};

for (const course of ["a1", "a2"]) {
  for (const l of data[`${course}Lessons`]) {
    for (const d of l.dialogue) scan(`${l.id}/${d.id} fala`, d.ko);
    for (const p of l.intro) scan(`${l.id}/intro`, p.ko);
    for (const g of l.grammar || []) for (const e of g.examples) scan(`${g.id} exemplo`, e.ko);
    for (const s of l.summary || []) scan(`${l.id}/sum`, s);
    for (const ex of l.exercises) for (const t of collect(ex)) scan(ex.id, t);
  }
  for (const c of data[`${course}Checkpoints`]) for (const ex of c.exercises) for (const t of collect(ex)) scan(`${c.id}/${ex.id}`, t);
}
for (const s of data.sentences) scan(`frase ${s.id}`, s.ko);
for (const v of data.vocab) scan(`vocab ${v.id}`, `${v.ko} ${v.audioText || ""}`);
for (const w of data.hangul.words) scan(`hangul palavra ${w.id}`, w.ko);
for (const r of data.hangul.rules) for (const e of r.examples) scan(`hangul regra ${r.id}`, `${e.written} → ${e.spoken}`);

const merged = new Map();
for (const f of findings) merged.set(`${f.where}|${f.kind}|${f.hit}`, f);
const list = [...merged.values()];

fs.writeFileSync(path.join(ROOT, "docs/audits/a0-a2/data/form-findings.json"), JSON.stringify(list, null, 2));
console.log(`ocorrências: ${list.length}`);
for (const f of list) console.log(`- [${f.kind}] ${f.where} :: '${f.hit}' — ${f.text}`);
