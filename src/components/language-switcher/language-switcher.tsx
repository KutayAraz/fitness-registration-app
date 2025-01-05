import { useLanguage } from "@/hooks/use-language";
import { useTranslation } from "react-i18next";
import styles from "./language-switcher.module.css";

const SUPPORTED_LANGUAGES = ["en", "ar"] as const;
type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number];

interface LanguageButtonProps {
  languageCode: SupportedLanguage;
  isActive: boolean;
  onClick: (lang: SupportedLanguage) => void;
  label: string;
}

// Extract language button as a separate component for better reusability
const LanguageButton = ({ languageCode, isActive, onClick, label }: LanguageButtonProps) => (
  <button
    className={`${styles.languageButton} ${isActive ? styles.active : ""}`}
    onClick={() => onClick(languageCode)}
    aria-pressed={isActive}
    type="button"
  >
    {label}
  </button>
);

// Component to allow users to switch between supported languages (English and Arabic).
// Handles RTL/LTR transitions automatically through the useLanguage hook.
export const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();
  const { t } = useTranslation();

  return (
    <div className={`${styles.switcherWrapper}`}>
      <div className={styles.switcherContainer} role="group" aria-label="Language switcher">
        {SUPPORTED_LANGUAGES.map((lang) => (
          <LanguageButton
            key={lang}
            languageCode={lang}
            isActive={language === lang}
            onClick={setLanguage}
            label={t(`language.${lang === "en" ? "english" : "arabic"}`)}
          />
        ))}
      </div>
    </div>
  );
};
