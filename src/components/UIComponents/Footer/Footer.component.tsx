import React from 'react';
import { useHistory } from "react-router-dom";

import { SvgIcon } from '@material-ui/core';
import Add from '@material-ui/icons/Add';
import ArrowDownwardOutlinedIcon from '@material-ui/icons/ArrowDownwardOutlined';
import CreditCardOutlinedIcon from '@material-ui/icons/CreditCardOutlined';
import DescriptionOutlinedIcon from '@material-ui/icons/DescriptionOutlined';
import DriveEtaOutlinedIcon from '@material-ui/icons/DriveEtaOutlined';
import EditIcon from '@material-ui/icons/Edit';
import Download from '@material-ui/icons/GetAppOutlined';
import InvertColorsOutlinedIcon from '@material-ui/icons/InvertColorsOutlined';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import MapOutlinedIcon from '@material-ui/icons/MapOutlined';
import TrainOutlinedIcon from '@material-ui/icons/TrainOutlined';
import { useTranslation } from 'react-i18next';
import { CustomerProfileIcon, DeleteIcon, FilterIcon } from '../../../assets/icons';
import logoOne from '../../../assets/images/Shell Taup logo.svg';
import logoTwo from '../../../assets/images/Shell Taup logo2.svg';
import { useTheme } from '../../../contexts/Theme/Theme.context';
import { RightInfoPanel } from '../RightInfoPanel/RightInfoPanel.component';
import { CustomerFilterPanel } from '../CustomerFilterPanel/CustomerFilterPanel.component';


import { Button } from '../Button/Button.component';
import './Footer.style.scss';

const rightPanelHeading = 'Accurate Transportation';

const rightPanelData = {
  'Customer ID': '0923131',
  'Name': 'Peter Parker',
  'Email': 'peterparker@gmail.com',
  'Phone': '0923131',
  'Settlement Type': 'WEX',
  'Card Added': "",
  'Address': '9555 S Post Oak Rd',
  'City': 'Houston',
  'State': 'Texas',
  'Country': 'US',
  'ZIP Code': '30013',
}

export const Footer: React.FC = () => {
  const { themeType } = useTheme();
  const { t } = useTranslation();

  const [infoPanelVisible, setInfoPanelVisible] = React.useState(false);
  const [custFilterPanelVisible, setCustFilterPanelVisible] = React.useState(false);
  const handleInfoPanelOpen = () => setInfoPanelVisible(!infoPanelVisible);
  const handleInfoPanelClose = () => setInfoPanelVisible(false);
  
  const handleCustFilterPanelOpen = () => setCustFilterPanelVisible(!custFilterPanelVisible);
  const handleCustFilterPanelClose = () => setCustFilterPanelVisible(false);
  const history = useHistory();

  const logoSrc = themeType === 'UK' ? logoOne : logoTwo;

  const navigateToAddCustomer = () => {
    history.push("/addCustomer")
  }

  return (
    <div className={'footer'}>
      <div className={'content__buttons'}>
        <Button
          types="primary"
          onClick={handleCustFilterPanelOpen}
        >
          {t("Customer Filter Panel")}
        </Button>-
        <Button
          types="save"
          aria-label="save"
          onClick={() => { }}
        >
          {t("buttons.save")}
        </Button>--
        <Button
          types="edit"
          aria-label="edit"
          onClick={() => { }}
          startIcon={<EditIcon />}
        >
          {t("buttons.edit")}
        </Button>--
        <Button
          types="delete"
          aria-label="delete"
          onClick={() => { }}
        >
          {t("buttons.delete")}
        </Button>--
        <Button
          types="cancel"
          aria-label="cancel"
          onClick={() => { }}
        >
          {t("buttons.cancel")}
        </Button> --
        <Button
          types="download"
          aria-label="download"
          onClick={() => { }}
          startIcon={<Download />}
        >
          {t("buttons.download")}
        </Button> ----------
        <Button
          types="primary"
          aria-label="primary"
          onClick={() => { }}
        >
          {t("buttons.primary")}
        </Button> --
        <Button
          types="secondary"
          aria-label="secondary"
          onClick={() => { }}
        >
          {t("buttons.secondary")}
        </Button> --
        <Button
          types="primary"
          aria-label="primary"
          onClick={navigateToAddCustomer}
          startIcon={<Add />}
        >
          {t("buttons.add customer")}
        </Button> --
        <Button
          types="accordian"
          aria-label="accordian"
          onClick={() => { }}
          startIcon={<DriveEtaOutlinedIcon />}
        >
          20
        </Button> --
        <Button
          types="accordian"
          aria-label="accordian"
          className="active"
          onClick={() => { }}
          startIcon={<LocationOnOutlinedIcon />}
        >
          20
        </Button> --
        <Button
          types="accordian"
          aria-label="accordian"
          disabled
          onClick={() => { }}
          startIcon={<InvertColorsOutlinedIcon />}
        >
          20
        </Button> --
        <Button
          types="accordian"
          aria-label="accordian"
          className="empty"
          onClick={() => { }}
          startIcon={<CreditCardOutlinedIcon />}
        >
          0
        </Button> --
        <Button
          types="accordian"
          aria-label="accordian"
          onClick={() => { }}
          startIcon={<MapOutlinedIcon />}
        >
          20
        </Button> --
        <Button
          types="accordian"
          aria-label="accordian"
          onClick={() => { }}
          startIcon={<DescriptionOutlinedIcon />}
        >
          20
        </Button> --
        <Button
          types="accordian"
          aria-label="accordian"
          onClick={() => { }}
          startIcon={<TrainOutlinedIcon />}
        >
          20
        </Button> --
        <Button
          types="showmore"
          aria-label="showmore"
          onClick={() => { }}
        >
          {t("buttons.show more")}
        </Button> --
        <Button
          types="sortby"
          aria-label="sortby"
          onClick={() => { }}
          startIcon={<ArrowDownwardOutlinedIcon />}
        >
          {t("buttons.sort by")}
        </Button> --
        <Button
          types="listmemu"
          aria-label="listmemu"
          onClick={() => { }}
          startIcon={<ArrowDownwardOutlinedIcon />}
        >
        </Button> --
        <Button
          types="delete2"
          aria-label="delete2"
          onClick={() => { }}
          startIcon={<DeleteIcon />}
        >
        </Button> --
        <Button
          types="profile"
          aria-label="profile"
          size="large"
          onClick={() => { }}
          startIcon={<SvgIcon component={CustomerProfileIcon} viewBox="0 0 40 40" />}
        >
        </Button> --
        <Button
          types="filter"
          aria-label="dafault"
          onClick={() => { }}
          startIcon={<FilterIcon />}
        >
          Filter
        </Button> --
        <Button
          types="primary"
          onClick={handleInfoPanelOpen}
        >
          {t("Right Info Panel")}
        </Button>------
        <CustomerFilterPanel open={custFilterPanelVisible} onClose={handleCustFilterPanelClose} />
      </div>
      <RightInfoPanel open={infoPanelVisible} headingText={rightPanelHeading} info={rightPanelData} onClose={handleInfoPanelClose} />
      
  
      <img
        className="footer__logo"
        src={logoSrc}
        alt="logo"
      />
    </div >
  )
}