import { useState } from "react";
import styles from "./step-one.module.css";
import { StepWrapper } from "@/components/step-wrapper/step-wrapper";
import { StepOneData, StepOneProps } from "./types";
import { useStepForm } from "@/hooks/use-step-form";
import { InputWithUnit } from "@/components/ui/input-with-unit/input-with-unit";
import { useTranslation } from "react-i18next";

export const StepOne = ({ onNext, onBack }: StepOneProps) => {
  const { t, i18n } = useTranslation();
  const [formData, setFormData] = useState<StepOneData>({
    height: 0,
    weight: 0,
  });
  const [errors, setErrors] = useState({
    height: "",
    weight: "",
  });

  // Helper function to determine unit position based on language direction
  const getUnitPosition = () => {
    // Arabic and other RTL languages should have units on the left
    return i18n.dir() === "rtl" ? "left" : "right";
  };

  const validateData = (data: StepOneData): boolean => {
    const heightValid =
      data.height > VALIDATION_RULES.height.min && data.height <= VALIDATION_RULES.height.max;
    const weightValid =
      data.weight > VALIDATION_RULES.weight.min && data.weight <= VALIDATION_RULES.weight.max;
    return heightValid && weightValid && !errors.height && !errors.weight;
  };

  const { isSubmitting, handleSubmit } = useStepForm<StepOneData>({
    onNext,
    validateData,
  });

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSubmit(formData);
  };

  // Validation constants
  const VALIDATION_RULES: Record<
    keyof StepOneData,
    { min: number; max: number; getMessage: (value: number) => string }
  > = {
    height: {
      min: 0,
      max: 300,
      getMessage: (value: number) =>
        value === 0 ? t("validation.required") : t("step1.height.error", { min: 0, max: 300 }),
    },
    weight: {
      min: 0,
      max: 500,
      getMessage: (value: number) =>
        value === 0 ? t("validation.required") : t("step1.weight.error", { min: 0, max: 500 }),
    },
  } as const;

  const validateField = (name: keyof StepOneData, value: number): string => {
    const rules = VALIDATION_RULES[name];
    if (isNaN(value) || value <= rules.min || value > rules.max) {
      return rules.getMessage(value);
    }
    return "";
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const numValue = parseFloat(value);

    setFormData((prev) => ({
      ...prev,
      [name]: value === "" ? 0 : numValue,
    }));

    const error = validateField(name as keyof StepOneData, numValue);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const isValid = () => {
    return formData.height > 0 && formData.weight > 0 && !errors.height && !errors.weight;
  };

  return (
    <StepWrapper
      title={"step1.title"}
      onNext={handleFormSubmit}
      onBack={onBack}
      isFirstStep={true}
      isValid={isValid()}
      isSubmitting={isSubmitting}
    >
      <div className={styles.inputContainer}>
        <InputWithUnit
          label={t("step1.height.label")}
          type="number"
          id="height"
          name="height"
          value={formData.height || ""}
          onChange={handleInputChange}
          placeholder={t("step1.height.placeholder")}
          error={errors.height}
          min={VALIDATION_RULES.height.min}
          max={VALIDATION_RULES.height.max}
          unit={t("units.cm")}
          unitPosition={getUnitPosition()}
          required
        />

        <InputWithUnit
          label={t("step1.weight.label")}
          type="number"
          id="weight"
          name="weight"
          value={formData.weight || ""}
          onChange={handleInputChange}
          placeholder={t("step1.weight.placeholder")}
          error={errors.weight}
          min={VALIDATION_RULES.weight.min}
          max={VALIDATION_RULES.weight.max}
          unit={t("units.kg")}
          unitPosition={getUnitPosition()}
          required
        />
      </div>
    </StepWrapper>
  );
};
