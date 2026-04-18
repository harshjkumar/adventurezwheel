import { createServerSupabase } from "@/lib/supabase/server";
import { defaultTrips } from "./trips";

const defaultBlogPosts = [
  {
    id: "1",
    title: "Top 10 Things to Do in Leh Ladakh",
    slug: "top-10-things-leh-ladakh",
    excerpt:
      "From Pangong Lake to Khardung La, discover the must-visit places and experiences that make Ladakh a once-in-a-lifetime destination.",
    cover_image: "/images/trips/1.webp",
    author: "K2K Adventurez",
    tags: ["Ladakh", "Travel Guide"],
    category: "Travel Guide",
    published_at: "2024-12-15T00:00:00Z",
    content:
      "Leh Ladakh is not just a destination, it is an experience that stays with you forever.\n\nStart with Shanti Stupa at sunrise for panoramic views of Leh town. Visit Leh Palace and Hall of Fame to understand the region's heritage.\n\nRide to Khardung La for the thrill of one of the world's highest roads, then continue to Nubra Valley for sand dunes and double-humped camels in Hunder.\n\nPangong Lake is best explored slowly. Spend time by the shore during late afternoon and sunrise when the colors shift dramatically.\n\nIf you have extra days, include Tso Moriri and Hanle for quieter, less crowded landscapes.\n\nAcclimatization is essential. Keep your first day light, stay hydrated, avoid alcohol, and sleep well.\n\nLeh Ladakh rewards slow travelers. The best memories are often made at tea stalls, monasteries, and unexpected roadside viewpoints.",
  },
  {
    id: "2",
    title: "Spiti Valley: A Complete Travel Guide",
    slug: "spiti-valley-complete-guide",
    excerpt:
      "Everything you need to know before planning your Spiti Valley trip — best time to visit, permit requirements, and hidden gems.",
    cover_image: "/images/trips/spiti/spiti-key-monastery.jpeg",
    author: "K2K Adventurez",
    tags: ["Spiti", "Travel Guide"],
    category: "Travel Guide",
    published_at: "2024-11-20T00:00:00Z",
    content:
      "Spiti Valley is the middle land between India and Tibet, famous for dramatic landscapes, ancient monasteries, and high-altitude villages.\n\nBest season is typically May to September. Roads are more stable, weather is manageable, and most stays are operational.\n\nPopular route options include via Shimla (better for gradual acclimatization) and via Manali (shorter but tougher due to rapid altitude gain).\n\nDo not miss Key Monastery, Kibber, Chicham Bridge, Hikkim, Komic, Langza, Dhankar, and Chandratal Lake.\n\nFor permits and checkpoints, always carry government ID and multiple photocopies. Network is limited, so keep offline maps and cash.\n\nAltitude care is critical in Spiti. Drink water regularly, avoid overexertion on arrival, and keep a buffer day in your itinerary.\n\nTravel with respect: avoid littering, keep noise low near monasteries, and support local stays and cafes where possible.",
  },
  {
    id: "3",
    title: "Essential Packing List for High-Altitude Bike Trips",
    slug: "packing-list-high-altitude",
    excerpt:
      "Don't forget these crucial items when preparing for a bike expedition in the Himalayas. From gear to documents, we cover it all.",
    cover_image: "/images/trips/3.webp",
    author: "K2K Adventurez",
    tags: ["Tips", "Packing"],
    category: "Tips & Tricks",
    published_at: "2024-10-10T00:00:00Z",
    content:
      "Packing smart can make or break a high-altitude ride. Focus on layers, safety, and essentials instead of heavy extras.\n\nRiding gear checklist: full-face helmet, armored jacket, riding pants, gloves, and waterproof riding boots.\n\nClothing checklist: thermal base layers, fleece mid-layer, windproof outer layer, woolen cap, and quick-dry socks.\n\nHealth essentials: basic medicines, personal prescriptions, sunscreen, lip balm, rehydration salts, and a compact first-aid pouch.\n\nDocuments: ID proofs, driving license, bike papers, insurance copy, and emergency contact numbers. Keep digital backups too.\n\nTech and utility: power bank, charger, torch/headlamp, sunglasses, and reusable water bottle.\n\nPack in soft duffels, not hard suitcases. Keep frequently used items accessible so roadside halts stay quick and smooth.",
  },
  {
    id: "4",
    title: "Why Monsoon is the Best Time for Ladakh",
    slug: "monsoon-best-time-ladakh",
    excerpt:
      "Contrary to popular belief, monsoon season offers unique advantages for Ladakh travelers. Here's why you should consider it.",
    cover_image: "/images/trips/4.webp",
    author: "K2K Adventurez",
    tags: ["Ladakh", "Season"],
    category: "Insights",
    published_at: "2024-09-05T00:00:00Z",
    content:
      "Monsoon months can actually be one of the most rewarding periods to visit Ladakh. While many plains receive rain, Ladakh remains comparatively dry due to its rain-shadow geography.\n\nRoadside landscapes are vibrant, skies can be dramatic, and the overall ride feels fresh and cinematic.\n\nAnother advantage is better water flow in streams and waterfalls, adding life to valleys and mountain crossings.\n\nYou should still prepare for occasional delays on approach highways. Build buffer days and avoid tight return schedules.\n\nWith proper planning, monsoon Ladakh offers fewer crowds at key spots and a richer road-trip atmosphere.\n\nCarry rain layers for transit stretches and keep your luggage fully waterproofed.\n\nThe season is ideal for riders who enjoy dynamic weather, changing light, and scenic depth across long routes.",
  },
  {
    id: "5",
    title: "Kashmir to Ladakh: The Ultimate Road Trip",
    slug: "kashmir-ladakh-road-trip",
    excerpt:
      "A day-by-day account of the legendary Srinagar to Leh highway — one of the most scenic drives on Earth.",
    cover_image: "/images/trips/5.webp",
    author: "K2K Adventurez",
    tags: ["Kashmir", "Ladakh", "Road Trip"],
    category: "Journey Diary",
    published_at: "2024-08-01T00:00:00Z",
    content:
      "The Srinagar to Leh route is one of the greatest Himalayan drives, combining lush valleys, high passes, war memorials, and stark moonscapes.\n\nMost riders begin in Srinagar, then halt at Kargil before reaching Leh. The transition in terrain is dramatic and unforgettable.\n\nDay 1 often covers Srinagar to Kargil via Sonamarg and Zoji La. Day 2 usually reaches Leh via Lamayuru, Fotu La, and the Indus corridor.\n\nMust-stop highlights include Kargil War Memorial, Lamayuru Moonland, and the Indus-Zanskar Confluence.\n\nFuel and food planning is important. Start early each day and avoid riding late in unknown mountain sections.\n\nThe route is excellent for first-time Ladakh riders because altitude gain is relatively gradual compared to the Manali approach.\n\nRide patiently, respect army zones and locals, and this journey becomes a memory of a lifetime.",
  },
  {
    id: "6",
    title: "How to Acclimatize at High Altitudes",
    slug: "acclimatize-high-altitudes",
    excerpt:
      "Altitude sickness can ruin your trip. Learn the proven methods to acclimatize safely and enjoy your high-altitude adventure.",
    cover_image: "/images/trips/1.webp",
    author: "K2K Adventurez",
    tags: ["Health", "Tips"],
    category: "Tips & Tricks",
    published_at: "2024-07-20T00:00:00Z",
    content:
      "Acclimatization is the single most important health factor on Himalayan trips. Your body needs time to adapt to low oxygen levels.\n\nGolden rule: climb high, sleep low where possible, and keep the first 24 hours very light.\n\nHydration helps significantly. Sip water throughout the day and avoid smoking or alcohol in initial high-altitude days.\n\nEat light but frequent meals. Heavy meals can worsen fatigue and discomfort.\n\nKnow the warning signs: headache, nausea, dizziness, unusual tiredness, and disturbed sleep. Do not ignore symptoms.\n\nIf symptoms worsen, descend and seek medical help. No viewpoint is worth risking health.\n\nWith a smart pace, rest, and awareness, most travelers acclimatize well and enjoy every kilometer safely.",
  },
];

