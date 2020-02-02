import { ADD_ADMIN_USER_ACTION, SET_ADMIN_USER_ACTION } from '../actions/constants';
import { AdminUserInterface } from '../../containers/admin/types/types';
import { updateObject } from '../actions/adminUsersActions';

type adminUsersInitialStateType = {list: AdminUserInterface[]};

const adminUserInitialState = {
  list: null,
};


const setAdminUsersReducer = (state: any = null, action: any) => updateObject(state, {
  adminUsers: {
    list: action.payload,
  },
});

export const adminUsersReducer: any = (state: any = null, action: any): any => {
  switch (action.type) {
    case ADD_ADMIN_USER_ACTION:
      return {
        ...state,
        list: state.list.concat(action.payload),
      };
    case SET_ADMIN_USER_ACTION:
      return setAdminUsersReducer(state, action);
  }
  return state;
};
