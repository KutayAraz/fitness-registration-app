import { StepData } from "@/types/step-data";

export interface StepFourData extends StepData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface StepFourProps {
  onNext: (data: StepFourData) => void;
  onBack: () => void;
}

export interface ValidationRule {
  validate: (value: string) => boolean;
  errorMessage: string;
}

export type ValidationRules = Record<keyof StepFourData, ValidationRule>;
