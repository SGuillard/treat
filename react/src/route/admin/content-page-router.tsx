import React from 'react';
import Calendar from '../../containers/admin/calendar/calendar';
import Dashboard from '../../containers/admin/dashboard/dashboard';
import Settings from '../../containers/admin/settings/settings';
import { pageType } from './admin-router';
import AdminROUTES from './admin-routes';
import SettingsAdminUserList from '../../containers/admin/settings/adminUsers/settings-admin-user-list';
import SettingsServiceList from '../../containers/admin/settings/services/settings-service-list';
import SettingsServiceForm from '../../containers/admin/settings/services/settings-service-form';
import SettingsAdminUserForm
  from '../../containers/admin/settings/adminUsers/settings-admin-user-form';

const ContentPageRouter = ({ page, params }: pageType) => {
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
