import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, test } from "vitest";

import manifest from "@/content/audio/manifest.json";
import { COURSE_OUTLINE, HANGUL_CURRICULUM } from "@/content/hangul";
import { PRONUNCIATION_APPLIERS } from "@/lib/hangul/pronunciation";
import type { ExerciseSpec } from "@/lib/exercises";
import { decomposeSyllable } from "@/lib/hangul";

/**
 * Auditoria estrutural 8D, independente de `validateCurriculum`: usa a
 * decomposição NFD do Unicode (não `lib/hangul`) e cruza áudio × texto ×
 * gabarito. Só afirma fatos verificáveis por máquina; não certifica coreano.
 */
const { lessons, checkpoints, syllables, words, jamo, rules } = HANGUL_CURRICULUM;
const steps = [...lessons, ...checkpoints];
const exercises: { step: string; ex: ExerciseSpec }[] = steps.flatMap((s) =>
  s.exercises.map((ex) => ({ step: s.id, ex })),
);

// NFD de uma sílaba composta dá jamo conjoining; comparamos com o compatível.
const L = "ᄀᄁᄂᄃᄄᄅᄆᄇᄈᄉᄊᄋᄌᄍᄎᄏᄐᄑᄒ";
const COMPAT_L = "ㄱㄲㄴㄷㄸㄹㅁㅂㅃㅅㅆㅇㅈㅉㅊㅋㅌㅍㅎ";

