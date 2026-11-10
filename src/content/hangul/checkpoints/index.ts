import { C1 } from "./c1";
import { C2 } from "./c2";
import { C3 } from "./c3";
import { C4 } from "./c4";
import type { Checkpoint } from "../types";

/** Checkpoints com conteúdo implementado, em ordem curricular. */
export const CHECKPOINTS: readonly Checkpoint[] = [C1, C2, C3, C4];

export const IMPLEMENTED_CHECKPOINT_IDS = new Set(CHECKPOINTS.map((checkpoint) => checkpoint.id));

export function getCheckpoint(id: string): Checkpoint | undefined {
  return CHECKPOINTS.find((checkpoint) => checkpoint.id === id);
}
