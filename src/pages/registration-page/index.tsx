import { LanguageSwitcher } from "@/components/language-switcher/language-switcher";
import { ProgressBar } from "@/components/progress-bar/progress-bar";
import { SlideTransition } from "@/components/slide-transition/slide-transition";
import { StepFour } from "@/components/steps/step-four/step-four";
import { StepOne } from "@/components/steps/step-one/step-one";
import { StepOneData } from "@/components/steps/step-one/types";
import { StepThree } from "@/components/steps/step-three/step-three";
import { StepTwo } from "@/components/steps/step-two/step-two";
import { DayKey } from "@/components/steps/step-two/types";
import { useLanguage } from "@/hooks/use-language";
import { RegistrationData } from "@/types/registration-data";
import { Steps } from "@/types/steps";
import { useState } from "react";
import styles from "./index.module.css";
import { useTranslation } from "react-i18next";

/**
 * Main registration flow container managing multi-step form state and navigation.
 * Handles:
 * - Step navigation and transitions
 * - Form data collection
 * - BMI-based workout day calculations
 * - RTL/LTR support
 */
export const RegistrationPage = () => {
  const { t } = useTranslation();
  const { direction } = useLanguage();
  const [currentStep, setCurrentStep] = useState<Steps>(1);

  const [registrationData, setRegistrationData] = useState<RegistrationData>({
    step1: null,
    step2: null,
    step3: null,
    step4: null,
  });

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(1, prev - 1) as Steps);
  };

  // Generic function to handle any step's completion
  const handleStepComplete = <T extends keyof RegistrationData>(
    step: T,
    data: NonNullable<RegistrationData[T]>,
  ) => {
    setRegistrationData((prev) => ({
      ...prev,
      [step]: data,
    }));
    setCurrentStep((prev) => Math.min(4, prev + 1) as Steps);
  };

  // Helper function to calculate BMI and determine available workout days
  const getWorkoutDays = (stepOneData: StepOneData | null): DayKey[] => {
    if (!stepOneData) {
      return ["monday", "wednesday", "saturday", "sunday"];
    }

    const heightInCentimeters = stepOneData.height;
    const bmiRatio = stepOneData.weight / heightInCentimeters;

    return bmiRatio <= 0.5
      ? ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"]
      : ["monday", "wednesday", "saturday", "sunday"];
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return <StepOne onNext={(data) => handleStepComplete("step1", data)} onBack={handleBack} />;
      case 2:
        return (
          <StepTwo
            onNext={(data) => handleStepComplete("step2", data)}
            onBack={handleBack}
            availableDays={getWorkoutDays(registrationData.step1)}
          />
        );
      case 3:
        return (
          <StepThree onNext={(data) => handleStepComplete("step3", data)} onBack={handleBack} />
        );
      case 4:
        return (
          <StepFour onNext={(data) => handleStepComplete("step4", data)} onBack={handleBack} />
        );
      default:
        return null;
    }
  };

  return (
    <div className={styles.registrationWrapper}>
      <title>{t("pages.register")}</title>
      <ProgressBar currentStep={currentStep} />
      <LanguageSwitcher />
      <div className={styles.registrationContainer}>
        <SlideTransition direction={direction} currentStep={currentStep}>
          {renderCurrentStep()}
        </SlideTransition>
      </div>
    </div>
  );
};
