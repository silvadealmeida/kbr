import { readdirSync } from "node:fs";
import path from "node:path";
import { describe, expect, test } from "vitest";

import manifest from "@/content/audio/manifest.json";
import { resolvePublicAudioSrc } from "@/lib/audio/manifest";

const ROOT = process.cwd();

describe("distribuição do áudio estático", () => {
  test("o corpus continua versionado e íntegro", () => {
    const files = readdirSync(path.join(ROOT, "public", "audio", "v1"));
    expect(files.filter((file) => file.endsWith(".mp3"))).toHaveLength(
      manifest.items.length,
    );
  });

  test("o áudio é servido por padrão e o kill switch =0 desliga", () => {
    expect(resolvePublicAudioSrc("한")).toMatch(/^\/audio\/v1\/ko-/);
    expect(resolvePublicAudioSrc("한", true)).toMatch(/^\/audio\/v1\/ko-/);
    expect(resolvePublicAudioSrc("한", false)).toBeNull();
  });

  test("o artefato de deploy não exclui public/audio/", async () => {
    const { readFileSync } = await import("node:fs");
    const ignore = readFileSync(path.join(ROOT, ".vercelignore"), "utf8");
    expect(ignore.split(/\r?\n/).map((line) => line.trim())).not.toContain(
      "public/audio/",
    );
  });
});
