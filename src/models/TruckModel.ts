import { headerObj } from '../components/UIComponents/DataGird/grid.component'; 
import { PositiveCricleIcon, ExpireWalletIcon, OilTankIcon, OrderIcon } from '../assets/icons';

import { ParkingLocationIcon } from '../assets/icons';
import { useTranslation } from 'react-i18next';
import { TruckManagement } from '../pages/Truck/config';
import { IDynamicFilterProps } from '../components/UIComponents/RightInfoPanel/DynamicFilterContent.component';

const { RowActionsOptions, DataGridFields } = TruckManagement.LandingPage;

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
            { field: DataGridFields.TRUCKNAME.field, label: DataGridFields.TRUCKNAME.label, type: 'text' },
            { field: DataGridFields.LICENSE.field, label: DataGridFields.LICENSE.label, type: 'text' },
            { field: DataGridFields.VIN.field, label: DataGridFields.VIN.label, type: 'text' },
            { field: DataGridFields.MAKEORMODEL.field, label: DataGridFields.MAKEORMODEL.label, type: 'text' },
            { field: DataGridFields.COLOR.field, label: DataGridFields.COLOR.label, type: 'text' },
            { field: DataGridFields.YEAR.field, label: DataGridFields.YEAR.label, type: 'text' },
            { 
                field: DataGridFields.STATUS.field, label: DataGridFields.STATUS.label, type: 'status',
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
            { field: DataGridFields.DRIVERS.field, label: DataGridFields.DRIVERS.label, type: 'text' },
            { field: DataGridFields.LOCATIONS.field, label: DataGridFields.LOCATIONS.label, type: 'button', icon: ParkingLocationIcon },
            { field: DataGridFields.TANKS.field, label: DataGridFields.TANKS.label, type: 'button', icon: OilTankIcon },
            { field: DataGridFields.ORDERS.field, label: DataGridFields.ORDERS.label, type: 'button', icon: OrderIcon },
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
            { field: "fuelStatus", label: "FUEL TYPE", type: 'icons' },
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
                fuelStatus: [
                    {
                        productCd: obj.productCd,
                        productIcon: { ...obj.productIcon },
                        productNm: obj.productNm,
                    },
                ],
            });
        });
    }
    FilterByFields(): IDynamicFilterProps['fields'] {
        return (
            [
                { 
                    name: 'driver', 
                    label: 'filterForm.driver', 
                    fieldType: 'select', 
                    optionUrlKey: 'truckOverviewFilter', 
                    optionAPIResponseKey: 'drivers', 
                    initialValue: []
                },
                {
                    name: 'activeInactiveInd', 
                    label: 'filterForm.status', 
                    fieldType: 'select', 
                    optionUrlKey: 'truckOverviewFilter', 
                    optionAPIResponseKey: 'status', 
                    singleSelect: true, 
                    initialValue: null, 
                    options: [{label: "Enable", value: "Y"}, {label: "Disable", value: "N"}] 
                },
                { 
                    name: 'city', 
                    label: 'filterForm.city', 
                    fieldType: 'select', 
                    optionUrlKey: 'truckOverviewFilter', 
                    optionAPIResponseKey: 'cities', 
                    initialValue: []
                },
            ]
        );
    }
}