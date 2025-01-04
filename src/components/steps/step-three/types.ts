export type FitnessGoal = "loseWeight" | "buildMuscle" | "stayHealthy";

export interface StepThreeData {
  fitnessGoal: FitnessGoal;
}

export interface StepThreeProps {
  onNext: (data: StepThreeData) => void;
  onBack: () => void;
}
