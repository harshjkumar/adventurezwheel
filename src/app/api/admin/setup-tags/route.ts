import { NextResponse } from 'next/server';
import { createAdminSupabase } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

export async function POST() {
  try {
    const supabase = createAdminSupabase();

    // 1. Create table via raw SQL (if not exists)
    const { error: sqlError } = await supabase.rpc('exec_sql', {
      sql: `
        CREATE TABLE IF NOT EXISTS trip_tags (
          id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
          trip_id UUID NOT NULL REFERENCES trips(id) ON DELETE CASCADE,
          tag_type TEXT NOT NULL CHECK (tag_type IN ('category', 'subcategory')),
          tag_value TEXT NOT NULL,
          created_at TIMESTAMPTZ DEFAULT NOW(),
          UNIQUE(trip_id, tag_type, tag_value)
        );
      `
    });
    
    // If rpc doesn't exist, try direct insert approach — table may already exist
    if (sqlError) {
      console.log('RPC not available, table may already exist:', sqlError.message);
    }

    // 2. Get all trips to seed tags
    const { data: trips } = await supabase.from('trips').select('id, slug, category_label, region');
    if (!trips) return NextResponse.json({ error: 'No trips found' }, { status: 404 });

    const results: string[] = [];

    for (const trip of trips) {
      const tags: { trip_id: string; tag_type: string; tag_value: string }[] = [];
      const catLabel = (trip.category_label || '').toLowerCase();
      const region = (trip.region || '').toLowerCase();

      // Category tags
      if (catLabel === 'domestic') {
        tags.push({ trip_id: trip.id, tag_type: 'category', tag_value: 'Domestic' });
        tags.push({ trip_id: trip.id, tag_type: 'category', tag_value: 'Road Trip' });
      }
      if (catLabel === 'international') {
        tags.push({ trip_id: trip.id, tag_type: 'category', tag_value: 'International' });
      }

      // Subcategory tags based on region
      if (region.includes('leh') || region.includes('ladakh')) {
        tags.push({ trip_id: trip.id, tag_type: 'subcategory', tag_value: 'Leh' });
      }
      if (region.includes('spiti')) {
        tags.push({ trip_id: trip.id, tag_type: 'subcategory', tag_value: 'Spiti' });
      }
      if (region.includes('meghalaya')) {
        tags.push({ trip_id: trip.id, tag_type: 'subcategory', tag_value: 'Meghalaya' });
      }
      if (region.includes('arunachal') || region.includes('tawang')) {
        tags.push({ trip_id: trip.id, tag_type: 'subcategory', tag_value: 'Tawang' });
      }
      if (region.includes('vietnam')) {
        tags.push({ trip_id: trip.id, tag_type: 'subcategory', tag_value: 'Vietnam' });
      }
      if (region.includes('thailand')) {
        tags.push({ trip_id: trip.id, tag_type: 'subcategory', tag_value: 'Thailand' });
      }
      if (region.includes('bali') || region.includes('indonesia')) {
        tags.push({ trip_id: trip.id, tag_type: 'subcategory', tag_value: 'Bali' });
      }

      if (tags.length > 0) {
        const { error } = await supabase.from('trip_tags').upsert(tags, { onConflict: 'trip_id,tag_type,tag_value' });
        if (error) {
          results.push(`❌ ${trip.slug}: ${error.message}`);
        } else {
          results.push(`✅ ${trip.slug}: ${tags.map(t => t.tag_value).join(', ')}`);
        }
      }
    }

    return NextResponse.json({ success: true, results });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
