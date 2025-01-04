import { StepData } from "@/types/step-data";

export interface StepTwoData extends StepData {
  selectedDays: string[];
}

export interface StepTwoProps {
  onNext: (data: StepTwoData) => void;
  onBack: () => void;
  availableDays: string[];
}
