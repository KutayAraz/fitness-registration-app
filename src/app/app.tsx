import { RouterProvider } from "react-router-dom";
import { LanguageProvider } from "../contexts/language-provider";
import { router } from "./router";

function App() {
  return (
    <LanguageProvider>
      <RouterProvider router={router} />
    </LanguageProvider>
  );
}

export default App;
