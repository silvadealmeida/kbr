import { describe, expect, it } from "vitest";
import { CHECKPOINTS, LESSONS, WORDS } from "@/content/hangul";
import {
  COURSE_LESSON_IDS,
  VOCAB_ENTRIES,
  VOCAB_SENTENCES,
  assertVocabulary,
  sentencesFor,
  targetPosition,
  validateVocabulary,
  vocabForLesson,
} from "@/content/vocabulary";
import { resolveAudioAsset } from "@/lib/audio/manifest";
import { buildReviewQueue } from "@/lib/review";
import { leitner } from "@/lib/srs";
import { buildDashboardSummary } from "@/lib/progress/dashboard";
import { createEmptyProgress, isProgress, mergeProgress, type Progress } from "@/lib/storage";
import {
  CONSOLIDATED_BOX,
  REMOVED_DUE,
  buildVocabQueue,
  checkVocabAnswer,
  fillSentence,
  hintFor,
  isSaved,
  normalizeKorean,
  removeVocab,
  reviewVocab,
  saveMany,
  saveVocab,
  summarizeVocab,
  vocabCardKey,
  vocabStatus,
} from "@/lib/vocabulary";

const T0 = new Date("2026-11-12T10:00:00.000Z");
const day = (n: number, from = T0) => new Date(from.getTime() + n * 86_400_000);
const empty = () => createEmptyProgress(T0);
const ID = "ko:사과";

describe("conteúdo — validação ESTRUTURAL (não prova correção linguística nativa)", () => {
  it("passa na validação do registro", () => {
    expect(() => assertVocabulary()).not.toThrow();
    expect(VOCAB_ENTRIES.length).toBeGreaterThan(100);
    expect(VOCAB_SENTENCES.length).toBeGreaterThanOrEqual(20);
  });

  it("ids estáveis (ko:<forma>) e únicos", () => {
    expect(new Set(VOCAB_ENTRIES.map((e) => e.id)).size).toBe(VOCAB_ENTRIES.length);
    expect(VOCAB_ENTRIES.every((e) => e.id === `ko:${e.ko}`)).toBe(true);
    expect(new Set(VOCAB_SENTENCES.map((s) => s.id)).size).toBe(VOCAB_SENTENCES.length);
  });

  it("aceita sentidos homógrafos qualificados sem quebrar IDs legados", () => {
    const base = VOCAB_ENTRIES[0];
    const eye = { ...base, id: "ko:눈#eye", ko: "눈", pt: "olho", sense: "eye", audioText: "눈" };
    const snow = { ...base, id: "ko:눈#snow", ko: "눈", pt: "neve", sense: "snow", audioText: "눈" };
    const eyeSentence = {
      ...VOCAB_SENTENCES[0], id: "test-eye", vocabId: eye.id, ko: "눈이 아파요", pt: "Meu olho dói.", target: "눈", contextMeaning: "olho",
    };
    const snowSentence = {
      ...VOCAB_SENTENCES[0], id: "test-snow", vocabId: snow.id, ko: "눈이 와요", pt: "Está nevando.", target: "눈", contextMeaning: "neve",
    };

    expect(validateVocabulary([eye, snow], [eyeSentence, snowSentence], COURSE_LESSON_IDS)).toEqual([]);
    expect(
      validateVocabulary([{ ...eye, id: "ko:눈", sense: undefined }, snow], [], COURSE_LESSON_IDS)
        .map((issue) => issue.message).join(),
    ).toContain("exigem sense");
    expect(
      validateVocabulary([eye, { ...snow, id: eye.id, sense: eye.sense }], [], COURSE_LESSON_IDS)
        .map((issue) => issue.message).join(),
    ).toContain("sense duplicado");
  });

  it("reconhece as identidades A1 no registro canônico, sem duplicar o Hangul", () => {
    const a1 = VOCAB_ENTRIES.filter((item) => item.course === "ko-a1");
    expect(COURSE_LESSON_IDS.get("ko-a1")?.size).toBe(40);
    expect(a1).toHaveLength(11);
    expect(a1.every((item) => item.lesson === "a1-l01")).toBe(true);
    expect(a1.every((item) => item.review.status === "in-review")).toBe(true);
    expect(
      new Set(VOCAB_ENTRIES.map((item) => item.ko)).size,
    ).toBe(VOCAB_ENTRIES.length);
    expect(validateVocabulary([...a1], [], COURSE_LESSON_IDS)).toEqual([]);
  });

  it("todo item do Hangul vem de um WordRecord existente, sem formas flexionadas", () => {
    const kos = new Set(WORDS.map((w) => w.ko));
    expect(
      VOCAB_ENTRIES.filter((e) => e.course === "hangul").every((e) => kos.has(e.ko)),
    ).toBe(true);
    for (const flexed of ["밥을", "좋아요", "입니다", "한국어를", "곬"]) {
      expect(VOCAB_ENTRIES.some((e) => e.ko === flexed)).toBe(false);
    }
  });

  it("toda frase: alvo único em início de palavra, tradução, dica e revisão pendente", () => {
    for (const s of VOCAB_SENTENCES) {
      expect(targetPosition(s), s.id).not.toBeNull();
      expect(s.pt.length).toBeGreaterThan(3);
      expect(s.contextMeaning.length).toBeGreaterThan(0);
      expect(s.review.status).toBe("in-review");
    }
  });

  it("frases não revelam o alvo na lacuna e preenchem de volta a frase completa", () => {
    for (const s of VOCAB_SENTENCES) {
      expect(fillSentence(s, "___")).not.toContain(s.target);
      expect(fillSentence(s, s.target)).toBe(s.ko);
    }
  });

  it("o validador detecta defeitos", () => {
    const base = VOCAB_ENTRIES[0];
    const sentence = { ...VOCAB_SENTENCES[0] };
    const run = (e: readonly typeof base[] = [base], s = [sentence]) => validateVocabulary(e, s, COURSE_LESSON_IDS).map((i) => i.message);
    expect(run([base, base]).join()).toContain("duplicado");
    expect(run([{ ...base, pt: " " }]).join()).toContain("tradução ausente");
    expect(run([{ ...base, lesson: "zz" }]).join()).toContain("inexistente");
    expect(run([{ ...base, ko: "abc", id: "ko:abc" }]).join()).toContain("ko inválido");
    expect(run(VOCAB_ENTRIES, [{ ...sentence, vocabId: "ko:nada" }]).join()).toContain("vocabId inexistente");
    expect(run(VOCAB_ENTRIES, [{ ...sentence, pt: "" }]).join()).toContain("tradução da frase");
    expect(run(VOCAB_ENTRIES, [{ ...sentence, ko: "ababab" }]).join()).toContain("alvo");
    const other = VOCAB_ENTRIES.find((e) => e.id !== sentence.vocabId)!;
    const all = VOCAB_ENTRIES;
    expect(
      validateVocabulary(all, [{ ...sentence, accepted: [other.ko] }], COURSE_LESSON_IDS).map((i) => i.message).join(),
    ).toContain("ambígua");
    // alvo no meio de outra palavra não vale como lacuna
    expect(targetPosition({ ko: "저는 한국어", target: "국" })).toBeNull();
    expect(targetPosition({ ko: "가가 가", target: "가" })).toBeNull();
  });

  it("áudio usa só texto coreano (voz do sistema); nenhum MP3 é resolvido", () => {
    for (const e of VOCAB_ENTRIES) expect(/[가-힣]/.test(e.audioText)).toBe(true);
    for (const s of VOCAB_SENTENCES) expect(resolveAudioAsset(s.ko)).toBeNull();
  });

  it("vocabForLesson devolve apenas itens da lição indicada", () => {
    const h03 = vocabForLesson("hangul", "h03");
    expect(h03.length).toBeGreaterThan(0);
    expect(h03.every((e) => e.lesson === "h03")).toBe(true);
  });
});

