import {
  ADD_EDIT_ADMIN_USER_ACTION,
  SET_ADMIN_USER_ACTION,
  STATUS_ADMIN_USER_ACTION
} from './constants';
import { AdminUserInterface } from '../../containers/admin/types/types';
import makeRequest, { RequestMethod } from '../../utils/apiRequest';
import API from '../../API';

interface AdminUserInterfacePayload {
  type: string,
  payload: AdminUserInterface,
}

export const addEditAdminUserAction = (user: AdminUserInterface): AdminUserInterfacePayload => {
  return {
    type: ADD_EDIT_ADMIN_USER_ACTION,
    payload: user,
  };
};

export const statusAdminUserAction = (user: AdminUserInterface): AdminUserInterfacePayload => {
  return {
    type: STATUS_ADMIN_USER_ACTION,
    payload: user,
  };
};

export const updateObject = (oldObject: any, updatedProperties: any) => ({
  ...oldObject,
  ...updatedProperties,
});

export const setAdminUsersAction = (users: AdminUserInterface[]) => ({
  type: SET_ADMIN_USER_ACTION,
  payload: users,
});

export const initAdminUsers = () => (dispatch: any) => {
  makeRequest(RequestMethod.GET, `${API.ADMIN_USER}`).then((response: any) => dispatch(setAdminUsersAction(response)));
};

export const addEditAdminUser = (payload: any) => (dispatch: any) => {
  makeRequest(RequestMethod.POST,
    `${API.ADMIN_USER}${payload.id || ''}`, payload).then((response: any) => dispatch(addEditAdminUserAction(response)));
};

export const statusAdminUser = (payload: any) => (dispatch: any) => {
  makeRequest(RequestMethod.PATCH,
    `${API.TEAM_STATUS}`, payload).then((response: any) => dispatch(statusAdminUserAction(response)));
}
