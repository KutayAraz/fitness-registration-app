import { createContext } from "react";
import { LanguageContextType } from "./types";

/**
 * Context for managing the current language of the application.
 */
export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);
