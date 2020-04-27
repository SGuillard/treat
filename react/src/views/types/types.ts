interface AdminUserModel {
  firstName: string,
  lastName: string,
  active: boolean,
}

export interface AdminUserInterface extends AdminUserModel {
  id: number,
}

export interface AdminUserFormInterface extends AdminUserModel {
  id?: number;
}

export interface ServiceModel {
  price: string,
  duration: number,
  name: string,
}

export interface ServiceInterface extends ServiceModel {
  id: number,
}

export interface ServiceFormInterface extends ServiceModel {
  id?: number | null;
}

export interface AppointmentModel {
  salonId: number,
  duration: number,
  adminUserId: number,
  date: string,
  serviceId: number,
  userId: number | null,
  clientName: string | null,
}

export interface AppointmentInterface extends AppointmentModel{
  id?: number | null;
}

export interface OpeningHoursModel {
  open?: string,
  close?: string,
  isClose?: number | boolean,
  day: number
}

export interface OpeningHoursInterface extends OpeningHoursModel{
  id?: number | null;
}
