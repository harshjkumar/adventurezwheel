import { notFound } from 'next/navigation';
import { getTripBySlug } from '@/lib/queries';
import BookTripClient from './BookTripClient';

export default async function BookingPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const trip = await getTripBySlug(slug);

  if (!trip) {
    notFound();
  }

  // Map database shape to component props
  const mappedTrip = {
    id: trip.id,
    slug: trip.slug,
    title: trip.title,
    displayTitle: trip.display_title || trip.title,
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
  };

  return <BookTripClient trip={mappedTrip} />;
}