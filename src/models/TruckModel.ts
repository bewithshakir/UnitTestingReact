import { useTranslation } from 'react-i18next';
import { headerObj } from '../components/UIComponents/DataGird/grid.component'; 
import { PositiveCricleIcon, ExpireWalletIcon, OilTankIcon, OrderIcon } from '../assets/icons';

import { ParkingLocationIcon } from '../assets/icons';


export default class TruckParkingLotModel {
    deliveryVehicleId: string;
    deliveryVehicleNm: string;
    licenceNo: string;
    vinNo: string;
    makeAndModelNm: string;
    colorNm: string;
    registrationYr: string;
    activeInactiveInd: string;
    drivers: string;
    parkingLocationCount: string;
    tankCount: string;
    orderCount: string;

    constructor(){
        this.deliveryVehicleId = '';
        this.deliveryVehicleNm = '';
        this.licenceNo = '';
        this.vinNo = '';
        this.makeAndModelNm = '';
        this.colorNm = '';
        this.registrationYr = '';
        this.activeInactiveInd = '';
        this.drivers = '';
        this.parkingLocationCount = '';
        this.tankCount = '';
        this.orderCount = '';
    }

    fieldsToDisplay (): headerObj[] {
        return [
            { field: "deliveryVehicleNm", label: "TRUCK NAME", type: 'text' },
            { field: "licenceNo", label: "LICENSE", type: 'text' },
            { field: "vinNo", label: "VIN", type: 'text' },
            { field: "makeAndModelNm", label: "MAKE/MODEL", type: 'text' },
            { field: "colorNm", label: "COLOR", type: 'text' },
            { field: "registrationYr", label: "YEAR", type: 'text' },
            { 
                field: "activeInactiveInd", label: "STATUS", type: 'status',
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
            { field: "drivers", label: "DRIVERS", type: 'text' },
            { field: "parkingLocationCount", label: "LOCATIONS", type: 'button', icon: ParkingLocationIcon },
            { field: "tankCount", label: "TANKS", type: 'button', icon: OilTankIcon },
            { field: "orderCount", label: "ORDERS", type: 'button', icon: OrderIcon },
        ];
    }

    dataModel (data: any) {
        return data.map((obj: any) => {
            return ({
                ...obj,
                colorNm: obj.color.colorNm,
            });
        });
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
}