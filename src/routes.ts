import { lazy } from 'react';

export const routes = [
  {
    path: "/",
    component: lazy(() => import("./pages/CustomerManagement")),
    sidebarName: 'Home',
    version: "NavLinks",
    exact: true
  },
  {
    path: "/customer",
    version: "Breadcrumbs-Single",
    component: lazy(() => import('./pages/CustomerOnboarding')),
    routes: [
      {
        path: "/customer/addCustomer",
        component: lazy(() => import('./pages/CustomerOnboarding/AddCustomer/AddCustomer')),
        version: "Breadcrumbs-Single",
        exact: true
      },
      {
        path: "/customer/viewCustomer/:customerId",
        component: lazy(() => import('./pages/CustomerOnboarding/AddCustomer/AddCustomer')),
        version: "Breadcrumbs-Single",
        exact: true
      },
      {
        path: "/customer/:customerId/parkingLots",
        component: lazy(() => import("./pages/ParkingLot")),
        version: "Breadcrumbs-Single",
        exact: true,
      },
      {
        path: "/customer/:customerId/parkingLots/addLot",
        component: lazy(() => import('./pages/ParkingLot/AddLot/AddLotWrapper')),
        exact: true,
        version: 'Breadcrumbs-Many'
      },
      {
        path: "/customer/:customerId/parkingLots/viewLot/:parkinglotId",
        component: lazy(() => import('./pages/ParkingLot/AddLot/AddLotWrapper')),
        exact: true,
        version: 'Breadcrumbs-Many'
      }
    ]
  },
  {
    path: "/taxes",
    component: lazy(() => import("./pages/Tax")),
    version: "NavLinks",
    exact: false
  },
  {
    path: "/addFuelTax",
    version: "Breadcrumbs-Single",
    component: lazy(() => import('./pages/AddFuelTax')),
    exact: false
  },
  {
    path: "/editFuelTax",
    version: "Breadcrumbs-Single",
    component: lazy(() => import('./pages/AddFuelTax')),
    exact: false
  },
  {
    path: "/salesTax",
    component: lazy(() => import("./pages/Tax/SalesTax")),
    version: "Breadcrumbs-Many",
    exact: true
  },
  {
    path: "/salesTax/add",
    version: "Breadcrumbs-Single",
    component: lazy(() => import('./pages/AddSalesTax/AddSalesTax')),
    exact: true,
  },
  {
    path: "/salesTax/edit/",
    version: "Breadcrumbs-Single",
    component: lazy(() => import('./pages/AddSalesTax/AddSalesTax')),
    exact: true,
  },
  {
    path: "/query",
    component: lazy(() => import('./pages/QueryTest')),
    exact: false,
  },
  {
    path: "/demo",
    component: lazy(() => import('./pages/DemoComponents/DemoComponents')),
    exact: false,
  }
];