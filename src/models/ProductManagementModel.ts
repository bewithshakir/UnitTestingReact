import { useTranslation } from "react-i18next";
import { headerObj } from './../components/UIComponents/DataGird/grid.component';
import { ProductManagement } from "../pages/ProductManagementLanding/config";
import { PositiveCricleIcon, ExpireWalletIcon } from '../assets/icons';

export interface SelectPropsInt {
    label: string,
    value: string,
}

const { MassActionOptions, RowActionsOptions, DataGridFields } = ProductManagement.LandingPage;
export default class ProductManagementModel {
    countryCode?: string;
    productName: string;
    productType: SelectPropsInt;
    productColor: SelectPropsInt;
    productStatus: SelectPropsInt;
    productPricing: string;

    constructor() {
        this.countryCode = 'us';
        this.productName = '';
        this.productType = { label: '', value: '' };
        this.productColor = { label: '', value: '' };
        this.productStatus = { label: '', value: '' };
        this.productPricing = '';
    }

    dataModel (data: any) {
        return data.map((obj: any) => {
            return ({
                ...obj,
                productType: obj.productClass.productClassNm,
                status: obj.productServiceInd,
                pricing: obj.productClass.productClassNm === 'Fuel' ? '--' : `$${obj.manualPricing}`,
                product: {
                    productId: obj.productId,
                    productName: obj.productName,
                    productColorCd: obj.productColor.productColorCd,
                    productColorNm: obj.productColor.productColorNm,
                    productColorCode: obj.productColor.productColorCode,
                }
            });
        });
    }

    massActions () {
        const { t } = useTranslation();
        return MassActionOptions.map(actionItem => ({ ...actionItem, label: t(actionItem.label) }));
    }

    fieldsToDisplay (): headerObj[] {
        const { PRODUCTNAME, PRODUCTTYPE, STATUS, MANUALPRICING } = DataGridFields;
        return [
            { field: PRODUCTNAME.field, label: PRODUCTNAME.label, type: 'product', align: 'left', sortable: true },
            { field: PRODUCTTYPE.field, label: PRODUCTTYPE.label, type: 'text', align: 'left', sortable: true },
            {
                field: STATUS.field, label: STATUS.label, type: 'status', align: 'left', sortable: true,
                fieldOptions: [
                    {
                        value: "y",
                        color: 'green',
                        displayValue: "Enabled",
                        icon: PositiveCricleIcon,
                    },
                    {
                        value: "n",
                        color: 'red',
                        displayValue: "Disabled",
                        icon: ExpireWalletIcon
                    },
                ]
            },
            { field: MANUALPRICING.field, label: MANUALPRICING.label, type: 'text', align: 'left', sortable: true },
        ];
    }

    rowActions () {
        const { t } = useTranslation();
        return RowActionsOptions.map(actionItem => ({ ...actionItem, label: t(actionItem.label) }));
    }
}