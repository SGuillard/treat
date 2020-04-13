import { reducerPayloadType } from '../../views/settings/adminUsers/types';

export const formReducer = (state: object, { name, value }: reducerPayloadType) => ({
  ...state,
  [name]: value,
});