describe("resposta", () => {
  const sentence = sentencesFor(ID)[0];

  it("NFC: jamo decomposto (teclado iOS/macOS) equivale à sílaba composta", () => {
    expect(normalizeKorean("사과".normalize("NFD"))).toBe("사과");
    expect(checkVocabAnswer(sentence, "사과".normalize("NFD")).correct).toBe(true);
    expect(checkVocabAnswer(sentence, "  사과 ​").correct).toBe(true);
  });

  it("igualdade exata: sem substring, sem outra palavra, sem partícula, sem jamo solto", () => {
    for (const wrong of ["사", "과", "사과를", "사과 ", "커피", "사과사과", "ㅅㅏㄱㅗㅏ"]) {
      const r = checkVocabAnswer(sentence, wrong);
      expect(r.correct, wrong).toBe(wrong.trim() === "사과");
    }
    expect(checkVocabAnswer(sentence, "").empty).toBe(true);
    expect(checkVocabAnswer(sentence, "   ").correct).toBe(false);
  });

  it("variantes só valem quando registradas", () => {
    const withVariant = { ...sentence, accepted: ["능금"] };
    expect(checkVocabAnswer(sentence, "능금").correct).toBe(false);
    expect(checkVocabAnswer(withVariant, "능금").correct).toBe(true);
  });

  it("a pista nunca revela a palavra inteira", () => {
    for (const e of VOCAB_ENTRIES) {
      const hint = hintFor(e);
      expect(hint).not.toContain(e.ko);
      expect(hint).toMatch(/síl/);
    }
  });
});

