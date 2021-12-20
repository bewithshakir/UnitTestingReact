import { ExportIcon } from '../../assets/icons';
import { IDynamicFilterProps } from '../../components/UIComponents/RightInfoPanel/DynamicFilterContent.component';

export interface IAddOPISCity{
  countryCd: string,
  state: string,
  city: string,
  cityId: string
}

export const formStatusObj = {
  success: {
    message: 'Product is successfully added',
    type: 'Success',
  },
  error: {
    message: 'Something went wrong. Please try again.',
    type: 'Error',
  },
};

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
  { name: 'state', label: 'taxes.opisCities.filter.state', fieldType: 'select', optionUrlKey: 'opisCityFilter', optionAPIResponseKey: 'states', initialValue: [] },
  { name: 'city', label: 'taxes.opisCities.filter.city', fieldType: 'select', optionUrlKey: 'opisCityFilter', optionAPIResponseKey: 'cities', initialValue: [] },
];

export const OPISCity = {
  LandingPage: {
    SortByOptions: [
      "taxes.opisCities.sortBy.cityname_atoz",
      "taxes.opisCities.sortBy.cityname_ztoa",
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
      "CITYID": {
        field: "cityId", label: "CITY ID"
      },
      "CITY": {
        field: "cityName", label: "CITY"
      },
      "STATE": {
        field: "stateName", label: "STATE"
      },
    },
  }
};
