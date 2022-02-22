import { useTranslation } from 'react-i18next';
import { headerObj } from '../components/UIComponents/DataGird/grid.component';
import { IDynamicFilterProps } from '../components/UIComponents/RightInfoPanel/DynamicFilterContent.component';


export default class TruckParkingLotModel {
    parkingLocationNm: string;
    addressLine1: string;
    addressLine2: string;
    stateNm: string;
    cityNm: string;
    postalCd: string;
    countryCode: string;

    constructor() {
        this.parkingLocationNm = '';
        this.addressLine1 = '';
        this.addressLine2 = '';
        this.stateNm = '';
        this.cityNm = '';
        this.postalCd = '';
        this.countryCode= '';
    }  

    fieldsToDisplay (): headerObj[] {
        return [
            { field: "name", label: "TRUCK PARKING LOT NAME", type: 'text', width: '350px' },
            { field: "address", label: "ADDRESS", type: 'text'},
            { field: "state", label: "STATE", type: 'text'},
            { field: "city", label: "CITY", type: 'text'},
            { field: "postalCode", label: "POSTAL CODE", type: 'text'}
        ];
    }

    rowActions() {
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

    ACTION_TYPES = {
        EDIT: 'edit',
        DELETE: 'delete',
    };

    MASS_ACTION_TYPES = {
        IMPORT: 'import',
        EXPORT: 'export',
        DELETE: 'remove',
    };

    massActions() {
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

    FilterByFields(): IDynamicFilterProps['fields'] {
        return (
            [
                { name: 'city', label: 'customer-filter-panel.city', fieldType: 'select', optionUrlKey: 'customerFilter', optionAPIResponseKey: 'cities', initialValue: [] },
                { name: 'state', label: 'customer-filter-panel.state', fieldType: 'select', optionUrlKey: 'customerFilter', optionAPIResponseKey: 'states', initialValue: [] },
            ]
        )
    }
}