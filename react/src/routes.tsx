import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import App from './containers/app';
import Login from './containers/login';
import AdminRoot from './containers/admin/admin-root';

const Root = () => (
  <BrowserRouter>
    <Switch>
      <Route path={"/admin"} component={AdminRoot} />
      <Route path="/admin/dashboard" render={(props) => <AdminRoot {...props} page="dashboard" />} />
      <Route path="/admin/settings" component={AdminRoot} />
      <Route exact path="/" component={App} />
      <Route path="/login" component={Login} />
      <Route render={() => <h3>Not Found</h3>} />
    </Switch>
  </BrowserRouter>
);

export default Root;
