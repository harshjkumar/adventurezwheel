// ============================================================
// FULL TRIP DATA — Adventures Wheel
// ============================================================

export interface ItineraryDay {
  day: number;
  title: string;
  distance?: string;
  duration?: string;
  description: string;
  overnight?: string;
  altitude?: string;
  highlights?: string[];
}

export interface PricingOption {
  label: string;
  price: number;
  description?: string;
}

export interface TripData {
  slug: string;
  title: string;
  displayTitle: string;
  tagline: string;
  category: string;
  badge: string;
  region: string;
  durationDays: number;
  durationNights: number;
  maxAltitudeFt: number;
  difficulty: string;
  groupSize: string;
  rating: number;
  reviewCount: number;
  heroImage: string;
  coverImage: string;
  description: string;
  highlights: string[];
  itinerary: ItineraryDay[];
  pricing: PricingOption[];
  inclusions: string[];
  exclusions: string[];
  galleryImages: string[];
  mealsIncluded: string;
  contactPhone: string;
  contactEmail: string;
  contactInstagram: string;
}

// ── Images ────────────────────────────────────────────────────
const ladakhImg = [
  '/01554441-a49d-4d85-a9fc-a1ac8b1dbe63.jpg',
  '/1b5b2c1e-434e-4ee7-8559-453e6fb84421.JPG',
  '/4713b9ed-a70e-4b71-a908-616b774b014a.JPG',
  '/6e4e45cd-760e-4122-8240-8d0ec2e5662b.JPG',
  '/7d4eaaa5-bc8c-4cd5-a0de-dbf472184965.jpg',
  '/cc934709-69bd-4eeb-9f70-83aa1636c9ee.JPG',
  '/d64bcf8e-b8bb-406c-9121-5dc05c695a0f.JPG',
  '/de32a879-c278-42e1-9784-3e37d6d80664.JPG',
];

const spitiImg = [
  '/spiti tour/IMG_2016 2.JPG',
  '/spiti tour/IMG_2027 2.JPG',
  '/spiti tour/IMG_7673.jpeg',
  '/spiti tour/IMG_7698.jpeg',
];

const meghalayaImg = [
  '/meghalaya/IMG_6757_converted.webp',
  '/meghalaya/IMG_7087_converted.webp',
  '/meghalaya/IMG_7444_converted.webp',
  '/meghalaya/IMG_7448_converted.webp',
  '/meghalaya/IMG_7481_converted.webp',
  '/meghalaya/IMG_8268.webp',
  '/meghalaya/IMG_9944.webp',
  '/meghalaya/7a88e595-4879-4e97-af5c-bae0374cb728.webp',
  '/meghalaya/82f3bca6-ba93-4746-8311-5825f8d17873.webp',
  '/meghalaya/d48f752a-da21-4788-b9f8-1146ca64ad3a.webp',
  '/meghalaya/group pose.webp',
];

const tawangImg = [
  '/a5d102a5-a64d-4cf9-92e2-de28b52ad661.JPG',
  '/c8adc763-a691-488d-ab1c-a2fdccda6380.jpg',
];

