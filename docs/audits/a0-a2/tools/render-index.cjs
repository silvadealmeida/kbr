/**
 * Auditoria — renderiza um índice único (markdown) a partir de
 * `findings-index.json`, com status de verificação do orquestrador.
 * Read-only quanto ao conteúdo do app.
 *
 * Uso: node docs/audits/a0-a2/tools/render-index.cjs
 * Saída: docs/audits/a0-a2/data/findings-index.md
 */
const fs = require("node:fs");
const path = require("node:path");

const ROOT = path.resolve(__dirname, "..", "..", "..", "..");
const IDX = JSON.parse(fs.readFileSync(path.join(ROOT, "docs/audits/a0-a2/data/findings-index.json"), "utf8"));
const VER = JSON.parse(fs.readFileSync(path.join(ROOT, "docs/audits/a0-a2/data/claim-verifications.json"), "utf8"));

const VERIFIED = {
  "A2M1-001": "CONFIRMADO (motor: nenhuma opção casa com o gabarito)",
  "A1M1-001": "CONFIRMADO",
  "A1M1-002": "CONFIRMADO",
  "A1M3-001": "CONFIRMADO (analisador determinístico + motor: '언니는' rejeitado)",
  "A1M5-001": "CONFIRMADO (contradição interna com a1-l23)",
  "V2-001": "CONFIRMADO (fonte lida: alvo '따라서' em frase de 따르다+아/서)",
  "V0-001": "REJEITADO (으막 é a transcrição padrão; ver nota de normatização)",
  "A0-001": "CONFIRMADO (prosa erra a letra; transcrição certa)",
  "A2M2-003": "REJEITADO (잔 후에 é forma válida de 자다; o revisor trocou por 잰)",
  "A2M3-001": "CONFIRMADO COM PREMISSA CORRIGIDA (삼 층 é princípio; falta a variante 삼층)",
  "A2M2-002": "CONFIRMADO",
  "A2M3-002": "CONFIRMADO",
  "A2M4-001": "CONFIRMADO",
  "A2M4-002": "CONFIRMADO",
  "A2M5-001": "CONFIRMADO",
  "A2M6-001": "CONFIRMADO",
  "A2M7-001": "CONFIRMADO (motor rejeita '계셔요')",
  "A2M7-002": "CONFIRMADO (motor rejeita '뵀어요')",
  "A2M8-001": "CONFIRMADO (marco fora do blueprint)",
  "A2M8-002": "CONFIRMADO",
  "A2M2-001": "CONFIRMADO (126 itens de produção só aceitam a forma pontuada em A2)",
  "A1M2-001": "CONFIRMADO",
  "A1M2-002": "CONFIRMADO",
  "A1M6-001": "CONFIRMADO (padrão sistêmico medido: 65 itens de escuta)",
  "V0-002": "REJEITADO (조사 의 → [에] é permitido; a nota está certa)",
  "V1-003": "CONFIRMADO",
  "V1-004": "CONFIRMADO",
  "V1-005": "CONFIRMADO",
  "V2-002": "CONFIRMADO",
  "V0-003": "CONFIRMADO como risco latente",
};

const courseOf = (lote) =>
  lote.startsWith("a0") ? "A0" : lote.startsWith("a1") ? "A1" : lote.startsWith("a2") ? "A2" : lote.startsWith("vocab-hangul") ? "A0" : lote.startsWith("vocab-a1") ? "A1" : "A2";

const esc = (s) => String(s || "").replace(/\|/g, "∣").replace(/\n/g, " ").slice(0, 170);

const lines = [
  "# Índice consolidado dos achados (A0–A2)",
  "",
  `Baseline auditado: \`3103ce3\` · branch \`audit/a0-a2-linguistic\` · gerado por \`tools/render-index.cjs\`.`,
  "",
  `Total de achados: **${IDX.total}** · ` +
    Object.entries(IDX.bySeverity)
      .map(([k, v]) => `${k} ${v}`)
      .join(" · "),
  "",
  "Os arquivos completos por lote estão em `docs/audits/a0-a2/data/findings/*.md`. A coluna",
  "**Verificação** é a conferência independente feita pelo orquestrador (motor de correção,",
  "analisadores determinísticos e re-leitura da fonte); `—` = não re-verificado individualmente,",
  "coberto pela revisão do lote.",
  "",
  "| ID | Sev. | Curso | Lote | Item | Resumo | Conf. | Verificação |",
  "|---|---|---|---|---|---|---|---|",
];
for (const r of IDX.records) {
  lines.push(
    `| ${r.id} | ${r.severity} | ${courseOf(r.lote)} | ${r.lote} | \`${esc(r.Item || "")}\` | ${esc(r.summary)} | ${esc(r.Confiança || "")} | ${esc(VERIFIED[r.id] || "")} |`,
  );
}

lines.push("", "## Verificações independentes registradas", "");
for (const v of VER) {
  lines.push(`### ${v.claim}`, "", `**${v.verdict}**", "`.replace('", "', ""));
  lines.push("", "```json", JSON.stringify(v.evidence, null, 2).slice(0, 4000), "```", "");
}

fs.writeFileSync(path.join(ROOT, "docs/audits/a0-a2/data/findings-index.md"), lines.join("\n") + "\n");
console.log(`índice: ${IDX.total} achados em ${lines.length} linhas`);
