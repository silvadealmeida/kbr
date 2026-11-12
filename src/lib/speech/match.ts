/**
 * Comparação conservadora entre o texto esperado e o que o reconhecedor
 * devolveu. Isto NÃO avalia pronúncia: só diz se o texto reconhecido coincide
 * com o esperado. Nunca "corrige" uma palavra errada em certa.
 *
 * Normalizações aplicadas (e mostradas ao aluno quando fazem diferença):
 * - forma Unicode NFC;
 * - remoção de espaços e pontuação (reconhecedores variam o espaçamento
 *   coreano, p. ex. "한국어를 공부해요" × "한국어를공부해요").
 * Nada além disso: não há equivalência entre jamo, vogais ou sílabas.
 */
export type TranscriptMatchKind = "exact" | "normalized" | "different";

export type TranscriptMatch = {
  kind: TranscriptMatchKind;
  /** Texto reconhecido que foi comparado (a hipótese que casou, ou a principal). */
  heard: string;
  /** Posição da hipótese que casou; 0 é a principal. -1 se nenhuma casou. */
  index: number;
};

const NON_CONTENT = /[\s\p{P}\p{S}]+/gu;

export function normalizeForComparison(text: string): string {
  return text.normalize("NFC").replace(NON_CONTENT, "");
}

function compareOne(expected: string, heard: string): TranscriptMatchKind {
  const a = expected.normalize("NFC").trim();
  const b = heard.normalize("NFC").trim();
  if (a === b) return "exact";
  const na = normalizeForComparison(a);
  return na.length > 0 && na === normalizeForComparison(b)
    ? "normalized"
    : "different";
}

/**
 * Compara o esperado com todas as hipóteses do reconhecedor, da principal para
 * as alternativas. Uma correspondência exata vence uma normalizada.
 */
export function matchTranscript(
  expected: string,
  hypotheses: readonly string[],
): TranscriptMatch {
  const list = hypotheses.filter((h) => h.trim().length > 0);
  const primary = list[0] ?? "";
  let normalized: TranscriptMatch | null = null;
  for (const [index, heard] of list.entries()) {
    const kind = compareOne(expected, heard);
    if (kind === "exact") return { kind, heard, index };
    if (kind === "normalized" && !normalized) normalized = { kind, heard, index };
  }
  return normalized ?? { kind: "different", heard: primary, index: -1 };
}
