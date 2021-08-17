import React, { createContext, Dispatch, useState } from 'react';
import Done from '../components/Done';
import Error from '../components/Error';
import Load from '../components/Load';

export type TModal = '' | 'add' | 'edit' | 'delete';

interface IAppContext {
  loading: boolean;
  setLoading: Dispatch<boolean>;
  error: boolean;
  errorMessage: string;
  handleError: (message: string | undefined) => void;
  modal: boolean;
  setModal: Dispatch<boolean>;
  currentModal: TModal;
  setCurrentModal: Dispatch<TModal>;
  done: () => void;
}

export const AppContext = createContext<IAppContext>({} as any);

const AppProvider: React.FC = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>(
    'Algo de errado aconteceu'
  );
  const [renderDone, setRenderDone] = useState<boolean>(false);
  const [modal, setModal] = useState<boolean>(false);
  const [currentModal, setCurrentModal] = useState<TModal>('');

  const done = (): void => {
    setRenderDone(true);
    setTimeout(() => {
      setRenderDone(false);
    }, 600);
  };

  const handleError = (message: string | undefined): void => {
    setError(true);
    const text = message ? message : 'Something is wrong.';
    setErrorMessage(text);
  };

  return (
    <AppContext.Provider
      value={{
        loading,
        setLoading,
        error,
        errorMessage,
        handleError,
        modal,
        setModal,
        currentModal,
        setCurrentModal,
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
