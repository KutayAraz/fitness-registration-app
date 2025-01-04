import { ReactNode } from "react";
import { NavigationButton } from "../ui/navigation-button/navigation-button";
import { FormTitle } from "../ui/form-title/form-title";
import styles from "./step-wrapper.module.css";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();

  return (
    <form onSubmit={onNext} className={styles.stepContainer}>
      <FormTitle title={t(title)} />
      <div className={styles.stepContent}>{children}</div>
      <div className={styles.navigationContainer}>
        <NavigationButton
          text={t("buttons.back")}
          type="button"
          ariaLabel={t("buttons.back")}
          onClick={onBack}
          disabled={isFirstStep || isSubmitting}
        />
        <NavigationButton
          text={isSubmitting ? t("buttons.save") : t("buttons.next")}
          type="submit"
          ariaLabel={isSubmitting ? t("buttons.save") : t("buttons.next")}
          disabled={!isValid || isLastStep || isSubmitting}
        />
      </div>
    </form>
  );
};
