import styles from "./form-title.module.css";

type FormTitleProps = {
  title: string;
};

export const FormTitle = ({ title }: FormTitleProps) => {
  return <h2 className={styles.formTitle}>{title}</h2>;
};
