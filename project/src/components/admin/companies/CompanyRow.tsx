import React from 'react';
import { Company } from '@/types';
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
    none: 'hover:bg-gray-50 transition-colors duration-200',
    yellow: 'bg-yellow-50 hover:bg-yellow-100 transition-colors duration-200',
    red: 'bg-red-50 hover:bg-red-100 transition-colors duration-200',
  };

  return (
    <tr className={highlightClasses[highlight]}>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="text-sm font-medium text-gray-900 hover:text-blue-600 transition-colors duration-200">
            {company.name}
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex flex-wrap gap-2">
          {company.communications.slice(0, 5).map((comm) => (
            <span
              key={comm.id}
              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 hover:bg-blue-200 transition-colors duration-200 cursor-help"
            >
              {comm.type.name} - {formatDate(comm.date)}
            </span>
          ))}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <Button 
          size="sm" 
          onClick={() => onCommunicate(company.id)}
          className="hover:scale-105 transform transition-transform duration-200"
        >
          <MessageSquare className="w-4 h-4 mr-2" />
          Communicate
        </Button>
      </td>
    </tr>
  );
}