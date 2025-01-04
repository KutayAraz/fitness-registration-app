// hooks/useStepForm.ts
import { useState } from "react";
import { mockApi } from "@/utils/mock-api";
import { StepData } from "@/types/step-data";

// Define a union type for possible form data types
export type FormDataType = StepData | string[];

interface UseStepFormProps<T extends FormDataType> {
  onNext: (data: T) => void;
  validateData: (data: T) => boolean;
}

export function useStepForm<T extends FormDataType>({ onNext, validateData }: UseStepFormProps<T>) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (data: T) => {
    if (!validateData(data) || isSubmitting) return;

    setIsSubmitting(true);
    try {
      // Transform the data to match StepData type
      const submitData: StepData = Array.isArray(data) ? { values: data } : (data as StepData);

      await mockApi.submitStepData(submitData);
      onNext(data);
    } catch (error) {
      console.error("Error submitting data:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    isSubmitting,
    handleSubmit,
  };
}
