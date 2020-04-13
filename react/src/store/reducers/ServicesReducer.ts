import {
  ADD_SERVICE_ACTION,
  SET_SERVICE_ACTION,
} from '../actions/constants';
import updateObject from '../../utils/common/updateObject';
import { ServiceReducerActionInterface, ServiceStateInterface } from '../types';

const setServiceListReducer = (state: ServiceStateInterface = null, action: ServiceReducerActionInterface) => updateObject(state, {
  list: action.payload,
});

const addServiceReducer = (state: ServiceStateInterface = null, action: ServiceReducerActionInterface) => updateObject(state, {
  list: action.payload,
});

export const servicesReducer: any = (state: ServiceStateInterface = null, action: ServiceReducerActionInterface): any => {
  switch (action.type) {
    case ADD_SERVICE_ACTION:
      return addServiceReducer(state, action);
    case SET_SERVICE_ACTION:
      return setServiceListReducer(state, action);
    default: return state;
  }
};
