import { ExportIcon } from '../../assets/icons';

export const MASS_ACTION_TYPES = {
  EXPORT: 'export',
};

export const FuelTax = {
  LandingPage: {
    SortByOptions: [
      "customerManagement.sortBy.atoz",
      "customerManagement.sortBy.ztoa",
      "customerManagement.sortBy.newestToOldest",
      "customerManagement.sortBy.oldestToNew",
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
        field: "stateName", label: "STATE"
      }
    },
  }
};