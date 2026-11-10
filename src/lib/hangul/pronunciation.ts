import {
  composeSyllable,
  decomposeSyllable,
  isHangulText,
  type Final,
  type Initial,
  type SyllableParts,
} from "./index";

export type PronunciationRuleId = "liaison" | "nasalization" | "aspiration";

export type PronunciationResult = {
  rule: PronunciationRuleId;
  /** Texto como está escrito; a ortografia nunca muda. */
  written: string;
  /** Transcrição prática da fala, usando a grafia coreana. */
  spoken: string;
  /** Quantas fronteiras silábicas foram alteradas. */
  changes: number;
};

type SyllableToken = {
  text: string;
  parts: SyllableParts;
};

const LIAISON_SIMPLE_FINALS: readonly Final[] = [
  "ㄱ",
  "ㄲ",
  "ㄴ",
  "ㄷ",
  "ㄹ",
  "ㅁ",
  "ㅂ",
  "ㅅ",
  "ㅆ",
  "ㅈ",
  "ㅊ",
  "ㅋ",
  "ㅌ",
  "ㅍ",
];

/**
 * Finais duplos na ligação: a primeira parte fica na sílaba anterior e a
 * segunda se muda para a sílaba seguinte. `null` em `move` significa que a
 * segunda parte não é pronunciada (ㅎ de ㄶ/ㅀ).
 */
const LIAISON_DOUBLE_FINALS: Partial<
  Record<Final, { stay: Final; move: Initial | null }>
> = {
  ㄳ: { stay: "ㄱ", move: "ㅅ" },
  ㄵ: { stay: "ㄴ", move: "ㅈ" },
  ㄶ: { stay: "ㄴ", move: null },
  ㄺ: { stay: "ㄹ", move: "ㄱ" },
  ㄻ: { stay: "ㄹ", move: "ㅁ" },
  ㄼ: { stay: "ㄹ", move: "ㅂ" },
  ㄽ: { stay: "ㄹ", move: "ㅅ" },
  ㄾ: { stay: "ㄹ", move: "ㅌ" },
  ㄿ: { stay: "ㄹ", move: "ㅍ" },
  ㅀ: { stay: "ㄹ", move: null },
  ㅄ: { stay: "ㅂ", move: "ㅅ" },
};

const NASALIZATION_FINALS: Partial<Record<Final, Final>> = {
  ㄱ: "ㅇ",
  ㄲ: "ㅇ",
  ㅋ: "ㅇ",
  ㄷ: "ㄴ",
  ㅅ: "ㄴ",
  ㅆ: "ㄴ",
  ㅈ: "ㄴ",
  ㅊ: "ㄴ",
  ㅌ: "ㄴ",
  ㅎ: "ㄴ",
  ㅂ: "ㅁ",
  ㅍ: "ㅁ",
};

const ASPIRATION_FINALS: Partial<Record<Final, Initial>> = {
  ㄱ: "ㅋ",
  ㄷ: "ㅌ",
  ㅂ: "ㅍ",
  ㅈ: "ㅊ",
};

const ASPIRATION_INITIALS: Partial<Record<Initial, Initial>> = {
  ㄱ: "ㅋ",
  ㄷ: "ㅌ",
  ㅂ: "ㅍ",
  ㅈ: "ㅊ",
};

function tokenize(text: string): SyllableToken[] | null {
  if (!isHangulText(text) || text.includes(" ")) return null;
  const tokens: SyllableToken[] = [];
  for (const char of text) {
    const parts = decomposeSyllable(char);
    if (!parts) return null;
    tokens.push({ text: char, parts });
  }
  return tokens;
}

function render(tokens: readonly SyllableToken[]): string {
  return tokens.map((token) => token.text).join("");
}

/**
 * Ligação (연음): um batchim seguido de sílaba com ㅇ inicial passa para essa
 * sílaba. Cobre finais simples e os 11 duplos, menos os casos em que o ㅎ cai.
 * `강아지` não muda (ㅇ final não se move) e `한국말` não muda (não há ligação
 * antes de consoante): nesses casos retorna `null`.
 */
