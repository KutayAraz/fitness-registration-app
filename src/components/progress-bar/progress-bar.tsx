import React from "react";
import styles from "./progress-bar.module.css";

interface ProgressBarProps {
  currentStep: number;
  totalSteps?: number;
}

// Visual progress indicator for multi-step forms.
export const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep, totalSteps = 4 }) => {
  // Calculate progress percentage
  const progress = ((currentStep - 1) / (totalSteps - 1)) * 100;

  return (
    <div className={styles.progressBarContainer}>
      <div className={styles.progressBar}>
        <div
          className={styles.progressFill}
          style={{ width: `${progress}%` }}
          role="progressbar"
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>
    </div>
  );
};
