import { lazy } from 'react';

export interface RouteConfig {
  path: string;
  component: React.ComponentType<any>;
}

const routes: RouteConfig[] = [
  {
    path: '/',
    component: lazy(() => import('@pages/Home/index')),
  },
  {
    path: '/about',
    component: lazy(() => import('@pages/About/index')),
  },
];

export default routes;
