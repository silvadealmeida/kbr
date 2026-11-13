/**
 * Auditoria 12B — progressão A2→B1 e carga não ensinada (heurístico, read-only).
 * Metodologia portada de `docs/audits/a0-a2/tools/analyze-progression.cjs`
 * (Fase 12A), com a sequência acumulada A1 → A2 → B1 e uma lista ampliada de
 * marcadores gramaticais do B1 (coluna "Gramática" do syllabus).
 *
 * Três checagens, todas suspeitas a confirmar na revisão linguística:
 *  1. answerNotTaught — gabarito coreano que não aparece no material ensinado
 *     da própria lição nem em passos anteriores (A1/A2/B1).
 *  2. unknownNoun — substantivo (token + partícula) cobrado em exercício sem
 *     forma conhecida no vocabulário/textos já apresentados.
 *  3. markerOrder — marcador do B1 cobrado antes de ser ensinado no material
 *     apresentacional ou declarado no blueprint (qualquer curso).
 *
 * Nada aqui prova correção linguística; é triagem de carga e de ordem.
 * Uso: node docs/audits/b1/tools/analyze-progression.cjs
 * Saída: docs/audits/b1/data/progression-findings.json
 */
const fs = require("node:fs");
const ppath = require("node:path");

const ROOT = ppath.resolve(__dirname, "..", "..", "..", "..");
const data = require(ppath.join(ROOT, "docs/audits/b1/data/content-dump.json"));
const out = { answerNotTaught: [], unknownNoun: [], markerOrder: [], markerFirstSeen: {}, markerB1: {} };

const PARTICLES = [
  "에서부터", "으로써", "으로서", "한테서", "에게서", "에서", "부터", "까지", "만큼", "처럼", "보다",
  "뿐", "마다", "조차", "마저", "이나", "라도", "으로", "이고", "에게", "한테", "께서", "께",
  "이", "가", "은", "는", "을", "를", "의", "에", "와", "과", "도", "만", "로",
];

