import {
  ADD_SERVICE_ACTION,
  SET_SERVICE_ACTION,
} from '../actions/constants';
import updateObject from '../../utils/common/updateObject';
import { ServiceInterface } from '../../views/types/types';

interface serviceStateInitiatedInterface {
  list: ServiceInterface
}

type serviceStateInterface = serviceStateInitiatedInterface | null;

interface serviceReducerActionInterface {
  type: string,
  payload: ServiceInterface[]
}

const setServiceListReducer = (state: any = null, action: any) => updateObject(state, {
  list: action.payload,
});

const addServiceReducer = (state: any = null, action: any) => updateObject(state, {
  list: action.payload,
});

export const servicesReducer: any = (state: serviceStateInterface = null, action: any): any => {
  switch (action.type) {
    case ADD_SERVICE_ACTION:
      return addServiceReducer(state, action);
    case SET_SERVICE_ACTION:
      return setServiceListReducer(state, action);
    default: return state;
  }
};
