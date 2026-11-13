/**
 * Auditoria 12B — análise estrutural programática do dump B1 (read-only).
 * Uso: node docs/audits/b1/tools/analyze-structure.cjs
 * Saída: docs/audits/b1/data/structure-findings.json (+ resumo no stdout)
 *
 * Metodologia portada de `docs/audits/a0-a2/tools/analyze-structure.cjs`,
 * aplicada aos datasets B1. Estas checagens provam integridade de dados
 * (referências, gabaritos, contagens, alvos de lacuna). Elas NÃO provam
 * correção do coreano, naturalidade ou exatidão das traduções.
 */
const fs = require("node:fs");
const path = require("node:path");

const ROOT = path.resolve(__dirname, "..", "..", "..", "..");
const data = require(path.join(ROOT, "docs/audits/b1/data/content-dump.json"));

const findings = [];
const HANGUL = /[가-힣ᄀ-ᄙ]/;
const add = (check, item, message, extra) =>
  findings.push({ check, item, message, ...(extra ? { extra } : {}) });

const allItems = [];
for (const l of data.b1Lessons) allItems.push({ course: "b1", kind: "lesson", l });
for (const c of data.b1Checkpoints) allItems.push({ course: "b1", kind: "checkpoint", l: c });

const vocabById = new Map(data.vocab.map((v) => [v.id, v]));
const sentencesByVocab = new Map();
for (const s of data.sentences) {
  if (!sentencesByVocab.has(s.vocabId)) sentencesByVocab.set(s.vocabId, []);
  sentencesByVocab.get(s.vocabId).push(s);
}

function blankMarkers(prompt) {
  return {
    underscore: (prompt.match(/_{2,}/g) || []).length,
    ellipsis: (prompt.match(/\[\s*\]/g) || []).length,
  };
}

for (const { course, kind, l } of allItems) {
  const exercises = l.exercises || [];
  const ids = new Set();
  if (kind === "lesson") {
    (l.intro || []).forEach((p, i) => {
      if (!p.title || !p.body) add("intro-incomplete", `${l.id}.intro[${i}]`, "Painel de introdução sem título ou corpo.");
      if (p.ko && !HANGUL.test(p.ko)) add("intro-ko-no-hangul", `${l.id}.intro[${i}]`, `Intro 'ko' sem Hangul: ${p.ko}`);
    });
    (l.dialogue || []).forEach((d, i) => {
      if (!HANGUL.test(d.ko)) add("dialogue-ko-no-hangul", `${l.id}.dialogue[${i}]`, d.ko);
      if (!d.pt || d.pt.trim().length === 0) add("dialogue-pt-empty", `${l.id}.dialogue[${i}]`, d.ko);
      if (d.audioText && d.audioText.replace(/\s/g, "") !== d.ko.replace(/\s/g, ""))
        add("dialogue-audio-mismatch", `${l.id}.dialogue[${i}]`, "audioText difere de ko", { ko: d.ko, audioText: d.audioText });
    });
    (l.grammar || []).forEach((g, i) => {
      const gid = `${l.id}.grammar[${i}]`;
      if (ids.has(g.id)) add("duplicate-grammar-id", gid, `id duplicado: ${g.id}`);
      ids.add(g.id);
      if (!g.titlePt || !g.explanationPt) add("grammar-incomplete", g.id || gid, "Gramática sem título ou explicação.");
      (g.examples || []).forEach((e, j) => {
        if (!HANGUL.test(e.ko)) add("grammar-ko-no-hangul", `${g.id}.ex[${j}]`, e.ko);
        if (!e.pt) add("grammar-pt-empty", `${g.id}.ex[${j}]`, e.ko);
        if (e.audioText && e.audioText !== e.ko)
          add("grammar-audio-mismatch", `${g.id}.ex[${j}]`, "audioText difere de ko", { ko: e.ko, audioText: e.audioText });
      });
    });
  }
  exercises.forEach((ex, i) => {
    const at = `${l.id}/${ex.id}`;
    if (!ex.id) add("exercise-id-missing", `${at}[${i}]`, "Exercício sem id.");
    switch (ex.type) {
      case "mcq": {
        if (!ex.options.includes(ex.correctAnswer)) add("mcq-answer-not-in-options", at, `gabarito fora das opções: ${ex.correctAnswer}`);
        if (new Set(ex.options).size !== ex.options.length) add("mcq-duplicate-options", at, JSON.stringify(ex.options));
        if (ex.options.length < 2) add("mcq-few-options", at, `${ex.options.length} opções`);
        break;
      }
      case "reading": {
        if (!HANGUL.test(ex.text || "")) add("reading-no-hangul", at, "Texto de leitura sem Hangul.");
        if (ex.mode === "mcq") {
          const labels = ex.options.map((o) => o.label);
          if (!ex.options.some((o) => o.id === ex.correctOptionId)) add("reading-answer-not-in-options", at, ex.correctOptionId);
          if (new Set(labels).size !== labels.length) add("reading-duplicate-options", at, JSON.stringify(labels));
        } else if (ex.answer && !HANGUL.test(ex.answer)) {
          add("reading-answer-not-korean", at, JSON.stringify(ex.answer));
        }
        break;
      }
      case "cloze": {
        const m = blankMarkers(ex.prompt || "");
        if (m.underscore === 0 && m.ellipsis === 0) add("cloze-no-blank", at, ex.prompt);
        if (m.underscore > 1) add("cloze-multi-blank", at, ex.prompt);
        if (ex.answer && ex.answer.length >= 2 && new RegExp(`(^|[^가-힣])${ex.answer}([^가-힣]|$)`).test((ex.prompt || "").replace(/_{2,}/g, "@")))
          add("cloze-answer-leaked", at, "resposta aparece como token independente fora da lacuna", { answer: ex.answer, prompt: ex.prompt });
        if (ex.answer && !HANGUL.test(ex.answer) && !/^[a-z]+$/.test(ex.answer))
          add("cloze-answer-suspicious", at, ex.answer);
        break;
      }
      case "listen": {
        if (!HANGUL.test(ex.audioText || "")) add("listen-audio-no-hangul", at, ex.audioText || "(vazio)");
        const accepted = [ex.answer, ...(ex.acceptedAnswers || [])];
        if (!accepted.includes(ex.audioText)) add("listen-answer-not-audio", at, "resposta difere do texto do áudio", { audioText: ex.audioText, answer: ex.answer, accepted });
        if (ex.options && new Set(ex.options).size !== ex.options.length) add("listen-duplicate-options", at, JSON.stringify(ex.options));
        break;
      }
      case "translate": {
        const isPtToKo = ex.direction === "pt-ko";
        if (isPtToKo && !HANGUL.test(ex.answer || "")) add("translate-ptko-answer-not-korean", at, ex.answer);
        if (!isPtToKo && HANGUL.test(ex.prompt || "") === false) add("translate-ko-pt-no-source", at, ex.prompt);
        if (!isPtToKo && HANGUL.test(ex.answer || "")) add("translate-kopt-answer-is-korean", at, ex.answer);
        const all = [ex.answer, ...(ex.acceptedAnswers || [])];
        if (new Set(all.map((a) => String(a).trim())).size !== all.length) add("translate-duplicate-accepted", at, JSON.stringify(all));
        break;
      }
      default:
        add("exercise-unknown-type", at, ex.type);
    }
    if (!ex.prompt && !ex.question) add("exercise-no-prompt", at, JSON.stringify(ex).slice(0, 120));
    if (!ex.explanation) add("exercise-no-explanation", at, ex.type);
  });
}

