import { describe, expect, test } from "vitest";
import { leitner, type SrsState } from "@/lib/srs";

const NOW = new Date("2026-11-10T12:00:00.000Z");

describe("agendador Leitner", () => {
  test("agenda um cartão novo na primeira caixa", () => {
    expect(leitner.review(undefined, "correct", NOW)).toEqual({
      box: 1,
      due: "2026-11-11T12:00:00.000Z",
    });
  });

  test("avança até a caixa cinco com intervalos crescentes", () => {
    const intervals = [2, 4, 8, 16];
    let state: SrsState = { box: 1, due: NOW.toISOString() };

    for (const [index, days] of intervals.entries()) {
      state = leitner.review(state, "correct", NOW);
      expect(state.box).toBe(index + 2);
      expect(state.due).toBe(new Date(NOW.getTime() + days * 86_400_000).toISOString());
    }

    expect(leitner.review(state, "correct", NOW).box).toBe(5);
  });

  test("erro retorna à caixa um sem alterar o estado anterior", () => {
    const previous: SrsState = { box: 4, due: "2026-11-18T12:00:00.000Z" };

    expect(leitner.review(previous, "again", NOW)).toEqual({
      box: 1,
      due: "2026-11-11T12:00:00.000Z",
    });
    expect(previous.box).toBe(4);
  });

  test("retorna apenas ids vencidos, incluindo o limite exato", () => {
    const states: Record<string, SrsState> = {
      overdue: { box: 1, due: "2026-11-09T12:00:00.000Z" },
      boundary: { box: 2, due: NOW.toISOString() },
      future: { box: 3, due: "2026-11-11T12:00:00.000Z" },
    };

    expect(leitner.due(states, NOW)).toEqual(["overdue", "boundary"]);
  });

  test("rejeita um relógio inválido", () => {
    expect(() => leitner.review(undefined, "correct", new Date("invalid"))).toThrow(RangeError);
  });
});
