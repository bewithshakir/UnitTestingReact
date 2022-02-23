import { useTheme } from '../contexts/Theme/Theme.context';
import Decimal from 'decimal.js';

import {
    YellowFuelIcon, RedFuelIcon, GreenFuelIcon, NavyBlueFuelIcon, ParrotGreenFuelIcon,
    PurpleFuelIcon, SkyBlueFuelIcon, BrownFuelIcon, OrangeFuelIcon, AquaFuelIcon
} from '../assets/icons';

type fileFormatSize = 'Bytes'|'KB'|'MB';
export const maskPhoneNumber = (phNumber: string) => {
    const maskedPh = phNumber.match(/(\d{3})(\d{3})(\d{4})/);
    return maskedPh ? "(" + maskedPh[1] + ") " + maskedPh[2] + "-" + maskedPh[3] : phNumber;
};

export const formatFileSizeUnit = (sizeInBytes: number, fileSizeUnit: fileFormatSize = 'MB') => {
    let coversionParam = null ; 
    switch(fileSizeUnit) {
        case 'Bytes' :
            coversionParam = 1;
          break;
        case 'KB':
            coversionParam = 1000;
          break;
          case 'MB':
            coversionParam = 1000*1000;
          break;
        default:
            coversionParam = 1;
      }
      return parseFloat((sizeInBytes/(coversionParam)).toFixed(2)) + ` ${fileSizeUnit}`;
};

export const getCheckBoxDisabledByPaymentType = (value: string) => {
    return {
        'WEX': false,
        'Invoice': true,
        'Internal': true,
        'Voyager': true,
        'default': true,
    }[value || 'default'];
};

export const getSeachedDataTotalCount = (data: { pages: [{ data: { pagination: { totalCount: number } } }] }, msg: string[]) => {
    const totalCount = data?.pages[0]?.data?.pagination?.totalCount || 0;
    return (`${totalCount} ${totalCount > 1 ? msg[1] : msg[0]}`);
};


export const getCurrentAppCountry = () => {
    const { themeType } = useTheme();
    return themeType;
};

export const isCurrentAppCountryUSA = () => {
    return getCurrentAppCountry() === "USA";
};


export function getProductIcon(fuelStatus: string) {
    return ({
        "Yellow": YellowFuelIcon,
        "Red": RedFuelIcon,
        "Green": GreenFuelIcon,
        "Navy Blue": NavyBlueFuelIcon,
        "Parrot Green": ParrotGreenFuelIcon,
        "Sky Blue": SkyBlueFuelIcon,
        "Purple": PurpleFuelIcon,
        "Brown": BrownFuelIcon,
        "Orange": OrangeFuelIcon,
        "Aqua": AquaFuelIcon,
    }[fuelStatus] || YellowFuelIcon);
}

export function getLegendFontColor(fuelStatus: string) {
    const { theme } = useTheme();
    return ({
        "Yellow": theme["--Darkgray"],
        "Red": theme["--White"],
        "Green": theme["--White"],
        "Navy Blue": theme["--White"],
        "Parrot Green": theme["--Darkgray"],
        "Sky Blue": theme["--White"],
        "Purple": theme["--White"],
        "Brown": theme["--White"],
        "Orange": theme["--Darkgray"],
        "Aqua": theme["--Darkgray"],
    }[fuelStatus]);
}

export function getUploadedBy() {
    return 'Dinesh Chakkravarthi';
}

export function getUploadedIn(url: string) {
    if (url.includes('addCustomer') || url.includes('viewCustomer')) {
        return 'Add Customer';
    }
    return 'Attachments';
}

export function capitalizeFirstLetter(str: string) {
    return str && str.charAt(0).toUpperCase() + str.substring(1);
}

export function calculateOPISTotalPriceWithTaxes(basePriceAmt: number, addedPriceAmt: number, discountPriceAmt: number, finalRate: number, finalCPGAmount: number){
    const precision = 4;
    if(basePriceAmt){
      const basePriceFinal = new Decimal(Number(basePriceAmt) || 0);
       const sellingPrice = new Decimal(Number(basePriceFinal.plus(Number(addedPriceAmt) || 0).minus(Number(discountPriceAmt) || 0)));
       const rateComponentFinal = sellingPrice.mul(Number(finalRate));
       const totalPrice = sellingPrice.plus(Number(rateComponentFinal) || 0).plus(Number(finalCPGAmount) || 0);
       return totalPrice.toFixed(precision, Decimal.ROUND_DOWN);
    }else{
        return 0.0000;
    }
}

export function totalPricePerGallon(manualPriceAmt: number | string, addedPriceAmt: number | string, discountPriceAmt: number | string, precision: number) {
    const x = new Decimal(Number(manualPriceAmt)||0);
    const result = x.plus(Number(addedPriceAmt)||0).minus(Number(discountPriceAmt)||0);
    return result.toFixed(precision, Decimal.ROUND_DOWN);
}