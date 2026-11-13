/**
 * Auditoria — gera fichas de revisão linguística (PASS B) em
 * docs/audits/a0-a2/data/sheets/*.md, uma por lote, com uma linha por item:
 *   id | coreano | português
 * As fichas são apenas leitura: servem para revisar 100% dos itens com IDs
 * estáveis. Não alteram conteúdo.
 *
 * Uso: node docs/audits/a0-a2/tools/make-sheets.cjs
 */
const fs = require("node:fs");
const path = require("node:path");

const ROOT = path.resolve(__dirname, "..", "..", "..", "..");
const DATA = path.join(ROOT, "docs/audits/a0-a2/data/content-dump.json");
const OUT = path.join(ROOT, "docs/audits/a0-a2/data/sheets");
const data = require(DATA);
fs.mkdirSync(OUT, { recursive: true });

const lines = [];
let cur = null;
function open(name, title) {
  close();
  cur = { name, title, rows: [] };
  lines.push(null);
}
function close() {
  if (!cur) return;
  fs.writeFileSync(path.join(OUT, cur.name), `# ${cur.title}\n\n${cur.rows.join("\n")}\n`);
  console.log(cur.name, cur.rows.length, "linhas");
  cur = null;
}
const row = (r) => cur && cur.rows.push(r);

const optsOf = (ex) => (ex.options || []).map((o) => (typeof o === "string" ? o : o.label)).join(" | ");

function exerciseRow(l, ex) {
  const koBits = [];
  const ptBits = [];
  switch (ex.type) {
    case "mcq":
      ptBits.push(`P: ${ex.prompt}`, `O: ${optsOf(ex)}`, `A: ${ex.correctAnswer}`);
      break;
    case "reading":
      koBits.push(ex.text);
      ptBits.push(`P: ${ex.question || ex.prompt}`, `O: ${optsOf(ex)}`);
      if (ex.mode === "mcq") ptBits.push(`A: ${(ex.options || []).find((o) => o.id === ex.correctOptionId)?.label || ex.correctOptionId}`);
      else ptBits.push(`A: ${ex.answer}`);
      break;
    case "cloze":
      koBits.push(ex.prompt);
      ptBits.push(`A: ${ex.answer}`);
      break;
    case "listen":
      koBits.push(ex.audioText);
      ptBits.push(`P: ${ex.prompt}`, `A: ${ex.answer}${ex.acceptedAnswers?.length ? " | alt: " + ex.acceptedAnswers.join(" / ") : ""}`);
      break;
    case "translate":
      if (ex.direction === "pt-ko") {
        ptBits.push(`P: ${ex.prompt}`);
        koBits.push(ex.answer);
        if (ex.acceptedAnswers?.length) koBits.push(...ex.acceptedAnswers);
      } else {
        koBits.push(ex.prompt);
        ptBits.push(`A: ${ex.answer}`);
      }
      break;
    default:
      ptBits.push(JSON.stringify(ex).slice(0, 200));
  }
  if (ex.explanation) ptBits.push(`X: ${ex.explanation}`);
  row(`${ex.id} [${ex.type}/${ex.stage || "-"}] KO: ${koBits.filter(Boolean).join(" ⟦⟧ ")} || PT: ${ptBits.filter(Boolean).join(" · ")}`);
}

function stepBlock(step, isLesson) {
  row(`\n### ${step.id} — ${step.title}`);
  if (isLesson) {
    row(`OBJ: ${step.objective}`);
    for (const g of step.grammar || []) {
      row(`${g.id} [gram] FORM: ${g.form} || PT: ${g.titlePt} · ${g.explanationPt}`);
      for (const e of g.examples || []) row(`${g.id}/ex [gram-ex] KO: ${e.ko} || PT: ${e.pt}`);
    }
    for (const p of step.intro || []) row(`${step.id}/intro [intro] KO: ${p.ko || "-"} || PT: ${p.title} · ${p.body}`);
    for (const d of step.dialogue || []) row(`${d.id} [fal:line] KO: ${d.ko} || PT: ${d.pt} · ${d.speaker}`);
    (step.summary || []).forEach((s, i) => row(`${step.id}/sum${i} [sum] PT: ${s}`));
    if (step.completion) row(`${step.id}/compl [completion] PT: ${JSON.stringify(step.completion).slice(0, 300)}`);
  }
  for (const ex of step.exercises || []) exerciseRow(step, ex);
}

