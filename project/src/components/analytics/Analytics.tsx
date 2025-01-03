import React from 'react';
import { useStore } from '@/store/useStore';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';

export function Analytics() {
  const { communications, companies } = useStore();

  // Calculate communication method frequencies
  const methodFrequencies = communications.reduce((acc: any, comm) => {
    acc[comm.type.name] = (acc[comm.type.name] || 0) + 1;
    return acc;
  }, {});

  // Calculate overdue trends
  const overdueByCompany = companies.reduce((acc: any, company) => {
    const isOverdue = company.lastCommunication
      ? (new Date().getTime() - new Date(company.lastCommunication.date).getTime()) /
          (1000 * 60 * 60 * 24) >
        company.communicationPeriodicity
      : true;
    
    if (isOverdue) {
      acc[company.name] = (acc[company.name] || 0) + 1;
    }
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Analytics Dashboard</h2>
        <Button>
          <Download className="w-4 h-4 mr-2" />
          Export Report
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                        width: `${(Number(count) / communications.length) * 100}%`,
                      }}
                    />
                  </div>
                </div>
                <div className="w-16 text-right text-sm text-gray-600">{count}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium mb-4">Overdue Communications by Company</h3>
          <div className="space-y-4">
            {Object.entries(overdueByCompany).map(([company, count]) => (
              <div key={company} className="flex items-center">
                <div className="w-32 text-sm text-gray-600">{company}</div>
                <div className="flex-1">
                  <div className="h-4 bg-red-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-red-500"
                      style={{
                        width: `${(Number(count) / companies.length) * 100}%`,
                      }}
                    />
                  </div>
                </div>
                <div className="w-16 text-right text-sm text-gray-600">{count}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-medium mb-4">Recent Activity Log</h3>
        <div className="space-y-4">
          {communications
            .sort((a, b) => b.date.getTime() - a.date.getTime())
            .slice(0, 10)
            .map((comm) => {
              const company = companies.find((c) => c.id === comm.companyId);
              return (
                <div
                  key={comm.id}
                  className="flex items-center justify-between py-2 border-b border-gray-200"
                >
                  <div>
                    <p className="font-medium">{company?.name}</p>
                    <p className="text-sm text-gray-500">
                      {comm.type.name} - {new Date(comm.date).toLocaleDateString()}
                    </p>
                  </div>
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded-full ${
                      comm.completed
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {comm.completed ? 'Completed' : 'Pending'}
                  </span>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}