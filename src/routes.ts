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
        path: "/customer/parkingLots",
        component: lazy(() => import("./pages/ParkingLot")),
        version: "Breadcrumbs-Single",
        exact: true,
      },
      {
        path: "/customer/parkingLots/addLot",
        component: lazy(() => import('./pages/ParkingLot/AddLot/AddLotWrapper')),
        exact: false,
        version:'Breadcrumbs-Many'
      },
    ]
  },
  {
    path: "/taxes",
    component: lazy(() => import("./pages/AddFuelTax")),
    version: "Breadcrumbs-Single",
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