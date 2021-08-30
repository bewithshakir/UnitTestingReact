import { Color } from './color.palette';
import { ThemeType, Theme } from './Theme.model';

export const THEMES: Record<ThemeType, Theme> = {
  USA: {
    '--primary-btn-background': Color.primary_yellow,
    '--primary-btn-color': Color.black,
    '--secondary-btn-background': Color.dark_cerulean,
    '--secondary-btn-color': Color.primary_white,
    '--primary': Color.dark_cerulean,
    '--secondary': Color.primary_yellow,
    '--background': Color.primary_white,
    '--white': Color.primary_white,
  },
  UK: {
    '--primary-btn-background': Color.secondary_green,
    '--primary-btn-color': Color.primary_white,
    '--secondary-btn-background': Color.primary_red,
    '--secondary-btn-color': Color.primary_white,
    '--primary': Color.primary_red,
    '--secondary': Color.secondary_green,
    '--background': Color.lightgray_3,
    '--white': Color.primary_white,
  }
};
