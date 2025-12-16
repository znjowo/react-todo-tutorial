import React from 'react';
import { createBrowserRouter, RouterProvider, RouteObject } from 'react-router-dom';

import Top from '../components/top/index';

const routeConfig: RouteObject[] = [
  {
    path: '/',
    element: <Top />,
  },
];

const router = createBrowserRouter(routeConfig);

const Router: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default Router;
