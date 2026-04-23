import { Suspense } from 'react';
import { getTrips, getHeroSlides } from '@/lib/queries';
import TripsClient from './TripsClient';

export default async function TripsPage() {
  const [dbTrips, heroSlides] = await Promise.all([
    getTrips(),
    getHeroSlides('trips-page')
  ]);

  const mappedTrips = dbTrips.map((trip: any) => {
    const prices = trip.trip_pricing?.map((p: any) => p.price) || [0];
    const minPrice = prices.length > 0 ? Math.min(...prices) : 0;
    
    return {
      id: trip.id,
      slug: trip.slug,
      title: trip.title,
      badge: trip.badge,
      category: trip.trip_categories?.label || 'Adventure',
      categoryLabel: trip.category_label || '',
      region: trip.region || '',
      durationDays: trip.duration_days,
      durationNights: trip.duration_nights,
      heroImage: trip.hero_image || trip.cover_image || '',
      minPrice: minPrice,
      tags: trip.trip_tags || [],
    };
  });

  return (
    <Suspense fallback={<div className="py-20 text-center text-slate-400">Loading trips...</div>}>
      <TripsClient initialTrips={mappedTrips} heroSlides={heroSlides} />
    </Suspense>
  );
}