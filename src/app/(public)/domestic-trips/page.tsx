import { getTrips } from '@/lib/queries';
import DomesticTripsClient from './DomesticTripsClient';

export default async function DomesticTripsPage() {
  const trips = await getTrips();
  
  // Filter for domestic trips and map to component shape
  const domesticTrips = trips
    .filter((trip: any) => trip.trip_categories?.label !== 'International')
    .map((trip: any) => ({
      id: trip.id,
      slug: trip.slug,
      title: trip.title,
      badge: trip.badge || 'Featured',
      category: trip.trip_categories?.label || 'Domestic',
      region: trip.region || 'India',
      heroImage: trip.hero_image || trip.cover_image || '',
      durationDays: trip.duration_days,
      durationNights: trip.duration_nights,
      pricing: (trip.trip_pricing || []).map((p: any) => ({
        label: p.label,
        price: p.price
      }))
    }));

  return <DomesticTripsClient initialTrips={domesticTrips} />;
}
