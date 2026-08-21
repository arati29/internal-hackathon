export interface EmergencyHotline {
  id: string;
  name: string;
  number: string;
  description: string;
  icon: string;
}

export const emergencyHotlines: EmergencyHotline[] = [
  {
    id: 'police',
    name: 'Police',
    number: '100',
    description: 'General police emergency',
    icon: 'Shield',
  },
  {
    id: 'ambulance',
    name: 'Ambulance',
    number: '108',
    description: 'Medical emergency ambulance',
    icon: 'Truck',
  },
  {
    id: 'fire',
    name: 'Fire Brigade',
    number: '101',
    description: 'Fire and rescue services',
    icon: 'Flame',
  },
  {
    id: 'women',
    name: "Women's Helpline",
    number: '1091',
    description: 'Women in distress helpline',
    icon: 'Heart',
  },
  {
    id: 'tourist',
    name: 'Tourist Helpline',
    number: '1363',
    description: 'Ministry of Tourism helpline',
    icon: 'Phone',
  },
  {
    id: 'child',
    name: 'Child Helpline',
    number: '1098',
    description: 'Child in distress helpline',
    icon: 'Baby',
  },
];

export interface EmergencyContact {
  id: string;
  name: string;
  phone: string;
  relationship: string;
}

export const defaultEmergencyContacts: EmergencyContact[] = [];
