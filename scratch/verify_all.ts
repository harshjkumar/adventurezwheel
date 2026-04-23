import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function verify() {
  console.log('=== FINAL DATABASE VERIFICATION ===\n');

  const { data: trips } = await supabase
    .from('trips')
    .select('id, title, slug, tagline, duration_days, duration_nights, category_label, region, is_active')
    .order('category_label')
    .order('created_at', { ascending: false });

  console.log(`Total trips: ${trips?.length}\n`);

  for (const t of (trips || [])) {
    // Count pricing rows
    const { count: pricingCount } = await supabase
      .from('trip_pricing').select('*', { count: 'exact', head: true }).eq('trip_id', t.id);
    // Count itinerary rows
    const { count: itinCount } = await supabase
      .from('trip_itinerary').select('*', { count: 'exact', head: true }).eq('trip_id', t.id);

    console.log(`[${t.category_label}] ${t.title}`);
    console.log(`  Slug: ${t.slug}`);
    console.log(`  Badge: ${t.tagline || 'N/A'} | ${t.duration_days}D/${t.duration_nights}N | Region: ${t.region || 'N/A'}`);
    console.log(`  Pricing: ${pricingCount} rows | Itinerary: ${itinCount} days | Active: ${t.is_active}`);
    console.log('');
  }
}

verify();
