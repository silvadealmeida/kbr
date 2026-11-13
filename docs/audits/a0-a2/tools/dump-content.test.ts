import { writeFileSync } from "node:fs";
import { test } from "vitest";

import { HANGUL_CURRICULUM } from "@/content/hangul";
import { A1_CURRICULUM, A1_IMPLEMENTED_CHECKPOINTS, A1_IMPLEMENTED_LESSONS } from "@/content/curriculum/a1";
import { A2_CURRICULUM, A2_IMPLEMENTED_CHECKPOINTS, A2_IMPLEMENTED_LESSONS } from "@/content/curriculum/a2";
import { VOCAB_ENTRIES, VOCAB_SENTENCES } from "@/content/vocabulary";

/**
 * Ferramenta de auditoria (PASS A): serializa todo o conteúdo A0/A1/A2 em
 * `docs/audits/a0-a2/data/content-dump.json` para análise programática.
 * Não altera conteúdo nem comportamento do app.
 */
test("auditoria: dump de conteúdo A0/A1/A2", () => {
  writeFileSync(
    "docs/audits/a0-a2/data/content-dump.json",
    JSON.stringify({
      hangul: HANGUL_CURRICULUM,
      a1Blueprint: A1_CURRICULUM,
      a1Lessons: A1_IMPLEMENTED_LESSONS,
      a1Checkpoints: A1_IMPLEMENTED_CHECKPOINTS,
      a2Blueprint: A2_CURRICULUM,
      a2Lessons: A2_IMPLEMENTED_LESSONS,
      a2Checkpoints: A2_IMPLEMENTED_CHECKPOINTS,
      vocab: VOCAB_ENTRIES,
      sentences: VOCAB_SENTENCES,
    }),
  );
});
