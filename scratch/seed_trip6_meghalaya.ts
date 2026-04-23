import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function seed() {
  const slug = 'meghalaya-bike-expedition-standalone';
  console.log('--- Seeding: Meghalaya Bike Expedition 6D/5N ---');

  const { data: existing } = await supabase.from('trips').select('id').eq('slug', slug).single();
  if (existing) {
    await supabase.from('trip_pricing').delete().eq('trip_id', existing.id);
    await supabase.from('trip_itinerary').delete().eq('trip_id', existing.id);
    await supabase.from('trip_tags').delete().eq('trip_id', existing.id);
    await supabase.from('trips').delete().eq('id', existing.id);
    console.log('  Deleted old data');
  }

  const description = `If Meghalaya has been calling your name, this 6-day Adventures Wheel bike expedition is your perfect escape into the "Abode of Clouds." Think misty hills, roaring waterfalls, emerald rivers, and some of the cleanest villages in Asia — all wrapped into one unforgettable ride.

Explore the best of Meghalaya on this 6-day bike trip through hills, waterfalls, rivers, and unique villages. Designed for riders who crave adventure with comfort, this journey blends scenic highways, cultural encounters, and thrill-packed experiences — without the stress of planning. Expect premium stays, fully guided rides, trekking, water activities, and enough chill time to soak it all in.

Your journey kicks off from Guwahati, where you meet your crew, collect your machines, and roll out through Assam's lush landscapes toward the hills of Shillong.

Ride into Shillong with stops at breathtaking viewpoints like Laitlum Grand Canyon and hidden gems like Phe Phe Waterfalls. Continue to Shnongpdeng for crystal-clear riverside views and adventure water activities. Wander through the iconic clean village of Mawlynnong and cruise along misty roads to Cherrapunjee.

One of the biggest highlights awaits as you trek to the legendary Single and Double Decker Living Root Bridges — a true testament to nature and local ingenuity.

The final stretch from Cherrapunjee to Guwahati treats you to the stunning Mawsmai Caves, the towering Nohkalikai Falls, and the serene landscapes of Meghalaya before the final cruise back — hearts full and throttle memories unlocked.

Adventures Wheel — Ride Beyond the Ordinary. 🚀`;

  const inclusions = [
    'Entire travel as per the itinerary by Tempo Traveller or Bike (as per the chosen package)',
    '5 nights accommodation on double/triple sharing basis — 2 Nights in hotel at Shillong, 1 Night in alpine camps at Shnongpdeng, 2 Nights in hotel at Cherrapunjee',
    '6 Meals: Breakfast from Day 2 to Day 6 & Dinner on Day 3',
    'Entry fees to all sightseeing places mentioned in the itinerary',
    'Guided trek to the Living Root Bridges and other applicable points',
    'Experienced Adventures Wheel Trip Captain / Marshal throughout the trip',
    'Basic medical kit for emergency support',
    'Driver night charges, toll taxes & parking charges',
    'All required inner line permits (if applicable)',
    'Boating experience at Shnongpdeng',
    'Bonfire evening (subject to weather conditions)',
    'Bike provided from Guwahati to Guwahati (for rider package)',
    'Fuel for the allotted bike (as per itinerary)',
    'Mechanical assistance for the bike during the expedition',
  ];

  const exclusions = [
    'GST (5%) is applicable extra',
    'Any food or beverage not specifically mentioned in the inclusions',
    'Flight / Train / Bus tickets to and from the trip origin',
    'Any expenses arising due to natural calamities, roadblocks, weather disruptions, political disturbances, or other force majeure events beyond our control',
    'Any increase in cost due to sudden changes in weather conditions, road status, or operational requirements during the trip',
    'Any personal expenses, shopping, tips, or additional activities not mentioned in the inclusions',
    'Any expense not explicitly mentioned in the inclusions column',
  ];

  const highlights = [
    'Travellers are advised to book trains/flights arriving in Guwahati no later than 9:00 AM on the trip start date. On the return date, please book onward flights/trains departing after 7:00 PM.',
    'The itinerary is subject to change due to weather conditions, road status, river conditions, government regulations, or the physical well-being of participants.',
    'The age limit for group departures is 16 to 42 years, considering the active and adventure-focused nature of the trip.',
    'Medical facilities in certain remote areas of Meghalaya are limited. All medical, evacuation, or related expenses shall be borne directly by the traveller.',
    'A refundable security deposit of INR 10,000 per bike is mandatory before trip commencement.',
    'Double sharing upgrade: ₹2,000 per person (subject to availability).',
  ];

  const { data: trip, error } = await supabase.from('trips').insert({
    title: 'Meghalaya Bike Expedition',
    slug,
    tagline: 'Short Getaway',
    display_title: 'Ride the Abode of Clouds',
    description,
    category_label: 'Domestic',
    duration_days: 6, duration_nights: 5,
    difficulty: 'moderate',
    region: 'Meghalaya',
    route: 'Guwahati → Shillong → Shnongpdeng → Cherrapunjee → Shillong → Guwahati',
    start_location: 'Guwahati', end_location: 'Guwahati',
    total_distance: '~545 km',
    terrain: 'Hills, waterfalls, rivers, forests',
    best_for: 'Nature lovers, adventure riders, trekkers',
    meals_included: '12 meals',
    inclusions, exclusions, highlights,
    is_active: true, is_featured: true, featured_order: 6,
  }).select().single();

  if (error) { console.error('Trip insert error:', error); return; }
  console.log('  Trip inserted:', trip.id);

  await supabase.from('trip_pricing').insert([
    { trip_id: trip.id, label: 'Tempo Traveler - Triple Sharing', price: 19990, order: 0 },
    { trip_id: trip.id, label: 'Tempo Traveler - Double Sharing', price: 22990, order: 1 },
    { trip_id: trip.id, label: 'Bike <> RE Himalayan411 (Rider) - Triple Sharing', price: 35990, order: 2 },
    { trip_id: trip.id, label: 'Bike <> RE Himalayan411 (Rider) - Double Sharing', price: 37990, order: 3 },
    { trip_id: trip.id, label: 'Bike <> RE Himalayan411 (Pillion) - Triple Sharing', price: 19500, order: 4 },
    { trip_id: trip.id, label: 'Bike <> RE Himalayan411 (Pillion) - Double Sharing', price: 21990, order: 5 },
  ]);
  console.log('  Pricing inserted');

  const itinerary = [
    { trip_id: trip.id, day: 1, title: 'Arrival in Guwahati | Ride to Shillong',
      description: `Arrive at Guwahati airport/railway station and complete your arrival formalities.\nMeet your Adventures Wheel Trip Captain and fellow riders at the designated point.\nDetailed trip briefing covering route overview, safety protocols and riding guidelines.\nSmooth bike allocation process and documentation completion.\nKickstart the expedition with a scenic ride toward Meghalaya hills.\nEnjoy multiple comfort breaks for photos, hydration and refreshments en route.\nReach Shillong and proceed with hotel check-in and room allocation.\nEvening at leisure — explore local cafés or relax at the property.\nFinal ride briefing and preparation for the upcoming days.\nOvernight stay in Shillong.`,
      overnight: 'Shillong', distance: '100 km' },
    { trip_id: trip.id, day: 2, title: 'Shillong → Laitlum → Phe Phe Falls → Shnongpdeng',
      description: `Enjoy a relaxed breakfast followed by the daily ride briefing.\nRide to Laitlum Grand Canyon viewpoint for panoramic valley views.\nSpend time capturing photos and soaking in the landscape.\nContinue to the hidden natural gem — Phe Phe Waterfalls.\nShort halt to relax amidst forest surroundings.\nResume ride toward Shnongpdeng.\nArrive and check in at riverside camps/hotel.\nEvening at leisure by the crystal-clear river.\nEnjoy vibrant campsite vibes with your travel crew.\nOvernight stay in Shnongpdeng.`,
      overnight: 'Shnongpdeng', distance: '95 km', highlights: ['Laitlum Grand Canyon', 'Phe Phe Waterfalls', 'Umngot River'] },
    { trip_id: trip.id, day: 3, title: 'Shnongpdeng → Mawlynnong → Cherrapunjee',
      description: `Wake up to a refreshing riverside morning.\nBreakfast with scenic views.\nEnjoy optional water activities at Umngot River (weather dependent).\nBegin ride to Mawlynnong village.\nExplore Asia's cleanest village and local Khasi lifestyle.\nVisit nearby viewpoints and living root structures.\nContinue ride through misty Meghalaya roads.\nReach Cherrapunjee and check-in.\nEvening at leisure to relax.\nOvernight stay in Cherrapunjee.`,
      overnight: 'Cherrapunjee', distance: '90 km', highlights: ['Umngot River Activities', 'Mawlynnong – Asia\'s Cleanest Village'] },
    { trip_id: trip.id, day: 4, title: 'Double Decker Living Root Bridge Trek',
      description: `Early breakfast followed by short drive to trek base point.\nBegin guided trek through dense forests and stone pathways.\nCross hanging bridges and traditional Khasi villages.\nReach Double Decker Living Root Bridge.\nSpend time exploring and relaxing near natural pools.\nBegin return trek at a comfortable pace.\nDrive back to hotel and rest.\nEvening free for relaxation and group bonding.\nOvernight stay in Cherrapunjee.`,
      overnight: 'Cherrapunjee', distance: '6-7 km trek', highlights: ['Double Decker Living Root Bridge', 'Khasi Villages'] },
    { trip_id: trip.id, day: 5, title: 'Cherrapunjee → Shillong | Waterfalls & Caves',
      description: `Breakfast and checkout from hotel.\nVisit Mawsmai Limestone Cave.\nStop at Nohkalikai Falls viewpoint.\nExplore Lyngksiar Falls.\nBegin scenic ride back to Shillong.\nArrive and check in to hotel.\nEvening at leisure — cafés or market exploration.\nOvernight stay in Shillong.`,
      overnight: 'Shillong', distance: '60 km', highlights: ['Mawsmai Cave', 'Nohkalikai Falls', 'Lyngksiar Falls'] },
    { trip_id: trip.id, day: 6, title: 'Shillong → Guwahati via Umiam Lake | Departure',
      description: `Enjoy final breakfast in the hills.\nRide briefing for return journey.\nCheckout and begin ride toward Guwahati.\nScenic stop at Umiam Lake for photos and relaxation.\nCapture final group memories.\nContinue ride back to Guwahati.\nTrip concludes with unforgettable Adventures Wheel memories.\nAdventures Wheel — Ride Beyond the Ordinary. 🏍️🌄`,
      overnight: null, distance: '100 km', highlights: ['Umiam Lake'] },
  ];
  await supabase.from('trip_itinerary').insert(itinerary);
  console.log('  Itinerary inserted (6 days)');
  console.log('✅ Meghalaya 6D/5N COMPLETE');
}

seed();
