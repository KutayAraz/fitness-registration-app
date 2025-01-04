import { useState } from "react";
import { StepOne } from "@/components/steps/step-one/step-one";
import { RegistrationData } from "./types/registration-data";
import { StepOneData } from "./components/steps/step-one/types";
import { StepTwo } from "./components/steps/step-two/step-two";
import { StepThree } from "./components/steps/step-three/step-three";
import { StepFour } from "./components/steps/step-four/step-four";

function App() {
  const [currentStep, setCurrentStep] = useState(1);
  const [registrationData, setRegistrationData] = useState<RegistrationData>({
    step1: null,
    step2: null,
    step3: null,
    step4: null,
  });

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(1, prev - 1));
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
    setCurrentStep((prev) => Math.min(4, prev + 1));
  };

  // Helper function to calculate BMI and determine available workout days
  const getWorkoutDays = (stepOneData: StepOneData | null): string[] => {
    if (!stepOneData) return ["Monday", "Wednesday", "Saturday", "Sunday"];

    const heightInCentimeters = stepOneData.height;
    const bmiRatio = stepOneData.weight / heightInCentimeters;

    console.log("bmi ratio is", bmiRatio);

    return bmiRatio <= 0.5
      ? ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
      : ["Monday", "Wednesday", "Saturday", "Sunday"];
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
      {/* <div className="step-indicator">Step {currentStep} of 4</div> */}
      {renderCurrentStep()}
    </div>
  );
}

export default App;
