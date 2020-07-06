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
    ADMIN_USER_ADD: {
      path: '/admin/users/add',
      pathWithId: '/admin/users/add',
      name: 'settings/users/add',
    },
    SERVICE_LIST: {
      path: '/admin/services',
      name: 'settings/services',
    },
    SERVICE_EDIT: {
      path: '/admin/services/edit',
      pathWithId: '/admin/services/edit/:id?',
      name: 'settings/services/edit',
    },
    SERVICE_ADD: {
      path: '/admin/services/add',
      name: 'settings/services/add',
    },
    OPENINGS: {
      path: '/admin/openings',
      name: 'settings/openings',
    },
    PROMOTIONS_LIST: {
      path: '/admin/promotions',
      name: 'settings/promotions',
    },
    PROMOTIONS_ADD: {
      path: '/admin/promotions/add',
      name: 'settings/promotions/add',
    },
  },
  REGISTER: {
    path: '/admin/register',
    name: 'register',
  },
};

export default AdminROUTES;
