import { useTranslation } from 'react-i18next';
import { headerObj } from '../components/UIComponents/DataGird/grid.component';
import DriveEtaOutlinedIcon from '@material-ui/icons/DriveEtaOutlined';
// import { PositiveCricleIcon, AlertExclamationIcon } from '../assets/icons';


export interface Vehicle {
    // General Information
    customerId: string,
    city: string,
    state: string,
    license: string,
    make: string,
    model: string,
    year: string,
    product: string,
    customName: string,
    vin: string,
    vehicleType: string,
    assetType: string,
    lots: string,
    dsp: string,
    wallet: string
}

export default class VehicleModel {
    // General Information
    customerId: string;
    city: string;
    state: string;
    license: string;
    make: string;
    model: string;
    year: string;
    product: string;
    customName: string;
    vin: string;
    vehicleType: string;
    assetType: string;
    lots: string;
    dsp: string;
    wallet: string;

    constructor() {
        this.customerId = '';
        this.city = '';
        this.state = '';
        this.license = '';
        this.make = '';
        this.model = '';
        this.year = '';
        this.product = '';
        this.customName = '';
        this.vin = '';
        this.vehicleType = '';
        this.assetType = '';
        this.lots = '';
        this.dsp = '';
        this.wallet = '';
    }

    fieldsToDisplay(): headerObj[] {
        return [
            { field: "license", label: "LICENSE", type: 'text' },
            { field: "stateNm", label: "STATE", type: 'text' },
            { field: "make", label: "MAKE", type: 'text' },
            { field: "model", label: "MODEL", type: 'text' },
            { field: "year", label: "YEAR", type: 'text' },
            { field: "product", label: "PRODUCT", type: 'text', width: "200px" },
            { field: "custom name", label: "CUSTOM NAME", type: 'text' },
            { field: "vin", label: "VIN", type: 'text' },
            { field: "aaset_vehicle_type", label: "ASSET/VEHICLE TYPE", type: 'text' },
            { field: "lots", label: "LOTS", type: 'button', icon: DriveEtaOutlinedIcon },
            { field: "dsp", label: "DSP", type: 'text' },
            { field: "wallet", label: "WALLET", type: 'text' }
        ];
    }

    ACTION_TYPES = {
        EDIT: 'edit',
        DELETE: 'delete',
    };

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