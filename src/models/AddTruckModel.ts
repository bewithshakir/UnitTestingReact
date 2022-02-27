export interface SelectProps {
    label: string,
    value: string,
}

export interface TankDetails {
    tcsRegisterId: string,
    tankFuelType: SelectProps,
    minCapacityVol: string,
    maxCapacityVol: string
}


export interface AddCustomerForm {
    // General Information
    truckName: string,
    license: string,
    vin: string,
    makeModel: string,
    color: SelectProps,
    year: string,
    status: SelectProps,
    truckParkingLot: Array<mutiSelectItem>,
    opexFuelType: SelectProps,
    tankDetails: TankDetails[]
}

export interface mutiSelectItem {
    label: string,
    value: string | number
}


export default class AddTruckModel {
    // General Information
    truckName: string;
    license: string;
    vin: string;
    makeModel: string;
    color: SelectProps;
    year: string;
    status: SelectProps;
    truckParkingLot: Array<mutiSelectItem>;
    opexFuelType: SelectProps;
    // Emergency Contact
    tankDetails: TankDetails[]

    constructor() {
        this.truckName = '';
        this.license = '';
        this.vin = '';
        this.makeModel = '';
        this.color = { label: '', value: '' };
        this.year = '';
        this.status = { label: '', value: '' };
        this.truckParkingLot = [];
        this.opexFuelType = { label: '', value: '' };
        this.tankDetails = [{
            tcsRegisterId: '',
            tankFuelType: { label: '', value: '' },
            minCapacityVol: '',
            maxCapacityVol: '',
        }];
    }

}