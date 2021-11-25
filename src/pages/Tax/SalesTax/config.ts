import { IDynamicFilterProps } from "../../../components/UIComponents/RightInfoPanel/DynamicFilterContent.component";

export const sortByOptions = [
    "taxes.salesTax.sortBy.cityname_atoz",
    "taxes.salesTax.sortBy.cityname_ztoa",
  ];
  
export const filterByFields: IDynamicFilterProps['fields'] = [
  { name: 'state', label: 'customer-filter-panel.state', fieldType: 'select', optionUrlKey: 'customerFilter', optionAPIResponseKey: 'states', initialValue: [] },
  { name: 'city', label: 'customer-filter-panel.city', fieldType: 'select', optionUrlKey: 'customerFilter', optionAPIResponseKey: 'cities', initialValue: [] }
];
