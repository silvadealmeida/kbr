import { writeFileSync } from "node:fs";
import { test } from "vitest";

import { A1_CURRICULUM, A1_IMPLEMENTED_CHECKPOINTS, A1_IMPLEMENTED_LESSONS } from "@/content/curriculum/a1";
import { A2_CURRICULUM, A2_IMPLEMENTED_CHECKPOINTS, A2_IMPLEMENTED_LESSONS } from "@/content/curriculum/a2";
import { B1_CURRICULUM, B1_IMPLEMENTED_CHECKPOINTS, B1_IMPLEMENTED_LESSONS } from "@/content/curriculum/b1";
import { VOCAB_ENTRIES, VOCAB_SENTENCES } from "@/content/vocabulary";

/**
 * Ferramenta de auditoria B1 (PASS A): serializa todo o conteúdo B1, mais o
 * contexto A1/A2 necessário para progressão, em
 * `docs/audits/b1/data/content-dump.json` para análise programática.
 * Não altera conteúdo nem comportamento do app.
 */
test("auditoria 12B: dump de conteúdo B1 (+A1/A2 para progressão)", () => {
  writeFileSync(
    "docs/audits/b1/data/content-dump.json",
    JSON.stringify({
      baseline: "6e5d38b (12B) · conteúdo pós-12D",
      b1Blueprint: B1_CURRICULUM,
      b1Lessons: B1_IMPLEMENTED_LESSONS,
      b1Checkpoints: B1_IMPLEMENTED_CHECKPOINTS,
      a2Blueprint: A2_CURRICULUM,
      a2Lessons: A2_IMPLEMENTED_LESSONS,
      a2Checkpoints: A2_IMPLEMENTED_CHECKPOINTS,
      a1Blueprint: A1_CURRICULUM,
      a1Lessons: A1_IMPLEMENTED_LESSONS,
      a1Checkpoints: A1_IMPLEMENTED_CHECKPOINTS,
      vocab: VOCAB_ENTRIES,
      sentences: VOCAB_SENTENCES,
    }),
  );
});
