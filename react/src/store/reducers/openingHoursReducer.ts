import {
  OpeningHoursReducerActionPayload,
  OpeningHoursStateInterface,
} from '../types';
import { SET_OPENING_HOURS_ACTION } from '../actions/constants';
import updateObject from '../../utils/common/updateObject';

const initialState = {
  list: [],
};

const updateOpeningHoursState = (state: OpeningHoursStateInterface, action: OpeningHoursReducerActionPayload) => updateObject(state, {
  list: action.payload,
});

export const openingHoursReducer: any = (state = initialState, action: any): any => {
  switch (action.type) {
    case SET_OPENING_HOURS_ACTION:
      return updateOpeningHoursState(state, action);
    default:
      return state;
  }
};