// ============================================================
// ── LEH LADAKH ──────────────────────────────────────────────
// ============================================================
const lehLadakh: TripData = {
  slug: 'leh-ladakh-bike-expedition',
  title: 'Leh to Leh Including Umling La',
  displayTitle: 'LEH LADAKH BIKE EXPEDITION',
  tagline: 'Adventures Wheel Signature High-Altitude Ride',
  category: 'Bike Expedition',
  badge: 'Best Seller',
  region: 'Ladakh, J&K',
  durationDays: 7,
  durationNights: 6,
  maxAltitudeFt: 19024,
  difficulty: 'Challenging',
  groupSize: '8-18',
  rating: 4.9,
  reviewCount: 127,
  heroImage: '/c8adc763-a691-488d-ab1c-a2fdccda6380.jpg',
  coverImage: '/de32a879-c278-42e1-9784-3e37d6d80664.JPG',
  description: `Ladakh — the Land of High Passes — is where barren mountains, turquoise lakes, and endless skies create one of the most dramatic landscapes on earth. Raw, rugged, and spiritually powerful, it's a destination that every rider dreams of conquering at least once.

Your journey begins in Leh, where you acclimatize to the altitude and relax before exploring local attractions like Shanti Stupa, Hall of Fame, and the vibrant Leh Market.

The real adventure starts as you ride across Khardung La, one of the world's highest motorable passes, descending into the breathtaking Nubra Valley. From Nubra, continue toward the mesmerizing blue waters of Pangong Lake, soaking in its unmatched serenity.

The journey then pushes further to the remote village of Hanle and the mighty Umling La, one of the highest motorable roads in the world. The expedition concludes with a final ride back to Leh — carrying unforgettable memories of high passes, endless roads, and the unmatched spirit of Ladakh.

RIDE BOLD. RIDE HIGHER. RIDE THE ADVENTURES WHEEL WAY.`,
  highlights: [
    'Cross Khardung La – one of the highest motorable passes in the world',
    'Camp beside the legendary Pangong Lake',
    'Ride to Umling La – the highest motorable road in the world (19,024 ft)',
    'Explore the remote beauty of Nubra Valley and Hanle',
    'Experience Leh\'s Buddhist monasteries and culture',
    'Stargazing at Hanle — India\'s darkest sky zone',
    'Double-hump camel ride at the Hunder Sand Dunes',
    'Adventures Wheel support crew & oxygen backup 24×7',
  ],
  itinerary: [
    {
      day: 1,
      title: 'Arrival in Leh | Acclimatization',
      distance: 'N/A',
      duration: 'Full day',
      description: 'Arrive at Leh Kushok Bakula Rimpochee Airport. Meet your Adventures Wheel Trip Captain at the designated spot. Transfer to the hotel for check-in and complete acclimatization rest. Important: Acclimatization is critical at 11,500 ft — rest, hydrate and avoid any physical strain. Light evening walk to explore Leh Market and local cafés (optional). Briefing session by your Trip Captain covering route overview, safety protocols, and bike allocation.',
      overnight: 'Leh',
      altitude: '11,500 ft',
    },
    {
      day: 2,
      title: 'Leh Local Sightseeing',
      distance: '~40 km',
      duration: '4-5 hrs',
      description: 'Post breakfast, explore Leh\'s iconic landmarks. Visit Shanti Stupa for panoramic valley views, the Hall of Fame museum, Leh Palace, and Magnetic Hill. Continue to the Sangam — confluence of the Zanskar and Indus rivers. Return to hotel by evening. Second acclimatization day to prepare for high-altitude riding ahead.',
      overnight: 'Leh',
      altitude: '11,500 ft',
    },
    {
      day: 3,
      title: 'Leh → Nubra Valley via Khardung La',
      distance: '~120 km',
      duration: '5-6 hrs',
      description: 'The real adventure begins. After breakfast, ride towards Khardung La (17,982 ft) — one of the world\'s highest motorable passes. Stop for photos at the iconic Khardung La signboard. Descend into the stunning Nubra Valley. Check in to the camp/hotel in Hunder. Evening double-hump camel ride at the Hunder Sand Dunes (optional). Dinner and overnight stay.',
      overnight: 'Nubra Valley',
      altitude: '10,000 ft',
      highlights: ['Khardung La Pass (17,982 ft)', 'Hunder Sand Dunes', 'Double-hump camel ride'],
    },
    {
      day: 4,
      title: 'Nubra Valley → Pangong Lake',
      distance: '~160 km',
      duration: '6-7 hrs',
      description: 'Early morning departure from Nubra towards the legendary Pangong Lake. Cross the stunning Shyok River route and Agham Shyok road. Arrive at Pangong Lake by afternoon — the crystal-blue waters stretching endlessly will leave you speechless. Check in to lakeside camps. Golden hour photography at the lake. Dinner under a starlit sky.',
      overnight: 'Pangong Lake',
      altitude: '14,270 ft',
      highlights: ['Pangong Tso — crystal blue lake', 'Shyok River valley drive', 'Starlit lakeside camping'],
    },
    {
      day: 5,
      title: 'Pangong Lake → Hanle',
      distance: '~220 km',
      duration: '7-8 hrs',
      description: 'Post breakfast, begin the ride towards the remote village of Hanle. Pass through Merak and Chushul — serene high-altitude villages near the India-China border. Ride through vast open plains with minimal civilization. Arrive in Hanle by evening. Visit the Hanle Observatory (subject to permits). Stargazing in India\'s darkest sky zone.',
      overnight: 'Hanle',
      altitude: '14,764 ft',
      highlights: ['Hanle Observatory — darkest sky zone in India', 'Remote high-plateau riding', 'Chushul border views'],
    },
    {
      day: 6,
      title: 'Hanle → Umling La → Leh',
      distance: '~280 km',
      duration: '9-10 hrs',
      description: 'The ultimate day of the expedition. Early departure to conquer Umling La (19,024 ft) — the highest motorable road in the world. Epic photo stops at the summit. After conquering the peak, begin the long descent back to Leh via Chumur and Upshi route. Arrive Leh by late evening. Celebration dinner with the group.',
      overnight: 'Leh',
      altitude: '19,024 ft (peak)',
      highlights: ['Umling La — 19,024 ft, highest motorable road', 'Chumur-Upshi route', 'Celebration dinner'],
    },
    {
      day: 7,
      title: 'Departure from Leh',
      distance: 'N/A',
      duration: 'N/A',
      description: 'Trip concludes after breakfast. Check out from the hotel. Transfer to Leh airport for departure. Take back memories of the highest roads, endless landscapes, and the indomitable spirit of Ladakh. Until next ride — Adventures Wheel.',
      overnight: '',
    },
  ],
  pricing: [
    { label: 'Bike + Fuel Package', price: 14999, description: 'Includes Royal Enfield bike rental + fuel for entire trip' },
    { label: 'Seat in Vehicle Package', price: 12999, description: 'Seat in tempo traveller / cab' },
    { label: 'Self Bike Option', price: 10999, description: 'Bring your own bike — accommodation & support included' },
  ],
  inclusions: [
    '6 nights accommodation on triple/quad sharing basis',
    '12 meals included (breakfast + dinner daily)',
    'Royal Enfield bike rental with fuel (bike option)',
    'Tempo Traveller / Cab for non-riders',
    'Mechanical backup throughout the trip',
    'All Inner Line Permits (ILP) and entry fees',
    'Oxygen cylinder in vehicle (24×7 emergency support)',
    'Adventures Wheel Trip Captain throughout',
    'Riding gear: Helmet, Gloves, Elbow Guards, Knee Pads',
    'Driver night charges, tolls, parking & vehicle expenses',
  ],
  exclusions: [
    'GST (5%) applicable extra',
    'Any food/beverages not mentioned in inclusions (lunches, snacks, drinks)',
    'Personal expenses: tips, monument fees, camera charges, laundry, etc.',
    'Expenses due to natural calamities or unforeseen situations (landslides, roadblocks, weather)',
    'Any bike damage (except engine damage) to be borne by the rider',
    'Anything not explicitly mentioned under "Inclusions"',
  ],
  galleryImages: [...ladakhImg],
  mealsIncluded: '12 meals (Breakfast + Dinner daily)',
  contactPhone: '+91-7015760563',
  contactEmail: 'explore@adventureswheel.com',
  contactInstagram: 'adventures_wheel_travel',
};

