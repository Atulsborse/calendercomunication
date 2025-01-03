import React from 'react';
import { Bell } from 'lucide-react';
import { useNotifications } from '@/hooks/useNotifications';
import { Tooltip } from '@/components/ui/tooltip';

export function NotificationBell() {
  const { totalCount, overdueCount, dueTodayCount } = useNotifications();

  if (totalCount === 0) {
    return <Bell className="w-6 h-6 text-gray-600" />;
  }

  const tooltipContent = (
    <div className="text-xs space-y-1">
      {overdueCount > 0 && (
        <p>{overdueCount} overdue communication{overdueCount !== 1 ? 's' : ''}</p>
      )}
      {dueTodayCount > 0 && (
        <p>{dueTodayCount} due today</p>
      )}
    </div>
  );

  return (
    <Tooltip
      content={tooltipContent}
      trigger={
        <div className="relative">
          <Bell className="w-6 h-6 text-gray-600" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {totalCount}
          </span>
        </div>
      }
    />
  );
}