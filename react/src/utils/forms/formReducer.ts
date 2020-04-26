import { reducerPayloadType } from '../../views/settings/adminUsers/types';

export const formReducer = (state: object, { name, value }: reducerPayloadType) => ({
  ...state,
  [name]: value,
});

export const formTimerReducer = (state: object, { day, name, value }: any) => ({
  ...state,
  [day]: {
    [name]: value,
  },
});
