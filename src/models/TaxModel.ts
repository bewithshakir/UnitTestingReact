import moment from 'moment';
import { headerObj } from './../components/UIComponents/DataGird/grid.component';
import { FuelTax, FuelListData } from '../pages/Tax/config';
import { OilCanIcon } from '../assets/icons';
import { useTranslation } from 'react-i18next';
import { YellowFuelIcon, RedFuelIcon, GreenFuelIcon, NavyBlueFuelIcon } from './../assets/icons';

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

    fieldsToDisplayLotTable (): headerObj[] {
        return [
            { 
                field: "productCd", 
                label: "PRODUCT", 
                type: 'status', 
                align: 'left', 
                showIconLast: false,
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
            { field: "fedFuelTax", label: "FEDERAL TAX ($)", type: 'text', align: 'left' },
            { field: "revenueFuelRate", label: "REVENUE RATE (%)", type: 'text', align: 'left' },
            { field: "salesFuelRate", label: "SALES FUEL RATE (%)", type: 'text' },
            { field: "stateFuelTax", label: "STATE TAX ($)", type: 'text' },
            { field: "cityFuelTax", label: "CITY TAX ($)", type: 'text' },
            { field: "countyFuelTax", label: "COUNTY TAX ($)", type: 'text' },
            { field: "miscInspFuelTax", label: "MISP INSP FUEL TAX ($)", type: 'text' },
            { field: "miscLocalFuelTax", label: "LOCAL TAX ($)", type: 'text' },
            { field: "miscLoadFuelTax", label: "LOAD FUEL TAX ($)", type: 'text' },
            { field: "startDate", label: "EFFECTIVE DATE", type: 'text' },
            { field: "endDate", label: "END DATE", type: 'text' },
            
        ];
    }

    ACTION_TYPES = {
        EDIT: 'edit',
        DELETE: 'delete'
    };

    rowActions () {
        const { t } = useTranslation();
        return [
            {
                label: t("menus.data-grid-actions.edit"),
                action: this.ACTION_TYPES.EDIT
            },
            {
                label: t("menus.data-grid-actions.delete"),
                action: this.ACTION_TYPES.DELETE
            }
        ];
    }

}