/**
 * Fetches hero slides ordered by "order".
 * Falls back to hardcoded data when Supabase is unavailable.
 */
export async function getHeroSlides() {
  try {
    const supabase = await createServerSupabase();
    const { data, error } = await supabase
      .from("hero_slides")
      .select("*")
      .eq("is_active", true)
      .order("order");
    if (error || !data?.length) throw error;
    return data;
  } catch {
    return null; // component falls back to hardcoded
  }
}

/**
 * Fetches stats counters ordered by "order".
 */
export async function getStats() {
  try {
    const supabase = await createServerSupabase();
    const { data, error } = await supabase
      .from("stats")
      .select("*")
      .eq("is_active", true)
      .order("order");
    if (error || !data?.length) throw error;
    return data;
  } catch {
    return null;
  }
}

/**
 * Fetches How-It-Works steps.
 */
export async function getHowItWorks() {
  try {
    const supabase = await createServerSupabase();
    const { data, error } = await supabase
      .from("how_it_works")
      .select("*")
      .eq("is_active", true)
      .order("order");
    if (error || !data?.length) throw error;
    return data;
  } catch {
    return null;
  }
}

/**
 * Fetches testimonials.
 */
export async function getTestimonials() {
  try {
    const supabase = await createServerSupabase();
    const { data, error } = await supabase
      .from("testimonials")
      .select("*")
      .eq("is_active", true);
    if (error || !data?.length) throw error;
    return data;
  } catch {
    return null;
  }
}

