import { getTripsByCategory, getCategoryBySlug } from '@/lib/queries';
import CategoryTripsClient from '@/components/sections/trips/CategoryTripsClient';
import { notFound } from 'next/navigation';

export default async function InternationalCategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  const category = await getCategoryBySlug(slug);
  if (!category || category.parent_type !== 'international') {
    notFound();
  }

  const trips = await getTripsByCategory(slug);
  
  const mappedTrips = trips.map((trip: any) => ({
    id: trip.id,
    slug: trip.slug,
    title: trip.title,
    badge: trip.badge || 'Featured',
    category: trip.trip_categories?.label || category.name,
    heroImage: trip.hero_image || trip.cover_image || '',
    durationDays: trip.duration_days,
    durationNights: trip.duration_nights,
    pricing: (trip.trip_pricing || []).map((p: any) => ({
      label: p.label,
      price: p.price
    }))
  }));

  return (
    <CategoryTripsClient
      initialTrips={mappedTrips}
      categoryName={category.name}
      categoryDescription={category.description || `Discover our curated ${category.name} journeys — handpicked experiences, expert-led adventures across the globe.`}
      categoryImage={category.cover_image || ''}
      parentType="international"
      tagline="Wanderlust"
    />
  );
}
