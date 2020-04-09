import {
  ADD_EDIT_ADMIN_USER_ACTION,
  SET_ADMIN_USER_ACTION,
} from './constants';
import { AdminUserInterface } from '../../views/types/types';
import makeApiRequest from '../../utils/api/apiRequest';
import API from '../../API';
import { RequestMethod } from '../../types';
import { handleInitialisationRequestErrors } from './globalActions';

interface AdminUserInterfacePayload {
  type: string,
  payload: AdminUserInterface,
}

export const addEditAdminUserAction = (user: AdminUserInterface): AdminUserInterfacePayload => ({
  type: ADD_EDIT_ADMIN_USER_ACTION,
  payload: user,
});

export const setAdminUsersAction = (users: AdminUserInterface[]) => ({
  type: SET_ADMIN_USER_ACTION,
  payload: users,
});

export const initAdminUsers = () => (dispatch: any) => {
  makeApiRequest(RequestMethod.GET, `${API.ADMIN_USER}`).then((response: any) => dispatch(
    setAdminUsersAction(response),
  )).catch((e) => handleInitialisationRequestErrors(e, dispatch));
};
