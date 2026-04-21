import { NextRequest, NextResponse } from 'next/server';
import { createAdminSupabase } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

// GET /api/admin/trips — list all trips (including inactive)
export async function GET() {
  try {
    const supabase = createAdminSupabase();
    const { data, error } = await supabase
      .from('trips')
      .select('*, trip_pricing(*), trip_itinerary(*), trip_departures(*), trip_categories(*)')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return NextResponse.json(data);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// POST /api/admin/trips — create a new trip
export async function POST(req: NextRequest) {
  try {
    const supabase = createAdminSupabase();
    const body = await req.json();
    const { pricing, itinerary, departures, ...tripData } = body;

    if (!tripData.slug && tripData.title) {
      tripData.slug = tripData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    }

    const { data: trip, error: tripError } = await supabase
      .from('trips')
      .insert(tripData)
      .select()
      .single();

    if (tripError) throw tripError;

    if (pricing?.length) {
      const rows = pricing.map((p: any, i: number) => ({
        trip_id: trip.id, label: p.label, price: p.price, description: p.description || null, order: i,
      }));
      await supabase.from('trip_pricing').insert(rows);
    }

    if (itinerary?.length) {
      const rows = itinerary.map((d: any) => ({
        trip_id: trip.id, day: d.day, title: d.title, description: d.description,
        overnight: d.overnight || null, distance: d.distance || null, altitude: d.altitude || null,
        highlights: d.highlights || [],
      }));
      await supabase.from('trip_itinerary').insert(rows);
    }

    if (departures?.length) {
      const rows = departures.map((d: any) => ({
        trip_id: trip.id, start_date: d.start_date, end_date: d.end_date,
        available_seats: d.available_seats || 20, booked_seats: d.booked_seats || 0,
        status: d.status || 'available',
      }));
      await supabase.from('trip_departures').insert(rows);
    }

    return NextResponse.json(trip, { status: 201 });
  } catch (err: any) {
    console.error('Trip create error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
