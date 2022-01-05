import { useTranslation } from 'react-i18next';
import { headerObj } from './../components/UIComponents/DataGird/grid.component';
import { ExpireWalletIcon, PositiveCricleIcon } from './../assets/icons';
import { AssetManagement } from '../pages/AssetManagement/config';

const { MassActionOptions, RowActionsOptions, DataGridFields } = AssetManagement.LandingPage;

export default class AssetManagementModel {

    massActions() {
        const { t } = useTranslation();
        return MassActionOptions.map(actionItem => ({ ...actionItem, label: t(actionItem.label) }));
    }

    rowActions() {
        const { t } = useTranslation();
        return RowActionsOptions.map(actionItem => ({ ...actionItem, label: t(actionItem.label) }));
    }

    fieldsToDisplay(): headerObj[] {
        const { ASSET_TYPE, STATUS } = DataGridFields;
        return [
            { field: ASSET_TYPE.field, label: ASSET_TYPE.label, type: 'text', align: 'left', sortable: true },
            {
                field: STATUS.field,
                label: STATUS.label,
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
            { field: "", label: "", type: 'text', align: 'left' },
            { field: "", label: "", type: 'text', align: 'left' },
            { field: "", label: "", type: 'text', align: 'left' },
            { field: "", label: "", type: 'text', align: 'left' },
            { field: "", label: "", type: 'text', align: 'left' }
        ];
    }
}