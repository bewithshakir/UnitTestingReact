import { Breadcrumbs, Link, SvgIcon } from "@material-ui/core";
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import React from "react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import { BackIcon, CustomerProfileIcon2, LeftArrowIcon, LogoutIcon, SettingsIcon, USAFlagIcon } from "../../../assets/icons";
import { Button } from "../Button/Button.component";
import NotificationsMenu from '../Menu/NotificationsMenu.component';
import ProfileMenu from '../Menu/ProfileMenu.component';
import SideBarDrawer from "../SideBarMenu/SideBarMenu.component";
import './HorizontalBar.style.scss';

const drawerWidth = 64;


interface HorizontalBarProps {
  version: "Breadcrumbs-Single" | "NavLinks" | "Breadcrumbs-Many",
  onBack: () => void,
}

export default function HorizontalBar (props: HorizontalBarProps) {
  const { t } = useTranslation();

  function handleClick (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
    console.info('You clicked a breadcrumb.');
  }

  const handleBack = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    props.onBack();
    console.info('You clicked a back button.');
  }

  function versionBreadcrumbsSingle () {
    return (<>
      <Breadcrumbs separator={<NavigateNextIcon />} aria-label="breadcrumb">
        <Link className="breadcrubs-title" href="#" onClick={handleClick}>
          Add Customer
        </Link>
      </Breadcrumbs>
    </>)
  }

  function varsionNavLinks () {
    return (<>
      <div className="linkitem active">
        <NavLink
          className="breadcrubs-title"
          to="/"
          onClick={handleClick}>
          Customer List
        </NavLink>
      </div>
      <div className="linkitem">
        <NavLink className="breadcrubs-title" to="/parkinglots" onClick={handleClick}>
          Parking Lots
        </NavLink>
      </div>
      <div className="linkitem">
        <NavLink className="breadcrubs-title" to="/vehicles" onClick={handleClick}>
          Vehicles
        </NavLink>
      </div>
      <div className="linkitem">
        <NavLink className="breadcrubs-title" to="/users" onClick={handleClick}>
          Users
        </NavLink>
      </div>
      <div className="linkitem">
        <NavLink className="breadcrubs-title" to="/invoices" onClick={handleClick}>
          Invoices
        </NavLink>
      </div>
    </>)
  }

  function versionBreadcrumbsMany () {
    return (<>
      <Breadcrumbs separator={<NavigateNextIcon />} aria-label="breadcrumb">
        <Link className="breadcrubs-title" href="#" onClick={handleClick}>
          Accurate Transportation
        </Link>
      </Breadcrumbs>
    </>)
  }

  return (
    <>
      <div className="app__header">
        <AppBar position="fixed" className="header" sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}>
          <Toolbar className="header__toolbar">
            {props.version === "NavLinks" ? null : (<Button
              types="profile"
              aria-label="back button"
              onClick={handleBack}
              size="small"
              startIcon={<SvgIcon component={props.version === "Breadcrumbs-Many" ? LeftArrowIcon : BackIcon} />}
            />)
            }
            {
              props.version === "Breadcrumbs-Single" ?
                versionBreadcrumbsSingle() :
                props.version === "NavLinks" ?
                  varsionNavLinks() :
                  props.version === "Breadcrumbs-Many" ?
                    versionBreadcrumbsMany() :
                    null
            }
            <div className="app__header-section" />
            <div className="app__header-right-section-desktop">
              <div className="header__country-selector">
                <SvgIcon component={USAFlagIcon} />
                <span className="country-title">United States</span>
              </div>
              <div className="vl"></div>
              <NotificationsMenu
                options={[
                  {
                    label: "Notification 1",
                  },
                  {
                    label: "Notification 2",

                  },
                  {
                    label: "Notification 3",
                  },
                ]}
                onSelect={(value) => {
                  console.log("🚀 ~ file: Content.component.tsx ~ line 60 ~ value", value)
                }}
              />
              <div className="vl"></div>
              <ProfileMenu
                options={[
                  {
                    label: t("menus.profile-actions.profile"),
                    icon: <CustomerProfileIcon2 />
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
            </div>
          </Toolbar>
        </AppBar>
      </div>
      <SideBarDrawer />
    </>
  );
}
