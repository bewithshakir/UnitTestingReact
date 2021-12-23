import { IDynamicFilterProps } from "../../components/UIComponents/RightInfoPanel/DynamicFilterContent.component";
import { ExportIcon } from '../../assets/icons';


export const MASS_ACTION_TYPES = {
  EXPORT: 'export',
};

export const SORTBY_TYPES = {
  CITY_NAME_AZ: "City Name A-Z",
  CITY_NAME_ZA: "City Name Z-A",
};

export const ROW_ACTION_TYPES = {
  EDIT: 'edit'
};

export const FilterByFields: IDynamicFilterProps['fields'] = [
  { name: 'state', label: 'productManagement.filter.state', fieldType: 'select', optionUrlKey: 'salesTaxFilter', optionAPIResponseKey: 'states', initialValue: [] },
  { name: 'city', label: 'productManagement.filter.city', fieldType: 'select', optionUrlKey: 'salesTaxFilter', optionAPIResponseKey: 'cities', initialValue: [] }
];


export const ProductManagement = {
  LandingPage: {
    SortByOptions: [
      "productManagement.sortBy.cityname_atoz",
      "productManagement.sortBy.cityname_ztoa",
    ],
    FilterByFields,
    MassActionOptions: [
      {
        label: "menus.actions.export data",
        icon: ExportIcon,
        action: MASS_ACTION_TYPES.EXPORT
      },
    ],
    RowActionsOptions: [
      {
        label: "menus.data-grid-actions.edit",
        action: ROW_ACTION_TYPES.EDIT
      },
    ],
    DataGridFields: {
      "PRODUCTNAME": {
        field: "product", label: "PRODUCT NAME"
      },
      "PRODUCTTYPE": {
        field: "productType", label: "PRODUCT TYPE"
      },
      "STATUS": {
        field: "status", label: "STATUS"
      },
      "MANUALPRICING": {
        field: "pricing", label: "MANUAL PRICING (NON-FUEL PRODUCTS)"
      },
    },
  }
};