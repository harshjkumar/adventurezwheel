import { getTripsByParentType } from '@/lib/queries';
import InternationalTripsClient from './InternationalTripsClient';

export default async function InternationalTripsPage() {
  const trips = await getTripsByParentType('international');
  
  const internationalTrips = trips.map((trip: any) => ({
    id: trip.id,
    slug: trip.slug,
    title: trip.title,
    badge: trip.badge || 'Featured',
    category: trip.trip_categories?.label || 'International',
    region: trip.region || 'International',
    heroImage: trip.hero_image || trip.cover_image || '',
    durationDays: trip.duration_days,
    durationNights: trip.duration_nights,
    pricing: (trip.trip_pricing || []).map((p: any) => ({
      label: p.label,
      price: p.price
    }))
  }));

  return <InternationalTripsClient initialTrips={internationalTrips} />;
}
