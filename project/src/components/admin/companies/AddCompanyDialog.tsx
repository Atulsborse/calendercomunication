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
import { Building2 } from 'lucide-react';

interface AddCompanyDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddCompanyDialog({ open, onOpenChange }: AddCompanyDialogProps) {
  const { addCompany } = useStore();

  const handleSubmit = (data: CompanyFormData) => {
    addCompany({
      id: crypto.randomUUID(),
      ...data,
      communications: [],
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl bg-white border-0 rounded-lg shadow-xl transform transition-all duration-200 ease-in-out">
        <DialogHeader className="border-b pb-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-lg p-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-100 rounded-full">
              <Building2 className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <DialogTitle className="text-xl font-semibold text-gray-900">
                Add New Company
              </DialogTitle>
              <DialogDescription className="text-sm text-gray-600 mt-1">
                Add a new company to your communication tracking system
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>
        <div className="p-6 max-h-[calc(100vh-200px)] overflow-y-auto">
          <CompanyForm onSubmit={handleSubmit} />
        </div>
      </DialogContent>
    </Dialog>
  );
}