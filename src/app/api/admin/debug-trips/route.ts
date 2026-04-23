import { NextResponse } from 'next/server';
import { createServerSupabase } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const supabase = createServerSupabase();
    const { data, error } = await supabase
      .from('trips')
      .select('id, title, slug, category_id, trip_categories(id, name, slug, parent_type)')
      .eq('is_active', true)
      .order('title');

    if (error) throw error;

    return NextResponse.json({ trips: data });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
