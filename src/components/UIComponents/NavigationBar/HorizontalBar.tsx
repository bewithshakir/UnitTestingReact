import { SvgIcon } from '@material-ui/core';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  BackIcon,
  CustomerProfileIcon2,
  LogoutIcon,
  SettingsIcon,
  USAFlagIcon
} from '../../../assets/icons';
import DiscardChangesDialog from '../../../components/UIComponents/ConfirmationDialog/DiscardChangesDialog.component';
import {
  useAddedCustomerIdStore, useAddedCustomerNameStore,
  useShowConfirmationDialogBoxStore, useStore
} from '../../../store';
import { ParkingLot_SearchParam } from "../../../utils/constants";
import { Button } from '../Button/Button.component';
import ColorLegendControl from '../ColorLegendControl';
import NotificationsMenu from '../Menu/NotificationsMenu.component';
import ProfileMenu from '../Menu/ProfileMenu.component';
import './HorizontalBar.style.scss';
import { varsionNavLinks, versionBreadcrumbsMany, versionBreadcrumbsSingle } from './varsionNavLinksHelper';
import { handleModelConfirm } from './handleConfirmDialog';

const drawerWidth = 64;
interface HorizontalBarProps {
  version?: any;
  onBack: () => void;
}

export default function HorizontalBar (props: HorizontalBarProps) {
  const { t } = useTranslation();
  const { onBack } = props;
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

  function handleBack () {
    if (isFormFieldChange) {
      showDialogBox(true);
    } else {
      handleModelConfirm({
        onBack, hideDialogBox, resetFormFieldValue, pathname,
        navigate, selectedCustomerId, selectedCustomerName, backToParkingLot
      });
    }
  }

  const handleModelToggle = () => {
    hideDialogBox(false);
  };

  const fromParkingLotLanding = (searchParams: any) => searchParams.get('backTo') === ParkingLot_SearchParam ?
    '/parkinglots' : `/customer/${selectedCustomerId}/parkingLots`;

  const backToParkingLot = () => {
    const searchParams = new URLSearchParams(search);
    return fromParkingLotLanding(searchParams);
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
      case pathname.includes('users/add'):
        return t("addUser.title");
      case pathname.includes('users/edit'):
        return t("addUser.form.titleEdit");
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

  const renderNavigationHeader = () => {
    switch (version) {
      case 'Breadcrumbs-Single':
        return versionBreadcrumbsSingle(getHeaderText, handleClick);
      case 'Breadcrumbs-Many':
        return versionBreadcrumbsMany(selectedCustomerName, getHeaderText);
      case 'NavLinks':
        return varsionNavLinks(pathname, handleClick, t);
      default:
        return null;
    }
  };

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
            {renderNavigationHeader()}
            <div className='app__header-section' />
            <div className='app__header-right-section-desktop'>
              <ColorLegendControl />
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
          handleConfirm={() => handleModelConfirm({
            onBack, hideDialogBox, resetFormFieldValue, pathname,
            navigate, selectedCustomerId, selectedCustomerName, backToParkingLot
          })}
        />
      </div>
    </>
  );
}
