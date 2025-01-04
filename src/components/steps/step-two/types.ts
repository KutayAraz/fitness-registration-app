import { StepData } from "@/types/step-data";

export type DayKey =
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday"
  | "sunday";

export interface StepTwoData extends StepData {
  selectedDays: DayKey[];
}

export interface StepTwoProps {
  onNext: (data: StepTwoData) => void;
  onBack: () => void;
  availableDays: DayKey[];
}
