import { IDynamicFilterProps } from "../../components/UIComponents/RightInfoPanel/DynamicFilterContent.component";

export const sortByOptions = [
    "assetManagement.sortBy.payment in progress",
    "assetManagement.sortBy.recently added lots"
  ];


export const filterByFields: IDynamicFilterProps['fields'] = [
    { name: 'state', label: 'customer-filter-panel.state', fieldType: 'select', optionUrlKey: 'assetFilter', optionAPIResponseKey: 'states', initialValue: [] },
    { name: 'city', label: 'customer-filter-panel.city', fieldType: 'select', optionUrlKey: 'assetFilter', optionAPIResponseKey: 'cities', initialValue: [] }
  ];