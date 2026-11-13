/**
 * Auditoria PASS A — progressão e dependências (heurístico, read-only).
 * Uso: node docs/audits/a0-a2/tools/analyze-progression.cjs
 * Saída: docs/audits/a0-a2/data/progression-findings.json
 *
 * Três checagens, todas suspeitas a confirmar na revisão linguística:
 *  1. answer-not-taught — gabarito coreano que não aparece no material
 *     ensinado da própria lição nem em lições anteriores.
 *  2. unknown-noun — substantivo (token + partícula) cobrado em exercício sem
 *     forma conhecida no vocabulário/textos já apresentados.
 *  3. marker-order — terminação gramatical usada em exercício antes de ser
 *     ensinada em material apresentacional e antes da lição que a declara.
 *
 * Nada aqui prova correção linguística; é triagem de carga e de ordem.
 */
const fs = require("node:fs");
const path = require("node:path");

const ROOT = path.resolve(__dirname, "..", "..", "..", "..");
const data = require(path.join(ROOT, "docs/audits/a0-a2/data/content-dump.json"));
const out = { answerNotTaught: [], unknownNoun: [], markerOrder: [], markerFirstSeen: {} };

const PARTICLES = [
  "에서부터", "으로써", "으로서", "한테서", "에게서", "에서", "부터", "까지", "만큼", "처럼", "보다",
  "뿐", "마다", "조차", "마저", "이나", "라도", "으로", "이고", "에게", "한테", "께서", "께",
  "이", "가", "은", "는", "을", "를", "의", "에", "와", "과", "도", "만", "로",
];

