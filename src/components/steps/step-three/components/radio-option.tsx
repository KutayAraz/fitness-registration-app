import styles from "./radio-option.module.css";

interface RadioOptionProps<T extends string> {
  value: T;
  label: string;
  icon: JSX.Element;
  selected: boolean;
  onChange: (value: T) => void;
  name: string;
}

export const RadioOption = <T extends string>({
  value,
  label,
  icon,
  selected,
  onChange,
  name,
}: RadioOptionProps<T>) => {
  return (
    <label className={styles.radioOption}>
      <input
        type="radio"
        value={value}
        checked={selected}
        onChange={() => onChange(value)}
        name={name}
        className={styles.hiddenRadio}
      />
      <div className={`${styles.radioContent} ${selected ? styles.selected : ""}`}>
        <div className={styles.iconLabel}>
          <span className={styles.icon}>{icon}</span>
          <span className={styles.label}>{label}</span>
        </div>
        <div className={styles.customRadio}>
          <div className={styles.radioOuter}>
            <div className={styles.radioInner}></div>
          </div>
        </div>
      </div>
    </label>
  );
};
