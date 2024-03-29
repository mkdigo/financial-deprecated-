import React, { createContext, useEffect, useState } from 'react';
import AuthApi, { IUser } from '../api/AuthApi';
import Load from '../components/Load';
import { getToken } from '../helpers';

interface IAuthContext {
  authUser: IUser | undefined;
  setAuthUser: React.Dispatch<IUser>;
}

export const AuthContext = createContext<IAuthContext>({} as any);

const AuthProvider: React.FC = ({ children }) => {
  const [authUser, setAuthUser] = useState<IUser | undefined>();
  const [firstLoad, setFirstLoad] = useState<boolean>(true);

  useEffect(() => {
    (async () => {
      const token = getToken();

      if (token) {
        const response = await AuthApi.me();

        if (!response.success) return;

        setAuthUser(response.data);
      }

      setFirstLoad(false);
    })();
  }, []);

  if (firstLoad) return <Load />;

  return (
    <AuthContext.Provider
      value={{
        authUser,
        setAuthUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
