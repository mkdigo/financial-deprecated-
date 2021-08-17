import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppProvider from './contexts/AppProvider';
import AuthProvider from './contexts/AuthProvider';
import GlobalStyles from './GlobalStyles';
import Routes from './Routes';

const App: React.FC = () => {
  return (
    <>
      <GlobalStyles />

      <AuthProvider>
        <AppProvider>
          <BrowserRouter basename={process.env.REACT_APP_PATH}>
            <Routes />
          </BrowserRouter>
        </AppProvider>
      </AuthProvider>
    </>
  );
};

export default App;
