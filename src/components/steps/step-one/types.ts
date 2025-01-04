export interface StepData {
  [key: string]: unknown;
}
export type FieldErrors = Record<keyof StepOneData, string>;

export interface StepOneData extends StepData {
  height: number;
  weight: number;
}

export interface StepOneProps {
  onNext: (data: StepOneData) => void;
  onBack: () => void;
}
