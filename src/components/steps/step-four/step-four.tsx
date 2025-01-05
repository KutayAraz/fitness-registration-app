import { useState } from "react";
import styles from "./step-four.module.css";
import { StepFourData, StepFourProps } from "./types";
import { StepWrapper } from "@/components/step-wrapper/step-wrapper";
import { Input } from "@/components/ui/input/input";
import { VALIDATION_RULES } from "./validation-rules";
import { useStepForm } from "@/hooks/use-step-form";
import { useTranslation } from "react-i18next";

/**
 * Final step of registration form that collects user's personal and account information.
 * Handles form validation and submission with custom validation rules.
 */
export const StepFour = ({ onNext, onBack }: StepFourProps) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState<StepFourData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  // Track validation errors for each field
  const [errors, setErrors] = useState<Partial<Record<keyof StepFourData, string>>>({});

  const validateData = (data: StepFourData): boolean => {
    const newErrors: Partial<Record<keyof StepFourData, string>> = {};
    let isValid = true;

    // Validate all fields using validation rules
    (Object.keys(data) as Array<keyof StepFourData>).forEach((field) => {
      const rule = VALIDATION_RULES[field];
      if (!rule.validate(data[field] as string)) {
        newErrors[field] = rule.errorKey;
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
    return !rule.validate(value) ? rule.errorKey : "";
  };

  // Handles input changes and performs real-time validation
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

  // Define input groups with translation keys
  const inputGroups = [
    {
      groupName: "personal",
      fields: [
        {
          name: "firstName" as const,
          translationKey: "step4.name",
          type: "text",
        },
        {
          name: "lastName" as const,
          translationKey: "step4.surname",
          type: "text",
        },
      ],
    },
    {
      groupName: "account",
      fields: [
        {
          name: "email" as const,
          translationKey: "step4.email",
          type: "email",
        },
        {
          name: "password" as const,
          translationKey: "step4.password",
          type: "password",
        },
      ],
    },
  ] as const;

  return (
    <StepWrapper
      title="step4.title"
      onNext={handleFormSubmit}
      onBack={onBack}
      isValid={isValid()}
      isSubmitting={isSubmitting}
      isLastStep
    >
      <div className={styles.formContainer}>
        {inputGroups.map((group) => (
          <div key={group.groupName} className={styles.inputGroup}>
            {group.fields.map((field) => (
              <Input
                key={field.name}
                name={field.name}
                type={field.type}
                label={t(`${field.translationKey}.label`)}
                placeholder={t(`${field.translationKey}.placeholder`)}
                onChange={handleChange}
                error={t(errors[field.name as keyof StepFourData] || "")}
                required
              />
            ))}
          </div>
        ))}
      </div>
    </StepWrapper>
  );
};
