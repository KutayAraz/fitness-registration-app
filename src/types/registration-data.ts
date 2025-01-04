import { StepFourData } from "@/components/steps/step-four/types";
import { StepOneData } from "@/components/steps/step-one/types";
import { StepThreeData } from "@/components/steps/step-three/types";
import { StepTwoData } from "@/components/steps/step-two/types";

export interface RegistrationData {
  step1: StepOneData | null;
  step2: StepTwoData | null;
  step3: StepThreeData | null;
  step4: StepFourData | null;
}
