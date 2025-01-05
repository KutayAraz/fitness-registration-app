import { RouterProvider } from "react-router-dom";
import { LanguageProvider } from "../contexts/language-provider";
import { router } from "./router";

export const App = () => {
  return (
    <LanguageProvider>
      <RouterProvider router={router} />
    </LanguageProvider>
  );
};
