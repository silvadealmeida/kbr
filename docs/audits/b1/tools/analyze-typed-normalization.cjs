/**
 * Auditoria 12B — itens digitados do B1 que só aceitam a pontuação exata.
 * Portado de `docs/audits/a0-a2/tools/analyze-typed-normalization.cjs` (12A).
 * Read-only. Reproduz a regra real de `normalize()` de
 * `src/lib/exercises/index.ts` (NFC + trim + espaços colapsados + minúsculas;
 * NÃO remove pontuação) e conta, em todo o corpus B1, os itens de resposta
 * digitada em que a mesma frase SEM ponto final seria rejeitada.
 *
 * A 12A gerou variantes de pontuação apenas no builder do A2; o builder do B1
 * (`src/content/curriculum/b1/lessons/shared.ts`) não usa
 * `terminalPunctuationVariants`, então esta medição é a dívida remanescente.
 *
 * Uso: node docs/audits/b1/tools/analyze-typed-normalization.cjs
 * Saída: docs/audits/b1/data/typed-normalization.json
 */
const fs = require("node:fs");
const path = require("node:path");

const ROOT = path.resolve(__dirname, "..", "..", "..", "..");
const data = require(path.join(ROOT, "docs/audits/b1/data/content-dump.json"));

const normalize = (s) => s.normalize("NFC").trim().replace(/\s+/g, " ").toLocaleLowerCase("pt-BR");

const rows = [];
let digitados = 0;
for (const step of [...data.b1Lessons, ...data.b1Checkpoints]) {
  for (const ex of step.exercises) {
    const digitavel = ex.type === "translate" || ex.type === "listen" || ex.type === "cloze";
    if (!digitavel) continue;
    const alvo = ex.answer;
    if (typeof alvo !== "string" || !alvo.trim()) continue;
    digitados += 1;
    const aceitas = new Set([alvo, ...(ex.acceptedAnswers || [])].map(normalize));
    const semPonto = normalize(alvo.replace(/[.?…]+$/, ""));
    const comPonto = normalize(alvo + ".");
    const semPontoOk = aceitas.has(semPonto);
    const comPontoOk = aceitas.has(comPonto) || !/[.?]$/.test(alvo.trim());
    rows.push({
      item: ex.id,
      step: step.id,
      type: ex.type,
      direction: ex.direction,
      alvo,
      aceitaSemPontuacao: semPontoOk,
      aceitaComPonto: comPontoOk,
      aceitas: [alvo, ...(ex.acceptedAnswers || [])],
    });
  }
}

const risco = rows.filter((r) => !r.aceitaSemPontuacao);
const porTipo = {};
for (const r of risco) porTipo[`${r.type}${r.direction ? ":" + r.direction : ""}`] = (porTipo[`${r.type}${r.direction ? ":" + r.direction : ""}`] || 0) + 1;

fs.writeFileSync(
  path.join(ROOT, "docs/audits/b1/data/typed-normalization.json"),
  JSON.stringify({ totalDigitados: rows.length, digitados: risco.length, porTipo, rows: risco }, null, 2),
);
console.log(`itens de resposta digitada no B1: ${rows.length}`);
console.log(`que só aceitam a forma pontuada exata: ${risco.length} (${((risco.length / rows.length) * 100).toFixed(1)}%)`);
console.log(JSON.stringify(porTipo));
for (const r of risco.slice(0, 12)) console.log(`- ${r.item} [${r.type}${r.direction ? ":" + r.direction : ""}] alvo “${r.alvo}” → digitado sem ponto é rejeitado`);
