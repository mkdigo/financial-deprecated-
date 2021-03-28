import React, { createContext, Dispatch, useState } from 'react';
import Done from './components/Done';
import Error from './components/Error';
import Load from './components/Load';

interface IAppContext {
  loading: boolean;
  setLoading: Dispatch<boolean>;
  error: boolean;
  setError: Dispatch<boolean>;
  errorMessage: string;
  setErrorMessage: Dispatch<string>;
  done: () => void;
}

export const AppContext = createContext<IAppContext>({
  loading: false,
  error: false,
  errorMessage: '',
  setLoading: (): void => {},
  setError: (): void => {},
  setErrorMessage: (): void => {},
  done: (): void => {},
});

const AppProvider: React.FC = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>(
    'Algo de errado aconteceu'
  );
  const [renderDone, setRenderDone] = useState<boolean>(false);

  const done = (): void => {
    setRenderDone(true);
    setTimeout(() => {
      setRenderDone(false);
    }, 600);
  };

  return (
    <AppContext.Provider
      value={{
        loading,
        setLoading,
        error,
        setError,
        errorMessage,
        setErrorMessage,
        done,
      }}
    >
      {children}
      {loading && <Load />}
      {error && <Error message={errorMessage} setError={setError} />}
      {renderDone && <Done />}
    </AppContext.Provider>
  );
};

export default AppProvider;
