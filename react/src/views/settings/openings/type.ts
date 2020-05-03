import { OpeningHoursInterface } from '../../types/types';

export interface hoursObjectInterface {
  open: string,
  close: string,
}

export interface DayToUpdateInterface {
  [key: number]: OpeningHoursInterface
}