// ============================================================
// ── SPITI VALLEY ────────────────────────────────────────────
// ============================================================
const spitiValley: TripData = {
  slug: 'spiti-valley-circuit',
  title: 'Spiti Circuit Biking',
  displayTitle: 'SPITI VALLEY BIKE EXPEDITION',
  tagline: 'Tirthan – Spiti – Chandratal Expedition',
  category: 'Bike Expedition',
  badge: 'Trending',
  region: 'Himachal Pradesh',
  durationDays: 9,
  durationNights: 8,
  maxAltitudeFt: 15100,
  difficulty: 'Moderate to Challenging',
  groupSize: '8-18',
  rating: 4.8,
  reviewCount: 94,
  heroImage: spitiImg[2],
  coverImage: spitiImg[3],
  description: `Challenging terrains, legendary high passes, exhilarating views, and one hell of a machine — this is what every true biker dreams of. If endless mountain roads fuel your passion, then a Spiti Valley bike expedition is exactly the ride you've been waiting for.

Spiti Valley is a high-altitude cold desert whose raw beauty reveals itself only after you conquer some of the toughest roads in the Himalayas. Remote, rugged, and wildly rewarding — Spiti delivers a full dose of adrenaline at every twist of the throttle.

Often called the mini Ladakh, Spiti offers the thrill of high-altitude riding blended with untouched Himalayan charm. Your journey begins from Manali, gradually building the adventure curve. The ride first flows into the lush green serenity of Tirthan Valley, then pushes into the dramatic mountain terrain of Kinnaur Valley and the last Indian village of Chitkul.

As the expedition climbs higher, the landscape transforms into the stark cold desert as you ride through Nako, Tabo, and the heart of Spiti at Kaza. Feel the spiritual calm at the iconic Key Monastery and uncover prehistoric secrets in the fossil-rich village of Langza.

The adventure peaks at the surreal Chandratal Lake, before the legendary loop brings you back to Manali — completing one of the most satisfying Himalayan circuits.`,
  highlights: [
    'Visit Chitkul — the last inhabited Indian village near Indo-Tibet border',
    'Ride through the dramatic Kinnaur Valley along the Sutlej River',
    'Cross the thrilling Ka Loops — high-altitude road section',
    'Explore the iconic Key Monastery perched on a hilltop',
    'Cross Chicham Bridge — highest suspension bridge in Asia',
    'Visit Hikkim — world\'s highest post office',
    'Langza — the fossil village dating back to the ancient Tethys Sea',
    'Camp under starry skies at the magical Chandratal Lake',
    'Old Manali café crawl experience',
  ],
  itinerary: [
    {
      day: 0,
      title: 'Delhi → Manali (Overnight Volvo)',
      distance: '470 km',
      duration: '11-12 hrs',
      description: 'Depart from Delhi by Volvo for an overnight journey toward the Himalayas. Settle into your semi-sleeper seat and enjoy the night drive through Haryana and Punjab before entering the Himalayan belt.',
      overnight: 'Volvo Bus',
    },
    {
      day: 1,
      title: 'Reach Manali → Tirthan Valley / Jibhi',
      distance: '~80 km',
      duration: '3-4 hrs',
      description: 'Depart from Delhi by evening and arrive at Aut the next morning, entering the serene Himalayan belt.\n\n→ Backpackers: Transfer directly to Tirthan Valley / Jibhi.\n→ Bikers: Proceed to Manali, collect your bikes, complete briefing and test ride, then ride from Manali to Tirthan Valley/Jibhi.\n\nCheck in to the resort/hotel upon arrival. Breakfast and freshen up. Local exploration for backpackers — enjoy riverside walks, café hopping, and the laid-back mountain vibe. Dinner and overnight stay in the peaceful surroundings of Tirthan Valley/Jibhi.',
      overnight: 'Tirthan Valley / Jibhi',
    },
    {
      day: 2,
      title: 'Tirthan/Jibhi → Chitkul via Kinnaur Valley',
      distance: '~230 km',
      duration: '10-11 hrs',
      description: 'Early morning, begin the scenic journey toward Chitkul, the last inhabited Indian village near the Indo-Tibet (China) border. Drive through the magnificent landscapes of Kinnaur Valley, following the dramatic mountain roads along the banks of the Sutlej River. Witness the terrain gradually transform from lush valleys to rugged high-altitude scenery — a true Himalayan road experience. Reach Chitkul by evening and check in to the camps/hotel. Dinner and overnight stay amidst the raw beauty of the mountains.',
      overnight: 'Chitkul',
      altitude: '11,319 ft',
    },
    {
      day: 3,
      title: 'Explore Chitkul → Kalpa',
      distance: '~80 km',
      duration: '6-7 hrs',
      description: 'Wake up early to witness one of the most beautiful Himalayan sunrises in Chitkul. Explore the charming local village, soak in Baspa Valley views, and enjoy the peaceful mountain vibe. Depart for Kalpa by noon, continuing the scenic drive through Kinnaur Valley. Reach Kalpa by evening with stunning views of the Kinner Kailash range. Check in to the hotel, followed by dinner and overnight stay.',
      overnight: 'Kalpa',
      altitude: '9,711 ft',
    },
    {
      day: 4,
      title: 'Kalpa → Kaza via Nako – Tabo – Ka Loops',
      distance: '~220 km',
      duration: '8-9 hrs',
      description: 'Wake up early and after breakfast, begin your journey deeper into Spiti Valley. Enter Spiti through the Sumdo border check-post, marking your arrival into the cold desert region. Visit the scenic villages of Nako and Tabo en route to Kaza, experiencing the region\'s unique Himalayan culture. Cross the thrilling Ka Loops, one of the most exciting high-altitude road sections of Spiti. Reach Kaza by evening and check in to the hotel/homestay. Dinner and overnight stay in Kaza.',
      overnight: 'Kaza',
      altitude: '12,500 ft',
      highlights: ['Ka Loops road section', 'Nako Lake', 'Tabo Monastery'],
    },
    {
      day: 5,
      title: 'Key Monastery – Chicham – Hikkim – Komic – Langza → Kaza',
      distance: '~80 km',
      duration: '6-7 hrs',
      description: 'After breakfast, begin your high-altitude village circuit in Spiti Valley. Visit the iconic Key Monastery, perched dramatically on a hilltop overlooking vast Spiti plains — a world-famous center of Buddhist learning with unmatched peace and panoramic views.\n\nFurther drive to Chicham Bridge, the highest suspension bridge in Asia, suspended above a deep gorge. Continue to Komic, one of the highest inhabited villages in Asia (approx. 4,513 m), known for its extreme remoteness and raw Himalayan charm.\n\nVisit Hikkim Post Office, where you can send a postcard from one of the world\'s highest post offices. Head to Langza, the famous fossil village, where the landscape dates back to the ancient Tethys Sea — rich with marine fossils millions of years old.\n\nReturn to Kaza by evening. Dinner and overnight stay at the hotel/homestay.',
      overnight: 'Kaza',
      altitude: '14,800 ft (Komic peak)',
      highlights: ['Key Monastery', 'Chicham Bridge', 'Hikkim Post Office', 'Langza Fossil Village'],
    },
    {
      day: 6,
      title: 'Kaza → Chandratal Lake',
      distance: '~95 km',
      duration: '5-6 hrs',
      description: 'Wake up early and after breakfast, check out from the hotel in Kaza. Depart for the magical Chandratal Lake, one of the most breathtaking high-altitude lakes in the Himalayas. En route, take a quick snack halt at Losar, the last village of Spiti Valley. Reach Chandratal by evening. Take a short hike to visit the pristine lake and soak in its surreal beauty. Return to the campsite and check in to your Swiss camps. Enjoy dinner and an unforgettable overnight stay under a sky filled with a million stars and the Milky Way.',
      overnight: 'Chandratal (Swiss Camps)',
      altitude: '14,100 ft',
      highlights: ['Chandratal Lake', 'Milky Way stargazing', 'Swiss tent camping'],
    },
    {
      day: 7,
      title: 'Chandratal → Manali | Old Manali Café Crawl',
      distance: '~111 km',
      duration: '6-7 hrs',
      description: 'Wake up early and after breakfast, check out from the camps. Depart for Manali, driving through one of the most scenic Himalayan routes. Reach Manali by evening and check in to the hotel. Head out for the famous Old Manali café crawl — explore the vibrant backpacker vibe, riverside cafés, and local nightlife. Dinner at own expense (kept free so you can explore cafés of your choice). Overnight stay at the hotel in Manali.',
      overnight: 'Manali',
    },
    {
      day: 8,
      title: 'Manali Leisure → Overnight to Delhi',
      distance: '~510 km',
      duration: '10-11 hrs',
      description: 'Wake up and enjoy your final breakfast in Manali. Check out as per hotel timing and keep luggage at reception. Free time for self-exploration — soak in the last moments of the mountains at your own pace. Suggested places: Hadimba Devi Temple, Old Manali Street, Mall Road. Depart for Delhi by evening with bags full of memories. Reach Delhi the next morning, marking the end of your epic Himalayan journey.',
      overnight: 'Volvo Bus / Arrive Delhi',
    },
  ],
  pricing: [
    { label: 'Bike + Fuel Package', price: 16499, description: 'Royal Enfield bike + fuel (Manali to Manali)' },
    { label: 'Seat in Tempo Package', price: 14499, description: 'Seat in Tempo Traveller from Aut to Manali' },
    { label: 'Self Bike Option', price: 12499, description: 'Bring your own bike — accommodation & support included' },
  ],
  inclusions: [
    'Volvo transfer from Delhi to Manali and return',
    'Bike rent for 7 days (Biking option)',
    'Fuel for the bike (Manali to Manali)',
    'Tempo Traveller/Cab travel from Aut to Manali (Tempo option)',
    '7 nights accommodation on triple sharing',
    '1 Night hotel in Tirthan/Jibhi',
    '1 Night camps/hotel in Chitkul',
    '1 Night hotel in Kalpa',
    '2 Nights hotel/homestay in Kaza',
    '1 Night camps at Chandratal Lake',
    '1 Night hotel in Manali',
    '13 meals included (Breakfast + Dinner daily)',
    'Mechanical backup throughout the trip',
    'Inner Line Permits (except Chandratal)',
    'Driver night charges, tolls, parking & vehicle expenses',
    'Adventures Wheel Team Captain throughout',
    'Oxygen cylinder in vehicle (24×7 emergency support)',
    'Riding gear: Helmet, Gloves, Elbow Guards, Knee Pads',
  ],
  exclusions: [
    'GST (5%) applicable extra',
    'Any food/beverages not mentioned in inclusions (highway lunches, snacks, alcoholic drinks)',
    'Personal expenses: driver tips, monument/monastery entry fees, camera charges, laundry, telephone bills',
    'Expenses due to natural calamities or unforeseen situations (landslides, roadblocks, weather issues)',
    'Anything not explicitly mentioned under "Inclusions"',
    'Any bike damage (except engine damage) to be borne by the client',
    'Volvo transfers not included for Self Bike option',
  ],
  galleryImages: [...spitiImg, ...ladakhImg.slice(0, 4)],
  mealsIncluded: '13 meals (Breakfast + Dinner)',
  contactPhone: '+91-7015760563',
  contactEmail: 'explore@adventureswheel.com',
  contactInstagram: 'adventures_wheel_travel',
};

