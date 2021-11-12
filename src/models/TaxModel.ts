import moment from 'moment';
import { useTranslation } from 'react-i18next';
import { DeleteIcon, ExportIcon, ImportIcon } from '../assets/icons';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import { headerObj } from './../components/UIComponents/DataGird/grid.component';

export interface SelectProps {
    label: string,
    value: string,
}


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

    dataModel (data: any){
        return data.map((obj: any) => ({
            ...obj,
            productCount: obj.products?.length || 0
        }));
    }

    fieldsToDisplay (): headerObj[] {
        return [
            { field: "cityName", label: "CITY", type: 'text', align: 'left', sortable: true },
            { field: "stateName", label: "STATE", type: 'text',  align: 'left'},
            { field: "productCount", label: "PRODUCT", type: 'button',  align: 'left', icon: LocationOnOutlinedIcon },
            { field: "", label: "", type: 'text',  align: 'left'},
            { field: "", label: "", type: 'text',  align: 'left'},
            { field: "", label: "", type: 'text',  align: 'left'},
            { field: "", label: "", type: 'text',  align: 'left'},
            { field: "", label: "", type: 'text',  align: 'left'},
            { field: "", label: "", type: 'text',  align: 'left'},
            { field: "", label: "", type: 'text',  align: 'left'},
            { field: "", label: "", type: 'text',  align: 'left'},
            { field: "", label: "", type: 'text',  align: 'left'},
        ];
    }
}