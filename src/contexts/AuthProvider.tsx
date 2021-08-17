import React, { createContext, useEffect, useState } from 'react';
import AuthApi from '../api/AuthApi';
import Load from '../components/Load';
import { getToken } from '../helpers';

interface IUser {
  id: number;
  name: string;
  email: string;
  username: string;
  is_admin: boolean;
  active: boolean;
}

interface IAuthContext {
  user: IUser | undefined;
  setUser: React.Dispatch<IUser>;
}

export const AuthContext = createContext<IAuthContext>({} as any);

const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<IUser | undefined>();
  const [firstLoad, setFirstLoad] = useState<boolean>(true);

  useEffect(() => {
    (async () => {
      const token = getToken();
      if (token) {
        const response = await AuthApi.me();
        setFirstLoad(false);

        if (!response.success) return;

        setUser(response.data);
      } else setFirstLoad(false);
    })();
  }, []);

  if (firstLoad) return <Load />;

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
