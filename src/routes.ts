import { lazy } from 'react';

export const routes = [
  {
    path: "/",
    component: lazy(() => import('./pages/Home')),
    sidebarName: 'Home',
    exact: true,
    version: "NavLinks",
    routes: [
      {
        path: "/addCustomer",
        component: lazy(() => import('./pages/AddCustomer/AddCustomer')),
        version: "Breadcrumbs-Single",
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