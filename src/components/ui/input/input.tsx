import React from "react";
import styles from "./input.module.css";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, className, ...props }, ref) => {
    // Use provided id or name for input identification and label association
    const inputId = props.id || props.name;

    return (
      <div className={styles.inputGroup}>
        {label && (
          <label htmlFor={inputId} className={styles.label}>
            {label}
          </label>
        )}

        <input
          ref={ref}
          {...props}
          id={inputId}
          className={`${styles.input} ${error ? styles.inputError : ""} ${className || ""}`}
          aria-invalid={!!error}
          aria-describedby={error ? `${inputId}-error` : undefined}
        />
        {/* Error message with ARIA integration */}
        {error && (
          <span id={`${inputId}-error`} className={styles.error} role="alert">
            {error}
          </span>
        )}
        {/* Helper text only shows when no error present */}
        {helperText && !error && <span className={styles.helperText}>{helperText}</span>}
      </div>
    );
  },
);

// Component display name for React DevTools
Input.displayName = "Input";
