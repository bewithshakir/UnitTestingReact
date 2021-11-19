export const sortByOptions = [
    // "parkingLot.sortBy.paymentCompleted",
    // "parkingLot.sortBy.paymentInProgress",
    // "parkingLot.sortBy.recentlyAddedLots"
    "parkingLot.sortBy.atoz",
    "parkingLot.sortBy.ztoa"
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

export const formStatusObj = {
  success: {
      message: 'Lot Name is successfully added and Please add other details.',
      type: 'Success',
  },
  error: {
      message: 'Something went wrong. Please try again.',
      type: 'Error',
  },
};


export const timeZones = [
  { label: 'UTC (Coordinated Universal Time  -  GMT)', value: 'UTC' },
  { label: 'HST (Hawaii Standard Time  -  GMT-10:00)', value: 'HST' },
  { label: 'AST (Alaska Standard Time  -  GMT-9:00)', value: 'AST' },
  { label: 'PST (Pacific Standard Time  -  GMT-8:00)', value: 'PST' },
  { label: 'MST (Mountain Standard Time  -  GMT-7:00)', value: 'MST' },
  { label: 'CST (Central Standard Time  -  GMT-6:00)', value: 'CST' },
  { label: 'EST (Eastern Standard Time  -  GMT-5:00)', value: 'EST' },
  { label: 'IET (Indiana Eastern Standard Time  -  GMT-5:00)', value: 'IET' },
  { label: 'PNT (Phoenix Standard Time  -  GMT-7:00)', value: 'PNT' }
];

export const productDelFreq = [
  { label: 'Daily', value: 'daily' },
  { label: 'Weekly', value: 'weekly' },
  { label: 'Weekends', value: 'weekends' },
  { label: 'Monthly', value: 'monthly' },
  { label: 'Bi-Weekly', value: 'bi-weekly' },
];

export const lotHeaderBoxSx ={ width: '100%' , marginTop: '-2.5em'};
export const lotHeaderInnerBoxSx ={ borderBottom: 1, borderColor: 'divider' };

export const getCountry = () => {
  let savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    savedTheme = JSON.parse(savedTheme);
    switch (savedTheme) {
      case "USA":
        return "United States";
      case "UK":
        return "UK";
      default:
        return "United States";
    }
  }
};