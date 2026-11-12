import { getVocab, sentencesFor, type VocabEntry, type VocabSentence } from "@/content/vocabulary";
import type { Progress } from "@/lib/storage";
import { savedCard, vocabCardKey } from "./state";
import { VOCAB_CARD_PREFIX } from "@/lib/srs";

export const MAX_VOCAB_SESSION = 10;

export type VocabQueueItem = {
  vocabId: string;
  entry: VocabEntry;
  /** Presente no modo contextual. */
  sentence?: VocabSentence;
  mode: "context" | "flashcard";
  box: number;
  due: string;
};

export type VocabQueue = { totalDue: number; session: readonly VocabQueueItem[] };

/**
 * Sessão diária: cartões salvos e vencidos, do mais atrasado ao mais recente
 * (empate pela chave). Itens com frase usam a prática contextual; os demais, o
 * cartão simples. Um item aparece no máximo uma vez por sessão. Retomar uma
 * sessão interrompida é reconstruir a fila: o que já foi respondido foi
 * reagendado e saiu dela.
 */
export function buildVocabQueue(
  progress: Progress,
  now: Date,
  options: { limit?: number; flashcardsOnly?: boolean } = {},
): VocabQueue {
  const due: VocabQueueItem[] = [];
  for (const key of Object.keys(progress.cards)) {
    if (!key.startsWith(VOCAB_CARD_PREFIX)) continue;
    const entry = getVocab(key.slice(VOCAB_CARD_PREFIX.length));
    const card = entry && savedCard(progress, entry.id);
    if (!entry || !card || Date.parse(card.due) > now.getTime()) continue;
    const sentences = options.flashcardsOnly ? [] : sentencesFor(entry.id);
    const sentence = sentences[card.box % Math.max(sentences.length, 1)];
    due.push({
      vocabId: entry.id,
      entry,
      ...(sentence ? { sentence } : {}),
      mode: sentence ? "context" : "flashcard",
      box: card.box,
      due: card.due,
    });
  }
  due.sort((a, b) => Date.parse(a.due) - Date.parse(b.due) || (a.vocabId < b.vocabId ? -1 : 1));
  return { totalDue: due.length, session: due.slice(0, options.limit ?? MAX_VOCAB_SESSION) };
}

export { vocabCardKey };
