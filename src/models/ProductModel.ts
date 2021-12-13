import { useTranslation } from 'react-i18next';
import { headerObj } from './../components/UIComponents/DataGird/grid.component';
import { ExportIcon, YellowFuelIcon, RedFuelIcon, GreenFuelIcon, NavyBlueFuelIcon, PositiveCricleIcon, ExpireWalletIcon } from '../assets/icons';


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
                field: "productName", 
                label: "PRODUCT NAME", 
                type: 'status', align: 'left', sortable: true,
                fieldOptions: [
                    {
                        value: "Regular",
                        displayValue: "Regular",
                        icon: YellowFuelIcon,
                    },
                    {
                        value: "Premium",
                        displayValue: "Premium",
                        icon: RedFuelIcon
                    },
                    {
                        value: "Diesel",
                        displayValue: "Diesel",
                        icon: GreenFuelIcon,
                    },
                    {
                        value: "Ad Blue",
                        displayValue: "Ad Blue",
                        icon: NavyBlueFuelIcon
                    },
                    {
                        value: "DEF",
                        displayValue: "DEF",
                        icon: NavyBlueFuelIcon
                    },
                    {
                        value: "V-Power",
                        displayValue: "V-Power",
                        icon: NavyBlueFuelIcon
                    },
                    {
                        value: "Petrol",
                        displayValue: "Petrol",
                        icon: NavyBlueFuelIcon
                    }
                ] 
            },
            { field: "productType", label: "PRODUCT TYPE", type: 'text',  align: 'left', sortable: true},
            { 
                field: "status", label: "STATUS", type: 'status',  align: 'left', sortable: true,
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
            { field: "pricing", label: "MANUAL PRICING (NON-FUEL PRODUCTS)", type: 'text',  align: 'left', sortable: true },
        ];
    }
}