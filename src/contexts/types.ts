import { ReactNode } from "react";

export type Direction = "ltr" | "rtl";
export type Language = "en" | "ar";

export interface LanguageContextType {
  language: Language;
  direction: Direction;
  setLanguage: (lang: Language) => void;
}

export interface LanguageProviderProps {
  children: ReactNode;
}
