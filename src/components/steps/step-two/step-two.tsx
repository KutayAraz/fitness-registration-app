import { useState } from "react";
import { StepWrapper } from "@/components/step-wrapper/step-wrapper";
import { StepTwoData, StepTwoProps } from "./types";
import { DaySelect } from "./day-select/day-select";
import styles from "./step-two.module.css";
import { useStepForm } from "@/hooks/use-step-form";

export const StepTwo = ({ onNext, onBack, availableDays }: StepTwoProps) => {
  const [formData, setFormData] = useState<StepTwoData>({
    selectedDays: [],
  });

  const { isSubmitting, handleSubmit } = useStepForm<StepTwoData>({
    onNext,
    validateData: (data) => data.selectedDays.length > 0,
  });

  const allDays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ] as const;

  const handleDayToggle = (day: string) => {
    setFormData((prev) => ({
      selectedDays: prev.selectedDays.includes(day)
        ? prev.selectedDays.filter((d) => d !== day)
        : [...prev.selectedDays, day],
    }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSubmit(formData);
  };
  return (
    <StepWrapper
      title="Pick your workout days"
      onNext={handleFormSubmit}
      onBack={onBack}
      isValid={formData.selectedDays.length > 0}
      isSubmitting={isSubmitting}
    >
      <div className={styles.selectContainer}>
        {allDays.map((day) => (
          <DaySelect
            key={day}
            day={day}
            selected={formData.selectedDays.includes(day)}
            onClick={() => handleDayToggle(day)}
            disabled={!availableDays.includes(day)}
          />
        ))}
      </div>
    </StepWrapper>
  );
};
