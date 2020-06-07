import {
  OpeningHoursReducerActionPayload,
  OpeningHoursStateInterface, PromotionReducerActionPayload, PromotionStateInterface,
} from '../types';
import { SET_OPENING_HOURS_ACTION, SET_PROMOTION_ACTION } from '../actions/constants';
import updateObject from '../../utils/common/updateObject';
import { PromotionInterface } from '../../views/types/types';

const initialState = {
  list: [],
};

const updatePromotionState = (state: PromotionStateInterface, action: PromotionReducerActionPayload) => updateObject(state, {
  list: action.payload,
});

export const promotionReducer: any = (state = initialState, action: any): any => {
  switch (action.type) {
    case SET_PROMOTION_ACTION:
      return updatePromotionState(state, action);
    default:
      return state;
  }
};
