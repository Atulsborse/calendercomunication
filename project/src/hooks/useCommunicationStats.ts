import { useStore } from '@/store/useStore';

export function useCommunicationStats() {
  const { communications } = useStore();

  const methodFrequencies = communications.reduce((acc, comm) => {
    const method = comm.type.name;
    if (!acc[method]) {
      acc[method] = { total: 0, max: 0 };
    }
    acc[method].total++;
    acc[method].max = Math.max(acc[method].max, acc[method].total);
    return acc;
  }, {} as Record<string, { total: number; max: number }>);

  return { methodFrequencies };
}