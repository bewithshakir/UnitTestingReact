import React, { Dispatch, SetStateAction, useEffect } from 'react';
import { THEMES } from './Theme.config';
import { ThemeType, Theme } from './Theme.model';

interface ThemeContextProps {
  themeType: ThemeType;
  theme: Theme,
  setCurrentTheme: Dispatch<SetStateAction<ThemeType>>
}

export const ThemeContext = React.createContext<ThemeContextProps>({
  themeType: 'USA',
  theme: THEMES['USA'],
} as ThemeContextProps);

export const ThemeProvider: React.FC = ({ children }) => {
  const [currentTheme, setCurrentTheme] = React.useState<ThemeType>(getInitialTheme);

  function getInitialTheme () {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme
      ? JSON.parse(savedTheme) : 'USA';
  }

  function generateStyle (themeVar: any) {
    var css = ':root' + JSON.stringify(themeVar).replace(/['"]+/g, '').replace(/[,]+/g, ';')

    var head = document.head || document.getElementsByTagName('head')[0],
      style: any = document.createElement('style');

    head.appendChild(style);

    if (style.styleSheet) {
      // This is required for IE8 and below.
      style.styleSheet.cssText = css;
    } else {
      style.appendChild(document.createTextNode(css));
    }
  }

  useEffect(() => {
    localStorage.setItem('theme', JSON.stringify(currentTheme));
    generateStyle(THEMES[currentTheme])

  }, [currentTheme])

  return (
    <ThemeContext.Provider value={{
      themeType: currentTheme,
      theme: THEMES[currentTheme],
      setCurrentTheme,
    }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => React.useContext(ThemeContext);