/**
 * Embaralhamento de alternativas para apresentação.
 *
 * A ordem é um detalhe de apresentação: a correção continua comparando IDs ou
 * valores, nunca a posição. O Fisher–Yates abaixo percorre o array de trás para
 * frente e troca cada item com um índice aleatório entre 0 e o índice atual,
 * que é a versão uniforme do algoritmo.
 *
 * `random` existe para testes com fonte controlada. Em produção, os componentes
 * chamam `shuffle(items)` e usam `Math.random` por tentativa — nunca uma semente
 * fixa.
 */
export type RandomSource = () => number;

export function shuffle<T>(items: readonly T[], random: RandomSource = Math.random): T[] {
  const result = [...items];

  for (let index = result.length - 1; index > 0; index -= 1) {
    const value = random();
    if (!(value >= 0 && value < 1)) {
      throw new RangeError("A fonte aleatória deve retornar um número em [0, 1).");
    }
    const swapIndex = Math.floor(value * (index + 1));
    const current = result[index]!;
    result[index] = result[swapIndex]!;
    result[swapIndex] = current;
  }

  return result;
}
