export interface StepTwoData {
  workoutDays: string[];
}

export interface StepTwoProps {
  onNext: (data: StepTwoData) => void;
  onBack: () => void;
  availableDays: string[];
}
