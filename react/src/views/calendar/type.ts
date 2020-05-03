export enum EditMode {
  Add,
  Edit,
}

export interface CalendarPopupProps {
  open: boolean,
  closeModal: any,
  calendarEvent: any
  action: EditMode
}
