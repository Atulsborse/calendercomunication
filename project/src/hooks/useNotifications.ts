import { useStore } from '@/store/useStore';
import { useCompanyHighlight } from './useCompanyHighlight';

export function useNotifications() {
  const { companies } = useStore();
  const { getHighlight } = useCompanyHighlight();

  const overdueCount = companies.filter(
    company => getHighlight(company) === 'red'
  ).length;

  const dueTodayCount = companies.filter(
    company => getHighlight(company) === 'yellow'
  ).length;

  const totalCount = overdueCount + dueTodayCount;

  return {
    overdueCount,
    dueTodayCount,
    totalCount,
  };
}