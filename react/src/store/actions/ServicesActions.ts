import {
  SET_SERVICE_ACTION,
} from './constants';
import makeApiRequest from '../../utils/api/apiRequest';
import API from '../../API';
import { RequestMethod } from '../../types';
import { ServiceInterface } from '../../views/types/types';

interface AdminUserInterfacePayload {
  type: string,
  payload: ServiceInterface,
}

export const updateObject = (oldObject: any, updatedProperties: any) => ({
  ...oldObject,
  ...updatedProperties,
});

export const setServiceAction = (service: ServiceInterface[]) => ({
  type: SET_SERVICE_ACTION,
  payload: service,
});

export const initServiceList = () => (dispatch: any) => {
  makeApiRequest(RequestMethod.GET, `${API.SERVICE_ALL}`).then((response: any) => dispatch(setServiceAction(response)));
};