// ============================================================
// ── MEGHALAYA ───────────────────────────────────────────────
// ============================================================
const meghalayaExplorer: TripData = {
  slug: 'meghalaya-explorer',
  title: 'Meghalaya Explorer',
  displayTitle: 'ULTIMATE MEGHALAYA EXPEDITION',
  tagline: 'The Abode of Clouds — Living Root Bridges & Crystal Rivers',
  category: 'Backpacking Expedition',
  badge: 'New Route',
  region: 'Meghalaya, NE India',
  durationDays: 6,
  durationNights: 5,
  maxAltitudeFt: 6000,
  difficulty: 'Moderate',
  groupSize: '8-18',
  rating: 4.8,
  reviewCount: 62,
  heroImage: meghalayaImg[0],
  coverImage: meghalayaImg[1],
  description: `Meghalaya — "The Abode of Clouds" — is where nature creates its finest masterpieces. From crystal-clear rivers and cascading waterfalls to ancient living root bridges and the lushest green hills in India, Meghalaya is a paradise for nature lovers and adventure seekers alike.

This expedition takes you deep into the heart of the Khasi and Jaintia Hills, exploring the mystical villages, sacred forests, and one-of-a-kind natural wonders that make Meghalaya unlike any other destination in the world.

Trek across the legendary living root bridges of Cherrapunji and Mawlynnong, swim in the crystal-clear waters of the Umngot River at Dawki, and stand at the edge of Asia's cleanest village. Experience the warm hospitality of the Khasi people, explore underground cave systems, and discover waterfalls that drop thousands of feet into misty valleys.

Every moment in Meghalaya is a postcard — from the rolling clouds over the hills at dawn to the glowing bioluminescent mushrooms in the sacred groves at night. This is Northeast India at its absolute finest.`,
  highlights: [
    'Trek to the Double Decker Living Root Bridge in Nongriat',
    'Visit Mawlynnong — Asia\'s Cleanest Village',
    'Crystal clear kayaking on the Umngot River at Dawki',
    'Explore the sacred forests of Mawphlang',
    'Nohkalikai Falls — tallest plunge waterfall in India (1,115 ft)',
    'Explore limestone caves of Mawsmai',
    'Visit the living bridges of Riwai and Wahthyllong',
    'Local Khasi cuisine and cultural experiences',
    'Shillong city exploration — Scotland of the East',
  ],
  itinerary: [
    {
      day: 1,
      title: 'Arrival in Guwahati → Shillong',
      distance: '~100 km',
      duration: '3-4 hrs',
      description: 'Arrive at Guwahati airport/railway station. Meet your Adventures Wheel Trip Captain. Transfer to Shillong — the "Scotland of the East". En route, stop at Umiam Lake for breathtaking views. Check in to the hotel in Shillong. Evening free to explore the vibrant Police Bazaar and local cafés. Trip briefing covering route overview, safety protocols, and travel guidelines.',
      overnight: 'Shillong',
      altitude: '4,908 ft',
    },
    {
      day: 2,
      title: 'Shillong → Cherrapunji (Sohra)',
      distance: '~55 km',
      duration: '2-3 hrs',
      description: 'After breakfast, drive to Cherrapunji (Sohra), once the wettest place on Earth. Visit the stunning Nohkalikai Falls — India\'s tallest plunge waterfall at 1,115 ft. Explore the Mawsmai Limestone Caves. Visit the Seven Sisters Falls viewpoint. Afternoon trek to the living root bridges area. Check in to the hotel/homestay. Dinner featuring local Khasi cuisine.',
      overnight: 'Cherrapunji',
      altitude: '4,500 ft',
      highlights: ['Nohkalikai Falls', 'Mawsmai Caves', 'Seven Sisters Falls'],
    },
    {
      day: 3,
      title: 'Double Decker Living Root Bridge Trek',
      distance: '~6 km trek',
      duration: 'Full day',
      description: 'The highlight of the trip. Early morning departure for the trek to the legendary Double Decker Living Root Bridge in Nongriat village. Descend approximately 3,500 steps through dense tropical forest. Reach the iconic double-decker bridge — a marvel of bioengineering created by the Khasi people over centuries. Take a refreshing dip in the natural rock pools. Enjoy packed lunch by the river. Trek back to Cherrapunji. Dinner and overnight stay.',
      overnight: 'Cherrapunji',
      highlights: ['Double Decker Root Bridge', 'Nongriat Village', 'Natural rock pools'],
    },
    {
      day: 4,
      title: 'Cherrapunji → Mawlynnong → Dawki',
      distance: '~90 km',
      duration: '4-5 hrs',
      description: 'After breakfast, drive to Mawlynnong — Asia\'s cleanest village. Walk through the spotless village and visit the unique Balancing Rock formation. Continue to Dawki and the crystal-clear Umngot River. Experience the surreal boat ride on waters so clear the boats appear to be floating in air. Explore the Bangladesh border viewpoint. Check in to riverside camps/hotel. Starlight dinner by the river.',
      overnight: 'Dawki',
      highlights: ['Mawlynnong — Asia\'s Cleanest Village', 'Umngot River boat ride', 'Balancing Rock'],
    },
    {
      day: 5,
      title: 'Dawki → Mawphlang Sacred Forest → Shillong',
      distance: '~80 km',
      duration: '3-4 hrs',
      description: 'Post breakfast, drive back towards Shillong with a stop at Mawphlang Sacred Forest — one of the oldest sacred groves in the world, protected by the Khasi people for centuries. Guided walk through the ancient forest rich with mosses, orchids, and biodiversity. Return to Shillong by afternoon. Free time to explore Ward\'s Lake, Don Bosco Museum, or the famous Shillong Peak. Farewell dinner with the group.',
      overnight: 'Shillong',
      highlights: ['Mawphlang Sacred Forest', 'Shillong Peak', 'Don Bosco Museum'],
    },
    {
      day: 6,
      title: 'Departure from Shillong/Guwahati',
      distance: '~100 km',
      duration: '3-4 hrs',
      description: 'Trip concludes after breakfast. Transfer to Guwahati airport for departure. Take back memories of living bridges, crystal rivers, and the magical abode of clouds. Until the next adventure — Adventures Wheel.',
      overnight: '',
    },
  ],
  pricing: [
    { label: 'Backpacking Package', price: 12999, description: 'Full trip with all transfers, stay & meals' },
    { label: 'Premium Package', price: 16999, description: 'Upgraded stays & private vehicle' },
  ],
  inclusions: [
    '5 nights accommodation (hotel/homestay/camp mix)',
    '10 meals included (breakfast + dinner daily)',
    'All road transfers in AC vehicle',
    'Living Root Bridge trek guide',
    'Umngot River boating experience',
    'All entry fees and permits',
    'Adventures Wheel Trip Captain throughout',
    'First aid kit and emergency support',
    'All toll charges, parking fees, and driver expenses',
  ],
  exclusions: [
    'GST (5%) applicable extra',
    'Any meals not mentioned in inclusions (lunches, snacks)',
    'Personal expenses: tips, extra activities, shopping',
    'Travel insurance (highly recommended)',
    'Expenses due to unforeseen situations (weather, landslides)',
    'Anything not explicitly mentioned under "Inclusions"',
  ],
  galleryImages: [...meghalayaImg],
  mealsIncluded: '10 meals (Breakfast + Dinner)',
  contactPhone: '+91-7015760563',
  contactEmail: 'explore@adventureswheel.com',
  contactInstagram: 'adventures_wheel_travel',
};

