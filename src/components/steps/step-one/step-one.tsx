import { useState } from "react";
import styles from "./step-one.module.css";
import { StepWrapper } from "@/components/step-wrapper/step-wrapper";
import { mockApi } from "@/utils/mock-api";
import { StepOneData, StepOneProps } from "./types";
import { Input } from "@/components/ui/input/input";

export const StepOne = ({ onNext, onBack }: StepOneProps) => {
  const [formData, setFormData] = useState<StepOneData>({
    height: 0,
    weight: 0,
  });
  const [errors, setErrors] = useState({
    height: "",
    weight: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Validation constants
  const VALIDATION_RULES: Record<
    keyof StepOneData,
    { min: number; max: number; errorMessage: string }
  > = {
    height: { min: 0, max: 300, errorMessage: "Please enter a valid height (0-300 cm)" },
    weight: { min: 0, max: 500, errorMessage: "Please enter a valid weight (0-500 kg)" },
  } as const;

  const validateField = (name: keyof StepOneData, value: number): string => {
    const rules = VALIDATION_RULES[name];
    if (isNaN(value) || value <= rules.min) {
      return `${String(name).charAt(0).toUpperCase() + String(name).slice(1)} must be greater than ${rules.min}`;
    }
    if (value > rules.max) return rules.errorMessage;
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid() || isSubmitting) return;

    setIsSubmitting(true);
    try {
      await mockApi.submitStepData(formData);
      onNext(formData);
    } catch (error) {
      console.error("Error submitting data:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isValid = () => {
    return formData.height > 0 && formData.weight > 0 && !errors.height && !errors.weight;
  };

  return (
    <StepWrapper
      title="Let's hear more about you to prepare your personal workout plan!"
      onNext={handleSubmit}
      onBack={onBack}
      isFirstStep={true}
      isValid={isValid()}
      isSubmitting={isSubmitting}
    >
      <div className={styles.inputContainer}>
        <Input
          label="Height"
          type="number"
          id="height"
          name="height"
          value={formData.height || ""}
          onChange={handleInputChange}
          placeholder="Your height (cm)"
          error={errors.height}
          min={VALIDATION_RULES.height.min}
          max={VALIDATION_RULES.height.max}
          required
        />

        <Input
          label="Weight"
          type="number"
          id="weight"
          name="weight"
          value={formData.weight || ""}
          onChange={handleInputChange}
          placeholder="Your weight (kg)"
          error={errors.weight}
          min={VALIDATION_RULES.weight.min}
          max={VALIDATION_RULES.weight.max}
          required
        />
      </div>
    </StepWrapper>
  );
};
