import { useState } from "react";
import { StepWrapper } from "@/components/step-wrapper/step-wrapper";
import { StepTwoProps } from "./types";
import { DaySelect } from "./day-select/day-select";
import styles from "./step-two.module.css";

export const StepTwo = ({ onNext, onBack, availableDays }: StepTwoProps) => {
  const [selectedDays, setSelectedDays] = useState<string[]>([]);

  const allDays: string[] = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const handleDayToggle = (day: string) => {
    setSelectedDays((prev) => {
      if (prev.includes(day)) {
        return prev.filter((d) => d !== day);
      } else {
        return [...prev, day];
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    onNext({ workoutDays: selectedDays });
  };

  const isValid = () => selectedDays.length > 0;

  return (
    <StepWrapper
      title="Pick your workout days"
      onNext={handleSubmit}
      onBack={onBack}
      isValid={isValid()}
    >
      <div className={styles.selectContainer}>
        {allDays.map((day) => (
          <DaySelect
            key={day}
            day={day}
            selected={selectedDays.includes(day)}
            onClick={() => handleDayToggle(day)}
            disabled={!availableDays.includes(day)}
          />
        ))}
      </div>
    </StepWrapper>
  );
};
