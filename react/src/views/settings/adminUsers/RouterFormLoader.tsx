import React from 'react';
import { useSelector } from 'react-redux';
import { ReduxState } from '../../../store/types';
import { AdminUserInterface } from '../../types/types';
import SettingsAdminUserForm from './settings-admin-user-form';


export interface RouterFormLoaderProps {
  params?: {
    id?: number,
  };
}

const RouterFormLoader = ({ params }: RouterFormLoaderProps) => {
  const adminUser = useSelector((state: ReduxState) => state.adminUsers.list.find((adminUserState: AdminUserInterface) => adminUserState.id === Number(
    params && params.id,
  )));

  return adminUser ? <SettingsAdminUserForm adminUser={adminUser} /> : <div>...loading</div>;
};

export default RouterFormLoader;
