import { notFound } from 'next/navigation';
import { getTripBySlug } from '@/lib/queries';
import TripDetailClient from '@/components/sections/trips/TripDetailClient';

export default async function TripDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const trip = await getTripBySlug(slug);

  if (!trip) {
    notFound();
  }

  // Map database shape → component-friendly shape
  const mappedTrip = {
    id: trip.id,
    slug: trip.slug,
    title: trip.title,
    displayTitle: trip.display_title || trip.title,
    tagline: trip.tagline || '',
    category: trip.category_label || '',
    badge: trip.badge || '',
    region: trip.region || '',
    durationDays: trip.duration_days,
    durationNights: trip.duration_nights,
    maxAltitudeFt: trip.max_altitude_ft || 0,
    difficulty: trip.difficulty || 'Moderate',
    groupSize: trip.group_size || '8-18',
    rating: Number(trip.rating) || 4.5,
    reviewCount: trip.review_count || 0,
    heroImage: trip.hero_image || trip.cover_image || '',
    coverImage: trip.cover_image || '',
    description: trip.description || '',
    highlights: trip.highlights || [],
    itinerary: (trip.trip_itinerary || [])
      .sort((a: any, b: any) => a.day - b.day)
      .map((item: any) => ({
        day: item.day,
        title: item.title,
        distance: item.distance || undefined,
        duration: undefined,
        description: item.description || '',
        overnight: item.overnight || undefined,
        altitude: item.altitude || undefined,
        highlights: item.highlights || [],
      })),
    pricing: (trip.trip_pricing || [])
      .sort((a: any, b: any) => (a.order || 0) - (b.order || 0))
      .map((p: any) => ({
        label: p.label,
        price: p.price,
        description: p.description || undefined,
      })),
    departures: (trip.trip_departures || [])
      .sort((a: any, b: any) => new Date(a.start_date).getTime() - new Date(b.start_date).getTime())
      .map((d: any) => ({
        id: d.id,
        startDate: d.start_date,
        endDate: d.end_date,
        availableSeats: d.available_seats,
        bookedSeats: d.booked_seats,
        status: d.status,
      })),
    inclusions: trip.inclusions || [],
    exclusions: trip.exclusions || [],
    galleryImages: (Array.isArray(trip.gallery_images) ? trip.gallery_images : (trip.gallery_images || '').split(/\s+/)).filter((img: string) => img && img.trim()),
    mealsIncluded: trip.meals_included || '',
    contactPhone: trip.contact_phone || '+91-7015760563',
    contactEmail: trip.contact_email || 'explore@adventureswheel.com',
    contactInstagram: trip.contact_instagram || 'adventures_wheel_travel',
  };

  return <TripDetailClient trip={mappedTrip} />;
}