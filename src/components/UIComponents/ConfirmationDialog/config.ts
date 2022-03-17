import { FormikProps } from "formik";
import * as Yup from 'yup';

export interface OptionItem {
    label: string
    value: string
    [k: string]: any
}

type DialogfieldType = 'singleSelectPaginate' | 'singleSelect' | 'multiSelect' | 'text' | 'radio' | 'checkbox' | 'date' | 'dateRange';

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
    dateRangerPlaceHolder?:{
        start: string,
        end: string,
    }
}

export interface DialogInputProps {
    field: FilterDialogField
    fieldId: string
    formik: FormikProps<{ [k: string]: any }>
    onChange: (name: string, value: any) => any
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
export const getYupSchema = (fields: FilterDialogField[]) => {
    const yupFields = fields.reduce((acc, field) => {
        if (field.required) {
            acc[field.name] = Yup.mixed().required();
        } else {
            acc[field.name] = Yup.mixed();
        }
        acc[field.name] = Yup.mixed();
        return acc;
    }, {} as any);
    return Yup.object().shape(yupFields);
};
