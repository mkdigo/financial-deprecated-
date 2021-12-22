import React from 'react';
import { Switch, Route, RouteProps } from 'react-router-dom';

import Main from './components/Main';
import SideBar from './components/SideBar';
import useAuthContext from './hooks/useAuthContext';
import Accounts from './pages/Accounts';
import BalanceSheet from './pages/BalanceSheet';
import Entries from './pages/Entries';
import Expenses from './pages/Expenses';
import Home from './pages/Home';
import Logout from './pages/Logout';
import NotFound from './pages/NotFound';

interface IPrivateRoute extends RouteProps {
  component: any;
}

const PrivateRoute: React.FC<IPrivateRoute> = ({
  component: Component,
  ...rest
}) => {
  const { authUser } = useAuthContext();

  return (
    <Route
      {...rest}
      render={(props) =>
        authUser ? (
          <Main>
            <SideBar />
            <Component {...props} />
          </Main>
        ) : (
          <Home />
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
      <Route path="/logout" exact component={Logout} />
      <Route component={NotFound} />
    </Switch>
  );
};

export default Routes;
