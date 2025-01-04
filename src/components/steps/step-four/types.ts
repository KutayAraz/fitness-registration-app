export interface StepFourData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface StepFourProps {
  onNext: (data: StepFourData) => void;
  onBack: () => void;
}
