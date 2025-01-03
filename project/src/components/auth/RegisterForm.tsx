import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useAuthStore } from '@/store/useAuthStore';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type RegisterFormData = z.infer<typeof registerSchema>;

export function RegisterForm() {
  const login = useAuthStore((state) => state.login);
  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (data: RegisterFormData) => {
    // Simulate registration - Replace with actual registration logic
    login({
      id: crypto.randomUUID(),
      email: data.email,
      name: data.name,
      role: 'user', // New registrations are always users
    });
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <FormField>
        <FormItem>
          <FormLabel>Name</FormLabel>
          <FormControl>
            <Input {...form.register('name')} />
          </FormControl>
          <FormMessage>{form.formState.errors.name?.message}</FormMessage>
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
          <FormLabel>Password</FormLabel>
          <FormControl>
            <Input {...form.register('password')} type="password" />
          </FormControl>
          <FormMessage>{form.formState.errors.password?.message}</FormMessage>
        </FormItem>
      </FormField>

      <FormField>
        <FormItem>
          <FormLabel>Confirm Password</FormLabel>
          <FormControl>
            <Input {...form.register('confirmPassword')} type="password" />
          </FormControl>
          <FormMessage>{form.formState.errors.confirmPassword?.message}</FormMessage>
        </FormItem>
      </FormField>

      <Button type="submit" className="w-full">
        Register
      </Button>
    </form>
  );
}