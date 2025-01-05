import { LanguageContext } from "@/contexts/language-context";
import { useContext } from "react";

/**
 * Hook to access the language context.
 */
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
