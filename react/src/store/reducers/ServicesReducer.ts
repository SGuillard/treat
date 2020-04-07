import {
  ADD_SERVICE_ACTION,
  SET_SERVICE_ACTION,
} from '../actions/constants';
import { updateObject } from '../actions/adminUsersActions';

const setServiceListReducer = (state: any = null, action: any) => updateObject(state, {
  list: action.payload,
});

const addServiceReducer = (state: any = null, action: any) => updateObject(state, {
  list: action.payload,
});

export const servicesReducer: any = (state: any = { list: [] }, action: any): any => {
  switch (action.type) {
    case ADD_SERVICE_ACTION:
      return addServiceReducer(state, action);
    case SET_SERVICE_ACTION:
      return setServiceListReducer(state, action);
    default: return state;
  }
};
