import { getTrips } from '@/lib/queries';
import DestinationDetailClient from './DestinationDetailClient';
import { destinationCards } from '@/data/home';
import { notFound } from 'next/navigation';

export default async function DestinationDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  const destMetadata = destinationCards.find((d) => d.slug === slug);
  if (!destMetadata) {
    notFound();
  }

  const trips = await getTrips();
  
  // Filter for trips in this destination
  // We check if trip region or title or category matches the slug
  const destinationTrips = trips
    .filter((trip: any) => {
      const regionMatch = trip.region?.toLowerCase().includes(slug.replace(/-/g, ' '));
      const categoryMatch = trip.trip_categories?.slug === slug;
      const titleMatch = trip.title?.toLowerCase().includes(slug.replace(/-/g, ' '));
      return regionMatch || categoryMatch || titleMatch;
    })
    .map((trip: any) => ({
      id: trip.id,
      slug: trip.slug,
      title: trip.title,
      badge: trip.badge || 'Top Rated',
      durationDays: trip.duration_days,
      durationNights: trip.duration_nights,
      heroImage: trip.hero_image || trip.cover_image || '',
      pricing: (trip.trip_pricing || []).map((p: any) => ({
        label: p.label,
        price: p.price
      }))
    }));

  return (
    <DestinationDetailClient 
      slug={slug} 
      destMetadata={destMetadata} 
      initialTrips={destinationTrips} 
    />
  );
}