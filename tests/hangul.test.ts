import { describe, expect, test } from "vitest";
import {
  MEDIALS,
  composeSyllable,
  decomposeSyllable,
  isFinal,
  isHangulSyllable,
  isHangulText,
  isInitial,
  isMedial,
  normalizeHangul,
} from "@/lib/hangul";
import { medialShape } from "@/lib/hangul/layout";

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

describe("geometria das vogais", () => {
  test("classifica as 21 vogais sem deixar a composta na base", () => {
    const shapes = Object.fromEntries(
      MEDIALS.map((medial) => [medial, medialShape(medial).kind]),
    );

    expect(shapes).toMatchObject({
      "ㅏ": "vertical",
      "ㅐ": "vertical",
      "ㅑ": "vertical",
      "ㅒ": "vertical",
      "ㅓ": "vertical",
      "ㅔ": "vertical",
      "ㅕ": "vertical",
      "ㅖ": "vertical",
      "ㅣ": "vertical",
      "ㅗ": "horizontal",
      "ㅛ": "horizontal",
      "ㅜ": "horizontal",
      "ㅠ": "horizontal",
      "ㅡ": "horizontal",
      "ㅘ": "compound",
      "ㅙ": "compound",
      "ㅚ": "compound",
      "ㅝ": "compound",
      "ㅞ": "compound",
      "ㅟ": "compound",
      "ㅢ": "compound",
    });
    expect(Object.keys(shapes)).toHaveLength(MEDIALS.length);
  });

  test("decompõe as vogais compostas em base e traço lateral", () => {
    expect(medialShape("ㅘ")).toEqual({ kind: "compound", base: "ㅗ", side: "ㅏ" });
    expect(medialShape("ㅚ")).toEqual({ kind: "compound", base: "ㅗ", side: "ㅣ" });
    expect(medialShape("ㅝ")).toEqual({ kind: "compound", base: "ㅜ", side: "ㅓ" });
    expect(medialShape("ㅢ")).toEqual({ kind: "compound", base: "ㅡ", side: "ㅣ" });
  });
});

describe("decomposição e texto Hangul", () => {
  test("faz round-trip de composição e decomposição", () => {
    for (const syllable of ["가", "한", "힣", "아", "이", "오이"]) {
      for (const char of syllable) {
        const parts = decomposeSyllable(char)!;
        expect(composeSyllable(parts.initial, parts.medial, parts.final)).toBe(
          char,
        );
      }
    }
  });

  test("decompõe uma sílaba simples", () => {
    expect(decomposeSyllable("아")).toEqual({
      initial: "ㅇ",
      medial: "ㅏ",
      final: "",
    });
    expect(decomposeSyllable("한")).toEqual({
      initial: "ㅎ",
      medial: "ㅏ",
      final: "ㄴ",
    });
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

describe("batchim simples e duplos", () => {
  test("compõe e decompõe cada final simples e duplo", () => {
    const finals = [
      "ㄱ",
      "ㄲ",
      "ㄳ",
      "ㄴ",
      "ㄵ",
      "ㄶ",
      "ㄷ",
      "ㄹ",
      "ㄺ",
      "ㄻ",
      "ㄼ",
      "ㄽ",
      "ㄾ",
      "ㄿ",
      "ㅀ",
      "ㅁ",
      "ㅂ",
      "ㅄ",
      "ㅅ",
      "ㅆ",
      "ㅇ",
      "ㅈ",
      "ㅊ",
      "ㅋ",
      "ㅌ",
      "ㅍ",
      "ㅎ",
    ] as const;

    for (const final of finals) {
      const syllable = composeSyllable("ㄱ", "ㅏ", final);
      expect(decomposeSyllable(syllable)).toEqual({
        initial: "ㄱ",
        medial: "ㅏ",
        final,
      });
    }
  });

  test("rejeita jamo inválido na posição final", () => {
    expect(() => composeSyllable("ㄱ", "ㅏ", "ㄸ")).toThrow(RangeError);
    expect(() => composeSyllable("ㄱ", "ㅏ", "ㅏ")).toThrow(RangeError);
    expect(() => composeSyllable("ㄳ", "ㅏ", "")).toThrow(RangeError);
  });

  test("texto com batchim duplo permanece NFC", () => {
    for (const text of [
      "닭",
      "삶",
      "값",
      "없다",
      "많다",
      "앉다",
      "핥다",
      "싫다",
      "밟다",
      "젊다",
      "넓다",
      "읊다",
      "훑다",
      "몫",
      "곬",
    ]) {
      expect(normalizeHangul(text)).toBe(text);
      expect(normalizeHangul(text.normalize("NFD"))).toBe(text);
    }
  });
});
