import {
  AdminUserInterface,
  AppointmentInterface, OpeningHoursInterface, PromotionInterface,
  ServiceInterface
} from '../../views/types/types';

export interface ReduxState {
  adminUsers: AdminUsersStateInterface,
  global: GlobalStateInterface,
  services: ServiceStateInterface,
  appointments: AppointmentStateInterface,
  openingHours: OpeningHoursStateInterface,
  promotions: PromotionStateInterface,
}

export interface AdminUsersStateInterface {
  list: AdminUserInterface[];
}

export interface AdminUserReducerActionPayload {
  type: string,
  payload: AdminUserInterface[],
}

export interface AppointmentReducerActionPayload {
  type: string,
  payload: AppointmentInterface[],
}

export interface OpeningHoursReducerActionPayload {
  type: string,
  payload: AppointmentInterface[],
}

export interface PromotionReducerActionPayload {
  type: string,
  payload: PromotionInterface[],
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

export interface AppointmentStateInterface {
  list: AppointmentInterface[]
}

export interface OpeningHoursStateInterface {
  list: OpeningHoursInterface[]
}

export interface PromotionStateInterface {
  list: PromotionInterface[]
}

export interface ServiceReducerActionInterface {
  type: string,
  payload: ServiceInterface[]
}
