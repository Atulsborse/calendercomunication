import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useCalendarEvents } from '@/hooks/useCalendarEvents';
import { CommunicationTooltip } from './CommunicationTooltip';

export function CalendarView() {
  const { events, handleEventClick } = useCalendarEvents();

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
        eventClick={handleEventClick}
        eventContent={(eventInfo) => (
          <CommunicationTooltip event={eventInfo.event} />
        )}
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,dayGridWeek',
        }}
        height="auto"
      />
    </div>
  );
}