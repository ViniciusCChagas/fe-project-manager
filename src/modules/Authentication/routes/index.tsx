import { LoginPage } from '../pages/login';
import { RegisterPage } from '../pages/register';

export const AuthenticationRoutes = [
  {
    path: '/auth/login',
    element: <LoginPage />,
  },
  {
    path: '/auth/register',
    element: <RegisterPage />,
  },
];
