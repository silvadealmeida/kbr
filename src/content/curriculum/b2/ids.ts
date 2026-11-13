/** IDs leves do B2 para clientes e registro, sem carregar os datasets. */
export const B2_LESSON_IDS: ReadonlySet<string> = new Set(
  Array.from({ length: 40 }, (_, index) => `b2-l${String(index + 1).padStart(2, "0")}`),
);

export const B2_CHECKPOINT_IDS: ReadonlySet<string> = new Set(
  Array.from({ length: 8 }, (_, index) => `b2-c${String(index + 1).padStart(2, "0")}`),
);

export const B2_STEP_IDS: ReadonlySet<string> = new Set([
  ...B2_LESSON_IDS,
  ...B2_CHECKPOINT_IDS,
]);
