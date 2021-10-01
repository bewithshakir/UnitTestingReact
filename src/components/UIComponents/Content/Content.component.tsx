import React from 'react';
import { Button } from '../Button/Button.component';
import { useTheme } from '../../../contexts/Theme/Theme.context';
import './Content.style.scss';
import { useTranslation } from 'react-i18next';
import SortbyMenu from '../Menu/SortbyMenu.component';
import ActionsMenu from '../Menu/ActionsMenu.component';
import ProfileMenu from '../Menu/ProfileMenu.component';
import DataGridActionsMenu from '../Menu/DataGridActionsMenu.component';
import { ExportIcon, PlusIcon, DeleteIcon, ImportIcon, SettingsIcon, LogoutIcon, CustomerProfileIcon2, FilterIcon } from '../../../assets/icons';
import GridComponent from '../DataGird/grid.component';
import { useCustomers } from '../../../hooks/customer';
import { AppBar, Toolbar } from '@mui/material';
import SearchInput from '../SearchInput/SearchInput';
import { Add } from '@mui/icons-material';
import { useHistory } from 'react-router-dom';

interface ContentProps {
  rows?: []
}
export const Content: React.FC<ContentProps> = (props) => {
  const { setCurrentTheme } = useTheme();
  const history = useHistory()
  const [ searchTerm,setSearchTerm] = React.useState("")
  const { t, i18n } = useTranslation();
  const changeLanguage = (language: string) => () => {
    i18n.changeLanguage(language);
  };
  const { data } = useCustomers(searchTerm)
  const navigateToAddCustomer = () => {
    history.push("/addCustomer")
  }

  const onInputChange = (event : React.ChangeEvent<HTMLInputElement>)=>{
    event.preventDefault()
    setSearchTerm(event.currentTarget.value)
  }
  return (
    <div>
      <div
        className={'content'}
      >
        <div className={'content__buttons1'}>

          <Toolbar sx={{ width: "100%" }}>
            <Button
              types="filter"
              aria-label="dafault"
              onClick={() => { }}
              startIcon={<FilterIcon />}
            >
              Filter
            </Button>
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
            <SearchInput name='searchTerm'
              value={searchTerm}
              onChange={onInputChange} />
            <Button
              types="primary"
              aria-label="primary"
              onClick={navigateToAddCustomer}
              startIcon={<Add />}
            >
              {t("buttons.add customer")}
            </Button>
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
          </Toolbar>

          {/* 
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
          /> */}

          {/* <Button
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
        </Button> */}
        </div>
        {/* <h1 className={'content__title'}>
          <span className={'content__title--colored'}>{t("themes")} </span>
          {t("content1")}
        </h1>
        <p className={'content__paragraph'}>
          {t("content2")} <b>{t("content3")}</b>{t("para")}
        </p>
        <p className={'content__paragraph'}>
          {t("para1")} <b>{t("para1")}</b> ,<b>{t("para2")}</b> <b>{t("para3")}</b> <b>{t("para4")}</b>
        </p> */}
        <GridComponent rows={data?.data?.customers} />
        {/* <div className={'content__buttons'}>
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
        </div> */}
      </div>
    </div>

  )
};