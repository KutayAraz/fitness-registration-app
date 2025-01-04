import { useState } from "react";
import styles from "./step-three.module.css";
import { FitnessGoal, StepThreeProps } from "./types";
import { StepWrapper } from "@/components/step-wrapper/step-wrapper";
import { RadioOption } from "./components/radio-option";
import FireIcon from "@/assets/svgs/fire.svg?react";
import RankIcon from "@/assets/svgs/rank.svg?react";
import SmileyFaceIcon from "@/assets/svgs/smiley-face.svg?react";

export const StepThree = ({ onNext, onBack }: StepThreeProps) => {
  const [selectedGoal, setSelectedGoal] = useState<FitnessGoal | null>(null);

  const fitnessGoals = [
    {
      value: "loseWeight",
      label: "Lose weight",
      icon: <FireIcon width={16} height={16} />,
    },
    {
      value: "buildMuscle",
      label: "Build muscle",
      icon: <RankIcon width={16} height={16} />,
    },
    {
      value: "stayHealthy",
      label: "Stay healthy",
      icon: <SmileyFaceIcon width={16} height={16} />,
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
