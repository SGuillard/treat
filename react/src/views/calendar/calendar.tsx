import React, { useEffect, useRef, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import { useSelector } from 'react-redux';
import { ReduxState } from '../../store/types';
import { AppointmentInterface } from '../types/types';
import { EditMode } from './type';
import { DisplayPopup } from './display-popup';

const Calendar = () => {
  const [open, toggleModal] = useState(false);
  const calendarComponentRef: any = useRef();
  const [calendarEvent, setCalendarEvent] = useState({});
  const [editMode, setEditMode] = useState(EditMode.Add);
  const appointments = useSelector((state: ReduxState) => state.appointments.list);

  const getEvents = () => appointments.map((appointment: AppointmentInterface) => ({ title: appointment.clientName, ...appointment, idAppointment: appointment.id }));

  const closeModal = () => {
    toggleModal(false);
  };

  const handleDateClick = (event: any) => {
    setEditMode(EditMode.Add);
    setCalendarEvent(event);
    toggleModal(true);
  };

  const handleEventClick = ({ event }: {event: any}) => {
    setEditMode(EditMode.Edit);
    setCalendarEvent(event);
    toggleModal(true);
  };

  return (
    <div className="demo-app">
      <div className="demo-app-top">
        &nbsp; (also, click a date/time to add an event)
      </div>
      <div className="demo-app-calendar">
        <DisplayPopup open={open} action={editMode} closeModal={closeModal} calendarEvent={calendarEvent} />
        <FullCalendar
          defaultView="timeGridDay"
          header={{
            left: 'prev,next today',
            center: 'title',
            right: 'timeGridWeek,timeGridDay,listWeek',
          }}
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          ref={calendarComponentRef}
          events={getEvents()}
          dateClick={handleDateClick}
          eventClick={handleEventClick}
        />
      </div>
    </div>
  );
};

export default Calendar;
