import { NextResponse } from 'next/server';
import { createAdminSupabase } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

export async function POST() {
  try {
    const supabase = createAdminSupabase();
    const results: string[] = [];

    // Step 1: Create missing international categories
    const newCategories = [
      { name: 'Thailand', slug: 'thailand', description: 'Beaches, temples, and tropical adventures.', parent_type: 'international', is_featured: true, is_active: true, order: 6 },
      { name: 'Bali', slug: 'bali', description: 'Island of gods — culture, nature, and surf.', parent_type: 'international', is_featured: true, is_active: true, order: 7 },
    ];

    const { error: catErr } = await supabase.from('trip_categories').upsert(newCategories, { onConflict: 'slug' });
    results.push(catErr ? `Categories: ERROR - ${catErr.message}` : `Categories: created Thailand & Bali`);

    // Step 2: Get all category IDs
    const { data: allCats } = await supabase.from('trip_categories').select('id, slug, name');
    const catMap: Record<string, string> = {};
    allCats?.forEach((c: any) => { catMap[c.slug] = c.id; });

    // Step 3: Fix trips with null category_id
    const fixes = [
      { slug: 'thailand-adventure', category_slug: 'thailand' },
      { slug: 'bali-explorer', category_slug: 'bali' },
      { slug: 'meghalaya-premium', category_slug: 'meghalaya' },
      { slug: 'spiti-valley-backpacking', category_slug: 'spiti' },
    ];

    for (const fix of fixes) {
      const catId = catMap[fix.category_slug];
      if (!catId) {
        results.push(`SKIP: No category found for ${fix.category_slug}`);
        continue;
      }
      const { error } = await supabase
        .from('trips')
        .update({ category_id: catId })
        .eq('slug', fix.slug);
      
      if (error) {
        results.push(`ERROR fixing ${fix.slug}: ${error.message}`);
      } else {
        results.push(`Fixed ${fix.slug} → ${fix.category_slug} (${catId})`);
      }
    }

    return NextResponse.json({ success: true, results });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
