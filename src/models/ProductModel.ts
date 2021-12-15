import { useTranslation } from 'react-i18next';
import { headerObj } from './../components/UIComponents/DataGird/grid.component';
import { ExportIcon, PositiveCricleIcon, ExpireWalletIcon } from '../assets/icons';


export default class ProductModel {
    productName: string;
    productType: string;
    status: string;
    pricing: string;


    constructor() {
        this.productName = '';
        this.productType = '';
        this.status = '';
        this.pricing = '';
    }

    dataModel (data: any) {
        return data.map((obj: any) => {

            return ({
                ...obj,
                product: {
                    productId: obj.productId,
                    productName: obj.productName,
                    productServiceInd: obj.productServiceInd,
                    productColorCd: obj.productColor.productColorCd,
                    productColorNm: obj.productColor.productColorNm,
                    productColorCode: obj.productColor.productColorCode,
                }
            });
        });
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
                label: t("menus.actions.export data"),
                icon: ExportIcon,
                action: this.MASS_ACTION_TYPES.EXPORT
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

    fieldsToDisplay (): headerObj[] {
        return [
            {
                field: "product",
                label: "PRODUCT NAME",
                type: 'product',
                align: 'left',
                sortable: true,
            },
            { field: "productType", label: "PRODUCT TYPE", type: 'text', align: 'left', sortable: true },
            {
                field: "status", label: "STATUS", type: 'status', align: 'left', sortable: true,
                fieldOptions: [
                    {
                        value: "enabled",
                        color: 'green',
                        displayValue: "Enabled",
                        icon: PositiveCricleIcon,
                    },
                    {
                        value: "disabled",
                        color: 'red',
                        displayValue: "Disabled",
                        icon: ExpireWalletIcon
                    },
                ]
            },
            { field: "pricing", label: "MANUAL PRICING (NON-FUEL PRODUCTS)", type: 'text', align: 'left', sortable: true },
        ];
    }
}