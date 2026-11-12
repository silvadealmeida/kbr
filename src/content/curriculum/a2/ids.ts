/** IDs leves do A2 para clientes e registro, sem carregar os datasets. */
export const A2_LESSON_IDS: ReadonlySet<string> = new Set(
  Array.from({ length: 40 }, (_, index) => `a2-l${String(index + 1).padStart(2, "0")}`),
);

export const A2_CHECKPOINT_IDS: ReadonlySet<string> = new Set(
  Array.from({ length: 8 }, (_, index) => `a2-c${String(index + 1).padStart(2, "0")}`),
);

export const A2_STEP_IDS: ReadonlySet<string> = new Set([
  ...A2_LESSON_IDS,
  ...A2_CHECKPOINT_IDS,
]);
