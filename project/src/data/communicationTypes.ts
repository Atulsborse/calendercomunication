import { CommunicationType } from '@/types';

export const defaultCommunicationTypes: CommunicationType[] = [
  {
    id: '1',
    name: 'LinkedIn Post',
    description: 'Post on company LinkedIn page',
    sequence: 1,
    isMandatory: true,
  },
  {
    id: '2',
    name: 'LinkedIn Message',
    description: 'Direct message on LinkedIn',
    sequence: 2,
    isMandatory: true,
  },
  {
    id: '3',
    name: 'Email',
    description: 'Email communication',
    sequence: 3,
    isMandatory: true,
  },
  {
    id: '4',
    name: 'Phone Call',
    description: 'Phone call communication',
    sequence: 4,
    isMandatory: true,
  },
  {
    id: '5',
    name: 'Other',
    description: 'Other forms of communication',
    sequence: 5,
    isMandatory: false,
  },
];