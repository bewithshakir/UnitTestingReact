import { Color } from './color.palette';

export type ThemeType = 'UK' | 'USA';

export interface Theme {
  '--primary-btn-background': Color,
  '--primary-btn-color': Color,
  '--secondary-btn-background': Color,
  '--secondary-btn-color': Color,
  '--primary': Color;
  '--secondary': Color;
  '--background': Color;
  '--white': Color;
}
