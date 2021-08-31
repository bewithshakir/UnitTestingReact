import { Color } from './color.palette';

export type ThemeType = 'UK' | 'USA';

export interface Theme {
  //  Main Colors
  '--Primary': Color;
  '--Secondary': Color;
  '--Tertiary': Color;

  // Primary Background Colors
  '--Primary-Background': Color;
  '--Secondary-Background': Color;

  // Buttons 
  '--Save-Btn': Color;
  '--Edit-Btn': Color;
  '--Delete-Btn': Color;
  '--Cancel-Btn': Color;
  '--Download-Btn': Color;
  '--Blue-Btn': Color;

  // Fuel Colors
  '--Regular-Fuel-Color': Color;
  '--Premium-Fuel-Color': Color;
  '--Diesel-Fuel-Color': Color;
  '--DEF-Fuel-Color': Color;
  '--Bio-Diesel-Fuel-Color': Color;
  '--other-Fuel-Color-1': Color;
  '--other-Fuel-Color-2': Color;
  '--other-Fuel-Color-3': Color;
  '--other-Fuel-Color-4': Color;
  '--other-Fuel-Color-5': Color;

  // Other Colors
  '--White': Color;
  '--Black': Color;
  '--Darkgray': Color;
  '--Gray': Color;
  '--Lightergray': Color;
  '--Lightgray': Color;
  '--Lightgray_2': Color;
  '--Lightgray_3': Color;
  '--Lightgray_4': Color;
}
