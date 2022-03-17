import { FormikProps } from "formik";
import * as Yup from 'yup';

export interface OptionItem {
    label: string
    value: string
    [k: string]: any
}

type DialogfieldType = 'singleSelectPaginate'
    | 'singleSelect'
    | 'multiSelect'
    | 'text'
    | 'radio'
    | 'checkbox'
    | 'date'
    | 'dateRange';

export interface FilterDialogField {
    fieldType: DialogfieldType;
    name: string;
    label: string;
    placeHolder?: string;
    required?: boolean;
    apiUrl?: string
    extraApiParams?: { [k: string]: any }
    /** default search */
    searchFieldName?: string
    responseFormatter?: (data: any) => OptionItem[]
    options?: OptionItem[]
    initialValue?: any
    disabled?: boolean;
    value?: any;
    dateRangerPlaceHolder?: {
        start: string,
        end: string,
    }
}

export interface DialogInputProps {
    field: FilterDialogField
    fieldId: string
    formik: FormikProps<{ [k: string]: any }>
    onChange: (name: string, value: any) => any
    hanleTouched: (name: string) => any
}

export interface DailogProps {
    title: string;
    open: boolean;
    cancelBtnTitle?: string,
    nextBtnTitle?: string,
    handleToggle: () => void;
    handleConfirm: (data: { [k: string]: any }) => void;
    fields: FilterDialogField[]
}

const optionSchema = {
    optional: Yup.object().shape({ label: Yup.string(), value: Yup.string() }),
    required: Yup.object().shape({
        label: Yup.string().required('Required'),
        value: Yup.string().required('Required')
    }).required('Required')
};

const validationSchema = {
    'singleSelectPaginate': optionSchema,
    'singleSelect': optionSchema,
    'multiSelect': { optional: Yup.array().of(optionSchema.required), required: Yup.array().of(optionSchema.required).required() },
    'text': { optional: Yup.string(), required: Yup.string().required() },
    'date': { optional: Yup.mixed(), required: Yup.mixed().required() },
    'dateRange': { optional: Yup.array().of(Yup.mixed()), required: Yup.array().of(Yup.mixed()).required() },
    'checkbox': { optional: Yup.mixed(), required: Yup.mixed().required() },
    'radio': { optional: Yup.mixed(), required: Yup.mixed().required() },
};

export const getYupSchema = (fields: FilterDialogField[]) => {
    const yupFields = fields.reduce((acc, field) => {
        acc[field.name] = field.required
            ? validationSchema[field.fieldType].required
            : validationSchema[field.fieldType].optional;
        return acc;
    }, {} as any);
    return Yup.object().shape(yupFields);
};

const fuelTaxFormatter = (axiosData: any) => {
    if (!axiosData || !axiosData.cities) {
        return [];
    }
    return axiosData.cities.map((item: any) => ({ value: item, label: item }));
};

export const dynamicPopupFields = [
    {
        name: 'fuelType',
        label: 'Select fuel type',
        required: true,
        fieldType: 'singleSelect',
        options: [{ label: 'fuel', value: 'fuel' }, { label: 'Non fuel', value: 'non fuuuuu' }],
        initialValue: { label: '', value: '' }

    },
    {
        name: 'multiFuelType',
        label: 'Select multiple fuel type',
        required: true,
        fieldType: 'multiSelect',
        options: [{ label: 'fuel', value: 'fuel' }, { label: 'Non fuel', value: 'non fuuuuu' }],
        initialValue: []
    },
    {
        name: 'multiCity',
        label: 'Multiple Select city',
        required: true,
        fieldType: 'multiSelect',
        apiUrl: '/api/tax-service/fuel-taxes/filter-options',
        responseFormatter: fuelTaxFormatter,
        extraApiParams: { countryCode: 'us' },
        placeHolder: 'Select multiple city',
        initialValue: []
    },
    {
        name: 'input123',
        label: 'Name',
        required: true,
        fieldType: 'text',
        initialValue: ""
    },
    {
        name: 'deliveryDate',
        label: 'delivery Date',
        required: true,
        fieldType: 'date',
        initialValue: null,
        placeHolder: 'select delivery date'
    },
    {
        name: 'pickupDateRange',
        label: 'Select Pickup Dates',
        required: true,
        fieldType: 'dateRange',
        initialValue: [null, null],
        dateRangerPlaceHolder: { start: "Start", end: "End" }
    },
    {
        name: 'addFuelTax',
        label: 'Add fuel tax',
        fieldType: 'checkbox',
        initialValue: false,
        required: true,
        disabled: false
    },
    {
        name: 'productType',
        label: 'Opis rack',
        fieldType: 'radio',
        initialValue: '',
        disabled: false,
        required: true,
        value: 'val1'
    },
    {
        name: 'productType',
        label: 'Opis retail',
        fieldType: 'radio',
        initialValue: '',
        disabled: false,
        required: true,
        value: 'val2'
    },
    {
        name: 'productType',
        label: 'Custom',
        fieldType: 'radio',
        initialValue: '',
        disabled: false,
        required: true,
        value: 'val3'
    },
    {
        name: 'city',
        label: 'Select city',
        required: true,
        fieldType: 'singleSelect',
        apiUrl: '/api/tax-service/fuel-taxes/filter-options',
        responseFormatter: fuelTaxFormatter,
        extraApiParams: { countryCode: 'us' },
        placeHolder: 'Select City',
    }];
