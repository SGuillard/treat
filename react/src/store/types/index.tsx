import { AdminUserInterface, ServiceInterface } from '../../views/types/types';

export interface ReduxState {
  adminUsers: AdminUsersStateInterface,
  global: GlobalStateInterface,
  services: ServiceStateInterface
}

interface AdminUsersReducerStateInitiated {
  list: AdminUserInterface[];
}

export type AdminUsersStateInterface = AdminUsersReducerStateInitiated | null;

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

interface ServiceStateInitiatedInterface {
  list: ServiceInterface
}

export type ServiceStateInterface = ServiceStateInitiatedInterface | null;

export interface ServiceReducerActionInterface {
  type: string,
  payload: ServiceInterface[]
}
