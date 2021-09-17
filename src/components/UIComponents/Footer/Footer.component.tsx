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
import React from 'react';
import { useTranslation } from 'react-i18next';
import { CustomerProfileIcon } from '../../../assets/icons';
import logoOne from '../../../assets/images/Shell Taup logo.svg';
import logoTwo from '../../../assets/images/Shell Taup logo2.svg';
import { useTheme } from '../../../contexts/Theme/Theme.context';
import { namespaces } from '../../../i18n/i18n.constants';
import { Button } from '../Button/Button.component';
import './Footer.style.scss';


export const Footer: React.FC = () => {
  const { themeType } = useTheme();
  const { t } = useTranslation(namespaces.pages.simple);

  const logoSrc = themeType === 'UK' ? logoOne : logoTwo;

  return (
    <div className={'footer'}>
      <div className={'content__buttons'}>
        <Button
          types={'save'}
          onClick={() => { }}
        >
          {t("buttons.save")}
        </Button>--
        <Button
          types={'edit'}
          onClick={() => { }}
          startIcon={<EditIcon />}
        >
          {t("buttons.edit")}
        </Button>--
        <Button
          types={'delete'}
          onClick={() => { }}
        >
          {t("buttons.delete")}
        </Button>--
        <Button
          types={'cancel'}
          onClick={() => { }}
        >
          {t("buttons.cancel")}
        </Button>--
        <Button
          types={'download'}
          onClick={() => { }}
          startIcon={<Download />}
        >
          {t("buttons.download")}
        </Button>----------
        <Button
          types="primary"
          onClick={() => { }}
        >
          {t("buttons.primary")}
        </Button>--
        <Button
          types="secondary"
          onClick={() => { }}
        >
          {t("buttons.secondary")}
        </Button>--
        <Button
          types="primary"
          onClick={() => { }}
          startIcon={<Add />}
        >
          {t("buttons.add customer")}
        </Button>--
        <Button
          types="accordian"
          onClick={() => { }}
          startIcon={<DriveEtaOutlinedIcon />}
        >
          20
        </Button>--
        <Button
          types="accordian"
          className="active"
          onClick={() => { }}
          startIcon={<LocationOnOutlinedIcon />}
        >
          20
        </Button>--
        <Button
          types="accordian"
          disabled
          onClick={() => { }}
          startIcon={<InvertColorsOutlinedIcon />}
        >
          20
        </Button>--
        <Button
          types="accordian"
          className="empty"
          onClick={() => { }}
          startIcon={<CreditCardOutlinedIcon />}
        >
          0
        </Button>--
        <Button
          types="accordian"
          onClick={() => { }}
          startIcon={<MapOutlinedIcon />}
        >
          20
        </Button>--
        <Button
          types="accordian"
          onClick={() => { }}
          startIcon={<DescriptionOutlinedIcon />}
        >
          20
        </Button>--
        <Button
          types="accordian"
          onClick={() => { }}
          startIcon={<TrainOutlinedIcon />}
        >
          20
        </Button>--
        <Button
          types="showmore"
          onClick={() => { }}
        >
          {t("buttons.show more")}
        </Button>--
        <Button
          types="sortby"
          onClick={() => { }}
          startIcon={<ArrowDownwardOutlinedIcon />}
        >
          {t("buttons.sort by")}
        </Button>--
        <Button
          types="listmemu"
          onClick={() => { }}
          startIcon={<ArrowDownwardOutlinedIcon />}
        >
        </Button>--
        <Button
          types="profile"
          size="large"
          onClick={() => { }}
          startIcon={<SvgIcon component={CustomerProfileIcon} viewBox="0 0 40 40" />}
        >
        </Button>--
      </div>
      <img
        className={'footer__logo'}
        src={logoSrc}
        alt={'logo'}
      />
    </div>
  )
}