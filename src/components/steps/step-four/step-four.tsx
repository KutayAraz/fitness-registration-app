import { useState } from "react";
import styles from "./step-four.module.css";
import { StepFourData, StepFourProps } from "./types";
import { StepWrapper } from "@/components/step-wrapper/step-wrapper";
import { Input } from "@/components/ui/input/input";
import { VALIDATION_RULES } from "./validation-rules";
import { useStepForm } from "@/hooks/use-step-form";

export const StepFour = ({ onNext, onBack }: StepFourProps) => {
  const [formData, setFormData] = useState<StepFourData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<Partial<Record<keyof StepFourData, string>>>({});

  const validateData = (data: StepFourData): boolean => {
    const newErrors: Partial<Record<keyof StepFourData, string>> = {};
    let isValid = true;

    // Validate all fields using validation rules
    (Object.keys(data) as Array<keyof StepFourData>).forEach((field) => {
      const rule = VALIDATION_RULES[field];
      if (!rule.validate(data[field] as string)) {
        newErrors[field] = rule.errorMessage;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const { isSubmitting, handleSubmit } = useStepForm<StepFourData>({
    onNext,
    validateData,
  });

  const validateField = (name: keyof StepFourData, value: string): string => {
    const rule = VALIDATION_RULES[name];
    return !rule.validate(value) ? rule.errorMessage : "";
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const fieldName = name as keyof StepFourData;

    setFormData((prev) => ({
      ...prev,
      [fieldName]: value,
    }));

    const error = validateField(fieldName, value);
    setErrors((prev) => ({
      ...prev,
      [fieldName]: error,
    }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSubmit(formData);
  };

  const isValid = () => {
    return Object.keys(formData).every((key) => {
      const field = key as keyof StepFourData;
      return VALIDATION_RULES[field].validate(formData[field] as string);
    });
  };

  const inputFields = [
    { name: "firstName", placeholder: "Name", type: "text" },
    { name: "lastName", placeholder: "Surname", type: "text" },
    { name: "email", placeholder: "E-mail", type: "email" },
    { name: "password", placeholder: "Password", type: "password" },
  ] as const;

  return (
    <StepWrapper
      title="Final step. Complete your registration"
      onNext={handleFormSubmit}
      onBack={onBack}
      isValid={isValid()}
      isSubmitting={isSubmitting}
      isLastStep
    >
      <div className={styles.formContainer}>
        {inputFields.map((field) => (
          <Input
            key={field.name}
            name={field.name}
            type={field.type}
            placeholder={field.placeholder}
            value={formData[field.name as keyof StepFourData] as string}
            onChange={handleChange}
            error={errors[field.name as keyof StepFourData]}
            required
          />
        ))}
      </div>
    </StepWrapper>
  );
};
