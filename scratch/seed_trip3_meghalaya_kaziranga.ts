import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function seed() {
  const slug = 'meghalaya-bike-expedition-with-kaziranga';
  console.log('--- Seeding: Meghalaya Bike Expedition with Kaziranga ---');

  const { data: existing } = await supabase.from('trips').select('id').eq('slug', slug).single();
  if (existing) {
    await supabase.from('trip_pricing').delete().eq('trip_id', existing.id);
    await supabase.from('trip_itinerary').delete().eq('trip_id', existing.id);
    await supabase.from('trip_tags').delete().eq('trip_id', existing.id);
    await supabase.from('trips').delete().eq('id', existing.id);
    console.log('  Deleted old data');
  }

  const description = `If Meghalaya has been calling your name, this 7-day Adventures Wheel bike expedition is your perfect escape into the "Abode of Clouds." Think misty hills, roaring waterfalls, emerald rivers, and some of the cleanest villages in Asia — all wrapped into one unforgettable ride.

Explore the best of Meghalaya on this 7-day bike trip through hills, waterfalls, rivers, and unique villages. Designed for riders who crave adventure with comfort, this journey blends scenic highways, cultural encounters, and thrill-packed experiences — without the stress of planning. Expect premium stays, fully guided rides, trekking, water activities, and enough chill time to soak it all in.

Your journey kicks off from Guwahati, where you meet your crew, collect your machines, and roll out through Assam's lush tea gardens toward Kaziranga National Park. Gear up for an exciting jeep safari in search of the majestic one-horned rhinoceros, elephants, and vibrant birdlife before climbing into the magical hills of Meghalaya.

Ride into Shillong with stops at the breathtaking Laitlum Grand Canyon and the hidden gem Phe Phe Waterfalls. Continue to Shnongpdeng for crystal-clear riverside views and adventure water activities. Wander through the iconic clean village of Mawlynnong and cruise along misty roads to Cherrapunjee.

One of the biggest highlights awaits as you trek to the legendary Single and Double Decker Living Root Bridges — a true testament to nature and local ingenuity.

The final stretch from Cherrapunjee to Shillong treats you to the stunning Mawsmai Caves, the towering Nohkalikai Falls, and the serene Lyngksiar Waterfalls. Wrap up the expedition with a peaceful sunrise ride to Umiam Lake before the final cruise back to Guwahati — hearts full and throttle memories unlocked.

Adventures Wheel — Ride Beyond the Ordinary. 🚀`;

  const inclusions = [
    'Entire travel as per the itinerary by Tempo Traveller or Bike (as per the chosen package)',
    '6 nights accommodation on double/triple sharing basis — 1 Night in hotel at Kaziranga, 2 Nights in hotel at Shillong, 1 Night in alpine camps at Shnongpdeng, 2 Nights in hotel at Cherrapunjee',
    '6 Meals: Breakfast from Day 2 to Day 7 & Dinner on Day 3',
    'Entry fees to all sightseeing places mentioned in the itinerary',
    'Guided trek to the Living Root Bridges and other applicable points',
    'Experienced Adventures Wheel Trip Captain / Marshal throughout the trip',
    'Basic medical kit for emergency support',
    'Driver night charges, toll taxes & parking charges',
    'All required inner line permits (if applicable)',
    'Kaziranga Jeep Safari experience',
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
    'Medical facilities in certain remote areas of Meghalaya (especially Shnongpdeng and trek regions) are limited.',
    'A refundable security deposit of INR 10,000 per bike is mandatory before trip commencement.',
    'Double sharing upgrade: ₹2,000 per person (subject to availability).',
  ];

  const { data: trip, error } = await supabase.from('trips').insert({
    title: 'Meghalaya Bike Expedition with Kaziranga',
    slug,
    tagline: 'Top Rated',
    display_title: 'Ride the Abode of Clouds',
    description,
    category_label: 'Domestic',
    duration_days: 7,
    duration_nights: 6,
    difficulty: 'moderate',
    region: 'Meghalaya',
    route: 'Guwahati → Kaziranga → Shillong → Shnongpdeng → Cherrapunjee → Shillong → Guwahati',
    start_location: 'Guwahati',
    end_location: 'Guwahati',
    total_distance: '~835 km',
    terrain: 'Hills, waterfalls, rivers, forests',
    best_for: 'Nature lovers, adventure riders, trekkers',
    meals_included: '14 meals',
    inclusions, exclusions, highlights,
    is_active: true, is_featured: true, featured_order: 3,
  }).select().single();

  if (error) { console.error('Trip insert error:', error); return; }
  console.log('  Trip inserted:', trip.id);

  await supabase.from('trip_pricing').insert([
    { trip_id: trip.id, label: 'Tempo Traveler - Triple Sharing', price: 22990, order: 0 },
    { trip_id: trip.id, label: 'Tempo Traveler - Double Sharing', price: 24990, order: 1 },
    { trip_id: trip.id, label: 'Bike <> RE Himalayan411 (Rider) - Triple Sharing', price: 37990, order: 2 },
    { trip_id: trip.id, label: 'Bike <> RE Himalayan411 (Rider) - Double Sharing', price: 39990, order: 3 },
    { trip_id: trip.id, label: 'Bike <> RE Himalayan411 (Pillion) - Triple Sharing', price: 21990, order: 4 },
    { trip_id: trip.id, label: 'Bike <> RE Himalayan411 (Pillion) - Double Sharing', price: 23990, order: 5 },
  ]);
  console.log('  Pricing inserted');

  const itinerary = [
    { trip_id: trip.id, day: 1, title: 'Arrival in Guwahati | Ride to Kaziranga',
      description: `Arrive at Guwahati airport/railway station and complete your arrival formalities.\nMeet your Adventures Wheel Trip Captain and fellow riders at the designated point.\nDetailed trip briefing covering route overview, safety protocols and riding guidelines.\nSmooth bike allocation process and documentation completion.\nKickstart the expedition with your first scenic ride through Assam's lush tea estates and charming rural villages.\nEnjoy multiple comfort breaks for photos, hydration and refreshments en route.\nArrive in Kaziranga and proceed with hotel check-in and room allocation.\nEvening at leisure — unwind at the property, sip authentic Assam tea or bond with your riding crew.\nFinal ride briefing and preparation for the next day's wildlife experience.\nOvernight stay in Kaziranga.`,
      overnight: 'Kaziranga', distance: '220 km', highlights: ['Tea Estates', 'Kaziranga'] },
    { trip_id: trip.id, day: 2, title: 'Kaziranga Jeep Safari | Ride to Shillong',
      description: `Early morning wake-up for the much-awaited Kaziranga jeep safari.\nVenture into the wild landscapes of the park, home to the famous one-horned rhinoceros, elephants and diverse birdlife.\nReturn to the hotel for breakfast and freshen up.\nComplete checkout formalities and prepare for the hill ride ahead.\nBegin your scenic ride toward Shillong, the charming capital of Meghalaya.\nExperience the gradual and beautiful transition from Assam's plains to Meghalaya's misty hill roads.\nPlanned scenic and refreshment stops throughout the ride.\nReach Shillong and check in to your comfortable hotel.\nEvening free — explore Police Bazaar, visit local cafés or simply relax at the property.\nOvernight stay in Shillong.`,
      overnight: 'Shillong', distance: '270 km', highlights: ['Kaziranga Safari', 'One-Horned Rhinoceros', 'Police Bazaar'] },
    { trip_id: trip.id, day: 3, title: 'Shillong → Laitlum → Phe Phe Falls → Shnongpdeng',
      description: `Enjoy a relaxed breakfast followed by the daily ride briefing.\nRide to the breathtaking Laitlum Grand Canyon viewpoint, known for its dramatic cliffs and endless green valleys.\nSpend quality time soaking in panoramic views and capturing stunning photographs.\nContinue your journey to the hidden natural gem — Phe Phe Waterfalls.\nTake a short break to relax amidst serene forest surroundings.\nResume the ride toward the crystal-clear riverside village of Shnongpdeng.\nArrive and complete check-in at your alpine riverside camps.\nThe campsite is beautifully located on the banks of the famous Umngot River (also popularly known as the Dawki River).\nEvening at leisure — unwind by the riverside or soak in the lively traveler vibe.\nShnongpdeng is famous for its vibrant campsite culture where fellow travellers often come together to enjoy music, conversations, and high-energy riverside evenings.\nOvernight stay in Shnongpdeng (Alpine Riverside Camps).`,
      overnight: 'Shnongpdeng', distance: '95 km', highlights: ['Laitlum Grand Canyon', 'Phe Phe Waterfalls', 'Umngot River'] },
    { trip_id: trip.id, day: 4, title: 'Shnongpdeng → Mawlynnong → Cherrapunjee',
      description: `Wake up to a refreshing and peaceful riverside morning.\nBreakfast at the campsite/hotel with beautiful river views.\nEnjoy optional water activities in the Umngot River (kayaking/boating — weather dependent).\nBegin the ride to Mawlynnong — proudly known as Asia's cleanest village.\nWalk through neat bamboo pathways and experience the unique Khasi village lifestyle.\nVisit the nearby living root bridge and village viewpoints.\nContinue your scenic ride through mist-covered Meghalaya hill roads.\nReach Cherrapunjee (Sohra) and proceed with hotel check-in.\nEvening at leisure to enjoy the cool mountain weather and relax.\nOvernight stay in Cherrapunjee.`,
      overnight: 'Cherrapunjee', distance: '90 km', highlights: ['Umngot River Activities', 'Mawlynnong – Asia\'s Cleanest Village'] },
    { trip_id: trip.id, day: 5, title: 'Single & Double Decker Living Root Bridge Trek',
      description: `Early breakfast followed by a short drive to the trek starting point.\nBegin the guided trek through dense tropical forests and well-laid stone stairways.\nCross traditional hanging bridges and pass through authentic Khasi villages.\nReach the iconic Double Decker Living Root Bridge, the crown jewel of Meghalaya.\nSpend ample time exploring the area and relaxing near natural pools (weather permitting).\nBegin the return trek to the base village at a comfortable pace.\nDrive back to the hotel and enjoy well-deserved rest.\nEvening free for recovery, relaxation and group interaction.\nOvernight stay in Cherrapunjee.`,
      overnight: 'Cherrapunjee', distance: '6-7 km trek', highlights: ['Double Decker Living Root Bridge', 'Khasi Villages', 'Natural Pools'] },
    { trip_id: trip.id, day: 6, title: 'Cherrapunjee → Shillong | Waterfalls & Caves',
      description: `Breakfast and smooth checkout from the hotel.\nVisit the fascinating Mawsmai Limestone Caves, known for their impressive natural formations.\nStop at the majestic Nohkalikai Falls, India's tallest plunge waterfall.\nContinue to the serene and lesser-crowded Lyngksiar Falls viewpoint.\nBegin your scenic return ride toward Shillong.\nArrive in Shillong and complete hotel check-in.\nEvening at leisure — explore cafés or relax at the property.\nOvernight stay in Shillong.`,
      overnight: 'Shillong', distance: '60 km', highlights: ['Mawsmai Caves', 'Nohkalikai Falls', 'Lyngksiar Falls'] },
    { trip_id: trip.id, day: 7, title: 'Shillong → Guwahati via Umiam Lake | Departure',
      description: `Enjoy your final breakfast in the hills.\nBriefing for the concluding ride of the expedition.\nCheckout and begin the return journey toward Guwahati.\nScenic stop at the picturesque Umiam Lake for photos and peaceful moments.\nCapture final group pictures and farewell memories with your riding crew.\nContinue the ride back to Guwahati.\nTrip concludes with unforgettable Adventures Wheel memories.\nTour ends.`,
      overnight: null, distance: '100 km', highlights: ['Umiam Lake'] },
  ];
  await supabase.from('trip_itinerary').insert(itinerary);
  console.log('  Itinerary inserted (7 days)');
  console.log('✅ Meghalaya with Kaziranga COMPLETE');
}

seed();
