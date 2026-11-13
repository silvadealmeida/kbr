import {
  assertAdvancedBlueprint,
  validateAdvancedBlueprint,
} from "../advanced/validate";
import type { C1BlueprintIssue, C1CurriculumBlueprint } from "./types";

export function validateC1Blueprint(
  blueprint: C1CurriculumBlueprint,
): C1BlueprintIssue[] {
  return validateAdvancedBlueprint(blueprint);
}

export function assertC1Blueprint(blueprint: C1CurriculumBlueprint): void {
  assertAdvancedBlueprint(blueprint);
}
