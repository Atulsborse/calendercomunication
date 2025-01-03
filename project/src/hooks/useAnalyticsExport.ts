import { useStore } from '@/store/useStore';
import { formatDate, isFutureCommunication } from '@/lib/utils';

interface ExportedCommunication {
  company: string;
  type: string;
  date: string;
  notes: string;
  status: string;
}

export function useAnalyticsExport() {
  const { communications, companies } = useStore();

  const exportReport = () => {
    // Format communications for export
    const exportData: ExportedCommunication[] = communications
      .map((comm) => {
        const company = companies.find((c) => c.id === comm.companyId);
        return {
          company: company?.name || 'Unknown Company',
          type: comm.type.name,
          date: formatDate(comm.date),
          notes: comm.notes,
          status: isFutureCommunication(comm.date) ? 'Pending' : 'Completed',
        };
      })
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    // Create the full report object
    const report = {
      generatedAt: formatDate(new Date()),
      totalCommunications: communications.length,
      completedCommunications: communications.filter(
        (comm) => !isFutureCommunication(comm.date)
      ).length,
      pendingCommunications: communications.filter((comm) =>
        isFutureCommunication(comm.date)
      ).length,
      communications: exportData,
    };

    // Convert to JSON and create download
    const blob = new Blob([JSON.stringify(report, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `communication-report-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return { exportReport };
}