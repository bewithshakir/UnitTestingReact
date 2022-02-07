import { ExportIcon } from '../../assets/icons';
import { IDynamicFilterProps } from '../../components/UIComponents/RightInfoPanel/DynamicFilterContent.component';

export type ProductType = {
  cityFuelTax: number
  countyFuelTax: number
  currencyCd: string
  endDate: string
  fedFuelTax: number
  miscInspFuelTax: number
  miscLoadFuelTax: number
  miscLocalFuelTax: number
  productCd: string
  productClassCd: string
  productGroupCd: string
  productId: string
  revenueFuelRate: number
  saleableProductNm: string
  salesFuelRate: number
  startDate: string
  stateFuelTax: number
}
export type FuelTaxType = {
  cityName: string,
  countryName: string,
  stateName: string
  taxJurisdictionId: string,
}
export interface FuelListData extends FuelTaxType {
  products: ProductType[],
}

export const MASS_ACTION_TYPES = {
  EXPORT: 'export',
};

export const SORTBY_TYPES = {
  CITY_NAME_AZ: "City Name A-Z",
  CITY_NAME_ZA: "City Name Z-A",
};

export const FilterByFields: IDynamicFilterProps['fields'] = [
  { name: 'state', label: 'taxes.fuelTax.filter.state', fieldType: 'select', optionUrlKey: 'fuelTaxFilter', optionAPIResponseKey: 'states', initialValue: [] },
  { name: 'city', label: 'taxes.fuelTax.filter.city', fieldType: 'select', optionUrlKey: 'fuelTaxFilter', optionAPIResponseKey: 'cities', initialValue: [] },
];

export const FuelTax = {
  LandingPage: {
    SortByOptions: [
      "taxes.fuelTax.sortBy.cityname_atoz",
      "taxes.fuelTax.sortBy.cityname_ztoa",
    ],
    FilterByFields,
    MassActionOptions: [
      {
        label: "menus.actions.export data",
        icon: ExportIcon,
        action: MASS_ACTION_TYPES.EXPORT
      },
    ],
    DataGridFields: {
      "CITY": {
        field: "cityName", label: "CITY"
      },
      "STATE": {
        field: "stateName", label: "STATE"
      },
      "PRODUCT": {
        field: "productsCount", label: "PRODUCT"
      },
      "PRODUCT2": {
        field: "productsCount", label: "PRODUCT2"
      },
      "PRODUCT3": {
        field: "productsCount", label: "PRODUCT3"
      }
    },
  }
};
