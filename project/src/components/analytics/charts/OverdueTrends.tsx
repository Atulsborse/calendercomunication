import React from 'react';
import { useOverdueTrends } from '@/hooks/useOverdueTrends';

export function OverdueTrends() {
  const { overdueByCompany } = useOverdueTrends();

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h3 className="text-lg font-medium mb-4">Overdue Communications by Company</h3>
      <div className="space-y-4">
        {Object.entries(overdueByCompany).map(([company, data]) => (
          <div key={company} className="flex items-center">
            <div className="w-32 text-sm text-gray-600">{company}</div>
            <div className="flex-1">
              <div className="h-4 bg-red-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-red-500"
                  style={{
                    width: `${(data.count / data.total) * 100}%`,
                  }}
                />
              </div>
            </div>
            <div className="w-16 text-right text-sm text-gray-600">
              {data.count}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}