// ============================================================
// ── TAWANG ──────────────────────────────────────────────────
// ============================================================
const tawangExpedition: TripData = {
  slug: 'tawang-arunachal-circuit',
  title: 'Ultimate Tawang Bike & Backpacking Expedition',
  displayTitle: 'ULTIMATE TAWANG EXPEDITION',
  tagline: 'Conquer the Eastern Himalayas',
  category: 'Bike & Backpacking Expedition',
  badge: 'Premium',
  region: 'Arunachal Pradesh, NE India',
  durationDays: 9,
  durationNights: 8,
  maxAltitudeFt: 13700,
  difficulty: 'Moderate to Challenging',
  groupSize: '8-18',
  rating: 4.9,
  reviewCount: 48,
  heroImage: tawangImg[0],
  coverImage: tawangImg[1],
  description: `Perched high in the Eastern Himalayas, Tawang is where dramatic mountain landscapes meet deep-rooted Buddhist culture and raw frontier adventure. This remote Himalayan town in Arunachal Pradesh is known for its snow-clad passes, pristine high-altitude lakes, colorful monasteries, and the iconic Indo-China border routes that make every journey here truly unforgettable.

Our expedition begins from the vibrant plains of Guwahati and gradually climbs into the untouched wilderness of the Northeast. As the journey unfolds, you'll pass through the serene forests of Nameri, the picturesque valley of Dirang, and the legendary Sela Pass before entering the mystical land of Tawang. Each stretch of the route brings changing terrains, winding mountain roads, and views that keep the thrill alive at every turn.

In Tawang, experience the spiritual calm of the majestic monastery, the stark beauty of Bum La Pass, and the surreal charm of Madhuri Lake. The journey further blends adventure with wildlife as you descend towards the grasslands of Kaziranga, home to the famous one-horned rhinoceros.

From high-altitude rides and cultural immersion to wildlife encounters and offbeat Himalayan landscapes — this expedition is crafted for true explorers seeking India's wild and unexplored northeast.`,
  highlights: [
    'Cross the legendary Sela Pass (13,700 ft)',
    'Visit India\'s largest monastery — Tawang Monastery',
    'Excursion to Bum La Pass — Indo-China border',
    'Visit the surreal Madhuri (Sangetsar) Lake',
    'River rafting experience near Nameri',
    'Jungle safari at Kaziranga National Park',
    'Experience the peaceful Dirang Valley',
    'Explore the peaceful hill town of Bomdila',
    'Complete Northeast frontier adventure',
  ],
  itinerary: [
    {
      day: 1,
      title: 'Arrival in Guwahati → Nameri',
      distance: '~222 km',
      duration: '5-6 hrs',
      description: 'Arrive at Guwahati airport/railway station and complete your arrival formalities. Meet your Adventures Wheel Trip Captain and fellow travellers at the designated point. Detailed trip briefing covering route overview, safety protocols and travel guidelines. Smooth vehicle allocation and documentation completion. Kickstart the expedition with a scenic drive through Assam\'s lush landscapes and rural countryside. Enjoy multiple comfort breaks for photos, hydration and refreshments en route. Arrive near Nameri National Park and proceed with hotel check-in and room allocation. Evening at leisure — unwind amidst forest vibes or bond with your travel crew. Final briefing and preparation for the upcoming adventure days.',
      overnight: 'Nameri',
    },
    {
      day: 2,
      title: 'River Rafting Experience → Dirang',
      distance: '~160 km',
      duration: '6-7 hrs',
      description: 'Wake up to the fresh forest air of Nameri. Head out for an exciting river rafting experience (subject to weather/water level). Return to the property for breakfast and check-out formalities. Begin the scenic ascent towards Arunachal Pradesh. Complete Inner Line Permit formalities en route (if applicable). Witness the landscape transition from plains to Eastern Himalayan foothills. Take scenic photo and refreshment breaks along the mountain roads. Arrive in Dirang and proceed with hotel check-in. Evening at leisure to explore the peaceful valley vibes.',
      overnight: 'Dirang',
      highlights: ['River rafting', 'Arunachal Pradesh entry'],
    },
    {
      day: 3,
      title: 'Dirang → Tawang (via Sela Pass)',
      distance: '~125 km',
      duration: '6-7 hrs',
      description: 'Post breakfast, begin one of the most iconic Himalayan drives. Ascend towards the legendary Sela Pass (13,700 ft). Witness snow-clad landscapes and the stunning Sela Lake (seasonal). Multiple high-altitude photo stops en route. Continue the thrilling descent towards Tawang. Arrive in Tawang and check in to the hotel. Evening free to relax and acclimatize to the altitude.',
      overnight: 'Tawang',
      altitude: '13,700 ft (Sela Pass)',
      highlights: ['Sela Pass crossing', 'Sela Lake'],
    },
    {
      day: 4,
      title: 'Bum La Pass Excursion → Madhuri Lake',
      distance: '~80 km (round trip)',
      duration: '4-5 hrs',
      description: 'Early breakfast and prepare for the high-altitude excursion. Drive towards the iconic Bum La Pass (Indo-China border) — subject to permit and weather. Experience raw Himalayan frontier landscapes. Visit the beautiful Madhuri (Sangetsar) Lake en route. Capture memorable moments at high-altitude viewpoints. Return to Tawang by afternoon. Evening at leisure — explore local cafés or rest.',
      overnight: 'Tawang',
      altitude: '15,200 ft (Bum La)',
      highlights: ['Bum La Pass — Indo-China border', 'Madhuri Lake'],
    },
    {
      day: 5,
      title: 'Tawang Local Sightseeing',
      distance: 'Local travel',
      duration: 'Full day',
      description: 'After breakfast, begin local exploration of Tawang. Visit the majestic Tawang Monastery — the largest in India and second largest in Asia. Explore the Tawang War Memorial and local viewpoints. Visit nearby high-altitude lakes and scenic spots (as per time and weather). Enjoy café hopping or local market exploration in the evening. Return to hotel for dinner.',
      overnight: 'Tawang',
      highlights: ['Tawang Monastery', 'War Memorial'],
    },
    {
      day: 6,
      title: 'Tawang → Bomdila',
      distance: '~166 km',
      duration: '6-7 hrs',
      description: 'Post breakfast, begin the descent from Tawang through scenic mountain roads towards the peaceful hill town of Bomdila. Enjoy changing landscapes — from high-altitude passes to lush eastern Himalayan forests. Multiple photo and refreshment stops along the way. Arrive in Bomdila by evening. Check in to the hotel. Evening free to explore the quaint town, local crafts market, or simply relax. Dinner and overnight stay.',
      overnight: 'Bomdila',
    },
    {
      day: 7,
      title: 'Bomdila → Kaziranga',
      distance: '~180 km',
      duration: '5-6 hrs',
      description: 'After breakfast, leave the mountains behind and head towards the wild grasslands of Kaziranga National Park. Watch the landscape transform from mountain forests to the vast flood plains of the Brahmaputra River. Arrive near Kaziranga by afternoon. Check in to the resort/hotel. Evening at leisure — optional nature walk or tea garden visit. Dinner and overnight stay.',
      overnight: 'Kaziranga',
    },
    {
      day: 8,
      title: 'Kaziranga Safari → Guwahati',
      distance: '~200 km',
      duration: '5-6 hrs',
      description: 'Start the day with an exciting early morning jungle safari in Kaziranga National Park — home to the famous one-horned rhinoceros, wild elephants, tigers, and over 400 bird species. After the safari experience and breakfast, begin the return drive to Guwahati. Arrive Guwahati by evening. Check in to the hotel. Celebration farewell dinner with the group — sharing stories and memories of the incredible northeast journey.',
      overnight: 'Guwahati',
      highlights: ['Kaziranga jungle safari', 'One-horned rhinoceros'],
    },
    {
      day: 9,
      title: 'Departure from Guwahati',
      distance: 'N/A',
      duration: 'N/A',
      description: 'Trip concludes after breakfast. Take back memories of India\'s wild and unexplored northeast. Transfer to Guwahati airport/railway station. Until the next adventure — Adventures Wheel.',
      overnight: '',
    },
  ],
  pricing: [
    { label: 'Bike + Fuel Package', price: 18999, description: 'Royal Enfield bike + fuel for the expedition' },
    { label: 'Backpacking Package', price: 16999, description: 'Seat in vehicle — full trip' },
    { label: 'Premium Package', price: 22999, description: 'Upgraded stays, private transfer & meals' },
  ],
  inclusions: [
    '8 nights accommodation on twin/triple sharing',
    '16 meals included (breakfast + dinner daily)',
    'All road transfers in dedicated vehicle',
    'Royal Enfield bike rental + fuel (bike option)',
    'River rafting experience',
    'Kaziranga jungle safari (1 round)',
    'All Inner Line Permits for Arunachal Pradesh',
    'Adventures Wheel Trip Captain throughout',
    'Oxygen cylinder in vehicle (24×7 emergency support)',
    'Mechanical backup and support vehicle',
    'Riding gear: Helmet, Gloves, Elbow Guards, Knee Pads',
    'All tolls, parking, and driver expenses',
  ],
  exclusions: [
    'GST (5%) applicable extra',
    'Any food/beverages not mentioned in inclusions',
    'Personal expenses: tips, monument entry fees, camera charges, camel safari, laundry, telephone bills',
    'Expenses due to natural calamities or unforeseen situations (landslides, roadblocks, weather)',
    'Any bike damage (except engine damage) to be borne by the client',
    'Anything not explicitly mentioned under "Inclusions"',
  ],
  galleryImages: [...tawangImg, ...meghalayaImg.slice(0, 4), ...ladakhImg.slice(0, 2)],
  mealsIncluded: '16 meals (Breakfast + Dinner daily)',
  contactPhone: '+91-7015760563',
  contactEmail: 'explore@adventureswheel.com',
  contactInstagram: 'adventures_wheel_travel',
};

