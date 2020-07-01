import { ThunkAction } from 'redux-thunk';
import { ReduxState } from '../types';
import { Action } from 'redux';
import makeApiRequest from '../../utils/api/apiRequest';
import { RequestMethod } from '../../types';
import API from '../../API';
import { PromotionInterface } from '../../views/types/types';
import { handleInitialisationRequestErrors } from './globalActions';
import { SET_PROMOTION_ACTION } from './constants';

export const setPromotionAction = (promotions: PromotionInterface[]) => ({
  type: SET_PROMOTION_ACTION,
  payload: promotions,
});

export const initPromotionList = (): ThunkAction<void, ReduxState, unknown, Action<string>> => (dispatch) => {
  makeApiRequest(RequestMethod.GET, `${API.PROMOTIONS}`).then((response: object[]) => dispatch(
    setPromotionAction(response as PromotionInterface[]),
  )).catch(() => {
    handleInitialisationRequestErrors(dispatch);
  });
};
