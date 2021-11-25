import moment from 'moment';
import { headerObj } from './../components/UIComponents/DataGird/grid.component';
import { FuelTax, FuelListData } from '../pages/Tax/config';
import { OilCanIcon } from '../assets/icons';
import { useTranslation } from 'react-i18next';

export interface SelectProps {
    label: string,
    value: string,
}

const { MassActionOptions, DataGridFields } = FuelTax.LandingPage;
export default class TaxModel {
    addressLine1: string;
    state: string;
    city: string;
    countryCd: string;
    startDate: moment.Moment | null;
    endDate: moment.Moment | null;
    federalRate: string;
    localRate: string;
    salesFuelRate: string;
    stateFuelRate: string;
    cityFuelRate: string;
    countryFuelRate: string;
    InspFuelRate: string;
    miscLocalFuelRate: string;
    loadFuel: string;
    fuelType: SelectProps;

    constructor() {
        this.addressLine1 = '';
        this.state = '';
        this.city = '';
        this.countryCd = '';
        this.startDate = moment();
        this.endDate = moment();
        this.federalRate = '';
        this.localRate = '';
        this.salesFuelRate = '';
        this.stateFuelRate = '';
        this.cityFuelRate = '';
        this.countryFuelRate = '';
        this.InspFuelRate = '';
        this.miscLocalFuelRate = '';
        this.loadFuel = '';
        this.fuelType = { label: '', value: '' };
    }


    massActions () {
        const { t } = useTranslation();
        return MassActionOptions.map(actionItem => ({ ...actionItem, label: t(actionItem.label) }));
    }

    dataModel (data: FuelListData[]) {
        return data.map((obj) => ({
            ...obj,
            productCount: obj.products?.length || 0
        }));
    }

    fieldsToDisplay (): headerObj[] {
        const { CITY, STATE, PRODUCT } = DataGridFields;
        return [
            { field: CITY.field, label: CITY.label, type: 'text', align: 'left', sortable: true },
            { field: STATE.field, label: STATE.label, type: 'text', align: 'left' },
            { field: PRODUCT.field, label: PRODUCT.label, type: 'button', align: 'left', icon: OilCanIcon },
            { field: "", label: "", type: 'text', align: 'left' },
            { field: "", label: "", type: 'text', align: 'left' },
            { field: "", label: "", type: 'text', align: 'left' },
            { field: "", label: "", type: 'text', align: 'left' },
            { field: "", label: "", type: 'text', align: 'left' },
            { field: "", label: "", type: 'text', align: 'left' },
            { field: "", label: "", type: 'text', align: 'left' },
            { field: "", label: "", type: 'text', align: 'left' },
            { field: "", label: "", type: 'text', align: 'left' },
        ];
    }
}