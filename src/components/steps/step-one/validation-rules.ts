import { ValidationRules } from "./types";

export const VALIDATION_RANGES = {
  height: { min: 0, max: 300 },
  weight: { min: 0, max: 500 },
} as const;

export const VALIDATION_RULES: ValidationRules = {
  height: {
    validate: (value: number) => {
      if (value === 0) return false;
      return value > VALIDATION_RANGES.height.min && value <= VALIDATION_RANGES.height.max;
    },
    errorKey: (value: number) => (value === 0 ? "validation.required" : "step1.height.error"),
  },
  weight: {
    validate: (value: number) => {
      if (value === 0) return false;
      return value > VALIDATION_RANGES.weight.min && value <= VALIDATION_RANGES.weight.max;
    },
    errorKey: (value: number) => (value === 0 ? "validation.required" : "step1.weight.error"),
  },
};
