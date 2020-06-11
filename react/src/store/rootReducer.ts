import { combineReducers } from 'redux';
import { adminUsersReducer } from './reducers/adminUsersReducer';
import { servicesReducer } from './reducers/ServicesReducer';
import { globalReducer } from './reducers/globalReducer';
import { appointmentReducer } from './reducers/appointmentReducer';
import { openingHoursReducer } from './reducers/openingHoursReducer';
import { promotionReducer } from './reducers/promotionReducer';

export const rootReducer = combineReducers({
  adminUsers: adminUsersReducer,
  services: servicesReducer,
  global: globalReducer,
  appointments: appointmentReducer,
  openingHours: openingHoursReducer,
  promotions: promotionReducer,
});
