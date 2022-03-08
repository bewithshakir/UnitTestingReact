import { useTranslation } from 'react-i18next';
import { headerObj } from '../components/UIComponents/DataGird/grid.component';
import { ParkingLotIcon, ExportIcon } from '../assets/icons';
import { IDynamicFilterProps } from '../components/UIComponents/RightInfoPanel/DynamicFilterContent.component';


export interface SelectProps {
    label: string,
    value: string,
}

export default class UserModel {
    userGroup: SelectProps;
    email: string;
    // jenrin user's fetched data
    userId: string;
    userName: string;
    phone: string;
    customerId: string;
    userAccessLevel: string;
    constructor() {
        this.userGroup = { label: '', value: '' };
        this.email = '';

        this.userId = '';
        this.userName = '';
        this.phone = '';
        this.customerId = '';
        this.userAccessLevel = '';
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
                action: this.MASS_ACTION_TYPES.EXPORT,
                icon: ExportIcon,
            },
        ];
    }

    FilterByFields (): IDynamicFilterProps['fields'] {
        return (
            [
                { name: 'city', label: 'filterForm.city', fieldType: 'select', optionUrlKey: 'dspFilter', optionAPIResponseKey: 'cities', initialValue: [] },
                { name: 'state', label: 'filterForm.state', fieldType: 'select', optionUrlKey: 'dspFilter', optionAPIResponseKey: 'states', initialValue: [] },
                { name: 'zip', label: 'filterForm.zip', fieldType: 'select', optionUrlKey: 'dspFilter', optionAPIResponseKey: 'zipCodes', initialValue: [] },
            ]
        );
    }
}