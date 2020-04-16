import {
  AppointmentReducerActionPayload, AppointmentStateInterface,
} from '../types';
import { SET_APPOINTMENT_ACTION } from '../actions/constants';
import updateObject from '../../utils/common/updateObject';

const initialState = {
  list: [],
};

const updateAppointmentState = (state: AppointmentStateInterface, action: AppointmentReducerActionPayload) => updateObject(state, {
  list: action.payload,
});

export const appointmentReducer: any = (state = initialState, action: any): any => {
  switch (action.type) {
    case SET_APPOINTMENT_ACTION:
      return updateAppointmentState(state, action);
    default:
      return state;
  }
};
