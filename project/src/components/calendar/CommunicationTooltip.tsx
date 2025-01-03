import React from 'react';
import { EventApi } from '@fullcalendar/core';
import { Tooltip } from '@/components/ui/tooltip';

interface CommunicationTooltipProps {
  event: EventApi;
}

export function CommunicationTooltip({ event }: CommunicationTooltipProps) {
  const tooltipContent = (
    <div className="space-y-1">
      <p className="font-medium">{event.title}</p>
      <p className="text-xs">{event.extendedProps.notes}</p>
    </div>
  );

  return (
    <Tooltip
      content={tooltipContent}
      trigger={
        <div
          className={`p-1 text-xs rounded ${
            event.extendedProps.completed
              ? 'bg-green-100 text-green-800'
              : 'bg-blue-100 text-blue-800'
          }`}
        >
          {event.title}
        </div>
      }
    />
  );
}