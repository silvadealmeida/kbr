/**
 * Auditoria — gera `docs/audits/a0-a2/coverage-ledger.md` cruzando o que foi
 * inventariado, o que virou ficha de leitura, o que cada revisor declarou ter
 * julgado e o que o orquestrador re-verificou. Read-only quanto ao conteúdo.
 *
 * Uso: node docs/audits/a0-a2/tools/render-coverage.cjs
 */
const fs = require("node:fs");
const path = require("node:path");

const ROOT = path.resolve(__dirname, "..", "..", "..", "..");
const DIR = path.join(ROOT, "docs/audits/a0-a2");
const IDX = JSON.parse(fs.readFileSync(path.join(DIR, "data/findings-index.json"), "utf8"));
const data = JSON.parse(fs.readFileSync(path.join(DIR, "data/content-dump.json"), "utf8"));

const ITEM_LINE = /^\s*(?:- )?\S.*\[(gram|gram-ex|intro|fal:line|sum|completion|mcq|cloze|listen|reading|translate|vocab:[a-zà-ú]+|frase|jamo:[a-z]+|regra[a-z-]*|sílaba|palavra|syl|audio-to-char|char-to-audio|minimal-pair|build-syllable)/;
const sheetItems = (name) => {
  const f = path.join(DIR, "data/sheets", name);
  if (!fs.existsSync(f)) return null;
  return fs.readFileSync(f, "utf8").split("\n").filter((l) => ITEM_LINE.test(l)).length;
};

// cobertura declarada em cada arquivo de achados: fração X/X plausível
// (mesmo número dos dois lados, 2–5 dígitos) ou menção explícita a 100%.
const declared = (file) => {
  if (!fs.existsSync(file)) return null;
  const t = fs.readFileSync(file, "utf8");
  const cov = t.split(/^## Cobertura/m)[1] || "";
  const frac = [...cov.matchAll(/\b(\d{2,5})\s*\/\s*(\d{1,5})\b/g)].find((m) => m[1] === m[2]);
  const total = cov.match(/\*\*(\d{3,5})\*\*\s*\|?\s*\*\*(\d{3,5})\*\*/);
  const integral = /100\s*%|sem amostragem|integramente|todos os itens|item a item|100%/i.test(cov);
  const valor = frac ? `${frac[1]}/${frac[2]}` : total && total[1] === total[2] ? `${total[1]}/${total[2]}` : integral ? "100% (declarado)" : "—";
  return { fraque: valor, integral };
};

const LOTES = [
  ["a0-hangul", "A0", "a0-hangul.md", "h01–h25, c1–c4, jamo, sílabas, palavras, regras"],
  ["vocab-hangul", "A0", "vocab-hangul.md", "133 entradas legadas + 25 frases"],
  ["a1-m01", "A1", "a1-m01.md", "a1-l01–l05, a1-c01"],
  ["a1-m02", "A1", "a1-m02.md", "a1-l06–l10, a1-c02"],
  ["a1-m03", "A1", "a1-m03.md", "a1-l11–l15, a1-c03"],
  ["a1-m04", "A1", "a1-m04.md", "a1-l16–l20, a1-c04"],
  ["a1-m05", "A1", "a1-m05.md", "a1-l21–l25, a1-c05"],
  ["a1-m06", "A1", "a1-m06.md", "a1-l26–l30, a1-c06"],
  ["a1-m07", "A1", "a1-m07.md", "a1-l31–l35, a1-c07"],
  ["a1-m08", "A1", "a1-m08.md", "a1-l36–l40, a1-c08"],
  ["vocab-a1", "A1", "vocab-a1.md", "443 entradas + 443 frases ko-a1"],
  ["a2-m01", "A2", "a2-m01.md", "a2-l01–l05, a2-c01"],
  ["a2-m02", "A2", "a2-m02.md", "a2-l06–l10, a2-c02"],
  ["a2-m03", "A2", "a2-m03.md", "a2-l11–l15, a2-c03"],
  ["a2-m04", "A2", "a2-m04.md", "a2-l16–l20, a2-c04"],
  ["a2-m05", "A2", "a2-m05.md", "a2-l21–l25, a2-c05"],
  ["a2-m06", "A2", "a2-m06.md", "a2-l26–l30, a2-c06"],
  ["a2-m07", "A2", "a2-m07.md", "a2-l31–l35, a2-c07"],
  ["a2-m08", "A2", "a2-m08.md", "a2-l36–l40, a2-c08"],
  ["vocab-a2", "A2", "vocab-a2.md", "400 entradas + 400 frases ko-a2"],
];
const SEGUNDOS = ["a1-m01-v2", "a1-m02-v2", "a1-m03-v2", "a1-m04-v2", "a1-m05-v2"];

const sevOf = (lote) => IDX.byLote[lote] || 0;
const sevDist = (lote) => {
  const rs = IDX.records.filter((r) => r.lote === lote);
  const c = {};
  for (const r of rs) c[r.severity] = (c[r.severity] || 0) + 1;
  return ["CRÍTICO", "MAJOR", "MINOR", "INCERTO"].map((s) => c[s] || 0).join("/");
};

const rows = [];
for (const [lote, curso, sheet, escopo] of LOTES) {
  const itens = sheetItems(sheet);
  const file = path.join(DIR, "data/findings", `${lote}.md`);
  const dec = fs.existsSync(file) ? declared(file) : null;
  const dup = SEGUNDOS.includes(lote) ? "2º revisor do lote" : SEGUNDOS.some((s) => s.replace("-v2", "") === lote) ? "1º de 2 revisores" : "1 (único)";
  rows.push({ lote, curso, escopo, itens, revisores: dup, declarado: dec ? dec.fraque : "ARQUIVO AUSENTE", sev: sevDist(lote), total: sevOf(lote) });
}
for (const lote of SEGUNDOS) {
  const base = lote.replace("-v2", "");
  const itens = sheetItems(base + ".md");
  rows.push({
    lote,
    curso: base.startsWith("a1") ? "A1" : "A2",
    escopo: `revisão independente do lote ${base} (mesma ficha)`,
    itens,
    revisores: "segundo revisor",
    declarado: declared(path.join(DIR, "data/findings", `${lote}.md`))?.fraque || "—",
    sev: sevDist(lote),
    total: sevOf(lote),
  });
}

const porCurso = {};
for (const r of rows) {
  porCurso[r.curso] ||= { itens: 0, achados: 0, lotes: 0 };
  if (!r.lote.endsWith("-v2")) porCurso[r.curso].itens += r.itens || 0;
  porCurso[r.curso].achados += r.total;
  porCurso[r.curso].lotes += 1;
}

const medido = {
  A0: {
    passos: data.hangul.lessons.length + data.hangul.checkpoints.length,
    exercicios: data.hangul.lessons.reduce((s, l) => s + l.exercises.length, 0) + data.hangul.checkpoints.reduce((s, c) => s + c.exercises.length, 0),
    vocab: data.vocab.filter((v) => v.course === "hangul").length,
    frases: data.sentences.filter((s) => (data.vocab.find((v) => v.id === s.vocabId) || {}).course === "hangul").length,
  },
  A1: {
    passos: data.a1Lessons.length + data.a1Checkpoints.length,
    exercicios: data.a1Lessons.concat(data.a1Checkpoints).reduce((s, x) => s + x.exercises.length, 0),
    vocab: data.vocab.filter((v) => v.course === "ko-a1").length,
    frases: data.sentences.filter((s) => (data.vocab.find((v) => v.id === s.vocabId) || {}).course === "ko-a1").length,
  },
  A2: {
    passos: data.a2Lessons.length + data.a2Checkpoints.length,
    exercicios: data.a2Lessons.concat(data.a2Checkpoints).reduce((s, x) => s + x.exercises.length, 0),
    vocab: data.vocab.filter((v) => v.course === "ko-a2").length,
    frases: data.sentences.filter((s) => (data.vocab.find((v) => v.id === s.vocabId) || {}).course === "ko-a2").length,
  },
};

fs.writeFileSync(
  path.join(DIR, "coverage-ledger.md"),
  `# Registro de cobertura da auditoria A0–A2

Baseline \`3103ce3\`. Gerado por \`tools/render-coverage.cjs\`; as fichas de leitura são
regeneráveis (\`tools/make-sheets.cjs\`), por isso não estão versionadas — os totais
medidos nelas estão aqui.

## O que cada status significa

| Status | Definição real |
|---|---|
| INVENTORIADO | item enumerado programaticamente a partir do \`content-dump.json\` |
| STRUCTURALLY CHECKED | passou por checagens determinísticas (integridade de referência, gabarito × opção, alvo × frase, contagens) — **não** diz nada sobre o coreano |
| LINGUISTICAMENTE REVISADO POR IA | um revisor de lote leu a ficha e emitiu juízo por item, com autodeclaração de cobertura integral; sem amostragem declarada |
| RE-VERIFICADO PELO ORQUESTRADOR | o próprio fato do achado foi reproduzido no repositório (leitura da fonte, analisador determinístico ou motor real de \`src/lib/exercises\`) |
| REVISÃO HUMANA NECESSÁRIA | estado final de todo o coreano: nenhuma etapa acima substitui falante nativo |

## Cobertura por curso (itens medidos)

| Curso | Passos | Exercícios | Entradas de vocab. | Frases contextuais | Itens em ficha de leitura | Lotes revisados | Achados |
|---|---|---|---|---|---|---|---|
| A0 Hangul | ${medido.A0.passos} | ${medido.A0.exercicios} | ${medido.A0.vocab} | ${medido.A0.frases} | ${rows.filter((r) => r.curso === "A0" && !r.lote.endsWith("-v2")).reduce((s, r) => s + (r.itens || 0), 0)} | ${porCurso.A0.lotes} | ${porCurso.A0.achados} |
| A1 | ${medido.A1.passos} | ${medido.A1.exercicios} | ${medido.A1.vocab} | ${medido.A1.frases} | ${rows.filter((r) => r.curso === "A1" && !r.lote.endsWith("-v2")).reduce((s, r) => s + (r.itens || 0), 0)} | ${porCurso.A1.lotes} | ${porCurso.A1.achados} |
| A2 | ${medido.A2.passos} | ${medido.A2.exercicios} | ${medido.A2.vocab} | ${medido.A2.frases} | ${rows.filter((r) => r.curso === "A2" && !r.lote.endsWith("-v2")).reduce((s, r) => s + (r.itens || 0), 0)} | ${porCurso.A2.lotes} | ${porCurso.A2.achados} |

Coluna "achados" soma CRÍTICO/MAJOR/MINOR/INCERTO de todos os revisores do curso
(inclui os segundos revisores dos lotes A1 m01–m05, que são sobreposição deliberada,
não itens novos).

## Cobertura por lote

| Lote | Curso | Escopo | Itens na ficha (programático) | Revisores | Cobertura declarada pelo revisor | Achados (C/M/m/i) |
|---|---|---|---|---|---|---|
${rows
  .map(
    (r) =>
      `| \`${r.lote}\` | ${r.curso} | ${r.escopo} | ${r.itens ?? "—"} | ${r.revisores} | ${r.declarado} | ${r.sev} (${r.total}) |`,
  )
  .join("\n")}

## Limites reais desta cobertura

1. **Revisão por IA, não por falante nativo.** Nada aqui certifica naturalidade,
   registro ou pronúncia. O status \`in-review\` do conteúdo continua e não foi tocado.
2. **Dois revisores rejeitados pelo orquestrador.** \`V0-001\` (alegava que \`으막\` não
   existe) e \`V0-002\`/\`A2M2-003\` foram verificados como **falsos positivos**: a norma
   (온라인가나다 327196; 한글 맞춤법 제35항 붙임 2) confirma as grafias/transcrições do
   app. \`A2M3-001\` teve a premissa corrigida. Ou seja: a revisão de lote é triagem, e a
   verificação cruzada é obrigatória antes de qualquer correção.
3. **Conferência de contagem dos revisores não é auditável item a item.** O que se pode
   provar é o denominador (itens por ficha, medidos acima) e a autodeclaração de
   cobertura integral de cada lote; não há prova independente de que o revisor não
   pulou linhas. Para fechar isso, a correção por lote deve ser feita com o item ID na
   mão, lote por lote.
4. **Sobreposição baixa entre os dois revisores dos lotes A1 m01–m05** (mesmo lote,
   mesma ficha): interseção de itens citados ≈ 0,12–0,31. Isso significa cobertura
   complementar, não redundância confirmatória: dois passes do mesmo modelo acham
   conjuntos diferentes de problemas, o que reforça a necessidade de revisor humano.
5. **Fora de escopo**: qualquer arquivo B1 (\`src/content/curriculum/b1\`,
   \`src/content/vocabulary/b1-*\`), o corpus MP3 (licença bloqueada, \~287 arquivos) e a
   camada de UI. Áudio não foi ouvido; nenhuma afirmação sobre pronúncia real foi feita.
6. **Testes**: nesta baseline, \`npm run typecheck\` e a suíte Vitest (543 testes em 35
   arquivos) passam, e o build de produção passa. Isso é integridade de dados e de
   compilação — não é evidência linguística.

## Status final honesto por camada

| Camada | Status |
|---|---|
| A0 Hangul (h01–h25, c1–c4, jamo, sílabas, palavras, regras) | STRUCTURALLY CHECKED + LINGUISTICAMENTE REVISADO POR IA → **REVISÃO HUMANA NECESSÁRIA** |
| A1 (40 lições + 8 checkpoints) | STRUCTURALLY CHECKED + LINGUISTICAMENTE REVISADO POR IA → **REVISÃO HUMANA NECESSÁRIA** |
| A2 (40 lições + 8 checkpoints) | STRUCTURALLY CHECKED + LINGUISTICAMENTE REVISADO POR IA → **REVISÃO HUMANA NECESSÁRIA** |
| Vocabulário canônico (976 entradas, 868 frases) | STRUCTURALLY CHECKED + LINGUISTICAMENTE REVISADO POR IA → **REVISÃO HUMANA NECESSÁRIA** |
| Trilha de aprendizado (ordem de marcos, carga lexical) | ANALISADA PROGRAMATICAMENTE + REVISADA POR IA → **REVISÃO HUMANA NECESSÁRIA** |
| B1 | **NÃO INICIADO / FORA DO ESCOPO** |
`,
);
console.log("coverage-ledger.md escrito");
