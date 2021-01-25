import React, { createContext, Dispatch, useState } from 'react';
import Error from './components/Error';
import Load from './components/Load';

interface IAppContext {
  loading: boolean;
  setLoading: Dispatch<boolean>;
  error: boolean;
  setError: Dispatch<boolean>;
  errorMessage: string;
  setErrorMessage: Dispatch<string>;
}

export const AppContext = createContext<IAppContext>({
  loading: false,
  error: false,
  errorMessage: '',
  setLoading: (): void => {},
  setError: (): void => {},
  setErrorMessage: (): void => {},
});

const AppProvider: React.FC = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>(
    'Algo de errado aconteceu'
  );

  return (
    <AppContext.Provider
      value={{
        loading,
        setLoading,
        error,
        setError,
        errorMessage,
        setErrorMessage,
      }}
    >
      {children}
      {loading && <Load />}
      {error && <Error message={errorMessage} setError={setError} />}
    </AppContext.Provider>
  );
};

export default AppProvider;
