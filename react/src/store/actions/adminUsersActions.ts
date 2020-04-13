import {
  SET_ADMIN_USER_ACTION,
} from './constants';
import { AdminUserInterface } from '../../views/types/types';
import makeApiRequest from '../../utils/api/apiRequest';
import API from '../../API';
import { Action } from 'redux'
import { RequestMethod } from '../../types';
import { handleInitialisationRequestErrors } from './globalActions';
import { AdminUserReducerActionPayload, ReduxState } from '../types';
import { ThunkAction } from 'redux-thunk';

export const setAdminUsersAction = (users: AdminUserInterface[]): AdminUserReducerActionPayload => ({
  type: SET_ADMIN_USER_ACTION,
  payload: users,
});

export const initAdminUsers = (): ThunkAction<void, ReduxState, unknown, Action<string>> => (dispatch) => {
  makeApiRequest(RequestMethod.GET, `${API.ADMIN_USER}`).then((response: object[]) => dispatch(
    setAdminUsersAction(response as AdminUserInterface[]),
  )).catch((e) => handleInitialisationRequestErrors(e, dispatch));
};
