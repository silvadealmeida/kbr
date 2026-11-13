/**
 * Auditoria 12B — alomorfia de partícula nos datasets B1 (read-only).
 * Portado de `docs/audits/a0-a2/tools/analyze-particles.cjs` (Fase 12A),
 * aplicado a lições e checkpoints B1. Precisão alta: só julga quando o
 * radical antes da partícula é substantivo conhecido do registro canônico
 * (Hangul + A1 + A2 + B1) ou quando a resposta do cloze preenche a lacuna
 * colada a uma partícula de caso.
 *
 * Uso: node docs/audits/b1/tools/analyze-particles.cjs
 * Saída: docs/audits/b1/data/particle-findings.json
 */
const fs = require("node:fs");
const path = require("node:path");

const ROOT = path.resolve(__dirname, "..", "..", "..", "..");
const data = require(path.join(ROOT, "docs/audits/b1/data/content-dump.json"));

const hasFinal = (ch) => {
  const nfd = ch.normalize("NFD");
  return nfd.length === 3 && nfd.charCodeAt(2) >= 0x11a8;
};
const JONG_R = 0x11ab;
const isRieulFinal = (ch) => {
  const nfd = ch.normalize("NFD");
  return nfd.length === 3 && nfd.charCodeAt(2) === JONG_R;
};
const NEEDS_BATCHIM = { 은: 1, 이: 1, 을: 1, 과: 1 };
const NEEDS_OPEN = { 는: 1, 가: 1, 를: 1, 와: 1 };
const HANGUL = /[가-힣]/;

const NOUNS = new Set(
  data.vocab
    .filter((v) => v.pos === undefined || v.pos === "substantivo" || v.pos === "numeral" || v.pos === "pronome")
    .map((v) => v.ko),
);

const wrong = [];
const revisar = [];

function junction(stepId, exId, answer, filled, answerStart, como) {
  const after = filled.slice(answerStart + answer.length);
  const m = after.match(/^(은|는|이|가|을|를|과|와)(?![가-힣])/);
  if (!m) return;
  const part = m[1];
  const last = answer[answer.length - 1];
  if (!HANGUL.test(last)) return;
  const closed = hasFinal(last);
  const rec = { step: stepId, exercise: exId, answer, part, trecho: answer + part, frase: filled, como };
  if (NEEDS_BATCHIM[part] && !closed) wrong.push({ ...rec, motivo: `'${part}' exige 받침; '${last}' termina em vogal` });
  else if (NEEDS_OPEN[part] && isRieulFinal(last)) revisar.push({ ...rec, motivo: `ㄹ final + '${part}': confirme o padrão escolhido pelo curso` });
  else if (NEEDS_OPEN[part] && closed) wrong.push({ ...rec, motivo: `'${part}' exige sílaba aberta; '${last}' tem 받침 ${last.normalize("NFD")[2]}` });
}

for (const course of ["b1"]) {
  for (const step of [...data[`${course}Lessons`], ...data[`${course}Checkpoints`]]) {
    for (const ex of step.exercises) {
      if (ex.type === "cloze") {
        const blank = ex.prompt.search(/_{2,}/);
        if (blank < 0) continue;
        for (const answer of [ex.answer, ...(ex.acceptedAnswers || [])]) {
          const filled = `${ex.prompt.slice(0, blank)}${answer}${ex.prompt.slice(blank).replace(/_{2,}/, "")}`;
          if (!/^[가-힣]+$/.test(answer.replace(/\s/g, ""))) continue;
          if (answer.length < 2) continue;
          junction(step.id, ex.id, answer, filled, blank, "cloze preenchido");
        }
        continue;
      }
      const koStrings = [ex.answer, ex.audioText, ex.text, ...(ex.acceptedAnswers || [])].filter(
        (s) => typeof s === "string" && HANGUL.test(s),
      );
      if (ex.type === "cloze") continue;
      for (const s of koStrings) {
        for (const tok of s.split(/\s+/)) {
          const m = tok.match(/^([가-힣]+)(은|는|이|가|을|를|과|와)(?![가-힣])/);
          if (!m) continue;
          const stem = m[1];
          const part = m[2];
          if (!NOUNS.has(stem)) continue;
          const last = stem[stem.length - 1];
          const closed = hasFinal(last);
          const rec = { step: step.id, exercise: ex.id, answer: stem, part, trecho: m[0], frase: s, como: `${ex.type} (substantivo conhecido)` };
          if (NEEDS_BATCHIM[part] && !closed) wrong.push({ ...rec, motivo: `'${part}' exige 받침; '${last}' termina em vogal` });
          else if (NEEDS_OPEN[part] && isRieulFinal(last)) revisar.push({ ...rec, motivo: `ㄹ final + '${part}': confirme o padrão` });
          else if (NEEDS_OPEN[part] && closed) wrong.push({ ...rec, motivo: `'${part}' exige sílaba aberta; '${last}' tem 받침` });
        }
      }
    }
  }
}

