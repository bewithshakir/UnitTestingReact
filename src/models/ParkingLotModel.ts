import { useTranslation } from 'react-i18next';
import { headerObj } from '../components/UIComponents/DataGird/grid.component';
import DriveEtaOutlinedIcon from '@material-ui/icons/DriveEtaOutlined';



export interface ParkingLot {
    // General Information
    customerId: string,
    city: string,
    state: string,
    postalCode: string,
    // Payment and Wallet rules
    paymentType: SelectProps,
    paymentTerm: string,
    lotLevel: boolean,
}

export interface SelectProps {
    label: string,
    value: string,
}

type mutiSelectItem = {
    label: string,
    value: string | number
}

export interface lotContact {
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber: string,
}

export interface orderSchDel {
    fromDate: moment.Moment| string | null,
    toDate: moment.Moment| string | null,
    startTime: string,
    endTime: string,
    productDelDays: Array<mutiSelectItem>
}

export interface AddParkingLotForm {
    lotName:string;
    lotId: string;
    addressLine1: string;
    addressLine2: string;
    city: string;
    state: string;
    postalCode: string;
    county: string;
    timeZone:SelectProps;
    // country: string;
    jurisdictionId: string;
    productDelFreq: SelectProps;
    orderScheduleDel: orderSchDel[];
    locationContact: lotContact[];
}

export const addLotFormInitialValues = {
        lotName : '',
        lotId : '',
        addressLine1 : '',
        addressLine2 : '',
        city : '',
        state : '',
        postalCode : '',
        county : '',
        timeZone : { label: '', value: '' },
        // country : '',
        jurisdictionId : '',
        productDelFreq : { label: '', value: '' },
        orderScheduleDel : [{
            fromDate: '',
            toDate: '',
            startTime: '',
            endTime: '',
            productDelDays: []
        }],
        locationContact : [{
            firstName: '',
            lastName: '',
            email: '',
            phoneNumber: '',
        }],
};



export default class ParkingLotModel {
    // General Information
    lotName:string;
    lotId: string;
    addressLine1: string;
    addressLine2: string;
    county: string;
    timeZone:SelectProps;
    // country: string;
    jurisdictionId: string;
    productDelFreq: SelectProps;
    orderScheduleDel: orderSchDel[];
    locationContact: lotContact[];



    customerId: string;
    city: string;
    state: string;
    postalCode: string;
    // Payment and Wallet rules
    paymentType: SelectProps;
    paymentTerm: string;
    lotLevel: boolean;

    constructor() {
        this.lotName = '';
        this.lotId = '';
        this.addressLine1 = '';
        this.addressLine2 = '';
        this.county = '';
        this.timeZone = { label: '', value: '' };
        // this.country = '';
        this.jurisdictionId = '';
        this.productDelFreq = { label: '', value: '' };
        this.orderScheduleDel = [{
            fromDate: '',
            toDate: '',
            startTime: '',
            endTime: '',
            productDelDays: []
        }];
        this.locationContact = [{
            firstName: '',
            lastName: '',
            email: '',
            phoneNumber: '',
        }];


        this.customerId = '';
        this.city = '';
        this.state = '';
        this.postalCode = '';
        this.paymentType = { label: '', value: '' };
        this.paymentTerm = '';
        this.lotLevel = false;
    }

    fieldsToDisplay (): headerObj[] {
        return [
            { field: "deliveryLocationNm", label: "LOT NAME", type: 'text' },
            { field: "streetAddress", label: "STREET ADDRESS", type: 'text' },
            { field: "cityNm", label: "CITY", type: 'text' },
            { field: "stateNm", label: "STATE", type: 'text' },
            { field: "postalCd", label: "ZIP", type: 'text' },
            { field: "rackUpdate", label: "RACK UPDATE", type: 'text' },
            { field: "walletStatus", label: "WALLET", type: 'icon', align: 'center' },
            { field: "fuelStatus", label: "FUEL", type: 'icons' },
            { field: "vehicles", label: "VEHICLES", type: 'button', icon: DriveEtaOutlinedIcon },
        ];
    }

    ACTION_TYPES = {
        EDIT: 'edit',
        DELETE: 'delete',
    };

    rowActions () {
        const { t } = useTranslation();
        return [
            {
                label: t("menus.data-grid-actions.edit"),
                action: this.ACTION_TYPES.EDIT
            },
            {
                label: t("menus.data-grid-actions.delete"),
                action: this.ACTION_TYPES.DELETE
            },
        ];
    }

    MASS_ACTION_TYPES = {
        IMPORT: 'import',
        EXPORT: 'export',
        DELETE: 'remove',
    };

    massActions () {
        const { t } = useTranslation();
        return [
            {
                label: t("menus.actions.import data"),
                icon: "ImportIcon",

                action: this.MASS_ACTION_TYPES.IMPORT
            },
            {
                label: t("menus.actions.export data"),
                icon: "ExportIcon",
                action: this.MASS_ACTION_TYPES.EXPORT
            },
            {
                label: t("menus.actions.delete"),
                icon: "DeleteIcon",
                action: this.MASS_ACTION_TYPES.DELETE
            },
        ];
    }
}