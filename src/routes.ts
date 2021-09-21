import { lazy } from 'react';

export const routes = [
    {
      path: "/",
      component: lazy(() => import('./pages/Home')),
      exact: true,
      redirect: '/query',
    },
    {
      path: "/query",
      component: lazy(() => import('./pages/QueryTest')),
      exact: false,
      private: false
    }
  ];