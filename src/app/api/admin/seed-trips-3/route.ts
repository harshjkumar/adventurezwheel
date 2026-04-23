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

    // ── TRIP 4: Ultimate Tawang 9D/8N (Version 1) ──
    const t4 = await insertTrip(supabase, {
      title: 'Ultimate Tawang Bike & Backpacking Expedition',
      slug: 'ultimate-tawang-expedition-9d8n',
      tagline: 'Ride to the Land of the Rising Sun – Version 1 (9D/8N)',
      description: `Ride through one of the most remote and breathtaking corridors of Northeast India — from the tea gardens of Assam through the misty passes of Arunachal Pradesh to the mystical Tawang Valley.\n\nThis 9-day expedition takes you through Bhalukpong, Dirang, Sela Pass, Tawang, and Bumla Pass — some of the most scenic and strategically significant routes in the Indian Himalayas.\n\nExperience the thrill of high passes, visit the 400-year-old Tawang Monastery, stand at the Indo-China border at Bumla, and immerse yourself in the rich tribal culture of the Monpa people.\n\nThis is raw, unfiltered, frontier riding — Adventures Wheel style. 🏔️🏍️`,
      category_label: 'Domestic', badge: 'Frontier Expedition',
      duration_days: 9, duration_nights: 8, difficulty: 'advanced',
      region: 'Arunachal Pradesh', route: 'Guwahati → Bhalukpong → Dirang → Tawang → Bumla → Bomdila → Guwahati',
      start_location: 'Guwahati', end_location: 'Guwahati',
      total_distance: '1200 km approx', terrain: 'Mountain passes, river valleys, frontier roads',
      best_for: 'Bike riders, adventure seekers, culture explorers', season: 'March to October',
      group_size: '10-20', meals_included: '16 Meals (Breakfast & Dinner)', max_altitude_ft: 15200,
      is_featured: true, is_active: true,
      highlights: ['Cross Sela Pass at 13,700 ft', 'Visit 400-year-old Tawang Monastery', 'Stand at Bumla Pass – Indo-China border', 'Madhuri Lake / Shonga-tser Lake', 'Dirang Valley hot springs', 'Rich Monpa tribal culture experience'],
      inclusions: ['Entire travel from Guwahati to Guwahati by Tempo Traveller / Bike as per chosen package', '8 Nights accommodation on triple/double sharing basis', '16 Meals (Breakfast & Dinner) as per itinerary', 'All Inner Line Permits for Arunachal Pradesh', 'Experienced Adventures Wheel Trip Captain / Marshal', 'Mechanical backup throughout expedition', 'Basic medical kit for emergency support', 'Driver night charges, toll taxes, parking', 'Bike provided from Guwahati to Guwahati (for rider package)', 'Fuel for the allotted bike (as per itinerary)'],
      exclusions: ['GST (5%) applicable extra', 'Any food or beverage not specifically mentioned', 'Flight/Train/Bus tickets to and from Guwahati', 'Personal expenses, shopping, tips', 'Expenses arising from natural calamities or force majeure', 'Any expense not mentioned in inclusions', 'Bike damage (except engine) to be borne by rider'],
      rating: 4.8, review_count: 29,
    }, [
      { label: 'Tempo Traveler – Triple Sharing', price: 28990 },
      { label: 'Tempo Traveler – Double Sharing', price: 31990 },
      { label: 'Bike RE Himalayan411 (Rider) – Triple Sharing', price: 42990 },
      { label: 'Bike RE Himalayan411 (Rider) – Double Sharing', price: 44990 },
      { label: 'Bike RE Himalayan411 (Pillion) – Triple Sharing', price: 27990 },
      { label: 'Bike RE Himalayan411 (Pillion) – Double Sharing', price: 29990 },
    ], [
      { day: 1, title: 'Arrival in Guwahati – Leisure & Briefing', description: 'Arrive at Guwahati airport/railway station\nMeet Adventures Wheel Trip Captain and fellow travelers\nTransfer to hotel and check in\nDetailed trip briefing: route overview, safety protocols, ILP document check\nBike allocation and test ride (for riders)\nEvening at leisure — explore Guwahati or relax at the hotel\nDinner and overnight stay in Guwahati', overnight: 'Guwahati' },
      { day: 2, title: 'Guwahati → Bhalukpong / Tipi', description: 'Breakfast at hotel and checkout\nBegin the ride toward Arunachal Pradesh\nRide through lush Assam tea gardens and enter the foothills of Arunachal\nInner Line Permit check at Bhalukpong gate\nArrive at Bhalukpong/Tipi and check in to hotel\nEvening at leisure — explore the riverside surroundings\nDinner and overnight stay in Bhalukpong', distance: '280 km', overnight: 'Bhalukpong' },
      { day: 3, title: 'Bhalukpong → Dirang Valley', description: 'Early breakfast and checkout\nBegin the scenic climb into the Eastern Himalayas\nRide through winding roads with breathtaking valley views\nStop at Dirang Dzong (monastery) en route\nArrive in Dirang Valley by afternoon\nVisit the natural hot spring at Dirang for a relaxing soak\nCheck in to hotel, dinner and overnight stay', distance: '140 km', overnight: 'Dirang' },
      { day: 4, title: 'Dirang → Tawang via Sela Pass', description: 'Early morning departure for the highlight of the expedition\nRide up to the iconic Sela Pass at 13,700 ft — one of the highest motorable passes in the Eastern Himalayas\nVisit the serene Sela Lake located near the pass\nStop at Jaswant Garh War Memorial — paying tribute to the bravery of Rifleman Jaswant Singh Rawat\nContinue the ride through dramatic landscapes toward Tawang\nArrive in Tawang by evening and check in to hotel\nDinner and overnight stay in Tawang', distance: '180 km', overnight: 'Tawang' },
      { day: 5, title: 'Tawang Local Sightseeing', description: 'Breakfast and start the day with a visit to the magnificent Tawang Monastery — the largest monastery in India and second-largest in the world after Lhasa\nExplore the monastery\'s museum, library and prayer halls\nVisit the Tawang War Memorial (Namgyal Chorten) honoring soldiers of the 1962 Indo-China war\nExplore local Tawang market — pick up traditional handicrafts, Thangka paintings and local artifacts\nVisit the beautiful Ani Gompa (nunnery) nearby\nReturn to hotel for dinner and overnight stay in Tawang', overnight: 'Tawang' },
      { day: 6, title: 'Bumla Pass – Indo-China Border & Madhuri Lake', description: 'Early morning departure toward Bumla Pass at 15,200 ft — the Indo-China border\nStand at one of the most remote and strategically significant border points in India\nProceed to the stunning Madhuri Lake (Shonga-tser Lake), named after Bollywood actress Madhuri Dixit who filmed here\nSoak in the serene beauty of the lake surrounded by snow-clad peaks\nReturn to Tawang by afternoon\nEvening free for relaxation or local exploration\nDinner and overnight stay in Tawang', distance: '70 km', overnight: 'Tawang' },
      { day: 7, title: 'Tawang → Bomdila via Sela Pass', description: 'Breakfast and checkout from Tawang\nBegin the return journey crossing Sela Pass once more\nEnjoy the dramatic landscapes from a different perspective on the return\nArrive in Bomdila by evening\nVisit the local Bomdila Monastery\nCheck in to hotel, dinner and overnight stay in Bomdila', distance: '180 km', overnight: 'Bomdila' },
      { day: 8, title: 'Bomdila → Guwahati', description: 'Early breakfast and checkout\nBegin the long return ride from the hills back to the plains of Assam\nRide through scenic Eastern Himalayan foothills\nMultiple rest stops and refreshment breaks en route\nArrive in Guwahati by evening\nCheck in to hotel\nFarewell dinner and group celebration\nOvernight stay in Guwahati', distance: '310 km', overnight: 'Guwahati' },
      { day: 9, title: 'Departure – Until the Next Ride', description: 'Breakfast at hotel\nCheckout and transfer to Guwahati airport/railway station\nFly/travel onward carrying unforgettable memories of frontier roads, high passes, and the mystical Tawang Valley\nThe expedition ends but the spirit of adventure continues\nAdventures Wheel — Ride Beyond the Ordinary. 🏔️🏍️', overnight: '' },
    ]);
    results.push(`✅ Trip 4: ${t4.title} (${t4.slug})`);

    // ── TRIP 5: Ultimate Tawang 8D/7N (Version 2) ──
    const t5 = await insertTrip(supabase, {
      title: 'Ultimate Tawang Bike & Backpacking Expedition',
      slug: 'ultimate-tawang-expedition-8d7n',
      tagline: 'Ride to the Land of the Rising Sun – Version 2 (8D/7N)',
      description: `The compact version of our flagship Tawang expedition — same raw adventure, same frontier riding, compressed into 8 action-packed days.\n\nRide through the Eastern Himalayas from Guwahati to Tawang, crossing Sela Pass, visiting the iconic Tawang Monastery, and standing at the Bumla Pass border.\n\nPerfect for riders with limited time who don't want to miss the essence of Northeast India's most dramatic expedition.\n\nThis is raw, unfiltered, frontier riding — Adventures Wheel style. 🏔️🏍️`,
      category_label: 'Domestic', badge: 'Compact Frontier',
      duration_days: 8, duration_nights: 7, difficulty: 'advanced',
      region: 'Arunachal Pradesh', route: 'Guwahati → Bhalukpong → Dirang → Tawang → Bumla → Bomdila → Guwahati',
      start_location: 'Guwahati', end_location: 'Guwahati',
      total_distance: '1200 km approx', terrain: 'Mountain passes, river valleys, frontier roads',
      best_for: 'Bike riders, adventure seekers', season: 'March to October',
      group_size: '10-20', meals_included: '14 Meals (Breakfast & Dinner)', max_altitude_ft: 15200,
      is_featured: false, is_active: true,
      highlights: ['Cross Sela Pass at 13,700 ft', 'Visit 400-year-old Tawang Monastery', 'Stand at Bumla Pass – Indo-China border', 'Madhuri Lake / Shonga-tser Lake', 'Dirang Valley hot springs', 'Rich Monpa tribal culture experience'],
      inclusions: ['Entire travel from Guwahati to Guwahati by Tempo Traveller / Bike as per chosen package', '7 Nights accommodation on triple/double sharing basis', '14 Meals (Breakfast & Dinner) as per itinerary', 'All Inner Line Permits for Arunachal Pradesh', 'Experienced Adventures Wheel Trip Captain / Marshal', 'Mechanical backup throughout expedition', 'Basic medical kit for emergency support', 'Driver night charges, toll taxes, parking', 'Bike provided from Guwahati to Guwahati (for rider package)', 'Fuel for the allotted bike (as per itinerary)'],
      exclusions: ['GST (5%) applicable extra', 'Any food or beverage not specifically mentioned', 'Flight/Train/Bus tickets to and from Guwahati', 'Personal expenses, shopping, tips', 'Expenses arising from natural calamities or force majeure', 'Any expense not mentioned in inclusions', 'Bike damage (except engine) to be borne by rider'],
      rating: 4.7, review_count: 22,
    }, [
      { label: 'Tempo Traveler – Triple Sharing', price: 26990 },
      { label: 'Tempo Traveler – Double Sharing', price: 29990 },
      { label: 'Bike RE Himalayan411 (Rider) – Triple Sharing', price: 40990 },
      { label: 'Bike RE Himalayan411 (Rider) – Double Sharing', price: 42990 },
      { label: 'Bike RE Himalayan411 (Pillion) – Triple Sharing', price: 25990 },
      { label: 'Bike RE Himalayan411 (Pillion) – Double Sharing', price: 27990 },
    ], [
      { day: 1, title: 'Arrival in Guwahati → Bhalukpong', description: 'Arrive at Guwahati airport/railway station\nMeet Adventures Wheel Trip Captain and fellow riders\nTrip briefing, bike allocation and test ride\nBegin the ride toward Arunachal Pradesh through Assam tea estates\nInner Line Permit check at Bhalukpong gate\nArrive at Bhalukpong and check in to hotel\nDinner and overnight stay in Bhalukpong', distance: '280 km', overnight: 'Bhalukpong' },
      { day: 2, title: 'Bhalukpong → Dirang Valley', description: 'Early breakfast and checkout\nBegin the scenic climb into the Eastern Himalayas\nWinding mountain roads with breathtaking valley views\nStop at Dirang Dzong monastery en route\nArrive in Dirang Valley and visit the natural hot spring\nCheck in to hotel, dinner and overnight stay in Dirang', distance: '140 km', overnight: 'Dirang' },
      { day: 3, title: 'Dirang → Tawang via Sela Pass', description: 'Early departure for the highlight ride\nCross Sela Pass at 13,700 ft with stunning views\nVisit Sela Lake and Jaswant Garh War Memorial\nContinue through dramatic landscapes toward Tawang\nArrive by evening and check in to hotel\nDinner and overnight stay in Tawang', distance: '180 km', overnight: 'Tawang' },
      { day: 4, title: 'Tawang Monastery & Local Sightseeing', description: 'Visit the magnificent Tawang Monastery — largest in India\nExplore the museum, library and prayer halls\nVisit Tawang War Memorial (Namgyal Chorten)\nExplore local market for handicrafts and Thangka paintings\nVisit Ani Gompa nunnery\nReturn to hotel for dinner and overnight stay', overnight: 'Tawang' },
      { day: 5, title: 'Bumla Pass & Madhuri Lake', description: 'Early departure toward Bumla Pass at 15,200 ft — Indo-China border\nStand at one of the most remote border points in India\nProceed to Madhuri Lake (Shonga-tser Lake)\nSoak in the serene beauty of snow-clad peaks and crystal lake\nReturn to Tawang by afternoon\nEvening free for relaxation\nDinner and overnight stay', distance: '70 km', overnight: 'Tawang' },
      { day: 6, title: 'Tawang → Bomdila via Sela Pass', description: 'Breakfast and checkout from Tawang\nReturn journey crossing Sela Pass once more\nDramatic landscapes from a different perspective\nArrive in Bomdila by evening\nVisit local Bomdila Monastery\nCheck in, dinner and overnight stay', distance: '180 km', overnight: 'Bomdila' },
      { day: 7, title: 'Bomdila → Guwahati', description: 'Early breakfast and checkout\nLong return ride from hills to the plains of Assam\nMultiple rest and refreshment stops\nArrive in Guwahati by evening\nCheck in to hotel\nFarewell dinner and group celebration\nOvernight stay in Guwahati', distance: '310 km', overnight: 'Guwahati' },
      { day: 8, title: 'Departure – Until the Next Ride', description: 'Breakfast at hotel\nCheckout and transfer to Guwahati airport/railway station\nFly/travel onward carrying unforgettable frontier memories\nAdventures Wheel — Ride Beyond the Ordinary. 🏔️🏍️', overnight: '' },
    ]);
    results.push(`✅ Trip 5: ${t5.title} (${t5.slug})`);

    return NextResponse.json({ success: true, results, message: 'Batch 3 (Trips 4 & 5 – Tawang) seeded. All 6 trips complete!' });
  } catch (err: any) {
    console.error('Seed error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
