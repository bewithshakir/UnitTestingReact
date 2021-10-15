import { lazy } from 'react';

export const routes = [
  {
    path: "/",
    component: lazy(() => import("./pages/CustomerManagement")),
    sidebarName: 'Home',
    exact: true
  },
  {
    path: "/customer",
    component: lazy(() => import('./pages/CustomerOnboarding')),
    routes: [
      {
        path: "/customer/addCustomer",
        component: lazy(() => import('./pages/CustomerOnboarding/AddCustomer/AddCustomer')),
        exact: true
      },
      {
        path: "/customer/viewCustomer",
        component: lazy(() => import('./pages/CustomerOnboarding/AddCustomer/AddCustomer')),
        exact: true
      }]
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