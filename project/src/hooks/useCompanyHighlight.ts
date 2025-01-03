import { Company } from '@/types';

export function useCompanyHighlight() {
  const getHighlight = (company: Company): 'none' | 'yellow' | 'red' => {
    if (!company.lastCommunication) return 'red';
    
    const daysSinceLastComm = Math.floor(
      (new Date().getTime() - new Date(company.lastCommunication.date).getTime()) / 
      (1000 * 60 * 60 * 24)
    );
    
    if (daysSinceLastComm > company.communicationPeriodicity) return 'red';
    if (daysSinceLastComm === company.communicationPeriodicity) return 'yellow';
    return 'none';
  };

  return { getHighlight };
}