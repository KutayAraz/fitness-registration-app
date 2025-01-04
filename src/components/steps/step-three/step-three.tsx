import { useState } from "react";
import styles from "./step-three.module.css";
import { FitnessGoal, StepThreeData, StepThreeProps } from "./types";
import { StepWrapper } from "@/components/step-wrapper/step-wrapper";
import { RadioOption } from "./components/radio-option";
import FireIcon from "@/assets/svgs/fire.svg?react";
import RankIcon from "@/assets/svgs/rank.svg?react";
import SmileyFaceIcon from "@/assets/svgs/smiley-face.svg?react";
import { useStepForm } from "@/hooks/use-step-form";

export const StepThree = ({ onNext, onBack }: StepThreeProps) => {
  const [formData, setFormData] = useState<StepThreeData>({
    fitnessGoal: null as unknown as FitnessGoal,
  });

  const { isSubmitting, handleSubmit } = useStepForm<StepThreeData>({
    onNext,
    validateData: (data) => !!data.fitnessGoal,
  });

  const fitnessGoals = [
    {
      value: "loseWeight" as const,
      label: "Lose weight",
      icon: <FireIcon width={16} height={16} />,
    },
    {
      value: "buildMuscle" as const,
      label: "Build muscle",
      icon: <RankIcon width={16} height={16} />,
    },
    {
      value: "stayHealthy" as const,
      label: "Stay healthy",
      icon: <SmileyFaceIcon width={16} height={16} />,
    },
  ];

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSubmit(formData);
  };

  const handleGoalChange = (value: FitnessGoal) => {
    setFormData({ fitnessGoal: value });
  };

  return (
    <StepWrapper
      title="What is your fitness goal?"
      onNext={handleFormSubmit}
      onBack={onBack}
      isValid={!!formData.fitnessGoal}
      isSubmitting={isSubmitting}
    >
      <div className={styles.goalsContainer}>
        {fitnessGoals.map((goal) => (
          <RadioOption
            key={goal.value}
            value={goal.value}
            label={goal.label}
            icon={goal.icon}
            selected={formData.fitnessGoal === goal.value}
            onChange={handleGoalChange}
            name="fitnessGoal"
          />
        ))}
      </div>
    </StepWrapper>
  );
};
