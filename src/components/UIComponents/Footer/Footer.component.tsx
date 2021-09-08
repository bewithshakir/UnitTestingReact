import React from 'react';
import logoOne from '../../../assets/images/Shell Taup logo.svg';
import logoTwo from '../../../assets/images/Shell Taup logo2.svg';
import { useTheme } from '../../../contexts/Theme/Theme.context';
import { Button } from '../Button/Button.component';
import EditIcon from '@material-ui/icons/Edit';
import Download from '@material-ui/icons/GetAppOutlined';
import Add from '@material-ui/icons/Add';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import DriveEtaOutlinedIcon from '@material-ui/icons/DriveEtaOutlined';
import InvertColorsOutlinedIcon from '@material-ui/icons/InvertColorsOutlined';
import CreditCardOutlinedIcon from '@material-ui/icons/CreditCardOutlined';
import MapOutlinedIcon from '@material-ui/icons/MapOutlined';
import DescriptionOutlinedIcon from '@material-ui/icons/DescriptionOutlined';
import TrainOutlinedIcon from '@material-ui/icons/TrainOutlined';
import ArrowDownwardOutlinedIcon from '@material-ui/icons/ArrowDownwardOutlined';
import PermIdentityOutlinedIcon from '@material-ui/icons/PermIdentityOutlined';
import { useTranslation } from 'react-i18next';
import { namespaces } from '../../../i18n/i18n.constants';

import './Footer.style.scss';
import { Icon } from '@material-ui/core';

export const Footer: React.FC = () => {
  const { themeType } = useTheme();
  const { t } = useTranslation(namespaces.pages.simple);

  const logoSrc = themeType === 'UK' ? logoOne : logoTwo;

  return (
    <div className={'footer'}>
      <div className={'content__buttons'}>
        <Button
          type={'save'}
          onClick={() => { }}
        >
          {t("buttons.save")}
        </Button>--
        <Button
          type={'edit'}
          onClick={() => { }}
          startIcon={<EditIcon />}
        >
          {t("buttons.edit")}
        </Button>--
        <Button
          type={'delete'}
          onClick={() => { }}
        >
          {t("buttons.delete")}
        </Button>--
        <Button
          type={'cancel'}
          onClick={() => { }}
        >
          {t("buttons.cancel")}
        </Button>--
        <Button
          type={'download'}
          onClick={() => { }}
          startIcon={<Download />}
        >
          {t("buttons.download")}
        </Button>----------
        <Button
          type="primary"
          onClick={() => { }}
        >
          {t("buttons.primary")}
        </Button>--
        <Button
          type="secondary"
          onClick={() => { }}
        >
          {t("buttons.secondary")}
        </Button>--
        <Button
          type="primary"
          onClick={() => { }}
          startIcon={<Add />}
        >
          {t("buttons.add customer")}
        </Button>--
        <Button
          type="accordian"
          onClick={() => { }}
          startIcon={<DriveEtaOutlinedIcon />}
        >
          20
        </Button>--
        <Button
          type="accordian"
          className="active"
          onClick={() => { }}
          startIcon={<LocationOnOutlinedIcon />}
        >
          20
        </Button>--
        <Button
          type="accordian"
          disabled
          onClick={() => { }}
          startIcon={<InvertColorsOutlinedIcon />}
        >
          20
        </Button>--
        <Button
          type="accordian"
          className="empty"
          onClick={() => { }}
          startIcon={<CreditCardOutlinedIcon />}
        >
          0
        </Button>--
        <Button
          type="accordian"
          onClick={() => { }}
          startIcon={<MapOutlinedIcon />}
        >
          20
        </Button>--
        <Button
          type="accordian"
          onClick={() => { }}
          startIcon={<DescriptionOutlinedIcon />}
        >
          20
        </Button>--
        <Button
          type="accordian"
          onClick={() => { }}
          startIcon={<TrainOutlinedIcon />}
        >
          20
        </Button>--
        <Button
          type="showmore"
          onClick={() => { }}
        >
          {t("buttons.show more")}
        </Button>--
        <Button
          type="sortby"
          onClick={() => { }}
          startIcon={<ArrowDownwardOutlinedIcon />}
        >
          {t("buttons.sort by")}
        </Button>--
        <Button
          type="listmemu"
          onClick={() => { }}
          startIcon={<Icon><ArrowDownwardOutlinedIcon /></Icon>}
        >
        </Button>--
        <Button
          type="profile"
          onClick={() => { }}
          startIcon={<Icon><PermIdentityOutlinedIcon /></Icon>}
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