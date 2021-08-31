import React from 'react';
import logoOne from '../../../assets/images/Shell Taup logo.svg';
import logoTwo from '../../../assets/images/Shell Taup logo2.svg';
import { useTheme } from '../../../contexts/Theme/Theme.context';
import { Button } from '../Button/Button.component';

import './Footer.style.scss';

export const Footer: React.FC = () => {
  const { themeType } = useTheme();
  const logoSrc = themeType === 'UK' ? logoOne : logoTwo;

  return (
    <div className={'footer'}>
      <div className={'content__buttons'}>
        <Button
          type={'secondary'}
          onClick={() => { }}
        >
          Save
        </Button>
        <Button
          type={'secondary'}
          disabled
          onClick={() => { }}
        >
          Save
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