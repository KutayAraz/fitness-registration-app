import React from "react";
import styles from "./input-with-unit.module.css";
import { Input } from "../input/input";

interface InputWithUnitProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  unit: string;
  unitPosition?: "right" | "left";
}

/**
 * Input component with a unit displayed on the right or left side.
 * Extends the base Input component.
 */
export const InputWithUnit = React.forwardRef<HTMLInputElement, InputWithUnitProps>(
  ({ label, error, helperText, unit, unitPosition = "right", className, ...props }, ref) => {
    return (
      <div className={styles.inputWithUnitWrapper}>
        <Input
          ref={ref}
          {...props}
          label={label}
          error={error}
          helperText={helperText}
          className={`${styles.inputWithUnit} ${className || ""}`}
        />
        <span className={`${styles.unit} ${styles[unitPosition]}`}>{unit}</span>
      </div>
    );
  },
);

InputWithUnit.displayName = "InputWithUnit";
