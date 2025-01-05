import { Dashboard } from "@/pages/dashboard/dashboard";
import { RegistrationPage } from "@/pages/registration-page";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RegistrationPage />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
]);
