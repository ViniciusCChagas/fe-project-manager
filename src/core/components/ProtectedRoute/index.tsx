import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth.tsx';
import { ReactNode } from 'react';

interface IProtectedRouteProps {
  children: ReactNode;
}

export const ProtectedRoute = ({ children }: IProtectedRouteProps) => {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to='/auth/login' />;
  }
  return children;
};
