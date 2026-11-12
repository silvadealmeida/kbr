import { createHash } from "node:crypto";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { describe, expect, test } from "vitest";

import manifest from "@/content/audio/manifest.json";
import { HANGUL_CURRICULUM } from "@/content/hangul";
import { collectAudioInventory } from "@/lib/audio/inventory";
import {
  audioAssetCount,
  hasAudioAsset,
  resolveAudioAsset,
  resolvePublicAudioSrc,
} from "@/lib/audio/manifest";
import { audioKey } from "@/lib/audio/text";

const PUBLIC_DIR = path.join(process.cwd(), "restricted-assets", "audio", "hangul", "v1");

function sha256(file: string) {
  return createHash("sha256").update(readFileSync(file)).digest("hex");
}

describe("manifesto de áudio estático", () => {
  test("cobre todo o inventário falado do currículo", () => {
    const inventory = collectAudioInventory(HANGUL_CURRICULUM);
    const missing = inventory.filter((item) => !hasAudioAsset(item.text));

    expect(inventory).toHaveLength(287);
    expect(missing).toEqual([]);
    expect(audioAssetCount()).toBe(inventory.length);
  });

  test("mantém chaves, textos e caminhos únicos", () => {
    const texts = manifest.items.map((item) => item.text);
    const keys = manifest.items.map((item) => item.key);
    const sources = manifest.items.map((item) => item.src);
    const hashes = manifest.items.map((item) => item.sha256);

    expect(new Set(texts).size).toBe(texts.length);
    expect(new Set(keys).size).toBe(keys.length);
    expect(new Set(sources).size).toBe(sources.length);
    expect(new Set(hashes).size).toBe(hashes.length);
    expect(manifest.count).toBe(manifest.items.length);
  });

  test("só contém texto coreano não vazio e chaves determinísticas", () => {
    for (const item of manifest.items) {
      expect(item.text.trim()).toBe(item.text);
      expect(item.text.length).toBeGreaterThan(0);
      expect(item.text).toMatch(/^[\uAC00-\uD7A3\u3131-\u318E\s]+$/);
      expect(item.key).toBe(audioKey(item.text));
      expect(item.src).toBe(`/audio/hangul/v1/${item.key}.mp3`);
      expect(item.src.startsWith("/audio/hangul/v1/")).toBe(true);
      expect(item.src.endsWith(".mp3")).toBe(true);
    }
  });

  test("cada entrada aponta para um MP3 real, íntegro e dentro do orçamento", () => {
    let totalBytes = 0;
    for (const item of manifest.items) {
      const file = path.join(process.cwd(), "restricted-assets", item.src.replace(/^\//, ""));
      expect(existsSync(file)).toBe(true);
      const bytes = readFileSync(file).byteLength;
      expect(bytes).toBe(item.bytes);
      expect(bytes).toBeGreaterThan(1_000);
      expect(sha256(file)).toBe(item.sha256);
      expect(item.durationSeconds).toBeGreaterThan(0.2);
      expect(item.durationSeconds).toBeLessThan(5);
      expect(item.peakDb).toBeLessThanOrEqual(-0.5);
      expect(item.rmsDb).toBeGreaterThanOrEqual(-20);
      expect(item.rmsDb).toBeLessThanOrEqual(-16);
      totalBytes += bytes;
    }

    expect(totalBytes).toBe(manifest.totalBytes);
    expect(totalBytes).toBeLessThan(3 * 1024 * 1024);
  });

  test("não deixa arquivos órfãos no diretório versionado", () => {
    const expected = new Set(
      manifest.items.map((item) => path.basename(item.src)),
    );
    const actual = new Set(readdirSync(PUBLIC_DIR));
    expect([...actual].sort()).toEqual([...expected].sort());
  });

  test("mantém a resolução normalizada e rejeita texto vazio", () => {
    const asset = resolveAudioAsset("  한국어  ");
    expect(asset?.text).toBe("한국어");
    expect(asset?.src).toMatch(/^\/audio\/hangul\/v1\/ko-[0-9a-f]{8}\.mp3$/);
    expect(resolveAudioAsset("   ")).toBeNull();
    expect(resolveAudioAsset("texto em português")).toBeNull();
  });

  test("registra modelo, revisões e parâmetros de codificação", () => {
    expect(manifest.model.repo).toBe("myshell-ai/MeloTTS-Korean");
    expect(manifest.model.revision).toBe(
      "0207e5adfc90129a51b6b03d89be6d84360ed323",
    );
    expect(manifest.model.encoder.repo).toBe("kykim/bert-kor-base");
    expect(manifest.model.encoder.revision).toBe(
      "1779cc0982ada0216dd6de0dd4e86fb78201926d",
    );
    expect(manifest.encoding.codec).toBe("libmp3lame");
    expect(manifest.encoding.sampleRate).toBe(44100);
    expect(manifest.encoding.channels).toBe(1);
  });

  test("com a flag desligada nenhum caminho de MP3 é entregue ao player", () => {
    expect(resolvePublicAudioSrc("한", false)).toBeNull();
    expect(resolvePublicAudioSrc("한", true)).toMatch(/^\/audio\/hangul\/v1\/ko-/);
    // padrão do ambiente de teste: flag ausente
    expect(resolvePublicAudioSrc("한")).toBeNull();
  });
});
