import React, { useRef, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import Popup from 'reactjs-popup';

const events = [
  {
    title: 'test',
    date: '2020-04-15',
  },
];

const Calendar = () => {
  const [open, toggleModal] = useState(false);
  const calendarComponentRef: any = useRef();


  const openPopup = () => {
    toggleModal(true);
  };

  const closeModal = () => {
    toggleModal(false);
  };

  const handleDateClick = () => {
    openPopup();
  };

  return (
    <div className="demo-app">
      <div className="demo-app-top">
        &nbsp; (also, click a date/time to add an event)
      </div>
      <div className="demo-app-calendar">
        <FullCalendar
          defaultView="timeGridDay"
          header={{
            left: 'prev,next today',
            center: 'title',
            right: 'timeGridWeek,timeGridDay,listWeek',
          }}
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          ref={calendarComponentRef}
          events={events}
          dateClick={handleDateClick}
        />
      </div>
    </div>
  );
};

export default Calendar;
