import { useTranslation } from 'react-i18next';
import { DeleteIcon, ExportIcon, ImportIcon } from '../assets/icons';
import { headerObj } from './../components/UIComponents/DataGird/grid.component';

export default class SalesTaxModel {
    taxJurisdictionId: string;
    state: string;
    city: string;
    countryCd: string;
    federalRate: string;
    localRate: string;
    salesFuelRate: string;
    stateFuelRate: string;
    cityFuelRate: string;
    countryFuelRate: string;
    InspFuelRate: string;
    miscLocalFuelRate: string;  
    addressLine1: string;
    stateRate: string;

    constructor() {
        this.addressLine1 = '';
        this.stateRate = '';
        this.taxJurisdictionId = '';
        this.state = '';
        this.city = '';
        this.countryCd = '';
        this.federalRate = '';
        this.localRate = '';
        this.salesFuelRate = '';
        this.stateFuelRate = '';
        this.cityFuelRate = '';
        this.countryFuelRate = '';
        this.InspFuelRate = '';
        this.miscLocalFuelRate = '';
    }
    
    MASS_ACTION_TYPES = {
        IMPORT: 'import',
        EXPORT: 'export',
        DELETE: 'remove',
    };
    massActions () {
        const { t } = useTranslation();
        return [
            {
                label: t("menus.actions.import data"),
                icon: ImportIcon,
                action: this.MASS_ACTION_TYPES.IMPORT
            },
            {
                label: t("menus.actions.export data"),
                icon: ExportIcon,
                action: this.MASS_ACTION_TYPES.EXPORT
            },
            {
                label: t("menus.actions.delete"),
                icon: DeleteIcon,
                action: this.MASS_ACTION_TYPES.DELETE
            },
        ];
    }

    ACTION_TYPES = {
        EDIT: 'edit',
        DELETE: 'delete',
        CONTACT_DETAILS: 'contact details'
    };

    rowActions () {
        const { t } = useTranslation();
        return [
            {
                label: t("menus.data-grid-actions.edit"),
                action: this.ACTION_TYPES.EDIT
            }
        ];
    }
    
    fieldsToDisplay (): headerObj[] {
        return [
            { field: "city", label: "CITY", type: 'text', align: 'left' },
            { field: "state", label: "STATE", type: 'text',  align: 'left' },
            { field: "federalRate", label: "FEDERAL RATE (%)", type: 'text',  align: 'left' },
            { field: "stateRate", label: "STATE RATE (%)", type: 'text',  align: 'left' },
            { field: "localRate", label: "LOCAL RATE (%)", type: 'text',  align: 'left' },
            { field: "totalRate", label: "TOTAL RATE (%)", type: 'text',  align: 'left' },         
        ];
    }
}