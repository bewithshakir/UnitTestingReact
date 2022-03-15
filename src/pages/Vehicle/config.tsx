import { IDynamicFilterProps } from "../../components/UIComponents/RightInfoPanel/DynamicFilterContent.component";

import { YellowFuelIcon, RedFuelIcon, GreenFuelIcon, PositiveCricleIcon, AttentionWalletIcon, ExpireWalletIcon } from '../../assets/icons';

export const sortByOptions = [
    "parkingLot.sortBy.atoz",
    "parkingLot.sortBy.ztoa"
];

export const all = { label: 'All', value: 'all' };

export const addLotHeaderConfig = [
    {
        label: "Lot Details",
        index: 0,
        containsValue: false,
    },
    {
        label: "Products",
        index: 1,
        containsValue: true,
        value: 0
    },
    {
        label: "Fee Details",
        containsValue: false,
        index: 2,
    },
    {
        label: "Items",
        index: 3,
        containsValue: true,
        value: 0
    },
    {
        label: "Wallets",
        index: 4,
        containsValue: true,
        value: 0
    }
];

export const formStatusObj = {
    success: {
        message: 'Lot Name is successfully added and Please add other details.',
        type: 'Success',
    },
    editsuccess: {
        message: 'Lot Data is updated successfully.',
        type: 'Success',
    },
    error: {
        message: 'Something went wrong. Please try again.',
        type: 'Error',
    },
    orderScheduleError: {
        message: 'Please provide the details for available schedule',
        type: 'Error'
    }
};

export const formStatusObjFeeDetails = {
    success: {
        message: 'Fee details are successfully added',
        type: 'Success',
    },
    editsuccess: {
        message: 'Fee details are updated successfully.',
        type: 'Success',
    },
    error: {
        message: 'Something went wrong. Please try again.',
        type: 'Error',
    }
};

export const daysToDeliver = (dayType: string, daysOfWeek: { data?: { data?: [] } }) => {
    const other = (daysOfWeek?.data?.data || []).map((day: any) => ({ label: day.dayOfWeekNm, value: day.dayOfWeekCd }));
    const weekends = other.filter(day => ['saturday', 'sunday'].includes(String(day.label).toLowerCase()));
    return ({
        'weekends': weekends,
        'other': other
    }[String(dayType).toLowerCase()] || other);
};

export const lotHeaderBoxSx = { width: '100%', marginTop: '-2.5em' };
export const lotHeaderInnerBoxSx = { borderBottom: 1, borderColor: 'divider' };

export const getCountry = () => {
    const savedTheme = localStorage.getItem('theme');
    const defaultCountry = "United States";
    if (savedTheme) {
        switch (JSON.parse(savedTheme)) {
            case "USA":
                return "United States";
            case "UK":
                return "UK";
            default:
                return defaultCountry;
        }
    }
    return defaultCountry;
};

export const filterByFields: IDynamicFilterProps['fields'] = [
    { name: 'date', label: 'Date', fieldType: 'dateRange', initialValue: [null, null] },
    {
        name: 'state',
        label: 'parkingLot.filter.state',
        fieldType: 'select',
        optionUrlKey: 'parkingLotFilter',
        optionAPIResponseKey: 'states',
        initialValue: []
    },
    {
        name: 'city',
        label: 'parkingLot.filter.city',
        fieldType: 'select',
        optionUrlKey: 'parkingLotFilter',
        optionAPIResponseKey: 'cities',
        initialValue: []
    },
    {
        name: 'postal',
        label: 'parkingLot.filter.zip',
        fieldType: 'select',
        optionUrlKey: 'parkingLotFilter',
        optionAPIResponseKey: 'zipcode',
        initialValue: []
    },
    {
        name: 'walletStatus',
        label: 'parkingLot.filter.wallet status',
        fieldType: 'select', options: [
            { label: 'Active', value: 'Active', icon: <PositiveCricleIcon /> },
            { label: 'Expire', value: 'Expire', icon: <ExpireWalletIcon /> },
            { label: 'Attention', value: 'Attention', icon: <AttentionWalletIcon /> }
        ],
        initialValue: []
    },
    {
        name: 'fuelType',
        label: 'parkingLot.filter.fuel type',
        fieldType: 'select',
        options: [
            { label: 'Regular', value: 'Regular', icon: <YellowFuelIcon /> },
            { label: 'Premium', value: 'Premium', icon: <RedFuelIcon /> },
            { label: 'Diesel', value: 'Diesel', icon: <GreenFuelIcon /> },
        ],
        initialValue: null
    },
];