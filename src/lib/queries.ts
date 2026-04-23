import { createServerSupabase } from '@/lib/supabase/server';

// ─── Trips ───────────────────────────────────────────────────

export async function getTrips() {
  const supabase = createServerSupabase();
  const { data, error } = await supabase
    .from('trips')
    .select('*, trip_pricing(*), trip_categories(*), trip_tags(*)')
    .eq('is_active', true)
    .order('created_at', { ascending: false });

  if (error) { console.error('getTrips error:', error); return []; }
  return data || [];
}

export async function getTripsByRegion(regionKeyword: string) {
  const supabase = createServerSupabase();
  const { data, error } = await supabase
    .from('trips')
    .select('*, trip_pricing(*), trip_categories(*), trip_tags(*)')
    .eq('is_active', true)
    .ilike('region', `%${regionKeyword}%`)
    .order('duration_days', { ascending: true });

  if (error) { console.error('getTripsByRegion error:', error); return []; }
  return data || [];
}

export async function getFeaturedTrips() {
  const supabase = createServerSupabase();
  const { data, error } = await supabase
    .from('trips')
    .select('*, trip_pricing(*), trip_categories(*), trip_tags(*)')
    .eq('is_active', true)
    .eq('is_featured', true)
    .order('featured_order', { ascending: true, nullsFirst: false })
    .order('created_at', { ascending: false })
    .limit(6);

  if (error) { console.error('getFeaturedTrips error:', error); return []; }
  return data || [];
}

export async function getTripBySlug(slug: string) {
  const supabase = createServerSupabase();
  const { data, error } = await supabase
    .from('trips')
    .select('*, trip_pricing(*), trip_itinerary(*), trip_departures(*), trip_categories(*), trip_tags(*)')
    .eq('slug', slug)
    .eq('is_active', true)
    .single();

  if (error) { console.error('getTripBySlug error:', error); return null; }
  return data;
}

export async function getTripsByCategory(categorySlug: string) {
  const supabase = createServerSupabase();
  // First get the category
  const { data: cat } = await supabase
    .from('trip_categories').select('id').eq('slug', categorySlug).single();

  if (!cat) return [];

  const { data, error } = await supabase
    .from('trips')
    .select('*, trip_pricing(*), trip_categories(*)')
    .eq('category_id', cat.id)
    .eq('is_active', true)
    .order('created_at', { ascending: false });

  if (error) { console.error('getTripsByCategory error:', error); return []; }
  return data || [];
}

export async function getTripsByParentType(parentType: 'domestic' | 'international') {
  const supabase = createServerSupabase();
  // Get all category IDs for this parent type
  const { data: cats } = await supabase
    .from('trip_categories')
    .select('id')
    .eq('parent_type', parentType);

  if (!cats || cats.length === 0) return [];
  const catIds = cats.map(c => c.id);

  const { data, error } = await supabase
    .from('trips')
    .select('*, trip_pricing(*), trip_categories(*)')
    .in('category_id', catIds)
    .eq('is_active', true)
    .order('created_at', { ascending: false });

  if (error) { console.error('getTripsByParentType error:', error); return []; }
  return data || [];
}

export async function getCategoryBySlug(slug: string) {
  const supabase = createServerSupabase();
  const { data, error } = await supabase
    .from('trip_categories')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error) { console.error('getCategoryBySlug error:', error); return null; }
  return data;
}

// ─── Categories ──────────────────────────────────────────────

export async function getCategories() {
  const supabase = createServerSupabase();
  const { data, error } = await supabase
    .from('trip_categories')
    .select('*')
    .eq('is_active', true)
    .order('"order"', { ascending: true });

  if (error) { console.error('getCategories error:', error); return []; }
  return data || [];
}

// ─── Hero Slides ─────────────────────────────────────────────

export async function getHeroSlides(page?: string) {
  const supabase = createServerSupabase();
  let query = supabase
    .from('hero_slides')
    .select('*')
    .eq('is_active', true);

  if (page) {
    query = query.eq('page', page);
  }

  const { data, error } = await query.order('"order"', { ascending: true });

  if (error) { console.error('getHeroSlides error:', error); return []; }
  return data || [];
}

// ─── Stats ───────────────────────────────────────────────────

export async function getStats() {
  const supabase = createServerSupabase();
  const { data, error } = await supabase
    .from('stats')
    .select('*')
    .eq('is_active', true)
    .order('"order"', { ascending: true });

  if (error) { console.error('getStats error:', error); return []; }
  return data || [];
}

// ─── How It Works ────────────────────────────────────────────

export async function getHowItWorks() {
  const supabase = createServerSupabase();
  const { data, error } = await supabase
    .from('how_it_works')
    .select('*')
    .eq('is_active', true)
    .order('"order"', { ascending: true });

  if (error) { console.error('getHowItWorks error:', error); return []; }
  return data || [];
}

// ─── Testimonials ────────────────────────────────────────────

export async function getTestimonials() {
  const supabase = createServerSupabase();
  const { data, error } = await supabase
    .from('testimonials')
    .select('*')
    .eq('is_active', true)
    .order('"order"', { ascending: true });

  if (error) { console.error('getTestimonials error:', error); return []; }
  return data || [];
}

// ─── Blog Posts ──────────────────────────────────────────────

export async function getBlogPosts() {
  const supabase = createServerSupabase();
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('is_published', true)
    .order('published_at', { ascending: false });

  if (error) { console.error('getBlogPosts error:', error); return []; }
  return data || [];
}

export async function getBlogBySlug(slug: string) {
  const supabase = createServerSupabase();
  const { data, error } = await supabase
    .from('blog_posts').select('*').eq('slug', slug).eq('is_published', true).single();

  if (error) { console.error('getBlogBySlug error:', error); return null; }
  return data;
}

// ─── Gallery ─────────────────────────────────────────────────

export async function getGalleryImages() {
  const supabase = createServerSupabase();
  const { data, error } = await supabase
    .from('gallery_images')
    .select('*')
    .eq('is_active', true)
    .order('"order"', { ascending: true });

  if (error) { console.error('getGalleryImages error:', error); return []; }
  return data || [];
}

// ─── FAQ ─────────────────────────────────────────────────────

export async function getFaqItems() {
  const supabase = createServerSupabase();
  const { data, error } = await supabase
    .from('faq_items')
    .select('*')
    .eq('is_active', true)
    .order('"order"', { ascending: true });

  if (error) { console.error('getFaqItems error:', error); return []; }
  return data || [];
}

// ─── Site Settings ───────────────────────────────────────────

export async function getSiteSettings() {
  const supabase = createServerSupabase();
  const { data, error } = await supabase.from('site_settings').select('*');
  if (error) { console.error('getSiteSettings error:', error); return {}; }
  const settings: Record<string, any> = {};
  (data || []).forEach((row: any) => { settings[row.key] = row.value; });
  return settings;
}
