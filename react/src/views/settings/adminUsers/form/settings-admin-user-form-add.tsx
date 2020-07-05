import React from 'react';
import SettingsAdminUserForm from './settings-admin-user-form';

const SettingsAdminUserFormAdd = () => {
  const adminUser = {
    firstName: '',
    lastName: '',
    active: false,
  };
  return <SettingsAdminUserForm adminUser={adminUser} />;
};

export default SettingsAdminUserFormAdd;
