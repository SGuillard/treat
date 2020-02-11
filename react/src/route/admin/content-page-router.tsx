import React from 'react';
import Calendar from '../../containers/admin/calendar/calendar';
import Dashboard from '../../containers/admin/dashboard/dashboard';
import Settings from '../../containers/admin/settings/settings';
import { pageType } from './admin-router';
import AdminROUTES from './admin-routes';
import SettingsAdminUserList from '../../containers/admin/settings/adminUsers/settings-admin-user-list';
import SettingsServiceList from '../../containers/admin/settings/services/settings-service-list';
import SettingsServiceEdit from '../../containers/admin/settings/services/settings-service-edit';

const ContentPageRouter = ({ page }: pageType) => {
  switch (page) {
    case AdminROUTES.CALENDAR.name:
      return <Calendar />;
    case AdminROUTES.DASHBOARD.name:
      return <Dashboard />;
    case AdminROUTES.SETTINGS.name:
      return <Settings />;
    case AdminROUTES.SETTINGS.TEAM.name:
      return <SettingsAdminUserList />;
    case AdminROUTES.SETTINGS.SERVICES.name:
      return <SettingsServiceList />;
    case AdminROUTES.SETTINGS.SERVICES_EDIT.name:
      return <SettingsServiceEdit />;
    default:
      return <Calendar />;
  }
};

export default ContentPageRouter;
