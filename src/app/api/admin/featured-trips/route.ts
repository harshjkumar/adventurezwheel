import { NextRequest, NextResponse } from 'next/server';
import { createAdminSupabase } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

// GET /api/admin/featured-trips — list all active trips with featured info
export async function GET() {
  try {
    const supabase = createAdminSupabase();
    const { data, error } = await supabase
      .from('trips')
      .select('id, title, slug, hero_image, cover_image, is_featured, featured_order, is_active, duration_days, duration_nights, region, badge, trip_pricing(price), trip_categories(name)')
      .eq('is_active', true)
      .order('featured_order', { ascending: true, nullsFirst: false })
      .order('created_at', { ascending: false });

    if (error) throw error;
    return NextResponse.json(data);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// PUT /api/admin/featured-trips — bulk update featured status & order
export async function PUT(req: NextRequest) {
  try {
    const supabase = createAdminSupabase();
    const { updates } = await req.json();
    // updates is an array of { id, is_featured, featured_order }

    for (const item of updates) {
      const { error } = await supabase
        .from('trips')
        .update({
          is_featured: item.is_featured,
          featured_order: item.featured_order ?? null,
          updated_at: new Date().toISOString(),
        })
        .eq('id', item.id);

      if (error) throw error;
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error('Featured trips update error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
