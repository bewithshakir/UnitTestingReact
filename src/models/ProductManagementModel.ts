import { useTranslation } from "react-i18next";
import { DeleteIcon, ExportIcon, ImportIcon } from "../assets/icons";

export interface SelectPropsInt {
    label: string,
    value: string,
}
export default class ProductManagementModel {
    countryCode?: string;
    productName: string;
    productType:  SelectPropsInt;
    productColor:  SelectPropsInt;
    productStatus: SelectPropsInt;
    manualPricing: string;
    productPricing: string;

    constructor() {
        this.countryCode = 'us'
        this.productName = '';
        this.productType = { label: '', value: '' };
        this.productColor = { label: '', value: '' };
        this.productStatus = { label: '', value: '' };
        this.manualPricing = '';
        this.productPricing = '';
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
                icon: ImportIcon,
                action: this.MASS_ACTION_TYPES.IMPORT
            },
            {
                label: t("menus.actions.export data"),
                icon: ExportIcon,
                action: this.MASS_ACTION_TYPES.EXPORT
            },
            {
                label: t("menus.actions.delete"),
                icon: DeleteIcon,
                action: this.MASS_ACTION_TYPES.DELETE
            },
        ];
    }

    ACTION_TYPES = {
        EDIT: 'edit',
        DELETE: 'delete',
        CONTACT_DETAILS: 'contact details'
    };

    rowActions () {
        const { t } = useTranslation();
        return [
            {
                label: t("menus.data-grid-actions.edit"),
                action: this.ACTION_TYPES.EDIT
            }
        ];
    }
    
}