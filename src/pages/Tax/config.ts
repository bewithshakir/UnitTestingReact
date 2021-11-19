import { ExportIcon } from '../../assets/icons';

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
