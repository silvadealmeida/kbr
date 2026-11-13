import { describe, expect, test } from "vitest";

import {
  B1_IMPLEMENTED_CHECKPOINTS,
  B1_IMPLEMENTED_LESSONS,
} from "@/content/curriculum/b1";
import { checkAnswer, type ExerciseSpec } from "@/lib/exercises";
import { getVocab, sentencesFor } from "@/content/vocabulary";

/**
 * Regressões da Fase 12D: as 14 decisões editoriais finais sobre os achados
 * U001–U014 da auditoria 12B. O conteúdo continua `in-review`; estes testes
 * travam o comportamento acordado, não uma aprovação nativa.
 */

const ALL_EXERCISES = [
  ...B1_IMPLEMENTED_LESSONS.flatMap((lesson) => lesson.exercises),
  ...B1_IMPLEMENTED_CHECKPOINTS.flatMap((checkpoint) => checkpoint.exercises),
];
const EXERCISE_BY_ID = new Map(ALL_EXERCISES.map((exercise) => [exercise.id, exercise]));
const LESSON_BY_ID = new Map(B1_IMPLEMENTED_LESSONS.map((lesson) => [lesson.id, lesson]));

function exercise(id: string): ExerciseSpec {
  const found = EXERCISE_BY_ID.get(id);
  if (!found) throw new Error(`Exercício não encontrado: ${id}`);
  return found;
}

function lesson(id: string) {
  const found = LESSON_BY_ID.get(id);
  if (!found) throw new Error(`Lição não encontrada: ${id}`);
  return found;
}

function grammarText(lessonId: string): string {
  return lesson(lessonId)
    .grammar.map((note) =>
      [note.form, note.explanationPt, ...note.examples.map((example) => example.ko)].join(" "),
    )
    .join(" ");
}

describe("U001 — -더라면 como hipótese irreal", () => {
  test("mantém 있더라면 no contexto contrafactual e documenta -았/었더라면", () => {
    const note = lesson("b1-l04").grammar.find((item) => item.id === "b1-l04-g2")!;
    expect(note.form).toContain("-았/었더라면");
    expect(note.explanationPt).toContain("fato passado concluído");
    expect(note.examples.map((example) => example.ko)).toContain(
      "시간을 되돌릴 수 있더라면 다시 도전했을 거예요.",
    );
    expect(note.examples.map((example) => example.ko)).toContain(
      "그때 알았더라면 다른 선택을 했을 거예요.",
    );
  });

  test("o cloze continua cobrando 더라면, sem trocar o gabarito", () => {
    const item = exercise("b1-l04-e07");
    expect(item.type).toBe("cloze");
    if (item.type !== "cloze") return;
    expect(item.answer).toBe("더라면");
    expect(item.prompt).toContain("있___");
    expect(checkAnswer(item, { kind: "text", value: "더라면" }).correct).toBe(true);
    expect(checkAnswer(item, { kind: "text", value: "었더라면" }).correct).toBe(false);
  });
});

describe("U002 — colocação de 미끄러지다", () => {
  test("o cartão de 넘어지다 usa 빗길에 e tradução alinhada", () => {
    const entry = getVocab("ko:넘어지다")!;
    const [sentence] = sentencesFor(entry.id);
    expect(entry.lesson).toBe("b1-l02");
    expect(sentence.ko).toBe("빗길에 미끄러져서 넘어졌어요.");
    expect(sentence.pt).toBe("Escorreguei na rua molhada e caí.");
    expect(sentence.target).toBe("넘어졌어요");
  });
});

describe("U003 — variantes válidas de ordem e 뭐를", () => {
  test("aceita 용기를 더 냈으면 sem tratar a ordem original como erro", () => {
    const item = exercise("b1-l04-e05");
    expect(item.type).toBe("translate");
    if (item.type !== "translate") return;
    for (const value of [
      "더 용기를 냈으면 좋겠어요.",
      "용기를 더 냈으면 좋겠어요.",
      "그때 용기를 더 냈으면 좋겠어요.",
    ]) {
      expect(checkAnswer(item, { kind: "text", value }).correct, value).toBe(true);
    }
  });

  test("mantém 뭐를 no diálogo e não cria normalização global", () => {
    expect(lesson("b1-l04").dialogue[2].ko).toContain("뭐를 바꿀 거예요?");
    expect(grammarText("b1-l04")).not.toMatch(/뭐를.*(errad|agramatical)/i);
  });
});

