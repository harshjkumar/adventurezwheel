
import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function insertTrip(tripData: any, pricing: any[], itinerary: any[]) {
  // First check if exists
  const { data: existing } = await supabase.from('trips').select('id').eq('slug', tripData.slug).single();
  
  if (existing) {
    console.log(`Trip exists, skipping: ${tripData.slug}`);
    return;
  }

  const { data: trip, error } = await supabase.from('trips').insert(tripData).select().single();
  if (error) throw new Error(`Trip insert failed: ${error.message}`);

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

async function seedAll() {
  console.log('--- SEEDING ALL 9 TRIPS ---');

  // 1. Tawang 9D/8N
  await insertTrip({
    title: 'Ultimate Tawang Bike & Backpacking Expedition',
    slug: 'ultimate-tawang-expedition-9d8n',
    tagline: 'Frontier Expedition',
    duration_days: 9, duration_nights: 8, difficulty: 'advanced', region: 'Tawang',
    is_active: true, is_featured: true, category_label: 'Domestic',
  }, [
    { label: 'Tempo Traveler', price: 27990 },
  ], [
    { day: 1, title: 'Arrival', description: 'Arrive in Guwahati' },
  ]);

  // 2. Tawang 8D/7N
  await insertTrip({
    title: 'Ultimate Tawang Bike & Backpacking Expedition',
    slug: 'ultimate-tawang-expedition-8d7n',
    tagline: 'Compact Frontier',
    duration_days: 8, duration_nights: 7, difficulty: 'advanced', region: 'Tawang',
    is_active: true, category_label: 'Domestic',
  }, [
    { label: 'Tempo Traveler', price: 25990 },
  ], [
    { day: 1, title: 'Arrival', description: 'Arrive in Guwahati' },
  ]);

  // 3. Meghalaya Standalone 6D/5N
  await insertTrip({
    title: 'Meghalaya Bike Expedition',
    slug: 'meghalaya-bike-expedition-standalone',
    tagline: 'Short Getaway',
    duration_days: 6, duration_nights: 5, difficulty: 'moderate', region: 'Meghalaya',
    is_active: true, category_label: 'Domestic',
  }, [
    { label: 'Tempo Traveler', price: 19500 },
  ], [
    { day: 1, title: 'Arrival', description: 'Arrive in Guwahati' },
  ]);

  // 4. Meghalaya with Kaziranga 7D/6N
  await insertTrip({
    title: 'Meghalaya Bike Expedition with Kaziranga',
    slug: 'meghalaya-bike-expedition-with-kaziranga',
    tagline: 'Top Rated',
    duration_days: 7, duration_nights: 6, difficulty: 'moderate', region: 'Meghalaya',
    is_active: true, category_label: 'Domestic',
  }, [
    { label: 'Tempo Traveler', price: 21990 },
  ], [
    { day: 1, title: 'Arrival', description: 'Arrive in Guwahati' },
  ]);

  // 5. Spiti Valley Circuit Expedition 8D/7N
  await insertTrip({
    title: 'Spiti Valley Circuit Expedition',
    slug: 'spiti-valley-circuit-expedition',
    tagline: 'Circuit Expedition',
    duration_days: 8, duration_nights: 7, difficulty: 'advanced', region: 'Spiti',
    is_active: true, category_label: 'Domestic',
  }, [
    { label: 'Tempo Traveler', price: 26990 },
  ], [
    { day: 1, title: 'Arrival', description: 'Arrive in Manali' },
  ]);

  // 6. Leh to Leh 7D/6N
  await insertTrip({
    title: 'Leh to Leh, Ladakh Bike Expedition',
    slug: 'leh-to-leh-ladakh-bike-expedition',
    tagline: 'Signature Ride',
    duration_days: 7, duration_nights: 6, difficulty: 'advanced', region: 'Leh',
    is_active: true, category_label: 'Domestic',
  }, [
    { label: 'Tempo Traveler', price: 25990 },
  ], [
    { day: 1, title: 'Arrival', description: 'Arrive in Leh' },
  ]);

  // International
  const intl = [
    { title: 'Vietnam Journey', slug: 'vietnam-journey' },
    { title: 'Thailand Adventure', slug: 'thailand-adventure' },
    { title: 'Bali Explorer', slug: 'bali-explorer' },
  ];

  for (const t of intl) {
    await insertTrip({
      title: t.title, slug: t.slug, is_active: true, category_label: 'International',
    }, [], []);
  }

  console.log('--- ALL SEEDED ---');
}

seedAll();
