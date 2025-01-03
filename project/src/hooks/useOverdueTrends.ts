import { useStore } from '@/store/useStore';
import { useCompanyHighlight } from './useCompanyHighlight';

export function useOverdueTrends() {
  const { companies } = useStore();
  const { getHighlight } = useCompanyHighlight();

  const overdueByCompany = companies.reduce((acc, company) => {
    const isOverdue = getHighlight(company) === 'red';
    if (isOverdue) {
      acc[company.name] = {
        count: (acc[company.name]?.count || 0) + 1,
        total: companies.length,
      };
    }
    return acc;
  }, {} as Record<string, { count: number; total: number }>);

  return { overdueByCompany };
}