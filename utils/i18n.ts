import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as Localization from "expo-localization";

import en from "../locales/en.json";
import fr from "../locales/fr.json";

const deviceLang = Localization.getLocales()[0]?.languageCode || "en";

i18n.use(initReactI18next).init({
  compatibilityJSON: "v4",
  lng: deviceLang.startsWith("fr") ? "fr" : "en",
  fallbackLng: "en",
  resources: {
    en: { translation: en },
    fr: { translation: fr },
  },
});

export default i18n;
