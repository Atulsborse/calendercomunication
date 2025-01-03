import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Plus, Minus } from 'lucide-react';
import { Company } from '@/types';

const companySchema = z.object({
  name: z.string().min(1, 'Company name is required'),
  location: z.string().min(1, 'Location is required'),
  linkedinProfile: z.string().url('Invalid LinkedIn URL'),
  emails: z.array(z.string().email('Invalid email')).min(1, 'At least one email is required'),
  phoneNumbers: z.array(z.string().min(1, 'Invalid phone number')).min(1, 'At least one phone number is required'),
  comments: z.string().optional(),
  communicationPeriodicity: z.coerce.number().min(1, 'Periodicity must be at least 1 day'),
});

export type CompanyFormData = z.infer<typeof companySchema>;

interface CompanyFormProps {
  initialData?: Partial<Company>;
  onSubmit: (data: CompanyFormData) => void;
}

export function CompanyForm({ initialData, onSubmit }: CompanyFormProps) {
  const form = useForm<CompanyFormData>({
    resolver: zodResolver(companySchema),
    defaultValues: {
      name: initialData?.name || '',
      location: initialData?.location || '',
      linkedinProfile: initialData?.linkedinProfile || '',
      emails: initialData?.emails || [''],
      phoneNumbers: initialData?.phoneNumbers || [''],
      comments: initialData?.comments || '',
      communicationPeriodicity: initialData?.communicationPeriodicity || 7,
    },
  });

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField>
          <FormItem>
            <FormLabel>Company Name</FormLabel>
            <FormControl>
              <Input {...form.register('name')} placeholder="Enter company name" />
            </FormControl>
            <FormMessage>{form.formState.errors.name?.message}</FormMessage>
          </FormItem>
        </FormField>

        <FormField>
          <FormItem>
            <FormLabel>Location</FormLabel>
            <FormControl>
              <Input {...form.register('location')} placeholder="Enter location" />
            </FormControl>
            <FormMessage>{form.formState.errors.location?.message}</FormMessage>
          </FormItem>
        </FormField>
      </div>

      <FormField>
        <FormItem>
          <FormLabel>LinkedIn Profile</FormLabel>
          <FormControl>
            <Input {...form.register('linkedinProfile')} type="url" placeholder="https://linkedin.com/company/..." />
          </FormControl>
          <FormMessage>{form.formState.errors.linkedinProfile?.message}</FormMessage>
        </FormItem>
      </FormField>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-medium">Email Addresses</h4>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => {
              const emails = form.getValues('emails');
              form.setValue('emails', [...emails, '']);
            }}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Email
          </Button>
        </div>
        <div className="space-y-3">
          {form.watch('emails').map((_, index) => (
            <div key={index} className="flex items-center space-x-2">
              <FormField>
                <FormItem className="flex-1">
                  <FormControl>
                    <Input {...form.register(`emails.${index}`)} type="email" placeholder="email@company.com" />
                  </FormControl>
                  <FormMessage>{form.formState.errors.emails?.[index]?.message}</FormMessage>
                </FormItem>
              </FormField>
              {index > 0 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    const emails = form.getValues('emails');
                    form.setValue('emails', emails.filter((_, i) => i !== index));
                  }}
                >
                  <Minus className="w-4 h-4" />
                </Button>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-medium">Phone Numbers</h4>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => {
              const phones = form.getValues('phoneNumbers');
              form.setValue('phoneNumbers', [...phones, '']);
            }}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Phone
          </Button>
        </div>
        <div className="space-y-3">
          {form.watch('phoneNumbers').map((_, index) => (
            <div key={index} className="flex items-center space-x-2">
              <FormField>
                <FormItem className="flex-1">
                  <FormControl>
                    <Input {...form.register(`phoneNumbers.${index}`)} type="tel" placeholder="+1 (555) 000-0000" />
                  </FormControl>
                  <FormMessage>{form.formState.errors.phoneNumbers?.[index]?.message}</FormMessage>
                </FormItem>
              </FormField>
              {index > 0 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    const phones = form.getValues('phoneNumbers');
                    form.setValue('phoneNumbers', phones.filter((_, i) => i !== index));
                  }}
                >
                  <Minus className="w-4 h-4" />
                </Button>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField>
          <FormItem>
            <FormLabel>Communication Periodicity (days)</FormLabel>
            <FormControl>
              <Input {...form.register('communicationPeriodicity')} type="number" min={1} />
            </FormControl>
            <FormMessage>{form.formState.errors.communicationPeriodicity?.message}</FormMessage>
          </FormItem>
        </FormField>

        <FormField>
          <FormItem>
            <FormLabel>Comments</FormLabel>
            <FormControl>
              <Input {...form.register('comments')} placeholder="Additional notes..." />
            </FormControl>
            <FormMessage>{form.formState.errors.comments?.message}</FormMessage>
          </FormItem>
        </FormField>
      </div>

      <div className="flex justify-end space-x-2 pt-4">
        <Button type="submit" className="w-full md:w-auto">
          Save Company
        </Button>
      </div>
    </form>
  );
}