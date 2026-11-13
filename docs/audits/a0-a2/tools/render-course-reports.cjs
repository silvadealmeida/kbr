/**
 * Auditoria — gera os entregáveis por curso a partir do índice consolidado,
 * aplicando o status de verificação independente do orquestrador.
 * Read-only quanto ao conteúdo do app.
 *
 * Uso: node docs/audits/a0-a2/tools/render-course-reports.cjs
 * Saída: docs/audits/a0-a2/{hangul,a1,a2}-findings.md
 */
const fs = require("node:fs");
const path = require("node:path");

const ROOT = path.resolve(__dirname, "..", "..", "..", "..");
const DIR = path.join(ROOT, "docs/audits/a0-a2");
const IDX = JSON.parse(fs.readFileSync(path.join(DIR, "data/findings-index.json"), "utf8"));

const ADJUDICATION = {
  "A0-001": ["CONFIRMADO", "re-leitura de `src/content/hangul/lessons/h21.ts:82` e `rules.ts:19` contra `src/content/hangul/syllables.ts:2737` (`applyLiaison` no probe)."],
  "A0-002": ["CONFIRMADO", "inventário programático dos `newFinals` de h17–h20 soma 27; a própria planilha de sílabas usa 25 finais distintos."],
  "A0-003": ["CONFIRMADO", "`src/content/hangul/lessons/h13.ts:66-77`: `audioText: 고` + `correctOptionId: go` com enunciado que pede o glide (que só existe em 과)."],
  "A0-004": ["CONFIRMADO", "`src/content/hangul/lessons/h15.ts:19` — ambiente descrito (após consoante) não existe em 주의."],
  "A0-005": ["CONFIRMADO", "itens `audio-to-char` com alternativas homófonas; a própria lição declara a fusão [we]/[i]."],
  "A0-006": ["CONFIRMADO", "distrator com jamo não ensinado no ponto do curso; lacuna do `validate.ts` confirmada por leitura do validador."],
  "A1M1-001": ["CONFIRMADO", "`src/content/curriculum/a1/lessons/a1-l01.ts:269` (prosa) × `:142` (regra correta da própria lição)."],
  "A1M1-002": ["CONFIRMADO COM SEVERIDADE AJUSTADA", "duas opções defensáveis em `a1-l03-e09`; reclassificado de CRÍTICO para MAJOR (ambiguidade de avaliação, não coreano errado)."],
  "A1M3-001": ["CONFIRMADO", "analisador determinístico + motor: gabarito aceita e imprime '제 언니은'; '언니는' é rejeitado."],
  "A1M5-001": ["CONFIRMADO", "contradição interna com `a1-l23` ('사거리에서 만나요') + norma 에/에서."],
  "A1M6-001": ["CONFIRMADO", "medição em todo o corpus: 65 itens de escuta com enunciado de constituinte e gabarito de frase inteira."],
  "A2M1-001": ["CONFIRMADO", "probe do motor: nenhuma das três opções casa com `correctAnswer`."],
  "A2M2-001": ["CONFIRMADO", "medição: 126 itens de produção em A2 só aceitam a forma pontuada (0 em A1)."],
  "A2M2-002": ["CONFIRMADO", "`a2-l06.ts:53` FORM '-려고 해요' × diálogo `:46` '쌓으려고'."],
  "A2M2-003": ["REJEITADO", "'잔 후에' é forma regular de 자다 (자 + ㄴ); a alternativa proposta pelo revisor ('잰 후에') é que não existe. Distrator válido."],
  "A2M3-001": ["PREMISSA CORRIGIDA", "'삼 층' é a forma de princípio (한글 맞춤법 제43항; 온라인가나다 336486); o defeito real é o ditado aceitar só a variante espaçada e rejeitar '삼층이에요'."],
  "A2M3-002": ["CONFIRMADO", "`a2-l14` FORM 'radical + -는데(요)' × exemplo '시끄러운데요' (requer -(으)ㄴ데 + irregular ㅂ)."],
  "A2M4-001": ["CONFIRMADO", "grep em A1+A2: nenhum `라고 하다` declaradado; blueprint só declara `-라고 생각해요` em `a2-l31` (opinião, outro marco)."],
  "A2M4-002": ["CONFIRMADO", "'-(으)ㄹ 때' nunca declarado no blueprint A1/A2; primeira ocorrência em texto avaliado."],
  "A2M5-001": ["CONFIRMADO", "mesmo padrão de A2M4-001, agora no módulo 5."],
  "A2M6-001": ["CONFIRMADO", "`a2-l30-g1` FORM '-았/었고' × exemplos e o cloze `e02` ('바다를 보고')."],
  "A2M6-002": ["CONFIRMADO", "'-다고 하다' fora do blueprint; item de leitura depende dele."],
  "A2M7-001": ["CONFIRMADO", "probe: '계셔요' rejeitado; '-(으)세요/-(으)셔요' são 복수 표준어 (온라인가나다 323080)."],
  "A2M7-002": ["CONFIRMADO", "probe: '뵀어요' rejeitado; contraction padrão (한글 맞춤법 제35항 붙임 2: 뵈었다→뵀다)."],
  "A2M8-001": ["CONFIRMADO", "'-면서' ausente do blueprint A1/A2; cobrado em produção."],
  "A2M8-002": ["CONFIRMADO", "'해외에서 산 적이' lê-se 사다; o marco ensinado em `a2-l02` é '살아 본 적이'."],
  "V0-001": ["REJEITADO", "'으막' é a transcrição padrão (온라인가나다 327196 escreve '옏 으막'); o erro real é só a prosa de A0-001. O MP3 mapeado está coerente."],
  "V0-002": ["REJEITADO", "조사 '의' → [에] é permitido (온라인가나다: '우리의[우리의/우리에]'); a nota está certa. Se '나의' for lido como pronome+substantivo, a mesma nota continua coerente com h15."],
  "V0-003": ["CONFIRMADO COMO RISCO LATENTE", "`ko:안` (hangul, 'dentro') reusado em `a1-l04`/`a1-l13` em sentido locativo; a negação `안` é ensinada como bloco sem identidade — colisão ainda não realizada, mas provável."],
  "V1-001": ["CONFIRMADO", "`src/content/vocabulary/types.ts:3` não tem 'adjetivo';형용사 entram como `verbo`."],
  "V1-003": ["CONFIRMADO", "`targetPosition` valida início de palavra, não fim: '감기약' contém '감기'."],
  "V1-004": ["CONFIRMADO", "frase '돼지고기 없어요?' glosada como pergunta afirmativa em pt."],
  "V2-001": ["CONFIRMADO", "`src/content/vocabulary/a2-m07.ts:27`: alvo '따라서' numa frase de 따르다 + -아/서; tradução inventa 'Portanto'."],
  "V2-002": ["CONFIRMADO", "`ko:일` existe só como numeral; A2 usa a forma como 'trabalho' (p. ex. `a2-l21` reusedIds)."],
  "A1M1-003": ["CONFIRMADO", "contradição de elenco/perfil no mesmo módulo (l01 'funcionário' vs 'estudante')."],
  "A1M2-001": ["CONFIRMADO", "a1-l07.ts:81 ensina 'ênfase' com 에 para 오늘/내일/어제; ênfase é com 는, e a própria lição usa 오늘은/내일은."],
  "A1M3-002": ["CONFIRMADO", "dialogo d6 '조금 기다려요' glosado 'Espere um pouco.' e gabarito do cloze e10 = 기다려요; a lição ensina (으)세요 e a nota cita 기다리세요."],
  "A1M4-001": ["CONFIRMADO", "fonte lida: pt-ko aceita apenas a frase com 저는; a elipse de tópico é ensinada em a1-l10."],
  "A1M6-002": ["CONFIRMADO", "campo FORM de g:a1-l27-questions contém o fragmento '질문 +'."],
  "A1M7-001": ["CONFIRMADO", "mesmo padrão medido: 126 itens digitados de A2 + variantes de A1."],
  "A1M8-001": ["CONFIRMADO", "polaridade invertida na glosa ko-pt."],
  "A2M2-001": ["CONFIRMADO", "medição programática (tools/analyze-typed-normalization.cjs)."],
  "A2M3-003": ["CONFIRMADO", "fonte a2-l14.ts:38: '조금 시끄러워서' → 'um pouco barulhento demais'."],
  "A2M5-002": ["CONFIRMADO", "a2-l23-e05: enunciado pede registro formal; acceptedAnswers inclui a variante 해요체."],
  "A2M6-003": ["CONFIRMADO", "cloze com alvo único e sem variantes, enquanto o item-irmão aceita variantes."],
  "A2M8-003": ["CONFIRMADO COM AJUSTE", "a grafia de contagem '한 번' é a de princípio; em '다시 한번' o 국립국어원 unificou (2015) com 붙여쓰기 — ver references.md."],
  "V1-001": ["CONFIRMADO", "src/content/vocabulary/types.ts:3 não tem categoria 'adjetivo/descritivo'."],
  "V1-002": ["REJEITADO", "auxiliares escrevem-se separados por princípio (한글 맞춤법 제47항: '입어 보다' princípio, '입어보다' permitido); a forma do app é a de princípio."],
  "V2-003": ["CONFIRMADO COMO PADRÃO", "inconsistência de metadado (alvo flexionado × lema nominal); nenhuma id canônica muda."],
  "V2-004": ["CONFIRMADO", "mesma raiz de V1-001 (esquema de `pos`)."],
  "V2-014": ["MANTIDO COMO INCERTO", "carga lexical sem corpus de frequência citado pelo revisor; nada alterado."],

};

