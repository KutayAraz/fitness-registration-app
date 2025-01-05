import { StepData } from "@/types/step-data";

export type FieldErrors = Record<keyof StepOneData, string>;

export interface StepOneData extends StepData {
  height: number;
  weight: number;
}

export interface StepOneProps {
  onNext: (data: StepOneData) => void;
  onBack: () => void;
}

export interface ValidationRule {
  validate: (value: number) => boolean;
  errorKey: (value: number) => string;
}

export type ValidationRules = Record<keyof StepOneData, ValidationRule>;
