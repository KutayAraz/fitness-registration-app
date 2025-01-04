import { useLanguage } from "@/hooks/use-language";
import { useTranslation } from "react-i18next";
import styles from "./language-switcher.module.css";

export const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();
  const { t } = useTranslation();

  return (
    <div className={styles.switcherContainer} role="group" aria-label="Language switcher">
      <button
        className={`${styles.languageButton} ${language === "en" ? styles.active : ""}`}
        onClick={() => setLanguage("en")}
        aria-pressed={language === "en"}
        type="button"
      >
        {t("language.english")}
      </button>
      <button
        className={`${styles.languageButton} ${language === "ar" ? styles.active : ""}`}
        onClick={() => setLanguage("ar")}
        aria-pressed={language === "ar"}
        type="button"
      >
        {t("language.arabic")}
      </button>
    </div>
  );
};
