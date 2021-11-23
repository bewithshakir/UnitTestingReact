import { IDynamicFilterProps } from "../../../components/UIComponents/RightInfoPanel/DynamicFilterContent.component";

export const sortByOptions = [
    "customerManagement.sortBy.atoz",
    "customerManagement.sortBy.ztoa",
    "customerManagement.sortBy.newestToOldest",
    "customerManagement.sortBy.oldestToNew",
  ];

export const filterByFields: IDynamicFilterProps['fields'] = [
  { name: 'state', label: 'customer-filter-panel.state', fieldType: 'select', optionUrlKey: 'customerFilter', optionAPIResponseKey: 'states', initialValue: [] },
  { name: 'city', label: 'customer-filter-panel.city', fieldType: 'select', optionUrlKey: 'customerFilter', optionAPIResponseKey: 'cities', initialValue: [] }
];