const koreans = (s) => (String(s || "").match(/[가-힣][가-힣]*/g) || []);
const norm = (s) => String(s || "").replace(/\s+/g, "").replace(/[.,!?…"'“”‘’]/g, "");

function taughtText(l) {
  const bits = [];
  for (const p of l.intro || []) bits.push(p.body, p.ko);
  for (const d of l.dialogue || []) bits.push(d.ko);
  for (const g of l.grammar || []) bits.push(g.form, g.explanationPt, ...(g.examples || []).flatMap((e) => [e.ko, e.pt]));
  for (const s of l.summary || []) bits.push(s);
  return bits.join(" ");
}

function exerciseText(ex) {
  return [
    ex.prompt, ex.text, ex.question, ex.audioText, ex.answer,
    ...(ex.acceptedAnswers || []),
    ...(ex.options || []).map((o) => (typeof o === "string" ? o : o.label)),
    ex.explanation,
  ].filter(Boolean).join(" ");
}

function courseSteps(course) {
  const bp = data[`${course}Blueprint`];
  const byModule = new Map();
  const push = (mid, bucket, id) => {
    if (!byModule.has(mid)) byModule.set(mid, { lessons: [], cps: [] });
    byModule.get(mid)[bucket].push(id);
  };
  for (const l of bp.lessons) push(l.moduleId, "lessons", l.id);
  for (const c of bp.checkpoints) push(c.moduleId, "cps", c.id);
  const seq = [];
  for (const m of bp.modules) {
    const g = byModule.get(m.id);
    if (g) seq.push(...g.lessons, ...g.cps);
  }
  const content = new Map();
  for (const l of data[`${course}Lessons`]) content.set(l.id, l);
  for (const c of data[`${course}Checkpoints`]) content.set(c.id, c);
  return seq.filter((id) => content.has(id)).map((id) => ({ id, step: content.get(id), plan: bp.lessons.find((x) => x.id === id) }));
}

const vocabByLesson = new Map();
for (const v of data.vocab) {
  if (!vocabByLesson.has(v.lesson)) vocabByLesson.set(v.lesson, []);
  vocabByLesson.get(v.lesson).push(v);
}
const sentencesByVocab = new Map();
for (const s of data.sentences) {
  if (!sentencesByVocab.has(s.vocabId)) sentencesByVocab.set(s.vocabId, []);
  sentencesByVocab.get(s.vocabId).push(s);
}

const stepsAll = [...courseSteps("a1"), ...courseSteps("a2")];
const pos = new Map(stepsAll.map((e, i) => [e.id, i]));

/** Formas de vocabulário já ensinadas (léxico canônico) até `i`, exclusive. */
const lexiconCache = [];
function lexiconBefore(i) {
  if (lexiconCache[i]) return lexiconCache[i];
  const set = new Set(lexiconBefore.cache?.prev || new Set());
  const forms = new Set();
  for (const v of data.vocab) {
    const p = pos.get(v.lesson);
    if (p === undefined) { addForms(v, forms); continue; } // Hangul/legacy
    if (p < i) addForms(v, forms);
  }
  lexiconCache[i] = forms;
  return forms;
}
function addForms(v, set) {
  set.add(norm(v.ko));
  if (v.audioText) for (const w of koreans(v.audioText)) set.add(norm(w));
  for (const s of sentencesByVocab.get(v.id) || []) {
    set.add(norm(s.target));
    for (const w of koreans(s.ko)) set.add(norm(w));
  }
}

/** Troncos conhecidos: qualquer forma ensinada (léxico + textos apresentacionais). */
function taughtSurface(i) {
  const set = new Set(lexiconBefore(i));
  for (const e of stepsAll) {
    if (pos.get(e.id) > i) break;
    const s = e.step;
    if (!s) continue;
    for (const w of koreans(taughtText(s))) set.add(norm(w));
    if (s.dialogue) for (const d of s.dialogue) set.add(norm(d.ko));
  }
  return set;
}

let prefixIndex = null;
function buildPrefixIndex(forms) {
  prefixIndex = new Set();
  for (const f of forms) for (let n = 2; n <= f.length; n++) prefixIndex.add(f.slice(0, n));
}
function knownByPrefix(tok, forms) {
  const t = norm(tok);
  if (forms.has(t)) return true;
  let base = t;
  for (const p of PARTICLES) {
    if (t.length > p.length && t.endsWith(norm(p))) {
      base = t.slice(0, t.length - norm(p).length);
      break;
    }
  }
  if (base !== t && (forms.has(base) || (base.length >= 3 && prefixIndex?.has(base)))) return true;
  if (base.length < 2 || !prefixIndex) return false;
  for (let n = base.length; n >= 2; n--) if (prefixIndex.has(base.slice(0, n))) return true;
  return false;
}

for (let i = 0; i < stepsAll.length; i++) {
  const { id, step } = stepsAll[i];
  const forms = lexiconBefore(i);
  const surfaces = taughtSurface(i);
  buildPrefixIndex(surfaces);
  const ownVocab = vocabByLesson.get(id) || [];
  for (const v of ownVocab) addForms(v, surfaces);

  for (const ex of step.exercises || []) {
    for (const a of [ex.answer, ...(ex.acceptedAnswers || [])]) {
      if (typeof a !== "string" || !/[가-힣]/.test(a)) continue;
      const unknown = [];
      for (const tok of koreans(a)) if (!knownByPrefix(tok, surfaces) && !knownByPrefix(tok, lexiconBefore(i))) unknown.push(tok);
      if (unknown.length) out.answerNotTaught.push({ step: id, exercise: ex.id, type: ex.type, answer: a, unknownTokens: unknown });
    }
    const seen = new Set();
    for (const tok of koreans(exerciseText(ex))) {
      for (const p of PARTICLES) {
        if (tok.length > p.length + 1 && tok.endsWith(p)) {
          const noun = tok.slice(0, tok.length - p.length);
          if (noun.length >= 2 && !seen.has(noun) && !knownByPrefix(noun, surfaces))
            out.unknownNoun.push({ step: id, exercise: ex.id, token: tok, noun, particle: p });
          seen.add(noun);
          break;
        }
      }
    }
  }
}

const MARKERS = [
  ["-아/어 보다 / 본 적이", /(?:아|어|여)\s?본\s?[적것]/],
  ["-아/어서", /(?:아서|어서|여서|해서)\s/],
  ["-지만", /(?:지지만|지만)\s/],
  ["-는데 / -(으)ㄴ데", /(?:는데|ㄴ데|은데)\s/],
  ["-(으)ㄹ 거예요", /(?:을|ㄹ)\s?거\s?(?:예요|야요|에요|에요)/],
  ["-(으)ㄹ 수 있다/없다", /(?:을|ㄹ)\s?수\s?(?:있|없)/],
  ["-(으)세요", /[으]?세요/],
  ["-(으)시- honífico", /(?:시|옵시)(?:드|었|았|는|ㄹ|고|셔| 컬)/],
  ["-고 싶다", /고\s?싶/],
  ["-아/어 야 하다/돼", /(?:야|어야|여야)\s?(?:해|돼|되)/],
  ["-아/어 있다 (estado)", /(?:아|어|여)있(?:어요|었|는|어)/],
  ["-아/어 주다", /(?:아|어|여)\s?주(?:요|세|었|줘)/],
  ["-(으)ㄴ/는 것 같다", /(?:ㄴ|는|은)\s?것\s?같/],
  ["-(으)ㄹ까요", /(?:을|ㄹ)까요/],
  ["-(으)ㄹ게요", /(?:을|ㄹ)게요/],
  ["-(으)면", /(?:으| ㅈ)?면\s/],
  ["discurso indireto (-자고/-라고/-ㄴ다고)", /(?:자고|라고|다고|냐고)\s/],
  ["-기 때문에", /기\s?때문/],
  ["-(으)ㄹ 때", /(?:을|ㄹ)\s?때\s/],
  ["못 / 안", /(?:못|안)\s?[가-힣]/],
  ["-보다", /보다\s/],
  ["-처럼", /처럼\s/],
  ["-(으)로", /[으]?로\s(?:가|와|타|버스|지하철|열차|만)/],
  ["-한 지 / -(으)ㄴ 지", /(?:한|ㄴ|은)\s?지\s(?:한|\d|[가-힣])/],
  ["-아/어 보세요", /(?:아|어|여)\s?보세요/],
  ["-는 중(인)", /는\s?중/],
  ["-(으)러 가다", /(?:으|러)\s?가(?:요|세|서|본|ㅂ)/],
  ["-잖아요", /잖(?:아|요)/],
  ["-대신(에)", /대신/],
  ["-(으)ㄹ 정도", /(?:을|ㄹ)\s?정도/],
];

function scanCourse(course, offset) {
  const steps = courseSteps(course);
  const bp = data[`${course}Blueprint`];
  const gradedOnly = new Map();
  steps.forEach(({ id, step }, idx) => {
    const taught = taughtText(step);
    const graded = (step.exercises || []).map(exerciseText).join(" ");
    for (const [name, re] of MARKERS) {
      const key = `${course}:${name}`;
      const seen = out.markerFirstSeen[key];
      const inTaught = re.test(taught);
      const inGraded = re.test(graded);
      if (!seen && (inTaught || inGraded)) {
        out.markerFirstSeen[key] = { first: id, kind: inTaught ? "taught" : "graded", abs: offset + idx };
        if (!inTaught) gradedOnly.set(key, id);
      }
    }
  });
  const firstDeclared = new Map();
  for (const l of bp.lessons) {
    const blob = `${(l.grammar || []).join(" ")} ${l.communicativeGoal || ""}`;
    for (const [name] of MARKERS) {
      const key = `${course}:${name}`;
      const label = name.split(" ")[0];
      if (!firstDeclared.has(key) && blob.includes(label)) firstDeclared.set(key, l.id);
    }
  }
  const idxOf = (id) => steps.findIndex((s) => s.id === id);
  for (const [key, where] of gradedOnly) {
    const decl = firstDeclared.get(key) || null;
    out.markerOrder.push({
      course,
      marker: key.slice(course.length + 1),
      firstUsedInExercise: where,
      declaredIn: decl,
      exerciseBeforeDeclaration: decl ? idxOf(where) < idxOf(decl) : null,
    });
  }
}

scanCourse("a1", 0);
scanCourse("a2", courseSteps("a1").length);

fs.writeFileSync(path.join(ROOT, "docs/audits/a0-a2/data/progression-findings.json"), JSON.stringify(out, null, 2));
console.log(
  JSON.stringify(
    {
      answerNotTaught: out.answerNotTaught.length,
      unknownNoun: out.unknownNoun.length,
      markerOrder: out.markerOrder.length,
      markerFirstSeen: out.markerFirstSeen,
      sampleAnswer: out.answerNotTaught.slice(0, 8),
    },
    null,
    2,
  ),
);
