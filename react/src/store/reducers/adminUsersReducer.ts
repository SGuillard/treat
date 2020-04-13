import {
  ADD_EDIT_ADMIN_USER_ACTION,
  SET_ADMIN_USER_ACTION,
} from '../actions/constants';
import updateObject from '../../utils/common/updateObject';
import {
  AdminUserReducerActionPayload,
  AdminUsersStateInterface
} from '../types';

const adminUsersStateInitialValues = {
  list: [],
};

const updateAdminUsersState = (state: AdminUsersStateInterface = adminUsersStateInitialValues, action: AdminUserReducerActionPayload) => updateObject(state, {
  list: action.payload,
});

export const adminUsersReducer = (state: AdminUsersStateInterface = adminUsersStateInitialValues, action: AdminUserReducerActionPayload): any => {
  switch (action.type) {
    case ADD_EDIT_ADMIN_USER_ACTION:
      return updateAdminUsersState(state, action);
    case SET_ADMIN_USER_ACTION:
      return updateAdminUsersState(state, action);
    default: return state;
  }
};
