import {
  SET_SERVICE_ACTION,
} from './constants';
import makeApiRequest from '../../utils/api/apiRequest';
import API from '../../API';
import { RequestMethod } from '../../types';
import { ServiceInterface } from '../../views/types/types';
import { handleInitialisationRequestErrors } from './globalActions';
import { ThunkAction } from 'redux-thunk';
import { ReduxState } from '../types';
import { Action } from 'redux';

export const setServiceAction = (service: ServiceInterface[]) => ({
  type: SET_SERVICE_ACTION,
  payload: service,
});

export const initServiceList = (): ThunkAction<void, ReduxState, unknown, Action<string>> => (dispatch) => {
  makeApiRequest(RequestMethod.GET, `${API.SERVICES}`).then((response: object[]) => dispatch(
    setServiceAction(response as ServiceInterface[]),
  )).catch(() => handleInitialisationRequestErrors(dispatch));
};
