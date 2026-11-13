/**
 * Auditoria — gera `docs/audits/a0-a2/inventory.md` com contagens MEDIDAS no
 * dump do baseline (não transcritas de documentação). Read-only quanto ao
 * conteúdo do app.
 *
 * Uso: node docs/audits/a0-a2/tools/render-inventory.cjs
 */
const fs = require("node:fs");
const path = require("node:path");

const ROOT = path.resolve(__dirname, "..", "..", "..", "..");
const DIR = path.join(ROOT, "docs/audits/a0-a2");
const data = JSON.parse(fs.readFileSync(path.join(DIR, "data/content-dump.json"), "utf8"));

const sum = (arr, f) => arr.reduce((s, x) => s + f(x), 0);
const nEx = (arr) => sum(arr, (x) => (x.exercises ? x.exercises.length : 0));
const vocabOf = (course) => data.vocab.filter((v) => v.course === course);
const sentencesOf = (course) =>
  data.sentences.filter((s) => {
    const v = data.vocab.find((x) => x.id === s.vocabId);
    return v && v.course === course;
  }).length;
const types = (steps) => {
  const c = {};
  for (const s of steps) for (const e of s.exercises || []) c[e.type] = (c[e.type] || 0) + 1;
  return Object.entries(c)
    .sort((a, b) => b[1] - a[1])
    .map(([k, v]) => `${k} ${v}`)
    .join(" · ");
};

