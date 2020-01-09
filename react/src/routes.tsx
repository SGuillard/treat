import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import App from './containers/app';
import Login from './containers/login';
import AdminRoot from './containers/admin/admin-root';

const Root = () => (
  <BrowserRouter>
    <Switch>
      <Route path={"/admin"} render={() => <AdminRoot page="calendar" />} />
      <Route path="/admin/dashboard" render={() => <AdminRoot page="dashboard" />} />
      <Route path="/admin/settings" render={() => <AdminRoot page="settings" />} />
      <Route exact path="/" component={App} />
      <Route path="/login" component={Login} />
      <Route render={() => <h3>Not Found</h3>} />
    </Switch>
  </BrowserRouter>
);

export default Root;
