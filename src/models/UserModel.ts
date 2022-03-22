import { useTranslation } from 'react-i18next';
import { headerObj } from '../components/UIComponents/DataGird/grid.component';
import { ParkingLotIcon, ExportIcon } from '../assets/icons';
import { IDynamicFilterProps } from '../components/UIComponents/RightInfoPanel/DynamicFilterContent.component';


export interface SelectProps {
    label: string,
    value: string,
}

export const ACTION_TYPES = {
    EDIT: 'edit',
};


export const MASS_ACTION_TYPES = {
    EXPORT: 'export',
};

export default class UserModel {
    userGroup: SelectProps;
    email: string;
    userId: string;
    userName: string;
    phone?: string;
    customerId: string;
    dsp: SelectProps;
    userAccessLevel: string;
    countryCd: string;

    constructor() {
        this.userGroup = { label: '', value: '' };
        this.email = '';
        this.userId = '';
        this.userName = '';
        this.phone = '';
        this.customerId = '';
        this.dsp = { label: '', value: '' };
        this.userAccessLevel = '';
        this.countryCd = '';
    }

    fieldsToDisplay (): headerObj[] {
        return [
            { field: "name", label: "DSP NAME", type: 'text', sortable: true },
            { field: "contactName", label: "CONTACT NAME", type: 'text' },
            { field: "email", label: "EMAIL", type: 'text' },
            { field: "address", label: "STREET ADDRES", type: 'text' },
            { field: "city", label: "CITY", type: 'text' },
            { field: "state", label: "STATE", type: 'text' },
            { field: "postalCode", label: "ZIP", type: 'text' },
            { field: "totalLotAssigned", label: "LOTS ASSIGNED", type: 'button', icon: ParkingLotIcon },
        ];
    }

    rowActions () {
        const { t } = useTranslation();
        return [
            {
                label: t("menus.data-grid-actions.edit"),
                action: ACTION_TYPES.EDIT
            },
        ];
    }

    massActions () {
        const { t } = useTranslation();
        return [
            {
                label: t("menus.actions.export data"),
                action: MASS_ACTION_TYPES.EXPORT,
                icon: ExportIcon,
            },
        ];
    }

    FilterByFields (): IDynamicFilterProps['fields'] {
        return (
            [
                { name: 'date', label: 'date', fieldType: 'dateRange', initialValue: [null, null] },
                { name: 'state', label: 'filterForm.userGroup', fieldType: 'select', optionUrlKey: 'dspFilter', optionAPIResponseKey: 'states', initialValue: [] },
            ]
        );
    }
}