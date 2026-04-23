import { NextResponse } from 'next/server';
import { createAdminSupabase } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

// GET: Fetch tags for a trip (by trip_id query param) OR all unique tags
export async function GET(req: Request) {
  const supabase = createAdminSupabase();
  const { searchParams } = new URL(req.url);
  const tripId = searchParams.get('trip_id');

  if (tripId) {
    // Get tags for a specific trip
    const { data, error } = await supabase
      .from('trip_tags')
      .select('*')
      .eq('trip_id', tripId)
      .order('tag_type');
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json(data);
  }

  // Get all unique tags grouped by type
  const { data, error } = await supabase
    .from('trip_tags')
    .select('tag_type, tag_value, trip_id')
    .order('tag_value');
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  // Group by type
  const categories = [...new Set((data || []).filter(t => t.tag_type === 'category').map(t => t.tag_value))];
  const subcategories = [...new Set((data || []).filter(t => t.tag_type === 'subcategory').map(t => t.tag_value))];

  return NextResponse.json({ categories, subcategories, raw: data });
}

// POST: Set tags for a trip (replaces all existing tags)
export async function POST(req: Request) {
  const supabase = createAdminSupabase();
  const body = await req.json();
  const { trip_id, categories, subcategories } = body;

  if (!trip_id) return NextResponse.json({ error: 'trip_id required' }, { status: 400 });

  // Delete existing tags for this trip
  await supabase.from('trip_tags').delete().eq('trip_id', trip_id);

  // Build new tags array
  const tags: { trip_id: string; tag_type: string; tag_value: string }[] = [];
  for (const cat of (categories || [])) {
    tags.push({ trip_id, tag_type: 'category', tag_value: cat });
  }
  for (const sub of (subcategories || [])) {
    tags.push({ trip_id, tag_type: 'subcategory', tag_value: sub });
  }

  if (tags.length > 0) {
    const { error } = await supabase.from('trip_tags').insert(tags);
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true, tags });
}
