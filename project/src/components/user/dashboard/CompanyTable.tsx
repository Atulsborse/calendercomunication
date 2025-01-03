import React from 'react';
import { Company } from '@/types';
import { CompanyRow } from './CompanyRow';
import { useCompanyHighlight } from '@/hooks/useCompanyHighlight';

interface CompanyTableProps {
  companies: Company[];
  onCommunicate: (companyId: string) => void;
}

export function CompanyTable({ companies, onCommunicate }: CompanyTableProps) {
  const { getHighlight } = useCompanyHighlight();

  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Company
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last 5 Communications
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Next Scheduled
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {companies.map((company) => (
                <CompanyRow
                  key={company.id}
                  company={company}
                  highlight={getHighlight(company)}
                  onCommunicate={onCommunicate}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}