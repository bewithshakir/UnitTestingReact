import { useTranslation } from 'react-i18next';
import { headerObj } from '../components/UIComponents/DataGird/grid.component';
import { ParkingLotIcon } from '../assets/icons';


export interface SelectProps {
    label: string,
    value: string,
}

export default class DSPModel {
    // General Information
    dspName: string;
    contactNm: string;
    email: string;
    addressLine1: string;
    addressLine2: string;



    customerId: string;
    city: string;
    state: string;
    postalCode: string;
    lotsAssigned: string;

    constructor() {
        this.dspName = '';
        this.contactNm = '';
        this.email = '';
        this.addressLine1 = '';
        this.addressLine2 = '';

        this.customerId = '';
        this.city = '';
        this.state = '';
        this.postalCode = '';
        this.lotsAssigned = '';
    }

    fieldsToDisplay (): headerObj[] {
        return [
            { field: "dspName", label: "DSP NAME", type: 'text', sortable: true },
            { field: "contactNm", label: "CONTACT NAME", type: 'text' },
            { field: "email", label: "EMAIL", type: 'text' },
            { field: "streetAddress", label: "STREET ADDRES", type: 'text' },
            { field: "city", label: "CITY", type: 'text' },
            { field: "state", label: "STATE", type: 'text' },
            { field: "zip", label: "ZIP", type: 'text' },
            { field: "lotsAssigned", label: "LOTS ASSIGNED", type: 'button', icon: ParkingLotIcon },
        ];
    }

    ACTION_TYPES = {
        EDIT: 'edit',
    };

    rowActions () {
        const { t } = useTranslation();
        return [
            {
                label: t("menus.data-grid-actions.edit"),
                action: this.ACTION_TYPES.EDIT
            },
        ];
    }

    MASS_ACTION_TYPES = {
        EXPORT: 'export',
    };

    massActions () {
        const { t } = useTranslation();
        return [
            {
                label: t("menus.actions.export data"),
                icon: "ExportIcon",
                action: this.MASS_ACTION_TYPES.EXPORT
            },
        ];
    }
}