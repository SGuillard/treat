import React from 'react';
import { BrowserRouter, Switch, Route, RouteComponentProps } from 'react-router-dom';
import Register from '../views/login/register/register';
import Login from '../views/login/login/login';
import AdminRouter from './admin/admin-router';
import AdminROUTES from './admin/admin-routes';

const Root = () => (
  <BrowserRouter>
    <Switch>
      {/* Admin  */}
      <Route path={AdminROUTES.CALENDAR.path} render={() => <AdminRouter page={AdminROUTES.CALENDAR.name} />} />
      <Route path={AdminROUTES.DASHBOARD.path} render={() => <AdminRouter page={AdminROUTES.DASHBOARD.name} />} />
      <Route exact path={AdminROUTES.SETTINGS.path} render={() => <AdminRouter page={AdminROUTES.SETTINGS.name} />} />
      {/* Admin User */}
      <Route exact path={AdminROUTES.SETTINGS.ADMIN_USER_LIST.path} render={() => <AdminRouter page={AdminROUTES.SETTINGS.ADMIN_USER_LIST.name} />} />
      <Route exact path={AdminROUTES.SETTINGS.ADMIN_USER_ADD.path} render={() => <AdminRouter page={AdminROUTES.SETTINGS.ADMIN_USER_ADD.name} />} />
      <Route path={AdminROUTES.SETTINGS.ADMIN_USER_EDIT.pathWithId} render={(props: RouteComponentProps) => <AdminRouter params={props.match.params} page={AdminROUTES.SETTINGS.ADMIN_USER_EDIT.name} />} />
      {/* Service */}
      <Route exact path={AdminROUTES.SETTINGS.SERVICE_LIST.path} render={() => <AdminRouter page={AdminROUTES.SETTINGS.SERVICE_LIST.name} />} />
      <Route path={AdminROUTES.SETTINGS.SERVICE_EDIT.pathWithId} render={(props: RouteComponentProps) => <AdminRouter params={props.match.params} page={AdminROUTES.SETTINGS.SERVICE_EDIT.name} />} />
      <Route path={AdminROUTES.SETTINGS.SERVICE_ADD.path} render={() => <AdminRouter page={AdminROUTES.SETTINGS.SERVICE_ADD.name} />} />
      <Route exact path={AdminROUTES.SETTINGS.OPENINGS.path} render={() => <AdminRouter page={AdminROUTES.SETTINGS.OPENINGS.name} />} />
      <Route exact path={AdminROUTES.SETTINGS.PROMOTIONS_LIST.path} render={() => <AdminRouter page={AdminROUTES.SETTINGS.PROMOTIONS_LIST.name} />} />
      <Route exact path={AdminROUTES.SETTINGS.PROMOTIONS_ADD.path} render={() => <AdminRouter page={AdminROUTES.SETTINGS.PROMOTIONS_ADD.name} />} />
      <Route exact path={AdminROUTES.SETTINGS.PROFILE.path} render={() => <AdminRouter page={AdminROUTES.SETTINGS.PROFILE.name} />} />
      <Route path={AdminROUTES.LOGIN.path} component={Login} />
      <Route path={AdminROUTES.REGISTER.path} component={Register} />
      {/* Others */}
      <Route render={() => <h3>Not Found</h3>} />
    </Switch>
  </BrowserRouter>
);

export default Root;
