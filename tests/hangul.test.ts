import { describe, expect, test } from "vitest";
import {
  composeSyllable,
  isFinal,
  isHangulSyllable,
  isInitial,
  isMedial,
} from "@/lib/hangul";

describe("Hangul", () => {
  test("compõe sílabas sem e com consoante final", () => {
    expect(composeSyllable("ㄱ", "ㅏ")).toBe("가");
    expect(composeSyllable("ㅎ", "ㅣ", "ㅎ")).toBe("힣");
    expect(composeSyllable("ㅇ", "ㅓ", "ㄴ")).toBe("언");
  });

  test("rejeita jamo em posição inválida", () => {
    expect(() => composeSyllable("ㅏ", "ㄱ")).toThrow(RangeError);
    expect(() => composeSyllable("ㄱ", "ㅏ", "ㄸ")).toThrow(RangeError);
  });

  test("valida jamo por função e sílabas pré-compostas", () => {
    expect(isInitial("ㄸ")).toBe(true);
    expect(isMedial("ㅙ")).toBe(true);
    expect(isFinal("ㄳ")).toBe(true);
    expect(isFinal("ㄸ")).toBe(false);
    expect(isHangulSyllable("한")).toBe(true);
    expect(isHangulSyllable("ㄴ")).toBe(false);
    expect(isHangulSyllable("한국")).toBe(false);
  });
});
