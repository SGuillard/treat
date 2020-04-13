import {
  ADD_EDIT_ADMIN_USER_ACTION,
  SET_ADMIN_USER_ACTION,
} from '../actions/constants';
import updateObject from '../../utils/common/updateObject';
import {
  AdminUserReducerActionPayload,
  AdminUsersStateInterface
} from '../types';

const setAdminUsersReducer = (state: AdminUsersStateInterface = null, action: AdminUserReducerActionPayload) => updateObject(state, {
  list: action.payload,
});

const addAdminUsersReducer = (state: AdminUsersStateInterface = null, action: AdminUserReducerActionPayload) => updateObject(state, {
  list: action.payload,
});

export const adminUsersReducer = (state: AdminUsersStateInterface = null, action: AdminUserReducerActionPayload): any => {
  switch (action.type) {
    case ADD_EDIT_ADMIN_USER_ACTION:
      return addAdminUsersReducer(state, action);
    case SET_ADMIN_USER_ACTION:
      return setAdminUsersReducer(state, action);
    default: return state;
  }
};
