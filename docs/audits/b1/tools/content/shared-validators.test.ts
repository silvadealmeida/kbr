import { writeFileSync } from "node:fs";
import { expect, test } from "vitest";

import { B1_IMPLEMENTED_CHECKPOINTS, B1_IMPLEMENTED_LESSONS, validateB1Content } from "@/content/curriculum/b1";
import { validateExerciseSpec } from "@/content/curriculum/validate-exercises";
import { findUnusedReusedRefs } from "@/content/curriculum/validate-reuse";
import { VOCAB_ENTRIES } from "@/content/vocabulary";

/**
 * Ferramenta de auditoria 12B: aplica os validadores compartilhados da Fase
 * 12A (`validateExerciseSpec`, incluindo a checagem `checkRedundantAccepted`
 * que o B1 hoje desliga em produção) e `findUnusedReusedRefs` aos datasets
 * B1. Read-only: grava o resultado em `docs/audits/b1/data/
 * shared-validators.json` e não altera nenhum dado.
 */
test("validadores compartilhados da 12A sobre o B1", () => {
  const all = [...B1_IMPLEMENTED_LESSONS, ...B1_IMPLEMENTED_CHECKPOINTS];
  const issues = [];
  let items = 0;
  for (const step of all) {
    for (const ex of step.exercises) {
      items += 1;
      for (const issue of validateExerciseSpec(ex, `${step.id}/${ex.id}`, { checkRedundantAccepted: true }))
        issues.push({ ...issue, item: ex.id, step: step.id });
    }
  }

  const unusedReused = findUnusedReusedRefs(B1_IMPLEMENTED_LESSONS, VOCAB_ENTRIES);

  const byCode: Record<string, number> = {};
  for (const i of issues) byCode[i.code] = (byCode[i.code] || 0) + 1;

  writeFileSync(
    "docs/audits/b1/data/shared-validators.json",
    JSON.stringify(
      {
        itemsChecked: items,
        withCheckRedundantAccepted: byCode,
        issues,
        unusedReusedRefs: {
          totalReusedRefs: B1_IMPLEMENTED_LESSONS.reduce((n, l) => n + l.vocabulary.reusedIds.length, 0),
          missing: unusedReused.length,
          rows: unusedReused,
        },
      },
      null,
      2,
    ),
  );

  // prova de presença: o validador estrutural da 12A roda no B1 e passa
  expect(validateB1Content()).toEqual([]);
  expect(items).toBe(615);
});
