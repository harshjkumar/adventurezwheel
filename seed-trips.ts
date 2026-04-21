import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { allTrips } from './src/data/trips';

dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);

async function seedTrips() {
  console.log('Starting seed...');
  for (const trip of allTrips) {
    console.log(`Seeding trip: ${trip.slug}`);
    
    // Insert trip
    const { data: tripData, error: tripError } = await supabase
      .from('trips')
      .upsert({
        title: trip.title,
        display_title: trip.displayTitle,
        slug: trip.slug,
        tagline: trip.tagline,
        description: trip.description,
        category_label: trip.category,
        badge: trip.badge,
        duration_days: trip.durationDays,
        duration_nights: trip.durationNights,
        max_altitude_ft: trip.maxAltitudeFt,
        difficulty: trip.difficulty,
        group_size: trip.groupSize,
        region: trip.region,
        rating: trip.rating,
        review_count: trip.reviewCount,
        highlights: trip.highlights,
        inclusions: trip.inclusions,
        exclusions: trip.exclusions,
        cover_image: trip.coverImage,
        hero_image: trip.heroImage,
        gallery_images: trip.galleryImages,
        meals_included: trip.mealsIncluded,
        contact_phone: trip.contactPhone,
        contact_email: trip.contactEmail,
        contact_instagram: trip.contactInstagram,
        is_active: true
      }, { onConflict: 'slug' })
      .select()
      .single();

    if (tripError) {
      console.error(`Error inserting trip ${trip.slug}:`, tripError);
      continue;
    }
    
    const tripId = tripData.id;

    // Delete existing pricing, itinerary, departures for clean upsert
    await supabase.from('trip_pricing').delete().eq('trip_id', tripId);
    await supabase.from('trip_itinerary').delete().eq('trip_id', tripId);
    await supabase.from('trip_departures').delete().eq('trip_id', tripId);

    // Insert Pricing
    if (trip.pricing && trip.pricing.length > 0) {
      const pricingData = trip.pricing.map((p, index) => ({
        trip_id: tripId,
        label: p.label,
        price: p.price,
        description: p.description,
        order: index
      }));
      await supabase.from('trip_pricing').insert(pricingData);
    }

    // Insert Itinerary
    if (trip.itinerary && trip.itinerary.length > 0) {
      const itineraryData = trip.itinerary.map((i) => ({
        trip_id: tripId,
        day: i.day,
        title: i.title,
        description: i.description,
        overnight: i.overnight,
        distance: i.distance,
        altitude: i.altitude,
        highlights: i.highlights
      }));
      await supabase.from('trip_itinerary').insert(itineraryData);
    }

    // Insert Dummy Departures
    const departuresData = [
      {
        trip_id: tripId,
        start_date: new Date(new Date().setMonth(new Date().getMonth() + 1)).toISOString().split('T')[0],
        end_date: new Date(new Date().setMonth(new Date().getMonth() + 1, new Date().getDate() + trip.durationDays)).toISOString().split('T')[0],
        available_seats: 20,
        booked_seats: 5,
        status: 'available'
      },
      {
        trip_id: tripId,
        start_date: new Date(new Date().setMonth(new Date().getMonth() + 2)).toISOString().split('T')[0],
        end_date: new Date(new Date().setMonth(new Date().getMonth() + 2, new Date().getDate() + trip.durationDays)).toISOString().split('T')[0],
        available_seats: 20,
        booked_seats: 0,
        status: 'available'
      }
    ];
    await supabase.from('trip_departures').insert(departuresData);
  }
  
  console.log('Seed completed!');
}

seedTrips().catch(console.error);
