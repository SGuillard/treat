import { reducerPayloadType } from '../../views/settings/adminUsers/types';

export const formReducer = (state: any, { name, value }: reducerPayloadType) => ({
  ...state,
  [name]: value,
});