// ── DUMMY DUPLICATES FOR 2 TRIPS PER DESTINATION ──────────────
const lehLadakhBackpacking = {
  ...lehLadakh,
  slug: 'leh-ladakh-backpacking',
  title: 'Leh Ladakh Backpacking',
  displayTitle: 'LEH LADAKH BACKPACKING',
  category: 'Backpacking',
  badge: 'Budget Friendly',
  pricing: [{ label: 'Tempo Traveller', price: 11999, description: 'Seat in tempo traveller' }],
  heroImage: '/1b5b2c1e-434e-4ee7-8559-453e6fb84421.JPG',
  coverImage: '/4713b9ed-a70e-4b71-a908-616b774b014a.JPG',
};

const spitiValleyBackpacking = {
  ...spitiValley,
  slug: 'spiti-valley-backpacking',
  title: 'Spiti Valley Backpacking',
  displayTitle: 'SPITI VALLEY BACKPACKING',
  category: 'Backpacking',
  badge: 'Budget Friendly',
  pricing: [{ label: 'Tempo Traveller', price: 10999, description: 'Seat in tempo traveller' }],
  heroImage: '/spiti tour/IMG_2016 2.JPG',
  coverImage: '/spiti tour/IMG_2027 2.JPG',
};

const meghalayaPremium = {
  ...meghalayaExplorer,
  slug: 'meghalaya-premium',
  title: 'Meghalaya Premium Tour',
  displayTitle: 'MEGHALAYA PREMIUM',
  category: 'Premium',
  badge: 'Luxury',
  pricing: [{ label: 'SUV Stay', price: 21999, description: 'Premium stays and private vehicle' }],
  heroImage: '/meghalaya/IMG_7444_converted.webp',
  coverImage: '/meghalaya/IMG_7481_converted.webp',
};

