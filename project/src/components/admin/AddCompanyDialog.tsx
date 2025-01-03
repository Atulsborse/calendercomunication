import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useStore } from '@/store/useStore';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';

const companySchema = z.object({
  name: z.string().min(1, 'Company name is required'),
  location: z.string().min(1, 'Location is required'),
  linkedinProfile: z.string().url('Invalid LinkedIn URL'),
  email: z.string().email('Invalid email'),
  phoneNumber: z.string().min(1, 'Phone number is required'),
  comments: z.string().optional(),
  communicationPeriodicity: z.coerce.number().min(1, 'Periodicity must be at least 1 day'),
});

type CompanyFormData = z.infer<typeof companySchema>;

interface AddCompanyDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddCompanyDialog({ open, onOpenChange }: AddCompanyDialogProps) {
  const { addCompany } = useStore();
  const form = useForm<CompanyFormData>({
    resolver: zodResolver(companySchema),
    defaultValues: {
      comments: '',
      communicationPeriodicity: 7,
    },
  });

  const onSubmit = (data: CompanyFormData) => {
    addCompany({
      id: crypto.randomUUID(),
      name: data.name,
      location: data.location,
      linkedinProfile: data.linkedinProfile,
      emails: [data.email],
      phoneNumbers: [data.phoneNumber],
      comments: data.comments || '',
      communicationPeriodicity: data.communicationPeriodicity,
      communications: [],
    });
    form.reset();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Company</DialogTitle>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField>
            <FormItem>
              <FormLabel>Company Name</FormLabel>
              <FormControl>
                <Input {...form.register('name')} />
              </FormControl>
              <FormMessage>{form.formState.errors.name?.message}</FormMessage>
            </FormItem>
          </FormField>

          <FormField>
            <FormItem>
              <FormLabel>Location</FormLabel>
              <FormControl>
                <Input {...form.register('location')} />
              </FormControl>
              <FormMessage>{form.formState.errors.location?.message}</FormMessage>
            </FormItem>
          </FormField>

          <FormField>
            <FormItem>
              <FormLabel>LinkedIn Profile</FormLabel>
              <FormControl>
                <Input {...form.register('linkedinProfile')} type="url" />
              </FormControl>
              <FormMessage>{form.formState.errors.linkedinProfile?.message}</FormMessage>
            </FormItem>
          </FormField>

          <FormField>
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...form.register('email')} type="email" />
              </FormControl>
              <FormMessage>{form.formState.errors.email?.message}</FormMessage>
            </FormItem>
          </FormField>

          <FormField>
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input {...form.register('phoneNumber')} type="tel" />
              </FormControl>
              <FormMessage>{form.formState.errors.phoneNumber?.message}</FormMessage>
            </FormItem>
          </FormField>

          <FormField>
            <FormItem>
              <FormLabel>Communication Periodicity (days)</FormLabel>
              <FormControl>
                <Input 
                  {...form.register('communicationPeriodicity')}
                  type="number"
                  min={1}
                />
              </FormControl>
              <FormMessage>{form.formState.errors.communicationPeriodicity?.message}</FormMessage>
            </FormItem>
          </FormField>

          <DialogFooter>
            <Button type="submit">Add Company</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}