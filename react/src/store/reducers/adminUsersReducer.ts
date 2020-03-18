import {
  ADD_EDIT_ADMIN_USER_ACTION,
  SET_ADMIN_USER_ACTION, SET_LOGIN_ACTION,
  STATUS_ADMIN_USER_ACTION,
} from '../actions/constants';
import { updateObject } from '../actions/adminUsersActions';

const setAdminUsersReducer = (state: any = null, action: any) => updateObject(state, {
  list: action.payload,
});

const addAdminUsersReducer = (state: any = null, action: any) => updateObject(state, {
  list: action.payload,
});

const statusAdminUserReducer = (state: any = null, action: any) => updateObject(state, {
  list: action.payload,
});

const setLoginReducer = (state: any, action: any) => {
  return updateObject(state, {
    isLogged: action.payload,
  });
}

export const adminUsersReducer: any = (state: any = null, action: any): any => {
  switch (action.type) {
    case ADD_EDIT_ADMIN_USER_ACTION:
      return addAdminUsersReducer(state, action);
    case SET_ADMIN_USER_ACTION:
      return setAdminUsersReducer(state, action);
    case STATUS_ADMIN_USER_ACTION:
      return statusAdminUserReducer(state, action);
    case SET_LOGIN_ACTION:
      return setLoginReducer(state, action);
    default: return state;
  }
};
