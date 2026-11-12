import { mkdtempSync, mkdirSync, readFileSync, writeFileSync, existsSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { describe, expect, test } from "vitest";

import manifest from "@/content/audio/manifest.json";
import { findRestrictedAudio } from "../scripts/audio/guard-lib.mjs";

const find = findRestrictedAudio as (roots: string[], m: unknown) => string[];
const ROOT = process.cwd();
const FLAG_ON = process.env.NEXT_PUBLIC_KBR_STATIC_AUDIO === "1";
const SAMPLE = path.join(ROOT, "restricted-assets", manifest.items[0].src);

describe("contenção do áudio sintético restrito", () => {
  test("o detector pega MP3, caminho audio/hangul e cópia renomeada pelo hash", () => {
    const dir = mkdtempSync(path.join(tmpdir(), "kbr-guard-"));
    mkdirSync(path.join(dir, "static"), { recursive: true });
    writeFileSync(path.join(dir, "static", "limpo.js"), "console.log(1)");
    expect(find([dir], manifest)).toEqual([]);

    writeFileSync(path.join(dir, "static", "renomeado.bin"), readFileSync(SAMPLE));
    writeFileSync(path.join(dir, "static", "qualquer.mp3"), "x");
    expect(find([dir], manifest).map((f) => path.basename(f)).sort()).toEqual([
      "qualquer.mp3",
      "renomeado.bin",
    ]);
  });

  test.skipIf(FLAG_ON)("public/ não contém nenhum MP3 do corpus (flag desligada)", () => {
    expect(existsSync(path.join(ROOT, "public", "audio"))).toBe(false);
    expect(find([path.join(ROOT, "public")], manifest)).toEqual([]);
  });

  test.skipIf(FLAG_ON || !existsSync(path.join(ROOT, ".next")))(
    "o artefato de build (.next) não contém o corpus",
    () => {
      expect(find([path.join(ROOT, ".next")], manifest)).toEqual([]);
    },
  );

  test("a fonte permanece versionada fora de public/ e a cópia local é ignorada pelo Git", () => {
    expect(existsSync(SAMPLE)).toBe(true);
    expect(readFileSync(path.join(ROOT, ".gitignore"), "utf8")).toContain("/public/audio/");
  });

  test("prebuild e postbuild rodam o guarda", () => {
    const scripts = JSON.parse(readFileSync(path.join(ROOT, "package.json"), "utf8")).scripts;
    expect(scripts.prebuild).toContain("verify-no-restricted-audio");
    expect(scripts.postbuild).toContain("verify-no-restricted-audio");
  });

  test("nenhum arquivo de áudio versionado fora de restricted-assets/ (anti-reintrodução)", () => {
    const tracked = execFileSync("git", ["ls-files", "-z"], { cwd: ROOT, encoding: "utf8" })
      .split("\0")
      .filter((f) => /\.(mp3|wav|ogg|m4a|flac|aac)$/i.test(f) && !f.startsWith("restricted-assets/"));
    expect(tracked).toEqual([]);
  });
});
