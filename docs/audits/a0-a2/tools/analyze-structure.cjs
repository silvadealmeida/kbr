/**
 * Auditoria PASS A — análise estrutural programática do dump de conteúdo.
 * Uso: node docs/audits/a0-a2/tools/analyze-structure.cjs
 * Saída: docs/audits/a0-a2/data/structure-findings.json (+ resumo no stdout)
 *
 * Importante: estas checagens provam integridade de dados (referências,
 * gabaritos, contagens, alvos de lacuna). Elas NÃO provam correção do
 * coreano, naturalidade ou exatidão das traduções.
 */
const fs = require("node:fs");
const path = require("node:path");

const ROOT = path.resolve(__dirname, "..", "..", "..", "..");
const data = require(path.join(ROOT, "docs/audits/a0-a2/data/content-dump.json"));

const findings = [];
const HANGUL = /[가-힣ᄀ-ᄙ]/;
const add = (check, item, message, extra) =>
  findings.push({ check, item, message, ...(extra ? { extra } : {}) });

const allItems = [];
for (const course of ["a1", "a2"]) {
  for (const l of data[`${course}Lessons`]) allItems.push({ course, kind: "lesson", l });
  for (const c of data[`${course}Checkpoints`]) allItems.push({ course, kind: "checkpoint", l: c });
}

const vocabById = new Map(data.vocab.map((v) => [v.id, v]));
const sentencesByVocab = new Map();
for (const s of data.sentences) {
  if (!sentencesByVocab.has(s.vocabId)) sentencesByVocab.set(s.vocabId, []);
  sentencesByVocab.get(s.vocabId).push(s);
}

/** Normaliza lacunas: o conteúdo usa "___" ou "„…" etc. Detectamos o marker real. */
function blankMarkers(prompt) {
  return {
    underscore: (prompt.match(/_{2,}/g) || []).length,
    ellipsis: (prompt.match(/\[\s*\]/g) || []).length,
  };
}

// ---------------------------------------------------------------- item-level
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
        if (ex.answer && (ex.prompt || "").includes(ex.answer))
          add("cloze-answer-leaked", at, "resposta aparece no enunciado", { answer: ex.answer, prompt: ex.prompt });
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
        const promptHasHangul = HANGUL.test(ex.prompt || "");
        if (isPtToKo && promptHasHangul === false && HANGUL.test(ex.answer || "")) {
          /* ok: pede coreano */
        }
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

// -------------------------------------------------------- global id uniquely
for (const course of ["a1", "a2"]) {
  const seen = new Map();
  for (const l of [...data[`${course}Lessons`], ...data[`${course}Checkpoints`]])
    for (const ex of l.exercises || []) seen.set(ex.id, (seen.get(ex.id) || 0) + 1);
  for (const [id, n] of seen) if (n > 1) add("duplicate-exercise-id", `${course}/${id}`, `aparece ${n}x`);
}