describe("auditoria 8D — estrutura do currículo", () => {
  test("ids de exercício são únicos em todo o módulo", () => {
    const seen = new Map<string, number>();
    for (const { ex } of exercises) seen.set(ex.id, (seen.get(ex.id) ?? 0) + 1);
    expect([...seen].filter(([, n]) => n > 1)).toEqual([]);
  });

  test("sílabas: texto decompõe (NFD) nas partes declaradas", () => {
    const bad = syllables.filter((s) => {
      const nfd = s.text.normalize("NFD");
      const i = L.indexOf(nfd[0]!);
      return i < 0 || COMPAT_L[i] !== s.initial || nfd.length !== (s.final ? 3 : 2);
    });
    expect(bad.map((s) => s.id)).toEqual([]);
    expect(new Set(syllables.map((s) => s.text)).size).toBe(syllables.length);
    expect(new Set(words.map((w) => w.ko)).size).toBe(words.length);
  });

  test("gabaritos existem nas opções e opções não se repetem", () => {
    const problems: string[] = [];
    for (const { step, ex } of exercises) {
      const at = `${step}/${ex.id}`;
      const dup = (xs: readonly string[], what: string) => {
        if (new Set(xs).size !== xs.length) problems.push(`${at}: ${what} duplicado`);
      };
      switch (ex.type) {
        case "mcq":
          if (!ex.options.includes(ex.correctAnswer)) problems.push(`${at}: gabarito fora das opções`);
          dup(ex.options, "opções");
          break;
        case "audio-to-char":
          if (!ex.options.some((o) => o.id === ex.correctOptionId)) problems.push(`${at}: gabarito fora`);
          dup(ex.options.map((o) => o.id), "ids");
          dup(ex.options.map((o) => o.jamo), "glifos");
          break;
        case "char-to-audio":
          if (!ex.options.some((o) => o.id === ex.correctOptionId)) problems.push(`${at}: gabarito fora`);
          dup(ex.options.map((o) => o.id), "ids");
          dup(ex.options.map((o) => o.audioText), "audioText");
          dup(ex.options.map((o) => o.label), "rótulos");
          break;
        case "minimal-pair":
          if (!ex.options.some((o) => o.id === ex.correctOptionId)) problems.push(`${at}: gabarito fora`);
          dup(ex.options.map((o) => o.id), "ids");
          dup(ex.options.map((o) => o.label), "rótulos");
          break;
        case "reading":
          if (ex.mode === "mcq") {
            if (!ex.options?.some((o) => o.id === ex.correctOptionId)) problems.push(`${at}: gabarito fora`);
            dup((ex.options ?? []).map((o) => o.label), "rótulos");
          }
          break;
        default:
      }
    }
    expect(problems).toEqual([]);
  });

  test("áudio × texto: o som tocado é o que a resposta declara", () => {
    const problems: string[] = [];
    for (const { step, ex } of exercises) {
      const at = `${step}/${ex.id}`;
      if (ex.type === "audio-to-char") {
        const right = ex.options.find((o) => o.id === ex.correctOptionId)!;
        // Jamo solto não é pronunciável: o áudio é uma sílaba que contém o jamo.
        const parts = [...ex.audioText].map((c) => decomposeSyllable(c.normalize("NFC")));
        const hasJamo = ex.audioText.normalize("NFC") === right.jamo.normalize("NFC")
          || parts.some((p) => p && [p.initial, p.medial, p.final].includes(right.jamo as never));
        if (!hasJamo) problems.push(`${at}: audioText "${ex.audioText}" não contém o gabarito "${right.jamo}"`);
      }
      if (ex.type === "char-to-audio") {
        const right = ex.options.find((o) => o.id === ex.correctOptionId)!;
        if (right.audioText.normalize("NFC") !== ex.text.normalize("NFC")) {
          problems.push(`${at}: texto "${ex.text}" ≠ áudio correto "${right.audioText}"`);
        }
      }
      if (ex.type === "listen" && ex.audioText.normalize("NFC") !== ex.answer.normalize("NFC")
        && !(ex.acceptedAnswers ?? []).includes(ex.audioText)) {
        problems.push(`${at}: listen "${ex.audioText}" ≠ resposta "${ex.answer}"`);
      }
    }
    expect(problems).toEqual([]);
  });

  test("prerrequisitos e introduções respeitam a ordem do curso", () => {
    const flat = COURSE_OUTLINE.flatMap((u) => [...u.lessons.map((l) => l.id), ...(u.checkpoint ? [u.checkpoint] : [])]);
    expect(new Set(flat)).toEqual(new Set(steps.map((s) => s.id)));
    const order = new Map(flat.map((id, i) => [id, i]));
    const problems: string[] = [];
    for (const l of lessons) {
      for (const p of l.prerequisites) {
        if (!order.has(p)) problems.push(`${l.id}: pré-requisito inexistente ${p}`);
        else if (order.get(p)! >= order.get(l.id)!) problems.push(`${l.id}: pré-requisito ${p} não é anterior`);
      }
    }
    const lessonIdx = new Map(lessons.map((l, i) => [l.id, i]));
    for (const j of jamo) {
      if (!lessonIdx.has(j.introducedIn)) problems.push(`jamo ${j.symbol}: lição inexistente`);
      else if (!lessons[lessonIdx.get(j.introducedIn)!]!.newJamo.includes(j.symbol)) {
        problems.push(`jamo ${j.symbol}: não consta em newJamo de ${j.introducedIn}`);
      }
    }
    expect(problems).toEqual([]);
  });

  test("formas faladas das regras coincidem com as funções puras", () => {
    const problems: string[] = [];
    for (const rule of rules) {
      if (rule.kind === "batchim") continue;
      const apply = PRONUNCIATION_APPLIERS[rule.kind];
      for (const e of rule.examples) {
        const got = apply(e.written)?.spoken ?? e.written;
        if (got !== e.spoken) problems.push(`${rule.id}: ${e.written} → ${got}, conteúdo diz ${e.spoken}`);
      }
    }
    expect(problems).toEqual([]);
  });

  test("áudio: nenhum par de textos distintos compartilha o mesmo MP3", () => {
    const byHash = new Map<string, string[]>();
    for (const i of manifest.items) byHash.set(i.sha256, [...(byHash.get(i.sha256) ?? []), i.text]);
    expect([...byHash.values()].filter((t) => t.length > 1)).toEqual([]);
  });

  test("áudio: arquivos são MP3 reais (cabeçalho ID3/frame) e não vazios", () => {
    const bad = manifest.items.filter((i) => {
      const b = readFileSync(path.join(process.cwd(), "public", i.src));
      const id3 = b.subarray(0, 3).toString() === "ID3";
      const frame = b[0] === 0xff && (b[1]! & 0xe0) === 0xe0;
      return b.length < 500 || !(id3 || frame);
    });
    expect(bad.map((i) => i.text)).toEqual([]);
  });
});