describe("estado e agendamento (Leitner existente)", () => {
  it("salvar cria cartão v: na caixa 1, vencido, idempotente, sem tocar no resto", () => {
    const p = saveVocab(empty(), ID, T0);
    expect(p.cards[vocabCardKey(ID)]).toEqual({ box: 1, due: T0.toISOString(), reviewedAt: T0.toISOString() });
    expect(saveVocab(p, ID, day(1))).toBe(p);
    expect(isProgress(p)).toBe(true);
    expect(saveVocab(empty(), "ko:inexistente", T0).cards).toEqual({});
  });

  it("acerto avança 1→2→3→4→5 com 1/2/4/8/16 dias; erro volta à caixa 1", () => {
    let p = saveVocab(empty(), ID, T0);
    const boxes: number[] = [];
    let now = T0;
    for (let i = 0; i < 5; i += 1) {
      p = reviewVocab(p, ID, "correct", now);
      boxes.push(p.cards[vocabCardKey(ID)].box);
      now = new Date(p.cards[vocabCardKey(ID)].due);
    }
    expect(boxes).toEqual([2, 3, 4, 5, 5]);
    const failed = reviewVocab(p, ID, "again", now);
    expect(failed.cards[vocabCardKey(ID)].box).toBe(1);
    expect(failed.cards[vocabCardKey(ID)].due).toBe(day(1, now).toISOString());
  });

  it("acerto assistido (tradução/pista) NÃO avança a caixa e repete o mesmo intervalo", () => {
    let p = saveVocab(empty(), ID, T0);
    p = reviewVocab(p, ID, "correct", T0); // caixa 2
    p = reviewVocab(p, ID, "correct", day(2)); // caixa 3
    const assisted = reviewVocab(p, ID, "assisted", day(6));
    const card = assisted.cards[vocabCardKey(ID)];
    expect(card.box).toBe(3);
    expect(card.due).toBe(leitner.review({ box: 2, due: "" }, "correct", day(6)).due);
    // na caixa 1 permanece 1
    const fresh = reviewVocab(saveVocab(empty(), ID, T0), ID, "assisted", T0);
    expect(fresh.cards[vocabCardKey(ID)].box).toBe(1);
  });

  it("revisar item não salvo é no-op", () => {
    const p = empty();
    expect(reviewVocab(p, ID, "correct", T0)).toBe(p);
  });

  it("remover escreve marca válida; salvar de novo depois a substitui", () => {
    const saved = saveVocab(empty(), ID, T0);
    const removed = removeVocab(saved, ID, day(1));
    expect(removed.cards[vocabCardKey(ID)].due).toBe(REMOVED_DUE);
    expect(isProgress(removed)).toBe(true);
    expect(isSaved(removed, ID)).toBe(false);
    expect(removeVocab(removed, ID, day(2))).toBe(removed);
    const again = saveVocab(removed, ID, day(2));
    expect(isSaved(again, ID)).toBe(true);
    expect(again.cards[vocabCardKey(ID)].box).toBe(1);
  });

  it("status: disponível → encontrada (lição concluída) → em aprendizagem → consolidada", () => {
    const entry = VOCAB_ENTRIES.find((e) => e.id === ID)!;
    let p = empty();
    expect(vocabStatus(p, entry)).toBe("available");
    p = { ...p, lessons: { [entry.lesson]: { done: true, score: 100 } } };
    expect(vocabStatus(p, entry)).toBe("encountered");
    p = saveVocab(p, ID, T0);
    expect(vocabStatus(p, entry)).toBe("learning");
    for (let i = 1; i < CONSOLIDATED_BOX; i += 1) p = reviewVocab(p, ID, "correct", day(i * 20));
    expect(vocabStatus(p, entry)).toBe("consolidated");
    expect(summarizeVocab(p, day(0))).toMatchObject({ saved: 1, consolidated: 1, learning: 0 });
  });

  it("fila: só salvos e vencidos, ordem determinística, 1 por item, limite, modo por frase", () => {
    const ids = ["ko:커피", "ko:책", "ko:다리"]; // 다리 não tem frase
    let p = saveMany(empty(), ids, T0);
    p = saveVocab(p, "ko:물", day(3)); // vence só no futuro
    const q = buildVocabQueue(p, day(1));
    expect(q.totalDue).toBe(3);
    expect(q.session.map((i) => i.vocabId)).toEqual([...ids].sort());
    expect(q.session.find((i) => i.vocabId === "ko:다리")!.mode).toBe("flashcard");
    expect(q.session.find((i) => i.vocabId === "ko:커피")!.sentence?.vocabId).toBe("ko:커피");
    expect(buildVocabQueue(p, day(1), { limit: 2 }).session).toHaveLength(2);
    expect(buildVocabQueue(p, day(1), { flashcardsOnly: true }).session.every((i) => i.mode === "flashcard")).toBe(true);
    expect(buildVocabQueue(p, day(1))).toEqual(q); // determinístico
    expect(buildVocabQueue(removeVocab(p, "ko:커피", day(1)), day(1)).totalDue).toBe(2);
    // retomar = reconstruir: o que foi respondido sai da fila
    const after = reviewVocab(p, "ko:책", "correct", day(1));
    expect(buildVocabQueue(after, day(1)).session.map((i) => i.vocabId)).not.toContain("ko:책");
  });
});

