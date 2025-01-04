import { useState } from "react";
import { StepOne } from "@/components/steps/step-one/step-one";
import { RegistrationData } from "./types/registration-data";
import { StepOneData } from "./components/steps/step-one/types";
import { StepTwo } from "./components/steps/step-two/step-two";
import { StepThree } from "./components/steps/step-three/step-three";
import { StepFour } from "./components/steps/step-four/step-four";
import { SlideTransition } from "./components/slide-transition/slide-transition";
import { LanguageSwitcher } from "./components/language-switcher/language-switcher";
import { useLanguage } from "./hooks/use-language";
import { LanguageProvider } from "./contexts/language-provider";
import { DayKey } from "./components/steps/step-two/types";
import { Steps } from "./types/steps";

function AppContent() {
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
    <div className="registration-container">
      <LanguageSwitcher />
      <SlideTransition direction={direction} currentStep={currentStep}>
        {renderCurrentStep()}
      </SlideTransition>
    </div>
  );
}

function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}

export default App;
