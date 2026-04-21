import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTripBySlug } from "@/lib/data/queries";
import { defaultTrips } from "@/lib/data/trips";
import TripDetailClient from "@/components/sections/trips/slug/TripDetailClient";

// Next.js config to revalidate data periodically or on demand
export const revalidate = 3600; // 1 hour

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const { slug } = await params;
  let trip = await getTripBySlug(slug);
  if (!trip) {
    trip = defaultTrips.find((t) => t.slug === slug);
  }
  
  if (!trip) return { title: "Trip Not Found" };

  return {
    title: `${trip.title} | K2K Adventurez`,
    description: trip.metaDescription || trip.tagline,
  };
}

export default async function TripDetailPage({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  
  // 1. Try to find local trip first (Source of Truth for full itinerary content)
  const localTrip = defaultTrips.find((t) => t.slug === slug);
  
  // 2. Fetch from DB for dynamic data (like departures) if available
  const dbTrip = await getTripBySlug(slug);
  
  // 3. Prioritize local trip for content integrity (Itinerary, highlights, etc.)
  let trip = localTrip || dbTrip;
  
  // If we have both, merge them so DB dynamic data (departures) is up to date
  if (localTrip && dbTrip) {
    trip = {
      ...dbTrip,
      ...localTrip,
      // Keep DB departures as they are live data
      departures: dbTrip.departures && dbTrip.departures.length > 0 ? dbTrip.departures : localTrip.departures
    };
  }

  if (!trip) {
    notFound();
  }

  return <TripDetailClient key={trip.slug || trip.id || slug} trip={trip} />;
}
