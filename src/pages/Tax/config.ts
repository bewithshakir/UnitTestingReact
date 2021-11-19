import { ExportIcon } from '../../assets/icons';

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

export const FuelTax = {
  LandingPage: {
    SortByOptions: [
      "taxes.fuelTax.sortBy.cityname_atoz",
      "taxes.fuelTax.sortBy.cityname_ztoa",
    ],
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
        field: "productCount", label: "PRODUCT"
      }
    },
  }
};
