import React from 'react';
import { useActivityLog } from '@/hooks/useActivityLog';
import { formatDate } from '@/lib/utils';

export function ActivityLog() {
  const { recentActivities } = useActivityLog();

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h3 className="text-lg font-medium mb-4">Recent Activity Log</h3>
      <div className="space-y-4">
        {recentActivities.map((activity) => (
          <div
            key={activity.id}
            className="flex items-center justify-between py-2 border-b border-gray-200"
          >
            <div>
              <p className="font-medium">{activity.companyName}</p>
              <p className="text-sm text-gray-500">
                {activity.type} - {formatDate(activity.date)}
              </p>
            </div>
            <span
              className={`px-2 py-1 text-xs font-medium rounded-full ${
                activity.completed
                  ? 'bg-green-100 text-green-800'
                  : 'bg-yellow-100 text-yellow-800'
              }`}
            >
              {activity.completed ? 'Completed' : 'Pending'}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}