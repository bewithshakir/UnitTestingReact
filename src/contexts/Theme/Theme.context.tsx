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

  function getInitialTheme() {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme
      ? JSON.parse(savedTheme) : 'USA';
  }
  useEffect(() => {
    localStorage.setItem('theme', JSON.stringify(currentTheme))
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