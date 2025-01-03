import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { CompanyForm, CompanyFormData } from './CompanyForm';
import { useStore } from '@/store/useStore';
import { Company } from '@/types';

interface EditCompanyDialogProps {
  company: Company;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EditCompanyDialog({ company, open, onOpenChange }: EditCompanyDialogProps) {
  const { updateCompany } = useStore();

  const handleSubmit = (data: CompanyFormData) => {
    updateCompany({
      ...company,
      ...data,
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Company</DialogTitle>
          <DialogDescription>
            Update the company information for {company.name}.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <CompanyForm initialData={company} onSubmit={handleSubmit} />
        </div>
      </DialogContent>
    </Dialog>
  );
}