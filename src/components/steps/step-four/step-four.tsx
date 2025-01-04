import { useState } from "react";
import styles from "./step-four.module.css";
import { StepFourData, StepFourProps } from "./types";
import { StepWrapper } from "@/components/step-wrapper/step-wrapper";
import { Input } from "@/components/ui/input/input";

export const StepFour = ({ onNext, onBack }: StepFourProps) => {
  const [formData, setFormData] = useState<StepFourData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<Partial<Record<keyof StepFourData, string>>>({});

  const validateField = (name: keyof StepFourData, value: string): string => {
    switch (name) {
      case "firstName":
      case "lastName":
        return value.trim() === "" ? "This field is required" : "";
      case "email":
        return !value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
          ? "Please enter a valid email address"
          : "";
      case "password":
        return value.length < 8 ? "Password must be at least 8 characters long" : "";
      default:
        return "";
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: validateField(name as keyof StepFourData, value),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all fields
    const newErrors = Object.keys(formData).reduce(
      (acc, key) => ({
        ...acc,
        [key]: validateField(key as keyof StepFourData, formData[key as keyof StepFourData]),
      }),
      {},
    );

    setErrors(newErrors);

    if (Object.values(newErrors).every((error) => !error)) {
      onNext(formData);
    }
  };

  const isValid = () => {
    return (
      Object.values(formData).every((value) => value.trim() !== "") &&
      Object.values(errors).every((error) => !error)
    );
  };

  return (
    <StepWrapper
      title="Final step. Complete your registration"
      onNext={handleSubmit}
      onBack={onBack}
      isValid={isValid()}
      isLastStep
    >
      <div className={styles.formContainer}>
        <Input
          name="firstName"
          placeholder="Name"
          value={formData.firstName}
          onChange={handleChange}
          error={errors.firstName}
          required
        />

        <Input
          name="lastName"
          placeholder="Surname"
          value={formData.lastName}
          onChange={handleChange}
          error={errors.lastName}
          required
        />

        <Input
          name="email"
          type="email"
          placeholder="E-mail"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
          required
        />

        <Input
          name="password"
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          error={errors.password}
          required
        />
      </div>
    </StepWrapper>
  );
};
