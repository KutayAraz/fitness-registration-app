import { ValidationRules } from "./types";

export const VALIDATION_RULES: ValidationRules = {
  firstName: {
    validate: (value: string) => value.trim().length > 0,
    errorKey: "validation.required",
  },
  lastName: {
    validate: (value: string) => value.trim().length > 0,
    errorKey: "validation.required",
  },
  email: {
    validate: (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
    errorKey: "validation.email",
  },
  password: {
    validate: (value: string) => value.length >= 8,
    errorKey: "validation.password",
  },
};
