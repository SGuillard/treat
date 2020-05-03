export const emptyEvent = { serviceId: '', adminUserId: '', clientName: '' };

export const initReducer = (calendarEvent: any) => {
  // If date is a key in the calendar event we are in add mode. Otherwise on edit mode.
  if (calendarEvent.date) {
    return { ...calendarEvent, ...emptyEvent };
  }
  return { ...calendarEvent, date: calendarEvent.start, ...calendarEvent.extendedProps };
};
