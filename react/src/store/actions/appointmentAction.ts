import { ThunkAction } from 'redux-thunk';
import { ReduxState } from '../types';
import { Action } from 'redux';
import makeApiRequest from '../../utils/api/apiRequest';
import { RequestMethod } from '../../types';
import API from '../../API';
import { AppointmentInterface } from '../../views/types/types';
import { handleInitialisationRequestErrors } from './globalActions';
import { SET_APPOINTMENT_ACTION } from './constants';

export const setAppointmentAction = (service: AppointmentInterface[]) => ({
  type: SET_APPOINTMENT_ACTION,
  payload: service,
});

export const initAppointmentList = (): ThunkAction<void, ReduxState, unknown, Action<string>> => (dispatch) => {
  makeApiRequest(RequestMethod.GET, `${API.APPOINTMENTS}`).then((response: object[]) => dispatch(
    setAppointmentAction(response as AppointmentInterface[]),
  )).catch(() => handleInitialisationRequestErrors(dispatch));
};
