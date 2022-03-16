import { OptionItem } from "../Select/SingleSelectPaginate";


export interface FilterDialogField {
    fieldType: 'singleSelectPaginate' | 'singleSelect' | 'multiSelect' | 'text' | 'radio' | 'checkbox' | 'date' | 'dateRange'
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
    initialValue: any
}