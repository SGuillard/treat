import { ThunkAction } from 'redux-thunk';
import { ReduxState } from '../types';
import { Action } from 'redux';
import makeApiRequest from '../../utils/api/apiRequest';
import { RequestMethod } from '../../types';
import API from '../../API';
import { OpeningHoursInterface } from '../../views/types/types';
import { handleInitialisationRequestErrors } from './globalActions';
import { SET_OPENING_HOURS_ACTION } from './constants';

export const setOpeningHoursAction = (hours: OpeningHoursInterface[]) => ({
  type: SET_OPENING_HOURS_ACTION,
  payload: hours,
});

export const initOpeningHoursList = (): ThunkAction<void, ReduxState, unknown, Action<string>> => (dispatch) => {
  makeApiRequest(RequestMethod.GET, `${API.OPENINGS_HOURS}`).then((response: object[]) => dispatch(
    setOpeningHoursAction(response as OpeningHoursInterface[]),
  )).catch(() => {
    handleInitialisationRequestErrors(dispatch);
  });
};
