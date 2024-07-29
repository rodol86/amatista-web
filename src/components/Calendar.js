import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const CalendarComponent = () => {
  const [events, setEvents] = useState([
    {
      title: 'Design review',
      start: new Date(2022, 0, 3, 10, 0), // January 3, 2022, 10:00 AM
      end: new Date(2022, 0, 3, 11, 0),
    },
    {
      title: 'Sales meeting',
      start: new Date(2022, 0, 3, 14, 0), // January 3, 2022, 2:00 PM
      end: new Date(2022, 0, 3, 15, 0),
    },
    {
      title: "Sam's birthday party",
      start: new Date(2022, 0, 12, 14, 0), // January 12, 2022, 2:00 PM
      end: new Date(2022, 0, 12, 15, 0),
    },
  ]);

  return (
    <div className="my-4">
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        defaultView="month"
        views={['month', 'week', 'day']}
        selectable
      />
    </div>
  );
};

export default CalendarComponent;
