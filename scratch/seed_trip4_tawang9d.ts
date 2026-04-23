import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function seed() {
  const slug = 'ultimate-tawang-expedition-9d8n';
  console.log('--- Seeding: Ultimate Tawang 9D/8N ---');

  const { data: existing } = await supabase.from('trips').select('id').eq('slug', slug).single();
  if (existing) {
    await supabase.from('trip_pricing').delete().eq('trip_id', existing.id);
    await supabase.from('trip_itinerary').delete().eq('trip_id', existing.id);
    await supabase.from('trip_tags').delete().eq('trip_id', existing.id);
    await supabase.from('trips').delete().eq('id', existing.id);
    console.log('  Deleted old data');
  }

  const description = `Perched high in the Eastern Himalayas, Tawang is where dramatic mountain landscapes meet deep-rooted Buddhist culture and raw frontier adventure. This remote Himalayan town in Arunachal Pradesh is known for its snow-clad passes, pristine high-altitude lakes, colorful monasteries, and the iconic Indo-China border routes that make every journey here truly unforgettable.

Our expedition begins from the vibrant plains of Guwahati and gradually climbs into the untouched wilderness of the Northeast. As the journey unfolds, you'll pass through the serene forests of Nameri, the picturesque valley of Dirang, and the legendary Sela Pass before entering the mystical land of Tawang. Each stretch of the route brings changing terrains, winding mountain roads, and views that keep the thrill alive at every turn.

In Tawang, experience the spiritual calm of the majestic monastery, the stark beauty of Bum La Pass, and the surreal charm of Madhuri Lake. The journey further blends adventure with wildlife as you descend towards the grasslands of Kaziranga, home to the famous one-horned rhinoceros.

From high-altitude rides and cultural immersion to wildlife encounters and offbeat Himalayan landscapes — this expedition is crafted for true explorers seeking India's wild and unexplored northeast.

Twisting mountain roads, high passes, monasteries in the clouds, and the wild heart of Assam — this isn't just a trip, it's one hell of a ride with Adventures Wheel. 🚀`;

  const inclusions = [
    'Tempo Traveller for local sightseeing',
    'Premium Bike Rental with Fuel (Day 1 Guwahati Hotel to Day 8 Guwahati Hotel)',
    'Airport Pickup (Fixed Time Slot)',
    'Riding Gears – Helmet, Knee Guards & Elbow Guards',
    'BS6 Royal Enfield Himalayan (We recommend riders carry their own helmets for better comfort and hygiene)',
    '8 Nights Hotel Accommodation (Double Sharing Basis and triple sharing basis as opted)',
    'Meal Plan – MAP Basis (Dinner & Breakfast)',
    'Dedicated Trip Captain Throughout the Expedition',
    'River Rafting Experience (Day 2)',
    'Professional Bike Marshal',
    'Group Jungle Safari in Kaziranga',
    'Medical & Mechanical Backup Team',
    'Backup Support Vehicle',
    'Driver Allowances & Parking Charges',
    'Inner Line Permits',
    'First Aid Kit',
    'Oxygen Cylinders',
    'Oximeter Support',
  ];

  const exclusions = [
    '5% GST',
    'Early Check-In (Before 1:00 PM) & Late Check-Out (After 11:00 AM) at hotels',
    'Personal expenses such as shopping, snacks, beverages, laundry, etc.',
    'Additional accommodation or meal costs due to delayed arrivals, travel disruptions, or personal reasons',
    'Cost of spare parts used in case of accidental damage while the motorcycle is under the rider\'s possession',
    'Recovery / Towing charges if the motorcycle is dropped or damaged during the expedition',
    'Lunch and any meals not specifically mentioned under "Inclusions"',
    'Airfare / Rail fare and any transportation other than what is mentioned in the package inclusions',
    'Expenses arising due to flight cancellations, landslides, roadblocks, natural calamities, political disturbances, or any unforeseen circumstances beyond our control',
    'Refundable Security Deposit – ₹10,000 per Motorcycle (fully refundable if no damages, processed within 5 working days)',
    'Any services not explicitly mentioned in the "Trip Inclusions" section',
  ];

  const highlights = [
    'We request all participants to follow the planned itinerary and schedule. In case of late arrival, early departure, or unused services, refunds will not be applicable.',
    'The itinerary may be adjusted due to weather conditions, road situations, government regulations, or safety considerations.',
    'Since we will be traveling through remote and high-altitude regions, medical situations may occasionally arise. Any medical expenses, hospitalization, evacuation, or related costs will need to be borne directly by the participant.',
    'Riders are expected to handle the motorcycle responsibly throughout the journey. Any damage caused due to accident or negligence may be chargeable as per actuals.',
    'Accommodation in remote Himalayan areas may be simple but clean and comfortable.',
    'Safety is our top priority. All riders must follow instructions given by the Trip Captain and Bike Marshal for a smooth and safe expedition.',
    'Let\'s travel responsibly — respect local communities, culture, and nature, and leave no trace behind.',
  ];

  const { data: trip, error } = await supabase.from('trips').insert({
    title: 'Ultimate Tawang Bike & Backpacking Expedition',
    slug,
    tagline: 'Frontier Expedition',
    display_title: 'Conquer the Eastern Himalayas',
    description,
    category_label: 'Domestic',
    duration_days: 9, duration_nights: 8,
    difficulty: 'advanced',
    region: 'Tawang',
    route: 'Guwahati → Nameri → Dirang → Tawang → Bomdila → Kaziranga → Guwahati',
    start_location: 'Guwahati', end_location: 'Guwahati',
    total_distance: '~1300 km',
    terrain: 'Eastern Himalayas, high passes, forests, grasslands',
    best_for: 'Adventure seekers, culture enthusiasts, wildlife lovers',
    meals_included: '18 meals',
    inclusions, exclusions, highlights,
    is_active: true, is_featured: true, featured_order: 4,
  }).select().single();

  if (error) { console.error('Trip insert error:', error); return; }
  console.log('  Trip inserted:', trip.id);

  await supabase.from('trip_pricing').insert([
    { trip_id: trip.id, label: 'Tempo Traveler - Triple Sharing', price: 33990, order: 0 },
    { trip_id: trip.id, label: 'Tempo Traveler - Double Sharing', price: 35990, order: 1 },
    { trip_id: trip.id, label: 'Bike <> RE Himalayan411 (Rider) - Triple Sharing', price: 48990, order: 2 },
    { trip_id: trip.id, label: 'Bike <> RE Himalayan411 (Rider) - Double Sharing', price: 50990, order: 3 },
    { trip_id: trip.id, label: 'Bike <> RE Himalayan411 (Pillion) - Triple Sharing', price: 32990, order: 4 },
    { trip_id: trip.id, label: 'Bike <> RE Himalayan411 (Pillion) - Double Sharing', price: 34990, order: 5 },
  ]);
  console.log('  Pricing inserted');

  const itinerary = [
    { trip_id: trip.id, day: 1, title: 'Arrival in Guwahati | Drive to Nameri',
      description: `Arrive at Guwahati airport/railway station and complete your arrival formalities.\nMeet your Adventures Wheel Trip Captain and fellow travellers at the designated point.\nDetailed trip briefing covering route overview, safety protocols and travel guidelines.\nSmooth vehicle allocation and documentation completion.\nKickstart the expedition with a scenic drive through Assam's lush landscapes and rural countryside.\nEnjoy multiple comfort breaks for photos, hydration and refreshments en route.\nArrive near Nameri National Park and proceed with hotel check-in and room allocation.\nEvening at leisure — unwind amidst forest vibes or bond with your travel crew.\nFinal briefing and preparation for the upcoming adventure days.\nOvernight stay in Nameri.`,
      overnight: 'Nameri', distance: '220 km' },
    { trip_id: trip.id, day: 2, title: 'River Rafting Experience | Drive to Dirang',
      description: `Wake up to the fresh forest air of Nameri.\nHead out for an exciting river rafting experience (subject to weather/water level).\nReturn to the property for breakfast and check-out formalities.\nBegin the scenic ascent towards Arunachal Pradesh.\nComplete Inner Line Permit formalities en route (if applicable).\nWitness the landscape transition from plains to Eastern Himalayan foothills.\nTake scenic photo and refreshment breaks along the mountain roads.\nArrive in Dirang and proceed with hotel check-in.\nEvening at leisure to explore the peaceful valley vibes.\nOvernight stay in Dirang.`,
      overnight: 'Dirang', distance: '160 km', highlights: ['River Rafting', 'Arunachal Pradesh Entry'] },
    { trip_id: trip.id, day: 3, title: 'Dirang to Tawang (via Sela Pass)',
      description: `Post breakfast, begin one of the most iconic Himalayan drives.\nAscend towards the legendary Sela Pass (13,700 ft).\nWitness snow-clad landscapes and the stunning Sela Lake (seasonal).\nMultiple high-altitude photo stops en route.\nContinue the thrilling descent towards Tawang.\nArrive in Tawang and check in to the hotel.\nEvening free to relax and acclimatize to the altitude.\nOvernight stay in Tawang.`,
      overnight: 'Tawang', distance: '125 km', highlights: ['Sela Pass (13,700 ft)', 'Sela Lake'] },
    { trip_id: trip.id, day: 4, title: 'Bum La Pass Excursion | Madhuri Lake',
      description: `Early breakfast and prepare for the high-altitude excursion.\nDrive towards the iconic Bum La Pass (Indo–China border) (subject to permit & weather).\nExperience raw Himalayan frontier landscapes.\nVisit the beautiful Madhuri (Sangetsar) Lake en route.\nCapture memorable moments at high-altitude viewpoints.\nReturn to Tawang by afternoon.\nEvening at leisure — explore local cafés or rest.\nOvernight stay in Tawang.`,
      overnight: 'Tawang', distance: '80 km', highlights: ['Bum La Pass', 'Madhuri Lake'] },
    { trip_id: trip.id, day: 5, title: 'Tawang Local Sightseeing',
      description: `After breakfast, begin local exploration of Tawang.\nVisit the majestic Tawang Monastery — the largest in India.\nExplore the Tawang War Memorial and local viewpoints.\nVisit nearby high-altitude lakes and scenic spots (as per time & weather).\nEnjoy café hopping or local market exploration in the evening.\nReturn to hotel for dinner.\nOvernight stay in Tawang.`,
      overnight: 'Tawang', highlights: ['Tawang Monastery', 'War Memorial'] },
    { trip_id: trip.id, day: 6, title: 'Tawang to Bomdila',
      description: `Post breakfast, begin the descent from Tawang.\nDrive through winding mountain roads and changing landscapes.\nCross Sela region again with scenic photo halts.\nContinue towards the peaceful hill town of Bomdila.\nArrive and check in to the hotel.\nEvening free to relax and enjoy Himalayan sunset views.\nOvernight stay in Bomdila.`,
      overnight: 'Bomdila', distance: '166 km' },
    { trip_id: trip.id, day: 7, title: 'Bomdila to Kaziranga',
      description: `Wake up to serene mountain views.\nAfter breakfast, descend from Arunachal hills towards Assam plains.\nEnjoy the dramatic landscape transition from mountains to grasslands.\nTake comfort and photography breaks en route.\nArrive near Kaziranga National Park and check in to the hotel.\nEvening at leisure — prepare for next day's safari adventure.\nOvernight stay near Kaziranga.`,
      overnight: 'Kaziranga', distance: '180 km' },
    { trip_id: trip.id, day: 8, title: 'Kaziranga Safari | Drive to Guwahati',
      description: `Early morning jeep safari in Kaziranga National Park (subject to availability).\nSpot the famous one-horned rhinoceros and other wildlife.\nReturn to hotel for breakfast and check-out.\nBegin the final drive back to Guwahati.\nEnjoy the last scenic stretches of Assam.\nArrive in Guwahati and proceed to hotel check-in.\nEvening free for relaxation or farewell dinner with the group.\nOvernight stay in Guwahati.`,
      overnight: 'Guwahati', distance: '200 km', highlights: ['Kaziranga Safari', 'One-Horned Rhinoceros'] },
    { trip_id: trip.id, day: 9, title: 'Departure from Guwahati',
      description: `Wake up to your final morning of the expedition.\nEnjoy a relaxed breakfast at the hotel.\nTrip concludes with check-out as per hotel policy.\nAirport/railway station drop will be self-arranged by travellers.\nExchange contacts, photos and memories with your travel crew.\nDepart with unforgettable stories from India's wild northeast.\nJourney Ends — Adventures Wheel.`,
      overnight: null },
  ];
  await supabase.from('trip_itinerary').insert(itinerary);
  console.log('  Itinerary inserted (9 days)');
  console.log('✅ Tawang 9D/8N COMPLETE');
}

seed();