export function applyLiaison(text: string): PronunciationResult | null {
  const tokens = tokenize(text);
  if (!tokens) return null;

  let changes = 0;
  for (let index = 0; index < tokens.length - 1; index += 1) {
    const current = tokens[index]!;
    const next = tokens[index + 1]!;
    if (!current.parts.final || next.parts.initial !== "ㅇ") continue;

    let stay: Final = "";
    let move: Initial | null = null;

    if (current.parts.final === "ㅎ") {
      stay = "";
      move = null;
    } else if (LIAISON_SIMPLE_FINALS.includes(current.parts.final)) {
      stay = "";
      move = current.parts.final as Initial;
    } else {
      const split = LIAISON_DOUBLE_FINALS[current.parts.final];
      if (!split) continue;
      stay = split.stay;
      move = split.move;
    }

    tokens[index] = {
      ...current,
      text: composeSyllable(current.parts.initial, current.parts.medial, stay),
    };
    tokens[index + 1] = {
      ...next,
      text: composeSyllable(
        move ?? next.parts.initial,
        next.parts.medial,
        next.parts.final,
      ),
    };
    changes += 1;
  }

  if (changes === 0) return null;
  return { rule: "liaison", written: text, spoken: render(tokens), changes };
}

/**
 * Nasalização: ㄱ/ㄷ/ㅂ (e as famílias oclusivas) assimilam para ㅇ/ㄴ/ㅁ
 * diante de ㄴ ou ㅁ. Só cobre esses finais representativos e os duplos que
 * seguem a mesma família; não nasaliza antes de vogal (`입이` retorna `null`).
 */
export function applyNasalization(text: string): PronunciationResult | null {
  const tokens = tokenize(text);
  if (!tokens) return null;

  let changes = 0;
  for (let index = 0; index < tokens.length - 1; index += 1) {
    const current = tokens[index]!;
    const next = tokens[index + 1]!;
    if (!["ㄴ", "ㅁ"].includes(next.parts.initial)) continue;

    const nasal = NASALIZATION_FINALS[current.parts.final];
    if (!nasal) continue;

    tokens[index] = {
      ...current,
      text: composeSyllable(current.parts.initial, current.parts.medial, nasal),
    };
    changes += 1;
  }

  if (changes === 0) return null;
  return { rule: "nasalization", written: text, spoken: render(tokens), changes };
}

/**
 * Aspiração: ㄱ/ㄷ/ㅂ/ㅈ + ㅎ (em qualquer ordem na fronteira) resultam em
 * ㅋ/ㅌ/ㅍ/ㅊ. A escrita não muda. Casos de ㅎ enfraquecido após ㄴ/ㅁ/ㅇ,
 * como `전화`, ficam fora do escopo e retornam `null`.
 */
export function applyAspiration(text: string): PronunciationResult | null {
  const tokens = tokenize(text);
  if (!tokens) return null;

  let changes = 0;
  for (let index = 0; index < tokens.length - 1; index += 1) {
    const current = tokens[index]!;
    const next = tokens[index + 1]!;
    const final = current.parts.final;
    const initial = next.parts.initial;

    let nextInitial: Initial | undefined;
    if (ASPIRATION_FINALS[final] && initial === "ㅎ") {
      nextInitial = ASPIRATION_FINALS[final];
    } else if (final === "ㅎ" && ASPIRATION_INITIALS[initial]) {
      nextInitial = ASPIRATION_INITIALS[initial];
    }
    if (!nextInitial) continue;

    tokens[index] = {
      ...current,
      text: composeSyllable(current.parts.initial, current.parts.medial, ""),
    };
    tokens[index + 1] = {
      ...next,
      text: composeSyllable(nextInitial, next.parts.medial, next.parts.final),
    };
    changes += 1;
  }

  if (changes === 0) return null;
  return { rule: "aspiration", written: text, spoken: render(tokens), changes };
}

export const PRONUNCIATION_APPLIERS = {
  liaison: applyLiaison,
  nasalization: applyNasalization,
  aspiration: applyAspiration,
} as const satisfies Record<PronunciationRuleId, (text: string) => PronunciationResult | null>;
