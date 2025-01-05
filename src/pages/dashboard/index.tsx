import { useTranslation } from "react-i18next";

export const Dashboard = () => {
  const { t } = useTranslation();
  return (
    <>
      <title>{t("pages.dashboard")}</title>
      <div>
        <h1>Dashboard</h1>
        <p>Registration is complete.</p>
        <p>Welcome to the dashboard!</p>
      </div>
    </>
  );
};
