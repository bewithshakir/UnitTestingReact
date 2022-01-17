import { headerObj } from '../components/UIComponents/DataGird/grid.component';
import { AllParkingLots } from '../pages/ParkingLotsManagement//config';
import { useTranslation } from 'react-i18next';
import DriveEtaOutlinedIcon from '@material-ui/icons/DriveEtaOutlined';
import { PositiveCricleIcon, AlertExclamationIcon } from '../assets/icons';

const { MassActionOptions, RowActionsOptions, DataGridFields } = AllParkingLots.LandingPage;
export default class TaxModel {
    massActions () {
        const { t } = useTranslation();
        return MassActionOptions.map(actionItem => ({ ...actionItem, label: t(actionItem.label) }));
    }

    fieldsToDisplay (): headerObj[] {
        const { DELIVERYLOCATION_NM, LOT_ID, CUSTOMER_NAME, LOT_CONTACT,
            STREET_ADDRESS, CITY, STATE, ZIP, RACK_UPDATE, WALLET_STATUS, FUEL, VEHICLES } = DataGridFields;
        return [
            { field: DELIVERYLOCATION_NM.field, label: DELIVERYLOCATION_NM.label, type: 'text' },
            { field: LOT_ID.field, label: LOT_ID.label, type: 'text' },
            { field: CUSTOMER_NAME.field, label: CUSTOMER_NAME.label, type: 'text' },
            { field: LOT_CONTACT.field, label: LOT_CONTACT.label, type: 'text' },
            { field: STREET_ADDRESS.field, label: STREET_ADDRESS.label, type: 'text' },
            { field: CITY.field, label: CITY.label, type: 'text', align: 'left' },
            { field: STATE.field, label: STATE.label, type: 'text', align: 'left' },
            { field: ZIP.field, label: ZIP.label, type: 'text' },
            { field: RACK_UPDATE.field, label: RACK_UPDATE.label, type: 'text' },
            {
                field: WALLET_STATUS.field, label: WALLET_STATUS.label,
                type: 'status',
                fieldOptions: [
                    {
                        value: "Y",
                        displayValue: "Assigned",
                        icon: PositiveCricleIcon,
                    },
                    {
                        value: "N",
                        displayValue: "Expiring",
                        icon: AlertExclamationIcon,
                    }
                ]
            },
            { field: FUEL.field, label: FUEL.label, type: 'icons' },
            { field: VEHICLES.field, label: VEHICLES.label, type: 'button', icon: DriveEtaOutlinedIcon },
        ];
    }

    rowActions () {
        const { t } = useTranslation();
        return RowActionsOptions.map(actionItem => ({ ...actionItem, label: t(actionItem.label) }));
    }

}