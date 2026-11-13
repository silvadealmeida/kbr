import type { ReviewMeta } from "@/content/hangul/types";
import type { VocabPos } from "./types";

export const C2_REVIEW: ReviewMeta = {
  status: "in-review",
  notes:
    "Conteúdo original do KBR para o curso C2; forma, tradução, naturalidade e registro aguardam revisão de falante nativo.",
};

export type C2VocabRow = readonly [
  lesson: string,
  ko: string,
  pt: string,
  pos: VocabPos,
  target: string,
  koSentence: string,
  ptSentence: string,
  contextMeaning: string,
  notes?: string,
];
