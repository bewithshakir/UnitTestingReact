import i18next, { i18n as i18nInstance } from "i18next";
import { initReactI18next } from "react-i18next";
import { languages } from "./i18n.constants";
import HttpApi from "i18next-xhr-backend";
import LanguageDetector from 'i18next-browser-languagedetector';

const createI18n = (language: string): i18nInstance => {
  const i18n = i18next.createInstance().use(initReactI18next);

  i18n
    .use(HttpApi)
    .use(LanguageDetector)
    .init({
      // backend: {
      //   loadPath: "./locales/{{lng}}/{{ns}}.json", // Specify where backend will find translation files.
      // },
      lng: language,
      debug: true,
      fallbackLng: language,
      interpolation: {
        escapeValue: false,
      },
      // ns: namespaces.pages.simple,
    });

  return i18n;
};

export const i18n = createI18n(languages.en);
