export const sortByOptions = [
    "parkingLot.sortBy.paymentCompleted",
    "parkingLot.sortBy.paymentInProgress",
    "parkingLot.sortBy.recentlyAddedLots"
  ];

  export const addLotHeaderConfig = [
    {
        label: "Lot Details",
        index:0,
        containsValue: false,
    },
    {
      label: "Products",
      index:1,
      containsValue: true,
      value: 0
    },
    {
        label: "Fee Details",
        containsValue: false,
        index:2,
    },
    {
      label: "Items",
      index:3,
      containsValue: true,
      value:0
    },
    {
      label: "Wallets",
      index:4,
      containsValue: true,
      value:0
    }
];