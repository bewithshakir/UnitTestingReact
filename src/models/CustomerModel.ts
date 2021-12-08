import moment from 'moment';
import { useTranslation } from 'react-i18next';
import { headerObj } from '../components/UIComponents/DataGird/grid.component';
import { DeleteIcon, ExportIcon, ImportIcon, PositiveCricleIcon, AlertExclamationIcon, ParkingLotIcon } from '../assets/icons';
import { formatDateAsMMDDYYYY } from '../utils/DateHelpers';
export interface SelectProps {
    label: string,
    value: string,
}

export interface EmergencyContact {
    customerContactId?: string,
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber: string,
}

export interface ApContact {
    customerContactId?: string,
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
        this.startDate = null;
        this.endDate = null;
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

    dataModel (data: any) {
        return data.map((obj: any) => (
            {
                ...obj,
                createdAt: formatDateAsMMDDYYYY(obj.createdDate)
            }
        ));
    }

    fieldsToDisplay (): headerObj[] {
        return [
            { field: "customerName", label: "CUSTOMER NAME", type: 'text', sortable: true },
            { field: "contactName", label: "CONTACT NAME", type: 'text' },
            { field: "address", label: "ADDRESS", type: 'text' },
            { field: "city", label: "CITY", type: 'text' },
            { field: "state", label: "STATE", type: 'text' },
            { field: "zipCode", label: "ZIP", type: 'text' },
            { field: "totalLots", label: "LOTS", type: 'button', icon: ParkingLotIcon },
            { field: "paymentType", label: "SETTLEMENT TYPE", type: 'text' },
            { field: "createdAt", label: "DATE CREATED", type: 'text' },
        ];
    }

    fieldsToDisplayLotTable (): headerObj[] {
        return [
            { field: "deliveryLocationNm", label: "LOT NAME", type: 'text' },
            { field: "streetAddress", label: "STREET ADDRESS", type: 'text' },
            { field: "cityNm", label: "CITY", type: 'text' },
            { field: "stateNm", label: "STATE", type: 'text' },
            { field: "postalCd", label: "ZIP", type: 'text' },
            { field: "vehicles", label: "VEHICLES", type: 'text' },
            { field: "fuelStatus", label: "FUEL", type: 'icons' },
            { field: 'primaryContactName', label: 'CONTACT', type: 'text' },
            {
                field: "walletStatus",
                label: "WALLET RULE",
                type: 'status',
                align: 'center',
                showIconLast: true,
                fieldOptions: [
                    {
                        value: "Y",
                        icon: PositiveCricleIcon,
                    },
                    {
                        value: "N",
                        icon: AlertExclamationIcon
                    }
                ]
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
            },
            {
                label: t("menus.data-grid-actions.delete"),
                action: this.ACTION_TYPES.DELETE
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