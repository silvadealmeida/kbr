import type { ReviewMeta } from "@/content/hangul/types";

export type VocabPos =
  | "substantivo"
  | "verbo"
  | "adjetivo"
  | "pronome"
  | "advérbio"
  | "interjeição"
  | "numeral";

/**
 * Item canônico de vocabulário. É dado de currículo: nada aqui guarda estado
 * de aluno (isso vive em `Progress.cards`, chave `v:<id>`).
 */
export type VocabEntry = {
  /**
   * Estável e único: `ko:<forma>` ou `ko:<forma>#<sentido>` para homógrafos
   * separados antes da publicação. Nunca muda depois de publicado.
   */
  id: string;
  ko: string;
  /** Glosa em português; sentidos separados por "; ". */
  pt: string;
  /** Slug semântico estável quando a mesma forma precisa de cartões distintos. */
  sense?: string;
  pos?: VocabPos;
  course: string;
  /** Lição/checkpoint onde o item é apresentado pela primeira vez. */
  lesson: string;
  /** Texto enviado ao TTS do navegador (nunca MP3). */
  audioText: string;
  notes?: string;
  /** Referência futura a uma ilustração; ainda sem uso. */
  illustration?: string;
  review: ReviewMeta;
};

/** Frase de contexto com uma palavra-alvo ocultável. */
export type VocabSentence = {
  id: string;
  vocabId: string;
  /** Frase completa. `target` ocorre exatamente uma vez, no início de uma palavra. */
  ko: string;
  /** Tradução natural da frase inteira. */
  pt: string;
  /**
   * Forma exata ocultada na frase. Em substantivos e expressões costuma ser a
   * própria forma de dicionário; em verbos e adjetivos pode ser a forma polida
   * usada no contexto. A identidade/cartão continua sendo `vocabId`.
   */
  target: string;
  /** Sentido da palavra nesta frase (a dica "Palavra esperada"). */
  contextMeaning: string;
  /** Variantes lexicais válidas e registradas; vazio por padrão. */
  accepted?: readonly string[];
  review: ReviewMeta;
};
