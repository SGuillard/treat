import { reducerPayloadType } from '../../views/settings/adminUsers/types';

export const formReducer = (state: object, { name, value }: reducerPayloadType) => ({
  ...state,
  [name]: value,
});

export const formTimerReducer = (state: any, { day, name, value, id }: any) => ({
  ...state,
  [day]: {
    ...state[day],
    id,
    [name]: value,
  },
});
