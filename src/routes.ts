import { lazy } from 'react';

export const routes = [
    {
      path: "/",
      component: lazy(() => import('./containers/Home')),
      exact: true,
      redirect: '/query',
    },
    {
      path: "/query",
      component: lazy(() => import('./containers/QueryTest')),
      exact: false,
      private: false
    }
  ];