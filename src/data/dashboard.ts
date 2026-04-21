export const bookings = [
  {
    trip: 'Beautiful Japan',
    date: '18 May 2026',
    id: 'AW-2026-0182',
    status: 'Paid',
    amount: '$8,799',
  },
  {
    trip: 'Secrets of Peru',
    date: '03 Jun 2026',
    id: 'AW-2026-0214',
    status: 'Pending',
    amount: '$7,199',
  },
] as const;

export const dashboardLinks = [
  'Profile',
  'My Bookings',
  'Settings',
] as const;
