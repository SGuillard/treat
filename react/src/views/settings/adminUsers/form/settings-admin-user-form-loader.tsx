import React from 'react';
import { useSelector } from 'react-redux';
import { ReduxState } from '../../../../store/types';
import { AdminUserInterface } from '../../../types/types';
import SettingsAdminUserForm from './settings-admin-user-form';
import { SettingsFormLoaderProps } from '../types';

const SettingsAdminUserFormLoader = ({ params }: SettingsFormLoaderProps) => {
  const adminUser = useSelector((state: ReduxState) => state.adminUsers.list.find((adminUserState: AdminUserInterface) => adminUserState.id === Number(
    params && params.id,
  )));

  return adminUser ? <SettingsAdminUserForm adminUser={adminUser} /> : <div>...loading</div>;
};

export default SettingsAdminUserFormLoader;
