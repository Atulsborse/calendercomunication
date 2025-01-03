import { Company, Communication, CommunicationType } from '@/types';

// Generate 50 realistic company names and data
export const generateCompanyData = (communicationTypes: CommunicationType[]): Company[] => {
  const industries = ['Tech', 'Finance', 'Healthcare', 'Manufacturing', 'Retail', 'Energy', 'Education', 'Consulting'];
  const locations = ['New York', 'San Francisco', 'London', 'Tokyo', 'Berlin', 'Singapore', 'Toronto', 'Sydney'];
  const companies: Company[] = [];

  for (let i = 1; i <= 50; i++) {
    const industry = industries[Math.floor(Math.random() * industries.length)];
    const location = locations[Math.floor(Math.random() * locations.length)];
    const periodicity = [7, 14, 30, 45, 60][Math.floor(Math.random() * 5)];
    
    const company: Company = {
      id: `company-${i}`,
      name: `${industry} Solutions ${i}`,
      location: `${location}`,
      linkedinProfile: `https://linkedin.com/company/${industry.toLowerCase()}-solutions-${i}`,
      emails: [`contact@${industry.toLowerCase()}solutions${i}.com`],
      phoneNumbers: [`+1 (555) ${String(i).padStart(3, '0')}-${String(Math.floor(Math.random() * 10000)).padStart(4, '0')}`],
      comments: `Leading ${industry.toLowerCase()} solutions provider`,
      communicationPeriodicity: periodicity,
      communications: [],
    };

    // Generate past communications
    const pastComms: Communication[] = [];
    const now = new Date();
    const pastDates = [-60, -45, -30, -15, -7, -3];
    
    pastDates.forEach((days) => {
      if (Math.random() > 0.3) { // 70% chance of having each communication
        const comm: Communication = {
          id: `comm-${company.id}-${days}`,
          companyId: company.id,
          type: communicationTypes[Math.floor(Math.random() * communicationTypes.length)],
          date: new Date(now.getTime() + days * 24 * 60 * 60 * 1000),
          notes: `Regular check-in with ${company.name}`,
          completed: true,
        };
        pastComms.push(comm);
      }
    });

    // Add future communications
    const futureDates = [3, 7, 15, 30];
    futureDates.forEach((days) => {
      if (Math.random() > 0.5) { // 50% chance of having future communications
        const comm: Communication = {
          id: `comm-${company.id}-future-${days}`,
          companyId: company.id,
          type: communicationTypes[Math.floor(Math.random() * communicationTypes.length)],
          date: new Date(now.getTime() + days * 24 * 60 * 60 * 1000),
          notes: `Scheduled meeting with ${company.name}`,
          completed: false,
        };
        pastComms.push(comm);
      }
    });

    company.communications = pastComms;
    
    // Set last and next communication
    const sortedComms = [...pastComms].sort((a, b) => b.date.getTime() - a.date.getTime());
    company.lastCommunication = sortedComms.find(comm => comm.date <= now);
    company.nextCommunication = sortedComms.find(comm => comm.date > now);

    companies.push(company);
  }

  return companies;
};