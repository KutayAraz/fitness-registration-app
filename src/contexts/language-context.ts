import { createContext } from "react";
import { LanguageContextType } from "./types";

// Export the context as a constant
export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);
