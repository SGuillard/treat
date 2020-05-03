import React from 'react';
import { CalendarPopup } from './calendar-popup';

export const DisplayPopup = ({ open, action, closeModal, calendarEvent }: any) => (open ? <CalendarPopup open={open} action={action} closeModal={closeModal} calendarEvent={calendarEvent} /> : null);
