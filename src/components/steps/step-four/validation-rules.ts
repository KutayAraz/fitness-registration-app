import { ValidationRules } from "./types";

export const VALIDATION_RULES: ValidationRules = {
  firstName: {
    validate: (value: string) => value.trim().length > 0,
    errorMessage: "First name is required",
  },
  lastName: {
    validate: (value: string) => value.trim().length > 0,
    errorMessage: "Last name is required",
  },
  email: {
    validate: (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
    errorMessage: "Please enter a valid email address",
  },
  password: {
    validate: (value: string) => value.length >= 8,
    errorMessage: "Password must be at least 8 characters long",
  },
};
