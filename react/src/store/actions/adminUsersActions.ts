import {
  ADD_EDIT_ADMIN_USER_ACTION, REDIRECT_LOGIN,
  SET_ADMIN_USER_ACTION,
} from './constants';
import { AdminUserInterface } from '../../views/types/types';
import makeRequest from '../../utils/apiRequest';
import API from '../../API';
import { RequestMethod } from '../../types';
import { handleRequestErrors } from './helper-actions';

interface AdminUserInterfacePayload {
  type: string,
  payload: AdminUserInterface,
}

export const addEditAdminUserAction = (user: AdminUserInterface): AdminUserInterfacePayload => ({
  type: ADD_EDIT_ADMIN_USER_ACTION,
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
  makeRequest(RequestMethod.GET, `${API.ADMIN_USER}`).then((response: any) => dispatch(
    setAdminUsersAction(response),
  )).catch((e) => handleRequestErrors(e, dispatch));
};

export const addEditAdminUser = (payload: any) => (dispatch: any) => {
  const httpMethod = payload.id ? RequestMethod.PUT : RequestMethod.POST;
  const params = payload.id ? `/${payload.id}` : '';
  makeRequest(httpMethod,
    `${API.ADMIN_USER}${params}`, payload).then((response: any) => dispatch(
    addEditAdminUserAction(response),
  )).catch((e) => handleRequestErrors(e, dispatch));
};
