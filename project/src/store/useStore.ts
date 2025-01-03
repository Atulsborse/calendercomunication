import { create } from 'zustand';
import { Company, Communication, CommunicationType } from '@/types';
import { defaultCommunicationTypes } from '@/data/communicationTypes';
import { generateCompanyData } from '@/data/companies';

interface State {
  companies: Company[];
  communicationTypes: CommunicationType[];
  communications: Communication[];
  addCompany: (company: Company) => void;
  updateCompany: (company: Company) => void;
  deleteCompany: (id: string) => void;
  addCommunicationType: (type: CommunicationType) => void;
  updateCommunicationType: (type: CommunicationType) => void;
  deleteCommunicationType: (id: string) => void;
  addCommunication: (communication: Communication) => void;
  updateCommunication: (communication: Communication) => void;
  deleteCommunication: (id: string) => void;
}

// Generate test companies with the default communication types
const testCompanies = generateCompanyData(defaultCommunicationTypes);

export const useStore = create<State>((set) => ({
  companies: testCompanies,
  communicationTypes: defaultCommunicationTypes,
  communications: testCompanies.flatMap(company => company.communications),
  
  addCompany: (company) =>
    set((state) => ({
      companies: [...state.companies, company],
    })),
    
  updateCompany: (company) =>
    set((state) => ({
      companies: state.companies.map((c) =>
        c.id === company.id ? company : c
      ),
    })),
    
  deleteCompany: (id) =>
    set((state) => ({
      companies: state.companies.filter((c) => c.id !== id),
    })),

  addCommunicationType: (type) =>
    set((state) => ({
      communicationTypes: [...state.communicationTypes, type],
    })),

  updateCommunicationType: (type) =>
    set((state) => ({
      communicationTypes: state.communicationTypes.map((t) =>
        t.id === type.id ? type : t
      ),
    })),

  deleteCommunicationType: (id) =>
    set((state) => ({
      communicationTypes: state.communicationTypes.filter((t) => t.id !== id),
    })),
    
  addCommunication: (communication) =>
    set((state) => {
      const newCommunications = [...state.communications, communication];
      const updatedCompanies = state.companies.map(company => {
        if (company.id === communication.companyId) {
          const companyComms = newCommunications.filter(comm => comm.companyId === company.id);
          const sortedComms = [...companyComms].sort((a, b) => b.date.getTime() - a.date.getTime());
          return {
            ...company,
            communications: companyComms,
            lastCommunication: sortedComms[0],
            nextCommunication: sortedComms.find(comm => comm.date > new Date()),
          };
        }
        return company;
      });

      return {
        communications: newCommunications,
        companies: updatedCompanies,
      };
    }),
    
  updateCommunication: (communication) =>
    set((state) => {
      const updatedCommunications = state.communications.map((c) =>
        c.id === communication.id ? communication : c
      );
      
      const updatedCompanies = state.companies.map(company => {
        if (company.id === communication.companyId) {
          const companyComms = updatedCommunications.filter(comm => comm.companyId === company.id);
          const sortedComms = [...companyComms].sort((a, b) => b.date.getTime() - a.date.getTime());
          return {
            ...company,
            communications: companyComms,
            lastCommunication: sortedComms[0],
            nextCommunication: sortedComms.find(comm => comm.date > new Date()),
          };
        }
        return company;
      });

      return {
        communications: updatedCommunications,
        companies: updatedCompanies,
      };
    }),
    
  deleteCommunication: (id) =>
    set((state) => {
      const updatedCommunications = state.communications.filter((c) => c.id !== id);
      
      const updatedCompanies = state.companies.map(company => {
        const companyComms = updatedCommunications.filter(comm => comm.companyId === company.id);
        const sortedComms = [...companyComms].sort((a, b) => b.date.getTime() - a.date.getTime());
        return {
          ...company,
          communications: companyComms,
          lastCommunication: sortedComms[0],
          nextCommunication: sortedComms.find(comm => comm.date > new Date()),
        };
      });

      return {
        communications: updatedCommunications,
        companies: updatedCompanies,
      };
    }),
}));