import { getTrips } from '@/lib/queries';
import TripsClient from './TripsClient';

export default async function TripsPage() {
  const dbTrips = await getTrips();

  const mappedTrips = dbTrips.map((trip: any) => {
    const prices = trip.trip_pricing?.map((p: any) => p.price) || [0];
    const minPrice = prices.length > 0 ? Math.min(...prices) : 0;
    
    return {
      id: trip.id,
      slug: trip.slug,
      title: trip.title,
      badge: trip.badge,
      category: trip.trip_categories?.label || 'Adventure',
      durationDays: trip.duration_days,
      durationNights: trip.duration_nights,
      heroImage: trip.hero_image || trip.cover_image || '',
      minPrice: minPrice,
    };
  });

  return <TripsClient initialTrips={mappedTrips} />;
}