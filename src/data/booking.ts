export const bookingSteps = [
  'Trip details',
  'Traveler information',
  'Contact & payment',
  'Confirmation',
] as const;

export const addOns = [
  'Airport transfer',
  'Single room supplement',
  'Travel insurance',
  'Extra luggage',
] as const;

export const travelers = [
  { label: 'Traveler 1', fields: ['Full name', 'Age', 'Gender', 'ID proof'] },
  { label: 'Traveler 2', fields: ['Full name', 'Age', 'Gender', 'ID proof'] },
] as const;
