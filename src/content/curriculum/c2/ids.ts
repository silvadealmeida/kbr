/** IDs leves do C2 para clientes e registro, sem carregar os datasets. */
export const C2_LESSON_IDS: ReadonlySet<string> = new Set(
  Array.from({ length: 40 }, (_, index) => `c2-l${String(index + 1).padStart(2, "0")}`),
);

export const C2_CHECKPOINT_IDS: ReadonlySet<string> = new Set(
  Array.from({ length: 8 }, (_, index) => `c2-c${String(index + 1).padStart(2, "0")}`),
);

export const C2_STEP_IDS: ReadonlySet<string> = new Set([
  ...C2_LESSON_IDS,
  ...C2_CHECKPOINT_IDS,
]);