// ---------------- A0 Hangul
open("a0-hangul.md", "A0 Hangul — h01–h25, c1–c4, jamo, sílabas, palavras, regras");
const H = data.hangul;
const syllById = new Map(H.syllables.map((s) => [s.id, s]));
const wordById = new Map(H.words.map((w) => [w.id, w]));

function hangulExerciseRow(ex) {
  switch (ex.type) {
    case "mcq":
      row(`${ex.id} [mcq] PT: ${ex.prompt} || O: ${(ex.options || []).join(" | ")} · A: ${ex.correctAnswer}${ex.explanation ? " · X: " + ex.explanation : ""}`);
      break;
    case "cloze":
    case "listen":
    case "translate":
      row(`${ex.id} [${ex.type}] KO: ${ex.audioText || ex.prompt || ""} || A: ${ex.answer}${ex.acceptedAnswers ? " | alt: " + ex.acceptedAnswers.join(" / ") : ""}${ex.explanation ? " · X: " + ex.explanation : ""}`);
      break;
    case "build-syllable":
      row(`${ex.id} [build-syllable] PT: ${ex.prompt} || ALVO: inicial=${ex.initial} medial=${ex.medial} final=${ex.final || "-"} target=${ex.target || ""} || OPÇÕES: i[${(ex.initialOptions || []).join(",")}] m[${(ex.medialOptions || []).join(",")}] f[${(ex.finalOptions || []).join(",")}]`);
      break;
    case "audio-to-char":
      row(`${ex.id} [audio-to-char] ÁUDIO: ${ex.audioText} || PT: ${ex.prompt} || FALLBACK: ${ex.fallback} || O: ${(ex.options || []).map((o) => `${o.id}=${o.jamo}`).join(" | ")} · A: ${ex.correctOptionId}${ex.explanation ? " · X: " + ex.explanation : ""}`);
      break;
    case "char-to-audio":
      row(`${ex.id} [char-to-audio] VISTO: ${ex.text} || PT: ${ex.prompt} || O: ${(ex.options || []).map((o) => `${o.id}: ${o.label} [áudio ${o.audioText}]`).join(" | ")} · A: ${ex.correctOptionId}${ex.explanation ? " · X: " + ex.explanation : ""}`);
      break;
    case "minimal-pair":
      row(`${ex.id} [minimal-pair] ${ex.presentation}: ${ex.audioText || ex.text || ""} || CONTRASTE: ${ex.contrast?.feature} (${ex.contrast?.a} × ${ex.contrast?.b}) || PT: ${ex.prompt} || FALLBACK: ${ex.fallback || "-"} || O: ${(ex.options || []).map((o) => `${o.id}=${o.label}`).join(" | ")} · A: ${ex.correctOptionId}${ex.explanation ? " · X: " + ex.explanation : ""}`);
      break;
    case "reading":
      row(`${ex.id} [reading/${ex.mode}] KO: ${ex.text}${ex.audioText ? ` [áudio ${ex.audioText}]` : ""} || PT: ${ex.question || ex.prompt} || O: ${(ex.options || []).map((o) => o.label).join(" | ")} · A: ${ex.correctOptionId || ex.answer || "autoavaliação"}${ex.explanation ? " · X: " + ex.explanation : ""}`);
      break;
    default:
      row(`${ex.id} [${ex.type}] ${JSON.stringify(ex)}`);
  }
}

