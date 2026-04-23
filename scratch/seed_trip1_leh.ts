import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function seed() {
  const slug = 'leh-to-leh-ladakh-bike-expedition';
  console.log('--- Seeding: Leh to Leh, Ladakh Bike Expedition ---');

  // Delete existing
  const { data: existing } = await supabase.from('trips').select('id').eq('slug', slug).single();
  if (existing) {
    await supabase.from('trip_pricing').delete().eq('trip_id', existing.id);
    await supabase.from('trip_itinerary').delete().eq('trip_id', existing.id);
    await supabase.from('trip_tags').delete().eq('trip_id', existing.id);
    await supabase.from('trips').delete().eq('id', existing.id);
    console.log('  Deleted old data');
  }

  const description = `Ladakh — the Land of High Passes — is where barren mountains, turquoise lakes, and endless skies create one of the most dramatic landscapes on earth. Raw, rugged, and spiritually powerful, it's a destination that every rider dreams of conquering at least once.

Your journey begins in Leh, where you acclimatize to the altitude and relax before exploring local attractions like Shanti Stupa, Hall of Fame, and the vibrant Leh Market.

The real adventure starts as you ride across Khardung La, one of the world's highest motorable passes, descending into the breathtaking Nubra Valley.

From Nubra, continue toward the mesmerizing blue waters of Pangong Lake, soaking in its unmatched serenity. The journey then pushes further to the remote village of Hanle and the mighty Umling La, one of the highest motorable roads in the world.

The expedition concludes with a final ride back to Leh — carrying unforgettable memories of high passes, endless roads, and the unmatched spirit of Ladakh.

Ride bold. Ride higher. Ride the Adventures Wheel way. 🏍️🏔️`;

  const inclusions = [
    'Fuel for the bike (Leh to Leh) included for the entire riding circuit',
    'Complete ground travel from Leh to Leh by Tempo Traveller/Cab (applicable for Tempo Traveller package)',
    '6 Nights Stay on triple/quad sharing basis — 3 nights in hotel at Leh, 1 night in Swiss camps at Nubra Valley, 1 night in camps near Pangong Tso, 1 night in homestay at Hanle',
    'Total 14 Meals Included — Day 1: Dinner, Day 2 to Day 6: Breakfast & Dinner, Day 7: Breakfast',
    'Dedicated Mechanical Backup throughout the expedition',
    'All required Inner Line Permits for the trip',
    'Driver night charges, toll taxes, parking, and vehicle expenses',
    'Experienced Adventures Wheel Team Captain throughout the journey',
    'Oxygen cylinder available 24×7 in the backup vehicle for emergency support',
    'Riding Gear Kit (for riders) — Standard helmet (size 58–60 cm), Riding gloves, Elbow guards, Knee pads (We strongly recommend carrying your personal helmet and riding gear for best comfort and fit.)',
    'Airport pick-up/drop (Leh) on fixed group slots (Private taxi is not included. Transfers will be scheduled as per combined group flight timings.)',
  ];

  const exclusions = [
    'GST (5%) is applicable extra on the package cost',
    'Any food or beverages not specifically mentioned in the inclusions, including alcoholic drinks, mineral water, lunches, and highway refreshments',
    'Personal expenses such as driver tips, monument/monastery entry fees, camera or video charges, camel safari, river rafting, laundry, telephone bills, café bills, etc.',
    'Any additional expenses arising due to natural or climatic disruptions such as landslides, roadblocks, extreme weather, or route changes — to be borne directly by the traveler on the spot',
    'Anything not explicitly mentioned under the Inclusions section',
    'Any damage to the bike (except engine damage) will be chargeable to the rider as per actuals',
  ];

  const highlights = [
    'The itinerary is subject to change due to weather conditions, road status, government regulations, or the physical well-being of participants.',
    'Our group departures are designed for the 16–42 years age bracket considering the high-altitude, power-packed nature of the expedition.',
    'Ladakh is a high-altitude cold desert. We strongly recommend consulting your personal doctor for medical advice and fitness readiness before the trip.',
    'Medical facilities in these remote regions are limited. Any expenses arising from emergencies must be borne directly by the traveler.',
    'Participants must be physically fit and in good health. Kindly disclose any pre-existing medical conditions in advance.',
    'A refundable security deposit of ₹10,000 per bike is mandatory before the trip. Any damage to the bike (except engine damage) will be chargeable to the rider as per actuals.',
    '₹3,000 extra per person applicable for double-sharing accommodation (wherever chosen).',
  ];

  const { data: trip, error } = await supabase.from('trips').insert({
    title: 'Leh to Leh, Ladakh Bike Expedition',
    slug,
    tagline: 'Signature Ride',
    display_title: 'Conquer Umling La – Ride the Highest Roads on Earth',
    description,
    category_label: 'Domestic',
    duration_days: 7,
    duration_nights: 6,
    difficulty: 'advanced',
    region: 'Ladakh',
    route: 'Leh → Khardung La → Nubra Valley → Pangong Lake → Umling La → Leh',
    start_location: 'Leh',
    end_location: 'Leh',
    total_distance: '~1000 km',
    terrain: 'High-altitude mountain passes, cold desert',
    best_for: 'Adventure riders, high-altitude enthusiasts',
    meals_included: '14 meals',
    inclusions,
    exclusions,
    highlights,
    is_active: true,
    is_featured: true,
    featured_order: 1,
  }).select().single();

  if (error) { console.error('Trip insert error:', error); return; }
  console.log('  Trip inserted:', trip.id);

  // Pricing
  const pricing = [
    { trip_id: trip.id, label: 'Tempo Traveler - Triple Sharing', price: 26990, order: 0 },
    { trip_id: trip.id, label: 'Tempo Traveler - Double Sharing', price: 28990, order: 1 },
    { trip_id: trip.id, label: 'Bike <> RE Himalayan411 (Rider) - Triple Sharing', price: 37990, order: 2 },
    { trip_id: trip.id, label: 'Bike <> RE Himalayan411 (Rider) - Double Sharing', price: 39990, order: 3 },
    { trip_id: trip.id, label: 'Bike <> RE Himalayan411 (Pillion) - Triple Sharing', price: 25990, order: 4 },
    { trip_id: trip.id, label: 'Bike <> RE Himalayan411 (Pillion) - Double Sharing', price: 27990, order: 5 },
  ];
  await supabase.from('trip_pricing').insert(pricing);
  console.log('  Pricing inserted');

  // Itinerary
  const itinerary = [
    {
      trip_id: trip.id, day: 1,
      title: 'Arrival in Leh – Leisure Day for Acclimatization',
      description: `Arrive at Leh airport after a scenic flight over the mighty Himalayas, witnessing breathtaking aerial views of snow-clad peaks.\nMeet our representative at the airport, who will assist you with a smooth transfer to your hotel.\nComplete the check-in formalities and rest for a while to allow your body to adjust to the high altitude.\nThe remaining day is at leisure. We recommend going for a short, relaxed walk around your hotel area to help with better acclimatization.\nOvernight stay in Leh. 🏔️`,
      overnight: 'Leh',
    },
    {
      trip_id: trip.id, day: 2,
      title: 'Leh Local Exploration – Sham Valley Ride',
      description: `Wake up to a fresh Himalayan morning in Leh and fuel up with breakfast for an action-packed day.\nHead out for an immersive Sham Valley exploration — where culture, history, and landscapes collide.\nStart with the iconic Shanti Stupa, soaking in sweeping panoramic views of Leh and the rugged mountains beyond.\nVisit the legendary Hall of Fame — a tribute to the heroes of the Indian Army, showcasing stories of courage from high-altitude battlefields.\nSeek blessings at Gurudwara Pathar Sahib, a spiritually significant site nestled amidst dramatic landscapes.\nExperience the gravity-defying illusion at Magnetic Hill, where the mountains seem to challenge physics.\nWitness the powerful confluence at Sangam Point, where the mighty Indus and Zanskar rivers merge.\nRide back to Leh by evening. Dinner and overnight stay in Leh.`,
      overnight: 'Leh',
      highlights: ['Shanti Stupa', 'Hall of Fame', 'Gurudwara Pathar Sahib', 'Magnetic Hill', 'Sangam Point'],
    },
    {
      trip_id: trip.id, day: 3,
      title: 'Leh → Nubra Valley via Khardung La',
      description: `Wake up in Leh and gear up after breakfast for one of the most thrilling rides of the expedition.\nBegin your ascent toward Khardung La, one of the world's highest motorable passes at 5,359 meters — a true badge of honor for every rider.\nAfter conquering the pass, descend into the spectacular Nubra Valley, also known as Ldorma — the Valley of Flowers, where mountains meet sand dunes.\nExperience the rare high-altitude desert landscape and, if you wish, opt for a Bactrian camel safari (self-paid) across the stunning dunes.\nRide onward to Diskit village and visit the iconic Diskit Monastery, home to the towering Maitreya Buddha statue overlooking the valley.\nSpend time at the mesmerizing Hunder Sand Dunes, where the cold desert scenery creates an unforgettable contrast of mountains and sand.\nOvernight stay in Nubra Valley.`,
      overnight: 'Nubra Valley',
      distance: '125 km',
      highlights: ['Khardung La Pass', 'Nubra Valley', 'Diskit Monastery', 'Hunder Sand Dunes'],
    },
    {
      trip_id: trip.id, day: 4,
      title: 'Nubra → Pangong Lake via Shyok Valley',
      description: `Wake up in Nubra Valley and gear up for another high-altitude adventure ride.\nRide through the scenic routes of Agam and Shyok villages, where raw mountain terrain and river valleys create a dramatic Himalayan backdrop.\nContinue the journey through Shyok Valley until the first glimpse of the legendary Pangong Lake welcomes you.\nLocated at an altitude of 4,300 meters, Pangong is one of the world's highest saltwater lakes, stretching over 130+ km with ever-changing shades of blue.\nSpend time by the lake soaking in the reflections of the surrounding mountains on its crystal-clear waters — a moment every rider remembers forever.\nCapture iconic photographs, including the famous 3 Idiots movie spot.\nOvernight stay near Pangong Lake.`,
      overnight: 'Pangong Lake',
      distance: '160 km',
      highlights: ['Shyok Valley', 'Pangong Lake', '3 Idiots Spot'],
    },
    {
      trip_id: trip.id, day: 5,
      title: 'Pangong → Hanle → Umling La',
      description: `Wake up early at Pangong Lake to witness a surreal sunrise over the turquoise waters — a moment worth every mile.\nAfter breakfast, gear up for the most challenging and rewarding ride of the expedition as you head toward Hanle.\nRide through Chushul and halt at the historic Rezang La War Memorial, paying tribute to the brave soldiers of the 1962 Indo–China War.\nContinue the long, high-altitude stretch with a lunch halt en route before reaching the remote and picturesque village of Hanle.\nFrom here begins the ultimate conquest — the ride to Umling La, one of the highest motorable roads in the world.\nCross Photi La (5,524 m) before ascending to Umling La at 5,640 meters — higher than Everest Base Camp.\nCapture the moment at the top, surrounded by endless barren mountains, knowing you've conquered one of the world's highest riding achievements.\nReturn to Hanle by evening for overnight stay after an epic 300 km adventure.`,
      overnight: 'Hanle',
      distance: '300 km',
      highlights: ['Rezang La War Memorial', 'Hanle', 'Photi La', 'Umling La (5,640m)'],
    },
    {
      trip_id: trip.id, day: 6,
      title: 'Hanle → Leh via Chumathang',
      description: `Wake up early in Hanle and witness the sky come alive with shades of orange and pink over the rugged Ladakh range — a peaceful yet powerful start to the day.\nAfter breakfast, gear up and begin your return ride to Leh, carrying the pride of conquering the world's highest roads.\nRide through the scenic stretches of Chumathang, Upshi, Karu, Thikshey, and Shey — where barren mountains meet river valleys and monasteries dot the horizon.\nReach Leh by evening and check in to your hotel. Freshen up after the long ride.\nHead out to explore Leh Market at your own pace — shop for souvenirs, hop between cozy cafés, and savor local Ladakhi flavors.\nOvernight stay in Leh.`,
      overnight: 'Leh',
      distance: '260 km',
      highlights: ['Chumathang', 'Upshi', 'Thikshey', 'Shey', 'Leh Market'],
    },
    {
      trip_id: trip.id, day: 7,
      title: 'Departure – Until the Next Ride',
      description: `Wake up to your final Himalayan morning in Leh, surrounded by the calm and raw beauty of Ladakh.\nEnjoy breakfast at the hotel and pack your bags for departure.\nTransfer to Leh Airport for your onward journey as your high-altitude expedition comes to an end.\nFly back home carrying unforgettable riding stories, conquered passes, new friendships, and memories that will stay with you for a lifetime.\nThe roads may end, but the adventure never does — see you on the next Adventures Wheel expedition. 🏔️🏍️`,
      overnight: null,
    },
  ];
  await supabase.from('trip_itinerary').insert(itinerary);
  console.log('  Itinerary inserted (7 days)');
  console.log('✅ Leh to Leh COMPLETE');
}

seed();
