import {
  ADD_EDIT_ADMIN_USER_ACTION,
  SET_ADMIN_USER_ACTION, SET_LOGIN_ACTION,
  STATUS_ADMIN_USER_ACTION,
} from './constants';
import { AdminUserInterface } from '../../containers/admin/types/types';
import makeRequest  from '../../utils/apiRequest';
import API from '../../API';
import { RequestMethod } from '../../types';

interface AdminUserInterfacePayload {
  type: string,
  payload: AdminUserInterface,
}

export const setLoginAction = (isLogged: boolean) => (dispatch: any) => {
  return dispatch({
    type: SET_LOGIN_ACTION,
    payload: isLogged,
  });
}

export const addEditAdminUserAction = (user: AdminUserInterface): AdminUserInterfacePayload => ({
  type: ADD_EDIT_ADMIN_USER_ACTION,
  payload: user,
});

export const statusAdminUserAction = (user: AdminUserInterface): AdminUserInterfacePayload => ({
  type: STATUS_ADMIN_USER_ACTION,
  payload: user,
});

export const updateObject = (oldObject: any, updatedProperties: any) => ({
  ...oldObject,
  ...updatedProperties,
});

export const setAdminUsersAction = (users: AdminUserInterface[]) => ({
  type: SET_ADMIN_USER_ACTION,
  payload: users,
});

export const initAdminUsers = () => (dispatch: any) => {
  makeRequest(RequestMethod.GET, `${API.ADMIN_USER}`).then((response: any) => {
    return dispatch(
      setAdminUsersAction(response),
    );
  });
};

export const addEditAdminUser = (payload: any) => (dispatch: any) => {
  const httpMethod = payload.id ? RequestMethod.PUT : RequestMethod.POST;
  const params = payload.id ? `/${payload.id}` : '';
  makeRequest(httpMethod,
    `${API.ADMIN_USER}${params}`, payload).then((response: any) => dispatch(
    addEditAdminUserAction(response),
  ));
};

export const statusAdminUser = (payload: any) => (dispatch: any) => {
  makeRequest(RequestMethod.PATCH,
    `${API.TEAM_STATUS}`, payload).then((response: any) => dispatch(statusAdminUserAction(response)));
};
