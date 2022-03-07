export const ROW_ACTION_TYPES = {
  EDIT: 'edit'
};

export const SORTBY_TYPES = {
  TRUCK_NAME_AZ: "Truck Name A-Z",
  TRUCK_NAME_ZA: "Truck Name Z-A",
};


export const TruckManagement = {
  LandingPage: {
    SortByOptions: [
      "addTruckFormLabels.sortBy.truckname_atoz",
      "addTruckFormLabels.sortBy.truckname_ztoa",
    ],
    RowActionsOptions: [
      {
        label: "menus.data-grid-actions.edit",
        action: ROW_ACTION_TYPES.EDIT
      }
    ],
    DataGridFields: {
      "TRUCKNAME": {
        field: "deliveryVehicleNm", label: "TRUCK NAME"
      },
      "LICENSE": {
        field: "licenceNo", label: "LICENSE"
      },
      "VIN": {
        field: "vinNo", label: "VIN"
      },
      "MAKEORMODEL": {
        field: "makeAndModelNm", label: "MAKE/MODEL"
      },
      "COLOR": {
        field: "colorNm", label: "COLOR"
      },
      "YEAR": {
        field: "registrationYr", label: "YEAR"
      },
      "STATUS": {
        field: "activeInactiveInd", label: "STATUS"
      },
      "DRIVERS": {
        field: "drivers", label: "DRIVERS"
      },
      "LOCATIONS": {
        field: "parkingLocationCount", label: "LOCATIONS"
      },
      "TANKS": {
        field: "tankCount", label: "TANKS"
      },
      "ORDERS": {
        field: "orderCount", label: "ORDERS"
      },
    },
  }
};
