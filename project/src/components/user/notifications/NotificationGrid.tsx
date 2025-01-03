import React from 'react';
import { Company } from '@/types';
import { Button } from '@/components/ui/button';
import { MessageSquare } from 'lucide-react';

interface NotificationGridProps {
  title: string;
  icon: React.ReactNode;
  companies: Company[];
  variant: 'overdue' | 'today';
  onCommunicate: (companyId: string) => void;
}

export function NotificationGrid({ 
  title, 
  icon, 
  companies, 
  variant, 
  onCommunicate 
}: NotificationGridProps) {
  const bgColor = variant === 'overdue' ? 'bg-red-50' : 'bg-yellow-50';
  const textColor = variant === 'overdue' ? 'text-red-600' : 'text-yellow-600';

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h3 className={`text-lg font-medium flex items-center ${textColor}`}>
        {icon}
        <span className="ml-2">{title}</span>
      </h3>
      <div className="mt-4 space-y-4">
        {companies.map((company) => (
          <div
            key={company.id}
            className={`flex items-center justify-between p-4 ${bgColor} rounded-lg`}
          >
            <div>
              <p className="font-medium">{company.name}</p>
              <p className="text-sm text-gray-500">
                Last communication: {company.lastCommunication?.date.toLocaleDateString()}
              </p>
            </div>
            <Button size="sm" onClick={() => onCommunicate(company.id)}>
              <MessageSquare className="w-4 h-4 mr-2" />
              Communicate
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}