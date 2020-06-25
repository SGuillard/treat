import React, { useContext } from 'react';
import Calendar from '../../views/calendar/calendar';
import Dashboard from '../../views/dashboard/dashboard';
import Settings from '../../views/settings/settings';
import AdminROUTES from './admin-routes';
import SettingsAdminUserList from '../../views/settings/adminUsers/settings-admin-user-list';
import SettingsServiceList from '../../views/settings/services/settings-service-list';
import RouterContext from '../RouterContext';
import Openings from '../../views/settings/openings/openings';
import Promotions from '../../views/settings/promotions/promotions';
import AddPromotionForm from '../../views/settings/promotions/form/add-promotion-form';
import SettingsAdminUserFormLoader
  from '../../views/settings/adminUsers/form/settings-admin-user-form-loader';

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
    case AdminROUTES.SETTINGS.OPENINGS.name:
      return <Openings />;
    case AdminROUTES.SETTINGS.ADMIN_USER_EDIT.name:
      return <SettingsAdminUserFormLoader params={params} />;
    case AdminROUTES.SETTINGS.SERVICE_LIST.name:
      return <SettingsServiceList />;
    case AdminROUTES.SETTINGS.SERVICE_EDIT.name:
      return <SettingsAdminUserFormLoader params={params} />;
    case AdminROUTES.SETTINGS.PROMOTIONS_LIST.name:
      return <Promotions />;
    case AdminROUTES.SETTINGS.PROMOTIONS_ADD.name:
      return <AddPromotionForm />;
    default:
      return <Calendar />;
  }
};

export default ContentPageRouter;
