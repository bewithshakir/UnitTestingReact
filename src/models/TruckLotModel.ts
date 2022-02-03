export interface SelectProps {
    label: string,
    value: string,
}

export default class TruckLotModel {
    parkingLocationNm: string;
    addressLine1: string;
    addressLine2: string;
    stateNm: string;
    cityNm: string;
    postalCd: string;
    countryCode: string;

    constructor() {
        this.parkingLocationNm = '';
        this.addressLine1 = '';
        this.addressLine2 = '';
        this.stateNm = '';
        this.cityNm = '';
        this.postalCd = '';
        this.countryCode= '';
    }    
}