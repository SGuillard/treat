import React from 'react';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'

const Calendar = () => {
    return (
        <div>
            <FullCalendar defaultView="dayGridMonth" plugins={[ dayGridPlugin ]} />
        </div>
    );
};

export default Calendar;