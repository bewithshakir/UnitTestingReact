import { headerObj } from '../components/UIComponents/DataGird/grid.component'; 
import { PositiveCricleIcon, ExpireWalletIcon, OilTankIcon, OrderIcon } from '../assets/icons';

import { ParkingLocationIcon } from '../assets/icons';
import { useTranslation } from 'react-i18next';
import { TruckManagement } from '../pages/Truck/config';

const { RowActionsOptions } = TruckManagement.LandingPage;

export default class TruckModel {
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

    parkingLocationTableFields(): headerObj[] {
        return [
            { field: "name", label: "TRUCK PARKING LOT NAME", type: 'text', width:'300' },
            { field: "address", label: "ADDRESS", type: 'text' },
            { field: "state", label: "STATE", type: 'text' },
            { field: "city", label: "CITY", type: 'text' },
            { field: "postalCode", label: "POSTAL CODE", type: 'text' },
        ];
    }

    tanksTableFields(): headerObj[] {
        return [
            { field: "tcsRegisterId", label: "TANK REGISTER ID", type: 'text', width:'300' },
            { field: "product", label: "FUEL TYPE", type: 'product' },
            { field: "maxCapacityVol", label: "MAX CAPACITY", type: 'text' },
            { field: "lastRefuelDatetime", label: "LAST REFUEL ON", type: 'text' },
            { field: "currentWetstock", label: "CURRENT WETSTOCK", type: 'text' },
            { field: "lastTransactionDatetime", label: "LAST TRANSACTION ON", type: 'text' },
            { field: "volumeDispensed", label: "SUM OF VOLUME DISPENSED", type: 'text' },
            { field: "billNumber", label: "BILL OF LEADING NUMBER", type: 'text' },
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
        return RowActionsOptions.map(actionItem => ({ ...actionItem, label: t(actionItem.label) }));
    }

    tanksDataModel(data: any) {
        return data.map((obj: any) => {
            return ({
                ...obj,
                maxCapacityVol: obj.maxCapacityVol + ' gal',
                product: {
                    productId: obj.productCd,
                    productColorCd: obj.productIcon.productIconCd,
                    productColorNm: obj.productIcon.productIconNm,
                    productColorCode: obj.productIcon.productIconHexCode,
                }
            });
        });
    }
}