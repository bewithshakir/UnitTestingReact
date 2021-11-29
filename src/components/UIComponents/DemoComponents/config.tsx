import { IDynamicFilterProps } from "../RightInfoPanel/DynamicFilterContent.component";

import { YellowFuelIcon, RedFuelIcon, GreenFuelIcon } from '../../../assets/icons';

export const boxSX = { width: '170px' };

export const filterByFields: IDynamicFilterProps['fields'] = [
    { name: 'inputText1', label: 'ENTER TEXT HERE', fieldType: 'text', initialValue: '' },
    { name: 'singleDate', label: 'SINGLE DATE', fieldType: 'date', initialValue: null },
    { name: 'date', label: 'DATE', fieldType: 'dateRange', initialValue: [null, null] },
    {
        name: 'SingleApi', label: 'Single Select State API', fieldType: 'select', singleSelect: true,
        optionUrlKey: 'customerFilter',
        optionAPIResponseKey: 'states', initialValue: null
    },
    {
        name: 'SingleSelect1', label: 'Single Select', fieldType: 'select', singleSelect: true, options: [{ label: 'Regular', value: 'Regular', icon: <YellowFuelIcon /> },
        { label: 'Premium', value: 'Premium', icon: <RedFuelIcon /> },
        {
            label: 'Diesel', value: 'Diesel', icon: <GreenFuelIcon />
        },], initialValue: null
    },
    {
        name: 'withIcon', label: 'With Icon', fieldType: 'select', options: [{ label: 'Regular', value: 'Regular', icon: <YellowFuelIcon /> },
        { label: 'Premium', value: 'Premium', icon: <RedFuelIcon /> },
        {
            label: 'Diesel', value: 'Diesel', icon: <GreenFuelIcon />
        },], initialValue: ['']
    },
    { name: 'city', label: 'customer-filter-panel.city', fieldType: 'select', optionUrlKey: 'customerFilter', optionAPIResponseKey: 'cities', initialValue: [] },
    { name: 'paymentType', label: 'customer-filter-panel.settlement type', fieldType: 'select', optionUrlKey: 'customerFilter', optionAPIResponseKey: 'settlementType', initialValue: [] },

    { name: 'singleCheckbox', label: 'SINGLE CHECKBOX', fieldType: "checkbox", initialValue: "" },

    { name: 'multiselect', label: 'MULTI CHECKBOX', fieldType: 'multiCheckbox', initialValue: [], options: [{ label: 'checkbox1', value: 'cb1' }, { label: 'cbbbb2', value: 'cb2' }, { label: 'cb3', value: 'cb3' }] },
    { name: 'radiotest', label: 'RADIO TEST', fieldType: 'radio', initialValue: null, options: [{ label: 'radio1', value: 'radiooo1' }, { label: 'radio2', value: 'radiooooo2' }] }
];