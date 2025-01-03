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
import { Select } from '@/components/ui/select';
import { isFutureCommunication } from '@/lib/utils';

const communicationSchema = z.object({
  type: z.string().min(1, 'Communication type is required'),
  date: z.string().min(1, 'Date is required'),
  notes: z.string().min(1, 'Notes are required'),
});

type CommunicationFormData = z.infer<typeof communicationSchema>;

interface LogCommunicationDialogProps {
  companyId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function LogCommunicationDialog({
  companyId,
  open,
  onOpenChange,
}: LogCommunicationDialogProps) {
  const { communicationTypes, addCommunication } = useStore();
  const form = useForm<CommunicationFormData>({
    resolver: zodResolver(communicationSchema),
    defaultValues: {
      date: new Date().toISOString().split('T')[0],
    },
  });

  const onSubmit = (data: CommunicationFormData) => {
    const type = communicationTypes.find((t) => t.id === data.type)!;
    const communicationDate = new Date(data.date);
    
    addCommunication({
      id: crypto.randomUUID(),
      companyId,
      type,
      date: communicationDate,
      notes: data.notes,
      completed: !isFutureCommunication(communicationDate), // Set completed based on date
    });
    
    form.reset();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Log Communication</DialogTitle>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField>
            <FormItem>
              <FormLabel>Communication Type</FormLabel>
              <Select
                {...form.register('type')}
                options={communicationTypes.map((type) => ({
                  label: type.name,
                  value: type.id,
                }))}
              />
              <FormMessage>{form.formState.errors.type?.message}</FormMessage>
            </FormItem>
          </FormField>

          <FormField>
            <FormItem>
              <FormLabel>Date</FormLabel>
              <FormControl>
                <Input {...form.register('date')} type="date" />
              </FormControl>
              <FormMessage>{form.formState.errors.date?.message}</FormMessage>
            </FormItem>
          </FormField>

          <FormField>
            <FormItem>
              <FormLabel>Notes</FormLabel>
              <FormControl>
                <Input {...form.register('notes')} />
              </FormControl>
              <FormMessage>{form.formState.errors.notes?.message}</FormMessage>
            </FormItem>
          </FormField>

          <DialogFooter>
            <Button type="submit">Save Communication</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}