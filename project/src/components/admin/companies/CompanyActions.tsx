import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Edit, Trash2 } from 'lucide-react';
import { DeleteCompanyDialog } from './DeleteCompanyDialog';
import { EditCompanyDialog } from './EditCompanyDialog';
import { useStore } from '@/store/useStore';
import { Company } from '@/types';

interface CompanyActionsProps {
  company: Company;
}

export function CompanyActions({ company }: CompanyActionsProps) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const { deleteCompany } = useStore();

  const handleDelete = () => {
    deleteCompany(company.id);
    setShowDeleteDialog(false);
  };

  return (
    <>
      <div className="flex space-x-2">
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => setShowEditDialog(true)}
        >
          <Edit className="w-4 h-4" />
        </Button>
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => setShowDeleteDialog(true)}
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>

      <DeleteCompanyDialog
        companyName={company.name}
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        onConfirm={handleDelete}
      />

      <EditCompanyDialog
        company={company}
        open={showEditDialog}
        onOpenChange={setShowEditDialog}
      />
    </>
  );
}