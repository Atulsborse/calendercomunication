import React from 'react';
import { Company, Communication } from '@/types';
import { Button } from '@/components/ui/button';
import { MessageSquare } from 'lucide-react';
import { Tooltip } from '@/components/ui/tooltip';
import { formatDate } from '@/lib/utils';

interface CompanyRowProps {
  company: Company;
  highlight: 'none' | 'yellow' | 'red';
  onCommunicate: (companyId: string) => void;
}

export function CompanyRow({ company, highlight, onCommunicate }: CompanyRowProps) {
  const highlightClasses = {
    none: '',
    yellow: 'bg-yellow-50',
    red: 'bg-red-50',
  };

  // Sort communications by date in descending order
  const sortedCommunications = [...company.communications].sort(
    (a, b) => b.date.getTime() - a.date.getTime()
  );

  // Separate past and future communications
  const now = new Date();
  const pastCommunications = sortedCommunications.filter(
    comm => comm.date.getTime() <= now.getTime()
  );
  const futureCommunications = sortedCommunications.filter(
    comm => comm.date.getTime() > now.getTime()
  );

  // Get the next scheduled communication
  const nextScheduled = futureCommunications.length > 0 
    ? futureCommunications.reduce((nearest, comm) => 
        comm.date.getTime() < nearest.date.getTime() ? comm : nearest
      )
    : null;

  const renderCommunicationBadge = (comm: Communication) => (
    <Tooltip 
      key={comm.id}
      content={comm.notes}
      trigger={
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
          {comm.type.name} - {formatDate(comm.date)}
        </span>
      }
    />
  );

  return (
    <tr className={highlightClasses[highlight]}>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
        {company.name}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        <div className="flex flex-wrap gap-2">
          {pastCommunications.slice(0, 5).map(renderCommunicationBadge)}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {nextScheduled ? (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            {nextScheduled.type.name} - {formatDate(nextScheduled.date)}
          </span>
        ) : (
          'No scheduled communication'
        )}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        <Button size="sm" onClick={() => onCommunicate(company.id)}>
          <MessageSquare className="w-4 h-4 mr-2" />
          Communicate
        </Button>
      </td>
    </tr>
  );
}