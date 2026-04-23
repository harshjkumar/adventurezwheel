import { NextResponse } from 'next/server';
import { createAdminSupabase } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

export async function POST() {
  try {
    const supabase = createAdminSupabase();

    // Fetch latest 3 international trips
    const { data: intlTrips } = await supabase
      .from('trips')
      .select('id, slug, title')
      .eq('category_label', 'International')
      .order('created_at', { ascending: false })
      .limit(3);

    // Fetch latest 6 domestic trips
    const { data: domesticTrips } = await supabase
      .from('trips')
      .select('id, slug, title')
      .eq('category_label', 'Domestic')
      .order('created_at', { ascending: false })
      .limit(6);

    const keepIds = [
      ...(intlTrips || []).map(t => t.id),
      ...(domesticTrips || []).map(t => t.id),
    ];

    // Get all trips to find which ones to delete
    const { data: allTrips } = await supabase.from('trips').select('id, slug, title');
    const toDelete = (allTrips || []).filter(t => !keepIds.includes(t.id));

    if (toDelete.length === 0) {
      return NextResponse.json({ message: 'Database is already clean.', kept: keepIds.length });
    }

    const deleteIds = toDelete.map(t => t.id);

    // Delete related data first
    await supabase.from('trip_pricing').delete().in('trip_id', deleteIds);
    await supabase.from('trip_itinerary').delete().in('trip_id', deleteIds);
    await supabase.from('trip_departures').delete().in('trip_id', deleteIds);
    await supabase.from('trip_tags').delete().in('trip_id', deleteIds);

    // Delete the trips themselves
    const { error } = await supabase.from('trips').delete().in('id', deleteIds);
    if (error) throw error;

    return NextResponse.json({
      success: true,
      deleted: toDelete.length,
      deletedTrips: toDelete.map(t => `${t.title} (${t.slug})`),
      kept: keepIds.length,
    });
  } catch (err: any) {
    console.error('Cleanup error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
