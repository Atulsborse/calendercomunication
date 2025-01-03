import React from 'react';
import { CommunicationFrequency } from './charts/CommunicationFrequency';
import { OverdueTrends } from './charts/OverdueTrends';
import { ActivityLog } from './ActivityLog';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { useAnalyticsExport } from '@/hooks/useAnalyticsExport';

export function AnalyticsDashboard() {
  const { exportReport } = useAnalyticsExport();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Analytics Dashboard</h2>
        <Button onClick={exportReport}>
          <Download className="w-4 h-4 mr-2" />
          Export Report
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <CommunicationFrequency />
        <OverdueTrends />
      </div>

      <ActivityLog />
    </div>
  );
}