// ---------------------------------------------------------------- vocabulary
for (const v of data.vocab) {
  if (!HANGUL.test(v.ko)) add("vocab-ko-no-hangul", v.id, v.ko);
  if (!v.pt || !v.pt.trim()) add("vocab-pt-empty", v.id, v.ko);
  if (!v.audioText || !HANGUL.test(v.audioText)) add("vocab-audio-bad", v.id, `${v.ko} | audioText=${v.audioText}`);
  if (!v.lesson) add("vocab-lesson-missing", v.id, v.ko);
}
for (const s of data.sentences) {
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

// -------------------------------------------------- reference integrity A1/A2
for (const course of ["a1", "a2"]) {
  const blueprint = data[`${course}Blueprint`];
  const lessonIds = new Set(blueprint.lessons.map((l) => l.id));
  for (const l of data[`${course}Lessons`]) {
    const plan = blueprint.lessons.find((x) => x.id === l.id);
    for (const id of l.vocabulary.newIds) if (!vocabById.has(id)) add("vocab-ref-missing", `${l.id}`, `newIds → ${id}`);
    for (const id of l.vocabulary.reusedIds) if (!vocabById.has(id)) add("vocab-ref-missing", `${l.id}`, `reusedIds → ${id}`);
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
  }
  for (const c of data[`${course}Checkpoints`]) {
    const expected = c.id.endsWith("c08") ? 40 : 25;
    if ((c.exercises || []).length !== expected) add("checkpoint-exercise-count", c.id, `${c.exercises.length} itens; esperado ${expected}`);
    for (const ex of c.exercises) {
      const tag = (ex.tags || []).find((t) => /-l\d\d$/.test(t) || /^a2-c|^a1-c/.test(t));
      if (!ex.tags?.some((t) => /^[ab]\d-[lc]\d\d$/.test(t))) add("checkpoint-exercise-no-source-tag", `${c.id}/${ex.id}`, JSON.stringify(ex.tags));
    }
  }
  // every lesson checkpoint tag must point to a real lesson id
  const knownSteps = new Set([...blueprint.lessons.map((x) => x.id), ...blueprint.checkpoints.map((x) => x.id)]);
  for (const c of data[`${course}Checkpoints`])
    for (const ex of c.exercises)
      for (const t of ex.tags || [])
        if (/^[ab]\d-l\d\d$/.test(t) && !knownSteps.has(t)) add("checkpoint-tag-unknown-lesson", `${c.id}/${ex.id}`, t);
}

// ------------------------------------------------------------------- summary
const byCheck = {};
for (const f of findings) byCheck[f.check] = (byCheck[f.check] || 0) + 1;

const inventory = {
  baseline: "3103ce3",
  hangul: {
    lessons: data.hangul.lessons.length,
    checkpoints: data.hangul.checkpoints.length,
    syllables: data.hangul.syllables.length,
    words: data.hangul.words.length,
    jamo: data.hangul.jamo.length,
    rules: data.hangul.rules.length,
    exercises: [...data.hangul.lessons, ...data.hangul.checkpoints].reduce((n, s) => n + s.exercises.length, 0),
  },
  a1: {
    lessons: data.a1Lessons.length,
    checkpoints: data.a1Checkpoints.length,
    exercises: [...data.a1Lessons, ...data.a1Checkpoints].reduce((n, s) => n + s.exercises.length, 0),
    dialogueLines: data.a1Lessons.reduce((n, l) => n + l.dialogue.length, 0),
    grammarBlocks: data.a1Lessons.reduce((n, l) => n + (l.grammar || []).length, 0),
    grammarExamples: data.a1Lessons.reduce((n, l) => n + (l.grammar || []).reduce((k, g) => k + g.examples.length, 0), 0),
    introPanels: data.a1Lessons.reduce((n, l) => n + l.intro.length, 0),
  },
  a2: {
    lessons: data.a2Lessons.length,
    checkpoints: data.a2Checkpoints.length,
    exercises: [...data.a2Lessons, ...data.a2Checkpoints].reduce((n, s) => n + s.exercises.length, 0),
    dialogueLines: data.a2Lessons.reduce((n, l) => n + l.dialogue.length, 0),
    grammarBlocks: data.a2Lessons.reduce((n, l) => n + (l.grammar || []).length, 0),
    grammarExamples: data.a2Lessons.reduce((n, l) => n + (l.grammar || []).reduce((k, g) => k + g.examples.length, 0), 0),
    introPanels: data.a2Lessons.reduce((n, l) => n + l.intro.length, 0),
  },
  vocabulary: {
    entries: data.vocab.length,
    byCourse: data.vocab.reduce((acc, v) => ({ ...acc, [v.course]: (acc[v.course] || 0) + 1 }), {}),
    sentences: data.sentences.length,
    entriesWithoutSentence: data.vocab.filter((v) => !sentencesByVocab.has(v.id)).length,
  },
};

const exerciseTypes = {};
for (const course of ["a1", "a2"])
  for (const l of [...data[`${course}Lessons`], ...data[`${course}Checkpoints`]])
    for (const ex of l.exercises) exerciseTypes[`${course}:${ex.type}`] = (exerciseTypes[`${course}:${ex.type}`] || 0) + 1;

fs.writeFileSync(
  path.join(ROOT, "docs/audits/a0-a2/data/structure-findings.json"),
  JSON.stringify({ inventory, exerciseTypes, findingsByCheck: byCheck, findings }, null, 2),
);

console.log(JSON.stringify({ inventory, exerciseTypes, findingsByCheck: byCheck, total: findings.length }, null, 2));
