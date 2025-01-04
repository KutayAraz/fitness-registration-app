import { StepOneData } from "./types";

// Validation constants
export const VALIDATION_RULES: Record<
  keyof StepOneData,
  { min: number; max: number; getMessage: (value: number) => string }
> = {
  height: {
    min: 0,
    max: 300,
    getMessage: (value: number) =>
      value === 0 ? t("validation.required") : t("step1.height.error", { min: 0, max: 300 }),
  },
  weight: {
    min: 0,
    max: 500,
    getMessage: (value: number) =>
      value === 0 ? t("validation.required") : t("step1.weight.error", { min: 0, max: 500 }),
  },
} as const;
