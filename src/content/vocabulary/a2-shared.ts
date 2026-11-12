import type { ReviewMeta } from "@/content/hangul/types";
import type { VocabPos } from "./types";

export const A2_REVIEW: ReviewMeta = {
  status: "in-review",
  notes:
    "Conteúdo original do KBR para o curso A2; forma, tradução, naturalidade e registro aguardam revisão de falante nativo.",
};

/**
 * Linha compacta do vocabulário A2: lição, forma, glosa, classe, alvo na frase,
 * frase original, tradução e dica de sentido.
 */
export type A2VocabRow = readonly [
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
