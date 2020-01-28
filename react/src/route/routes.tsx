import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Register from '../containers/admin/login/register';
import App from '../containers/app';
import Login from '../containers/admin/login/login';
import AdminRouter from './admin/admin-router';
import AdminROUTES from './admin/admin-routes';

const Root = () => (
  <BrowserRouter>
    <Switch>
\
      {/* Admin  */}
      <Route path={AdminROUTES.CALENDAR.path} render={() => <AdminRouter page={AdminROUTES.CALENDAR.name} />} />
      <Route path={AdminROUTES.DASHBOARD.path} render={() => <AdminRouter page={AdminROUTES.DASHBOARD.name} />} />
      <Route exact path={AdminROUTES.SETTINGS.path} render={() => <AdminRouter page={AdminROUTES.SETTINGS.name} />} />
      <Route path={AdminROUTES.SETTINGS.TEAM.path} render={() => <AdminRouter page={AdminROUTES.SETTINGS.TEAM.name} />} />
      <Route path={AdminROUTES.LOGIN.path} component={Login} />
      <Route path={AdminROUTES.REGISTER.path} component={Register} />

      {/* Others */}
      <Route exact path="/" component={App} />
      <Route render={() => <h3>Not Found</h3>} />
    </Switch>
  </BrowserRouter>
);

export default Root;
