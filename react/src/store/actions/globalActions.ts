import { REDIRECT_LOGIN } from './constants';

export const setLoginAction = (isLogged: boolean) => ({ type: REDIRECT_LOGIN, payload: isLogged });

export const handleInitialisationRequestErrors = (dispatch: any) => {
  dispatch({ type: REDIRECT_LOGIN, payload: false });
};
