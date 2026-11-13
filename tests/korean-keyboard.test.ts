import { describe, expect, test } from "vitest";

import {
  KEYBOARD_CONSONANTS,
  KEYBOARD_VOWELS,
  backspaceJamo,
  insertJamo,
  insertSpace,
} from "@/lib/hangul/keyboard";

function type(keys: string): string {
  return [...keys].reduce((value, key) => insertJamo(value, key), "");
}

describe("teclado coreano: composição", () => {
  test("compõe consoante + vogal e adiciona batchim", () => {
    expect(type("ㄱㅏ")).toBe("가");
    expect(type("ㄱㅏㄴ")).toBe("간");
    expect(type("ㅎㅏㄴ")).toBe("한");
    expect(type("ㅎㅏㄴㄱㅜㄱ")).toBe("한국");
  });

  test("vogal depois de batchim abre uma nova sílaba", () => {
    expect(type("ㄱㅏㄴㅏ")).toBe("가나");
    expect(type("ㅅㅏㄹㅏㅁ")).toBe("사람");
  });

  test("vogal composta junta duas teclas", () => {
    expect(type("ㄱㅗㅏ")).toBe("과");
    expect(type("ㅇㅜㅣ")).toBe("위");
    expect(type("ㅎㅘ")).toBe("화");
  });

  test("batchim composto", () => {
    expect(type("ㄷㅏㄹㄱ")).toBe("닭");
    expect(type("ㅇㅏㄴㅈ")).toBe("앉");
  });

  test("batchim composto se divide quando entra uma vogal", () => {
    expect(type("ㄷㅏㄹㄱㅏ")).toBe("달가");
    expect(type("ㅇㅏㄴㅈㅏ")).toBe("안자");
  });

  test("vogal sozinha recebe ㅇ ao ganhar batchim", () => {
    expect(type("ㅏ")).toBe("ㅏ");
    expect(type("ㅏㄱ")).toBe("악");
  });

  test("preserva texto latino, espaços e pontuação", () => {
    expect(insertJamo("Olá ", "ㄱ")).toBe("Olá ㄱ");
    expect(insertSpace("한국")).toBe("한국 ");
    expect(insertJamo("abc!", "ㅏ")).toBe("abc!ㅏ");
  });
});

describe("teclado coreano: backspace", () => {
  test("remove batchim, vogal e consoante na ordem inversa", () => {
    expect(backspaceJamo("간")).toBe("가");
    expect(backspaceJamo("가")).toBe("ㄱ");
    expect(backspaceJamo("ㄱ")).toBe("");
  });

  test("desfaz vogal e batchim compostos", () => {
    expect(backspaceJamo("과")).toBe("고");
    expect(backspaceJamo("닭")).toBe("달");
    expect(backspaceJamo("달")).toBe("다");
  });

  test("remove só o último caractere do texto misto", () => {
    expect(backspaceJamo("한국 ")).toBe("한국");
    expect(backspaceJamo("abc")).toBe("ab");
  });
});

describe("teclado coreano: teclas", () => {
  test("mostra as 19 consoantes e as 21 vogais", () => {
    expect(KEYBOARD_CONSONANTS).toHaveLength(19);
    expect(KEYBOARD_VOWELS).toHaveLength(21);
  });
});
