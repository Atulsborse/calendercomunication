export type Company = {
  id: string;
  name: string;
  location: string;
  linkedinProfile: string;
  emails: string[];
  phoneNumbers: string[];
  comments: string;
  communicationPeriodicity: number; // in days
  lastCommunication?: Communication;
  nextCommunication?: Communication;
  communications: Communication[];
};

export type CommunicationType = {
  id: string;
  name: string;
  description: string;
  sequence: number;
  isMandatory: boolean;
};

export type Communication = {
  id: string;
  companyId: string;
  type: CommunicationType;
  date: Date;
  notes: string;
  completed: boolean;
};