/**
 * Fetches featured trips with pricing.
 */
export async function getFeaturedTrips() {
  try {
    const supabase = await createServerSupabase();
    const { data, error } = await supabase
      .from("trips")
      .select("*, trip_pricing(*)")
      .eq("is_featured", true)
      .eq("is_active", true)
      .order("created_at");
    
    if (data && data.length > 0) {
      return data.map(normalizeTrip);
    }
    return defaultTrips.filter(t => t.isFeatured);
  } catch {
    return defaultTrips.filter(t => t.isFeatured);
  }
}

export function normalizeTrip(raw: any) {
  if (!raw) return null;

  // 1. Find local override data for this slug
  const localOverride = defaultTrips.find(t => t.slug === raw.slug || t.id === raw.id);

  // Normalize departures from snake_case
  const rawDepartures = raw.trip_departures || raw.departures || [];
  const departures = rawDepartures.map((d: any) => ({
    id: d.id,
    startDate: d.start_date || d.startDate || "",
    endDate: d.end_date || d.endDate || "",
    availableSeats: d.available_seats ?? d.availableSeats ?? 20,
    bookedSeats: d.booked_seats ?? d.bookedSeats ?? 0,
    status: d.status || "available",
  }));

  // Normalize pricing from snake_case
  const rawPricing = raw.trip_pricing || raw.pricing || [];
  const pricing = rawPricing.map((p: any) => ({
    label: p.label,
    price: p.price,
    order: p.order ?? 0,
  }));

  // Normalize itinerary from snake_case
  const rawItinerary = raw.trip_itinerary || raw.itinerary || [];
  let itinerary = rawItinerary.map((i: any) => ({
    day: i.day,
    title: i.title,
    description: i.description || "",
    overnight: i.overnight || "",
    distance: i.distance || "",
    altitude: i.altitude || "",
  }));

  // IF local override found, prioritize its itinerary and description
  if (localOverride) {
    itinerary = localOverride.itinerary || itinerary;
  }

  return {
    ...raw,
    // ensure camelCase properties
    categoryId: raw.category_id || raw.categoryId,
    displayTitle: raw.display_title || raw.displayTitle || (localOverride?.displayTitle),
    tagline: raw.tagline || (localOverride?.tagline),
    description: localOverride?.description || raw.description || "",
    durationDays: raw.duration_days || raw.durationDays || 0,
    durationNights: raw.duration_nights || raw.durationNights || 0,
    maxAltitudeFt: raw.max_altitude_ft || raw.maxAltitudeFt || 0,
    startLocation: raw.start_location || raw.startLocation || "",
    endLocation: raw.end_location || raw.endLocation || "",
    totalDistance: raw.total_distance || raw.totalDistance || "",
    reviewCount: raw.review_count || raw.reviewCount || 0,
    bestFor: raw.best_for || raw.bestFor || "",
    isFeatured: raw.is_featured ?? raw.isFeatured ?? false,
    isActive: raw.is_active ?? raw.isActive ?? true,
    coverImage: localOverride?.coverImage || raw.cover_image || raw.coverImage || "/images/trips/1.webp",
    heroImage: localOverride?.heroImage || raw.hero_image || raw.heroImage,
    galleryImages: localOverride?.galleryImages || raw.gallery_images || raw.galleryImages || [],
    highlights: raw.highlights || localOverride?.highlights || [],
    inclusions: raw.inclusions || localOverride?.inclusions || [],
    exclusions: raw.exclusions || localOverride?.exclusions || [],
    metaTitle: raw.meta_title || raw.metaTitle || "",
    metaDescription: raw.meta_description || raw.metaDescription || "",
    createdAt: raw.created_at || raw.createdAt || "",
    updatedAt: raw.updated_at || raw.updatedAt || "",
    // normalized relations
    pricing: pricing.length > 0 ? pricing : (localOverride?.pricing || []),
    itinerary,
    departures: departures.length > 0 ? departures : (localOverride?.departures || []),
    categories: raw.trip_categories || raw.categories || [],
  };
}