const courseOf = (lote) =>
  lote === "a0-hangul" || lote === "vocab-hangul" ? "hangul" : lote.startsWith("a1") || lote === "vocab-a1" ? "a1" : "a2";
const ORDER = ["CRÍTICO", "MAJOR", "MINOR", "INCERTO"];
const latesFor = (c) => IDX.records.filter((r) => courseOf(r.lote.replace("-v2", "")) === c);

function mergeDuplicates(list) {
  // lotes revisados duas vezes (a1-m01..m05 + *-v2): une pela mesma linha-item
  const byKey = new Map();
  for (const r of list) {
    const key = `${r.severity}|${(r.Item || "").replace(/[^a-zA-Z0-9:-]/g, "").slice(0, 24)}`;
    if (!byKey.has(key)) byKey.set(key, []);
    byKey.get(key).push(r);
  }
  return [...byKey.values()];
}

const HEADERS = {
  hangul: ["# Achados A0 (Hangul) — consolidação", "Lotes de origem: `a0-hangul`, `vocab-hangul`."],
  a1: ["# Achados A1 — consolidação", "Lotes de origem: `a1-m01`…`a1-m08` (m01–m05 com duas revisões independentes), `vocab-a1`."],
  a2: ["# Achados A2 — consolidação", "Lotes de origem: `a2-m01`…`a2-m08`, `vocab-a2`."],
};

