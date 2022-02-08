import moment from 'moment';
import { headerObj } from './../components/UIComponents/DataGird/grid.component';
import { FuelTax } from '../pages/Tax/config';
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
    productType: SelectProps;
    ppdSalesTax: string;

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
        this.productType = { label: '', value: '' };
        this.ppdSalesTax = '';
    }


    massActions () {
        const { t } = useTranslation();
        return MassActionOptions.map(actionItem => ({ ...actionItem, label: t(actionItem.label) }));
    }

    fieldsToDisplay (): headerObj[] {
        const { CITY, STATE, PRODUCT, PRODUCT2 } = DataGridFields;
        return [
            { field: CITY.field, label: CITY.label, type: 'text', align: 'left', width: "250px" },
            { field: STATE.field, label: STATE.label, type: 'text', align: 'left', width: "250px" },
            { field: PRODUCT.field, label: PRODUCT.label, type: 'button', align: 'left', icon: OilCanIcon, width: "250px" },
            { field: PRODUCT2.field, label: PRODUCT2.label, type: 'button', align: 'left', icon: OilCanIcon, width: "750px" },
        ];
    }

    displayProductdataModel (data: any) {
        return data.map((obj: any) => {
            return ({
                ...obj,
                product: {
                    productId: obj?.productCd || '',
                    productName: obj?.productNm || '',
                    productColorCd: obj?.productIcon?.productIconCd || '',
                    productColorNm: obj?.productIcon?.productIconNm || '',
                    productColorCode: obj?.productIcon?.productIconHexCode || '',
                }
            });
        });
    }

    fieldsToDisplayLotTable (): headerObj[] {
        return [
            { field: "product", label: "PRODUCT", type: 'product', align: 'left' },
            { field: "fedFuelTax", label: "FEDERAL TAX ($)", type: 'text', align: 'left' },
            { field: "revenueFuelRate", label: "REVENUE RATE (%)", type: 'text', align: 'left' },
            { field: "salesFuelRate", label: "SALES FUEL RATE (%)", type: 'text' },
            { field: "stateFuelTax", label: "STATE TAX ($)", type: 'text' },
            { field: "cityFuelTax", label: "CITY TAX ($)", type: 'text' },
            { field: "countyFuelTax", label: "COUNTY TAX ($)", type: 'text' },
            { field: "ppdSalesTax", label: "PPD SALES TAX (PREPAID) ($)", type: 'text' },
            { field: "miscInspFuelTax", label: "MISP INSP FUEL TAX ($)", type: 'text' },
            { field: "miscLocalFuelTax", label: "LOCAL TAX ($)", type: 'text' },
            { field: "miscLoadFuelTax", label: "LOAD FUEL TAX ($)", type: 'text' },
            { field: "startDate", label: "EFFECTIVE DATE", type: 'text' },
            { field: "endDate", label: "END DATE", type: 'text' },

        ];
    }

    ACTION_TYPES = {
        EDIT: 'edit'
    };

    rowActions () {
        const { t } = useTranslation();
        return [
            {
                label: t("menus.data-grid-actions.edit"),
                action: this.ACTION_TYPES.EDIT
            },
            {
                label: t("menus.data-grid-actions.raiseRequset"),
            },
            {
                label: t("menus.data-grid-actions.feeDetails"),
            },
            {
                label: t("menus.data-grid-actions.contact details"),
            },
            {
                label: t("menus.data-grid-actions.other details"),
            }
        ];
    }

}