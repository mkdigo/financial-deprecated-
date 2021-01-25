import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppProvider from './AppProvider';
import GlobalStyles from './GlobalStyles';
import Routes from './Routes';

const App: React.FC = () => {
  return (
    <>
      <GlobalStyles />

      <AppProvider>
        <Router>
          <Routes />
        </Router>
      </AppProvider>
    </>
  );
};

export default App;
