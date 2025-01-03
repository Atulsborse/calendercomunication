import React from 'react';
import { CompanyList } from './companies/CompanyList';
import { CommunicationMethodList } from './communication-methods/CommunicationMethodList';
import { UserList } from './users/UserList';

export function AdminDashboard() {
  return (
    <div className="space-y-8">
      <UserList />
      <CompanyList />
      <CommunicationMethodList />
    </div>
  );
}