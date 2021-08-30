import { Color } from '../../models/color.model';
import { ThemeType, Theme } from './Theme.model';

export const THEMES: Record<ThemeType, Theme> = {
  USA: {
    '--primary': Color.VIOLET,
    '--secondary': Color.DARK_VIOLET,
    '--background': Color.LIGHT_GRAY,
    '--white': Color.WHITE,
  },
  UK: {
    '--primary': Color.VIOLET,
    '--secondary': Color.WHITE,
    '--background': Color.DARK_VIOLET,
    '--white': Color.WHITE,
  }
};
