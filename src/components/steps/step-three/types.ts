import { StepData } from "@/types/step-data";

export type FitnessGoal = "loseWeight" | "buildMuscle" | "stayHealthy";

export interface StepThreeData extends StepData {
  fitnessGoal: FitnessGoal;
}

export interface StepThreeProps {
  onNext: (data: StepThreeData) => void;
  onBack: () => void;
}
