import { ExportIcon } from '../../assets/icons';
import { IDynamicFilterProps } from '../../components/UIComponents/RightInfoPanel/DynamicFilterContent.component';

export const MASS_ACTION_TYPES = {
  EXPORT: 'export',
};

export const SORTBY_TYPES = {
  LOT_NAME_AZ: "Lot Name A-Z",
  LOT_NAME_ZA: "Lot Name Z-A",
};

export const ROW_ACTION_TYPES = {
  EDIT: 'edit'
};

export const FilterByFields: IDynamicFilterProps['fields'] = [
  { name: 'date', label: 'Date', fieldType: 'dateRange', initialValue: [null, null] },
  { name: 'filterCustomer', label: 'parkingLotManagement.filter.customername', fieldType: 'select', optionUrlKey: 'parkingLotManagementFilter', optionAPIResponseKey: 'customernames', initialValue: [] },
  { name: 'state', label: 'parkingLotManagement.filter.state', fieldType: 'select', optionUrlKey: 'parkingLotManagementFilter', optionAPIResponseKey: 'states', initialValue: [] },
  { name: 'city', label: 'parkingLotManagement.filter.city', fieldType: 'select', optionUrlKey: 'parkingLotManagementFilter', optionAPIResponseKey: 'cities', initialValue: [] },
  { name: 'postal', label: 'parkingLotManagement.filter.zip', fieldType: 'select', optionUrlKey: 'parkingLotManagementFilter', optionAPIResponseKey: 'zipcode', initialValue: [] },
  { name: 'walletStatus', label: 'parkingLotManagement.filter.wallet status', fieldType: 'select', optionUrlKey: 'parkingLotManagementFilter', optionAPIResponseKey: 'walletStatus', initialValue: [] },
  { name: 'filterProduct', label: 'parkingLotManagement.filter.fuel type', fieldType: 'select', optionUrlKey: 'parkingLotManagementFilter', optionAPIResponseKey: 'fuelType', initialValue: [] },

];

export const AllParkingLots = {
  LandingPage: {
    SortByOptions: [
      "parkingLotManagement.sortBy.lotname_atoz",
      "parkingLotManagement.sortBy.lotname_ztoa",
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
      "DELIVERYLOCATION_NM": {
        field: "deliveryLocationNm", label: "LOT NAME",
      },
      "LOT_ID": {
        field: "lotId", label: "LOT ID",
      },
      "CUSTOMER_NAME": {
        field: "customerName", label: "CUSTOMER NAME",
      },
      "LOT_CONTACT": {
        field: "primaryContactName", label: "LOT CONTACT",
      },
      "STREET_ADDRESS": {
        field: "streetAddress", label: "STREET ADDRESS"
      },
      "CITY": {
        field: "cityNm", label: "CITY"
      },
      "STATE": {
        field: "stateNm", label: "STATE"
      },
      "ZIP": {
        field: "postalCd", label: "ZIP"
      },
      "RACK_UPDATE": {
        field: "rackUpdate", label: "RACK UPDATE"
      },
      "WALLET_STATUS": {
        field: "walletStatus", label: "WALLET STATUS"
      },
      "FUEL": {
        field: "fuelStatus", label: "FUEL"
      },
      "VEHICLES": {
        field: "vehicles", label: "VEHICLES"
      },
    },
  }
};
