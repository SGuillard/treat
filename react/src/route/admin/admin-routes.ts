const AdminROUTES = {
  BASE: 'localhost:3001',
  LOGIN: {
    path: '/admin/login',
    name: 'login',
  },
  CALENDAR: {
    path: '/admin/calendar',
    name: 'calendar',
  },
  DASHBOARD: {
    path: '/admin/dashboard',
    name: 'dashboard',
  },
  SETTINGS: {
    path: '/admin/settings/',
    name: 'settings',
    TEAM: {
      path: '/admin/team',
      name: 'settings/team',
    },
    SERVICES: {
      path: '/admin/services',
      name: 'settings/services',
    },
    SERVICES_EDIT: {
      path: '/admin/services/edit',
      name: 'settings/services/edit',
    },
  },
  REGISTER: {
    path: '/admin/register',
    name: 'register',
  },
};

export default AdminROUTES;
