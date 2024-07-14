import { createBrowserRouter, Outlet } from 'react-router-dom';
import { ProjectsRoutes } from '../../modules/Projects/routes';
import { AuthenticationRoutes } from '../../modules/Authentication/routes';
import { ProtectedRoute } from '../components/ProtectedRoute';

const Router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <Outlet />
      </ProtectedRoute>
    ),
    children: [...ProjectsRoutes],
  },
  {
    path: '/auth',
    element: <Outlet />,
    children: [...AuthenticationRoutes],
  },
]);
export default Router;
