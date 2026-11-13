/** IDs leves do C1 para clientes e registro, sem carregar os datasets. */
export const C1_LESSON_IDS: ReadonlySet<string> = new Set(
  Array.from({ length: 40 }, (_, index) => `c1-l${String(index + 1).padStart(2, "0")}`),
);

export const C1_CHECKPOINT_IDS: ReadonlySet<string> = new Set(
  Array.from({ length: 8 }, (_, index) => `c1-c${String(index + 1).padStart(2, "0")}`),
);

export const C1_STEP_IDS: ReadonlySet<string> = new Set([
  ...C1_LESSON_IDS,
  ...C1_CHECKPOINT_IDS,
]);
