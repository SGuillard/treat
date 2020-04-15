import { useSelector } from 'react-redux';
import { MenuItem } from '@material-ui/core';
import React from 'react';
import { ReduxState } from '../../store/types';
import { AdminUserInterface, ServiceInterface } from '../types/types';

export const useAppointmentSelectInputOptions = () => {
  const reduxServices = useSelector((state: ReduxState) => state.services.list);
  const reduxAdminUsers = useSelector((state: ReduxState) => state.adminUsers.list);

  const getServicesOptions = reduxServices.map((serviceOption: ServiceInterface) => (
    <MenuItem
      key={serviceOption.id}
      value={serviceOption.id}
    >
      {serviceOption.name}
    </MenuItem>
  ));

  const getAdminUsersOptions = reduxAdminUsers.map((adminUserOption: AdminUserInterface) => (
    <MenuItem
      key={adminUserOption.id}
      value={adminUserOption.id}
    >
      {`${adminUserOption.firstName} ${adminUserOption.lastName}`}
    </MenuItem>
  ));

  return { getServicesOptions, getAdminUsersOptions };
};
