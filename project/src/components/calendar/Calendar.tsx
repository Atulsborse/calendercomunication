import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useStore } from '@/store/useStore';

export function Calendar() {
  const { communications } = useStore();

  const events = communications.map((comm) => ({
    id: comm.id,
    title: `${comm.type.name} - ${comm.companyId}`,
    date: comm.date,
    backgroundColor: comm.completed ? '#10B981' : '#3B82F6',
  }));

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
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