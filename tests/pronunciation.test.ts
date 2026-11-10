import { describe, expect, test } from "vitest";
import {
  applyAspiration,
  applyLiaison,
  applyNasalization,
} from "@/lib/hangul/pronunciation";

describe("ligação (연음)", () => {
  test("move o batchim simples para a sílaba seguinte com ㅇ", () => {
    expect(applyLiaison("한국어")).toMatchObject({ spoken: "한구거", changes: 1 });
    expect(applyLiaison("음악")).toMatchObject({ spoken: "으막", changes: 1 });
    expect(applyLiaison("밥을")).toMatchObject({ spoken: "바블", changes: 1 });
    expect(applyLiaison("옷을")).toMatchObject({ spoken: "오슬", changes: 1 });
    expect(applyLiaison("꽃이")).toMatchObject({ spoken: "꼬치", changes: 1 });
  });

  test("trata ㅎ final e os duplos ㄺ/ㄵ sem inventar uma consoante", () => {
    expect(applyLiaison("좋아요")).toMatchObject({ spoken: "조아요", changes: 1 });
    expect(applyLiaison("읽어요")).toMatchObject({ spoken: "일거요", changes: 1 });
    expect(applyLiaison("앉아요")).toMatchObject({ spoken: "안자요", changes: 1 });
  });

  test("não transforma ㅇ final nem aplica ligação antes de consoante", () => {
    expect(applyLiaison("강아지")).toBeNull();
    expect(applyLiaison("한국말")).toBeNull();
    expect(applyLiaison("입이")).toMatchObject({ spoken: "이비" });
  });

  test("mantém a ortografia e rejeita texto fora do escopo", () => {
    const result = applyLiaison("한국어")!;
    expect(result.written).toBe("한국어");
    expect(result.spoken).not.toBe(result.written);
    expect(applyLiaison("한국어를 공부해요")).toBeNull();
    expect(applyLiaison("hello")).toBeNull();
  });
});

describe("nasalização", () => {
  test("assimila ㄱ/ㄷ/ㅂ antes de ㄴ/ㅁ", () => {
    expect(applyNasalization("한국말")).toMatchObject({ spoken: "한궁말" });
    expect(applyNasalization("입니다")).toMatchObject({ spoken: "임니다" });
    expect(applyNasalization("학년")).toMatchObject({ spoken: "항년" });
    expect(applyNasalization("국물")).toMatchObject({ spoken: "궁물" });
    expect(applyNasalization("십만")).toMatchObject({ spoken: "심만" });
    expect(applyNasalization("먹는다")).toMatchObject({ spoken: "멍는다" });
    expect(applyNasalization("잡는")).toMatchObject({ spoken: "잠는" });
    expect(applyNasalization("받는다")).toMatchObject({ spoken: "반는다" });
  });

  test("não nasaliza antes de vogal: a ligação vem primeiro", () => {
    expect(applyNasalization("입이")).toBeNull();
    expect(applyLiaison("입이")).toMatchObject({ spoken: "이비" });
  });
});

describe("aspiração", () => {
  test("funde ㄱ/ㄷ/ㅂ/ㅈ com ㅎ nos dois sentidos", () => {
    expect(applyAspiration("좋다")).toMatchObject({ spoken: "조타", changes: 1 });
    expect(applyAspiration("축하")).toMatchObject({ spoken: "추카", changes: 1 });
    expect(applyAspiration("입학")).toMatchObject({ spoken: "이팍", changes: 1 });
    expect(applyAspiration("백화점")).toMatchObject({ spoken: "배콰점", changes: 1 });
    expect(applyAspiration("국화")).toMatchObject({ spoken: "구콰", changes: 1 });
  });

  test("não transforma ㅎ fraco após ㄴ/ㅁ/ㅇ", () => {
    expect(applyAspiration("전화")).toBeNull();
    expect(applyAspiration("좋아요")).toBeNull();
  });
});
