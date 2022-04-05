import { useTranslation } from 'react-i18next';
import { headerObj } from '../components/UIComponents/DataGird/grid.component';
import { IDynamicFilterProps } from '../components/UIComponents/RightInfoPanel/DynamicFilterContent.component';

export const ACTION_TYPES = {
    EDIT: 'edit',
    DELETE: 'delete'
};

export default class UsersModel {
    userName: string;
    customerId: string;
    customerName: string;
    email: string;
    phone: string;
    userGroup: string;
    dspName: string;
    dateAdded: string;
    uniqueId: string;

    constructor() {
        this.userName = '';
        this.customerName = '';
        this.customerId = '';
        this.email = '';
        this.phone =  '';
        this.userGroup = '';
        this.dspName = '';
        this.dateAdded = '';
        this.uniqueId = '';
    }

    fieldsToDisplay (): headerObj[] {
        return [
            { field: "userName", label: "USER NAME", type: 'text' },
            { field: "customerId", label: "CUSTOMER ID", type: 'text' },
            { field: "customerName", label: "CUSTOMER NAME", type: 'text' },
            { field: "contactInfo", label: "CONTACT INFO", type: 'multi' },
            { field: "userGroupName", label: "USER GROUP", type: 'text' },
            { field: "dspName", label: "DSP NAME", type: 'text' },
            { field: "createdDtm", label: "DATE ADDED", type: 'text' },
            { field: "shellDigitalAccountId", label: "UNIQUE ID", type: 'text' },
        ];
    }
    getSortByOptions () {
        return [
            "user.sortBy.users_atoz",
            "user.sortBy.users_ztoa",
        ];
    }

    dataModel (data: any) {
        return data.map((obj: any) => {
            return ({
                ...obj,
                userName: `${obj.firstNm} ${obj.lastNm}`,
                userGroupName: obj.userGroup.map((item:any) => {
                    return item.userGroupNm;
                }),
                contactInfo: [obj.email,obj.phone],
                createdDtm: new Date(obj.createdDtm).toLocaleDateString('en-US',{ year: 'numeric', month: '2-digit', day: '2-digit' }),
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
            {
                label: t("menus.data-grid-actions.delete"),
                action: ACTION_TYPES.DELETE
            },
        ];
    }

    FilterByFields (): IDynamicFilterProps['fields'] {
        return (
            [
                { name: 'customerName', label: 'filterForm.customerName', fieldType: 'select', optionUrlKey: 'custUserFilter', optionAPIResponseKey: 'customers', initialValue: [] },
                { name: 'userGroupName', label: 'filterForm.userGroup', fieldType: 'select', optionUrlKey: 'custUserFilter', optionAPIResponseKey: 'userGroups', initialValue: [] },
            ]
        );
    }
}
