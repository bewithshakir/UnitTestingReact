import React from 'react';
import { Input } from './components/UIComponents/Input/Input';
import { useTranslation } from "react-i18next";
import { namespaces } from "./i18n/i18n.constants";

function App() {
  const { t, i18n } = useTranslation(namespaces.pages.simple);
  console.log(t("buttons.ok"))
  const changeLanguage = (language: string) => () => {
    i18n.changeLanguage(language);
  };
  return (
    <div className="App">
      <header className="App-header">
        <Input />
        <h1>
        {t("content")}
        </h1>
      <button>{t("buttons.ok")}</button>
      <button onClick={changeLanguage("en")}>{t("english")}</button>
      <button onClick={changeLanguage("es")}>{t("spanish")}</button>
      <button onClick={changeLanguage("fr")}>{t("french")}</button>
      </header>
    </div>
  );
}

export default App;
