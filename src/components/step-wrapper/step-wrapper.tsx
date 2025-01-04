import { ReactNode } from "react";
import { NavigationButton } from "../ui/navigation-button/navigation-button";
import { FormTitle } from "../ui/form-title/form-title";
import styles from "./step-wrapper.module.css";

interface StepWrapperProps {
  title: string;
  children: ReactNode;
  onNext: (e: React.FormEvent) => void | Promise<void>;
  onBack: () => void;
  isFirstStep?: boolean;
  isLastStep?: boolean;
  isValid: boolean;
  isSubmitting?: boolean;
}

export const StepWrapper = ({
  title,
  children,
  onNext,
  onBack,
  isFirstStep = false,
  isLastStep = false,
  isValid,
  isSubmitting = false,
}: StepWrapperProps) => {
  return (
    <form onSubmit={onNext} className={styles.stepContainer}>
      <FormTitle title={title} />
      <div className={styles.stepContent}>{children}</div>
      <div className={styles.navigationContainer}>
        <NavigationButton
          text="Back"
          type="button"
          ariaLabel="Back Button"
          onClick={onBack}
          disabled={isFirstStep || isSubmitting}
        />
        <NavigationButton
          text={isSubmitting ? "Saving..." : "Next"}
          type="submit"
          ariaLabel="Next Button"
          disabled={!isValid || isLastStep || isSubmitting}
        />
      </div>
    </form>
  );
};
