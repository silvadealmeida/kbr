import { describe, expect, test } from "vitest";
import manifest from "@/app/manifest";

describe("manifesto da PWA", () => {
  test("declara instalação standalone e ícones essenciais", () => {
    const value = manifest();

    expect(value.display).toBe("standalone");
    expect(value.start_url).toBe("/");
    expect(value.icons).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ sizes: "192x192" }),
        expect.objectContaining({ sizes: "512x512", purpose: "maskable" }),
      ]),
    );
  });
});
