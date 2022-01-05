import { useTranslation } from 'react-i18next';
import { DeleteIcon, ExportIcon, ImportIcon } from '../assets/icons';
import { headerObj } from './../components/UIComponents/DataGird/grid.component';
import { ExpireWalletIcon, PositiveCricleIcon } from './../assets/icons';

export default class SalesTaxModel {


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

    fieldsToDisplay (): headerObj[] {
        return [
            { field: "assetNm", label: "ASSET TYPE", type: 'text', align: 'left', sortable: true },
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
            },
            { field: "", label: "", type: 'text',  align: 'left'},
            { field: "", label: "", type: 'text',  align: 'left'},
            { field: "", label: "", type: 'text',  align: 'left'},
            { field: "", label: "", type: 'text',  align: 'left'}, 
            { field: "", label: "", type: 'text',  align: 'left'}  
        ];
    }
} 