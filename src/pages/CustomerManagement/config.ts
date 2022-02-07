import { IDynamicFilterProps } from "../../components/UIComponents/RightInfoPanel/DynamicFilterContent.component";
import { ExportIcon, ImportIcon, DeleteIcon } from '../../assets/icons';


export const SORTBY_TYPES = {
  CUSTOMER_NAME_AZ: "Customer Name A-Z",
  CUSTOMER_NAME_ZA: "Customer Name Z-A",
  NEWEST_TO_OLDEST: "Newest to Oldest",
  OLDEST_TO_NEW: "Oldest to New"
};

export const MASS_ACTION_TYPES = {
  IMPORT: 'import',
  EXPORT: 'export',
  DELETE: 'remove',
};


export const ROW_ACTION_TYPES = {
  EDIT: 'edit',
  DELETE: 'delete',
  CONTACT_DETAILS: 'contact details'
};

export const FilterByFields: IDynamicFilterProps['fields'] = [
  { name: 'date', label: 'Date', fieldType: 'dateRange', initialValue: [null, null] },
  { name: 'state', label: 'customer-filter-panel.state', fieldType: 'select', optionUrlKey: 'customerFilter', optionAPIResponseKey: 'states', initialValue: [] },
  { name: 'city', label: 'customer-filter-panel.city', fieldType: 'select', optionUrlKey: 'customerFilter', optionAPIResponseKey: 'cities', initialValue: [] },
  { name: 'paymentType', label: 'customer-filter-panel.settlement type', fieldType: 'select', optionUrlKey: 'customerFilter', optionAPIResponseKey: 'settlementType', initialValue: [] },
];

export const Customer = {
  LandingPage: {
    SortByOptions: [
      "customerManagement.sortBy.atoz",
      "customerManagement.sortBy.ztoa",
      "customerManagement.sortBy.newestToOldest",
      "customerManagement.sortBy.oldestToNew",
    ],
    FilterByFields,
    MassActionOptions: [
      {
        label: "menus.actions.import data",
        icon: ImportIcon,
        action: MASS_ACTION_TYPES.IMPORT
      },
      {
        label: "menus.actions.export data",
        icon: ExportIcon,
        action: MASS_ACTION_TYPES.EXPORT
      },
      {
        label: "menus.actions.delete",
        icon: DeleteIcon,
        action: MASS_ACTION_TYPES.DELETE
      },
    ],
    RowActionsOptions: [
      {
        label: "menus.data-grid-actions.edit",
        action: ROW_ACTION_TYPES.EDIT
      },
      {
        label: "menus.data-grid-actions.delete",
        action: ROW_ACTION_TYPES.DELETE
      },
      {
        label: "menus.data-grid-actions.contact details",
        action: ROW_ACTION_TYPES.CONTACT_DETAILS
      }
    ],
    Customer_DataGridFields: {
      "CUSTOMER_NAME": { field: "customerName", label: "CUSTOMER NAME" },
      "CONTACT_NAME": { field: "contactName", label: "CONTACT NAME" },
      "ADDRESS": { field: "address", label: "ADDRESS" },
      "CITY": { field: "city", label: "CITY" },
      "STATE": { field: "state", label: "STATE" },
      "ZIP": { field: "zipCode", label: "ZIP" },
      "LOTS": { field: "totalLots", label: "LOTS" },
      "SETTLEMENT_TYPE": { field: "paymentType", label: "SETTLEMENT TYPE" },
      "DATE_CREATED": { field: "createdAt", label: "DATE CREATED" },
    },
    LOT_DataGridFields: {
      "LOT_NAME": { field: "deliveryLocationNm", label: "LOT NAME" },
      "STREET_ADDRESS": { field: "streetAddress", label: "STREET ADDRESS" },
      "CITY": { field: "cityNm", label: "CITY" },
      "STATE": { field: "stateNm", label: "STATE" },
      "ZIP": { field: "postalCd", label: "ZIP" },
      "VEHICLES": { field: "vehicles", label: "VEHICLES" },
      "FUEL": { field: "fuelStatus", label: "FUEL" },
      "CONTACT": { field: 'primaryContactName', label: 'CONTACT' },
      "WALLET_RULE": { field: "walletStatus", label: "WALLET RULE" },
    },
  }
};