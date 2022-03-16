import { OptionItem } from "../Select/SingleSelectPaginate";


export interface FilterDialogField {
    name: string;
    label: string;
    placeHolder?: string;
    required?: boolean;
    fieldType: 'singleSelectPaginate' | 'singleSelect' | 'multiSelect' | 'text' | 'radio' | 'checkbox' | 'date' | 'dateRange'
    apiUrl?: string
    extraApiParams?: { [k: string]: any }
    /** default search */
    searchFieldName?: string
    responseFormatter?: (data: any) => OptionItem[]
    options?: OptionItem[]
    initialValue: any
}