/**
 * Auditoria — produção digitada: a resposta exige pontuação idêntica?
 * Read-only. Reproduz a regra real de `normalize()` de `src/lib/exercises/index.ts`
 * (NFC + trim + espaços colapsados + minúsculas; NÃO remove pontuação) e conta,
 * em todo o corpus, os itens de resposta digitada em que a mesma frase SEM
 * ponto final (ou sem `?`) seria rejeitada.
 *
 * Uso: node docs/audits/a0-a2/tools/analyze-typed-normalization.cjs
 * Saída: docs/audits/a0-a2/data/typed-normalization.json
 */
const fs = require("node:fs");
const path = require("node:path");

const ROOT = path.resolve(__dirname, "..", "..", "..", "..");
const data = require(path.join(ROOT, "docs/audits/a0-a2/data/content-dump.json"));

const normalize = (s) => s.normalize("NFC").trim().replace(/\s+/g, " ").toLocaleLowerCase("pt-BR");

const rows = [];
let digitados = 0;
for (const course of ["a1", "a2"]) {
  for (const step of [...data[`${course}Lessons`], ...data[`${course}Checkpoints`]]) {
    for (const ex of step.exercises) {
      const digitavel = ex.type === "translate" || ex.type === "listen" || ex.type === "cloze";
      if (!digitavel) continue;
      const alvo = ex.type === "translate" && ex.direction === "ko-pt" ? ex.answer : ex.answer;
      if (typeof alvo !== "string" || !alvo.trim()) continue;
      digitados += 1;
      const aceitas = new Set([alvo, ...(ex.acceptedAnswers || [])].map(normalize));
      const semPonto = normalize(alvo.replace(/[.?…]+$/, ""));
      const comPonto = normalize(alvo + ".");
      const semPontoOk = aceitas.has(semPonto);
      const comPontoOk = aceitas.has(comPonto) || !/[.?]$/.test(alvo.trim());
      const comInterrogacao = normalize(alvo.replace(/[.?…]+$/, "") + "?");
      rows.push({
        item: ex.id,
        step: step.id,
        type: ex.type,
        alvo,
        aceitaSemPontuacao: semPontoOk,
        aceitaComPonto: comPontoOk,
        aceitaInterrogacao: aceitas.has(comInterrogacao),
        aceitas: [alvo, ...(ex.acceptedAnswers || [])],
      });
    }
  }
}

const risco = rows.filter((r) => !r.aceitaSemPontuacao);
const porCurso = {};
for (const r of risco) porCurso[r.step.slice(0, 3)] = (porCurso[r.step.slice(0, 3)] || 0) + 1;

fs.writeFileSync(
  path.join(ROOT, "docs/audits/a0-a2/data/typed-normalization.json"),
  JSON.stringify({ itensDeRespostaDigitada: digitados, exigemPontuacaoIdentica: risco.length, porPrefixo: porCurso, rows: risco }, null, 2),
);
console.log(`itens de resposta digitada: ${digitados}`);
console.log(`que só aceitam a forma pontuada exata: ${risco.length} (${((risco.length / digitados) * 100).toFixed(1)}%)`);
console.log(JSON.stringify(porCurso));
for (const r of risco.slice(0, 8)) console.log(`- ${r.item} [${r.type}] alvo “${r.alvo}” → digitado sem ponto é rejeitado`);