// varredura adicional: prosa coreana ensinada (intro/dialogue/grammar examples
// e frases contextuais B1) com substantivo conhecido + partícula de caso.
for (const l of data.b1Lessons) {
  const koTexts = [];
  for (const p of l.intro || []) if (p.ko) koTexts.push([`${l.id}.intro`, p.ko]);
  for (const d of l.dialogue || []) koTexts.push([`${l.id}.dialogue`, d.ko]);
  for (const g of l.grammar || []) for (const e of g.examples || []) koTexts.push([g.id, e.ko]);
  for (const [where, s] of koTexts) {
    for (const tok of s.split(/\s+/)) {
      const m = tok.match(/^([가-힣]+)(은|는|이|가|을|를|과|와)(?![가-힣])/);
      if (!m) continue;
      const stem = m[1];
      const part = m[2];
      if (!NOUNS.has(stem)) continue;
      const last = stem[stem.length - 1];
      const closed = hasFinal(last);
      const rec = { step: where, exercise: "(prosa ensinada)", answer: stem, part, trecho: m[0], frase: s, como: "prosa B1 (substantivo conhecido)" };
      if (NEEDS_BATCHIM[part] && !closed) wrong.push({ ...rec, motivo: `'${part}' exige 받침; '${last}' termina em vogal` });
      else if (NEEDS_OPEN[part] && isRieulFinal(last)) revisar.push({ ...rec, motivo: `ㄹ final + '${part}': confirme o padrão` });
      else if (NEEDS_OPEN[part] && closed) wrong.push({ ...rec, motivo: `'${part}' exige sílaba aberta; '${last}' tem 받침` });
    }
  }
}

for (const s of data.sentences.filter((x) => x.id.startsWith("sent:b1-"))) {
  for (const tok of s.ko.split(/\s+/)) {
    const m = tok.match(/^([가-힣]+)(은|는|이|가|을|를|과|와)(?![가-힣])/);
    if (!m) continue;
    const stem = m[1];
    const part = m[2];
    if (!NOUNS.has(stem)) continue;
    const last = stem[stem.length - 1];
    const closed = hasFinal(last);
    const rec = { step: s.id, exercise: "(frase contextual)", answer: stem, part, trecho: m[0], frase: s.ko, como: "frase B1 (substantivo conhecido)" };
    if (NEEDS_BATCHIM[part] && !closed) wrong.push({ ...rec, motivo: `'${part}' exige 받침; '${last}' termina em vogal` });
    else if (NEEDS_OPEN[part] && isRieulFinal(last)) revisar.push({ ...rec, motivo: `ㄹ final + '${part}': confirme o padrão` });
    else if (NEEDS_OPEN[part] && closed) wrong.push({ ...rec, motivo: `'${part}' exige sílaba aberta; '${last}' tem 받침` });
  }
}

const key = (r) => `${r.step}|${r.exercise}|${r.trecho}`;
const dedupe = (arr) => {
  const seen = new Set();
  return arr.filter((r) => (seen.has(key(r)) ? false : (seen.add(key(r)), true)));
};
const W = dedupe(wrong);
const R = dedupe(revisar);

fs.writeFileSync(path.join(ROOT, "docs/audits/b1/data/particle-findings.json"), JSON.stringify({ wrong: W, revisar: R }, null, 2));
console.log(`junções de partícula erradas: ${W.length}; casos ㄹ/ambíguos a revisar: ${R.length}`);
for (const w of W) console.log(`- ${w.step}/${w.exercise} [${w.como}] '${w.trecho}' — ${w.motivo}\n    ${w.frase}`);
for (const r of R) console.log(`? ${r.step}/${r.exercise} '${r.trecho}' — ${r.motivo}`);
