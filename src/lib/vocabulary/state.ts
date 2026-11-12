import { getVocab, VOCAB_ENTRIES, type VocabEntry } from "@/content/vocabulary";
import { leitner, VOCAB_CARD_PREFIX, type LeitnerBox, type SrsState } from "@/lib/srs";
import type { Progress } from "@/lib/storage";

/**
 * Marca de remoção. O merge do `Progress` v1 é uma união de cartões por chave,
 * então apagar a chave ressuscitaria o item vindo de outro aparelho. Um cartão
 * "removido" é um cartão normal com `due` impossível; vence o `reviewedAt` mais
 * recente, e salvar de novo depois da remoção vence a marca.
 */
export const REMOVED_DUE = "9999-12-31T00:00:00.000Z";
/** Caixa a partir da qual a palavra é considerada consolidada (3 acertos seguidos, ≥ 8 dias). */
export const CONSOLIDATED_BOX = 4;

export type VocabOutcome = "correct" | "assisted" | "again";
export type VocabStatus = "available" | "encountered" | "learning" | "consolidated";

export const vocabCardKey = (vocabId: string) => `${VOCAB_CARD_PREFIX}${vocabId}`;

export function savedCard(progress: Progress, vocabId: string): SrsState | null {
  const card = progress.cards[vocabCardKey(vocabId)];
  return card && card.due !== REMOVED_DUE ? card : null;
}

export const isSaved = (progress: Progress, vocabId: string) => savedCard(progress, vocabId) !== null;

function put(progress: Progress, vocabId: string, card: SrsState, now: Date): Progress {
  return {
    ...progress,
    cards: { ...progress.cards, [vocabCardKey(vocabId)]: card },
    lastActive: now.toISOString(),
  };
}

/** Salva o item e o agenda para revisão imediata (caixa 1). Idempotente. */
export function saveVocab(progress: Progress, vocabId: string, now: Date): Progress {
  if (!getVocab(vocabId) || isSaved(progress, vocabId)) return progress;
  const at = now.toISOString();
  return put(progress, vocabId, { box: 1, due: at, reviewedAt: at }, now);
}

export function saveMany(progress: Progress, vocabIds: readonly string[], now: Date): Progress {
  return vocabIds.reduce((current, id) => saveVocab(current, id, now), progress);
}

export function removeVocab(progress: Progress, vocabId: string, now: Date): Progress {
  if (!isSaved(progress, vocabId)) return progress;
  return put(progress, vocabId, { box: 1, due: REMOVED_DUE, reviewedAt: now.toISOString() }, now);
}

/**
 * Mapeia o resultado ao Leitner existente (sem algoritmo novo):
 * - `correct`: acerto sem ajuda → `leitner.review(…, "correct")`, avança.
 * - `assisted`: acerto com tradução/pista antes → fica na mesma caixa
 *   (reagenda o mesmo intervalo); ajuda não conta como recordação plena.
 * - `again`: erro → caixa 1.
 */
export function reviewVocab(progress: Progress, vocabId: string, outcome: VocabOutcome, now: Date): Progress {
  const current = savedCard(progress, vocabId);
  if (!current) return progress;
  const next =
    outcome === "again"
      ? leitner.review(current, "again", now)
      : outcome === "correct"
        ? leitner.review(current, "correct", now)
        : leitner.review(
            current.box > 1 ? { box: (current.box - 1) as LeitnerBox, due: current.due } : undefined,
            "correct",
            now,
          );
  return put(progress, vocabId, { ...next, reviewedAt: now.toISOString() }, now);
}

export function vocabStatus(progress: Progress, entry: VocabEntry): VocabStatus {
  const card = savedCard(progress, entry.id);
  if (card) return card.box >= CONSOLIDATED_BOX ? "consolidated" : "learning";
  return progress.lessons[entry.lesson]?.done ? "encountered" : "available";
}

export const VOCAB_STATUS_LABEL: Readonly<Record<VocabStatus, string>> = {
  available: "Disponível",
  encountered: "Encontrada",
  learning: "Em aprendizagem",
  consolidated: "Consolidada",
};

export function isDue(progress: Progress, vocabId: string, now: Date): boolean {
  const card = savedCard(progress, vocabId);
  return card !== null && Date.parse(card.due) <= now.getTime();
}

export type VocabSummary = { saved: number; due: number; learning: number; consolidated: number };

export function summarizeVocab(progress: Progress, now: Date): VocabSummary {
  const summary: VocabSummary = { saved: 0, due: 0, learning: 0, consolidated: 0 };
  for (const entry of VOCAB_ENTRIES) {
    const card = savedCard(progress, entry.id);
    if (!card) continue;
    summary.saved += 1;
    if (Date.parse(card.due) <= now.getTime()) summary.due += 1;
    summary[card.box >= CONSOLIDATED_BOX ? "consolidated" : "learning"] += 1;
  }
  return summary;
}
