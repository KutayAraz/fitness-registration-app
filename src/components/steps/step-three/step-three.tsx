import { useState } from "react";
import styles from "./step-three.module.css";
import { FitnessGoal, StepThreeProps } from "./types";
import { StepWrapper } from "@/components/step-wrapper/step-wrapper";
import { RadioOption } from "./components/radio-option";

export const StepThree = ({ onNext, onBack }: StepThreeProps) => {
  const [selectedGoal, setSelectedGoal] = useState<FitnessGoal | null>(null);

  const fitnessGoals = [
    {
      value: "loseWeight",
      label: "Lose weight",
      icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none"></svg>,
    },
    {
      value: "buildMuscle",
      label: "Build muscle",
      icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none"></svg>,
    },
    {
      value: "stayHealthy",
      label: "Stay healthy",
      icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none"></svg>,
    },
  ] as const;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedGoal) {
      onNext({ fitnessGoal: selectedGoal });
    }
  };

  return (
    <StepWrapper
      title="What is your fitness goal?"
      onNext={handleSubmit}
      onBack={onBack}
      isValid={!!selectedGoal}
    >
      <div className={styles.goalsContainer}>
        {fitnessGoals.map((goal) => (
          <RadioOption
            key={goal.value}
            value={goal.value}
            label={goal.label}
            icon={goal.icon}
            selected={selectedGoal === goal.value}
            onChange={(value) => setSelectedGoal(value as FitnessGoal)}
            name="fitnessGoal"
          />
        ))}
      </div>
    </StepWrapper>
  );
};
