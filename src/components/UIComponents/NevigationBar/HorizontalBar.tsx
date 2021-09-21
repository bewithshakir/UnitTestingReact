import { Breadcrumbs, Link, SvgIcon } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import {
  createStyles, makeStyles,
  Theme
} from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import React from "react";
import { useTranslation } from "react-i18next";
import { BackIcon, CustomerProfileIcon2, LogoutIcon, SettingsIcon, LeftArrowIcon } from "../../../assets/icons";
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NotificationsMenu from '../Menu/NotificationsMenu.component';
import ProfileMenu from '../Menu/ProfileMenu.component';
import './HorizontalBar.style.scss';
import { Button } from "../Button/Button.component";


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    grow: {
      flexGrow: 1
    },
    menuButton: {
      marginRight: theme.spacing(2)
    },
    title: {
      display: "block",
      color: "red",
    },
    sectionDesktop: {
      display: "flex",
      alignItems: "center"
    },
    linkItem: {
      paddingRight: "30px",
    },
    breadcrubsTitle: {
      fontFamily: "Arial",
      fontSize: "18px",
      fontWeight: "bold",
      color: "var(--Darkgray)"
    },
  })
);


interface HorizontalBarProps {
  version: "v1" | "v2" | "v3",
  onBack: () => void,
}
export default function HorizontalBar(props: HorizontalBarProps) {
  const classes = useStyles();
  const { t } = useTranslation();

  function handleClick(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
    event.preventDefault();
    console.info('You clicked a breadcrumb.');
  }

  const handleBack = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    props.onBack();
    console.info('You clicked a back button.');
  }

  function V1() {
    return (<>
      <Breadcrumbs separator={<NavigateNextIcon />} aria-label="breadcrumb">
        <Link className={classes.breadcrubsTitle} href="/getting-started/installation/" onClick={handleClick}>
          Add Customer
        </Link>
      </Breadcrumbs>
    </>)
  }

  function V2() {
    return (<>
      <div className={classes.linkItem}>
        <Link className={classes.breadcrubsTitle} href="/getting-started/installation/" onClick={handleClick}>
          Customer List
        </Link>
      </div>
      <div className={classes.linkItem}>
        <Link className={classes.breadcrubsTitle} href="/getting-started/installation/" onClick={handleClick}>
          Parking Lots
        </Link>
      </div>
      <div className={classes.linkItem}>
        <Link className={classes.breadcrubsTitle} href="/getting-started/installation/" onClick={handleClick}>
          Vehicles
        </Link>
      </div>
      <div className={classes.linkItem}>
        <Link className={classes.breadcrubsTitle} href="/getting-started/installation/" onClick={handleClick}>
          Users
        </Link>
      </div>
      <div className={classes.linkItem}>
        <Link className={classes.breadcrubsTitle} href="/getting-started/installation/" onClick={handleClick}>
          Invoices
        </Link>
      </div>
    </>)
  }

  function V3() {
    return (<>
      <Breadcrumbs separator={<NavigateNextIcon />} aria-label="breadcrumb">
        <Link className={classes.breadcrubsTitle} href="/getting-started/installation/" onClick={handleClick}>
          Accurate Transportation
        </Link>
      </Breadcrumbs>
    </>)
  }

  return (
    <div className={classes.grow}>
      <AppBar position="fixed" className="header" >
        <Toolbar className="header__toolbar">
          <Button
            types="profile"
            aria-label="back button"
            onClick={handleBack}
            size="small"
            startIcon={<SvgIcon component={props.version === "v3" ? LeftArrowIcon : BackIcon} />}
          />
          {
            props.version === "v1" ?
              V1() :
              props.version === "v2" ?
                V2() :
                props.version === "v3" ?
                  V3() :
                  null
          }
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <div className="header__country-selector">
              <div>
                <img className="country-selector-logo" src="/static/media/Shell Taup logo2.11573aa2.svg" alt="logo" />
              </div>
              <span>United States</span>
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
  );
}
