import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import App from './containers/app';
import Login from './containers/admin/login/login';
import Register from "./containers/admin/login/register";
import AdminRoute from "./containers/admin/admin-route";

const Root = () => (
  <BrowserRouter>
    <Switch>\
      {/*Admin  */}
      <Route path="/admin/calendar" render={() => <AdminRoute page="calendar" />} />
      <Route path="/admin/dashboard" render={() => <AdminRoute page="dashboard" />} />
      <Route path="/admin/settings" render={() => <AdminRoute page="settings" />} />
      <Route path="/admin/login" component={Login} />
      <Route path="/admin/register" component={Register} />

      {/*Others*/}
      <Route exact path="/" component={App} />
      <Route render={() => <h3>Not Found</h3>} />
    </Switch>
  </BrowserRouter>
);

export default Root;
