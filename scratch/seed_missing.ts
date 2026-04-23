
import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function insertTrip(tripData: any, pricing: any[], itinerary: any[]) {
  const { data: trip, error } = await supabase.from('trips').insert(tripData).select().single();
  if (error) {
    if (error.code === '23505') {
       console.log(`Trip already exists: ${tripData.slug}`);
       return;
    }
    throw new Error(`Trip insert failed: ${error.message}`);
  }
  if (pricing.length) {
    const rows = pricing.map((p: any, i: number) => ({ trip_id: trip.id, label: p.label, price: p.price, description: p.description || null, order: i }));
    await supabase.from('trip_pricing').insert(rows);
  }
  if (itinerary.length) {
    const rows = itinerary.map((d: any) => ({ trip_id: trip.id, day: d.day, title: d.title, description: d.description, overnight: d.overnight || null, distance: d.distance || null, altitude: d.altitude || null, highlights: d.highlights || [] }));
    await supabase.from('trip_itinerary').insert(rows);
  }
  console.log(`✅ Seeded: ${trip.title} (${trip.slug})`);
}

async function seedMissing() {
  console.log('--- SEEDING MISSING TRIPS ---');

  // 1. Leh to Leh
  await insertTrip({
    title: 'Leh to Leh, Ladakh Bike Expedition',
    slug: 'leh-to-leh-ladakh-bike-expedition',
    tagline: 'Conquer Umling La – Ride the Highest Roads on Earth',
    description: `Ladakh — the Land of High Passes — is where barren mountains, turquoise lakes, and endless skies create one of the most dramatic landscapes on earth.`,
    category_label: 'Domestic', badge: 'Signature Ride', duration_days: 7, duration_nights: 6, difficulty: 'advanced',
    region: 'Leh-Ladakh', route: 'Leh → Khardung La → Nubra → Pangong → Hanle → Umling La → Leh',
    start_location: 'Leh', end_location: 'Leh', total_distance: '845 km approx', terrain: 'High-altitude mountain passes, cold desert',
    best_for: 'Bike riders, adventure seekers', season: 'June to September', group_size: '10-20', meals_included: '14 Meals (Breakfast & Dinner)',
    max_altitude_ft: 18500, is_featured: true, is_active: true, rating: 4.8, review_count: 42,
  }, [
    { label: 'Tempo Traveler – Triple Sharing', price: 25990 },
    { label: 'Tempo Traveler – Double Sharing', price: 27990 },
    { label: 'Bike RE Himalayan411 (Rider) – Triple Sharing', price: 37990 },
    { label: 'Bike RE Himalayan411 (Rider) – Double Sharing', price: 39990 },
    { label: 'Bike RE Himalayan411 (Pillion) – Triple Sharing', price: 25990 },
    { label: 'Bike RE Himalayan411 (Pillion) – Double Sharing', price: 27990 },
  ], [
    { day: 1, title: 'Arrival in Leh', description: 'Arrive in Leh and rest for acclimatization.' },
    { day: 2, title: 'Sham Valley Ride', description: 'Explore local Leh attractions.' },
    { day: 3, title: 'Khardung La & Nubra', description: 'Ride to Nubra Valley via Khardung La.' },
    { day: 4, title: 'Pangong Lake', description: 'Ride to Pangong Lake via Shyok Valley.' },
    { day: 5, title: 'Hanle & Umling La', description: 'Conquer the highest motorable road.' },
    { day: 6, title: 'Return to Leh', description: 'Ride back to Leh via Chumathang.' },
    { day: 7, title: 'Departure', description: 'End of expedition.' },
  ]);

  // 2. Meghalaya with Kaziranga
  await insertTrip({
    title: 'Meghalaya Bike Expedition with Kaziranga',
    slug: 'meghalaya-bike-expedition-with-kaziranga',
    tagline: 'Ride the Abode of Clouds',
    description: `Explore the best of Meghalaya and Kaziranga.`,
    category_label: 'Domestic', badge: 'Top Rated', duration_days: 7, duration_nights: 6, difficulty: 'moderate',
    region: 'Meghalaya', route: 'Guwahati → Kaziranga → Shillong → Shnongpdeng → Cherrapunjee → Shillong → Guwahati',
    start_location: 'Guwahati', end_location: 'Guwahati', total_distance: '835 km approx', terrain: 'Hills, waterfalls, river valleys',
    best_for: 'Bike riders, nature lovers, trekkers', season: 'October to April', group_size: '10-20', meals_included: '14 Meals',
    max_altitude_ft: 6000, is_featured: true, is_active: true, rating: 4.9, review_count: 56,
  }, [
    { label: 'Tempo Traveler – Triple Sharing', price: 21990 },
    { label: 'Tempo Traveler – Double Sharing', price: 23990 },
    { label: 'Bike RE Himalayan411 (Rider) – Triple Sharing', price: 37990 },
    { label: 'Bike RE Himalayan411 (Rider) – Double Sharing', price: 39990 },
    { label: 'Bike RE Himalayan411 (Pillion) – Triple Sharing', price: 21990 },
    { label: 'Bike RE Himalayan411 (Pillion) – Double Sharing', price: 23990 },
  ], [
    { day: 1, title: 'Arrival in Guwahati | Ride to Kaziranga', description: 'Meet and ride to Kaziranga.' },
    { day: 2, title: 'Kaziranga Safari | Ride to Shillong', description: 'Wildlife safari and hill ride.' },
    { day: 3, title: 'Shillong & Shnongpdeng', description: 'Laitlum and riverside camping.' },
    { day: 4, title: 'Dawki & Cherrapunjee', description: 'Asia\'s cleanest village and mist.' },
    { day: 5, title: 'Living Root Bridges', description: 'Double Decker bridge trek.' },
    { day: 6, title: 'Caves & Waterfalls', description: 'Explore Cherrapunjee gems.' },
    { day: 7, title: 'Return to Guwahati', description: 'Departure.' },
  ]);

  console.log('--- SEEDING COMPLETE ---');
}

seedMissing();
