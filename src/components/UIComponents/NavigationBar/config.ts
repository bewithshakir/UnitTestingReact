export const taxesNavBar = [
    {
        index: 1,
        label: "taxes.navBar.fuelTax",
        to: "/taxes"
    },
    {
        index: 2,
        label: "taxes.navBar.salesTax",
        to: "/salesTax"
    },
    {
        index: 3,
        label: "taxes.navBar.opisCities",
        to: "/opisCities"
    },
    {
        index: 4,
        label: "taxes.navBar.productManagement",
        to: "/productManagement"
    },
    {
        index: 5,
        label: "taxes.navBar.assetManagement",
        to: "/assetManagement"
    },
    {
        index: 6,
        label: "taxes.navBar.vehicleRule",
        to: "/vehicleRule"
    }
];

export const customerNavBar = [
    {
        index: 1,
        label: "Customer List",
        to: "/"
    },
    {
        index: 2,
        label: "Parking Lots",
        to: "/parkinglots"
    },
    {
        index: 3,
        label: "Vehicles",
        to: "/vehicles"
    },
    {
        index: 4,
        label: "Users",
        to: "/users"
    },
    {
        index: 5,
        label: "Invoices",
        to: "/invoices"
    },
    {
        index: 6,
        label: "Wallets",
        to: "#"
    },
];

export const truckNavBar = [
    {
        index: 1,
        label: "truck.navBar.overview",
        to: "/trucks"
    },
    {
        index: 2,
        label: "truck.navBar.liveMap",
        to: "#"
    },
    {
        index: 3,
        label: "truck.navBar.truckPlot",
        to: "/truckParkingLot"
    },
];

export const modelBackConfig = [
    {
        path: "/salesTax/add",
        backTo: "/salesTax",
    },
    {
        path: "/salesTax/edit",
        backTo: "/salesTax",
    },
    {
        path: "/opisCities/add",
        backTo: "/opisCities",
    },
    {
        path: "/opisCities/edit",
        backTo: "/opisCities",
    },
    {
        path: "/productManagement/add",
        backTo: "/productManagement",
    },
    {
        path: "/productManagement/edit",
        backTo: "/productManagement",
    },
    {
        path: "/truckParkingLot/add",
        backTo: "/truckParkingLot",
    },
    {
        path: "/truckParkingLot/edit",
        backTo: "/truckParkingLot",
    },
    {
        path: "/assetManagement/add",
        backTo: "/assetManagement",
    },
    {
        path: "/assetManagement/edit",
        backTo: "/assetManagement",
    },
    {
        path: "/addFuelTax",
        backTo: "/taxes",
    },
    {
        path: "/editFuelTax",
        backTo: "/taxes",
    },
    {
        path: "/trucks/addTruck",
        backTo: "/trucks",
    },
    {
        path: "/trucks/editTruck",
        backTo: "/trucks",
    },
    {
        path: "/vehicleRule/add",
        backTo: "/vehicleRule",
    }
];