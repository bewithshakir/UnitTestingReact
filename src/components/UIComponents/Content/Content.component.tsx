import React from 'react';

import { Button } from '../Button/Button.component';
import { useTheme } from '../../../contexts/Theme/Theme.context';

import './Content.style.scss';
import { useTranslation } from 'react-i18next';
import { namespaces } from '../../../i18n/i18n.constants';
import SortbyMenu from '../Menu/SortbyMenu.component';
import ActionsMenu from '../Menu/ActionsMenu.component';
import { ImportIcon, ExportIcon, PlusIcon, DeleteIcon } from '../../../assets/icons';

export const Content: React.FC = () => {
  const { setCurrentTheme } = useTheme();
  const { t, i18n } = useTranslation(namespaces.pages.simple);
  const changeLanguage = (language: string) => () => {
    i18n.changeLanguage(language);
  };
  return (
    <div>
      <div
        className={'content'}
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
            types={'primary'}
            onClick={() => setCurrentTheme('USA')}
          >
            {t("ustheme")}
          </Button>
          <Button
            types={'secondary'}
            onClick={() => setCurrentTheme('UK')}
          >
            {t("uktheme")}
          </Button>
        </div>
      </div>
      <div className={'content__buttons1'}>
        <SortbyMenu
          options={[
            t("menus.sortby.payment completed"),
            t("menus.sortby.payment in progress"),
            t("menus.sortby.recently added lots"),
          ]}
          onSelect={(value) => {
            console.log("🚀 ~ file: Content.component.tsx ~ line 60 ~ value", value)
          }}
        />

        <ActionsMenu
          options={[
            {
              label: t("menus.actions.add vehicle"),
              icon: <PlusIcon />
            },
            {
              label: t("menus.actions.import data"),
              icon: <ImportIcon />
            },
            {
              label: t("menus.actions.export data"),
              icon: <ExportIcon />
            },
            {
              label: t("menus.actions.delete"),
              icon: <DeleteIcon />
            }
          ]}
          onSelect={(value) => {
            console.log("🚀 ~ file: Content.component.tsx ~ line 60 ~ value", value)
          }}
        />

        <Button
          types={'primary'}
          onClick={changeLanguage("en")}
        >
          {t("english")}
        </Button>
        <Button
          types={'primary'}
          onClick={changeLanguage("es")}
        >
          {t("spanish")}
        </Button>
        <Button
          types={'primary'}
          onClick={changeLanguage("fr")}
        >
          {t("french")}
        </Button>
      </div>
    </div>

  )
};