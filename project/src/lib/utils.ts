import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date | string): string {
  const dateObj = date instanceof Date ? date : new Date(date);
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(dateObj);
}

export function sortCommunications(communications: Communication[]) {
  return [...communications].sort((a, b) => b.date.getTime() - a.date.getTime());
}

export function isFutureCommunication(date: Date | string): boolean {
  const dateObj = date instanceof Date ? date : new Date(date);
  return dateObj.getTime() > new Date().getTime();
}