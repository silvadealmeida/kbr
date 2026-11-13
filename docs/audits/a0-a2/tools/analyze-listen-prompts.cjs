/**
 * Auditoria — mede com precisão o padrão "enunciado pede um constituinte,
 * gabarito exige a frase inteira" nos itens de escuta. Read-only.
 *
 * Variante contada como "resolve" apenas quando uma `acceptedAnswers` é um
 * fragmento real do gabarito (conteúdo a menos, não só pontuação diferente).
 *
 * Uso: node docs/audits/a0-a2/tools/analyze-listen-prompts.cjs
 * Saída: docs/audits/a0-a2/data/listen-prompt-findings.json
 */
const fs = require("node:fs");
const path = require("node:path");

const ROOT = path.resolve(__dirname, "..", "..", "..", "..");
const data = require(path.join(ROOT, "docs/audits/a0-a2/data/content-dump.json"));

const FRAGMENT =
  /escreva (?:o|a|os|as) (?:n[úu]mero|n[úu]meros|idade|profiss[ãa]o|hora|hor[áa]rio|dia|valor|pre[çc]o|lugar|local|nome|atividade|a[çc][ãa]o|frequ[êe]ncia|descri[çc][ãa]o|motivo|raz[ãa]o|causa|resposta|parte|informa[çc][ãa]o|detalhe|endere[çc]o|contato|op[çc][ãa]o|pedido|sugest[ãa]o|compara[çc][ãa]o|diferen[çc]a|experi[êe]ncia|desculpa|decis[ãa]o|condi[çc][ãa]o|desfecho|complica[çc][ãa]o|justificativa|conselho|opini[ãa]o)/i;

const strip = (s) => s.replace(/[.,!?;:…]/g, "").replace(/\s+/g, " ").trim();
const tokens = (s) => strip(s).split(" ").filter(Boolean);

const rows = [];
let totalListen = 0;
for (const course of ["a1", "a2"]) {
  for (const step of [...data[`${course}Lessons`], ...data[`${course}Checkpoints`]]) {
    for (const ex of step.exercises) {
      if (ex.type !== "listen") continue;
      totalListen += 1;
      if (!FRAGMENT.test(ex.prompt)) continue;
      const answer = strip(ex.answer);
      const answerWords = tokens(answer).length;
      // fragmento real = variante com pelo menos uma palavra a menos (e não só pontuação)
      const fragmentos = (ex.acceptedAnswers || [])
        .map(strip)
        .filter((a) => a && a !== answer && tokens(a).length < answerWords);
      if (fragmentos.length === 0)
        rows.push({ item: ex.id, step: step.id, prompt: ex.prompt, answer: ex.answer, accepted: ex.acceptedAnswers || [], palavras: answerWords });
    }
  }
}

const byStep = {};
for (const r of rows) byStep[r.step] = (byStep[r.step] || 0) + 1;

fs.writeFileSync(
  path.join(ROOT, "docs/audits/a0-a2/data/listen-prompt-findings.json"),
  JSON.stringify({ totalListen, promptsPorFragmento: rows.length, porLicao: byStep, rows }, null, 2),
);
console.log(`itens listen no corpus: ${totalListen}`);
console.log(`enunciado pede constituinte e NENHUMA variante de fragmento é aceita: ${rows.length}`);
console.log(Object.entries(byStep).map(([k, v]) => `${k}:${v}`).join("  "));
for (const r of rows.slice(0, 10)) console.log(`- ${r.item} (${r.palavras} palavras): “${r.prompt}” → aceita só “${r.answer}”`);
