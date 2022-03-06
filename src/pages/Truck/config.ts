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
    ]
  }
};