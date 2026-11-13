import type { RuleRecord } from "./types";

const review = {
  status: "in-review",
  notes:
    "Regra de fronteira aguardando revisão de falante nativo/professor. A grafia não muda nesta fase; a transcrição falada é uma aproximação didática.",
} as const;

export const RULES: readonly RuleRecord[] = [
  {
    id: "rule:liaison",
    kind: "liaison",
    title: "Ligação (연음)",
    explanation:
      "Quando uma sílaba termina em batchim e a seguinte começa com ㅇ, o som final passa para o lugar do ㅇ. A escrita não muda. Em finais duplos, a segunda parte costuma se mudar; em ㅎ final, o ㅎ cai. O ㅇ final não se move.",
    introducedIn: "h21",
    examples: [
      { written: "한국어", spoken: "한구거", note: "ㄱ de 국 passa para 어." },
      { written: "음악", spoken: "으막", note: "ㅁ de 음 passa para 악." },
      { written: "밥을", spoken: "바블", note: "ㅂ passa para 을." },
      { written: "옷을", spoken: "오슬", note: "ㅅ passa para 을." },
      { written: "꽃이", spoken: "꼬치", note: "ㅊ passa para 이." },
      { written: "좋아요", spoken: "조아요", note: "O ㅎ final cai antes da vogal." },
      { written: "읽어요", spoken: "일거요", note: "Em ㄺ, o ㄹ fica e o ㄱ passa." },
      { written: "앉아요", spoken: "안자요", note: "Em ㄵ, o ㄴ fica e o ㅈ passa." },
      { written: "강아지", spoken: "강아지", note: "ㅇ final não se move." },
    ],
    review,
  },
  {
    id: "rule:nasalization",
    kind: "nasalization",
    title: "Nasalização",
    explanation:
      "Antes de ㄴ ou ㅁ, os finais oclusivos assimilam: ㄱ → ㅇ, ㄷ → ㄴ e ㅂ → ㅁ. A escrita permanece igual. Antes de vogal não há nasalização: a ligação de h21 vem primeiro.",
    introducedIn: "h22",
    examples: [
      { written: "한국말", spoken: "한궁말", note: "ㄱ diante de ㅁ → ㅇ." },
      { written: "입니다", spoken: "임니다", note: "ㅂ diante de ㄴ → ㅁ." },
      { written: "학년", spoken: "항년", note: "ㄱ diante de ㄴ → ㅇ." },
      { written: "국물", spoken: "궁물", note: "ㄱ diante de ㅁ → ㅇ." },
      { written: "십만", spoken: "심만", note: "ㅂ diante de ㅁ → ㅁ." },
      { written: "먹는다", spoken: "멍는다", note: "ㄱ diante de ㄴ → ㅇ." },
      { written: "잡는", spoken: "잠는", note: "ㅂ diante de ㄴ → ㅁ." },
      { written: "받는다", spoken: "반는다", note: "ㄷ diante de ㄴ → ㄴ." },
    ],
    review,
  },
  {
    id: "rule:aspiration",
    kind: "aspiration",
    title: "Aspiração",
    explanation:
      "Na fronteira, ㄱ/ㄷ/ㅂ/ㅈ + ㅎ fundem-se em ㅋ/ㅌ/ㅍ/ㅊ, com o ㅎ antes ou depois. O resultado é aspirado, não tenso. A escrita não muda. ㅎ enfraquecido depois de ㄴ/ㅁ/ㅇ (como 전화) é variação e fica fora desta avaliação.",
    introducedIn: "h23",
    examples: [
      { written: "좋다", spoken: "조타", note: "ㅎ + ㄷ → ㅌ." },
      { written: "축하", spoken: "추카", note: "ㄱ + ㅎ → ㅋ." },
      { written: "입학", spoken: "이팍", note: "ㅂ + ㅎ → ㅍ." },
      { written: "백화점", spoken: "배콰점", note: "ㄱ + ㅎ → ㅋ." },
      { written: "국화", spoken: "구콰", note: "ㄱ + ㅎ → ㅋ." },
      { written: "전화", spoken: "전화", note: "ㅎ após ㄴ: variação não avaliada nesta fase." },
    ],
    review,
  },
];