describe("U004 — frequência de ônibus no l32", () => {
  test("especifica duas vezes pela manhã e alinha o português", () => {
    const dialogue = lesson("b1-l32").dialogue.find((line) => line.id === "b1-l32-d4")!;
    expect(dialogue.ko).toBe("버스가 아침에 두 번밖에 안 온다는 예가 나와요.");
    expect(dialogue.pt).toContain("duas vezes pela manhã");
    expect(dialogue.pt).not.toContain("dois ônibus");

    const example = exercise("b1-l32-e03");
    expect(example.type).toBe("listen");
    if (example.type !== "listen") return;
    expect(example.answer).toBe("버스가 아침에 두 번밖에 안 온다는 예가 나와요.");

    const reading = exercise("b1-l32-e04");
    expect(reading.type).toBe("reading");
    if (reading.type !== "reading") return;
    expect(reading.text).toContain("두 번밖에 안 온다는 내용");

    const trouble = exercise("b1-l32-e08");
    expect(trouble.type).toBe("listen");
    if (trouble.type !== "listen") return;
    expect(trouble.answer).toBe("버스가 아침에 두 번밖에 안 와서 학생들이 오래 기다려요.");
    expect(trouble.explanation).toContain("duas vezes pela manhã");
  });
});

describe("U005 — registro da avó na l22", () => {
  test("preserva 해라체 e -다고들 해요 como fala familiar válida", () => {
    const grandmother = lesson("b1-l22").dialogue.filter((line) => line.speaker === "할머니");
    expect(grandmother.map((line) => line.ko).join(" ")).toContain("한다고들 해요");
    expect(grandmother.map((line) => line.ko).join(" ")).toContain("좋겠구나");
    expect(grandmother.every((line) => line.ko.length > 0)).toBe(true);
  });
});

describe("U006 — 못 온다고 했어요", () => {
  test("mantém o coreano e usa português coerente com o contexto", () => {
    expect(lesson("b1-l03").dialogue[1].ko).toBe("내일 회의에 못 온다고 했어요.");
    expect(lesson("b1-l03").dialogue[1].pt).toBe(
      "Ele disse que não pode vir à reunião amanhã.",
    );

    const mcq = exercise("b1-l03-e01");
    expect(mcq.type).toBe("mcq");
    if (mcq.type !== "mcq") return;
    expect(mcq.correctAnswer).toBe("Que não pode ir à reunião.");

    const translation = exercise("b1-l03-e09");
    expect(translation.type).toBe("translate");
    if (translation.type !== "translate") return;
    expect(translation.answer).toBe("Ele disse que não pode vir à reunião amanhã.");
    expect(
      checkAnswer(translation, {
        kind: "text",
        value: "Ele disse que não poderá vir à reunião amanhã.",
      }).correct,
    ).toBe(true);
  });
});

describe("U007 — registro informal na l23", () => {
  test("adiciona orientação de 반말 antes da prática avaliada", () => {
    const panel = lesson("b1-l23").intro.find((item) =>
      item.title.toLocaleLowerCase("pt-BR").includes("반말"),
    );
    expect(panel).toBeDefined();
    expect(panel!.body).toContain("Sujin e Jimin");
    expect(panel!.body).toContain("해요체");
    expect(panel!.body).toContain("좋겠어");
    expect(panel!.body).toContain("Evite 반말");
    expect(panel!.ko).toContain("좋겠어");

    const listen = exercise("b1-l23-e03");
    expect(listen.type).toBe("listen");
    if (listen.type !== "listen") return;
    expect(listen.answer).toBe("약속을 바꿀 때는 미리 알려 줬으면 좋겠어.");
  });
});

describe("U008 — -ㅂ니다 isolado na l07", () => {
  test("harmoniza 좋습니다 para 좋아요", () => {
    const line = lesson("b1-l07").dialogue.find((item) => item.id === "b1-l07-d6")!;
    expect(line.ko).toContain("좋아요.");
    expect(line.ko).not.toContain("좋습니다");
    expect(line.pt).toBe("Ótimo. Ficou claro o que precisamos fazer para alcançar a meta.");
  });
});

describe("U009 — registro formal em textos de leitura", () => {
  test("preserva -ㅂ니다/-습니다 e explica a diferença de registro", () => {
    const l17 = exercise("b1-l17-e04");
    expect(l17.type).toBe("reading");
    if (l17.type !== "reading") return;
    expect(l17.text).toContain("필요했습니다");

    const l20 = exercise("b1-l20-e10");
    expect(l20.type).toBe("reading");
    if (l20.type !== "reading") return;
    expect(l20.text).toContain("낫습니다");

    expect(lesson("b1-l17").summary.join(" ")).toContain("registro escrito formal");
    expect(lesson("b1-l20").summary.join(" ")).toContain("registro escrito formal");
  });
});

