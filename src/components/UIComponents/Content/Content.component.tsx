import React from 'react';

import { RightInfoPanel } from '../RightInfoPanel/RightInfoPanel.component';
import { Button } from '../Button/Button.component';
import { useTheme } from '../../../contexts/Theme/Theme.context';

import './Content.style.scss';
import { useTranslation } from 'react-i18next';
import { namespaces } from '../../../i18n/i18n.constants';

export const Content: React.FC = () => {
  const { setCurrentTheme } = useTheme();
  const { t, i18n } = useTranslation(namespaces.pages.simple);
  const changeLanguage = (language: string) => () => {
    i18n.changeLanguage(language);
  };
  const [open, setOpen] = React.useState(false);
  const handleDrawerOpen = () => setOpen(!open);
  const handleDrawerClose = () => setOpen(false);
  return (
    <div>
      <div
        className={'content'}
      // style={{ ...theme } as React.CSSProperties}
      >
        <h1 className={'content__title'}>
          <span className={'content__title--colored'}>{t("themes")} </span>
          {t("content1")}
        </h1>
        <p className={'content__paragraph'}>
          {t("content2")} <b>{t("content3")}</b>{t("para")}
        </p>
        <p className={'content__paragraph'}>
          {t("para1")} <b>{t("para1")}</b> ,<b>{t("para2")}</b> <b>{t("para3")}</b> <b>{t("para4")}</b>
        </p>
        <div className={'content__buttons'}>
          <Button
            type={'primary'}
            onClick={() => setCurrentTheme('USA')}
          >
            {t("ustheme")}
          </Button>
          <Button
            type={'secondary'}
            onClick={() => setCurrentTheme('UK')}
          >
            {t("uktheme")}
          </Button>
        </div>
      </div>
      <div className={'content__buttons1'}>
        <Button
          type={'primary'}
          onClick={changeLanguage("en")}
        >
          {t("english")}
        </Button>
        <Button
          type={'primary'}
          onClick={changeLanguage("es")}
        >
          {t("spanish")}
        </Button>
        <Button
          type={'primary'}
          onClick={changeLanguage("fr")}
        >
          {t("french")}
        </Button>
        <Button
          type={'primary'}
          onClick={handleDrawerOpen}
        >
          {t("Right Panel")}
        </Button>
        <RightInfoPanel open={open} data={{customerName: "Accurate Transportation", info: {}}} style={{}} onClose={handleDrawerClose} />
      </div>
    </div>

  )
};