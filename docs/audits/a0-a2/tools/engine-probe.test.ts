import { writeFileSync } from "node:fs";
import { test } from "vitest";

import { checkAnswer } from "@/lib/exercises";
import type { ExerciseSpec } from "@/lib/exercises";
import { applyLiaison } from "@/lib/hangul/pronunciation";
import { A1_IMPLEMENTED_CHECKPOINTS, A1_IMPLEMENTED_LESSONS } from "@/content/curriculum/a1";
import { HANGUL_CURRICULUM } from "@/content/hangul";
import { A2_IMPLEMENTED_CHECKPOINTS, A2_IMPLEMENTED_LESSONS } from "@/content/curriculum/a2";

/**
 * Auditoria (PASS C) — sondas do motor real sobre os achados críticos e sobre
 * os MAJOR de maior impacto. Somente leitura de conteúdo; escreve apenas
 * `data/engine-probe.json`.
 */
const all = [...A1_IMPLEMENTED_LESSONS, ...A2_IMPLEMENTED_LESSONS, ...A1_IMPLEMENTED_CHECKPOINTS, ...A2_IMPLEMENTED_CHECKPOINTS];
const raw = (id: string) => {
  for (const l of all) {
    const ex = l.exercises.find((e) => e.id === id);
    if (ex) return ex as unknown as Record<string, unknown>;
  }
  throw new Error(`exercício não encontrado: ${id}`);
};
const spec = (id: string) => raw(id) as unknown as ExerciseSpec;
const text = (v: string) => ({ kind: "text" as const, value: v });
const ok = (id: string, v: string) => checkAnswer(spec(id), text(v)).correct;

const out: Record<string, unknown> = {};

test("sondas do motor de correção", () => {
  // C1 — mcq impossível
  const mcq = raw("a2-l02-e01") as { options: string[]; correctAnswer: string };
  out.C1_a2_l02_e01 = {
    options: mcq.options,
    correctAnswer: mcq.correctAnswer,
    algumaOpcaoPassa: mcq.options.map((o) => ok("a2-l02-e01", o)),
  };

  // C2 — cloze que imprime partícula agramatical
  const cloze = raw("a1-l11-e06") as { prompt: string; answer: string };
  out.C2_a1_l11_e06 = {
    preenchido: cloze.prompt.replace(/_{2,}/, cloze.answer),
    aceitaGabarito: ok("a1-l11-e06", "언니"),
    aceitaFormaCorreta: ok("a1-l11-e06", "언니는"),
    parceiro: (() => {
      const c = raw("a1-c03-e13") as { prompt: string; answer: string };
      return { preenchido: c.prompt.replace(/_{2,}/, c.answer), aceitaGabarito: ok("a1-c03-e13", c.answer), aceitaFormaCorreta: ok("a1-c03-e13", "언니는") };
    })(),
  };

  // C3 — MCQ de partícula com duas respostas defensáveis
  out.C3_a1_l03_e09 = raw("a1-l03-e09");

  // C4 — regra falsa na explicação
  out.C4_a1_l01_e03 = raw("a1-l01-e03");

  // C5 — ponto de encontro 에 × 에서 (texto ensinado)
  const l25 = A1_IMPLEMENTED_LESSONS.find((l) => l.id === "a1-l25")!;
  out.C5_a1_l25 = (l25.grammar as unknown as { id: string; explanationPt: string; examples: { ko: string }[] }[])
    .filter((g) => JSON.stringify(g).includes("만나요"))
    .map((g) => ({ id: g.id, explicacao: g.explanationPt, exemplos: g.examples.map((e) => e.ko) }));

  // C6 — música/연음: o que o motor produz × o que a prosa das lições afirma
  out.C6_liaison = {
    motorMusica: applyLiaison("음악")?.spoken,
    motorCoreano: applyLiaison("한국어")?.spoken,
    prosa: HANGUL_CURRICULUM.lessons.find((l) => l.id === "h21")!.exercises.find((e) => e.id === "h21-e02")!.explanation,
    notaRegra: HANGUL_CURRICULUM.rules.find((r) => r.id === "rule:liaison")!.examples.find((e) => e.written === "음악")!.note,
    notaPalavra: HANGUL_CURRICULUM.words.find((w) => w.id === "word:음악")!.notes,
  };

  // S1 — pontuação obrigatória na produção
  out.S1_puntuacao = {
    comPonto: ok("a2-l01-e05", "토요일에 친구와 전시를 봤어요."),
    semPonto: ok("a2-l01-e05", "토요일에 친구와 전시를 봤어요"),
    escutaSemPonto: ok("a2-l02-e08", "일본에는 두 번 갔어요"),
    a1ComSemPonto: [ok("a1-l01-e09", "저는 브라질 사람이에요."), ok("a1-l01-e09", "저는 브라질 사람이에요")],
  };

  // S2 — variantes honoríficas
  out.S2_variantes_honorificas = {
    l33_e02: { aceitas: (raw("a2-l33-e02") as { acceptedAnswers?: string[] }).acceptedAnswers ?? [], testa: { 계세요: ok("a2-l33-e02", "계세요"), 계셔요: ok("a2-l33-e02", "계셔요") } },
    l33_e07: { aceitas: (raw("a2-l33-e07") as { acceptedAnswers?: string[] }).acceptedAnswers ?? [], testa: { 뵈었어요: ok("a2-l33-e07", "뵈었어요"), 뵀어요: ok("a2-l33-e07", "뵀어요") } },
  };

  // S3 — ditado de pavimento
  out.S3_pavimento = {
    alvo: (raw("a2-l13-e08") as { answer: string }).answer,
    aceitas: (raw("a2-l13-e08") as { acceptedAnswers?: string[] }).acceptedAnswers ?? [],
    testa: { "삼 층이에요": ok("a2-l13-e08", "삼 층이에요"), "삼층이에요": ok("a2-l13-e08", "삼층이에요"), "삼 층이에요.": ok("a2-l13-e08", "삼 층이에요.") },
  };

  // S4 — elipse de tópico em pt-ko
  out.S4_elipse = {
    l16_e05: { alvo: (raw("a1-l16-e05") as { answer: string }).answer, semTopico: ok("a1-l16-e05", "커피를 좋아해요."), comTopico: ok("a1-l16-e05", "저는 커피를 좋아해요.") },
    l20_e05: { alvo: (raw("a1-l20-e05") as { answer: string }).answer, semTopico: ok("a1-l20-e05", "여행하고 싶어요.") },
  };

  // S5 — registro formal × gabarito informal
  out.S5_registro = {
    l23_e05: { prompt: (raw("a2-l23-e05") as { prompt: string }).prompt, alvo: (raw("a2-l23-e05") as { answer: string }).answer, aceita: ok("a2-l23-e05", "고객 지원 경험이 있어요.") },
  };

  // S6 — ditado de contração nunca ensinada
  out.S6_contracao = {
    l09_e09: { alvo: (raw("a1-l09-e09") as { answer: string }).answer, aceitaPlena: ok("a1-l09-e09", "영화는 별로 안 보아요"), aceitaContrada: ok("a1-l09-e09", "영화는 별로 안 봐요") },
  };

  writeFileSync("docs/audits/a0-a2/data/engine-probe.json", JSON.stringify(out, null, 2));
});
