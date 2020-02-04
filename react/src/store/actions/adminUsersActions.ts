import { ADD_ADMIN_USER_ACTION, SET_ADMIN_USER_ACTION } from './constants';
import { AdminUserInterface } from '../../containers/admin/types/types';
import makeRequest, { RequestMethod } from '../../utils/apiRequest';
import API from '../../API';

interface AdminUserInterfacePayload {
  type: string,
  payload: AdminUserInterface,
}

// define actions

// export const addAdminUser = (state, action) => {
//   console.log(action);
// const updatedIngredient = { [action.ingredientName]: state.ingredients[action.ingredientName] + 1 }
// const updatedIngredients = updateObject( state.ingredients, updatedIngredient );
// const updatedState = {
//   ingredients: updatedIngredients,
//   totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
// }
// return updateObject( state, updatedState );
// };

export const addAdminUsersAction = (user: AdminUserInterface): AdminUserInterfacePayload => {
  return {
    type: ADD_ADMIN_USER_ACTION,
    payload: user,
  };
};

export const updateObject = (oldObject: any, updatedProperties: any) => ({
  ...oldObject,
  ...updatedProperties,
});

export const setAdminUsersAction = (users: AdminUserInterface[]) => ({
  type: SET_ADMIN_USER_ACTION,
  payload: users,
});

export const initAdminUsers = () => (dispatch: any) => {
  makeRequest(RequestMethod.GET, `${API.TEAM_ALL}`).then((response: any) => dispatch(setAdminUsersAction(response)));
};

export const addAdminUser = (payload: any) => (dispatch: any) => {
  makeRequest(RequestMethod.POST,
    `${API.TEAM_CREATE}`, payload).then((response: any) => dispatch(addAdminUsersAction(response)));
};
