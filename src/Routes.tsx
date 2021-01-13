import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Main from './components/Main';
import SideBar from './components/SideBar';
import { IPrivateRoute } from './interfaces';
import Accounts from './pages/Accounts';
import Entries from './pages/Entries';
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
      <PrivateRoute path="/entries" exact component={Entries} />
      <Route component={NotFound} />
    </Switch>
  );
};

export default Routes;