const koreans = (s) => (String(s || "").match(/[가-힣][가-힣]*/g) || []);
const norm = (s) => String(s || "").replace(/\s+/g, "").replace(/[.,!?…"'“”‘’]/g, "");

// BUG da 1ª versão (documentado no README): em NFC o batchim não existe como caractere isolado —
// "할 때" não contém U+3139. Regex de marcador que começava em jamo avulso (ㄹ\s?때, (?:는|#N)…)
// perdia toda forma pós-vogal. Correção (tentativa 2 — a 1ª, decomp(), quebrava a adjacência de
// sílabas e foi revertida): gerar a classe de TODAS as sílabas pré-compostas com aquele batchim.
// Nos padrões, #L = sílaba com batchim ㄹ, #N = batchim ㄴ, etc.
const JONG_INDEX = { L: 8, N: 4, G: 1, D: 7, S: 19, M: 16, B: 17, NG: 21, J: 22, H: 27 };
const batchimClass = (jong) => {
  const chars = [];
  for (let c = 0xac00; c <= 0xd7a3; c++) if ((c - 0xac00) % 28 === jong) chars.push(String.fromCodePoint(c));
  return "[" + chars.join("") + "]";
};
const CLASSES = Object.fromEntries(Object.entries(JONG_INDEX).map(([k, v]) => [k, batchimClass(v)]));
const expand = (src) => src.replace(/#([A-Z]+)/g, (_, k) => { if (!(k in CLASSES)) throw new Error("classe desconhecida #" + k); return CLASSES[k]; });

function taughtText(l) {
  const bits = [];
  for (const panel of l.intro || []) bits.push(panel.body, panel.ko);
  for (const line of l.dialogue || []) bits.push(line.ko);
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
  const bp = data[course + "Blueprint"];
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
  for (const l of data[course + "Lessons"]) content.set(l.id, l);
  for (const c of data[course + "Checkpoints"]) content.set(c.id, c);
  return seq.filter((x) => content.has(x)).map((x) => ({ id: x, step: content.get(x) }));
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

const stepsAll = [...courseSteps("a1"), ...courseSteps("a2"), ...courseSteps("b1")];
const pos = new Map(stepsAll.map((e, i) => [e.id, i]));
const B1_START = stepsAll.findIndex((e) => e.id.startsWith("b1-"));

function addForms(v, set) {
  set.add(norm(v.ko));
  if (v.audioText) for (const w of koreans(v.audioText)) set.add(norm(w));
  for (const s of sentencesByVocab.get(v.id) || []) {
    set.add(norm(s.target));
    for (const w of koreans(s.ko)) set.add(norm(w));
  }
}

const lexiconCache = [];
function lexiconBefore(i) {
  if (lexiconCache[i]) return lexiconCache[i];
  const forms = new Set();
  for (const v of data.vocab) {
    const pv = pos.get(v.lesson);
    if (pv === undefined) { addForms(v, forms); continue; }
    if (pv < i) addForms(v, forms);
  }
  lexiconCache[i] = forms;
  return forms;
}

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

let prefixIndex = new Set();
function buildPrefixIndex(forms) {
  prefixIndex = new Set();
  for (const f of forms) for (let n = 2; n <= f.length; n++) prefixIndex.add(f.slice(0, n));
}
function knownByPrefix(tok, forms) {
  const t = norm(tok);
  if (forms.has(t)) return true;
  let base = t;
  for (const pc of PARTICLES) {
    if (t.length > pc.length && t.endsWith(norm(pc))) {
      base = t.slice(0, t.length - norm(pc).length);
      break;
    }
  }
  if (base !== t && (forms.has(base) || (base.length >= 3 && prefixIndex.has(base)))) return true;
  if (base.length < 2) return false;
  for (let n = base.length; n >= 2; n--) if (prefixIndex.has(base.slice(0, n))) return true;
  return false;
}

for (let i = B1_START; i < stepsAll.length; i++) {
  const entry = stepsAll[i];
  const id = entry.id;
  const step = entry.step;
  const forms = lexiconBefore(i);
  const surfaces = taughtSurface(i);
  buildPrefixIndex(surfaces);
  const ownVocab = vocabByLesson.get(id) || [];
  for (const v of ownVocab) addForms(v, surfaces);

  for (const ex of step.exercises || []) {
    for (const a of [ex.answer, ...(ex.acceptedAnswers || [])]) {
      if (typeof a !== "string" || !/[가-힣]/.test(a)) continue;
      const unknown = [];
      for (const tok of koreans(a)) if (!knownByPrefix(tok, surfaces) && !knownByPrefix(tok, forms)) unknown.push(tok);
      if (unknown.length) out.answerNotTaught.push({ step: id, exercise: ex.id, type: ex.type, answer: a, unknownTokens: unknown });
    }
    const seen = new Set();
    for (const tok of koreans(exerciseText(ex))) {
      for (const pc of PARTICLES) {
        if (tok.length > pc.length + 1 && tok.endsWith(pc)) {
          const noun = tok.slice(0, tok.length - pc.length);
          if (noun.length >= 2 && !seen.has(noun) && !knownByPrefix(noun, surfaces))
            out.unknownNoun.push({ step: id, exercise: ex.id, token: tok, noun, particle: pc });
          seen.add(noun);
          break;
        }
      }
    }
  }
}

// marcadores: [nome, regex de texto, token declarante do blueprint]
const MARKERS = [
  ["-(으)ㄹ 거예요", /#L\s?거\s?(?:예요|야요|에?요)/, "ㄹ 거예요"],
  ["-(으)ㄹ 수 있다/없다", /#L\s?수\s?(?:있|없)/, "수 있어요"],
  ["-아/어서", /(?:아서|어서|여서|해서)\s/, "-아/어서"],
  ["-지만", /지만(?=[\s,.!?…\u201c\u201d"']|$)/, "-지만"],
  ["-(으)면", /[으]?면/, "-(으)면"],
  ["-고 싶다", /고\s?싶/, "-고 싶"],
  ["-아/어야 하다/돼", /(?:야|어야|여야)\s?(?:해|돼|되)/, "-아/어야 하다"],
  ["-(으)세요", /[으]?세요/, "(으)세요"],
  ["못 / 안", /(?:못|안)\s?[가-힣]/, "안 em recusa"],
  ["-보다(비교)", /\S+보다\s/, "-보다"],
  ["-(으)ㄴ/는 것 같다", /(?:는|#N)\s?것\s?같/, "것 같아요"],
  ["-게 되다", /게\s?되(?:요|었|ㄴ|는)?/, "-게 되다"],
  ["-(으)ㄹ 때", /#L\s?때(?![리문])/, "-(으)ㄹ 때"],
  ["-라고 하다 (indireto)", /라고\s?(?:해요|했다|했어요|말|전|해)/, "-라고 하다"],
  ["-더라고요", /더라(?![가-힣])|더라도/, "더라고요"],
  ["-다가", /다가(?=[\s,.!?…\u201c\u201d"']|$)/, "-다가"],
  ["-자마자", /자\s?마자/, "-자마자"],
  ["-다고 하다", /다고\s?(?:해요|했다|했어요|말|전|했|해)/, "-다고 하다"],
  ["-냐고 하다", /냐고\s/, "-냐고"],
  ["-았/었으면 좋겠다", /(?:았|었|였)으면\s?좋/, "-았/었으면"],
  ["-더라면", /더라면/, "-더라면"],
  ["-아/어 버리다", /(?:아|어|여)\s?버리/, "-아/어 버리다"],
  ["-고 말다", /고\s?말(?![고이])/, "-고 말다"],
  ["-(으)ㄹ까 하다", /#L까\s?(?:하다|해요|했|할)/, "ㄹ까 하다"],
  ["-(으)ㄹ 예정이다", /#L\s?예\s?정/, "예정"],
  ["-기 위해", /기\s?위해/, "-기 위해"],
  ["-도록", /록/, "-도록"],
  ["-는 대신", /(?:는|#N)\s?대신/, "-는 대신"],
  ["-기보다", /기\s?보다/, "-기보다"],
  ["-는 한", /(?:는|#N)\s?한\s+(?=[가-힣])/, "-는 한"],
  ["-더라도/-라도", /(?:더라도|[디시]라도)\s/, "-더라도"],
  ["-기로 하다", /기로\s?(?:하|했)/, "-기로 하다"],
  ["-지 않을 수 없다", /지\s?않\s?을\s?수\s?없/, "지 않을 수 없다"],
  ["-다고 생각하다", /다고\s?(?:생각|믿)/, "-다고 생각하다"],
  ["-는 편이다", /(?:는|#N)\s?편/, "-는 편"],
  ["-는 반면", /(?:는|#N)\s?반면/, "-는 반면"],
  ["-에 비해", /에\s?비해/, "-에 비해"],
  ["-뿐만 아니라", /뿐\s?만\s?아니라/, "-뿐만"],
  ["-기도 하다", /기\s?도\s?(?:하|했)/, "-기도 하다"],
  ["-기는 하지만", /기\s?는\s?하(?:지|ㅂ)/, "-기는 하지만"],
  ["-라고 해도", /라고\s?해도/, "-라고 해도"],
  ["-다는 점에서", /다는\s?점/, "-다는 점에서"],
  ["-다고 볼 수 있다", /다고\s?볼/, "-다고 볼"],
  ["-에 따라(서)", /에\s?따라/, "-에 따라"],
  ["-도록 하다", /도(?:록)?\s?하(?:여|요|는|세|ㅂ|고|까|면)?\s/, "-도록 하다"],
  ["-에 대한", /에\s?대한/, "-에 대한"],
  ["-는 데 반해", /(?:는|#N)\s?데\s?반해/, "-는 데 반해"],
  ["-(으)ㄹ 수밖에 없다", /#L\s?수\s?밖에/, "수밖에 없다"],
  ["-기에", /기에(?=[\s,.!?…\u201c\u201d"']|$)/, "-기에"],
  ["-는 것이 중요하다", /(?:는|#N)\s?것\s?(?:이|을)\s?(?:중요|필요|좋)/, "-는 것이 중요하다"],
  ["-는 바람에", /(?:는|#N)\s?바람\s?에/, "-는 바람에"],
  ["-는 경향이 있다", /(?:는|#N)\s?경향/, "경향이"],
  ["-라고들 하다", /라고들/, "라고들"],
  ["-는 통에", /(?:는|#N)\s?통\s?에/, "-는 통에"],
  ["-기 마련이다", /기\s?마련/, "마련"],
  ["-을 권리가 있다", /권리/, "권리가 있다"],
  ["-해야 할 의무가 있다", /의무/, "의무가 있다"],
  ["-(으)ㄹ 만하다", /#L\s?만\s?하/, "ㄹ 만하다"],
  ["-기에는", /기\s?에는/, "-기에는"],
  ["-만큼", /만큼/, "-만큼"],
  ["-다는 생각이 들다", /생각이\s?(?:들|드는)/, "생각이 들다"],
  ["-에 따르면", /에\s?따르면/, "-에 따르면"],
  ["-다고 한다", /(?:는다고|한다고|다고)\s?(?:해요|했어요|했다|해|한다)/, "-다고 한다"],
  ["-다는 내용이다", /다는\s?내용/, "다는 내용이다"],
  ["-(으)ㄹ게요", /#L\s?게요/, "드릴게요"],
  ["-뿐 (restritivo)", /뿐(?!만)/, "—"],
  ["-마다", /마다/, "—"],
  ["-(으)를 통해", /#L\s?통해/, "—"],
  ["-(으)시기를 바랍니다", /바랍(?:니다|니까)/, "—"],
  ["-는 것으로 보이다", /(?:는|#N)\s?것\s?(?:으)?로\s?보/, "것으로 보이다"],
];

function grammarText(id) {
  for (const course of ["a1", "a2", "b1"])
    for (const l of data[course + "Blueprint"].lessons)
      if (l.id === id) return (l.grammar || []).join(" | ") + " | " + (l.communicativeGoal || "");
  return "";
}

function firstBy(testFn, texter) {
  for (let i = 0; i < stepsAll.length; i++) if (testFn(texter(stepsAll[i]))) return i;
  return null;
}

function gradedTexts(step) {
  // gabarito e material apresentado × distratores e enunciados
  const answers = [];
  const options = [];
  for (const ex of step.exercises || []) {
    if (ex.type === "mcq") {
      answers.push(ex.correctAnswer);
      options.push(...ex.options.filter((o) => o !== ex.correctAnswer));
    } else if (ex.type === "reading") {
      answers.push((ex.options || []).find((o) => o.id === ex.correctOptionId)?.label ?? "");
      options.push(...(ex.options || []).filter((o) => o.id !== ex.correctOptionId).map((o) => o.label));
    } else {
      answers.push(ex.answer ?? "", ...(ex.acceptedAnswers || []), ex.audioText ?? "");
    }
    options.push(ex.prompt ?? "", ex.text ?? "", ex.explanation ?? "");
  }
  return { answers: answers.join(" "), options: options.join(" ") };
}

for (const marker of MARKERS) {
  const name = marker[0];
  const re = new RegExp(expand(marker[1].source));
  const declToken = norm(marker[2]);
  const decl = firstBy((t) => norm(t).includes(declToken), (s) => grammarText(s.id));
  const taught = firstBy((t) => re.test(t), (s) => taughtText(s.step));
  const gradedAnswer = firstBy((t) => re.test(t.answers), (s) => gradedTexts(s.step));
  const gradedAny = firstBy((t) => re.test(t), (s) => (s.step.exercises || []).map(exerciseText).join(" "));
  // censo B1 (todos os passos do curso, com decomp): ocorrências e onde
  let count = 0;
  const lessons = [];
  for (const e of stepsAll.slice(B1_START)) {
    const all = taughtText(e.step) + " " + (e.step.exercises || []).map(exerciseText).join(" ");
    const n = [...all.matchAll(new RegExp(expand(marker[1].source), "g"))].length;
    if (n) {
      count += n;
      lessons.push(`${e.step.id}:${n}`);
    }
  }
  out.markerB1[name] = { count, lessons };
  const info = {
    declared: decl === null ? null : stepsAll[decl].id,
    taught: taught === null ? null : stepsAll[taught].id,
    gradedAnswer: gradedAnswer === null ? null : stepsAll[gradedAnswer].id,
    gradedAny: gradedAny === null ? null : stepsAll[gradedAny].id,
  };
  out.markerFirstSeen[name] = info;
  for (const [kind, idx] of [["gabarito/áudio", gradedAnswer], ["qualquer texto", gradedAny]]) {
    if (idx === null) continue;
    const beforeTeach = taught === null || idx < taught;
    const beforeDecl = decl === null || idx < decl;
    if ((beforeTeach || beforeDecl) && stepsAll[idx].id.startsWith("b1-")) {
      out.markerOrder.push({
        marker: name,
        where: kind,
        firstGradedIn: stepsAll[idx].id,
        taughtIn: info.taught,
        declaredIn: info.declared,
        gradedBeforeTaught: beforeTeach,
        gradedBeforeDeclared: beforeDecl,
      });
      break;
    }
  }
}

fs.writeFileSync(ppath.join(ROOT, "docs/audits/b1/data/progression-findings.json"), JSON.stringify(out, null, 2));
console.log(
  JSON.stringify(
    {
      b1Steps: stepsAll.length - B1_START,
      answerNotTaught: out.answerNotTaught.length,
      unknownNoun: out.unknownNoun.length,
      markerOrder: out.markerOrder.length,
      markersNeverSeen: MARKERS.filter((m) => { const i = out.markerFirstSeen[m[0]]; return !i || (i.taught === null && i.gradedAnswer === null && i.gradedAny === null); }).map((m) => m[0]),
    },
    null,
    2,
  ),
);
for (const m of out.markerOrder) console.log("- " + m.marker + " [" + m.where + "]: cobrado em " + m.firstGradedIn + " | ensinado em " + (m.taughtIn || "—") + " | declarado em " + (m.declaredIn || "—"));