describe("integração com Progress v1: Hangul SRS e painel intactos", () => {
  it("cartões v: não entram na fila de revisão do Hangul nem no painel", () => {
    const p = saveMany(empty(), ["ko:커피", "ko:책"], T0);
    const queue = buildReviewQueue(p, day(1));
    expect(queue.totalDue).toBe(0);
    expect(queue.nextDue).toBeNull();
    const dash = buildDashboardSummary(p, { now: day(1), lessons: LESSONS, checkpoints: CHECKPOINTS });
    expect(dash.review.unknownCards).toBe(0);
    expect(dash.review.totalCards).toBe(0);
  });

  it("registrar vocabulário não altera cartões do Hangul nem lições", () => {
    const base: Progress = {
      ...empty(),
      lessons: { h01: { done: true, score: 90 } },
      cards: { "h:jamo:c:ㄱ": { box: 2, due: day(2).toISOString(), reviewedAt: T0.toISOString() } },
    };
    const next = reviewVocab(saveVocab(base, ID, T0), ID, "correct", T0);
    expect(next.lessons).toEqual(base.lessons);
    expect(next.cards["h:jamo:c:ㄱ"]).toEqual(base.cards["h:jamo:c:ㄱ"]);
    expect(next.history).toEqual(base.history);
  });
});

describe("merge multi-dispositivo (mergeProgress real; CAS remoto NÃO verificado aqui)", () => {
  const a0 = saveVocab(empty(), ID, T0);

  it("dois aparelhos salvam palavras diferentes: união sem perda", () => {
    const a = saveVocab(a0, "ko:커피", day(1));
    const b = saveVocab(a0, "ko:책", day(1));
    const m = mergeProgress(a, b);
    for (const id of [ID, "ko:커피", "ko:책"]) expect(isSaved(m, id)).toBe(true);
  });

  it("revisão concorrente do mesmo cartão: vence a mais recente, de forma comutativa", () => {
    const a = reviewVocab(a0, ID, "correct", day(1));
    const b = reviewVocab(a0, ID, "again", day(2));
    const ab = mergeProgress(a, b);
    expect(ab).toEqual(mergeProgress(b, a));
    expect(ab.cards[vocabCardKey(ID)].reviewedAt).toBe(day(2).toISOString());
    expect(ab.cards[vocabCardKey(ID)].box).toBe(1);
  });

  it("remover num aparelho propaga e não ressuscita; salvar depois vence a remoção", () => {
    const removedOnA = removeVocab(a0, ID, day(1));
    expect(isSaved(mergeProgress(removedOnA, a0), ID)).toBe(false);
    expect(isSaved(mergeProgress(a0, removedOnA), ID)).toBe(false);
    const resavedOnB = saveVocab(removedOnA, ID, day(2));
    expect(isSaved(mergeProgress(removedOnA, resavedOnB), ID)).toBe(true);
  });

  it("revisão mais recente que a remoção mantém o item (nenhum dado perdido em silêncio)", () => {
    const removedOnA = removeVocab(a0, ID, day(1));
    const reviewedOnB = reviewVocab(a0, ID, "correct", day(2));
    expect(isSaved(mergeProgress(removedOnA, reviewedOnB), ID)).toBe(true);
  });

  it("merge guest + conta preserva lições, cartões do Hangul e vocabulário", () => {
    const guest = saveVocab(
      { ...empty(), lessons: { h01: { done: true, score: 80 } }, cards: { "h:jamo:c:ㄱ": { box: 1, due: day(1).toISOString(), reviewedAt: T0.toISOString() } } },
      ID,
      T0,
    );
    const account = saveVocab({ ...empty(), lessons: { h02: { done: true, score: 100 } } }, "ko:커피", day(1));
    const m = mergeProgress(guest, account);
    expect(Object.keys(m.lessons).sort()).toEqual(["h01", "h02"]);
    expect(m.cards["h:jamo:c:ㄱ"]).toBeDefined();
    expect(isSaved(m, ID) && isSaved(m, "ko:커피")).toBe(true);
    expect(isProgress(m)).toBe(true);
  });
});
