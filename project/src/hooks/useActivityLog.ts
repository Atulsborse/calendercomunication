import { useStore } from '@/store/useStore';
import { isFutureCommunication } from '@/lib/utils';

interface Activity {
  id: string;
  companyName: string;
  type: string;
  date: Date;
  completed: boolean;
}

export function useActivityLog() {
  const { communications, companies } = useStore();

  const recentActivities: Activity[] = communications
    .map((comm) => ({
      id: comm.id,
      companyName: companies.find((c) => c.id === comm.companyId)?.name || '',
      type: comm.type.name,
      date: comm.date,
      completed: !isFutureCommunication(comm.date),
    }))
    .sort((a, b) => b.date.getTime() - a.date.getTime())
    .slice(0, 10);

  return { recentActivities };
}