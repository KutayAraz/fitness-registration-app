import { useState } from "react";
import styles from "./step-one.module.css";
import { StepWrapper } from "@/components/step-wrapper/step-wrapper";
import { StepOneData, StepOneProps } from "./types";
import { useStepForm } from "@/hooks/use-step-form";
import { InputWithUnit } from "@/components/ui/input-with-unit/input-with-unit";
import { useTranslation } from "react-i18next";
import { VALIDATION_RANGES, VALIDATION_RULES } from "./validation-rules";

/**
 * First step of registration form that collects user's physical measurements.
 * Handles height (cm) and weight (kg) inputs with RTL/LTR support and validation.
 */
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
    return Object.keys(data).every((key) => {
      const field = key as keyof StepOneData;
      return VALIDATION_RULES[field].validate(data[field] as number);
    });
  };

  const { isSubmitting, handleSubmit } = useStepForm<StepOneData>({
    onNext,
    validateData,
  });

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSubmit(formData);
  };

  // Validate individual field as user types
  const validateField = (name: keyof StepOneData, value: number): string => {
    const rule = VALIDATION_RULES[name];
    return !rule.validate(value) ? rule.errorKey(value) : "";
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
          min={VALIDATION_RANGES.height.min}
          max={VALIDATION_RANGES.height.max}
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
          min={VALIDATION_RANGES.weight.min}
          max={VALIDATION_RANGES.weight.max}
          unit={t("units.kg")}
          unitPosition={getUnitPosition()}
          required
        />
      </div>
    </StepWrapper>
  );
};
