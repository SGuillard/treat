import { ADD_ADMIN_USER_ACTION, SET_ADMIN_USER_ACTION } from './constants';
import { AdminUserInterface } from '../../containers/admin/types/types';
import makeRequest, { RequestMethod } from '../../utils/apiRequest';
import API from '../../API';

interface AdminUserInterfacePayload {
  type: string,
  payload: AdminUserInterface,
}

export const addAdminUserAction = (user: AdminUserInterface): AdminUserInterfacePayload => {
  return {
    type: ADD_ADMIN_USER_ACTION,
    payload: user,
  };
};

export const statusAdminUserAction = (user: AdminUserInterface): AdminUserInterfacePayload => {
  return {
    type: ADD_ADMIN_USER_ACTION,
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
  makeRequest(RequestMethod.GET, `${API.TEAM_ALL}`).then((response: any) => dispatch(setAdminUsersAction(response)));
};

export const addAdminUser = (payload: any) => (dispatch: any) => {
  makeRequest(RequestMethod.POST,
    `${API.TEAM_CREATE}`, payload).then((response: any) => dispatch(addAdminUserAction(response)));
};

export const statusAdminUser = (payload: any) => (dispatch: any) => {
  makeRequest(RequestMethod.PATCH,
    `${API.TEAM_STATUS}`, payload).then((response: any) => dispatch(statusAdminUserAction(response)));
}
