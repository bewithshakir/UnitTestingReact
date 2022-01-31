import { useTheme } from '../contexts/Theme/Theme.context';
import {
    YellowFuelIcon, RedFuelIcon, GreenFuelIcon, NavyBlueFuelIcon, ParrotGreenFuelIcon,
    PurpleFuelIcon, SkyBlueFuelIcon, BrownFuelIcon, OrangeFuelIcon, AquaFuelIcon
} from '../assets/icons';

export const maskPhoneNumber = (phNumber: string) => {
    const maskedPh = phNumber.match(/(\d{3})(\d{3})(\d{4})/);
    return maskedPh ? "(" + maskedPh[1] + ") " + maskedPh[2] + "-" + maskedPh[3] : phNumber;
};

export const formatFileSizeUnit = (sizeInBytes: number, decimals = 2) => {
    if (sizeInBytes === 0) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizeNames = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(sizeInBytes) / Math.log(k));
    let size:number|string = parseFloat((sizeInBytes / Math.pow(k, i)).toFixed(dm));
    if(size>=24.5 && size<25){
        size = size.toFixed(0);
    }
    return size + sizeNames[i];
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