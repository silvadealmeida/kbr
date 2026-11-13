/**
 * Auditoria — consolida achados, agrupa padrões e mede concordância entre as
 * duas revisões independentes dos lotes A1 (m01–m05). Read-only quanto ao
 * conteúdo do app.
 *
 * Uso: node docs/audits/a0-a2/tools/tally-findings.cjs
 * Saída: docs/audits/a0-a2/data/findings-index.json
 */
const fs = require("node:fs");
const path = require("node:path");

const ROOT = path.resolve(__dirname, "..", "..", "..", "..");
const DIR = path.join(ROOT, "docs/audits/a0-a2/data/findings");
const OUT = path.join(ROOT, "docs/audits/a0-a2/data/findings-index.json");

const HEAD = /^### ([A-Z0-9]+-[0-9]+) — (CRÍTICO|MAJOR|MINOR|INCERTO) — (.+)$/;
const FIELDS = ["Item", "Arquivo", "Coreano original", "Português original", "Problema", "Correção proposta", "Base", "Confiança", "Impacto"];
const ID_RE = /\b(?:a[12]|h)\d{2}(?:-[lc]\d{2})?(?:-e\d{2})?\b|\ba[12]-c\d\d(?:-e\d{2,})?\b|\bg:a[12]-l\d{2}-[\w-]+|\bko:[\w가-힣]+|\b(?:c[1-4]|h\d{2})-e\d{2}\b|\bword:[\w가-힣]+|\brule:[\w-]+/g;

const CATEGORIES = [
  ["gabarito-impossível (mcq/alt fora das opções)", /gabarito (fora|não está)|impossível de acertar|nenhuma opção/i],
  ["partícula/concordância errada no gabarito", /언니은|agramatical|partícula discordante|은\/는/i],
  ["cobrança de marco não ensinado", /não (ensinad|declarad)|ainda não|antes de (ser )?ensinad|prematur|sem ensino|nunca (ensinad|declarad)/i],
  ["variante válida rejeitada (acceptedAnswers)", /rejeita|variante (válida|legítima)|só aceita|marca(da)? como errada/i],
  ["pontuação/espaçamento exigidos na resposta", /ponto final|pontuaç|espaç|normalize/i],
  ["enunciado × gabarito divergentes", /enunciado (pede|pide)|contradiz (o próprio|a própria)|distrator (plausível|igualmente)/i],
  ["tradução pt-BR imprecisa", /tradução (pt|portuguesa|literal)|glosa|acrescenta|perde/i],
  ["coreano artificial/dialogal", /artificia|calque|naturalidade|literal do coreano/i],
  ["pronúncia/fonética incorreta", /\[i\]|glide|batchim|liaison|nasaliza|aspira|IPA|realiza/i],
  ["afirmação cultural ou factual", /cultura|generaliza|histórica|Sejong|Hunminjeongeum|número de/i],
  ["carga lexical acima do nível", /carga|acima do nível|fora de (A1|A2)|palavra não (vista|ensinada)/i],
];

const records = [];
for (const file of fs.readdirSync(DIR).filter((f) => f.endsWith(".md")).sort()) {
  const lote = file.replace(/\.md$/, "");
  let cur = null;
  for (const line of fs.readFileSync(path.join(DIR, file), "utf8").split("\n")) {
    const h = line.match(HEAD);
    if (h) {
      cur = { id: h[1], severity: h[2], summary: h[3], lote, file: `docs/audits/a0-a2/data/findings/${file}` };
      records.push(cur);
      continue;
    }
    if (!cur) continue;
    const m = line.match(/^- ([^:]+): (.*)$/);
    if (m && FIELDS.includes(m[1])) cur[m[1]] = m[2];
  }
}

for (const r of records) {
  const blob = `${r.summary} ${r.Problema || ""} ${r["Correção proposta"] || ""}`;
  r.ids = [...new Set((`${r.Item || ""} ${r["Coreano original"] || ""} ${blob}`).match(ID_RE) || [])].sort();
  r.categories = CATEGORIES.filter(([, re]) => re.test(blob)).map(([n]) => n);
  r.confidence = (r.Confiança || "").toLowerCase();
}

const clusterByKey = new Map();
for (const r of records)
  for (const c of r.categories) {
    const key = c;
    if (!clusterByKey.has(key)) clusterByKey.set(key, []);
    clusterByKey.get(key).push(r);
  }
for (const r of records) if (r.categories.length === 0) {
  const key = "(sem categoria)";
  if (!clusterByKey.has(key)) clusterByKey.set(key, []);
  clusterByKey.get(key).push(r);
}

const clusters = [...clusterByKey.entries()]
  .map(([categoria, list]) => ({
    categoria,
    total: list.length,
    porSeveridade: list.reduce((a, r) => ({ ...a, [r.severity]: (a[r.severity] || 0) + 1 }), {}),
    lotes: [...new Set(list.map((r) => r.lote.replace("-v2", "")))].sort(),
    ids: list.map((r) => r.id),
  }))
  .sort((a, b) => b.total - a.total);

const agreement = {};
for (const base of ["a1-m01", "a1-m02", "a1-m03", "a1-m04", "a1-m05"]) {
  const A = records.filter((r) => r.lote === base);
  const B = records.filter((r) => r.lote === `${base}-v2`);
  const setA = new Set(A.flatMap((r) => r.ids));
  const setB = new Set(B.flatMap((r) => r.ids));
  const shared = [...setA].filter((x) => setB.has(x));
  agreement[base] = {
    achadosA: A.length,
    achadosB: B.length,
    itensCitadosA: setA.size,
    itensCitadosB: setB.size,
    itensEmComum: shared.length,
    sobreposicao: setA.size + setB.size ? +(shared.length / new Set([...setA, ...setB]).size).toFixed(2) : null,
    criticosA: A.filter((r) => r.severity === "CRÍTICO").length,
    criticosB: B.filter((r) => r.severity === "CRÍTICO").length,
  };
}

const bySeverity = records.reduce((a, r) => ({ ...a, [r.severity]: (a[r.severity] || 0) + 1 }), {});
const byLote = records.reduce((a, r) => ({ ...a, [r.lote]: (a[r.lote] || 0) + 1 }), {});
const criticos = records.filter((r) => r.severity === "CRÍTICO");

fs.writeFileSync(OUT, JSON.stringify({ total: records.length, bySeverity, byLote, clusters, agreement, records }, null, 2));

console.log(`total de achados: ${records.length}`);
console.log(`por severidade: ${JSON.stringify(bySeverity)}`);
console.log(`\n== clusters ==`);
for (const c of clusters) console.log(`${c.total.toString().padStart(3)}  ${c.categoria}  [${c.lotes.join(" ")}]  ${JSON.stringify(c.porSeveridade)}`);
console.log(`\n== concordância A1 (dois revisores no mesmo lote) ==`);
for (const [k, v] of Object.entries(agreement)) console.log(`${k}: A=${v.achadosA} B=${v.achadosB} | itens em comum=${v.itensEmComum} sobreposição=${v.sobreposicao} | CRÍTICO A=${v.criticosA} B=${v.criticosB}`);
console.log(`\n== CRÍTICO ==`);
for (const r of criticos) console.log(`${r.id} [${r.lote}] ${r.summary}`);
