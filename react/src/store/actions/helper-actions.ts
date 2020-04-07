import { REDIRECT_LOGIN } from './constants';

export const handleRequestErrors = (error: any, dispatch: any) => {
  // TODO Handle error to see if user is not logged or if server error
  dispatch({ type: REDIRECT_LOGIN, payload: false });
};
