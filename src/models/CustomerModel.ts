import moment from 'moment';
import { useTranslation } from 'react-i18next';
import { headerObj } from '../components/UIComponents/DataGird/grid.component';
import { PositiveCricleIcon, AlertExclamationIcon, ParkingLotIcon } from '../assets/icons';
import { formatDateAsMMDDYYYY } from '../utils/DateHelpers';
import { Customer } from '../pages/CustomerManagement/config';
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

const { MassActionOptions, RowActionsOptions, Customer_DataGridFields, LOT_DataGridFields } = Customer.LandingPage;
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
        const { CUSTOMER_NAME, CONTACT_NAME, ADDRESS, CITY, STATE, ZIP, LOTS, SETTLEMENT_TYPE, DATE_CREATED } = Customer_DataGridFields;
        return [
            { field: CUSTOMER_NAME.field, label: CUSTOMER_NAME.label, type: 'text', sortable: true, width: "150px" },
            { field: CONTACT_NAME.field, label: CONTACT_NAME.label, type: 'text' },
            { field: ADDRESS.field, label: ADDRESS.label, type: 'text', width: "150px" },
            { field: CITY.field, label: CITY.label, type: 'text' },
            { field: STATE.field, label: STATE.label, type: 'text' },
            { field: ZIP.field, label: ZIP.label, type: 'text' },
            { field: LOTS.field, label: LOTS.label, type: 'button', icon: ParkingLotIcon },
            { field: SETTLEMENT_TYPE.field, label: SETTLEMENT_TYPE.label, type: 'text' },
            { field: DATE_CREATED.field, label: DATE_CREATED.label, type: 'text' },
        ];
    }

    fieldsToDisplayLotTable (): headerObj[] {
        const { LOT_NAME, STREET_ADDRESS, ZIP, CITY, STATE, VEHICLES, FUEL, CONTACT, WALLET_RULE } = LOT_DataGridFields;
        return [
            { field: LOT_NAME.field, label: LOT_NAME.label, type: 'text', width: "150px" },
            { field: STREET_ADDRESS.field, label: STREET_ADDRESS.label, type: 'text', width: "250px" },
            { field: CITY.field, label: CITY.label, type: 'text' },
            { field: STATE.field, label: STATE.label, type: 'text' },
            { field: ZIP.field, label: ZIP.label, type: 'text' },
            { field: VEHICLES.field, label: VEHICLES.label, type: 'text' },
            { field: FUEL.field, label: FUEL.label, type: 'icons' },
            { field: CONTACT.field, label: CONTACT.label, type: 'text' },
            {
                field: WALLET_RULE.field,
                label: WALLET_RULE.label,
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

    rowActions () {
        const { t } = useTranslation();
        return RowActionsOptions.map(actionItem => ({ ...actionItem, label: t(actionItem.label) }));
    }

    massActions () {
        const { t } = useTranslation();
        return MassActionOptions.map(actionItem => ({ ...actionItem, label: t(actionItem.label) }));
    }
}