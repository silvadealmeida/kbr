import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { describe, expect, test } from "vitest";

import manifest from "@/content/audio/manifest.json";
import { resolvePublicAudioSrc } from "@/lib/audio/manifest";

const ROOT = process.cwd();

describe("contenção do áudio estático", () => {
  test("o corpus continua versionado e íntegro, sem ser apagado", () => {
    const files = readdirSync(path.join(ROOT, "public", "audio", "v1"));
    expect(files.filter((file) => file.endsWith(".mp3"))).toHaveLength(
      manifest.items.length,
    );
  });

  test("a Vercel exclui public/audio/ do artefato de deploy", () => {
    const ignore = readFileSync(path.join(ROOT, ".vercelignore"), "utf8");
    expect(ignore.split(/\r?\n/).map((line) => line.trim())).toContain(
      "public/audio/",
    );
  });

  test("sem opt-in explícito, o player não recebe caminho de MP3", () => {
    expect(resolvePublicAudioSrc("한")).toBeNull();
    expect(resolvePublicAudioSrc("한", false)).toBeNull();
    expect(resolvePublicAudioSrc("한", true)).toMatch(/^\/audio\/v1\/ko-/);
  });
});
