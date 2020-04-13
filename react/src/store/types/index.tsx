import { AdminUserInterface } from '../../views/types/types';

export interface ReduxState {
  adminUsers: AdminUsersStateInterface,
  global: globalStateInterface
}

interface AdminUsersReducerStateInitiated {
  list: AdminUserInterface[];
}

export type AdminUsersStateInterface = AdminUsersReducerStateInitiated | null;

export interface AdminUserReducerActionPayload {
  type: string,
  payload: AdminUserInterface[],
}

export interface globalStateInterface {
  isLogged: boolean,
}

export interface globalReducerActionInterface {
  type: string,
  payload: boolean,
}