for (const c of ["hangul", "a1", "a2"]) {
  const list = latesFor(c);
  const grouped = mergeDuplicates(list);
  const counts = {};
  for (const r of list) counts[r.severity] = (counts[r.severity] || 0) + 1;

  const out = [
    HEADERS[c][0],
    "",
    HEADERS[c][1],
    "",
    `Baseline auditado: \`3103ce3\` (branch \`audit/a0-a2-linguistic\`). Este arquivo consolida; as fichas`,
    `completas de cada lote estão em \`data/findings/\*.md\`, e o índice de todos os cursos em`,
    "`data/findings-index.md`.",
    "",
    `Registros: **${list.length}** (${ORDER.map((s) => `${s} ${counts[s] || 0}`).join(" · ")}).`,
    `Grupos distintos (mesmo item/sveridade, quando dois revisores cobriram o lote): **${grouped.length}**`,
    `(CRÍTICO ${grouped.filter((g) => g[0].severity === "CRÍTICO").length} · MAJOR ${grouped.filter((g) => g[0].severity === "MAJOR").length} · MINOR ${grouped.filter((g) => g[0].severity === "MINOR").length} · INCERTO ${grouped.filter((g) => g[0].severity === "INCERTO").length}).`,
    "",
    "## Como ler a coluna **Verificação**",
    "",
    "- `CONFIRMADO` — o orquestrador reproduziu o fato no repositório (leitura da fonte, analisador",
    "  determinístico ou o motor real de correção em `src/lib/exercises`).",
    "- `REJEITADO` — a alegação não se sustenta; o achado **não** entra nas propostas de correção.",
    "- vazio — achado de revisor de lote, ainda não re-verificado individualmente (coberto pela",
    "  revisão do lote; ver `coverage-ledger.md`).",
    "",
  ];

  for (const sev of ORDER) {
    const rows = grouped.filter((g) => g[0].severity === sev);
    if (!rows.length) continue;
    out.push(`## ${sev} (${rows.length})`, "");
    out.push("| ID(s) | Lote(s) | Item | Resumo | Confiança | Verificação |");
    out.push("|---|---|---|---|---|---|");
    for (const g of rows) {
      const ids = g.map((r) => r.id).join(", ");
      const lotes = [...new Set(g.map((r) => r.lote))].join(", ");
      const esc = (s) => String(s || "").replace(/\|/g, "∣").replace(/\n/g, " ").slice(0, 190);
      const adj = ADJUDICATION[g[0].id];
      const verif = adj ? `**${adj[0]}** — ${adj[1]}` : "—";
      out.push(`| ${esc(ids)} | ${esc(lotes)} | \`${esc(g[0].Item)}\` | ${esc(g[0].summary)} | ${esc(g[0].Confiança)} | ${esc(verif)} |`);
    }
    out.push("");
  }

  fs.writeFileSync(path.join(DIR, `${c}-findings.md`), out.join("\n") + "\n");
  console.log(`${c}-findings.md: ${list.length} registros / ${grouped.length} grupos`);
}