const tawangBackpacking = {
  ...tawangExpedition,
  slug: 'tawang-backpacking',
  title: 'Tawang Backpacking Adventure',
  displayTitle: 'TAWANG BACKPACKING',
  category: 'Backpacking',
  badge: 'Most Popular',
  pricing: [{ label: 'Tempo Traveller', price: 14999, description: 'Seat in tempo traveller' }],
  heroImage: '/a5d102a5-a64d-4cf9-92e2-de28b52ad661.JPG',
  coverImage: '/01554441-a49d-4d85-a9fc-a1ac8b1dbe63.jpg',
};

// ── INTERNATIONAL TRIPS ───────────────────────────────────────
const baliExplorer = {
  ...lehLadakh,
  slug: 'bali-explorer',
  title: 'Bali Explorer',
  displayTitle: 'BALI EXPLORER',
  category: 'International',
  badge: 'Premium',
  region: 'Indonesia',
  heroImage: '/6e4e45cd-760e-4122-8240-8d0ec2e5662b.JPG',
  coverImage: '/meghalaya/IMG_8268.webp',
};

const thailandAdventure = {
  ...spitiValley,
  slug: 'thailand-adventure',
  title: 'Thailand Adventure',
  displayTitle: 'THAILAND ADVENTURE',
  category: 'International',
  badge: 'Popular',
  region: 'Thailand',
  heroImage: '/7d4eaaa5-bc8c-4cd5-a0de-dbf472184965.jpg',
  coverImage: '/meghalaya/IMG_9944.webp',
};

const vietnamJourney = {
  ...meghalayaExplorer,
  slug: 'vietnam-journey',
  title: 'Vietnam Journey',
  displayTitle: 'VIETNAM JOURNEY',
  category: 'International',
  badge: 'Trending',
  region: 'Vietnam',
  heroImage: '/cc934709-69bd-4eeb-9f70-83aa1636c9ee.JPG',
  coverImage: '/d64bcf8e-b8bb-406c-9121-5dc05c695a0f.JPG',
};

// ── Export all trips ──────────────────────────────────────────
export const allTrips: TripData[] = [
  lehLadakh, lehLadakhBackpacking,
  spitiValley, spitiValleyBackpacking,
  meghalayaExplorer, meghalayaPremium,
  tawangExpedition, tawangBackpacking,
  baliExplorer, thailandAdventure, vietnamJourney
];

export function getTripBySlug(slug: string): TripData | undefined {
  return allTrips.find((t) => t.slug === slug);
}