describe("U010 — explicação de -자마자", () => {
  test("nomeia a restrição específica sem generalizar para todo conector", () => {
    const note = lesson("b1-l02").grammar.find((item) => item.id === "b1-l02-g2")!;
    expect(note.explanationPt).toContain("ordem, um pedido nem uma proposta");
    expect(note.explanationPt).toContain("específica de -자마자");
    expect(note.explanationPt).toContain("-자");
    expect(note.explanationPt).not.toContain("não aceita ordem na segunda parte");
  });
});

describe("U011 — metalinguagem da pergunta relatada", () => {
  test("distingue final interrogativo, entonação e pontuação", () => {
    const note = lesson("b1-l03").grammar.find((item) => item.id === "b1-l03-g2")!;
    expect(note.explanationPt).toContain("final interrogativo -냐고");
    expect(note.explanationPt).toContain("ponto de interrogação");
    expect(note.explanationPt).toContain("entonação");
    expect(note.explanationPt).not.toContain("Com verbos de movimento");
  });
});

describe("U012 — -는/-(으)ㄴ/대신(에)", () => {
  test("cobre verbo, adjetivo e substantivo, com 에 opcional", () => {
    const note = lesson("b1-l08").grammar.find((item) => item.id === "b1-l08-g1")!;
    expect(note.form).toContain("명사 + 대신(에)");
    expect(note.explanationPt).toContain("Com substantivos");
    expect(note.explanationPt).toContain("커피 대신에");
    expect(note.explanationPt).toContain("opcional");
    expect(note.explanationPt).toContain("비싼 대신 e 비싼 대신에");
  });
});

describe("U013 — registro de -기에 na l18", () => {
  test("usa -니까 na fala e mantém -기에 no ensino e no cloze", () => {
    const line = lesson("b1-l18").dialogue.find((item) => item.id === "b1-l18-d6")!;
    expect(line.ko).toContain("생각해야 하니까");
    expect(line.ko).not.toContain("생각해야 하기에");
    expect(line.pt).toBe(
      "Sim. Como preciso considerar experiência e competência juntas, não tenho como não adiar a decisão.",
    );

    expect(grammarText("b1-l18")).toContain("-기에");
    expect(grammarText("b1-l18")).toContain("-니까");

    const cloze = exercise("b1-l18-e07");
    expect(cloze.type).toBe("cloze");
    if (cloze.type !== "cloze") return;
    expect(cloze.answer).toBe("기에");
  });
});

describe("U014 — contexto de emergência na l27", () => {
  test("ancora 대피했어요 em um aviso de emergência sem mudar o gabarito", () => {
    const item = exercise("b1-l27-e08");
    expect(item.type).toBe("listen");
    if (item.type !== "listen") return;
    expect(item.prompt).toContain("aviso de emergência");
    expect(item.answer).toBe("승객들은 안전하게 대피했어요.");
    expect(item.explanation).toBe("Os passageiros evacuaram em segurança.");
  });
});

describe("identidades preservadas na Fase 12D", () => {
  test("mantém contagens, IDs afetados e cartões canônicos", () => {
    expect(B1_IMPLEMENTED_LESSONS).toHaveLength(40);
    expect(B1_IMPLEMENTED_CHECKPOINTS).toHaveLength(8);
    expect(ALL_EXERCISES).toHaveLength(615);

    const expected = [
      "b1-l03-e01",
      "b1-l03-e09",
      "b1-l04-e05",
      "b1-l04-e07",
      "b1-l07-d6",
      "b1-l18-d6",
      "b1-l32-d4",
      "b1-l17-e04",
      "b1-l18-e07",
      "b1-l20-e10",
      "b1-l23-e03",
      "b1-l27-e08",
      "b1-l27-e09",
      "b1-l32-e03",
      "b1-l32-e04",
      "b1-l32-e05",
      "b1-l32-e08",
    ];
    for (const id of expected) {
      const present = EXERCISE_BY_ID.has(id) || lesson(id.slice(0, 6)).dialogue.some((line) => line.id === id);
      expect(present, id).toBe(true);
    }

    expect(getVocab("ko:넘어지다")!.lesson).toBe("b1-l02");
    expect(getVocab("ko:대피")!.lesson).toBe("b1-l27");
    expect(new Set(ALL_EXERCISES.map((item) => item.id)).size).toBe(ALL_EXERCISES.length);
  });
});
