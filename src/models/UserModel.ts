import { useTranslation } from 'react-i18next';
import { headerObj } from '../components/UIComponents/DataGird/grid.component';
import { ExportIcon } from '../assets/icons';
import { IDynamicFilterProps } from '../components/UIComponents/RightInfoPanel/DynamicFilterContent.component';


export interface SelectProps {
    label: string,
    value: string,
    type?: string,
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
        this.userGroup = { label: '', value: '', type: '' };
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
            { field: "fullName", label: "USER NAME", type: 'text', sortable: true },
            { field: "customerInfo", label: "CONTACT INFO", type: 'multi' },
            { field: "userGroupList", label: "USER GROUP", type: 'text' },
            { field: "createdDtm", label: "DATE ADDED", type: 'text' },
            { field: "shellDigitalAccountId", label: "UNIQUE ID", type: 'text' }
        ];
    }

    dataModel (data: any) {
        return data.map((obj: any) => {
            return ({
                ...obj,
                fullName: obj.firstNm + ' ' + obj.lastNm,
                customerInfo: [obj.email, obj.phone],
                userGroupList: obj.userGroup.map((item: any) => {
                    return item.userGroupNm;
                }),
                createdDtm: new Date(obj.createdDtm).toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }),
                shellDigitalAccountId: obj.shellDigitalAccountId
            });
        });
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
                { name: 'city', label: 'filterForm.city', fieldType: 'select', optionUrlKey: 'dspFilter', optionAPIResponseKey: 'cities', initialValue: [] },
                { name: 'state', label: 'filterForm.state', fieldType: 'select', optionUrlKey: 'dspFilter', optionAPIResponseKey: 'states', initialValue: [] },
                { name: 'zip', label: 'filterForm.zip', fieldType: 'select', optionUrlKey: 'dspFilter', optionAPIResponseKey: 'zipCodes', initialValue: [] },
            ]
        );
    }
}