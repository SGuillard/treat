import { REDIRECT_LOGIN } from './constants';

export const setLoginAction = (isLogged: boolean) => ({ type: REDIRECT_LOGIN, payload: isLogged });
