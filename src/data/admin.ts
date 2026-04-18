export const adminMetrics = [
  { label: 'Total bookings', value: '128', accent: 'bg-emerald-50 text-emerald-700' },
  { label: 'Revenue this month', value: '$84,200', accent: 'bg-slate-50 text-slate-700' },
  { label: 'Pending enquiries', value: '16', accent: 'bg-amber-50 text-amber-700' },
  { label: 'Active trips', value: '42', accent: 'bg-emerald-50 text-emerald-700' },
] as const;

export const activityFeed = [
  'New booking received for Beautiful Japan',
  'Peru departure dates updated',
  'Homepage hero slide refreshed',
  'Pending enquiry converted to confirmed',
] as const;

export const managementAreas = [
  {
    title: 'Trips',
    description: 'Search, edit, and maintain trip records with itinerary and pricing data.',
  },
  {
    title: 'Bookings',
    description: 'Review booking status, payment progress, and traveler details.',
  },
  {
    title: 'Content',
    description: 'Manage blog posts, gallery uploads, testimonials, and homepage sections.',
  },
] as const;
