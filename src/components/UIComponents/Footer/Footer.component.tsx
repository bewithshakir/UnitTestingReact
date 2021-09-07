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

import './Footer.style.scss';

export const Footer: React.FC = () => {
  const { themeType } = useTheme();
  const logoSrc = themeType === 'UK' ? logoOne : logoTwo;

  return (
    <div className={'footer'}>
      <div className={'content__buttons'}>
        <Button
          type={'save'}
          onClick={() => { }}
        >
          Save
        </Button>--
        <Button
          type={'edit'}
          onClick={() => { }}
          startIcon={<EditIcon />}
        >
          Edit
        </Button>--
        <Button
          type={'delete'}
          onClick={() => { }}
        >
          Delete
        </Button>--
        <Button
          type={'cancel'}
          onClick={() => { }}
        >
          Cancel
        </Button>--
        <Button
          type={'download'}
          onClick={() => { }}
          startIcon={<Download />}
        >
          Download (.csv format)
        </Button>----------
        <Button
          type="primary"
          onClick={() => { }}
        >
          Primary
        </Button>--
        <Button
          type="secondary"
          onClick={() => { }}
        >
          Secondary
        </Button>--
        <Button
          type="primary"
          onClick={() => { }}
          startIcon={<Add />}
        >
          Add Customer
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
          Show more
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