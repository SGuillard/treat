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
    ADMIN_USER_LIST: {
      path: '/admin/users',
      name: 'settings/users',
    },
    ADMIN_USER_EDIT: {
      path: '/admin/users/edit',
      pathWithId: '/admin/users/edit/:id?',
      name: 'settings/users/edit',
    },
    SERVICE_LIST: {
      path: '/admin/services',
      name: 'settings/services',
    },
    SERVICE_EDIT: {
      path: '/admin/services/edit',
      pathWithId: '/admin/services/edit/:id',
      name: 'settings/services/edit',
    },
  },
  REGISTER: {
    path: '/admin/register',
    name: 'register',
  },
};

export default AdminROUTES;
