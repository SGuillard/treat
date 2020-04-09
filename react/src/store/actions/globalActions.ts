import { REDIRECT_LOGIN } from './constants';

export const setLoginAction = (isLogged: boolean) => ({ type: REDIRECT_LOGIN, payload: isLogged });

export const handleInitialisationRequestErrors = (error: any, dispatch: any) => {
  // TODO Handle error to see if user is not logged or if server error
  dispatch({ type: REDIRECT_LOGIN, payload: false });
};
