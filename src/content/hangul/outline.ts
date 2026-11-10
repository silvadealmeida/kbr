import type { UnitOutline } from "./types";

/**
 * Metadados do curso completo para a navegação. Apenas `h01`–`h20` e os
 * checkpoints `c1`, `c2` e `c3` têm conteúdo implementado nesta fase; o restante
 * aparece como "em breve".
 */
export const COURSE_OUTLINE: readonly UnitOutline[] = [
  {
    unit: 1,
    title: "O alfabeto que se explicava",
    lessons: [{ id: "h01", title: "Um alfabeto desenhado a partir da boca" }],
  },
  {
    unit: 2,
    title: "Primeiras vogais",
    lessons: [
      { id: "h02", title: "ㅏ ㅓ ㅗ ㅜ e o ㅇ mudo" },
      { id: "h03", title: "ㅡ ㅣ e as seis vogais básicas" },
    ],
  },
  {
    unit: 3,
    title: "Consoantes básicas",
    lessons: [
      { id: "h04", title: "ㄱ e ㄴ" },
      { id: "h05", title: "ㄷ ㄹ ㅁ" },
      { id: "h06", title: "ㅂ ㅅ ㅈ" },
      { id: "h07", title: "ㅋ ㅌ ㅍ ㅊ" },
      { id: "h08", title: "ㅎ e revisão das 14 consoantes básicas" },
    ],
  },
  {
    unit: 4,
    title: "Consoantes tensas",
    lessons: [
      { id: "h09", title: "ㄲ ㄸ ㅃ" },
      { id: "h10", title: "ㅆ ㅉ e o contraste de três vias" },
    ],
    checkpoint: "c1",
  },
  {
    unit: 5,
    title: "Todas as vogais",
    lessons: [
      { id: "h11", title: "ㅑ ㅕ ㅛ ㅠ" },
      { id: "h12", title: "ㅐ ㅔ ㅒ ㅖ" },
      { id: "h13", title: "ㅘ ㅝ ㅟ" },
      { id: "h14", title: "ㅙ ㅞ ㅚ" },
      { id: "h15", title: "ㅢ e o inventário completo de vogais" },
    ],
    checkpoint: "c2",
  },
  {
    unit: 6,
    title: "Sílabas e batchim",
    lessons: [
      { id: "h16", title: "Montar e ler sílabas C+V" },
      { id: "h17", title: "Batchim ㅇ, ㄴ, ㅁ" },
      { id: "h18", title: "Batchim oclusivo e os sete sons representativos" },
      { id: "h19", title: "Batchim ㄹ" },
      { id: "h20", title: "Os 11 batchim duplos" },
    ],
    checkpoint: "c3",
  },
  {
    unit: 7,
    title: "Ler em contexto",
    lessons: [
      { id: "h21", title: "Ligação (연음)" },
      { id: "h22", title: "Nasalização" },
      { id: "h23", title: "Aspiração" },
      { id: "h24", title: "Oficina de leitura" },
      { id: "h25", title: "Consolidação e domínio" },
    ],
    checkpoint: "c4",
  },
];
