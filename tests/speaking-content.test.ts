import { describe, expect, it } from "vitest";
import { WORDS } from "@/content/hangul";
import { SPEAKING_WORD_IDS } from "@/content/speaking";
import { resolveAudioAsset } from "@/lib/audio/manifest";

describe("itens da prática de fala", () => {
  it("usam só palavras já existentes no currículo, com áudio estático", () => {
    for (const id of SPEAKING_WORD_IDS) {
      const word = WORDS.find((w) => w.id === id);
      expect(word, id).toBeDefined();
      expect(resolveAudioAsset(word!.audioText ?? word!.ko), id).not.toBeNull();
    }
    expect(new Set(SPEAKING_WORD_IDS).size).toBe(SPEAKING_WORD_IDS.length);
  });
});
