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
  start: string,
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

export interface PromotionModel {
  isActive: boolean | number,
  name: string,
  startDate: string,
  endDate: string,
  day: number,
  startHour: string,
  endHour: string,
  discount: number,
  service: ServiceInterface,
}

export interface PromotionInterface extends PromotionModel {
  id?: number | null;
}

export interface FormLoaderProps {
  params?: {
    id?: number,
  };
}