// unicidade global de IDs de exercício (B1 + A1 + A2 juntos)
{
  const seen = new Map();
  for (const course of ["b1", "a1", "a2"])
    for (const l of [...data[`${course}Lessons`], ...data[`${course}Checkpoints`]])
      for (const ex of l.exercises || []) seen.set(ex.id, (seen.get(ex.id) || 0) + 1);
  for (const [id, n] of seen) if (n > 1) add("duplicate-exercise-id", id, `aparece ${n}x`);
}

// vocabulário e frases B1
const b1Vocab = data.vocab.filter((v) => v.course === "ko-b1");
for (const v of b1Vocab) {
  if (!HANGUL.test(v.ko)) add("vocab-ko-no-hangul", v.id, v.ko);
  if (!v.pt || !v.pt.trim()) add("vocab-pt-empty", v.id, v.ko);
  if (!v.audioText || !HANGUL.test(v.audioText)) add("vocab-audio-bad", v.id, `${v.ko} | audioText=${v.audioText}`);
  if (!v.lesson) add("vocab-lesson-missing", v.id, v.ko);
}
const b1Sentences = data.sentences.filter((s) => s.id.startsWith("sent:b1-"));
for (const s of b1Sentences) {
  if (!vocabById.has(s.vocabId)) add("sentence-orphan", s.id, `vocabId inexistente: ${s.vocabId}`);
  const occ = s.ko.split(s.target).length - 1;
  if (occ !== 1) add("sentence-target-count", s.id, `alvo '${s.target}' ocorre ${occ}x em: ${s.ko}`);
  const at = s.ko.indexOf(s.target);
  if (at > 0 && !/\s/.test(s.ko[at - 1])) add("sentence-target-not-word-start", s.id, `${s.target} em '${s.ko}'`);
  if (s.target.length === 0) add("sentence-target-empty", s.id, s.ko);
  if (!s.pt || !s.pt.trim()) add("sentence-pt-empty", s.id, s.ko);
  if (!s.contextMeaning || !s.contextMeaning.trim()) add("sentence-meaning-empty", s.id, s.ko);
  if (!HANGUL.test(s.ko)) add("sentence-ko-no-hangul", s.id, s.ko);
}

