import {
  REDIRECT_LOGIN,
} from '../actions/constants';
import { getStorageToken } from '../../views/login/login-helper';

const initialState = {
  isLogged: !!getStorageToken,
};

export const globalReducer: any = (state: any = initialState, action: any): any => {
  switch (action.type) {
    case REDIRECT_LOGIN:
      return {
        ...state,
        isLogged: action.payload,
      };
    default: return state;
  }
};
