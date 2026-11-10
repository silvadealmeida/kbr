import type { ExerciseSpec } from "@/lib/exercises";
import { isHangulText, isInitial, isMedial } from "@/lib/hangul";
import { leitner } from "./leitner";
import type { SrsState } from "./index";
import type { Progress } from "@/lib/storage";

export type SrsCardRef =
  | { kind: "jamo-consonant"; value: string; key: string }
  | { kind: "jamo-vowel"; value: string; key: string }
  | { kind: "syllable"; value: string; key: string }
  | { kind: "word"; value: string; key: string }
  | { kind: "rule"; value: SrsRuleId; key: string };

export const SRS_RULE_IDS = ["liaison", "nasalization", "aspiration"] as const;
export type SrsRuleId = (typeof SRS_RULE_IDS)[number];

/** Chave estável de um jamo; o tipo (consoante/vogal) fica explícito na chave. */
export function jamoCardKey(symbol: string): string {
  if (isMedial(symbol)) return `h:jamo:v:${symbol}`;
  if (isInitial(symbol)) return `h:jamo:c:${symbol}`;
  throw new RangeError(`Jamo inválido para cartão SRS: ${symbol}`);
}

export function syllableCardKey(text: string): string {
  if (!isHangulText(text) || [...text].length !== 1) {
    throw new RangeError(`Sílaba inválida para cartão SRS: ${text}`);
  }
  return `h:syl:${text}`;
}

export function wordCardKey(ko: string): string {
  if (!isHangulText(ko) || ko.includes(" ")) {
    throw new RangeError(`Palavra inválida para cartão SRS: ${ko}`);
  }
  return `h:word:${ko}`;
}

/** Chave estável de uma regra de fronteira (ex.: `h:rule:liaison`). */
export function ruleCardKey(rule: SrsRuleId): string {
  if (!SRS_RULE_IDS.includes(rule)) {
    throw new RangeError(`Regra inválida para cartão SRS: ${rule}`);
  }
  return `h:rule:${rule}`;
}

/** Interpreta uma chave de cartão; retorna `null` para formato desconhecido. */
export function parseSrsCardKey(key: string): SrsCardRef | null {
  if (key.startsWith("h:jamo:c:")) {
    const value = key.slice("h:jamo:c:".length);
    return isInitial(value) ? { kind: "jamo-consonant", value, key } : null;
  }
  if (key.startsWith("h:jamo:v:")) {
    const value = key.slice("h:jamo:v:".length);
    return isMedial(value) ? { kind: "jamo-vowel", value, key } : null;
  }
  if (key.startsWith("h:syl:")) {
    const value = key.slice("h:syl:".length);
    return isHangulText(value) && [...value].length === 1
      ? { kind: "syllable", value, key }
      : null;
  }
  if (key.startsWith("h:word:")) {
    const value = key.slice("h:word:".length);
    return isHangulText(value) && !value.includes(" ")
      ? { kind: "word", value, key }
      : null;
  }
  if (key.startsWith("h:rule:")) {
    const value = key.slice("h:rule:".length);
    return SRS_RULE_IDS.includes(value as SrsRuleId)
      ? { kind: "rule", value: value as SrsRuleId, key }
      : null;
  }
  return null;
}

/**
 * Aplica o erro aos cartões do exercício. Um item errado entra na caixa 1,
 * como documentado no currículo. Chaves repetidas no mesmo item são ignoradas,
 * então refazer o item não cria cartões duplicados.
 */
export function scheduleMissedReview(
  progress: Progress,
  exercise: ExerciseSpec,
  now: Date,
): Progress {
  const keys = [...new Set(exercise.srsCards ?? [])];
  if (keys.length === 0) return progress;

  const reviewedAt = now.toISOString();
  const cards: Record<string, SrsState> = { ...progress.cards };
  for (const key of keys) {
    cards[key] = { ...leitner.review(cards[key], "again", now), reviewedAt };
  }

  return {
    ...progress,
    cards,
    lastActive: now.toISOString(),
  };
}
