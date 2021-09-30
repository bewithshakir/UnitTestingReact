import React from 'react';
import { Button } from '../Button/Button.component';
import { useTheme } from '../../../contexts/Theme/Theme.context';
import './Content.style.scss';
import { useTranslation } from 'react-i18next';
import SortbyMenu from '../Menu/SortbyMenu.component';
import ActionsMenu from '../Menu/ActionsMenu.component';
import ProfileMenu from '../Menu/ProfileMenu.component';
import DataGridActionsMenu from '../Menu/DataGridActionsMenu.component';
import { ExportIcon, PlusIcon, DeleteIcon, ImportIcon, SettingsIcon, LogoutIcon, CustomerProfileIcon2 } from '../../../assets/icons';
import CheckBox from '../Checkbox/Checkbox.component';
import CustomerListHeader from '../CustomerListComponent/CustomerListHeader.component';


export const Content: React.FC = () => {
  const { setCurrentTheme } = useTheme();
  const { t, i18n } = useTranslation();
  const changeLanguage = (language: string) => () => {
    i18n.changeLanguage(language);
  };

  return (
    <div>
      <div
        className={'content'}
      >
        <CustomerListHeader />
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

        <DataGridActionsMenu
          options={[
            {
              label: t("menus.data-grid-actions.raise a request"),
            },
            {
              label: t("menus.data-grid-actions.fee & driver details"),
            },
            {
              label: t("menus.data-grid-actions.other details"),
            },
            {
              label: t("menus.data-grid-actions.contact details"),
            }
          ]}
          onSelect={(value) => {
            console.log("🚀 ~ file: Content.component.tsx ~ line 60 ~ value", value)
          }}
        />

        <ProfileMenu
          options={[
            {
              label: t("menus.profile-actions.profile"),
              icon: <CustomerProfileIcon2 /> // width={"20px"} height={"20px"}
            },
            {
              label: t("menus.profile-actions.settings"),
              icon: <SettingsIcon />

            },
            {
              label: t("menus.profile-actions.logout"),
              icon: <LogoutIcon />
            },
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

      <CheckBox />
    </div>

  )
};