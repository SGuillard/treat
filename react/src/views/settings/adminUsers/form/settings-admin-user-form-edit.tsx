import React from 'react';
import { useSelector } from 'react-redux';
import { ReduxState } from '../../../../store/types';
import { AdminUserInterface, FormLoaderProps } from '../../../types/types';
import SettingsAdminUserForm from './settings-admin-user-form';

const SettingsAdminUserFormEdit = ({ params }: FormLoaderProps) => {
  const adminUser = useSelector((state: ReduxState) => state.adminUsers.list.find((adminUserState: AdminUserInterface) => adminUserState.id === Number(
    params && params.id,
  )));

  return adminUser ? <SettingsAdminUserForm adminUser={adminUser} /> : <div>...loading</div>;
};

export default SettingsAdminUserFormEdit;
