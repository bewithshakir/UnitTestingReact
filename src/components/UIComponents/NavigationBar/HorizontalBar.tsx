import { Breadcrumbs, Link, SvgIcon } from "@material-ui/core";
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import React from "react";
import { useTranslation } from "react-i18next";
import { NavLink, useHistory, useLocation } from "react-router-dom";
import { BackIcon, CustomerProfileIcon2, LogoutIcon, SettingsIcon, USAFlagIcon } from "../../../assets/icons";
// import NewReleasesIcon from '@mui/icons-material/NewReleases';
import { useAddedCustomerIdStore, useStore } from "../../../store";
import { Button } from "../Button/Button.component";
import NotificationsMenu from '../Menu/NotificationsMenu.component';
import ProfileMenu from '../Menu/ProfileMenu.component';
import './HorizontalBar.style.scss';
import { useAddedCustomerNameStore, useShowConfirmationDialogBoxStore } from '../../../store';
import DiscardChangesDialog from '../../../components/UIComponents/ConfirmationDialog/DiscardChangesDialog.component';


const drawerWidth = 64;
interface HorizontalBarProps {
  version?: any,
  onBack: () => void,
}

export default function HorizontalBar (props: HorizontalBarProps) {
  const { t } = useTranslation();
  const version = useStore((state) => state.version);
  const history = useHistory();
  const { pathname } = useLocation();
  const selectedCustomerName = useAddedCustomerNameStore((state) => state.customerName);
  const selectedCustomerId = useAddedCustomerIdStore((state) => state.customerId);
  const showDialogBox = useShowConfirmationDialogBoxStore((state) => state.showDialogBox);
  const hideDialogBox = useShowConfirmationDialogBoxStore((state) => state.hideDialogBox);
  const showConfirmationDialogBox = useShowConfirmationDialogBoxStore((state) => state.showConfirmationDialogBox);
  const isFormFieldChange = useShowConfirmationDialogBoxStore((state) => state.isFormFieldChange);
  const resetFormFieldValue = useShowConfirmationDialogBoxStore((state) => state.resetFormFieldValue);

  function handleClick (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
    return event;
  }

  const handleBack = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    { isFormFieldChange ? showDialogBox(true) : handleModelConfirm(); }
  };

  const handleModelToggle = () => {
    hideDialogBox(false);
  };

  const handleModelConfirm = () => {
    hideDialogBox(false);
    resetFormFieldValue(false);
    if (pathname.includes('viewLot')) {
      history.push({
        pathname: `/customer/${selectedCustomerId}/parkingLots`,
        state: {
          customerId: selectedCustomerId,
          customerName: selectedCustomerName
        }
      });
    }
    else if (pathname.includes('addLot') || pathname.includes('addFuelTax')) {
      history.goBack();
    }
    else if (pathname.includes('salesTax/add') || pathname.includes('salesTax/edit')) {
      history.push('/salesTax');
    }
    else if (pathname.includes('opisCities/add')) {
      history.push('/opisCities');
    }
    else if (pathname.includes('editFuelTax')) {
      history.push('/taxes');
    }
    else if (pathname.includes('productManagement/add') || pathname.includes('productManagement/edit')) {
      history.push('/productManagement');
    }
    else {
      props.onBack();
    }
  };



  const getHeaderText = () => {
    switch (true) {
      case history.location.pathname.includes('addCustomer'):
        return t("customerManagement.form.customerTitleAdd");
      case history.location.pathname.includes('addFuelTax'):
        return t("taxes.fuelTax.form.fuelTaxTitleAdd");
      case history.location.pathname.includes('salesTax/add'):
        return t("taxes.salesTax.form.titleAdd");
      case history.location.pathname.includes('salesTax/edit'):
        return t("taxes.salesTax.form.titleEdit");
      case history.location.pathname.includes('editFuelTax'):
        return t("taxes.salesTax.form.titleFuelEdit");
      case history.location.pathname.includes('opisCities/add'):
        return t("taxes.opisCities.form.titleAdd");
      case history.location.pathname.includes('opisCities/edit'):
        return t("taxes.opisCities.form.titleEdit");
      case history.location.pathname.includes('productManagement/add'):
        return t("productManagement.form.titleAdd");
      case history.location.pathname.includes('productManagement/edit'):
        return t("productManagement.form.titleEdit");
      default:
        return selectedCustomerName;
    }
  };

  function versionBreadcrumbsSingle () {
    return (<>
      <Breadcrumbs separator={<NavigateNextIcon />} aria-label="breadcrumb">
        <Link className="breadcrubs-title" href="#" onClick={handleClick}>
          {getHeaderText()}
        </Link>
      </Breadcrumbs>
    </>);
  }

  function varsionNavLinks () {
    if (pathname.includes('taxes') || pathname.includes('salesTax') || pathname.includes('productManagement') || pathname.includes('opisCities')) {
      return (<>
        <div className={pathname.includes('taxes') ? 'linkitem active' : 'linkitem'}>
          <NavLink className="breadcrubs-title" to="/taxes" onClick={handleClick}>
            {t("taxes.navBar.fuelTax")}
          </NavLink>
        </div>
        <div className={pathname.includes('salesTax') ? 'linkitem active' : "linkitem"}>
          <NavLink className="breadcrubs-title" to="/salesTax" onClick={handleClick}>
            {t("taxes.navBar.salesTax")}
          </NavLink>
        </div>
        <div className={pathname.includes('opisCities') ? 'linkitem active' : "linkitem"}>
          <NavLink className="breadcrubs-title" to="/opisCities" onClick={handleClick}>
            {t("taxes.navBar.opisCities")}
          </NavLink>
        </div>
        <div className={pathname.includes('productManagement') ? 'linkitem active' : "linkitem"}>
          <NavLink className="breadcrubs-title" to="/productManagement" onClick={handleClick}>
            {t("taxes.navBar.productManagement")}
          </NavLink>
        </div>
        <div className="linkitem">
          <NavLink className="breadcrubs-title" to="/assetManagement" onClick={handleClick}>
            {t("taxes.navBar.assetManagement")}
          </NavLink>
        </div>
      </>);
    } else {
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
        <div className="linkitem">
          <NavLink className="breadcrubs-title" to="#" onClick={handleClick}>
            Wallets
          </NavLink>
        </div>
      </>);
    }
  }

  const handleCustomerBack = () => {
    hideDialogBox(false);
    resetFormFieldValue(false);
    history.push(`/customer/viewCustomer/${selectedCustomerId}`);
  };

  function versionBreadcrumbsMany () {
    return (<>
      <Breadcrumbs separator={<NavigateNextIcon />} aria-label="breadcrumb">
        <Link className="breadcrubs-title" onClick={handleCustomerBack}>
          {selectedCustomerName}
        </Link>
        <Link className="breadcrubs-title" href="#" onClick={handleClick}>
          {"Add Lot & Details"}
        </Link>
      </Breadcrumbs>
    </>);
  }

  return (
    <>
      <div className="app__header">
        <AppBar position="fixed" className="header" sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}>
          <Toolbar className="header__toolbar">
            {(version === "NavLinks") ? null : (<Button
              types="profile"
              aria-label="back button"
              onClick={handleBack}
              size="small"
              startIcon={<SvgIcon component={BackIcon} />}
            />)
            }
            {
              (version === "Breadcrumbs-Single") ?
                versionBreadcrumbsSingle() :
                (version === "NavLinks") ?
                  varsionNavLinks() :
                  version === "Breadcrumbs-Many" ?
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
                  return value;
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
                  {
                    label: t(process.env.REACT_APP_VERSION_NUMBER?.toString() || ""),
                    icon: <SettingsIcon />
                  },
                ]}
                onSelect={(value) => {
                  return value;
                }}
              />
            </div>
          </Toolbar>
        </AppBar>
        <DiscardChangesDialog
          title={t("customerManagement.discardchangesdialog.title")}
          content={t("customerManagement.discardchangesdialog.content")}
          open={showConfirmationDialogBox}
          handleToggle={handleModelToggle}
          handleConfirm={handleModelConfirm}
        />
      </div>
    </>
  );
}