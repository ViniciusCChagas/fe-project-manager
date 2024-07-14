import { createContext, ReactNode, useContext, useMemo, useState } from 'react';
import { IUser } from '../models/user.model.ts';

interface IAuthContext {
  user: IUser | null;
  saveUser: (data: IUser) => void;
  logout: () => void;
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext);

interface IAuthProviderProps {
  children?: ReactNode;
}

export const AuthProvider = ({ children }: IAuthProviderProps) => {
  const [user, setUser] = useState<IUser | null>(getUserFromStorage());

  const saveUser = async (user: IUser) => {
    window.localStorage.setItem('pm:user', JSON.stringify(user));
    setUser(user);
  };

  const logout = () => {
    window.localStorage.removeItem('pm:user');
    setUser(null);
  };

  function getUserFromStorage() {
    const user = window.localStorage.getItem('pm:user');
    return user ? JSON.parse(user) : null;
  }

  const value = useMemo(
    () => ({
      user,
      saveUser,
      logout,
    }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
