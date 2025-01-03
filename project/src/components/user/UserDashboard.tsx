import React, { useState } from 'react';
import { useStore } from '@/store/useStore';
import { CompanyTable } from './dashboard/CompanyTable';
import { NotificationGrid } from './notifications/NotificationGrid';
import { AlertTriangle } from 'lucide-react';
import { useCompanyHighlight } from '@/hooks/useCompanyHighlight';
import { LogCommunicationDialog } from './communications/LogCommunicationDialog';

export function UserDashboard() {
  const { companies } = useStore();
  const { getHighlight } = useCompanyHighlight();
  const [selectedCompanyId, setSelectedCompanyId] = useState<string | null>(null);

  const overdueCompanies = companies.filter(
    (company) => getHighlight(company) === 'red'
  );
  const dueTodayCompanies = companies.filter(
    (company) => getHighlight(company) === 'yellow'
  );

  const handleCommunicate = (companyId: string) => {
    setSelectedCompanyId(companyId);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <NotificationGrid
          title="Overdue Communications"
          icon={<AlertTriangle className="w-5 h-5" />}
          companies={overdueCompanies}
          variant="overdue"
          onCommunicate={handleCommunicate}
        />
        <NotificationGrid
          title="Due Today"
          icon={<AlertTriangle className="w-5 h-5" />}
          companies={dueTodayCompanies}
          variant="today"
          onCommunicate={handleCommunicate}
        />
      </div>

      <CompanyTable 
        companies={companies}
        onCommunicate={handleCommunicate}
      />

      {selectedCompanyId && (
        <LogCommunicationDialog
          companyId={selectedCompanyId}
          open={!!selectedCompanyId}
          onOpenChange={(open) => !open && setSelectedCompanyId(null)}
        />
      )}
    </div>
  );
}