// integridade das referências por lição B1 contra o blueprint
{
  const blueprint = data.b1Blueprint;
  const lessonIds = new Set(blueprint.lessons.map((l) => l.id));
  for (const l of data.b1Lessons) {
    const plan = blueprint.lessons.find((x) => x.id === l.id);
    for (const id of l.vocabulary.newIds) if (!vocabById.has(id)) add("vocab-ref-missing", l.id, `newIds → ${id}`);
    for (const id of l.vocabulary.reusedIds) if (!vocabById.has(id)) add("vocab-ref-missing", l.id, `reusedIds → ${id}`);
    if (plan) {
      const min = plan.vocabulary.newItems.min;
      const max = plan.vocabulary.newItems.max;
      const n = l.vocabulary.newIds.length;
      if (n < min || n > max) add("vocab-count-offplan", l.id, `${n} novos; plano ${min}–${max}`);
      const guided = l.exercises.filter((e) => e.stage === "guided").length;
      const indep = l.exercises.filter((e) => e.stage === "independent").length;
      if (guided !== 5 || indep !== 5) add("lesson-stage-split", l.id, `${guided} guiados / ${indep} independentes`);
      if (l.exercises.length !== 10) add("lesson-exercise-count", l.id, `${l.exercises.length} exercícios`);
    } else {
      add("lesson-not-in-blueprint", l.id, "");
    }
    for (const id of l.vocabulary.newIds) {
      const entry = vocabById.get(id);
      if (entry && entry.lesson !== l.id) add("vocab-lesson-mismatch", `${l.id}/${id}`, `entrada declara lesson=${entry.lesson}`);
    }
    if (!l.production) add("lesson-no-production", l.id, "lição sem tarefa de produção");
  }
  for (const c of data.b1Checkpoints) {
    const expected = c.id.endsWith("c08") ? 40 : 25;
    if ((c.exercises || []).length !== expected) add("checkpoint-exercise-count", c.id, `${c.exercises.length} itens; esperado ${expected}`);
    for (const ex of c.exercises) {
      if (!(ex.tags || []).includes(c.id)) add("checkpoint-exercise-no-tag", `${c.id}/${ex.id}`, JSON.stringify(ex.tags));
    }
  }
  // Observação estrutural (não defeito): nos checkpoints B1 a tag de lição é o
  // próprio checkpoint (o builder deriva de id), sem procedência da lição de
  // origem — diferente de A1/A2, que taggeiam a lição-fonte.
}

const byCheck = {};
for (const f of findings) byCheck[f.check] = (byCheck[f.check] || 0) + 1;

const inventory = {
  baseline: data.baseline,
  b1: {
    lessons: data.b1Lessons.length,
    checkpoints: data.b1Checkpoints.length,
    exercises: [...data.b1Lessons, ...data.b1Checkpoints].reduce((n, s) => n + s.exercises.length, 0),
    dialogueLines: data.b1Lessons.reduce((n, l) => n + l.dialogue.length, 0),
    grammarBlocks: data.b1Lessons.reduce((n, l) => n + (l.grammar || []).length, 0),
    grammarExamples: data.b1Lessons.reduce((n, l) => n + (l.grammar || []).reduce((k, g) => k + g.examples.length, 0), 0),
    introPanels: data.b1Lessons.reduce((n, l) => n + l.intro.length, 0),
    productionTasks: data.b1Lessons.filter((l) => l.production).length,
    newVocab: b1Vocab.length,
    b1Sentences: b1Sentences.length,
    reusedRefs: data.b1Lessons.reduce((n, l) => n + l.vocabulary.reusedIds.length, 0),
    distinctReused: new Set(data.b1Lessons.flatMap((l) => l.vocabulary.reusedIds)).size,
    tagProvenance: {
      b1CheckpointItems: data.b1Checkpoints.reduce((n, c) => n + c.exercises.length, 0),
      withSourceLessonTag: data.b1Checkpoints.reduce(
        (n, c) => n + c.exercises.filter((ex) => (ex.tags || []).some((t) => /^b1-l\d\d$/.test(t))).length,
        0,
      ),
    },
  },
  exerciseTypes: (() => {
    const t = {};
    for (const l of [...data.b1Lessons, ...data.b1Checkpoints])
      for (const ex of l.exercises) t[ex.type] = (t[ex.type] || 0) + 1;
    return t;
  })(),
};

fs.writeFileSync(
  path.join(ROOT, "docs/audits/b1/data/structure-findings.json"),
  JSON.stringify({ inventory, findingsByCheck: byCheck, findings }, null, 2),
);

console.log(JSON.stringify({ inventory, findingsByCheck: byCheck, total: findings.length }, null, 2));
for (const f of findings.slice(0, 30)) console.log(`- [${f.check}] ${f.item}: ${f.message}`);
