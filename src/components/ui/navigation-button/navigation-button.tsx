import styles from "./navigation-button.module.css";

type NavigationButtonProps = {
  text: string;
  onClick?: (e: React.FormEvent) => void | Promise<void>;
  disabled?: boolean;
  direction?: "ltr" | "rtl";
  ariaLabel: string;
  type?: "button" | "submit" | "reset";
};

/**
 * Navigation button component to be used in multi-step forms.
 */
export const NavigationButton = ({
  text,
  onClick,
  ariaLabel,
  disabled = false,
  direction = "ltr",
  type = "button",
}: NavigationButtonProps) => {
  return (
    <button
      className={`${styles.navigationButton} ${styles[direction]}`}
      onClick={onClick}
      aria-label={ariaLabel}
      disabled={disabled}
      type={type}
    >
      {text}
    </button>
  );
};
