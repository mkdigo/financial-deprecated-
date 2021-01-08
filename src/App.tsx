import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import GlobalStyles from './GlobalStyles';
import Routes from './Routes';

const App: React.FC = () => {
  return (
    <>
      <GlobalStyles />

      <Router>
        <Routes />
      </Router>
    </>
  );
};

export default App;
