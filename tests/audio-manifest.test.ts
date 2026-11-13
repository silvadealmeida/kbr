import { createHash } from "node:crypto";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { describe, expect, test } from "vitest";

import manifest from "@/content/audio/manifest.json";
import staleAudio from "./fixtures/stale-audio.json";
import { A1_IMPLEMENTED_CHECKPOINTS, A1_IMPLEMENTED_LESSONS } from "@/content/curriculum/a1/content";
import { A2_IMPLEMENTED_CHECKPOINTS, A2_IMPLEMENTED_LESSONS } from "@/content/curriculum/a2/content";
import { B1_IMPLEMENTED_CHECKPOINTS, B1_IMPLEMENTED_LESSONS } from "@/content/curriculum/b1/content";
import { HANGUL_CURRICULUM } from "@/content/hangul";
import { VOCAB_ENTRIES, VOCAB_SENTENCES } from "@/content/vocabulary";
import { collectAudioInventory } from "@/lib/audio/inventory";
import {
  hasAudioAsset,
  resolveAudioAsset,
  resolvePublicAudioSrc,
} from "@/lib/audio/manifest";
import { audioKey } from "@/lib/audio/text";

const PUBLIC_DIR = path.join(process.cwd(), "public", "audio", "v1");

const COURSE_STEPS = [
  ...A1_IMPLEMENTED_LESSONS.map((step) => ({ courseId: "ko-a1", step })),
  ...A1_IMPLEMENTED_CHECKPOINTS.map((step) => ({ courseId: "ko-a1", step })),
  ...A2_IMPLEMENTED_LESSONS.map((step) => ({ courseId: "ko-a2", step })),
  ...A2_IMPLEMENTED_CHECKPOINTS.map((step) => ({ courseId: "ko-a2", step })),
  ...B1_IMPLEMENTED_LESSONS.map((step) => ({ courseId: "ko-b1", step })),
  ...B1_IMPLEMENTED_CHECKPOINTS.map((step) => ({ courseId: "ko-b1", step })),
];

// O corpus cobre Hangul, A1, A2, B1 e o vocabulário desses cursos.
const AUDIO_COURSES = new Set(["hangul", "ko-a1", "ko-a2", "ko-b1"]);
const AUDIO_VOCABULARY = VOCAB_ENTRIES.filter((entry) =>
  AUDIO_COURSES.has(entry.course),
);
const AUDIO_VOCAB_IDS = new Set(AUDIO_VOCABULARY.map((entry) => entry.id));
const AUDIO_SENTENCES = VOCAB_SENTENCES.filter((sentence) =>
  AUDIO_VOCAB_IDS.has(sentence.vocabId),
);

function audioInventory() {
  return collectAudioInventory(HANGUL_CURRICULUM, {
    courseSteps: COURSE_STEPS,
    vocabulary: AUDIO_VOCABULARY,
    sentences: AUDIO_SENTENCES,
  });
}

function fullInventory() {
  return collectAudioInventory(HANGUL_CURRICULUM, {
    courseSteps: COURSE_STEPS,
    vocabulary: VOCAB_ENTRIES,
    sentences: VOCAB_SENTENCES,
  });
}

function sha256(file: string) {
  return createHash("sha256").update(readFileSync(file)).digest("hex");
}

describe("manifesto de áudio estático", () => {
  test("cobre integralmente o inventário atual, sem lacunas", () => {
    const inventory = audioInventory();
    const texts = new Set(inventory.map((item) => item.text));
    const manifestTexts = new Set(manifest.items.map((item) => item.text));
    const missing = [...texts].filter((text) => !manifestTexts.has(text)).sort();
    const obsolete = [...manifestTexts].filter((text) => !texts.has(text)).sort();

    expect(inventory.length).toBe(manifest.count);
    expect(missing).toEqual(staleAudio.missing);
    expect(obsolete).toEqual(staleAudio.obsolete);
    expect(hasAudioAsset("한")).toBe(true);
    expect(hasAudioAsset("저는 학생이에요.")).toBe(true);
    expect(resolvePublicAudioSrc("저는 학생이에요.")).not.toBeNull();
  });

  test("textos corrigidos também têm MP3 próprio", () => {
    for (const text of [
      "감기가 심해요.",
      "극장 앞에서 만나요.",
      "무거운 것은 들지 말고 저를 도와주세요.",
    ]) {
      expect(hasAudioAsset(text)).toBe(true);
      expect(resolvePublicAudioSrc(text)).toMatch(/^\/audio\/v1\/ko-/);
    }
  });

  test("o B1 agora tem MP3 próprio como os demais cursos", () => {
    const b1 = VOCAB_ENTRIES.filter((entry) => entry.course === "ko-b1");
    expect(b1.length).toBeGreaterThan(0);
    expect(b1.every((entry) => hasAudioAsset(entry.audioText))).toBe(true);
    expect(fullInventory().length).toBe(audioInventory().length);
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
      expect(item.text).toMatch(/^[\uAC00-\uD7A3\u3131-\u318E\s.,?!0-9]+$/);
      expect(item.key).toBe(audioKey(item.text));
      expect(item.src).toBe(`/audio/v1/${item.key}.mp3`);
      expect(item.src.startsWith("/audio/v1/")).toBe(true);
      expect(item.src.endsWith(".mp3")).toBe(true);
    }
  });

  test("cada entrada aponta para um MP3 real, íntegro e dentro do orçamento", () => {
    let totalBytes = 0;
    for (const item of manifest.items) {
      const file = path.join(process.cwd(), "public", item.src.replace(/^\//, ""));
      expect(existsSync(file)).toBe(true);
      const bytes = readFileSync(file).byteLength;
      expect(bytes).toBe(item.bytes);
      expect(bytes).toBeGreaterThan(1_000);
      expect(sha256(file)).toBe(item.sha256);
      expect(item.durationSeconds).toBeGreaterThan(0.2);
      expect(item.durationSeconds).toBeLessThan(15);
      expect(item.peakDb).toBeLessThanOrEqual(-0.5);
      expect(item.rmsDb).toBeGreaterThanOrEqual(-20);
      expect(item.rmsDb).toBeLessThanOrEqual(-16);
      totalBytes += bytes;
    }

    expect(totalBytes).toBe(manifest.totalBytes);
    expect(totalBytes).toBeLessThan(80 * 1024 * 1024);
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
    expect(asset?.src).toMatch(/^\/audio\/v1\/ko-[0-9a-f]{8}\.mp3$/);
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

  test("o áudio estático é servido por padrão; =0 é kill switch", () => {
    expect(resolvePublicAudioSrc("한", false)).toBeNull();
    expect(resolvePublicAudioSrc("한", true)).toMatch(/^\/audio\/v1\/ko-/);
    expect(resolvePublicAudioSrc("한")).toMatch(/^\/audio\/v1\/ko-/);
  });
});
