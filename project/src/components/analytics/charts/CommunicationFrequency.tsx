import React from 'react';
import { useCommunicationStats } from '@/hooks/useCommunicationStats';

export function CommunicationFrequency() {
  const { methodFrequencies } = useCommunicationStats();

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h3 className="text-lg font-medium mb-4">Communication Method Frequency</h3>
      <div className="space-y-4">
        {Object.entries(methodFrequencies).map(([method, count]) => (
          <div key={method} className="flex items-center">
            <div className="w-32 text-sm text-gray-600">{method}</div>
            <div className="flex-1">
              <div className="h-4 bg-blue-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-500"
                  style={{
                    width: `${(count.total / count.max) * 100}%`,
                  }}
                />
              </div>
            </div>
            <div className="w-16 text-right text-sm text-gray-600">
              {count.total}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}