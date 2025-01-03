import { useStore } from '@/store/useStore';
import { EventClickArg } from '@fullcalendar/core';

export function useCalendarEvents() {
  const { communications, companies } = useStore();

  const events = communications.map((comm) => {
    const company = companies.find((c) => c.id === comm.companyId);
    return {
      id: comm.id,
      title: `${comm.type.name} - ${company?.name}`,
      date: comm.date,
      backgroundColor: comm.completed ? '#10B981' : '#3B82F6',
      extendedProps: {
        notes: comm.notes,
        completed: comm.completed,
      },
    };
  });

  const handleEventClick = (clickInfo: EventClickArg) => {
    // Handle event click if needed
    console.log('Event clicked:', clickInfo.event);
  };

  return { events, handleEventClick };
}