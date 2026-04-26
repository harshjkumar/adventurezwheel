import { NextResponse } from 'next/server';
import { createAdminSupabase } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  const supabase = createAdminSupabase();
  const results: string[] = [];

  try {
    // ─── Seed Categories ───
    const categories = [
      { name: 'Leh Ladakh', slug: 'leh-ladakh', description: 'Where the earth meets the sky on the highest roads.', icon: '🏔️', region: 'Leh Ladakh', order: 0 },
      { name: 'Spiti', slug: 'spiti', description: 'The middle land — cold deserts and ancient monasteries.', icon: '🏕️', region: 'Spiti Valley', order: 1 },
      { name: 'Meghalaya', slug: 'meghalaya', description: 'Living root bridges and the abode of clouds.', icon: '🌿', region: 'Meghalaya', order: 2 },
      { name: 'Tawang', slug: 'tawang', description: 'One of the last Shangri-Las of the Himalayas.', icon: '🛕', region: 'Tawang', order: 3 },
      { name: 'International', slug: 'international', description: 'Explore beyond borders.', icon: '✈️', region: 'International', order: 4 },
    ];
    const { error: catErr } = await supabase.from('trip_categories').upsert(categories, { onConflict: 'slug' });
    results.push(catErr ? `Categories: ERROR - ${catErr.message}` : `Categories: seeded ${categories.length}`);

    // Get category IDs for trip references
    const { data: catData } = await supabase.from('trip_categories').select('id, slug');
    const catMap: Record<string, string> = {};
    catData?.forEach((c: any) => { catMap[c.slug] = c.id; });

    // ─── Seed Hero Slides ───
    const heroSlides = [
      { title: 'Adventures Wheel offers you the world', subtitle: 'Explore with us', image: '/01554441-a49d-4d85-a9fc-a1ac8b1dbe63.jpg', order: 0 },
      { title: 'Into the middle land.', subtitle: 'Spiti Valley', image: '/spiti tour/IMG_7673.jpeg', order: 1 },
      { title: 'Where clouds rest on hills.', subtitle: 'Meghalaya', image: '/meghalaya/IMG_6757_converted.webp', order: 2 },
      { title: 'The last Shangri-La.', subtitle: 'Tawang', image: '/a5d102a5-a64d-4cf9-92e2-de28b52ad661.JPG', order: 3 },
    ];
    const { error: heroErr } = await supabase.from('hero_slides').insert(heroSlides);
    results.push(heroErr ? `Hero Slides: ERROR - ${heroErr.message}` : `Hero Slides: seeded ${heroSlides.length}`);

    // ─── Seed Stats ───
    const stats = [
      { value: '100+', label: 'Destinations', icon: 'mountain', order: 0 },
      { value: '50K+', label: 'Travelers', icon: 'users', order: 1 },
      { value: '7', label: 'Divisions', icon: 'grid', order: 2 },
      { value: '2021', label: 'Founded', icon: 'calendar', order: 3 },
    ];
    const { error: statsErr } = await supabase.from('stats').insert(stats);
    results.push(statsErr ? `Stats: ERROR - ${statsErr.message}` : `Stats: seeded ${stats.length}`);

    // ─── Seed How It Works ───
    const howItWorks = [
      { step: '01', title: 'Search', description: 'Browse our curated collection of trips and find your perfect adventure.', icon: 'search', order: 0 },
      { step: '02', title: 'Book', description: 'Reserve your spot with a simple booking process and secure payment.', icon: 'calendar', order: 1 },
      { step: '03', title: 'Pack', description: 'We send you a complete packing list and preparation guide.', icon: 'backpack', order: 2 },
      { step: '04', title: 'Adventure', description: 'Enjoy your journey with expert guides and unforgettable experiences.', icon: 'compass', order: 3 },
    ];
    const { error: hiwErr } = await supabase.from('how_it_works').insert(howItWorks);
    results.push(hiwErr ? `How It Works: ERROR - ${hiwErr.message}` : `How It Works: seeded ${howItWorks.length}`);

    // ─── Seed Testimonials ───
    const testimonials = [
      { name: 'Rahul Sharma', rating: 5, comment: 'An unforgettable journey through Ladakh. Every detail was perfectly planned and our guide was exceptional.', trip_reference: 'Leh Ladakh Expedition', order: 0 },
      { name: 'Priya Patel', rating: 5, comment: 'The Spiti Valley trip exceeded all expectations. Beautiful scenery and impeccable service throughout.', trip_reference: 'Spiti Valley Circuit', order: 1 },
      { name: 'Ananya Gupta', rating: 5, comment: "Meghalaya was magical. The small group size meant we had authentic experiences you just can't get with larger tours.", trip_reference: 'Meghalaya Explorer', order: 2 },
      { name: 'Vikram Singh', rating: 4, comment: 'Tawang was stunning. Great mix of adventure, culture, and relaxation. Would definitely travel again.', trip_reference: 'Tawang & Arunachal Circuit', order: 3 },
    ];
    const { error: testErr } = await supabase.from('testimonials').insert(testimonials);
    results.push(testErr ? `Testimonials: ERROR - ${testErr.message}` : `Testimonials: seeded ${testimonials.length}`);

    // ─── Seed FAQ ───
    const faqItems = [
      { question: 'How do I book a trip?', answer: 'You can book a trip directly through our website by selecting your desired trip, choosing a departure date, and following the booking process.', order: 0 },
      { question: 'What is the cancellation policy?', answer: 'Cancellations made 30+ days before departure receive a 75% refund. 15-29 days: 40% refund. Less than 15 days: no refund.', order: 1 },
      { question: 'Are meals included in trips?', answer: 'Most of our group trips include meals as specified in the trip details.', order: 2 },
      { question: 'What is the group size?', answer: 'Our trips typically range from 8-20 travelers.', order: 3 },
      { question: 'Do I need travel insurance?', answer: 'Travel insurance is strongly recommended. It should cover trip cancellation, medical emergencies, and evacuation.', order: 4 },
      { question: 'Can I customize a trip?', answer: 'Absolutely! We offer custom trip planning services. Contact us with your preferences.', order: 5 },
      { question: 'What payment methods do you accept?', answer: 'We accept credit/debit cards, UPI, and net banking through our secure payment gateway.', order: 6 },
    ];
    const { error: faqErr } = await supabase.from('faq_items').insert(faqItems);
    results.push(faqErr ? `FAQ: ERROR - ${faqErr.message}` : `FAQ: seeded ${faqItems.length}`);

    // ─── Seed Gallery ───
    const gallery = [
      { title: 'Pangong Lake', src: '/01554441-a49d-4d85-a9fc-a1ac8b1dbe63.jpg', category: 'Leh Ladakh', order: 0 },
      { title: 'Living Root Bridge', src: '/meghalaya/IMG_7444_converted.webp', category: 'Meghalaya', order: 1 },
      { title: 'Spiti Monastery Road', src: '/spiti tour/IMG_7673.jpeg', category: 'Spiti', order: 2 },
      { title: 'Tawang Monastery', src: '/a5d102a5-a64d-4cf9-92e2-de28b52ad661.JPG', category: 'Tawang', order: 3 },
      { title: 'Dawki River', src: '/meghalaya/IMG_8268.webp', category: 'Meghalaya', order: 4 },
      { title: 'Key Monastery', src: '/spiti tour/IMG_7698.jpeg', category: 'Spiti', order: 5 },
      { title: 'Khardung La', src: '/1b5b2c1e-434e-4ee7-8559-453e6fb84421.JPG', category: 'Leh Ladakh', order: 6 },
      { title: 'Mawlynnong Village', src: '/meghalaya/IMG_7481_converted.webp', category: 'Meghalaya', order: 7 },
    ];
    const { error: galErr } = await supabase.from('gallery_images').insert(gallery);
    results.push(galErr ? `Gallery: ERROR - ${galErr.message}` : `Gallery: seeded ${gallery.length}`);

    // ─── Seed Settings ───
    const settings = [
      { key: 'contact', value: { phone: '+91-7015760563', email: 'explore@adventureswheel.com', address: '' } },
      { key: 'social', value: { instagram: 'adventureswheel', facebook: 'AdventuresWheel', youtube: '', whatsapp: '+917015760563' } },
    ];
    const { error: settErr } = await supabase.from('site_settings').upsert(settings, { onConflict: 'key' });
    results.push(settErr ? `Settings: ERROR - ${settErr.message}` : `Settings: seeded ${settings.length}`);

    // ─── Seed Trips ───
    const trips = [
      {
        title: 'Leh Ladakh Bike Expedition',
        slug: 'leh-ladakh-bike-expedition',
        description: 'An epic journey through the highest motorable passes.',
        hero_image: '/01554441-a49d-4d85-a9fc-a1ac8b1dbe63.jpg',
        duration_days: 7,
        duration_nights: 6,
        group_size: '12-15',
        category_id: catMap['leh-ladakh'],
        is_active: true,
        is_featured: true,
        badge: 'Best Seller',
      },
      {
        title: 'Spiti Valley Circuit',
        slug: 'spiti-valley-circuit',
        description: 'Explore the rugged beauty of the middle land.',
        hero_image: '/spiti tour/IMG_7673.jpeg',
        duration_days: 9,
        duration_nights: 8,
        group_size: '10-12',
        category_id: catMap['spiti'],
        is_active: true,
        is_featured: true,
        badge: 'Trending',
      },
      {
        title: 'Meghalaya Explorer',
        slug: 'meghalaya-explorer',
        description: 'Walk among the clouds and living root bridges.',
        hero_image: '/meghalaya/IMG_6757_converted.webp',
        duration_days: 6,
        duration_nights: 5,
        group_size: '8-10',
        category_id: catMap['meghalaya'],
        is_active: true,
        is_featured: true,
        badge: 'New Route',
      },
      {
        title: 'Tawang & Arunachal Circuit',
        slug: 'tawang-arunachal-circuit',
        description: 'A spiritual and scenic journey to the eastern Himalayas.',
        hero_image: '/a5d102a5-a64d-4cf9-92e2-de28b52ad661.JPG',
        duration_days: 8,
        duration_nights: 7,
        group_size: '10-12',
        category_id: catMap['tawang'],
        is_active: true,
        is_featured: true,
        badge: 'Premium',
      }
    ];

    const { error: tripsErr } = await supabase.from('trips').upsert(trips, { onConflict: 'slug' });
    results.push(tripsErr ? `Trips: ERROR - ${tripsErr.message}` : `Trips: seeded ${trips.length}`);

    // Get trip IDs for pricing
    const { data: tripData } = await supabase.from('trips').select('id, slug');
    const tripMap: Record<string, string> = {};
    tripData?.forEach((t: any) => { tripMap[t.slug] = t.id; });

    // ─── Seed Pricing ───
    const pricing = [
      { trip_id: tripMap['leh-ladakh-bike-expedition'], label: 'Double Sharing', price: 14999 },
      { trip_id: tripMap['spiti-valley-circuit'], label: 'Triple Sharing', price: 16499 },
      { trip_id: tripMap['meghalaya-explorer'], label: 'Double Sharing', price: 12999 },
      { trip_id: tripMap['tawang-arunachal-circuit'], label: 'Triple Sharing', price: 18999 }
    ];
    const { error: priceErr } = await supabase.from('trip_pricing').upsert(pricing);
    results.push(priceErr ? `Pricing: ERROR - ${priceErr.message}` : `Pricing: seeded ${pricing.length}`);

    // ─── Seed Blog Posts ───
    const blogPosts = [
      { title: 'Top 10 Things to Do in Leh Ladakh', slug: 'top-10-things-leh-ladakh', excerpt: 'From Pangong Lake to Khardung La, discover the must-visit places.', cover_image: '/01554441-a49d-4d85-a9fc-a1ac8b1dbe63.jpg', category: 'Travel Guide', read_time: 8, is_published: true, published_at: '2026-03-15T00:00:00Z' },
      { title: 'Spiti Valley: A Complete Travel Guide', slug: 'spiti-valley-complete-guide', excerpt: 'Everything you need to know — best time, permits, hidden gems.', cover_image: '/spiti tour/IMG_7673.jpeg', category: 'Travel Guide', read_time: 6, is_published: true, published_at: '2026-03-10T00:00:00Z' },
      { title: 'Essential Packing List for High-Altitude Trips', slug: 'packing-list-high-altitude', excerpt: "Don't forget these crucial items for Himalayan expeditions.", cover_image: '/1b5b2c1e-434e-4ee7-8559-453e6fb84421.JPG', category: 'Tips & Tricks', read_time: 5, is_published: true, published_at: '2026-03-05T00:00:00Z' },
      { title: 'Meghalaya: Living Root Bridges & Beyond', slug: 'meghalaya-root-bridges', excerpt: 'Explore the mystical root bridges and crystal rivers.', cover_image: '/meghalaya/IMG_7444_converted.webp', category: 'Travel Guide', read_time: 7, is_published: true, published_at: '2026-02-28T00:00:00Z' },
    ];
    const { error: blogErr } = await supabase.from('blog_posts').upsert(blogPosts, { onConflict: 'slug' });
    results.push(blogErr ? `Blogs: ERROR - ${blogErr.message}` : `Blogs: seeded ${blogPosts.length}`);

    return NextResponse.json({
      success: true,
      message: 'Seed completed!',
      results,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message, results }, { status: 500 });
  }
}
