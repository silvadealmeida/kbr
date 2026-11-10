import { describe, expect, test } from "vitest";
import {
  composeSyllable,
  decomposeSyllable,
  isFinal,
  isHangulSyllable,
  isHangulText,
  isInitial,
  isMedial,
  normalizeHangul,
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

describe("decomposição e texto Hangul", () => {
  test("faz round-trip de composição e decomposição", () => {
    for (const syllable of ["가", "한", "힣", "아", "이", "오이"]) {
      for (const char of syllable) {
        const parts = decomposeSyllable(char)!;
        expect(composeSyllable(parts.initial, parts.medial, parts.final)).toBe(char);
      }
    }
  });

  test("decompõe uma sílaba simples", () => {
    expect(decomposeSyllable("아")).toEqual({ initial: "ㅇ", medial: "ㅏ", final: "" });
    expect(decomposeSyllable("한")).toEqual({ initial: "ㅎ", medial: "ㅏ", final: "ㄴ" });
  });

  test("rejeita texto que não é uma sílaba única", () => {
    expect(decomposeSyllable("한국")).toBeNull();
    expect(decomposeSyllable("ㄱ")).toBeNull();
    expect(decomposeSyllable("a")).toBeNull();
  });

  test("valida texto composto apenas por sílabas e espaços", () => {
    expect(isHangulText("아이")).toBe(true);
    expect(isHangulText("아이 오이")).toBe(true);
    expect(isHangulText("")).toBe(false);
    expect(isHangulText("아이!")).toBe(false);
    expect(isHangulText("ㅇㅏ")).toBe(false);
    expect(isHangulText("han")).toBe(false);
  });

  test("normaliza para NFC sem alterar o conteúdo", () => {
    const decomposed = "아".normalize("NFD");
    expect(normalizeHangul(decomposed)).toBe("아");
    expect(normalizeHangul(" 한글 ")).toBe(" 한글 ");
  });
});
