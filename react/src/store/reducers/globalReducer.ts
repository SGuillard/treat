import {
  REDIRECT_LOGIN,
} from '../actions/constants';
import { getStorageToken } from '../../views/login/login-helper';
import updateObject from '../../utils/common/updateObject';
import { globalReducerActionInterface, globalStateInterface } from '../types';

const initialState = {
  isLogged: !!getStorageToken,
};

const setLoggin = (state: any, action: globalReducerActionInterface) => updateObject(state, {
  isLogged: action.payload,
});

export const globalReducer: any = (state: globalStateInterface = initialState, action: globalReducerActionInterface): any => {
  switch (action.type) {
    case REDIRECT_LOGIN:
      return setLoggin(state, action);
    default:
      return state;
  }
};
