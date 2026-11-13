import {
  assertAdvancedBlueprint,
  validateAdvancedBlueprint,
} from "../advanced/validate";
import type { C2BlueprintIssue, C2CurriculumBlueprint } from "./types";

export function validateC2Blueprint(
  blueprint: C2CurriculumBlueprint,
): C2BlueprintIssue[] {
  return validateAdvancedBlueprint(blueprint);
}

export function assertC2Blueprint(blueprint: C2CurriculumBlueprint): void {
  assertAdvancedBlueprint(blueprint);
}
