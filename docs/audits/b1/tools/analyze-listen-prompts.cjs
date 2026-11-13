/**
 * Auditoria 12B — enunciados dos itens de escuta B1 (read-only).
 *
 * Metodologia portada de `docs/audits/a0-a2/tools/analyze-listen-prompts.cjs`
 * (Fase 12A). No B1 o material inteiro é posterior à 12A e não foi reescrito,
 * portanto a correção de 2026-11-13 ("a frase completa que contém …") não se
 * aplicou aqui. Este analisador mede:
 *  1. bucket A (12A): enunciado pede um constituinte e nenhuma variante de
 *     fragmento é aceita;
 *  2. bucket B (B1): todo item `listen` cujo enunciado NÃO instrui transcrever
 *     a frase completa (o gabarito exige a frase inteira com correção exata).
 *
 * Uso: node docs/audits/b1/tools/analyze-listen-prompts.cjs
 * Saída: docs/audits/b1/data/listen-prompt-findings.json
 */
const fs = require("node:fs");
const path = require("node:path");

const ROOT = path.resolve(__dirname, "..", "..", "..", "..");
const data = require(path.join(ROOT, "docs/audits/b1/data/content-dump.json"));

const FRAGMENT =
  /escreva (?:o|a|os|as) (?:n[úu]mero|n[úu]meros|idade|profiss[ãa]o|hora|hor[áa]rio|dia|valor|pre[çc]o|lugar|local|nome|atividade|a[çc][ãa]o|frequ[êe]ncia|descri[çc][ãa]o|motivo|raz[ãa]o|causa|resposta|parte|informa[çc][ãa]o|detalhe|endere[çc]o|contato|op[çc][ãa]o|pedido|sugest[ãa]o|compara[çc][ãa]o|diferen[çc]a|experi[êe]ncia|desculpa|decis[ãa]o|condi[çc][ãa]o|desfecho|complica[çc][ãa]o|justificativa|conselho|opini[ãa]o)/i;

const TRANSCRIPTION = /frase completa|ou[çc]a e escreva a frase|a frase que você ouviu/i;

const strip = (s) => s.replace(/[.,!?;:…]/g, "").replace(/\s+/g, " ").trim();
const tokens = (s) => strip(s).split(" ").filter(Boolean);

const bucketA = [];
const bucketB = [];
let totalListen = 0;
for (const step of [...data.b1Lessons, ...data.b1Checkpoints]) {
  for (const ex of step.exercises) {
    if (ex.type !== "listen") continue;
    totalListen += 1;
    const answer = strip(ex.answer);
    const answerWords = tokens(answer).length;
    const fragmentos = (ex.acceptedAnswers || [])
      .map(strip)
      .filter((a) => a && a !== answer && tokens(a).length < answerWords);
    if (FRAGMENT.test(ex.prompt) && fragmentos.length === 0)
      bucketA.push({ item: ex.id, step: step.id, prompt: ex.prompt, answer: ex.answer, accepted: ex.acceptedAnswers || [], palavras: answerWords });
    if (!TRANSCRIPTION.test(ex.prompt))
      bucketB.push({ item: ex.id, step: step.id, prompt: ex.prompt, answer: ex.answer, palavras: answerWords });
  }
}

const byStepA = {};
for (const r of bucketA) byStepA[r.step] = (byStepA[r.step] || 0) + 1;
const byStepB = {};
for (const r of bucketB) byStepB[r.step] = (byStepB[r.step] || 0) + 1;

fs.writeFileSync(
  path.join(ROOT, "docs/audits/b1/data/listen-prompt-findings.json"),
  JSON.stringify({ totalListen, promptsPorFragmento: bucketA.length, semInstrucaoDeFraseCompleta: bucketB.length, porLicaoA: byStepA, porLicaoB: byStepB, rowsA: bucketA, rowsB: bucketB }, null, 2),
);
console.log(`itens listen no B1: ${totalListen}`);
console.log(`bucket A (12A: enunciado pede constituinte, aceita só a frase inteira): ${bucketA.length}`);
console.log(`bucket B (enunciado não instrui transcrever a frase completa): ${bucketB.length}`);
for (const r of bucketA.slice(0, 12)) console.log(`A - ${r.item}: “${r.prompt}” → só aceita “${r.answer}”`);
for (const r of bucketB.slice(0, 12)) console.log(`B - ${r.item}: “${r.prompt}” → exige “${r.answer}”`);
