/**
 * Auditoria — concordância de partícula em `cloze` (precisão alta) e em
 * `translate/listen` quando o gabarito coreano é uma frase com partícula de
 * caso logo após um substantivo. Read-only.
 *
 * Ponto cego conhecido: o validador do curso (`validate-content.ts`) checa a
 * resposta do `cloze` isolada; nada verifica se a frase RESULTANTE, com a
 * resposta inserida, é coreano bem formado. É aqui que entram erros de
 * alomorfia 은/는, 이/가, 을/를, 과/와.
 *
 * Uso: node docs/audits/a0-a2/tools/analyze-particles.cjs
 * Saída: docs/audits/a0-a2/data/particle-findings.json
 */
const fs = require("node:fs");
const path = require("node:path");

const ROOT = path.resolve(__dirname, "..", "..", "..", "..");
const data = require(path.join(ROOT, "docs/audits/a0-a2/data/content-dump.json"));

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

// Vocabulário conhecido = base para decidir se um token é substantivo (e a
// partícula depois dele é de caso, não desinência verbal).
const NOUNS = new Set(
  data.vocab
    .filter((v) => v.pos === undefined || v.pos === "substantivo" || v.pos === "numeral" || v.pos === "pronome")
    .map((v) => v.ko),
);

const wrong = [];
const revisar = [];

/**
 * `filled` = texto com a lacuna preenchida; `answerStart` = índice da resposta
 * dentro de `filled`. Só olhamos a partícula que cola na resposta.
 */
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

for (const course of ["a1", "a2"]) {
  for (const step of [...data[`${course}Lessons`], ...data[`${course}Checkpoints`]]) {
    for (const ex of step.exercises) {
      if (ex.type === "cloze") {
        const blank = ex.prompt.search(/_{2,}/);
        if (blank < 0) continue;
        for (const answer of [ex.answer, ...(ex.acceptedAnswers || [])]) {
          const filled = `${ex.prompt.slice(0, blank)}${answer}${ex.prompt.slice(blank).replace(/_{2,}/, "")}`;
          if (!/^[가-힣]+$/.test(answer.replace(/\s/g, ""))) continue; // resposta monossilábica/sufixo: pula
          if (answer.length < 2) continue; // partículas/terminações não são substantivos
          junction(step.id, ex.id, answer, filled, blank, "cloze preenchido");
        }
        continue;
      }
      // texto coreano avaliado fora de lacuna: só julga junções em que o
      // radical é um substantivo conhecido do currículo (alta precisão).
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
          if (!NOUNS.has(stem)) continue; // só radicais que o curso ensinou como nome
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

const key = (r) => `${r.step}|${r.exercise}|${r.trecho}`;
const dedupe = (arr) => {
  const seen = new Set();
  return arr.filter((r) => (seen.has(key(r)) ? false : (seen.add(key(r)), true)));
};
const W = dedupe(wrong);
const R = dedupe(revisar);

fs.writeFileSync(path.join(ROOT, "docs/audits/a0-a2/data/particle-findings.json"), JSON.stringify({ wrong: W, revisar: R }, null, 2));
console.log(`junções de partícula erradas: ${W.length}; casos ㄹ/ambíguos a revisar: ${R.length}`);
for (const w of W) console.log(`- ${w.step}/${w.exercise} [${w.como}] '${w.trecho}' — ${w.motivo}\n    ${w.frase}`);
for (const r of R) console.log(`? ${r.step}/${r.exercise} '${r.trecho}' — ${r.motivo}`);
