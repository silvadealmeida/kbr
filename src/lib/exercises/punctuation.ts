/**
 * Variantes explícitas para respostas digitadas. Apenas a pontuação final
 * (. ? !) é flexibilizada; pontuação interna e escolhas lexicais continuam
 * valendo. Não é uma normalização global do motor.
 */
export function terminalPunctuationVariants(answer: string): string[] {
  const trimmed = answer.trim();
  if (!/[.?!]$/.test(trimmed)) return [];
  return [trimmed.slice(0, -1)];
}

/** Comparação mínima para não duplicar variantes já declaradas. */
export function sameAnswerText(a: string, b: string): boolean {
  return a.normalize("NFC").trim().replace(/\s+/g, " ") ===
    b.normalize("NFC").trim().replace(/\s+/g, " ");
}
