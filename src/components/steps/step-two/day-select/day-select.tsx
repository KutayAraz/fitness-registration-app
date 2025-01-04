import styles from "./day-select.module.css";

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
      {selected && (
        <svg
          className={styles.checkmark}
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M13.3334 4L6.00008 11.3333L2.66675 8"
            stroke="#4140E5"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </button>
  );
};
