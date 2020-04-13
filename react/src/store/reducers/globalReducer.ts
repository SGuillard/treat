import {
  REDIRECT_LOGIN,
} from '../actions/constants';
import { getStorageToken } from '../../views/login/login-helper';
import updateObject from '../../utils/common/updateObject';
import { GlobalReducerActionInterface, GlobalStateInterface } from '../types';

const initialState = {
  isLogged: !!getStorageToken,
};

const setLoggin = (state: GlobalStateInterface, action: GlobalReducerActionInterface) => updateObject(state, {
  isLogged: action.payload,
});

export const globalReducer: any = (state: GlobalStateInterface = initialState, action: GlobalReducerActionInterface): any => {
  switch (action.type) {
    case REDIRECT_LOGIN:
      return setLoggin(state, action);
    default:
      return state;
  }
};
