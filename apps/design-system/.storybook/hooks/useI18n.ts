import { useTranslation } from "react-i18next";

export const useI18n = () => {
  const { t, i18n } = useTranslation();
  
  return {
    t,
    currentLocale: i18n.language,
    changeLanguage: i18n.changeLanguage,
  };
};
