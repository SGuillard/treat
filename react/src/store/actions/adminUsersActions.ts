import { ADD_ADMIN_USER_ACTION, SET_ADMIN_USER_ACTION } from './constants';
import { AdminUserInterface } from '../../containers/admin/types/types';
import makeRequest, { RequestMethod } from '../../utils/apiRequest';
import API from '../../API';

interface AdminUserInterfacePayload {
  type: string,
  payload: AdminUserInterface,
}

// define actions
export const addAdminUser = (val: AdminUserInterface): AdminUserInterfacePayload => ({
  type: ADD_ADMIN_USER_ACTION,
  payload: val,
});

export const updateObject = (oldObject: any, updatedProperties: any) => {
  console.log(updatedProperties);
  return {
    ...oldObject,
    ...updatedProperties,
  };
}

export const setAdminUsersAction = (users: AdminUserInterface[]) => ({
  type: SET_ADMIN_USER_ACTION,
  payload: users,
});

export const initAdminUsers = () => (dispatch: any) => {
  makeRequest(RequestMethod.GET, `${API.TEAM_ALL}`).then((response: any) => dispatch(setAdminUsersAction(response)));
};