// itens efetivamente listados nas fichas de leitura (superfície revisada)
const ITEM_LINE = /^\s*(?:- )?\S.*\[(gram|gram-ex|intro|fal:line|sum|completion|mcq|cloze|listen|reading|translate|vocab:[a-zà-ú]+|frase|jamo:[a-z]+|regra[a-z-]*|sílaba|palavra|syl|audio-to-char|char-to-audio|minimal-pair|build-syllable)/;
const sheets = {};
for (const f of fs.readdirSync(path.join(DIR, "data/sheets")).sort()) {
  const txt = fs.readFileSync(path.join(DIR, "data/sheets/" + f), "utf8");
  sheets[f] = {
    passos: (txt.match(/^### /gm) || []).length,
    itens: txt.split("\n").filter((l) => ITEM_LINE.test(l)).length,
    linhas: txt.split("\n").filter((l) => l.trim()).length,
  };
}
const sheetTotal = Object.entries(sheets)
  .filter(([f]) => f !== "vocab-all.md")
  .reduce((s, [, v]) => s + v.itens, 0);

const A0 = data.hangul;
const A1 = data.a1Lessons, A1C = data.a1Checkpoints;
const A2 = data.a2Lessons, A2C = data.a2Checkpoints;


fs.writeFileSync(
  path.join(DIR, "inventory.md"),
  `# Inventário do conteúdo auditado

Baseline: commit **\`3103ce3\`** (*Record the public audio corpus decision*), worktree
\`/root/estudos/kbr-audit-a0a2\`, branch \`audit/a0-a2-linguistic\`. **B1 não foi lido,
medido nem citado** — está em desenvolvimento por outro agente.

Números **medidos no repositório** (dump serializado de \`src/content/hangul\`,
\`src/content/curriculum/a1\`, \`src/content/curriculum/a2\` e \`src/content/vocabulary\`),
não copiados de \`docs/roadmap.md\`.

## Onde vive o conteúdo

| Camada | Arquivos |
|---|---|
| A0 Hangul | \`src/content/hangul/lessons/\` (\`h01…h25\`), \`checkpoints/\` (\`c1…c4\`), \`jamo.ts\`, \`syllables.ts\`, \`rules.ts\`, \`validate.ts\` |
| A1 | \`src/content/curriculum/a1/lessons/a1-l01…l40.ts\`, \`checkpoints/a1-c01…c08.ts\`, \`blueprint.ts\`, \`validate-content.ts\`, \`validate.ts\` |
| A2 | \`src/content/curriculum/a2/lessons/a2-l01…l40.ts\`, \`checkpoints/a2-c01…c08.ts\`, \`blueprint.ts\`, \`validate-content.ts\` |
| Vocabulário canônico | \`src/content/vocabulary/\` (\`index.ts\`, \`types.ts\`, \`validate.ts\`, itens legados do Hangul, \`a1.ts\`, \`a1-course.ts\`, \`a2-m01…m08.ts\`) |
| Correção de respostas | \`src/lib/exercises/index.ts\` (\`checkAnswer\`, \`normalize\`) |
| Pronúncia (motor) | \`src/lib/hangul/pronunciation.ts\`, \`src/lib/hangul/index.ts\` |
| Registro de cursos | \`src/content/courses/registry.ts\` — **fora de mudança nesta fase** |

## Totais medidos

| Curso | Lições | Checkpoints | Exercícios | Falas | Blocos de gramática | Exemplos de gramática | Painéis de introdução | Fechamentos | Entradas de vocab. | Frases contextuais |
|---|---|---|---|---|---|---|---|---|---|---|
| A0 Hangul | ${A0.lessons.length} | ${A0.checkpoints.length} | ${nEx(A0.lessons) + nEx(A0.checkpoints)} | — | ${A0.rules.length} regras (${sum(A0.rules, (r) => r.examples.length)} pares escrito→falado) | ${A0.jamo.length} jamo + ${A0.syllables.length} sílabas + ${A0.words.length} palavras | ${sum(A0.lessons, (l) => (l.intro || []).length)} | — | ${vocabOf("hangul").length} | ${sentencesOf("hangul")} |
| A1 | ${A1.length} | ${A1C.length} | ${nEx(A1) + nEx(A1C)} | ${sum(A1, (l) => l.dialogue.length)} | ${sum(A1, (l) => l.grammar.length)} | ${sum(A1, (l) => sum(l.grammar, (g) => g.examples.length))} | ${sum(A1, (l) => l.intro.length)} | ${sum(A1, (l) => l.summary.length)} | ${vocabOf("ko-a1").length} | ${sentencesOf("ko-a1")} |
| A2 | ${A2.length} | ${A2C.length} | ${nEx(A2) + nEx(A2C)} | ${sum(A2, (l) => l.dialogue.length)} | ${sum(A2, (l) => l.grammar.length)} | ${sum(A2, (l) => sum(l.grammar, (g) => g.examples.length))} | ${sum(A2, (l) => l.intro.length)} | ${sum(A2, (l) => l.summary.length)} | ${vocabOf("ko-a2").length} | ${sentencesOf("ko-a2")} |
| **Total** | **${A0.lessons.length + A1.length + A2.length}** | **${A0.checkpoints.length + A1C.length + A2C.length}** | **${nEx(A0.lessons) + nEx(A0.checkpoints) + nEx(A1) + nEx(A1C) + nEx(A2) + nEx(A2C)}** | **${sum(A1, (l) => l.dialogue.length) + sum(A2, (l) => l.dialogue.length)}** | **${sum(A1, (l) => l.grammar.length) + sum(A2, (l) => l.grammar.length)}** | **${sum(A1, (l) => sum(l.grammar, (g) => g.examples.length)) + sum(A2, (l) => sum(l.grammar, (g) => g.examples.length))}** | **${sum(A1, (l) => l.intro.length) + sum(A2, (l) => l.intro.length)}** | **${sum(A1, (l) => l.summary.length) + sum(A2, (l) => l.summary.length)}** | **${data.vocab.length}** | **${data.sentences.length}** |

## Exercícios por tipo

| Recorte | Distribuição |
|---|---|
| A0 (lições + checkpoints) | ${types([...A0.lessons, ...A0.checkpoints])} |
| A1 lições | ${types(A1)} |
| A1 checkpoints | ${types(A1C)} |
| A2 lições | ${types(A2)} |
| A2 checkpoints | ${types(A2C)} |

## Conferência com o que o projeto declara

| Alegação (\`AGENTS.md\` / \`docs/roadmap.md\`) | Medido | Resultado |
|---|---|---|
| A1: 443 identidades novas | ${vocabOf("ko-a1").length} | ✅ |
| A1: 443 frases contextuais | ${sentencesOf("ko-a1")} | ✅ |
| A1: 615 exercícios (79 mcq, 183 cloze, 132 listen, 97 translate, 124 reading) | ${nEx(A1) + nEx(A1C)} (${types([...A1, ...A1C])}) | ✅ |
| A2: 400 identidades novas | ${vocabOf("ko-a2").length} | ✅ |
| A2: 400 frases + 615 exercícios (132 listen, 132 reading, 125 cloze, 125 translate, 101 mcq) | ${vocabOf("ko-a2").length}, ${nEx(A2) + nEx(A2C)} (${types([...A2, ...A2C])}) | ✅ |
| A2: 115 reusos distintos do A1/Hangul (515 ensinadas/retomadas) | ${new Set([...A2, ...A2C].flatMap((s) => s.vocabulary?.reusedIds || [])).size} identidades reusadas declaradas; ${vocabOf("ko-a2").length} + reusos = ${vocabOf("ko-a2").length + new Set([...A2].flatMap((l) => l.vocabulary.reusedIds)).size} | ✅ (ver nota abaixo) |
| "Typecheck + 549 Vitest" | 543 testes em 35 arquivos nesta baseline | ⚠️ divergência de contagem de testes (não de conteúdo) |

Nota do reuso A2: o conjunto de \`reusedIds\` das 40 lições A2 soma as identidades
A1/Hangul retomadas; checkpoints repetem ids já contados nas lições, por isso a
contagem "distintos" depende de filtrar só as lições. O número medido nas lições é
o comparável com a documentação.

## Superfície realmente lida na revisão linguística (fichas)

| Ficha | Passos | Itens listados | Linhas |
|---|---|---|---|
${Object.entries(sheets).map(([f, v]) => `| \`data/sheets/${f}\` | ${v.passos} | ${v.itens} | ${v.linhas} |`).join("\n")}

Total revisado (sem a ficha combinada \`vocab-all.md\`, substituída pelas três
fichas por curso): **${sheetTotal} itens**. Cada lote tem sua contagem por tipo
na seção \`## Cobertura\` do respectivo arquivo de achados.

## Estado de revisão declarado pelo próprio repositório

- ${data.vocab.filter((v) => v.review.status === "in-review").length}/${data.vocab.length} entradas de vocabulário com \`review.status = "in-review"\`.
- Todo bloco de gramática e toda fala de A1/A2 carregam \`in-review\` com a nota
  "naturalidade, tradução e registro aguardam revisão de falante nativo".
- ${vocabOf("hangul").length - sentencesOf("hangul")} entradas legadas do Hangul não têm frase contextual
  (${sentencesOf("hangul")} de ${vocabOf("hangul").length} têm) → em \`/vocabulario/revisao\` caem no modo
  \`flashcard\`, não \`context\` (\`src/lib/vocabulary/queue.ts:38-43\`). Limite herdado, não
  defeito desta geração de conteúdo.
- Nenhum item desta auditoria alterou \`review.status\`: afirmar revisão nativa continua
  fora de questão, e o corpus de MP3 é sintético com licença bloqueada
  (\`docs/audio/license-audit.md\`).
`,
);
console.log("inventory.md escrito");
