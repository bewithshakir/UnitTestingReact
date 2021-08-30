import React from 'react';
import logoOne from '../../../assets/images/Shell Taup logo.svg';
import logoTwo from '../../../assets/images/Shell Taup logo2.svg';
import { useTheme } from '../../../contexts/Theme/Theme.context';

import './Footer.style.scss';

export const Footer: React.FC = () => {
  const { themeType } = useTheme();
  const logoSrc = themeType === 'UK' ? logoOne : logoTwo;

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