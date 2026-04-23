import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function seed() {
  const slug = 'spiti-valley-circuit-expedition';
  console.log('--- Seeding: Spiti Valley Circuit Expedition ---');

  const { data: existing } = await supabase.from('trips').select('id').eq('slug', slug).single();
  if (existing) {
    await supabase.from('trip_pricing').delete().eq('trip_id', existing.id);
    await supabase.from('trip_itinerary').delete().eq('trip_id', existing.id);
    await supabase.from('trip_tags').delete().eq('trip_id', existing.id);
    await supabase.from('trips').delete().eq('id', existing.id);
    console.log('  Deleted old data');
  }

  const description = `Challenging terrains, legendary high passes, exhilarating views, and one hell of a machine — this is what every true biker dreams of. If endless mountain roads fuel your passion, then a Spiti Valley bike expedition is exactly the ride you've been waiting for.

Spiti Valley is a high-altitude cold desert whose raw beauty reveals itself only after you conquer some of the toughest roads in the Himalayas. Remote, rugged, and wildly rewarding — Spiti delivers a full dose of adrenaline at every twist of the throttle.

Often called the mini Ladakh, Spiti offers the thrill of high-altitude riding blended with untouched Himalayan charm. Your journey begins from Manali, gradually building the adventure curve. The ride first flows into the lush green serenity of Tirthan Valley, then pushes into the dramatic mountain terrain of Kinnaur Valley and the last Indian village of Chitkul.

As the expedition climbs higher, the landscape transforms into the stark cold desert as you ride through Nako, Tabo, and the heart of Spiti at Kaza. Feel the spiritual calm at the iconic Key Monastery and uncover prehistoric secrets in the fossil-rich village of Langza.

The adventure peaks at the surreal Chandratal Lake, before the legendary loop brings you back to Manali — completing one of the most satisfying Himalayan circuits.

This isn't just a ride. It's endurance, adrenaline, and raw Himalayan soul — delivered the Adventures Wheel way. 🏔️🏍️`;

  const inclusions = [
    'Volvo transfer from Delhi to Manali and return',
    'Bike rent for 7 days (Biking option)',
    'Fuel for the bike (Manali to Manali)',
    'Tempo Traveller/Cab travel from Aut to Manali (Tempo option)',
    '7 nights accommodation on triple sharing — 1 Night hotel in Tirthan/Jibhi, 1 Night camps/hotel in Chitkul, 1 Night hotel in Kalpa, 2 Nights hotel/homestay in Kaza, 1 Night camps at Chandratal Lake, 1 Night hotel in Manali',
    '13 meals included — Day 1: Breakfast + Dinner, Day 2: Dinner, Day 3–6: Breakfast + Dinner, Day 7: Breakfast, Day 8: Breakfast',
    'Mechanical backup throughout the trip',
    'Inner Line Permits (except Chandratal)',
    'Driver night charges, tolls, parking & vehicle expenses',
    'Adventures Wheel Team Captain throughout',
    'Oxygen cylinder in vehicle (24×7 emergency support)',
    'Riding gear for riders — Helmet, Gloves, Elbow Guards, Knee Pads (Carrying your own helmet is recommended for best comfort.)',
  ];

  const exclusions = [
    'GST (5%) applicable extra',
    'Any food or beverages not mentioned in inclusions (alcoholic drinks, mineral water, highway lunches/refreshments, etc.)',
    'Personal expenses such as driver tips, monument/monastery entry fees, camera charges, camel safari, river rafting, laundry, telephone bills, etc.',
    'Any expenses arising due to natural calamities or unforeseen situations (landslides, roadblocks, weather issues, etc.) to be borne directly by the traveler',
    'Anything not explicitly mentioned under "Inclusions"',
    'Any bike damage (except engine damage) to be borne by the client',
    'Volvo transfers not included for Self Bike option',
  ];

  const highlights = [
    'Travellers residing outside Delhi are advised to book trains/flights arriving in Delhi no later than 2:00 PM on the trip start date.',
    'The itinerary is subject to change due to weather conditions, road status, government regulations, or the physical well-being of participants.',
    'The age limit for group departures is 16 to 42 years considering the high-altitude, power-packed nature of the trip.',
    'This expedition covers high-altitude cold desert regions of India. Participants are strongly advised to consult their personal doctor before travel.',
    'Medical facilities in these remote regions are extremely limited. All medical, evacuation, or related expenses shall be borne by the traveler.',
    'A refundable security deposit of INR 10,000 per bike is mandatory before trip commencement.',
    'Double sharing upgrade: ₹2,000 per person (subject to availability).',
    'Adventures Wheel shall not be held liable for any loss, injury, illness, accident, delay, or inconvenience arising due to medical conditions, altitude sickness, weather disruptions, natural calamities, road closures, or any other unforeseen circumstances beyond our control.',
  ];

  const { data: trip, error } = await supabase.from('trips').insert({
    title: 'Spiti Valley Circuit Expedition',
    slug,
    tagline: 'Circuit Expedition',
    display_title: 'Ride the Middle Land of Extremes',
    description,
    category_label: 'Domestic',
    duration_days: 8,
    duration_nights: 7,
    difficulty: 'advanced',
    region: 'Spiti',
    route: 'Delhi → Manali → Tirthan → Chitkul → Kalpa → Kaza → Chandratal → Manali → Delhi',
    start_location: 'Delhi',
    end_location: 'Delhi',
    total_distance: '~1500 km',
    terrain: 'High-altitude cold desert, mountain passes, valleys',
    best_for: 'Adventure riders, backpackers, mountain lovers',
    meals_included: '13 meals',
    inclusions,
    exclusions,
    highlights,
    is_active: true,
    is_featured: true,
    featured_order: 2,
  }).select().single();

  if (error) { console.error('Trip insert error:', error); return; }
  console.log('  Trip inserted:', trip.id);

  const pricing = [
    { trip_id: trip.id, label: 'Tempo Traveler - Triple Sharing', price: 27990, order: 0 },
    { trip_id: trip.id, label: 'Tempo Traveler - Double Sharing', price: 29990, order: 1 },
    { trip_id: trip.id, label: 'Bike <> RE Himalayan411 (Rider) - Triple Sharing', price: 39990, order: 2 },
    { trip_id: trip.id, label: 'Bike <> RE Himalayan411 (Rider) - Double Sharing', price: 41990, order: 3 },
    { trip_id: trip.id, label: 'Bike <> RE Himalayan411 (Pillion) - Triple Sharing', price: 26990, order: 4 },
    { trip_id: trip.id, label: 'Bike <> RE Himalayan411 (Pillion) - Double Sharing', price: 28990, order: 5 },
  ];
  await supabase.from('trip_pricing').insert(pricing);
  console.log('  Pricing inserted');

  const itinerary = [
    {
      trip_id: trip.id, day: 1,
      title: 'Reach Manali → Tirthan Valley / Jibhi',
      description: `Depart from Delhi by evening and arrive at Aut the next morning, entering the serene Himalayan belt.\nBackpackers: Transfer directly to Tirthan Valley / Jibhi.\nBikers: Proceed to Manali, collect your bikes, complete briefing and test ride, then ride from Manali to Tirthan Valley/Jibhi.\nCheck in to the resort/hotel upon arrival.\nBreakfast and freshen up (bikers will have breakfast arranged in Manali before the ride).\nLocal exploration for backpackers — enjoy riverside walks, café hopping, and the laid-back mountain vibe.\nDinner and overnight stay in the peaceful surroundings of Tirthan Valley/Jibhi.`,
      overnight: 'Tirthan Valley / Jibhi',
    },
    {
      trip_id: trip.id, day: 2,
      title: 'Tirthan / Jibhi → Chitkul via Kinnaur Valley',
      description: `Early morning, begin the scenic journey toward Chitkul, the last inhabited Indian village near the Indo–Tibet (China) border.\nDrive through the magnificent landscapes of Kinnaur Valley, following the dramatic mountain roads along the banks of the Sutlej River.\nWitness the terrain gradually transform from lush valleys to rugged high-altitude scenery — a true Himalayan road experience.\nReach Chitkul by evening and check in to the camps/hotel.\nDinner and overnight stay amidst the raw beauty of the mountains.`,
      overnight: 'Chitkul',
      distance: '230 km',
      highlights: ['Kinnaur Valley', 'Sutlej River', 'Chitkul – Last Indian Village'],
    },
    {
      trip_id: trip.id, day: 3,
      title: 'Explore Chitkul → Kalpa',
      description: `Wake up early to witness one of the most beautiful Himalayan sunrises in Chitkul.\nExplore the charming local village, soak in Baspa Valley views, and enjoy the peaceful mountain vibe.\nDepart for Kalpa by noon, continuing the scenic drive through Kinnaur Valley.\nReach Kalpa by evening with stunning views of the Kinner Kailash range.\nCheck in to the hotel, followed by dinner and overnight stay.`,
      overnight: 'Kalpa',
      distance: '80 km',
      highlights: ['Chitkul Sunrise', 'Baspa Valley', 'Kinner Kailash Range'],
    },
    {
      trip_id: trip.id, day: 4,
      title: 'Kalpa → Kaza via Nako – Tabo – Ka Loops',
      description: `Wake up early in the morning and after breakfast, begin your journey deeper into Spiti Valley.\nEnter Spiti through the Sumdo border check-post, marking your arrival into the cold desert region.\nVisit the scenic villages of Nako and Tabo en route to Kaza, experiencing the region's unique Himalayan culture.\nCross the thrilling Ka Loops, one of the most exciting high-altitude road sections of Spiti.\nReach Kaza by evening and check in to the hotel/homestay.\nDinner and overnight stay in Kaza.`,
      overnight: 'Kaza',
      distance: '220 km',
      highlights: ['Nako', 'Tabo Monastery', 'Ka Loops', 'Kaza'],
    },
    {
      trip_id: trip.id, day: 5,
      title: 'Key Monastery – Chicham – Hikkim – Komic – Langza → Kaza',
      description: `After breakfast, begin your high-altitude village circuit in Spiti Valley.\nVisit the iconic Key Monastery, perched dramatically on a hilltop overlooking vast Spiti plains. A world-famous center of Buddhist learning, it offers unmatched peace and panoramic views.\nFurther drive to Chicham Bridge, the highest suspension bridge in Asia, suspended above a deep gorge.\nContinue to Komic, one of the highest inhabited villages in Asia (approx. 4,513 m), known for its extreme remoteness and raw Himalayan charm.\nVisit Hikkim Post Office, where you can send a postcard from one of the world's highest post offices.\nHead to Langza, the famous fossil village, where the landscape dates back to the ancient Tethys Sea — rich with marine fossils millions of years old.\nReturn to Kaza by evening. Dinner and overnight stay at the hotel/homestay.`,
      overnight: 'Kaza',
      distance: '80 km',
      highlights: ['Key Monastery', 'Chicham Bridge', 'Komic', 'Hikkim Post Office', 'Langza Fossil Village'],
    },
    {
      trip_id: trip.id, day: 6,
      title: 'Kaza → Chandratal Lake',
      description: `Wake up early in the morning and after breakfast, check out from the hotel in Kaza.\nDepart for the magical Chandratal Lake, one of the most breathtaking high-altitude lakes in the Himalayas.\nEn route, take a quick snack halt at Losar, the last village of Spiti Valley.\nReach Chandratal by evening. Take a short hike to visit the pristine lake and soak in its surreal beauty.\nReturn to the campsite and check in to your Swiss camps.\nEnjoy dinner and an unforgettable overnight stay under a sky filled with a million stars and the Milky Way.`,
      overnight: 'Chandratal',
      distance: '95 km',
      highlights: ['Losar', 'Chandratal Lake', 'Stargazing'],
    },
    {
      trip_id: trip.id, day: 7,
      title: 'Chandratal → Manali | Old Manali Café Crawl',
      description: `Wake up early in the morning and after breakfast, check out from the camps.\nDepart for Manali, driving through one of the most scenic Himalayan routes.\nReach Manali by evening and check in to the hotel.\nHead out for the famous Old Manali café crawl — explore the vibrant backpacker vibe, riverside cafés, and local nightlife.\nDinner at own expense (kept free so you can explore cafés of your choice).\nOvernight stay at the hotel in Manali.`,
      overnight: 'Manali',
      distance: '111 km',
      highlights: ['Old Manali', 'Café Crawl'],
    },
    {
      trip_id: trip.id, day: 8,
      title: 'Manali Leisure → Overnight to Delhi',
      description: `Wake up in the morning and enjoy your final breakfast in Manali. Check out as per hotel timing and keep your luggage at the reception.\nFree time for self-exploration — soak in the last moments of the mountains at your own pace.\nSuggested places to visit: Hadimba Devi Temple, Old Manali Street, and Mall Road.\nDepart for Delhi by evening with bags full of memories.\nReach Delhi the next morning, marking the end of your epic Himalayan journey.\nMountains fade. Memories stay. Adventures Wheel forever. 🏔️🚙`,
      overnight: null,
      distance: '510 km',
      highlights: ['Hadimba Devi Temple', 'Mall Road'],
    },
  ];
  await supabase.from('trip_itinerary').insert(itinerary);
  console.log('  Itinerary inserted (8 days)');
  console.log('✅ Spiti Valley COMPLETE');
}

seed();
