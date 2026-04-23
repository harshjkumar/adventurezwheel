import { NextResponse } from 'next/server';
import { createAdminSupabase } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';
export const revalidate = 60; // Cache for 60 seconds

export async function GET() {
  try {
    const supabase = createAdminSupabase();
    
    // We fetch trips to build the destinations list.
    // For a real production app with hundreds of trips, you'd probably want a separate destinations table
    // but building it dynamically from active trips works perfectly here.
    const { data: trips, error } = await supabase
      .from('trips')
      .select('slug, title, badge, hero_image, cover_image, trip_tags(*)')
      .eq('is_active', true);

    if (error) throw error;

    const domestic: any[] = [];
    const international: any[] = [];
    const roadTrips: any[] = [];
    
    // Process unique subcategories (destinations)
    const processedSubcats = new Set<string>();

    for (const trip of (trips || [])) {
      const tags = trip.trip_tags || [];
      const hasDomestic = tags.some((t: any) => t.tag_type === 'category' && t.tag_value === 'Domestic');
      const hasInternational = tags.some((t: any) => t.tag_type === 'category' && t.tag_value === 'International');
      const hasRoadTrip = tags.some((t: any) => t.tag_type === 'category' && t.tag_value === 'Road Trip');
      
      const subcats = tags.filter((t: any) => t.tag_type === 'subcategory').map((t: any) => t.tag_value);

      for (const subcat of subcats) {
        if (!processedSubcats.has(subcat)) {
          processedSubcats.add(subcat);
          
          const destObj = {
            name: subcat,
            href: `/trips?search=${encodeURIComponent(subcat)}`,
            image: trip.hero_image || trip.cover_image || '/placeholder.jpg',
            tagline: trip.badge || 'Explore ' + subcat
          };

          if (hasDomestic) domestic.push(destObj);
          if (hasInternational) international.push(destObj);
          if (hasRoadTrip) roadTrips.push(destObj);
        }
      }
    }

    // Sort alphabetically
    domestic.sort((a, b) => a.name.localeCompare(b.name));
    international.sort((a, b) => a.name.localeCompare(b.name));
    roadTrips.sort((a, b) => a.name.localeCompare(b.name));

    return NextResponse.json({ domestic, international, roadTrips });
  } catch (err: any) {
    console.error('Destinations API Error:', err);
    return NextResponse.json({ domestic: [], international: [], roadTrips: [] }, { status: 500 });
  }
}
