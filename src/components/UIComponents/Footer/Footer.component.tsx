import React from 'react';
import logoWhite from '../../../assets/images/logo_white.svg';
import logoViolet from '../../../assets/images/logo_violet.svg';
import { useTheme } from '../../../contexts/Theme/Theme.context';

import './Footer.style.scss';

export const Footer: React.FC = () => {
  const { themeType } = useTheme();
  const logoSrc = themeType === 'UK' ? logoWhite : logoViolet;

  return (
    <div className={'footer'}>
      <img
        className={'footer__logo'}
        src={logoSrc}
        alt={'logo'}
      />
    </div>
  )
}