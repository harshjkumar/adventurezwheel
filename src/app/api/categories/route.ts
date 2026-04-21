import { NextResponse } from 'next/server';
import { createServerSupabase } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const supabase = createServerSupabase();
    const { data, error } = await supabase
      .from('trip_categories')
      .select('*')
      .order('name');

    if (error) throw error;
    
    // Group into domestic and international based on parent_type and only include featured ones
    const domestic = data
      .filter(c => c.parent_type === 'domestic' && !c.is_fixed && c.is_featured)
      .slice(0, 5)
      .map(c => ({
        name: c.name,
        slug: c.slug,
        href: `/trips?category=${c.slug}`,
        image: c.cover_image || 'https://images.unsplash.com/photo-1544161515-436cefd54c3e?q=80&w=2070&auto=format&fit=crop'
      }));

    const international = data
      .filter(c => c.parent_type === 'international' && !c.is_fixed && c.is_featured)
      .slice(0, 5)
      .map(c => ({
        name: c.name,
        slug: c.slug,
        href: `/trips?category=${c.slug}`,
        image: c.cover_image || 'https://images.unsplash.com/photo-1528181304800-2f140819898f?q=80&w=2070&auto=format&fit=crop'
      }));

    return NextResponse.json({ domestic, international });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
