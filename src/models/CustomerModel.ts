import moment from 'moment';
import { useTranslation } from 'react-i18next';
import { headerObj } from '../components/UIComponents/DataGird/grid.component';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import { DeleteIcon, ExportIcon, ImportIcon } from '../assets/icons';

export interface SelectProps {
    label: string,
    value: string,
}

export interface EmergencyContact {
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber: string,
}

export interface ApContact {
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber: string,
}

export interface AddCustomerForm {
    // General Information
    customerName: string,
    customerId: string,
    addressLine1: string,
    addressLine2: string,
    city: string,
    state: string,
    postalCode: string,
    // Customer Contact
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber: string,
    // Payment and Wallet rules
    paymentType: SelectProps,
    invoiceFrequency: SelectProps,
    startDate: moment.Moment | null,
    endDate: moment.Moment | null,
    paymentTerm: string,
    lotLevel: boolean,
    businessLevel: boolean,
    vehicleLevel: boolean,
    // Emergency Contact
    emergencyContact: EmergencyContact[]
    apContact: ApContact[],
}

export default class CustomerModel {
    // General Information
    customerName: string;
    customerId: string;
    addressLine1: string;
    addressLine2: string;
    city: string;
    state: string;
    postalCode: string;
    // Customer Contact
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    // Payment and Wallet rules
    paymentType: SelectProps;
    invoiceFrequency: SelectProps;
    startDate: moment.Moment | null;
    endDate: moment.Moment | null;
    paymentTerm: string;
    lotLevel: boolean;
    businessLevel: boolean;
    vehicleLevel: boolean;
    // Emergency Contact
    emergencyContact: EmergencyContact[]
    apContact: ApContact[];

    constructor() {
        this.customerName = '';
        this.customerName = '';
        this.customerId = '';
        this.addressLine1 = '';
        this.addressLine2 = '';
        this.city = '';
        this.state = '';
        this.postalCode = '';
        this.firstName = '';
        this.lastName = '';
        this.email = '';
        this.phoneNumber = '';
        this.paymentType = { label: '', value: '' };
        this.invoiceFrequency = { label: '', value: '' };
        this.startDate = moment();
        this.endDate = moment();
        this.paymentTerm = '';
        this.lotLevel = false;
        this.businessLevel = false;
        this.vehicleLevel = false;
        this.emergencyContact = [{
            firstName: '',
            lastName: '',
            email: '',
            phoneNumber: '',
        }];
        this.apContact = [{
            firstName: '',
            lastName: '',
            email: '',
            phoneNumber: '',
        }];
    }

    fieldsToDisplay (): headerObj[] {
        return [
            { field: "avatar", label: "IMAGE", type: 'image', sortable: false },
            { field: "customerId", label: "ID", type: 'text', bold: true },
            { field: "customerName", label: "CUSTOMER NAME", type: 'text', sortable: true },
            { field: "contactName", label: "CONTACT NAME", type: 'text' },
            { field: "address", label: "ADDRESS", type: 'text' },
            { field: "city", label: "CITY", type: 'text' },
            { field: "state", label: "STATE", type: 'text' },
            { field: "zipCode", label: "ZIP", type: 'text' },
            { field: "totalLots", label: "LOTS", type: 'button', icon: LocationOnOutlinedIcon },
            { field: "paymentType", label: "SETTLEMENT TYPE", type: 'text' },
        ];
    }

    fieldsToDisplayLotTable(): headerObj[] {
        return [
            { field: "deliveryLocationNm", label: "LOT NAME", type: 'text' },
            { field: "streetAddress", label: "STREET ADDRESS", type: 'text' },
            { field: "cityNm", label: "CITY", type: 'text' },
            { field: "stateNm", label: "STATE", type: 'text' },
            { field: "postalCd", label: "ZIP", type: 'text' },
            { field: "walletStatus", label: "WALLET", type: 'icon', align: 'center' },
            { field: "fuelStatus", label: "FUEL", type: 'icons' },
            { field: "vehicles", label: "VEHICLES", type: 'text' },
        ];
    }

    ACTION_TYPES = {
        RAISE_REQ: 'raise req',
        DRIVER_DETAILS: 'driver details',
        OTHER_DETAIL: 'other details',
        CONTACT_DETAILS: 'contact details'
    };

    rowActions () {
        const { t } = useTranslation();
        return [
            {
                label: t("menus.data-grid-actions.raise a request"),
                action: this.ACTION_TYPES.RAISE_REQ,
            },
            {
                label: t("menus.data-grid-actions.fee & driver details"),
                action: this.ACTION_TYPES.DRIVER_DETAILS
            },
            {
                label: t("menus.data-grid-actions.other details"),
                action: this.ACTION_TYPES.OTHER_DETAIL
            },
            {
                label: t("menus.data-grid-actions.contact details"),
                action: this.ACTION_TYPES.CONTACT_DETAILS
            }
        ];
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
}