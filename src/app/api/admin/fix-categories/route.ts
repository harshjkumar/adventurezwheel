import { NextResponse } from 'next/server';
import { createAdminSupabase } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

// POST: Fix category parent_types based on known mappings
export async function POST(req: Request) {
  try {
    const supabase = createAdminSupabase();
    const results: string[] = [];

    // Known international destination slugs
    const internationalSlugs = ['vietnam', 'thailand', 'bali', 'nepal', 'bhutan', 'sri-lanka', 'dubai', 'singapore', 'international'];
    
    // Get all categories
    const { data: allCats, error: catErr } = await supabase
      .from('trip_categories')
      .select('*');
    
    if (catErr) throw catErr;

    for (const cat of (allCats || [])) {
      const isInternational = internationalSlugs.includes(cat.slug) || 
                              cat.name?.toLowerCase().includes('vietnam') ||
                              cat.name?.toLowerCase().includes('thailand') ||
                              cat.name?.toLowerCase().includes('bali') ||
                              cat.name?.toLowerCase().includes('nepal') ||
                              cat.name?.toLowerCase().includes('bhutan') ||
                              cat.name?.toLowerCase().includes('sri lanka') ||
                              cat.name?.toLowerCase().includes('dubai') ||
                              cat.name?.toLowerCase().includes('singapore') ||
                              cat.name?.toLowerCase().includes('international') ||
                              cat.parent_type === 'international';

      const correctParentType = isInternational ? 'international' : 'domestic';
      
      if (cat.parent_type !== correctParentType) {
        const { error } = await supabase
          .from('trip_categories')
          .update({ parent_type: correctParentType })
          .eq('id', cat.id);
        
        if (error) {
          results.push(`ERROR updating ${cat.name}: ${error.message}`);
        } else {
          results.push(`Fixed ${cat.name}: ${cat.parent_type || 'null'} → ${correctParentType}`);
        }
      } else {
        results.push(`OK: ${cat.name} already correct (${correctParentType})`);
      }
    }

    return NextResponse.json({ success: true, results });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// GET: View all categories with their parent types
export async function GET() {
  try {
    const supabase = createAdminSupabase();
    const { data, error } = await supabase
      .from('trip_categories')
      .select('id, name, slug, parent_type, is_featured, is_active')
      .order('parent_type', { ascending: true })
      .order('name', { ascending: true });

    if (error) throw error;

    return NextResponse.json({ categories: data });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
