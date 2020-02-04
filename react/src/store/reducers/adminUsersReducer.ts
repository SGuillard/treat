import { ADD_ADMIN_USER_ACTION, SET_ADMIN_USER_ACTION } from '../actions/constants';
import { updateObject } from '../actions/adminUsersActions';

const setAdminUsersReducer = (state: any = null, action: any) => updateObject(state, {
  list: action.payload,
});

const addAdminUsersReducer = (state: any = null, action: any) => {
  console.log('JHJHJHJHJ');
  console.log(action);
  return updateObject(state, {
    list: action.payload,
  });
}

export const adminUsersReducer: any = (state: any = null, action: any): any => {
  console.log(action);
  switch (action.type) {
    case ADD_ADMIN_USER_ACTION:
      return addAdminUsersReducer;
    case SET_ADMIN_USER_ACTION:
      return setAdminUsersReducer(state, action);
    default: console.log('jjjjjjj'); return state;
  }
};
