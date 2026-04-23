import { NextResponse } from 'next/server';
import { createAdminSupabase } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';
export const maxDuration = 60;

async function insertTrip(supabase: any, tripData: any, pricing: any[], itinerary: any[]) {
  const { data: trip, error } = await supabase.from('trips').insert(tripData).select().single();
  if (error) throw new Error(`Trip insert failed: ${error.message}`);

  if (pricing.length) {
    const rows = pricing.map((p: any, i: number) => ({ trip_id: trip.id, label: p.label, price: p.price, description: p.description || null, order: i }));
    const { error: pe } = await supabase.from('trip_pricing').insert(rows);
    if (pe) console.error('Pricing insert error:', pe);
  }

  if (itinerary.length) {
    const rows = itinerary.map((d: any) => ({ trip_id: trip.id, day: d.day, title: d.title, description: d.description, overnight: d.overnight || null, distance: d.distance || null, altitude: d.altitude || null, highlights: d.highlights || [] }));
    const { error: ie } = await supabase.from('trip_itinerary').insert(rows);
    if (ie) console.error('Itinerary insert error:', ie);
  }

  return trip;
}

export async function POST() {
  try {
    const supabase = createAdminSupabase();
    const results: string[] = [];

    // ── TRIP 1: Leh to Leh, Ladakh Bike Expedition ──
    const t1 = await insertTrip(supabase, {
      title: 'Leh to Leh, Ladakh Bike Expedition',
      slug: 'leh-to-leh-ladakh-bike-expedition',
      tagline: 'Conquer Umling La – Ride the Highest Roads on Earth',
      description: `Ladakh — the Land of High Passes — is where barren mountains, turquoise lakes, and endless skies create one of the most dramatic landscapes on earth. Raw, rugged, and spiritually powerful, it's a destination that every rider dreams of conquering at least once.\n\nYour journey begins in Leh, where you acclimatize to the altitude and relax before exploring local attractions like Shanti Stupa, Hall of Fame, and the vibrant Leh Market.\n\nThe real adventure starts as you ride across Khardung La, one of the world's highest motorable passes, descending into the breathtaking Nubra Valley.\n\nFrom Nubra, continue toward the mesmerizing blue waters of Pangong Lake, soaking in its unmatched serenity. The journey then pushes further to the remote village of Hanle and the mighty Umling La, one of the highest motorable roads in the world.\n\nThe expedition concludes with a final ride back to Leh — carrying unforgettable memories of high passes, endless roads, and the unmatched spirit of Ladakh.\n\nRide bold. Ride higher. Ride the Adventures Wheel way. 🏍️🏔️`,
      category_label: 'Domestic',
      badge: 'Signature Ride',
      duration_days: 7,
      duration_nights: 6,
      difficulty: 'advanced',
      region: 'Leh-Ladakh',
      route: 'Leh → Khardung La → Nubra → Pangong → Hanle → Umling La → Leh',
      start_location: 'Leh',
      end_location: 'Leh',
      total_distance: '845 km approx',
      terrain: 'High-altitude mountain passes, cold desert',
      best_for: 'Bike riders, adventure seekers',
      season: 'June to September',
      group_size: '10-20',
      meals_included: '14 Meals (Breakfast & Dinner)',
      max_altitude_ft: 18500,
      is_featured: true,
      is_active: true,
      highlights: [
        'Ride across Khardung La – one of the world\'s highest motorable passes',
        'Conquer Umling La at 5,640 meters – higher than Everest Base Camp',
        'Camp by the legendary Pangong Lake',
        'Explore the stunning Nubra Valley & Hunder Sand Dunes',
        'Visit Rezang La War Memorial',
        'Leh local sightseeing – Shanti Stupa, Hall of Fame, Magnetic Hill'
      ],
      inclusions: [
        'Fuel for the bike (Leh to Leh) included for the entire riding circuit',
        'Complete ground travel from Leh to Leh by Tempo Traveller/Cab (applicable for Tempo Traveller package)',
        '6 Nights Stay on triple/quad sharing basis – 3 nights in hotel at Leh, 1 night in Swiss camps at Nubra Valley, 1 night in camps near Pangong Tso, 1 night in homestay at Hanle',
        'Total 14 Meals Included – Day 1: Dinner, Day 2 to Day 6: Breakfast & Dinner, Day 7: Breakfast',
        'Dedicated Mechanical Backup throughout the expedition',
        'All required Inner Line Permits for the trip',
        'Driver night charges, toll taxes, parking, and vehicle expenses',
        'Experienced Adventures Wheel Team Captain throughout the journey',
        'Oxygen cylinder available 24×7 in the backup vehicle for emergency support',
        'Riding Gear Kit (for riders) – Standard helmet (size 58–60 cm), Riding gloves, Elbow guards, Knee pads',
        'Airport pick-up/drop (Leh) on fixed group slots'
      ],
      exclusions: [
        'GST (5%) is applicable extra on the package cost',
        'Any food or beverages not specifically mentioned in the inclusions, including alcoholic drinks, mineral water, lunches, and highway refreshments',
        'Personal expenses such as driver tips, monument/monastery entry fees, camera or video charges, camel safari, river rafting, laundry, telephone bills, café bills, etc.',
        'Any additional expenses arising due to natural or climatic disruptions such as landslides, roadblocks, extreme weather, or route changes — to be borne directly by the traveler on the spot',
        'Anything not explicitly mentioned under the Inclusions section',
        'Any damage to the bike (except engine damage) will be chargeable to the rider as per actuals'
      ],
      rating: 4.8,
      review_count: 42,
    }, [
      { label: 'Tempo Traveler – Triple Sharing', price: 26990 },
      { label: 'Tempo Traveler – Double Sharing', price: 28990 },
      { label: 'Bike RE Himalayan411 (Rider) – Triple Sharing', price: 37990 },
      { label: 'Bike RE Himalayan411 (Rider) – Double Sharing', price: 39990 },
      { label: 'Bike RE Himalayan411 (Pillion) – Triple Sharing', price: 25990 },
      { label: 'Bike RE Himalayan411 (Pillion) – Double Sharing', price: 27990 },
    ], [
      { day: 1, title: 'Arrival in Leh – Leisure Day for Acclimatization', description: 'Arrive at Leh airport after a scenic flight over the mighty Himalayas, witnessing breathtaking aerial views of snow-clad peaks.\nMeet our representative at the airport, who will assist you with a smooth transfer to your hotel.\nComplete the check-in formalities and rest for a while to allow your body to adjust to the high altitude.\nThe remaining day is at leisure. We recommend going for a short, relaxed walk around your hotel area to help with better acclimatization.\nOvernight stay in Leh. 🏔️', overnight: 'Leh' },
      { day: 2, title: 'Leh Local Exploration – Sham Valley Ride', description: 'Wake up to a fresh Himalayan morning in Leh and fuel up with breakfast for an action-packed day.\nHead out for an immersive Sham Valley exploration — where culture, history, and landscapes collide.\nStart with the iconic Shanti Stupa, soaking in sweeping panoramic views of Leh and the rugged mountains beyond.\nVisit the legendary Hall of Fame — a tribute to the heroes of the Indian Army, showcasing stories of courage from high-altitude battlefields.\nSeek blessings at Gurudwara Pathar Sahib, a spiritually significant site nestled amidst dramatic landscapes.\nExperience the gravity-defying illusion at Magnetic Hill, where the mountains seem to challenge physics.\nWitness the powerful confluence at Sangam Point, where the mighty Indus and Zanskar rivers merge.\nRide back to Leh by evening. Dinner and overnight stay in Leh.\nAdventure builds momentum — this is Ladakh the Adventures Wheel way. 🏔️🏍️', overnight: 'Leh' },
      { day: 3, title: 'Leh → Nubra Valley via Khardung La', description: 'Wake up in Leh and gear up after breakfast for one of the most thrilling rides of the expedition.\nBegin your ascent toward Khardung La, one of the world\'s highest motorable passes at 5,359 meters — a true badge of honor for every rider.\nAfter conquering the pass, descend into the spectacular Nubra Valley, also known as Ldorma — the Valley of Flowers, where mountains meet sand dunes.\nExperience the rare high-altitude desert landscape and, if you wish, opt for a Bactrian camel safari (self-paid) across the stunning dunes.\nRide onward to Diskit village and visit the iconic Diskit Monastery, home to the towering Maitreya Buddha statue overlooking the valley.\nSpend time at the mesmerizing Hunder Sand Dunes, where the cold desert scenery creates an unforgettable contrast of mountains and sand.\nOvernight stay in Nubra Valley.\nToday you don\'t just ride — you conquer high passes and desert horizons, the Adventures Wheel way. 🏔️🏍️', distance: '125 km', overnight: 'Nubra Valley' },
      { day: 4, title: 'Nubra → Pangong Lake via Shyok Valley', description: 'Wake up in Nubra Valley and gear up for another high-altitude adventure ride.\nRide through the scenic routes of Agam and Shyok villages, where raw mountain terrain and river valleys create a dramatic Himalayan backdrop.\nContinue the journey through Shyok Valley until the first glimpse of the legendary Pangong Lake welcomes you.\nLocated at an altitude of 4,300 meters, Pangong is one of the world\'s highest saltwater lakes, stretching over 130+ km with ever-changing shades of blue.\nSpend time by the lake soaking in the reflections of the surrounding mountains on its crystal-clear waters — a moment every rider remembers forever.\nCapture iconic photographs, including the famous 3 Idiots movie spot.\nOvernight stay near Pangong Lake.\nToday\'s ride is all about endless roads, changing blues, and pure Himalayan freedom — the Adventures Wheel way. 🏔️🏍️', distance: '160 km', overnight: 'Pangong Lake' },
      { day: 5, title: 'Pangong → Hanle → Umling La', description: 'Wake up early at Pangong Lake to witness a surreal sunrise over the turquoise waters — a moment worth every mile.\nAfter breakfast, gear up for the most challenging and rewarding ride of the expedition as you head toward Hanle.\nRide through Chushul and halt at the historic Rezang La War Memorial, paying tribute to the brave soldiers of the 1962 Indo–China War.\nContinue the long, high-altitude stretch with a lunch halt en route before reaching the remote and picturesque village of Hanle.\nFrom here begins the ultimate conquest — the ride to Umling La, one of the highest motorable roads in the world.\nCross Photi La (5,524 m) before ascending to Umling La at 5,640 meters — higher than Everest Base Camp.\nCapture the moment at the top, surrounded by endless barren mountains, knowing you\'ve conquered one of the world\'s highest riding achievements.\nReturn to Hanle by evening for overnight stay after an epic 300 km adventure.\nToday, you don\'t just ride — you conquer extremes. This is Adventures Wheel at its boldest. 🏔️🏍️', distance: '300 km', overnight: 'Hanle' },
      { day: 6, title: 'Hanle → Leh via Chumathang', description: 'Wake up early in Hanle and witness the sky come alive with shades of orange and pink over the rugged Ladakh range — a peaceful yet powerful start to the day.\nAfter breakfast, gear up and begin your return ride to Leh, carrying the pride of conquering the world\'s highest roads.\nRide through the scenic stretches of Chumathang, Upshi, Karu, Thikshey, and Shey — where barren mountains meet river valleys and monasteries dot the horizon.\nReach Leh by evening and check in to your hotel. Freshen up after the long ride.\nHead out to explore Leh Market at your own pace — shop for souvenirs, hop between cozy cafés, and savor local Ladakhi flavors.\nOvernight stay in Leh.\nFrom remote wilderness to vibrant town vibes — today\'s ride blends reflection, freedom, and the spirit of Adventures Wheel. 🏔️🏍️', distance: '260 km', overnight: 'Leh' },
      { day: 7, title: 'Departure – Until the Next Ride', description: 'Wake up to your final Himalayan morning in Leh, surrounded by the calm and raw beauty of Ladakh.\nEnjoy breakfast at the hotel and pack your bags for departure.\nTransfer to Leh Airport for your onward journey as your high-altitude expedition comes to an end.\nFly back home carrying unforgettable riding stories, conquered passes, new friendships, and memories that will stay with you for a lifetime.\nThe roads may end, but the adventure never does — see you on the next Adventures Wheel expedition. 🏔️🏍️', overnight: '' },
    ]);
    results.push(`✅ Trip 1: ${t1.title} (${t1.slug})`);

    // ── TRIP 2: Spiti Valley Circuit Expedition ──
    const t2 = await insertTrip(supabase, {
      title: 'Spiti Valley Circuit Expedition',
      slug: 'spiti-valley-circuit-expedition',
      tagline: 'Ride the Middle Land of Extremes',
      description: `Spiti Valley is a high-altitude cold desert whose raw beauty reveals itself only after you conquer some of the toughest roads in the Himalayas. Remote, rugged, and wildly rewarding — Spiti delivers a full dose of adrenaline at every twist of the throttle.\n\nOften called the mini Ladakh, Spiti offers the thrill of high-altitude riding blended with untouched Himalayan charm. Your journey begins from Manali, gradually building the adventure curve. The ride first flows into the lush green serenity of Tirthan Valley, then pushes into the dramatic mountain terrain of Kinnaur Valley and the last Indian village of Chitkul.\n\nAs the expedition climbs higher, the landscape transforms into the stark cold desert as you ride through Nako, Tabo, and the heart of Spiti at Kaza. Feel the spiritual calm at the iconic Key Monastery and uncover prehistoric secrets in the fossil-rich village of Langza.\n\nThe adventure peaks at the surreal Chandratal Lake, before the legendary loop brings you back to Manali — completing one of the most satisfying Himalayan circuits.\n\nThis isn't just a ride. It's endurance, adrenaline, and raw Himalayan soul — delivered the Adventures Wheel way. 🏔️🏍️`,
      category_label: 'Domestic',
      badge: 'Circuit Expedition',
      duration_days: 8, duration_nights: 7,
      difficulty: 'advanced',
      region: 'Spiti Valley',
      route: 'Delhi → Manali → Tirthan → Chitkul → Kalpa → Kaza → Chandratal → Manali → Delhi',
      start_location: 'Delhi', end_location: 'Delhi',
      total_distance: '1300 km approx', terrain: 'High-altitude cold desert, mountain passes',
      best_for: 'Bike riders, backpackers', season: 'June to October',
      group_size: '10-20', meals_included: '13 Meals (Breakfast & Dinner)',
      max_altitude_ft: 15000, is_featured: true, is_active: true,
      highlights: ['Ride through Kinnaur Valley to Chitkul – last Indian village', 'Visit Key Monastery & Chicham Bridge', 'Explore Langza fossil village & Hikkim Post Office', 'Camp at Chandratal Lake under starry skies', 'Old Manali café crawl', 'Cross Ka Loops – thrilling high-altitude road section'],
      inclusions: ['Volvo transfer from Delhi to Manali and return', 'Bike rent for 7 days (Biking option)', 'Fuel for the bike (Manali to Manali)', 'Tempo Traveller/Cab travel from Aut to Manali (Tempo option)', '7 nights accommodation on triple sharing – 1 Night hotel in Tirthan/Jibhi, 1 Night camps/hotel in Chitkul, 1 Night hotel in Kalpa, 2 Nights hotel/homestay in Kaza, 1 Night camps at Chandratal Lake, 1 Night hotel in Manali', '13 meals included – Day 1: Breakfast + Dinner, Day 2: Dinner, Day 3–6: Breakfast + Dinner, Day 7: Breakfast, Day 8: Breakfast', 'Mechanical backup throughout the trip', 'Inner Line Permits (except Chandratal)', 'Driver night charges, tolls, parking & vehicle expenses', 'Adventures Wheel Team Captain throughout', 'Oxygen cylinder in vehicle (24×7 emergency support)', 'Riding gear for riders — Helmet, Gloves, Elbow Guards, Knee Pads'],
      exclusions: ['GST (5%) applicable extra', 'Any food or beverages not mentioned in inclusions', 'Personal expenses such as driver tips, monument/monastery entry fees, camera charges, etc.', 'Any expenses arising due to natural calamities or unforeseen situations to be borne directly by the traveler', 'Anything not explicitly mentioned under Inclusions', 'Any bike damage (except engine damage) to be borne by the client', 'Volvo transfers not included for Self Bike option'],
      rating: 4.7, review_count: 38,
    }, [
      { label: 'Tempo Traveler – Triple Sharing', price: 27990 },
      { label: 'Tempo Traveler – Double Sharing', price: 29990 },
      { label: 'Bike RE Himalayan411 (Rider) – Triple Sharing', price: 39990 },
      { label: 'Bike RE Himalayan411 (Rider) – Double Sharing', price: 41990 },
      { label: 'Bike RE Himalayan411 (Pillion) – Triple Sharing', price: 26990 },
      { label: 'Bike RE Himalayan411 (Pillion) – Double Sharing', price: 28990 },
    ], [
      { day: 1, title: 'Reach Manali → Tirthan Valley / Jibhi', description: 'Depart from Delhi by evening and arrive at Aut the next morning, entering the serene Himalayan belt.\nBackpackers: Transfer directly to Tirthan Valley / Jibhi.\nBikers: Proceed to Manali, collect your bikes, complete briefing and test ride, then ride from Manali to Tirthan Valley/Jibhi.\nCheck in to the resort/hotel upon arrival.\nBreakfast and freshen up (bikers will have breakfast arranged in Manali before the ride).\nLocal exploration for backpackers — enjoy riverside walks, café hopping, and the laid-back mountain vibe.\nDinner and overnight stay in the peaceful surroundings of Tirthan Valley/Jibhi.\nSmooth start. Mountain calm. Adventures Wheel style. 🏔️🚙', overnight: 'Tirthan Valley/Jibhi' },
      { day: 2, title: 'Tirthan / Jibhi → Chitkul via Kinnaur Valley', description: 'Early morning, begin the scenic journey toward Chitkul, the last inhabited Indian village near the Indo–Tibet (China) border.\nDrive through the magnificent landscapes of Kinnaur Valley, following the dramatic mountain roads along the banks of the Sutlej River.\nWitness the terrain gradually transform from lush valleys to rugged high-altitude scenery — a true Himalayan road experience.\nReach Chitkul by evening and check in to the camps/hotel.\nDinner and overnight stay amidst the raw beauty of the mountains.\nLong drive. Epic views. Pure Adventures Wheel energy. 🏔️🚙', distance: '230 km', overnight: 'Chitkul' },
      { day: 3, title: 'Explore Chitkul → Kalpa', description: 'Wake up early to witness one of the most beautiful Himalayan sunrises in Chitkul.\nExplore the charming local village, soak in Baspa Valley views, and enjoy the peaceful mountain vibe.\nDepart for Kalpa by noon, continuing the scenic drive through Kinnaur Valley.\nReach Kalpa by evening with stunning views of the Kinner Kailash range.\nCheck in to the hotel, followed by dinner and overnight stay.\nSlow morning. Scenic drive. Pure mountain magic — the Adventures Wheel way. 🏔️🚙', distance: '80 km', overnight: 'Kalpa' },
      { day: 4, title: 'Kalpa → Kaza via Nako – Tabo – Ka Loops', description: 'Wake up early in the morning and after breakfast, begin your journey deeper into Spiti Valley.\nEnter Spiti through the Sumdo border check-post, marking your arrival into the cold desert region.\nVisit the scenic villages of Nako and Tabo en route to Kaza, experiencing the region\'s unique Himalayan culture.\nCross the thrilling Ka Loops, one of the most exciting high-altitude road sections of Spiti.\nReach Kaza by evening and check in to the hotel/homestay.\nDinner and overnight stay in Kaza.\nFrom green valleys to cold desert — the real Spiti adventure begins. 🏔️🚙', distance: '220 km', overnight: 'Kaza' },
      { day: 5, title: 'Key Monastery – Chicham – Hikkim – Komic – Langza → Kaza', description: 'After breakfast, begin your high-altitude village circuit in Spiti Valley.\nVisit the iconic Key Monastery, perched dramatically on a hilltop overlooking vast Spiti plains.\nFurther drive to Chicham Bridge, the highest suspension bridge in Asia, suspended above a deep gorge.\nContinue to Komic, one of the highest inhabited villages in Asia (approx. 4,513 m).\nVisit Hikkim Post Office, where you can send a postcard from one of the world\'s highest post offices.\nHead to Langza, the famous fossil village, where the landscape dates back to the ancient Tethys Sea.\nReturn to Kaza by evening. Dinner and overnight stay at the hotel/homestay.\nHigh villages. Ancient monasteries. Pure Spiti magic — the Adventures Wheel way. 🏔️🚙', distance: '80 km', overnight: 'Kaza' },
      { day: 6, title: 'Kaza → Chandratal Lake', description: 'Wake up early in the morning and after breakfast, check out from the hotel in Kaza.\nDepart for the magical Chandratal Lake, one of the most breathtaking high-altitude lakes in the Himalayas.\nEn route, take a quick snack halt at Losar, the last village of Spiti Valley.\nReach Chandratal by evening. Take a short hike to visit the pristine lake and soak in its surreal beauty.\nReturn to the campsite and check in to your Swiss camps.\nEnjoy dinner and an unforgettable overnight stay under a sky filled with a million stars and the Milky Way.\nMoon lake vibes. Starry skies. Adventures Wheel magic. ✨🏔️', distance: '95 km', overnight: 'Chandratal' },
      { day: 7, title: 'Chandratal → Manali | Old Manali Café Crawl', description: 'Wake up early in the morning and after breakfast, check out from the camps.\nDepart for Manali, driving through one of the most scenic Himalayan routes.\nReach Manali by evening and check in to the hotel.\nHead out for the famous Old Manali café crawl — explore the vibrant backpacker vibe, riverside cafés, and local nightlife.\nDinner at own expense (kept free so you can explore cafés of your choice).\nOvernight stay at the hotel in Manali.\nFrom cold desert to café culture — the Adventures Wheel way. 🏔️☕', distance: '111 km', overnight: 'Manali' },
      { day: 8, title: 'Manali Leisure → Overnight to Delhi', description: 'Wake up in the morning and enjoy your final breakfast in Manali. Check out as per hotel timing and keep your luggage at the reception.\nFree time for self-exploration — soak in the last moments of the mountains at your own pace.\nSuggested places to visit: Hadimba Devi Temple, Old Manali Street, and Mall Road.\nDepart for Delhi by evening with bags full of memories.\nReach Delhi the next morning, marking the end of your epic Himalayan journey.\nMountains fade. Memories stay. Adventures Wheel forever. 🏔️🚙', distance: '510 km', overnight: '' },
    ]);
    results.push(`✅ Trip 2: ${t2.title} (${t2.slug})`);

    return NextResponse.json({ success: true, results, message: 'Batch 1 (Trips 1-2) seeded. Call /api/admin/seed-trips-2 for remaining trips.' });
  } catch (err: any) {
    console.error('Seed error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
