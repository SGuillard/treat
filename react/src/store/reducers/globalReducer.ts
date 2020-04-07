import {
  REDIRECT_LOGIN,
} from '../actions/constants';

const initialState = {
  isLogged: !!localStorage.getItem('token'),
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
