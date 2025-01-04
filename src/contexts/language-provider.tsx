import { useEffect, useState } from "react";
import { Language, LanguageProviderProps } from "./types";
import { LanguageContext } from "./language-context";
import i18next from "i18next";

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem("language");
    return (saved as Language) || "en";
  });

  // Set initial direction on mount
  useEffect(() => {
    const initialLang = (localStorage.getItem("language") as Language) || "en";
    document.documentElement.dir = initialLang === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = initialLang;
    i18next.changeLanguage(initialLang);
  }, []);

  const direction = language === "ar" ? "rtl" : "ltr";

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("language", lang);
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    i18next.changeLanguage(lang);
  };

  return (
    <LanguageContext.Provider value={{ language, direction, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
