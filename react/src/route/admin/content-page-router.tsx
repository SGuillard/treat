import React, { useContext } from 'react';
import Calendar from '../../views/calendar/calendar';
import Dashboard from '../../views/dashboard/dashboard';
import Settings from '../../views/settings/settings';
import { pageType } from './admin-router';
import AdminROUTES from './admin-routes';
import SettingsAdminUserList from '../../views/settings/adminUsers/settings-admin-user-list';
import SettingsServiceList from '../../views/settings/services/settings-service-list';
import SettingsServiceForm from '../../views/settings/services/settings-service-form';
import SettingsAdminUserForm
  from '../../views/settings/adminUsers/settings-admin-user-form';
import RouterContext from '../RouterContext';

const ContentPageRouter = () => {
  const { page, params } = useContext(RouterContext);
  switch (page) {
    case AdminROUTES.CALENDAR.name:
      return <Calendar />;
    case AdminROUTES.DASHBOARD.name:
      return <Dashboard />;
    case AdminROUTES.SETTINGS.name:
      return <Settings />;
    case AdminROUTES.SETTINGS.ADMIN_USER_LIST.name:
      return <SettingsAdminUserList />;
    case AdminROUTES.SETTINGS.ADMIN_USER_EDIT.name:
      return <SettingsAdminUserForm params={params} />;
    case AdminROUTES.SETTINGS.SERVICE_LIST.name:
      return <SettingsServiceList />;
    case AdminROUTES.SETTINGS.SERVICE_EDIT.name:
      return <SettingsServiceForm params={params} />;
    default:
      return <Calendar />;
  }
};

export default ContentPageRouter;
