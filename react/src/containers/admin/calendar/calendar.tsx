import React, {useState} from 'react';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import Popup from "reactjs-popup";

const Calendar = () => {

    const [open, toggleModal] = useState(false);

    const openPopup = () => {
        toggleModal(true);
    };

    const closeModal = () => {
        toggleModal(false);
    };

    const handleDateClick = (arg: any) => {
        openPopup();
    };

    return (
        <div>
            <Popup
                open={open}
                closeOnDocumentClick
                onClose={closeModal}
            >
                <div className="modal">
                    <div className="close" onClick={closeModal}>
                        &times;
                    </div>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae magni
                    omnis delectus nemo, maxime molestiae dolorem numquam mollitia, voluptate
                    ea, accusamus excepturi deleniti ratione sapiente! Laudantium, aperiam
                    doloribus. Odit, aut.
                </div>
            </Popup>
            <FullCalendar dateClick={handleDateClick} defaultView="dayGridMonth"
                          plugins={[dayGridPlugin, interactionPlugin]}
                          events={[
                              {title: 'event 1', date: '2020-01-01'},
                              {title: 'event 2', date: '2020-01-02'}
                          ]}

            />
        </div>
    );
};

export default Calendar;