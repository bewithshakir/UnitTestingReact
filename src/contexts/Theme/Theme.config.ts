import { Color } from './color.pallate';
import { ThemeType, Theme } from './Theme.model';

export const THEMES: Record<ThemeType, Theme> = {
  USA: {
    '--primary-btn-background': Color.Supernova2,
    '--primary-btn-color': Color.Black,
    '--secondary-btn-background': Color.CongressBlue,
    '--secondary-btn-color': Color.White,
    '--primary': Color.CongressBlue,
    '--secondary': Color.Supernova,
    '--background': Color.White,
    '--white': Color.White,
  },
  UK: {
    '--primary-btn-background': Color.FunGreen,
    '--primary-btn-color': Color.White,
    '--secondary-btn-background': Color.AlizarinCrimson,
    '--secondary-btn-color': Color.White,
    '--primary': Color.AlizarinCrimson,
    '--secondary': Color.FunGreen,
    '--background': Color.Gallery,
    '--white': Color.White,
  }
};
