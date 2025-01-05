import styles from "./day-select.module.css";
import CheckmarkIcon from "@/assets/svgs/checkmark.svg?react";

interface DaySelectProps {
  day: string;
  selected: boolean;
  onClick: () => void;
  disabled?: boolean;
}

export const DaySelect = ({ day, selected, onClick, disabled = false }: DaySelectProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`${styles.daySelect} ${disabled ? styles.disabled : ""}`}
      aria-checked={selected}
      role="checkbox"
    >
      <span className={`${styles.dayText} ${disabled ? styles.disabledText : ""}`}>{day}</span>
      {selected && <CheckmarkIcon width={16} height={16} className={styles.checkmark} />}
    </button>
  );
};
