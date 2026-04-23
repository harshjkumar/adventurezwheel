import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function seed() {
  const slug = 'ultimate-tawang-expedition-8d7n';
  console.log('--- Seeding: Ultimate Tawang 8D/7N ---');

  const { data: existing } = await supabase.from('trips').select('id').eq('slug', slug).single();
  if (existing) {
    await supabase.from('trip_pricing').delete().eq('trip_id', existing.id);
    await supabase.from('trip_itinerary').delete().eq('trip_id', existing.id);
    await supabase.from('trip_tags').delete().eq('trip_id', existing.id);
    await supabase.from('trips').delete().eq('id', existing.id);
    console.log('  Deleted old data');
  }

  const description = `Perched high in the Eastern Himalayas, Tawang is where dramatic mountain landscapes meet deep-rooted Buddhist culture and raw frontier adventure. This remote Himalayan town is known for its snow-clad passes, pristine high-altitude lakes, colorful monasteries, and iconic Indo-China border routes.

Our expedition begins from the vibrant plains of Guwahati and gradually climbs into the untouched wilderness of the Northeast. As the journey unfolds, you'll pass through the serene forests of Nameri, the picturesque valley of Dirang, and the legendary Sela Pass before entering the mystical land of Tawang.

In Tawang, experience the spiritual calm of the majestic monastery, the stark beauty of Bum La Pass, and the surreal charm of Madhuri Lake.

From high-altitude rides and cultural immersion to offbeat Himalayan landscapes — this expedition is crafted for true explorers seeking India's wild and unexplored northeast.

Twisting mountain roads, high passes, monasteries in the clouds — this isn't just a trip, it's one hell of a ride with Adventures Wheel. 🚀`;

  const inclusions = [
    'Tempo Traveller for local sightseeing',
    'Premium Bike Rental with Fuel (Day 1 Guwahati Hotel to Day 7 Guwahati Hotel)',
    'Airport Pickup (Fixed Time Slot)',
    'Riding Gears – Helmet, Knee Guards & Elbow Guards',
    'BS6 Royal Enfield Himalayan (We recommend riders carry their own helmets for better comfort and hygiene)',
    '7 Nights Hotel Accommodation (Double Sharing Basis and triple sharing basis as opted)',
    'Meal Plan – MAP Basis (Dinner & Breakfast)',
    'Dedicated Trip Captain Throughout the Expedition',
    'River Rafting Experience (Day 2)',
    'Professional Bike Marshal',
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
    'Since we will be traveling through remote and high-altitude regions, medical situations may occasionally arise. Any medical expenses will need to be borne directly by the participant.',
    'Riders are expected to handle the motorcycle responsibly. Any damage caused due to accident or negligence may be chargeable as per actuals.',
    'Accommodation in remote Himalayan areas may be simple but clean and comfortable.',
    'Safety is our top priority. All riders must follow instructions given by the Trip Captain and Bike Marshal.',
  ];

  const { data: trip, error } = await supabase.from('trips').insert({
    title: 'Ultimate Tawang Bike & Backpacking Expedition',
    slug,
    tagline: 'Compact Frontier',
    display_title: 'Conquer the Eastern Himalayas',
    description,
    category_label: 'Domestic',
    duration_days: 8, duration_nights: 7,
    difficulty: 'advanced',
    region: 'Tawang',
    route: 'Guwahati → Nameri → Dirang → Tawang → Bomdila → Guwahati',
    start_location: 'Guwahati', end_location: 'Guwahati',
    total_distance: '~1100 km',
    terrain: 'Eastern Himalayas, high passes, forests',
    best_for: 'Adventure seekers, culture enthusiasts',
    meals_included: '16 meals',
    inclusions, exclusions, highlights,
    is_active: true, is_featured: true, featured_order: 5,
  }).select().single();

  if (error) { console.error('Trip insert error:', error); return; }
  console.log('  Trip inserted:', trip.id);

  await supabase.from('trip_pricing').insert([
    { trip_id: trip.id, label: 'Tempo Traveler - Triple Sharing', price: 29990, order: 0 },
    { trip_id: trip.id, label: 'Tempo Traveler - Double Sharing', price: 34990, order: 1 },
    { trip_id: trip.id, label: 'Bike <> RE Himalayan411 (Rider) - Triple Sharing', price: 46990, order: 2 },
    { trip_id: trip.id, label: 'Bike <> RE Himalayan411 (Rider) - Double Sharing', price: 48990, order: 3 },
    { trip_id: trip.id, label: 'Bike <> RE Himalayan411 (Pillion) - Triple Sharing', price: 29500, order: 4 },
    { trip_id: trip.id, label: 'Bike <> RE Himalayan411 (Pillion) - Double Sharing', price: 32990, order: 5 },
  ]);
  console.log('  Pricing inserted');

  const itinerary = [
    { trip_id: trip.id, day: 1, title: 'Arrival in Guwahati | Drive to Nameri',
      description: `Arrive at Guwahati airport/railway station.\nMeet Trip Captain and fellow travellers.\nTrip briefing, documentation & vehicle allocation.\nScenic drive through Assam countryside.\nComfort breaks en route.\nHotel check-in near Nameri.\nEvening at leisure.\nOvernight stay in Nameri.`,
      overnight: 'Nameri', distance: '220 km' },
    { trip_id: trip.id, day: 2, title: 'River Rafting Experience | Drive to Dirang',
      description: `Wake up to forest surroundings.\nOptional river rafting (weather dependent).\nBreakfast & check-out.\nBegin ascent towards Arunachal Pradesh.\nInner Line Permit formalities.\nScenic mountain drive.\nArrival in Dirang & check-in.\nEvening at leisure.\nOvernight stay in Dirang.`,
      overnight: 'Dirang', distance: '160 km', highlights: ['River Rafting'] },
    { trip_id: trip.id, day: 3, title: 'Dirang to Tawang (via Sela Pass)',
      description: `Post breakfast, begin iconic Himalayan drive.\nAscend towards Sela Pass (13,700 ft).\nWitness snow landscapes & Sela Lake.\nPhoto stops en route.\nArrival in Tawang & hotel check-in.\nEvening for rest & acclimatization.\nOvernight stay in Tawang.`,
      overnight: 'Tawang', distance: '125 km', highlights: ['Sela Pass', 'Sela Lake'] },
    { trip_id: trip.id, day: 4, title: 'Bum La Pass Excursion | Madhuri Lake',
      description: `Early breakfast.\nDrive to Bum La Pass (permit & weather dependent).\nExperience high-altitude border terrain.\nVisit Madhuri Lake.\nReturn to Tawang.\nEvening at leisure.\nOvernight stay in Tawang.`,
      overnight: 'Tawang', distance: '80 km', highlights: ['Bum La Pass', 'Madhuri Lake'] },
    { trip_id: trip.id, day: 5, title: 'Tawang Local Sightseeing',
      description: `Visit Tawang Monastery.\nExplore War Memorial.\nVisit nearby lakes & viewpoints.\nEvening café hopping / market visit.\nOvernight stay in Tawang.`,
      overnight: 'Tawang', highlights: ['Tawang Monastery', 'War Memorial'] },
    { trip_id: trip.id, day: 6, title: 'Tawang to Bomdila',
      description: `Breakfast & begin descent.\nScenic mountain roads & photo halts.\nArrival in Bomdila & check-in.\nEvening free for relaxation.\nOvernight stay in Bomdila.`,
      overnight: 'Bomdila', distance: '166 km' },
    { trip_id: trip.id, day: 7, title: 'Bomdila to Guwahati',
      description: `Breakfast & departure.\nDescend to Assam plains.\nScenic drive with breaks.\nArrival in Guwahati & hotel check-in.\nEvening at leisure / farewell.\nOvernight stay in Guwahati.`,
      overnight: 'Guwahati', distance: '340 km' },
    { trip_id: trip.id, day: 8, title: 'Departure from Guwahati',
      description: `Breakfast at hotel.\nCheck-out as per policy.\nSelf transfer to airport/railway station.\nDeparture with expedition memories.`,
      overnight: null },
  ];
  await supabase.from('trip_itinerary').insert(itinerary);
  console.log('  Itinerary inserted (8 days)');
  console.log('✅ Tawang 8D/7N COMPLETE');
}

seed();
