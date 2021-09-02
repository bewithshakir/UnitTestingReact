import React from 'react';
import logoOne from '../../../assets/images/Shell Taup logo.svg';
import logoTwo from '../../../assets/images/Shell Taup logo2.svg';
import { useTheme } from '../../../contexts/Theme/Theme.context';
import { Button } from '../Button/Button.component';
import EditIcon from '@material-ui/icons/Edit';

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
        </Button>
        <Button
          type={'save'}
          disabled
          onClick={() => { }}
        >
          Save
        </Button>
        <Button
          type={'edit'}
          onClick={() => { }}
          startIcon={<EditIcon />}
        >
          Edit
        </Button>
        <Button
          type={'delete'}
          onClick={() => { }}
        >
          Delete
        </Button>
      </div>
      <img
        className={'footer__logo'}
        src={logoSrc}
        alt={'logo'}
      />
    </div>
  )
}