/**
 * Fetches all active trips with pricing, itinerary, departures.
 */
export async function getAllTrips() {
  try {
    const supabase = await createServerSupabase();
    const { data, error } = await supabase
      .from("trips")
      .select("*, trip_pricing(*), trip_itinerary(*), trip_departures(*), trip_categories(*)")
      .eq("is_active", true)
      .order("created_at");
    
    // If DB has data, normalize and merge with local overrides
    if (data && data.length > 0) {
      const dbTrips = data.map(normalizeTrip);
      
      // Ensure local-only trips are also included if not in DB
      const localOnly = defaultTrips.filter(lt => !dbTrips.some(dt => dt.slug === lt.slug));
      return [...dbTrips, ...localOnly];
    }
    
    // Fallback to local only if DB empty/fails
    return defaultTrips;
  } catch {
    return defaultTrips;
  }
}


/**
 * Fetches a single trip by slug.
 */
export async function getTripBySlug(slug: string) {
  try {
    const supabase = await createServerSupabase();
    const { data, error } = await supabase
      .from("trips")
      .select("*, trip_pricing(*, order), trip_itinerary(*, day), trip_departures(*), trip_categories(*)")
      .eq("slug", slug)
      .eq("is_active", true)
      .single();
    
    if (data) {
      return normalizeTrip(data);
    }
    
    // Fallback to local search
    return defaultTrips.find(t => t.slug === slug) || null;
  } catch {
    return defaultTrips.find(t => t.slug === slug) || null;
  }
}

/**
 * Fetches all trip categories.
 */
export async function getCategories() {
  try {
    const supabase = await createServerSupabase();
    const { data, error } = await supabase
      .from("trip_categories")
      .select("*")
      .eq("is_active", true)
      .order("order");
    if (error || !data?.length) throw error;
    return data;
  } catch {
    return null;
  }
}

/**
 * Fetches all published blog posts.
 */
export async function getBlogPosts() {
  try {
    const supabase = await createServerSupabase();
    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("is_published", true)
      .order("published_at", { ascending: false });
    if (error || !data?.length) throw error;
    return data;
  } catch {
    return defaultBlogPosts;
  }
}

/**
 * Fetches a single blog post by slug.
 */
export async function getBlogBySlug(slug: string) {
  try {
    const supabase = await createServerSupabase();
    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("slug", slug)
      .eq("is_published", true)
      .single();
    if (error || !data) throw error;

    const fallback = defaultBlogPosts.find((post) => post.slug === slug);
    if (!fallback) return data;

    return {
      ...fallback,
      ...data,
      content: data.content && String(data.content).trim().length > 0 ? data.content : fallback.content,
      excerpt: data.excerpt && String(data.excerpt).trim().length > 0 ? data.excerpt : fallback.excerpt,
      cover_image: data.cover_image || fallback.cover_image,
      author: data.author || fallback.author,
      tags: Array.isArray(data.tags) && data.tags.length > 0 ? data.tags : fallback.tags,
      category: data.category || fallback.category,
    };
  } catch {
    return defaultBlogPosts.find((post) => post.slug === slug) || null;
  }
}

/**
 * Fetches all active gallery images.
 */
export async function getGalleryImages() {
  try {
    const supabase = await createServerSupabase();
    const { data, error } = await supabase
      .from("gallery_images")
      .select("*")
      .eq("is_active", true)
      .order("order");
    if (error || !data?.length) throw error;
    return data;
  } catch {
    return null;
  }
}
