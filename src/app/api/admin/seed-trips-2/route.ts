import { NextResponse } from 'next/server';
import { createAdminSupabase } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';
export const maxDuration = 60;

async function insertTrip(supabase: any, tripData: any, pricing: any[], itinerary: any[]) {
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
  return trip;
}

export async function POST() {
  try {
    const supabase = createAdminSupabase();
    const results: string[] = [];

    // ── TRIP 3: Meghalaya Bike Expedition with Kaziranga 7D/6N ──
    const t3 = await insertTrip(supabase, {
      title: 'Meghalaya Bike Expedition with Kaziranga',
      slug: 'meghalaya-bike-expedition-with-kaziranga',
      tagline: 'Ride the Abode of Clouds',
      description: `If Meghalaya has been calling your name, this 7-day Adventures Wheel bike expedition is your perfect escape into the "Abode of Clouds." Think misty hills, roaring waterfalls, emerald rivers, and some of the cleanest villages in Asia — all wrapped into one unforgettable ride.\n\nExplore the best of Meghalaya on this 7-day bike trip through hills, waterfalls, rivers, and unique villages. Designed for riders who crave adventure with comfort, this journey blends scenic highways, cultural encounters, and thrill-packed experiences — without the stress of planning.\n\nYour journey kicks off from Guwahati, where you meet your crew, collect your machines, and roll out through Assam's lush tea gardens toward Kaziranga National Park. Gear up for an exciting jeep safari in search of the majestic one-horned rhinoceros, elephants, and vibrant birdlife before climbing into the magical hills of Meghalaya.\n\nAdventures Wheel — Ride Beyond the Ordinary. 🚀`,
      category_label: 'Domestic', badge: 'Top Rated',
      duration_days: 7, duration_nights: 6, difficulty: 'moderate',
      region: 'Meghalaya', route: 'Guwahati → Kaziranga → Shillong → Shnongpdeng → Cherrapunjee → Shillong → Guwahati',
      start_location: 'Guwahati', end_location: 'Guwahati',
      total_distance: '835 km approx', terrain: 'Hills, waterfalls, river valleys',
      best_for: 'Bike riders, nature lovers, trekkers', season: 'October to April',
      group_size: '10-20', meals_included: '6 Meals', max_altitude_ft: 6000,
      is_featured: true, is_active: true,
      highlights: ['Kaziranga Jeep Safari – spot one-horned rhinoceros', 'Laitlum Grand Canyon viewpoint', 'Crystal-clear Umngot River at Shnongpdeng', 'Trek to Double Decker Living Root Bridge', 'Mawlynnong – Asia\'s cleanest village', 'Nohkalikai Falls & Mawsmai Cave'],
      inclusions: ['Entire travel as per the itinerary by Tempo Traveller or Bike (as per the chosen package)', '6 nights accommodation on double/triple sharing basis: 1 Night in hotel at Kaziranga, 2 Nights in hotel at Shillong, 1 Night in alpine camps at Shnongpdeng, 2 Nights in hotel at Cherrapunjee', '6 Meals: Breakfast from Day 2 to Day 7 & Dinner on Day 3', 'Entry fees to all sightseeing places mentioned in the itinerary', 'Guided trek to the Living Root Bridges and other applicable points', 'Experienced Adventures Wheel Trip Captain / Marshal throughout the trip', 'Basic medical kit for emergency support', 'Driver night charges, toll taxes & parking charges', 'All required inner line permits (if applicable)', 'Kaziranga Jeep Safari experience', 'Boating experience at Shnongpdeng', 'Bonfire evening (subject to weather conditions)', 'Bike provided from Guwahati to Guwahati (for rider package)', 'Fuel for the allotted bike (as per itinerary)', 'Mechanical assistance for the bike during the expedition'],
      exclusions: ['GST (5%) is applicable extra', 'Any food or beverage not specifically mentioned in the inclusions', 'Flight / Train / Bus tickets to and from the trip origin', 'Any expenses arising due to natural calamities, roadblocks, weather disruptions, political disturbances, or other force majeure events beyond our control', 'Any increase in cost due to sudden changes in weather conditions, road status, or operational requirements during the trip', 'Any personal expenses, shopping, tips, or additional activities not mentioned in the inclusions', 'Any expense not explicitly mentioned in the inclusions column'],
      rating: 4.9, review_count: 56,
    }, [
      { label: 'Tempo Traveler – Triple Sharing', price: 22990 },
      { label: 'Tempo Traveler – Double Sharing', price: 24990 },
      { label: 'Bike RE Himalayan411 (Rider) – Triple Sharing', price: 37990 },
      { label: 'Bike RE Himalayan411 (Rider) – Double Sharing', price: 39990 },
      { label: 'Bike RE Himalayan411 (Pillion) – Triple Sharing', price: 21990 },
      { label: 'Bike RE Himalayan411 (Pillion) – Double Sharing', price: 23990 },
    ], [
      { day: 1, title: 'Arrival in Guwahati | Ride to Kaziranga', description: 'Arrive at Guwahati airport/railway station and complete your arrival formalities\nMeet your Adventures Wheel Trip Captain and fellow riders at the designated point\nDetailed trip briefing covering route overview, safety protocols and riding guidelines\nSmooth bike allocation process and documentation completion\nKickstart the expedition with your first scenic ride through Assam\'s lush tea estates and charming rural villages\nEnjoy multiple comfort breaks for photos, hydration and refreshments en route\nArrive in Kaziranga and proceed with hotel check-in and room allocation\nEvening at leisure — unwind at the property, sip authentic Assam tea or bond with your riding crew\nFinal ride briefing and preparation for the next day\'s wildlife experience\nOvernight stay in Kaziranga', distance: '220 km', overnight: 'Kaziranga' },
      { day: 2, title: 'Kaziranga Jeep Safari | Ride to Shillong', description: 'Early morning wake-up for the much-awaited Kaziranga jeep safari\nVenture into the wild landscapes of the park, home to the famous one-horned rhinoceros, elephants and diverse birdlife\nReturn to the hotel for breakfast and freshen up\nComplete checkout formalities and prepare for the hill ride ahead\nBegin your scenic ride toward Shillong, the charming capital of Meghalaya\nExperience the gradual and beautiful transition from Assam\'s plains to Meghalaya\'s misty hill roads\nPlanned scenic and refreshment stops throughout the ride\nReach Shillong and check in to your comfortable hotel\nEvening free — explore Police Bazaar, visit local cafés or simply relax at the property\nOvernight stay in Shillong', distance: '270 km', overnight: 'Shillong' },
      { day: 3, title: 'Shillong → Laitlum → Phe Phe Falls → Shnongpdeng', description: 'Enjoy a relaxed breakfast followed by the daily ride briefing\nRide to the breathtaking Laitlum Grand Canyon viewpoint, known for its dramatic cliffs and endless green valleys\nSpend quality time soaking in panoramic views and capturing stunning photographs\nContinue your journey to the hidden natural gem — Phe Phe Waterfalls\nTake a short break to relax amidst serene forest surroundings\nResume the ride toward the crystal-clear riverside village of Shnongpdeng\nArrive and complete check-in at your alpine riverside camps\nThe campsite is beautifully located on the banks of the famous Umngot River (also popularly known as the Dawki River)\nEvening at leisure — unwind by the riverside or soak in the lively traveler vibe\nOvernight stay in Shnongpdeng (Alpine Riverside Camps)', distance: '95 km', overnight: 'Shnongpdeng' },
      { day: 4, title: 'Shnongpdeng → Mawlynnong → Cherrapunjee', description: 'Wake up to a refreshing and peaceful riverside morning\nBreakfast at the campsite/hotel with beautiful river views\nEnjoy optional water activities in the Umngot River (kayaking/boating — weather dependent)\nBegin the ride to Mawlynnong — proudly known as Asia\'s cleanest village\nWalk through neat bamboo pathways and experience the unique Khasi village lifestyle\nVisit the nearby living root bridge and village viewpoints\nContinue your scenic ride through mist-covered Meghalaya hill roads\nReach Cherrapunjee (Sohra) and proceed with hotel check-in\nEvening at leisure to enjoy the cool mountain weather and relax\nOvernight stay in Cherrapunjee', distance: '90 km', overnight: 'Cherrapunjee' },
      { day: 5, title: 'Single & Double Decker Living Root Bridge Trek', description: 'Early breakfast followed by a short drive to the trek starting point\nBegin the guided trek through dense tropical forests and well-laid stone stairways\nCross traditional hanging bridges and pass through authentic Khasi villages\nReach the iconic Double Decker Living Root Bridge, the crown jewel of Meghalaya\nSpend ample time exploring the area and relaxing near natural pools (weather permitting)\nBegin the return trek to the base village at a comfortable pace\nDrive back to the hotel and enjoy well-deserved rest\nEvening free for recovery, relaxation and group interaction\nOvernight stay in Cherrapunjee', overnight: 'Cherrapunjee' },
      { day: 6, title: 'Cherrapunjee → Shillong | Waterfalls & Caves', description: 'Breakfast and smooth checkout from the hotel\nVisit the fascinating Mawsmai Limestone Caves, known for their impressive natural formations\nStop at the majestic Nohkalikai Falls, India\'s tallest plunge waterfall\nContinue to the serene and lesser-crowded Lyngksiar Falls viewpoint\nBegin your scenic return ride toward Shillong\nArrive in Shillong and complete hotel check-in\nEvening at leisure — explore cafés or relax at the property\nOvernight stay in Shillong', distance: '60 km', overnight: 'Shillong' },
      { day: 7, title: 'Shillong → Guwahati via Umiam Lake | Departure', description: 'Enjoy your final breakfast in the hills\nBriefing for the concluding ride of the expedition\nCheckout and begin the return journey toward Guwahati\nScenic stop at the picturesque Umiam Lake for photos and peaceful moments\nCapture final group pictures and farewell memories with your riding crew\nContinue the ride back to Guwahati\nTrip concludes with unforgettable Adventures Wheel memories\nTour ends', distance: '100 km', overnight: '' },
    ]);
    results.push(`✅ Trip 3: ${t3.title} (${t3.slug})`);

    // ── TRIP 6: Meghalaya Bike Expedition (Standalone 6D/5N) ──
    const t6 = await insertTrip(supabase, {
      title: 'Meghalaya Bike Expedition',
      slug: 'meghalaya-bike-expedition-standalone',
      tagline: 'Ride the Abode of Clouds',
      description: `If Meghalaya has been calling your name, this 6-day Adventures Wheel bike expedition is your perfect escape into the "Abode of Clouds." Think misty hills, roaring waterfalls, emerald rivers, and some of the cleanest villages in Asia — all wrapped into one unforgettable ride.\n\nExplore the best of Meghalaya on this 6-day bike trip through hills, waterfalls, rivers, and unique villages. Designed for riders who crave adventure with comfort, this journey blends scenic highways, cultural encounters, and thrill-packed experiences.\n\nYour journey kicks off from Guwahati, where you meet your crew, collect your machines, and roll out toward the hills of Shillong.\n\nAdventures Wheel — Ride Beyond the Ordinary. 🚀`,
      category_label: 'Domestic', badge: 'Short Getaway',
      duration_days: 6, duration_nights: 5, difficulty: 'moderate',
      region: 'Meghalaya', route: 'Guwahati → Shillong → Shnongpdeng → Cherrapunjee → Shillong → Guwahati',
      start_location: 'Guwahati', end_location: 'Guwahati',
      total_distance: '545 km approx', terrain: 'Hills, waterfalls, river valleys',
      best_for: 'Bike riders, nature lovers, trekkers', season: 'October to April',
      group_size: '10-20', meals_included: '6 Meals', max_altitude_ft: 6000,
      is_featured: false, is_active: true,
      highlights: ['Laitlum Grand Canyon viewpoint', 'Crystal-clear Umngot River at Shnongpdeng', 'Trek to Double Decker Living Root Bridge', 'Mawlynnong – Asia\'s cleanest village', 'Nohkalikai Falls & Mawsmai Cave', 'Umiam Lake scenic stop'],
      inclusions: ['Entire travel as per the itinerary by Tempo Traveller or Bike (as per the chosen package)', '5 nights accommodation on double/triple sharing basis: 2 Nights in hotel at Shillong, 1 Night in alpine camps at Shnongpdeng, 2 Nights in hotel at Cherrapunjee', '6 Meals: Breakfast from Day 2 to Day 6 & Dinner on Day 3', 'Entry fees to all sightseeing places mentioned in the itinerary', 'Guided trek to the Living Root Bridges and other applicable points', 'Experienced Adventures Wheel Trip Captain / Marshal throughout the trip', 'Basic medical kit for emergency support', 'Driver night charges, toll taxes & parking charges', 'All required inner line permits (if applicable)', 'Boating experience at Shnongpdeng', 'Bonfire evening (subject to weather conditions)', 'Bike provided from Guwahati to Guwahati (for rider package)', 'Fuel for the allotted bike (as per itinerary)', 'Mechanical assistance for the bike during the expedition'],
      exclusions: ['GST (5%) is applicable extra', 'Any food or beverage not specifically mentioned in the inclusions', 'Flight / Train / Bus tickets to and from the trip origin', 'Any expenses arising due to natural calamities, roadblocks, weather disruptions, political disturbances, or other force majeure events beyond our control', 'Any increase in cost due to sudden changes in weather conditions, road status, or operational requirements during the trip', 'Any personal expenses, shopping, tips, or additional activities not mentioned in the inclusions', 'Any expense not explicitly mentioned in the inclusions column'],
      rating: 4.7, review_count: 32,
    }, [
      { label: 'Tempo Traveler – Triple Sharing', price: 19990 },
      { label: 'Tempo Traveler – Double Sharing', price: 22990 },
      { label: 'Bike RE Himalayan411 (Rider) – Triple Sharing', price: 35990 },
      { label: 'Bike RE Himalayan411 (Rider) – Double Sharing', price: 37990 },
      { label: 'Bike RE Himalayan411 (Pillion) – Triple Sharing', price: 19500 },
      { label: 'Bike RE Himalayan411 (Pillion) – Double Sharing', price: 21990 },
    ], [
      { day: 1, title: 'Arrival in Guwahati | Ride to Shillong', description: 'Arrive at Guwahati airport/railway station and complete your arrival formalities\nMeet your Adventures Wheel Trip Captain and fellow riders at the designated point\nDetailed trip briefing covering route overview, safety protocols and riding guidelines\nSmooth bike allocation process and documentation completion\nKickstart the expedition with a scenic ride toward Meghalaya hills\nEnjoy multiple comfort breaks for photos, hydration and refreshments en route\nReach Shillong and proceed with hotel check-in and room allocation\nEvening at leisure — explore local cafés or relax at the property\nFinal ride briefing and preparation for the upcoming days\nOvernight stay in Shillong', distance: '100 km', overnight: 'Shillong' },
      { day: 2, title: 'Shillong → Laitlum → Phe Phe Falls → Shnongpdeng', description: 'Enjoy a relaxed breakfast followed by the daily ride briefing\nRide to Laitlum Grand Canyon viewpoint for panoramic valley views\nSpend time capturing photos and soaking in the landscape\nContinue to the hidden natural gem — Phe Phe Waterfalls\nShort halt to relax amidst forest surroundings\nResume ride toward Shnongpdeng\nArrive and check in at riverside camps/hotel\nEvening at leisure by the crystal-clear river\nEnjoy vibrant campsite vibes with your travel crew\nOvernight stay in Shnongpdeng', distance: '95 km', overnight: 'Shnongpdeng' },
      { day: 3, title: 'Shnongpdeng → Mawlynnong → Cherrapunjee', description: 'Wake up to a refreshing riverside morning\nBreakfast with scenic views\nEnjoy optional water activities at Umngot River (weather dependent)\nBegin ride to Mawlynnong village\nExplore Asia\'s cleanest village and local Khasi lifestyle\nVisit nearby viewpoints and living root structures\nContinue ride through misty Meghalaya roads\nReach Cherrapunjee and check-in\nEvening at leisure to relax\nOvernight stay in Cherrapunjee', distance: '90 km', overnight: 'Cherrapunjee' },
      { day: 4, title: 'Double Decker Living Root Bridge Trek', description: 'Early breakfast followed by short drive to trek base point\nBegin guided trek through dense forests and stone pathways\nCross hanging bridges and traditional Khasi villages\nReach Double Decker Living Root Bridge\nSpend time exploring and relaxing near natural pools\nBegin return trek at a comfortable pace\nDrive back to hotel and rest\nEvening free for relaxation and group bonding\nOvernight stay in Cherrapunjee', overnight: 'Cherrapunjee' },
      { day: 5, title: 'Cherrapunjee → Shillong | Waterfalls & Caves', description: 'Breakfast and checkout from hotel\nVisit Mawsmai Limestone Cave\nStop at Nohkalikai Falls viewpoint\nExplore Lyngksiar Falls\nBegin scenic ride back to Shillong\nArrive and check in to hotel\nEvening at leisure — cafés or market exploration\nOvernight stay in Shillong', distance: '60 km', overnight: 'Shillong' },
      { day: 6, title: 'Shillong → Guwahati via Umiam Lake | Departure', description: 'Enjoy final breakfast in the hills\nRide briefing for return journey\nCheckout and begin ride toward Guwahati\nScenic stop at Umiam Lake for photos and relaxation\nCapture final group memories\nContinue ride back to Guwahati\nTrip concludes with unforgettable Adventures Wheel memories\nAdventures Wheel — Ride Beyond the Ordinary. 🏍️🌄', distance: '100 km', overnight: '' },
    ]);
    results.push(`✅ Trip 6: ${t6.title} (${t6.slug})`);

    return NextResponse.json({ success: true, results, message: 'Batch 2 (Trips 3 & 6 – Meghalaya) seeded. Call /api/admin/seed-trips-3 for Tawang trips.' });
  } catch (err: any) {
    console.error('Seed error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
