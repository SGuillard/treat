import { AdminUserInterface, ServiceInterface } from '../../views/types/types';

export interface ReduxState {
  adminUsers: AdminUsersStateInterface,
  global: GlobalStateInterface,
  services: ServiceStateInterface
}

export interface AdminUsersStateInterface {
  list: AdminUserInterface[];
}

export interface AdminUserReducerActionPayload {
  type: string,
  payload: AdminUserInterface[],
}

export interface GlobalStateInterface {
  isLogged: boolean,
}

export interface GlobalReducerActionInterface {
  type: string,
  payload: boolean,
}

export interface ServiceStateInterface {
  list: ServiceInterface[]
}

export interface ServiceReducerActionInterface {
  type: string,
  payload: ServiceInterface[]
}
