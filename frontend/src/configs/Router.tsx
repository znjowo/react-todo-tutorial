import { createBrowserRouter, RouterProvider, RouteObject, Outlet } from 'react-router-dom';
import { Box } from '@mui/material';

import { AuthProvider } from '../contexts/AuthContext';
import { Header } from '../components/layout/Header';
import { PrivateRoute } from '../components/layout/PrivateRoute';
import { LoginForm } from '../components/auth/LoginForm';
import { RegisterForm } from '../components/auth/RegisterForm';
import { GroupList } from '../components/group/GroupList';
import { GroupDetail } from '../components/group/GroupDetail';
import Top from '../components/top/index';

const Layout = () => {
  return (
    <Box>
      <Header />
      <Box sx={{ p: 2 }}>
        <Outlet />
      </Box>
    </Box>
  );
};

const routeConfig: RouteObject[] = [
  {
    element: <Layout />,
    children: [
      {
        path: '/login',
        element: <LoginForm />,
      },
      {
        path: '/register',
        element: <RegisterForm />,
      },
      {
        element: <PrivateRoute />,
        children: [
          {
            path: '/',
            element: <Top />,
          },
          {
            path: '/groups',
            element: <GroupList />,
          },
          {
            path: '/groups/:id',
            element: <GroupDetail />,
          },
        ],
      },
    ],
  },
];

const router = createBrowserRouter(routeConfig);

const Router = () => {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
};

export default Router;
