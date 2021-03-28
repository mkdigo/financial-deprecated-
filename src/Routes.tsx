import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Main from './components/Main';
import SideBar from './components/SideBar';
import { IPrivateRoute } from './interfaces';
import Accounts from './pages/Accounts';
import BalanceSheet from './pages/BalanceSheet';
import Entries from './pages/Entries';
import Expenses from './pages/Expenses';
import Home from './pages/Home';
import NotFound from './pages/NotFound';

const PrivateRoute: React.FC<IPrivateRoute> = ({
  component: Component,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        localStorage.getItem('access_token') ? (
          <Main>
            <SideBar />
            <Component {...props} />
          </Main>
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
};

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <PrivateRoute path="/accounts" exact component={Accounts} />
      <PrivateRoute path="/balance_sheet" exact component={BalanceSheet} />
      <PrivateRoute path="/entries" exact component={Entries} />
      <PrivateRoute path="/expenses" exact component={Expenses} />
      <Route component={NotFound} />
    </Switch>
  );
};

export default Routes;
