import { Color } from './color.palette';
import { ThemeType, Theme } from './Theme.model';

export const THEMES: Record<ThemeType, Theme> = {
  USA: {
    //  Main Colors
    '--Primary': Color.primaryDark,
    '--Secondary': Color.secondaryDark,
    '--Tertiary': Color.tertiaryDark,

    // Primary Background Colors
    '--Primary-Background': Color.universalWhite,
    '--Secondary-Background': Color.universalLightgray,

    // Buttons
    '--Save-Btn': Color.secondaryDark,
    '--Edit-Btn': Color.secondaryDark,
    '--Delete-Btn': Color.tertiaryDark,
    '--Cancel-Btn': Color.universalWhite,
    '--Download-Btn': Color.universalGray,
    '--Blue-Btn': Color.primaryDark,

    // Fuel Colors
    '--Regular-Fuel-Color': Color.secondaryDark,
    '--Premium-Fuel-Color': Color.yellowgreen,
    '--Diesel-Fuel-Color': Color.orange,
    '--DEF-Fuel-Color': Color.shellred,
    '--Bio-Diesel-Fuel-Color': Color.bondiblue,
    '--other-Fuel-Color-1': Color.skyblue,
    '--other-Fuel-Color-2': Color.green,
    '--other-Fuel-Color-3': Color.purple,
    '--other-Fuel-Color-4': Color.primaryDark,
    '--other-Fuel-Color-5': Color.brown,

    // Other Colors
    '--White': Color.universalWhite,
    '--Black': Color.universalBlack,
    '--Darkgray': Color.universalDarkgray,
    '--Gray': Color.universalGray,
    '--Lightergray': Color.universalLightergray,
    '--Lightgray': Color.universalLightgray,
    '--Lightgray_2': Color.universalLightgray2,
    '--Lightgray_3': Color.universalLightgray3,
    '--Lightgray_4': Color.universalLightgray4,
  },
  UK: {
    //  Main Colors
    '--Primary': Color.tertiaryDark,
    '--Secondary': Color.bondiblue,
    '--Tertiary': Color.tertiaryDark,

    // Primary Background Colors
    '--Primary-Background': Color.universalGray,
    '--Secondary-Background': Color.universalLightgray,


    // Buttons
    '--Save-Btn': Color.bondiblue,
    '--Edit-Btn': Color.secondaryDark,
    '--Delete-Btn': Color.tertiaryDark,
    '--Cancel-Btn': Color.bondiblue,
    '--Download-Btn': Color.universalGray,
    '--Blue-Btn': Color.tertiaryDark,


    // Fuel Colors
    '--Regular-Fuel-Color': Color.secondaryDark,
    '--Premium-Fuel-Color': Color.yellowgreen,
    '--Diesel-Fuel-Color': Color.orange,
    '--DEF-Fuel-Color': Color.shellred,
    '--Bio-Diesel-Fuel-Color': Color.bondiblue,
    '--other-Fuel-Color-1': Color.skyblue,
    '--other-Fuel-Color-2': Color.green,
    '--other-Fuel-Color-3': Color.purple,
    '--other-Fuel-Color-4': Color.primaryDark,
    '--other-Fuel-Color-5': Color.brown,

    // Other Colors
    '--White': Color.universalWhite,
    '--Black': Color.universalBlack,
    '--Darkgray': Color.universalDarkgray,
    '--Gray': Color.universalGray,
    '--Lightergray': Color.universalLightergray,
    '--Lightgray': Color.universalLightgray,
    '--Lightgray_2': Color.universalLightgray2,
    '--Lightgray_3': Color.universalLightgray3,
    '--Lightgray_4': Color.universalLightgray4,
  }
};
