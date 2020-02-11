import {
  ADD_ADMIN_USER_ACTION, SET_SERVICE_ACTION,
} from './constants';
import makeRequest, { RequestMethod } from '../../utils/apiRequest';
import API from '../../API';
import { ServiceInterface } from '../../containers/admin/settings/services/settings-service-list';

interface AdminUserInterfacePayload {
  type: string,
  payload: ServiceInterface,
}

export const addAdminUserAction = (user: ServiceInterface): AdminUserInterfacePayload => ({
  type: ADD_ADMIN_USER_ACTION,
  payload: user,
});

export const updateObject = (oldObject: any, updatedProperties: any) => ({
  ...oldObject,
  ...updatedProperties,
});

export const setServiceAction = (service: ServiceInterface[]) => ({
  type: SET_SERVICE_ACTION,
  payload: service,
});

export const initServiceList = () => (dispatch: any) => {
  makeRequest(RequestMethod.GET, `${API.SERVICE_ALL}`).then((response: any) => dispatch(setServiceAction(response)));
};

export const addAdminUser = (payload: any) => (dispatch: any) => {
  makeRequest(RequestMethod.POST,
    `${API.TEAM_CREATE}`, payload).then((response: any) => dispatch(addAdminUserAction(response)));
};
