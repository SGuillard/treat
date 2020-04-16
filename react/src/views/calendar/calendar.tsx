import React, { useEffect, useRef, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import { useSelector } from 'react-redux';
import { CalendarPopup } from './calendar-popup';
import { ReduxState } from '../../store/types';

// TODO DElete
const eventsDemo = [
  {
    title: 'test',
    date: '2020-04-15',
  },
];

const Calendar = () => {
  const [open, toggleModal] = useState(false);
  const calendarComponentRef: any = useRef();
  const [calendarEvent, setCalendarEvent] = useState({});
  const appointments = useSelector((state: ReduxState) => state.appointments.list);

  const events = () => appointments.map((appointment: any) => ({ title: 'test', date: appointment.date }));

  useEffect(() => {
    console.log(events());
  }, [events]);

  const closeModal = () => {
    toggleModal(false);
  };

  const handleDateClick = (event: any) => {
    toggleModal(true);
    setCalendarEvent(event);
  };

  const handleEventClick = ({ event }: {event: any}) => {
    setCalendarEvent(event);
  };

  return (
    <div className="demo-app">
      <div className="demo-app-top">
        &nbsp; (also, click a date/time to add an event)
      </div>
      <div className="demo-app-calendar">
        <CalendarPopup open={open} closeModal={closeModal} calendarEvent={calendarEvent} />
        <FullCalendar
          defaultView="timeGridDay"
          header={{
            left: 'prev,next today',
            center: 'title',
            right: 'timeGridWeek,timeGridDay,listWeek',
          }}
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          ref={calendarComponentRef}
          events={events()}
          dateClick={handleDateClick}
          eventClick={handleEventClick}
        />
      </div>
    </div>
  );
};

export default Calendar;
