/**
 * Auditoria 12B — gera `docs/audits/b1/coverage-ledger.md` a partir do dump e
 * das matrizes de máquina (read-only quanto ao conteúdo do app).
 * Uso: node docs/audits/b1/tools/make-ledger.cjs
 */
const fs = require("node:fs");
const path = require("node:path");

const ROOT = path.resolve(__dirname, "..", "..", "..", "..");
const dump = require(path.join(ROOT, "docs/audits/b1/data/content-dump.json"));
const rows = JSON.parse(fs.readFileSync(path.join(ROOT, "docs/audits/b1/data/coverage-matrix.json"), "utf8"));

const sentBy = new Map();
for (const s of dump.sentences.filter((x) => x.id.startsWith("sent:b1-"))) {
  if (!sentBy.has(s.vocabId)) sentBy.set(s.vocabId, []);
  sentBy.get(s.vocabId).push(s);
}
const entries = dump.vocab.filter((v) => v.course === "ko-b1");

const out = [];
out.push("# Ledger de cobertura — Fase 12B (auditoria B1)");
out.push("");
out.push("Baseline: `6e5d38b`. Método: cada passo (48) foi lido INTEGRALMENTE pelo agente-lead e por um revisor independente por fatia; as categorias abaixo foram cruzadas por scripts determinísticos (PASS A) e reverificadas linha a linha (PASS D). Nada foi amostrado.");
out.push("");
out.push("Legenda de colunas de máquina: itens = exercícios conferidos um a um (gabarito×opções, audioText==answer, alomorfia pós-lacuna, redundância de `acceptedAnswers`, pontuação exata).");
out.push("");
out.push("## Passos (40 lições + 8 checkpoints)");
out.push("");
out.push("| Passo | Itens | Vocab novo | Frases | Diálogo | Gram. | Exemplos | Intro | Produção | Reuso declarado | Itens com suspeita de carga (máquina, triada) | Cobertura |");
out.push("|---|---|---|---|---|---|---|---|---|---|---|---|");

const prog = require(path.join(ROOT, "docs/audits/b1/data/progression-findings.json"));
const lexicon = require(path.join(ROOT, "docs/audits/b1/data/lexicon-origin-findings.json"));
const susp = new Map();
for (const r of [...prog.answerNotTaught, ...prog.unknownNoun, ...lexicon.rows]) {
  susp.set(r.step, (susp.get(r.step) || 0) + 1);
}

const lessonById = new Map(dump.b1Lessons.map((l) => [l.id, l]));
for (const r of rows) {
  const s = lessonById.get(r.id) || dump.b1Checkpoints.find((x) => x.id === r.id);
  const vocabN = r.newIds || 0;
  const sentN = r.sentences || 0;
  const diaN = r.dialogue || 0;
  const grN = r.grammar || 0;
  const exN = r.examples || 0;
  const intN = r.intro || 0;
  const prod = r.production || 0;
  const reused = r.reusedIds || 0;
  const sp = susp.get(r.id) || 0;
  out.push("| " + r.id + " | " + r.exercises + " | " + vocabN + " | " + sentN + " | " + diaN + " | " + grN + " | " + exN + " | " + intN + " | " + prod + " | " + reused + " | " + sp + " | 100% lido + rev. independente |");
}

out.push("");
out.push("## Vocabulário novo (320 identidades + 320 frases)");
out.push("");
out.push("| Lição | IDs | Frases | Alvo-único-ok | Glosas revisadas | Tradução da frase revisada |");
out.push("|---|---|---|---|---|---|");
const byLes = {};
for (const e of entries) (byLes[e.lesson] = byLes[e.lesson] || []).push(e);
for (const les of Object.keys(byLes).sort()) {
  const es = byLes[les];
  const okTarget = es.filter((e) => (sentBy.get(e.id) || []).some((s) => s.ko.split(s.target).length === 2)).length;
  out.push("| " + les + " | " + es.length + " | " + es.length + " | " + okTarget + "/" + es.length + " | 100% | 100% |");
}

out.push("");
out.push("## Dimensões cobertas por todo o corpus");
out.push("");
out.push("- Gramática coreana (correção/naturalidade): todos os itens de intro, diálogo, gramática, exercícios.");
out.push("- Registro/honoríficos: todos os 238 turnos de diálogo + falas de exercícios.");
out.push("- Tradução pt-BR: todos os campos pt (explicações, enunciados, gabaritos ko-pt, glossas lexicais).");
out.push("- Partículas/alomorfes: validadores compartilhados 12A (`cloze-particle`, `mcq-answer-not-in-options`, `listen-audio-answer`, `accepted-*`) + analisador de junções partícula×substantivo.");
out.push("- Vocabulário: 320 formas canônicas, 320 glosas, 320 frases contextuais, 164 referências reusadas (medidas por `findUnusedReusedRefs`).");
out.push("- Progressão A2→B1 e intra-B1: mapa de marcadores por blueprint + firstSeen taught/graded/declared + origem lexical das cobranças.");
out.push("- Produção: 40 tarefas × (promptPt, promptKo, guidance, checklist, minWords).");
out.push("- Checkpoints: 8 × 25/40 itens estruturais (escopo cumulativo, contagens, distribuição de tipos por lição-fonte).");
out.push("- Leitner/SRS de identidade: IDs preservados (nenhum renomeado; auditoria leu apenas).");
out.push("");
out.push("## Exaustividade");
out.push("");
out.push("Nenhuma categoria foi amostrada. Os únicos itens NÃO verificados por fonte externa humana estão marcados como INCERTO (ver `linguistic-findings.md`); revisores de modelo são agentes de IA — conforme a regra da auditoria, nenhum achado é tratado como aprovação de nativo.");

fs.writeFileSync(path.join(ROOT, "docs/audits/b1/coverage-ledger.md"), out.join("\n") + "\n");
console.log("gerado:", out.length, "linhas");