for (const l of H.lessons) {
  row(`\n### ${l.id} — ${l.title} (unidade ${l.unit})`);
  row(`OBJ: ${l.objective} || ${l.objectives.join(" · ")}`);
  row(`NOVO: jamo [${l.newJamo.join(", ")}] finals [${l.newFinals.join(", ")}] prereq [${l.prerequisites.join(", ")}]`);
  for (const p of l.intro || []) row(`${l.id}/intro [intro] KO: ${p.ko || "-"} || PT: ${p.title} · ${p.body}`);
  for (const e of l.examples || []) {
    if (e.kind === "word") {
      const w = wordById.get(e.id);
      row(`${e.id} [palavra] KO: ${w.ko} || PT: ${w.pt} · sílabas ${w.syllables.join("+")}${w.notes ? " · NOTA: " + w.notes : ""}${w.audioText && w.audioText !== w.ko ? " · áudio " + w.audioText : ""}`);
    } else {
      const s = syllById.get(e.id);
      row(`${e.id} [sílaba] KO: ${s.text} || inicial ${s.initial} medial ${s.medial} final ${s.final || "-"}`);
    }
  }
  row(`CRITÉRIO: minScore ${l.completion.minScore}${l.completion.minCorrect ? ` · minCorrect ${l.completion.minCorrect}` : ""}${l.completion.rules ? " · regras " + l.completion.rules.map((r) => `${r.id}(${r.label}): ${r.exerciseIds.join(",")}≥${r.minCorrect}`).join(" ; ") : ""}`);
  for (const ex of l.exercises || []) hangulExerciseRow(ex);
}
for (const c of H.checkpoints) {
  row(`\n### ${c.id} — ${c.title} (unidade ${c.unit})`);
  row(`OBJ: ${c.objective} || lições ${c.lessonIds.join(",")} || ${c.instructions.join(" · ")}`);
  for (const ex of c.exercises || []) hangulExerciseRow(ex);
}
row(`\n### JAMO (40 registros de pronúncia)`);
for (const j of H.jamo)
  row(`${j.symbol} [jamo:${j.kind}] nomeKo: ${j.nameKo} || nomePt: ${j.namePt} · IPA [${j.ipa.join(", ")}] · introduzido em ${j.introducedIn}${j.notes ? " · NOTA: " + j.notes : ""}`);
row(`\n### REGRAS DE PRONÚNCIA`);
for (const r of H.rules) {
  row(`${r.id} [regra:${r.kind}] PT: ${r.title} · ${r.explanation}`);
  for (const e of r.examples) row(`${r.id}/ex [regra-ex] KO escrito: ${e.written} → falado: ${e.spoken}${e.note ? ` || NOTA: ${e.note}` : ""}`);
}
row(`\n### SYLLABLES (todas as 151)`);
for (const s of H.syllables) row(`${s.id} [syl] KO: ${s.text} || ${s.initial}+${s.medial}${s.final ? "+" + s.final : ""} · em ${s.introducedIn}${s.audioText && s.audioText !== s.text ? " · áudio " + s.audioText : ""}`);
close();

// ---------------- A1/A2 por módulo
for (const course of ["a1", "a2"]) {
  const bp = data[`${course}Blueprint`];
  for (const m of bp.modules) {
    open(`${course}-m0${m.number}.md`, `${course.toUpperCase()} módulo ${m.number} — ${m.title}`);
    const lessons = data[`${course}Lessons`].filter((l) => l.moduleId === m.id);
    const cps = data[`${course}Checkpoints`].filter((c) => c.moduleId === m.id);
    for (const l of lessons) stepBlock(l, true);
    for (const c of cps) stepBlock(c, false);
    close();
  }
}

// ---------------- Vocabulário
open("vocab-all.md", "Vocabulário canônico (976 entradas + frases contextuais)");
const byCourse = new Map();
for (const v of data.vocab) {
  if (!byCourse.has(v.course)) byCourse.set(v.course, []);
  byCourse.get(v.course).push(v);
}
for (const [course, list] of byCourse) {
  row(`\n### curso ${course} (${list.length})`);
  for (const v of list) {
    row(`${v.id} [vocab:${v.pos || "-"}] KO: ${v.ko} || PT: ${v.pt}${v.notes ? " · NOTA: " + v.notes : ""} · aula ${v.lesson}`);
    for (const s of data.sentences.filter((x) => x.vocabId === v.id))
      row(`${s.id} [frase] KO: ${s.ko} || PT: ${s.pt} · alvo ${s.target} · sentido ${s.contextMeaning}${s.accepted?.length ? " · aceitas " + s.accepted.join("/") : ""}`);
  }
}
close();
