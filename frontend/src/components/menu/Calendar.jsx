import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useUserSettings } from '../../hooks/useUserSettings';

export default function Calendar() {
  const [events, setEvents] = useState([]);
  const { settings } = useUserSettings();

  const handleDateSelect = (selectInfo) => {
    const title = prompt('Please enter a meal name');
    if (title) {
      setEvents([
        ...events,
        {
          id: createEventId(),
          title,
          start: selectInfo.startStr,
          end: selectInfo.endStr,
          allDay: selectInfo.allDay,
        },
      ]);
    }
  };

  const handleEventDrop = (dropInfo) => {
    const updatedEvents = events.map(event => {
      if (event.id === dropInfo.event.id) {
        return {
          ...event,
          start: dropInfo.event.startStr,
          end: dropInfo.event.endStr,
        };
      }
      return event;
    });
    setEvents(updatedEvents);
  };

  const handleEventClick = (clickInfo) => {
    if (window.confirm(`Delete '${clickInfo.event.title}'?`)) {
      setEvents(events.filter(event => event.id !== clickInfo.event.id));
    }
  };

  const createEventId = () => {
    return String(events.length + 1);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Meal Calendar</h2>
        <p className="text-sm text-gray-600">Click to add meals, drag to move them</p>
      </div>
      <div className="calendar-container">
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth'
          }}
          initialView="dayGridMonth"
          editable={true}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
          weekends={true}
          events={events}
          select={handleDateSelect}
          eventClick={handleEventClick}
          eventDrop={handleEventDrop}
          height="auto"
        />
      </div>
    </div>
  );
}