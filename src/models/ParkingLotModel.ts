import { useTranslation } from 'react-i18next';
import { headerObj } from '../components/UIComponents/DataGird/grid.component';

export interface SelectProps {
    label: string,
    value: string,
}


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

export default class ParkingLotModel {
    // General Information
    customerId: string;
    city: string;
    state: string;
    postalCode: string;
    // Payment and Wallet rules
    paymentType: SelectProps;
    paymentTerm: string;
    lotLevel: boolean;

    constructor() {
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
            { field: "walletStatus", label: "WALLET STATUS", type: 'text' },
            { field: "fuelStatus", label: "FUEL", type: 'text' },
            { field: "vehicles", label: "VEHICLES", type: 'button' },

        ];
    }

    ACTION_TYPES = {
        RAISE_REQ: 'raise req',
        DRIVER_DETAILS: 'driver details',
        OTHER_DETAIL: 'other details',
        CONTACT_DETAILS: 'contact details'
    };

    rowActions () {
        const { t } = useTranslation();
        return [
            {
                label: t("menus.data-grid-actions.raise a request"),
                action: this.ACTION_TYPES.RAISE_REQ
            },
            {
                label: t("menus.data-grid-actions.fee & driver details"),
                action: this.ACTION_TYPES.DRIVER_DETAILS
            },
            {
                label: t("menus.data-grid-actions.other details"),
                action: this.ACTION_TYPES.OTHER_DETAIL
            },
            {
                label: t("menus.data-grid-actions.contact details"),
                action: this.ACTION_TYPES.CONTACT_DETAILS
            }
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