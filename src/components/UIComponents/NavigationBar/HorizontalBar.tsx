import { Breadcrumbs, Link, SvgIcon } from '@material-ui/core';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import {
  BackIcon,
  CustomerProfileIcon2,
  LogoutIcon,
  SettingsIcon,
  USAFlagIcon,
} from '../../../assets/icons';
import { useAddedCustomerIdStore, useStore } from '../../../store';
import { Button } from '../Button/Button.component';
import NotificationsMenu from '../Menu/NotificationsMenu.component';
import ProfileMenu from '../Menu/ProfileMenu.component';
import './HorizontalBar.style.scss';
import {
  useAddedCustomerNameStore,
  useShowConfirmationDialogBoxStore,
} from '../../../store';
import DiscardChangesDialog from '../../../components/UIComponents/ConfirmationDialog/DiscardChangesDialog.component';
import { ParkingLot_SearchParam } from "../../../utils/constants";
import ColorLegendControl from '../ColorLegendControl';

const drawerWidth = 64;
interface HorizontalBarProps {
  version?: any;
  onBack: () => void;
}

export default function HorizontalBar (props: HorizontalBarProps) {
  const { t } = useTranslation();
  const version = useStore((state) => state.version);
  const navigate = useNavigate();
  const { pathname, search } = useLocation();
  const selectedCustomerName = useAddedCustomerNameStore((state) => state.customerName);
  const selectedCustomerId = useAddedCustomerIdStore(
    (state) => state.customerId
  );
  const showDialogBox = useShowConfirmationDialogBoxStore(
    (state) => state.showDialogBox
  );
  const hideDialogBox = useShowConfirmationDialogBoxStore(
    (state) => state.hideDialogBox
  );
  const showConfirmationDialogBox = useShowConfirmationDialogBoxStore(
    (state) => state.showConfirmationDialogBox
  );
  const isFormFieldChange = useShowConfirmationDialogBoxStore(
    (state) => state.isFormFieldChange
  );
  const resetFormFieldValue = useShowConfirmationDialogBoxStore(
    (state) => state.resetFormFieldValue
  );

  function handleClick (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
    return event;
  }

  const handleBack = () => {
    { isFormFieldChange ? showDialogBox(true) : handleModelConfirm(); }
  };

  const handleModelToggle = () => {
    hideDialogBox(false);
  };


  const backToParkingLot = () => {
    const searchParams = new URLSearchParams(search);
    const fromParkingLotLanding = searchParams.get('backTo') === ParkingLot_SearchParam;
    if (fromParkingLotLanding) {
      return '/parkinglots';
    } else {
      return `/customer/${selectedCustomerId}/parkingLots`;
    }
  };

  const handleModelConfirm = () => {
    hideDialogBox(false);
    resetFormFieldValue(false);
    if (pathname.includes('viewLot')) {
      navigate(backToParkingLot(), {
        state: {
          customerId: selectedCustomerId,
          customerName: selectedCustomerName,
        },
      });
    } else if (pathname.includes('addLot') || pathname.includes('addFuelTax')) {
      navigate(-1);
    } else if (pathname.includes('salesTax/add') || pathname.includes('salesTax/edit')) {
      navigate('/salesTax');
    } else if (pathname.includes('opisCities/add')) {
      navigate('/opisCities');
    } else if (pathname.includes('editFuelTax')) {
      navigate('/taxes');
    } else if (pathname.includes('productManagement/add') || pathname.includes('productManagement/edit')) {
      navigate('/productManagement');
    } else if (pathname.includes('vehicleRule/add')) {
      navigate('/vehicleRule');
    } else if (pathname.includes('AddAttachment')) {
      navigate(-1);
    }
    else if (pathname.includes('dsps/addDsp') || pathname.includes('dsps/edit')) {
      navigate(`/customer/${selectedCustomerId}/dsps`, {
        state: {
          customerId: selectedCustomerId,
          customerName: selectedCustomerName
        }
      });
    } else if (pathname.includes('/truckParkingLot/add')) {
      navigate('/truckParkingLot');
    } else if (pathname.includes('/truckParkingLot/edit')) {
      navigate('/truckParkingLot');
    } else if (pathname.includes('/assetManagement/add') || pathname.includes('/assetManagement/edit')) {
      navigate('/assetManagement');
    } else if (pathname.includes('/trucks/addTruck')) {
      navigate('/trucks');
    } else if(pathname.includes('/trucks/editTruck')){
      navigate('/trucks'); 
    } else {
      props.onBack();
    }
  };

  const getHeaderText = () => {
    switch (true) {
      case pathname.includes('addCustomer'):
        return t('customerManagement.form.customerTitleAdd');
      case pathname.includes('addFuelTax'):
        return t('taxes.fuelTax.form.fuelTaxTitleAdd');
      case pathname.includes('salesTax/add'):
        return t('taxes.salesTax.form.titleAdd');
      case pathname.includes('salesTax/edit'):
        return t('taxes.salesTax.form.titleEdit');
      case pathname.includes('editFuelTax'):
        return t('taxes.salesTax.form.titleFuelEdit');
      case pathname.includes('opisCities/add'):
        return t('taxes.opisCities.form.titleAdd');
      case pathname.includes('opisCities/edit'):
        return t('taxes.opisCities.form.titleEdit');
      case pathname.includes('productManagement/add'):
        return t('productManagement.form.titleAdd');
      case pathname.includes('productManagement/edit'):
        return t('productManagement.form.titleEdit');
      case pathname.includes('vehicleRule/add'):
        return t('taxes.vehicleRule.form.titleAdd');
      case pathname.includes('dsps/addDsp'):
        return t("addDSP.title");
      case pathname.includes('dsps/edit'):
        return t("addDSP.form.titleEdit");
      case (pathname.includes('addLot')):
        return t('parkingLot.form.titleAdd');
      case (pathname.includes('viewLot')):
        return t('parkingLot.form.titleEdit');
      case pathname.includes('AddAttachment'):
        return t('UploadAttachments.breadCrumbText');
      case pathname.includes('truckParkingLot/add'):
        return t('truckParkingLot.addTruckParkingLot.title');
      case pathname.includes('truckParkingLot/edit'):
        return t('truckParkingLot.addTruckParkingLot.form.editTitle');
      case pathname.includes('assetManagement/add'):
        return t('assetManagement.form.addTitle');
      case pathname.includes('assetManagement/edit'):
        return t('assetManagement.form.editTitle');
      case pathname.includes('trucks/addTruck'):
        return t('addTruckFormLabels.addTruckTitle'); 
      case pathname.includes('trucks/editTruck'):
          return t('addTruckFormLabels.editTruck');  
      default:
        return selectedCustomerName;
    }
  };

  function versionBreadcrumbsSingle () {
    return (
      <>
        <Breadcrumbs separator={<NavigateNextIcon />} aria-label='breadcrumb'>
          <Link className='breadcrubs-title' href='#' onClick={handleClick}>
            {getHeaderText()}
          </Link>
        </Breadcrumbs>
      </>
    );
  }

  function varsionNavLinks () {
    if (
      pathname.includes('taxes') ||
      pathname.includes('salesTax') ||
      pathname.includes('productManagement') ||
      pathname.includes('opisCities') ||
      pathname.includes('assetManagement') || 
      pathname.includes('vehicleRule')
    ) {
      return (
        <>
          <div
            className={
              pathname.includes('taxes') ? 'linkitem active' : 'linkitem'
            }
          >
            <NavLink
              className='breadcrubs-title'
              to='/taxes'
              onClick={handleClick}
            >
              {t('taxes.navBar.fuelTax')}
            </NavLink>
          </div>
          <div
            className={
              pathname.includes('salesTax') ? 'linkitem active' : 'linkitem'
            }
          >
            <NavLink
              className='breadcrubs-title'
              to='/salesTax'
              onClick={handleClick}
            >
              {t('taxes.navBar.salesTax')}
            </NavLink>
          </div>
          <div
            className={
              pathname.includes('opisCities') ? 'linkitem active' : 'linkitem'
            }
          >
            <NavLink
              className='breadcrubs-title'
              to='/opisCities'
              onClick={handleClick}
            >
              {t('taxes.navBar.opisCities')}
            </NavLink>
          </div>
          <div
            className={
              pathname.includes('productManagement')
                ? 'linkitem active'
                : 'linkitem'
            }
          >
            <NavLink
              className='breadcrubs-title'
              to='/productManagement'
              onClick={handleClick}
            >
              {t('taxes.navBar.productManagement')}
            </NavLink>
          </div>
          <div className={pathname.includes('assetManagement') ? 'linkitem active' : "linkitem"}>
            <NavLink
              className='breadcrubs-title'
              to='/assetManagement'
              onClick={handleClick}
            >
              {t('taxes.navBar.assetManagement')}
            </NavLink>
          </div>
          <div className={pathname.includes('vehicleRule') ? 'linkitem active' : "linkitem"}>
            <NavLink
              className='breadcrubs-title'
              to='/vehicleRule'
              onClick={handleClick}
            >
              {t('taxes.navBar.vehicleRule')}
            </NavLink>
          </div>
        </>
      );
    }
    else if (pathname.includes('trucks') || pathname.includes('truckParkingLot')) {
      return (
        <>
          <div
            className={
              pathname.includes('trucks') ? 'linkitem active' : 'linkitem'
            }
          >
            <NavLink
              className='breadcrubs-title'
              to='/trucks'
              onClick={handleClick}
            >
              {t('truck.navBar.overview')}
            </NavLink>
          </div>
          <div
            className={
              pathname.includes('salesTax') ? 'linkitem active' : 'linkitem'
            }
          >
            <NavLink
              className='breadcrubs-title'
              to='/'
              onClick={handleClick}
            >
              {t('truck.navBar.liveMap')}
            </NavLink>
          </div>
          <div
            className={
              pathname.includes('truckParkingLot') ? 'linkitem active' : 'linkitem'
            }
          >
            <NavLink
              className='breadcrubs-title'
              to='/truckParkingLot'
              onClick={handleClick}
            >
              {t('truck.navBar.truckPlot')}
            </NavLink>
          </div>
        </>
      );
    }
    else {
      return (
        <>
          <div className={pathname === '/' ? 'linkitem active' : 'linkitem'}>
            <NavLink className='breadcrubs-title' to='/' onClick={handleClick}>
              Customer List
            </NavLink>
          </div>
          <div className={pathname.includes('parkinglots') ? 'linkitem active' : 'linkitem'}>
            <NavLink
              className='breadcrubs-title'
              to='/parkinglots'
              onClick={handleClick}
            >
              Parking Lots
            </NavLink>
          </div>
          <div className='linkitem'>
            <NavLink
              className='breadcrubs-title'
              to='/vehicles'
              onClick={handleClick}
            >
              Vehicles
            </NavLink>
          </div>
          <div className='linkitem'>
            <NavLink
              className='breadcrubs-title'
              to='/users'
              onClick={handleClick}
            >
              Users
            </NavLink>
          </div>
          <div className='linkitem'>
            <NavLink
              className='breadcrubs-title'
              to='/invoices'
              onClick={handleClick}
            >
              Invoices
            </NavLink>
          </div>
          <div className='linkitem'>
            <NavLink className='breadcrubs-title' to='#' onClick={handleClick}>
              Wallets
            </NavLink>
          </div>
        </>
      );
    }
  }

  function versionBreadcrumbsMany () {
    return (
      <>
        <Breadcrumbs separator={<NavigateNextIcon />} aria-label='breadcrumb'>
          <Link className='breadcrubs-title'>
            {selectedCustomerName}
          </Link>
          <Link className="breadcrubs-title" href="#" onClick={(event) => event.preventDefault()} >
            {getHeaderText()}
          </Link>
        </Breadcrumbs>
      </>
    );
  }

  return (
    <>
      <div className='app__header'>
        <AppBar
          position='fixed'
          className='header'
          sx={{
            width: `calc(100% - ${drawerWidth}px)`,
            ml: `${drawerWidth}px`,
          }}
        >
          <Toolbar className={version === 'NavLinks' ? 'header__navlinks_toolbar' : 'header__breadcrumbs_toolbar'} >
            {version !== 'NavLinks' &&
              (
                <Button
                  variant="contained"
                  className="btn-profile"
                  aria-label='back button'
                  onClick={handleBack}
                  size='small'
                  startIcon={<SvgIcon component={BackIcon} />}
                />
              )}
            {version === 'Breadcrumbs-Single'
              ? versionBreadcrumbsSingle()
              : version === 'NavLinks'
                ? varsionNavLinks()
                : version === 'Breadcrumbs-Many'
                  ? versionBreadcrumbsMany()
                  : null}
            <div className='app__header-section' />
            <div className='app__header-right-section-desktop'>
            <ColorLegendControl/>
              <div className='header__country-selector'>
                <SvgIcon component={USAFlagIcon} />
                <span className='country-title'>United States</span>
              </div>
              <div className='vl'></div>
              <NotificationsMenu
                options={[
                  {
                    label: 'Notification 1',
                  },
                  {
                    label: 'Notification 2',
                  },
                  {
                    label: 'Notification 3',
                  },
                ]}
                onSelect={(value) => {
                  return value;
                }}
              />
              <div className='vl'></div>
                <ProfileMenu
                  options={[
                    {
                      label: t('menus.profile-actions.profile'),
                      icon: <CustomerProfileIcon2 />,
                    },
                    {
                      label: t('menus.profile-actions.settings'),
                      icon: <SettingsIcon />,
                    },
                    {
                      label: t('menus.profile-actions.logout'),
                      icon: <LogoutIcon />,
                    },
                    {
                      label: t(
                        process.env.REACT_APP_VERSION_NUMBER?.toString() || ''
                      ),
                      icon: <SettingsIcon />,
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
          title={t('customerManagement.discardchangesdialog.title')}
          content={t('customerManagement.discardchangesdialog.content')}
          open={showConfirmationDialogBox}
          handleToggle={handleModelToggle}
          handleConfirm={handleModelConfirm}
        />
      </div>
    </>
  );
}
