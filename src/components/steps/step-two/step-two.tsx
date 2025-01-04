import { useState } from "react";
import { StepWrapper } from "@/components/step-wrapper/step-wrapper";
import { DayKey, StepTwoData, StepTwoProps } from "./types";
import { DaySelect } from "./day-select/day-select";
import styles from "./step-two.module.css";
import { useStepForm } from "@/hooks/use-step-form";
import { useTranslation } from "react-i18next";

export const StepTwo = ({ onNext, onBack, availableDays }: StepTwoProps) => {
  const { t } = useTranslation();

  const [formData, setFormData] = useState<StepTwoData>({
    selectedDays: [],
  });

  const { isSubmitting, handleSubmit } = useStepForm<StepTwoData>({
    onNext,
    validateData: (data) => data.selectedDays.length > 0,
  });

  const allDays: DayKey[] = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
  ];

  const handleDayToggle = (day: DayKey) => {
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
      title="step2.title"
      onNext={handleFormSubmit}
      onBack={onBack}
      isValid={formData.selectedDays.length > 0}
      isSubmitting={isSubmitting}
    >
      <div className={styles.selectContainer}>
        {allDays.map((day) => (
          <DaySelect
            key={day}
            day={t(`step2.days.${day}`)}
            selected={formData.selectedDays.includes(day)}
            onClick={() => handleDayToggle(day)}
            disabled={!availableDays.includes(day)}
          />
        ))}
      </div>
    </StepWrapper>
  );
};
