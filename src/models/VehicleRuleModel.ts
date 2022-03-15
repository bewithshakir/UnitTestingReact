/* eslint-disable no-console */
import { useTranslation } from 'react-i18next';
import { headerObj } from '../components/UIComponents/DataGird/grid.component';
import { ExpireWalletIcon, PositiveCricleIcon } from './../assets/icons';

export interface SelectPropsInt {
    label: string,
    value: string,
}

export interface VehicleRule {
    city: string,
    state: string,
    product: [],
    addressLine1: string,
    countryCd: string,
    year: string,
    status: SelectPropsInt
}

export default class VehicleRuleModel {
    // General Information
    city: string;
    state: string;
    product: [];
    addressLine1: string;
    countryCd: string;
    year: string;
    status: SelectPropsInt;

    constructor() {
        this.city = '';
        this.state = '';
        this.product = [];
        this.addressLine1 = '';
        this.countryCd = 'us';
        this.status = { label: '', value: '' };
        this.year = '';
    }

    dataModel(data: any) {
        return data.map((obj: any) => (
            {
                ...obj,
                fuelStatus: this.getProductListData(obj)
            }
        ));
    }


    getProductListData(obj: any) {
        return obj.vehicleRuleProducts.map((item: any) => item.productInfo);

    }


    fieldsToDisplay(): headerObj[] {
        return [
            { field: "state", label: "STATE", type: 'text' },
            { field: "city", label: "CITY", type: 'text' },
            { field: "yearNo", label: "YEAR", type: 'text' },
            { field: "fuelStatus", label: "PRODUCTS", type: 'icons', width: "200px" },
            {
                field: "activeInactiveInd",
                label: "STATUS",
                type: 'status',
                align: 'left',
                showIconLast: false,
                fieldOptions: [
                    {
                        value: "Y",
                        displayValue: "Enabled",
                        icon: PositiveCricleIcon,
                    },
                    {
                        value: "N",
                        displayValue: "Disabled",
                        icon: ExpireWalletIcon
                    }
                ]
            }
        ];
    }

    ACTION_TYPES = {
        EDIT: 'edit',
        DELETE: 'delete',
    };

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
}