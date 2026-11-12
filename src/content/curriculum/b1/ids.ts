/** IDs leves do B1 para clientes e registro, sem carregar os datasets. */
export const B1_LESSON_IDS: ReadonlySet<string> = new Set(
  Array.from({ length: 40 }, (_, index) => `b1-l${String(index + 1).padStart(2, "0")}`),
);

export const B1_CHECKPOINT_IDS: ReadonlySet<string> = new Set(
  Array.from({ length: 8 }, (_, index) => `b1-c${String(index + 1).padStart(2, "0")}`),
);

export const B1_STEP_IDS: ReadonlySet<string> = new Set([
  ...B1_LESSON_IDS,
  ...B1_CHECKPOINT_IDS,
]);
