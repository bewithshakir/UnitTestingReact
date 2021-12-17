import { IDynamicFilterProps } from "../../components/UIComponents/RightInfoPanel/DynamicFilterContent.component";

export const sortByOptions = [
    //TO DO
  ];

export const filterByFields: IDynamicFilterProps['fields'] = [
  { name: 'state', label: 'customer-filter-panel.state', fieldType: 'select', optionUrlKey: 'salesTaxFilter', optionAPIResponseKey: 'states', initialValue: [] },
  { name: 'city', label: 'customer-filter-panel.city', fieldType: 'select', optionUrlKey: 'salesTaxFilter', optionAPIResponseKey: 'cities', initialValue: [] }
];
